import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getProjectBySlug, projects } from '@/data/portfolio-data';
import MediaGallery from '@/components/MediaGallery';

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/" className="text-blue-600 hover:text-blue-800 mb-4 inline-block">
            ← Back to Home
          </Link>
        </div>
      </header>

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
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full"
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
