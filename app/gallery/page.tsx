'use client'

import { useState } from 'react'
import { PageHero } from '@/components/PageHero'
import { gallery } from '@/data/site'

const categories = ['All', 'Education', 'Events', 'Community', 'Volunteers']

export default function GalleryPage() {
  const [category, setCategory] = useState('All')
  const items = category === 'All'
    ? gallery
    : gallery.filter(([itemCategory]) => itemCategory === category)

  return (
    <>
      <PageHero
        eyebrow="PHOTO GALLERY"
        title="Our Impact in Pictures"
        intro="Explore moments from our programs, communities, events and volunteers."
      />
      <section className="section">
        <div className="container">
          <div className="filters" aria-label="Filter gallery by category">
            {categories.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setCategory(item)}
                className={category === item ? 'active' : ''}
                aria-pressed={category === item}
              >
                {item}
              </button>
            ))}
          </div>
          <div className="masonry">
            {items.map(([itemCategory, image], index) => (
              <figure key={image}>
                <img src={image} alt={`${itemCategory} gallery image ${index + 1}`} />
                <figcaption>{itemCategory}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
