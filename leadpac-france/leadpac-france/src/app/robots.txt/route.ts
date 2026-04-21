import { NextResponse } from 'next/server';

/**
 * Generate robots.txt
 * Controls search engine crawling behavior
 */
export async function GET() {
  const baseURL = 'https://leadpac.fr';
  const sitemapURL = `${baseURL}/sitemap.xml`;
  const disallowPaths = [
    '/admin',
    '/api',
    '/_next',
    '/static',
  ];

  let robots = `# Robots.txt for Leadpac\n`;
  robots += `# https://leadpac.fr\n\n`;
  robots += `User-agent: *\n`;
  robots += `# Allow all bots to access the site\n`;
  robots += `Allow: /\n\n`;
  
  // Disallow admin and API paths
  disallowPaths.forEach((path) => {
    robots += `Disallow: ${path}\n`;
  });
  
  robots += `\n`;
  robots += `# Sitemap location\n`;
  robots += `Sitemap: ${sitemapURL}\n`;
  
  // Allow Google specific directives
  robots += `\n`;
  robots += `# Google-specific directives\n`;
  robots += `User-agent: Googlebot\n`;
  robots += `Allow: /\n`;
  robots += `Crawl-delay: 0\n`;
  
  // Bing-specific directives
  robots += `\n`;
  robots += `# Bing-specific directives\n`;
  robots += `User-agent: Bingbot\n`;
  robots += `Allow: /\n`;
  robots += `Crawl-delay: 1\n`;

  return new NextResponse(robots, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400', // Cache for 1 day
    },
  });
}
