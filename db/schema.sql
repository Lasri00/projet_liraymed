-- =====================================================================
-- LIRAY MED — Tâche T1 : modélisation de la base de données
-- PostgreSQL 15+
-- =====================================================================

CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "citext";

-- ---------------------------------------------------------------------
-- 1. Types énumérés
-- ---------------------------------------------------------------------

CREATE TYPE profil          AS ENUM ('particulier', 'professionnel');
CREATE TYPE disponibilite   AS ENUM ('en_stock', 'sur_commande', 'rupture');
CREATE TYPE role_admin      AS ENUM ('principal', 'restreint');
CREATE TYPE module_admin    AS ENUM ('tableau_de_bord', 'produits', 'devis',
                                     'utilisateurs', 'statistiques');
CREATE TYPE niveau_droit    AS ENUM ('lecture', 'ecriture');
CREATE TYPE statut_devis    AS ENUM ('brouillon', 'emis', 'annule');
CREATE TYPE type_evenement  AS ENUM ('vue_produit', 'vue_categorie',
                                     'clic_whatsapp', 'telechargement_fiche',
                                     'envoi_contact');

-- ---------------------------------------------------------------------
-- 2. Utilitaires
-- ---------------------------------------------------------------------

-- Repli automatique vers le français (cahier des charges, section 3.1).
CREATE OR REPLACE FUNCTION trad(fr text, ar text, en text, locale text)
RETURNS text LANGUAGE sql IMMUTABLE AS $$
  SELECT COALESCE(
    NULLIF(TRIM(CASE locale WHEN 'ar' THEN ar WHEN 'en' THEN en ELSE fr END), ''),
    fr
  );
$$;

CREATE OR REPLACE FUNCTION touch_updated_at()
RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Note : la fonction description_produit() est définie en section 3,
-- après la création de la table produits dont elle dépend.

-- ---------------------------------------------------------------------
-- 3. Catalogue
-- ---------------------------------------------------------------------

CREATE TABLE categories (
  id                     uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  parent_id              uuid REFERENCES categories(id) ON DELETE RESTRICT,
  slug                   text NOT NULL UNIQUE,
  nom_fr                 text NOT NULL,
  nom_ar                 text,
  nom_en                 text,
  image_url              text,
  -- Filtrage par profil de navigation (section 4.1)
  visible_particulier    boolean NOT NULL DEFAULT true,
  visible_professionnel  boolean NOT NULL DEFAULT true,
  ordre                  integer NOT NULL DEFAULT 0,
  publiee                boolean NOT NULL DEFAULT true,
  created_at             timestamptz NOT NULL DEFAULT now(),
  updated_at             timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT cat_pas_son_propre_parent CHECK (id <> parent_id),
  CONSTRAINT cat_au_moins_un_profil
    CHECK (visible_particulier OR visible_professionnel)
);

-- Arborescence limitée à deux niveaux : catégorie -> sous-catégorie.
CREATE OR REPLACE FUNCTION check_profondeur_categorie()
RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  IF NEW.parent_id IS NOT NULL
     AND EXISTS (SELECT 1 FROM categories
                 WHERE id = NEW.parent_id AND parent_id IS NOT NULL) THEN
    RAISE EXCEPTION 'Arborescence limitée à deux niveaux';
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_profondeur_categorie
  BEFORE INSERT OR UPDATE ON categories
  FOR EACH ROW EXECUTE FUNCTION check_profondeur_categorie();

CREATE TRIGGER trg_categories_updated
  BEFORE UPDATE ON categories
  FOR EACH ROW EXECUTE FUNCTION touch_updated_at();

CREATE INDEX idx_categories_parent ON categories(parent_id);
CREATE INDEX idx_categories_profil
  ON categories(visible_particulier, visible_professionnel) WHERE publiee;


