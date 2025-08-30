import { notFound } from 'next/dist/client/components/navigation';

import { handleErrors } from '@/lib/error-handler';
import { getCategories } from '@/services/categories/categories';

import { CategoriesView } from '@/components/views/categories-view';

export default async function Page() {
  const data = await handleErrors(() => getCategories());

  if (!data.isSuccess) {
    return notFound();
  }

  const categories = data.data;

  return <CategoriesView categories={categories} />;
}
