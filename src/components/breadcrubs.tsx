import Link from 'next/link';

export const Breadcrumbs = ({
  links,
  last,
}: {
  links: { label: string; href: string }[];
  last?: string;
}) => (
  <nav className="flex items-center space-x-2 text-sm text-luxury-warm-gray mb-8">
    {links.map((link) => (
      <Link
        key={`breadcrumb-link-${link.label}`}
        href={link.href}
        className="hover:text-luxury-gold transition-colors"
      >
        {link.label}
      </Link>
    ))}
    {last && <span className="text-luxury-charcoal">{last}</span>}
  </nav>
);
