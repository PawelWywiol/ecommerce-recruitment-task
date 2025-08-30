import { UserIcon } from 'lucide-react';

import { Button } from '../ui/button';

export const HeaderAccountButton = () => (
  <Button variant="ghost" size="sm" className="h-9 min-w-9 p-0 hover:bg-luxury-cream w-auto">
    <UserIcon className="h-4 w-4" />
    <span className="lg:hidden">Account</span>
  </Button>
);
