import { describe, expect, it } from 'vitest'
import app from '../src/app'

describe('love story API', () => {
  it('fails closed when authentication is required without keys', async () => {
    const response = await app.request('/v1/love-lines/random', {}, { AUTH_MODE: 'required' })
    expect(response.status).toBe(503)
  })

  it('rejects a missing bearer token by default', async () => {
    const response = await app.request('/v1/love-lines/random', {}, { API_KEYS: 'lk_live_test' })
    expect(response.status).toBe(401)
  })

  it('accepts a configured bearer token', async () => {
    const response = await app.request(
      '/v1/love-lines/random',
      { headers: { Authorization: 'Bearer lk_live_test' } },
      { API_KEYS: 'lk_live_test' },
    )
    expect(response.status).toBe(200)
    await expect(response.json()).resolves.toMatchObject({
      id: expect.stringMatching(/^line_[a-f0-9]{12}$/),
      text: expect.any(String),
      datasetVersion: expect.stringMatching(/^[a-f0-9]{12}$/),
    })
  })

  it('allows anonymous access only when explicitly disabled', async () => {
    const response = await app.request(
      '/v1/love-lines/random',
      {},
      { AUTH_MODE: 'disabled' },
    )
    expect(response.status).toBe(200)
  })

  it('rejects unknown authentication modes', async () => {
    const response = await app.request(
      '/v1/love-lines/random',
      {},
      { AUTH_MODE: 'optional' },
    )
    expect(response.status).toBe(503)
  })
})
