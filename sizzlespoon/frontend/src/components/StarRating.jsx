import { useState } from 'react';

/**
 * StarRating in Pinch of Yum aesthetic:
 * - Color: #edb654 (warm honey gold)
 * - Display-only or interactive rating widget
 */
export default function StarRating({ score = 0, onRate, size = 'md' }) {
  const [hovered, setHovered] = useState(0);
  const interactive = typeof onRate === 'function';

  const sizeClass = {
    sm: 'text-base',
    md: 'text-2xl',
    lg: 'text-3xl',
  }[size] ?? 'text-2xl';

  const displayScore = interactive ? (hovered || score) : score;

  return (
    <div className={`flex items-center gap-1 ${sizeClass}`} role="group" aria-label="Star rating">
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = star <= displayScore;
        return (
          <button
            key={star}
            type="button"
            disabled={!interactive}
            onClick={() => interactive && onRate(star)}
            onMouseEnter={() => interactive && setHovered(star)}
            onMouseLeave={() => interactive && setHovered(0)}
            aria-label={`Rate ${star} out of 5`}
            className={[
              'leading-none transition-transform duration-100',
              interactive ? 'cursor-pointer hover:scale-125 focus:outline-none' : 'cursor-default',
              filled ? 'text-poy-yellow' : 'text-gray-300',
            ].join(' ')}
          >
            ★
          </button>
        );
      })}
    </div>
  );
}
