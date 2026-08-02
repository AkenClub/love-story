<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  isPaused: boolean
  progress: number
  remainingSeconds: number
}>()

const emit = defineEmits<{
  next: []
  togglePause: []
}>()

const progressPercent = computed(() => Math.round(props.progress * 100))
</script>

<template>
  <div class="playback">
    <div
      class="progress-track"
      role="progressbar"
      aria-label="距离自动换一句"
      aria-valuemin="0"
      aria-valuemax="100"
      :aria-valuenow="progressPercent"
    >
      <span class="progress-fill" :style="{ transform: `scaleX(${progress})` }" />
    </div>

    <div class="control-row">
      <button
        class="control-button control-button-quiet"
        type="button"
        :aria-label="isPaused ? '继续自动切换' : '暂停自动切换'"
        @click="emit('togglePause')"
      >
        <svg
          v-if="isPaused"
          class="control-icon"
          viewBox="0 0 16 16"
          aria-hidden="true"
        >
          <path d="M5.15 3.45a.7.7 0 0 1 1.08-.59l6.15 4.55a.73.73 0 0 1 0 1.18l-6.15 4.55a.7.7 0 0 1-1.08-.59z" />
        </svg>
        <svg v-else class="control-icon" viewBox="0 0 16 16" aria-hidden="true">
          <rect x="3.75" y="3" width="3" height="10" rx="1" />
          <rect x="9.25" y="3" width="3" height="10" rx="1" />
        </svg>
        <span>{{ isPaused ? '继续' : `${remainingSeconds} 秒` }}</span>
      </button>

      <button class="control-button control-button-primary" type="button" @click="emit('next')">
        <span>换一句</span>
        <svg class="arrow" viewBox="0 0 20 20" aria-hidden="true">
          <path d="M3.5 10h12M11.5 5.75 15.75 10l-4.25 4.25" />
        </svg>
      </button>
    </div>
  </div>
</template>

<style scoped>
.playback {
  width: min(100% - 40px, 600px);
  margin-top: 24px;
}

.progress-track {
  height: 2px;
  overflow: hidden;
  border-radius: 999px;
  background: var(--color-line-soft);
}

.progress-fill {
  display: block;
  width: 100%;
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, var(--color-accent-soft), var(--color-accent));
  transform-origin: left center;
  transition: transform 100ms linear;
}

.control-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 18px;
}

.control-button {
  display: inline-flex;
  gap: 9px;
  align-items: center;
  justify-content: center;
  min-height: 44px;
  border-radius: 999px;
  cursor: pointer;
  font-family: inherit;
  font-size: 13px;
  letter-spacing: 0.08em;
  transition: border-color 180ms ease, background-color 180ms ease, color 180ms ease, transform 180ms ease;
}

.control-button:hover {
  transform: translateY(-2px);
}

.control-button-quiet {
  min-width: 92px;
  padding: 0 16px;
  border: 1px solid var(--color-line);
  background: var(--color-surface-soft);
  color: var(--color-muted);
}

.control-button-quiet:hover {
  border-color: var(--color-line-strong);
  color: var(--color-ink);
}

.control-button-primary {
  min-width: 126px;
  padding: 0 20px;
  border: 1px solid var(--color-accent);
  background: var(--color-accent);
  box-shadow: 0 9px 24px var(--color-accent-shadow);
  color: var(--color-on-accent);
}

.control-button-primary:hover {
  background: var(--color-accent-hover);
}

.control-icon {
  display: block;
  width: 14px;
  height: 14px;
  flex: 0 0 14px;
  fill: currentColor;
}

.arrow {
  display: block;
  width: 18px;
  height: 18px;
  flex: 0 0 18px;
  fill: none;
  stroke: currentColor;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 1.7;
  transition: transform 180ms ease;
}

.control-button-primary:hover .arrow {
  transform: translateX(3px);
}

@media (max-width: 600px) {
  .playback {
    width: calc(100% - 18px);
    margin-top: 20px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .progress-fill,
  .control-button,
  .arrow {
    transition-duration: 1ms;
  }
}
</style>
