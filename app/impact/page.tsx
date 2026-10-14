import CTA from '@/components/CTA'
import { PageHero } from '@/components/PageHero'
import { impactStats as fallbackStats, stories as fallbackStories } from '@/data/site'
import { getSanityClient } from '@/sanity/lib/client'
import { IMPACT_STATISTICS_QUERY, IMPACT_STORIES_QUERY } from '@/sanity/lib/queries'

export const revalidate = 60

type ImpactStatistic = {
  _id: string
  value: string
  label: string
  description?: string
}

type ImpactStory = {
  _id: string
  title: string
  summary?: string
  imageUrl?: string
}

export default async function ImpactPage() {
  const client = getSanityClient()
  const [statistics, sanityStories] = client
    ? await Promise.all([
        client.fetch<ImpactStatistic[]>(IMPACT_STATISTICS_QUERY, {}, { next: { revalidate: 60 } }),
        client.fetch<ImpactStory[]>(IMPACT_STORIES_QUERY, {}, { next: { revalidate: 60 } }),
      ])
    : [[], []]
  const displayedStats = statistics.length
    ? statistics.map((stat) => ({
        key: stat._id,
        value: stat.value,
        label: stat.label,
        description: stat.description || '',
      }))
    : fallbackStats.map(([value, label, description]) => ({ key: label, value, label, description }))
  const displayedStories = sanityStories.length
    ? sanityStories.map((story) => ({
        key: story._id,
        title: story.title,
        summary: story.summary || '',
        image: story.imageUrl || fallbackStories[0].image,
      }))
    : fallbackStories.map((story) => ({ ...story, title: story.name, summary: story.text, key: story.name }))

  return (
    <>
      <PageHero
        eyebrow="OUR IMPACT"
        title="Measurable Change"
        intro="We measure our work by the difference it creates in learners, families and communities."
      />
      <section className="section impact-section">
        <div className="container">
          <div className="impact-grid">
            {displayedStats.map((stat) => (
              <div key={stat.key}>
                <strong>{stat.value}</strong>
                <h3>{stat.label}</h3>
                <span>{stat.description}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">● REAL STORIES</span>
            <h2>Stories of Change</h2>
          </div>
          <div className="grid three">
            {displayedStories.map((story) => (
              <article className="card story-card" key={story.key}>
                <img src={story.image} alt="" />
                <div className="card-body">
                  <h3>{story.title}</h3>
                  <p>{story.summary}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <CTA />
    </>
  )
}
