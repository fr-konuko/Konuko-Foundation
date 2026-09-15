import { PageHero } from '@/components/PageHero'
import { impact } from '@/lib/fallback-content'

export const metadata = { title: 'Impact' }

export default function ImpactPage() {
  return (
    <main>
      <PageHero eyebrow="Our impact" title="Measure what changes." intro="The foundation is still at an early stage. Rather than invent numbers, this page is ready for verified project results as activities begin." />
      <section className="section">
        <div className="container metric-grid">
          {impact.map(([label, value]) => <div className="metric-card" key={label}><strong>{value}</strong><span>{label}</span></div>)}
        </div>
      </section>
      <section className="section soft-bg">
        <div className="container two-col align-start">
          <div><p className="eyebrow">How we will report</p><h2>Simple, verifiable and annual.</h2></div>
          <div className="prose"><p>Each year, Konuko Foundation can publish a short impact report covering beneficiaries reached, activities delivered, funds or materials deployed, lessons learned and priorities for the following year.</p><p>The website is already structured to host those reports as downloadable PDFs.</p></div>
        </div>
      </section>
    </main>
  )
}
