import { notFound } from 'next/navigation';
import { client } from '@/lib/sanity';
import { collectionByIdQuery, collectionsQuery } from '@/lib/queries';
import ProjectCard from '@/components/ProjectCard';
import { Header } from '@/components/Header';
import Breadcrumb from '@/components/Breadcrumb';

// Revalidate this page every 60 seconds
export const revalidate = 60;

interface CollectionPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateStaticParams() {
  const collections = await client.fetch(collectionsQuery);
  return collections.map((collection: any) => ({
    id: collection.id,
  }));
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const { id } = await params;
  const collection = await client.fetch(collectionByIdQuery, { id });

  if (!collection) {
    notFound();
  }
  const projects = collection?.projects || [];

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: collection.name, href: `/collections/${collection.id}` },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4">
        {/* Breadcrumbs */}
        <Breadcrumb items={breadcrumbItems} />

        {/* Collection Header */}
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">{collection.name}</h1>
          <p className="text-xl text-gray-600">{collection.description}</p>
          <p className="text-sm text-gray-500 mt-2">
            {projects.length} {projects.length === 1 ? 'project' : 'projects'}
          </p>
        </div>

        {/* Projects Grid */}
        {projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project: any) => (
              <ProjectCard key={project._id} project={project} />
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
