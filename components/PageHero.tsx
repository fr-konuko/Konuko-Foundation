type PageHeroProps = {
  eyebrow: string
  title: string
  intro?: string
  dark?: boolean
  narrow?: boolean
}

export function PageHero({ eyebrow, title, intro, dark = true, narrow = true }: PageHeroProps) {
  return (
    <section className={`page-hero${dark ? ' dark' : ''}`}>
      <div className={`container${narrow ? ' narrow' : ''}`}>
        <span className="eyebrow">● {eyebrow}</span>
        <h1>{title}</h1>
        {intro && <p>{intro}</p>}
      </div>
    </section>
  )
}
