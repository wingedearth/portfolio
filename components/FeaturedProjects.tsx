import { Project } from '@/types/portfolio';
import ProjectCard from './ProjectCard';

interface FeaturedProjectsProps {
  projects: Project[];
}

export const FeaturedProjects = ({ projects }: FeaturedProjectsProps) => {
  if (projects.length === 0) return null;
  console.log('projects:', projects);

  return (
    <section className="mb-16">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Featured Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <ProjectCard key={project._id} project={project} />
        ))}
      </div>
    </section>
  );
};
