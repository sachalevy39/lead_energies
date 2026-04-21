import { NextResponse } from 'next/server';
import { generateSitemap, generateSitemapXML, getSitemapSize } from '@/utils/sitemap';
import { loadCities } from '@/lib/cities';

/**
 * Generate dynamic sitemap at /sitemap.xml
 * This route generates a complete sitemap with all URLs
 */
export async function GET() {
  const cities = loadCities();
  
  if (cities.length === 0) {
    return new NextResponse('No cities found', { status: 500 });
  }

  const urls = generateSitemap(cities);
  const xml = generateSitemapXML(urls);

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
    },
  });
}

/**
 * Generate sitemap index (optional, for larger sites)
 * Currently this just returns the main sitemap
 */
export async function GET_INDEX() {
  const cities = loadCities();
  
  if (cities.length === 0) {
    return new NextResponse('No cities found', { status: 500 });
  }

  const urls = generateSitemap(cities);
  const xml = generateSitemapXML(urls);

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
