import { client } from '@/lib/sanity';
import { collectionsQuery } from '@/lib/queries';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Collections } from '@/components/Collections';

export const revalidate = 60;

const WorkPage = async () => {
  const collections = await client.fetch(collectionsQuery);

  return (
    <div className="relative min-h-screen bg-surface text-on-surface">
      <Header />
      <main id="content" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Collections collections={collections} />
      </main>
      <Footer />
    </div>
  );
};

export default WorkPage;
