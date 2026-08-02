import { randomBytes } from 'node:crypto'

const apiKey = `lk_live_${randomBytes(32).toString('base64url')}`

console.log(apiKey)
