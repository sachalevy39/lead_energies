import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { loadCities, getCityStats } from '@/lib/cities';
import { CityHero } from '@/components/city/CityHero';
import { CityStats } from '@/components/city/CityStats';
import { CityForm } from '@/components/city/CityForm';
import { CityFAQ } from '@/components/city/CityFAQ';
import { CityTestimonials } from '@/components/city/CityTestimonials';
import { JSONLD } from '@/components/seo/JSONLD';

interface CityPageProps {
  params: {
    slug: string;
  };
}

// Helper functions pour générer le contenu localement
const getRegionClimat = (region: string): string => {
  const climats: Record<string, string> = {
    'Île-de-France': 'modéré',
    'Auvergne-Rhône-Alpes': 'continental',
    'Provence-Alpes-Côte d\'Azur': 'méditerranéen',
    'Hauts-de-France': 'océanique',
    'Occitanie': 'méditerranéen',
    'Pays de la Loire': 'océanique',
    'Nouvelle-Aquitaine': 'océanique',
    'Grand Est': 'continental',
    'Bretagne': 'océanique',
    'Bourgogne-Franche-Comté': 'continental',
    'Centre-Val de Loire': 'océanique',
  };
  return climats[region] || 'tempéré';
};

const getAvgSunHours = (region: string): string => {
  const sunHours: Record<string, number> = {
    'Provence-Alpes-Côte d\'Azur': 2800,
    'Occitanie': 2600,
    'Nouvelle-Aquitaine': 2200,
    'Île-de-France': 1900,
    'Pays de la Loire': 2000,
    'Bretagne': 1800,
    'Hauts-de-France': 1700,
    'Auvergne-Rhône-Alpes': 2100,
    'Grand Est': 1800,
    'Bourgogne-Franche-Comté': 1900,
    'Centre-Val de Loire': 2000,
  };
  return `${sunHours[region] || 2000}h/an`;
};

