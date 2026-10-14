import CTA from '@/components/CTA'
import { StoryCard, type StoryCardData } from '@/components/StoryCard'
import { PageHero } from '@/components/PageHero'
import { impactStats as fallbackStats } from '@/data/site'
import { getSanityClient } from '@/sanity/lib/client'
import { IMPACT_STATISTICS_QUERY, IMPACT_STORIES_QUERY } from '@/sanity/lib/queries'

export const revalidate = 60

type ImpactStatistic = {
  _id: string
  value: string
  label: string
  description?: string
}

export default async function ImpactPage() {
  const client = getSanityClient()
  const [statistics, sanityStories] = client
    ? await Promise.all([
        client.fetch<ImpactStatistic[]>(IMPACT_STATISTICS_QUERY, {}, { next: { revalidate: 60 } }),
        client.fetch<StoryCardData[]>(IMPACT_STORIES_QUERY, {}, { next: { revalidate: 60 } }),
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
          {sanityStories.length ? (
            <div className="grid three story-grid">
              {sanityStories.map((story) => <StoryCard key={story._id} story={story} />)}
            </div>
          ) : (
            <p className="story-empty">Real stories will appear here once published.</p>
          )}
        </div>
      </section>
      <CTA />
    </>
  )
}
