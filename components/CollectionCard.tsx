import { ProjectCollection } from '@/types/portfolio';
import Link from 'next/link';
import Image from 'next/image';

interface CollectionCardProps {
  collection: ProjectCollection;
  showTitle?: boolean;
}

export default function CollectionCard({ collection, showTitle = true }: CollectionCardProps) {
  const { id, name = '', thumbnail } = collection;
  const projects = collection.projects || [];
  const firstProject = projects?.[0] || {};
  const firstMedia = firstProject.media?.[0];
  const thumbnailUrl =
    thumbnail ||
    firstProject.thumbnail ||
    (firstMedia?.type === 'video' ? firstMedia?.thumbnail : firstMedia?.url);

  return (
    <Link
      href={`/collections/${id}`}
      className="md-media-card group block"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-surface-container">
        {thumbnailUrl && (
          <div className="media-drift relative h-full w-full">
            <Image
              src={thumbnailUrl}
              alt={name}
              fill
              className="object-cover"
            />
          </div>
        )}
        <div className="media-scrim absolute inset-0" />
        <div className="absolute inset-0 bg-scrim/40 transition-colors duration-medium-2 ease-emphasized group-hover:bg-scrim/0 group-focus-within:bg-scrim/0" />
        {showTitle && (
          <div className="absolute inset-0 flex items-center justify-center p-6">
            <h3 className="font-secondary text-headline-large text-on-media text-center">
              {name}
            </h3>
          </div>
        )}
      </div>
    </Link>
  );
}
