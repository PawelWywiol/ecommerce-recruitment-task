import { RotateCcwIcon, ShieldIcon, TruckIcon } from 'lucide-react';

export const MOCKED_PRODUCT_DATA = {
  id: 1,
  name: 'Silk Evening Dress',
  brand: 'MAISON LUXE',
  price: 1299,
  originalPrice: 1599,
  rating: 4.8,
  reviews: 128,
  badge: 'Best Seller',
  images: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
  colors: [
    { name: 'Midnight Blue', value: '#191970', available: true },
    { name: 'Emerald Green', value: '#50C878', available: true },
    { name: 'Burgundy', value: '#800020', available: false },
    { name: 'Classic Black', value: '#000000', available: true },
  ],
  sizes: [
    { name: 'XS', available: true },
    { name: 'S', available: true },
    { name: 'M', available: true },
    { name: 'L', available: true },
    { name: 'XL', available: false },
  ],
  description:
    'An exquisite silk evening dress that embodies timeless elegance and contemporary sophistication. Crafted from the finest mulberry silk, this piece features delicate hand-finished details and a silhouette that flatters every figure.',
  details: [
    '100% Mulberry Silk',
    'Hand-finished seams',
    'Invisible back zipper',
    'Fully lined',
    'Dry clean only',
    'Made in Italy',
  ],
  features: [
    { icon: ShieldIcon, text: 'Authenticity guaranteed' },
    { icon: TruckIcon, text: 'Free shipping & returns' },
    { icon: RotateCcwIcon, text: '30-day return policy' },
  ],
  inStock: true,
  stockCount: 8,
} as const;
