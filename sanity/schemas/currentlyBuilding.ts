// sanity/schemas/currentlyBuilding.ts
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'currentlyBuilding',
  title: 'Currently Building',
  type: 'document',
  fields: [
    defineField({
      name: 'description',
      title: 'Description',
      type: 'string',
      description: 'Short text shown in the pill on homepage — e.g. "waradhussain.com — engineering portfolio"',
      validation: (Rule) => Rule.required().max(80),
    }),
    defineField({
      name: 'link',
      title: 'Link (optional)',
      type: 'url',
      description: 'Optional URL — clicking the pill will open this link',
    }),
    defineField({
      name: 'isActive',
      title: 'Show on Site',
      type: 'boolean',
      description: 'Toggle to show/hide this item on homepage. Only most recent active item shows.',
      initialValue: true,
    }),
  ],
  preview: {
    select: { title: 'description', subtitle: 'isActive' },
    prepare({ title, subtitle }) {
      return { title, subtitle: subtitle ? '✅ Active' : '⬜ Hidden' }
    },
  },
})
