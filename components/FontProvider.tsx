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
    const root = document.documentElement;
    
    if (primaryFont) {
      root.style.setProperty('--font-sans', getFontVariable(primaryFont));
    }
    
    if (secondaryFont) {
      root.style.setProperty('--font-secondary', getFontVariable(secondaryFont));
    }
  }, [primaryFont, secondaryFont]);

  return null;
};
