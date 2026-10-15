import { defineField, defineType } from 'sanity'

export const annualReportType = defineType({
  name: 'annualReport',
  title: 'Annual Report',
  type: 'document',
  fields: [
    defineField({ name: 'year', title: 'Year', type: 'number', validation: r => r.required().min(2020).max(2100) }),
    defineField({ name: 'title', title: 'Report title', type: 'string', validation: r => r.required() }),
    defineField({ name: 'summary', title: 'Summary', type: 'text', rows: 5 }),
    defineField({ name: 'cover', title: 'Cover image', type: 'image', options: { hotspot: true } }),
    defineField({
      name: 'reportFile', title: 'Report PDF', type: 'file', options: { accept: '.pdf' },
      validation: rule => rule.custom(async (value, context) => {
        const asset = value?.asset
        if (!asset?._ref) return true
        const metadata = await context.getClient({ apiVersion: '2026-09-01' })
          .fetch<{ mimeType: string } | null>('*[_id == $id][0]{mimeType}', { id: asset._ref })
        return metadata?.mimeType === 'application/pdf' || 'Please upload a PDF document.'
      }),
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'year', media: 'cover' },
    prepare({ title, subtitle, media }) {
      return { title, subtitle: subtitle ? String(subtitle) : '', media }
    },
  },
})
