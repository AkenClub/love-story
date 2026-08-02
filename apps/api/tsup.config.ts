import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/node.ts'],
  format: ['esm'],
  target: 'node20',
  bundle: true,
  noExternal: [/.*/],
  clean: true,
  sourcemap: true,
})
