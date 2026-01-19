import { notFound } from 'next/navigation';
import { client } from '@/lib/sanity';
import { projectBySlugQuery, projectsQuery } from '@/lib/queries';
import MediaGallery from '@/components/MediaGallery';
import { Header } from '@/components/Header';

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const projects = await client.fetch(projectsQuery);
  return projects.map((project: any) => ({
    slug: project.slug,
  }));
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await client.fetch(projectBySlugQuery, { slug });

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Project Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between mb-4">
            <h1 className="text-4xl font-bold text-gray-900">{project.title}</h1>
            {project.year && (
              <span className="text-xl text-gray-500">{project.year}</span>
            )}
          </div>
          <p className="text-xl text-gray-600 mb-4">{project.description}</p>
          {project.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-sm bg-[var(--accent)]/10 text-[var(--accent)] rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Media Gallery */}
        <div className="mb-8">
          <MediaGallery media={project.media} />
        </div>

        {/* Long Description */}
        {project.longDescription && (
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">About This Project</h2>
            <p className="text-gray-700 leading-relaxed">{project.longDescription}</p>
          </div>
        )}
      </main>
    </div>
  );
}
