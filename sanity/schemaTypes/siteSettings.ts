import { defineField, defineType } from 'sanity'

export const siteSettingsType = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',

  groups: [
    {
      name: 'general',
      title: 'General',
      default: true,
    },
    {
      name: 'homepage',
      title: 'Homepage',
    },
  ],

  fields: [
    defineField({
      name: 'mission',
      title: 'Mission statement',
      type: 'text',
      rows: 4,
      group: 'general',
    }),

    defineField({
      name: 'email',
      title: 'Public email',
      type: 'string',
      group: 'general',
    }),

    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
      group: 'general',
    }),

    defineField({
      name: 'donationNote',
      title: 'Donation note',
      type: 'text',
      rows: 4,
      group: 'general',
    }),

    // HOMEPAGE HERO

    defineField({
      name: 'heroTitle',
      title: 'Hero title',
      type: 'string',
      group: 'homepage',
    }),

    defineField({
      name: 'heroText',
      title: 'Hero description',
      type: 'text',
      rows: 4,
      group: 'homepage',
    }),

    defineField({
      name: 'heroImage',
      title: 'Hero image',
      type: 'image',
      options: {
        hotspot: true,
      },
      group: 'homepage',
    }),

    // PURPOSE

    defineField({
      name: 'purposeTitle',
      title: 'Purpose heading',
      type: 'string',
      group: 'homepage',
    }),

    // DIGITAL ACCESS

    defineField({
      name: 'featureTitle',
      title: 'Digital access heading',
      type: 'string',
      group: 'homepage',
    }),

    defineField({
      name: 'featureText',
      title: 'Digital access description',
      type: 'text',
      rows: 4,
      group: 'homepage',
    }),

    defineField({
      name: 'featureImage',
      title: 'Digital access image',
      type: 'image',
      options: {
        hotspot: true,
      },
      group: 'homepage',
    }),

    // IMPACT

    defineField({
      name: 'impactTitle',
      title: 'Impact heading',
      type: 'string',
      group: 'homepage',
    }),

    defineField({
      name: 'impactText',
      title: 'Impact description',
      type: 'text',
      rows: 4,
      group: 'homepage',
    }),

    // CTA

    defineField({
      name: 'ctaTitle',
      title: 'Call-to-action heading',
      type: 'string',
      group: 'homepage',
    }),

    defineField({
      name: 'ctaText',
      title: 'Call-to-action description',
      type: 'text',
      rows: 4,
      group: 'homepage',
    }),
  ],
})