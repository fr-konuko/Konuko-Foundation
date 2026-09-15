import { PageHero } from '@/components/PageHero'
import { getSanityClient } from '@/sanity/lib/client'
import { PROGRAMS_QUERY } from '@/sanity/lib/queries'

export const metadata = {
  title: 'Our Programs',
}

export const dynamic = 'force-dynamic'

type Program = {
  _id: string
  title: string
  slug?: {
    current: string
  }
  summary?: string
  order?: number
  imageUrl?: string
}

export default async function ProgramsPage() {
  const client = getSanityClient()

  const programs: Program[] = client
    ? await client.fetch(PROGRAMS_QUERY)
    : []

  return (
    <main>
      <PageHero
        eyebrow="Our programs"
        title="Practical support that expands access to learning."
        intro="Konuko Foundation develops programs that help children, students and local communities access education, technology and digital opportunities."
      />

      <section className="section">
        <div className="container">
          <div className="programs-heading">
            <p className="eyebrow">What we do</p>
            <h2>Our current programs.</h2>
          </div>

          {programs.length > 0 ? (
            <div className="program-grid">
              {programs.map((program, index) => (
                <article className="program-card" key={program._id}>
                  {program.imageUrl && (
                    <img
                      src={program.imageUrl}
                      alt={program.title}
                      className="program-photo"
                    />
                  )}

                  <div className="program-card-content">
                    <span className="program-number">
                      {String(index + 1).padStart(2, '0')}
                    </span>

                    <h3>{program.title}</h3>

                    {program.summary && (
                      <p>{program.summary}</p>
                    )}
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="empty-programs">
              <h3>No programs have been published yet.</h3>
              <p>
                Programs added and published in Sanity will appear here.
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="section soft-bg">
        <div className="container two-col align-start">
          <div>
            <p className="eyebrow">Our approach</p>

            <h2>
              Building opportunity through education and technology.
            </h2>
          </div>

          <div className="prose">
            <p>
              Our programs are designed around practical barriers faced by
              learners and communities, including school costs, limited access
              to technology and lack of reliable internet access.
            </p>

            <p>
              As the foundation grows, additional programs can be introduced
              and managed directly through Sanity without rebuilding the
              website.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}