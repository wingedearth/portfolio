import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Skip authentication for studio, API routes, and static files
  if (
    request.nextUrl.pathname.startsWith('/studio') ||
    request.nextUrl.pathname.startsWith('/api') ||
    request.nextUrl.pathname.startsWith('/_next')
  ) {
    return NextResponse.next();
  }

  // Check if user is authenticated
  const isAuthenticated = request.cookies.get('portfolio-auth')?.value === 'true';

  // If accessing the login page
  if (request.nextUrl.pathname === '/login') {
    // If already authenticated, redirect to home
    if (isAuthenticated) {
      return NextResponse.redirect(new URL('/', request.url));
    }
    return NextResponse.next();
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('from', request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except static files
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
