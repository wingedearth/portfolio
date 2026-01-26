import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { password } = await request.json();
  
  // Check password against environment variable
  const correctPassword = process.env.SITE_PASSWORD;
  
  if (password === correctPassword) {
    const response = NextResponse.json({ success: true });
    
    // Set authentication cookie (30 days expiration)
    response.cookies.set('portfolio-auth', 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: '/',
    });
    
    return response;
  }
  
  return NextResponse.json({ success: false }, { status: 401 });
}
