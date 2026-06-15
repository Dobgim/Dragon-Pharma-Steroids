import { supabase } from './supabase-client';

export interface Product {
  id: number;
  slug: string;
  name: string;
  category: string;
  categorySlug: string;
  brand: string;
  brandSlug: string;
  substance: string;
  classification: string;
  form: string;
  halfLife: string;
  dosage: string;
  acne: string;
  waterRetention: string;
  hbp: string;
  hepatotoxicity: string;
  aromatization: string;
  image: string;
  intPrice: number;
  usaPrice: number;
  intOriginalPrice?: number;
  usaOriginalPrice?: number;
  discounts: string[];
  suggestions: string[];
  ribbons: string[];
  labTested: boolean;
  labTestImage?: string;
  featured?: boolean;
  bestSeller?: boolean;
  description: string;
}

export const products: Product[] = [
  {
    id: 2807,
    slug: 'dianabol-2807',
    name: 'DIANABOL 20',
    category: 'Oral Anabolic Steroids',
    categorySlug: 'orals-380',
    brand: 'Dragon Pharma',
    brandSlug: 'buy-2194',
    substance: 'Methandrostanolone',
    classification: 'ANDROGEN; ANABOLIC STEROID',
    form: '100 PILLS x 20 MG',
    halfLife: '3.2–4.5 HOURS',
    dosage: 'MEN 20 MG/DAY',
    acne: 'YES',
    waterRetention: 'HIGH',
    hbp: 'YES',
    hepatotoxicity: 'YES',
    aromatization: 'HIGH',
    image: 'https://www.dragonpharma.net/uploads/dragonpharmanet/products/dianabol-20-2807--s512.webp',
    intPrice: 28.5,
    usaPrice: 58,
    intOriginalPrice: 57,
    usaOriginalPrice: 116,
    discounts: ['You will save $28.50'],
    suggestions: [],
    ribbons: ['Lab Tested', 'Domestic & International', '-50% OFF'],
    labTested: true,
    labTestImage: 'https://www.dragonpharma.net/uploads/dragonpharmanet/dianabol-20-lab-test-2025-04-18.webp',
    featured: true,
    description: 'Dianabol 20 by Dragon Pharma is one of the most popular oral anabolic steroids. Methandrostanolone promotes rapid muscle mass and strength gains.',
  },
  {
    id: 2822,
    slug: 'winstrol-2822',
    name: 'WINSTROL 50',
    category: 'Oral Anabolic Steroids',
    categorySlug: 'orals-380',
    brand: 'Dragon Pharma',
    brandSlug: 'buy-2194',
    substance: 'Stanozolol',
    classification: 'ANDROGEN; ANABOLIC STEROID',
    form: '100 PILLS x 50 MG',
    halfLife: '9 HOURS',
    dosage: 'MEN 10–20 MG/DAY',
    acne: 'YES',
    waterRetention: 'NO',
    hbp: 'PERHAPS',
    hepatotoxicity: 'YES',
    aromatization: 'NO',
    image: 'https://www.dragonpharma.net/uploads/dragonpharmanet/products/winstrol-50-2822--s512.webp',
    intPrice: 40,
    usaPrice: 75,
    intOriginalPrice: 80,
    usaOriginalPrice: 150,
    discounts: ['You will save $40.00'],
    suggestions: [],
    ribbons: ['Lab Tested', 'Domestic & International', '-50% OFF'],
    labTested: true,
    labTestImage: 'https://www.dragonpharma.net/uploads/dragonpharmanet/winstrol-50-lab-test-2025-04-18.webp',
    featured: true,
    description: 'Winstrol 50 (Stanozolol) is a popular cutting steroid known for enhancing strength and speed without significant water retention.',
  },
  {
    id: 2917,
    slug: 'cypionat-2917',
    name: 'CYPIONAT 250',
    category: 'Injectable Anabolic Steroids',
    categorySlug: 'injectables-391',
    brand: 'Dragon Pharma',
    brandSlug: 'buy-2194',
    substance: 'Testosterone Cypionate',
    classification: 'ANDROGEN; ANABOLIC STEROID; ANDROGEN ESTER',
    form: '10 ML VIAL x 250 MG',
    halfLife: '15–16 DAYS',
    dosage: 'MEN 50–200 MG/WEEK',
    acne: 'YES',
    waterRetention: 'YES',
    hbp: 'PERHAPS',
    hepatotoxicity: 'NO',
    aromatization: 'YES',
    image: 'https://www.dragonpharma.net/uploads/dragonpharmanet/products/cypionat-2917--s512.webp',
    intPrice: 26.5,
    usaPrice: 101,
    intOriginalPrice: 53,
    discounts: ['You will save $26.50'],
    suggestions: [],
    ribbons: ['Lab Tested', 'Domestic & International', '-50% OFF'],
    labTested: true,
    labTestImage: 'https://www.dragonpharma.net/uploads/dragonpharmanet/cypionat-lab-test-2026-03-20.webp',
    featured: true,
    description: 'Cypionat 250 is a long-acting testosterone ester commonly used in bulking cycles for massive muscle and strength gains.',
  },
  {
    id: 2916,
    slug: 'eq-2916',
    name: 'EQ 300',
    category: 'Injectable Anabolic Steroids',
    categorySlug: 'injectables-391',
    brand: 'Dragon Pharma',
    brandSlug: 'buy-2194',
    substance: 'Boldenone Undecylenate',
    classification: 'ANDROGEN; ANABOLIC STEROID; ANDROGEN ESTER',
    form: '10 ML VIAL x 300 MG',
    halfLife: '14 DAYS',
    dosage: 'MEN 400–1000 MG/WEEK',
    acne: 'RARELY',
    waterRetention: 'LOW',
    hbp: 'NO',
    hepatotoxicity: 'LOW',
    aromatization: 'LOW',
    image: 'https://www.dragonpharma.net/uploads/dragonpharmanet/products/eq-300-2916--s512.webp',
    intPrice: 66,
    usaPrice: 116,
    discounts: [],
    suggestions: ["Buy 3 and get 1 of 'EQ 300' for FREE", 'Buy 5+ for $62.70 and save $16.50'],
    ribbons: ['Lab Tested', 'Domestic & International', "Buy 3 Get 1 FREE"],
    labTested: true,
    labTestImage: 'https://www.dragonpharma.net/uploads/dragonpharmanet/eq-300-lab-test-2025-11-20.webp',
    featured: true,
    description: 'EQ 300 (Boldenone Undecylenate) promotes lean muscle growth and increased appetite with low estrogenic activity.',
  },
  {
    id: 2918,
    slug: 'masteron-2918',
    name: 'MASTERON 100',
    category: 'Injectable Anabolic Steroids',
    categorySlug: 'injectables-391',
    brand: 'Dragon Pharma',
    brandSlug: 'buy-2194',
    substance: 'Drostanolone Propionate',
    classification: 'ANDROGEN; ANABOLIC STEROID; ANDROGEN ESTER',
    form: '10 ML VIAL x 100 MG',
    halfLife: '1–1.5 DAYS',
    dosage: 'MEN 300–700 MG/WEEK',
    acne: 'YES',
    waterRetention: 'NO',
    hbp: 'NO',
    hepatotoxicity: 'LOW',
    aromatization: 'NO',
    image: 'https://www.dragonpharma.net/uploads/dragonpharmanet/products/masteron-100-2918--s512.webp',
    intPrice: 113,
    usaPrice: 142,
    discounts: [],
    suggestions: ["Buy 3 and get 1 of 'Masteron 100' for FREE", 'Buy 5+ for $107.35 and save $28.25'],
    ribbons: ['Domestic & International', "Buy 3 Get 1 FREE"],
    labTested: false,
    description: 'Masteron 100 (Drostanolone Propionate) is a popular cutting compound that adds hardness and definition.',
  },
  {
    id: 2919,
    slug: 'masteron-2919',
    name: 'MASTERON 200',
    category: 'Injectable Anabolic Steroids',
    categorySlug: 'injectables-391',
    brand: 'Dragon Pharma',
    brandSlug: 'buy-2194',
    substance: 'Drostanolone Enanthate',
    classification: 'ANDROGEN; ANABOLIC STEROID; ANDROGEN ESTER',
    form: '10 ML VIAL x 200 MG',
    halfLife: '8 DAYS',
    dosage: 'MEN 400–600 MG/WEEK',
    acne: 'YES',
    waterRetention: '25.00%',
    hbp: 'YES',
    hepatotoxicity: 'NO',
    aromatization: 'NO',
    image: 'https://www.dragonpharma.net/uploads/dragonpharmanet/products/masteron-200-2919--s512.webp',
    intPrice: 125,
    usaPrice: 150,
    discounts: [],
    suggestions: ["Buy 2 and get 1 of 'Masteron 200' for FREE"],
    ribbons: ['Lab Tested', 'Domestic & International', "Buy 2 Get 1 FREE"],
    labTested: true,
    labTestImage: 'https://www.dragonpharma.net/uploads/dragonpharmanet/masteron-200-lab-test-2026-03-25.webp',
    description: 'Masteron 200 (Drostanolone Enanthate) offers longer-lasting effects with fewer injections than the propionate version.',
  },
  {
    id: 46298,
    slug: 'dragontropin-46298',
    name: 'DRAGONTROPIN HGH 100 IU',
    category: 'Peptides',
    categorySlug: 'peptides-414',
    brand: 'Dragon Pharma',
    brandSlug: 'buy-2194',
    substance: 'Somatropin (R-HGH)',
    classification: 'GROWTH HORMONE ANALOG',
    form: '1 KIT x 2 ML VIALS x 10 IU (LYOPHILIZED POWDER)',
    halfLife: '2.5–3 DAYS',
    dosage: 'MEN 4–10 IU/DAY',
    acne: 'NO',
    waterRetention: 'NO',
    hbp: 'NO',
    hepatotoxicity: 'NO',
    aromatization: 'NO',
    image: 'https://www.dragonpharma.net/uploads/dragonpharmanet/products/dragontropin-hgh-100-iu-46298--s512.webp',
    intPrice: 275,
    usaPrice: 400,
    discounts: [],
    suggestions: [],
    ribbons: ['Lab Tested', 'Domestic & International'],
    labTested: true,
    labTestImage: 'https://www.dragonpharma.net/uploads/dragonpharmanet/dragontropin-100-lab-test-2026-03-20.webp',
    bestSeller: true,
    description: 'Dragontropin HGH 100 IU is Dragon Pharma\'s premium Human Growth Hormone, lab-verified for purity and potency.',
  },
  {
    id: 86967,
    slug: 'dragontropin-hgh-200-iu-86967',
    name: 'DRAGONTROPIN HGH 200 IU',
    category: 'Peptides',
    categorySlug: 'peptides-414',
    brand: 'Dragon Pharma',
    brandSlug: 'buy-2194',
    substance: 'Somatropin (R-HGH)',
    classification: 'HUMAN GROWTH HORMONE (HGH)',
    form: '1 KIT x 2 ML VIALS x 20 IU (LYOPHILIZED POWDER)',
    halfLife: '2–4 HOURS',
    dosage: '2–6 IU/DAY',
    acne: 'NO',
    waterRetention: 'POSSIBLE AT HIGH DOSES',
    hbp: 'RARE',
    hepatotoxicity: 'NO',
    aromatization: 'NO',
    image: 'https://www.dragonpharma.net/uploads/dragonpharmanet/products/dragontropin-hgh-200-iu-86967--s512.webp',
    intPrice: 475,
    usaPrice: 650,
    discounts: [],
    suggestions: [],
    ribbons: ['Lab Tested', 'Domestic & International'],
    labTested: true,
    labTestImage: 'https://www.dragonpharma.net/uploads/dragonpharmanet/dragontropin-200-lab-test-2026-03-20.webp',
    bestSeller: true,
    description: 'The 200 IU kit of Dragontropin HGH offers exceptional value for long-term growth hormone therapy and anti-aging protocols.',
  },
  {
    id: 48731,
    slug: 'bpc-157-48731',
    name: 'BPC 157',
    category: 'Peptides',
    categorySlug: 'peptides-414',
    brand: 'Dragon Pharma',
    brandSlug: 'buy-2194',
    substance: 'Pentadecapeptide',
    classification: 'BODY PROTECTING COMPOUND',
    form: '2 ML VIAL x 5 MG (LYOPHILIZED POWDER)',
    halfLife: '~4–6 HOURS',
    dosage: '200–500 MCG/DAY',
    acne: 'NOT REPORTED',
    waterRetention: 'NONE',
    hbp: 'NO KNOWN IMPACT',
    hepatotoxicity: 'NONE',
    aromatization: 'DOES NOT AROMATIZE',
    image: 'https://www.dragonpharma.net/uploads/dragonpharmanet/products/bpc-157-48731--s512.webp',
    intPrice: 24,
    usaPrice: 48,
    intOriginalPrice: 40,
    usaOriginalPrice: 80,
    discounts: ['You will save $16.00'],
    suggestions: [],
    ribbons: ['Lab Tested', 'Domestic & International', '-40% OFF'],
    labTested: true,
    labTestImage: 'https://www.dragonpharma.net/uploads/dragonpharmanet/bpc-157-lab-test-2024-03-22.webp',
    bestSeller: true,
    description: 'BPC 157 is a body-protecting peptide that promotes healing of tendons, muscles, and joints while improving gut health.',
  },
  {
    id: 74034,
    slug: 'mazdutide-10-mg-74034',
    name: 'MAZDUTIDE 10 MG',
    category: 'Peptides',
    categorySlug: 'peptides-414',
    brand: 'Dragon Pharma',
    brandSlug: 'buy-2194',
    substance: 'Mazdutide',
    classification: 'DUAL GLUCAGON AGONIST; GLP-1 AGONIST',
    form: '2 ML VIAL x 10 MG (LYOPHILIZED POWDER)',
    halfLife: '158–180 HOURS',
    dosage: 'MEN 3–9 MG/WEEK',
    acne: 'NO',
    waterRetention: 'NO',
    hbp: 'NO',
    hepatotoxicity: 'NO',
    aromatization: 'NO',
    image: 'https://www.dragonpharma.net/uploads/dragonpharmanet/products/mazdutide-10-mg-74034--s512.webp',
    intPrice: 60,
    usaPrice: 108,
    intOriginalPrice: 100,
    usaOriginalPrice: 180,
    discounts: ['You will save $40.00'],
    suggestions: [],
    ribbons: ['Lab Tested', 'Domestic & International', '-40% OFF'],
    labTested: true,
    labTestImage: 'https://www.dragonpharma.net/uploads/dragonpharmanet/mazdutide-lab-test-2024-09-13.webp',
    bestSeller: true,
    description: 'Mazdutide is a next-generation dual GLP-1/glucagon receptor agonist for effective weight management and metabolic health.',
  },
  {
    id: 45650,
    slug: 'mots-c-10mg-45650',
    name: 'MOTS-C 10 MG',
    category: 'Peptides',
    categorySlug: 'peptides-414',
    brand: 'Dragon Pharma',
    brandSlug: 'buy-2194',
    substance: 'MOTS-C',
    classification: 'MITOCHONDRIAL-DERIVED PEPTIDE',
    form: '2 ML VIAL x 10 MG (LYOPHILIZED POWDER)',
    halfLife: '~3–4 HOURS',
    dosage: '5–10 MG/WEEK (SPLIT INJECTIONS)',
    acne: 'NO',
    waterRetention: 'NO',
    hbp: 'NO IMPACT',
    hepatotoxicity: 'NONE',
    aromatization: 'DOES NOT AROMATIZE',
    image: 'https://www.dragonpharma.net/uploads/dragonpharmanet/products/mots-c-10-mg-45650--s512.webp',
    intPrice: 42,
    usaPrice: 84,
    intOriginalPrice: 70,
    usaOriginalPrice: 140,
    discounts: ['You will save $28.00'],
    suggestions: [],
    ribbons: ['Domestic & International', '-40% OFF'],
    labTested: false,
    bestSeller: true,
    description: 'MOTS-C is a mitochondria-derived peptide that regulates metabolism, improves insulin sensitivity, and enhances physical performance.',
  },
  {
    id: 2838,
    slug: 'anavar-2838',
    name: 'ANAVAR 10',
    category: 'Oral Anabolic Steroids',
    categorySlug: 'orals-380',
    brand: 'Dragon Pharma',
    brandSlug: 'buy-2194',
    substance: 'Oxandrolone',
    classification: 'ANDROGEN; ANABOLIC STEROID',
    form: '100 PILLS x 10 MG',
    halfLife: '9 HOURS',
    dosage: 'MEN 2.5–50 MG/DAY',
    acne: 'RARELY',
    waterRetention: 'NO',
    hbp: 'NO',
    hepatotoxicity: 'LOW',
    aromatization: 'NO',
    image: 'https://www.dragonpharma.net/uploads/dragonpharmanet/products/anavar-10-2838--s512.webp',
    intPrice: 125,
    usaPrice: 175,
    discounts: [],
    suggestions: [],
    ribbons: ['Lab Tested', 'Domestic & International'],
    labTested: true,
    labTestImage: 'https://www.dragonpharma.net/uploads/dragonpharmanet/anavar-10-lab-test-2026-03-26.webp',
    bestSeller: true,
    description: 'Anavar 10 (Oxandrolone) is a mild yet effective oral steroid popular for cutting cycles, lean muscle retention, and strength.',
  },
  {
    id: 2866,
    slug: 'anavar-2866',
    name: 'ANAVAR 50',
    category: 'Oral Anabolic Steroids',
    categorySlug: 'orals-380',
    brand: 'Dragon Pharma',
    brandSlug: 'buy-2194',
    substance: 'Oxandrolone',
    classification: 'ANDROGEN; ANABOLIC STEROID',
    form: '100 PILLS x 50 MG',
    halfLife: '9 HOURS',
    dosage: 'MEN 2.5–50 MG/DAY',
    acne: 'RARELY',
    waterRetention: 'NO',
    hbp: 'NO',
    hepatotoxicity: 'LOW',
    aromatization: 'NO',
    image: 'https://www.dragonpharma.net/uploads/dragonpharmanet/products/anavar-50-2866--s512.webp',
    intPrice: 275,
    usaPrice: 400,
    discounts: [],
    suggestions: [],
    ribbons: ['Lab Tested', 'Domestic & International'],
    labTested: true,
    labTestImage: 'https://www.dragonpharma.net/uploads/dragonpharmanet/anavar-50-lab-test-2026-01-13.webp',
    bestSeller: true,
    description: 'Anavar 50 offers a higher dose of Oxandrolone for experienced users seeking maximum strength and lean muscle gains.',
  },
  {
    id: 3166,
    slug: 'clenbuterol-3166',
    name: 'CLENBUTEROL',
    category: 'Fat Loss',
    categorySlug: 'fat-loss-397',
    brand: 'Dragon Pharma',
    brandSlug: 'buy-2194',
    substance: 'Clenbuterol',
    classification: 'BETA-2 AGONIST; BRONCHODILATOR',
    form: '100 TABS x 40 MCG',
    halfLife: '35–40 HOURS',
    dosage: '20–120 MCG/DAY',
    acne: 'NO',
    waterRetention: 'NO',
    hbp: 'YES',
    hepatotoxicity: 'NO',
    aromatization: 'NO',
    image: 'https://www.dragonpharma.net/uploads/dragonpharmanet/products/clenbuterol-3166--s512.webp',
    intPrice: 44,
    usaPrice: 80,
    discounts: [],
    suggestions: [],
    ribbons: ['Lab Tested', 'Domestic & International'],
    labTested: true,
    bestSeller: true,
    description: 'Clenbuterol is a powerful thermogenic agent that increases metabolic rate and accelerates fat burning.',
  },
  {
    id: 2912,
    slug: 'sustanon-2912',
    name: 'SUSTANON 270',
    category: 'Injectable Anabolic Steroids',
    categorySlug: 'injectables-391',
    brand: 'Dragon Pharma',
    brandSlug: 'buy-2194',
    substance: 'Testosterone Mix',
    classification: 'ANDROGEN; ANABOLIC STEROID',
    form: '10 ML VIAL x 270 MG',
    halfLife: '7–8 DAYS',
    dosage: 'MEN 250–1000 MG/WEEK',
    acne: 'YES',
    waterRetention: 'YES',
    hbp: 'PERHAPS',
    hepatotoxicity: 'NO',
    aromatization: 'YES',
    image: 'https://www.dragonpharma.net/uploads/dragonpharmanet/products/sustanon-2912--s512.webp',
    intPrice: 61,
    usaPrice: 105,
    discounts: [],
    suggestions: [],
    ribbons: ['Lab Tested', 'Domestic & International'],
    labTested: true,
    bestSeller: true,
    description: 'Sustanon 270 is a blend of four testosterone esters designed for sustained release and steady anabolic activity.',
  },
  {
    id: 36988,
    slug: 'testo-blend-36988',
    name: 'TESTO BLEND 350',
    category: 'Injectable Anabolic Steroids',
    categorySlug: 'injectables-391',
    brand: 'Dragon Pharma',
    brandSlug: 'buy-2194',
    substance: 'Testosterone Enanthate',
    classification: 'INJECTABLE ANABOLIC ANDROGENIC STEROID',
    form: '10 ML VIAL x 350 MG',
    halfLife: '7–8 DAYS',
    dosage: 'MEN 350 MG/WEEK',
    acne: 'YES',
    waterRetention: 'YES',
    hbp: 'PERHAPS',
    hepatotoxicity: 'NO',
    aromatization: 'YES',
    image: 'https://www.dragonpharma.net/uploads/dragonpharmanet/products/testo-blend-350-36988--s512.webp',
    intPrice: 66,
    usaPrice: 105,
    discounts: [],
    suggestions: [],
    ribbons: ['Lab Tested', 'Domestic & International'],
    labTested: true,
    bestSeller: true,
    description: 'Testo Blend 350 combines Testosterone Propionate, Cypionate, and Enanthate for optimal synergistic anabolic effects.',
  },
  {
    id: 2924,
    slug: 'trenbolone-2924',
    name: 'TRENBOLONE 200',
    category: 'Injectable Anabolic Steroids',
    categorySlug: 'injectables-391',
    brand: 'Dragon Pharma',
    brandSlug: 'buy-2194',
    substance: 'Trenbolone Enanthate',
    classification: 'ANDROGEN ESTER; ANABOLIC STEROID; PROGESTOGEN',
    form: '10 ML VIAL x 200 MG',
    halfLife: '5 DAYS',
    dosage: 'MEN 75–100 MG/WEEK',
    acne: 'RARELY',
    waterRetention: 'YES',
    hbp: 'PERHAPS',
    hepatotoxicity: 'YES',
    aromatization: 'NO',
    image: 'https://www.dragonpharma.net/uploads/dragonpharmanet/products/trenbolone-200-2924--s512.webp',
    intPrice: 134,
    usaPrice: 160,
    discounts: [],
    suggestions: [],
    ribbons: ['Lab Tested', 'Domestic & International'],
    labTested: true,
    labTestImage: 'https://www.dragonpharma.net/uploads/dragonpharmanet/tren-200-lab-test-2025-04-18.webp',
    bestSeller: true,
    description: 'Trenbolone 200 is one of the most powerful anabolic steroids available, delivering exceptional muscle hardness and strength.',
  },
  {
    id: 2913,
    slug: 'enantat-2913',
    name: 'ENANTAT 250',
    category: 'Injectable Anabolic Steroids',
    categorySlug: 'injectables-391',
    brand: 'Dragon Pharma',
    brandSlug: 'buy-2194',
    substance: 'Testosterone Enanthate',
    classification: 'ANDROGEN; ANABOLIC STEROID; ANDROGEN ESTER',
    form: '10 ML VIAL x 250 MG',
    halfLife: '10–14 DAYS',
    dosage: 'MEN 250–500 MG/WEEK',
    acne: 'YES',
    waterRetention: 'YES',
    hbp: 'PERHAPS',
    hepatotoxicity: 'NO',
    aromatization: 'YES',
    image: 'https://www.dragonpharma.net/uploads/dragonpharmanet/products/enantat-250-2913--s512.webp',
    intPrice: 44,
    usaPrice: 88,
    discounts: [],
    suggestions: [],
    ribbons: ['Lab Tested', 'Domestic & International'],
    labTested: true,
    labTestImage: 'https://www.dragonpharma.net/uploads/dragonpharmanet/enantat-250-lab-test-2026-03-25.webp',
    description: 'Enantat 250 is a classic testosterone enanthate formulation ideal for beginner and experienced bulking cycles.',
  },
  {
    id: 2930,
    slug: 'cut-mix-2930',
    name: 'CUT MIX 150',
    category: 'Injectable Anabolic Steroids',
    categorySlug: 'injectables-391',
    brand: 'Dragon Pharma',
    brandSlug: 'buy-2194',
    substance: 'Testosterone Propionate / Drostanolone Propionate / Trenbolone Acetate',
    classification: 'ANABOLIC STEROID BLEND',
    form: '10 ML VIAL x 150 MG',
    halfLife: '1–2 DAYS',
    dosage: 'MEN 150–450 MG/WEEK',
    acne: 'YES',
    waterRetention: 'LOW',
    hbp: 'PERHAPS',
    hepatotoxicity: 'LOW',
    aromatization: 'LOW',
    image: 'https://www.dragonpharma.net/uploads/dragonpharmanet/products/cut-mix-150-2930--s512.webp',
    intPrice: 72,
    usaPrice: 120,
    discounts: [],
    suggestions: [],
    ribbons: ['Lab Tested', 'Domestic & International'],
    labTested: true,
    labTestImage: 'https://www.dragonpharma.net/uploads/dragonpharmanet/cut-mix-lab-test-2026-03-25.webp',
    description: 'Cut Mix 150 is a powerful injectable blend for cutting cycles, combining three fast-acting esters for rapid results.',
  },
];

