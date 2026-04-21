'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { SelectWrapper } from '@/components/ui/select';
import { Form, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { EnvelopeIcon, PhoneIcon, MapPinIcon, SparklesIcon } from '@heroicons/react/24/solid';

interface LeadFormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  service: string;
  message?: string;
}

const formSchema = z.object({
  firstName: z.string().min(2, 'Le prénom doit contenir au moins 2 caractères').max(50, 'Le prénom ne peut pas dépasser 50 caractères'),
  lastName: z.string().min(2, 'Le nom doit contenir au moins 2 caractères').max(50, 'Le nom ne peut pas dépasser 50 caractères'),
  email: z.string().email('Format d\'email invalide'),
  phone: z.string().min(10, 'Le numéro de téléphone doit contenir au moins 10 chiffres').max(15, 'Le numéro de téléphone ne peut pas dépasser 15 chiffres'),
  city: z.string().min(2, 'Veuillez sélectionner une ville'),
  service: z.string().min(2, 'Veuillez sélectionner un service'),
  message: z.string().max(500, 'Le message ne peut pas dépasser 500 caractères').optional(),
});

interface CityFormProps {
  city?: {
    name: string;
    slug: string;
    department: string;
    region: string;
    services?: string[];
  };
  leadForm?: {
    title: string;
    subtitle: string;
    cta: string;
  };
  onSubmit?: (values: LeadFormValues) => void;
}

export function CityForm({ city, leadForm, onSubmit }: CityFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const form = useForm<LeadFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      city: city?.name || '',
      service: city?.services?.[0] || '',
      message: '',
    },
  });

  const handleCitySelect = (value: string) => {
    form.setValue('city', value);
  };

  const handleServiceSelect = (value: string) => {
    form.setValue('service', value);
  };

  const handleSubmit = async (values: LeadFormValues) => {
    setIsSubmitting(true);
    
    try {
      if (onSubmit) {
        await onSubmit(values);
      } else {
        // Simuler l'envoi
        await new Promise((resolve) => setTimeout(resolve, 1500));
      }
      setSubmitStatus('success');
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const services = city?.services || ['panneaux-solaires', 'thermopompe', 'isolation', 'chaudière-énergie'];
  const cityOptions = ['Paris', 'Lyon', 'Marseille', 'Lille', 'Toulouse', 'Nice', 'Nantes', 'Montpellier', 'Bordeaux', 'Strasbourg', 'Rennes', 'Reims', 'Saint-Étienne', 'Le Mans', 'Tours', 'Amiens', 'Metz', 'Besançon', 'Valenciennes'];

  if (submitStatus === 'success') {
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 mb-4">
          <SparklesIcon className="h-8 w-8 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Demande envoyée !</h3>
        <p className="text-gray-600 mb-6">
          Merci {form.getValues('firstName')}. Nous vous contacterons très prochainement pour vous aider à concrétiser votre projet énergétique à {city?.name}.
        </p>
        <Button 
          onClick={() => {
            setSubmitStatus('idle');
            form.reset();
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          Nouvelle demande
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-8 text-white">
        <h2 className="text-2xl md:text-3xl font-bold mb-2">{leadForm?.title || `Devis gratuit à ${city?.name}`}</h2>
        <p className="text-blue-100 text-lg">{leadForm?.subtitle || `Profitez de l'ensoleillement local pour votre projet d'énergie renouvelable.`}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <span className="inline-flex items-center gap-1 bg-white/20 px-3 py-1.5 rounded-full text-sm">
            <MapPinIcon className="h-4 w-4" />
            {city?.name}, {city?.department}
          </span>
          <span className="inline-flex items-center gap-1 bg-white/20 px-3 py-1.5 rounded-full text-sm">
            <PhoneIcon className="h-4 w-4" />
            {city?.region}
          </span>
        </div>
      </div>
      
      <div className="p-6 md:p-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-medium">Prénom</FormLabel>
                    <Input {...field} className="bg-gray-50 border-gray-200 focus:border-blue-500 focus:ring-blue-500" />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-medium">Nom</FormLabel>
                    <Input {...field} className="bg-gray-50 border-gray-200 focus:border-blue-500 focus:ring-blue-500" />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-medium">Email</FormLabel>
                    <Input 
                      type="email" 
                      {...field} 
                      className="bg-gray-50 border-gray-200 focus:border-blue-500 focus:ring-blue-500" 
                      placeholder="votre@email.com"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-medium">Téléphone</FormLabel>
                    <Input 
                      type="tel" 
                      {...field} 
                      className="bg-gray-50 border-gray-200 focus:border-blue-500 focus:ring-blue-500" 
                      placeholder="06 12 34 56 78"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-medium">Ville</FormLabel>
                    <SelectWrapper 
                      value={field.value} 
                      onValueChange={handleCitySelect}
                      options={cityOptions.map(city => ({ value: city, label: city }))}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="service"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-medium">Service souhaité</FormLabel>
                    <SelectWrapper 
                      value={field.value} 
                      onValueChange={handleServiceSelect}
                      options={services.map(service => ({ 
                        value: service, 
                        label: service.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()) 
                      }))}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 font-medium">Message (optionnel)</FormLabel>
                  <Textarea 
                    {...field} 
                    className="bg-gray-50 border-gray-200 focus:border-blue-500 focus:ring-blue-500 min-h-[100px]" 
                    placeholder="Dites-n-en plus sur votre projet..."
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center gap-2 text-sm text-gray-500">
              <EnvelopeIcon className="h-4 w-4" />
              <span>Votre demande est protégée et confidentielle</span>
            </div>

            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 text-lg transition-all"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Envoi en cours...
                </span>
              ) : (
                leadForm?.cta || 'Obtenir un devis gratuit'
              )}
            </Button>

            {submitStatus === 'error' && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                Une erreur est survenue. Veuillez réessayer plus tard.
              </div>
            )}
          </form>
        </Form>
      </div>
    </div>
  );
}

export default CityForm;
