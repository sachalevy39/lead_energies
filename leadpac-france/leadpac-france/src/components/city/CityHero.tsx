'use client';

import { Button } from '@headlessui/react';
import { MapPinIcon, PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/solid';

interface CityHeroProps {
  city: {
    name: string;
    description: string;
    phone?: string;
    email?: string;
    address?: string;
  };
}

export function CityHero({ city }: CityHeroProps) {
  return (
    <div className="bg-gradient-to-br from-blue-600 to-indigo-800 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {city.name}
          </h1>
          <p className="text-lg md:text-xl text-blue-100 mb-6">
            {city.description}
          </p>

          <div className="flex flex-wrap gap-6">
            {city.phone && (
              <div className="flex items-center text-white bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm">
                <PhoneIcon className="h-5 w-5 mr-2" />
                <span>{city.phone}</span>
              </div>
            )}
            {city.email && (
              <div className="flex items-center text-white bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm">
                <EnvelopeIcon className="h-5 w-5 mr-2" />
                <span>{city.email}</span>
              </div>
            )}
            {city.address && (
              <div className="flex items-center text-white bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm">
                <MapPinIcon className="h-5 w-5 mr-2" />
                <span>{city.address}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CityHero;
