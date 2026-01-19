import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getCollectionById, collections } from '@/data/portfolio-data';
import ProjectCard from '@/components/ProjectCard';

interface CollectionPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateStaticParams() {
  return collections.map((collection) => ({
    id: collection.id,
  }));
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const { id } = await params;
  const collection = getCollectionById(id);

  if (!collection) {
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

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Collection Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">{collection.name}</h1>
          <p className="text-xl text-gray-600">{collection.description}</p>
          <p className="text-sm text-gray-500 mt-2">
            {collection.projects.length} {collection.projects.length === 1 ? 'project' : 'projects'}
          </p>
        </div>

        {/* Projects Grid */}
        {collection.projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {collection.projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">No projects in this collection yet.</p>
          </div>
        )}
      </main>
    </div>
  );
}
