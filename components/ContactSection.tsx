'use client';

interface ContactSectionProps {
  portfolio: {
    email?: string;
    owner?: string;
    linkedinUrl?: string;
  };
}

export const ContactSection = ({ portfolio }: ContactSectionProps) => {
  return (
    <div className="md-card p-8 md:p-10" data-reveal>
      <h2 className="font-secondary text-headline-large text-on-surface mb-6">Get In Touch</h2>

      <div className="space-y-6">
        <p className="text-body-large text-on-surface">
          I&apos;d love to hear from you! Whether you have a project in mind, want to collaborate,
          or just want to say hello, feel free to reach out.
        </p>

        {portfolio?.email && (
          <div>
            <h3 className="font-secondary text-title-large text-on-surface mb-2">Email</h3>
            <a href={`mailto:${portfolio.email}`} className="md-link text-body-large">
              {portfolio.email}
            </a>
          </div>
        )}

        {portfolio?.linkedinUrl && (
          <div className="pt-6 border-t border-outline-variant">
            <h3 className="font-secondary text-title-large text-on-surface mb-4">Connect With Me</h3>
            <p className="text-body-large text-on-surface-variant mb-4">
              You can also find me on social media. Check out my work and let&apos;s connect!
            </p>
            <div className="flex gap-4">
              <a
                href={portfolio.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="md-filled-button md-state"
              >
                LinkedIn
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
