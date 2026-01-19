# Sanity CMS Setup

This portfolio platform uses Sanity.io as a headless CMS for managing content across multiple portfolios.

## Getting Started

### 1. Access Sanity Studio

Visit the Sanity Studio at: **http://localhost:3000/studio** (when dev server is running)

Or in production: **https://your-domain.com/studio**

### 2. Content Structure

The CMS has three main content types:

#### Portfolio
- **Purpose**: Represents a single portfolio site
- **Fields**:
  - Title: Main portfolio title
  - Subtitle: Tagline/description
  - Slug: URL identifier
  - Owner: Portfolio owner's name
  - Email: Contact email

#### Project
- **Purpose**: Individual projects within a portfolio
- **Fields**:
  - Portfolio: Reference to parent portfolio
  - Title: Project name
  - Slug: URL identifier
  - Description: Short summary
  - Long Description: Detailed information
  - Thumbnail: Main project image
  - Media Gallery: Array of images and videos
  - Tags: Project categories/skills
  - Year: Completion year
  - Featured: Highlight on homepage

#### Collection
- **Purpose**: Organized groups of projects
- **Fields**:
  - Portfolio: Reference to parent portfolio
  - Name: Collection title
  - Slug: URL identifier
  - Description: Collection purpose
  - Thumbnail: Collection cover image
  - Projects: Array of project references

## Multi-Portfolio Setup

To manage multiple portfolios:

1. Create a new Portfolio document for each site
2. When creating Projects or Collections, select the appropriate Portfolio reference
3. Query data by portfolio slug/ID to filter content for specific sites

## Development Workflow

### Local Development

```bash
# Start dev server with Studio
npm run dev

# Access Studio at http://localhost:3000/studio
```

### Adding Content

1. Navigate to `/studio`
2. Create a Portfolio document first
3. Add Projects, referencing the portfolio
4. Create Collections and add project references
5. Content appears immediately on the site (with `useCdn: false` in dev)

### Image Handling

- Sanity automatically optimizes and serves images via CDN
- Images are stored in `cdn.sanity.io`
- Use the `urlFor()` helper to transform images:

```typescript
import { urlFor } from '@/lib/sanity';

// Basic usage
const imageUrl = urlFor(image).url();

// With transformations
const optimized = urlFor(image)
  .width(800)
  .height(600)
  .fit('crop')
  .url();
```

## Environment Variables

Required in `.env.local`:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
```

## Querying Data

All queries are in `lib/queries.ts`. Examples:

```typescript
import { client } from '@/lib/sanity';
import { portfolioQuery, projectsQuery } from '@/lib/queries';

// Fetch portfolio info
const portfolio = await client.fetch(portfolioQuery);

// Fetch all projects
const projects = await client.fetch(projectsQuery);

// Fetch specific project
const project = await client.fetch(projectBySlugQuery, { slug: 'my-project' });
```

## Deployment

### Vercel (Recommended)

1. Connect your repo to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy - Sanity Studio will be available at `/studio`

### Studio Access Control

By default, Studio is publicly accessible. To restrict:

1. Go to https://sanity.io/manage
2. Select your project
3. Go to "API" tab
4. Configure CORS origins
5. Add authentication in `sanity.config.ts` if needed

## Production Best Practices

1. **Use CDN in production**: Set `useCdn: true` in `lib/sanity.ts`
2. **Cache queries**: Use Next.js caching strategies
3. **Optimize images**: Always use `urlFor()` helper
4. **Validate data**: Check for required fields in queries
5. **Version content**: Use Sanity's revision history

## Useful Links

- [Sanity Dashboard](https://sanity.io/manage)
- [Sanity Documentation](https://www.sanity.io/docs)
- [GROQ Query Cheat Sheet](https://www.sanity.io/docs/query-cheat-sheet)
- [Image URL API](https://www.sanity.io/docs/image-url)
