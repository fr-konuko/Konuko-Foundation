import Link from 'next/link'
import { PageHero } from '@/components/PageHero'
import { getSanityClient } from '@/sanity/lib/client'
import { SITE_SETTINGS_QUERY } from '@/sanity/lib/queries'

export const metadata = {
  title: 'Get Involved',
}

export const dynamic = 'force-dynamic'

type SiteSettings = {
  mission?: string
  email?: string
  phone?: string
  donationNote?: string
}

export default async function GetInvolvedPage() {
  const client = getSanityClient()

  const settings: SiteSettings | null = client
    ? await client.fetch(SITE_SETTINGS_QUERY)
    : null

  const donationNote =
    settings?.donationNote ||
    'Support can be financial, practical or collaborative. Every contribution should respond to a real educational need.'

  return (
    <main>
      <PageHero
        eyebrow="Get involved"
        title="There is more than one way to help."
        intro="Support can be financial, practical or collaborative. The goal is to match useful resources with real educational needs."
      />

      <section className="section">
        <div className="container action-grid">
          <article>
            <span>01</span>

            <h2>Support education</h2>

            <p>
              Contribute toward verified school-fee and learning-support
              needs.
            </p>
          </article>

          <article>
            <span>02</span>

            <h2>Donate technology</h2>

            <p>
              Help provide suitable laptops, desktops or related equipment
              for learning.
            </p>
          </article>

          <article>
            <span>03</span>

            <h2>Partner with us</h2>

            <p>
              Work with the foundation on connectivity, training, devices
              or community learning initiatives.
            </p>
          </article>

          <article>
            <span>04</span>

            <h2>Volunteer skills</h2>

            <p>
              Offer mentorship, digital skills, career guidance or other
              educational expertise.
            </p>
          </article>
        </div>

        <div className="container center-cta">
          <p className="eyebrow">Support the foundation</p>

          <h2>Interested in supporting a project?</h2>

          <p className="donation-note">
            {donationNote}
          </p>

          <Link
            className="button"
            href="/contact"
          >
            Start a conversation
          </Link>
        </div>
      </section>
    </main>
  )
}