import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <main className="max-w-4xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
            Calculez vos aides pour installer une
            <span className="text-emerald-600"> pompe à chaleur</span>
          </h1>
          <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
            Logement classé E, F ou G ? Découvrez en 2 minutes combien vous pouvez économiser avec MaPrimeRénov&apos;, les CEE et la TVA réduite.
          </p>
          
          <Link
            href="/calculateur"
            className="inline-flex items-center px-8 py-4 bg-emerald-600 text-white text-lg font-semibold rounded-full hover:bg-emerald-700 transition-colors shadow-lg hover:shadow-xl"
          >
            Calculer mes aides gratuitement
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
          
          <p className="mt-4 text-sm text-slate-500">
            ✓ Sans engagement ✓ Résultats immédiats ✓ 100% gratuit
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-2xl p-6 shadow-sm text-center">
            <div className="text-3xl font-bold text-emerald-600 mb-2">10 000€+</div>
            <div className="text-slate-600">d&apos;aides cumulables</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm text-center">
            <div className="text-3xl font-bold text-emerald-600 mb-2">-60%</div>
            <div className="text-slate-600">de réduction sur votre facture</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm text-center">
            <div className="text-3xl font-bold text-emerald-600 mb-2">3 ans</div>
            <div className="text-slate-600">retour sur investissement</div>
          </div>
        </div>

        {/* Comment ça marche */}
        <div className="bg-white rounded-2xl p-8 shadow-sm mb-16">
          <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">
            Comment ça marche ?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">1</div>
              <h3 className="font-semibold text-slate-900 mb-2">Répondez au questionnaire</h3>
              <p className="text-slate-600 text-sm">Surface, chauffage actuel, revenus du foyer...</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">2</div>
              <h3 className="font-semibold text-slate-900 mb-2">Recevez votre estimation</h3>
              <p className="text-slate-600 text-sm">Montant des aides, reste à payer, économies annuelles</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">3</div>
              <h3 className="font-semibold text-slate-900 mb-2">On vous accompagne</h3>
              <p className="text-slate-600 text-sm">Mise en relation avec des installateurs certifiés</p>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="bg-white rounded-2xl p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">
            Questions fréquentes
          </h2>
          <div className="space-y-6">
            <details className="group">
              <summary className="flex justify-between items-center cursor-pointer font-semibold text-slate-900">
                Quelles sont les aides disponibles ?
                <span className="transition group-open:rotate-180">
                  <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                </span>
              </summary>
              <p className="text-slate-600 mt-2">
                MaPrimeRénov&apos; (jusqu&apos;apos;à 7 000€), les Certificats d&apos;apos;Économie d&apos;apos;Énergie (CEE, jusqu&apos;apos;à 2 500€), et la TVA réduite à 5,5% sur les travaux.
              </p>
            </details>
            <details className="group">
              <summary className="flex justify-between items-center cursor-pointer font-semibold text-slate-900">
                Qui peut en bénéficier ?
                <span className="transition group-open:rotate-180">
                  <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                </span>
              </summary>
              <p className="text-slate-600 mt-2">
                Les propriétaires de logements classés E, F ou G en DPE qui remplacent un chauffage gaz, fioul ou électrique par une pompe à chaleur.
              </p>
            </details>
            <details className="group">
              <summary className="flex justify-between items-center cursor-pointer font-semibold text-slate-900">
                Combien de temps dure la simulation ?
                <span className="transition group-open:rotate-180">
                  <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                </span>
              </summary>
              <p className="text-slate-600 mt-2">
                Environ 2 minutes. Vous recevez immédiatement une estimation personnalisée.
              </p>
            </details>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-8">
        <div className="max-w-4xl mx-auto px-6 text-center text-sm">
          <p>© 2024 Calculateur Aides PAC. Information non contractuelle.</p>
        </div>
      </footer>
    </div>
  );
}
