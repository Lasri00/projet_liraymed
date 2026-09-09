import { notFound } from "next/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { getProfil } from "@/backend/queries/preferences";
import {
  getCategorieDuProduit,
  getProduitParSlug,
  getProduitsAssocies,
} from "@/backend/queries/catalogue";
import { AvailabilityBadge } from "@/frontend/catalogue/availability-badge";
import { ProductCard } from "@/frontend/catalogue/product-card";
import { ProductGallery } from "@/frontend/catalogue/product-gallery";
import { trad, tradDescription } from "@/shared/trad";

type Params = Promise<{ locale: string; slug: string }>;

export default async function ProduitPage({ params }: { params: Params }) {
  const { locale: localeParam, slug } = await params;
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations();
  const profil = await getProfil();

  // Un produit hors du profil actif n'existe pas pour ce visiteur.
  const produit = await getProduitParSlug(slug, profil);
  if (!produit) notFound();

  const [categorie, associes] = await Promise.all([
    getCategorieDuProduit(produit),
    getProduitsAssocies(produit, profil, 3),
  ]);

  const nom = trad(produit.nom, locale);
  const description = tradDescription(
    { pro: produit.descriptionPro, particulier: produit.descriptionParticulier },
    profil,
    locale,
  );

  const caracteristiques = [
    produit.taille ? { cle: t("Product.size"), valeur: produit.taille } : null,
    produit.dimension ? { cle: t("Product.dimension"), valeur: produit.dimension } : null,
    categorie ? { cle: t("Product.category"), valeur: trad(categorie.nom, locale) } : null,
  ].filter((ligne) => ligne !== null);

  return (
    <main className="flex-1">
      <div className="container-page flex flex-col gap-8 py-10">
        <nav aria-label={t("Catalogue.breadcrumb")} className="flex flex-wrap items-center gap-2 text-[13px] text-muted">
          <Link href="/" className="hover:text-ink">
            {t("Nav.home")}
          </Link>
          <Chevron />
          <Link href="/catalogue" className="hover:text-ink">
            {t("Nav.catalogue")}
          </Link>
          {categorie && (
            <>
              <Chevron />
              <Link href={`/catalogue?categorie=${categorie.slug}`} className="hover:text-ink">
                {trad(categorie.nom, locale)}
              </Link>
            </>
          )}
          <Chevron />
          <span className="font-medium text-ink">{nom}</span>
        </nav>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <ProductGallery
            nom={nom}
            reference={produit.referenceFournisseur}
            images={produit.images.map((image) => ({
              id: image.id,
              url: image.url,
              alt: image.alt,
            }))}
            variantes={produit.variantes.map((variante) => ({
              id: variante.id,
              nom: trad(variante.nom, locale),
              hex: variante.hex,
              photoUrl: variante.photoUrl,
            }))}
            categorie={produit.categorieId.replace(/^cat-/, "")}
            urlProduit={`/${localeParam}/catalogue/${produit.slug}`}
          />

          <div className="flex flex-col gap-6">
            {categorie && <span className="eyebrow">{trad(categorie.nom, locale)}</span>}

            <div className="flex flex-col gap-2">
              <h1 className="text-3xl leading-tight font-extrabold sm:text-4xl">{nom}</h1>
              <p className="text-sm text-muted">
                {t("Product.reference")}{" "}
                <span className="font-medium text-ink">{produit.referenceFournisseur}</span>
              </p>
            </div>

            {/* Invariant #5 : aucun prix. Invariant #2 : trois états, jamais un nombre. */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-lg font-bold text-brand">{t("Product.priceOnRequest")}</span>
              <AvailabilityBadge value={produit.disponibilite} />
            </div>

            {description && (
              <div className="flex flex-col gap-2">
                <h2 className="field-label mb-0">{t("Product.description")}</h2>
                <p className="text-[15px] leading-relaxed whitespace-pre-line text-muted">
                  {description}
                </p>
              </div>
            )}

            {caracteristiques.length > 0 && (
              <dl className="surface-card divide-y divide-line">
                {caracteristiques.map((ligne) => (
                  <div key={ligne.cle} className="flex items-center justify-between gap-4 px-5 py-3 text-sm">
                    <dt className="text-muted">{ligne.cle}</dt>
                    <dd className="text-end font-medium">{ligne.valeur}</dd>
                  </div>
                ))}
              </dl>
            )}

            {produit.ficheTechniqueUrl && (
              <a
                href={produit.ficheTechniqueUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline w-fit"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="size-[18px]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M12 3v12m0 0-4-4m4 4 4-4M4 19h16" />
                </svg>
                {t("Product.technicalSheet")}
              </a>
            )}

            <p className="rounded-xl bg-mint px-4 py-3 text-[13px] leading-relaxed text-brand">
              {t("Product.orderNotice")}
            </p>
          </div>
        </div>

        {associes.length > 0 && (
          <section className="mt-8 flex flex-col gap-6">
            <h2 className="text-2xl font-bold">{t("Product.related")}</h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {associes.map((autre) => (
                <ProductCard key={autre.id} produit={autre} profil={profil} />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

function Chevron() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="flip-rtl size-3 text-faint"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m9 6 6 6-6 6" />
    </svg>
  );
}
