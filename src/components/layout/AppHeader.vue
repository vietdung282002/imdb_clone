<script setup>
import { RouterLink } from 'vue-router'
import { ref, onMounted, onUnmounted } from 'vue'
import SearchBar from '../common/SearchBar.vue'
import ThemeToggle from '../common/ThemeToggle.vue'

const tabs = [
  { name: 'Movies', route: '/movies' },
  { name: 'TV Shows', route: '/tv-shows' },
  { name: 'Celebs', route: '/celebs' },
  { name: 'Watch', route: '/watch' },
  { name: 'Awards', route: '/awards' },
  { name: 'Community', route: '/community' },
]

const activeTab = ref('Movies')
const searchQuery = ref('')
const selectedLanguage = ref('EN')
const isLanguageOpen = ref(false)

const languages = [{ code: 'EN', name: 'English' }]

const toggleLanguage = () => {
  isLanguageOpen.value = !isLanguageOpen.value
}

const selectLanguage = (lang) => {
  selectedLanguage.value = lang.code
  isLanguageOpen.value = false
}

const closeLanguage = (event) => {
  if (!event.target.closest('.language-dropdown')) {
    isLanguageOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', closeLanguage)
})

onUnmounted(() => {
  document.removeEventListener('click', closeLanguage)
})

const handleSearch = () => {}
</script>

<template>
  <header class="header">
    <div class="container">
      <div class="header-content">
        <RouterLink to="/" class="logo">
          <img src="@/assets/logo.svg" alt="Logo" />
        </RouterLink>

        <nav class="nav">
          <button
            v-for="tab in tabs"
            :key="tab.name"
            class="nav-link"
            :class="{ active: activeTab === tab.name }"
            @click="activeTab = tab.name"
          >
            {{ tab.name }}
          </button>
        </nav>

        <SearchBar v-model="searchQuery" @search="handleSearch" />

        <div class="header-actions">
          <button class="action-button">
            <img
              class="action-icon"
              src="@/assets/bookmark.svg"
              alt="Watchlist"
              width="14"
              height="18"
            />

            <span>Watchlist</span>
          </button>

          <button class="action-button">
            <img class="action-icon" src="@/assets/user.svg" alt="User" width="20" height="20" />

            <span>User</span>
          </button>

          <div class="language-dropdown">
            <button class="language-button" @click="toggleLanguage">
              <span>{{ selectedLanguage }}</span>
              <svg
                class="dropdown-icon"
                :class="{ open: isLanguageOpen }"
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
            <div v-if="isLanguageOpen" class="language-menu">
              <button
                v-for="lang in languages"
                :key="lang.code"
                class="language-item"
                :class="{ active: selectedLanguage === lang.code }"
                @click="selectLanguage(lang)"
              >
                {{ lang.code }} - {{ lang.name }}
              </button>
            </div>
          </div>
        </div>

        <ThemeToggle />
      </div>
    </div>
  </header>
</template>

<style scoped>
.header {
  background-color: #000;
  color: var(--text-primary);
  padding: 1rem 0;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  transition:
    background-color 0.3s,
    color 0.3s;
}

.container {
  max-width: 1500px;
  margin: 0 auto;
  padding: 0 1rem;
}

.header-content {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.logo {
  text-decoration: none;
  display: flex;
  align-items: center;
}

.logo img {
  height: 2rem;
  width: auto;
}

.nav {
  display: flex;
}

.nav-link {
  background: none;
  border: none;
  color: var(--text-secondary);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s;
  cursor: pointer;
  padding: 0.5rem 0.625rem;
  font-size: 1rem;
  font-family: 'Roboto';
}

.nav-link:hover,
.nav-link.active {
  color: var(--accent-color);
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.action-button {
  background: none;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  padding: 0.5rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: color 0.3s;
}

.action-icon {
  flex-shrink: 0;
}

.language-dropdown {
  position: relative;
}

.language-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0;
  background: none;
  border: none;
  color: var(--text-secondary);
  font-size: 1rem;
  font-family: 'Roboto';
  cursor: pointer;
  transition: color 0.3s;
}

.language-button:hover {
  color: var(--text-primary);
}

.dropdown-icon {
  transition: transform 0.3s;
  color: var(--text-muted);
}

.dropdown-icon.open {
  transform: rotate(180deg);
}

.language-menu {
  position: absolute;
  top: calc(100% + 4px);
  right: 0;
  background-color: var(--bg-secondary);
  border-radius: 4px;
  min-width: 160px;
  z-index: 1000;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
  overflow: hidden;
}

.language-item {
  display: block;
  width: 100%;
  padding: 0.75rem 1rem;
  text-align: left;
  background: none;
  border: none;
  color: var(--text-primary);
  font-size: 0.875rem;
  font-family: 'Roboto';
  cursor: pointer;
  transition: background-color 0.2s;
}

.language-item:hover {
  background-color: var(--bg-tertiary);
}

.language-item.active {
  color: var(--accent-color);
}
</style>