// Generate metadata for city pages
export async function generateMetadata({ params }: CityPageProps): Promise<Metadata> {
  const cities = loadCities();
  const city = cities.find((c) => c.slug === params.slug);

  if (!city) {
    return {
      title: 'Ville introuvable - Leadpac',
      description: 'La ville que vous cherchez n\'a pas été trouvée.',
    };
  }

  return {
    title: `${city.name} - Énergies Renouvelables avec Leadpac`,
    description: `Obtenez des devis pour panneaux solaires, thermopompes et isolation à ${city.name} (${city.department}). Profitez des subventions locales et de l'expertise Leadpac.`,
    keywords: [
      `énergies renouvelables ${city.name}`,
      `panneaux solaires ${city.department}`,
      `thermopompe ${city.region}`,
      `isolation ${city.name}`,
      `subventions énergie ${city.department}`,
    ],
    openGraph: {
      title: `Leadpac - ${city.name}`,
      description: `Spécialistes des énergies renouvelables à ${city.name}.`,
      type: 'website',
      locale: 'fr_FR',
      url: `https://leadpac.fr/ville/${city.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: `Leadpac - ${city.name}`,
      description: `Spécialistes des énergies renouvelables à ${city.name}.`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

// Generate static paths for all cities
export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const cities = loadCities();
  return cities.map((city) => ({
    slug: city.slug,
  }));
}

// Generate content locally without OpenAI
const generateCityContent = (city: any) => ({
  intro: `${city.name} se situe dans la région ${city.region} où les conditions climatiques favorisent le développement des énergies renouvelables. Avec une température moyenne de ${city.averageTemp.summer.toFixed(1)}°C en été et ${city.averageTemp.winter.toFixed(1)}°C en hiver, la ville offre un excellent potentiel pour l'installation de panneaux solaires, pompes à chaleur et solutions d'isolation.

Le département ${city.department} et la région ${city.region} offrent plusieurs aides financières pour vos travaux de rénovation énergétique. Les ménages peuvent bénéficier de MaPrimeRénov', de la prime énergie, de l'éco-prêt à taux zéro et d'une TVA réduite à 5,5%. Le montant des aides dépend de vos revenus et du type de travaux réalisés.

À ${city.name}, avec un ensoleillement de ${getAvgSunHours(city.region)}, les panneaux solaires photovoltaïques permettent une autoconsommation optimale. Le tarif de rach

at EDF OA est garanti 20 ans (4 c€/kWh pour ≤9 kWc). Pour les pompes à chaleur air-eau, les aides peuvent atteindre jusqu'à 10 800€ cumulées (MaPrimeRénov' + prime énergie).`,

  faqs: [
    {
      question: `Quelles sont les aides disponibles pour l'installation de panneaux solaires à ${city.name} ?`,
      answer: `À ${city.name}, vous pouvez bénéficier de la prime à l'autoconsommation (jusqu'à 140€/kWc pour les installations de 9 à 36 kWc), de la TVA réduite à 5,5%, et du tarif de raccordement au réseau électrique. Le gouvernement a mis en place un cadre réglementaire favorable pour les particuliers souhaitant investir dans le solaire photovoltaïque.`
    },
    {
      question: `Quel est le coût moyen d'une pompe à chaleur air-eau à ${city.name} ?`,
      answer: `À ${city.name}, le coût moyen d'une pompe à chaleur air-eau varie entre 90 et 130 €/m² selon la puissance et la surface à chauffer. Les aides actuelles permettent de réduire considérablement le reste à charge : MaPrimeRénov' peut financer jusqu'à 5 000€ pour les ménages très modestes, et la prime énergie jusqu'à 6 880€.`
    },
    {
      question: `L'isolation thermique est-elle éligible à MaPrimeRénov' à ${city.name} ?`,
      answer: `Oui, les travaux d'isolation thermique (toiture, murs, sols, fenêtres) sont éligibles à MaPrimeRénov' à ${city.name}. Les montants varient de 15 à 40 €/équipement selon le type d'isolation. L'isolation des combles perdus peut atteindre 15 €/m², et le remplacement des fenêtres anciennes par du double vitrage peut bénéficier d'une aide de 40 €/équipement.`
    },
    {
      question: `Quelle est la température moyenne à ${city.name} et comment cela affecte-t-il mes choix d'équipement ?`,
      answer: `À ${city.name}, la température moyenne est de ${city.averageTemp.summer.toFixed(1)}°C en été et ${city.averageTemp.winter.toFixed(1)}°C en hiver, avec ${city.dju} DJU (Degrés Jours Unifiés). Cela indique un besoin de chauffage modéré, rendant les pompes à chaleur particulièrement efficaces. Le climat ${getRegionClimat(city.region)} de la région ${city.region} est idéal pour ce type d'équipement.`
    }
  ],

  installation: `Pour installer vos équipements énergétiques à ${city.name}, voici les étapes :

1. Diagnostic gratuit : Notre expert se déplace à ${city.name} pour évaluer vos besoins et votre potentiel énergétique.

2. Devis personnalisé : Vous recevez un devis détaillé avec tous les travaux, les matériaux, et les aides auxquelles vous avez droit.

3. Démarrage des travaux : Une fois le devis signé, nos artisans RGE commencent les travaux à ${city.name} dans les 15 jours.

4. Suivi et mise en service : Nous assurons le suivi de vos travaux et la mise en service de votre installation à ${city.name}.`
});

// Main city page component
export default async function CityPage({ params }: CityPageProps) {
  const cities = loadCities();
  const city = cities.find((c) => c.slug === params.slug);

  if (!city) {
    notFound();
  }

  // Generate content locally
  const content = generateCityContent(city);

  // Get city stats
  const cityStats = getCityStats(city);

  return (
    <div className="min-h-screen bg-gray-50">
      <JSONLD data={{
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        name: `Leadpac - ${city.name}`,
        address: {
          '@type': 'PostalAddress',
          addressLocality: city.name,
          addressRegion: city.region,
          postalCode: city.department,
        },
        url: `https://leadpac.fr/ville/${city.slug}`,
        priceRange: '€€',
      }} />

      {/* Hero Section */}
      <CityHero city={city} />

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Les chiffres clés de {city.name}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Des statistiques locales pour optimiser vos projets d'énergies renouvelables
            </p>
          </div>
          <CityStats city={city} />
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              {/* Introduction */}
              <div className="prose prose-lg max-w-none mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Pourquoi choisir les énergies renouvelables à {city.name} ?
                </h2>
                <div className="prose prose-blue text-gray-600 whitespace-pre-line">
                  {content.intro}
                </div>
              </div>

              {/* FAQ */}
              <CityFAQ city={city} faqs={content.faqs} />
            </div>

            {/* Form Side */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <CityForm city={city} leadForm={city.leadForm} />
                
                {/* Testimonials */}
                <CityTestimonials city={city} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Installation Guide */}
      <section className="py-12 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Comment se déroule l'installation à {city.name} ?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Un guide étape par étape pour concrétiser votre projet
            </p>
          </div>
          <div className="prose prose-lg max-w-3xl mx-auto whitespace-pre-line">
            {content.installation}
          </div>
        </div>
      </section>
    </div>
  );
}