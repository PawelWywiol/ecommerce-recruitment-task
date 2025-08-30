import { getCategories } from '@/services/categories/categories';
import { getProducts } from '@/services/products/products';

import { Products } from '@/components/products/products';

export default async function Page() {
  const categories = await getCategories();
  const products = await getProducts();

  return <Products products={products} categories={categories} />;
}
