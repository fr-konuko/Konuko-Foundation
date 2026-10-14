import { PageHero } from '@/components/PageHero'
import Link from 'next/link'
import { getSanityClient } from '@/sanity/lib/client'
import { PROGRAMS_QUERY } from '@/sanity/lib/queries'

export const metadata = {
  title: 'Programs',
  description: 'Konuko Foundation programs removing barriers to education, technology and digital access.',
}

export const revalidate = 60

type Program = {
  _id: string
  title: string
  summary?: string
  order?: number
  imageUrl?: string
  slug?: { current: string }
}

export default async function ProgramsPage() {
  const client = getSanityClient()
  const programs: Program[] = client ? await client.fetch(PROGRAMS_QUERY) : []

  return (
    <main>

      <PageHero
        eyebrow="Our Programs"
        title="Removing barriers to learning."
        intro="Our programs focus on the practical things learners need to stay in school, connect to information and build digital confidence."
      />


      {/* PROGRAM LIST */}
      <section className="section">
        <div className="container">

          {programs.length > 0 ? (
            <div className="stacked-programs">
              {programs.map((program, i) => (
                <article className="program-feature" key={program._id}>
                  <div className="program-feature-image">
                    {program.imageUrl && (
                      <img
                        src={program.imageUrl}
                        alt={program.title}
                        className="program-feature-photo"
                      />
                    )}
                  </div>

                  <div className="program-feature-copy">
                    <span className="number-chip">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h2>{program.title}</h2>
                    {program.summary && <p style={{ color: 'var(--muted)', fontSize: '1.05rem', marginBottom: '24px' }}>{program.summary}</p>}
                    <Link href="/get-involved" className="btn btn-primary">
                      Support this program
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <span>Coming soon</span>
              <h2>Programs are being established.</h2>
              <p>
                Published programs from Sanity will automatically appear here as
                Konuko Foundation grows its work.
              </p>
              <Link href="/contact" className="btn btn-primary" style={{ marginTop: '24px' }}>
                Ask about upcoming programs
              </Link>
            </div>
          )}

        </div>
      </section>


      {/* HELP TILES */}
      <section className="section soft-bg">
        <div className="container">
          <div className="section-head text-center" style={{ marginBottom: '48px' }}>
            <p className="eyebrow" style={{ justifyContent: 'center' }}>Get Involved</p>
            <h2 style={{ maxWidth: '560px', margin: '0 auto 16px' }}>
              Support a program that matters to you.
            </h2>
            <p className="lead" style={{ margin: '0 auto' }}>
              Every program depends on the generosity and engagement of our community.
            </p>
          </div>

          <div className="help-grid">
            <div className="help-tile">
              <div className="help-icon" aria-hidden="true">💰</div>
              <h3>Financial Support</h3>
              <p>Contribute directly to school fees, connectivity costs and equipment for learners in need.</p>
            </div>
            <div className="help-tile">
              <div className="help-icon" aria-hidden="true">🖥️</div>
              <h3>Technology Donations</h3>
              <p>Donate working laptops, desktops, tablets or networking equipment for community use.</p>
            </div>
            <div className="help-tile">
              <div className="help-icon" aria-hidden="true">🧑‍🏫</div>
              <h3>Skills &amp; Mentorship</h3>
              <p>Share professional skills, career coaching or digital training with our learners.</p>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <Link href="/get-involved" className="btn btn-primary btn-lg">
              See all ways to help →
            </Link>
          </div>
        </div>
      </section>

    </main>
  )
}