import Link from 'next/link'

export type StoryCardData = {
  _id: string
  title: string
  slug?: string
  personName?: string
  age?: number
  location?: string
  summary?: string
  imageUrl?: string
}

export function StoryCard({ story }: { story: StoryCardData }) {
  const storyPath = story.slug || story._id

  return (
    <article className="card story-card">
      <div className="story-card-image">
        {story.imageUrl && <img src={story.imageUrl} alt={story.personName || story.title} />}
        <span className="story-person">
          {story.personName || story.title}{story.age !== undefined ? `, ${story.age}` : ''}
        </span>
      </div>
      <div className="story-card-body">
        {story.location && <span className="story-place">📍 {story.location}</span>}
        {story.summary && <p>{story.summary}</p>}
        <Link className="story-learn-more" href={`/stories/${encodeURIComponent(storyPath)}`}>
          Read more
        </Link>
      </div>
    </article>
  )
}
