import { PageHero } from '@/components/PageHero'
import Link from 'next/link'
import { getSanityClient } from '@/sanity/lib/client'
import {
  IMPACT_STORIES_QUERY,
  IMPACT_STATISTICS_QUERY,
} from '@/sanity/lib/queries'

export const metadata = {
  title: 'Our Impact',
  description: 'Explore the impact Konuko Foundation has made on education and technology access.',
}

export const revalidate = 60

type ImpactStory = {
  _id: string
  title: string
  summary?: string
  publishedAt?: string
  imageUrl?: string
  slug?: { current: string }
}

type ImpactStatistic = {
  _id: string
  value: string
  label: string
  description?: string
}

function formatDate(date?: string) {
  if (!date) return ''
  return new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date))
}

export default async function ImpactPage() {
  const client = getSanityClient()

  const stories: ImpactStory[] = client
    ? await client.fetch(IMPACT_STORIES_QUERY)
    : []

  const statistics: ImpactStatistic[] = client
    ? await client.fetch(IMPACT_STATISTICS_QUERY)
    : []

  return (
    <main>

      <PageHero
        eyebrow="Our Impact"
        title="Every opportunity creates a story."
        intro="We document the people, communities and learning opportunities supported through Konuko Foundation."
      />


      {/* METRICS GRID */}
      {statistics.length > 0 && (
        <section className="section soft-bg">
          <div className="container">
            <p className="eyebrow">By the numbers</p>
            <h2 style={{ marginBottom: '40px', maxWidth: '560px' }}>
              Impact we can measure.
            </h2>
            <div className="metrics-grid">
              {statistics.map((stat) => (
                <div className="metric-card" key={stat._id}>
                  <div className="metric-value">{stat.value}</div>
                  <div className="metric-label">{stat.label}</div>
                  {stat.description && (
                    <p style={{ color: 'var(--muted)', fontSize: '.88rem', marginTop: '8px', marginBottom: 0 }}>
                      {stat.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}


      {/* STORIES */}
      <section className="section">
        <div className="container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Impact Stories</p>
              <h2>Stories from our work.</h2>
            </div>
          </div>

          {stories.length > 0 ? (
            <div className="impact-story-grid">
              {stories.map((story) => (
                <article className="impact-story-card" key={story._id}>
                  {story.imageUrl && (
                    <img
                      src={story.imageUrl}
                      alt={story.title}
                      className="impact-story-photo"
                    />
                  )}
                  <div className="impact-story-content">
                    {story.publishedAt && (
                      <p className="impact-story-date">{formatDate(story.publishedAt)}</p>
                    )}
                    <h3>{story.title}</h3>
                    {story.summary && <p>{story.summary}</p>}
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="empty-impact">
              <h3>Our first impact stories are coming soon.</h3>
              <p>Stories published through Sanity will automatically appear here.</p>
            </div>
          )}
        </div>
      </section>


      {/* ACCOUNTABILITY */}
      <section className="section soft-bg">
        <div className="container two-col align-start">
          <div>
            <p className="eyebrow">Accountability</p>
            <h2>Measuring more than activities.</h2>
          </div>
          <div className="prose">
            <p>
              As Konuko Foundation grows, we want to track not only what we
              provide, but also the difference those interventions make for
              learners and communities.
            </p>
            <p>
              Our annual reports will document programs delivered, beneficiaries
              reached, resources used and lessons learned.
            </p>
            <Link href="/reports" className="text-link" style={{ marginTop: '8px', display: 'inline-flex' }}>
              View annual reports →
            </Link>
          </div>
        </div>
      </section>

    </main>
  )
}