import Link from 'next/link';

import type { Category } from '@/services/categories/categories.types';

import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';

export const CategoryCard = ({ category }: { category: Category }) => (
  <Card className="group cursor-pointer border-border/40 hover:border-luxury-gold/40 transition-all duration-300 hover:shadow-lg overflow-hidden">
    <Link href={`/products?category=${category.slug}`}>
      <CardContent className="p-0">
        <div className="relative aspect-[4/3] overflow-hidden">
          <picture>
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </picture>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <h3 className="text-xl font-semibold mb-1">{category.name}</h3>
          </div>
        </div>

        <div className="p-6 space-y-3">
          <Button
            variant="outline"
            size="sm"
            className="w-full border-luxury-gold text-luxury-gold hover:bg-luxury-gold hover:text-luxury-gold-foreground group-hover:bg-luxury-gold group-hover:text-luxury-gold-foreground"
          >
            Explore Collection
          </Button>
        </div>
      </CardContent>
    </Link>
  </Card>
);
