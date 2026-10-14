import Link from 'next/link'
import { Logo } from './Logo'
import { getSafeEmail, getSafePhone } from '@/lib/contact'
import { getSanityClient } from '@/sanity/lib/client'
import { SITE_SETTINGS_QUERY } from '@/sanity/lib/queries'
import { NewsletterForm } from './NewsletterForm'

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
        { next: { revalidate: 60 } }
      )
    : null

  const mission =
    settings?.mission ||
    'Expanding access to education, technology and opportunity.'

  const email = getSafeEmail(settings?.email)
  const phone = getSafePhone(settings?.phone)

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">

          {/* Brand column */}
          <div>
            <Logo />
            <p className="footer-note">{mission}</p>

            {/* Social links */}
            <div className="footer-social">
              <a href="#" aria-label="Facebook" title="Facebook">f</a>
              <a href="#" aria-label="Twitter / X" title="Twitter">𝕏</a>
              <a href="#" aria-label="LinkedIn" title="LinkedIn">in</a>
              <a href="#" aria-label="Instagram" title="Instagram">ig</a>
            </div>
          </div>

          {/* Explore column */}
          <div>
            <h4>Explore</h4>
            <Link href="/about">About us</Link>
            <Link href="/programs">Programs</Link>
            <Link href="/impact">Our impact</Link>
            <Link href="/reports">Annual reports</Link>
          </div>

          {/* Take action column */}
          <div>
            <h4>Take Action</h4>
            <Link href="/get-involved">Get involved</Link>
            <Link href="/get-involved">Volunteer</Link>
            <Link href="/get-involved">Partner with us</Link>
            <Link href="/contact">Contact us</Link>
          </div>

          {/* Newsletter column */}
          <div>
            <h4>Stay Updated</h4>
            <p style={{ color: 'rgba(255,255,255,.55)', fontSize: '.9rem', lineHeight: '1.6', margin: '0' }}>
              Get updates on our programs, impact stories and annual reports.
            </p>
            <NewsletterForm />

            {/* Contact info */}
            {email && (
              <a href={`mailto:${email}`} style={{ color: 'rgba(255,255,255,.55)', fontSize: '.88rem' }}>
                {email}
              </a>
            )}
            {phone && (
              <a href={`tel:${phone}`} style={{ color: 'rgba(255,255,255,.55)', fontSize: '.88rem' }}>
                {phone}
              </a>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Konuko Foundation. All rights reserved.</span>
          <span>
            <Link href="/about">Privacy Policy</Link>
            {' · '}
            <Link href="/about">Terms</Link>
            {' · '}
            Education · Access · Opportunity
          </span>
        </div>
      </div>
    </footer>
  )
}