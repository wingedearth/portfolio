import { notFound } from 'next/navigation';
import { client } from '@/lib/sanity';
import { projectBySlugQuery, projectsQuery } from '@/lib/queries';
import ProjectMediaItem from '@/components/ProjectMediaItem';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';
import { MediaItem, Project } from '@/types/portfolio';

export const revalidate = 60;

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const projects = await client.fetch<Project[]>(projectsQuery);
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await client.fetch<Project | null>(projectBySlugQuery, { slug });

  if (!project) {
    notFound();
  }

  const firstMedia = project.media[0];
  const remainingMedia = project.media.slice(1);

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
    <div className="relative min-h-screen bg-surface text-on-surface">
      <Header />

      <main id="content" className="relative z-10 max-w-6xl mx-auto pt-6 pb-4">
        <div className="px-4 sm:px-6 xl:px-8">
          <Breadcrumb items={breadcrumbItems} />
        </div>

        <div className="mb-4 px-4 sm:px-6 xl:px-8" data-reveal>
          <h1 className="font-secondary text-headline-large text-on-surface">{project.title}</h1>
        </div>

        <div className="xl:px-8">
          {firstMedia && (
            <ProjectMediaItem media={firstMedia} isFirst={true} />
          )}
        </div>

        {project.longDescription && (
          <div className="md-card p-8 mb-12 mx-4 sm:mx-6 xl:mx-8" data-reveal>
            <h2 className="font-secondary text-headline-small text-on-surface mb-4">About This Project</h2>
            <p className="text-body-large text-on-surface">{project.longDescription}</p>
          </div>
        )}

        <div className="xl:px-8">
          {remainingMedia.map((media: MediaItem, index: number) => (
            <ProjectMediaItem key={index} media={media} isFirst={false} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
