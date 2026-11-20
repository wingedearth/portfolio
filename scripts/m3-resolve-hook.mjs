import { extname } from 'node:path';

export async function resolve(specifier, context, nextResolve) {
  const isRelative = specifier.startsWith('./') || specifier.startsWith('../');
  if (isRelative && extname(specifier) === '') {
    return nextResolve(`${specifier}.js`, context);
  }
  return nextResolve(specifier, context);
}
