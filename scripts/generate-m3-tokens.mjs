/**
 * Generate Material Design 3 color roles from the portfolio purple seed.
 *
 * Uses @material/material-color-utilities (HCT + tonal-spot palettes).
 * Writes committed CSS custom properties into app/globals.css between markers.
 * No runtime dependency: the site ships the generated values only.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  Hct,
  SchemeTonalSpot,
  MaterialDynamicColors,
  TonalPalette,
  hexFromArgb,
  argbFromRgb,
} from '@material/material-color-utilities';

const SEED = argbFromRgb(110, 15, 121);
const SOURCE = Hct.fromInt(SEED);

const ROLES = [
  'primary',
  'onPrimary',
  'primaryContainer',
  'onPrimaryContainer',
  'secondary',
  'onSecondary',
  'secondaryContainer',
  'onSecondaryContainer',
  'tertiary',
  'onTertiary',
  'tertiaryContainer',
  'onTertiaryContainer',
  'error',
  'onError',
  'errorContainer',
  'onErrorContainer',
  'background',
  'onBackground',
  'surface',
  'onSurface',
  'surfaceVariant',
  'onSurfaceVariant',
  'outline',
  'outlineVariant',
  'shadow',
  'scrim',
  'inverseSurface',
  'inverseOnSurface',
  'inversePrimary',
  'surfaceDim',
  'surfaceBright',
  'surfaceContainerLowest',
  'surfaceContainerLow',
  'surfaceContainer',
  'surfaceContainerHigh',
  'surfaceContainerHighest',
  'surfaceTint',
  'primaryFixed',
  'primaryFixedDim',
  'onPrimaryFixed',
  'onPrimaryFixedVariant',
  'secondaryFixed',
  'secondaryFixedDim',
  'onSecondaryFixed',
  'onSecondaryFixedVariant',
  'tertiaryFixed',
  'tertiaryFixedDim',
  'onTertiaryFixed',
  'onTertiaryFixedVariant',
];

const colors = new MaterialDynamicColors();
const seedPalette = TonalPalette.fromHct(SOURCE);

// Primary roles use the seed's own HCT tonal palette at the Material tone stops
// so the brand purple stays vivid. Tonal spot would compress that chroma into a mauve.
// Neutrals, secondary, tertiary, and error still come from the tonal-spot scheme.
const PRIMARY_TONES = {
  light: {
    primary: 40,
    onPrimary: 100,
    primaryContainer: 90,
    onPrimaryContainer: 10,
    inversePrimary: 80,
    primaryFixed: 90,
    primaryFixedDim: 80,
    onPrimaryFixed: 10,
    onPrimaryFixedVariant: 30,
    surfaceTint: 40,
    primaryHover: 30,
  },
  dark: {
    primary: 80,
    onPrimary: 20,
    primaryContainer: 30,
    onPrimaryContainer: 90,
    inversePrimary: 40,
    primaryFixed: 90,
    primaryFixedDim: 80,
    onPrimaryFixed: 10,
    onPrimaryFixedVariant: 30,
    surfaceTint: 80,
    primaryHover: 70,
  },
};

function camelToKebab(value) {
  return value.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
}

function roleHex(scheme, role) {
  const dynamic = colors[role]();
  if (!dynamic) {
    throw new Error(`Missing dynamic color for role ${role}`);
  }
  return hexFromArgb(dynamic.getArgb(scheme));
}

function schemeBlock(isDark, indent) {
  const scheme = new SchemeTonalSpot(SOURCE, isDark, 0);
  const tones = isDark ? PRIMARY_TONES.dark : PRIMARY_TONES.light;
  const lines = ROLES.map((role) => {
    if (Object.prototype.hasOwnProperty.call(tones, role)) {
      return `--md-${camelToKebab(role)}: ${hexFromArgb(seedPalette.tone(tones[role]))};`;
    }
    return `--md-${camelToKebab(role)}: ${roleHex(scheme, role)};`;
  });
  lines.push(`--md-primary-hover: ${hexFromArgb(seedPalette.tone(tones.primaryHover))};`);
  const card = isDark ? 'var(--md-surface-container-high)' : 'var(--md-surface-container-lowest)';
  lines.push(`--md-surface-card: ${card};`);
  return lines.map((line) => `${indent}${line}`).join('\n');
}

function contrastRatio(fg, bg) {
  const lum = (hex) => {
    const n = parseInt(hex.slice(1), 16);
    const channels = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((channel) => {
      const s = channel / 255;
      return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
    });
    return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
  };
  const lighter = Math.max(lum(fg), lum(bg));
  const darker = Math.min(lum(fg), lum(bg));
  return (lighter + 0.05) / (darker + 0.05);
}

const light = new SchemeTonalSpot(SOURCE, false, 0);
const dark = new SchemeTonalSpot(SOURCE, true, 0);
const lightPrimary = hexFromArgb(seedPalette.tone(PRIMARY_TONES.light.primary));
const darkPrimary = hexFromArgb(seedPalette.tone(PRIMARY_TONES.dark.primary));
const lightOnPrimary = hexFromArgb(seedPalette.tone(PRIMARY_TONES.light.onPrimary));
const darkOnPrimary = hexFromArgb(seedPalette.tone(PRIMARY_TONES.dark.onPrimary));
const pairs = [
  ['primary on surface', lightPrimary, roleHex(light, 'surface')],
  ['on-primary on primary', lightOnPrimary, lightPrimary],
  ['on-surface on surface', roleHex(light, 'onSurface'), roleHex(light, 'surface')],
  ['on-surface-variant on surface', roleHex(light, 'onSurfaceVariant'), roleHex(light, 'surface')],
  ['dark primary on surface', darkPrimary, roleHex(dark, 'surface')],
  ['dark on-primary on primary', darkOnPrimary, darkPrimary],
  ['dark on-surface on surface', roleHex(dark, 'onSurface'), roleHex(dark, 'surface')],
];

console.log(`Seed HCT hue ${SOURCE.hue.toFixed(2)} chroma ${SOURCE.chroma.toFixed(2)} tone ${SOURCE.tone.toFixed(2)}`);
console.log(`Primary light ${lightPrimary} dark ${darkPrimary}`);
for (const [label, fg, bg] of pairs) {
  const ratio = contrastRatio(fg, bg);
  console.log(`${label}: ${fg} on ${bg} = ${ratio.toFixed(2)}:1`);
}

const block = `/* BEGIN GENERATED M3 COLORS
 * Seed rgb(110, 15, 121) / #6E0F79.
 * Neutrals, secondary, tertiary, and error: Material 3 tonal spot, contrast 0, spec 2021.
 * Primary roles: the seed's own HCT tonal palette at the spec tone stops (light primary tone 40).
 * Regenerate with: npm run tokens
 * Dark values are kept for a later manual theme. Nothing sets data-theme,
 * and prefers-color-scheme does not switch the site.
 */
:root {
${schemeBlock(false, '  ')}
}

[data-theme="dark"] {
${schemeBlock(true, '  ')}
}
/* END GENERATED M3 COLORS */`;

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const globalsPath = resolve(root, 'app/globals.css');
const globals = readFileSync(globalsPath, 'utf8');
const pattern = /\/\* BEGIN GENERATED M3 COLORS[\s\S]*?\/\* END GENERATED M3 COLORS \*\//;

if (!pattern.test(globals)) {
  console.error('globals.css is missing the generated color markers');
  process.exit(1);
}

writeFileSync(globalsPath, globals.replace(pattern, block));
console.log('Updated app/globals.css color roles');
