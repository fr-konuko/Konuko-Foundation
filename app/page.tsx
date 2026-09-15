import Image from 'next/image'
import Link from 'next/link'
import { programs } from '@/lib/fallback-content'

export default function Home() {
  return (
    <main>
      <section className="hero">
        <Image src="https://images.pexels.com/photos/34162714/pexels-photo-34162714.jpeg?auto=compress&cs=tinysrgb&w=1800" alt="Students studying together" fill priority className="hero-image" />
        <div className="hero-overlay" />
        <div className="container hero-content">
          <p className="eyebrow light">Konuko Foundation</p>
          <h1>Opening doors through education and technology.</h1>
          <p className="hero-copy">We help children and local learners access school support, the internet and the technology they need to learn, grow and participate in a digital world.</p>
          <div className="actions">
            <Link className="button" href="/programs">Explore our programs</Link>
            <Link className="button button-ghost" href="/get-involved">Get involved</Link>
          </div>
        </div>
      </section>

      <section className="section mission-strip">
        <div className="container two-col">
          <div>
            <p className="eyebrow">Our purpose</p>
            <h2>Opportunity should not depend on a family&apos;s financial circumstances.</h2>
          </div>
          <div className="mission-copy">
            <p>Konuko Foundation was formed by five cousins — Emmy, Felix, Mercy, Goluck and Jodom Konuko — around a shared commitment to educational empowerment.</p>
            <Link href="/about" className="text-link">Read our story →</Link>
          </div>
        </div>
      </section>

      <section className="section soft-bg">
        <div className="container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">What we do</p>
              <h2>Three starting points. One goal.</h2>
            </div>
            <p>Our current work focuses on removing practical barriers that keep learners from education and digital opportunity.</p>
          </div>
          <div className="program-grid">
            {programs.map((program) => (
              <article className="program-card" key={program.slug}>
                <div className="program-image">
                  <Image src={program.image} alt="" fill className="cover" />
                </div>
                <div className="program-body">
                  <span className="number-chip">{program.icon}</span>
                  <h3>{program.title}</h3>
                  <p>{program.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section impact-band">
        <div className="container impact-layout">
          <div>
            <p className="eyebrow light">Growing responsibly</p>
            <h2>Impact we can explain, not just claim.</h2>
            <p>As projects launch, the foundation can publish verified annual figures, project updates and downloadable reports.</p>
          </div>
          <div className="impact-preview">
            <div><strong>Annual</strong><span>Impact reporting</span></div>
            <div><strong>Open</strong><span>Project updates</span></div>
            <div><strong>Clear</strong><span>Use of support</span></div>
            <Link href="/reports" className="button button-light">View annual reports</Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container feature-row">
          <div className="feature-image-wrap">
            <Image src="https://images.pexels.com/photos/5940714/pexels-photo-5940714.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="A student using a laptop for learning" fill className="cover" />
          </div>
          <div className="feature-copy">
            <p className="eyebrow">Access matters</p>
            <h2>A connected learner has a wider classroom.</h2>
            <p>Internet and device access can unlock research, applications, digital learning, skills development and exposure to opportunities far beyond the local community.</p>
            <Link href="/programs" className="text-link">See our digital access work →</Link>
          </div>
        </div>
      </section>

      <section className="section cta-section">
        <div className="container cta-card">
          <div>
            <p className="eyebrow light">Be part of the work</p>
            <h2>Support a learner. Share a device. Build access.</h2>
          </div>
          <div>
            <p>Konuko Foundation is at the beginning of its journey. We welcome people and organisations who want to help build sustainable educational opportunities.</p>
            <Link href="/get-involved" className="button button-light">Ways to get involved</Link>
          </div>
        </div>
      </section>
    </main>
  )
}
