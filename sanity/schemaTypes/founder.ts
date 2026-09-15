import { defineField, defineType } from 'sanity'

export const founderType = defineType({
  name: 'founder',
  title: 'Founder',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string', validation: r => r.required() }),
    defineField({ name: 'role', title: 'Role', type: 'string' }),
    defineField({ name: 'bio', title: 'Short bio', type: 'text', rows: 5 }),
    defineField({ name: 'photo', title: 'Photo', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'order', title: 'Display order', type: 'number', initialValue: 10 }),
  ],
})
