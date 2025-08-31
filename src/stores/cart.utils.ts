import type { CartStorageItem } from './cart.types';

export const isCartStorageItem = (item: unknown): item is CartStorageItem =>
  item !== null &&
  typeof item === 'object' &&
  'productId' in item &&
  'quantity' in item &&
  typeof item.productId === 'number' &&
  typeof item.quantity === 'number';
