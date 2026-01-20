import { notFound } from 'next/navigation';
import { client } from '@/lib/sanity';
import { projectBySlugQuery, projectsQuery } from '@/lib/queries';
import ProjectMediaItem from '@/components/ProjectMediaItem';
import { Header } from '@/components/Header';
import Breadcrumb from '@/components/Breadcrumb';

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

  const firstMedia = project.media[0];
  const remainingMedia = project.media.slice(1);

  // Build breadcrumb items
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
  ];

  if (project.collection) {
    breadcrumbItems.push({
      label: project.collection.name,
      href: `/collections/${project.collection.id}`,
    });
  }

  breadcrumbItems.push({
    label: project.title,
    href: `/projects/${project.slug}`,
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-6xl mx-auto pt-6 pb-12">
        {/* Breadcrumbs */}
        <div className="px-4 sm:px-6 xl:px-8">
          <Breadcrumb items={breadcrumbItems} />
        </div>

        {/* Project Title */}
        <div className="mb-12 px-4 sm:px-6 xl:px-8">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">{project.title}</h1>
          {project.description && (
            <p className="text-xl text-gray-600">{project.description}</p>
          )}
        </div>

        {/* First Media Item - Full Width */}
        <div className="xl:px-8">
          {firstMedia && (
            <ProjectMediaItem media={firstMedia} isFirst={true} />
          )}
        </div>

        {/* About This Project */}
        {project.longDescription && (
          <div className="bg-white rounded-lg shadow-md p-8 mb-12 mx-4 sm:mx-6 xl:mx-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">About This Project</h2>
            <p className="text-gray-700 leading-relaxed text-lg">{project.longDescription}</p>
          </div>
        )}

        {/* Remaining Media Items - Full Width */}
        <div className="xl:px-8">
          {remainingMedia.map((media, index) => (
            <ProjectMediaItem key={index} media={media} isFirst={false} />
          ))}
        </div>
      </main>
    </div>
  );
}
