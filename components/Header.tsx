'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const links = [
  ['Home', '/'],
  ['About', '/about'],
  ['Volunteer', '/volunteer'],
  ['Gallery', '/gallery'],
  ['Publications', '/publications'],
  ['Contact', '/contact'],
]

export function Header() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="site-header">
      <div className="nav-wrap">
        <Link href="/" className="brand" aria-label="Konuko Foundation home">
          <Image
            src="/images/konuko-foundation-unity-logo.png"
            alt="Konuko Foundation"
            width={1976}
            height={796}
            sizes="(max-width: 900px) 127.5px, 161.25px"
            priority
            className="brand-logo"
          />
        </Link>
        <nav aria-label="Main navigation" className="desktop-navigation">
          {links.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className={pathname === href ? 'active' : ''}
            >
              {label}
            </Link>
          ))}
        </nav>
        <Link href="/donate" className="btn btn-primary nav-donate">Donate Now</Link>
        <button
          type="button"
          className="v2-menu-toggle"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          aria-controls="v2-mobile-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
      {menuOpen && (
        <nav id="v2-mobile-navigation" className="v2-mobile-navigation" aria-label="Mobile navigation">
          {links.map(([label, href]) => (
            <Link key={href} href={href} onClick={() => setMenuOpen(false)}>
              {label}
            </Link>
          ))}
          <Link href="/donate" onClick={() => setMenuOpen(false)}>Donate Now</Link>
        </nav>
      )}
    </header>
  )
}
