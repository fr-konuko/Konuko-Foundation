'use client'

import { useState } from 'react'

export type GalleryPhoto = {
  _id: string
  title: string
  alt?: string
  category: string
  imageUrl: string
}

const categories = ['All', 'Education', 'Events', 'Community', 'Volunteers']

export function GalleryPhotos({ photos }: { photos: GalleryPhoto[] }) {
  const [category, setCategory] = useState('All')
  const items = category === 'All' ? photos : photos.filter(photo => photo.category === category)

  if (!photos.length) return <p className="gallery-empty">Coming Soon!</p>

  return (
    <>
      <div className="filters" aria-label="Filter gallery by category">
        {categories.map(item => (
          <button key={item} type="button" onClick={() => setCategory(item)} className={category === item ? 'active' : ''} aria-pressed={category === item}>
            {item}
          </button>
        ))}
      </div>
      {items.length ? (
        <div className="masonry">
          {items.map(photo => (
            <figure key={photo._id}>
              {/* Preserve each photo's natural aspect ratio in the masonry layout. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={photo.imageUrl} alt={photo.alt || photo.title} loading="lazy" />
              <figcaption>{photo.category}</figcaption>
            </figure>
          ))}
        </div>
      ) : <p className="gallery-empty">Coming Soon!</p>}
    </>
  )
}
