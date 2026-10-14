import Link from 'next/link'
import { PageHero } from '@/components/PageHero'
import { getSanityClient } from '@/sanity/lib/client'
import { SITE_SETTINGS_QUERY } from '@/sanity/lib/queries'

export const metadata = {
  title: 'Get Involved',
  description: 'Find out how to support Konuko Foundation through donations, volunteering or partnerships.',
}

export const revalidate = 60

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
        eyebrow="Get Involved"
        title="There is more than one way to help."
        intro="Support can be financial, practical or collaborative. The goal is to match useful resources with real educational needs."
      />


      {/* HOW TO HELP */}
      <section className="section">
        <div className="container">
          <div className="section-head text-center" style={{ marginBottom: '56px' }}>
            <p className="eyebrow" style={{ justifyContent: 'center' }}>Ways to Contribute</p>
            <h2 style={{ maxWidth: '600px', margin: '0 auto 16px' }}>
              Choose how you want to make a difference.
            </h2>
          </div>

          <div className="action-grid">
            <article>
              <span>01</span>
              <h2>Support education</h2>
              <p>Contribute toward verified school-fee and learning-support needs.</p>
            </article>

            <article>
              <span>02</span>
              <h2>Donate technology</h2>
              <p>Help provide suitable laptops, desktops or related equipment for learning.</p>
            </article>

            <article>
              <span>03</span>
              <h2>Partner with us</h2>
              <p>Work with the foundation on connectivity, training, devices or community learning initiatives.</p>
            </article>

            <article>
              <span>04</span>
              <h2>Volunteer skills</h2>
              <p>Offer mentorship, digital skills, career guidance or other educational expertise.</p>
            </article>
          </div>
        </div>
      </section>


      {/* HOW IT WORKS */}
      <section className="section soft-bg">
        <div className="container">
          <div className="section-head text-center" style={{ marginBottom: '48px' }}>
            <p className="eyebrow" style={{ justifyContent: 'center' }}>How It Works</p>
            <h2 style={{ maxWidth: '560px', margin: '0 auto 16px' }}>
              Simple, transparent and direct.
            </h2>
            <p className="lead" style={{ margin: '0 auto' }}>
              Every form of support is directed to verified, specific needs within our community programs.
            </p>
          </div>

          <div className="help-grid">
            <div className="help-tile">
              <div className="help-icon" aria-hidden="true">📋</div>
              <h3>1. Connect with Us</h3>
              <p>Reach out through our contact form. We'll discuss what support you can offer and where it fits best.</p>
            </div>
            <div className="help-tile">
              <div className="help-icon" aria-hidden="true">🔍</div>
              <h3>2. Match to a Need</h3>
              <p>We identify verified, specific needs in our programs and match your support directly to them.</p>
            </div>
            <div className="help-tile">
              <div className="help-icon" aria-hidden="true">📊</div>
              <h3>3. See the Impact</h3>
              <p>We report back on what was done, how resources were used, and what changed for learners.</p>
            </div>
          </div>
        </div>
      </section>


      {/* DONATION NOTE + CTA */}
      <section className="section cta-section">
        <div className="container">
          <div className="cta-card">
            <div>
              <p className="eyebrow">Support the Foundation</p>
              <h2>Interested in supporting a project?</h2>
            </div>
            <div>
              <p className="donation-note" style={{ margin: '0 0 28px', color: 'rgba(255,255,255,.78)' }}>
                {donationNote}
              </p>
              <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                <Link href="/contact" className="btn btn-accent btn-lg">
                  Start a conversation
                </Link>
                <Link href="/about" className="btn btn-outline btn-lg">
                  Learn about us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  )
}