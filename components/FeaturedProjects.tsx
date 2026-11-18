import { Project } from '@/types/portfolio';
import ProjectCard from './ProjectCard';

interface FeaturedProjectsProps {
  projects: Project[];
  title?: string
}

export const FeaturedProjects = ({ projects, title }: FeaturedProjectsProps) => {
  if (projects.length === 0) return null;
  const featuredTitle = title || (projects.length === 1 ? 'Featured Project' : 'Featured Projects');

  return (
    <section className="mb-16">
      <h2 data-reveal className="font-secondary text-headline-large text-on-surface mb-6">{featuredTitle}</h2>
      <div className="grid grid-cols-1 gap-6">
        {projects.map((project) => (
          <ProjectCard key={project._id} project={project} />
        ))}
      </div>
    </section>
  );
};
