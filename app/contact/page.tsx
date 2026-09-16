import { PageHero } from '@/components/PageHero'
import { getSafeEmail, getSafePhone } from '@/lib/contact'
import { getSanityClient } from '@/sanity/lib/client'
import { SITE_SETTINGS_QUERY } from '@/sanity/lib/queries'

export const metadata = {
  title: 'Contact',
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
        title="Let’s talk about access and opportunity."
        intro="Use this page for partnership, support, volunteering and general foundation enquiries."
      />

      <section className="section">
        <div className="container contact-grid">
          <div className="contact-card">
            <p className="eyebrow">Contact us</p>

            <h2>
              <a href={`mailto:${email}`}>
                {email}
              </a>
            </h2>

            {phone && (
              <>
                <p className="eyebrow">Phone</p>

                <h3>
                  <a href={`tel:${phone}`}>
                    {phone}
                  </a>
                </h3>
              </>
            )}

            <p>
              Reach out for partnerships, volunteering, donations,
              educational support enquiries or general information about
              Konuko Foundation.
            </p>
          </div>

          <form
            className="contact-form"
            action={`mailto:${email}`}
            method="post"
            encType="text/plain"
          >
            <label>
              Name
              <input
                name="name"
                required
              />
            </label>

            <label>
              Email
              <input
                name="email"
                type="email"
                required
              />
            </label>

            <label>
              Reason
              <select name="reason">
                <option>General enquiry</option>
                <option>Partnership</option>
                <option>Donation</option>
                <option>Volunteer</option>
                <option>Education support</option>
              </select>
            </label>

            <label>
              Message
              <textarea
                name="message"
                rows={6}
                required
              />
            </label>

            <button
              className="button"
              type="submit"
            >
              Send enquiry
            </button>
          </form>
        </div>
      </section>
    </main>
  )
}