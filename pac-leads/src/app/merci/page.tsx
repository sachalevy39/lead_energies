"use client";

import Link from "next/link";

export default function Merci() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-6">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
        
        <h1 className="text-3xl font-bold text-slate-900 mb-4">
          Merci !
        </h1>
        
        <p className="text-lg text-slate-600 mb-6">
          Votre estimation personnalisée vous sera envoyée par email dans les prochaines minutes.
        </p>
        
        <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
          <p className="text-sm text-slate-500 mb-2">
            Prochaines étapes :
          </p>
          <ul className="text-left text-slate-700 space-y-2">
            <li className="flex items-start">
              <span className="text-emerald-500 mr-2">✓</span>
              <span>Vérifier votre email (pensez aux spams)</span>
            </li>
            <li className="flex items-start">
              <span className="text-emerald-500 mr-2">✓</span>
              <span>Consulter votre rapport personnalisé</span>
            </li>
            <li className="flex items-start">
              <span className="text-emerald-500 mr-2">✓</span>
              <span>Nous vous contacterons pour un RDV avec un installateur</span>
            </li>
          </ul>
        </div>
        
        <Link
          href="/"
          className="text-emerald-600 font-medium hover:text-emerald-700"
        >
          ← Retour à l'accueil
        </Link>
      </div>
    </div>
  );
}
