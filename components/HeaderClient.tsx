'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { MobileDrawer } from './MobileDrawer';

interface HeaderClientProps {
  title: string;
  subtitle: string;
}

export const HeaderClient = ({ title, subtitle }: HeaderClientProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <header className="sticky top-0 bg-white shadow-sm z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 leading-tight">{title}</h1>
            <p className="text-[var(--accent)] font-semibold leading-tight">{subtitle}</p>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-8 mt-1 relative">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative pb-1 text-gray-700 hover:text-[var(--accent)] transition-colors group ${
                    isActive ? 'text-[var(--accent)]' : ''
                  }`}
                >
                  {item.label}
                  <span 
                    className={`absolute bottom-0 left-0 h-0.5 origin-left transition-all duration-300 ease-out ${
                      isActive 
                        ? 'w-full bg-[var(--accent)]' 
                        : 'w-0 group-hover:w-full bg-gray-300'
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Hamburger Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden mt-1 p-2 text-gray-700 hover:text-gray-900 transition-colors"
            aria-label="Toggle menu"
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
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      <MobileDrawer isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </header>
  );
};
