'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const revealSelector = '[data-reveal]';

export function MotionRoot() {
  const pathname = usePathname();

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const supportsViewTimeline = CSS.supports('animation-timeline: view()');
    if (reduceMotion || supportsViewTimeline) return;

    const pending: HTMLElement[] = [];
    document.querySelectorAll<HTMLElement>(revealSelector).forEach((element) => {
      element.classList.remove('is-pending', 'is-inview');
      const rect = element.getBoundingClientRect();
      const alreadyVisible = rect.top < window.innerHeight * 0.92 && rect.bottom > 0;
      if (alreadyVisible) {
        element.classList.add('is-inview');
        return;
      }
      element.classList.add('is-pending');
      pending.push(element);
    });

    if (pending.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-inview');
          entry.target.classList.remove('is-pending');
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.18, rootMargin: '0px 0px -8% 0px' },
    );

    pending.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
