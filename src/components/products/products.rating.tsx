import { StarIcon } from 'lucide-react';

export const ProductRating = ({ rating, reviews }: { rating: number; reviews?: number }) => (
  <div className="flex items-center space-x-1">
    {Array.from({ length: 5 }, (_, i) => i + 1).map((star) => (
      <StarIcon
        key={star}
        className={`h-4 w-4 ${
          star <= rating ? 'fill-luxury-gold text-luxury-gold' : 'text-luxury-warm-gray/30'
        }`}
      />
    ))}
    {!!reviews && <span className="text-sm text-luxury-warm-gray ml-2">({reviews} reviews)</span>}
  </div>
);
