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
    <div className="bg-white rounded-lg shadow-md p-8">
      <h2 className="text-4xl font-bold text-gray-900 mb-6">Get In Touch</h2>
      
      <div className="space-y-6">
        <p className="text-lg text-gray-700 leading-relaxed">
          I'd love to hear from you! Whether you have a project in mind, want to collaborate, 
          or just want to say hello, feel free to reach out.
        </p>

        {portfolio?.email && (
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Email</h3>
            <a 
              href={`mailto:${portfolio.email}`}
              className="text-lg text-[var(--accent)] hover:text-[var(--accent-hover)] transition-colors"
            >
              {portfolio.email}
            </a>
          </div>
        )}

        {portfolio?.linkedinUrl && (
          <div className="pt-6 border-t border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Connect With Me</h3>
            <p className="text-gray-600 mb-4">
              You can also find me on social media. Check out my work and let's connect!
            </p>
            <div className="flex gap-4">
              <a
                href={portfolio.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-[var(--accent)] text-white rounded-lg hover:bg-[var(--accent-hover)] transition-colors font-medium"
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
