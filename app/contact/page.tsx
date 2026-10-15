import { ContactForm } from '@/components/ContactForm'
import CTA from '@/components/CTA'
import { PageHero } from '@/components/PageHero'
import { getSafeEmail, getSafePhone } from '@/lib/contact'
import { getSanityClient } from '@/sanity/lib/client'
import { SITE_SETTINGS_QUERY } from '@/sanity/lib/queries'

export const revalidate = 60

type SiteSettings = {
  email?: string
  phone?: string
  ctaTitle?: string
  ctaText?: string
} | null

export default async function ContactPage() {
  const client = getSanityClient()
  const settings: SiteSettings = client
    ? await client.fetch(SITE_SETTINGS_QUERY, {}, { next: { revalidate: 60 } })
    : null
  const email = getSafeEmail(settings?.email)
  const phone = getSafePhone(settings?.phone)

  return (
    <>
      <PageHero
        eyebrow="GET IN TOUCH"
        title="Contact Us"
        intro="Have a question, partnership idea or want to support our work? We’d love to hear from you."
      />
      <section className="section">
        <div className="container contact-grid">
          <div>
            <h2>Send a Message</h2>
            <ContactForm />
          </div>
          <aside>
            <h2>Contact Information</h2>
            <div className="contact-card">
              ✉️ <div><b>Email</b><span>{email}</span></div>
            </div>
            {phone && (
              <div className="contact-card">
                📞 <div><b>Phone</b><span>{phone}</span></div>
              </div>
            )}
            <div className="contact-card">📍 <div><b>Address</b><span>Rongo, Kenya</span></div></div>
            <iframe
              className="contact-map"
              title="Konuko Foundation location at Konuko Homestead"
              src="https://www.google.com/maps?q=-0.6992548,34.6279423&z=16&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
            <a href="https://maps.app.goo.gl/YXTdTzHzd46X7mMy8" target="_blank" rel="noopener noreferrer">
              View location on Google Maps ↗
            </a>
          </aside>
        </div>
      </section>
      <CTA title={settings?.ctaTitle} text={settings?.ctaText} />
    </>
  )
}
