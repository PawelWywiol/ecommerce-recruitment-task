'use client';

import { FilterIcon, SearchIcon } from 'lucide-react';

import { Button } from '../ui/button';
import { Input } from '../ui/input';

interface CategoriesSearchProps {
  filter: string;
  onFilterChange: (filter: string) => void;
}

export const CategoriesSearch = ({ filter, onFilterChange }: CategoriesSearchProps) => (
  <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
    <div className="relative flex-1">
      <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-luxury-warm-gray" />
      <Input
        type="search"
        placeholder="Search categories..."
        className="pl-10 bg-luxury-cream border-luxury-gold/20 focus:border-luxury-gold"
        value={filter}
        onChange={(e) => onFilterChange(e.target.value)}
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
);
