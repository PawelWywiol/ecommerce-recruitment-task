import { MenuIcon, XIcon } from 'lucide-react';

import { HeaderCart } from './header.cart';

import { Button } from '../ui/button';

export const HeaderMobileMenuButton = ({
  isMenuOpen,
  setIsMenuOpen,
}: {
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
}) => (
  <div className="lg:hidden flex items-center space-x-2">
    <HeaderCart />
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setIsMenuOpen(!isMenuOpen)}
      className="h-9 w-9 p-0"
    >
      {isMenuOpen ? <XIcon className="h-4 w-4" /> : <MenuIcon className="h-4 w-4" />}
    </Button>
  </div>
);
