import Link from 'next/link'

type CTAProps = {
  title?: string
  text?: string
}

export default function CTA({ title, text }: CTAProps) {
  return (
    <section className="cta">
      <div className="container">
        <h2>{title || 'Be Part of the Change'}</h2>
        <p>{text || 'Your time, skills or resources can help create more opportunity.'}</p>
        <div className="button-row">
          <Link className="btn btn-light" href="/donate">Donate Now</Link>
          <Link className="btn btn-outline-light" href="/volunteer">Get Involved</Link>
        </div>
      </div>
    </section>
  )
}
