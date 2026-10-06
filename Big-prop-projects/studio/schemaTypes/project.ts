import { defineArrayMember, defineField, defineType } from 'sanity'
import { DocumentTextIcon } from '@sanity/icons/DocumentText'
import { ImageIcon } from '@sanity/icons/Image'

const projectTypes = [
  { title: 'Painting', value: 'painting' },
  { title: 'Waterproofing', value: 'waterproofing' },
  { title: 'Residential Renovation', value: 'residential' },
  { title: 'Commercial Renovation', value: 'commercial' },
  { title: 'Development', value: 'development' },
]

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'title', title: 'Title', type: 'string',
      description: 'The project name shown on cards and the individual project page.',
      validation: (rule) => rule.required().max(120).custom(value =>
        value && !value.trim() ? 'Enter a project title.' : true),
    }),
    defineField({
      name: 'projectType', title: 'Project type', type: 'string',
      description: 'Select the main type of work for this project. These values match the website filter categories.',
      options: { list: projectTypes, layout: 'dropdown' },
      validation: (rule) => rule.required().custom(value =>
        !value || projectTypes.some(option => option.value === value)
          ? true : 'Select a project type from the list.'),
    }),
    defineField({
      name: 'slug', title: 'URL slug', type: 'slug',
      description: 'Click Generate after entering the title. Keep this stable once its URL is published.',
      options: { source: 'title', maxLength: 96 },
      validation: (rule) => rule.required().custom(value =>
        value?.current && !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value.current)
          ? 'Use lowercase letters, numbers and single hyphens.' : true),
    }),
    defineField({
      name: 'description', title: 'Description', type: 'text', rows: 4,
      description: 'Plain-text project summary used on project cards and the detail page.',
      validation: (rule) => [
        rule.required().max(2000).custom(value => value && !value.trim() ? 'Enter a description.' : true),
        rule.max(250).warning('A shorter summary is easier to read on project cards.'),
      ],
    }),
    defineField({
      name: 'location', title: 'Location', type: 'string',
      description: 'For example: Brentwood Park, Benoni.',
      validation: (rule) => rule.required().max(160).custom(value =>
        value && !value.trim() ? 'Enter a location.' : true),
    }),
    defineField({
      name: 'date', title: 'Project date', type: 'date',
      description: 'Project completion/display date, not the date this entry was created. If only the month is known, use its first day. The website can display month and year.',
      options: { dateFormat: 'DD MMMM YYYY' },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'images', title: 'Project images', type: 'array',
      description: 'Drag to reorder. The first image is the card cover and first gallery photo. Add one or more real images; duplicates are not needed.',
      options: { layout: 'grid' },
      validation: (rule) => rule.required().min(1),
      of: [defineArrayMember({
        name: 'projectImage', title: 'Project image', type: 'image', icon: ImageIcon,
        options: { hotspot: true },
        validation: (rule) => rule.required().assetRequired(),
        fields: [defineField({
          name: 'alt', title: 'Alternative text', type: 'string',
          description: 'Describe the photograph for someone who cannot see it.',
          validation: (rule) => rule.required().max(200).custom(value =>
            value && !value.trim() ? 'Describe the image.' : true),
        })],
        preview: { select: { title: 'alt', media: 'asset' } },
      })],
    }),
  ],
  orderings: [
    { title: 'Project date, newest first', name: 'dateDesc', by: [{ field: 'date', direction: 'desc' }, { field: 'title', direction: 'asc' }] },
    { title: 'Title, A–Z', name: 'titleAsc', by: [{ field: 'title', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'title', projectType: 'projectType', location: 'location', date: 'date', media: 'images.0' },
    prepare({ title, projectType, location, date, media }) {
      const typeLabel = projectTypes.find(option => option.value === projectType)?.title
      return { title: title || 'Untitled project', subtitle: [typeLabel, location, date].filter(Boolean).join(' · '), media }
    },
  },
})
