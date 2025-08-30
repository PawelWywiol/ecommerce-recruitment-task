import Link from 'next/link';

export const FooterConnect = () => (
  <div className="space-y-4">
    <h3 className="font-semibold text-base">Connect</h3>
    <ul className="space-y-2 text-sm text-luxury-warm-gray">
      <li>
        <Link href="#" className="hover:text-luxury-gold transition-colors">
          Instagram
        </Link>
      </li>
      <li>
        <Link href="#" className="hover:text-luxury-gold transition-colors">
          Facebook
        </Link>
      </li>
      <li>
        <Link href="#" className="hover:text-luxury-gold transition-colors">
          Twitter
        </Link>
      </li>
      <li>
        <Link href="#" className="hover:text-luxury-gold transition-colors">
          Newsletter
        </Link>
      </li>
    </ul>
  </div>
);
