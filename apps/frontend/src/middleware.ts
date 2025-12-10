export { default } from 'next-auth/middleware';

// https://nextjs.org/docs/pages/building-your-application/routing/middleware
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|auth/*).*)'],
};
