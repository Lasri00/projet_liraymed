/**
 * Illustration de catégorie, en attendant les photos produits.
 *
 * Ce sont des pictogrammes, pas des photographies : ils occupent la place du
 * visuel sans faire passer un dessin pour un produit réel. Dès que Liray Med
 * fournit les photos du catalogue papier (numérotées, cf. NUMEROS_PHOTO dans
 * catalogue-data.ts), elles les remplacent produit par produit.
 */
const TRACES: Record<string, React.ReactNode> = {
  cervical: (
    <>
      <path d="M5 9c4-2.5 10-2.5 14 0" />
      <path d="M5 15c4 2.5 10 2.5 14 0" />
      <path d="M5 9v6M19 9v6" />
    </>
  ),
  "epaule-bras": (
    <>
      <circle cx="8" cy="6.5" r="2.5" />
      <path d="M4.5 20v-4.5A4.5 4.5 0 0 1 9 11h2.5l5.5 5.5" />
      <path d="M19 11 12 20" />
    </>
  ),
  coude: (
    <>
      <path d="M6 4v8a4.5 4.5 0 0 0 4.5 4.5H19" />
      <path d="M6 12h4.5" />
      <circle cx="6" cy="12" r="2.5" />
    </>
  ),
  "poignet-main": (
    <>
      <path d="M9.5 11V5.5a1.5 1.5 0 0 1 3 0V10" />
      <path d="M12.5 10V4.5a1.5 1.5 0 0 1 3 0V10" />
      <path d="M15.5 10.5V8a1.5 1.5 0 0 1 3 0v6.5A6.5 6.5 0 0 1 12 21a6.5 6.5 0 0 1-6.5-6.5v-2a1.5 1.5 0 0 1 3 0" />
    </>
  ),
  "dos-abdomen": (
    <>
      <path d="M8.5 3h7l-1 6v6l1 6h-7l1-6V9z" />
      <rect x="6.5" y="9" width="11" height="5.5" rx="1.5" />
      <path d="M12 9v5.5" />
    </>
  ),
  "genou-cuisse": (
    <>
      <path d="M9.5 3v6M14.5 3v6" />
      <path d="M9.5 15v6M14.5 15v6" />
      <ellipse cx="12" cy="12" rx="5.5" ry="4" />
      <circle cx="12" cy="12" r="1.5" />
    </>
  ),
  "cheville-pied": (
    <>
      <path d="M10 3v8.5c0 2.5-4 3-4 6.5h11a4 4 0 0 0 0-8h-3V3z" />
      <path d="M10 11.5h4" />
    </>
  ),
  contention: (
    <>
      <path d="M9 3h6v9.5c0 3 2.5 3.5 2.5 6.5H7.5c0-3 1.5-3.5 1.5-6.5z" />
      <path d="M9 8h6M9.2 12h5.8" />
    </>
  ),
  coussins: (
    <>
      <rect x="3" y="6.5" width="18" height="11" rx="4.5" />
      <path d="M7.5 6.5v11M16.5 6.5v11" />
    </>
  ),
};

const DEFAUT = (
  <>
    <rect x="3" y="4" width="18" height="16" rx="2" />
    <circle cx="9" cy="10" r="2" />
    <path d="m21 16-5-5-8 9" />
  </>
);

export function CategoryIllustration({
  categorie,
  className = "size-9",
}: {
  categorie: string;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`${className} text-brand/45`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {TRACES[categorie] ?? DEFAUT}
    </svg>
  );
}

/** Le slug de catégorie tel qu'il est encodé dans les identifiants. */
export function slugDeCategorie(categorieId: string): string {
  return categorieId.replace(/^cat-/, "");
}
