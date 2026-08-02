<script setup lang="ts">
defineProps<{ isDark: boolean }>()
const emit = defineEmits<{ toggle: [] }>()
</script>

<template>
  <button
    class="theme-toggle"
    type="button"
    :aria-label="isDark ? '切换到浅色主题' : '切换到深色主题'"
    :title="isDark ? '切换到浅色主题' : '切换到深色主题'"
    @click="emit('toggle')"
  >
    <span class="theme-icon" aria-hidden="true">{{ isDark ? '☼' : '☾' }}</span>
  </button>
</template>

<style scoped>
.theme-toggle {
  display: grid;
  width: 42px;
  height: 42px;
  padding: 0;
  place-items: center;
  border: 1px solid var(--color-line);
  border-radius: 50%;
  background: var(--color-surface-soft);
  box-shadow: var(--shadow-small);
  color: var(--color-ink);
  cursor: pointer;
  transition: border-color 180ms ease, transform 180ms ease, background-color 300ms ease;
}

.theme-toggle:hover {
  border-color: var(--color-line-strong);
  transform: rotate(8deg);
}

.theme-icon {
  font-size: 19px;
  line-height: 1;
}
</style>
