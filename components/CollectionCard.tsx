import { ProjectCollection } from '@/types/portfolio';
import Link from 'next/link';
import Image from 'next/image';

interface CollectionCardProps {
  collection: ProjectCollection;
}

export default function CollectionCard({ collection }: CollectionCardProps) {
  const firstMedia = collection.projects[0]?.media[0];
  const thumbnailUrl = 
    collection.thumbnail || 
    collection.projects[0]?.thumbnail || 
    (firstMedia?.type === 'video' ? firstMedia?.thumbnail : firstMedia?.url);

  return (
    <Link
      href={`/collections/${collection.id}`}
      className="group block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
    >
      {thumbnailUrl && (
        <div className="relative aspect-video bg-gray-100">
          <Image
            src={thumbnailUrl}
            alt={collection.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      <div className="p-5">
        <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
          {collection.name}
        </h3>
        <p className="text-gray-600 mb-3">{collection.description}</p>
        <div className="text-sm text-gray-500">
          {collection.projects.length} {collection.projects.length === 1 ? 'project' : 'projects'}
        </div>
      </div>
    </Link>
  );
}
