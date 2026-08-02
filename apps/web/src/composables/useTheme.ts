import { onMounted, onUnmounted, readonly, shallowRef } from 'vue'

const STORAGE_KEY = 'love-story-theme'

export function useTheme() {
  const media = matchMedia('(prefers-color-scheme: dark)')
  const saved = localStorage.getItem(STORAGE_KEY)
  const isDark = shallowRef(saved ? saved === 'dark' : media.matches)

  function applyTheme() {
    document.documentElement.dataset.theme = isDark.value ? 'dark' : 'light'
  }

  function toggleTheme() {
    isDark.value = !isDark.value
    localStorage.setItem(STORAGE_KEY, isDark.value ? 'dark' : 'light')
    applyTheme()
  }

  function syncSystemTheme(event: MediaQueryListEvent) {
    if (localStorage.getItem(STORAGE_KEY)) return
    isDark.value = event.matches
    applyTheme()
  }

  onMounted(() => {
    applyTheme()
    media.addEventListener('change', syncSystemTheme)
  })

  onUnmounted(() => media.removeEventListener('change', syncSystemTheme))

  return { isDark: readonly(isDark), toggleTheme }
}
