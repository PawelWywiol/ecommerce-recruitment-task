'use client';

import { ShoppingBagIcon } from 'lucide-react';
import Link from 'next/link';

import { useCart } from '@/stores/cart.store';
import { Button } from '../ui/button';

export const HeaderCart = () => {
  const { totalItems } = useCart();

  return (
    <Link href="/cart">
      <Button variant="ghost" size="sm" className="h-9 w-9 p-0 hover:bg-luxury-cream relative">
        <ShoppingBagIcon className="h-4 w-4" />
        {totalItems > 0 && (
          <span className="absolute -top-1 -right-1 h-4 w-4 bg-luxury-gold text-luxury-gold-foreground text-xs rounded-full flex items-center justify-center font-medium">
            {totalItems}
          </span>
        )}
      </Button>
    </Link>
  );
};
