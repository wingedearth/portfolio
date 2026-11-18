import { client } from '@/lib/sanity';
import { projectsQuery, collectionsQuery, portfolioQuery, aboutQuery } from '@/lib/queries';
import { Header } from '@/components/Header';
import ProjectCard from '@/components/ProjectCard';
import { Collections } from '@/components/Collections';
import { Footer } from '@/components/Footer';
import { AboutSection } from '@/components/AboutSection';
import { ContactSection } from '@/components/ContactSection';
import { Project } from '@/types/portfolio';

export const revalidate = 60;

const Home = async () => {
  const [allProjects, collections, portfolio, about] = await Promise.all([
    client.fetch<Project[]>(projectsQuery),
    client.fetch(collectionsQuery),
    client.fetch(portfolioQuery),
    client.fetch(aboutQuery),
  ]);

  const featuredProjects = allProjects.filter((project) => project.featured).slice(0, 1);

  return (
    <div className="relative min-h-screen bg-surface text-on-surface">
      <div className="hero-depth-clip" aria-hidden="true">
        <div className="hero-depth" />
      </div>
      <Header />
      <main id="content" className="relative z-10">
        <div className="mb-12">
          <div className="grid grid-cols-1 gap-6">
            {featuredProjects.map((project) => (
              <ProjectCard key={project._id} project={project} autoplay={true} />
            ))}
          </div>
        </div>

        <div id="work" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Collections collections={collections} />
        </div>

        {about && (
          <div id="about" className="hidden md:block max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <AboutSection about={about} />
          </div>
        )}

        <div id="contact" className="hidden md:block max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-4">
          <ContactSection portfolio={portfolio} />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export { Home };
export default Home;
