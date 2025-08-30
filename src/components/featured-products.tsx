import { ArrowRightIcon } from 'lucide-react';
import Link from 'next/link';

import type { Product } from '@/services/products/products.type';

import { ProductsGrid } from './products/products.grid';
import { Button } from './ui/button';

export const FeaturedProducts = ({ products }: { products: Product[] }) => (
  <section className="py-16 lg:py-24">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center space-y-4 mb-12">
        <h2 className="text-3xl lg:text-4xl font-bold text-luxury-charcoal">Featured Collection</h2>
        <p className="text-lg text-luxury-warm-gray max-w-2xl mx-auto">
          Handpicked pieces from our latest collection, each representing the pinnacle of luxury and
          craftsmanship.
        </p>
      </div>

      <ProductsGrid products={products} viewMode="grid" />

      <div className="text-center mt-12">
        <Button
          variant="outline"
          size="lg"
          className="border-luxury-charcoal text-luxury-charcoal hover:bg-luxury-charcoal hover:text-luxury-charcoal-foreground"
          asChild
        >
          <Link href="/products">
            View All Products
            <ArrowRightIcon className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  </section>
);
