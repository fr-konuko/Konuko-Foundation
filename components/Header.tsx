import Link from 'next/link'
import { Logo } from './Logo'

const links = [
  ['About', '/about'],
  ['Programs', '/programs'],
  ['Impact', '/impact'],
  ['Annual Reports', '/reports'],
  ['Get Involved', '/get-involved'],
]

export function Header() {
  return (
    <header className="site-header">
      <div className="container nav-wrap">
        <Logo />
        <nav aria-label="Main navigation">
          {links.map(([label, href]) => (
            <Link key={href} href={href}>{label}</Link>
          ))}
        </nav>
        <Link href="/contact" className="button button-small desktop-contact">Contact</Link>
        <details className="mobile-menu">
          <summary aria-label="Open navigation">Menu</summary>
          <div className="mobile-menu-panel">
            {links.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
            <Link href="/contact">Contact</Link>
          </div>
        </details>
      </div>
    </header>
  )
}