export const categories = [
  { name: 'Oral Anabolic Steroids', slug: 'orals-380' },
  { name: 'Injectable Anabolic Steroids', slug: 'injectables-391' },
  { name: 'SARMs', slug: 'sarms-2034' },
  { name: 'Post-Cycle Therapy (PCT)', slug: 'post-cycle-therapy-3855' },
  { name: 'Fat Loss', slug: 'fat-loss-397' },
  { name: 'Sexual Health', slug: 'sexual-health-415' },
  { name: 'Peptides', slug: 'peptides-414' },
  { name: 'Supplements', slug: 'supplements-3050' },
  { name: 'Steroid Cycles', slug: 'cycles-1933' },
];

export const brands = [
  { name: 'Dragon Pharma', slug: 'buy-2194' },
  { name: 'Axiolabs', slug: 'axiolabs-2078' },
  { name: 'British Dragon Pharma', slug: 'british-dragon-2079' },
  { name: 'Kalpa Pharmaceuticals', slug: 'kalpa-1715' },
  { name: 'Generic Asia', slug: 'generic-asia-3391' },
  { name: 'Gen-Shi Laboratories', slug: 'gen-shi-1736' },
  { name: 'Peptide Hubs', slug: 'peptide-hubs-3750' },
  { name: 'Stealth Labs USA', slug: 'stealth-labs-usa-3071' },
];

