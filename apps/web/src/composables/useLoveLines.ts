import { computed, readonly, shallowRef } from 'vue'
import { loveLines } from '@love-story/dataset'

function randomIndex(length: number): number {
  if (length <= 1) return 0
  const value = new Uint32Array(1)
  crypto.getRandomValues(value)
  return value[0]! % length
}

export function useLoveLines() {
  const currentIndex = shallowRef(randomIndex(loveLines.length))
  const currentLine = computed(() => loveLines[currentIndex.value]!)

  function nextLine() {
    if (loveLines.length <= 1) return
    const offset = 1 + randomIndex(loveLines.length - 1)
    currentIndex.value = (currentIndex.value + offset) % loveLines.length
  }

  return {
    currentIndex: readonly(currentIndex),
    currentLine,
    total: loveLines.length,
    nextLine,
  }
}
