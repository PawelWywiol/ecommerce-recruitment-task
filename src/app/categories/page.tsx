import { getCategories } from '@/services/categories/categories';

import { CategoriesView } from '@/components/views/categories-view';

export default async function Page() {
  const categories = await getCategories();

  return <CategoriesView categories={categories} />;
}
