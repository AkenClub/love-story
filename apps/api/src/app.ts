import { datasetVersion, loveLines } from '@love-story/dataset'
import type { ApiErrorResponse, LoveLineResponse } from '@love-story/shared'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { secureHeaders } from 'hono/secure-headers'
import { hasValidBearerToken } from './auth'
import {
  ConfigurationError,
  readRuntimeConfig,
  type RuntimeBindings,
} from './config'
import { secureRandomIndex } from './random'

type AppEnvironment = { Bindings: RuntimeBindings }

const app = new Hono<AppEnvironment>()

app.use('*', secureHeaders())
app.use(
  '/v1/*',
  cors({
    origin: '*',
    allowMethods: ['GET', 'OPTIONS'],
    allowHeaders: ['Authorization', 'Content-Type'],
    maxAge: 86_400,
  }),
)

app.get('/', (context) => {
  return context.json({
    name: 'love-story-api',
    version: 'v1',
    datasetVersion,
    endpoints: ['/v1/love-lines/random', '/healthz'],
  })
})

app.get('/healthz', (context) => {
  try {
    const config = readRuntimeConfig(context.env)
    return context.json({
      status: 'ok',
      authMode: config.authMode,
      datasetVersion,
      lineCount: loveLines.length,
    })
  } catch (error) {
    if (error instanceof ConfigurationError) {
      return context.json({ status: 'misconfigured', message: error.message }, 503)
    }
    throw error
  }
})

app.get('/v1/love-lines/random', async (context) => {
  let config
  try {
    config = readRuntimeConfig(context.env)
  } catch (error) {
    if (error instanceof ConfigurationError) {
      const response: ApiErrorResponse = {
        error: { code: 'service_misconfigured', message: error.message },
      }
      return context.json(response, 503)
    }
    throw error
  }

  if (config.authMode === 'required') {
    const valid = await hasValidBearerToken(context.req.header('Authorization'), config.apiKeys)
    if (!valid) {
      context.header('WWW-Authenticate', 'Bearer realm="love-story-api"')
      const response: ApiErrorResponse = {
        error: { code: 'unauthorized', message: 'A valid Bearer API key is required' },
      }
      return context.json(response, 401)
    }
  }

  const line = loveLines[secureRandomIndex(loveLines.length)]!
  const response: LoveLineResponse = {
    id: line.id,
    text: line.text,
    datasetVersion,
  }

  context.header('Cache-Control', 'no-store')
  context.header('X-Dataset-Version', datasetVersion)
  return context.json(response)
})

app.notFound((context) => {
  const response: ApiErrorResponse = {
    error: { code: 'not_found', message: 'The requested endpoint does not exist' },
  }
  return context.json(response, 404)
})

app.onError((error, context) => {
  console.error('Unhandled API error', error instanceof Error ? error.message : 'unknown error')
  const response: ApiErrorResponse = {
    error: { code: 'internal_error', message: 'An unexpected error occurred' },
  }
  return context.json(response, 500)
})

export default app
