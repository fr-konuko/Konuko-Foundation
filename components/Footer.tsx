import Link from 'next/link'
import { Logo } from './Logo'
import { getSanityClient } from '@/sanity/lib/client'
import { SITE_SETTINGS_QUERY } from '@/sanity/lib/queries'

type SiteSettings = {
  mission?: string
  email?: string
  phone?: string
  donationNote?: string
}

export async function Footer() {
  const client = getSanityClient()

  const settings: SiteSettings | null = client
    ? await client.fetch(
        SITE_SETTINGS_QUERY,
        {},
        { cache: 'no-store' }
      )
    : null

  const mission =
    settings?.mission ||
    'Expanding access to education, technology and opportunity.'

  const email =
    settings?.email ||
    'hello@konukofoundation.org'

  const phone = settings?.phone

  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <Logo />

          <p className="footer-note">
            {mission}
          </p>
        </div>

        <div>
          <h4>Explore</h4>

          <Link href="/about">
            About us
          </Link>

          <Link href="/programs">
            Programs
          </Link>

          <Link href="/impact">
            Impact
          </Link>

          <Link href="/reports">
            Annual reports
          </Link>
        </div>

        <div>
          <h4>Take action</h4>

          <Link href="/get-involved">
            Get involved
          </Link>

          <Link href="/contact">
            Contact
          </Link>

          <a href={`mailto:${email}`}>
            {email}
          </a>

          {phone && (
            <a href={`tel:${phone}`}>
              {phone}
            </a>
          )}
        </div>
      </div>

      <div className="container footer-bottom">
        <span>
          © {new Date().getFullYear()} Konuko Foundation
        </span>

        <span>
          Education • Access • Opportunity
        </span>
      </div>
    </footer>
  )
}