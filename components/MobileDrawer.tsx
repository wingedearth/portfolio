'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileDrawer = ({ isOpen, onClose }: MobileDrawerProps) => {
  const pathname = usePathname();

  const handleHomeClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    onClose();
  };
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-40"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className={`md:hidden fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-6">
          <div className="flex justify-end mb-8">
            <button
              onClick={onClose}
              className="p-2 text-gray-700 hover:text-gray-900 transition-colors"
              aria-label="Close menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <nav className="flex flex-col gap-6">
            <Link
              href="/"
              className="text-lg text-gray-700 hover:text-[var(--accent)] transition-colors"
              onClick={handleHomeClick}
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-lg text-gray-700 hover:text-[var(--accent)] transition-colors"
              onClick={onClose}
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-lg text-gray-700 hover:text-[var(--accent)] transition-colors"
              onClick={onClose}
            >
              Contact
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
};
