'use client';

import { HeartIcon } from 'lucide-react';
import { useState } from 'react';

import type { Product } from '@/services/products/products.type';

import { MIN_PROMO_PRICE, MIN_RATING, PROMO_PERCENTAGE } from '../products/products.config';
import { ProductRating } from '../products/products.rating';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';

export const ProductInfo = ({ product }: { product: Product }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-luxury-warm-gray tracking-wide uppercase">
            {product.category.name}
          </p>
          <h1 className="text-3xl lg:text-4xl font-bold text-luxury-charcoal">{product.title}</h1>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsWishlisted(!isWishlisted)}
          className={`h-10 w-10 p-0 ${
            isWishlisted ? 'text-luxury-burgundy' : 'text-luxury-warm-gray'
          }`}
        >
          <HeartIcon className={`h-5 w-5 ${isWishlisted ? 'fill-current' : ''}`} />
        </Button>
      </div>

      {/* Rating */}
      <div className="flex items-center space-x-3">
        <ProductRating rating={MIN_RATING} />
      </div>

      {/* Price */}
      <div className="flex items-center space-x-3">
        <span className="text-3xl font-bold text-luxury-charcoal">
          ${product.price.toLocaleString()}
        </span>
        {product.price > MIN_PROMO_PRICE && (
          <span className="text-xl text-luxury-warm-gray line-through">
            ${(product.price * PROMO_PERCENTAGE).toLocaleString()}
          </span>
        )}
        {product.price > MIN_PROMO_PRICE && (
          <Badge
            variant="destructive"
            className="bg-luxury-burgundy text-luxury-burgundy-foreground"
          >
            Save ${(product.price * (PROMO_PERCENTAGE - 1)).toLocaleString()}
          </Badge>
        )}
      </div>
    </div>
  );
};
