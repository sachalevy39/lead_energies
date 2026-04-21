export interface CityCoordinates {
  lat: number;
  lng: number;
}

export interface CityAverageTemp {
  summer: number;
  winter: number;
}

export interface CityLeadForm {
  title: string;
  subtitle: string;
  cta: string;
}

export interface City {
  id: string;
  slug: string;
  name: string;
  description: string;
  image?: string;
  phone?: string;
  email?: string;
  address?: string;
  department: string;
  region: string;
  coordinates?: CityCoordinates;
  services?: string[];
  climateZone: string;
  averageTemp?: CityAverageTemp;
  dju?: number;
  population?: number;
  leadForm?: CityLeadForm;
}
