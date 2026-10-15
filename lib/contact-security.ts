// A local safeguard; the Apps Script quota additionally spans server instances.
const windowMs = 10 * 60 * 1000
const senders = new Map<string, { count: number; expires: number }>()
let globalWindow = { count: 0, expires: 0 }

export function allowContactRequest(now = Date.now()) {
  if (now >= globalWindow.expires) globalWindow = { count: 0, expires: now + 60000 }
  return ++globalWindow.count <= 120
}

export function allowContactSender(email: string, now = Date.now()) {
  for (const [key, entry] of senders) if (now >= entry.expires) senders.delete(key)
  const key = email.toLowerCase()
  let entry = senders.get(key)
  if (!entry) {
    if (senders.size >= 10000) return false
    entry = { count: 0, expires: now + windowMs }
    senders.set(key, entry)
  }
  return ++entry.count <= 5
}

export class ContactBodyError extends Error {
  constructor(public status: number, message: string) { super(message) }
}

export async function readContactBody(request: Request): Promise<unknown> {
  if (request.headers.get('content-type')?.split(';')[0].trim().toLowerCase() !== 'application/json') {
    throw new ContactBodyError(415, 'Please send JSON content.')
  }
  const maxBytes = 32768
  const length = request.headers.get('content-length')
  if (length && (!/^\d+$/.test(length) || Number(length) > maxBytes)) {
    throw new ContactBodyError(413, 'Message is too large.')
  }
  if (!request.body) throw new ContactBodyError(400, 'Invalid message.')
  const reader = request.body.getReader()
  let timer: ReturnType<typeof setTimeout> | undefined
  const timeout = new Promise<never>((_, reject) => {
    timer = setTimeout(() => reject(new ContactBodyError(408, 'Message upload timed out.')), 10000)
  })
  try {
    const decoder = new TextDecoder('utf-8', { fatal: true })
    let bytes = 0
    let body = ''
    while (true) {
      const { done, value } = await Promise.race([reader.read(), timeout])
      if (done) break
      bytes += value.byteLength
      if (bytes > maxBytes) throw new ContactBodyError(413, 'Message is too large.')
      body += decoder.decode(value, { stream: true })
    }
    return JSON.parse(body + decoder.decode())
  } finally {
    clearTimeout(timer)
    void reader.cancel().catch(() => {})
  }
}
