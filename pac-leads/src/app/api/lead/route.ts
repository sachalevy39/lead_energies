import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const { 
      typeLogement, 
      surface, 
      chauffage, 
      revenus, 
      email, 
      prenom, 
      telephone 
    } = body;

    // Validation
    if (!email || !prenom || !typeLogement || !surface || !chauffage || !revenus) {
      return NextResponse.json(
        { error: "Champs requis manquants" },
        { status: 400 }
      );
    }

    // TODO: Save to database (NeonDB)
    // TODO: Trigger PDF generation
    // TODO: Send email with Resend

    // Calcul estimatif des aides (logique simplifiée)
    const montantAides = calculerAides(revenus, typeLogement, chauffage);

    // Log lead for now (replace with DB insert)
    console.log("New lead:", {
      email,
      prenom,
      telephone,
      typeLogement,
      surface,
      chauffage,
      revenus,
      montantAides,
      date: new Date().toISOString(),
    });

    return NextResponse.json({ 
      success: true, 
      montantAides,
      message: "Lead enregistré" 
    });

  } catch (error) {
    console.error("Error saving lead:", error);
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}

function calculerAides(
  revenus: string, 
  typeLogement: string, 
  chauffage: string
): number {
  // Logique simplifiée des aides
  let montant = 0;

  // MaPrimeRénov'
  switch (revenus) {
    case "modeste":
      montant += typeLogement === "maison" ? 7000 : 4000;
      break;
    case "moyen":
      montant += typeLogement === "maison" ? 5500 : 3500;
      break;
    case "intermediaire":
      montant += typeLogement === "maison" ? 4000 : 2500;
      break;
    default:
      montant += 2500;
  }

  // CEE (simplifié)
  if (chauffage === "fioul" || chauffage === "gaz") {
    montant += typeLogement === "maison" ? 2000 : 1200;
  } else {
    montant += typeLogement === "maison" ? 1500 : 800;
  }

  return montant;
}
