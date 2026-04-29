// sanity/schemas/roadmap.ts
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'roadmap',
  title: 'Roadmap',
  type: 'document',
  fields: [
    defineField({
      name: 'topic',
      title: 'Topic',
      type: 'string',
      description: 'e.g. FastAPI Advanced',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        // Status stays as radio — only 3 valid values, no reason to free-text this
        list: [
          { title: '✅ Learned', value: 'Learned' },
          { title: '🔵 Learning Now', value: 'Learning' },
          { title: '⬜ Planned', value: 'Planned' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      // Free text — type any category (Backend, AI/ML, DevOps, Frontend, Tools, etc.)
      // Automatically appears as filter button on roadmap page
      description: 'e.g. Backend, AI/ML, DevOps, Frontend, Tools — type anything, appears as filter automatically',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'resources',
      title: 'Resources',
      type: 'array',
      of: [{ type: 'url' }],
      description: 'Learning resources / links',
    }),
    defineField({
      name: 'projectSlug',
      title: 'Related Project Slug',
      type: 'string',
      description: 'Slug of a related project (if built something with this)',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Display order within each status column',
    }),
  ],
  preview: {
    select: { title: 'topic', subtitle: 'status' },
  },
})
