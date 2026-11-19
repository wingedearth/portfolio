import { ProjectCollection } from '@/types/portfolio';
import CollectionCard from './CollectionCard';
import Link from 'next/link';

interface CollectionsProps {
  collections: ProjectCollection[];
}

export const Collections = ({ collections }: CollectionsProps) => {
  return (
    <section>
      <h2 data-reveal className="font-secondary text-headline-large text-on-surface mb-8">Featured Work</h2>

      <div className="md:hidden space-y-6">
        {collections.map((collection) => (
          <div key={collection._id} data-reveal>
            <CollectionCard collection={collection} />
          </div>
        ))}
      </div>

      <div className="hidden md:block space-y-8">
        {collections.map((collection, index) => (
          <div key={collection._id} className="grid grid-cols-2 gap-8 items-center">
            {index % 2 === 0 ? (
              <>
                <CollectionCard collection={collection} showTitle={false} />
                <div className="flex items-center" data-reveal>
                  <Link href={`/collections/${collection.id}`} className="rounded-medium">
                    <h3 className="font-secondary text-display-small text-on-surface hover:text-primary transition-colors duration-short-4 ease-standard">
                      {collection.name}
                    </h3>
                  </Link>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center justify-end" data-reveal>
                  <Link href={`/collections/${collection.id}`} className="rounded-medium">
                    <h3 className="font-secondary text-display-small text-on-surface text-right hover:text-primary transition-colors duration-short-4 ease-standard">
                      {collection.name}
                    </h3>
                  </Link>
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
