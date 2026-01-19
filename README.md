# Portfolio

A modern, responsive portfolio website built with Next.js, React, and TypeScript. Showcase your creative projects with collections, image galleries, and video support.

## Features

- 🎨 **Project Collections**: Organize projects into thematic collections
- 🖼️ **Media Galleries**: Display images and videos with interactive gallery navigation
- 📱 **Responsive Design**: Mobile-first design with Tailwind CSS
- ⚡ **Static Site Generation**: Fast loading with Next.js SSG
- 🎬 **Video Support**: Native video playback with custom thumbnails
- 🔍 **SEO Friendly**: Optimized for search engines
- 🎯 **TypeScript**: Fully typed for better development experience

## Getting Started

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the portfolio.

### Build

Create a production build:

```bash
npm run build
```

### Start

Run the production server:

```bash
npm start
```

## Project Structure

```
portfolio/
├── app/                          # Next.js app directory
│   ├── collections/[id]/        # Collection detail pages
│   ├── projects/[slug]/         # Project detail pages
│   └── page.tsx                 # Home page
├── components/                   # React components
│   ├── CollectionCard.tsx       # Collection preview card
│   ├── MediaGallery.tsx         # Image/video gallery
│   └── ProjectCard.tsx          # Project preview card
├── data/                        # Data files
│   └── portfolio-data.ts        # Projects and collections data
├── types/                       # TypeScript types
│   └── portfolio.ts             # Type definitions
└── public/                      # Static assets
```

## Adding Your Own Projects

Edit `data/portfolio-data.ts` to add your own projects:

```typescript
{
  id: 'unique-id',
  title: 'Project Title',
  slug: 'project-url-slug',
  description: 'Short description',
  longDescription: 'Detailed description',
  media: [
    {
      type: 'image',
      url: '/path/to/image.jpg',
      alt: 'Image description',
    },
    {
      type: 'video',
      url: '/path/to/video.mp4',
      thumbnail: '/path/to/thumbnail.jpg',
      alt: 'Video description',
    },
  ],
  tags: ['Tag1', 'Tag2'],
  year: 2024,
  featured: true,
  thumbnail: '/path/to/thumbnail.jpg', // Optional
}
```

## Media Guidelines

### Recommended Media Hosting

**Images** - [Cloudinary](https://cloudinary.com) (Recommended)
- Free tier: 25 GB storage with generous bandwidth
- Automatic image optimization and transformations
- Fast CDN delivery worldwide
- On-the-fly resizing and format conversion

**Videos** - [Vimeo](https://vimeo.com) (Recommended)
- Professional video hosting with clean player
- Privacy controls and custom player options
- Reliable streaming with adaptive quality
- Free tier available for basic hosting

### Images
- Supported formats: JPEG, PNG, WebP, SVG
- Recommended size: 1920x1080 or larger
- Use external URLs or place files in the `public` directory

### Videos
- Supported formats: MP4, WebM
- Include a thumbnail image for better UX
- Consider file size for optimal loading

### External Media
To use external media sources, add the domain to `next.config.ts`:

```typescript
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'your-image-host.com',
    },
  ],
},
```

## Customization

### Styling
All styles use Tailwind CSS. Customize colors and design in:
- `tailwind.config.ts` - Theme configuration
- Component files - Individual component styles

### Layout
Modify the layout in:
- `app/page.tsx` - Home page layout
- `app/projects/[slug]/page.tsx` - Project page layout
- `app/collections/[id]/page.tsx` - Collection page layout

## Deployment

### Vercel (Recommended)
The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new).

### Other Platforms
Build the static site and deploy the `.next` folder to any hosting platform that supports Node.js.

## Tech Stack

- **Framework**: Next.js 16
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Image Optimization**: Next.js Image Component
- **Deployment**: Vercel (recommended)

## License

MIT License - feel free to use this portfolio template for your own projects!
