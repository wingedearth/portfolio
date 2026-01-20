export type MediaType = 'image' | 'video';

export interface MediaItem {
  type: MediaType;
  url: string;
  alt?: string;
  thumbnail?: string; // For videos
}

export interface Project {
  _id?: string; // From Sanity
  id?: string; // For backward compatibility
  title: string;
  slug: string;
  description: string;
  longDescription?: string;
  media: MediaItem[];
  tags: string[];
  year?: number;
  featured?: boolean;
  thumbnail?: string;
}

export interface ProjectCollection {
  _id?: string; // From Sanity
  id: string; // slug from Sanity
  name: string;
  description: string;
  projects: Project[];
  thumbnail?: string;
}
