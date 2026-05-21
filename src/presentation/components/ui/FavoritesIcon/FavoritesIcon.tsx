'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useFavoritesStore } from '../../../../store/useFavoritesStore';

function FavoritesIcon() {
  const count = useFavoritesStore((s) => s.products.length);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <Link
      href="/favorites"
      aria-label={`Favoritos${mounted && count > 0 ? `, ${count} productos` : ''}`}
      className="relative flex items-center justify-center h-9 w-9 text-white hover:opacity-80 transition-opacity flex-shrink-0"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        fill="none"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
      {mounted && count > 0 && (
        <span className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center bg-[var(--color-secondary)] text-white text-[10px] font-bold rounded-full">
          {count > 99 ? '99+' : count}
        </span>
      )}
    </Link>
  );
}

export { FavoritesIcon };
export default FavoritesIcon;
