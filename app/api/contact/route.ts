export async function POST(request: Request) {
  const origin = request.headers.get('origin')
  if (origin && origin !== new URL(request.url).origin) {
    return Response.json({ error: 'Invalid request origin.' }, { status: 403 })
  }
  let data: Record<string, unknown>
  try {
    data = await request.json()
    if (!data || typeof data !== 'object' || Array.isArray(data)) throw new Error('Invalid body')
  } catch {
    return Response.json({ error: 'Invalid message.' }, { status: 400 })
  }
  if (data.website) return Response.json({ error: 'Unable to send this message.' }, { status: 400 })
  const limits = { name: 200, email: 254, subject: 200, message: 5000 }
  const fields: Record<string, string> = {}
  for (const [key, limit] of Object.entries(limits)) {
    const value = data[key]
    if (typeof value !== 'string' || !value.trim() || value.length > limit) {
      return Response.json({ error: 'Please complete all fields within the allowed length.' }, { status: 400 })
    }
    fields[key] = value.trim()
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
    return Response.json({ error: 'Please enter a valid email address.' }, { status: 400 })
  }
  const endpoint = process.env.GOOGLE_CONTACT_SCRIPT_URL
  const secret = process.env.GOOGLE_CONTACT_SCRIPT_SECRET
  if (!endpoint || !secret) {
    return Response.json({ error: 'Online messaging is not available yet. Please use the email or phone listed on this page.' }, { status: 503 })
  }
  try {
    const url = new URL(endpoint)
    if (url.protocol !== 'https:' || url.hostname !== 'script.google.com' || !url.pathname.endsWith('/exec')) throw new Error('Invalid endpoint')
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...fields, secret }),
      signal: AbortSignal.timeout(20000),
      cache: 'no-store',
    })
    const result = await response.json()
    if (!response.ok || result.ok !== true) throw new Error('Submission failed')
    return Response.json({ ok: true })
  } catch {
    return Response.json({ error: 'We could not confirm your submission. Please contact us by email or phone before retrying.' }, { status: 502 })
  }
}
