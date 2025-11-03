<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'

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
let debounceTimer = null

const searchTypes = [
  { value: 'All', label: 'All' },
  { value: 'Movies', label: 'Movies' },
  { value: 'TV Shows', label: 'TV Shows' },
  { value: 'People', label: 'People' },
]

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value
}

const selectType = (type) => {
  selectedType.value = type.label
  isDropdownOpen.value = false
  emit('type-change', type.value)
}

const closeDropdown = (event) => {
  if (!event.target.closest('.search-bar')) {
    isDropdownOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', closeDropdown)
})

onUnmounted(() => {
  document.removeEventListener('click', closeDropdown)
})

watch(searchQuery, (newValue) => {
  emit('update:modelValue', newValue)

  if (debounceTimer) {
    clearTimeout(debounceTimer)
  }

  debounceTimer = setTimeout(() => {
    if (newValue.trim()) {
      emit('search', newValue.trim(), selectedType.value)
    } else {
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
        <svg
          class="dropdown-icon"
          :class="{ open: isDropdownOpen }"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>
      <div v-if="isDropdownOpen" class="dropdown-menu">
        <button
          v-for="type in searchTypes"
          :key="type.value"
          class="dropdown-item"
          :class="{ active: selectedType === type.label }"
          @click="selectType(type)"
        >
          {{ type.label }}
        </button>
      </div>
    </div>
    <div class="input-wrapper">
      <input v-model="searchQuery" type="text" class="search-input" placeholder="Search IMDb" />
      <svg
        class="search-icon"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_search)">
          <path
            d="M15.5006 14.0006H14.7106L14.4306 13.7306C15.6306 12.3306 16.2506 10.4206 15.9106 8.39063C15.4406 5.61063 13.1206 3.39063 10.3206 3.05063C6.09063 2.53063 2.53063 6.09063 3.05063 10.3206C3.39063 13.1206 5.61063 15.4406 8.39063 15.9106C10.4206 16.2506 12.3306 15.6306 13.7306 14.4306L14.0006 14.7106V15.5006L18.2506 19.7506C18.6606 20.1606 19.3306 20.1606 19.7406 19.7506C20.1506 19.3406 20.1506 18.6706 19.7406 18.2606L15.5006 14.0006ZM9.50063 14.0006C7.01063 14.0006 5.00063 11.9906 5.00063 9.50063C5.00063 7.01063 7.01063 5.00063 9.50063 5.00063C11.9906 5.00063 14.0006 7.01063 14.0006 9.50063C14.0006 11.9906 11.9906 14.0006 9.50063 14.0006Z"
            fill="currentColor"
          />
        </g>
        <defs>
          <clipPath id="clip0_search">
            <rect width="24" height="24" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  </div>
</template>

<style scoped>
.search-bar {
  position: relative;
  display: flex;
  align-items: center;
  flex: 1;
  max-width: 500px;
  gap: 0;
}

.dropdown-wrapper {
  position: relative;
}

.dropdown-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  background-color: #1a1a1a;
  border: none;
  border-right: none;
  border-radius: 10px 0 0 10px;
  color: #fff;
  font-size: 0.875rem;
  font-family: 'Roboto';
  cursor: pointer;
  transition: all 0.3s;
  white-space: nowrap;
}

.dropdown-icon {
  transition: transform 0.3s;
  color: #999;
}

.dropdown-icon.open {
  transform: rotate(180deg);
}

.dropdown-menu {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  background-color: #1a1a1a;
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
  color: #fff;
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
}

.search-input {
  width: 100%;
  min-width: 200px;
  padding: 0.5rem 2.5rem 0.5rem 1rem;
  background-color: #1a1a1a;
  border: none;
  border-left: none;
  border-radius: 0 10px 10px 0;
  color: #fff;
  font-size: 0.875rem;
  transition: all 0.3s;
  font-family: 'Roboto';
}

.search-input:focus {
  outline: none;
}

.search-input::placeholder {
  color: #666;
}

.search-icon {
  position: absolute;
  right: 0.75rem;
  color: #666;
  pointer-events: none;
}
</style>
