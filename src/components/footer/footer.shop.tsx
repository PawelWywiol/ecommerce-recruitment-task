import Link from 'next/link';

export const FooterShop = () => (
  <div className="space-y-4">
    <h3 className="font-semibold text-base">Shop</h3>
    <ul className="space-y-2 text-sm text-luxury-warm-gray">
      <li>
        <Link href="/categories" className="hover:text-luxury-gold transition-colors">
          Categories
        </Link>
      </li>
      <li>
        <Link href="/products" className="hover:text-luxury-gold transition-colors">
          All Products
        </Link>
      </li>
      <li>
        <Link href="/new-arrivals" className="hover:text-luxury-gold transition-colors">
          New Arrivals
        </Link>
      </li>
      <li>
        <Link href="/sale" className="hover:text-luxury-gold transition-colors">
          Sale
        </Link>
      </li>
    </ul>
  </div>
);
