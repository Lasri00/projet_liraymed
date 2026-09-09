// Formes de données du catalogue public, calquées sur les vues de
// db/schema.sql : v_categories_public, v_produits_public, v_compteurs_categories.
//
// Invariant CLAUDE.md #2 : ni prix_interne ni stock_quantite n'apparaissent ici.
// Le public voit `disponibilite`, trois états, jamais un nombre.
//
// Fichier partagé serveur/client : n'importer aucune API serveur.

import type { Traduit } from "./trad";

export type Disponibilite = "en_stock" | "sur_commande" | "rupture";

export const DISPONIBILITES: readonly Disponibilite[] = [
  "en_stock",
  "sur_commande",
  "rupture",
];

/** Une ligne de v_categories_public, enrichie du compteur de produits. */
export type CategoriePublique = {
  readonly id: string;
  readonly parentId: string | null;
  readonly slug: string;
  readonly nom: Traduit;
  readonly imageUrl: string | null;
  readonly visibleParticulier: boolean;
  readonly visibleProfessionnel: boolean;
  readonly ordre: number;
  /** v_compteurs_categories — parenthèses affichées dans les filtres. */
  readonly nombreProduits: number;
};

/** Arborescence à deux niveaux, telle que la contraint le schéma. */
export type CategorieArbre = CategoriePublique & {
  readonly enfants: readonly CategoriePublique[];
};

export type VarianteColoris = {
  readonly id: string;
  readonly nom: Traduit;
  readonly hex: string;
  /** NULL : la pastille reste cliquable, la photo principale est conservée. */
  readonly photoUrl: string | null;
};

export type ImageProduit = {
  readonly id: string;
  readonly url: string;
  readonly alt: string | null;
};

/** Une ligne de v_produits_public. */
export type ProduitPublic = {
  readonly id: string;
  readonly slug: string;
  readonly categorieId: string;
  readonly referenceFournisseur: string;
  readonly nom: Traduit;
  readonly descriptionPro: Traduit;
  readonly descriptionParticulier: Traduit;
  readonly taille: string | null;
  readonly dimension: string | null;
  readonly disponibilite: Disponibilite;
  readonly ficheTechniqueUrl: string | null;
  readonly images: readonly ImageProduit[];
  readonly variantes: readonly VarianteColoris[];
  readonly createdAt: string;
};
