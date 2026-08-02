<script setup lang="ts">
import type { LoveLine } from '@love-story/dataset'

defineProps<{
  line: LoveLine
  copied: boolean
}>()

const emit = defineEmits<{ copy: [] }>()
</script>

<template>
  <article class="line-card">
    <span class="card-flourish" aria-hidden="true">“</span>

    <Transition name="line-change" mode="out-in">
      <p :key="line.id" class="line-text" aria-live="polite">{{ line.text }}</p>
    </Transition>

    <div class="card-footer">
      <span class="line-id">{{ line.id.replace('line_', 'NO. ') }}</span>
      <button
        class="copy-button"
        :class="{ 'copy-button-copied': copied }"
        type="button"
        :aria-label="copied ? '已复制情话' : '复制这句情话'"
        @click="emit('copy')"
      >
        <span aria-hidden="true">{{ copied ? '✓' : '⧉' }}</span>
        <span>{{ copied ? '已复制' : '复制' }}</span>
      </button>
    </div>
  </article>
</template>

<style scoped>
.line-card {
  position: relative;
  display: flex;
  width: 100%;
  min-height: 290px;
  flex-direction: column;
  justify-content: center;
  margin-top: clamp(30px, 6vh, 58px);
  padding: clamp(38px, 7vw, 66px) clamp(30px, 8vw, 72px) 30px;
  overflow: hidden;
  border: 1px solid var(--color-line);
  border-radius: 30px;
  background:
    radial-gradient(circle at 15% 10%, var(--paper-light) 0 1px, transparent 1.5px) 0 0 / 18px 18px,
    var(--color-surface);
  box-shadow: var(--shadow-card);
  backdrop-filter: blur(18px);
}

.line-card::after {
  position: absolute;
  right: -52px;
  bottom: -52px;
  width: 150px;
  height: 150px;
  border: 1px solid var(--color-line-soft);
  border-radius: 50%;
  box-shadow: 0 0 0 24px var(--color-ring), 0 0 0 48px var(--color-ring);
  content: '';
}

.card-flourish {
  position: absolute;
  top: 26px;
  left: 34px;
  color: var(--color-accent-soft);
  font-family: Georgia, serif;
  font-size: 62px;
  line-height: 1;
  opacity: 0.62;
}

.line-text {
  position: relative;
  z-index: 1;
  max-width: 610px;
  margin: auto;
  color: var(--color-ink);
  font-family: var(--font-serif);
  font-size: clamp(21px, 3.3vw, 30px);
  font-weight: 480;
  letter-spacing: 0.045em;
  line-height: 1.9;
  text-align: center;
  text-wrap: balance;
}

.card-footer {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 34px;
  padding-top: 20px;
  border-top: 1px solid var(--color-line-soft);
}

.line-id {
  color: var(--color-muted-light);
  font-family: var(--font-sans);
  font-size: 9px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.copy-button {
  display: inline-flex;
  gap: 7px;
  align-items: center;
  padding: 7px 10px;
  border: 0;
  border-radius: 8px;
  background: transparent;
  color: var(--color-muted);
  cursor: pointer;
  font-family: inherit;
  font-size: 12px;
  transition: color 180ms ease, background-color 180ms ease, transform 180ms ease;
}

.copy-button:hover {
  background: var(--color-accent-wash);
  color: var(--color-accent);
  transform: translateY(-1px);
}

.copy-button-copied {
  color: var(--color-accent);
}

.line-change-enter-active,
.line-change-leave-active {
  transition: opacity 280ms ease, transform 280ms ease;
}

.line-change-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.line-change-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

@media (max-width: 600px) {
  .line-card {
    min-height: 270px;
    margin-top: 28px;
    padding: 42px 24px 22px;
    border-radius: 24px;
  }

  .card-flourish {
    top: 19px;
    left: 22px;
    font-size: 52px;
  }

  .line-text {
    line-height: 1.8;
  }

  .card-footer {
    margin-top: 24px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .line-change-enter-active,
  .line-change-leave-active {
    transition-duration: 1ms;
  }
}
</style>
