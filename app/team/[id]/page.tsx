import Link from 'next/link'
import { notFound } from 'next/navigation'
import { PageHero } from '@/components/PageHero'
import { getSanityClient } from '@/sanity/lib/client'
import { FOUNDER_BY_ID_QUERY } from '@/sanity/lib/queries'

export const revalidate = 60

type FounderMessage = {
  name: string
  role?: string
  message?: string
  photoUrl?: string
}

export default async function TeamMessagePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const client = getSanityClient()
  const founder = client
    ? await client.fetch<FounderMessage | null>(FOUNDER_BY_ID_QUERY, { id }, { next: { revalidate: 60 } })
    : null

  if (!founder) notFound()

  return (
    <>
      <PageHero eyebrow="FROM OUR TEAM" title={`A message from ${founder.name}`} intro={founder.role || 'Founder'} />
      <section className="section">
        <article className="container narrow">
          {founder.photoUrl && (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img className="team-message-photo" src={founder.photoUrl} alt={founder.name} />
          )}
          <div className="full-story-text">{founder.message?.trim() || 'Message coming soon!'}</div>
          <Link className="btn btn-outline team-message-back" href="/about">Back to Meet the Team</Link>
        </article>
      </section>
    </>
  )
}
