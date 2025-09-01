import { MOCKED_PRODUCT_DATA } from '@/__mocks__/product';

export const ProductFeatures = () => (
  <div className="space-y-3">
    {MOCKED_PRODUCT_DATA.features.map((feature) => (
      <div key={feature.text} className="flex items-center space-x-3 text-sm">
        <feature.icon className="h-4 w-4 text-luxury-gold" />
        <span className="text-luxury-warm-gray">{feature.text}</span>
      </div>
    ))}
  </div>
);
