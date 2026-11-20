'use client';

import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { MobileDrawer } from './MobileDrawer';
import { ThemeToggle } from './ThemeToggle';
import { scrollBehavior } from '@/lib/motion';

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
  const closeMenu = useCallback(() => setIsMenuOpen(false), []);
  const [homeSection, setHomeSection] = useState('home');
  const pathname = usePathname();
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (pathname !== '/') return;

    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          if (id === 'work' || id === 'about' || id === 'contact') {
            setHomeSection(id);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const workSection = document.getElementById('work');
    const aboutSection = document.getElementById('about');
    const contactSection = document.getElementById('contact');

    if (workSection) observer.observe(workSection);
    if (aboutSection) observer.observe(aboutSection);
    if (contactSection) observer.observe(contactSection);

    const handleScroll = () => {
      if (window.scrollY < 100) {
        setHomeSection('home');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    const frame = requestAnimationFrame(handleScroll);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [pathname]);

  const isActive = (section: string) => {
    if (pathname === '/') return homeSection === section;
    if (section === 'work') {
      return pathname.startsWith('/work') || pathname.startsWith('/collections') || pathname.startsWith('/projects');
    }
    if (section === 'home') return false;
    return pathname === `/${section}` || pathname.startsWith(`/${section}/`);
  };

  const handleHomeClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === '/') {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: scrollBehavior() });
    }
  };

  const scrollToSection = (event: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    if (pathname !== '/') return;
    event.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: scrollBehavior() });
  };

  const navItems = [
    { label: 'Home', href: '/', section: 'home', onClick: handleHomeClick },
    { label: 'Work', href: '/#work', section: 'work', onClick: (event: React.MouseEvent<HTMLAnchorElement>) => scrollToSection(event, 'work') },
    { label: 'About', href: '/#about', section: 'about', onClick: (event: React.MouseEvent<HTMLAnchorElement>) => scrollToSection(event, 'about') },
    { label: 'Contact', href: '/#contact', section: 'contact', onClick: (event: React.MouseEvent<HTMLAnchorElement>) => scrollToSection(event, 'contact') },
  ];

  return (
    <header className="md-app-bar sticky top-0 z-30">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-on-primary"
      >
        Skip to content
      </a>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" onClick={handleHomeClick} className="hero-lockup rounded-medium">
            <h1
              className="font-semibold italic text-on-surface leading-none pl-1"
              style={{ fontFamily: getFontFamily(titleFont), fontSize: `${titleFontSize}px` }}
            >
              {title}
            </h1>
            <p
              className="text-primary font-semibold leading-tight"
              style={{ fontSize: `${subtitleFontSize}px` }}
            >
              {subtitle}
            </p>
          </Link>

          <div className="flex items-center gap-1">
          <nav className="hidden md:flex gap-1" aria-label="Primary">
            {navItems.map((item) => {
              const active = isActive(item.section);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={item.onClick}
                  data-active={active}
                  aria-current={active ? 'page' : undefined}
                  className="md-nav-link md-state relative inline-flex items-center min-h-10 px-3 text-label-large"
                >
                  {item.label}
                  <span className="md-nav-indicator" />
                </Link>
              );
            })}
          </nav>
          <ThemeToggle />
          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            className="md-icon-button md-state md:hidden"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
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
      </div>

      <MobileDrawer
        isOpen={isMenuOpen}
        onClose={closeMenu}
        returnFocusRef={menuButtonRef}
      />
    </header>
  );
};
