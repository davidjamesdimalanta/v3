import { defineType, defineField } from 'sanity'

export const projectAsset = defineType({
  name: 'projectAsset',
  title: 'Project Asset',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Descriptive name for this asset',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'project',
      title: 'Project',
      type: 'string',
      description: 'Which project this asset belongs to',
      options: {
        list: [
          { title: 'GoAble', value: 'goable' },
          { title: 'iHub', value: 'ihub' },
          { title: 'Socratic', value: 'socratic' },
          { title: 'General/Other', value: 'general' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      description: 'Type of asset',
      options: {
        list: [
          { title: 'Cover Image', value: 'cover' },
          { title: 'Case Study', value: 'caseStudy' },
          { title: 'Spread', value: 'spread' },
          { title: 'Design System', value: 'designSystem' },
          { title: 'Mockup', value: 'mockup' },
          { title: 'Web Preview/Meta', value: 'webPreview' },
          { title: 'Other', value: 'other' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'Unique identifier for this asset (auto-generated from title)',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      project: 'project',
      category: 'category',
      media: 'image',
    },
    prepare({ title, project, category, media }) {
      return {
        title: title,
        subtitle: `${project} - ${category}`,
        media: media,
      }
    },
  },
})
