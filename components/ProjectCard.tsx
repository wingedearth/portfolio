import { Project } from '@/types/portfolio';
import Link from 'next/link';
import Image from 'next/image';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const thumbnailUrl = project.thumbnail || 
    (project.media[0]?.type === 'video' ? project.media[0]?.thumbnail : project.media[0]?.url);

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
    >
      {thumbnailUrl && (
        <div className="relative aspect-video bg-gray-100">
          <Image
            src={thumbnailUrl}
            alt={project.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
            {project.title}
          </h3>
          {project.year && (
            <span className="text-sm text-gray-500 flex-shrink-0">{project.year}</span>
          )}
        </div>
        <p className="text-gray-600 line-clamp-2">{project.description}</p>
      </div>
    </Link>
  );
}
