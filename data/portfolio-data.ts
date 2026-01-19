import { Project, ProjectCollection } from '@/types/portfolio';

export const portfolioInfo = {
  title: 'My Portfolio',
  subtitle: 'Showcasing creative projects and design work',
};

export const projects: Project[] = [
  {
    id: '1',
    title: 'Urban Landscapes',
    slug: 'urban-landscapes',
    description: 'A photographic exploration of modern architecture and city life',
    longDescription: 'This collection captures the essence of contemporary urban environments, showcasing the interplay between architecture, light, and human presence in metropolitan spaces.',
    media: [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=1200',
        alt: 'City skyline at sunset',
      },
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1200',
        alt: 'Modern building facade',
      },
    ],
    tags: ['Photography', 'Architecture', 'Urban'],
    year: 2024,
    featured: true,
  },
  {
    id: '2',
    title: 'Motion Graphics Reel',
    slug: 'motion-graphics-reel',
    description: 'A showcase of dynamic animations and visual effects',
    longDescription: 'A compilation of motion design work featuring brand animations, UI transitions, and experimental visual effects created for various clients and personal projects.',
    media: [
      {
        type: 'video',
        url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=1200',
        alt: 'Motion graphics demo reel',
      },
    ],
    tags: ['Motion Design', 'Animation', 'Video'],
    year: 2024,
    featured: true,
  },
  {
    id: '3',
    title: 'Brand Identity: TechStart',
    slug: 'techstart-branding',
    description: 'Complete brand identity design for a technology startup',
    longDescription: 'A comprehensive branding project including logo design, color palette, typography, and brand guidelines for an innovative tech company.',
    media: [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1634942537034-2531766767d1?w=1200',
        alt: 'Brand logo mockup',
      },
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1626785774625-ddcddc3445e9?w=1200',
        alt: 'Brand color palette',
      },
    ],
    tags: ['Branding', 'Logo Design', 'Identity'],
    year: 2023,
  },
  {
    id: '4',
    title: 'Product Demo',
    slug: 'product-demo',
    description: 'Interactive product demonstration and walkthrough',
    longDescription: 'A detailed walkthrough of a new mobile application, highlighting key features and user experience design decisions.',
    media: [
      {
        type: 'video',
        url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200',
        alt: 'Product demonstration video',
      },
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1200',
        alt: 'Mobile app interface',
      },
    ],
    tags: ['Product Design', 'UX/UI', 'Mobile'],
    year: 2024,
  },
];

export const collections: ProjectCollection[] = [
  {
    id: 'design',
    name: 'Design Work',
    description: 'Brand identities, visual design, and creative projects',
    projects: projects.filter((p) => 
      p.tags.some(tag => ['Branding', 'Logo Design', 'Identity', 'Product Design', 'UX/UI'].includes(tag))
    ),
  },
  {
    id: 'photography',
    name: 'Photography',
    description: 'Visual storytelling through the lens',
    projects: projects.filter((p) => p.tags.includes('Photography')),
    thumbnail: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=1200',
  },
  {
    id: 'video',
    name: 'Video & Motion',
    description: 'Moving images and animated experiences',
    projects: projects.filter((p) => 
      p.tags.some(tag => ['Motion Design', 'Animation', 'Video'].includes(tag))
    ),
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getCollectionById(id: string): ProjectCollection | undefined {
  return collections.find((c) => c.id === id);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}
