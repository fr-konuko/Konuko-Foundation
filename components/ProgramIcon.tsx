export function ProgramIcon({ title }: { title: string }) {
  const subject = title.toLowerCase()
  const paths = /internet|connect/.test(subject) ? (
    <><path d="M2 8.5a16 16 0 0 1 20 0M5 12a11 11 0 0 1 14 0M8.5 15.5a5.5 5.5 0 0 1 7 0" /><circle cx="12" cy="19" r="1" /></>
  ) : /technology|digital|computer/.test(subject) ? (
    <><rect x="4" y="3" width="16" height="12" rx="2" /><path d="M9 15v5m6-5v5M6 20h12" /></>
  ) : /community|well-being/.test(subject) ? (
    <><circle cx="9" cy="7" r="3" /><path d="M3 21v-3a6 6 0 0 1 12 0v3M16 4a3 3 0 0 1 0 6m2 4a6 6 0 0 1 3 5v2" /></>
  ) : (
    <><path d="M12 5v16M12 5C9 3 5 3 2 4v15c3-1 7-1 10 2 3-3 7-3 10-2V4c-3-1-7-1-10 1Z" /></>
  )

  return (
    <div className="icon-chip" aria-hidden="true">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--orange)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        {paths}
      </svg>
    </div>
  )
}
