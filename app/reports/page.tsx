import { PageHero } from '@/components/PageHero'
import Link from 'next/link'
import { getSanityClient } from '@/sanity/lib/client'
import { REPORTS_QUERY } from '@/sanity/lib/queries'

type Report = {
  _id: string
  title: string
  year: number
  summary?: string
  fileUrl?: string
}

export const revalidate = 60

async function getReports(): Promise<Report[]> {
  const client = getSanityClient()
  if (!client) return []
  try {
    return await client.fetch(REPORTS_QUERY)
  } catch {
    return []
  }
}

export const metadata = {
  title: 'Annual Reports',
  description: 'Download Konuko Foundation annual reports — transparent summaries of our programs, impact and spending.',
}

export default async function ReportsPage() {
  const reports = await getReports()

  return (
    <main>

      <PageHero
        eyebrow="Transparency"
        title="Annual reports & accountability."
        intro="A home for year-by-year summaries of what we did, who we reached, what we learned and where support was directed."
      />


      <section className="section">
        <div className="container">

          {reports.length > 0 ? (
            <>
              <p className="eyebrow">All Reports</p>
              <h2 style={{ marginBottom: '48px', maxWidth: '560px' }}>
                Download our published reports.
              </h2>
              <div className="report-list">
                {reports.map((report) => (
                  <article className="report-row" key={report._id}>
                    <div className="report-year">{report.year}</div>
                    <div>
                      <h2>{report.title}</h2>
                      {report.summary && <p>{report.summary}</p>}
                    </div>
                    {report.fileUrl ? (
                      <a
                        className="btn btn-primary btn-sm"
                        href={report.fileUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Download PDF
                      </a>
                    ) : (
                      <span className="muted" style={{ fontSize: '.88rem', whiteSpace: 'nowrap' }}>
                        Coming soon
                      </span>
                    )}
                  </article>
                ))}
              </div>
            </>
          ) : (
            <div className="empty-state">
              <span>Annual reporting starts here</span>
              <h2>No annual report has been published yet.</h2>
              <p>
                When the first reporting year is complete, add an Annual Report
                in Sanity Studio and it will appear on this page automatically.
              </p>
              <Link href="/impact" className="btn btn-primary" style={{ marginTop: '24px' }}>
                View our impact so far →
              </Link>
            </div>
          )}

        </div>
      </section>


      {/* ACCOUNTABILITY COMMITMENT */}
      <section className="section soft-bg">
        <div className="container two-col align-start">
          <div>
            <p className="eyebrow">Our Commitment</p>
            <h2>Transparent by design.</h2>
          </div>
          <div className="prose">
            <p>
              Konuko Foundation is committed to publishing clear, honest accounts
              of how support is received and directed. Every annual report will
              include program outcomes, beneficiary numbers, financial use and
              lessons learned.
            </p>
            <p>
              We believe accountability builds the trust needed to grow our
              community of supporters and partners over time.
            </p>
            <Link href="/contact" className="text-link" style={{ marginTop: '8px', display: 'inline-flex' }}>
              Contact us about reporting →
            </Link>
          </div>
        </div>
      </section>

    </main>
  )
}
