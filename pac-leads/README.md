# PAC Leads Generator

## Objectif
Générer des leads qualifiés (propriétaires logements E/F/G) et les revendre à 35€ aux installateurs PAC.

## Architecture

### Tech Stack
- **Frontend:** Next.js 14 (App Router) + Tailwind + shadcn/ui
- **Backend:** Next.js API Routes + Vercel (hobby tier = gratuit)
- **Database:** PostgreSQL (NeonDB = gratuit à faible volume)
- **IA:** Claude API (Haiku = ~0.25€/1000 requêtes)
- **PDF:** Puppeteer ou react-pdf pour les guides
- **Email:** Resend (gratuit à 3000 emails/mois)

### Flow Lead
```
Landing page SEO
     ↓
Quiz calculateur d'aides (chatbot IA)
     ↓
Email requis pour voir les résultats
     ↓
PDF personnalisé (estimation aides, économies)
     ↓
Relance email automatique
     ↓
Lead qualifié (chauffage actuel, surface, revenus)
```

### Structure
```
app/
├── page.tsx              # Landing SEO + CTA
├── calculateur/
│   └── page.tsx          # Quiz interactif
├── api/
│   ├── chat/
│   │   └── route.ts      # Endpoint Claude
│   ├── lead/
│   │   └── route.ts      # Sauvegarde lead
│   └── pdf/
│       └── route.ts      # Génération PDF
└── guides/
    └── [slug]/
        └── page.tsx       # Pages guides SEO
```

### Contenus SEO cibles
- "Pompe à chaleur DPE F : quelles aides ?"
- "Remplacer fioul par PAC : combien ça coûte ?"
- "MaPrimeRénov' 2024 : simulation"

### KPIs
- Coût acquisition lead: < 10€ (organic) ou < 20€ (paid)
- Taux conversion visiteur → lead: > 5%
- Prix vente lead: 35€
- Marge: 15-25€/lead

## Prochaines étapes
1. [ ] Setup Next.js + déploiement Vercel
2. [ ] Landing page + calculateur
3. [ ] Intégration Claude API
4. [ ] Génération PDF personnalisé
5. [ ] Scripts import installateurs (B2B)
