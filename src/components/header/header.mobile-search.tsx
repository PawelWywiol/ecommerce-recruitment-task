import { Input } from '../ui/input';

export const HeaderMobileSearch = () => (
  <div className="px-2">
    <Input
      type="search"
      placeholder="Search luxury items..."
      className="w-full bg-luxury-cream border-luxury-gold/20 focus:border-luxury-gold"
    />
  </div>
);
