import { getProducts } from '@/services/products/products';

import { MainView } from '@/components/views/main-view';

export default async function Page() {
  const products = await getProducts({ offset: 0, limit: 4 });

  return <MainView products={products} />;
}
