import { PageHero } from '@/components/PageHero'
import { GalleryPhotos, type GalleryPhoto } from '@/components/GalleryPhotos'
import { getSanityClient } from '@/sanity/lib/client'
import { GALLERY_PHOTOS_QUERY } from '@/sanity/lib/queries'

export const revalidate = 60

export default async function GalleryPage() {
  const client = getSanityClient()
  const photos = client
    ? await client.fetch<GalleryPhoto[]>(GALLERY_PHOTOS_QUERY, {}, { next: { revalidate: 60 } })
    : []

  return (
    <>
      <PageHero
        eyebrow="PHOTO GALLERY"
        title="Our Impact in Pictures"
        intro="Explore moments from our programs, communities, events and volunteers."
      />
      <section className="section">
        <div className="container"><GalleryPhotos photos={photos} /></div>
      </section>
    </>
  )
}
