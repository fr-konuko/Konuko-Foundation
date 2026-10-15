import { defineField, defineType } from 'sanity'

export const galleryPhotoType = defineType({
  name: 'galleryPhoto',
  title: 'Gallery Photo',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: r => r.required() }),
    defineField({ name: 'image', title: 'Photo', type: 'image', options: { hotspot: true }, validation: r => r.required().assetRequired() }),
    defineField({ name: 'alt', title: 'Image description', type: 'string', description: 'Describe the photo for visitors using screen readers.', validation: r => r.required() }),
    defineField({
      name: 'category', title: 'Category', type: 'string',
      options: { list: ['Education', 'Events', 'Community', 'Volunteers'] },
      initialValue: 'Community', validation: r => r.required(),
    }),
    defineField({ name: 'order', title: 'Display order', type: 'number', initialValue: 10 }),
  ],
  preview: { select: { title: 'title', subtitle: 'category', media: 'image' } },
})
