import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { Product } from '@/services/products/products.type';

import type {
  CartActions,
  CartItem,
  CartState,
  CartStorageItem,
  CartStore,
  CartSummary,
} from './cart.types';
import { isCartStorageItem } from './cart.utils';

const CART_STORAGE_KEY = 'cart';

const calculateTotals = (items: CartItem[]): CartSummary => {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return { totalItems, totalPrice };
};

const saveToLocalStorage = (items: CartItem[]): void => {
  if (typeof globalThis === 'undefined') {
    return;
  }

  const storageItems: CartStorageItem[] = items.map((item) => ({
    productId: item.product.id,
    quantity: item.quantity,
  }));

  globalThis.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(storageItems));
};

const loadFromLocalStorage = (): CartStorageItem[] => {
  if (typeof globalThis === 'undefined') return [];

  try {
    const stored = globalThis.localStorage.getItem(CART_STORAGE_KEY);
    const items = stored ? JSON.parse(stored) : [];

    if (Array.isArray(items)) {
      return items.filter((item) => isCartStorageItem(item));
    }
  } catch {}

  return [];
};

export const useCartStore: () => CartStore = create<CartStore>()(
  persist<CartStore>(
    (set, get) => ({
      items: [],
      totalItems: 0,
      totalPrice: 0,

      addProduct: (product: Product, quantity: number = 1) => {
        set((state) => {
          const existingItemIndex = state.items.findIndex((item) => item.product.id === product.id);
          let newItems: CartItem[];

          if (existingItemIndex >= 0) {
            newItems = [...state.items];
            newItems[existingItemIndex] = {
              ...newItems[existingItemIndex],
              quantity: newItems[existingItemIndex].quantity + quantity,
            };
          } else {
            newItems = [...state.items, { product, quantity }];
          }

          const { totalItems, totalPrice } = calculateTotals(newItems);

          saveToLocalStorage(newItems);

          return {
            items: newItems,
            totalItems,
            totalPrice,
          };
        });
      },

      removeProduct: (productId: number) => {
        set((state) => {
          const newItems = state.items.filter((item) => item.product.id !== productId);
          const { totalItems, totalPrice } = calculateTotals(newItems);

          saveToLocalStorage(newItems);

          return {
            items: newItems,
            totalItems,
            totalPrice,
          };
        });
      },

      updateQuantity: (productId: number, quantity: number) => {
        set((state) => {
          if (quantity <= 0) {
            const newItems = state.items.filter((item) => item.product.id !== productId);
            const { totalItems, totalPrice } = calculateTotals(newItems);

            saveToLocalStorage(newItems);

            return {
              items: newItems,
              totalItems,
              totalPrice,
            };
          }

          const newItems = state.items.map((item) =>
            item.product.id === productId ? { ...item, quantity } : item,
          );

          const { totalItems, totalPrice } = calculateTotals(newItems);

          saveToLocalStorage(newItems);

          return {
            items: newItems,
            totalItems,
            totalPrice,
          };
        });
      },

      clearCart: () => {
        set(() => {
          if (typeof globalThis !== 'undefined') {
            globalThis.localStorage.removeItem(CART_STORAGE_KEY);
          }

          return {
            items: [],
            totalItems: 0,
            totalPrice: 0,
          };
        });
      },

      loadFromStorage: () => {
        const storedItems = loadFromLocalStorage();
        if (storedItems.length === 0) {
          return;
        }
      },

      saveToStorage: () => {
        const { items } = get();
        saveToLocalStorage(items);
      },
    }),
    {
      name: CART_STORAGE_KEY,
    },
  ),
);

export const useCart = (): CartState => {
  const store = useCartStore();

  return {
    items: store.items,
    totalItems: store.totalItems,
    totalPrice: store.totalPrice,
  };
};

export const useCartActions = (): CartActions => {
  const store = useCartStore();

  return {
    addProduct: store.addProduct,
    removeProduct: store.removeProduct,
    updateQuantity: store.updateQuantity,
    clearCart: store.clearCart,
    loadFromStorage: store.loadFromStorage,
    saveToStorage: store.saveToStorage,
  };
};
