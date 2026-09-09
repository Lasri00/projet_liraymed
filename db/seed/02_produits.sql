-- =====================================================================
-- LIRAY MED — Seed des produits (tâche T1)
-- Source : CATALOGUE TABLEAU.xlsx et AIDE A LA MARCHE PODOLOGIE.xlsx,
--          transmis par le Client le 1er septembre 2026.
--
-- 87 produits réels, avec leurs références fournisseur d'origine.
-- Les noms ont été normalisés (casse et accents) : ils s'afficheront
-- tels quels sur le site public et doivent être validés par le Client.
--
-- LACUNES DU CATALOGUE FOURNI, à combler par le Client :
--   * aucune description, ni Professionnel ni Particulier :
--     les colonnes DESCRIPTION et INDICATION du fichier sont vides ;
--   * aucun prix interne, indispensable aux devis (T11) ;
--   * aucune donnée de coloris : les 19 produits à variantes annoncés
--     en section 3.3 ne sont pas identifiables dans ces fichiers ;
--   * 9 des 12 catégories n'ont aucun produit (voir la répartition
--     en fin de fichier).
-- =====================================================================

INSERT INTO produits
  (slug, categorie_id, reference_fournisseur, nom_fr, disponibilite,
   stock_quantite, publie)
SELECT v.slug, c.id, v.ref, v.nom, v.dispo::disponibilite, v.stock, true
FROM (VALUES
  ('collier-cervical-eponge', 'orthopedie', 'PF 1103', 'Collier cervical éponge', 'en_stock', 8),
  ('collier-cervical-semi-rigide', 'orthopedie', 'PF 1102', 'Collier cervical semi rigide', 'sur_commande', 0),
  ('collier-cervical-semi-rigide-rcip', 'orthopedie', 'PF 1101', 'Collier cervical semi rigide RCIP', 'sur_commande', 0),
  ('support-collier-cervical', 'orthopedie', 'PF 1102-B', 'Support collier cervical', 'en_stock', 11),
  ('support-collier-cervical-rcip', 'orthopedie', 'PF 1103-B', 'Support collier cervical RCIP', 'sur_commande', 0),
  ('philadelphia-collier-cervical', 'orthopedie', 'PF 1104', 'Philadelphia collier cervical', 'rupture', 0),
  ('philadelphia-collier-cervical-ouvert-pour-traitement', 'orthopedie', 'PF 1106', 'Philadelphia collier cervical ouvert pour traitement', 'sur_commande', 0),
  ('bretelle-de-bras-en-echarpe-net', 'orthopedie', 'PF 2301-F', 'Bretelle de bras en écharpe net', 'en_stock', 15),
  ('bretelle-de-bras-en-echarpe-eponge', 'orthopedie', 'PF 2301', 'Bretelle de bras en écharpe éponge', 'sur_commande', 0),
  ('bretelle-active-30-degres-45-60-degres', 'orthopedie', 'PF 2300', 'Bretelle active 30 degrés / 45-60 degrés', 'sur_commande', 0),
  ('support-d-epaule', 'orthopedie', 'PF 22800', 'Support d''epaule', 'sur_commande', 0),
  ('bandage-de-support-d-epaule-velpeau', 'orthopedie', 'PF 2302', 'Bandage de support d''epaule (velpeau)', 'sur_commande', 0),
  ('support-de-coude-pour-le-tennis-std', 'orthopedie', 'PF 27008', 'Support de coude pour le tennis STD', 'en_stock', 20),
  ('attelle-de-pouce', 'orthopedie', 'PF 215', 'Attelle de pouce', 'sur_commande', 0),
  ('attelle-de-poignet', 'orthopedie', 'PF 219', 'Attelle de poignet', 'sur_commande', 0),
  ('bandage-de-poignet-brace', 'orthopedie', 'PF 218', 'Bandage de poignet brace', 'sur_commande', 0),
  ('attelle-de-poignet-avec-support-de-pouce', 'orthopedie', 'PF 221', 'Attelle de poignet avec support de pouce', 'sur_commande', 0),
  ('attelle-thermoplastique-kleinert-main-et-doigts', 'orthopedie', 'PF 237', 'Attelle thermoplastique Kleinert main et doigts', 'sur_commande', 0),
  ('attelle-dynamique-main-et-doigts', 'orthopedie', 'PF 235', 'Attelle dynamique main et doigts', 'en_stock', 9),
  ('attelle-repos-main', 'orthopedie', 'PF 234', 'Attelle repos main', 'sur_commande', 0),
  ('attelle-thermoplastique-anti-spasticite-main', 'orthopedie', 'PF 236', 'Attelle thermoplastique anti spasticité main', 'sur_commande', 0),
  ('corset-hernie-ventre', 'orthopedie', 'PF 3422', 'Corset hernie ventre', 'sur_commande', 0),
  ('hernie-truss-double-face', 'orthopedie', 'PF 462-D', 'Hernie truss double face', 'rupture', 0),
  ('hernie-truss-une-seule-face', 'orthopedie', 'PF 462', 'Hernie truss une seule face', 'sur_commande', 0),
  ('corset-abdominale', 'orthopedie', 'PF 3420', 'Corset abdominale', 'sur_commande', 0),
  ('corset-thoracique', 'orthopedie', 'PF 3421', 'Corset thoracique', 'en_stock', 16),
  ('corset-soutien-posturex', 'orthopedie', 'PF 3161', 'Corset soutien Posturex', 'sur_commande', 0),
  ('corset-lumbostad-26-cm', 'orthopedie', 'PF 3260-K', 'Corset Lumbostad 26 cm', 'sur_commande', 0),
  ('corset-lumbo-sacree-32-cm', 'orthopedie', 'PF 3320', 'Corset lumbo sacrée 32 cm', 'sur_commande', 0),
  ('corset-elastique-dorsolombaire', 'orthopedie', 'PF 3330', 'Corset élastique dorsolombaire', 'sur_commande', 0),
  ('corset-grossesse', 'orthopedie', 'PF 3424', 'Corset grossesse', 'sur_commande', 0),
  ('orthese-fracture-humerale', 'orthopedie', 'PF 22802', 'Orthèse fracture humérale', 'en_stock', 22),
  ('genouillere-rotulien-ferme', 'orthopedie', 'PF 52100', 'Genouillère rotulien ferme', 'sur_commande', 0),
  ('genouillere-rotulien-ouverte', 'orthopedie', 'PF 52101', 'Genouillère rotulien ouverte', 'sur_commande', 0),
  ('genouillere-rotulien-et-long-ligament', 'orthopedie', 'PF 52103', 'Genouillère rotulien et long ligament', 'sur_commande', 0),
  ('rotulien-genouillere-ligament-ouvert-a-l-avant', 'orthopedie', 'PF 52103-A', 'Rotulien genouillère ligament ouvert a l''avant', 'sur_commande', 0),
  ('support-de-genou-articule', 'orthopedie', 'PF 52104', 'Support de genou articulé', 'sur_commande', 0),
  ('genouillere-rotulien-et-ligament-matrix', 'orthopedie', 'PF 52109', 'Genouillère rotulien et ligament matrix', 'sur_commande', 0),
  ('tendon-rotulien-strap', 'orthopedie', 'PF 52110', 'Tendon rotulien strap', 'sur_commande', 0),
  ('appareil-orthopedique-a-ongle-reglable', 'orthopedie', 'PF 51011', 'Appareil orthopédique a ongle réglable', 'sur_commande', 0),
  ('mobilisateur-du-genou', 'orthopedie', 'PF 510', 'Mobilisateur du genou', 'en_stock', 14),
  ('support-de-cuisse', 'orthopedie', 'PF 52500', 'Support de cuisse', 'sur_commande', 0),
  ('soutien-de-la-cheville-malleole-pad', 'orthopedie', 'PF 62403', 'Soutien de la cheville malléole pad', 'sur_commande', 0),
  ('soutien-de-cheville-bandage', 'orthopedie', 'PF 61401', 'Soutien de cheville bandage', 'sur_commande', 0),
  ('soutien-de-la-cheville-plastique-pad', 'orthopedie', 'PF 62404', 'Soutien de la cheville plastique pad', 'sur_commande', 0),
  ('chevillere-en-plastique-avec-coussinet-eponge', 'orthopedie', 'PF 61102', 'Chevillère en plastique avec coussinet éponge', 'sur_commande', 0),
  ('hallux-valgus-attelle-de-nuit', 'orthopedie', 'PF 630', 'Hallux valgus attelle de nuit', 'sur_commande', 0),
  ('achille-chaussures', 'chaussure-medicale', 'PF 61104', 'Achille chaussures', 'rupture', 0),
  ('releveur-pied', 'orthopedie', 'PF 61106', 'Releveur pied', 'sur_commande', 0),
  ('repose-pied', 'orthopedie', 'PF 651', 'Repose pied', 'sur_commande', 0),
  ('bandage-claviculaire', 'orthopedie', 'PF 2310', 'Bandage claviculaire', 'sur_commande', 0),
  ('puffix-bas-de-contention', 'orthopedie', 'PF B-C', 'Puffix bas de contention', 'sur_commande', 0),
  ('chaussette-de-contention', 'orthopedie', 'PF CH-C', 'Chaussette de contention', 'en_stock', 9),
  ('collants-de-contention', 'orthopedie', 'PF C-C', 'Collants de contention', 'sur_commande', 0),
  ('frog-attelle-doigt', 'orthopedie', 'PF 226', 'Frog attelle doigt', 'sur_commande', 0),
  ('baseball-attelle-doigt', 'orthopedie', 'PF 225', 'Baseball attelle doigt', 'sur_commande', 0),
  ('attelle-de-doigt-en-aluminium', 'orthopedie', 'PF 227', 'Attelle de doigt en aluminium', 'sur_commande', 0),
  ('mallet-de-doigt', 'orthopedie', 'PF 229', 'Mallet de doigt', 'sur_commande', 0),
  ('dynamique-attelle-doigt', 'orthopedie', 'PF 224', 'Dynamique attelle doigt', 'sur_commande', 0),
  ('orthopedique-donut-oreiller', 'orthopedie', 'PF 5314', 'Orthopédique donut oreiller', 'sur_commande', 0),
  ('oreiller-orthopedique-visco-mousse', 'orthopedie', 'PF 5025', 'Oreiller orthopédique visco mousse', 'en_stock', 17),
  ('coussin-ergonomique-pour-le-coccyx', 'orthopedie', 'PF', 'Coussin ergonomique pour le coccyx', 'sur_commande', 0),
  ('coussin-de-retournement', 'orthopedie', 'PF', 'Coussin de retournement', 'sur_commande', 0),
  ('coussin-anti-reflux', 'orthopedie', 'PF 3314', 'Coussin anti reflux', 'rupture', 0),
  ('immobilisation-du-poignet', 'orthopedie', 'PF 221-L', 'Immobilisation du poignet', 'sur_commande', 0),
  ('fauteuil-roulant-de-luxe', 'aide-a-la-marche', NULL, 'Fauteuil roulant de luxe', 'sur_commande', 0),
  ('fauteuil-roulant-manuel-adulte', 'aide-a-la-marche', NULL, 'Fauteuil roulant manuel adulte', 'en_stock', 23),
  ('fauteuil-roulant-manuel-enfant', 'aide-a-la-marche', NULL, 'Fauteuil roulant manuel enfant', 'sur_commande', 0),
  ('rollator-en-aluminium-a-4-roues-assise', 'aide-a-la-marche', NULL, 'Rollator en aluminium a 4 roues + assise', 'sur_commande', 0),
  ('rollator-en-aluminium-a-2-roues-assise', 'aide-a-la-marche', NULL, 'Rollator en aluminium a 2 roues + assise', 'sur_commande', 0),
  ('deambulateur-sans-roues-pliable', 'aide-a-la-marche', NULL, 'Déambulateur sans roues pliable', 'en_stock', 10),
  ('deambulateur-avec-roues-pliable', 'aide-a-la-marche', NULL, 'Déambulateur avec roues pliable', 'sur_commande', 0),
  ('chaise-d-aisance', 'aide-a-la-marche', NULL, 'Chaise d''aisance', 'sur_commande', 0),
  ('bequilles-en-aluminium-taille-s-m-l', 'aide-a-la-marche', NULL, 'Béquilles en aluminium taille s/m/l', 'sur_commande', 0),
  ('canne-canadienne-reglable', 'aide-a-la-marche', NULL, 'Canne canadienne réglable', 'sur_commande', 0),
  ('canne-a-3-pied-reglable', 'aide-a-la-marche', NULL, 'Canne a 3 pied réglable', 'en_stock', 15),
  ('canne-de-marche-pour-personne-agee', 'aide-a-la-marche', NULL, 'Canne de marche pour personne âgée', 'sur_commande', 0),
  ('canne-pliable', 'aide-a-la-marche', NULL, 'Canne pliable', 'sur_commande', 0),
  ('canne-blanche-pour-non-voyant-et-malvoyant', 'aide-a-la-marche', NULL, 'Canne blanche pour non voyant et malvoyant', 'sur_commande', 0),
  ('semelle-orthopedique-en-silicone', 'chaussure-medicale', NULL, 'Semelle orthopédique en silicone', 'sur_commande', 0),
  ('semelle-orthopedique-a-voute-plantaire', 'chaussure-medicale', NULL, 'Semelle orthopédique a voûte plantaire', 'en_stock', 20),
  ('talonnette-orthopedique-en-silicone', 'chaussure-medicale', NULL, 'Talonnette orthopédique en silicone', 'sur_commande', 0),
  ('talonnette-pour-epine-calcanienne', 'chaussure-medicale', NULL, 'Talonnette pour épine calcanienne', 'sur_commande', 0),
  ('coussinet-metatarsien', 'chaussure-medicale', NULL, 'Coussinet métatarsien', 'sur_commande', 0),
  ('separateur-d-orteil', 'chaussure-medicale', NULL, 'Séparateur d''orteil', 'rupture', 0),
  ('protecteur-hallux-valgus-avec-ecarteur-d-orteil', 'chaussure-medicale', NULL, 'Protecteur hallux valgus avec écarteur d''orteil', 'sur_commande', 0),
  ('chaussure-a-platre', 'chaussure-medicale', NULL, 'Chaussure a plâtre', 'sur_commande', 0)
) AS v(slug, cat_slug, ref, nom, dispo, stock)
JOIN categories c ON c.slug = v.cat_slug;

