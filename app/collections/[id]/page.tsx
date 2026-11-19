import { notFound } from 'next/navigation';
import { client } from '@/lib/sanity';
import { collectionByIdQuery, collectionsQuery } from '@/lib/queries';
import ProjectCard from '@/components/ProjectCard';
import { Header } from '@/components/Header';
import Breadcrumb from '@/components/Breadcrumb';
import { Project, ProjectCollection } from '@/types/portfolio';

export const revalidate = 60;

interface CollectionPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateStaticParams() {
  const collections = await client.fetch<ProjectCollection[]>(collectionsQuery);
  return collections.map((collection) => ({
    id: collection.id,
  }));
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const { id } = await params;
  const collection = await client.fetch<ProjectCollection | null>(collectionByIdQuery, { id });

  if (!collection) {
    notFound();
  }
  const projects = collection.projects || [];

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: collection.name, href: `/collections/${collection.id}` },
  ];

  return (
    <div className="relative min-h-screen bg-surface text-on-surface">
      <Header />

      <main id="content" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12">
        <Breadcrumb items={breadcrumbItems} />

        <div className="mb-12" data-reveal>
          <h1 className="font-secondary text-headline-large text-on-surface mb-3">{collection.name}</h1>
          <p className="text-body-large text-on-surface-variant max-w-4xl">{collection.description}</p>
          <p className="text-label-large text-on-surface-variant mt-3">
            {projects.length} {projects.length === 1 ? 'project' : 'projects'}
          </p>
        </div>

        {projects.length > 0 ? (
          <div className="reveal-stagger grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project: Project) => (
              <div key={project._id} data-reveal>
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-body-large text-on-surface-variant">No projects in this collection yet.</p>
          </div>
        )}
      </main>
    </div>
  );
}
