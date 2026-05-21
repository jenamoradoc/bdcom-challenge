'use client';

import { useState, useEffect } from 'react';
import { useFavoritesStore } from '../../../../store/useFavoritesStore';

interface FavoriteButtonProps {
  sku: string;
  className?: string;
}

function FavoriteButton({ sku, className = '' }: FavoriteButtonProps) {
  const toggle = useFavoritesStore((s) => s.toggle);
  const isFavorite = useFavoritesStore((s) => s.isFavorite(sku));
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggle(sku);
  };

  return (
    <button
      onClick={handleClick}
      aria-label={isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
      className={`flex items-center justify-center rounded-full transition-colors ${className}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        fill={mounted && isFavorite ? 'currentColor' : 'none'}
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    </button>
  );
}

export { FavoriteButton };
export default FavoriteButton;
