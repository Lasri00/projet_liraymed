import Image from "next/image";
import { useTranslations } from "next-intl";

// Logo officiel, extrait du cahier des charges (word/media/image1.png),
// détouré de son fond blanc. La variante « light » remonte le bleu marine en
// blanc : sur fond sombre, le tracé ECG et le soulignement disparaîtraient.
const LARGEUR = 1280;
const HAUTEUR = 491;

export function Wordmark({ compact = false }: { compact?: boolean }) {
  const t = useTranslations("Brand");
  const taille = compact ? "h-7 w-auto sm:h-8" : "h-8 w-auto sm:h-10";

  return (
    <span className="flex items-center">
      {/* Le logo porte déjà le nom : le texte n'est là que pour l'assistance. */}
      <span className="sr-only">{t("legalName")}</span>
      <Image
        src="/logo-liraymed.png"
        alt=""
        width={LARGEUR}
        height={HAUTEUR}
        priority
        className={`${taille} transition-all duration-300 dark:hidden`}
      />
      <Image
        src="/logo-liraymed-light.png"
        alt=""
        width={LARGEUR}
        height={HAUTEUR}
        priority
        className={`hidden ${taille} transition-all duration-300 dark:block`}
      />
    </span>
  );
}
