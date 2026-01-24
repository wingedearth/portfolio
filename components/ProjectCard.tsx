'use client';

import { Project } from '@/types/portfolio';
import Link from 'next/link';
import Image from 'next/image';

interface ProjectCardProps {
  project: Project;
  autoplay?: boolean;
}

export default function ProjectCard({ project, autoplay = false }: ProjectCardProps) {
  const firstMedia = project.media[0];
  const isVideo = firstMedia?.type === 'video';
  const thumbnailUrl = project.thumbnail || 
    (isVideo ? firstMedia?.thumbnail : firstMedia?.url);
  
  // Helper to check if URL is a Vimeo link
  const isVimeoUrl = (url: string) => {
    return url?.includes('vimeo.com');
  };

  // Extract Vimeo video ID from URL
  const getVimeoId = (url: string) => {
    const match = url?.match(/vimeo\.com\/(\d+)/);
    return match ? match[1] : null;
  };

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all"
    >
      <div className="relative aspect-video bg-gray-100">
        {autoplay && isVideo ? (
          // Video background with autoplay
          isVimeoUrl(firstMedia.url) ? (
            <iframe
              src={`https://player.vimeo.com/video/${getVimeoId(firstMedia.url)}?background=1&autoplay=1&loop=1&muted=1&controls=0`}
              className="absolute inset-0 w-full h-full pointer-events-none"
              frameBorder="0"
              allow="autoplay; fullscreen"
            />
          ) : (
            <video
              src={firstMedia.url}
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            />
          )
        ) : (
          // Static image
          thumbnailUrl && (
            <Image
              src={thumbnailUrl}
              alt={project.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          )
        )}
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        
        {/* Black overlay that fades on hover */}
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/0 transition-colors duration-300" />
        
        {/* Text overlay */}
        <div className="absolute inset-0 flex flex-col justify-end p-6">
          <h3 className="text-2xl font-bold text-white">
            {project.title}
          </h3>
        </div>
      </div>
    </Link>
  );
}
