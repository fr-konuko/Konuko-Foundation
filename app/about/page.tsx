import CTA from '@/components/CTA'
import { PageHero } from '@/components/PageHero'
import { getSanityClient } from '@/sanity/lib/client'
import { FOUNDERS_QUERY, SITE_SETTINGS_QUERY } from '@/sanity/lib/queries'

export const metadata = {
  title: 'About Us',
  description: 'Learn about Konuko Foundation — a family-led NGO expanding access to education and technology.',
}

export const revalidate = 60

type Founder = {
  _id: string
  name: string
  role?: string
  bio?: string
  photoUrl?: string
}

type SiteSettings = {
  mission?: string
  ctaTitle?: string
  ctaText?: string
} | null

const timeline = [
  {
    year: '2021',
    title: 'Konuko Foundation begins',
    description: 'Started with a commitment to expand opportunity through community-centered initiatives.',
  },
  {
    year: '2023',
    title: 'Programs expand',
    description: 'Education and skills support reach more learners and communities.',
  },
  {
    year: '2026',
    title: 'New phase of growth',
    description: 'Strengthening partnerships, digital systems and measurable impact.',
  },
]

export default async function AboutPage() {
  const client = getSanityClient()
  const [founders, settings] = client
    ? await Promise.all([
        client.fetch<Founder[]>(FOUNDERS_QUERY, {}, { next: { revalidate: 60 } }),
        client.fetch<SiteSettings>(SITE_SETTINGS_QUERY, {}, { next: { revalidate: 60 } }),
      ])
    : [[], null]

  return (
    <main className="about-page">
      <PageHero
        dark={false}
        eyebrow="WHO WE ARE"
        title="Our Story"
        intro="Konuko Foundation exists to create practical opportunities for young people and communities through education, skills and support."
      />

      <section className="section pt0">
        <div className="container">
          <img
            className="wide-image"
            src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1400&q=80"
            alt="Children smiling"
          />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <span className="eyebrow">● OUR MISSION</span>
          <h2>Values &amp; Vision</h2>
          <div className="grid four values-grid">
            <div className="soft-card">
              🎯<h3>Our Mission</h3>
              <p>{settings?.mission || 'Equip learners and communities with practical opportunities to build better futures.'}</p>
            </div>
            <div className="soft-card">
              👁️<h3>Our Vision</h3>
              <p>A future where every young person has the opportunity to learn, grow and participate.</p>
            </div>
            <div className="soft-card">
              🤝<h3>Community First</h3>
              <p>We work with communities and partners to create solutions that last.</p>
            </div>
            <div className="soft-card">
              📊<h3>Accountability</h3>
              <p>We measure, learn and communicate openly about the impact of our work.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <span className="eyebrow">● OUR PEOPLE</span>
          <h2>Meet the Team</h2>
          {founders.length > 0 ? (
            <div className="team-row">
              {founders.map((founder) => (
                <article className="team-card" key={founder._id}>
                  {founder.photoUrl ? (
                    <img src={founder.photoUrl} alt={founder.name} />
                  ) : (
                    <div className="team-avatar" aria-label={founder.name}>
                      {founder.name.trim().slice(0, 1).toUpperCase()}
                    </div>
                  )}
                  <h3>{founder.name}</h3>
                  <p>{founder.role || 'Founder'}</p>
                  {founder.bio ? <p className="team-bio">{founder.bio}</p> : null}
                </article>
              ))}
            </div>
          ) : (
            <p>Founder profiles will be shared here as they are published.</p>
          )}
        </div>
      </section>

      <section className="section timeline-section">
        <div className="container">
          <span className="eyebrow">● OUR JOURNEY</span>
          <h2>Timeline</h2>
          <div className="timeline">
            {timeline.map((milestone) => (
              <div key={milestone.year}>
                <b>{milestone.year}</b>
                <h3>{milestone.title}</h3>
                <p>{milestone.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CTA title={settings?.ctaTitle} text={settings?.ctaText} />
    </main>
  )
}
