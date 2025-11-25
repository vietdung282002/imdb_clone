<script setup>
import { ref, watch, onMounted, onUnmounted, computed } from 'vue'
import { api } from '@/services/api'
import { getImageUrl } from '@/services/api'

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['update:modelValue', 'search', 'type-change'])

const searchQuery = ref(props.modelValue)
const selectedType = ref('All')
const isDropdownOpen = ref(false)
const isSearchDropdownOpen = ref(false)
const searchResults = ref({ movies: [], tv: [], people: [] })
const isLoading = ref(false)
let debounceTimer = null

const searchTypes = [
  { value: 'All', label: 'All' },
  { value: 'Movies', label: 'Movies' },
  { value: 'TV Shows', label: 'TV Shows' },
  { value: 'People', label: 'People' },
]

const hasResults = computed(() => {
  return (
    searchResults.value.movies.length > 0 ||
    searchResults.value.tv.length > 0 ||
    searchResults.value.people.length > 0
  )
})

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value
}

const selectType = (type) => {
  selectedType.value = type.label
  isDropdownOpen.value = false
  emit('type-change', type.value)
}

const performSearch = async (query) => {
  if (!query.trim()) {
    searchResults.value = { movies: [], tv: [], people: [] }
    isSearchDropdownOpen.value = false
    return
  }

  isLoading.value = true
  isSearchDropdownOpen.value = true

  try {
    if (selectedType.value === 'All') {
      const [movies, tv, people] = await Promise.all([
        api.searchMovies(query),
        api.searchTV(query),
        api.searchPeople(query),
      ])

      searchResults.value = {
        movies: movies || [],
        tv: tv || [],
        people: people || [],
      }
    } else if (selectedType.value === 'Movies') {
      const movies = await api.searchMovies(query)
      searchResults.value = { movies, tv: [], people: [] }
    } else if (selectedType.value === 'TV Shows') {
      const tv = await api.searchTV(query)
      searchResults.value = { movies: [], tv, people: [] }
    } else if (selectedType.value === 'People') {
      const people = await api.searchPeople(query)
      searchResults.value = { movies: [], tv: [], people }
    }
  } catch (error) {
    console.error('Search error:', error)
    searchResults.value = { movies: [], tv: [], people: [] }
  } finally {
    isLoading.value = false
  }
}

const closeDropdowns = (event) => {
  if (!event.target.closest('.search-bar')) {
    isDropdownOpen.value = false
    isSearchDropdownOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', closeDropdowns)
})

onUnmounted(() => {
  document.removeEventListener('click', closeDropdowns)
})

watch(searchQuery, (newValue) => {
  emit('update:modelValue', newValue)

  if (debounceTimer) {
    clearTimeout(debounceTimer)
  }

  debounceTimer = setTimeout(() => {
    if (newValue.trim()) {
      performSearch(newValue.trim())
      emit('search', newValue.trim(), selectedType.value)
    } else {
      searchResults.value = { movies: [], tv: [], people: [] }
      isSearchDropdownOpen.value = false
      emit('search', '', selectedType.value)
    }
  }, 300)
})
</script>

