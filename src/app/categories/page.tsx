import { getCategories } from '@/services/categories/categories';

import { Categories } from '@/components/categories/categories';

export default async function Page() {
  const categories = await getCategories();

  return <Categories categories={categories} />;
}
