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
  const driftCover = !(autoplay && isVideo);

  const isVimeoUrl = (url: string) => {
    return url?.includes('vimeo.com');
  };

  const getVimeoId = (url: string) => {
    const match = url?.match(/vimeo\.com\/(\d+)/);
    return match ? match[1] : null;
  };

  const handleVideoClick = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <div className="md-media-card group">
      <Link
        href={`/projects/${project.slug}`}
        className="block"
      >
        <div className="relative aspect-video overflow-hidden bg-surface-container">
        {autoplay && isVideo ? (
          <div onClick={handleVideoClick} className="relative w-full h-full">
            {isVimeoUrl(firstMedia.url) ? (
              <iframe
                src={`https://player.vimeo.com/video/${getVimeoId(firstMedia.url)}?autoplay=1&loop=1&muted=1`}
                className="absolute inset-0 w-full h-full"
                frameBorder="0"
                allow="autoplay; fullscreen"
                title={project.title}
              />
            ) : (
              <video
                src={firstMedia.url}
                autoPlay
                loop
                muted
                playsInline
                controls
                className="absolute inset-0 w-full h-full object-cover"
              />
            )}
          </div>
        ) : (
          thumbnailUrl && (
            <div className={driftCover ? 'media-drift relative h-full w-full' : 'absolute inset-0'}>
              <Image
                src={thumbnailUrl}
                alt={project.title}
                fill
                className="object-cover"
              />
            </div>
          )
        )}
        {!autoplay && (
          <>
            <div className="media-scrim absolute inset-0" />
            <div className="absolute inset-0 bg-scrim/40 transition-colors duration-medium-2 ease-emphasized group-hover:bg-scrim/0 group-focus-within:bg-scrim/0" />
            <div className="absolute inset-0 flex flex-col justify-end p-6 pointer-events-none">
              <h3 className="font-secondary text-headline-small text-on-media">
                {project.title}
              </h3>
            </div>
          </>
        )}
        </div>
      </Link>
      {autoplay && (
        <div className="px-5 py-4 bg-surface-card">
          <h3 className="font-secondary text-title-large text-on-surface">
            {project.title}
          </h3>
        </div>
      )}
    </div>
  );
}
