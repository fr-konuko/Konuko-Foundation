import { defineField, defineType } from 'sanity'

export const impactStatisticType = defineType({
  name: 'impactStatistic',
  title: 'Impact Statistic',
  type: 'document',

  fields: [
    defineField({
      name: 'value',
      title: 'Value',
      type: 'string',
      description: 'Examples: 24, 50+, 1,200',
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      description: 'Example: Learners Supported',
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'description',
      title: 'Short description',
      type: 'text',
      rows: 3,
    }),

    defineField({
      name: 'active',
      title: 'Show on website',
      type: 'boolean',
      initialValue: true,
    }),

    defineField({
      name: 'order',
      title: 'Display order',
      type: 'number',
      initialValue: 10,
    }),
  ],

  preview: {
    select: {
      title: 'label',
      subtitle: 'value',
    },
  },
})