export type AuthMode = 'required' | 'disabled'

export interface RuntimeBindings {
  AUTH_MODE?: string
  API_KEY?: string
  API_KEYS?: string
}

export interface RuntimeConfig {
  authMode: AuthMode
  apiKeys: readonly string[]
}

export class ConfigurationError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ConfigurationError'
  }
}

function nodeEnvironment(): Record<string, string | undefined> {
  return typeof process === 'undefined' ? {} : process.env
}

export function readRuntimeConfig(bindings?: RuntimeBindings): RuntimeConfig {
  const nodeEnv = nodeEnvironment()
  const rawMode = bindings?.AUTH_MODE ?? nodeEnv.AUTH_MODE ?? 'required'
  if (rawMode !== 'required' && rawMode !== 'disabled') {
    throw new ConfigurationError('AUTH_MODE must be either "required" or "disabled"')
  }

  const rawKeys = bindings?.API_KEYS ?? bindings?.API_KEY ?? nodeEnv.API_KEYS ?? nodeEnv.API_KEY ?? ''
  const apiKeys = [...new Set(rawKeys.split(',').map((key) => key.trim()).filter(Boolean))]

  if (rawMode === 'required' && apiKeys.length === 0) {
    throw new ConfigurationError('At least one API key is required when AUTH_MODE=required')
  }

  return { authMode: rawMode, apiKeys }
}
