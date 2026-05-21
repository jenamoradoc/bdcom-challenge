'use client';

import Link from 'next/link';
import { useCartStore } from '../../../../store/useCartStore';

function CartIcon() {
  const totalItems = useCartStore((s) => s.totalItems());

  return (
    <Link
      href="/cart"
      aria-label={`Carrito${totalItems > 0 ? `, ${totalItems} items` : ''}`}
      className="relative flex items-center justify-center h-9 w-9 text-white hover:opacity-80 transition-opacity flex-shrink-0"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
      {totalItems > 0 && (
        <span className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center bg-[var(--color-secondary)] text-white text-[10px] font-bold rounded-full">
          {totalItems > 99 ? '99+' : totalItems}
        </span>
      )}
    </Link>
  );
}

export { CartIcon };
export default CartIcon;
