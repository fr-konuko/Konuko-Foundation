import Image from 'next/image'
import Link from 'next/link'

import { getSanityClient } from '@/sanity/lib/client'
import {
  PROGRAMS_QUERY,
  SITE_SETTINGS_QUERY,
  IMPACT_STATISTICS_QUERY,
} from '@/sanity/lib/queries'

export const revalidate = 60

type Program = {
  _id: string
  title: string
  summary?: string
  order?: number
  imageUrl?: string
  slug?: {
    current: string
  }
}

type ImpactStatistic = {
  _id: string
  value: string
  label: string
  description?: string
  order?: number
}

type SiteSettings = {
  mission?: string
  email?: string
  phone?: string
  donationNote?: string

  heroTitle?: string
  heroText?: string
  heroImageUrl?: string

  purposeTitle?: string

  featureTitle?: string
  featureText?: string
  featureImageUrl?: string

  impactTitle?: string
  impactText?: string

  ctaTitle?: string
  ctaText?: string
}

export default async function Home() {
  const client = getSanityClient()

  const programs: Program[] = client
    ? await client.fetch(
        PROGRAMS_QUERY,
        {},
          { next: { revalidate: 60 } }
      )
    : []

  const statistics: ImpactStatistic[] = client
    ? await client.fetch(
        IMPACT_STATISTICS_QUERY,
        {},
          { next: { revalidate: 60 } }
      )
    : []

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

  const heroTitle =
    settings?.heroTitle ||
    'Opening doors through education and technology.'

  const heroText =
    settings?.heroText ||
    'We help children and local learners access school support, the internet and the technology they need to learn, grow and participate in a digital world.'

  const heroImage =
    settings?.heroImageUrl ||
    'https://images.pexels.com/photos/34162714/pexels-photo-34162714.jpeg?auto=compress&cs=tinysrgb&w=1800'

  const purposeTitle =
    settings?.purposeTitle ||
    "Opportunity should not depend on a family's financial circumstances."

  const featureTitle =
    settings?.featureTitle ||
    'A connected learner has a wider classroom.'

  const featureText =
    settings?.featureText ||
    'Internet and device access can unlock research, applications, digital learning, skills development and exposure to opportunities far beyond the local community.'

  const featureImage =
    settings?.featureImageUrl ||
    'https://images.pexels.com/photos/5940714/pexels-photo-5940714.jpeg?auto=compress&cs=tinysrgb&w=1600'

  const impactTitle =
    settings?.impactTitle ||
    'Impact we can explain, not just claim.'

  const impactText =
    settings?.impactText ||
    'As projects launch, the foundation can publish verified annual figures, project updates and downloadable reports.'

  const ctaTitle =
    settings?.ctaTitle ||
    'Support a learner. Share a device. Build access.'

  const ctaText =
    settings?.ctaText ||
    'Konuko Foundation is at the beginning of its journey. We welcome people and organisations who want to help build sustainable educational opportunities.'

  return (
    <main>

      {/* HERO */}
      <section className="hero">
        <Image
          src={heroImage}
          alt="Konuko Foundation educational activities"
          fill
          priority
          className="hero-image"
        />

        <div className="hero-overlay" />

        <div className="container hero-content">
          <p className="eyebrow light">
            Konuko Foundation
          </p>

          <h1>{heroTitle}</h1>

          <p className="hero-copy">
            {heroText}
          </p>

          <div className="actions">
            <Link
              className="button"
              href="/programs"
            >
              Explore our programs
            </Link>

            <Link
              className="button button-ghost"
              href="/get-involved"
            >
              Get involved
            </Link>
          </div>
        </div>
      </section>


      {/* PURPOSE */}
      <section className="section mission-strip">
        <div className="container two-col">

          <div>
            <p className="eyebrow">
              Our purpose
            </p>

            <h2>
              {purposeTitle}
            </h2>
          </div>

          <div className="mission-copy">
            <p>
              {mission}
            </p>

            <p>
              Konuko Foundation brings family and community
              together around a shared commitment to educational
              empowerment and access to technology.
            </p>

            <Link
              href="/about"
              className="text-link"
            >
              Read our story →
            </Link>
          </div>

        </div>
      </section>


      {/* PROGRAMS */}
      <section className="section soft-bg">
        <div className="container">

          <div className="section-heading">
            <div>
              <p className="eyebrow">
                What we do
              </p>

              <h2>
                Creating practical pathways to opportunity.
              </h2>
            </div>

            <p>
              Our work focuses on removing practical barriers
              that keep learners from education, technology
              and digital opportunity.
            </p>
          </div>


          {programs.length > 0 ? (
            <div className="program-grid">

              {programs.map((program, index) => (
                <article
                  className="program-card"
                  key={program._id}
                >

                  <div className="program-image">
                    {program.imageUrl && (
                      <img
                        src={program.imageUrl}
                        alt={program.title}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          display: 'block',
                        }}
                      />
                    )}
                  </div>

                  <div className="program-body">

                    <span className="number-chip">
                      {String(index + 1).padStart(2, '0')}
                    </span>

                    <h3>
                      {program.title}
                    </h3>

                    {program.summary && (
                      <p>
                        {program.summary}
                      </p>
                    )}

                  </div>
                </article>
              ))}

            </div>
          ) : (
            <div className="empty-programs">
              <h3>
                Programs are coming soon.
              </h3>

              <p>
                Published programs from Sanity will appear here.
              </p>
            </div>
          )}

          <div
            style={{
              marginTop: '40px',
              textAlign: 'center',
            }}
          >
            <Link
              href="/programs"
              className="text-link"
            >
              View all programs →
            </Link>
          </div>

        </div>
      </section>


      {/* IMPACT */}
      <section className="section impact-band">

        <div className="container impact-layout">

          <div>
            <p className="eyebrow light">
              Growing responsibly
            </p>

            <h2>
              {impactTitle}
            </h2>

            <p>
              {impactText}
            </p>
          </div>


          <div className="impact-preview">

            {statistics.length > 0 ? (
              statistics.map((stat) => (
                <div key={stat._id}>
                  <strong>
                    {stat.value}
                  </strong>

                  <span>
                    {stat.label}
                  </span>
                </div>
              ))
            ) : (
              <>
                <div>
                  <strong>Annual</strong>
                  <span>Impact reporting</span>
                </div>

                <div>
                  <strong>Open</strong>
                  <span>Project updates</span>
                </div>

                <div>
                  <strong>Clear</strong>
                  <span>Use of support</span>
                </div>
              </>
            )}

            <Link
              href="/impact"
              className="button button-light"
            >
              View our impact
            </Link>

          </div>

        </div>
      </section>


      {/* DIGITAL ACCESS */}
      <section className="section">

        <div className="container feature-row">

          <div className="feature-image-wrap">
            <Image
              src={featureImage}
              alt="Learner using technology for education"
              fill
              className="cover"
            />
          </div>

          <div className="feature-copy">

            <p className="eyebrow">
              Access matters
            </p>

            <h2>
              {featureTitle}
            </h2>

            <p>
              {featureText}
            </p>

            <Link
              href="/programs"
              className="text-link"
            >
              See our digital access work →
            </Link>

          </div>

        </div>
      </section>


      {/* CTA */}
      <section className="section cta-section">

        <div className="container cta-card">

          <div>
            <p className="eyebrow light">
              Be part of the work
            </p>

            <h2>
              {ctaTitle}
            </h2>
          </div>

          <div>
            <p>
              {ctaText}
            </p>

            <Link
              href="/get-involved"
              className="button button-light"
            >
              Ways to get involved
            </Link>
          </div>

        </div>
      </section>

    </main>
  )
}