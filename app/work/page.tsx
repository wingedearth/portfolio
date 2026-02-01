import { client } from '@/lib/sanity';
import { collectionsQuery } from '@/lib/queries';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Collections } from '@/components/Collections';

// Revalidate this page every 60 seconds
export const revalidate = 60;

const WorkPage = async () => {
  const collections = await client.fetch(collectionsQuery);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <Collections collections={collections} />
      </main>
      <Footer />
    </div>
  );
};

export default WorkPage;
