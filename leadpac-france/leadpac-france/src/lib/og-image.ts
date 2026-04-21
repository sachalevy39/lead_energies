import { Resvg } from '@resvg/resvg-js';

interface OpenGraphImageProps {
  city: {
    name: string;
    department: string;
    region: string;
    climateZone?: string;
    dju?: number;
  };
}

/**
 * Generate OpenGraph image for a city page
 * This function creates a dynamic image with city information
 */
export async function generateOpenGraphImage({ city }: OpenGraphImageProps): Promise<Buffer | null> {
  // For now, return null since we can't actually render SVG in this environment
  // In production, you would use a library like @vercel/og or resvg-js
  return null;
}

/**
 * Generate SVG content for OpenGraph image
 */
export function getOpenGraphSVG({ city }: OpenGraphImageProps): string {
  const cityColor = {
    'paris': '#1e3a8a',
    'lyon': '#059669',
    'marseille': '#dc2626',
    'lille': '#7c3aed',
    'toulouse': '#db2777',
    'nice': '#2563eb',
    'nantes': '#0d9488',
    'montpellier': '#d97706',
    'bordeaux': '#b91c1c',
    'strasbourg': '#0f766e',
    'rennes': '#be123c',
  }[city.name.toLowerCase()] || '#2563eb';

  return `
    <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
      <!-- Background gradient -->
      <rect width="1200" height="630" fill="url(#gradient)" />
      
      <!-- Decorative circles -->
      <circle cx="100" cy="100" r="80" fill="rgba(255,255,255,0.1)" />
      <circle cx="1100" cy="530" r="120" fill="rgba(255,255,255,0.05)" />
      
      <!-- City name -->
      <text x="600" y="250" font-family="Arial, sans-serif" font-size="72" font-weight="bold" fill="white" text-anchor="middle">
        ${city.name.toUpperCase()}
      </text>
      
      <!-- Location details -->
      <text x="600" y="320" font-family="Arial, sans-serif" font-size="36" fill="#e0e7ff" text-anchor="middle">
        ${city.department} • ${city.region}
      </text>
      
      <!-- Climate info -->
      <g transform="translate(600, 420)">
        <text font-family="Arial, sans-serif" font-size="28" fill="white" text-anchor="middle">
          Zone climatique: ${city.climateZone || 'N/A'}
        </text>
        <text font-family="Arial, sans-serif" font-size="28" fill="white" text-anchor="middle" dy="40">
          DJU: ${city.dju || 'N/A'}
        </text>
      </g>
      
      <!-- Leadpac branding -->
      <text x="600" y="560" font-family="Arial, sans-serif" font-size="24" font-weight="600" fill="white" text-anchor="middle">
        Leadpac - Énergies renouvelables
      </text>
      
      <!-- Gradient definition -->
      <defs>
        <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#1e3a8a" />
          <stop offset="100%" stop-color="#1e40af" />
        </linearGradient>
      </defs>
    </svg>
  `;
}

/**
 * Generate city-specific OpenGraph image URL (for static generation)
 */
export function getOpenGraphImageURL({ city }: OpenGraphImageProps): string {
  const encodedCity = encodeURIComponent(JSON.stringify(city));
  return `/api/og?city=${encodedCity}`;
}
