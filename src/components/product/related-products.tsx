import type { Product } from '@/services/products/products.type';

import { ProductGridItem } from '../products/products.grid-item';

const MAX_RELATED_PRODUCTS = 8;

export const RelatedProducts = ({ products }: { products: Product[] }) => (
  <section className="mt-16 space-y-8">
    <div className="text-center space-y-4">
      <h2 className="text-3xl font-bold text-luxury-charcoal">You May Also Like</h2>
      <p className="text-luxury-warm-gray">
        Discover more luxury pieces from our curated collection
      </p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {products.slice(0, MAX_RELATED_PRODUCTS).map((product) => (
        <ProductGridItem key={product.id} product={product} viewMode="grid" />
      ))}
    </div>
  </section>
);
