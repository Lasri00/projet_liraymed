-- =====================================================================
-- LIRAY MED — Seed comptes, devis et contacts (tâche T1)
--
-- ATTENTION : mots de passe de DÉVELOPPEMENT uniquement.
-- Ne jamais exécuter ce fichier sur la base de production.
-- Les comptes réels sont créés à la main lors de T16, avec des mots
-- de passe choisis par les titulaires désignés par Liray Med.
-- =====================================================================

-- ---------------------------------------------------------------------
-- 1. Comptes administrateurs (section 4.7)
--    Deux comptes : un principal, un restreint.
-- ---------------------------------------------------------------------

-- Mot de passe de dev : LirayDev2026!
INSERT INTO admins (email, mot_de_passe_hash, nom, role, actif) VALUES
  ('admin@lirymed.com',
   '$2b$12$nxZu9zL8TBuzac5iJ/uMtO0vgcgn3rb/sUMkjVVsG/YQnrtOk9P9e',
   'Administrateur principal', 'principal', true);

-- Mot de passe de dev : LirayResto2026!
-- Compte restreint : accès aux devis uniquement, en écriture.
-- Les autres modules doivent être INVISIBLES dans son interface (T12).
INSERT INTO admins (email, mot_de_passe_hash, nom, role, actif) VALUES
  ('commercial@lirymed.com',
   '$2b$12$E.lH3Yx1VEDkJ8yeOQszEuoFKNWHsJXqWeAatgAYrtVBArPx4JUmi',
   'Service commercial', 'restreint', true);

INSERT INTO admin_permissions (admin_id, module, niveau)
SELECT id, 'devis', 'ecriture' FROM admins WHERE email = 'commercial@lirymed.com';

-- Volontairement AUCUNE autre ligne pour ce compte : ni produits, ni
-- utilisateurs, ni statistiques, ni tableau de bord. C'est ce qui sera
-- démontré en T12.

-- ---------------------------------------------------------------------
-- 2. Paramètres de devis
--    Valeurs provisoires. Le Client fournit son modèle définitif
--    avant le 23 octobre 2026 (section 9.2).
-- ---------------------------------------------------------------------

UPDATE parametres_devis SET
  prefixe_numero       = 'DEV',
  taux_tva             = 20.00,
  duree_validite_jours = 30,
  conditions_reglement = 'Règlement à 30 jours à compter de la date de facture.',
  mentions_legales     = 'Liray Med SARL — RC 598339 — ICE 003378177000067
276, Bd Ibn Tachefine, 3ème étage, Casablanca'
WHERE id = 1;

-- ---------------------------------------------------------------------
-- 3. Devis de test
--    Un brouillon SANS numéro et un devis émis AVEC numéro :
--    c'est ce qui prouve la numérotation continue (section 4.5).
-- ---------------------------------------------------------------------

-- 3a. Brouillon — ne doit consommer aucun numéro
WITH d AS (
  INSERT INTO devis (client_nom, client_entreprise, client_email,
                     client_telephone, client_ville, taux_tva,
                     duree_validite_jours, conditions_reglement, cree_par)
  SELECT 'Dr. Karim Benali', 'Cabinet médical Anfa', 'contact@example.ma',
         '0522000000', 'Casablanca', 20.00, 30,
         'Règlement à 30 jours.', id
  FROM admins WHERE email = 'admin@lirymed.com'
  RETURNING id
)
INSERT INTO devis_lignes (devis_id, designation, reference, taille,
                          dimension, quantite, prix_unitaire, ordre)
SELECT d.id, 'Déambulateur pliant deux roues', 'MLS-AM-104', 'Standard',
       '60 x 55 x 90 cm', 4, 850.00, 1
FROM d;

-- 3b. Devis à émettre — le numéro sera attribué par la fonction
WITH d AS (
  INSERT INTO devis (client_nom, client_entreprise, client_email,
                     client_telephone, client_ville, taux_tva,
                     duree_validite_jours, conditions_reglement, cree_par)
  SELECT 'Clinique Al Madina', 'Clinique Al Madina', 'achats@example.ma',
         '0522111111', 'Casablanca', 20.00, 30,
         'Règlement à 30 jours.', id
  FROM admins WHERE email = 'admin@lirymed.com'
  RETURNING id
)
INSERT INTO devis_lignes (devis_id, designation, reference, taille,
                          dimension, quantite, prix_unitaire, ordre)
SELECT d.id, 'Blouse médicale manches longues', 'MLS-HM-221', 'L',
       NULL, 25, 180.00, 1
FROM d;

-- Émission : attribue DEV-2026-0001 et calcule les totaux.
SELECT emettre_devis(id) FROM devis
WHERE client_nom = 'Clinique Al Madina' AND statut = 'brouillon';

-- ---------------------------------------------------------------------
-- 4. Demandes de contact
-- ---------------------------------------------------------------------

INSERT INTO demandes_contact
  (profil, nom, prenom, email, telephone, ville, entreprise, message, langue)
VALUES
  ('professionnel', 'Benali', 'Karim', 'k.benali@example.ma', '0661000001',
   'Casablanca', 'Cabinet médical Anfa',
   'Bonjour, je souhaite un devis pour du mobilier médical.', 'fr'),
  ('particulier', 'Idrissi', 'Salma', 's.idrissi@example.ma', '0661000002',
   'Rabat', NULL,
   'Bonjour, avez-vous des cannes anglaises réglables ?', 'fr'),
  ('particulier', 'Ouazzani', 'Youssef', 'y.ouazzani@example.ma', '0661000003',
   'Marrakech', NULL,
   'مرحبا، هل تتوفرون على أحذية طبية؟', 'ar'),
  ('professionnel', 'Tazi', 'Nadia', 'n.tazi@example.ma', '0661000004',
   'Fès', 'Laboratoire Tazi',
   'Hello, do you supply diagnostic equipment?', 'en');

-- ---------------------------------------------------------------------
-- 5. Vérifications
-- ---------------------------------------------------------------------

DO $$
DECLARE v_n integer; v_num text;
BEGIN
  SELECT count(*) INTO v_n FROM admins WHERE actif;
  IF v_n <> 2 THEN
    RAISE EXCEPTION 'Attendu 2 comptes actifs, trouvé %', v_n;
  END IF;

  SELECT count(*) INTO v_n FROM admin_permissions;
  IF v_n <> 1 THEN
    RAISE EXCEPTION 'Attendu 1 permission pour le compte restreint, trouvé %', v_n;
  END IF;

  SELECT numero INTO v_num FROM devis WHERE statut = 'emis';
  IF v_num IS DISTINCT FROM 'DEV-2026-0001' THEN
    RAISE EXCEPTION 'Numéro attendu DEV-2026-0001, obtenu %', COALESCE(v_num, 'NULL');
  END IF;

  SELECT count(*) INTO v_n FROM devis WHERE statut = 'brouillon' AND numero IS NOT NULL;
  IF v_n <> 0 THEN
    RAISE EXCEPTION 'Un brouillon consomme un numéro';
  END IF;

  RAISE NOTICE 'Seed comptes, devis et contacts : OK.';
END $$;
