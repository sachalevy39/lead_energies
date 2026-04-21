import { City } from '@/types/city';

/**
 * Internal linking utilities for Leadpac France
 * Provides functions to find related cities, regions, and services
 */

// Default distance matrix (in km) between major cities
const cityDistances: Record<string, Record<string, number>> = {
  // Paris
  'paris': { 'lyon': 425, 'marseille': 770, 'lille': 220, 'bordeaux': 500, 'toulouse': 580, 'nice': 930, 'strasbourg': 550, 'nantes': 380, 'saint-etienne': 460, 'montpellier': 730 },
  // Lyon
  'lyon': { 'paris': 425, 'marseille': 215, 'lille': 645, 'bordeaux': 480, 'toulouse': 440, 'nice': 330, 'strasbourg': 370, 'nantes': 650, 'saint-etienne': 70, 'montpellier': 320 },
  // Marseille
  'marseille': { 'paris': 770, 'lyon': 215, 'lille': 965, 'bordeaux': 680, 'toulouse': 490, 'nice': 230, 'strasbourg': 880, 'nantes': 820, 'saint-etienne': 280, 'montpellier': 240 },
  // Lille
  'lille': { 'paris': 220, 'lyon': 645, 'marseille': 965, 'bordeaux': 720, 'toulouse': 810, 'nice': 1120, 'strasbourg': 440, 'nantes': 480, 'saint-etienne': 700, 'montpellier': 880 },
  // Bordeaux
  'bordeaux': { 'paris': 500, 'lyon': 480, 'marseille': 680, 'lille': 720, 'toulouse': 240, 'nice': 750, 'strasbourg': 800, 'nantes': 280, 'saint-etienne': 520, 'montpellier': 380 },
  // Toulouse
  'toulouse': { 'paris': 580, 'lyon': 440, 'marseille': 490, 'lille': 810, 'bordeaux': 240, 'nice': 670, 'strasbourg': 780, 'nantes': 520, 'saint-etienne': 460, 'montpellier': 230 },
  // Nice
  'nice': { 'paris': 930, 'lyon': 330, 'marseille': 230, 'lille': 1120, 'bordeaux': 750, 'toulouse': 670, 'strasbourg': 880, 'nantes': 820, 'saint-etienne': 350, 'montpellier': 240 },
  // Strasbourg
  'strasbourg': { 'paris': 550, 'lyon': 370, 'marseille': 880, 'lille': 440, 'bordeaux': 800, 'toulouse': 780, 'nice': 880, 'nantes': 720, 'saint-etienne': 400, 'montpellier': 580 },
  // Nantes
  'nantes': { 'paris': 380, 'lyon': 650, 'marseille': 820, 'lille': 480, 'bordeaux': 280, 'toulouse': 520, 'nice': 930, 'strasbourg': 720, 'saint-etienne': 620, 'montpellier': 650 },
  // Saint-Etienne
  'saint-etienne': { 'paris': 460, 'lyon': 70, 'marseille': 280, 'lille': 700, 'bordeaux': 520, 'toulouse': 460, 'nice': 350, 'strasbourg': 400, 'nantes': 620, 'montpellier': 200 },
  // Montpellier
  'montpellier': { 'paris': 730, 'lyon': 320, 'marseille': 240, 'lille': 880, 'bordeaux': 380, 'toulouse': 230, 'nice': 240, 'strasbourg': 580, 'nantes': 650, 'saint-etienne': 200 },
};

/**
 * Get neighboring cities (within 50km)
 */
export function getNeighboringCities(
  citySlug: string,
  cities: City[]
): City[] {
  const distances = cityDistances[citySlug] || {};
  
  return cities.filter((c) => {
    if (c.slug === citySlug) return false;
    const distance = distances[c.slug];
    return distance !== undefined && distance <= 50;
  });
}

/**
 * Get all cities in the same region
 */
