import Link from 'next/link'
import CTA from '@/components/CTA'
import { impactStats as referenceStats, programs as referencePrograms, stories as referenceStories } from '@/data/site'
import { getSanityClient } from '@/sanity/lib/client'
import {
  IMPACT_STATISTICS_QUERY,
  IMPACT_STORIES_QUERY,
  PROGRAMS_QUERY,
  SITE_SETTINGS_QUERY,
} from '@/sanity/lib/queries'

export const revalidate = 60

type Program = {
  _id: string
  title: string
  summary?: string
  imageUrl?: string
}

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
  publishedAt?: string
}

type SiteSettings = {
  heroTitle?: string
  heroText?: string
  heroImageUrl?: string
  impactTitle?: string
  impactText?: string
  ctaTitle?: string
  ctaText?: string
}

const programIcons = ['📚', '🎓', '💻', '🌱']

export default async function Home() {
  const client = getSanityClient()
  const [sanityPrograms, statistics, sanityStories, settings] = client
    ? await Promise.all([
        client.fetch<Program[]>(PROGRAMS_QUERY, {}, { next: { revalidate: 60 } }),
        client.fetch<ImpactStatistic[]>(IMPACT_STATISTICS_QUERY, {}, { next: { revalidate: 60 } }),
        client.fetch<ImpactStory[]>(IMPACT_STORIES_QUERY, {}, { next: { revalidate: 60 } }),
        client.fetch<SiteSettings | null>(SITE_SETTINGS_QUERY, {}, { next: { revalidate: 60 } }),
      ])
    : [[], [], [], null]

  const heroTitle = settings?.heroTitle
  const heroText = settings?.heroText
  const heroImage = settings?.heroImageUrl || 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1800&q=85'
  const programs = sanityPrograms.length
    ? sanityPrograms.map((program, index) => ({
        key: program._id,
        title: program.title,
        icon: programIcons[index % programIcons.length],
        image: program.imageUrl || referencePrograms[index % referencePrograms.length].image,
        text: program.summary || referencePrograms[index % referencePrograms.length].text,
      }))
    : referencePrograms.map((program) => ({ ...program, key: program.title }))
  const displayedStats = statistics.length
    ? statistics.map((stat) => [stat.value, stat.label, stat.description || 'Across our programs'] as const)
    : referenceStats
  const stories = sanityStories.length
    ? sanityStories.map((story) => ({
        key: story._id,
        name: story.title,
        place: '',
        image: story.imageUrl || referenceStories[0].image,
        text: story.summary || '',
      }))
    : referenceStories.map((story) => ({ ...story, key: story.name }))

  return (
    <>
      <section className="hero" style={{ backgroundImage: `url("${heroImage}")` }}>
        <div className="hero-overlay">
          <div className="container hero-content">
            <span className="eyebrow light">● TAKE ACTION. MAKE AN IMPACT.</span>
            {heroTitle ? (
              <h1>{heroTitle}</h1>
            ) : (
              <h1>Don’t just give them hope.<br />Give them the <em>skills</em> to build it.</h1>
            )}
            <p>{heroText || 'We equip young people and underserved communities with education, practical skills and opportunities to build stronger futures.'}</p>
            <div className="button-row">
              <Link className="btn btn-primary" href="/donate">→ Donate Now</Link>
              <Link className="btn btn-ghost" href="/volunteer">Volunteer</Link>
              <Link className="btn btn-ghost" href="/about">Learn More</Link>
            </div>
            <div className="hero-stats">
              {displayedStats.slice(0, 3).map(([value, label]) => (
                <div key={label}><strong>{value}</strong><span>{label}</span></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="programs">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">● OUR PROGRAMS</span>
            <h2>What We Do</h2>
            <p>We focus on practical programs that strengthen learning, confidence and opportunity.</p>
          </div>
          <div className="grid four">
            {programs.map((program) => (
              <article className="card program-card" key={program.key}>
                <img src={program.image} alt="" />
                <div className="card-body">
                  <div className="icon-chip">{program.icon}</div>
                  <h3>{program.title}</h3>
                  <p>{program.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section impact-section" id="impact">
        <div className="container">
          <div className="section-head light">
            <span className="eyebrow light">● OUR IMPACT</span>
            <h2>{settings?.impactTitle || 'Measurable Change'}</h2>
            <p>{settings?.impactText || 'We measure our work by the difference it creates in learners, families and communities.'}</p>
          </div>
          <div className="impact-grid">
            {displayedStats.slice(0, 4).map(([value, label, description]) => (
              <div key={label}>
                <strong>{value}</strong>
                <h3>{label}</h3>
                <span>{description}</span>
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
            {stories.slice(0, 3).map((story) => (
              <article className="card story-card" key={story.key}>
                <img src={story.image} alt="" />
                <div className="card-body">
                  {story.place && <span className="story-place">📍 {story.place}</span>}
                  <h3>{story.name}</h3>
                  <p>{story.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section reach-section">
        <div className="container">
          <span className="eyebrow">● GEOGRAPHIC PRESENCE</span>
          <h2>Our Reach</h2>
          <div className="reach-grid">
            <div className="mini-stats">
              {displayedStats.slice(0, 4).map(([value, label]) => (
                <div key={label}><strong>{value}</strong><span>{label}</span></div>
              ))}
            </div>
            <img
              src="https://images.unsplash.com/photo-1489493512598-d08130f49bea?auto=format&fit=crop&w=1200&q=80"
              alt="Community gathering"
            />
          </div>
        </div>
      </section>
      <CTA title={settings?.ctaTitle} text={settings?.ctaText} />
    </>
  )
}