export const sales = [
  { name: 'Weekly Deals', suffix: '-50% OFF', slug: 'weekly-deals-4304' },
  { name: 'Special Sale', suffix: '-40% OFF', slug: 'exclusive-deals-3047' },
  { name: 'Clearance', suffix: '-30% OFF', slug: 'clearance-4305' },
  { name: 'Buy 3 Get 1 FREE', suffix: 'PROMO', slug: 'promo-4068' },
];

export const warehouses = [
  { name: 'US Domestic Warehouse 🇺🇸', slug: 'us-domestic-warehouse-3401' },
  { name: 'International Warehouse 🌏', slug: 'international-warehouse-3421' },
];

export const labReports = [
  { product: 'Anavar 10', date: '2026-03-26', verified: '9.08 mg', productSlug: 'orals-380/anavar-2838', image: 'https://www.dragonpharma.net/uploads/dragonpharmanet/anavar-10-lab-test-2026-03-26.webp' },
  { product: 'Testo Blend 350', date: '2026-03-25', verified: '346.63 mg', productSlug: 'injectables-391/testo-blend-36988', image: 'https://www.dragonpharma.net/uploads/dragonpharmanet/testo-blend-lab-test-2026-03-25.webp' },
  { product: 'Sustanon 270', date: '2026-03-25', verified: '271.26 mg', productSlug: 'injectables-391/sustanon-2912', image: 'https://www.dragonpharma.net/uploads/dragonpharmanet/sustanon-270-lab-test-2026-03-25.webp' },
  { product: 'Enantat 250', date: '2026-03-25', verified: '264.62 mg', productSlug: 'injectables-391/enantat-2913', image: 'https://www.dragonpharma.net/uploads/dragonpharmanet/enantat-250-lab-test-2026-03-25.webp' },
  { product: 'Cut Mix 150', date: '2026-03-25', verified: '158.41 mg', productSlug: 'injectables-391/cut-mix-2930', image: 'https://www.dragonpharma.net/uploads/dragonpharmanet/cut-mix-lab-test-2026-03-25.webp' },
  { product: 'Masteron 200', date: '2026-03-25', verified: '198.4 mg', productSlug: 'injectables-391/masteron-2919', image: 'https://www.dragonpharma.net/uploads/dragonpharmanet/masteron-200-lab-test-2026-03-25.webp' },
];

