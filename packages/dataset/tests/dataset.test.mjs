import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const data = await readFile(new URL('../../../data/love-lines.txt', import.meta.url), 'utf8')
const lines = data.trim().split('\n')

test('clean dataset remains valid and unique', () => {
  assert.equal(lines.length, 1108)
  assert.equal(new Set(lines).size, lines.length)
  assert.equal(lines.some((line) => /[\u200B\u200C\u200D\u2060\uFEFF]/u.test(line)), false)
  assert.equal(lines.some((line) => line !== line.trim()), false)
})
