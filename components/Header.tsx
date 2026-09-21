'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Logo } from './Logo'

const links = [
  ['About', '/about'],
  ['Programs', '/programs'],
  ['Impact', '/impact'],
  ['Annual Reports', '/reports'],
  ['Get Involved', '/get-involved'],
]

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="site-header">
      <div className="container nav-wrap">
        <Logo />

        <nav aria-label="Main navigation" className="desktop-nav">
          {links.map(([label, href]) => (
            <Link key={href} href={href}>
              {label}
            </Link>
          ))}
        </nav>

        <Link href="/contact" className="button button-small desktop-contact">
          Contact
        </Link>

        <div className="mobile-menu">
          <button
            type="button"
            className="mobile-menu-button"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation-panel"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
            <span />
          </button>

          <div
            id="mobile-navigation-panel"
            className={`mobile-menu-panel${menuOpen ? ' open' : ''}`}
          >
            {links.map(([label, href]) => (
              <Link key={href} href={href} onClick={() => setMenuOpen(false)}>
                {label}
              </Link>
            ))}
            <Link href="/contact" onClick={() => setMenuOpen(false)}>
              Contact
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
