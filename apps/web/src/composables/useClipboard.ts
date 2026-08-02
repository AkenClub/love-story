import { onUnmounted, readonly, shallowRef } from 'vue'

export function useClipboard() {
  const copied = shallowRef(false)
  let resetTimer: number | undefined

  async function copyText(text: string) {
    await navigator.clipboard.writeText(text)
    copied.value = true
    if (resetTimer !== undefined) window.clearTimeout(resetTimer)
    resetTimer = window.setTimeout(() => {
      copied.value = false
    }, 1600)
  }

  onUnmounted(() => {
    if (resetTimer !== undefined) window.clearTimeout(resetTimer)
  })

  return { copied: readonly(copied), copyText }
}