let lastFetchTime = 0;
const FETCH_COOLDOWN = 10000; // 10 seconds cooldown between background refreshes

export function fetchProductsFromSupabase() {
  if (typeof window === 'undefined') return;
  const now = Date.now();
  if (now - lastFetchTime < FETCH_COOLDOWN) return;
  lastFetchTime = now;

  supabase
    .from('products')
    .select('*')
    .order('id', { ascending: true })
    .then(({ data, error }) => {
      if (error) {
        console.error('Failed to sync products from Supabase:', error.message);
        return;
      }
      if (data && data.length > 0) {
        localStorage.setItem('dp_products', JSON.stringify(data));
        window.dispatchEvent(new Event('dp_products_updated'));
      }
    });
}

export function getStoredProducts(): Product[] {
  if (typeof window === 'undefined') return products;
  const stored = localStorage.getItem('dp_products');
  
  // Trigger background revalidation fetch
  fetchProductsFromSupabase();

  if (!stored) {
    localStorage.setItem('dp_products', JSON.stringify(products));
    return products;
  }
  try {
    return JSON.parse(stored);
  } catch (e) {
    return products;
  }
}

export function saveStoredProducts(list: Product[]) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('dp_products', JSON.stringify(list));
    window.dispatchEvent(new Event('dp_products_updated'));
  }
}

