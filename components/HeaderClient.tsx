'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { MobileDrawer } from './MobileDrawer';

interface HeaderClientProps {
  title: string;
  subtitle: string;
  titleFont?: string;
  titleFontSize?: number;
  subtitleFontSize?: number;
}

const getFontFamily = (fontName?: string) => {
  const fontMap: Record<string, string> = {
    'Libre Bodoni': 'var(--font-libre-bodoni)',
    'Raleway': 'var(--font-raleway)',
    'Montserrat': 'var(--font-montserrat)',
    'Inter': 'var(--font-inter)',
    'Open Sans': 'var(--font-open-sans)',
    'Roboto': 'var(--font-roboto)',
    'Georgia': 'Georgia, serif',
    'Times New Roman': '"Times New Roman", serif',
  };
  return fontMap[fontName || 'Libre Bodoni'] || 'var(--font-libre-bodoni)';
};

export const HeaderClient = ({ title, subtitle, titleFont, titleFontSize = 40, subtitleFontSize = 16 }: HeaderClientProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== '/') {
      setActiveSection('');
      return;
    }

    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          if (id === 'work') {
            setActiveSection('work');
          } else if (id === 'about') {
            setActiveSection('about');
          } else if (id === 'contact') {
            setActiveSection('contact');
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe sections
    const workSection = document.getElementById('work');
    const aboutSection = document.getElementById('about');
    const contactSection = document.getElementById('contact');

    if (workSection) observer.observe(workSection);
    if (aboutSection) observer.observe(aboutSection);
    if (contactSection) observer.observe(contactSection);

    // Check if we're at the top of the page
    const handleScroll = () => {
      if (window.scrollY < 100) {
        setActiveSection('home');
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [pathname]);

  const handleHomeClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleAboutClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === '/') {
      e.preventDefault();
      const aboutSection = document.getElementById('about');
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleWorkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === '/') {
      e.preventDefault();
      const workSection = document.getElementById('work');
      if (workSection) {
        workSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleContactClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === '/') {
      e.preventDefault();
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const navItems = [
    { label: 'Home', href: '/', section: 'home', onClick: handleHomeClick },
    { label: 'Work', href: '/#work', section: 'work', onClick: handleWorkClick },
    { label: 'About', href: '/#about', section: 'about', onClick: handleAboutClick },
    { label: 'Contact', href: '/#contact', section: 'contact', onClick: handleContactClick },
  ];

  return (
    <header className="sticky top-0 bg-white shadow-sm z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-start justify-between">
          <Link href="/" onClick={handleHomeClick} className="hover:opacity-80 transition-opacity">
            <h1 
              className="font-semibold italic text-gray-900 leading-none pl-1"
              style={{ fontFamily: getFontFamily(titleFont), fontSize: `${titleFontSize}px` }}
            >
              {title}
            </h1>
            <p 
              className="text-[var(--accent)] font-semibold leading-tight"
              style={{ fontSize: `${subtitleFontSize}px` }}
            >
              {subtitle}
            </p>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-8 mt-1 relative">
            {navItems.map((item) => {
              const isActive = pathname === '/' 
                ? activeSection === item.section
                : pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={item.onClick}
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
