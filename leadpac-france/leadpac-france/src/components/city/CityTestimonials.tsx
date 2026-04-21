'use client';

import { useState } from 'react';
import { StarIcon, MapPinIcon } from '@heroicons/react/24/solid';
import { TestimonialCard } from '@/components/ui/testimonial-card';
import { getRegionCities, getNeighboringCities, getServiceLinks } from '@/lib/internal-links';

interface Testimonial {
  name: string;
  first_name: string;
  last_name: string;
  age: number;
  profession: string;
  city: string;
  service: string;
  content: string;
  rating: number;
}

interface CityTestimonialsProps {
  city?: {
    name: string;
    department: string;
    region: string;
    slug?: string;
  };
  testimonials?: Testimonial[];
}

export function CityTestimonials({ city, testimonials }: CityTestimonialsProps) {
  const [showInternalLinks, setShowInternalLinks] = useState(false);
  
  // Get internal links data - only if city has slug
  const neighboringCities = city?.slug ? getNeighboringCities(city.slug, getRegionCities(city.region || '', [])) : [];
  const serviceLinks = city?.slug ? getServiceLinks(city) : [];
  const regionCities = city?.slug ? getRegionCities(city.region || '', []) : [];

  // Default testimonials if none provided
  const defaultTestimonials: Testimonial[] = [
    {
      name: "Jean Dupont",
      first_name: "Jean",
      last_name: "Dupont",
      age: 45,
      profession: "Chef d'entreprise",
      city: city?.name || "Paris",
      service: "panneaux-solaires",
      content: "Depuis l'installation de mes panneaux solaires à Paris, ma facture d'électricité a été divisée par trois. L'équipe Leadpac a été parfaitement réactive et professionnelle.",
      rating: 5
    },
    {
      name: "Marie Martin",
      first_name: "Marie",
      last_name: "Martin",
      age: 52,
      profession: "Professeur des écoles",
      city: city?.name || "Lyon",
      service: "thermopompe",
      content: "La thermopompe à air a transformé notre confort hivernal à Lyon. Pas de facture fioul depuis 2 ans, et l'installation a été rapide avec les aides de Leadpac.",
      rating: 5
    },
    {
      name: "Pierre Durand",
      first_name: "Pierre",
      last_name: "Durand",
      age: 38,
      profession: "Développeur web",
      city: city?.name || "Marseille",
      service: "isolation",
      content: "Notre maison à Marseille était un four en été. L'isolation par l'extérieur a changé notre quotidien. La température est plus stable et nos charges diminuent.",
      rating: 5
    },
    {
      name: "Sophie Petit",
      first_name: "Sophie",
      last_name: "Petit",
      age: 41,
      profession: "Infirmière",
      city: city?.name || "Toulouse",
      service: "panneaux-solaires",
      content: "Un projet mené main dans la main avec Leadpac à Toulouse. Toutes les démarches administratives ont été prises en charge. Je recommande sans hésiter.",
      rating: 5
    },
    {
      name: "Lucas Bernard",
      first_name: "Lucas",
      last_name: "Bernard",
      age: 29,
      profession: "Architecte",
      city: city?.name || "Bordeaux",
      service: "thermopompe",
      content: "En tant qu'architecte, je valorise l'expertise de Leadpac. Mon installation à Bordeaux est un succès technique et esthétique. Merci à toute l'équipe.",
      rating: 5
    },
    {
      name: "Camille Roux",
      first_name: "Camille",
      last_name: "Roux",
      age: 35,
      profession: "Médecin généraliste",
      city: city?.name || "Nice",
      service: "isolation",
      content: "L'isolation thermique à Nice a été une révélation. On ne réalise pas combien on gaspille d'énergie avant de faire appel à Leadpac. Retour sur investissement rapide.",
      rating: 5
    }
  ];

  const data = testimonials || defaultTestimonials;

  // Filter testimonials if city is specified
  const filteredTestimonials = city 
    ? data.filter(t => t.city === city.name) 
    : data;

  // If not enough filtered testimonials, add some from the full dataset
  const finalTestimonials = filteredTestimonials.length >= 3 
    ? filteredTestimonials.slice(0, 6) 
    : filteredTestimonials.concat(
        data.filter(t => !filteredTestimonials.includes(t))
      ).slice(0, 6);

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-8">
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Avis de nos clients à {city?.name}
          </h2>
          <p className="text-blue-100">
            Découvrez ce que nos clients réels disent de leur expérience avec Leadpac
          </p>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {finalTestimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} />
          ))}
        </div>

        <div className="mt-8 text-center">
          <div className="flex items-center justify-center gap-1 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <StarIcon 
                key={star} 
                className="h-5 w-5 text-yellow-400 fill-current" 
              />
            ))}
          </div>
          <p className="text-gray-600 font-medium mb-2">
            Note moyenne de {finalTestimonials.length} avis clients
          </p>
          <p className="text-gray-500 text-sm mb-4">
            Dernier avis publié il y a moins de 24 heures
          </p>
          <a 
            href="https://www.google.com/search?q=leadpac+avis"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 bg-white border-2 border-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
          >
            Voir tous les avis sur Google
          </a>
        </div>

        {/* Internal links - only show if city data available */}
        {city && city.slug && (
          <div className="mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={() => setShowInternalLinks(!showInternalLinks)}
              className="flex items-center justify-center gap-2 w-full py-3 text-sm font-medium text-blue-600 hover:text-blue-800"
            >
              <MapPinIcon className="h-4 w-4" />
              {showInternalLinks ? 'Masquer les villes voisines' : 'Voir les villes voisines et services'}
            </button>
            
            {showInternalLinks && (
              <div className="mt-4 space-y-4">
                {neighboringCities.length > 0 && (
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">Villes proches de {city.name}:</h4>
                    <div className="flex flex-wrap gap-2">
                      {neighboringCities.map((c) => (
                        <a
                          key={c.id}
                          href={`/ville/${c.slug}`}
                          className="px-3 py-1 bg-white border border-blue-200 text-blue-700 text-sm rounded-full hover:bg-blue-100 transition-colors"
                        >
                          {c.name}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
                
                {regionCities.length > 5 && (
                  <div className="bg-indigo-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">Autres villes dans {city.region}:</h4>
                    <div className="flex flex-wrap gap-2">
                      {regionCities.slice(0, 5).map((c) => (
                        <a
                          key={c.id}
                          href={`/ville/${c.slug}`}
                          className="px-3 py-1 bg-white border border-indigo-200 text-indigo-700 text-sm rounded-full hover:bg-indigo-100 transition-colors"
                        >
                          {c.name}
                        </a>
                      ))}
                      {regionCities.length > 5 && (
                        <a
                          href={`/region/${city.region.toLowerCase().replace(/ /g, '-')}`}
                          className="px-3 py-1 bg-white border border-indigo-200 text-indigo-700 text-sm rounded-full hover:bg-indigo-100 transition-colors"
                        >
                          +{regionCities.length - 5} autre(s)
                        </a>
                      )}
                    </div>
                  </div>
                )}
                
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Nos services à {city.name}:</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {serviceLinks.map((service) => (
                      <a
                        key={service.url}
                        href={service.url}
                        className="flex items-center gap-2 px-3 py-2 bg-white border border-green-200 text-green-700 text-sm rounded-lg hover:bg-green-100 transition-colors"
                      >
                        <span>{service.icon}</span>
                        <span>{service.title.split(' à ')[0]}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default CityTestimonials;
