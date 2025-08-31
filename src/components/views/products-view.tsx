'use client';

import { useEffect, useState } from 'react';

import type { Category } from '@/services/categories/categories.types';
import type { Product } from '@/services/products/products.type';

import { ProductsFilters } from '../products/products.filters';
import { ProductsGrid } from '../products/products.grid';
import { ProductsHeader } from '../products/products.header';
import { ProductsLoadMoreButton } from '../products/products.load-more-button';

const MAX_PRODUCTS_TO_SHOW = 40;
const PRODUCTS_PER_PAGE = 8;
const EMPTY_CATEGORY_SLUG = '_';

export const ProductsView = ({
  products,
  categories,
  defaultCategory,
}: {
  products: Product[];
  categories: Category[];
  defaultCategory?: string;
}) => {
  const [filter, setFilter] = useState('');
  const [category, setCategory] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(PRODUCTS_PER_PAGE);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    if (defaultCategory && categories.some((cat) => cat.slug === defaultCategory)) {
      setCategory(defaultCategory);
    }
  }, [defaultCategory, categories]);

  const filteredProducts = products
    .filter((product) => product.title.toLowerCase().includes(filter.toLowerCase()))
    .filter((product) =>
      category && category !== EMPTY_CATEGORY_SLUG ? product.category.slug === category : true,
    )
    .slice(0, Math.min(visibleCount, MAX_PRODUCTS_TO_SHOW));

  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <ProductsHeader />
      <ProductsFilters
        categories={categories}
        filter={filter}
        setFilter={setFilter}
        category={category}
        setCategory={setCategory}
        viewMode={viewMode}
        setViewMode={setViewMode}
      />
      <ProductsGrid products={filteredProducts} viewMode={viewMode} />

      {products.length > visibleCount &&
        filteredProducts.length >= visibleCount &&
        visibleCount < MAX_PRODUCTS_TO_SHOW && (
          <ProductsLoadMoreButton
            onClick={() =>
              setVisibleCount((count) => Math.min(count + PRODUCTS_PER_PAGE, MAX_PRODUCTS_TO_SHOW))
            }
          />
        )}
    </section>
  );
};
