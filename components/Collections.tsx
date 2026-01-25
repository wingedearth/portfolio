import { ProjectCollection } from '@/types/portfolio';
import CollectionCard from './CollectionCard';

interface CollectionsProps {
  collections: ProjectCollection[];
}

export const Collections = ({ collections }: CollectionsProps) => {
  return (
    <section>
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Featured Work</h2>
      
      {/* Mobile: Single column */}
      <div className="md:hidden space-y-6">
        {collections.map((collection) => (
          <CollectionCard key={collection._id} collection={collection} />
        ))}
      </div>

      {/* Desktop: Alternating zigzag layout */}
      <div className="hidden md:block space-y-6">
        {collections.map((collection, index) => (
          <div key={collection._id} className="grid grid-cols-2 gap-6">
            {/* Odd rows (0, 2, 4...): Image left, Title right */}
            {index % 2 === 0 ? (
              <>
                <CollectionCard collection={collection} showTitle={false} />
                <div className="flex items-center">
                  <h3 className="text-4xl font-bold text-gray-900">
                    {collection.name}
                  </h3>
                </div>
              </>
            ) : (
              /* Even rows (1, 3, 5...): Title left, Image right */
              <>
                <div className="flex items-center justify-end">
                  <h3 className="text-4xl font-bold text-gray-900 text-right">
                    {collection.name}
                  </h3>
                </div>
                <CollectionCard collection={collection} showTitle={false} />
              </>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};
