'use client';

import { StarIcon } from '@heroicons/react/24/solid';

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

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:shadow-md transition-shadow">
      <div className="flex items-center gap-1 mb-3">
        {[...Array(testimonial.rating)].map((_, i) => (
          <StarIcon 
            key={i} 
            className="h-4 w-4 text-yellow-400 fill-current" 
          />
        ))}
      </div>
      
      <p className="text-gray-700 mb-4 italic">"{testimonial.content}"</p>
      
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-semibold text-sm">
            {testimonial.first_name[0]}{testimonial.last_name[0]}
          </div>
        </div>
        <div>
          <p className="font-semibold text-gray-900">{testimonial.name}</p>
          <p className="text-xs text-gray-500">{testimonial.profession}</p>
          <p className="text-xs text-gray-400 mt-1">à {testimonial.city} • {testimonial.service.replace('-', ' ')}</p>
        </div>
      </div>
    </div>
  );
}

export default TestimonialCard;
