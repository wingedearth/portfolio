export type MediaType = 'image' | 'video';

export interface MediaItem {
  type: MediaType;
  url: string;
  alt?: string;
  thumbnail?: string; // For videos
}

export interface Project {
  id: string;
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
  id: string;
  name: string;
  description: string;
  projects: Project[];
  thumbnail?: string;
}
