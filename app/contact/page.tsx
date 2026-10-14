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
            <form className="contact-form" action={`mailto:${email}`} method="post" encType="text/plain">
              <label>Full Name<input name="name" placeholder="Your name" required /></label>
              <label>Email<input name="email" type="email" placeholder="you@example.com" required /></label>
              <label>
                Subject
                <select name="subject">
                  <option>General Inquiry</option>
                  <option>Partnership</option>
                  <option>Volunteer</option>
                  <option>Donation</option>
                  <option>Program Inquiry</option>
                </select>
              </label>
              <label>Message<textarea name="message" rows={6} placeholder="Your message here..." required /></label>
              <button className="btn btn-primary" type="submit">Send Message →</button>
            </form>
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
            <div className="contact-card">📍 <div><b>Address</b><span>Kenya</span></div></div>
            <img
              className="contact-image"
              src="https://images.unsplash.com/photo-1489493512598-d08130f49bea?auto=format&fit=crop&w=800&q=80"
              alt="Community"
            />
          </aside>
        </div>
      </section>
      <CTA title={settings?.ctaTitle} text={settings?.ctaText} />
    </>
  )
}
