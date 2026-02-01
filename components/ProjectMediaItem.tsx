'use client';

import { MediaItem } from '@/types/portfolio';
import Image from 'next/image';
import { useEffect, useRef } from 'react';

interface ProjectMediaItemProps {
  media: MediaItem;
  isFirst?: boolean;
}

export default function ProjectMediaItem({ media, isFirst = false }: ProjectMediaItemProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Helper to check if URL is a Vimeo link
  const isVimeoUrl = (url: string) => {
    return url?.includes('vimeo.com') || false;
  };

  // Extract Vimeo video ID from URL
  const getVimeoId = (url: string) => {
    const match = url.match(/vimeo\.com\/(\d+)/);
    return match ? match[1] : null;
  };

  // Set up Intersection Observer for non-first videos
  useEffect(() => {
    if (isFirst || media.type !== 'video') return;

    const element = videoRef.current || iframeRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (videoRef.current) {
              videoRef.current.play();
            } else if (iframeRef.current && isVimeoUrl(media.url)) {
              // Send play command to Vimeo iframe
              iframeRef.current.contentWindow?.postMessage(
                JSON.stringify({ method: 'play' }),
                '*'
              );
            }
          } else {
            if (videoRef.current) {
              videoRef.current.pause();
            } else if (iframeRef.current && isVimeoUrl(media.url)) {
              // Send pause command to Vimeo iframe
              iframeRef.current.contentWindow?.postMessage(
                JSON.stringify({ method: 'pause' }),
                '*'
              );
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [isFirst, media.type, media.url]);

  return (
    <div className="w-full mb-12">
      <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden group">
        {media.type === 'image' ? (
          <Image
            src={media.url}
            alt={media.alt || ''}
            fill
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            priority={isFirst}
          />
        ) : isVimeoUrl(media.url) ? (
          <iframe
            ref={iframeRef}
            src={`https://player.vimeo.com/video/${getVimeoId(media.url)}?title=0&byline=0&portrait=0&badge=0&muted=1${isFirst ? '&autoplay=1' : ''}`}
            className="w-full h-full"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <video
            ref={videoRef}
            src={media.url}
            controls
            muted
            autoPlay={isFirst}
            className="w-full h-full object-cover"
            poster={media.thumbnail}
          >
            Your browser does not support the video tag.
          </video>
        )}
      </div>
    </div>
  );
}
