import { defineType } from 'sanity';

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    {
      name: 'portfolio',
      title: 'Portfolio',
      type: 'reference',
      to: [{ type: 'portfolio' }],
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'title',
      title: 'Project Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Short Description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'longDescription',
      title: 'Long Description',
      type: 'text',
      rows: 6,
    },
    {
      name: 'thumbnail',
      title: 'Thumbnail Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'media',
      title: 'Media Gallery',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'type',
              title: 'Media Type',
              type: 'string',
              options: {
                list: [
                  { title: 'Image', value: 'image' },
                  { title: 'Video', value: 'video' },
                ],
              },
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {
                hotspot: true,
              },
              hidden: ({ parent }) => parent?.type !== 'image',
            },
            {
              name: 'videoUrl',
              title: 'Video URL',
              type: 'url',
              hidden: ({ parent }) => parent?.type !== 'video',
            },
            {
              name: 'videoThumbnail',
              title: 'Video Thumbnail',
              type: 'image',
              options: {
                hotspot: true,
              },
              hidden: ({ parent }) => parent?.type !== 'video',
            },
            {
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
            },
          ],
        },
      ],
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'year',
      title: 'Year',
      type: 'number',
      validation: (Rule) => Rule.min(1900).max(2100),
    },
    {
      name: 'featured',
      title: 'Featured Project',
      type: 'boolean',
      initialValue: false,
    },
  ],
  preview: {
    select: {
      title: 'title',
      media: 'thumbnail',
      year: 'year',
    },
    prepare({ title, media, year }) {
      return {
        title,
        subtitle: year ? `${year}` : 'No year set',
        media,
      };
    },
  },
});
