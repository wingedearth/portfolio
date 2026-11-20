'use client';

import { useEffect } from 'react';

interface FontProviderProps {
  primaryFont?: string;
  secondaryFont?: string;
}

const getFontVariable = (fontName?: string): string => {
  const fontMap: Record<string, string> = {
    'Raleway': 'var(--font-raleway)',
    'Montserrat': 'var(--font-montserrat)',
    'Libre Bodoni': 'var(--font-libre-bodoni)',
    'Inter': 'var(--font-inter)',
    'Open Sans': 'var(--font-open-sans)',
    'Roboto': 'var(--font-roboto)',
  };
  return fontMap[fontName || 'Raleway'] || 'var(--font-raleway)';
};

export const FontProvider = ({ primaryFont, secondaryFont }: FontProviderProps) => {
  useEffect(() => {
    const root = document.body;

    if (primaryFont) {
      const primary = getFontVariable(primaryFont);
      root.style.setProperty('--font-sans', primary);
      root.style.setProperty('--font-sans-active', primary);
    }

    if (secondaryFont) {
      const secondary = getFontVariable(secondaryFont);
      root.style.setProperty('--font-secondary', secondary);
      root.style.setProperty('--font-secondary-active', secondary);
    }
  }, [primaryFont, secondaryFont]);

  return null;
};
