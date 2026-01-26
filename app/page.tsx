import { client } from '@/lib/sanity';
import { projectsQuery, collectionsQuery, portfolioQuery, aboutQuery } from '@/lib/queries';
import { Header } from '@/components/Header';
import ProjectCard from '@/components/ProjectCard';
import { Collections } from '@/components/Collections';
import { Footer } from '@/components/Footer';
import { AboutSection } from '@/components/AboutSection';
import { ContactSection } from '@/components/ContactSection';

// Revalidate this page every 60 seconds
export const revalidate = 60;

const Home = async () => {
  const [allProjects, collections, portfolio, about] = await Promise.all([
    client.fetch(projectsQuery),
    client.fetch(collectionsQuery),
    client.fetch(portfolioQuery),
    client.fetch(aboutQuery),
  ]);

  const featuredProjects = allProjects.filter((p: any) => p.featured).slice(0, 1);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        {/* Featured Projects - Always full width */}
        <div className="mb-12">
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

        {/* About Section - Hidden on mobile */}
        {about && (
          <div id="about" className="hidden md:block max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <AboutSection about={about} />
          </div>
        )}

        {/* Contact Section - Hidden on mobile */}
        <div id="contact" className="hidden md:block max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <ContactSection portfolio={portfolio} />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export { Home };
export default Home;
