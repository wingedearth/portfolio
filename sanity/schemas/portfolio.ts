import { defineType } from 'sanity';

export default defineType({
  name: 'portfolio',
  title: 'Portfolio',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Portfolio Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
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
      name: 'owner',
      title: 'Owner Name',
      type: 'string',
    },
    {
      name: 'email',
      title: 'Contact Email',
      type: 'string',
    },
    {
      name: 'featuredProjectsTitle',
      title: 'Featured Projects Section Title',
      type: 'string',
      description: 'Optional custom title for the featured projects section (defaults to "Featured Projects")',
    },
    {
      name: 'linkedinUrl',
      title: 'LinkedIn URL',
      type: 'url',
      description: 'Your LinkedIn profile URL',
    },
  ],
});
