import Image from 'next/image'
import { PageHero } from '@/components/PageHero'
import { programs } from '@/lib/fallback-content'

export const metadata = { title: 'Programs' }

export default function ProgramsPage() {
  return (
    <main>
      <PageHero eyebrow="Our programs" title="Removing barriers to learning." intro="Our current programs focus on the practical things learners need to stay in school, connect to information and build digital confidence." />
      <section className="section">
        <div className="container stacked-programs">
          {programs.map((program, i) => (
            <article className="program-feature" key={program.slug}>
              <div className="program-feature-image"><Image src={program.image} alt="" fill className="cover" /></div>
              <div className="program-feature-copy">
                <span className="number-chip">0{i + 1}</span>
                <h2>{program.title}</h2>
                <p>{program.description}</p>
                {i === 0 && <p className="muted">Examples: school fees, learning materials and targeted education assistance.</p>}
                {i === 1 && <p className="muted">Examples: safe learning connectivity, research access and online educational resources.</p>}
                {i === 2 && <p className="muted">Examples: laptops, desktop computers, shared labs and introductory digital skills.</p>}
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
