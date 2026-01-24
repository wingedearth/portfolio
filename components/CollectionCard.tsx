import { ProjectCollection } from '@/types/portfolio';
import Link from 'next/link';
import Image from 'next/image';

interface CollectionCardProps {
  collection: ProjectCollection;
}

export default function CollectionCard({ collection }: CollectionCardProps) {
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
      className="group block rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all"
    >
      <div className="relative aspect-[4/3] bg-gray-100">
        {thumbnailUrl && (
          <Image
            src={thumbnailUrl}
            alt={name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        )}
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        
        {/* Black overlay that fades on hover */}
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/0 transition-colors duration-300" />
        
        {/* Text overlay */}
        <div className="absolute inset-0 flex items-center justify-center p-6">
          <h3 className="text-3xl font-bold text-white text-center">
            {name}
          </h3>
        </div>
      </div>
    </Link>
  );
}
