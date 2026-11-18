'use client';

import { scrollBehavior } from '@/lib/motion';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: scrollBehavior() });
  };

  return (
    <footer className="relative z-10 border-t border-outline-variant bg-surface-container-low mt-1">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-center">
          <button
            type="button"
            onClick={scrollToTop}
            className="md-text-button md-state group"
          >
            <svg
              className="w-4 h-4 transition-transform duration-standard ease-emphasized group-hover:-translate-y-1 motion-reduce:transition-none motion-reduce:group-hover:translate-y-0"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path d="M5 15l7-7 7 7" />
            </svg>
            <span>Back to the top</span>
          </button>
        </div>
      </div>
    </footer>
  );
};
