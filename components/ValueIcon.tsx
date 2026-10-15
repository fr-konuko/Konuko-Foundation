export function ValueIcon({ name }: { name: 'mission' | 'vision' | 'community' | 'accountability' }) {
  return (
    <svg className="value-icon" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      {name === 'mission' && <>
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="12" cy="12" r="1" />
      </>}
      {name === 'vision' && <>
        <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
        <circle cx="12" cy="12" r="3" />
      </>}
      {name === 'community' && <>
        <circle cx="12" cy="7" r="3" />
        <path d="M6 21v-2a6 6 0 0 1 12 0v2M18 4a3 3 0 0 1 0 6M22 20v-2a5 5 0 0 0-3-4.58M6 4a3 3 0 0 0 0 6M2 20v-2a5 5 0 0 1 3-4.58" />
      </>}
      {name === 'accountability' && <>
        <path d="M4 3v18h17M8 16v-4M13 16V8M18 16V5" />
      </>}
    </svg>
  )
}
