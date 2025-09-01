'use client';

import { useState } from 'react';

import { MOCKED_PRODUCT_DATA } from '@/__mocks__/product';
import { Button } from '../ui/button';

type Color = (typeof MOCKED_PRODUCT_DATA.colors)[number];
type Size = (typeof MOCKED_PRODUCT_DATA.sizes)[number];

interface ProductVariantsProps {
  onColorChange?: (color: Color) => void;
  onSizeChange?: (size: Size) => void;
}

export const ProductVariants = ({ onColorChange, onSizeChange }: ProductVariantsProps) => {
  const [selectedColor, setSelectedColor] = useState(
    MOCKED_PRODUCT_DATA.colors.find((c) => c.available) || MOCKED_PRODUCT_DATA.colors[0],
  );
  const [selectedSize, setSelectedSize] = useState(
    MOCKED_PRODUCT_DATA.sizes.find((s) => s.available) || MOCKED_PRODUCT_DATA.sizes[0],
  );

  const handleColorChange = (color: Color) => {
    if (color.available) {
      setSelectedColor(color);
      onColorChange?.(color);
    }
  };

  const handleSizeChange = (size: Size) => {
    if (size.available) {
      setSelectedSize(size);
      onSizeChange?.(size);
    }
  };

  return (
    <div className="space-y-6">
      {/* Color Selection */}
      <div className="space-y-4">
        <h3 className="font-semibold text-luxury-charcoal">
          Color: <span className="font-normal">{selectedColor.name}</span>
        </h3>
        <div className="flex items-center space-x-3">
          {MOCKED_PRODUCT_DATA.colors.map((color) => (
            <button
              key={color.name}
              type="button"
              onClick={() => handleColorChange(color)}
              disabled={!color.available}
              className={`w-10 h-10 rounded-full border-2 transition-all ${
                selectedColor.name === color.name
                  ? 'border-luxury-gold ring-2 ring-luxury-gold/20'
                  : 'border-border hover:border-luxury-gold/50'
              } ${!color.available ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
              style={{ backgroundColor: color.value }}
              title={color.name}
            />
          ))}
        </div>
      </div>

      {/* Size Selection */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-luxury-charcoal">
            Size: <span className="font-normal">{selectedSize.name}</span>
          </h3>
          <Button variant="link" className="text-luxury-gold p-0 h-auto">
            Size Guide
          </Button>
        </div>
        <div className="grid grid-cols-5 gap-2">
          {MOCKED_PRODUCT_DATA.sizes.map((size) => (
            <button
              key={size.name}
              type="button"
              onClick={() => handleSizeChange(size)}
              disabled={!size.available}
              className={`py-3 px-4 border rounded-lg text-sm font-medium transition-all ${
                selectedSize.name === size.name
                  ? 'border-luxury-gold bg-luxury-gold text-luxury-gold-foreground'
                  : size.available
                    ? 'border-border hover:border-luxury-gold text-luxury-charcoal'
                    : 'border-border bg-luxury-cream/50 text-luxury-warm-gray cursor-not-allowed line-through'
              }`}
            >
              {size.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
