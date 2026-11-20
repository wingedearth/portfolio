import type { PortableTextComponents } from '@portabletext/react';

export const richTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="text-body-large text-on-surface">{children}</p>,
    h2: ({ children }) => (
      <h2 className="font-secondary text-headline-small mt-8 mb-4 text-on-surface">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-secondary text-title-large mt-6 mb-3 text-on-surface">{children}</h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-outline-variant pl-4 text-body-large italic text-on-surface-variant">
        {children}
      </blockquote>
    ),
  },
};