CREATE TABLE produits (
  id                     uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  categorie_id           uuid NOT NULL REFERENCES categories(id) ON DELETE RESTRICT,
  slug                   text NOT NULL UNIQUE,
  reference_fournisseur  text,

  nom_fr                 text NOT NULL,
  nom_ar                 text,
  nom_en                 text,

  description_pro_fr     text,
  description_pro_ar     text,
  description_pro_en     text,
  description_part_fr    text,
  description_part_ar    text,
  description_part_en    text,

  taille                 text,
  dimension              text,

  -- JAMAIS exposé publiquement (sections 4.3, 5.5, T14).
  prix_interne           numeric(10,2) CHECK (prix_interne >= 0),

  disponibilite          disponibilite NOT NULL DEFAULT 'sur_commande',
  stock_quantite         integer NOT NULL DEFAULT 0 CHECK (stock_quantite >= 0),
  seuil_alerte           integer NOT NULL DEFAULT 5 CHECK (seuil_alerte >= 0),

  fiche_technique_url    text,
  publie                 boolean NOT NULL DEFAULT false,
  created_at             timestamptz NOT NULL DEFAULT now(),
  updated_at             timestamptz NOT NULL DEFAULT now()
);

CREATE TRIGGER trg_produits_updated
  BEFORE UPDATE ON produits
  FOR EACH ROW EXECUTE FUNCTION touch_updated_at();

CREATE INDEX idx_produits_categorie ON produits(categorie_id) WHERE publie;
CREATE INDEX idx_produits_recents   ON produits(created_at DESC) WHERE publie;

-- Recherche produit de la page catalogue (T5).
CREATE INDEX idx_produits_recherche ON produits
  USING gin(to_tsvector('simple',
    coalesce(nom_fr,'') || ' ' || coalesce(nom_ar,'') || ' ' ||
    coalesce(nom_en,'') || ' ' || coalesce(reference_fournisseur,'')));


-- Repli à quatre niveaux pour la description affichée (sections 3.1 et 4.4).
-- Ordre : profil demandé dans la langue demandée, puis profil demandé en
-- français, puis autre profil dans la langue demandée, puis autre profil
-- en français. Ne retourne jamais NULL.
-- Le niveau technique prime sur la langue : un professionnel lit du
-- français technique plus utilement qu'une description grand public
-- dans sa langue.
CREATE OR REPLACE FUNCTION description_produit(
  p produits, p_profil profil, p_locale text
) RETURNS text LANGUAGE sql IMMUTABLE AS $$
  SELECT COALESCE(
    NULLIF(TRIM(CASE WHEN p_profil = 'professionnel'
      THEN CASE p_locale WHEN 'ar' THEN p.description_pro_ar
                         WHEN 'en' THEN p.description_pro_en
                         ELSE p.description_pro_fr END
      ELSE CASE p_locale WHEN 'ar' THEN p.description_part_ar
                         WHEN 'en' THEN p.description_part_en
                         ELSE p.description_part_fr END
    END), ''),
    NULLIF(TRIM(CASE WHEN p_profil = 'professionnel'
      THEN p.description_pro_fr ELSE p.description_part_fr END), ''),
    NULLIF(TRIM(CASE WHEN p_profil = 'professionnel'
      THEN CASE p_locale WHEN 'ar' THEN p.description_part_ar
                         WHEN 'en' THEN p.description_part_en
                         ELSE p.description_part_fr END
      ELSE CASE p_locale WHEN 'ar' THEN p.description_pro_ar
                         WHEN 'en' THEN p.description_pro_en
                         ELSE p.description_pro_fr END
    END), ''),
    NULLIF(TRIM(CASE WHEN p_profil = 'professionnel'
      THEN p.description_part_fr ELSE p.description_pro_fr END), ''),
    ''
  );
$$;


CREATE TABLE produit_images (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  produit_id  uuid NOT NULL REFERENCES produits(id) ON DELETE CASCADE,
  url         text NOT NULL,
  alt_fr      text,
  ordre       integer NOT NULL DEFAULT 0,
  principale  boolean NOT NULL DEFAULT false
);

CREATE INDEX idx_images_produit ON produit_images(produit_id, ordre);

