import { notFound } from 'next/navigation';

import { handleErrors } from '@/lib/error-handler';
import { getProducts } from '@/services/products/products';

import { MainView } from '@/components/views/main-view';

export default async function Page() {
  const data = await handleErrors(() => getProducts({ offset: 0, limit: 4 }));

  if (!data.isSuccess) {
    return notFound();
  }

  const products = data.data;

  return <MainView products={products} />;
}
