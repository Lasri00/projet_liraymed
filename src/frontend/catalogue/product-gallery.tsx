"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { CategoryIllustration } from "./category-illustration";
import { PhotoPlaceholder } from "./photo-placeholder";

export type GalerieImage = { id: string; url: string; alt: string | null };
export type GalerieVariante = { id: string; nom: string; hex: string; photoUrl: string | null };

// Fiche projet du cahier des charges.
const WHATSAPP = "212676816644";

/**
 * Galerie et sélecteur de coloris.
 *
 * Une variante sans photo garde la pastille cliquable et conserve la photo
 * principale (cf. produit_variantes.photo_url dans db/schema.sql).
 * Le message WhatsApp reprend la désignation, la référence et le coloris
 * sélectionné : c'est la seule voie de prise de commande (invariant #6).
 */
export function ProductGallery({
  nom,
  reference,
  images,
  variantes,
  categorie,
  urlProduit,
}: {
  nom: string;
  reference: string;
  images: readonly GalerieImage[];
  variantes: readonly GalerieVariante[];
  categorie: string;
  urlProduit: string;
}) {
  const t = useTranslations();
  const [varianteId, setVarianteId] = useState<string | null>(variantes[0]?.id ?? null);
  const [index, setIndex] = useState(0);

  const variante = variantes.find((v) => v.id === varianteId) ?? null;

  // La photo du coloris passe en tête quand elle existe ; sinon la galerie
  // d'origine est conservée telle quelle.
  const galerie: GalerieImage[] = variante?.photoUrl
    ? [
        { id: `variante-${variante.id}`, url: variante.photoUrl, alt: variante.nom },
        ...images.filter((image) => image.url !== variante.photoUrl),
      ]
    : [...images];

  const courante = galerie[Math.min(index, Math.max(galerie.length - 1, 0))] ?? null;

  const message = [
    t("Product.whatsappIntro"),
    "",
    `• ${nom}`,
    `• ${t("Product.reference")} ${reference}`,
    ...(variante ? [`• ${t("Product.colours")} : ${variante.nom}`] : []),
    "",
    urlProduit,
  ].join("\n");

  return (
    <div className="flex flex-col gap-6">
      <div className="surface-card flex aspect-square items-center justify-center overflow-hidden bg-surface-muted">
        {courante ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={courante.url}
            src={courante.url}
            alt={courante.alt ?? nom}
            className="size-full object-cover transition-opacity duration-300"
          />
        ) : (
          <span className="flex flex-col items-center gap-4">
            <CategoryIllustration categorie={categorie} className="size-24" />
            <PhotoPlaceholder label={t("Product.photoHint")} />
          </span>
        )}
      </div>

      {galerie.length > 1 && (
        <div className="scroll-x">
          <div className="flex gap-2">
            {galerie.map((image, position) => (
              <button
                key={image.id}
                type="button"
                onClick={() => setIndex(position)}
                aria-current={position === index}
                className={
                  "size-16 shrink-0 overflow-hidden rounded-lg border-2 transition-colors " +
                  (position === index ? "border-brand" : "border-line")
                }
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={image.url} alt="" loading="lazy" className="size-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}

      {variantes.length > 0 && (
        <div className="flex flex-col gap-2.5">
          <span className="field-label mb-0">
            {t("Product.colours")}
            {variante && <span className="ms-1.5 font-normal text-muted">— {variante.nom}</span>}
          </span>
          <div className="flex flex-wrap gap-2.5">
            {variantes.map((option) => {
              const actif = option.id === varianteId;
              return (
                <button
                  key={option.id}
                  type="button"
                  title={option.nom}
                  aria-label={option.nom}
                  aria-pressed={actif}
                  onClick={() => {
                    setVarianteId(option.id);
                    setIndex(0);
                  }}
                  className={
                    "size-8 rounded-full border-2 transition-transform hover:scale-110 " +
                    (actif ? "border-brand ring-3 ring-brand/25" : "border-line-strong")
                  }
                  style={{ background: option.hex }}
                />
              );
            })}
          </div>
        </div>
      )}

      <a
        href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-whatsapp w-full sm:w-fit"
      >
        <svg viewBox="0 0 24 24" className="size-[18px]" fill="currentColor" aria-hidden="true">
          <path d="M12.04 2C6.6 2 2.2 6.4 2.2 11.84c0 1.9.5 3.68 1.4 5.22L2 22l5.06-1.56a9.8 9.8 0 0 0 4.98 1.35c5.43 0 9.84-4.4 9.84-9.84C21.89 6.4 17.48 2 12.04 2Zm0 17.86a8.2 8.2 0 0 1-4.16-1.13l-.3-.18-3.09.95.98-3.01-.2-.31a8.14 8.14 0 0 1-1.25-4.34c0-4.5 3.67-8.16 8.18-8.16 2.18 0 4.23.85 5.77 2.4a8.1 8.1 0 0 1 2.39 5.77c0 4.5-3.67 8.16-8.32 8.16Zm4.49-6.11c-.25-.13-1.46-.72-1.68-.8-.23-.08-.39-.13-.56.12-.16.25-.64.8-.78.97-.15.16-.29.18-.53.06-.25-.13-1.04-.38-1.98-1.22-.73-.65-1.23-1.46-1.37-1.7-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.44.13-.15.17-.25.25-.42.08-.16.04-.31-.02-.44-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.48c-.16 0-.42.06-.64.31-.22.25-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.7 2.6 4.12 3.64.58.25 1.03.4 1.38.51.58.19 1.1.16 1.52.1.46-.07 1.46-.6 1.66-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.29Z" />
        </svg>
        {t("Product.contactWhatsapp")}
      </a>
    </div>
  );
}
