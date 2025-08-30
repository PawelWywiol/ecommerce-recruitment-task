import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { handleErrors } from '@/lib/error-handler';
import { getCategories } from '@/services/categories/categories';
import { getProducts } from '@/services/products/products';

import { ProductsView } from '@/components/views/products-view';

export const metadata: Metadata = {
  title: 'All Products - Luxury Collection | E-Commerce',
  description:
    'Discover our complete collection of luxury goods, each piece carefully selected for its exceptional quality and timeless elegance. Browse, filter, and find your perfect luxury item.',
};

export default async function Page() {
  const data = await handleErrors(async () => {
    return await Promise.all([getCategories(), getProducts()]);
  });

  if (!data.isSuccess) {
    return notFound();
  }

  const [categories, products] = data.data;

  return <ProductsView products={products} categories={categories} />;
}
