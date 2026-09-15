import { PageHero } from '@/components/PageHero'
import { getSanityClient } from '@/sanity/lib/client'
import { REPORTS_QUERY } from '@/sanity/lib/queries'

type Report = { _id: string; title: string; year: number; summary?: string; fileUrl?: string }

export const dynamic = 'force-dynamic'

async function getReports(): Promise<Report[]> {
  const client = getSanityClient()
  if (!client) return []
  try { return await client.fetch(REPORTS_QUERY) } catch { return [] }
}

export const metadata = { title: 'Annual Reports' }

export default async function ReportsPage() {
  const reports = await getReports()
  return (
    <main>
      <PageHero eyebrow="Transparency" title="Annual reports & accountability." intro="A home for year-by-year summaries of what we did, who we reached, what we learned and where support was directed." />
      <section className="section">
        <div className="container">
          {reports.length > 0 ? (
            <div className="report-list">
              {reports.map(report => <article className="report-row" key={report._id}><div className="report-year">{report.year}</div><div><h2>{report.title}</h2><p>{report.summary}</p></div>{report.fileUrl ? <a className="button button-small" href={report.fileUrl} target="_blank" rel="noreferrer">Open PDF</a> : <span className="muted">PDF coming soon</span>}</article>)}
            </div>
          ) : (
            <div className="empty-state">
              <span>Annual reporting starts here</span>
              <h2>No annual report has been published yet.</h2>
              <p>When the first reporting year is complete, add an Annual Report in Sanity and it will appear on this page automatically.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
