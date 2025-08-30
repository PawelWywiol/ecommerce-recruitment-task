import Link from 'next/link';

export const FooterCustomerCare = () => (
  <div className="space-y-4">
    <h3 className="font-semibold text-base">Customer Care</h3>
    <ul className="space-y-2 text-sm text-luxury-warm-gray">
      <li>
        <Link href="/contact" className="hover:text-luxury-gold transition-colors">
          Contact Us
        </Link>
      </li>
      <li>
        <Link href="/shipping" className="hover:text-luxury-gold transition-colors">
          Shipping & Returns
        </Link>
      </li>
      <li>
        <Link href="/size-guide" className="hover:text-luxury-gold transition-colors">
          Size Guide
        </Link>
      </li>
      <li>
        <Link href="/care-guide" className="hover:text-luxury-gold transition-colors">
          Care Instructions
        </Link>
      </li>
    </ul>
  </div>
);
