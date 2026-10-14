'use client'

import { useState, type FormEvent } from 'react'

export function ContactForm() {
  const [pending, setPending] = useState(false)
  const [message, setMessage] = useState('')
  const [failed, setFailed] = useState(false)

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    setPending(true)
    setMessage('')
    setFailed(false)
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      })
      const result = await response.json()
      if (!response.ok) throw new Error(result.error || 'Unable to send your message. Please try again.')
      setMessage('Thank you! Your message has been sent.')
      form.reset()
    } catch (error) {
      setFailed(true)
      setMessage(error instanceof Error ? error.message : 'Unable to send your message. Please try again.')
    } finally {
      setPending(false)
    }
  }

  return (
    <form className="contact-form" onSubmit={submit}>
      <label>Full Name<input name="name" placeholder="Your name" maxLength={200} required /></label>
      <label>Email<input name="email" type="email" placeholder="you@example.com" maxLength={254} required /></label>
      <label>Subject<select name="subject" required>
        <option>General Inquiry</option>
        <option>Partnership</option>
        <option>Volunteer</option>
        <option>Donation</option>
        <option>Program Inquiry</option>
      </select></label>
      <label>Message<textarea name="message" rows={6} placeholder="Your message here..." maxLength={5000} required /></label>
      <div hidden aria-hidden="true"><input name="website" tabIndex={-1} autoComplete="off" /></div>
      <button className="btn btn-primary" type="submit" disabled={pending}>{pending ? 'Sending…' : 'Send Message →'}</button>
      <p role={failed ? 'alert' : 'status'} aria-live="polite">{message}</p>
    </form>
  )
}
