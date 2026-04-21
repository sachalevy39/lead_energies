"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Calculateur() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    typeLogement: "",
    surface: "",
    chauffage: "",
    revenus: "",
    email: "",
    prenom: "",
    telephone: "",
  });

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (step < 5) setStep(step + 1);
    else handleSubmit();
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async () => {
    // TODO: API call to save lead
    router.push("/merci");
  };

  const steps = [
    {
      title: "Votre logement",
      question: "Vous habitez dans une maison ou un appartement ?",
      field: "typeLogement",
      options: [
        { value: "maison", label: "Maison" },
        { value: "appartement", label: "Appartement" },
      ],
    },
    {
      title: "La surface",
      question: "Quelle est la surface habitable approximative ?",
      field: "surface",
      options: [
        { value: "-60", label: "Moins de 60 m²" },
        { value: "60-80", label: "60 à 80 m²" },
        { value: "80-120", label: "80 à 120 m²" },
        { value: "120-150", label: "120 à 150 m²" },
        { value: "150+", label: "Plus de 150 m²" },
      ],
    },
    {
      title: "Le chauffage",
      question: "Quel est votre chauffage actuel ?",
      field: "chauffage",
      options: [
        { value: "gaz", label: "Gaz naturel" },
        { value: "fioul", label: "Fioul" },
        { value: "electrique", label: "Électricité (radiateurs)" },
        { value: "bois", label: "Bois / Granulés" },
        { value: "autre", label: "Autre" },
      ],
    },
    {
      title: "Vos revenus",
      question: "Quelle est votre tranche de revenus fiscaux de référence ?",
      field: "revenus",
      options: [
        { value: "modeste", label: "Très modestes (jusqu'à 15 000 €)" },
        { value: "moyen", label: "Modestes (15 000 à 25 000 €)" },
        { value: "intermediaire", label: "Intermédiaires (25 000 à 40 000 €)" },
        { value: "eleve", label: "Élevés (plus de 40 000 €)" },
      ],
    },
    {
      title: "Vos coordonnées",
      question: "Pour recevoir votre estimation personnalisée",
      field: "contact",
      isContact: true,
    },
  ];

  const currentStep = steps[step - 1];
  const isStepValid = currentStep?.isContact
    ? formData.email && formData.prenom
    : formData[currentStep.field as keyof typeof formData] !== "";

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-medium text-slate-600">
              Étape {step} sur {steps.length}
            </span>
            <span className="text-sm font-medium text-emerald-600">
              {Math.round((step / steps.length) * 100)}%
            </span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2">
            <div
              className="bg-emerald-600 h-2 rounded-full transition-all"
              style={{ width: `${(step / steps.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {step <= steps.length ? (
            <>
              <h1 className="text-2xl font-bold text-slate-900 mb-2">
                {currentStep.title}
              </h1>
              <p className="text-slate-600 mb-8">{currentStep.question}</p>

              {currentStep.isContact ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Prénom
                    </label>
                    <input
                      type="text"
                      value={formData.prenom}
                      onChange={(e) => updateField("prenom", e.target.value)}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="Jean"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => updateField("email", e.target.value)}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="jean@exemple.fr"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Téléphone (optionnel)
                    </label>
                    <input
                      type="tel"
                      value={formData.telephone}
                      onChange={(e) => updateField("telephone", e.target.value)}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="06 12 34 56 78"
                    />
                  </div>
                </div>
              ) : (
                <div className="grid gap-3">
                  {currentStep.options?.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => updateField(currentStep.field, option.value)}
                      className={`p-4 text-left border-2 rounded-lg transition-all ${
                        formData[currentStep.field as keyof typeof formData] === option.value
                          ? "border-emerald-600 bg-emerald-50"
                          : "border-slate-200 hover:border-emerald-300"
                      }`}
                    >
                      <span className="font-medium text-slate-900">{option.label}</span>
                    </button>
                  ))}
                </div>
              )}

              {/* Buttons */}
              <div className="flex justify-between mt-8">
                <button
                  onClick={handleBack}
                  disabled={step === 1}
                  className="px-6 py-3 text-slate-600 font-medium disabled:opacity-30 hover:text-slate-900"
                >
                  ← Retour
                </button>
                <button
                  onClick={handleNext}
                  disabled={!isStepValid}
                  className="px-8 py-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {step === steps.length ? "Voir mon estimation" : "Continuer"} →
                </button>
              </div>
            </>
          ) : null}
        </div>

        {/* Trust badges */}
        <div className="mt-8 text-center">
          <p className="text-sm text-slate-500">
            🔒 Vos données sont sécurisées et ne seront jamais revendues
          </p>
        </div>
      </div>
    </div>
  );
}
