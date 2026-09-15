import { PageHero } from '@/components/PageHero'

export const metadata = { title: 'Contact' }

export default function ContactPage() {
  return (
    <main>
      <PageHero eyebrow="Contact" title="Let’s talk about access and opportunity." intro="Use this page for partnership, support, volunteering and general foundation enquiries." />
      <section className="section">
        <div className="container contact-grid">
          <div className="contact-card"><p className="eyebrow">Email</p><h2>hello@konukofoundation.org</h2><p>Replace this starter address with your official foundation email before launch.</p></div>
          <form className="contact-form" action="mailto:hello@konukofoundation.org" method="post" encType="text/plain">
            <label>Name<input name="name" required /></label>
            <label>Email<input name="email" type="email" required /></label>
            <label>Reason<select name="reason"><option>General enquiry</option><option>Partnership</option><option>Donation</option><option>Volunteer</option></select></label>
            <label>Message<textarea name="message" rows={6} required /></label>
            <button className="button" type="submit">Send enquiry</button>
          </form>
        </div>
      </section>
    </main>
  )
}
