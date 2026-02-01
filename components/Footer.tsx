'use client';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white border-t mt-1">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-center">
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-gray-600 hover:text-[var(--accent)] transition-colors group"
          >
            <svg
              className="w-4 h-4 transition-transform group-hover:-translate-y-1"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M5 15l7-7 7 7" />
            </svg>
            <span className="font-medium">Back to the top</span>
          </button>
        </div>
      </div>
    </footer>
  );
};
