import { PageHero } from '@/components/PageHero'
import { getSafeEmail, getSafePhone } from '@/lib/contact'
import { getSanityClient } from '@/sanity/lib/client'
import { SITE_SETTINGS_QUERY } from '@/sanity/lib/queries'

export const metadata = {
  title: 'Contact',
  description: 'Contact Konuko Foundation for partnerships, volunteering, donations or general enquiries.',
}

export const revalidate = 60

type SiteSettings = {
  mission?: string
  email?: string
  phone?: string
  donationNote?: string
}

export default async function ContactPage() {
  const client = getSanityClient()

  const settings: SiteSettings | null = client
    ? await client.fetch(SITE_SETTINGS_QUERY)
    : null

  const email = getSafeEmail(settings?.email)
  const phone = getSafePhone(settings?.phone)

  return (
    <main>

      <PageHero
        eyebrow="Contact"
        title="Let's talk about access and opportunity."
        intro="Use this page for partnership, support, volunteering and general foundation enquiries."
      />

      <section className="section">
        <div className="container contact-grid">

          {/* Contact info card */}
          <div className="contact-card">
            <p className="eyebrow">Get in Touch</p>

            <h2>
              <a href={`mailto:${email}`}>{email}</a>
            </h2>

            {phone && (
              <>
                <p className="eyebrow" style={{ marginTop: '24px' }}>Phone</p>
                <h3 style={{ color: 'white' }}>
                  <a href={`tel:${phone}`}>{phone}</a>
                </h3>
              </>
            )}

            <p style={{ marginTop: '24px' }}>
              Reach out for partnerships, volunteering, donations, educational
              support enquiries or general information about Konuko Foundation.
            </p>

            <div style={{ marginTop: '32px', paddingTop: '32px', borderTop: '1px solid rgba(255,255,255,.15)' }}>
              <p style={{ color: 'rgba(255,255,255,.55)', fontSize: '.88rem', margin: 0 }}>Response time</p>
              <p style={{ color: 'white', fontWeight: 600, margin: '4px 0 0' }}>We aim to reply within 2 business days.</p>
            </div>
          </div>

          {/* Contact form */}
          <form
            className="contact-form"
            action={`mailto:${email}`}
            method="post"
            encType="text/plain"
          >
            <h3 style={{ margin: '0 0 8px', fontFamily: 'var(--font-display)' }}>
              Send us a message
            </h3>
            <p style={{ color: 'var(--muted)', margin: '0 0 8px', fontSize: '.92rem' }}>
              Fill in the form below and we'll get back to you.
            </p>

            <label>
              Full name
              <input
                name="name"
                placeholder="Your full name"
                required
              />
            </label>

            <label>
              Email address
              <input
                name="email"
                type="email"
                placeholder="your@email.com"
                required
              />
            </label>

            <label>
              Reason for contact
              <select name="reason">
                <option>General enquiry</option>
                <option>Partnership</option>
                <option>Donation</option>
                <option>Volunteer</option>
                <option>Technology donation</option>
                <option>Education support</option>
              </select>
            </label>

            <label>
              Message
              <textarea
                name="message"
                rows={6}
                placeholder="Tell us how you'd like to help or what you need..."
                required
              />
            </label>

            <button className="btn btn-primary btn-lg" type="submit">
              Send enquiry →
            </button>
          </form>

        </div>
      </section>

    </main>
  )
}