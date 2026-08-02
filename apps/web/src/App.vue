<script setup lang="ts">
import AmbientBackdrop from '@/components/AmbientBackdrop.vue'
import ThemeToggle from '@/components/ThemeToggle.vue'
import LoveStoryView from '@/components/love-story/LoveStoryView.vue'
import { useTheme } from '@/composables/useTheme'

const { isDark, toggleTheme } = useTheme()
</script>

<template>
  <div class="app-shell">
    <AmbientBackdrop />

    <header class="site-header">
      <a class="brand" href="./" aria-label="情笺首页">
        <span class="brand-mark" aria-hidden="true">♡</span>
        <span>情笺</span>
      </a>
      <ThemeToggle :is-dark="isDark" @toggle="toggleTheme" />
    </header>

    <main class="main-content">
      <LoveStoryView />
    </main>

    <footer class="site-footer">
      <span>一千多句情话，静静留在这一页</span>
      <span class="footer-separator" aria-hidden="true">·</span>
      <span>无需连接服务器</span>
    </footer>
  </div>
</template>

<style scoped>
.app-shell {
  position: relative;
  z-index: 0;
  display: grid;
  min-height: 100svh;
  grid-template-rows: auto 1fr auto;
  overflow: hidden;
}

.site-header {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: min(100% - 40px, 1180px);
  margin-inline: auto;
  padding-block: 28px;
}

.brand {
  display: inline-flex;
  gap: 10px;
  align-items: center;
  color: var(--color-ink);
  font-family: var(--font-serif);
  font-size: 18px;
  font-weight: 650;
  letter-spacing: 0.18em;
  text-decoration: none;
}

.brand-mark {
  display: grid;
  width: 31px;
  height: 31px;
  place-items: center;
  border: 1px solid var(--color-line-strong);
  border-radius: 50%;
  color: var(--color-accent);
  font-size: 17px;
  letter-spacing: 0;
}

.main-content {
  position: relative;
  z-index: 1;
  display: grid;
  place-items: center;
  width: 100%;
  padding: 36px 20px 48px;
}

.site-footer {
  position: relative;
  z-index: 2;
  display: flex;
  gap: 10px;
  justify-content: center;
  padding: 16px 24px 26px;
  color: var(--color-muted);
  font-size: 12px;
  letter-spacing: 0.08em;
  text-align: center;
}

.footer-separator {
  color: var(--color-accent-soft);
}

@media (max-width: 600px) {
  .site-header {
    width: min(100% - 28px, 1180px);
    padding-block: 18px;
  }

  .main-content {
    padding: 18px 14px 28px;
  }

  .site-footer {
    flex-wrap: wrap;
    padding-bottom: 20px;
  }
}
</style>
