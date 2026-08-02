const encoder = new TextEncoder()

function extractBearerToken(header: string | undefined): string | undefined {
  if (!header) return undefined
  const match = /^Bearer\s+(.+)$/i.exec(header.trim())
  return match?.[1]
}

async function digest(value: string): Promise<Uint8Array> {
  const result = await crypto.subtle.digest('SHA-256', encoder.encode(value))
  return new Uint8Array(result)
}

function constantTimeEqual(left: Uint8Array, right: Uint8Array): boolean {
  if (left.length !== right.length) return false
  let difference = 0
  for (let index = 0; index < left.length; index += 1) {
    difference |= left[index]! ^ right[index]!
  }
  return difference === 0
}

export async function hasValidBearerToken(
  authorization: string | undefined,
  acceptedKeys: readonly string[],
): Promise<boolean> {
  const token = extractBearerToken(authorization)
  if (!token) return false

  const tokenDigest = await digest(token)
  const acceptedDigests = await Promise.all(acceptedKeys.map(digest))
  return acceptedDigests.some((accepted) => constantTimeEqual(tokenDigest, accepted))
}
