import { City } from '@/types/city';

const cities: City[] = [];

export default cities;

// Load cities from JSON file (server-side only)
export function loadCities(): City[] {
  if (typeof window !== 'undefined') {
    return [];
  }
  
  try {
    const citiesData = require('@/data/cities.json');
    return citiesData;
  } catch (error) {
    console.error('Error loading cities:', error);
    return [];
  }
}

// Get city by slug
export function getCityBySlug(slug: string): City | undefined {
  const cities = loadCities();
  return cities.find((city) => city.slug === slug);
}

// Get all cities
export function getAllCities(): City[] {
  return loadCities();
}

// Get city by ID
export function getCityById(id: string): City | undefined {
  const cities = loadCities();
  return cities.find((city) => city.id === id);
}

// Get cities by region
export function getCitiesByRegion(region: string): City[] {
  const cities = loadCities();
  return cities.filter((city) => city.region === region);
}

// Get cities by department
export function getCitiesByDepartment(department: string): City[] {
  const cities = loadCities();
  return cities.filter((city) => city.department === department);
}

// Get cities by service
export function getCitiesByService(service: string): City[] {
  const cities = loadCities();
  return cities.filter((city) => city.services?.includes(service));
}

// Get cities by climate zone
export function getCitiesByClimateZone(climateZone: string): City[] {
  const cities = loadCities();
  return cities.filter((city) => city.climateZone === climateZone);
}

// Get unique regions
export function getRegions(): string[] {
  const cities = loadCities();
  const regions = new Set(cities.map((city) => city.region));
  return Array.from(regions).sort();
}

// Get unique departments
export function getDepartments(): string[] {
  const cities = loadCities();
  const departments = new Set(cities.map((city) => city.department));
  return Array.from(departments).sort();
}

// Get unique climate zones
export function getClimateZones(): string[] {
  const cities = loadCities();
  const zones = new Set(cities.map((city) => city.climateZone));
  return Array.from(zones).sort();
}

// Get city stats for a specific city
export function getCityStats(city: City): {
  dju: number;
  avgTempSummer: number;
  avgTempWinter: number;
  climateZone: string;
  population: number;
  region: string;
  department: string;
} {
  return {
    dju: city.dju || 0,
    avgTempSummer: city.averageTemp?.summer || 0,
    avgTempWinter: city.averageTemp?.winter || 0,
    climateZone: city.climateZone || 'N/A',
    population: city.population || 0,
    region: city.region || 'N/A',
    department: city.department || 'N/A',
  };
}
