// Catalogue Liray Med — construit à partir des documents fournis par le client :
//   · CATALOGUE TABLEAU.xlsx            → références, désignations, orthopédie
//   · CATALOGUE 2024.docx               → descriptions et indications
//   · AIDE A LA MARCHE PODOLOGIE.xlsx   → désignations et numéros de photo
//   · public/produits/                  → 55 photos, rattachées produit par produit
//
// FICHIER GÉNÉRÉ. Il tient lieu de source de données tant que PostgreSQL n'est
// pas branché. Les formes sont déjà celles des vues v_categories_public et
// v_produits_public (invariant CLAUDE.md #1) : la bascule vers la base ne
// touchera que src/backend/queries/catalogue.ts.
//
// Invariant #2 : ni prix ni quantité de stock ne figurent ici.
// Invariant #3 : seul le français est renseigné. Les traductions arabe et
// anglaise sont à la charge du client (cahier des charges, section 3.1) ;
// d'ici là, trad() affiche le français.
//
// Visibilité par profil : le professionnel voit tout le catalogue, le
// particulier ne voit que les catégories marquées visibleParticulier. Les
// catégories réservées aux professionnels sont l'habillement de travail et les
// dispositifs médicaux — à valider par Liray Med.

import type { CategoriePublique, ProduitPublic } from "@/shared/catalogue-types";

export const CATEGORIES: readonly CategoriePublique[] = [
  {
    id: "cat-cervical",
    parentId: null,
    slug: "cervical",
    nom: { fr: "Colliers cervicaux", ar: null, en: null },
    imageUrl: null,
    visibleParticulier: true,
    visibleProfessionnel: true,
    ordre: 1,
    nombreProduits: 7,
  },
  {
    id: "cat-epaule-bras",
    parentId: null,
    slug: "epaule-bras",
    nom: { fr: "Épaule et bras", ar: null, en: null },
    imageUrl: null,
    visibleParticulier: true,
    visibleProfessionnel: true,
    ordre: 2,
    nombreProduits: 7,
  },
  {
    id: "cat-coude",
    parentId: null,
    slug: "coude",
    nom: { fr: "Coude", ar: null, en: null },
    imageUrl: null,
    visibleParticulier: true,
    visibleProfessionnel: true,
    ordre: 3,
    nombreProduits: 2,
  },
  {
    id: "cat-poignet-main",
    parentId: null,
    slug: "poignet-main",
    nom: { fr: "Poignet, main et doigts", ar: null, en: null },
    imageUrl: null,
    visibleParticulier: true,
    visibleProfessionnel: true,
    ordre: 4,
    nombreProduits: 14,
  },
  {
    id: "cat-dos-abdomen",
    parentId: null,
    slug: "dos-abdomen",
    nom: { fr: "Dos, abdomen et hernie", ar: null, en: null },
    imageUrl: null,
    visibleParticulier: true,
    visibleProfessionnel: true,
    ordre: 5,
    nombreProduits: 13,
  },
  {
    id: "cat-genou-cuisse",
    parentId: null,
    slug: "genou-cuisse",
    nom: { fr: "Genou et cuisse", ar: null, en: null },
    imageUrl: null,
    visibleParticulier: true,
    visibleProfessionnel: true,
    ordre: 6,
    nombreProduits: 11,
  },
  {
    id: "cat-cheville-pied",
    parentId: null,
    slug: "cheville-pied",
    nom: { fr: "Cheville et pied", ar: null, en: null },
    imageUrl: null,
    visibleParticulier: true,
    visibleProfessionnel: true,
    ordre: 7,
    nombreProduits: 8,
  },
  {
    id: "cat-contention",
    parentId: null,
    slug: "contention",
    nom: { fr: "Contention veineuse", ar: null, en: null },
    imageUrl: null,
    visibleParticulier: true,
    visibleProfessionnel: true,
    ordre: 8,
    nombreProduits: 3,
  },
  {
    id: "cat-coussins",
    parentId: null,
    slug: "coussins",
    nom: { fr: "Coussins et positionnement", ar: null, en: null },
    imageUrl: null,
    visibleParticulier: true,
    visibleProfessionnel: true,
    ordre: 9,
    nombreProduits: 5,
  },
  {
    id: "cat-aide-marche",
    parentId: null,
    slug: "aide-marche",
    nom: { fr: "Aide à la marche", ar: null, en: null },
    imageUrl: null,
    visibleParticulier: true,
    visibleProfessionnel: true,
    ordre: 10,
    nombreProduits: 14,
  },
  {
    id: "cat-podologie",
    parentId: null,
    slug: "podologie",
    nom: { fr: "Podologie", ar: null, en: null },
    imageUrl: null,
    visibleParticulier: true,
    visibleProfessionnel: true,
    ordre: 11,
    nombreProduits: 8,
  },
  {
    id: "cat-diagnostic",
    parentId: null,
    slug: "diagnostic",
    nom: { fr: "Diagnostic et mesure", ar: null, en: null },
    imageUrl: null,
    visibleParticulier: true,
    visibleProfessionnel: true,
    ordre: 12,
    nombreProduits: 2,
  },
  {
    id: "cat-habillement-pro",
    parentId: null,
    slug: "habillement-pro",
    nom: { fr: "Habillement professionnel", ar: null, en: null },
    imageUrl: null,
    visibleParticulier: false,
    visibleProfessionnel: true,
    ordre: 13,
    nombreProduits: 6,
  },
  {
    id: "cat-dispositifs",
    parentId: null,
    slug: "dispositifs",
    nom: { fr: "Dispositifs médicaux et consommables", ar: null, en: null },
    imageUrl: null,
    visibleParticulier: false,
    visibleProfessionnel: true,
    ordre: 14,
    nombreProduits: 8,
  },
];

