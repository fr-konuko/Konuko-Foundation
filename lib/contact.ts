const DEFAULT_EMAIL = 'hello@konukofoundation.org'

export function getSafeEmail(value?: string) {
  const email = value?.trim()

  if (email && email.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return email
  }

  return DEFAULT_EMAIL
}

export function getSafePhone(value?: string) {
  const phone = value?.trim()

  if (!phone || !/^[+0-9().\s-]{7,32}$/.test(phone)) return undefined

  const digits = phone.replace(/\D/g, '')
  return digits.length >= 7 && digits.length <= 15 ? phone : undefined
}