export async function addProduct(prod: Omit<Product, 'id' | 'slug'>): Promise<Product> {
  const list = getStoredProducts();
  const nextId = list.length > 0 ? Math.max(...list.map(p => p.id)) + 1 : 1000;
  const slug = `${prod.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${nextId}`;
  const newProduct: Product = {
    ...prod,
    id: nextId,
    slug
  };

  const { error } = await supabase.from('products').insert([newProduct]);
  if (error) {
    console.error('Supabase add product error:', error.message);
    throw error;
  }

  list.push(newProduct);
  saveStoredProducts(list);
  return newProduct;
}

export async function updateProduct(id: number, updated: Partial<Product>): Promise<boolean> {
  const list = getStoredProducts();
  const idx = list.findIndex(p => p.id === id);
  if (idx === -1) return false;

  const mergedProduct = { ...list[idx], ...updated };

  const { error } = await supabase
    .from('products')
    .update(updated)
    .eq('id', id);

  if (error) {
    console.error('Supabase update product error:', error.message);
    throw error;
  }

  list[idx] = mergedProduct;
  saveStoredProducts(list);
  return true;
}

export async function deleteProduct(id: number): Promise<boolean> {
  const list = getStoredProducts();
  const filtered = list.filter(p => p.id !== id);
  if (filtered.length === list.length) return false;

  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Supabase delete product error:', error.message);
    throw error;
  }

  saveStoredProducts(filtered);
  return true;
}

export function getProductsByCategory(slug: string): Product[] {
  return getStoredProducts().filter(p => p.categorySlug === slug);
}

export function getProductsByBrand(slug: string): Product[] {
  return getStoredProducts().filter(p => p.brandSlug === slug);
}

export function getFeaturedProducts(): Product[] {
  return getStoredProducts().filter(p => p.featured);
}

export function getBestSellers(): Product[] {
  return getStoredProducts().filter(p => p.bestSeller);
}

export function getProductBySlug(slug: string): Product | undefined {
  return getStoredProducts().find(p => p.slug === slug);
}

export function searchProducts(query: string): Product[] {
  const q = query.toLowerCase();
  return getStoredProducts().filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.substance.toLowerCase().includes(q) ||
    p.category.toLowerCase().includes(q)
  );
}
