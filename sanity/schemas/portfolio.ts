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
    {
      name: 'titleFont',
      title: 'Title Font',
      type: 'string',
      description: 'Font for the main portfolio title in navigation',
      options: {
        list: [
          { title: 'Libre Bodoni', value: 'Libre Bodoni' },
          { title: 'Raleway', value: 'Raleway' },
          { title: 'Montserrat', value: 'Montserrat' },
          { title: 'Georgia', value: 'Georgia' },
          { title: 'Times New Roman', value: 'Times New Roman' },
        ],
      },
      initialValue: 'Libre Bodoni',
    },
    {
      name: 'titleFontSize',
      title: 'Title Font Size (px)',
      type: 'number',
      description: 'Font size for the portfolio title in pixels',
      initialValue: 40,
      validation: (Rule) => Rule.min(20).max(80),
    },
    {
      name: 'subtitleFontSize',
      title: 'Subtitle Font Size (px)',
      type: 'number',
      description: 'Font size for the subtitle in pixels',
      initialValue: 16,
      validation: (Rule) => Rule.min(12).max(32),
    },
    {
      name: 'primaryFont',
      title: 'Primary Font',
      type: 'string',
      description: 'Main font used throughout the site',
      options: {
        list: [
          { title: 'Raleway', value: 'Raleway' },
          { title: 'Montserrat', value: 'Montserrat' },
          { title: 'Inter', value: 'Inter' },
          { title: 'Open Sans', value: 'Open Sans' },
          { title: 'Roboto', value: 'Roboto' },
        ],
      },
      initialValue: 'Raleway',
    },
    {
      name: 'secondaryFont',
      title: 'Secondary Font',
      type: 'string',
      description: 'Secondary font for accents and headings',
      options: {
        list: [
          { title: 'Montserrat', value: 'Montserrat' },
          { title: 'Raleway', value: 'Raleway' },
          { title: 'Inter', value: 'Inter' },
          { title: 'Open Sans', value: 'Open Sans' },
          { title: 'Roboto', value: 'Roboto' },
        ],
      },
      initialValue: 'Montserrat',
    },
  ],
});
