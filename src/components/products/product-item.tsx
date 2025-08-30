'use client';

import { HeartIcon, StarIcon } from 'lucide-react';
import Link from 'next/link';

import { cn } from '@/lib/utils';
import type { Product } from '@/services/products/products.type';

import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';

const MIN_RATING = 4;
const MIN_REVIEWS = 46;
const MIN_PROMO_PRICE = 50;
const PROMO_PERCENTAGE = 1.25;

export const ProductItem = ({
  product,
  viewMode,
}: {
  product: Product;
  viewMode: 'grid' | 'list';
}) => (
  <Card
    key={product.id}
    className="group cursor-pointer border-border/40 hover:border-luxury-gold/40 transition-all duration-300 hover:shadow-lg overflow-hidden"
  >
    <Link href={`/product/${product.id}`}>
      <CardContent className="p-0">
        {viewMode === 'grid' ? (
          <>
            <div className="relative aspect-square overflow-hidden">
              <picture>
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </picture>
              <Badge
                className={`absolute top-3 left-3 ${
                  product.price > MIN_PROMO_PRICE
                    ? 'bg-luxury-burgundy text-luxury-burgundy-foreground'
                    : 'bg-luxury-gold text-luxury-gold-foreground'
                }`}
              >
                {product.price > MIN_PROMO_PRICE ? 'Sale' : 'New'}
              </Badge>
              <Button
                variant="ghost"
                size="sm"
                className={`absolute top-3 right-3 h-8 w-8 p-0 bg-background/80 hover:bg-background ${
                  // product.isWishlisted ? "text-luxury-burgundy" : "text-luxury-warm-gray"
                  'text-luxury-warm-gray'
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
              >
                <HeartIcon className={cn('h-4 w-4', 'fill-current')} />
              </Button>
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
                  ({MIN_REVIEWS + product.id + product.price})
                </span>
              </div>

              <h3 className="font-medium text-luxury-charcoal group-hover:text-luxury-gold transition-colors">
                {product.title}
              </h3>

              <p className="text-sm text-luxury-warm-gray">{product.category.name}</p>

              <div className="flex items-center space-x-2">
                <span className="text-lg font-bold text-luxury-charcoal">
                  ${product.price.toLocaleString()}
                </span>
                {product.price > MIN_PROMO_PRICE && (
                  <span className="text-sm text-luxury-warm-gray line-through">
                    ${(product.price * PROMO_PERCENTAGE).toLocaleString()}
                  </span>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="flex gap-6 p-6">
            <div className="relative w-48 aspect-square overflow-hidden rounded-lg flex-shrink-0">
              <picture>
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </picture>
              <Badge
                className={`absolute top-3 left-3 ${
                  product.price > MIN_PROMO_PRICE
                    ? 'bg-luxury-burgundy text-luxury-burgundy-foreground'
                    : 'bg-luxury-gold text-luxury-gold-foreground'
                }`}
              >
                {product.price > MIN_PROMO_PRICE ? 'Sale' : 'New'}
              </Badge>
            </div>

            <div className="flex-1 space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-luxury-charcoal group-hover:text-luxury-gold transition-colors mb-2">
                  {product.title}
                </h3>
                <p className="text-luxury-warm-gray">{product.category.name}</p>
              </div>

              <div className="flex items-center space-x-1">
                {Array.from({ length: 5 }, (_, i) => i + 1).map((star) => (
                  <StarIcon
                    key={star}
                    className={`h-4 w-4 ${
                      star <= MIN_RATING
                        ? 'fill-luxury-gold text-luxury-gold'
                        : 'text-luxury-warm-gray/30'
                    }`}
                  />
                ))}
                <span className="text-sm text-luxury-warm-gray ml-2">
                  ({MIN_REVIEWS + product.id + product.price} reviews)
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl font-bold text-luxury-charcoal">
                    ${product.price.toLocaleString()}
                  </span>
                  {product.price > MIN_PROMO_PRICE && (
                    <span className="text-lg text-luxury-warm-gray line-through">
                      ${(product.price * PROMO_PERCENTAGE).toLocaleString()}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`h-9 w-9 p-0 ${
                      // product.isWishlisted ? "text-luxury-burgundy" : "text-luxury-warm-gray"
                      'text-luxury-warm-gray'
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                  >
                    <HeartIcon className={cn('h-4 w-4')} />
                  </Button>
                  <Button
                    size="sm"
                    className="bg-luxury-charcoal hover:bg-luxury-charcoal/90 text-luxury-charcoal-foreground"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                  >
                    Quick Add
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Link>
  </Card>
);
