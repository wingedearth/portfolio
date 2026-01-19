import { ProjectCollection } from '@/types/portfolio';
import CollectionCard from './CollectionCard';

interface CollectionsProps {
  collections: ProjectCollection[];
}

export const Collections = ({ collections }: CollectionsProps) => {
  return (
    <section>
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Collections</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {collections.map((collection) => (
          <CollectionCard key={collection.id} collection={collection} />
        ))}
      </div>
    </section>
  );
};
