import { client } from '@/lib/sanity';
import { projectsQuery, collectionsQuery, portfolioQuery } from '@/lib/queries';
import { Header } from '@/components/Header';
import ProjectCard from '@/components/ProjectCard';
import { Collections } from '@/components/Collections';
import { Footer } from '@/components/Footer';

const Home = async () => {
  const [allProjects, collections, portfolio] = await Promise.all([
    client.fetch(projectsQuery),
    client.fetch(collectionsQuery),
    client.fetch(portfolioQuery),
  ]);

  const featuredProjects = allProjects.filter((p: any) => p.featured).slice(0, 1);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        {/* Featured Projects - Full width on smaller screens, contained on 2xl+ */}
        <div className="2xl:max-w-7xl 2xl:mx-auto 2xl:px-8 mb-12">
          <div className="grid grid-cols-1 gap-6">
            {featuredProjects.map((project: any) => (
              <ProjectCard key={project._id} project={project} autoplay={true} />
            ))}
          </div>
        </div>
        
        {/* Collections - Always contained */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Collections collections={collections} />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export { Home };
export default Home;