<template>
  <div class="search-bar">
    <div class="dropdown-wrapper">
      <button class="dropdown-button" @click="toggleDropdown">
        <span>{{ selectedType }}</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" class="dropdown-icon"
          :class="{ open: isDropdownOpen }" viewBox="0 0 24 24" fill="#000" role="presentation">
          <path fill="none" d="M0 0h24v24H0V0z"></path>
          <path
            d="M8.71 11.71l2.59 2.59c.39.39 1.02.39 1.41 0l2.59-2.59c.63-.63.18-1.71-.71-1.71H9.41c-.89 0-1.33 1.08-.7 1.71z">
          </path>
        </svg>
      </button>
      <transition name="fade-scale">
        <div v-if="isDropdownOpen" class="dropdown-menu">
          <button v-for="type in searchTypes" :key="type.value" class="dropdown-item"
            :class="{ active: selectedType === type.label }" @click="selectType(type)">
            {{ type.label }}
          </button>
        </div>
      </transition>
    </div>
    <div class="input-wrapper">
      <input v-model="searchQuery" type="text" class="search-input" />
      <svg class="search-icon" width="24" height="24" viewBox="0 0 24 24" fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_search)">
          <path
            d="M15.5006 14.0006H14.7106L14.4306 13.7306C15.6306 12.3306 16.2506 10.4206 15.9106 8.39063C15.4406 5.61063 13.1206 3.39063 10.3206 3.05063C6.09063 2.53063 2.53063 6.09063 3.05063 10.3206C3.39063 13.1206 5.61063 15.4406 8.39063 15.9106C10.4206 16.2506 12.3306 15.6306 13.7306 14.4306L14.0006 14.7106V15.5006L18.2506 19.7506C18.6606 20.1606 19.3306 20.1606 19.7406 19.7506C20.1506 19.3406 20.1506 18.6706 19.7406 18.2606L15.5006 14.0006ZM9.50063 14.0006C7.01063 14.0006 5.00063 11.9906 5.00063 9.50063C5.00063 7.01063 7.01063 5.00063 9.50063 5.00063C11.9906 5.00063 14.0006 7.01063 14.0006 9.50063C14.0006 11.9906 11.9906 14.0006 9.50063 14.0006Z"
            fill="currentColor" />
        </g>
        <defs>
          <clipPath id="clip0_search">
            <rect width="24" height="24" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>

    <transition name="fade-scale">
      <div v-if="isSearchDropdownOpen && (hasResults || isLoading)" class="search-results-dropdown">
        <div v-if="isLoading" class="search-loading">Searching...</div>
        <div v-else class="search-results-content">
          <div v-if="selectedType === 'All' || selectedType === 'Movies'">
            <div v-if="searchResults.movies.length > 0" class="results-section">
              <h4 class="results-title">Movies</h4>
              <div class="results-list">
                <div v-for="movie in searchResults.movies.slice(0, 5)" :key="movie.id" class="result-item">
                  <img :src="getImageUrl(movie.poster_path, 'w92')" :alt="movie.title" class="result-poster" />
                  <div class="result-info">
                    <p class="result-title">{{ movie.title }}</p>
                    <p class="result-year">{{ movie.release_date?.split('-')[0] || 'N/A' }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div v-if="selectedType === 'All' || selectedType === 'TV Shows'">
            <div v-if="searchResults.tv.length > 0" class="results-section">
              <h4 class="results-title">TV Shows</h4>
              <div class="results-list">
                <div v-for="show in searchResults.tv.slice(0, 5)" :key="show.id" class="result-item">
                  <img :src="getImageUrl(show.poster_path, 'w92')" :alt="show.name" class="result-poster" />
                  <div class="result-info">
                    <p class="result-title">{{ show.name }}</p>
                    <p class="result-year">{{ show.first_air_date?.split('-')[0] || 'N/A' }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div v-if="selectedType === 'All' || selectedType === 'People'">
            <div v-if="searchResults.people.length > 0" class="results-section">
              <h4 class="results-title">People</h4>
              <div class="results-list">
                <div v-for="person in searchResults.people.slice(0, 5)" :key="person.id" class="result-item">
                  <img :src="getImageUrl(person.profile_path, 'w92')" :alt="person.name" class="result-poster" />
                  <div class="result-info">
                    <p class="result-title">{{ person.name }}</p>
                    <p class="result-year">
                      {{ person.known_for_department || 'Actor' }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div v-if="!hasResults && !isLoading" class="no-results">No results found</div>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.search-bar {
  position: relative;
  display: flex;
  align-items: center;
  flex: 1;
  max-width: 100%;
  gap: 0;
  height: 2rem;
  margin: 0px 0.5rem;
}

.dropdown-wrapper {
  position: relative;
  height: 2rem;
}

.dropdown-button {
  display: flex;
  align-items: center;
  padding: 0px 0.25rem 0px 0.75rem;
  background-color: #fff;
  border: none;
  border-right: none;
  border-radius: 4px 0 0 4px;
  color: #000;
  font-size: 0.875rem;
  font-family: 'Roboto';
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  white-space: nowrap;
  height: 2rem;
}

.dropdown-icon {
  transition: transform 0.3s;
  color: var(--text-muted);
}

.dropdown-icon.open {
  transform: rotate(180deg);
}

.dropdown-menu {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  background-color: #fff;
  border-radius: 4px;
  min-width: 120px;
  z-index: 1000;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
  overflow: hidden;
}

.dropdown-item {
  display: block;
  width: 100%;
  padding: 0.75rem 1rem;
  text-align: left;
  background: none;
  border: none;
  color: #000;
  font-size: 0.875rem;
  font-family: 'Roboto';
  cursor: pointer;
  transition: background-color 0.2s;
}

.input-wrapper {
  position: relative;
  flex: 1;
  display: flex;
  align-items: center;
  height: 2rem;
}

.search-input {
  width: 100%;
  min-width: 200px;
  padding: 0.375em 0px 0.375rem 0.5rem;
  background-color: #fff;
  border: none;
  border-left: 1px solid #000;
  border-radius: 0 4px 4px 0;
  color: #000;
  font-size: 0.875rem;
  transition: all 0.3s;
  font-family: 'Roboto';
  font-weight: 400;
  height: 2rem;
}

.search-input:focus {
  outline: none;
}

.search-input::placeholder {
  color: var(--text-muted);
}

.search-icon {
  position: absolute;
  right: 0.75rem;
  color: var(--text-muted);
  pointer-events: none;
}

.search-results-dropdown {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  right: 0;
  background-color: var(--bg-secondary);
  border-radius: 4px;
  max-height: 500px;
  overflow-y: auto;
  z-index: 1000;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);
}

.search-loading {
  padding: 2rem;
  text-align: center;
  color: var(--text-muted);
}

.search-results-content {
  padding: 0.5rem 0;
}

.results-section {
  margin-bottom: 1rem;
}

.results-section:last-child {
  margin-bottom: 0;
}

.results-title {
  padding: 0.5rem 1rem;
  margin: 0;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.results-list {
  display: flex;
  flex-direction: column;
}

.results-list .result-item {
  border-top: 0.5px solid #e0e0e0;
}

.results-list .result-item:first-child {
  border-top: none;
}

.result-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.result-item:hover {
  background-color: var(--bg-tertiary);
}

.result-poster {
  width: 46px;
  height: 69px;
  object-fit: cover;
  border-radius: 4px;
  flex-shrink: 0;
}

.result-info {
  flex: 1;
  min-width: 0;
}

.result-title {
  margin: 0 0 0.25rem 0;
  color: var(--text-primary);
  font-size: 0.875rem;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.result-year {
  margin: 0;
  color: var(--text-muted);
  font-size: 0.75rem;
}

.no-results {
  padding: 2rem;
  text-align: center;
  color: var(--text-muted);
  font-size: 0.875rem;
}

.fade-scale-enter-active,
.fade-scale-leave-active {
  transition:
    opacity 0.15s ease,
    transform 0.15s ease;
}

.fade-scale-enter-from,
.fade-scale-leave-to {
  opacity: 0;
  transform: scale(0.98);
}
</style>
