'use client';

import { MediaItem } from '@/types/portfolio';
import { useState } from 'react';
import Image from 'next/image';

interface MediaGalleryProps {
  media: MediaItem[];
}

export default function MediaGallery({ media }: MediaGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (media.length === 0) return null;

  const selectedMedia = media[selectedIndex];

  // Helper to check if URL is a Vimeo link
  const isVimeoUrl = (url: string) => {
    return url.includes('vimeo.com');
  };

  // Extract Vimeo video ID from URL
  const getVimeoId = (url: string) => {
    const match = url.match(/vimeo\.com\/(\d+)/);
    return match ? match[1] : null;
  };

  return (
    <div className="space-y-4">
      {/* Main media display */}
      <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
        {selectedMedia.type === 'image' ? (
          <Image
            src={selectedMedia.url}
            alt={selectedMedia.alt || ''}
            fill
            className="object-cover"
            priority={selectedIndex === 0}
          />
        ) : isVimeoUrl(selectedMedia.url) ? (
          <iframe
            src={`https://player.vimeo.com/video/${getVimeoId(selectedMedia.url)}?title=0&byline=0&portrait=0&badge=0`}
            className="w-full h-full"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <video
            src={selectedMedia.url}
            controls
            className="w-full h-full object-cover"
            poster={selectedMedia.thumbnail}
          >
            Your browser does not support the video tag.
          </video>
        )}
      </div>

      {/* Thumbnail navigation */}
      {media.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {media.map((item, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={`relative flex-shrink-0 w-24 h-24 rounded-md overflow-hidden border-2 transition-all ${
                selectedIndex === index
                  ? 'border-[var(--accent)] ring-2 ring-[var(--accent)]/30'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              {item.type === 'image' ? (
                <Image
                  src={item.url}
                  alt={item.alt || ''}
                  fill
                  className="object-cover"
                />
              ) : (
                item.thumbnail && (
                  <div className="relative w-full h-full">
                    <Image
                      src={item.thumbnail}
                      alt={item.alt || ''}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                      <svg
                        className="w-8 h-8 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                      </svg>
                    </div>
                  </div>
                )
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
