import { getCategories } from '@/services/categories/categories';
import { getProducts } from '@/services/products/products';

import { ProductsView } from '@/components/views/products-view';

export default async function Page() {
  const categories = await getCategories();
  const products = await getProducts();

  return <ProductsView products={products} categories={categories} />;
}
