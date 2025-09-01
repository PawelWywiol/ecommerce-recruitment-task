import type { Category } from '@/services/categories/categories.types';

import { CategoryCard } from './category-card';

export const CategoriesGrid = ({ categories }: { categories: Category[] }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {categories.map((category) => (
      <CategoryCard key={category.id} category={category} />
    ))}
  </div>
);
