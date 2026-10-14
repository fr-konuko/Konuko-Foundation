import { defineField, defineType } from 'sanity'

export const storyType = defineType({
  name: 'story',
  title: 'Impact Story',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: r => r.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' } }),
    defineField({ name: 'personName', title: 'Person name', type: 'string' }),
    defineField({ name: 'age', title: 'Age', type: 'number', validation: r => r.min(0).integer() }),
    defineField({ name: 'location', title: 'Location', type: 'string' }),
    defineField({
      name: 'summary',
      title: 'Card summary',
      type: 'text',
      rows: 4,
      description: 'A short preview shown on the homepage and impact page.',
    }),
    defineField({
      name: 'fullStory',
      title: 'Full story',
      type: 'text',
      rows: 12,
      description: 'The complete story shown after selecting Learn more.',
    }),
    defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'publishedAt', title: 'Published date', type: 'datetime' }),
  ],
})
