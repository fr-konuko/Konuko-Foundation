import { defineQuery } from 'next-sanity'

export const PROGRAMS_QUERY = defineQuery(`
  *[_type == "program" && active == true] | order(order asc) {
    _id,
    title,
    "slug": slug.current,
    summary,
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
    order,
    "photoUrl": photo.asset->url
  }
`)