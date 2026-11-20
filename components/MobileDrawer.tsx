'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { scrollBehavior } from '@/lib/motion';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  returnFocusRef: React.RefObject<HTMLButtonElement | null>;
}

const destinations = [
  { label: 'Home', href: '/' },
  { label: 'Work', href: '/work' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export const MobileDrawer = ({ isOpen, onClose, returnFocusRef }: MobileDrawerProps) => {
  const pathname = usePathname();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
      returnFocusRef.current?.focus();
    };
  }, [isOpen, onClose, returnFocusRef]);

  const handleHomeClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === '/') {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: scrollBehavior() });
    }
    onClose();
  };

  const isDestinationActive = (href: string) => {
    if (href === '/') return pathname === '/';
    if (href === '/work') {
      return pathname.startsWith('/work') || pathname.startsWith('/collections') || pathname.startsWith('/projects');
    }
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <>
      <div
        className={`md-scrim md:hidden ${isOpen ? 'is-open' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        id="mobile-nav"
        role="dialog"
        aria-modal="true"
        aria-label="Site"
        inert={isOpen ? undefined : true}
        className={`md-drawer md:hidden ${isOpen ? 'is-open' : ''}`}
      >
        <div className="flex justify-end px-3 pt-3">
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="md-icon-button md-state"
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
              aria-hidden="true"
            >
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <nav className="flex flex-col gap-1 px-3 pb-6" aria-label="Mobile">
          {destinations.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              data-active={isDestinationActive(item.href)}
              aria-current={isDestinationActive(item.href) ? 'page' : undefined}
              className="md-drawer-link md-state"
              onClick={item.href === '/' ? handleHomeClick : onClose}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
};
