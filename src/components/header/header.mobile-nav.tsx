import Link from 'next/link';

export const HeaderMobileNav = ({
  items,
  pathname,
  setIsMenuOpen,
}: {
  items: Array<{ name: string; href: string }>;
  pathname: string;
  setIsMenuOpen: (isOpen: boolean) => void;
}) => (
  <nav className="flex flex-col space-y-2">
    {items.map((item) => (
      <Link
        key={item.name}
        href={item.href}
        onClick={() => setIsMenuOpen(false)}
        className={`px-2 py-2 text-base font-medium transition-colors ${
          item.href === pathname
            ? 'text-luxury-charcoal bg-luxury-cream'
            : 'text-luxury-warm-gray hover:text-luxury-charcoal hover:bg-luxury-cream/50'
        }`}
      >
        {item.name}
      </Link>
    ))}
  </nav>
);
