import Image from 'next/image'
import Link from 'next/link'

import { getSanityClient } from '@/sanity/lib/client'
import {
  PROGRAMS_QUERY,
  SITE_SETTINGS_QUERY,
  IMPACT_STATISTICS_QUERY,
  IMPACT_STORIES_QUERY,
} from '@/sanity/lib/queries'

export const revalidate = 60

type Program = {
  _id: string
  title: string
  summary?: string
  order?: number
  imageUrl?: string
  slug?: { current: string }
}

type ImpactStatistic = {
  _id: string
  value: string
  label: string
  description?: string
  order?: number
}

type ImpactStory = {
  _id: string
  title: string
  summary?: string
  publishedAt?: string
  imageUrl?: string
  slug?: { current: string }
}

type SiteSettings = {
  mission?: string
  email?: string
  phone?: string
  donationNote?: string
  heroTitle?: string
  heroText?: string
  heroImageUrl?: string
  purposeTitle?: string
  featureTitle?: string
  featureText?: string
  featureImageUrl?: string
  impactTitle?: string
  impactText?: string
  ctaTitle?: string
  ctaText?: string
}

function formatDate(date?: string) {
  if (!date) return ''
  return new Intl.DateTimeFormat('en', { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(date))
}

export default async function Home() {
  const client = getSanityClient()

  const programs: Program[] = client
    ? await client.fetch(PROGRAMS_QUERY, {}, { next: { revalidate: 60 } })
    : []

  const statistics: ImpactStatistic[] = client
    ? await client.fetch(IMPACT_STATISTICS_QUERY, {}, { next: { revalidate: 60 } })
    : []

  const stories: ImpactStory[] = client
    ? await client.fetch(IMPACT_STORIES_QUERY, {}, { next: { revalidate: 60 } })
    : []

  const settings: SiteSettings | null = client
    ? await client.fetch(SITE_SETTINGS_QUERY, {}, { next: { revalidate: 60 } })
    : null

  const heroTitle = settings?.heroTitle || 'Opening Doors Through Education & Technology.'
  const heroText  = settings?.heroText  || 'We help children and local learners access school support, the internet and the technology they need to learn, grow and participate in a digital world.'
  const heroImage = settings?.heroImageUrl || 'https://images.pexels.com/photos/34162714/pexels-photo-34162714.jpeg?auto=compress&cs=tinysrgb&w=1800'

  const purposeTitle = settings?.purposeTitle || "Opportunity should not depend on a family's financial circumstances."
  const mission      = settings?.mission || 'Expanding access to education, technology and opportunity.'

  const featureTitle = settings?.featureTitle || 'A connected learner has a wider classroom.'
  const featureText  = settings?.featureText  || 'Internet and device access can unlock research, applications, digital learning, skills development and exposure to opportunities far beyond the local community.'
  const featureImage = settings?.featureImageUrl || 'https://images.pexels.com/photos/5940714/pexels-photo-5940714.jpeg?auto=compress&cs=tinysrgb&w=1600'

  const impactTitle = settings?.impactTitle || 'Impact we can explain, not just claim.'
  const impactText  = settings?.impactText  || 'As projects launch, the foundation publishes verified annual figures, project updates and downloadable reports.'

  const ctaTitle = settings?.ctaTitle || 'Support a learner. Share a device. Build access.'
  const ctaText  = settings?.ctaText  || 'Konuko Foundation is at the beginning of its journey. We welcome people and organisations who want to help build sustainable educational opportunities.'

  /* Default stats if Sanity returns none */
  const fallbackStats = [
    { _id: 'a', value: 'Annual',  label: 'Impact reporting' },
    { _id: 'b', value: 'Open',    label: 'Project updates' },
    { _id: 'c', value: 'Clear',   label: 'Use of support' },
    { _id: 'd', value: '100%',    label: 'Transparency' },
  ]
  const displayStats = statistics.length > 0 ? statistics : fallbackStats

  return (
    <main>

      {/* ─── HERO ─────────────────────────────────────────────── */}
      <section className="hero">
        <Image
          src={heroImage}
          alt="Konuko Foundation — children learning"
          fill
          priority
          className="hero-image"
        />
        <div className="hero-overlay" />

        <div className="container hero-content">
          <p className="eyebrow">Konuko Foundation</p>

          <h1>{heroTitle}</h1>

          <p className="hero-copy">{heroText}</p>

          <div className="hero-actions">
            <Link className="btn btn-accent btn-lg" href="/programs">
              Explore Our Programs
            </Link>
            <Link className="btn btn-outline btn-lg" href="/get-involved">
              Get Involved
            </Link>
          </div>
        </div>
      </section>


      {/* ─── STATS BAR ────────────────────────────────────────── */}
      <div className="stats-bar">
        <div className="container stats-bar-inner">
          {displayStats.slice(0, 4).map((stat) => (
            <div className="stat-item" key={stat._id}>
              <span className="stat-value">{stat.value}</span>
              <span className="stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>


      {/* ─── MISSION / PURPOSE ────────────────────────────────── */}
      <section className="section">
        <div className="container two-col">

          <div>
            <p className="eyebrow">Our Purpose</p>
            <h2>{purposeTitle}</h2>
          </div>

          <div className="mission-copy">
            <p>{mission}</p>
            <p>
              Konuko Foundation brings family and community together around a shared
              commitment to educational empowerment and access to technology.
            </p>
            <Link href="/about" className="text-link" style={{ marginTop: '8px', display: 'inline-flex' }}>
              Read our story →
            </Link>
          </div>

        </div>
      </section>


      {/* ─── HOW YOU CAN HELP ─────────────────────────────────── */}
      <section className="section soft-bg">
        <div className="container">

          <div className="section-head">
            <p className="eyebrow">Ways to Help</p>
            <h2 style={{ maxWidth: '560px', margin: '0 0 16px' }}>
              There is more than one way to make a difference.
            </h2>
            <p className="lead">
              Whether you donate, volunteer skills or partner with us — every form
              of support creates real educational opportunity.
            </p>
          </div>

          <div className="help-grid">
            <div className="help-tile">
              <div className="help-icon" aria-hidden="true">🎓</div>
              <h3>Support Education</h3>
              <p>Contribute toward verified school-fee and learning-support needs for students in our community.</p>
              <Link href="/get-involved" className="text-link" style={{ marginTop: '16px', display: 'inline-flex' }}>
                Learn more →
              </Link>
            </div>

            <div className="help-tile">
              <div className="help-icon" aria-hidden="true">💻</div>
              <h3>Donate Technology</h3>
              <p>Help provide laptops, desktops and internet access for local learners who have none.</p>
              <Link href="/get-involved" className="text-link" style={{ marginTop: '16px', display: 'inline-flex' }}>
                Learn more →
              </Link>
            </div>

            <div className="help-tile">
              <div className="help-icon" aria-hidden="true">🤝</div>
              <h3>Volunteer Skills</h3>
              <p>Offer mentorship, digital training, career guidance or other educational expertise.</p>
              <Link href="/get-involved" className="text-link" style={{ marginTop: '16px', display: 'inline-flex' }}>
                Learn more →
              </Link>
            </div>
          </div>

        </div>
      </section>


      {/* ─── PROGRAMS ─────────────────────────────────────────── */}
      <section className="section">
        <div className="container">

          <div className="section-heading">
            <div>
              <p className="eyebrow">What We Do</p>
              <h2>Creating practical pathways to opportunity.</h2>
            </div>
            <p style={{ maxWidth: '400px', color: 'var(--muted)' }}>
              Our work focuses on removing practical barriers that keep learners from
              education, technology and digital opportunity.
            </p>
          </div>

          {programs.length > 0 ? (
            <div className="program-grid">
              {programs.map((program, index) => (
                <article className="program-card" key={program._id}>
                  <div className="program-image">
                    {program.imageUrl && (
                      <img src={program.imageUrl} alt={program.title} />
                    )}
                    <span className="program-tag">Program</span>
                  </div>
                  <div className="program-body">
                    <div className="program-number">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                    <h3>{program.title}</h3>
                    {program.summary && <p>{program.summary}</p>}
                    <Link href="/programs" className="text-link">
                      Learn more →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="empty-programs">
              <h3>Programs are coming soon.</h3>
              <p>Published programs from Sanity will appear here automatically.</p>
            </div>
          )}

          <div style={{ marginTop: '48px', textAlign: 'center' }}>
            <Link href="/programs" className="btn btn-outline-dark">
              View all programs →
            </Link>
          </div>

        </div>
      </section>


      {/* ─── IMPACT METRICS BAND ──────────────────────────────── */}
      <section className="section impact-band">
        <div className="container impact-layout">

          <div>
            <p className="eyebrow light">Growing Responsibly</p>
            <h2 style={{ color: 'white' }}>{impactTitle}</h2>
            <p style={{ color: 'rgba(255,255,255,.72)', fontSize: '1.08rem', maxWidth: '520px' }}>
              {impactText}
            </p>
            <Link href="/impact" className="btn btn-accent" style={{ marginTop: '32px', display: 'inline-flex' }}>
              View our impact
            </Link>
          </div>

          <div className="impact-preview">
            {statistics.length > 0 ? (
              statistics.map((stat) => (
                <div className="impact-preview-card" key={stat._id}>
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </div>
              ))
            ) : (
              <>
                <div className="impact-preview-card">
                  <strong>Annual</strong>
                  <span>Impact reporting</span>
                </div>
                <div className="impact-preview-card">
                  <strong>Open</strong>
                  <span>Project updates</span>
                </div>
                <div className="impact-preview-card">
                  <strong>Clear</strong>
                  <span>Use of support</span>
                </div>
                <div className="impact-preview-card">
                  <strong>100%</strong>
                  <span>Transparent</span>
                </div>
              </>
            )}
          </div>

        </div>
      </section>


      {/* ─── DIGITAL ACCESS — FEATURE ROW ─────────────────────── */}
      <section className="section">
        <div className="container feature-row">

          <div className="feature-image-wrap">
            <Image
              src={featureImage}
              alt="Learner using technology for education"
              fill
              className="cover"
            />
          </div>

          <div className="feature-copy">
            <p className="eyebrow">Access Matters</p>
            <h2>{featureTitle}</h2>
            <p>{featureText}</p>
            <Link href="/programs" className="btn btn-primary">
              See our digital access work →
            </Link>
          </div>

        </div>
      </section>


      {/* ─── IMPACT STORIES ───────────────────────────────────── */}
      {stories.length > 0 && (
        <section className="section soft-bg">
          <div className="container">

            <div className="section-heading">
              <div>
                <p className="eyebrow">Impact Stories</p>
                <h2>Stories from our work.</h2>
              </div>
              <Link href="/impact" className="text-link">
                View all stories →
              </Link>
            </div>

            <div className="story-grid">
              {stories.slice(0, 3).map((story) => (
                <article className="story-card" key={story._id}>
                  <div className="story-image">
                    {story.imageUrl && (
                      <img src={story.imageUrl} alt={story.title} />
                    )}
                  </div>
                  <div className="story-body">
                    {story.publishedAt && (
                      <p className="story-date">{formatDate(story.publishedAt)}</p>
                    )}
                    <h3>{story.title}</h3>
                    {story.summary && <p>{story.summary}</p>}
                  </div>
                </article>
              ))}
            </div>

          </div>
        </section>
      )}


      {/* ─── TESTIMONIALS ─────────────────────────────────────── */}
      <section className="section testimonials-section">
        <div className="container">

          <div className="section-head text-center" style={{ marginBottom: '48px' }}>
            <p className="eyebrow" style={{ justifyContent: 'center' }}>Voices</p>
            <h2 style={{ maxWidth: '560px', margin: '0 auto' }}>
              What our community says.
            </h2>
          </div>

          <div className="testimonials-grid">
            <div className="testimonial-card">
              <p className="testimonial-quote">
                The support from Konuko Foundation changed everything for my daughter. She now has
                access to a laptop and can study materials she never could before.
              </p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">P</div>
                <div>
                  <p className="testimonial-name">Parent, Community Member</p>
                  <p className="testimonial-role">Beneficiary family</p>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <p className="testimonial-quote">
                Having internet access at school has opened up a world of research and learning
                opportunities. We're grateful for partners like Konuko Foundation.
              </p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">T</div>
                <div>
                  <p className="testimonial-name">Teacher, Local School</p>
                  <p className="testimonial-role">School partner</p>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <p className="testimonial-quote">
                Partnering with Konuko Foundation aligns perfectly with our mission to create
                equitable technology access for every learner.
              </p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">O</div>
                <div>
                  <p className="testimonial-name">Organisation Partner</p>
                  <p className="testimonial-role">Technology donor</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>


      {/* ─── CTA ──────────────────────────────────────────────── */}
      <section className="section cta-section">
        <div className="container">
          <div className="cta-card">

            <div>
              <p className="eyebrow">Be Part of the Work</p>
              <h2>{ctaTitle}</h2>
            </div>

            <div>
              <p>{ctaText}</p>
              <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                <Link href="/get-involved" className="btn btn-accent btn-lg">
                  Ways to get involved
                </Link>
                <Link href="/contact" className="btn btn-outline btn-lg">
                  Contact us
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

    </main>
  )
}