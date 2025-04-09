
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtDecode } from 'jwt-decode'; // You'll need to install this package

// Define which routes should be protected
const protectedRoutes = [
  '/dashboard',
  '/profile',
];

// Define public routes that should never be redirected when authenticated
const authRoutes = [
  '/login',
  '/signup',
  '/forgot-password',
  '/verify-email',
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const { cookies } = request;

  // Check if the current path is a protected route
  const isProtectedRoute = protectedRoutes.some(route =>
    pathname === route || pathname.startsWith(`${route}/`)
  );

  const isAuthRoute = authRoutes.some(route =>
    pathname === route || pathname.startsWith(`${route}/`)
  );

  // Check if we have an auth token in the cookies
  const authToken = cookies.get('accessToken')?.value;
  let isTokenValid = false;

  if (authToken) {
    try {
      // Decode the JWT to check expiration
      const decodedToken = jwtDecode(authToken);
      
      // Check if token is expired
      const currentTime = Math.floor(Date.now() / 1000);
      isTokenValid = decodedToken.exp ? decodedToken.exp > currentTime : false;
      
      console.log('Token validation:', { 
        isValid: isTokenValid, 
        expiresAt: decodedToken.exp ? new Date(decodedToken.exp * 1000).toISOString() : 'unknown' 
      });
      
      // If token is expired, redirect to login with expired=true parameter
      if (!isTokenValid) {
        // Clear the expired token
        const response = NextResponse.redirect(new URL('/login?expired=true', request.url));
        response.cookies.delete('accessToken');
        response.cookies.delete('refreshToken'); // If you have a refresh token
        return response;
      }
    } catch (error) {
      console.error('Token validation error:', error);
      isTokenValid = false;
    }
  }

  console.log('Middleware check:', { 
    pathname, 
    isProtectedRoute, 
    isAuthRoute, 
    hasToken: !!authToken, 
    isTokenValid 
  });

  // If trying to access a protected route without a valid token, redirect to login
  if (isProtectedRoute && (!authToken || !isTokenValid)) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('callbackUrl', encodeURIComponent(pathname));
    return NextResponse.redirect(loginUrl);
  }

  // If already logged in with a valid token and trying to access auth routes, redirect to dashboard
  if (authToken && isTokenValid && isAuthRoute) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

// Configure middleware to run on specific paths
export const config = {
  matcher: [
    // Match all protected routes and auth routes
    '/dashboard/:path*',
    '/profile/:path*',
    '/login',
    '/signup',
    '/forgot-password',
    '/verify-email',
  ],
};