# Liray Med — site public trilingue et espace administrateur

Projet sous cahier des charges signé. Le périmètre et les critères de livraison
sont contractuels. Ne jamais ajouter de fonctionnalité hors périmètre : toute
addition doit être validée par écrit par le client avant réalisation.

Échéance finale : 30 novembre 2026. Découpage en 16 tâches, T1 à T16.

---

## Stack et commandes

<!-- À COMPLÉTER avant le premier commit -->

- Framework : Next.js (App Router, TypeScript, Tailwind, next-intl)
- Base de données : PostgreSQL
- Hébergement :
- Stockage fichiers et images :
- Envoi d'emails :

Commandes :

- Développement : `npm run dev`
- Tests :
- Migration :
- Seed :
- Garde-fous SQL : `psql $DATABASE_URL -f tests/garde_fous.sql`

---

## Invariants — à ne jamais enfreindre

1. **Aucune requête publique ne lit `produits` ni `categories` directement.**
   Les interfaces publiques lisent uniquement les vues `v_produits_public`,
   `v_categories_public`, `v_compteurs_categories`.

2. **`prix_interne` et `stock_quantite` ne sortent jamais vers le public**,
   y compris dans les réponses réseau et les payloads intermédiaires.
   Le public voit la disponibilité à trois états, jamais un nombre.

3. **Tout texte affiché passe par le repli FR/AR/EN.** Fonction `trad()`.
   Une traduction absente affiche le français, jamais une chaîne vide.

4. **L'arabe est en RTL complet** : texte, icônes, marges, alignements.
   Le français et l'anglais restent en LTR. Développer et vérifier en arabe
   dès qu'un écran est posé, pas à la recette.

5. **Aucun prix affiché publiquement, nulle part.** Mention « Prix sur demande ».

6. **Ni panier, ni validation de commande, ni suivi de commande.** La prise de
   commande passe par WhatsApp et le formulaire de contact, exclusivement.

7. **L'espace administrateur est exclu de l'indexation** et inaccessible sans
   authentification, y compris par accès direct à une URL.

8. **Un module non attribué à un compte restreint est invisible**, pas
   désactivé, et inatteignable par URL directe.

9. **Un devis émis est immuable.** Les lignes recopient désignation, référence,
   taille, dimension et prix. Modifier un produit ne modifie aucun devis passé.

10. **Le numéro de devis est attribué à l'émission**, jamais à la création du
    brouillon. Numérotation continue, sans trou.

11. **Classes Tailwind logiques uniquement** : `ps-` `pe-` `ms-` `me-`
    `start-` `end-` `text-start` `text-end` `border-s` `border-e`.
    Jamais `pl-` `pr-` `ml-` `mr-` `text-left` `text-right`. Le site doit
    basculer en RTL sans réécriture.

---

## Hors périmètre — refuser et signaler

Paiement en ligne, prix publics, panier, espace client, chatbot, application
mobile, newsletter, campagnes emailing, référencement éditorial, multi-entrepôts,
intégration à un logiciel de gestion, page Mentions légales.

La saisie du catalogue et la traduction des contenus sont à la charge du client.

---

## Conventions

- Migrations versionnées uniquement. Aucune modification manuelle en base.
- Toute migration a son inverse, écrite en même temps.
- Préproduction avant production, jamais l'inverse.
- Aucun secret dans le dépôt. Variables d'environnement uniquement.
- Les identifiants de production appartiennent au client : ne jamais les
  committer, ne jamais les inscrire dans un fichier de configuration versionné.

---

## Structures de données

Voir `db/schema.sql`. Points saillants :

- `categories` : arborescence à deux niveaux, filtrage par profil via
  `visible_particulier` / `visible_professionnel`.
- `produits` : deux descriptions par langue (pro et particulier), six colonnes
  de description au total par langue.
- `produit_variantes` : `photo_url` NULL signifie que la pastille reste
  cliquable et que la photo principale est conservée.
- `admin_permissions` : absence de ligne = module invisible.
- `evenements` : aucune adresse IP stockée. Ville dérivée et hash de session
  uniquement, conformément à la loi 09-08.

---

## Ce qui doit rester humain

- La revue de sécurité T14 : rapport signé, vérification manuelle.
- Les tests sur appareil réel : liens WhatsApp, RTL arabe, zoom mobile.
- Les démonstrations client.
- Toute décision touchant au périmètre ou au calendrier.
