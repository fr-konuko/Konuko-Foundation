import { defineField, defineType } from 'sanity'

export const siteSettingsType = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({ name: 'mission', title: 'Mission statement', type: 'text', rows: 4 }),
    defineField({ name: 'email', title: 'Public email', type: 'string' }),
    defineField({ name: 'phone', title: 'Phone', type: 'string' }),
    defineField({ name: 'donationNote', title: 'Donation note', type: 'text', rows: 4 }),
  ],
})
