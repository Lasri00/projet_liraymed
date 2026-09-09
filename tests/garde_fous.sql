-- =====================================================================
-- LIRAY MED — Garde-fous contractuels
-- Exécution : psql $DATABASE_URL -f tests/garde_fous.sql
-- Sort en erreur si un invariant du cahier des charges est enfreint.
-- À lancer avant chaque démonstration client et dans la CI.
-- =====================================================================

\set ON_ERROR_STOP on

DO $$
DECLARE
  v_col text;
  v_n   integer;
BEGIN

  -- -------------------------------------------------------------------
  -- 1. Le prix interne n'est jamais exposé par une vue publique
  --    (sections 4.3, 5.5, tâche T14)
  -- -------------------------------------------------------------------
  SELECT string_agg(table_name || '.' || column_name, ', ')
  INTO v_col
  FROM information_schema.columns
  WHERE table_schema = 'public'
    AND table_name LIKE 'v\_%\_public'
    AND column_name = 'prix_interne';

  IF v_col IS NOT NULL THEN
    RAISE EXCEPTION 'VIOLATION T14 : prix interne exposé dans %', v_col;
  END IF;

  -- -------------------------------------------------------------------
  -- 2. La quantité de stock chiffrée n'est pas publique.
  --    Le public voit trois états, jamais un nombre.
  -- -------------------------------------------------------------------
  SELECT string_agg(table_name || '.' || column_name, ', ')
  INTO v_col
  FROM information_schema.columns
  WHERE table_schema = 'public'
    AND table_name LIKE 'v\_%\_public'
    AND column_name IN ('stock_quantite', 'seuil_alerte');

  IF v_col IS NOT NULL THEN
    RAISE EXCEPTION 'VIOLATION : stock chiffré exposé dans %', v_col;
  END IF;

  -- -------------------------------------------------------------------
  -- 3. Aucun produit non publié ne remonte dans la vue publique
  -- -------------------------------------------------------------------
  SELECT count(*) INTO v_n
  FROM v_produits_public v
  JOIN produits p ON p.id = v.id
  WHERE NOT p.publie;

  IF v_n > 0 THEN
    RAISE EXCEPTION 'VIOLATION : % produit(s) non publié(s) visible(s)', v_n;
  END IF;

  -- -------------------------------------------------------------------
  -- 4. Numérotation des devis : continue et sans doublon (section 4.5)
  -- -------------------------------------------------------------------
  SELECT count(*) INTO v_n
  FROM devis WHERE statut = 'emis' AND numero IS NULL;

  IF v_n > 0 THEN
    RAISE EXCEPTION 'VIOLATION : % devis émis sans numéro', v_n;
  END IF;

  SELECT count(*) INTO v_n
  FROM devis WHERE statut = 'brouillon' AND numero IS NOT NULL;

  IF v_n > 0 THEN
    RAISE EXCEPTION 'VIOLATION : % brouillon(s) consomme(nt) un numéro', v_n;
  END IF;

  SELECT count(*) INTO v_n FROM (
    SELECT numero FROM devis WHERE numero IS NOT NULL
    GROUP BY numero HAVING count(*) > 1
  ) doublons;

  IF v_n > 0 THEN
    RAISE EXCEPTION 'VIOLATION : % numéro(s) de devis en double', v_n;
  END IF;

  -- -------------------------------------------------------------------
  -- 5. Les lignes de devis sont autonomes : désignation et prix recopiés.
  --    Un devis retéléchargé reste identique même si le produit change.
  -- -------------------------------------------------------------------
  SELECT count(*) INTO v_n
  FROM devis_lignes
  WHERE designation IS NULL OR TRIM(designation) = '' OR prix_unitaire IS NULL;

  IF v_n > 0 THEN
    RAISE EXCEPTION 'VIOLATION : % ligne(s) de devis sans données recopiées', v_n;
  END IF;

  -- -------------------------------------------------------------------
  -- 6. Comptes administrateurs (section 4.7, tâche T12)
  -- -------------------------------------------------------------------
  SELECT count(*) INTO v_n
  FROM admins WHERE role = 'principal' AND actif;

  IF v_n <> 1 THEN
    RAISE EXCEPTION
      'VIOLATION : % administrateur(s) principal(aux) actif(s), attendu 1', v_n;
  END IF;

  -- L'administrateur principal ne doit pas avoir de lignes de permission :
  -- ses droits découlent de son rôle, pas d'une attribution.
  SELECT count(*) INTO v_n
  FROM admin_permissions p
  JOIN admins a ON a.id = p.admin_id
  WHERE a.role = 'principal';

  IF v_n > 0 THEN
    RAISE EXCEPTION
      'VIOLATION : l''administrateur principal a des permissions explicites';
  END IF;

  -- -------------------------------------------------------------------
  -- 7. Loi 09-08 : aucune colonne d'adresse IP dans les événements
  -- -------------------------------------------------------------------
  SELECT string_agg(column_name, ', ') INTO v_col
  FROM information_schema.columns
  WHERE table_schema = 'public'
    AND table_name = 'evenements'
    AND (column_name ILIKE '%ip%' OR data_type IN ('inet', 'cidr'));

  IF v_col IS NOT NULL THEN
    RAISE EXCEPTION 'VIOLATION 09-08 : adresse IP conservée (%)', v_col;
  END IF;

  -- -------------------------------------------------------------------
  -- 8. Cohérence catalogue
  -- -------------------------------------------------------------------
  SELECT count(*) INTO v_n
  FROM categories WHERE NOT visible_particulier AND NOT visible_professionnel;

  IF v_n > 0 THEN
    RAISE EXCEPTION 'VIOLATION : % catégorie(s) invisible(s) aux deux profils', v_n;
  END IF;

  SELECT count(*) INTO v_n
  FROM produits WHERE publie AND (nom_fr IS NULL OR TRIM(nom_fr) = '');

  IF v_n > 0 THEN
    RAISE EXCEPTION
      'VIOLATION : % produit(s) publié(s) sans nom français (repli impossible)', v_n;
  END IF;

  RAISE NOTICE 'Garde-fous : tous les invariants sont respectés.';

END $$;
