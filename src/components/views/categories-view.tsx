'use client';

import { useState } from 'react';

import type { Category } from '@/services/categories/categories.types';

import { CategoriesCTA } from '../categories/categories-cta';
import { CategoriesGrid } from '../categories/categories-grid';
import { CategoriesHeader } from '../categories/categories-header';
import { CategoriesSearch } from '../categories/categories-search';

const MAX_CATEGORIES_TO_SHOW = 6;

export const CategoriesView = ({ categories }: { categories: Category[] }) => {
  const [filter, setFilter] = useState('');
  const filteredCategories = categories
    .filter((category) => category.name.toLowerCase().includes(filter.toLowerCase()))
    .slice(0, MAX_CATEGORIES_TO_SHOW);

  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-6 mb-12">
        <CategoriesHeader />
        <CategoriesSearch filter={filter} onFilterChange={setFilter} />
      </div>

      <CategoriesGrid categories={filteredCategories} />
      <CategoriesCTA />
    </section>
  );
};
