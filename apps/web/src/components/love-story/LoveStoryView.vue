<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import LoveLineCard from './LoveLineCard.vue'
import PlaybackControls from './PlaybackControls.vue'
import { useAutoAdvance } from '@/composables/useAutoAdvance'
import { useClipboard } from '@/composables/useClipboard'
import { useLoveLines } from '@/composables/useLoveLines'

const { currentLine, total, nextLine } = useLoveLines()
const { copied, copyText } = useClipboard()
const { isPaused, progress, remainingSeconds, restart, togglePaused } = useAutoAdvance({
  onAdvance: nextLine,
})

function showNextLine() {
  nextLine()
  restart()
}

async function copyCurrentLine() {
  await copyText(currentLine.value.text)
}

function handleKeydown(event: KeyboardEvent) {
  if (event.altKey || event.ctrlKey || event.metaKey) return
  if (event.key === 'ArrowRight') showNextLine()
  if (event.key === ' ') {
    event.preventDefault()
    togglePaused()
  }
}

onMounted(() => window.addEventListener('keydown', handleKeydown))
onUnmounted(() => window.removeEventListener('keydown', handleKeydown))
</script>

<template>
  <section class="love-story" aria-labelledby="page-title">
    <div class="eyebrow">
      <span class="eyebrow-line" aria-hidden="true" />
      <span>LOVING WORDS · {{ total }}</span>
      <span class="eyebrow-line" aria-hidden="true" />
    </div>

    <div class="intro">
      <p class="intro-kicker">给平常日子的一点温柔</p>
      <h1 id="page-title" class="title">一些想说给你听的话</h1>
    </div>

    <LoveLineCard :line="currentLine" :copied="copied" @copy="copyCurrentLine" />

    <PlaybackControls
      :is-paused="isPaused"
      :progress="progress"
      :remaining-seconds="remainingSeconds"
      @next="showNextLine"
      @toggle-pause="togglePaused"
    />

    <p class="shortcut-hint">按空格暂停 · 按 → 换一句</p>
  </section>
</template>

<style scoped>
.love-story {
  display: flex;
  width: min(100%, 760px);
  flex-direction: column;
  align-items: center;
}

.eyebrow {
  display: flex;
  gap: 14px;
  align-items: center;
  color: var(--color-accent);
  font-family: var(--font-sans);
  font-size: 10px;
  font-weight: 650;
  letter-spacing: 0.22em;
}

.eyebrow-line {
  width: 28px;
  height: 1px;
  background: var(--color-accent-soft);
}

.intro {
  margin-top: 20px;
  text-align: center;
}

.intro-kicker {
  margin: 0 0 8px;
  color: var(--color-muted);
  font-size: 13px;
  letter-spacing: 0.18em;
}

.title {
  margin: 0;
  color: var(--color-ink);
  font-family: var(--font-serif);
  font-size: clamp(29px, 5vw, 48px);
  font-weight: 500;
  letter-spacing: 0.08em;
  line-height: 1.3;
}

.shortcut-hint {
  margin: 17px 0 0;
  color: var(--color-muted-light);
  font-size: 11px;
  letter-spacing: 0.08em;
}

@media (max-width: 600px) {
  .intro {
    margin-top: 14px;
  }

  .title {
    letter-spacing: 0.045em;
  }

  .shortcut-hint {
    display: none;
  }
}
</style>