export const PRODUITS: readonly ProduitPublic[] = [
  {
    id: "prod-collier-cervical-eponge",
    slug: "collier-cervical-eponge",
    categorieId: "cat-cervical",
    referenceFournisseur: "PF 1103",
    nom: { fr: "Collier cervical éponge", ar: null, en: null },
    descriptionPro: { fr: "Minerve de coton pour immobilisation confortable.\n\nIndications :\n• conçu pour éviter les dommages sévères\n• Il soulage la douleur dans le cou\n• restreignant le mouvement de la colonne cervicale à certains angles\n• L’arthrose cervicale\n• Douleurs musculaires cervicales\n• Entorses bénigne\n• Névralgie cervico-branchial", ar: null, en: null },
    descriptionParticulier: { fr: "Minerve de coton pour immobilisation confortable.", ar: null, en: null },
    taille: null,
    dimension: null,
    // Disponibilité absente des documents fournis : « sur commande » par
    // défaut, à ajuster produit par produit depuis l'administration.
    disponibilite: "sur_commande",
    ficheTechniqueUrl: null,
    images: [],
    variantes: [],
    createdAt: "2026-09-09",
  },
  {
    id: "prod-collier-cervical-semi-rigide",
    slug: "collier-cervical-semi-rigide",
    categorieId: "cat-cervical",
    referenceFournisseur: "PF 1102",
    nom: { fr: "Collier cervical semi rigide", ar: null, en: null },
    descriptionPro: { fr: "Collier cervicale de protection post-traumatique\n\nIndications :\n• en cas de blessures au cou\n• Pour le transfert du patient et post-opératoire\n• chaine idéal pour repos de dégénérescences\n• En cas de lésions des tissus mous\n• Pour le transport des patients et la récupération post-opératoire\n• Pour hernie discale cervicale", ar: null, en: null },
    descriptionParticulier: { fr: "Collier cervicale de protection post-traumatique", ar: null, en: null },
    taille: null,
    dimension: null,
    // Disponibilité absente des documents fournis : « sur commande » par
    // défaut, à ajuster produit par produit depuis l'administration.
    disponibilite: "sur_commande",
    ficheTechniqueUrl: null,
    images: [],
    variantes: [],
    createdAt: "2026-09-09",
  },
  {
    id: "prod-collier-cervical-semi-rigide-rcip",
    slug: "collier-cervical-semi-rigide-rcip",
    categorieId: "cat-cervical",
    referenceFournisseur: "PF 1101",
    nom: { fr: "Collier cervical semi rigide RCIP", ar: null, en: null },
    descriptionPro: { fr: "Collier cervicale semi rigide avec mentonnière\n\nIndications :\n• pour le transfert du patient et post-opératoire\n• en cas de blessures au cou\n• En cas de dégénérescences\n• En cas de lésions des tissus mous\n• pour le transport des patients et la récupération post-opératoire\n• Hernie discale cervicale\n• Objectif de protection post-traumatique\n• Protection post-traumatique d’une entorse\n• Spasmes suite aux traumatismes des parties molles et du rachis cervical", ar: null, en: null },
    descriptionParticulier: { fr: "Collier cervicale semi rigide avec mentonnière", ar: null, en: null },
    taille: null,
    dimension: null,
    // Disponibilité absente des documents fournis : « sur commande » par
    // défaut, à ajuster produit par produit depuis l'administration.
    disponibilite: "sur_commande",
    ficheTechniqueUrl: null,
    images: [
      { id: "collier-cervical-semi-rigide-rcip-1", url: "/produits/1101.jpg", alt: "Collier cervical semi rigide RCIP" }
    ],
    variantes: [],
    createdAt: "2026-09-09",
  },
  {
    id: "prod-support-collier-cervical",
    slug: "support-collier-cervical",
    categorieId: "cat-cervical",
    referenceFournisseur: "PF 1102-B",
    nom: { fr: "Support collier cervical", ar: null, en: null },
    descriptionPro: { fr: "Collier cervical Rigide sans mentonnière pour offrir un soutien et une immobilisation précise à la colonne cervicale.\n\nIndications :\n• Limite les mouvements du cou\n• À utiliser après une blessure ou une intervention chirurgicale\n• Pour soulager la douleur dans les cas de conditions médicales spécifiques\n• Entorse cervicale bénigne à moyenne\n• Névralgie cervico-brachiale\n• Traumatisme cervical\n• Hernie discale\n• Traumatisme\n• Protection et repos post traumatique et post opératoire\n• Lésions et entorses majeurs\n• Radiculopathie importante", ar: null, en: null },
    descriptionParticulier: { fr: "Collier cervical Rigide sans mentonnière pour offrir un soutien et une immobilisation précise à la colonne cervicale.", ar: null, en: null },
    taille: null,
    dimension: null,
    // Disponibilité absente des documents fournis : « sur commande » par
    // défaut, à ajuster produit par produit depuis l'administration.
    disponibilite: "sur_commande",
    ficheTechniqueUrl: null,
    images: [],
    variantes: [],
    createdAt: "2026-09-09",
  },
  {
    id: "prod-support-collier-cervical-rcip",
    slug: "support-collier-cervical-rcip",
    categorieId: "cat-cervical",
    referenceFournisseur: "PF 1103-B",
    nom: { fr: "Support collier cervical RCIP", ar: null, en: null },
    descriptionPro: { fr: "Collier Rigide d’immobilisation avec mentonnière pour offrir un soutien et une immobilisation précise à la colonne cervicale.\n\nIndications :\n• Entorse cervicale bénigne à moyenne\n• Névralgie cervico-brachiale\n• Traumatisme cervical\n• Hernie discale\n• Traumatisme\n• Protection et repos post traumatique et post opératoire\n• Lésions et entorses majeurs\n• Radiculopathie importante\n• limite les mouvements du cou", ar: null, en: null },
    descriptionParticulier: { fr: "Collier Rigide d’immobilisation avec mentonnière pour offrir un soutien et une immobilisation précise à la colonne cervicale.", ar: null, en: null },
    taille: null,
    dimension: null,
    // Disponibilité absente des documents fournis : « sur commande » par
    // défaut, à ajuster produit par produit depuis l'administration.
    disponibilite: "sur_commande",
    ficheTechniqueUrl: null,
    images: [],
    variantes: [],
    createdAt: "2026-09-09",
  },
  {
    id: "prod-philadelphia-collier-cervical",
    slug: "philadelphia-collier-cervical",
    categorieId: "cat-cervical",
    referenceFournisseur: "PF 1104",
    nom: { fr: "Philadelphia collier cervical", ar: null, en: null },
    descriptionPro: { fr: "Conception anatomique semi-rigide avec deux appuis à l’avant et à l’arrière\n\nIndications :\n• Il fournit une stabilisation dans les\n• Fractures de la colonne cervicale\n• Pour réduire la douleur dans les tensions musculaires de la colonne cervicale\n• Il soutient un cou faible ou blessé et aide à soulager la douleur\n• Immobilisation et soutien ferme de la région du cou\n• Stabilisation réglable par velcro latéral\n• Pour une stabilisation ferme", ar: null, en: null },
    descriptionParticulier: { fr: "Conception anatomique semi-rigide avec deux appuis à l’avant et à l’arrière", ar: null, en: null },
    taille: null,
    dimension: null,
    // Disponibilité absente des documents fournis : « sur commande » par
    // défaut, à ajuster produit par produit depuis l'administration.
    disponibilite: "sur_commande",
    ficheTechniqueUrl: null,
    images: [],
    variantes: [],
    createdAt: "2026-09-09",
  },
  {
    id: "prod-philadelphia-collier-cervical-ouvert-pour-traitement",
    slug: "philadelphia-collier-cervical-ouvert-pour-traitement",
    categorieId: "cat-cervical",
    referenceFournisseur: "PF 1106",
    nom: { fr: "Philadelphia collier cervical ouvert pour traitement", ar: null, en: null },
    descriptionPro: { fr: "Collier cervical avec ouverture trachéale pour les patients en trachéotomie à de deux pièces en plastique antiallergique.\n\nIndications :\n• Les abrasions et les blessures du cou\n• Le transport des patients et l’utilisation post-opératoire\n• Il se compose L’ouverture de l’espace facilite le traitement dans les cas d’urgence\n• Conçu pour épouser la forme anatomique du cou\n• Immobilise de manière quasi absolue le rachis cervical", ar: null, en: null },
    descriptionParticulier: { fr: "Collier cervical avec ouverture trachéale pour les patients en trachéotomie à de deux pièces en plastique antiallergique.", ar: null, en: null },
    taille: null,
    dimension: null,
    // Disponibilité absente des documents fournis : « sur commande » par
    // défaut, à ajuster produit par produit depuis l'administration.
    disponibilite: "sur_commande",
    ficheTechniqueUrl: null,
    images: [],
    variantes: [],
    createdAt: "2026-09-09",
  },
  {
    id: "prod-bretelle-de-bras-en-echarpe-net",
    slug: "bretelle-de-bras-en-echarpe-net",
    categorieId: "cat-epaule-bras",
    referenceFournisseur: "PF 2301-F",
    nom: { fr: "Bretelle de bras en écharpe net", ar: null, en: null },
    descriptionPro: { fr: "Echarpe de bras Fait de tissus de coton, prend en charge le bras et porte le poids sur le dos et l’épaule\n\nIndications :\n• Lésion du nerf brachial\n• Fracture du bras supérieur\n• Subluxation de l’épaule / dislocation\n• La protection post chirurgicale", ar: null, en: null },
    descriptionParticulier: { fr: "Echarpe de bras Fait de tissus de coton, prend en charge le bras et porte le poids sur le dos et l’épaule", ar: null, en: null },
    taille: null,
    dimension: null,
    // Disponibilité absente des documents fournis : « sur commande » par
    // défaut, à ajuster produit par produit depuis l'administration.
    disponibilite: "sur_commande",
    ficheTechniqueUrl: null,
    images: [],
    variantes: [],
    createdAt: "2026-09-09",
  },
  {
    id: "prod-bretelle-de-bras-en-echarpe-eponge",
    slug: "bretelle-de-bras-en-echarpe-eponge",
    categorieId: "cat-epaule-bras",
    referenceFournisseur: "PF 2301",
    nom: { fr: "Bretelle de bras en écharpe éponge", ar: null, en: null },
    descriptionPro: { fr: "Écharpe de bras en éponge aide à amortir et protéger les zones blessées tout en réduisant la douleur pour soutenir le processus de guérison.\n\nIndications :\n• En cas de la stabilisation du bras ou d’épaule\n• En cas des problèmes de l’avant-bras", ar: null, en: null },
    descriptionParticulier: { fr: "Écharpe de bras en éponge aide à amortir et protéger les zones blessées tout en réduisant la douleur pour soutenir le processus de guérison.", ar: null, en: null },
    taille: null,
    dimension: null,
    // Disponibilité absente des documents fournis : « sur commande » par
    // défaut, à ajuster produit par produit depuis l'administration.
    disponibilite: "sur_commande",
    ficheTechniqueUrl: null,
    images: [],
    variantes: [],
    createdAt: "2026-09-09",
  },
  {
    id: "prod-bretelle-active-30-degres-45-60-degres",
    slug: "bretelle-active-30-degres-45-60-degres",
    categorieId: "cat-epaule-bras",
    referenceFournisseur: "PF 2300",
    nom: { fr: "Bretelle active 30 degrés /45-60 degrés", ar: null, en: null },
    descriptionPro: { fr: "Echarpe d’épaule avec coussin d’abduction pour Enlèvement d’articulation de l’épaule à 30 degrés ou de 45 à 60 degrés\n\nIndications :\n• Pour le fixement de la périphérie de l’épaule, capsule de l’épaule et rotateurs pendant le traitement\n• Subacrominal et sous-coracoïdienne\n• Bursite\n• Post-épaule end prothèses\n• Pour immobilisation", ar: null, en: null },
    descriptionParticulier: { fr: "Echarpe d’épaule avec coussin d’abduction pour Enlèvement d’articulation de l’épaule à 30 degrés ou de 45 à 60 degrés", ar: null, en: null },
    taille: null,
    dimension: null,
    // Disponibilité absente des documents fournis : « sur commande » par
    // défaut, à ajuster produit par produit depuis l'administration.
    disponibilite: "sur_commande",
    ficheTechniqueUrl: null,
    images: [],
    variantes: [],
    createdAt: "2026-09-09",
  },
  {
    id: "prod-support-depaule",
    slug: "support-depaule",
    categorieId: "cat-epaule-bras",
    referenceFournisseur: "PF 22800",
    nom: { fr: "Support d’épaule", ar: null, en: null },
    descriptionPro: { fr: "Bandage pour la protection, prévention et soutien d’épaule.\n\nIndications :\n• Soulage les douleurs aux épaules\n• Il soulage également la douleur dans l'activation de l'épaule\n• les luxations pendant le sport\n• les entorses,\n• les muscles irrités\n• Pour les épaules disloquées ou les épaules instables\n• Soulage l'arthrite\n• Pour les blessures pendant l'entraînement", ar: null, en: null },
    descriptionParticulier: { fr: "Bandage pour la protection, prévention et soutien d’épaule.", ar: null, en: null },
    taille: null,
    dimension: null,
    // Disponibilité absente des documents fournis : « sur commande » par
    // défaut, à ajuster produit par produit depuis l'administration.
    disponibilite: "sur_commande",
    ficheTechniqueUrl: null,
    images: [],
    variantes: [],
    createdAt: "2026-09-09",
  },
  {
    id: "prod-bandage-de-support-depaule-velpeau",
    slug: "bandage-de-support-depaule-velpeau",
    categorieId: "cat-epaule-bras",
    referenceFournisseur: "PF 2302",
    nom: { fr: "Bandage de support d’épaule (Velpeau)", ar: null, en: null },
    descriptionPro: { fr: "Le bandage d’immobilisation d’épaule permet une immobilisation totale de l’épaule et du coude grâce à sa large sangle scapulo-humérale.\n\nIndications :\n• Lésion du nerf brachial\n• Fracture de la partie supérieure du bras\n• La protection post chirurgicale", ar: null, en: null },
    descriptionParticulier: { fr: "Le bandage d’immobilisation d’épaule permet une immobilisation totale de l’épaule et du coude grâce à sa large sangle scapulo-humérale.", ar: null, en: null },
    taille: null,
    dimension: null,
    // Disponibilité absente des documents fournis : « sur commande » par
    // défaut, à ajuster produit par produit depuis l'administration.
    disponibilite: "sur_commande",
    ficheTechniqueUrl: null,
    images: [
      { id: "bandage-de-support-depaule-velpeau-1", url: "/produits/2302-scaled.jpg", alt: "Bandage de support d’épaule (Velpeau)" },
      { id: "bandage-de-support-depaule-velpeau-2", url: "/produits/velpeau-scaled.jpg", alt: "Bandage de support d’épaule (Velpeau)" }
    ],
    variantes: [],
    createdAt: "2026-09-09",
  },
  {
    id: "prod-support-de-coude-pour-le-tennis-std",
    slug: "support-de-coude-pour-le-tennis-std",
    categorieId: "cat-coude",
    referenceFournisseur: "PF 27008",
    nom: { fr: "Support de coude pour le tennis STD", ar: null, en: null },
    descriptionPro: { fr: "Bandage de support de coude assurant un maintien et une compression recommandé lors de la reprise d’activité\n\nIndications :\n• Tendinite\n• Des légères contusions\n• Une instabilité lors du mouvement ou un léger traumatisme\n• état inflammatoire", ar: null, en: null },
    descriptionParticulier: { fr: "Bandage de support de coude assurant un maintien et une compression recommandé lors de la reprise d’activité", ar: null, en: null },
    taille: null,
    dimension: null,
    // Disponibilité absente des documents fournis : « sur commande » par
    // défaut, à ajuster produit par produit depuis l'administration.
    disponibilite: "sur_commande",
    ficheTechniqueUrl: null,
    images: [],
    variantes: [],
    createdAt: "2026-09-09",
  },
  {
    id: "prod-atelle-de-pouce",
    slug: "atelle-de-pouce",
    categorieId: "cat-poignet-main",
    referenceFournisseur: "PF 215",
    nom: { fr: "Attelle de pouce", ar: null, en: null },
    descriptionPro: { fr: "Orthèse de pouce qui stabilise l'articulation\n\nIndications :\n• Lésions ligamentaires latérales de l'articulation du pouce\n• Distorsion\n• Soutien entorse arthrite\n• Irritation de l'articulation MCP", ar: null, en: null },
    descriptionParticulier: { fr: "Orthèse de pouce qui stabilise l'articulation", ar: null, en: null },
    taille: null,
    dimension: null,
    // Disponibilité absente des documents fournis : « sur commande » par
    // défaut, à ajuster produit par produit depuis l'administration.
    disponibilite: "sur_commande",
    ficheTechniqueUrl: null,
    images: [],
    variantes: [],
    createdAt: "2026-09-09",
  },
  {
    id: "prod-atelle-de-poignet",
    slug: "atelle-de-poignet",
    categorieId: "cat-poignet-main",
    referenceFournisseur: "PF 219",
    nom: { fr: "Attelle de poignet", ar: null, en: null },
    descriptionPro: { fr: "Attelle amovible aide à soulager la douleur\n\nIndications :\n• Syndrome du canal carpien\n• Colle fracture\n• Utilisation post chirurgicale", ar: null, en: null },
    descriptionParticulier: { fr: "Attelle amovible aide à soulager la douleur", ar: null, en: null },
    taille: null,
    dimension: null,
    // Disponibilité absente des documents fournis : « sur commande » par
    // défaut, à ajuster produit par produit depuis l'administration.
    disponibilite: "sur_commande",
    ficheTechniqueUrl: null,
    images: [
      { id: "atelle-de-poignet-1", url: "/produits/dsc-7306puffix2013-400x400-1-e1593255401360.gif", alt: "Attelle de poignet" }
    ],
    variantes: [],
    createdAt: "2026-09-09",
  },
  {
    id: "prod-bandage-de-poignet-brace",
    slug: "bandage-de-poignet-brace",
    categorieId: "cat-poignet-main",
    referenceFournisseur: "PF 218",
    nom: { fr: "Bandage de poignet brace", ar: null, en: null },
    descriptionPro: { fr: "Bandage standard pour maintien du poignet\n\nIndications :\n• Instabilités légères\n• En cas de tendinites\n• Thermocompression et stabilisation\n• En cas d’entorses ou d’inflammation du canal carpien\n• Prévention (sport et travail) en cas de mouvements répétitifs du poignet", ar: null, en: null },
    descriptionParticulier: { fr: "Bandage standard pour maintien du poignet", ar: null, en: null },
    taille: null,
    dimension: null,
    // Disponibilité absente des documents fournis : « sur commande » par
    // défaut, à ajuster produit par produit depuis l'administration.
    disponibilite: "sur_commande",
    ficheTechniqueUrl: null,
    images: [],
    variantes: [],
    createdAt: "2026-09-09",
  },
  {
    id: "prod-atelle-de-poignet-avec-support-de-pouce",
    slug: "atelle-de-poignet-avec-support-de-pouce",
    categorieId: "cat-poignet-main",
    referenceFournisseur: "PF 221",
    nom: { fr: "Attelle de poignet avec support de pouce", ar: null, en: null },
    descriptionPro: { fr: "Attelle de poignet avec support de pouce rigide pour une bonne compression\n\nIndications :\n• Syndrome du canal carpien\n• Utilisation post chirurgicale\n• Colle fracture", ar: null, en: null },
    descriptionParticulier: { fr: "Attelle de poignet avec support de pouce rigide pour une bonne compression", ar: null, en: null },
    taille: null,
    dimension: null,
    // Disponibilité absente des documents fournis : « sur commande » par
    // défaut, à ajuster produit par produit depuis l'administration.
    disponibilite: "sur_commande",
    ficheTechniqueUrl: null,
    images: [],
    variantes: [],
    createdAt: "2026-09-09",
  },
  {
    id: "prod-atelle-thermoplastique-kleinert-main-et-doigts",
    slug: "atelle-thermoplastique-kleinert-main-et-doigts",
    categorieId: "cat-poignet-main",
    referenceFournisseur: "PF 237",
    nom: { fr: "Attelle thermoplastique Kleinert main et doigts", ar: null, en: null },
    descriptionPro: { fr: "Un appareillage de la main et du membre supérieur peut être mis en place après une chirurgie ou lors de traitement orthopédique isolé.\n\nIndications :\n• Immobiliser une articulation\n• Protéger une mobilisation après une chirurgie d’une articulation\n• Récupérer la mobilité d’une ou plusieurs articulations\n• Traiter une cicatrice douloureuse", ar: null, en: null },
    descriptionParticulier: { fr: "Un appareillage de la main et du membre supérieur peut être mis en place après une chirurgie ou lors de traitement orthopédique isolé.", ar: null, en: null },
    taille: null,
    dimension: null,
    // Disponibilité absente des documents fournis : « sur commande » par
    // défaut, à ajuster produit par produit depuis l'administration.
    disponibilite: "sur_commande",
    ficheTechniqueUrl: null,
    images: [],
    variantes: [],
    createdAt: "2026-09-09",
  },
  {
    id: "prod-atelle-dynamique-main-et-doigts",
    slug: "atelle-dynamique-main-et-doigts",
    categorieId: "cat-poignet-main",
    referenceFournisseur: "PF 235",
    nom: { fr: "Attelle dynamique main et doigts", ar: null, en: null },
    descriptionPro: { fr: "Utilisez cette attelle de main dynamique pour surmonter une spasticité modérée à sévère et vous aider à saisir des objets après un accident vasculaire cérébral ou une lésion cérébrale traumatique.\n\nIndications :\n• pour les contractures jusqu’à 45°\n• donne une impression de souplesse quand les doigts sont tendus\n• Reste en place même quand le doigt bouge", ar: null, en: null },
    descriptionParticulier: { fr: "Utilisez cette attelle de main dynamique pour surmonter une spasticité modérée à sévère et vous aider à saisir des objets après un accident vasculaire cérébral ou une lésion cérébrale traumatique.", ar: null, en: null },
    taille: null,
    dimension: null,
    // Disponibilité absente des documents fournis : « sur commande » par
    // défaut, à ajuster produit par produit depuis l'administration.
    disponibilite: "sur_commande",
    ficheTechniqueUrl: null,
    images: [],
    variantes: [],
    createdAt: "2026-09-09",
  },
  {
    id: "prod-atelle-repos-main",
    slug: "atelle-repos-main",
    categorieId: "cat-poignet-main",
    referenceFournisseur: "PF 234",
    nom: { fr: "Attelle repos main", ar: null, en: null },
    descriptionPro: { fr: "Attelle de repose main et doigts pour soulager la douleur et immobiliser les articulations du poignet et des doigts dans une position fonctionnelle\n\nIndications :\n• Fractures et luxations des articulations de la main, du poignet ou du doigt\n• Irritation au niveau des articulations du poignet et des doigts\n• Après une chirurgie du poignet, du carpe ou du métacarpe\n• Syndrome du canal carpien\n• Arthrose du poignet\n• Distorsions massives", ar: null, en: null },
    descriptionParticulier: { fr: "Attelle de repose main et doigts pour soulager la douleur et immobiliser les articulations du poignet et des doigts dans une position fonctionnelle", ar: null, en: null },
    taille: null,
    dimension: null,
    // Disponibilité absente des documents fournis : « sur commande » par
    // défaut, à ajuster produit par produit depuis l'administration.
    disponibilite: "sur_commande",
    ficheTechniqueUrl: null,
    images: [],
    variantes: [],
    createdAt: "2026-09-09",
  },
  {
    id: "prod-atelle-thermoplastique-anti-spaticite-main",
    slug: "atelle-thermoplastique-anti-spaticite-main",
    categorieId: "cat-poignet-main",
    referenceFournisseur: "PF 236",
    nom: { fr: "Attelle thermoplastique anti spasticité main", ar: null, en: null },
    descriptionPro: { fr: "Conception doigts à fente et sa résistance à la tension, la rende\n\nIndications :\n• Idéale pour les patients présentant une spasticité\n• Pour protection après les fractures\n• Chez les patients paralytiques\n• En cas des douleurs dans le poignet\n• Pour mettre la main en repos", ar: null, en: null },
    descriptionParticulier: { fr: "Conception doigts à fente et sa résistance à la tension, la rende", ar: null, en: null },
    taille: null,
    dimension: null,
    // Disponibilité absente des documents fournis : « sur commande » par
    // défaut, à ajuster produit par produit depuis l'administration.
    disponibilite: "sur_commande",
    ficheTechniqueUrl: null,
    images: [],
    variantes: [],
    createdAt: "2026-09-09",
  },
  {
    id: "prod-corset-hernie-ventre",
    slug: "corset-hernie-ventre",
    categorieId: "cat-dos-abdomen",
    referenceFournisseur: "PF 3422",
    nom: { fr: "Corset hernie ventre", ar: null, en: null },
    descriptionPro: { fr: "Ceinture pour Hernie du ventre pour femme et homme\n\nIndications :\n• Déformation musculaire légère\n• La douleur chronique au bas du dos\n• ligament entorse\n• Utilisation post chirurgicale", ar: null, en: null },
    descriptionParticulier: { fr: "Ceinture pour Hernie du ventre pour femme et homme", ar: null, en: null },
    taille: null,
    dimension: null,
    // Disponibilité absente des documents fournis : « sur commande » par
    // défaut, à ajuster produit par produit depuis l'administration.
    disponibilite: "sur_commande",
    ficheTechniqueUrl: null,
    images: [],
    variantes: [],
    createdAt: "2026-09-09",
  },
  {
    id: "prod-hernie-truss-double-face",
    slug: "hernie-truss-double-face",
    categorieId: "cat-dos-abdomen",
    referenceFournisseur: "PF 462-D",
    nom: { fr: "Hernie Truss double face", ar: null, en: null },
    descriptionPro: { fr: "Ceinture de compression autour de la zone affectée avec une compression ciblée sur la hernie\n\nIndications :\n• Hernie inguinale", ar: null, en: null },
    descriptionParticulier: { fr: "Ceinture de compression autour de la zone affectée avec une compression ciblée sur la hernie", ar: null, en: null },
    taille: null,
    dimension: null,
    // Disponibilité absente des documents fournis : « sur commande » par
    // défaut, à ajuster produit par produit depuis l'administration.
    disponibilite: "sur_commande",
    ficheTechniqueUrl: null,
    images: [],
    variantes: [],
    createdAt: "2026-09-09",
  },
  {
    id: "prod-hernie-truss-une-seule-face",
    slug: "hernie-truss-une-seule-face",
    categorieId: "cat-dos-abdomen",
    referenceFournisseur: "PF 462",
    nom: { fr: "Hernie Truss une seule face", ar: null, en: null },
    descriptionPro: { fr: "Assure une compression autour de la zone affectée avec une compression ciblée sur la hernie, la réduction de la hernie inguinale\n\nIndications :\n• Hernie inguinale", ar: null, en: null },
    descriptionParticulier: { fr: "Assure une compression autour de la zone affectée avec une compression ciblée sur la hernie, la réduction de la hernie inguinale", ar: null, en: null },
    taille: null,
    dimension: null,
    // Disponibilité absente des documents fournis : « sur commande » par
    // défaut, à ajuster produit par produit depuis l'administration.
    disponibilite: "sur_commande",
    ficheTechniqueUrl: null,
    images: [],
    variantes: [],
    createdAt: "2026-09-09",
  },
  {
    id: "prod-corset-abdomonale",
    slug: "corset-abdomonale",
    categorieId: "cat-dos-abdomen",
    referenceFournisseur: "PF 3420",
    nom: { fr: "Corset abdominale", ar: null, en: null },
    descriptionPro: { fr: "Ceinture Abdominale améliorer l’équilibre et accélérer la récupération après une hernie abdominale\n\nIndications :\n• Douleur lombaire légère\n• Après opération abdominale\n• Post-maternité\n• Postopératoire", ar: null, en: null },
    descriptionParticulier: { fr: "Ceinture Abdominale améliorer l’équilibre et accélérer la récupération après une hernie abdominale", ar: null, en: null },
    taille: null,
    dimension: null,
    // Disponibilité absente des documents fournis : « sur commande » par
    // défaut, à ajuster produit par produit depuis l'administration.
    disponibilite: "sur_commande",
    ficheTechniqueUrl: null,
    images: [],
    variantes: [],
    createdAt: "2026-09-09",
  },
  {
    id: "prod-corset-thoracique",
    slug: "corset-thoracique",
    categorieId: "cat-dos-abdomen",
    referenceFournisseur: "PF 3421",
    nom: { fr: "Corset thoracique", ar: null, en: null },
    descriptionPro: { fr: "Soutient la zone sternale en fournissant une compression à la cage thoracique\n\nIndications :\n• Fracture Post-Costa\n• Pour soutenir le sternum post-chirurgie Coronel", ar: null, en: null },
    descriptionParticulier: { fr: "Soutient la zone sternale en fournissant une compression à la cage thoracique", ar: null, en: null },
    taille: null,
    dimension: null,
    // Disponibilité absente des documents fournis : « sur commande » par
    // défaut, à ajuster produit par produit depuis l'administration.
    disponibilite: "sur_commande",
    ficheTechniqueUrl: null,
    images: [],
    variantes: [],
    createdAt: "2026-09-09",
  },
  {
    id: "prod-corset-soutien-posturex",
    slug: "corset-soutien-posturex",
    categorieId: "cat-dos-abdomen",
    referenceFournisseur: "PF 3161",
    nom: { fr: "Corset soutien Posturex", ar: null, en: null },
    descriptionPro: { fr: "Posturex permet de corriger les troubles de la posture et de maintenir le dos droit\n\nIndications :\n• Une mauvaise posture\n• La faiblesse des muscles omoplate\n• Epaule ronde", ar: null, en: null },
    descriptionParticulier: { fr: "Posturex permet de corriger les troubles de la posture et de maintenir le dos droit", ar: null, en: null },
    taille: null,
    dimension: null,
    // Disponibilité absente des documents fournis : « sur commande » par
    // défaut, à ajuster produit par produit depuis l'administration.
    disponibilite: "sur_commande",
    ficheTechniqueUrl: null,
    images: [],
    variantes: [],
    createdAt: "2026-09-09",
  },
  {
    id: "prod-corset-lumbostad-26cm",
    slug: "corset-lumbostad-26cm",
    categorieId: "cat-dos-abdomen",
    referenceFournisseur: "PF 3260-K",
    nom: { fr: "Corset lombostat 26CM", ar: null, en: null },
    descriptionPro: { fr: "Corset pour soulager les douleurs du Site LOMBAIRES est soutenu par des armatures en plastique et en acier.\n\nIndications :\n• Problèmes Lombaires vertébraux\n• Déformations rachidiennes\n• Lumbago aigu ou chronique\n• Fournit une immobilisation des seins\n• Lumbago", ar: null, en: null },
    descriptionParticulier: { fr: "Corset pour soulager les douleurs du Site LOMBAIRES est soutenu par des armatures en plastique et en acier.", ar: null, en: null },
    taille: null,
    dimension: null,
    // Disponibilité absente des documents fournis : « sur commande » par
    // défaut, à ajuster produit par produit depuis l'administration.
    disponibilite: "sur_commande",
    ficheTechniqueUrl: null,
    images: [
      { id: "corset-lumbostad-26cm-1", url: "/produits/3260k-scaled.jpg", alt: "Corset lombostat 26CM" },
      { id: "corset-lumbostad-26cm-2", url: "/produits/3260k-ar-scaled.jpg", alt: "Corset lombostat 26CM" }
    ],
    variantes: [],
    createdAt: "2026-09-09",
  },
  {
    id: "prod-corset-lumbo-sacree-32cm",
    slug: "corset-lumbo-sacree-32cm",
    categorieId: "cat-dos-abdomen",
    referenceFournisseur: "PF 3320",
    nom: { fr: "Corset lombo sacrée 32CM", ar: null, en: null },
    descriptionPro: { fr: "Soutien du Site Sacree est soutenu par des armatures en plastique et en acier\n\nIndications :\n• Lumbago aigu ou chronique\n• Fournit une immobilisation des seins\n• Problèmes Sacree vertébraux\n• Déformations rachidiennes\n• Lumbago", ar: null, en: null },
    descriptionParticulier: { fr: "Soutien du Site Sacree est soutenu par des armatures en plastique et en acier", ar: null, en: null },
    taille: null,
    dimension: null,
    // Disponibilité absente des documents fournis : « sur commande » par
    // défaut, à ajuster produit par produit depuis l'administration.
    disponibilite: "sur_commande",
    ficheTechniqueUrl: null,
    images: [],
    variantes: [],
    createdAt: "2026-09-09",
  },
  {
    id: "prod-corset-elastique-dorsolomber",
    slug: "corset-elastique-dorsolomber",
    categorieId: "cat-dos-abdomen",
    referenceFournisseur: "PF 3330",
    nom: { fr: "Corset élastique dorsolombaire", ar: null, en: null },
    descriptionPro: { fr: "Corset pour soulager la douleur des  sites Lombaires et sacrée Soutenu par des courroies supplémentaires pour plus de conformité avec la taille et la poitrine\n\nIndications :\n• Lumbago\n• Fournit une immobilisation des seins\n• Poids léger\n• Ostéoporose", ar: null, en: null },
    descriptionParticulier: { fr: "Corset pour soulager la douleur des  sites Lombaires et sacrée Soutenu par des courroies supplémentaires pour plus de conformité avec la taille et la poitrine", ar: null, en: null },
    taille: null,
    dimension: null,
    // Disponibilité absente des documents fournis : « sur commande » par
    // défaut, à ajuster produit par produit depuis l'administration.
    disponibilite: "sur_commande",
    ficheTechniqueUrl: null,
    images: [],
    variantes: [],
    createdAt: "2026-09-09",
  },
  {
    id: "prod-corset-grossesse",
    slug: "corset-grossesse",
    categorieId: "cat-dos-abdomen",
    referenceFournisseur: "PF 3424",
    nom: { fr: "Corset grossesse", ar: null, en: null },
    descriptionPro: { fr: "Ceinture de maternité\n\nIndications :\n• supporter l'excès de poids de la grossesse\n• Protégez\n• Minimisez les douleurs au dos, au bassin et à la hanche\n• Il empêche de fatiguer votre dos\n• Réduisant efficacement la pression vertébrale", ar: null, en: null },
    descriptionParticulier: { fr: "Ceinture de maternité", ar: null, en: null },
    taille: null,
    dimension: null,
    // Disponibilité absente des documents fournis : « sur commande » par
    // défaut, à ajuster produit par produit depuis l'administration.
    disponibilite: "sur_commande",
    ficheTechniqueUrl: null,
    images: [],
    variantes: [],
    createdAt: "2026-09-09",
  },
  {
    id: "prod-orthese-fracture-humerale",
    slug: "orthese-fracture-humerale",
    categorieId: "cat-epaule-bras",
    referenceFournisseur: "PF 22802",
    nom: { fr: "Orthese fracture humerale", ar: null, en: null },
    descriptionPro: { fr: "Orthèse d’épaule pour maintenir l’humérus immobilisé\n\nIndications :\n• Protection et stabilisation des luxations de l’épaule\n• Fractures de la tête de l’humérus\n• Rééducation après intervention chirurgicale\n• Réhabilitation après application de plâtre d’épaule", ar: null, en: null },
    descriptionParticulier: { fr: "Orthèse d’épaule pour maintenir l’humérus immobilisé", ar: null, en: null },
    taille: null,
    dimension: null,
    // Disponibilité absente des documents fournis : « sur commande » par
    // défaut, à ajuster produit par produit depuis l'administration.
    disponibilite: "sur_commande",
    ficheTechniqueUrl: null,
    images: [
      { id: "orthese-fracture-humerale-1", url: "/produits/22802-c.gif", alt: "Orthese fracture humerale" }
    ],
    variantes: [],
    createdAt: "2026-09-09",
  },
  {
    id: "prod-genouillere-rotulien-ferme",
    slug: "genouillere-rotulien-ferme",
    categorieId: "cat-genou-cuisse",
    referenceFournisseur: "PF 52100",
    nom: { fr: "Genouillère rotulien ferme", ar: null, en: null },
    descriptionPro: { fr: "Genouillère qui réduit la pression des articulations du genou en les soutenant et ainsi soulage la douleur\n\nIndications :\n• Gonarthroses\n• Syndromes rotuliens\n• favorise la circulation sanguine\n• Accélère le métabolisme par le maintien de la chaleur corporelle", ar: null, en: null },
    descriptionParticulier: { fr: "Genouillère qui réduit la pression des articulations du genou en les soutenant et ainsi soulage la douleur", ar: null, en: null },
    taille: null,
    dimension: null,
    // Disponibilité absente des documents fournis : « sur commande » par
    // défaut, à ajuster produit par produit depuis l'administration.
    disponibilite: "sur_commande",
    ficheTechniqueUrl: null,
    images: [],
    variantes: [],
    createdAt: "2026-09-09",
  },
  {
    id: "prod-genouillere-rotulien-ouverte",
    slug: "genouillere-rotulien-ouverte",
    categorieId: "cat-genou-cuisse",
    referenceFournisseur: "PF 52101",
    nom: { fr: "Genouillère rotulien ouverte", ar: null, en: null },
    descriptionPro: { fr: "Genouillère rotulien ouverte  parfaitement en  rotule en donnant stabilisation sans exercer aucune pression sur le mollet. L’ouverture rotulienne stabilise la rotule sans qu’aucune pression ne soit exercée sur la région poplitée.\n\nIndications :\n• Stimulation proprioceptive du genou lors de la reprise d'activité\n• Prévention de la subluxation de rotule\n• Douleurs rotuliennes et méniscales\n• Stabilisation patellaire dans les cas d'instabilités légères\n• Maintien de la rotule hyper axe ou après une entorse légère\n• Pf 52103 GENOUILLERE ROTULIEN ET LONG LIGAMENT\n• Genouillère ligamentaire en Silicone pour plus de maintien\n• Après une blessure ou une opération\n• Reprise d’une activité sportive\n• Prévention des douleurs et des blessures\n• Ligaments croisés antérieur et postérieur\n• Ligaments latéraux interne et externe\n• Le cartilage qui permet au fémur et au tibia de glisser l’un sur l’autre\n• Le ménisque qui absorbe les chocs entre les os", ar: null, en: null },
    descriptionParticulier: { fr: "Genouillère rotulien ouverte  parfaitement en  rotule en donnant stabilisation sans exercer aucune pression sur le mollet. L’ouverture rotulienne stabilise la rotule sans qu’aucune pression ne soit exercée sur la région poplitée.", ar: null, en: null },
    taille: null,
    dimension: null,
    // Disponibilité absente des documents fournis : « sur commande » par
    // défaut, à ajuster produit par produit depuis l'administration.
    disponibilite: "sur_commande",
    ficheTechniqueUrl: null,
    images: [],
    variantes: [],
    createdAt: "2026-09-09",
  },
  {
    id: "prod-genouillere-rotulien-et-long-ligament",
    slug: "genouillere-rotulien-et-long-ligament",
    categorieId: "cat-genou-cuisse",
    referenceFournisseur: "PF 52103",
    nom: { fr: "Genouillère rotulien et long ligament", ar: null, en: null },
    descriptionPro: { fr: "Genouillère Ligamentaire  Matrix  stabilise le ligament sur la zone du genou, apaise les douleurs et contribue au traitement de l’arthrose du genou ou encore d’une affection fémoraux-patellaire.\n\nIndications :\n• Entorse\n• Tendinite\n• Gonarthrose", ar: null, en: null },
    descriptionParticulier: { fr: "Genouillère Ligamentaire  Matrix  stabilise le ligament sur la zone du genou, apaise les douleurs et contribue au traitement de l’arthrose du genou ou encore d’une affection fémoraux-patellaire.", ar: null, en: null },
    taille: null,
    dimension: null,
    // Disponibilité absente des documents fournis : « sur commande » par
    // défaut, à ajuster produit par produit depuis l'administration.
    disponibilite: "sur_commande",
    ficheTechniqueUrl: null,
    images: [],
    variantes: [],
    createdAt: "2026-09-09",
  },
  {
    id: "prod-rotulien-genouillere-ligament-ouvert-a-l-avant",
    slug: "rotulien-genouillere-ligament-ouvert-a-l-avant",
    categorieId: "cat-genou-cuisse",
    referenceFournisseur: "PF 52103-A",
    nom: { fr: "Rotulien genouillère ligament ouvert a l’avant", ar: null, en: null },
    descriptionPro: { fr: "La Genouillère Ligamentaire  avec son anneau en silicone soulage les contraintes de votre genou.\n\nIndications :\n• Après une blessure ou une opération\n• Reprise d’une activité sportive\n• Prévention des douleurs et des blessures\n• Ligaments croisés antérieur et postérieur\n• Ligaments latéraux interne et externe\n• Le cartilage qui permet au fémur et au tibia de glisser l’un sur l’autre\n• Le ménisque qui absorbe les chocs entre les os", ar: null, en: null },
    descriptionParticulier: { fr: "La Genouillère Ligamentaire  avec son anneau en silicone soulage les contraintes de votre genou.", ar: null, en: null },
    taille: null,
    dimension: null,
    // Disponibilité absente des documents fournis : « sur commande » par
    // défaut, à ajuster produit par produit depuis l'administration.
    disponibilite: "sur_commande",
    ficheTechniqueUrl: null,
    images: [],
    variantes: [],
    createdAt: "2026-09-09",
  },
  {
    id: "prod-support-de-genou-articule",
    slug: "support-de-genou-articule",
    categorieId: "cat-genou-cuisse",
    referenceFournisseur: "PF 52104",
    nom: { fr: "Support de genou articulé", ar: null, en: null },
    descriptionPro: { fr: "Support orthopédique articulé avec des soutiens  en métal pour le genou, fixateur correcteur de Posture, Fracture de la rotule, protecteur du genou, soins osseux\n\nIndications :\n• Traitement de différents problèmes reliés à la rotule dont la chondromalacie, la tendinite, la subluxation ou la dislocation de celle-ci\n• Pratique sportive: sport de raquette, sports de ballon, jogging, vélo\n• Travaux lourds\n• Marche", ar: null, en: null },
    descriptionParticulier: { fr: "Support orthopédique articulé avec des soutiens  en métal pour le genou, fixateur correcteur de Posture, Fracture de la rotule, protecteur du genou, soins osseux", ar: null, en: null },
    taille: null,
    dimension: null,
    // Disponibilité absente des documents fournis : « sur commande » par
    // défaut, à ajuster produit par produit depuis l'administration.
    disponibilite: "sur_commande",
    ficheTechniqueUrl: null,
    images: [],
    variantes: [],
    createdAt: "2026-09-09",
  },
  {
    id: "prod-genouillere-rotulien-et-ligament-matrix",
    slug: "genouillere-rotulien-et-ligament-matrix",
    categorieId: "cat-genou-cuisse",
    referenceFournisseur: "PF 52109",
    nom: { fr: "Genouillère rotulien et ligament Matrix", ar: null, en: null },
    descriptionPro: { fr: "Genouillère Ligamentaire  Matrix  stabilise le ligament sur la zone du genou, apaise les douleurs et contribue au traitement de l’arthrose du genou ou encore d’une affection fémoraux-patellaire.\n\nIndications :\n• Entorse\n• Tendinite\n• Gonarthrose", ar: null, en: null },
    descriptionParticulier: { fr: "Genouillère Ligamentaire  Matrix  stabilise le ligament sur la zone du genou, apaise les douleurs et contribue au traitement de l’arthrose du genou ou encore d’une affection fémoraux-patellaire.", ar: null, en: null },
    taille: null,
    dimension: null,
    // Disponibilité absente des documents fournis : « sur commande » par
    // défaut, à ajuster produit par produit depuis l'administration.
    disponibilite: "sur_commande",
    ficheTechniqueUrl: null,
    images: [],
    variantes: [],
    createdAt: "2026-09-09",
  },
  {
    id: "prod-tendon-rotulien-strap",
    slug: "tendon-rotulien-strap",
    categorieId: "cat-genou-cuisse",
    referenceFournisseur: "PF 52110",
    nom: { fr: "Tendon rotulien strap", ar: null, en: null },
    descriptionPro: { fr: "Coussin de pression en silicone améliore le confort au niveau du creux du genou.\n\nIndications :\n• Tendinite rotulienne\n• Chondropathie de la rotule\n• Douleurs antérieures du genou", ar: null, en: null },
    descriptionParticulier: { fr: "Coussin de pression en silicone améliore le confort au niveau du creux du genou.", ar: null, en: null },
    taille: null,
    dimension: null,
    // Disponibilité absente des documents fournis : « sur commande » par
    // défaut, à ajuster produit par produit depuis l'administration.
    disponibilite: "sur_commande",
    ficheTechniqueUrl: null,
    images: [],
    variantes: [],
    createdAt: "2026-09-09",
  },
  {
    id: "prod-appareil-orthopedique-a-ongle-reglable",
    slug: "appareil-orthopedique-a-ongle-reglable",
    categorieId: "cat-genou-cuisse",
    referenceFournisseur: "PF 51011",
    nom: { fr: "Appareil orthopédique à ongle réglable", ar: null, en: null },
    descriptionPro: { fr: "Attelle de Genou Articulée à ongle réglable\n\nIndications :\n• Immobilisation\n• Amplitude de mouvement protégée associée aux chirurgies ACL, PCL, LCL et MCL\n• Réparations méniscales", ar: null, en: null },
    descriptionParticulier: { fr: "Attelle de Genou Articulée à ongle réglable", ar: null, en: null },
    taille: null,
    dimension: null,
    // Disponibilité absente des documents fournis : « sur commande » par
    // défaut, à ajuster produit par produit depuis l'administration.
    disponibilite: "sur_commande",
    ficheTechniqueUrl: null,
    images: [
      { id: "appareil-orthopedique-a-ongle-reglable-1", url: "/produits/51011-xx-scaled.jpg", alt: "Appareil orthopédique à ongle réglable" }
    ],
    variantes: [],
    createdAt: "2026-09-09",
  },
  {
    id: "prod-mobilisateur-du-genou",
    slug: "mobilisateur-du-genou",
    categorieId: "cat-genou-cuisse",
    referenceFournisseur: "PF 510",
    nom: { fr: "Mobilisateur du genou", ar: null, en: null },
    descriptionPro: { fr: "Attelle pour immobilisation totale ou en extension du genou\n\nIndications :\n• Lésions du ligament (post-traumatique / post-opératoire)\n• lésions du ménisque (post-traumatique / post-opératoire)\n• lésions du tendon (post-traumatique / post-opératoire)\n• Luxation de la rotule\n• fractures dans la région de l'articulation du genou", ar: null, en: null },
    descriptionParticulier: { fr: "Attelle pour immobilisation totale ou en extension du genou", ar: null, en: null },
    taille: null,
    dimension: null,
    // Disponibilité absente des documents fournis : « sur commande » par
    // défaut, à ajuster produit par produit depuis l'administration.
    disponibilite: "sur_commande",
    ficheTechniqueUrl: null,
    images: [],
    variantes: [],
    createdAt: "2026-09-09",
  },
  {
    id: "prod-support-de-cuisse",
    slug: "support-de-cuisse",
    categorieId: "cat-genou-cuisse",
    referenceFournisseur: "PF 52500",
    nom: { fr: "Support de cuisse", ar: null, en: null },
    descriptionPro: { fr: "Manchon de Compression pour Cuisse,\n\nIndications :\n• Douleurs et Entorses\n• Récupération après une blessure ou foulure du genou\n• Inflammation\n• Gonflement des\n• Claquages à l’aine\n• Tendinites", ar: null, en: null },
    descriptionParticulier: { fr: "Manchon de Compression pour Cuisse,", ar: null, en: null },
    taille: null,
    dimension: null,
    // Disponibilité absente des documents fournis : « sur commande » par
    // défaut, à ajuster produit par produit depuis l'administration.
    disponibilite: "sur_commande",
    ficheTechniqueUrl: null,
    images: [],
    variantes: [],
    createdAt: "2026-09-09",
  },
  {
    id: "prod-soutien-de-la-cheville-malleole-pad",
    slug: "soutien-de-la-cheville-malleole-pad",
    categorieId: "cat-cheville-pied",
    referenceFournisseur: "PF 62403",
    nom: { fr: "Soutien de la cheville malléole PAD", ar: null, en: null },
    descriptionPro: { fr: "Chevillière ligamentaire avec support en silicone pour le soulagement et la stabilisation de la cheville\n\nIndications :\n• stabilise la cheville\n• Atténue les douleurs\n• Accélère le phénomène de résorption des œdèmes, épanchements et hématomes\n• Active la musculature de stabilisation\n• Pelotes viscoélastiques protectrices sur la malléole interne et externe\n• Faible pression des bords de l’orthèse afin de prévenir des compressions", ar: null, en: null },
    descriptionParticulier: { fr: "Chevillière ligamentaire avec support en silicone pour le soulagement et la stabilisation de la cheville", ar: null, en: null },
    taille: null,
    dimension: null,
    // Disponibilité absente des documents fournis : « sur commande » par
    // défaut, à ajuster produit par produit depuis l'administration.
    disponibilite: "sur_commande",
    ficheTechniqueUrl: null,
    images: [],
    variantes: [],
    createdAt: "2026-09-09",
  },
  {
    id: "prod-soutien-de-cheville-bandage",
    slug: "soutien-de-cheville-bandage",
    categorieId: "cat-cheville-pied",
    referenceFournisseur: "PF 61401",
    nom: { fr: "Soutien de cheville bandage", ar: null, en: null },
    descriptionPro: { fr: "Bandage de soutien de la cheville qui applique une compression constante sur la cheville pour éliminer l’œdème.\n\nIndications :\n• Les entorses\n• La facilite plantaire\n• La tendinite du péroné et du tibia\n• Les problèmes du talon\n• Les névromes du talon", ar: null, en: null },
    descriptionParticulier: { fr: "Bandage de soutien de la cheville qui applique une compression constante sur la cheville pour éliminer l’œdème.", ar: null, en: null },
    taille: null,
    dimension: null,
    // Disponibilité absente des documents fournis : « sur commande » par
    // défaut, à ajuster produit par produit depuis l'administration.
    disponibilite: "sur_commande",
    ficheTechniqueUrl: null,
    images: [],
    variantes: [],
    createdAt: "2026-09-09",
  },
  {
    id: "prod-soutien-de-la-cheville-plasrique-pad",
    slug: "soutien-de-la-cheville-plasrique-pad",
    categorieId: "cat-cheville-pied",
    referenceFournisseur: "PF 62404",
    nom: { fr: "Soutien de la cheville plastique PAD", ar: null, en: null },
    descriptionPro: { fr: "Orthèse stabilisatrice de la cheville avec des supports en plastique.\n\nIndications :\n• Indiquée pour une utilisation en prévention\n• instabilités chroniques de cheville\n• reprise et pratique du sport\n• traumatisme et entorse de la cheville", ar: null, en: null },
    descriptionParticulier: { fr: "Orthèse stabilisatrice de la cheville avec des supports en plastique.", ar: null, en: null },
    taille: null,
    dimension: null,
    // Disponibilité absente des documents fournis : « sur commande » par
    // défaut, à ajuster produit par produit depuis l'administration.
    disponibilite: "sur_commande",
    ficheTechniqueUrl: null,
    images: [],
    variantes: [],
    createdAt: "2026-09-09",
  },
  {
    id: "prod-chevillere-en-plastique-avec-coussinet-eponge",
    slug: "chevillere-en-plastique-avec-coussinet-eponge",
    categorieId: "cat-cheville-pied",
    referenceFournisseur: "PF 61102",
    nom: { fr: "Chevillère en plastique avec coussinet éponge", ar: null, en: null },
    descriptionPro: { fr: "Support de la cheville en Phase aiguë de l’entorse de gravité légère (stade I) à modérée (stade II)\n\nIndications :\n• Entorse aiguës de la cheville\n• Instabilités chroniques et préventions des récidives\n• Rééducation post-opératoire", ar: null, en: null },
    descriptionParticulier: { fr: "Support de la cheville en Phase aiguë de l’entorse de gravité légère (stade I) à modérée (stade II)", ar: null, en: null },
    taille: null,
    dimension: null,
    // Disponibilité absente des documents fournis : « sur commande » par
    // défaut, à ajuster produit par produit depuis l'administration.
    disponibilite: "sur_commande",
    ficheTechniqueUrl: null,
    images: [],
    variantes: [],
    createdAt: "2026-09-09",
  },
  {
    id: "prod-halux-valgus-atelle-de-nuit",
    slug: "halux-valgus-atelle-de-nuit",
    categorieId: "cat-cheville-pied",
    referenceFournisseur: "PF 630",
    nom: { fr: "Hallux valgus attelle de nuit", ar: null, en: null },
    descriptionPro: { fr: "Permet de réaligner votre gros orteil, de le maintenir droit et de soulager vos douleurs.\n\nIndications :\n• Corrige la déformation du gros orteil\n• Traiter l’hallux valgus (déviation de la base du gros orteil vers l’extérieur)", ar: null, en: null },
    descriptionParticulier: { fr: "Permet de réaligner votre gros orteil, de le maintenir droit et de soulager vos douleurs.", ar: null, en: null },
    taille: null,
    dimension: null,
    // Disponibilité absente des documents fournis : « sur commande » par
    // défaut, à ajuster produit par produit depuis l'administration.
    disponibilite: "sur_commande",
    ficheTechniqueUrl: null,
    images: [],
    variantes: [],
    createdAt: "2026-09-09",
  },
  {
    id: "prod-achilles-chaussures",
    slug: "achilles-chaussures",
    categorieId: "cat-cheville-pied",
    referenceFournisseur: "PF 61104",
    nom: { fr: "Achille chaussures", ar: null, en: null },
    descriptionPro: { fr: "Chaussures de rééducation fixes postopératoires, protection contre la Fracture de la cheville, attelle thérapeutique, bottes d’aide à la marche\n\nIndications :\n• Fracture des malléoles du tibia et du péroné\n• Fractures du pied et de l'avant-pied\n• Immobilisation et stabilisation après des blessures\n• Intervention chirurgicale\n• Traitement postopératoire et post chirurgical de la cheville et du pied\n• Lésions ligamentaires (lésions du LCL/MCL)\n• Lésions des ligaments tibiofibulaires et latéraux", ar: null, en: null },
    descriptionParticulier: { fr: "Chaussures de rééducation fixes postopératoires, protection contre la Fracture de la cheville, attelle thérapeutique, bottes d’aide à la marche", ar: null, en: null },
    taille: null,
    dimension: null,
    // Disponibilité absente des documents fournis : « sur commande » par
    // défaut, à ajuster produit par produit depuis l'administration.
    disponibilite: "sur_commande",
    ficheTechniqueUrl: null,
    images: [
      { id: "achilles-chaussures-1", url: "/produits/61104-c-scaled.jpg", alt: "Achille chaussures" }
    ],
    variantes: [],
    createdAt: "2026-09-09",
  },
  {
    id: "prod-releveur-pied",
    slug: "releveur-pied",
    categorieId: "cat-cheville-pied",
    referenceFournisseur: "PF 61106",
    nom: { fr: "Releveur pied", ar: null, en: null },
    descriptionPro: { fr: "Attelle thermoplastique pour maintien du pied à ongle droit\n\nIndications :\n• Déficit ou paralysie du SPE d’étiologies diverses\n• Tenue du calcanéum\n• Tendinopathie achilléenne\n• Hémiplégie flasque, pied ballant\n• Maintien du pied à angle droit\n• Paralysie traumatique ou neurologique", ar: null, en: null },
    descriptionParticulier: { fr: "Attelle thermoplastique pour maintien du pied à ongle droit", ar: null, en: null },
    taille: null,
    dimension: null,
    // Disponibilité absente des documents fournis : « sur commande » par
    // défaut, à ajuster produit par produit depuis l'administration.
    disponibilite: "sur_commande",
    ficheTechniqueUrl: null,
    images: [],
    variantes: [],
    createdAt: "2026-09-09",
  },
  {
    id: "prod-repose-pied",
    slug: "repose-pied",
    categorieId: "cat-cheville-pied",
    referenceFournisseur: "PF 651",
    nom: { fr: "Repose pied", ar: null, en: null },
    descriptionPro: { fr: "Attelle  pour fasciste plantaire, repose-pied pour le soulagement de la douleur\n\nIndications :\n• contrôle de la position de l’extrémité inférieure chez les patients alités\n• Traitement post-opératoire du genou, de la hanche et des pieds\n• Hémiplégie\n• Paralysie du membre inférieur\n• Douleur chronique de la fasciste plantaire (fasciste plantaire)\n• COLLANTS DE CONTENTION\n• Collant de contention en souple microfibre unisexes pour femme et homme pied ouvert ou fermé\n• Classe 1/ Classe 2/ Classe 3\n• soulager et de prévenir les symptômes veineux : douleur, gonflement et lourdeur au niveau des jambes ;\n• prévenir ou de réduire l’œdème de jambe ;\n• prévenir ou de traiter les complications de la peau liées à une insuffisance veineuse ;\n• aider à la cicatrisation d’un ulcère ;\n• prévenir ou de traiter la phlébite ou thrombose veineuse : caillot de sang dans une veine\n• BAS DE CONTENTION\n• Bas de contention en souple microfibre unisexes pour femme et homme pied ouvert ou fermé\n• Classe 1/ Classe 2/ Classe 3\n• soulager et de prévenir les symptômes veineux : douleur, gonflement et lourdeur au niveau des jambes ;\n• prévenir ou de réduire l’œdème de jambe ;\n• prévenir ou de traiter les complications de la peau liées à une insuffisance veineuse ;\n• aider à la cicatrisation d’un ulcère ;\n• prévenir ou de traiter la phlébite ou thrombose veineuse : caillot de sang dans une veine\n• CHAUSSETTE DE CONTENTION\n• Chaussettes de contention en souple microfibre unisexes pour femme et homme pied ouvert ou fermé\n• Classe 1/ Classe 2/ Classe 3\n• soulager et de prévenir les symptômes veineux : douleur, gonflement et lourdeur au niveau des jambes\n• prévenir ou de réduire l’œdème de jambe\n• prévenir ou de traiter les complications de la peau liées à une insuffisance veineuse\n• aider à la cicatrisation d’un ulcère\n• prévenir ou de traiter la phlébite ou thrombose veineuse : caillot de sang dans une veine", ar: null, en: null },
    descriptionParticulier: { fr: "Attelle  pour fasciste plantaire, repose-pied pour le soulagement de la douleur", ar: null, en: null },
    taille: null,
    dimension: null,
    // Disponibilité absente des documents fournis : « sur commande » par
    // défaut, à ajuster produit par produit depuis l'administration.
    disponibilite: "sur_commande",
    ficheTechniqueUrl: null,
    images: [
      { id: "repose-pied-1", url: "/produits/651-c-scaled.jpg", alt: "Repose pied" }
    ],
    variantes: [],
    createdAt: "2026-09-09",
  },
  {
    id: "prod-bandage-claviculaire",
    slug: "bandage-claviculaire",
    categorieId: "cat-epaule-bras",
    referenceFournisseur: "PF 2310",
    nom: { fr: "Bandage claviculaire", ar: null, en: null },
    descriptionPro: { fr: "Le bandage claviculaire C8 permet l'immobilisation du membre supérieur.\n\nIndications :\n• La faiblesse des muscles omoplate\n• Une mauvaise posture\n• Luxation acromio-claviculaire", ar: null, en: null },
    descriptionParticulier: { fr: "Le bandage claviculaire C8 permet l'immobilisation du membre supérieur.", ar: null, en: null },
    taille: null,
    dimension: null,
    // Disponibilité absente des documents fournis : « sur commande » par
    // défaut, à ajuster produit par produit depuis l'administration.
    disponibilite: "sur_commande",
    ficheTechniqueUrl: null,
    images: [],
    variantes: [],
    createdAt: "2026-09-09",
  },
  {
    id: "prod-puffix-bas-de-contention",
    slug: "puffix-bas-de-contention",
    categorieId: "cat-contention",
    referenceFournisseur: "PF B-C",
    nom: { fr: "Puffix bas de contention", ar: null, en: null },
    descriptionPro: { fr: null, ar: null, en: null },
    descriptionParticulier: { fr: null, ar: null, en: null },
    taille: null,
    dimension: null,
    // Disponibilité absente des documents fournis : « sur commande » par
    // défaut, à ajuster produit par produit depuis l'administration.
    disponibilite: "sur_commande",
    ficheTechniqueUrl: null,
    images: [
      { id: "puffix-bas-de-contention-1", url: "/produits/bas-de-contention-soft-classe-1-pieds-ouverts-9tlfle6ndr79rqmr-1.jpg", alt: "Puffix bas de contention" }
    ],
    variantes: [],
    createdAt: "2026-09-09",
  },
  {
    id: "prod-chaussette-de-contention",
    slug: "chaussette-de-contention",
    categorieId: "cat-contention",
    referenceFournisseur: "PF CH-C",
    nom: { fr: "Chaussette de contention", ar: null, en: null },
    descriptionPro: { fr: null, ar: null, en: null },
    descriptionParticulier: { fr: null, ar: null, en: null },
    taille: null,
    dimension: null,
    // Disponibilité absente des documents fournis : « sur commande » par
    // défaut, à ajuster produit par produit depuis l'administration.
    disponibilite: "sur_commande",
    ficheTechniqueUrl: null,
    images: [],
    variantes: [],
    createdAt: "2026-09-09",
  },
  {
    id: "prod-collants-de-contention",
    slug: "collants-de-contention",
    categorieId: "cat-contention",
    referenceFournisseur: "PF C-C",
    nom: { fr: "Collants de contention", ar: null, en: null },
    descriptionPro: { fr: null, ar: null, en: null },
    descriptionParticulier: { fr: null, ar: null, en: null },
    taille: null,
    dimension: null,
    // Disponibilité absente des documents fournis : « sur commande » par
    // défaut, à ajuster produit par produit depuis l'administration.
    disponibilite: "sur_commande",
    ficheTechniqueUrl: null,
    images: [],
    variantes: [],
    createdAt: "2026-09-09",
  },
  {
    id: "prod-frog-atelle-doigt",
    slug: "frog-atelle-doigt",
    categorieId: "cat-poignet-main",
    referenceFournisseur: "PF 226",
    nom: { fr: "Frog attelle doigt", ar: null, en: null },
    descriptionPro: { fr: "L’attelle grenouille permet d’immobiliser les articulations inter-phalangiennes proximale et distale lors d’un traumatisme aux doigts (fracture, entorse ou luxation…).\n\nIndications :\n• Entorse\n• luxation du doigt\n• immobiliser l'articulation inter-phalangienne proximale et distale", ar: null, en: null },
    descriptionParticulier: { fr: "L’attelle grenouille permet d’immobiliser les articulations inter-phalangiennes proximale et distale lors d’un traumatisme aux doigts (fracture, entorse ou luxation…).", ar: null, en: null },
    taille: null,
    dimension: null,
    // Disponibilité absente des documents fournis : « sur commande » par
    // défaut, à ajuster produit par produit depuis l'administration.
    disponibilite: "sur_commande",
    ficheTechniqueUrl: null,
    images: [],
    variantes: [],
    createdAt: "2026-09-09",
  },
  {
    id: "prod-baseball-atelle-doigt",
    slug: "baseball-atelle-doigt",
    categorieId: "cat-poignet-main",
    referenceFournisseur: "PF 225",
    nom: { fr: "Baseball attelle doigt", ar: null, en: null },
    descriptionPro: { fr: "Attelle en aluminium capitonnée facilement ajustable pour immobilisation d’un de vos doigts\n\nIndications :\n• Immobilisation des phalanges proximales et distales avec une grande stabilité\n• Traumatisme et plaies distales des doigts\n• pour le confort du patient", ar: null, en: null },
    descriptionParticulier: { fr: "Attelle en aluminium capitonnée facilement ajustable pour immobilisation d’un de vos doigts", ar: null, en: null },
    taille: null,
    dimension: null,
    // Disponibilité absente des documents fournis : « sur commande » par
    // défaut, à ajuster produit par produit depuis l'administration.
    disponibilite: "sur_commande",
    ficheTechniqueUrl: null,
    images: [],
    variantes: [],
    createdAt: "2026-09-09",
  },
  {
    id: "prod-atelle-de-doigt-en-alluminium",
    slug: "atelle-de-doigt-en-alluminium",
    categorieId: "cat-poignet-main",
    referenceFournisseur: "PF 227",
    nom: { fr: "Attelle de doigt en aluminium", ar: null, en: null },
    descriptionPro: { fr: "Attelles en aluminium qui permet d’immobiliser temporairement le doigt\n\nIndications :\n• en cas d’entorse\n• en cas de fracture\n• Sur une plaie ouverte grâce à sa mousse absorbante", ar: null, en: null },
    descriptionParticulier: { fr: "Attelles en aluminium qui permet d’immobiliser temporairement le doigt", ar: null, en: null },
    taille: null,
    dimension: null,
    // Disponibilité absente des documents fournis : « sur commande » par
    // défaut, à ajuster produit par produit depuis l'administration.
    disponibilite: "sur_commande",
    ficheTechniqueUrl: null,
    images: [],
    variantes: [],
    createdAt: "2026-09-09",
  },
  {
    id: "prod-mallet-de-doigt",
    slug: "mallet-de-doigt",
    categorieId: "cat-poignet-main",
    referenceFournisseur: "PF 229",
    nom: { fr: "Mallet de doigt", ar: null, en: null },
    descriptionPro: { fr: "Attelle pour Immobilisation de l’articulation distale.\n\nIndications :\n• Fracture et contusions\n• Rupture des tendons\n• Déformation des doigts\n• DYNAMIQUE ATELLE DE DOIGT PF 224\n• Attelle de doigt  pour aider l'extension du 1er inter phalangien avec une extension minimum de l'articulation MCP\n• Pour la  raideur de l'IPP et de syndrome de la boutonnière\n• Pour la limitation des articulations PIP de 45° ou moins", ar: null, en: null },
    descriptionParticulier: { fr: "Attelle pour Immobilisation de l’articulation distale.", ar: null, en: null },
    taille: null,
    dimension: null,
    // Disponibilité absente des documents fournis : « sur commande » par
    // défaut, à ajuster produit par produit depuis l'administration.
    disponibilite: "sur_commande",
    ficheTechniqueUrl: null,
    images: [],
    variantes: [],
    createdAt: "2026-09-09",
  },
  {
    id: "prod-dynamique-atelle-doigt",
    slug: "dynamique-atelle-doigt",
    categorieId: "cat-poignet-main",
    referenceFournisseur: "PF 224",
    nom: { fr: "Dynamique attelle doigt", ar: null, en: null },
    descriptionPro: { fr: null, ar: null, en: null },
    descriptionParticulier: { fr: null, ar: null, en: null },
    taille: null,
    dimension: null,
    // Disponibilité absente des documents fournis : « sur commande » par
    // défaut, à ajuster produit par produit depuis l'administration.
    disponibilite: "sur_commande",
    ficheTechniqueUrl: null,
    images: [],
    variantes: [],
    createdAt: "2026-09-09",
  },
  {
    id: "prod-orthopedique-donut-oreiller",
    slug: "orthopedique-donut-oreiller",
    categorieId: "cat-coussins",
    referenceFournisseur: "PF 5314",
    nom: { fr: "Orthopédique Donut oreiller", ar: null, en: null },
    descriptionPro: { fr: "Coussin polypore percé, en gel polyuréthane viscoélastique anti esscare\n\nIndications :\n• Anti escarre\n• Apres opérations\n• protéger le fessier, une zone à risque chez la personne âgée,\n• Faciliter la circulation sanguine", ar: null, en: null },
    descriptionParticulier: { fr: "Coussin polypore percé, en gel polyuréthane viscoélastique anti esscare", ar: null, en: null },
    taille: null,
    dimension: null,
    // Disponibilité absente des documents fournis : « sur commande » par
    // défaut, à ajuster produit par produit depuis l'administration.
    disponibilite: "sur_commande",
    ficheTechniqueUrl: null,
    images: [],
    variantes: [],
    createdAt: "2026-09-09",
  },
  {
    id: "prod-oreiller-orthopedique-visco-mousse",
    slug: "oreiller-orthopedique-visco-mousse",
    categorieId: "cat-coussins",
    referenceFournisseur: "PF 5025",
    nom: { fr: "Oreiller orthopédique visco-mousse", ar: null, en: null },
    descriptionPro: { fr: "(60*40*10*8)  Oreiller orthopédique en mousse à mémoire de forme pour le cou, pour dormir, pour les cervicales, pour douleurs cervicales, en bambou\n\nIndications :\n• Soulager les cervicales\n• les tensions des muscles dorsaux\n• Traumatisme cervicale\n• spondyles cervicale ou d'autres douleurs chroniques au cou et à la nuque", ar: null, en: null },
    descriptionParticulier: { fr: "(60*40*10*8)  Oreiller orthopédique en mousse à mémoire de forme pour le cou, pour dormir, pour les cervicales, pour douleurs cervicales, en bambou", ar: null, en: null },
    taille: null,
    dimension: null,
    // Disponibilité absente des documents fournis : « sur commande » par
    // défaut, à ajuster produit par produit depuis l'administration.
    disponibilite: "sur_commande",
    ficheTechniqueUrl: null,
    images: [],
    variantes: [],
    createdAt: "2026-09-09",
  },
  {
    id: "prod-coussin-agronomique-pour-le-coccyx",
    slug: "coussin-agronomique-pour-le-coccyx",
    categorieId: "cat-coussins",
    referenceFournisseur: "PF",
    nom: { fr: "Coussin ergonomique pour le coccyx", ar: null, en: null },
    descriptionPro: { fr: "Coussin à mémoire en mousse pour une assise idéale. Dimension: 42 x 40 x 9 cm.\n\nIndications :\n• soulage la zone du coccyx\n• assure un meilleur confort d’assise\n• Évitant le mal de dos\n• Soulagement lombaire\n• PUFFIX COUSSIN DE RETOURNEMENT\n• Appareil de retournement en forme de U Multifonction pour les personnes alitées et les personnes âgées\n• Allaitement\n• Retournement,\n• Anti-escarres\n• Favorise la circulation sanguine\n• Facilite la propreté du patient, comme le changement de la couche ou des vêtements", ar: null, en: null },
    descriptionParticulier: { fr: "Coussin à mémoire en mousse pour une assise idéale. Dimension: 42 x 40 x 9 cm.", ar: null, en: null },
    taille: null,
    dimension: null,
    // Disponibilité absente des documents fournis : « sur commande » par
    // défaut, à ajuster produit par produit depuis l'administration.
    disponibilite: "sur_commande",
    ficheTechniqueUrl: null,
    images: [],
    variantes: [],
    createdAt: "2026-09-09",
  },
  {
    id: "prod-coussin-de-retournement",
    slug: "coussin-de-retournement",
    categorieId: "cat-coussins",
    referenceFournisseur: "PF",
    nom: { fr: "Coussin de retournement", ar: null, en: null },
    descriptionPro: { fr: null, ar: null, en: null },
    descriptionParticulier: { fr: null, ar: null, en: null },
    taille: null,
    dimension: null,
    // Disponibilité absente des documents fournis : « sur commande » par
    // défaut, à ajuster produit par produit depuis l'administration.
    disponibilite: "sur_commande",
    ficheTechniqueUrl: null,
    images: [],
    variantes: [],
    createdAt: "2026-09-09",
  },
  {
    id: "prod-coussin-anti-reflux",
    slug: "coussin-anti-reflux",
    categorieId: "cat-coussins",
    referenceFournisseur: "PF 3314",
    nom: { fr: "Coussin anti-reflux", ar: null, en: null },
    descriptionPro: { fr: "Oreiller anti Reflux gastrique\n\nIndications :\n• Problèmes de digestion\n• Problèmes de respiration la nuit", ar: null, en: null },
    descriptionParticulier: { fr: "Oreiller anti Reflux gastrique", ar: null, en: null },
    taille: null,
    dimension: null,
    // Disponibilité absente des documents fournis : « sur commande » par
    // défaut, à ajuster produit par produit depuis l'administration.
    disponibilite: "sur_commande",
    ficheTechniqueUrl: null,
    images: [],
    variantes: [],
    createdAt: "2026-09-09",
  },
  {
    id: "prod-immobilisation-du-poignet",
    slug: "immobilisation-du-poignet",
    categorieId: "cat-poignet-main",
    referenceFournisseur: "PF 221-L",
    nom: { fr: "Immobilisation du poignet", ar: null, en: null },
    descriptionPro: { fr: "Attelle d’immobilisation de poignet avec brettelles\n\nIndications :\n• Syndrome du canal carpien\n• Colle fracture\n• Utilisation post chirurgicale", ar: null, en: null },
    descriptionParticulier: { fr: "Attelle d’immobilisation de poignet avec brettelles", ar: null, en: null },
    taille: null,
    dimension: null,
    // Disponibilité absente des documents fournis : « sur commande » par
    // défaut, à ajuster produit par produit depuis l'administration.
    disponibilite: "sur_commande",
    ficheTechniqueUrl: null,
    images: [
      { id: "immobilisation-du-poignet-1", url: "/produits/dsc-7360puffix2013-400x400-1-e1593257371975.gif", alt: "Immobilisation du poignet" }
    ],
    variantes: [],
    createdAt: "2026-09-09",
  },
  {
    id: "prod-epicoldylite-bandage",
    slug: "epicoldylite-bandage",
    categorieId: "cat-coude",
    referenceFournisseur: "PF 22303",
    nom: { fr: "Épicondylite bandage", ar: null, en: null },
    descriptionPro: { fr: "Coussinet Sans silicone qui assure une compression pour aider à soulager la douleur et l’inconfort du coude des joueurs de tennis\n\nIndications :\n• Coude des joueurs de tennis\n• Coude des Golfeurs\n• Comprime les tissus mous\n• Soulage la tension sur les tissus péri articulaires\n• Rapidement résorber un hématome ou un œdème", ar: null, en: null },
    descriptionParticulier: { fr: "Coussinet Sans silicone qui assure une compression pour aider à soulager la douleur et l’inconfort du coude des joueurs de tennis", ar: null, en: null },
    taille: null,
    dimension: null,
    // Disponibilité absente des documents fournis : « sur commande » par
    // défaut, à ajuster produit par produit depuis l'administration.
    disponibilite: "sur_commande",
    ficheTechniqueUrl: null,
    images: [],
    variantes: [],
    createdAt: "2026-09-09",
  },
  {
    id: "prod-corset-hyperextension",
    slug: "corset-hyperextension",
    categorieId: "cat-dos-abdomen",
    referenceFournisseur: "PF 31001",
    nom: { fr: "Corset hyperextension", ar: null, en: null },
    descriptionPro: { fr: "Orthèse en aluminium spéciale limite la flexion du corps et favorise la posture d’hyper extension\n\nIndications :\n• Fracture vertébrale et les traumatismes\n• Fractures de compression liées à l’ostéoporose\n• Cyphoses\n• Réhabilitation postopératoires\n• Fractures stables dans la colonne vertébrale lombaire et thoracique inférieure\n• Fractures de compression\n• Ostéoporoses", ar: null, en: null },
    descriptionParticulier: { fr: "Orthèse en aluminium spéciale limite la flexion du corps et favorise la posture d’hyper extension", ar: null, en: null },
    taille: null,
    dimension: null,
    // Disponibilité absente des documents fournis : « sur commande » par
    // défaut, à ajuster produit par produit depuis l'administration.
    disponibilite: "sur_commande",
    ficheTechniqueUrl: null,
    images: [],
    variantes: [],
    createdAt: "2026-09-09",
  },
  {
    id: "prod-corset-hyperextension-3points",
    slug: "corset-hyperextension-3points",
    categorieId: "cat-dos-abdomen",
    referenceFournisseur: "PF 31002",
    nom: { fr: "Corset hyperextension 3 points", ar: null, en: null },
    descriptionPro: { fr: "Orthèse en aluminium spéciale au système des 3 points.\n\nIndications :\n• Fractures par compression stables des vertèbres thoraciques lombaires moyennes et inférieures\n• En hyperphose de la maladie de Schuurman\n• Dans le traitement conservateur des fractures du corps vertébral non adaptées à une opération de la colonne lombaire et thoracique\n• Il est utilisé dans le traitement postopératoire temporaire", ar: null, en: null },
    descriptionParticulier: { fr: "Orthèse en aluminium spéciale au système des 3 points.", ar: null, en: null },
    taille: null,
    dimension: null,
    // Disponibilité absente des documents fournis : « sur commande » par
    // défaut, à ajuster produit par produit depuis l'administration.
    disponibilite: "sur_commande",
    ficheTechniqueUrl: null,
    images: [],
    variantes: [],
    createdAt: "2026-09-09",
  },
  {
    id: "prod-corset-hyperextension-4-points",
    slug: "corset-hyperextension-4-points",
    categorieId: "cat-dos-abdomen",
    referenceFournisseur: "PF 31003",
    nom: { fr: "Corset hyperextension 4 points", ar: null, en: null },
    descriptionPro: { fr: "Orthèse en aluminium spéciale pour limiter la flexion du corps et favoriser la position d’hyper extension\n\nIndications :\n• Fractures et traumatismes de la colonne vertébrale\n• L’ostéoporose\n• Cyphose\n• Rééducation après intervention chirurgical\n• Fractures fixes dans le thorax inférieur et la région lombaire", ar: null, en: null },
    descriptionParticulier: { fr: "Orthèse en aluminium spéciale pour limiter la flexion du corps et favoriser la position d’hyper extension", ar: null, en: null },
    taille: null,
    dimension: null,
    // Disponibilité absente des documents fournis : « sur commande » par
    // défaut, à ajuster produit par produit depuis l'administration.
    disponibilite: "sur_commande",
    ficheTechniqueUrl: null,
    images: [],
    variantes: [],
    createdAt: "2026-09-09",
  },
  {
    id: "prod-support-genou-articule-std",
    slug: "support-genou-articule-std",
    categorieId: "cat-genou-cuisse",
    referenceFournisseur: "PF 57004",
    nom: { fr: "Support genou articulé STD", ar: null, en: null },
    descriptionPro: { fr: "Support orthopédique articulé avec des soutiens  en métal pour le genou, fixateur correcteur de Posture, Fracture de la rotule, protecteur du genou, soins osseux\n\nIndications :\n• Traitement de différents problèmes reliés à la rotule dont la chondromalacie, la tendinite, la subluxation ou la dislocation de celle-ci\n• Pratique sportive: sport de raquette, sports de ballon, jogging, vélo\n• Travaux lourds\n• Marche", ar: null, en: null },
    descriptionParticulier: { fr: "Support orthopédique articulé avec des soutiens  en métal pour le genou, fixateur correcteur de Posture, Fracture de la rotule, protecteur du genou, soins osseux", ar: null, en: null },
    taille: null,
    dimension: null,
    // Disponibilité absente des documents fournis : « sur commande » par
    // défaut, à ajuster produit par produit depuis l'administration.
    disponibilite: "sur_commande",
    ficheTechniqueUrl: null,
    images: [],
    variantes: [],
    createdAt: "2026-09-09",
  },
  {
    id: "prod-fauteuil-roulant-de-luxe",
    slug: "fauteuil-roulant-de-luxe",
    categorieId: "cat-aide-marche",
    referenceFournisseur: "AM-01",
    nom: { fr: "Fauteuil roulant de luxe", ar: null, en: null },
    descriptionPro: { fr: null, ar: null, en: null },
    descriptionParticulier: { fr: null, ar: null, en: null },
    taille: null,
    dimension: null,
    // Disponibilité absente des documents fournis : « sur commande » par
    // défaut, à ajuster produit par produit depuis l'administration.
    disponibilite: "sur_commande",
    ficheTechniqueUrl: null,
    images: [
      { id: "fauteuil-roulant-de-luxe-1", url: "/produits/1.webp", alt: "Fauteuil roulant de luxe" }
    ],
    variantes: [],
    createdAt: "2026-09-09",
  },
  {
    id: "prod-fauteuil-roulant-manuel-adulte",
    slug: "fauteuil-roulant-manuel-adulte",
    categorieId: "cat-aide-marche",
    referenceFournisseur: "AM-02",
    nom: { fr: "Fauteuil roulant manuel adulte", ar: null, en: null },
    descriptionPro: { fr: null, ar: null, en: null },
    descriptionParticulier: { fr: null, ar: null, en: null },
    taille: null,
    dimension: null,
    // Disponibilité absente des documents fournis : « sur commande » par
    // défaut, à ajuster produit par produit depuis l'administration.
    disponibilite: "sur_commande",
    ficheTechniqueUrl: null,
    images: [
      { id: "fauteuil-roulant-manuel-adulte-1", url: "/produits/2.webp", alt: "Fauteuil roulant manuel adulte" },
      { id: "fauteuil-roulant-manuel-adulte-2", url: "/produits/fauteuil-roulant.png", alt: "Fauteuil roulant manuel adulte" }
    ],
    variantes: [],
    createdAt: "2026-09-09",
  },
  {
    id: "prod-fauteuil-roulant-manuel-enfant",
    slug: "fauteuil-roulant-manuel-enfant",
    categorieId: "cat-aide-marche",
    referenceFournisseur: "AM-03",
    nom: { fr: "Fauteuil roulant manuel enfant", ar: null, en: null },
    descriptionPro: { fr: null, ar: null, en: null },
    descriptionParticulier: { fr: null, ar: null, en: null },
    taille: null,
    dimension: null,
    // Disponibilité absente des documents fournis : « sur commande » par
    // défaut, à ajuster produit par produit depuis l'administration.
    disponibilite: "sur_commande",
    ficheTechniqueUrl: null,
    images: [
      { id: "fauteuil-roulant-manuel-enfant-1", url: "/produits/3.webp", alt: "Fauteuil roulant manuel enfant" }
    ],
    variantes: [],
    createdAt: "2026-09-09",
  },
  {
    id: "prod-rollateur-en-aluminium-a-4-roues-avec-assise",
    slug: "rollateur-en-aluminium-a-4-roues-avec-assise",
    categorieId: "cat-aide-marche",
    referenceFournisseur: "AM-04",
    nom: { fr: "Rollateur en aluminium à 4 roues avec assise", ar: null, en: null },
    descriptionPro: { fr: null, ar: null, en: null },
    descriptionParticulier: { fr: null, ar: null, en: null },
    taille: null,
    dimension: null,
    // Disponibilité absente des documents fournis : « sur commande » par
    // défaut, à ajuster produit par produit depuis l'administration.
    disponibilite: "sur_commande",
    ficheTechniqueUrl: null,
    images: [
      { id: "rollateur-en-aluminium-a-4-roues-avec-assise-1", url: "/produits/4.webp", alt: "Rollateur en aluminium à 4 roues avec assise" }
    ],
    variantes: [],
    createdAt: "2026-09-09",
  },
  {
    id: "prod-rollateur-en-aluminium-a-2-roues-avec-assise",
    slug: "rollateur-en-aluminium-a-2-roues-avec-assise",
    categorieId: "cat-aide-marche",
    referenceFournisseur: "AM-05",
    nom: { fr: "Rollateur en aluminium à 2 roues avec assise", ar: null, en: null },
    descriptionPro: { fr: null, ar: null, en: null },
    descriptionParticulier: { fr: null, ar: null, en: null },
    taille: null,
    dimension: null,
    // Disponibilité absente des documents fournis : « sur commande » par
    // défaut, à ajuster produit par produit depuis l'administration.
    disponibilite: "sur_commande",
    ficheTechniqueUrl: null,
    images: [
      { id: "rollateur-en-aluminium-a-2-roues-avec-assise-1", url: "/produits/5.jpg", alt: "Rollateur en aluminium à 2 roues avec assise" }
    ],
    variantes: [],
    createdAt: "2026-09-09",
  },
  {
    id: "prod-deambulateur-sans-roues-pliable",
    slug: "deambulateur-sans-roues-pliable",
    categorieId: "cat-aide-marche",
    referenceFournisseur: "AM-06",
    nom: { fr: "Déambulateur sans roues pliable", ar: null, en: null },
    descriptionPro: { fr: null, ar: null, en: null },
    descriptionParticulier: { fr: null, ar: null, en: null },
    taille: null,
    dimension: null,
    // Disponibilité absente des documents fournis : « sur commande » par
    // défaut, à ajuster produit par produit depuis l'administration.
    disponibilite: "sur_commande",
    ficheTechniqueUrl: null,
    images: [
      { id: "deambulateur-sans-roues-pliable-1", url: "/produits/6.jpg", alt: "Déambulateur sans roues pliable" }
    ],
    variantes: [],
    createdAt: "2026-09-09",
  },
  {
    id: "prod-deambulateur-avec-roues-pliable",
    slug: "deambulateur-avec-roues-pliable",
    categorieId: "cat-aide-marche",
    referenceFournisseur: "AM-07",
    nom: { fr: "Déambulateur avec roues pliable", ar: null, en: null },
    descriptionPro: { fr: null, ar: null, en: null },
    descriptionParticulier: { fr: null, ar: null, en: null },
    taille: null,
    dimension: null,
    // Disponibilité absente des documents fournis : « sur commande » par
    // défaut, à ajuster produit par produit depuis l'administration.
    disponibilite: "sur_commande",
    ficheTechniqueUrl: null,
    images: [
      { id: "deambulateur-avec-roues-pliable-1", url: "/produits/7.webp", alt: "Déambulateur avec roues pliable" }
    ],
    variantes: [],
    createdAt: "2026-09-09",
  },
  {
    id: "prod-chaise-daisance",
    slug: "chaise-daisance",
    categorieId: "cat-aide-marche",
    referenceFournisseur: "AM-08",
    nom: { fr: "Chaise d’aisance", ar: null, en: null },
    descriptionPro: { fr: null, ar: null, en: null },
    descriptionParticulier: { fr: null, ar: null, en: null },
    taille: null,
    dimension: null,
    // Disponibilité absente des documents fournis : « sur commande » par
    // défaut, à ajuster produit par produit depuis l'administration.
    disponibilite: "sur_commande",
    ficheTechniqueUrl: null,
    images: [
      { id: "chaise-daisance-1", url: "/produits/8.gif", alt: "Chaise d’aisance" }
    ],
    variantes: [],
    createdAt: "2026-09-09",
  },
  {
    id: "prod-bequilles-en-aluminium-tailles-s-m-l",
    slug: "bequilles-en-aluminium-tailles-s-m-l",
    categorieId: "cat-aide-marche",
    referenceFournisseur: "AM-09",
    nom: { fr: "Béquilles en aluminium, tailles S / M / L", ar: null, en: null },
    descriptionPro: { fr: null, ar: null, en: null },
    descriptionParticulier: { fr: null, ar: null, en: null },
    taille: null,
    dimension: null,
    // Disponibilité absente des documents fournis : « sur commande » par
    // défaut, à ajuster produit par produit depuis l'administration.
    disponibilite: "sur_commande",
    ficheTechniqueUrl: null,
    images: [
      { id: "bequilles-en-aluminium-tailles-s-m-l-1", url: "/produits/9.webp", alt: "Béquilles en aluminium, tailles S / M / L" },
      { id: "bequilles-en-aluminium-tailles-s-m-l-2", url: "/produits/bequilles-cannes.png", alt: "Béquilles en aluminium, tailles S / M / L" }
    ],
    variantes: [],
    createdAt: "2026-09-09",
  },
  {
    id: "prod-canne-canadienne-reglable",
    slug: "canne-canadienne-reglable",
    categorieId: "cat-aide-marche",
    referenceFournisseur: "AM-10",
    nom: { fr: "Canne canadienne réglable", ar: null, en: null },
    descriptionPro: { fr: null, ar: null, en: null },
    descriptionParticulier: { fr: null, ar: null, en: null },
    taille: null,
    dimension: null,
    // Disponibilité absente des documents fournis : « sur commande » par
    // défaut, à ajuster produit par produit depuis l'administration.
    disponibilite: "sur_commande",
    ficheTechniqueUrl: null,
    images: [
      { id: "canne-canadienne-reglable-1", url: "/produits/10.webp", alt: "Canne canadienne réglable" }
    ],
    variantes: [],
    createdAt: "2026-09-09",
  },
  {
    id: "prod-canne-a-trois-pieds-reglable",
    slug: "canne-a-trois-pieds-reglable",
    categorieId: "cat-aide-marche",
    referenceFournisseur: "AM-11",
    nom: { fr: "Canne à trois pieds réglable", ar: null, en: null },
    descriptionPro: { fr: null, ar: null, en: null },
    descriptionParticulier: { fr: null, ar: null, en: null },
    taille: null,
    dimension: null,
    // Disponibilité absente des documents fournis : « sur commande » par
    // défaut, à ajuster produit par produit depuis l'administration.
    disponibilite: "sur_commande",
    ficheTechniqueUrl: null,
    images: [
      { id: "canne-a-trois-pieds-reglable-1", url: "/produits/11.webp", alt: "Canne à trois pieds réglable" }
    ],
    variantes: [],
    createdAt: "2026-09-09",
  },
  {
    id: "prod-canne-de-marche-pour-personne-agee",
    slug: "canne-de-marche-pour-personne-agee",
    categorieId: "cat-aide-marche",
    referenceFournisseur: "AM-12",
    nom: { fr: "Canne de marche pour personne âgée", ar: null, en: null },
    descriptionPro: { fr: null, ar: null, en: null },
    descriptionParticulier: { fr: null, ar: null, en: null },
    taille: null,
    dimension: null,
    // Disponibilité absente des documents fournis : « sur commande » par
    // défaut, à ajuster produit par produit depuis l'administration.
    disponibilite: "sur_commande",
    ficheTechniqueUrl: null,
    images: [
      { id: "canne-de-marche-pour-personne-agee-1", url: "/produits/12.webp", alt: "Canne de marche pour personne âgée" }
    ],
    variantes: [],
    createdAt: "2026-09-09",
  },
  {
    id: "prod-canne-pliable",
    slug: "canne-pliable",
    categorieId: "cat-aide-marche",
    referenceFournisseur: "AM-13",
    nom: { fr: "Canne pliable", ar: null, en: null },
    descriptionPro: { fr: null, ar: null, en: null },
    descriptionParticulier: { fr: null, ar: null, en: null },
    taille: null,
    dimension: null,
    // Disponibilité absente des documents fournis : « sur commande » par
    // défaut, à ajuster produit par produit depuis l'administration.
    disponibilite: "sur_commande",
    ficheTechniqueUrl: null,
    images: [
      { id: "canne-pliable-1", url: "/produits/13.jpg", alt: "Canne pliable" }
    ],
    variantes: [],
    createdAt: "2026-09-09",
  },
  {
    id: "prod-canne-pour-personne-non-voyante-ou-malvoyante",
    slug: "canne-pour-personne-non-voyante-ou-malvoyante",
    categorieId: "cat-aide-marche",
    referenceFournisseur: "AM-14",
    nom: { fr: "Canne pour personne non voyante ou malvoyante", ar: null, en: null },
    descriptionPro: { fr: null, ar: null, en: null },
    descriptionParticulier: { fr: null, ar: null, en: null },
    taille: null,
    dimension: null,
    // Disponibilité absente des documents fournis : « sur commande » par
    // défaut, à ajuster produit par produit depuis l'administration.
    disponibilite: "sur_commande",
    ficheTechniqueUrl: null,
    images: [
      { id: "canne-pour-personne-non-voyante-ou-malvoyante-1", url: "/produits/14.jpg", alt: "Canne pour personne non voyante ou malvoyante" }
    ],
    variantes: [],
    createdAt: "2026-09-09",
  },
  {
    id: "prod-semelle-orthopedique-en-silicone",
    slug: "semelle-orthopedique-en-silicone",
    categorieId: "cat-podologie",
    referenceFournisseur: "PO-100",
    nom: { fr: "Semelle orthopédique en silicone", ar: null, en: null },
    descriptionPro: { fr: null, ar: null, en: null },
    descriptionParticulier: { fr: null, ar: null, en: null },
    taille: null,
    dimension: null,
    // Disponibilité absente des documents fournis : « sur commande » par
    // défaut, à ajuster produit par produit depuis l'administration.
    disponibilite: "sur_commande",
    ficheTechniqueUrl: null,
    images: [
      { id: "semelle-orthopedique-en-silicone-1", url: "/produits/100.webp", alt: "Semelle orthopédique en silicone" },
      { id: "semelle-orthopedique-en-silicone-2", url: "/produits/682.jpg", alt: "Semelle orthopédique en silicone" }
    ],
    variantes: [],
    createdAt: "2026-09-09",
  },
  {
    id: "prod-semelle-orthopedique-a-voute-plantaire",
    slug: "semelle-orthopedique-a-voute-plantaire",
    categorieId: "cat-podologie",
    referenceFournisseur: "PO-111",
    nom: { fr: "Semelle orthopédique à voûte plantaire", ar: null, en: null },
    descriptionPro: { fr: null, ar: null, en: null },
    descriptionParticulier: { fr: null, ar: null, en: null },
    taille: null,
    dimension: null,
    // Disponibilité absente des documents fournis : « sur commande » par
    // défaut, à ajuster produit par produit depuis l'administration.
    disponibilite: "sur_commande",
    ficheTechniqueUrl: null,
    images: [
      { id: "semelle-orthopedique-a-voute-plantaire-1", url: "/produits/111.webp", alt: "Semelle orthopédique à voûte plantaire" }
    ],
    variantes: [],
    createdAt: "2026-09-09",
  },
  {
    id: "prod-talonnette-orthopedique-en-silicone",
    slug: "talonnette-orthopedique-en-silicone",
    categorieId: "cat-podologie",
    referenceFournisseur: "PO-112",
    nom: { fr: "Talonnette orthopédique en silicone", ar: null, en: null },
    descriptionPro: { fr: null, ar: null, en: null },
    descriptionParticulier: { fr: null, ar: null, en: null },
    taille: null,
    dimension: null,
    // Disponibilité absente des documents fournis : « sur commande » par
    // défaut, à ajuster produit par produit depuis l'administration.
    disponibilite: "sur_commande",
    ficheTechniqueUrl: null,
    images: [
      { id: "talonnette-orthopedique-en-silicone-1", url: "/produits/112.jpg", alt: "Talonnette orthopédique en silicone" }
    ],
    variantes: [],
    createdAt: "2026-09-09",
  },
  {
    id: "prod-talonnette-pour-epine-calcaneenne",
    slug: "talonnette-pour-epine-calcaneenne",
    categorieId: "cat-podologie",
    referenceFournisseur: "PO-113",
    nom: { fr: "Talonnette pour épine calcanéenne", ar: null, en: null },
    descriptionPro: { fr: null, ar: null, en: null },
    descriptionParticulier: { fr: null, ar: null, en: null },
    taille: null,
    dimension: null,
    // Disponibilité absente des documents fournis : « sur commande » par
    // défaut, à ajuster produit par produit depuis l'administration.
    disponibilite: "sur_commande",
    ficheTechniqueUrl: null,
    images: [
      { id: "talonnette-pour-epine-calcaneenne-1", url: "/produits/113.jpg", alt: "Talonnette pour épine calcanéenne" }
    ],
    variantes: [],
    createdAt: "2026-09-09",
  },
  {
    id: "prod-coussinet-metatarsien",
    slug: "coussinet-metatarsien",
    categorieId: "cat-podologie",
    referenceFournisseur: "PO-114",
    nom: { fr: "Coussinet métatarsien", ar: null, en: null },
    descriptionPro: { fr: null, ar: null, en: null },
    descriptionParticulier: { fr: null, ar: null, en: null },
    taille: null,
    dimension: null,
    // Disponibilité absente des documents fournis : « sur commande » par
    // défaut, à ajuster produit par produit depuis l'administration.
    disponibilite: "sur_commande",
    ficheTechniqueUrl: null,
    images: [
      { id: "coussinet-metatarsien-1", url: "/produits/114.jpg", alt: "Coussinet métatarsien" }
    ],
    variantes: [],
    createdAt: "2026-09-09",
  },
  {
    id: "prod-separateur-dorteil",
    slug: "separateur-dorteil",
    categorieId: "cat-podologie",
    referenceFournisseur: "PO-115",
    nom: { fr: "Séparateur d’orteil", ar: null, en: null },
    descriptionPro: { fr: null, ar: null, en: null },
    descriptionParticulier: { fr: null, ar: null, en: null },
    taille: null,
    dimension: null,
    // Disponibilité absente des documents fournis : « sur commande » par
    // défaut, à ajuster produit par produit depuis l'administration.
    disponibilite: "sur_commande",
    ficheTechniqueUrl: null,
    images: [
      { id: "separateur-dorteil-1", url: "/produits/115.webp", alt: "Séparateur d’orteil" }
    ],
    variantes: [],
    createdAt: "2026-09-09",
  },
  {
    id: "prod-protecteur-hallux-valgus-avec-ecarteur-dorteil",
    slug: "protecteur-hallux-valgus-avec-ecarteur-dorteil",
    categorieId: "cat-podologie",
    referenceFournisseur: "PO-116",
    nom: { fr: "Protecteur hallux valgus avec écarteur d’orteil", ar: null, en: null },
    descriptionPro: { fr: null, ar: null, en: null },
    descriptionParticulier: { fr: null, ar: null, en: null },
    taille: null,
    dimension: null,
    // Disponibilité absente des documents fournis : « sur commande » par
    // défaut, à ajuster produit par produit depuis l'administration.
    disponibilite: "sur_commande",
    ficheTechniqueUrl: null,
    images: [
      { id: "protecteur-hallux-valgus-avec-ecarteur-dorteil-1", url: "/produits/116.webp", alt: "Protecteur hallux valgus avec écarteur d’orteil" }
    ],
    variantes: [],
    createdAt: "2026-09-09",
  },
  {
    id: "prod-chaussure-a-platre",
    slug: "chaussure-a-platre",
    categorieId: "cat-podologie",
    referenceFournisseur: "PO-117",
    nom: { fr: "Chaussure à plâtre", ar: null, en: null },
    descriptionPro: { fr: null, ar: null, en: null },
    descriptionParticulier: { fr: null, ar: null, en: null },
    taille: null,
    dimension: null,
    // Disponibilité absente des documents fournis : « sur commande » par
    // défaut, à ajuster produit par produit depuis l'administration.
    disponibilite: "sur_commande",
    ficheTechniqueUrl: null,
    images: [
      { id: "chaussure-a-platre-1", url: "/produits/117.jpg", alt: "Chaussure à plâtre" }
    ],
    variantes: [],
    createdAt: "2026-09-09",
  },
  {
    id: "prod-tensiometre-electronique-au-bras",
    slug: "tensiometre-electronique-au-bras",
    categorieId: "cat-diagnostic",
    referenceFournisseur: "DI-01",
    nom: { fr: "Tensiomètre électronique au bras", ar: null, en: null },
    descriptionPro: { fr: null, ar: null, en: null },
    descriptionParticulier: { fr: null, ar: null, en: null },
    taille: null,
    dimension: null,
    // Disponibilité absente des documents fournis : « sur commande » par
    // défaut, à ajuster produit par produit depuis l'administration.
    disponibilite: "sur_commande",
    ficheTechniqueUrl: null,
    images: [
      { id: "tensiometre-electronique-au-bras-1", url: "/produits/tensiometre-a-bras-1-1.jpg", alt: "Tensiomètre électronique au bras" }
    ],
    variantes: [],
    createdAt: "2026-09-09",
  },
  {
    id: "prod-thermometre-medical-digital",
    slug: "thermometre-medical-digital",
    categorieId: "cat-diagnostic",
    referenceFournisseur: "DI-02",
    nom: { fr: "Thermomètre médical digital", ar: null, en: null },
    descriptionPro: { fr: null, ar: null, en: null },
    descriptionParticulier: { fr: null, ar: null, en: null },
    taille: null,
    dimension: null,
    // Disponibilité absente des documents fournis : « sur commande » par
    // défaut, à ajuster produit par produit depuis l'administration.
    disponibilite: "sur_commande",
    ficheTechniqueUrl: null,
    images: [
      { id: "thermometre-medical-digital-1", url: "/produits/thermometre.png", alt: "Thermomètre médical digital" }
    ],
    variantes: [],
    createdAt: "2026-09-09",
  },
  {
    id: "prod-blouse-blanche",
    slug: "blouse-blanche",
    categorieId: "cat-habillement-pro",
    referenceFournisseur: "HA-01",
    nom: { fr: "Blouse blanche", ar: null, en: null },
    descriptionPro: { fr: null, ar: null, en: null },
    descriptionParticulier: { fr: null, ar: null, en: null },
    taille: null,
    dimension: null,
    // Disponibilité absente des documents fournis : « sur commande » par
    // défaut, à ajuster produit par produit depuis l'administration.
    disponibilite: "sur_commande",
    ficheTechniqueUrl: null,
    images: [
      { id: "blouse-blanche-1", url: "/produits/blouse-blanche.jpg", alt: "Blouse blanche" }
    ],
    variantes: [],
    createdAt: "2026-09-09",
  },
  {
    id: "prod-tenue-medicale-tunique-et-pantalon",
    slug: "tenue-medicale-tunique-et-pantalon",
    categorieId: "cat-habillement-pro",
    referenceFournisseur: "HA-02",
    nom: { fr: "Tenue médicale, tunique et pantalon", ar: null, en: null },
    descriptionPro: { fr: null, ar: null, en: null },
    descriptionParticulier: { fr: null, ar: null, en: null },
    taille: null,
    dimension: null,
    // Disponibilité absente des documents fournis : « sur commande » par
    // défaut, à ajuster produit par produit depuis l'administration.
    disponibilite: "sur_commande",
    ficheTechniqueUrl: null,
    images: [
      { id: "tenue-medicale-tunique-et-pantalon-1", url: "/produits/pyjama-liray-med.jpg", alt: "Tenue médicale, tunique et pantalon" },
      { id: "tenue-medicale-tunique-et-pantalon-2", url: "/produits/pyjama-liray-med1.jpg", alt: "Tenue médicale, tunique et pantalon" },
      { id: "tenue-medicale-tunique-et-pantalon-3", url: "/produits/pyjama-liray-med2.jpg", alt: "Tenue médicale, tunique et pantalon" }
    ],
    variantes: [],
    createdAt: "2026-09-09",
  },
  {
    id: "prod-sabot-medical-en-eva",
    slug: "sabot-medical-en-eva",
    categorieId: "cat-habillement-pro",
    referenceFournisseur: "HA-03",
    nom: { fr: "Sabot médical en EVA", ar: null, en: null },
    descriptionPro: { fr: null, ar: null, en: null },
    descriptionParticulier: { fr: null, ar: null, en: null },
    taille: null,
    dimension: null,
    // Disponibilité absente des documents fournis : « sur commande » par
    // défaut, à ajuster produit par produit depuis l'administration.
    disponibilite: "sur_commande",
    ficheTechniqueUrl: null,
    images: [
      { id: "sabot-medical-en-eva-1", url: "/produits/sabot1.png", alt: "Sabot médical en EVA" }
    ],
    variantes: [],
    createdAt: "2026-09-09",
  },
  {
    id: "prod-sabot-medical-perfore",
    slug: "sabot-medical-perfore",
    categorieId: "cat-habillement-pro",
    referenceFournisseur: "HA-04",
    nom: { fr: "Sabot médical perforé", ar: null, en: null },
    descriptionPro: { fr: null, ar: null, en: null },
    descriptionParticulier: { fr: null, ar: null, en: null },
    taille: null,
    dimension: null,
    // Disponibilité absente des documents fournis : « sur commande » par
    // défaut, à ajuster produit par produit depuis l'administration.
    disponibilite: "sur_commande",
    ficheTechniqueUrl: null,
    images: [
      { id: "sabot-medical-perfore-1", url: "/produits/sabot2.png", alt: "Sabot médical perforé" }
    ],
    variantes: [],
    createdAt: "2026-09-09",
  },
  {
    id: "prod-chaussure-professionnelle-a-lacets",
    slug: "chaussure-professionnelle-a-lacets",
    categorieId: "cat-habillement-pro",
    referenceFournisseur: "HA-05",
    nom: { fr: "Chaussure professionnelle à lacets", ar: null, en: null },
    descriptionPro: { fr: null, ar: null, en: null },
    descriptionParticulier: { fr: null, ar: null, en: null },
    taille: null,
    dimension: null,
    // Disponibilité absente des documents fournis : « sur commande » par
    // défaut, à ajuster produit par produit depuis l'administration.
    disponibilite: "sur_commande",
    ficheTechniqueUrl: null,
    images: [
      { id: "chaussure-professionnelle-a-lacets-1", url: "/produits/chaussure1.png", alt: "Chaussure professionnelle à lacets" }
    ],
    variantes: [],
    createdAt: "2026-09-09",
  },
  {
    id: "prod-chaussure-professionnelle-sans-lacets",
    slug: "chaussure-professionnelle-sans-lacets",
    categorieId: "cat-habillement-pro",
    referenceFournisseur: "HA-06",
    nom: { fr: "Chaussure professionnelle sans lacets", ar: null, en: null },
    descriptionPro: { fr: null, ar: null, en: null },
    descriptionParticulier: { fr: null, ar: null, en: null },
    taille: null,
    dimension: null,
    // Disponibilité absente des documents fournis : « sur commande » par
    // défaut, à ajuster produit par produit depuis l'administration.
    disponibilite: "sur_commande",
    ficheTechniqueUrl: null,
    images: [
      { id: "chaussure-professionnelle-sans-lacets-1", url: "/produits/chaussure2.png", alt: "Chaussure professionnelle sans lacets" }
    ],
    variantes: [],
    createdAt: "2026-09-09",
  },
  {
    id: "prod-perfuseur-avec-tubulure",
    slug: "perfuseur-avec-tubulure",
    categorieId: "cat-dispositifs",
    referenceFournisseur: "DM-01",
    nom: { fr: "Perfuseur avec tubulure", ar: null, en: null },
    descriptionPro: { fr: null, ar: null, en: null },
    descriptionParticulier: { fr: null, ar: null, en: null },
    taille: null,
    dimension: null,
    // Disponibilité absente des documents fournis : « sur commande » par
    // défaut, à ajuster produit par produit depuis l'administration.
    disponibilite: "sur_commande",
    ficheTechniqueUrl: null,
    images: [
      { id: "perfuseur-avec-tubulure-1", url: "/produits/tubulaire.png", alt: "Perfuseur avec tubulure" }
    ],
    variantes: [],
    createdAt: "2026-09-09",
  },
  {
    id: "prod-sonde-de-foley-en-latex",
    slug: "sonde-de-foley-en-latex",
    categorieId: "cat-dispositifs",
    referenceFournisseur: "DM-02",
    nom: { fr: "Sonde de Foley en latex", ar: null, en: null },
    descriptionPro: { fr: null, ar: null, en: null },
    descriptionParticulier: { fr: null, ar: null, en: null },
    taille: null,
    dimension: null,
    // Disponibilité absente des documents fournis : « sur commande » par
    // défaut, à ajuster produit par produit depuis l'administration.
    disponibilite: "sur_commande",
    ficheTechniqueUrl: null,
    images: [
      { id: "sonde-de-foley-en-latex-1", url: "/produits/sonde-foley.png", alt: "Sonde de Foley en latex" }
    ],
    variantes: [],
    createdAt: "2026-09-09",
  },
  {
    id: "prod-sonde-de-foley-en-silicone",
    slug: "sonde-de-foley-en-silicone",
    categorieId: "cat-dispositifs",
    referenceFournisseur: "DM-03",
    nom: { fr: "Sonde de Foley en silicone", ar: null, en: null },
    descriptionPro: { fr: null, ar: null, en: null },
    descriptionParticulier: { fr: null, ar: null, en: null },
    taille: null,
    dimension: null,
    // Disponibilité absente des documents fournis : « sur commande » par
    // défaut, à ajuster produit par produit depuis l'administration.
    disponibilite: "sur_commande",
    ficheTechniqueUrl: null,
    images: [
      { id: "sonde-de-foley-en-silicone-1", url: "/produits/sonde-foley-selicone.png", alt: "Sonde de Foley en silicone" }
    ],
    variantes: [],
    createdAt: "2026-09-09",
  },
  {
    id: "prod-sonde-dintubation",
    slug: "sonde-dintubation",
    categorieId: "cat-dispositifs",
    referenceFournisseur: "DM-04",
    nom: { fr: "Sonde d’intubation", ar: null, en: null },
    descriptionPro: { fr: null, ar: null, en: null },
    descriptionParticulier: { fr: null, ar: null, en: null },
    taille: null,
    dimension: null,
    // Disponibilité absente des documents fournis : « sur commande » par
    // défaut, à ajuster produit par produit depuis l'administration.
    disponibilite: "sur_commande",
    ficheTechniqueUrl: null,
    images: [
      { id: "sonde-dintubation-1", url: "/produits/sonde-intubation.png", alt: "Sonde d’intubation" }
    ],
    variantes: [],
    createdAt: "2026-09-09",
  },
  {
    id: "prod-masque-a-oxygene",
    slug: "masque-a-oxygene",
    categorieId: "cat-dispositifs",
    referenceFournisseur: "DM-05",
    nom: { fr: "Masque à oxygène", ar: null, en: null },
    descriptionPro: { fr: null, ar: null, en: null },
    descriptionParticulier: { fr: null, ar: null, en: null },
    taille: null,
    dimension: null,
    // Disponibilité absente des documents fournis : « sur commande » par
    // défaut, à ajuster produit par produit depuis l'administration.
    disponibilite: "sur_commande",
    ficheTechniqueUrl: null,
    images: [
      { id: "masque-a-oxygene-1", url: "/produits/masque-o2.png", alt: "Masque à oxygène" }
    ],
    variantes: [],
    createdAt: "2026-09-09",
  },
  {
    id: "prod-drain-de-redon-aspiratif",
    slug: "drain-de-redon-aspiratif",
    categorieId: "cat-dispositifs",
    referenceFournisseur: "DM-06",
    nom: { fr: "Drain de redon aspiratif", ar: null, en: null },
    descriptionPro: { fr: null, ar: null, en: null },
    descriptionParticulier: { fr: null, ar: null, en: null },
    taille: null,
    dimension: null,
    // Disponibilité absente des documents fournis : « sur commande » par
    // défaut, à ajuster produit par produit depuis l'administration.
    disponibilite: "sur_commande",
    ficheTechniqueUrl: null,
    images: [
      { id: "drain-de-redon-aspiratif-1", url: "/produits/hemovac.png", alt: "Drain de redon aspiratif" }
    ],
    variantes: [],
    createdAt: "2026-09-09",
  },
  {
    id: "prod-gel-dechographie",
    slug: "gel-dechographie",
    categorieId: "cat-dispositifs",
    referenceFournisseur: "DM-07",
    nom: { fr: "Gel d’échographie", ar: null, en: null },
    descriptionPro: { fr: null, ar: null, en: null },
    descriptionParticulier: { fr: null, ar: null, en: null },
    taille: null,
    dimension: null,
    // Disponibilité absente des documents fournis : « sur commande » par
    // défaut, à ajuster produit par produit depuis l'administration.
    disponibilite: "sur_commande",
    ficheTechniqueUrl: null,
    images: [
      { id: "gel-dechographie-1", url: "/produits/gel-echo.png", alt: "Gel d’échographie" }
    ],
    variantes: [],
    createdAt: "2026-09-09",
  },
  {
    id: "prod-matelas-anti-escarre-a-air",
    slug: "matelas-anti-escarre-a-air",
    categorieId: "cat-dispositifs",
    referenceFournisseur: "DM-08",
    nom: { fr: "Matelas anti-escarre à air", ar: null, en: null },
    descriptionPro: { fr: null, ar: null, en: null },
    descriptionParticulier: { fr: null, ar: null, en: null },
    taille: null,
    dimension: null,
    // Disponibilité absente des documents fournis : « sur commande » par
    // défaut, à ajuster produit par produit depuis l'administration.
    disponibilite: "sur_commande",
    ficheTechniqueUrl: null,
    images: [
      { id: "matelas-anti-escarre-a-air-1", url: "/produits/matelas-escare.png", alt: "Matelas anti-escarre à air" }
    ],
    variantes: [],
    createdAt: "2026-09-09",
  },
];
