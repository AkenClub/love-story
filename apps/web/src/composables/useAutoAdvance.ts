import { computed, onMounted, onUnmounted, readonly, shallowRef } from 'vue'

interface UseAutoAdvanceOptions {
  durationMs?: number
  onAdvance: () => void
}

export function useAutoAdvance({ durationMs = 10_000, onAdvance }: UseAutoAdvanceOptions) {
  const prefersReducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches
  const isPaused = shallowRef(prefersReducedMotion)
  const remainingMs = shallowRef(durationMs)
  const progress = computed(() => Math.max(0, Math.min(1, 1 - remainingMs.value / durationMs)))
  const remainingSeconds = computed(() => Math.max(1, Math.ceil(remainingMs.value / 1000)))
  let timer: number | undefined
  let lastTick = performance.now()

  function restart() {
    remainingMs.value = durationMs
    lastTick = performance.now()
  }

  function togglePaused() {
    isPaused.value = !isPaused.value
    lastTick = performance.now()
  }

  function tick() {
    const now = performance.now()
    if (!isPaused.value && document.visibilityState === 'visible') {
      remainingMs.value -= now - lastTick
      if (remainingMs.value <= 0) {
        onAdvance()
        restart()
      }
    }
    lastTick = now
  }

  function syncVisibility() {
    lastTick = performance.now()
  }

  onMounted(() => {
    lastTick = performance.now()
    timer = window.setInterval(tick, 100)
    document.addEventListener('visibilitychange', syncVisibility)
  })

  onUnmounted(() => {
    if (timer !== undefined) window.clearInterval(timer)
    document.removeEventListener('visibilitychange', syncVisibility)
  })

  return {
    isPaused: readonly(isPaused),
    progress,
    remainingSeconds,
    restart,
    togglePaused,
  }
}
