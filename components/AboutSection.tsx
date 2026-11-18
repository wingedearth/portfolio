import { PortableText, type PortableTextBlock } from '@portabletext/react';
import Image from 'next/image';
import { richTextComponents } from './richText';

interface AboutSectionProps {
  about: {
    heading?: string;
    profileImage?: string;
    bio?: PortableTextBlock[];
    skills?: string[];
    socialLinks?: { platform: string; url: string }[];
  };
}

export const AboutSection = ({ about }: AboutSectionProps) => {
  return (
    <div className="space-y-8">
      <div className="md-card p-8" data-reveal>
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
              <h2 className="font-secondary text-headline-large text-on-surface mb-6">{about.heading}</h2>
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
        <div className="md-card p-8" data-reveal>
          <h3 className="font-secondary text-headline-small text-on-surface mb-4">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {about.skills.map((skill: string, index: number) => (
              <span key={index} className="md-chip">
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