-- Une seule photo principale par produit.
CREATE UNIQUE INDEX idx_image_principale_unique
  ON produit_images(produit_id) WHERE principale;


-- Variantes de coloris : 19 produits concernés (section 3.3).
-- photo_url NULL => la pastille reste cliquable, la photo principale
-- est conservée (section 4.4).
CREATE TABLE produit_variantes (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  produit_id  uuid NOT NULL REFERENCES produits(id) ON DELETE CASCADE,
  nom_fr      text NOT NULL,
  nom_ar      text,
  nom_en      text,
  code_hex    text CHECK (code_hex ~ '^#[0-9A-Fa-f]{6}$'),
  photo_url   text,
  ordre       integer NOT NULL DEFAULT 0,
  UNIQUE (produit_id, nom_fr)
);

CREATE INDEX idx_variantes_produit ON produit_variantes(produit_id, ordre);

-- ---------------------------------------------------------------------
-- 4. Comptes administrateurs et permissions
-- ---------------------------------------------------------------------

CREATE TABLE admins (
  id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email               citext NOT NULL UNIQUE,
  mot_de_passe_hash   text NOT NULL,
  nom                 text,
  role                role_admin NOT NULL,
  actif               boolean NOT NULL DEFAULT true,   -- false = suspendu
  derniere_connexion  timestamptz,
  created_at          timestamptz NOT NULL DEFAULT now(),
  updated_at          timestamptz NOT NULL DEFAULT now()
);

CREATE TRIGGER trg_admins_updated
  BEFORE UPDATE ON admins
  FOR EACH ROW EXECUTE FUNCTION touch_updated_at();

-- Garde-fou : il doit toujours rester un administrateur principal actif.
CREATE UNIQUE INDEX idx_un_seul_principal
  ON admins((role)) WHERE role = 'principal';

-- Absence de ligne = module INVISIBLE dans l'interface (T12),
-- et non simplement désactivé.
-- L'administrateur principal n'a aucune ligne ici : ses droits
-- découlent de son rôle.
CREATE TABLE admin_permissions (
  admin_id  uuid NOT NULL REFERENCES admins(id) ON DELETE CASCADE,
  module    module_admin NOT NULL,
  niveau    niveau_droit NOT NULL,
  PRIMARY KEY (admin_id, module)
);

CREATE OR REPLACE FUNCTION peut_acceder(p_admin uuid, p_module module_admin,
                                        p_ecriture boolean DEFAULT false)
RETURNS boolean LANGUAGE sql STABLE AS $$
  SELECT EXISTS (
    SELECT 1 FROM admins a
    WHERE a.id = p_admin AND a.actif AND (
      a.role = 'principal'
      OR EXISTS (
        SELECT 1 FROM admin_permissions p
        WHERE p.admin_id = a.id AND p.module = p_module
          AND (NOT p_ecriture OR p.niveau = 'ecriture')
      )
    )
  );
$$;

-- ---------------------------------------------------------------------
-- 5. Devis
-- ---------------------------------------------------------------------

-- Paramètres fournis par le Client avant le 23 octobre 2026 (section 9.2).
CREATE TABLE parametres_devis (
  id                    integer PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  prefixe_numero        text NOT NULL DEFAULT 'DEV',
  taux_tva              numeric(5,2) NOT NULL DEFAULT 20,
  duree_validite_jours  integer NOT NULL DEFAULT 30,
  conditions_reglement  text,
  mentions_legales      text,
  updated_at            timestamptz NOT NULL DEFAULT now()
);

INSERT INTO parametres_devis (id) VALUES (1);

-- Numérotation continue : un compteur par année.
CREATE TABLE compteur_devis (
  annee           integer PRIMARY KEY,
  dernier_numero  integer NOT NULL DEFAULT 0
);

