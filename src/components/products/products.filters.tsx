import { FilterIcon, GridIcon, ListIcon, SearchIcon } from 'lucide-react';

import type { Category } from '@/services/categories/categories.types';

import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

const EMPTY_CATEGORY_SLUG = '_';

export const ProductsFilters = ({
  categories,
  filter,
  setFilter,
  category,
  setCategory,
  viewMode,
  setViewMode,
}: {
  categories: Category[];
  filter: string;
  setFilter: (value: string) => void;
  category: string | null;
  setCategory: (value: string | null) => void;
  viewMode: 'grid' | 'list';
  setViewMode: (value: 'grid' | 'list') => void;
}) => (
  <div className="space-y-4 mb-8">
    <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
      {/* Search */}
      <div className="relative flex-1 max-w-md">
        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-luxury-warm-gray" />
        <Input
          type="search"
          placeholder="Search products..."
          className="pl-10 bg-luxury-cream border-luxury-gold/20 focus:border-luxury-gold"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <Select
          value={category ?? EMPTY_CATEGORY_SLUG}
          onValueChange={(value) => setCategory(value)}
        >
          <SelectTrigger className="w-[180px] bg-luxury-cream border-luxury-gold/20">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={EMPTY_CATEGORY_SLUG}>All Categories</SelectItem>
            {categories.map(
              (category) =>
                category?.slug?.length && (
                  <SelectItem key={category.slug} value={category.slug}>
                    {category.name}
                  </SelectItem>
                ),
            )}
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger className="w-[180px] bg-luxury-cream border-luxury-gold/20">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="featured">Featured</SelectItem>
            <SelectItem value="price-low">Price: Low to High</SelectItem>
            <SelectItem value="price-high">Price: High to Low</SelectItem>
            <SelectItem value="newest">Newest First</SelectItem>
            <SelectItem value="rating">Highest Rated</SelectItem>
          </SelectContent>
        </Select>

        <Button
          variant="outline"
          className="border-luxury-charcoal text-luxury-charcoal hover:bg-luxury-charcoal hover:text-luxury-charcoal-foreground"
        >
          <FilterIcon className="h-4 w-4 mr-2" />
          More Filters
        </Button>

        {/* View Toggle */}
        <div className="flex border border-border rounded-lg">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('grid')}
            className={`rounded-r-none ${
              viewMode === 'grid' ? 'bg-luxury-charcoal text-luxury-charcoal-foreground' : ''
            }`}
          >
            <GridIcon className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('list')}
            className={`rounded-l-none ${
              viewMode === 'list' ? 'bg-luxury-charcoal text-luxury-charcoal-foreground' : ''
            }`}
          >
            <ListIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  </div>
);
