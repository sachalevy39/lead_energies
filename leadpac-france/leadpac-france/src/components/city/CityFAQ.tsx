'use client';

import { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon, QuestionMarkCircleIcon, MapPinIcon } from '@heroicons/react/24/solid';
import { Accordion, AccordionItem, AccordionHeader, AccordionBody } from '@/components/ui/accordion';
import { getRegionCities, getNeighboringCities, getServiceLinks } from '@/lib/internal-links';

interface CityFAQProps {
  city?: {
    name: string;
    department: string;
    region: string;
    slug?: string;
  };
  faqs?: Array<{
    question: string;
    answer: string;
  }>;
}

export function CityFAQ({ city, faqs }: CityFAQProps) {
  const [activeItem, setActiveItem] = useState<string>('item-0');
  const [showInternalLinks, setShowInternalLinks] = useState(false);
  
  // Get internal links data - only if city has slug
  const neighboringCities = city?.slug ? getNeighboringCities(city.slug, getRegionCities(city.region || '', [])) : [];
  const serviceLinks = city?.slug ? getServiceLinks(city) : [];
  
  // Default FAQ content based on city if no explicit FAQ provided
  const defaultFAQs = [
    {
      question: `Quelles sont les subventions disponibles pour ${city?.name || 'une ville'} ?`,
      answer: `Pour ${city?.name || 'votre ville'}, vous pouvez bénéficier de plusieurs aides nationales comme MaPrimeRénov', de l'éco-prêt à taux zéro, et des aides locales de la région ou du département. Nous vous aidons à identifier toutes les aides auxquelles vous avez droit et à constituer le dossier complet.` 
    },
    {
      question: `Quel est le temps d'installation pour les équipements à ${city?.name || 'votre ville'} ?`,
      answer: `À ${city?.name}, la plupart des installations se déroulent en 1 à 3 jours selon la complexité du projet. Pour les panneaux solaires, l'installation prend généralement 1 jour pour une maison individuelle. Les thermopompes nécessitent 2 à 3 jours pour la pose complète.` 
    },
    {
      question: `Quel est le rendement énergétique à ${city?.name || 'votre ville'} ?`,
      answer: `Le rendement dépend de plusieurs facteurs : l'ensoleillement local, l'orientation de votre toit, l'isolation de votre maison, et le type d'équipement. À ${city?.name}, l'ensoleillement permet aux panneaux solaires d'atteindre un rendement de 15 à 22%.` 
    },
    {
      question: `Quelle maintenance pour les équipements à ${city?.name || 'votre ville'} ?`,
      answer: `Les équipements solaires nécessitent peu de maintenance : un nettoyage tous les 2 à 3 ans et une vérification annuelle. Pour les thermopompes, une maintenance annuelle est recommandée. Nous proposons des contrats de maintenance personnalisés pour assurer la longévité de vos équipements.` 
    },
    {
      question: `Quelle est la durée de vie des équipements à ${city?.name || 'votre ville'} ?`,
      answer: `Les panneaux solaires ont une durée de vie de 25 à 30 ans avec une garantie de 25 ans sur la production. Les inverseurs durent 10 à 15 ans. Les thermopompes ont une durée de vie de 15 à 20 ans. Le climat de ${city?.name} contribue à une longévité optimale de vos équipements.` 
    },
    {
      question: `Quels sont les dégâts environnementaux à ${city?.name || 'votre ville'} ?`,
      answer: `Chaque installation réduit significativement votre empreinte carbone. Un système solaire de 6 kWc évite environ 2 à 3 tonnes de CO2 par an. En remplaçant une chaudière fioul ou gaz par une thermopompe, vous réduisez vos émissions de chauffage de 70 à 90%.` 
    },
  ];

  const questions = faqs || defaultFAQs;

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-8 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-3 rounded-lg">
            <QuestionMarkCircleIcon className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Questions fréquentes</h2>
            <p className="text-gray-600">Tout ce qu'il faut savoir sur les énergies renouvelables à {city?.name}</p>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <Accordion type="single" value={activeItem} onValueChange={setActiveItem} className="space-y-4">
          {questions.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden transition-all hover:shadow-md"
            >
              <AccordionHeader>
                <button
                  className="flex items-center justify-between w-full p-4 text-left focus:outline-none"
                  onClick={() => setActiveItem(activeItem === `item-${index}` ? `item-0` : `item-${index}`)}
                >
                  <span className="font-medium text-gray-900">{faq.question}</span>
                  {activeItem === `item-${index}` ? (
                    <ChevronUpIcon className="h-5 w-5 text-blue-600" />
                  ) : (
                    <ChevronDownIcon className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </AccordionHeader>
              <AccordionBody>
                <div className="p-4 pt-0 text-gray-600 leading-relaxed">
                  {faq.answer}
                </div>
              </AccordionBody>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-8">
          <p className="text-gray-600 mb-4">Vous n'avez pas trouvé la réponse à votre question ?</p>
          <div className="inline-flex gap-3">
            <a 
              href={`mailto:contact@leadpac.fr?subject=Question%20sur%20${city?.name}`}
              className="px-6 py-3 bg-white border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors"
            >
              Nous contacter
            </a>
            <a 
              href="https://wa.me/33600000000"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
            >
              WhatsApp
            </a>
          </div>
        </div>
        
        {/* Internal links - only show if city data available */}
        {city && city.slug && (
          <div className="mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={() => setShowInternalLinks(!showInternalLinks)}
              className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-800 mb-4"
            >
              <MapPinIcon className="h-4 w-4" />
              {showInternalLinks ? 'Masquer les villes voisines' : 'Voir les villes voisines et services'}
            </button>
            
            {showInternalLinks && (
              <div className="space-y-4">
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
                
                <div className="bg-indigo-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Nos services à {city.name}:</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {serviceLinks.map((service) => (
                      <a
                        key={service.url}
                        href={service.url}
                        className="flex items-center gap-2 px-3 py-2 bg-white border border-indigo-200 text-indigo-700 text-sm rounded-lg hover:bg-indigo-100 transition-colors"
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

export default CityFAQ;