export function getRegionCities(
  region: string,
  cities: City[]
): City[] {
  return cities
    .filter((c) => c.region === region)
    .sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * Get service hub pages for a city (simplified interface)
 */
export function getServiceLinks(city: { name: string; services?: string[]; slug?: string }): Array<{
  title: string;
  description: string;
  url: string;
  icon: string;
}> {
  const serviceConfig: Record<string, { title: string; description: string; icon: string }> = {
    'panneaux-solaires': {
      title: 'Panneaux solaires',
      description: 'Énergie solaire et économies d\'énergie. Profitez des subventions et de l\'ensoleillement local.',
      icon: '☀️',
    },
    'thermopompe': {
      title: 'Thermopompe à air',
      description: 'Chauffage écologique et économique avec la thermopompe. Éligible aux aides nationales.',
      icon: '💨',
    },
    'isolation': {
      title: 'Isolation thermique',
      description: 'Améliorez le confort de votre maison avec une isolation performante. Profitez des aides.',
      icon: '🏠',
    },
    'chaudière-énergie': {
      title: 'Chaudière à haute performance',
      description: 'Remplacez votre chaudière obsolète par une solution éco-énergétique. Aides disponibles.',
      icon: '🔥',
    },
  };

  return (city.services || []).map((service) => {
    const config = serviceConfig[service as keyof typeof serviceConfig];
    return {
      ...config,
      title: config.title + (city.name ? ' à ' + city.name : ''),
      description: config.description + (city.name ? ' à ' + city.name : ''),
      url: city.slug ? `/ville/${city.slug}/${service}` : '#',
    };
  });
}

/**
 * Get related cities for a given city
 */
export function getRelatedCities(
  city: City,
  cities: City[]
): { neighboring: City[]; region: City[]; similar: City[] } {
  const neighboring = getNeighboringCities(city.slug, cities);
  const region = getRegionCities(city.region, cities);
  
  // Similar cities: same climate zone and population within 500k
  const similar = cities.filter(
    (c) =>
      c.climateZone === city.climateZone &&
      c.id !== city.id &&
      Math.abs((c.population || 0) - (city.population || 0)) < 500000
  );

  return {
    neighboring,
    region: region.filter((c) => c.id !== city.id),
    similar,
  };
}

/**
 * Generate internal linking HTML for city pages
 */
export function generateInternalLinksHTML(city: City, cities: City[]): string {
  const links = getRelatedCities(city, cities);
  const services = getServiceLinks(city);
  
  let html = '<div class="internal-links mt-8 pt-6 border-t border-gray-200">\n';
  html += '<h3 class="text-lg font-semibold mb-4">Lien vers les villes et services voisins</h3>\n';
  
  // Neighboring cities
  if (links.neighboring.length > 0) {
    html += '<div class="neighboring-cities mb-4">\n';
    html += '<h4 className="font-medium mb-2">Villes proches de ' + city.name + ':</h4>\n';
    html += '<ul className="flex flex-wrap gap-2">\n';
    links.neighboring.forEach((c) => {
      html += `<li><a href="/ville/${c.slug}" className="text-blue-600 hover:underline">${c.name}</a></li>\n`;
    });
    html += '</ul>\n</div>\n';
  }
  
  // Region cities (show top 5)
  const topRegionCities = links.region.slice(0, 5);
  if (topRegionCities.length > 0) {
    html += '<div class="region-cities mb-4">\n';
    html += '<h4 className="font-medium mb-2">Autres villes dans ' + city.region + ':</h4>\n';
    html += '<ul className="flex flex-wrap gap-2">\n';
    topRegionCities.forEach((c) => {
      html += `<li><a href="/ville/${c.slug}" className="text-blue-600 hover:underline">${c.name}</a></li>\n`;
    });
    if (links.region.length > 5) {
      html += `<li><a href="/region/${city.region.toLowerCase().replace(/ /g, '-')}" className="text-blue-600 hover:underline">+${links.region.length - 5} autre(s)</a></li>\n`;
    }
    html += '</ul>\n</div>\n';
  }
  
  // Services
  html += '<div class="services-cities mb-4">\n';
  html += '<h4 className="font-medium mb-2">Nos services à ' + city.name + ':</h4>\n';
  html += '<ul className="grid grid-cols-1 md:grid-cols-2 gap-2">\n';
  services.forEach((service) => {
    html += `<li><a href="${service.url}" className="text-blue-600 hover:underline flex items-center gap-1">${service.icon} ${service.title}</a></li>\n`;
  });
  html += '</ul>\n</div>\n';
  
  html += '</div>\n';
  
  return html;
}
