import { ArrowRightIcon, StarIcon } from 'lucide-react';
import Link from 'next/link';

import type { Product } from '@/services/products/products.type';

import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';

const MIN_RATING = 4;
const MIN_REVIEWS = 46;
const PROMO_PERCENTAGE = 1.25;
const MIN_PROMO_PRICE = 50;

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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((product, index) => (
          <Card
            key={product.id}
            className="group cursor-pointer border-border/40 hover:border-luxury-gold/40 transition-all duration-300 hover:shadow-lg"
          >
            <CardContent className="p-0">
              <div className="relative aspect-square overflow-hidden rounded-t-lg">
                <picture>
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </picture>
                <Badge
                  className={`absolute top-3 left-3 ${
                    index % 2
                      ? 'bg-luxury-burgundy text-luxury-burgundy-foreground'
                      : 'bg-luxury-gold text-luxury-gold-foreground'
                  }`}
                >
                  {index % 2 ? 'Bestseller' : 'New Arrival'}
                </Badge>
              </div>

              <div className="p-4 space-y-3">
                <div className="flex items-center space-x-1">
                  {Array.from({ length: 5 }, (_, i) => i + 1).map((star) => (
                    <StarIcon
                      key={star}
                      className={`h-3 w-3 ${
                        star <= MIN_RATING
                          ? 'fill-luxury-gold text-luxury-gold'
                          : 'text-luxury-warm-gray/30'
                      }`}
                    />
                  ))}
                  <span className="text-xs text-luxury-warm-gray ml-1">
                    ({Math.floor(MIN_REVIEWS + index + product.price)})
                  </span>
                </div>

                <h3 className="font-medium text-luxury-charcoal group-hover:text-luxury-gold transition-colors text-ellipsis whitespace-nowrap overflow-hidden">
                  {product.title}
                </h3>

                <div className="flex items-center space-x-2">
                  <span className="text-lg font-bold text-luxury-charcoal">
                    ${product.price.toLocaleString()}
                  </span>
                  {product.price < MIN_PROMO_PRICE && (
                    <span className="text-sm text-luxury-warm-gray line-through">
                      ${(product.price * PROMO_PERCENTAGE).toLocaleString()}
                    </span>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

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
