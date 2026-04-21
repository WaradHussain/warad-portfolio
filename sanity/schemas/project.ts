import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Python', value: 'Python' },
          { title: 'AI/ML', value: 'AI/ML' },
          { title: 'Full-Stack', value: 'Full-Stack' },
          { title: 'Tools', value: 'Tools' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'string',
      description: 'One sentence summary',
      validation: (Rule) => Rule.required().max(120),
    }),
    defineField({
      name: 'techStack',
      title: 'Tech Stack',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'githubUrl',
      title: 'GitHub URL',
      type: 'url',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'liveDemoUrl',
      title: 'Live Demo URL',
      type: 'url',
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video URL',
      type: 'url',
      description: 'YouTube ya Loom URL — embed automatic hoga',
    }),
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail',
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt text',
          validation: (Rule) => Rule.required(),
        },
      ],
    }),
    defineField({
      name: 'problem',
      title: 'Problem',
      type: 'text',
      description: 'What problem did this solve?',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'solution',
      title: 'Solution',
      type: 'text',
      description: 'How did you approach it?',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'architecture',
      title: 'Architecture',
      type: 'text',
      description: 'System design description',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'challenges',
      title: 'Challenges',
      type: 'text',
      description: 'Hardest part and how you solved it',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'results',
      title: 'Results',
      type: 'text',
      description: 'What changed after shipping',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'wouldRedo',
      title: 'Would Redo',
      type: 'text',
      description: 'What would you do differently',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower number = shown first',
    }),
  ],
  preview: {
    select: { title: 'title', media: 'thumbnail', category: 'category' },
    prepare({ title, media, category }) {
      return { title, subtitle: category, media }
    },
  },
})
