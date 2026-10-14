import { notFound } from 'next/navigation'
import { PageHero } from '@/components/PageHero'
import { getSanityClient } from '@/sanity/lib/client'
import { STORY_BY_SLUG_QUERY } from '@/sanity/lib/queries'

export const revalidate = 60

type ImpactStory = {
  _id: string
  title: string
  personName?: string
  age?: number
  location?: string
  summary?: string
  fullStory?: string
  imageUrl?: string
}

export default async function StoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const client = getSanityClient()
  if (!client) notFound()

  const story = await client.fetch<ImpactStory | null>(
    STORY_BY_SLUG_QUERY,
    { slug },
    { next: { revalidate: 60 } },
  )
  if (!story) notFound()

  return (
    <>
      <PageHero
        eyebrow={story.location ? `📍 ${story.location}` : 'REAL STORY'}
        title={story.title}
        intro={[story.personName, story.age !== undefined ? `${story.age} years old` : '']
          .filter(Boolean)
          .join(' · ')}
      />
      <section className="section">
        <article className="container narrow full-story">
          {story.imageUrl && <img className="full-story-image" src={story.imageUrl} alt={story.personName || story.title} />}
          <div className="full-story-text">{story.fullStory || story.summary}</div>
        </article>
      </section>
    </>
  )
}
