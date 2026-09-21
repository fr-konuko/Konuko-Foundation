'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
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
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    const savedTheme = window.localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const nextTheme = savedTheme === 'dark' || (!savedTheme && prefersDark) ? 'dark' : 'light'

    setTheme(nextTheme)
    document.documentElement.setAttribute('data-theme', nextTheme)
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    window.localStorage.setItem('theme', theme)
  }, [theme])

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

        <div className="header-actions">
          <Link href="/contact" className="button button-small desktop-contact">
            Contact
          </Link>

          <button
            type="button"
            className="theme-toggle"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            onClick={() => setTheme((current) => (current === 'dark' ? 'light' : 'dark'))}
          >
            <span aria-hidden="true">{theme === 'dark' ? '☀' : '☾'}</span>
            <span>{theme === 'dark' ? 'Light' : 'Dark'}</span>
          </button>
        </div>

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
