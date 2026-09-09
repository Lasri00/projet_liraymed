import type {
  CategorieArbre,
  CategoriePublique,
  ProduitPublic,
} from "@/shared/catalogue-types";
import type { Profil } from "@/shared/preference-constants";
import { CATEGORIES, PRODUITS } from "./catalogue-data";

/* ---------------------------------------------------------------------------
   Lecture du catalogue public.

   Les données viennent pour l'instant de ./catalogue-data.ts, généré depuis
   les documents du client. Invariant CLAUDE.md #1 : quand PostgreSQL sera
   branché, ces fonctions liront v_categories_public, v_produits_public et
   v_compteurs_categories — jamais les tables `produits` et `categories`
   directement. Les formes de retour ne bougeront pas : seul ce fichier change.

   Invariant #2 : aucune quantité de stock, aucun prix ne transite ici.
--------------------------------------------------------------------------- */

const PRODUITS_PAR_PAGE = 12;

/**
 * Règle de visibilité posée par le client : le professionnel voit l'intégralité
 * du catalogue, le particulier n'en voit que la part qui lui est destinée.
 * Les deux gammes ne se recouvrent donc pas symétriquement — l'habillement de
 * travail et les dispositifs médicaux ne sont jamais montrés au particulier.
 */
function categorieVisible(categorie: CategoriePublique, profil: Profil): boolean {
  if (profil === "professionnel") return categorie.visibleProfessionnel;
  return categorie.visibleParticulier;
}

function categoriesVisibles(profil: Profil): readonly CategoriePublique[] {
  return CATEGORIES.filter((categorie) => categorieVisible(categorie, profil));
}

function produitVisible(produit: ProduitPublic, profil: Profil): boolean {
  const categorie = CATEGORIES.find((c) => c.id === produit.categorieId);
  if (!categorie || !categorieVisible(categorie, profil)) return false;
  // Une sous-catégorie n'est visible que si sa racine l'est aussi.
  if (!categorie.parentId) return true;
  const parent = CATEGORIES.find((c) => c.id === categorie.parentId);
  return parent ? categorieVisible(parent, profil) : false;
}

/** Arborescence à deux niveaux, filtrée par le profil actif. */
export async function getCategoriesArbre(profil: Profil): Promise<CategorieArbre[]> {
  const visibles = categoriesVisibles(profil);
  return visibles
    .filter((categorie) => categorie.parentId === null)
    .sort((a, b) => a.ordre - b.ordre)
    .map((racine) => ({
      ...racine,
      enfants: visibles
        .filter((categorie) => categorie.parentId === racine.id)
        .sort((a, b) => a.ordre - b.ordre),
    }));
}

export async function getCategoriesPhares(
  profil: Profil,
  limite = 4,
): Promise<CategorieArbre[]> {
  const arbre = await getCategoriesArbre(profil);
  return arbre.slice(0, limite);
}

export async function getCategorieParSlug(
  slug: string,
  profil: Profil,
): Promise<CategoriePublique | null> {
  const categorie = categoriesVisibles(profil).find((c) => c.slug === slug);
  return categorie ?? null;
}

export type RechercheCatalogue = {
  profil: Profil;
  categorieSlug?: string;
  recherche?: string;
  page?: number;
};

export type ResultatCatalogue = {
  produits: readonly ProduitPublic[];
  total: number;
  page: number;
  pages: number;
  categorie: CategoriePublique | null;
};

export async function chercherProduits({
  profil,
  categorieSlug,
  recherche,
  page = 1,
}: RechercheCatalogue): Promise<ResultatCatalogue> {
  const categorie = categorieSlug ? await getCategorieParSlug(categorieSlug, profil) : null;

  let resultat = PRODUITS.filter((produit) => produitVisible(produit, profil));

  if (categorieSlug) {
    if (!categorie) {
      return { produits: [], total: 0, page: 1, pages: 1, categorie: null };
    }
    // Une catégorie racine embarque les produits de ses sous-catégories.
    const idsRetenus = new Set<string>([categorie.id]);
    for (const enfant of CATEGORIES) {
      if (enfant.parentId === categorie.id) idsRetenus.add(enfant.id);
    }
    resultat = resultat.filter((produit) => idsRetenus.has(produit.categorieId));
  }

  const terme = recherche?.trim().toLocaleLowerCase();
  if (terme) {
    resultat = resultat.filter((produit) =>
      [produit.nom.fr, produit.nom.ar, produit.nom.en, produit.referenceFournisseur]
        .filter(Boolean)
        .some((valeur) => (valeur as string).toLocaleLowerCase().includes(terme)),
    );
  }

  resultat = [...resultat].sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  const total = resultat.length;
  const pages = Math.max(1, Math.ceil(total / PRODUITS_PAR_PAGE));
  const pageCourante = Math.min(Math.max(1, page), pages);
  const debut = (pageCourante - 1) * PRODUITS_PAR_PAGE;

  return {
    produits: resultat.slice(debut, debut + PRODUITS_PAR_PAGE),
    total,
    page: pageCourante,
    pages,
    categorie,
  };
}

export async function getProduitsRecents(
  profil: Profil,
  limite = 4,
): Promise<readonly ProduitPublic[]> {
  const visibles = PRODUITS.filter((produit) => produitVisible(produit, profil));
  return [...visibles]
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .slice(0, limite);
}

export async function getProduitParSlug(
  slug: string,
  profil: Profil,
): Promise<ProduitPublic | null> {
  const produit = PRODUITS.find((p) => p.slug === slug);
  if (!produit || !produitVisible(produit, profil)) return null;
  return produit;
}

export async function getProduitsAssocies(
  produit: ProduitPublic,
  profil: Profil,
  limite = 3,
): Promise<readonly ProduitPublic[]> {
  return PRODUITS.filter(
    (autre) =>
      autre.id !== produit.id &&
      autre.categorieId === produit.categorieId &&
      produitVisible(autre, profil),
  ).slice(0, limite);
}

export async function getNombreProduitsPublies(profil: Profil): Promise<number> {
  return PRODUITS.filter((produit) => produitVisible(produit, profil)).length;
}

export async function getCategorieDuProduit(
  produit: ProduitPublic,
): Promise<CategoriePublique | null> {
  return CATEGORIES.find((c) => c.id === produit.categorieId) ?? null;
}
