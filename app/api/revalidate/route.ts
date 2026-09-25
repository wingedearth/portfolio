import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

/**
 * On-demand revalidation for Sanity content updates.
 *
 * Sanity webhook (POST):
 *   https://www.jenntran.com/api/revalidate?secret=YOUR_REVALIDATE_SECRET
 *
 * Manual test:
 *   curl -X POST "https://www.jenntran.com/api/revalidate?secret=YOUR_REVALIDATE_SECRET"
 */
export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret');

  if (!process.env.REVALIDATE_SECRET) {
    return NextResponse.json(
      { message: 'REVALIDATE_SECRET is not configured' },
      { status: 500 },
    );
  }

  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
  }

  // Bust the root layout cache so homepage, work, projects, collections, etc. refresh.
  revalidatePath('/', 'layout');
  revalidatePath('/');
  revalidatePath('/work');
  revalidatePath('/contact');
  revalidatePath('/about');

  return NextResponse.json({
    revalidated: true,
    now: Date.now(),
  });
}
