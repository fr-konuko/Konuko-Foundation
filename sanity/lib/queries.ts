import { defineQuery } from 'next-sanity'

export const GALLERY_PHOTOS_QUERY = defineQuery(`
  *[_type == "galleryPhoto" && defined(image.asset->url)] | order(order asc, _createdAt desc) {
    _id,
    title,
    alt,
    category,
    "imageUrl": image.asset->url
  }
`)

export const PROGRAMS_QUERY = defineQuery(`
  *[_type == "program" && active != false] | order(order asc) {
    _id,
    title,
    slug,
    summary,
    order,
    "imageUrl": image.asset->url
  }
`)

export const REPORTS_QUERY = defineQuery(`
  *[_type == "annualReport"] | order(year desc) {
    _id,
    title,
    year,
    summary,
    "fileUrl": reportFile.asset->url
  }
`)
export const FOUNDERS_QUERY = defineQuery(`
  *[_type == "founder"] | order(order asc) {
    _id,
    name,
    role,
    bio,
    message,
    order,
    "photoUrl": photo.asset->url
  }
`)
export const FOUNDER_BY_ID_QUERY = defineQuery(`
  *[_type == "founder" && _id == $id][0] {
    _id,
    name,
    role,
    message,
    "photoUrl": photo.asset->url
  }
`)
export const IMPACT_STORIES_QUERY = defineQuery(`
  *[_type == "story"] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    personName,
    age,
    location,
    summary,
    fullStory,
    publishedAt,
    "imageUrl": image.asset->url
  }
`)
export const STORY_BY_SLUG_QUERY = defineQuery(`
  *[_type == "story" && (slug.current == $slug || _id == $slug)][0] {
    _id,
    title,
    "slug": slug.current,
    personName,
    age,
    location,
    summary,
    fullStory,
    publishedAt,
    "imageUrl": image.asset->url
  }
`)
export const SITE_SETTINGS_QUERY = defineQuery(`
  *[_type == "siteSettings"][0] {
    mission,
    email,
    phone,
    donationNote,

    heroTitle,
    heroText,
    "heroImageUrl": heroImage.asset->url,

    purposeTitle,

    featureTitle,
    featureText,
    "featureImageUrl": featureImage.asset->url,

    impactTitle,
    impactText,

    ctaTitle,
    ctaText
  }
`)
export const IMPACT_STATISTICS_QUERY = defineQuery(`
  *[_type == "impactStatistic" && active != false]
  | order(order asc) {
    _id,
    value,
    label,
    description,
    order
  }
`)
