export interface NewsItem {
  id: number;
  slug: string;
  title: string;
  date: string;
  author: string;
  excerpt: string;
  image: string;
  category: string;
}

export const newsItems: NewsItem[] = [
  {
    id: 13210,
    slug: '2026-updates-13210',
    title: 'Happy New Year 2026 from Dragon Pharma!',
    date: 'January 5, 2026',
    author: 'Dragon Pharma',
    excerpt: 'Dragon Pharma kicks off 2026 with major updates: new peptide releases under the DP label, expanded transparency through fresh lab tests, and an extended sale running through February 28, 2026. Big savings and new products ahead.',
    image: 'https://www.dragonpharma.net/uploads/dragonpharmanet/happy-new-year-2026-from-dragon-pharma-157899.webp',
    category: 'Updates',
  },
  {
    id: 12593,
    slug: 'peptide-hubs-new-releases-2025-12593',
    title: 'New Peptide Hubs Products Now Available',
    date: 'November 16, 2025',
    author: 'Dragon Pharma',
    excerpt: 'New Peptide Hubs releases just arrived in our international warehouse, with multiple fresh peptides now in stock. USA domestic availability coming soon.',
    image: 'https://www.dragonpharma.net/uploads/dragonpharmanet/new-peptide-hubs-products-now-available-154427.webp',
    category: 'Products',
  },
  {
    id: 12582,
    slug: 'lab-test-updates-november-2025-12582',
    title: 'New Lab Results for Dragon Pharma Batches – November 2025 Update',
    date: 'November 11, 2025',
    author: 'Dragon Pharma',
    excerpt: 'New independent lab results for several November peptide batches are in, showing accurate dosing, strong purity, and consistent batch quality across the board.',
    image: 'https://www.dragonpharma.net/uploads/dragonpharmanet/new-lab-results-for-dragon-pharma-batches-november-2025-update-153965.webp',
    category: 'Lab Results',
  },
  {
    id: 11845,
    slug: 'crypto-cashback-promotion-2025',
    title: 'Pay with Crypto, Get 20% Cashback!',
    date: 'October 1, 2025',
    author: 'Dragon Pharma',
    excerpt: 'Use cryptocurrency at checkout and earn 20% cashback on your next purchase. Available for all orders placed through our secure checkout system.',
    image: 'https://www.dragonpharma.net/uploads/dragonpharmanet/139843.webp',
    category: 'Promotions',
  },
  {
    id: 11200,
    slug: 'us-domestic-expansion-2025',
    title: 'US Domestic Warehouse Now Shipping Peptides',
    date: 'September 15, 2025',
    author: 'Dragon Pharma',
    excerpt: 'Our US domestic warehouse has expanded its catalog to include all major peptide products. Enjoy 2-5 day shipping on BPC-157, HGH, and more.',
    image: 'https://www.dragonpharma.net/uploads/dragonpharmanet/136913.webp',
    category: 'Shipping',
  },
  {
    id: 10750,
    slug: 'dragontropin-hgh-launch-2025',
    title: 'Introducing Dragontropin HGH 200 IU — Our Most Powerful Kit Yet',
    date: 'August 20, 2025',
    author: 'Dragon Pharma',
    excerpt: 'The new 200 IU Dragontropin kit delivers even greater value for long-term HGH protocols. Lab-verified purity at an industry-leading price point.',
    image: 'https://www.dragonpharma.net/uploads/dragonpharmanet/products/dragontropin-hgh-200-iu-86967--s512.webp',
    category: 'Products',
  },
];
