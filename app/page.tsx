import { client } from '@/lib/sanity';
import { projectsQuery, collectionsQuery } from '@/lib/queries';
import { Header } from '@/components/Header';
import { FeaturedProjects } from '@/components/FeaturedProjects';
import { Collections } from '@/components/Collections';
import { Footer } from '@/components/Footer';

const Home = async () => {
  const [allProjects, collections] = await Promise.all([
    client.fetch(projectsQuery),
    client.fetch(collectionsQuery),
  ]);

  const featuredProjects = allProjects.filter((p: any) => p.featured);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <FeaturedProjects projects={featuredProjects} />
        <Collections collections={collections} />
      </main>
      <Footer />
    </div>
  );
}

export { Home };
export default Home;
