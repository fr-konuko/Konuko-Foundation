import { PageHero } from '@/components/PageHero'
import Link from 'next/link'
import { getSanityClient } from '@/sanity/lib/client'
import { FOUNDERS_QUERY } from '@/sanity/lib/queries'

export const metadata = {
  title: 'About Us',
  description: 'Learn about Konuko Foundation — a family-led NGO expanding access to education and technology.',
}

export const revalidate = 60

type Founder = {
  _id: string
  name: string
  role?: string
  bio?: string
  order?: number
  photoUrl?: string
}

export default async function AboutPage() {
  const client = getSanityClient()
  const founders: Founder[] = client ? await client.fetch(FOUNDERS_QUERY) : []

  return (
    <main>

      {/* HERO */}
      <PageHero
        eyebrow="About us"
        title="A family idea built around shared responsibility."
        intro="Konuko Foundation was formed by a family committed to turning access to education and technology into practical opportunities for children and local communities."
      />


      {/* MISSION */}
      <section className="section">
        <div className="container two-col align-start">

          <div>
            <p className="eyebrow">Our Mission</p>
            <h2>Expand access to education, technology and digital opportunity.</h2>
          </div>

          <div className="prose">
            <p>
              Our first priorities are school-fee support for needy students,
              internet access for educational use, and access to computers and
              laptops for local children.
            </p>
            <p>
              As the foundation develops, we expect the work to grow into new
              programs while keeping the same principle: practical support that
              makes learning more accessible.
            </p>
            <Link href="/programs" className="text-link" style={{ marginTop: '8px', display: 'inline-flex' }}>
              See our programs →
            </Link>
          </div>

        </div>
      </section>


      {/* FOUNDERS */}
      {founders.length > 0 && (
        <section className="section soft-bg">
          <div className="container">
            <p className="eyebrow">Our Team</p>
            <h2>Meet the founders.</h2>
            <p className="lead" style={{ marginTop: '12px', marginBottom: '0' }}>
              The people behind Konuko Foundation's mission.
            </p>

            <div className="founder-grid">
              {founders.map((founder, i) => (
                <div className="founder-card" key={founder._id}>
                  {founder.photoUrl && (
                    <img
                      src={founder.photoUrl}
                      alt={founder.name}
                      className="founder-photo"
                    />
                  )}
                  <div className="founder-card-content">
                    <span>{String(i + 1).padStart(2, '0')}</span>
                    <h3>{founder.name}</h3>
                    <p>{founder.role || 'Co-Founder'}</p>
                    {founder.bio && (
                      <p className="founder-bio">{founder.bio}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}


      {/* VALUES */}
      <section className="section">
        <div className="container">
          <p className="eyebrow">Our Values</p>
          <h2 style={{ marginBottom: '48px', maxWidth: '600px' }}>
            The principles that guide our work.
          </h2>

          <div className="values-grid">
            <div>
              <span>01</span>
              <h3>Dignity</h3>
              <p>Support should respect the learner, family and community.</p>
            </div>
            <div>
              <span>02</span>
              <h3>Access</h3>
              <p>We focus on removing real barriers to learning and participation.</p>
            </div>
            <div>
              <span>03</span>
              <h3>Accountability</h3>
              <p>We aim to report what was done, what it cost and what changed.</p>
            </div>
            <div>
              <span>04</span>
              <h3>Growth</h3>
              <p>Programs should create skills and opportunity that continue beyond one intervention.</p>
            </div>
          </div>
        </div>
      </section>


      {/* CTA */}
      <section className="section cta-section">
        <div className="container">
          <div className="cta-card">
            <div>
              <p className="eyebrow">Join Us</p>
              <h2>Be part of expanding access for every learner.</h2>
            </div>
            <div>
              <p>
                There are many ways to contribute — from financial support to
                volunteering skills and technology. We'd love to hear from you.
              </p>
              <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                <Link href="/get-involved" className="btn btn-accent btn-lg">
                  Get involved
                </Link>
                <Link href="/contact" className="btn btn-outline btn-lg">
                  Contact us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  )
}