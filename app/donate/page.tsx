import { DonationForm } from '@/components/DonationForm'
import { getSanityClient } from '@/sanity/lib/client'
import { SITE_SETTINGS_QUERY } from '@/sanity/lib/queries'

export const revalidate = 60

type SiteSettings = {
  donationNote?: string
} | null

export default async function DonatePage() {
  const client = getSanityClient()
  const settings: SiteSettings = client
    ? await client.fetch(SITE_SETTINGS_QUERY, {}, { next: { revalidate: 60 } })
    : null

  return (
    <>
      <section className="donate-hero">
        <div className="container narrow">
          <span className="eyebrow light">● MAKE A DIFFERENCE</span>
          <h1>Support a Learner. Strengthen a Community.</h1>
          <p>Your support helps fund education, skills development and practical community programs.</p>
        </div>
      </section>
      <section className="section">
        <div className="container donate-grid">
          <DonationForm donationNote={settings?.donationNote} />
          <div>
            <h2>Your Impact</h2>
            <div className="impact-card">📚<h3>KSh 500 — Learning Materials</h3><p>Helps provide basic learning resources and stationery.</p></div>
            <div className="impact-card">🎓<h3>KSh 2,500 — Learning Support</h3><p>Supports mentoring, tutoring or participation in a learning activity.</p></div>
            <div className="impact-card">💻<h3>KSh 5,000 — Digital Skills</h3><p>Supports practical digital learning and access to training resources.</p></div>
            <div className="impact-card">🔒<h3>Transparent Giving</h3><p>We publish impact and financial information so supporters can see how funds are used.</p></div>
          </div>
        </div>
      </section>
      <section className="section trust">
        <div className="container">
          <span className="eyebrow">● WHY TRUST US</span>
          <h2>Built on Accountability</h2>
          <div className="grid three">
            <div className="soft-card">🏛️<h3>Registered Organization</h3><p>Replace this text with Konuko&apos;s verified registration details.</p></div>
            <div className="soft-card">📊<h3>Transparent Reporting</h3><p>Publish reports, updates and measurable outcomes.</p></div>
            <div className="soft-card">💯<h3>Impact Focused</h3><p>Programs are designed around practical, measurable community outcomes.</p></div>
          </div>
        </div>
      </section>
    </>
  )
}
