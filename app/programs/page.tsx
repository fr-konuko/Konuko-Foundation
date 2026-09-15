import { PageHero } from '@/components/PageHero'
import { getSanityClient } from '@/sanity/lib/client'
import { PROGRAMS_QUERY } from '@/sanity/lib/queries'

export const metadata = {
  title: 'Programs',
}

export const dynamic = 'force-dynamic'

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

export default async function ProgramsPage() {
  const client = getSanityClient()

  const programs: Program[] = client
    ? await client.fetch(PROGRAMS_QUERY)
    : []

  return (
    <main>
      <PageHero
        eyebrow="Our programs"
        title="Removing barriers to learning."
        intro="Our programs focus on the practical things learners need to stay in school, connect to information and build digital confidence."
      />

      <section className="section">
        <div className="container stacked-programs">
          {programs.map((program, i) => (
            <article
              className="program-feature"
              key={program._id}
            >
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

                {program.summary && (
                  <p>{program.summary}</p>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}