# Portfolio

A modern, responsive portfolio website built with Next.js, React, and TypeScript. Showcase your creative projects with collections, image galleries, and video support.

## Features

- 🎨 **Project Collections**: Organize projects into thematic collections with manual ordering
- 🖼️ **Full-Width Media Layout**: Hero featured project with edge-to-edge display below 2xl breakpoint
- 📱 **Responsive Design**: Mobile-first design with Tailwind CSS and adaptive breakpoints
- ⚡ **Incremental Static Regeneration**: Pages auto-update with new Sanity content every 60 seconds
- 🎬 **Smart Video Playback**: Featured projects autoplay with muted audio, background mode for Vimeo
- 🎥 **Video Background Cards**: Autoplaying video backgrounds on project and collection cards
- 🧭 **Breadcrumb Navigation**: Clear navigation hierarchy across pages
- 🔍 **SEO Friendly**: Optimized for search engines
- 🎯 **TypeScript**: Fully typed for better development experience
- 🗄️ **Sanity CMS**: Headless CMS for managing multiple portfolios
- 🔄 **Multi-site Support**: Platform for creating multiple portfolio sites

## Getting Started

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the portfolio.

### Sanity Studio

Access the content management system at [http://localhost:3000/studio](http://localhost:3000/studio)

See [SANITY_SETUP.md](./SANITY_SETUP.md) for detailed CMS documentation.

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
│   ├── about/                   # About page
│   ├── collections/[id]/        # Collection detail pages
│   ├── contact/                 # Contact page
│   ├── projects/[slug]/         # Project detail pages
│   ├── studio/                  # Sanity Studio route
│   └── page.tsx                 # Home page
├── components/                   # React components
│   ├── Breadcrumb.tsx           # Breadcrumb navigation
│   ├── CollectionCard.tsx       # Collection preview card
│   ├── Header.tsx               # Site header (server)
│   ├── HeaderClient.tsx         # Site header (client)
│   ├── ProjectCard.tsx          # Project preview card
│   └── ProjectMediaItem.tsx     # Full-width media display
├── lib/                         # Utilities
│   ├── queries.ts               # Sanity GROQ queries
│   └── sanity.ts                # Sanity client config
├── sanity/                      # Sanity CMS
│   └── schemas/                 # Content schemas
├── types/                       # TypeScript types
│   └── portfolio.ts             # Type definitions
└── public/                      # Static assets
```

## Managing Content

All content is managed through Sanity CMS. Access the studio at:
- **Local**: [http://localhost:3000/studio](http://localhost:3000/studio)
- **Cloud**: [https://portfolio-platform.sanity.studio/](https://portfolio-platform.sanity.studio/)

### Content Types

**Portfolio**: Site-wide settings
- Title, subtitle, contact info
- Optional custom title for featured projects section

**Project**: Individual creative works
- Title, slug, descriptions (short & long)
- Media gallery (images and videos)
- Tags, year, featured status
- Automatically linked to collections
- Featured projects display as hero on homepage (limited to 1)

**Collection**: Grouped projects
- Name, slug, description
- Project references
- Thumbnail image
- Manual ordering via Display Order field (lower numbers appear first)

**About**: About page content
- Rich text bio with PortableText
- Profile image
- Skills and social links

See [SANITY_SETUP.md](./SANITY_SETUP.md) for detailed setup instructions.

## Media Guidelines

### Recommended Media Hosting

**Images** - [Cloudinary](https://cloudinary.com) or Sanity CDN (Recommended)
- Sanity includes CDN hosting for uploaded images
- Cloudinary free tier: 25 GB storage with generous bandwidth
- Automatic image optimization and transformations
- Fast CDN delivery worldwide

**Videos** - [Vimeo](https://vimeo.com) (Recommended)
- Professional video hosting with clean player
- Privacy controls: Set videos to "Unlisted" or "Public" with "Anywhere" embedding
- Automatic scroll-triggered playback on project pages
- Reliable streaming with adaptive quality
- Free tier available for basic hosting

### Images
- Supported formats: JPEG, PNG, WebP, SVG
- Recommended size: 1920x1080 or larger
- Use external URLs or place files in the `public` directory

### Videos
- Supported formats: MP4, WebM, Vimeo URLs
- Vimeo videos are automatically detected and embedded
- Featured projects with videos autoplay on homepage load (muted, looping)
- Project detail pages: first video autoplays, others play when scrolled into view (50% visible)
- Vimeo videos use background mode on homepage for seamless autoplay
- All videos are muted by default
- Include a thumbnail image for better UX with native videos

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
All styles use Tailwind CSS with custom accent colors:
- **Accent Color**: Defined in `app/globals.css` as CSS variables
- **Fonts**: Raleway (primary) and Montserrat (secondary) via next/font/google
- **Breakpoints**: Standard Tailwind breakpoints (sm: 640px, md: 768px, lg: 1024px, xl: 1280px, 2xl: 1536px)
- Component files - Individual component styles

### Layout
Modify the layout in:
- `app/page.tsx` - Home page with hero featured project and collections grid
- `app/projects/[slug]/page.tsx` - Project detail page with full-width media
- `app/collections/[id]/page.tsx` - Collection page layout

### Featured Projects
- Homepage displays single featured project as hero (full-width below 2xl)
- Projects with videos autoplay muted on page load
- Mark projects as "featured" in Sanity to display on homepage
- Custom section title can be set in Portfolio settings (optional)

## Content Updates

With Incremental Static Regeneration (ISR) enabled, your deployed site automatically updates with new Sanity content:
- Pages revalidate every 60 seconds
- New collections, projects, and content changes appear automatically
- No manual redeployment needed for content updates

## Deployment

### Heroku
See [HEROKU_DEPLOYMENT.md](./HEROKU_DEPLOYMENT.md) for detailed Heroku deployment instructions, including:
- Environment variable configuration
- Automatic and manual deployment options
- Troubleshooting tips
- Custom domain setup

### Vercel (Alternative)
You can also deploy to the [Vercel Platform](https://vercel.com/new).

### Other Platforms
Build the static site and deploy the `.next` folder to any hosting platform that supports Node.js.

## Tech Stack

- **Framework**: Next.js 16
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **CMS**: Sanity.io
- **Image Optimization**: Next.js Image Component
- **Deployment**: Vercel (recommended)

## License

MIT License - feel free to use this portfolio template for your own projects!
