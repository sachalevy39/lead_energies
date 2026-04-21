'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MoonIcon, SunIcon, FireIcon } from '@heroicons/react/24/solid';

interface CityStatsProps {
  city: {
    name: string;
    dju?: number;
    averageTemp?: {
      summer?: number;
      winter?: number;
    };
    climateZone?: string;
  };
}

export function CityStats({ city }: CityStatsProps) {
  const stats = [
    {
      icon: <SunIcon className="h-6 w-6 text-orange-500" />,
      label: 'DJU',
      value: city.dju || 'N/A',
      description: 'Degrés-jours unité',
      subValue: city.dju && city.dju > 1000 ? 'Élevé' : city.dju && city.dju > 800 ? 'Moyen' : 'Faible',
    },
    {
      icon: <SunIcon className="h-6 w-6 text-blue-500" />,
      label: 'Été',
      value: `${city.averageTemp?.summer || 'N/A'}°C`,
      description: 'Température moyenne',
      subValue: city.averageTemp?.summer && city.averageTemp.summer > 25 ? 'Chaud' : city.averageTemp?.summer && city.averageTemp.summer > 20 ? 'Modéré' : 'Frais',
    },
    {
      icon: <MoonIcon className="h-6 w-6 text-indigo-500" />,
      label: 'Hiver',
      value: `${city.averageTemp?.winter || 'N/A'}°C`,
      description: 'Température moyenne',
      subValue: city.averageTemp?.winter && city.averageTemp.winter > 10 ? 'Doux' : city.averageTemp?.winter && city.averageTemp.winter > 5 ? 'Normal' : 'Froid',
    },
    {
      icon: <FireIcon className="h-6 w-6 text-green-500" />,
      label: 'Zone climatique',
      value: city.climateZone || 'N/A',
      description: 'Classification française',
      subValue: '',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card key={index} className="bg-white border-gray-200 hover:border-blue-200 transition-colors">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-gray-700">
              {stat.icon}
              <span>{stat.label}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
            <div className="text-sm text-gray-500 mb-1">{stat.description}</div>
            {stat.subValue && (
              <div className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-600">
                {stat.subValue}
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default CityStats;
