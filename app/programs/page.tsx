import Link from 'next/link'
import { PageHero } from '@/components/PageHero'
import { programs as referencePrograms } from '@/data/site'
import { getSanityClient } from '@/sanity/lib/client'
import { PROGRAMS_QUERY } from '@/sanity/lib/queries'

export const revalidate = 60

type Program = {
  _id: string
  title: string
  summary?: string
  imageUrl?: string
}

const icons = ['📚', '🎓', '💻', '🌱']

export default async function ProgramsPage() {
  const client = getSanityClient()
  const sanityPrograms: Program[] = client
    ? await client.fetch(PROGRAMS_QUERY, {}, { next: { revalidate: 60 } })
    : []
  const programs = sanityPrograms.length
    ? sanityPrograms.map((program, index) => ({
        key: program._id,
        title: program.title,
        icon: icons[index % icons.length],
        image: program.imageUrl || referencePrograms[index % referencePrograms.length].image,
        text: program.summary || referencePrograms[index % referencePrograms.length].text,
      }))
    : referencePrograms.map((program) => ({ ...program, key: program.title }))

  return (
    <>
      <PageHero
        eyebrow="OUR PROGRAMS"
        title="What We Do"
        intro="We focus on practical programs that strengthen learning, confidence and opportunity."
      />
      <section className="section">
        <div className="container">
          <div className="grid four">
            {programs.map((program) => (
              <article className="card program-card" key={program.key}>
                <img src={program.image} alt="" />
                <div className="card-body">
                  <div className="icon-chip">{program.icon}</div>
                  <h3>{program.title}</h3>
                  <p>{program.text}</p>
                  <Link className="text-link" href="/donate">Learn more →</Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
