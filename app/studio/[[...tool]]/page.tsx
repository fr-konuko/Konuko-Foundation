'use client'

import { NextStudio } from 'next-sanity/studio'
import config from '@/sanity.config'
import { hasSanityConfig } from '@/sanity/env'

export default function StudioPage() {
  if (!hasSanityConfig) {
    return (
      <main className="studio-shell" style={{ padding: 40, fontFamily: 'system-ui' }}>
        <h1>Connect Sanity first</h1>
        <p>Copy .env.example to .env.local and add your Sanity project ID.</p>
      </main>
    )
  }
  return <div className="studio-shell"><NextStudio config={config} /></div>
}
