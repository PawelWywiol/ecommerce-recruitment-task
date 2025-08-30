import type { Product } from '@/services/products/products.type';

import { ProductGridItem } from './products.grid-item';

export const ProductsGrid = ({
  products,
  viewMode,
}: {
  products: Product[];
  viewMode: 'grid' | 'list';
}) => (
  <div
    className={`grid gap-8 ${
      viewMode === 'grid'
        ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
        : 'grid-cols-1'
    }`}
  >
    {products.map((product) => (
      <ProductGridItem key={product.id} product={product} viewMode={viewMode} />
    ))}
  </div>
);
