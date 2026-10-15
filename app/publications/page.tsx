import Link from 'next/link'
import { PageHero } from '@/components/PageHero'
import { getSanityClient } from '@/sanity/lib/client'
import { REPORTS_QUERY } from '@/sanity/lib/queries'

export const revalidate = 60

export const metadata = { title: 'Publications' }

type Report = {
  _id: string
  title: string
  year: number
  summary?: string
  fileUrl?: string
}

const fallbackReports = [
  'Annual Impact Report 2026',
  'Financial Statement 2026',
  'Governance & Compliance Summary',
  'Program Impact Brief',
]

export default async function PublicationsPage() {
  const client = getSanityClient()
  const reports: Report[] = client
    ? await client.fetch(REPORTS_QUERY, {}, { next: { revalidate: 60 } })
    : []

  return (
    <>
      <PageHero
        dark={false}
        eyebrow="REPORTS & DOCUMENTS"
        title="Publications"
        intro="We believe in clear, responsible reporting. Every contribution should be traceable to real work and measurable impact."
      />
      <section className="section pt0">
        <div className="container">
          <div className="allocation">
            <div className="big-percent">88%</div>
            <div>
              <p><i className="dot d1" />Direct Programs <b>60%</b></p>
              <p><i className="dot d2" />Education Support <b>20%</b></p>
              <p><i className="dot d3" />Community Outreach <b>8%</b></p>
              <p><i className="dot d4" />Admin &amp; Operations <b>12%</b></p>
            </div>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <span className="eyebrow">● DOCUMENTS</span>
          <h2>Annual Reports</h2>
          <div className="report-list">
            {reports.length > 0 ? reports.map((report) => (
              <article className="report-row" key={report._id}>
                <div>
                  <span className="doc-icon">📄</span>
                  <div>
                    <h3>{report.title}</h3>
                    <p>{report.summary || `PDF · ${report.year}`}</p>
                  </div>
                </div>
                {report.fileUrl ? (
                  <a className="btn btn-outline" href={report.fileUrl} target="_blank" rel="noreferrer">
                    ↓ Download
                  </a>
                ) : <span className="muted">Coming soon</span>}
              </article>
            )) : fallbackReports.map((report, index) => (
              <article className="report-row" key={report}>
                <div>
                  <span className="doc-icon">📄</span>
                  <div><h3>{report}</h3><p>PDF · Sample document {index + 1}</p></div>
                </div>
                <button className="btn btn-outline" type="button">↓ Download</button>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="cta">
        <div className="container">
          <h2>Your Support Creates Lasting Impact</h2>
          <p>We are committed to transparent, measurable and responsible use of every contribution.</p>
          <div className="button-row">
            <Link className="btn btn-light" href="/donate">Donate Now</Link>
            <Link className="btn btn-outline-light" href="/reports">View Reports</Link>
          </div>
        </div>
      </section>
    </>
  )
}
