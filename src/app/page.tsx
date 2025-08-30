import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { handleErrors } from '@/lib/error-handler';
import { getProducts } from '@/services/products/products';

import { MainView } from '@/components/views/main-view';

export const metadata: Metadata = {
  title: 'Luxury Redefined - Premium Collection | E-Commerce',
  description:
    "Discover our curated collection of the world's finest luxury goods. From haute couture to exquisite jewelry, each piece tells a story of exceptional craftsmanship. Shop our featured collection with 10K+ happy customers and 4.9/5 rating.",
};

export default async function Page() {
  const data = await handleErrors(() => getProducts({ offset: 0, limit: 4 }));

  if (!data.isSuccess) {
    return notFound();
  }

  const products = data.data;

  return <MainView products={products} />;
}
