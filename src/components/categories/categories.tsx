'use client';

import { FilterIcon, SearchIcon } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import type { Category } from '@/services/categories/categories.types';

import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Input } from '../ui/input';

const MAX_CATEGORIES_TO_SHOW = 6;

export const Categories = ({ categories }: { categories: Category[] }) => {
  const [filter, setFilter] = useState('');
  const filteredCategories = categories
    .filter((category) => category.name.toLowerCase().includes(filter.toLowerCase()))
    .slice(0, MAX_CATEGORIES_TO_SHOW);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="space-y-6 mb-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl lg:text-5xl font-bold text-luxury-charcoal">Shop by Category</h1>
          <p className="text-lg text-luxury-warm-gray max-w-2xl mx-auto">
            Explore our carefully curated collections of luxury goods, each category representing
            the finest in its field.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-luxury-warm-gray" />
            <Input
              type="search"
              placeholder="Search categories..."
              className="pl-10 bg-luxury-cream border-luxury-gold/20 focus:border-luxury-gold"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
          </div>
          <Button
            variant="outline"
            className="border-luxury-charcoal text-luxury-charcoal hover:bg-luxury-charcoal hover:text-luxury-charcoal-foreground"
          >
            <FilterIcon className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredCategories.map((category) => (
          <Card
            key={category.id}
            className="group cursor-pointer border-border/40 hover:border-luxury-gold/40 transition-all duration-300 hover:shadow-lg overflow-hidden"
          >
            <Link href={`/category/${category.slug}`}>
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
        ))}
      </div>

      {/* CTA Section */}
      <div className="text-center mt-16 p-8 bg-luxury-cream/30 rounded-2xl">
        <h2 className="text-2xl font-bold text-luxury-charcoal mb-4">
          Can't Find What You're Looking For?
        </h2>
        <p className="text-luxury-warm-gray mb-6 max-w-lg mx-auto">
          Our personal stylists are here to help you find the perfect luxury pieces for any
          occasion.
        </p>
        <Button
          size="lg"
          className="bg-luxury-charcoal hover:bg-luxury-charcoal/90 text-luxury-charcoal-foreground"
        >
          Contact Personal Stylist
        </Button>
      </div>
    </div>
  );
};