CREATE TABLE devis (
  id                    uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  -- NULL tant que le devis est un brouillon : un brouillon abandonné
  -- ne consomme pas de numéro (section 4.5, numérotation continue).
  numero                text UNIQUE,
  statut                statut_devis NOT NULL DEFAULT 'brouillon',
  date_emission         date,
  duree_validite_jours  integer,

  -- Destinataire (recopié, pas de table client au périmètre)
  client_nom            text NOT NULL,
  client_entreprise     text,
  client_email          text,
  client_telephone      text,
  client_adresse        text,
  client_ville          text,

  -- Montants figés à l'émission
  taux_tva              numeric(5,2) NOT NULL,
  total_ht              numeric(12,2) NOT NULL DEFAULT 0,
  montant_tva           numeric(12,2) NOT NULL DEFAULT 0,
  total_ttc             numeric(12,2) NOT NULL DEFAULT 0,
  conditions_reglement  text,

  pdf_url               text,
  cree_par              uuid REFERENCES admins(id) ON DELETE SET NULL,
  created_at            timestamptz NOT NULL DEFAULT now(),
  updated_at            timestamptz NOT NULL DEFAULT now(),

  CONSTRAINT devis_emis_complet CHECK (
    statut <> 'emis' OR (numero IS NOT NULL AND date_emission IS NOT NULL)
  )
);

CREATE TRIGGER trg_devis_updated
  BEFORE UPDATE ON devis
  FOR EACH ROW EXECUTE FUNCTION touch_updated_at();

CREATE INDEX idx_devis_statut  ON devis(statut, date_emission DESC);
CREATE INDEX idx_devis_periode ON devis(date_emission) WHERE statut = 'emis';


-- Les lignes recopient les données produit : un devis retéléchargé
-- des mois plus tard reste strictement identique, même si le produit
-- a changé entre-temps (section 4.5).
CREATE TABLE devis_lignes (
  id             uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  devis_id       uuid NOT NULL REFERENCES devis(id) ON DELETE CASCADE,
  -- Conservé uniquement pour la statistique « produits les plus devisés ».
  produit_id     uuid REFERENCES produits(id) ON DELETE SET NULL,
  designation    text NOT NULL,
  reference      text,
  taille         text,
  dimension      text,
  quantite       integer NOT NULL CHECK (quantite > 0),
  prix_unitaire  numeric(10,2) NOT NULL CHECK (prix_unitaire >= 0),
  montant        numeric(12,2) GENERATED ALWAYS AS
                   (quantite * prix_unitaire) STORED,
  ordre          integer NOT NULL DEFAULT 0
);

CREATE INDEX idx_lignes_devis   ON devis_lignes(devis_id, ordre);
CREATE INDEX idx_lignes_produit ON devis_lignes(produit_id);


-- Émission d'un devis : attribution atomique du numéro et calcul des totaux.
CREATE OR REPLACE FUNCTION emettre_devis(p_devis uuid)
RETURNS text LANGUAGE plpgsql AS $$
DECLARE
  v_annee    integer := EXTRACT(YEAR FROM CURRENT_DATE);
  v_seq      integer;
  v_prefixe  text;
  v_numero   text;
  v_ht       numeric(12,2);
  v_tva      numeric(5,2);
BEGIN
  IF (SELECT statut FROM devis WHERE id = p_devis) <> 'brouillon' THEN
    RAISE EXCEPTION 'Ce devis a déjà été émis';
  END IF;

  SELECT prefixe_numero INTO v_prefixe FROM parametres_devis WHERE id = 1;

  INSERT INTO compteur_devis (annee, dernier_numero)
  VALUES (v_annee, 1)
  ON CONFLICT (annee) DO UPDATE
    SET dernier_numero = compteur_devis.dernier_numero + 1
  RETURNING dernier_numero INTO v_seq;

  v_numero := format('%s-%s-%s', v_prefixe, v_annee, lpad(v_seq::text, 4, '0'));

  SELECT COALESCE(SUM(montant), 0) INTO v_ht
  FROM devis_lignes WHERE devis_id = p_devis;

  SELECT taux_tva INTO v_tva FROM devis WHERE id = p_devis;

  UPDATE devis SET
    numero        = v_numero,
    statut        = 'emis',
    date_emission = CURRENT_DATE,
    total_ht      = v_ht,
    montant_tva   = ROUND(v_ht * v_tva / 100, 2),
    total_ttc     = v_ht + ROUND(v_ht * v_tva / 100, 2)
  WHERE id = p_devis;

  RETURN v_numero;
