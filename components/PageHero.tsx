type PageHeroProps = {
  eyebrow: string
  title: string
  intro?: string
  dark?: boolean
}

export function PageHero({ eyebrow, title, intro, dark = true }: PageHeroProps) {
  return (
    <section className={`page-hero${dark ? ' dark' : ''}`}>
      <div className="container narrow">
        <span className="eyebrow">● {eyebrow}</span>
        <h1>{title}</h1>
        {intro && <p>{intro}</p>}
      </div>
    </section>
  )
}
