'use client';

import type { Product } from '@/services/products/products.type';

import { Breadcrumbs } from '../breadcrubs';
import { ProductActions } from '../product/product-actions';
import { ProductFeatures } from '../product/product-features';
import { ProductImages } from '../product/product-images';
import { ProductInfo } from '../product/product-info';
import { ProductTabs } from '../product/product-tabs';
import { ProductVariants } from '../product/product-variants';
import { RelatedProducts } from '../product/related-products';
import { Separator } from '../ui/separator';

export const ProductView = ({
  product,
  relatedProducts,
}: {
  product: Product;
  relatedProducts: Product[];
}) => {
  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs
        links={[
          { label: 'Home', href: '/' },
          { label: 'Categories', href: '/categories' },
          { label: 'Products', href: '/products' },
        ]}
        last={product.title}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        <ProductImages product={product} />

        <div className="space-y-8">
          <ProductInfo product={product} />
          <Separator />
          <ProductVariants />
          <Separator />
          <ProductActions product={product} />
          <ProductFeatures />
        </div>
      </div>

      <ProductTabs product={product} />
      <RelatedProducts products={relatedProducts} />
    </section>
  );
};
