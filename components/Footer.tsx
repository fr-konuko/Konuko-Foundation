import Link from 'next/link'
import { Logo } from './Logo'

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <Logo />
          <p className="footer-note">Expanding access to education, technology and opportunity.</p>
        </div>
        <div>
          <h4>Explore</h4>
          <Link href="/about">About us</Link>
          <Link href="/programs">Programs</Link>
          <Link href="/impact">Impact</Link>
          <Link href="/reports">Annual reports</Link>
        </div>
        <div>
          <h4>Take action</h4>
          <Link href="/get-involved">Get involved</Link>
          <Link href="/contact">Contact</Link>
          <a href="mailto:hello@konukofoundation.org">hello@konukofoundation.org</a>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} Konuko Foundation</span>
        <span>Education • Access • Opportunity</span>
      </div>
    </footer>
  )
}
