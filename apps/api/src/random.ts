export function secureRandomIndex(length: number): number {
  if (!Number.isSafeInteger(length) || length <= 0) {
    throw new RangeError('length must be a positive safe integer')
  }

  const value = new Uint32Array(1)
  crypto.getRandomValues(value)
  return value[0]! % length
}
