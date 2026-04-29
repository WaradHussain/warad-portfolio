// sanity/schemas/techStack.ts
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'techStack',
  title: 'Tech Stack',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Tech Name',
      type: 'string',
      description: 'Exact name used to fetch logo automatically (e.g. Python, FastAPI, Docker)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Language', value: 'language' },
          { title: 'Framework', value: 'framework' },
          { title: 'Tool', value: 'tool' },
          { title: 'Database', value: 'database' },
          { title: 'Cloud', value: 'cloud' },
        ],
        layout: 'radio',
      },
      description: 'Used to group items into marquee rows',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      description: 'Lower number = appears first in row',
      initialValue: 10,
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'category' },
  },
})