END;
$$;

-- ---------------------------------------------------------------------
-- 6. Demandes de contact
-- ---------------------------------------------------------------------

CREATE TABLE demandes_contact (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  profil      profil,
  nom         text NOT NULL,
  prenom      text,
  email       text NOT NULL,
  telephone   text,
  ville       text,
  entreprise  text,
  message     text NOT NULL,
  langue      text CHECK (langue IN ('fr','ar','en')),
  traitee     boolean NOT NULL DEFAULT false,
  created_at  timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_contact_date    ON demandes_contact(created_at DESC);
CREATE INDEX idx_contact_traitee ON demandes_contact(traitee) WHERE NOT traitee;

-- ---------------------------------------------------------------------
-- 7. Événements pour les statistiques (T13)
-- ---------------------------------------------------------------------
-- Aucune adresse IP n'est conservée : ville dérivée et empreinte de
-- session uniquement (loi 09-08, section 5.5).

CREATE TABLE evenements (
  id            bigserial PRIMARY KEY,
  type          type_evenement NOT NULL,
  produit_id    uuid REFERENCES produits(id) ON DELETE SET NULL,
  categorie_id  uuid REFERENCES categories(id) ON DELETE SET NULL,
  profil        profil,
  langue        text CHECK (langue IN ('fr','ar','en')),
  ville         text,
  session_hash  text,
  created_at    timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_evt_type_date ON evenements(type, created_at DESC);
CREATE INDEX idx_evt_produit   ON evenements(produit_id, created_at DESC);
CREATE INDEX idx_evt_categorie ON evenements(categorie_id, created_at DESC);
CREATE INDEX idx_evt_profil    ON evenements(profil, created_at DESC);

-- ---------------------------------------------------------------------
-- 8. Vues publiques — le prix interne et le stock chiffré
--    n'y figurent pas. Les interfaces publiques ne lisent que ces vues.
-- ---------------------------------------------------------------------

CREATE VIEW v_categories_public AS
SELECT id, parent_id, slug, nom_fr, nom_ar, nom_en, image_url,
       visible_particulier, visible_professionnel, ordre
FROM categories
WHERE publiee;

CREATE VIEW v_produits_public AS
SELECT p.id, p.slug, p.categorie_id, p.reference_fournisseur,
       p.nom_fr, p.nom_ar, p.nom_en,
       p.description_pro_fr,  p.description_pro_ar,  p.description_pro_en,
       p.description_part_fr, p.description_part_ar, p.description_part_en,
       p.taille, p.dimension,
       p.disponibilite,          -- trois états, jamais la quantité
       p.fiche_technique_url,
       p.created_at
FROM produits p
JOIN categories c ON c.id = p.categorie_id
WHERE p.publie AND c.publiee;

-- Compteurs de l'arborescence de filtres (T5).
CREATE VIEW v_compteurs_categories AS
SELECT c.id AS categorie_id,
       count(p.id) FILTER (WHERE c.visible_particulier)   AS nb_particulier,
       count(p.id) FILTER (WHERE c.visible_professionnel) AS nb_professionnel
FROM categories c
LEFT JOIN produits p ON p.categorie_id = c.id AND p.publie
WHERE c.publiee
GROUP BY c.id;

-- Alertes de rupture du tableau de bord (T10).
CREATE VIEW v_alertes_stock AS
SELECT id, nom_fr, reference_fournisseur, stock_quantite,
       seuil_alerte, disponibilite
FROM produits
WHERE publie
  AND (disponibilite = 'rupture' OR stock_quantite <= seuil_alerte)
ORDER BY stock_quantite ASC;
