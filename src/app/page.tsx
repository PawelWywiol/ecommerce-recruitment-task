import { getProducts } from '@/services/products/products';

import { FeaturedProducts } from '@/components/featured-products';
import { Features } from '@/components/features';
import { HeroSection } from '@/components/hero-section';
import { Newsletter } from '@/components/newsletter';

export default async function Page() {
  const fetchedProducts = await getProducts({ offset: 0, limit: 4 });

  return (
    <>
      <HeroSection />
      <FeaturedProducts products={fetchedProducts} />
      <Features />
      <Newsletter />
    </>
  );
}
