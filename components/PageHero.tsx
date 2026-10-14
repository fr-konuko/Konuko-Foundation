type PageHeroProps = {
  eyebrow?: string
  title: string
  intro?: string
}

export function PageHero({ eyebrow, title, intro }: PageHeroProps) {
  return (
    <section className="page-hero">
      <div className="container">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1>{title}</h1>
        {intro && <p>{intro}</p>}
      </div>
    </section>
  )
}
