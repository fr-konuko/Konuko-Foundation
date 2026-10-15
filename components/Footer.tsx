import Link from 'next/link'
import Image from 'next/image'
import { getSafeEmail, getSafePhone } from '@/lib/contact'
import { getSanityClient } from '@/sanity/lib/client'
import { SITE_SETTINGS_QUERY } from '@/sanity/lib/queries'

type SiteSettings = {
  mission?: string
  email?: string
  phone?: string
}

export async function Footer() {
  const client = getSanityClient()
  const settings: SiteSettings | null = client
    ? await client.fetch(SITE_SETTINGS_QUERY, {}, { next: { revalidate: 60 } })
    : null
  const email = getSafeEmail(settings?.email)
  const phone = getSafePhone(settings?.phone)

  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <Link href="/" className="brand light" aria-label="Konuko Foundation home">
            <Image
              src="/images/konuko-foundation-unity-logo.png"
              alt="Konuko Foundation"
              width={1976}
              height={796}
              sizes="(max-width: 900px) 127.5px, 161.25px"
              className="brand-logo"
            />
          </Link>
          <p>{settings?.mission || 'Creating opportunity through education, skills and community support.'}</p>
          {email && <a href={`mailto:${email}`}>{email}</a>}
          {phone && <a href={`tel:${phone}`}>{phone}</a>}
        </div>
        <div>
          <h4>Organization</h4>
          <Link href="/about">About Us</Link>
          <Link href="/volunteer">Volunteer</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/donate">Donate</Link>
        </div>
        <div>
          <h4>Resources</h4>
          <Link href="/transparency">Transparency</Link>
          <Link href="/gallery">Gallery</Link>
          <Link href="/transparency">Reports</Link>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} Konuko Foundation. All rights reserved.</span>
        <span>Privacy · Terms</span>
      </div>
    </footer>
  )
}
