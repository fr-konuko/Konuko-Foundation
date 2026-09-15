import { defineField, defineType } from 'sanity'

export const programType = defineType({
  name: 'program',
  title: 'Program',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Program name', type: 'string', validation: r => r.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: r => r.required() }),
    defineField({ name: 'summary', title: 'Short description', type: 'text', rows: 4 }),
    defineField({ name: 'image', title: 'Featured image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'active', title: 'Active program', type: 'boolean', initialValue: true }),
    defineField({ name: 'order', title: 'Display order', type: 'number', initialValue: 10 }),
  ],
})
