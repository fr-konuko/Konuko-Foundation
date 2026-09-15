import Link from 'next/link'

export function Logo() {
  return (
    <Link href="/" className="brand" aria-label="Konuko Foundation home">
      <span className="brand-mark" aria-hidden="true">K</span>
      <span className="brand-copy">
        <strong>Konuko</strong>
        <small>Foundation</small>
      </span>
    </Link>
  )
}
