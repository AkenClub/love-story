import { serve } from '@hono/node-server'
import { readFileSync } from 'node:fs'
import { loadEnvFile } from 'node:process'
import { fileURLToPath } from 'node:url'
import app from './app'

try {
  // Resolve apps/api/.env from this module, independent of the shell's cwd.
  loadEnvFile(fileURLToPath(new URL('../.env', import.meta.url)))
} catch (error) {
  if (!(error instanceof Error && 'code' in error && error.code === 'ENOENT')) {
    throw error
  }
}

const apiKeysFile = process.env.API_KEYS_FILE
if (apiKeysFile) {
  process.env.API_KEYS = readFileSync(apiKeysFile, 'utf8').trim()
}

const port = Number.parseInt(process.env.PORT ?? '3000', 10)
if (!Number.isInteger(port) || port < 1 || port > 65_535) {
  throw new Error('PORT must be an integer between 1 and 65535')
}

const server = serve({ fetch: app.fetch, port })
console.log(`Love Story API listening on http://localhost:${port}`)

function shutdown() {
  server.close((error) => {
    if (error) {
      console.error(error)
      process.exitCode = 1
    }
  })
}

process.on('SIGINT', shutdown)
process.on('SIGTERM', shutdown)
