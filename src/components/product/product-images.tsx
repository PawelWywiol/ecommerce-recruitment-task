'use client';

import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { useState } from 'react';

import { cn } from '@/lib/utils';
import type { Product } from '@/services/products/products.type';

import { MIN_PROMO_PRICE } from '../products/products.config';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';

export const ProductImages = ({ product }: { product: Product }) => {
  const [selectedImage, setSelectedImage] = useState(0);

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-square bg-luxury-cream/30 rounded-2xl overflow-hidden">
        <picture>
          <img
            src={product.images[selectedImage]}
            alt={product.title}
            className="w-full h-full object-cover"
          />
        </picture>
        <Badge
          className={cn(
            'absolute top-3 left-3',
            product.price > MIN_PROMO_PRICE
              ? 'bg-luxury-burgundy text-luxury-burgundy-foreground'
              : 'bg-luxury-gold text-luxury-gold-foreground',
          )}
        >
          {product.price > MIN_PROMO_PRICE ? 'Sale' : 'New'}
        </Badge>

        {/* Navigation Arrows */}
        {product.images.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="sm"
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-background/80 hover:bg-background h-10 w-10 p-0"
            >
              <ChevronLeftIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-background/80 hover:bg-background h-10 w-10 p-0"
            >
              <ChevronRightIcon className="h-4 w-4" />
            </Button>
          </>
        )}
      </div>

      {/* Thumbnail Images */}
      <div className="grid grid-cols-4 gap-3">
        {product.images.map((image, index) => (
          <button
            key={image}
            type="button"
            onClick={() => setSelectedImage(index)}
            className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
              selectedImage === index
                ? 'border-luxury-gold'
                : 'border-border hover:border-luxury-gold/50'
            }`}
          >
            <picture>
              <img
                src={image}
                alt={`${product.title} - ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </picture>
          </button>
        ))}
      </div>
    </div>
  );
};
