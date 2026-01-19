import { client } from '@/lib/sanity';
import { aboutQuery } from '@/lib/queries';
import { PortableText } from '@portabletext/react';
import Image from 'next/image';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default async function AboutPage() {
  const about = await client.fetch(aboutQuery);

  if (!about) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <p className="text-center text-gray-600">About content not found. Please add it in the Studio.</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Profile Section */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {about.profileImage && (
              <div className="flex-shrink-0">
                <div className="relative w-48 h-48 rounded-full overflow-hidden">
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
                <h1 className="text-4xl font-bold text-gray-900 mb-6">{about.heading}</h1>
              )}
              {about.bio && (
                <div className="text-gray-700 space-y-4">
                  <PortableText 
                    value={about.bio}
                    components={{
                      block: {
                        normal: ({children}) => <p className="text-lg leading-relaxed">{children}</p>,
                        h2: ({children}) => <h2 className="text-2xl font-bold mt-8 mb-4">{children}</h2>,
                        h3: ({children}) => <h3 className="text-xl font-semibold mt-6 mb-3">{children}</h3>,
                        blockquote: ({children}) => <blockquote className="border-l-4 border-gray-300 pl-4 italic">{children}</blockquote>,
                      },
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Skills Section */}
        {about.skills && about.skills.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Skills</h2>
            <div className="flex flex-wrap gap-3">
              {about.skills.map((skill: string, index: number) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-[var(--accent)]/10 text-[var(--accent)] rounded-full text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Social Links Section */}
        {about.socialLinks && about.socialLinks.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Connect</h2>
            <div className="flex flex-wrap gap-4">
              {about.socialLinks.map((link: { platform: string; url: string }, index: number) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors font-medium text-gray-700 capitalize"
                >
                  {link.platform}
                </a>
              ))}
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
