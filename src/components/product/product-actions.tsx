'use client';

import { MinusIcon, PlusIcon, ShoppingBagIcon } from 'lucide-react';
import { useState } from 'react';

import type { Product } from '@/services/products/products.type';

import { MOCKED_PRODUCT_DATA } from '@/__mocks__/product';
import { useCartActions } from '@/stores/cart.store';
import { Button } from '../ui/button';

export const ProductActions = ({ product }: { product: Product }) => {
  const [quantity, setQuantity] = useState(1);
  const { addProduct } = useCartActions();

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <span className="text-sm font-medium text-luxury-charcoal">Quantity:</span>
        <div className="flex items-center border border-border rounded-lg">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="h-10 w-10 p-0 rounded-r-none"
          >
            <MinusIcon className="h-4 w-4" />
          </Button>
          <span className="w-16 text-center font-medium">{quantity}</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setQuantity(Math.min(quantity + 1, MOCKED_PRODUCT_DATA.stockCount))}
            className="h-10 w-10 p-0 rounded-l-none"
          >
            <PlusIcon className="h-4 w-4" />
          </Button>
        </div>
        {MOCKED_PRODUCT_DATA.stockCount <= 10 && (
          <span className="text-sm text-luxury-burgundy">
            Only {MOCKED_PRODUCT_DATA.stockCount} left in stock
          </span>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          size="lg"
          className="flex-1 bg-luxury-charcoal hover:bg-luxury-charcoal/90 text-luxury-charcoal-foreground"
          disabled={!MOCKED_PRODUCT_DATA.inStock}
          onClick={() => addProduct(product, quantity)}
        >
          <ShoppingBagIcon className="mr-2 h-4 w-4" />
          Add to Cart - ${(product.price * quantity).toLocaleString()}
        </Button>
        <Button
          variant="outline"
          size="lg"
          className="border-luxury-gold text-luxury-gold hover:bg-luxury-gold hover:text-luxury-gold-foreground"
        >
          Buy Now
        </Button>
      </div>
    </div>
  );
};
