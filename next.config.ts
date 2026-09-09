import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import path from "node:path";
import { fileURLToPath } from "node:url";

const dirname = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  // Épingle la racine du projet : évite qu'un lockfile situé plus haut
  // dans l'arborescence (hors du dépôt) ne soit pris pour la racine.
  turbopack: {
    root: dirname,
  },
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
