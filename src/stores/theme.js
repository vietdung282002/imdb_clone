import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', () => {
  const isDark = ref(true)
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme) {
    isDark.value = savedTheme === 'dark'
  }

  const theme = computed(() => (isDark.value ? 'dark' : 'light'))

  function toggleTheme() {
    isDark.value = !isDark.value
    localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
    applyTheme()
  }

  function setTheme(mode) {
    isDark.value = mode === 'dark'
    localStorage.setItem('theme', mode)
    applyTheme()
  }

  function applyTheme() {
    const themeClass = isDark.value ? 'dark' : 'light'
    document.documentElement.classList.remove('dark', 'light')
    document.documentElement.classList.add(themeClass)
  }

  applyTheme()

  return {
    isDark,
    theme,
    toggleTheme,
    setTheme,
    applyTheme,
  }
})
