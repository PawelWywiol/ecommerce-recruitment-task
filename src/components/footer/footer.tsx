import { FooterBrand } from './footer.brand';
import { FooterConnect } from './footer.connect';
import { FooterCustomerCare } from './footer.customer-care';
import { FooterShop } from './footer.shop';
import { FooterTerms } from './footer.terms';

export const Footer = () => (
  <footer className="bg-luxury-charcoal text-luxury-charcoal-foreground">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <FooterBrand />
        <FooterShop />
        <FooterCustomerCare />
        <FooterConnect />
      </div>

      <FooterTerms />
    </div>
  </footer>
);
