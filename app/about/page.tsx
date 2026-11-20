import { client } from '@/lib/sanity';
import { aboutQuery } from '@/lib/queries';
import { PortableText, type PortableTextBlock } from '@portabletext/react';
import Image from 'next/image';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { richTextComponents } from '@/components/richText';

interface AboutContent {
  heading?: string;
  profileImage?: string;
  bio?: PortableTextBlock[];
  skills?: string[];
}

export default async function AboutPage() {
  const about = await client.fetch<AboutContent | null>(aboutQuery);

  if (!about) {
    return (
      <div className="relative min-h-screen bg-surface text-on-surface">
        <Header />
        <main id="content" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <p className="text-center text-body-large text-on-surface-variant">About content not found. Please add it in the Studio.</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-surface text-on-surface">
      <Header />
      <main id="content" className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="md-card p-8 mb-8" data-reveal>
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {about.profileImage && (
              <div className="flex-shrink-0">
                <div className="relative w-48 h-48 rounded-full overflow-hidden shadow-elevation-1">
                  <Image
                    src={about.profileImage}
                    alt={about.heading || 'Profile'}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            )}
            <div className="flex-1">
              {about.heading && (
                <h1 className="font-secondary text-headline-large text-on-surface mb-6">{about.heading}</h1>
              )}
              {about.bio && (
                <div className="space-y-4">
                  <PortableText value={about.bio} components={richTextComponents} />
                </div>
              )}
            </div>
          </div>
        </div>

        {about.skills && about.skills.length > 0 && (
          <div className="md-card p-8 mb-8" data-reveal>
            <h2 className="font-secondary text-headline-small text-on-surface mb-4">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {about.skills.map((skill, index) => (
                <span key={index} className="md-chip">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
