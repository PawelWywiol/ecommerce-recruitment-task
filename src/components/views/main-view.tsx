import type { Product } from '@/services/products/products.type';

import { FeaturedProducts } from '../featured-products';
import { Features } from '../features';
import { HeroSection } from '../hero-section';
import { Newsletter } from '../newsletter';

export const MainView = ({ products }: { products: Product[] }) => (
  <>
    <HeroSection />
    <FeaturedProducts products={products} />
    <Features />
    <Newsletter />
  </>
);
