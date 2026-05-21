'use client';

import { useState } from 'react';
import { useCartStore } from '../../../../store/useCartStore';
import { Product } from '../../../../domain/entities/Product';

interface AddToCartButtonProps {
  product: Product;
}

function AddToCartButton({ product }: AddToCartButtonProps) {
  const addItem = useCartStore((s) => s.addItem);
  const [added, setAdded] = useState(false);

  const handleClick = () => {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <button
      onClick={handleClick}
      className="flex-1 md:flex-none px-8 py-3 bg-[var(--color-primary)] text-white font-semibold rounded-[var(--radius-button)] hover:bg-[var(--color-primary-dark)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2"
    >
      {added ? '¡Agregado!' : 'Agregar al carrito'}
    </button>
  );
}

export { AddToCartButton };
export default AddToCartButton;
