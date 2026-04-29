// sanity/schemas/currentlyBuilding.ts
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'currentlyBuilding',
  title: 'Currently Building',
  type: 'document',
  fields: [
    defineField({
      name: 'emoji',
      title: 'Emoji',
      type: 'string',
      description: 'Single emoji — e.g. 🚀 🤖 🛠️',
      validation: (Rule) => Rule.required().max(4),
    }),
    defineField({
      name: 'title',
      title: 'Project Title',
      type: 'string',
      description: 'e.g. waradhussain.com — engineering portfolio',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Short Description',
      type: 'text',
      description: 'One or two lines about what you are building',
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: '🗺️ Planning', value: 'planning' },
          { title: '🔨 Building', value: 'building' },
          { title: '🔜 Almost Done', value: 'almost-done' },
          { title: '✅ Shipped', value: 'shipped' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'techTags',
      title: 'Tech Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
      description: 'e.g. Next.js, Python, Sanity',
    }),
    defineField({
      name: 'link',
      title: 'Link (optional)',
      type: 'url',
      description: 'Shown when status is Shipped — links to live project',
    }),
    defineField({
      name: 'isVisible',
      title: 'Show on Site',
      type: 'boolean',
      description: 'Toggle to show/hide without deleting',
      initialValue: true,
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'status', emoji: 'emoji' },
    prepare({ title, subtitle, emoji }) {
      return { title: `${emoji ?? ''} ${title}`, subtitle }
    },
  },
})
