import type { Product } from '@/services/products/products.type';

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartStorageItem {
  productId: number;
  quantity: number;
}

export interface CartSummary {
  totalItems: number;
  totalPrice: number;
}

export interface CartState extends CartSummary {
  items: CartItem[];
}

export interface CartActions {
  addProduct: (product: Product, quantity?: number) => void;
  removeProduct: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  loadFromStorage: () => void;
  saveToStorage: () => void;
}

export type CartStore = CartState & CartActions;
