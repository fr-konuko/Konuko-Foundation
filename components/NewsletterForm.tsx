'use client'

export function NewsletterForm() {
  return (
    <form
      className="newsletter-form"
      onSubmit={(e) => {
        e.preventDefault()
        // TODO: wire up newsletter submission
      }}
    >
      <input
        type="email"
        className="newsletter-input"
        placeholder="Enter your email"
        aria-label="Email address for newsletter"
      />
      <button type="submit" className="btn btn-primary btn-sm">
        Subscribe
      </button>
    </form>
  )
}
