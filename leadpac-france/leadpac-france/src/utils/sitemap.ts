import { City } from '@/types/city';
import { loadCities } from '@/lib/cities';

interface SitemapURL {
  url: string;
  lastModified?: string;
  changeFreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

/**
 * Generate dynamic sitemap URLs for Leadpac France
 * Includes city pages, region pages, service hubs, and static pages
 */
export function generateSitemap(cities: City[]): SitemapURL[] {
  const baseURL = 'https://leadpac.fr';
  const now = new Date().toISOString();
  
  const urls: SitemapURL[] = [];

  // 1. Home page (highest priority)
  urls.push({
    url: `${baseURL}/`,
    lastModified: now,
    changeFreq: 'daily',
    priority: 1.0,
  });

  // 2. City pages (static generation for 20+ cities)
  cities.forEach((city) => {
    urls.push({
      url: `${baseURL}/ville/${city.slug}`,
      lastModified: now,
      changeFreq: 'monthly',
      priority: 0.8,
    });
  });

  // 3. Region pages
  const regions = Array.from(new Set(cities.map((city) => city.region))).sort();
  regions.forEach((region) => {
    // Normalize region name for URL (replace spaces, accents)
    const regionSlug = region
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/ /g, '-');
    
    urls.push({
      url: `${baseURL}/region/${regionSlug}`,
      lastModified: now,
      changeFreq: 'monthly',
      priority: 0.7,
    });
  });

  // 4. Service hub pages
  const services = [
    'panneaux-solaires',
    'thermopompe',
    'isolation',
    'chaudière-énergie',
  ];
  
  services.forEach((service) => {
    urls.push({
      url: `${baseURL}/services/${service}`,
      lastModified: now,
      changeFreq: 'weekly',
      priority: 0.8,
    });
  });

  // 5. Service-by-city pages
  cities.forEach((city) => {
    city.services?.forEach((service) => {
      urls.push({
        url: `${baseURL}/ville/${city.slug}/${service}`,
        lastModified: now,
        changeFreq: 'monthly',
        priority: 0.9,
      });
    });
  });

  // 6. Informational pages
  const infoPages = [
    { path: '/à-propos', priority: 0.6 },
    { path: '/contact', priority: 0.7 },
    { path: '/mentions-légales', priority: 0.5 },
    { path: '/confidentialité', priority: 0.5 },
    { path: '/cookies', priority: 0.5 },
  ];

  infoPages.forEach((page) => {
    urls.push({
      url: `${baseURL}${page.path}`,
      lastModified: now,
      changeFreq: 'yearly',
      priority: page.priority,
    });
  });

  return urls;
}

/**
 * Generate sitemap XML string
 */
export function generateSitemapXML(urls: SitemapURL[]): string {
  const now = new Date().toISOString();
  
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  urls.forEach((url) => {
    xml += `  <url>\n`;
    xml += `    <loc>${url.url}</loc>\n`;
    xml += `    <lastmod>${url.lastModified?.split('T')[0]}</lastmod>\n`;
    if (url.changeFreq) {
      xml += `    <changefreq>${url.changeFreq}</changefreq>\n`;
    }
    if (url.priority !== undefined) {
      xml += `    <priority>${url.priority.toFixed(1)}</priority>\n`;
    }
    xml += `  </url>\n`;
  });

  xml += `</urlset>`;

  return xml;
}

/**
 * Get sitemap size (number of URLs)
 */
export function getSitemapSize(cities: City[]): number {
  // Count: 1 home + cities + regions + services + city-services + info pages
  const regionsCount = new Set(cities.map((c) => c.region)).size;
  const servicesCount = 4; // panneaux-solaires, thermopompe, isolation, chaudière-énergie
  const cityServicesCount = cities.reduce((acc, city) => acc + (city.services?.length || 0), 0);
  const infoPagesCount = 6; // about, contact, legal, privacy, cookies, etc.

  return 1 + cities.length + regionsCount + servicesCount + cityServicesCount + infoPagesCount;
}
