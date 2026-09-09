# Liray Med — site trilingue et espace administrateur

Site public FR/AR/EN et espace administrateur pour Liray Med SARL.
Projet sous cahier des charges signé, livraison au 30 novembre 2026.

Équipe : Ahmed Amine LASRI, Mouaad AMALIK (responsable projet).

---

## Arborescence

```
CLAUDE.md                  Invariants contractuels, lu à chaque session Claude Code
db/                        Schéma PostgreSQL et données de préproduction
docs/                      Documents contractuels (cahier des charges à y placer)
messages/                  Textes d'interface FR/AR/EN — jamais le contenu catalogue
public/                    Fichiers statiques servis tels quels
src/
  app/                     Routes Next.js (App Router) — voir « Frontière » ci-dessous
  frontend/
    layout/                Structure de page : header (nav, bascules, tiroir mobile)
    catalogue/             Composants du catalogue public — vide, réservé à T5
    ui/                    Primitives réutilisables (bascule à segments, etc.)
  backend/
    actions/               Server Actions : mutations (cookies de préférences)
    queries/               Lectures serveur (préférences ; vues v_* publiques en T5+)
  shared/                  Constantes et types partagés frontend/backend
  i18n/                    Configuration next-intl : locales, requête, navigation
  proxy.ts                 Détection de langue et routage des locales
tests/                     Garde-fous SQL vérifiant les invariants contractuels
```

Config racine (package.json, tsconfig.json, next.config.ts, eslint.config.mjs,
postcss.config.mjs) : conventionnellement hors de `src/` même avec cette structure.

**Frontière frontend / backend.** `src/app/` assemble les deux : c'est
l'endroit où les pages et layouts importent à la fois des composants de
`frontend/` et des lectures de `backend/queries/` pour composer un écran.
`frontend/` ne doit pas importer directement depuis `backend/queries/`.

Exception assumée : les Server Actions de `backend/actions/` sont conçues
pour être importées et invoquées directement par des composants client
(`frontend/ui/theme-toggle.tsx`, `profil-toggle.tsx`) — c'est le mécanisme
prévu par Next.js pour ce cas précis, pas une entorse à la règle.

---

## Démarrage

```bash
git clone <url>
cd liraymed
cp .env.example .env        # puis remplir les variables
npm install
npm run dev                 # http://localhost:3000/fr (redirige depuis /)
```

Les identifiants ne sont jamais dans le dépôt. Demander l'accès à Mouaad.

---

## Base de données

Appliquer le schéma, puis les seeds dans l'ordre numérique :

```bash
psql $DATABASE_URL -f db/schema.sql
psql $DATABASE_URL -f db/seed/01_categories.sql
psql $DATABASE_URL -f db/seed/03_comptes_devis_contacts.sql
```

Les seeds sont réservés à la préproduction. Les comptes réels sont
créés à la main lors de T16.

---

## Garde-fous

À lancer avant chaque démonstration client et dans la CI :

```bash
psql $DATABASE_URL -f tests/garde_fous.sql
```

Ils vérifient des obligations contractuelles : prix interne jamais
exposé, stock chiffré jamais public, numérotation des devis continue,
cloisonnement des comptes, aucune adresse IP conservée.

**Si un garde-fou échoue, c'est le code qui est en faute, jamais le test.**

---

## Méthode de travail

Une branche par tâche du cahier des charges :

```bash
git checkout main && git pull
git checkout -b t5-catalogue
# ... travail ...
git push -u origin t5-catalogue
```

Puis Pull Request, relue par l'autre développeur avant fusion.

Découpage : T1–T2 fondations, T3–T7 site public, T8–T10 administration,
T11–T13 devis et statistiques, T14–T16 sécurité, recette et mise en ligne.

---

## Points de vigilance

- L'arabe est en RTL complet. Vérifier chaque écran en arabe, sur
  appareil réel, dès qu'il est posé — jamais à la recette.
- Aucune interface publique ne lit les tables directement : vues `v_*`.
- Le numéro de téléphone WhatsApp du cahier des charges
  (+212 6 76 81 66 44) diffère de celui de la signature du Client
  (06 76 81 66 00). **À faire confirmer avant T6.**
- Les sous-catégories ne sont pas encore fournies par le Client.