-- ---------------------------------------------------------------------
-- Variantes de coloris — PROVISOIRES.
-- Les coloris réels MLS ne figurent dans aucun des fichiers transmis.
-- Ces trois pastilles démontrent le mécanisme décrit en section 4.4 :
-- la troisième n'a pas de photo associée, la photo principale du
-- produit doit donc être conservée lorsqu'on la sélectionne.
-- À remplacer dès réception des coloris réels.
-- ---------------------------------------------------------------------

INSERT INTO produit_variantes (produit_id, nom_fr, code_hex, photo_url, ordre)
SELECT p.id, v.nom, v.hex, v.photo, v.ordre
FROM produits p
CROSS JOIN (VALUES
  ('Beige', '#E8D5B7', '/photos/variantes/beige.jpg', 1),
  ('Noir',  '#1F1F1F', '/photos/variantes/noir.jpg',  2),
  ('Bleu',  '#2B5F8C', NULL,                          3)
) AS v(nom, hex, photo, ordre)
WHERE p.slug IN (
  'collier-cervical-eponge',
  'genouillere-rotulien-ferme',
  'corset-abdominale'
);

-- ---------------------------------------------------------------------
-- Vérifications
-- ---------------------------------------------------------------------

DO $$
DECLARE v_n integer; v_sans_photo integer; v_var integer;
BEGIN
  SELECT count(*) INTO v_n FROM produits;
  IF v_n <> 87 THEN
    RAISE EXCEPTION 'Attendu 87 produits, trouvé %', v_n;
  END IF;

  SELECT count(DISTINCT disponibilite) INTO v_n FROM produits;
  IF v_n <> 3 THEN
    RAISE EXCEPTION 'Les trois états de disponibilité ne sont pas couverts (%)', v_n;
  END IF;

  SELECT count(*) INTO v_var FROM produit_variantes;
  IF v_var = 0 THEN
    RAISE EXCEPTION 'Aucune variante de coloris insérée';
  END IF;

  SELECT count(*) INTO v_sans_photo FROM produit_variantes WHERE photo_url IS NULL;
  IF v_sans_photo = 0 THEN
    RAISE EXCEPTION 'Aucune variante sans photo : le repli n''est pas démontrable';
  END IF;

  RAISE NOTICE 'Seed produits : 87 produits, % variantes dont % sans photo. OK.',
    v_var, v_sans_photo;
END $$;

-- ---------------------------------------------------------------------
-- Répartition obtenue :
--   Orthopédie ............. 64
--   Aide à la marche ....... 14
--   Chaussure médicale ......  9
--
-- Sans aucun produit : Diagnostique, Mobilier médical, Consommable
-- médical, Oxygénothérapie, Habillement médical, Kinésithérapie &
-- rééducation, Instruments & sutures, Sondage et pansement,
-- Appareillage auto-diagnostique.
--
-- Les 8 produits de podologie ont été rattachés à « Chaussure
-- médicale », faute de catégorie « Podologie » dans la liste fournie.
-- À confirmer par le Client.
-- ---------------------------------------------------------------------
