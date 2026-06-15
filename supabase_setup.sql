-- ============================================================================
-- DRAGON PHARMA STOREFRONT - SUPABASE SETUP SCRIPT
-- ============================================================================
-- Run this in your Supabase SQL Editor (https://supabase.com/dashboard)
-- Select your project, go to the SQL Editor, paste this code, and click RUN.

-- ────────────────────────────────────────────────────────────────────────────
-- 1. PROFILES & USER AUTHENTICATION SYNC
-- ────────────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Allow public read access to profiles
CREATE POLICY "Allow public read profiles" ON public.profiles
  FOR SELECT USING (true);

-- Allow users to update their own profile
CREATE POLICY "Allow users to update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Trigger function to automatically create a profile row upon signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, name, email)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'name', ''),
    new.email
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to execute handler
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();


-- ────────────────────────────────────────────────────────────────────────────
-- 2. PRODUCTS TABLE
-- ────────────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.products (
  id BIGINT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  categorySlug TEXT NOT NULL,
  brand TEXT NOT NULL,
  brandSlug TEXT NOT NULL,
  substance TEXT NOT NULL,
  classification TEXT NOT NULL,
  form TEXT NOT NULL,
  halfLife TEXT NOT NULL,
  dosage TEXT NOT NULL,
  acne TEXT NOT NULL,
  waterRetention TEXT NOT NULL,
  hbp TEXT NOT NULL,
  hepatotoxicity TEXT NOT NULL,
  aromatization TEXT NOT NULL,
  image TEXT NOT NULL,
  intPrice NUMERIC NOT NULL,
  usaPrice NUMERIC NOT NULL,
  intOriginalPrice NUMERIC,
  usaOriginalPrice NUMERIC,
  discounts TEXT[] DEFAULT '{}',
  suggestions TEXT[] DEFAULT '{}',
  ribbons TEXT[] DEFAULT '{}',
  labTested BOOLEAN DEFAULT FALSE,
  labTestImage TEXT,
  featured BOOLEAN DEFAULT FALSE,
  bestSeller BOOLEAN DEFAULT FALSE,
  description TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on products
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Allow public read products
CREATE POLICY "Allow public read products" ON public.products
  FOR SELECT USING (true);

-- Allow public write products (for admin upload convenience)
CREATE POLICY "Allow public write products" ON public.products
  FOR ALL USING (true);


-- ────────────────────────────────────────────────────────────────────────────
-- 3. VIDEO REVIEWS TABLE
-- ────────────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.video_reviews (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  author TEXT NOT NULL,
  rating INTEGER NOT NULL,
  date TEXT NOT NULL,
  description TEXT NOT NULL,
  videoType TEXT NOT NULL,
  videoUrl TEXT,
  fileId TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on video_reviews
ALTER TABLE public.video_reviews ENABLE ROW LEVEL SECURITY;

-- Allow public read video_reviews
CREATE POLICY "Allow public read video_reviews" ON public.video_reviews
  FOR SELECT USING (true);

-- Allow public write video_reviews
CREATE POLICY "Allow public write video_reviews" ON public.video_reviews
  FOR ALL USING (true);


-- ────────────────────────────────────────────────────────────────────────────
-- 4. ORDERS TABLE
-- ────────────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.orders (
  id TEXT PRIMARY KEY,
  date TIMESTAMP WITH TIME ZONE NOT NULL,
  status TEXT NOT NULL,
  customer JSONB NOT NULL,
  items JSONB NOT NULL,
  paymentMethod TEXT NOT NULL,
  shippingSpeed TEXT NOT NULL,
  subtotal NUMERIC NOT NULL,
  promoCode TEXT,
  promoDiscount NUMERIC NOT NULL,
  cryptoDiscount NUMERIC NOT NULL,
  shippingFee NUMERIC NOT NULL,
  total NUMERIC NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on orders
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Allow public read orders
CREATE POLICY "Allow public read orders" ON public.orders
  FOR SELECT USING (true);

-- Allow public write orders
CREATE POLICY "Allow public write orders" ON public.orders
  FOR ALL USING (true);


-- ────────────────────────────────────────────────────────────────────────────
-- 5. STORAGE BUCKETS & POLICIES
-- ────────────────────────────────────────────────────────────────────────────

-- Note: In Supabase, storage buckets can be initialized via direct inserts
INSERT INTO storage.buckets (id, name, public) 
VALUES 
  ('product-images', 'product-images', true),
  ('lab-test-images', 'lab-test-images', true),
  ('video-reviews', 'video-reviews', true)
ON CONFLICT (id) DO NOTHING;

-- Storage object policies (ensure objects have public read/write permission)
CREATE POLICY "Storage public read" ON storage.objects FOR SELECT USING (true);
CREATE POLICY "Storage public insert" ON storage.objects FOR INSERT WITH CHECK (true);
CREATE POLICY "Storage public update" ON storage.objects FOR UPDATE USING (true);
CREATE POLICY "Storage public delete" ON storage.objects FOR DELETE USING (true);


-- ────────────────────────────────────────────────────────────────────────────
-- 6. SEED DATA - DEFAULT CATALOG PRODUCTS
-- ────────────────────────────────────────────────────────────────────────────

INSERT INTO public.products (
  id, slug, name, category, categorySlug, brand, brandSlug, substance, 
  classification, form, halfLife, dosage, acne, waterRetention, hbp, 
  hepatotoxicity, aromatization, image, intPrice, usaPrice, intOriginalPrice, 
  usaOriginalPrice, discounts, suggestions, ribbons, labTested, labTestImage, 
  featured, bestSeller, description
) VALUES
(
  2807, 'dianabol-2807', 'DIANABOL 20', 'Oral Anabolic Steroids', 'orals-380', 
  'Dragon Pharma', 'buy-2194', 'Methandrostanolone', 'ANDROGEN; ANABOLIC STEROID', 
  '100 PILLS x 20 MG', '3.2–4.5 HOURS', 'MEN 20 MG/DAY', 'YES', 'HIGH', 'YES', 
  'YES', 'HIGH', 'https://www.dragonpharma.net/uploads/dragonpharmanet/products/dianabol-20-2807--s512.webp', 
  28.5, 58.0, 57.0, 116.0, 
  ARRAY['You will save $28.50'], 
  ARRAY[]::TEXT[], 
  ARRAY['Lab Tested', 'Domestic & International', '-50% OFF'], 
  TRUE, 'https://www.dragonpharma.net/uploads/dragonpharmanet/dianabol-20-lab-test-2025-04-18.webp', 
  TRUE, FALSE, 'Dianabol 20 by Dragon Pharma is one of the most popular oral anabolic steroids. Methandrostanolone promotes rapid muscle mass and strength gains.'
),
(
  2822, 'winstrol-2822', 'WINSTROL 50', 'Oral Anabolic Steroids', 'orals-380', 
  'Dragon Pharma', 'buy-2194', 'Stanozolol', 'ANDROGEN; ANABOLIC STEROID', 
  '100 PILLS x 50 MG', '9 HOURS', 'MEN 10–20 MG/DAY', 'YES', 'NO', 'PERHAPS', 
  'YES', 'NO', 'https://www.dragonpharma.net/uploads/dragonpharmanet/products/winstrol-50-2822--s512.webp', 
  40.0, 75.0, 80.0, 150.0, 
  ARRAY['You will save $40.00'], 
  ARRAY[]::TEXT[], 
  ARRAY['Lab Tested', 'Domestic & International', '-50% OFF'], 
  TRUE, 'https://www.dragonpharma.net/uploads/dragonpharmanet/winstrol-50-lab-test-2025-04-18.webp', 
  TRUE, FALSE, 'Winstrol 50 (Stanozolol) is a popular cutting steroid known for enhancing strength and speed without significant water retention.'
),
(
  2917, 'cypionat-2917', 'CYPIONAT 250', 'Injectable Anabolic Steroids', 'injectables-391', 
  'Dragon Pharma', 'buy-2194', 'Testosterone Cypionate', 'ANDROGEN; ANABOLIC STEROID; ANDROGEN ESTER', 
  '10 ML VIAL x 250 MG', '15–16 DAYS', 'MEN 50–200 MG/WEEK', 'YES', 'YES', 'PERHAPS', 
  'NO', 'YES', 'https://www.dragonpharma.net/uploads/dragonpharmanet/products/cypionat-2917--s512.webp', 
  26.5, 101.0, 53.0, NULL, 
  ARRAY['You will save $26.50'], 
  ARRAY[]::TEXT[], 
  ARRAY['Lab Tested', 'Domestic & International', '-50% OFF'], 
  TRUE, 'https://www.dragonpharma.net/uploads/dragonpharmanet/cypionat-lab-test-2026-03-20.webp', 
  TRUE, FALSE, 'Cypionat 250 is a long-acting testosterone ester commonly used in bulking cycles for massive muscle and strength gains.'
),
(
  2916, 'eq-2916', 'EQ 300', 'Injectable Anabolic Steroids', 'injectables-391', 
  'Dragon Pharma', 'buy-2194', 'Boldenone Undecylenate', 'ANDROGEN; ANABOLIC STEROID; ANDROGEN ESTER', 
  '10 ML VIAL x 300 MG', '14 DAYS', 'MEN 400–1000 MG/WEEK', 'RARELY', 'LOW', 'NO', 
  'LOW', 'LOW', 'https://www.dragonpharma.net/uploads/dragonpharmanet/products/eq-300-2916--s512.webp', 
  66.0, 116.0, NULL, NULL, 
  ARRAY[]::TEXT[], 
  ARRAY['Buy 3 and get 1 of ''EQ 300'' for FREE', 'Buy 5+ for $62.70 and save $16.50'], 
  ARRAY['Lab Tested', 'Domestic & International', 'Buy 3 Get 1 FREE'], 
  TRUE, 'https://www.dragonpharma.net/uploads/dragonpharmanet/eq-300-lab-test-2025-11-20.webp', 
  TRUE, FALSE, 'EQ 300 (Boldenone Undecylenate) promotes lean muscle growth and increased appetite with low estrogenic activity.'
),
(
  2918, 'masteron-2918', 'MASTERON 100', 'Injectable Anabolic Steroids', 'injectables-391', 
  'Dragon Pharma', 'buy-2194', 'Drostanolone Propionate', 'ANDROGEN; ANABOLIC STEROID; ANDROGEN ESTER', 
  '10 ML VIAL x 100 MG', '1–1.5 DAYS', 'MEN 300–700 MG/WEEK', 'YES', 'NO', 'NO', 
  'LOW', 'NO', 'https://www.dragonpharma.net/uploads/dragonpharmanet/products/masteron-100-2918--s512.webp', 
  113.0, 142.0, NULL, NULL, 
  ARRAY[]::TEXT[], 
  ARRAY['Buy 3 and get 1 of ''Masteron 100'' for FREE', 'Buy 5+ for $107.35 and save $28.25'], 
  ARRAY['Domestic & International', 'Buy 3 Get 1 FREE'], 
  FALSE, NULL, 
  TRUE, FALSE, 'Masteron 100 (Drostanolone Propionate) is a popular cutting compound that adds hardness and definition.'
),
(
  2919, 'masteron-2919', 'MASTERON 200', 'Injectable Anabolic Steroids', 'injectables-391', 
  'Dragon Pharma', 'buy-2194', 'Drostanolone Enanthate', 'ANDROGEN; ANABOLIC STEROID; ANDROGEN ESTER', 
  '10 ML VIAL x 200 MG', '8 DAYS', 'MEN 400–600 MG/WEEK', 'YES', '25.00%', 'YES', 
  'NO', 'NO', 'https://www.dragonpharma.net/uploads/dragonpharmanet/products/masteron-200-2919--s512.webp', 
  125.0, 150.0, NULL, NULL, 
  ARRAY[]::TEXT[], 
  ARRAY['Buy 2 and get 1 of ''Masteron 200'' for FREE'], 
  ARRAY['Lab Tested', 'Domestic & International', 'Buy 2 Get 1 FREE'], 
  TRUE, 'https://www.dragonpharma.net/uploads/dragonpharmanet/masteron-200-lab-test-2026-03-25.webp', 
  FALSE, FALSE, 'Masteron 200 (Drostanolone Enanthate) offers longer-lasting effects with fewer injections than the propionate version.'
),
(
  46298, 'dragontropin-46298', 'DRAGONTROPIN HGH 100 IU', 'Peptides', 'peptides-414', 
  'Dragon Pharma', 'buy-2194', 'Somatropin (R-HGH)', 'GROWTH HORMONE ANALOG', 
  '1 KIT x 2 ML VIALS x 10 IU (LYOPHILIZED POWDER)', '2.5–3 DAYS', 'MEN 4–10 IU/DAY', 'NO', 'NO', 'NO', 
  'NO', 'NO', 'https://www.dragonpharma.net/uploads/dragonpharmanet/products/dragontropin-hgh-100-iu-46298--s512.webp', 
  275.0, 400.0, NULL, NULL, 
  ARRAY[]::TEXT[], 
  ARRAY[]::TEXT[], 
  ARRAY['Lab Tested', 'Domestic & International'], 
  TRUE, 'https://www.dragonpharma.net/uploads/dragonpharmanet/dragontropin-100-lab-test-2026-03-20.webp', 
  FALSE, TRUE, 'Dragontropin HGH 100 IU is Dragon Pharma''s premium Human Growth Hormone, lab-verified for purity and potency.'
),
(
  86967, 'dragontropin-hgh-200-iu-86967', 'DRAGONTROPIN HGH 200 IU', 'Peptides', 'peptides-414', 
  'Dragon Pharma', 'buy-2194', 'Somatropin (R-HGH)', 'HUMAN GROWTH HORMONE (HGH)', 
  '1 KIT x 2 ML VIALS x 20 IU (LYOPHILIZED POWDER)', '2–4 HOURS', '2–6 IU/DAY', 'NO', 'POSSIBLE AT HIGH DOSES', 'RARE', 
  'NO', 'NO', 'https://www.dragonpharma.net/uploads/dragonpharmanet/products/dragontropin-hgh-200-iu-86967--s512.webp', 
  475.0, 650.0, NULL, NULL, 
  ARRAY[]::TEXT[], 
  ARRAY[]::TEXT[], 
  ARRAY['Lab Tested', 'Domestic & International'], 
  TRUE, 'https://www.dragonpharma.net/uploads/dragonpharmanet/dragontropin-200-lab-test-2026-03-20.webp', 
  FALSE, TRUE, 'The 200 IU kit of Dragontropin HGH offers exceptional value for long-term growth hormone therapy and anti-aging protocols.'
),
(
  48731, 'bpc-157-48731', 'BPC 157', 'Peptides', 'peptides-414', 
  'Dragon Pharma', 'buy-2194', 'Pentadecapeptide', 'BODY PROTECTING COMPOUND', 
  '2 ML VIAL x 5 MG (LYOPHILIZED POWDER)', '~4–6 HOURS', '200–500 MCG/DAY', 'NOT REPORTED', 'NONE', 'NO KNOWN IMPACT', 
  'NONE', 'DOES NOT AROMATIZE', 'https://www.dragonpharma.net/uploads/dragonpharmanet/products/bpc-157-48731--s512.webp', 
  24.0, 48.0, 40.0, 80.0, 
  ARRAY['You will save $16.00'], 
  ARRAY[]::TEXT[], 
  ARRAY['Lab Tested', 'Domestic & International', '-40% OFF'], 
  TRUE, 'https://www.dragonpharma.net/uploads/dragonpharmanet/bpc-157-lab-test-2024-03-22.webp', 
  FALSE, TRUE, 'BPC 157 is a body-protecting peptide that promotes healing of tendons, muscles, and joints while improving gut health.'
),
(
  74034, 'mazdutide-10-mg-74034', 'MAZDUTIDE 10 MG', 'Peptides', 'peptides-414', 
  'Dragon Pharma', 'buy-2194', 'Mazdutide', 'DUAL GLUCAGON AGONIST; GLP-1 AGONIST', 
  '2 ML VIAL x 10 MG (LYOPHILIZED POWDER)', '158–180 HOURS', 'MEN 3–9 MG/WEEK', 'NO', 'NO', 'NO', 
  'NO', 'NO', 'https://www.dragonpharma.net/uploads/dragonpharmanet/products/mazdutide-10-mg-74034--s512.webp', 
  60.0, 108.0, 100.0, 180.0, 
  ARRAY['You will save $40.00'], 
  ARRAY[]::TEXT[], 
  ARRAY['Lab Tested', 'Domestic & International', '-40% OFF'], 
  TRUE, 'https://www.dragonpharma.net/uploads/dragonpharmanet/mazdutide-lab-test-2024-09-13.webp', 
  FALSE, TRUE, 'Mazdutide is a next-generation dual GLP-1/glucagon receptor agonist for effective weight management and metabolic health.'
),
(
  45650, 'mots-c-10mg-45650', 'MOTS-C 10 MG', 'Peptides', 'peptides-414', 
  'Dragon Pharma', 'buy-2194', 'MOTS-C', 'MITOCHONDRIAL-DERIVED PEPTIDE', 
  '2 ML VIAL x 10 MG (LYOPHILIZED POWDER)', '~3–4 HOURS', '5–10 MG/WEEK (SPLIT INJECTIONS)', 'NO', 'NO', 'NO IMPACT', 
  'NONE', 'DOES NOT AROMATIZE', 'https://www.dragonpharma.net/uploads/dragonpharmanet/products/mots-c-10-mg-45650--s512.webp', 
  42.0, 84.0, 70.0, 140.0, 
  ARRAY['You will save $28.00'], 
  ARRAY[]::TEXT[], 
  ARRAY['Domestic & International', '-40% OFF'], 
  FALSE, NULL, 
  FALSE, TRUE, 'MOTS-C is a mitochondria-derived peptide that regulates metabolism, improves insulin sensitivity, and enhances physical performance.'
),
(
  2838, 'anavar-2838', 'ANAVAR 10', 'Oral Anabolic Steroids', 'orals-380', 
  'Dragon Pharma', 'buy-2194', 'Oxandrolone', 'ANDROGEN; ANABOLIC STEROID', 
  '100 PILLS x 10 MG', '9 HOURS', 'MEN 2.5–50 MG/DAY', 'RARELY', 'NO', 'NO', 
  'LOW', 'NO', 'https://www.dragonpharma.net/uploads/dragonpharmanet/products/anavar-10-2838--s512.webp', 
  125.0, 175.0, NULL, NULL, 
  ARRAY[]::TEXT[], 
  ARRAY[]::TEXT[], 
  ARRAY['Lab Tested', 'Domestic & International'], 
  TRUE, 'https://www.dragonpharma.net/uploads/dragonpharmanet/anavar-10-lab-test-2026-03-26.webp', 
  FALSE, TRUE, 'Anavar 10 (Oxandrolone) is a mild yet effective oral steroid popular for cutting cycles, lean muscle retention, and strength.'
),
(
  2866, 'anavar-2866', 'ANAVAR 50', 'Oral Anabolic Steroids', 'orals-380', 
  'Dragon Pharma', 'buy-2194', 'Oxandrolone', 'ANDROGEN; ANABOLIC STEROID', 
  '100 PILLS x 50 MG', '9 HOURS', 'MEN 2.5–50 MG/DAY', 'RARELY', 'NO', 'NO', 
  'LOW', 'NO', 'https://www.dragonpharma.net/uploads/dragonpharmanet/products/anavar-50-2866--s512.webp', 
  275.0, 400.0, NULL, NULL, 
  ARRAY[]::TEXT[], 
  ARRAY[]::TEXT[], 
  ARRAY['Lab Tested', 'Domestic & International'], 
  TRUE, 'https://www.dragonpharma.net/uploads/dragonpharmanet/anavar-50-lab-test-2026-01-13.webp', 
  FALSE, TRUE, 'Anavar 50 offers a higher dose of Oxandrolone for experienced users seeking maximum strength and lean muscle gains.'
),
(
  3166, 'clenbuterol-3166', 'CLENBUTEROL', 'Fat Loss', 'fat-loss-397', 
  'Dragon Pharma', 'buy-2194', 'Clenbuterol', 'BETA-2 AGONIST; BRONCHODILATOR', 
  '100 TABS x 40 MCG', '35–40 HOURS', '20–120 MCG/DAY', 'NO', 'NO', 'YES', 
  'NO', 'NO', 'https://www.dragonpharma.net/uploads/dragonpharmanet/products/clenbuterol-3166--s512.webp', 
  44.0, 80.0, NULL, NULL, 
  ARRAY[]::TEXT[], 
  ARRAY[]::TEXT[], 
  ARRAY['Lab Tested', 'Domestic & International'], 
  TRUE, NULL, 
  FALSE, TRUE, 'Clenbuterol is a powerful thermogenic agent that increases metabolic rate and accelerates fat burning.'
),
(
  2912, 'sustanon-2912', 'SUSTANON 270', 'Injectable Anabolic Steroids', 'injectables-391', 
  'Dragon Pharma', 'buy-2194', 'Testosterone Mix', 'ANDROGEN; ANABOLIC STEROID', 
  '10 ML VIAL x 270 MG', '7–8 DAYS', 'MEN 250–1000 MG/WEEK', 'YES', 'YES', 'PERHAPS', 
  'NO', 'YES', 'https://www.dragonpharma.net/uploads/dragonpharmanet/products/sustanon-2912--s512.webp', 
  61.0, 105.0, NULL, NULL, 
  ARRAY[]::TEXT[], 
  ARRAY[]::TEXT[], 
  ARRAY['Lab Tested', 'Domestic & International'], 
  TRUE, NULL, 
  FALSE, TRUE, 'Sustanon 270 is a blend of four testosterone esters designed for sustained release and steady anabolic activity.'
),
(
  36988, 'testo-blend-36988', 'TESTO BLEND 350', 'Injectable Anabolic Steroids', 'injectables-391', 
  'Dragon Pharma', 'buy-2194', 'Testosterone Enanthate', 'INJECTABLE ANABOLIC ANDROGENIC STEROID', 
  '10 ML VIAL x 350 MG', '7–8 DAYS', 'MEN 350 MG/WEEK', 'YES', 'YES', 'PERHAPS', 
  'NO', 'YES', 'https://www.dragonpharma.net/uploads/dragonpharmanet/products/testo-blend-350-36988--s512.webp', 
  66.0, 105.0, NULL, NULL, 
  ARRAY[]::TEXT[], 
  ARRAY[]::TEXT[], 
  ARRAY['Lab Tested', 'Domestic & International'], 
  TRUE, NULL, 
  FALSE, TRUE, 'Testo Blend 350 combines Testosterone Propionate, Cypionate, and Enanthate for optimal synergistic anabolic effects.'
),
(
  2924, 'trenbolone-2924', 'TRENBOLONE 200', 'Injectable Anabolic Steroids', 'injectables-391', 
  'Dragon Pharma', 'buy-2194', 'Trenbolone Enanthate', 'ANDROGEN ESTER; ANABOLIC STEROID; PROGESTOGEN', 
  '10 ML VIAL x 200 MG', '5 DAYS', 'MEN 75–100 MG/WEEK', 'RARELY', 'YES', 'PERHAPS', 
  'YES', 'NO', 'https://www.dragonpharma.net/uploads/dragonpharmanet/products/trenbolone-200-2924--s512.webp', 
  134.0, 160.0, NULL, NULL, 
  ARRAY[]::TEXT[], 
  ARRAY[]::TEXT[], 
  ARRAY['Lab Tested', 'Domestic & International'], 
  TRUE, 'https://www.dragonpharma.net/uploads/dragonpharmanet/tren-200-lab-test-2025-04-18.webp', 
  FALSE, TRUE, 'Trenbolone 200 is one of the most powerful anabolic steroids available, delivering exceptional muscle hardness and strength.'
),
(
  2913, 'enantat-2913', 'ENANTAT 250', 'Injectable Anabolic Steroids', 'injectables-391', 
  'Dragon Pharma', 'buy-2194', 'Testosterone Enanthate', 'ANDROGEN; ANABOLIC STEROID; ANDROGEN ESTER', 
  '10 ML VIAL x 250 MG', '10–14 DAYS', 'MEN 250–500 MG/WEEK', 'YES', 'YES', 'PERHAPS', 
  'NO', 'YES', 'https://www.dragonpharma.net/uploads/dragonpharmanet/products/enantat-250-2913--s512.webp', 
  44.0, 88.0, NULL, NULL, 
  ARRAY[]::TEXT[], 
  ARRAY[]::TEXT[], 
  ARRAY['Lab Tested', 'Domestic & International'], 
  TRUE, 'https://www.dragonpharma.net/uploads/dragonpharmanet/enantat-250-lab-test-2026-03-25.webp', 
  FALSE, FALSE, 'Enantat 250 is a classic testosterone enanthate formulation ideal for beginner and experienced bulking cycles.'
),
(
  2930, 'cut-mix-2930', 'CUT MIX 150', 'Injectable Anabolic Steroids', 'injectables-391', 
  'Dragon Pharma', 'buy-2194', 'Testosterone Propionate / Drostanolone Propionate / Trenbolone Acetate', 'ANABOLIC STEROID BLEND', 
  '10 ML VIAL x 150 MG', '1–2 DAYS', 'MEN 150–450 MG/WEEK', 'YES', 'LOW', 'PERHAPS', 
  'LOW', 'LOW', 'https://www.dragonpharma.net/uploads/dragonpharmanet/products/cut-mix-150-2930--s512.webp', 
  72.0, 120.0, NULL, NULL, 
  ARRAY[]::TEXT[], 
  ARRAY[]::TEXT[], 
  ARRAY['Lab Tested', 'Domestic & International'], 
  TRUE, 'https://www.dragonpharma.net/uploads/dragonpharmanet/cut-mix-lab-test-2026-03-25.webp', 
  FALSE, FALSE, 'Cut Mix 150 is a powerful injectable blend for cutting cycles, combining three fast-acting esters for rapid results.'
)
ON CONFLICT (id) DO NOTHING;


-- ────────────────────────────────────────────────────────────────────────────
-- 7. SEED DATA - DEFAULT VIDEO REVIEWS
-- ────────────────────────────────────────────────────────────────────────────

INSERT INTO public.video_reviews (
  id, title, author, rating, date, description, videoType, videoUrl
) VALUES
(
  'vid-mock-1', '3-Month Cypionat 250 Transformation & Bloodwork Review', 'Marcus K.', 5, 'June 12, 2026',
  'Phenomenal gains in lean mass and strength. Blood panels came back clean. Highly recommend the US domestic warehouse.',
  'url', 'https://assets.mixkit.co/videos/preview/mixkit-gym-member-holding-a-heavy-dumbbell-40544-large.mp4'
),
(
  'vid-mock-2', 'Anavar 10 Cutting Cycle & Lab Test Authenticity Report', 'Derek S.', 5, 'June 05, 2026',
  'Verified purity levels. Vascularity and core hardness increased noticeably within two weeks. Zero side effects experienced.',
  'url', 'https://assets.mixkit.co/videos/preview/mixkit-man-training-his-biceps-with-dumbbells-41618-large.mp4'
),
(
  'vid-mock-3', 'BPC 157 & TB 500 Shoulder Injury Recovery Process', 'Sarah M.', 5, 'May 24, 2026',
  'After a severe rotator cuff tear, BPC 157 has accelerated my healing. Back to benching 85% of my max in only 6 weeks.',
  'url', 'https://assets.mixkit.co/videos/preview/mixkit-bodybuilder-training-in-the-gym-41615-large.mp4'
)
ON CONFLICT (id) DO NOTHING;


-- ────────────────────────────────────────────────────────────────────────────
-- 8. CONTACT MESSAGES TABLE
-- ────────────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.contact_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  order_id TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on contact_messages
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Allow public write access to contact_messages (to submit the form)
CREATE POLICY "Allow public insert contact_messages" ON public.contact_messages
  FOR INSERT WITH CHECK (true);

-- Allow authenticated read access to contact_messages
CREATE POLICY "Allow authenticated read contact_messages" ON public.contact_messages
  FOR SELECT TO authenticated USING (true);

