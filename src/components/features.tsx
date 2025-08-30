import { HeartHandshakeIcon, ShieldIcon, TruckIcon } from 'lucide-react';

export const Features = () => {
  const features = [
    {
      icon: ShieldIcon,
      title: 'Authenticity Guaranteed',
      description: 'Every product is verified and comes with a certificate of authenticity.',
    },
    {
      icon: TruckIcon,
      title: 'Complimentary Shipping',
      description: 'Free worldwide shipping on all orders above $500, with premium packaging.',
    },
    {
      icon: HeartHandshakeIcon,
      title: 'Personal Styling',
      description: 'Complimentary personal styling consultation with our luxury fashion experts.',
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-luxury-cream/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-luxury-charcoal">
            The Luxora Promise
          </h2>
          <p className="text-lg text-luxury-warm-gray max-w-2xl mx-auto">
            We're committed to providing an unparalleled luxury shopping experience with services
            that match our exceptional products.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div key={feature.title} className="text-center space-y-4">
              <div className="w-16 h-16 bg-luxury-gold/10 rounded-full flex items-center justify-center mx-auto">
                <feature.icon className="h-8 w-8 text-luxury-gold" />
              </div>
              <h3 className="text-xl font-semibold text-luxury-charcoal">{feature.title}</h3>
              <p className="text-luxury-warm-gray leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
