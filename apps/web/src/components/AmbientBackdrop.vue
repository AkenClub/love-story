<script setup lang="ts">
const motes = Array.from({ length: 12 }, (_, index) => index)
</script>

<template>
  <div class="backdrop" aria-hidden="true">
    <div class="orb orb-one" />
    <div class="orb orb-two" />
    <div class="orb orb-three" />
    <span v-for="mote in motes" :key="mote" class="mote" />
  </div>
</template>

<style scoped>
.backdrop {
  position: fixed;
  z-index: -1;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
}

.backdrop::before {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(var(--color-grid) 1px, transparent 1px),
    linear-gradient(90deg, var(--color-grid) 1px, transparent 1px);
  background-size: 64px 64px;
  content: '';
  mask-image: radial-gradient(circle at center, black 0%, transparent 76%);
  opacity: 0.28;
}

.orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(10px);
  opacity: var(--orb-opacity);
  animation: drift 16s ease-in-out infinite alternate;
}

.orb-one {
  top: 7%;
  left: -6%;
  width: 38vw;
  height: 38vw;
  background: var(--orb-one);
}

.orb-two {
  right: -7%;
  bottom: -12%;
  width: 42vw;
  height: 42vw;
  background: var(--orb-two);
  animation-delay: -5s;
  animation-duration: 19s;
}

.orb-three {
  top: 25%;
  right: 20%;
  width: 20vw;
  height: 20vw;
  background: var(--orb-three);
  animation-delay: -10s;
  animation-duration: 22s;
}

.mote {
  position: absolute;
  bottom: -30px;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: var(--color-mote);
  box-shadow: 0 0 12px var(--color-mote-glow);
  opacity: 0;
  animation: float-up 15s linear infinite;
}

.mote:nth-child(4n + 1) { left: 12%; animation-delay: -2s; }
.mote:nth-child(4n + 2) { left: 36%; animation-delay: -8s; animation-duration: 18s; }
.mote:nth-child(4n + 3) { left: 64%; animation-delay: -4s; animation-duration: 20s; }
.mote:nth-child(4n) { left: 86%; animation-delay: -12s; animation-duration: 17s; }

@keyframes drift {
  to { transform: translate3d(4vw, 3vh, 0) scale(1.08); }
}

@keyframes float-up {
  0% { transform: translate3d(0, 0, 0); opacity: 0; }
  12% { opacity: 0.62; }
  70% { opacity: 0.25; }
  100% { transform: translate3d(18px, -105vh, 0); opacity: 0; }
}

@media (prefers-reduced-motion: reduce) {
  .orb,
  .mote {
    animation: none;
  }
}
</style>
