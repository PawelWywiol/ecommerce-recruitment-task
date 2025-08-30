import type { Metadata } from 'next';
import { notFound } from 'next/dist/client/components/navigation';

import { handleErrors } from '@/lib/error-handler';
import { getCategories } from '@/services/categories/categories';

import { CategoriesView } from '@/components/views/categories-view';

export const metadata: Metadata = {
  title: 'Shop by Category - Luxury Collections | E-Commerce',
  description:
    'Explore our carefully curated collections of luxury goods, each category representing the finest in its field. Browse premium categories with personal stylist assistance available.',
};

export default async function Page() {
  const data = await handleErrors(() => getCategories());

  if (!data.isSuccess) {
    return notFound();
  }

  const categories = data.data;

  return <CategoriesView categories={categories} />;
}
