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
        list: [
          { title: 'Learned', value: 'Learned' },
          { title: 'Learning', value: 'Learning' },
          { title: 'Planned', value: 'Planned' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Backend', value: 'Backend' },
          { title: 'AI/ML', value: 'AI/ML' },
          { title: 'DevOps', value: 'DevOps' },
          { title: 'Frontend', value: 'Frontend' },
          { title: 'Tools', value: 'Tools' },
        ],
        layout: 'radio',
      },
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
