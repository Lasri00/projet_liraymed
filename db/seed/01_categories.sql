-- =====================================================================
-- LIRAY MED — Seed des catégories (tâche T1)
-- Source : liste fournie par le Client, 2 septembre 2026
--
-- Les noms arabes et anglais sont volontairement laissés NULL :
-- ils démontrent le repli automatique vers le français décrit en
-- section 3.1 du cahier des charges, et seront fournis par le Client.
-- =====================================================================

INSERT INTO categories
  (slug, nom_fr, visible_professionnel, visible_particulier, ordre, publiee)
VALUES
  -- --- Réservées au profil Professionnel -----------------------------
  ('diagnostique',                'Diagnostique',                  true,  false,  1, true),
  ('mobilier-medical',            'Mobilier médical',              true,  false,  2, true),
  ('consommable-medical',         'Consommable médical',           true,  false,  3, true),
  ('oxygenotherapie',             'Oxygénothérapie',               true,  false,  4, true),
  ('habillement-medical',         'Habillement médical',           true,  false,  5, true),
  ('kinesitherapie-reeducation',  'Kinésithérapie & rééducation',  true,  false,  6, true),
  ('instruments-sutures',         'Instruments & sutures',         true,  false,  7, true),

  -- --- Partagée par les deux profils ---------------------------------
  ('aide-a-la-marche',            'Aide à la marche',              true,  true,   8, true),

  -- --- Réservées au profil Particulier -------------------------------
  ('orthopedie',                  'Orthopédie',                    false, true,   9, true),
  ('chaussure-medicale',          'Chaussure médicale',            false, true,  10, true),
  ('sondage-pansement',           'Sondage et pansement',          false, true,  11, true),
  ('appareillage-auto-diagnostique',
                                  'Appareillage auto-diagnostique', false, true, 12, true);

-- ---------------------------------------------------------------------
-- Sous-catégories : EN ATTENTE du Client.
-- L'arborescence prévue est à deux niveaux (section 3.3). Tant que les
-- sous-catégories ne sont pas fournies, les catégories ci-dessus sont
-- toutes de premier niveau (parent_id NULL) et le site reste fonctionnel.
--
-- Exemple de la forme attendue une fois la liste reçue :
--
-- INSERT INTO categories (parent_id, slug, nom_fr, visible_professionnel,
--                         visible_particulier, ordre, publiee)
-- SELECT id, 'cannes', 'Cannes', true, true, 1, true
-- FROM categories WHERE slug = 'aide-a-la-marche';
-- ---------------------------------------------------------------------

-- Vérification : douze catégories, une visible par les deux profils.
DO $$
DECLARE v_total integer; v_partagees integer;
BEGIN
  SELECT count(*) INTO v_total FROM categories;
  SELECT count(*) INTO v_partagees FROM categories
    WHERE visible_professionnel AND visible_particulier;

  IF v_total <> 12 THEN
    RAISE EXCEPTION 'Attendu 12 catégories, trouvé %', v_total;
  END IF;
  IF v_partagees <> 1 THEN
    RAISE EXCEPTION 'Attendu 1 catégorie partagée, trouvé %', v_partagees;
  END IF;

  RAISE NOTICE 'Seed catégories : 12 catégories, dont 1 partagée. OK.';
END $$;
