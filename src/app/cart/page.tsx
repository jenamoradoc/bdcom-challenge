'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCartStore } from '../../store/useCartStore';
import { useAuthStore } from '../../store/useAuthStore';
import { Header } from '../../presentation/components/layout/Header/Header';
import { Container } from '../../presentation/components/layout/Container/Container';
import { Typography } from '../../presentation/components/ui/Typography/Typography';
import { formatPrice } from '../../lib/utils';

export default function CartPage() {
  const items = useCartStore((s) => s.items);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const totalPrice = useCartStore((s) => s.totalPrice());
  const totalItems = useCartStore((s) => s.totalItems());
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn());

  return (
    <>
      <Header />
      <main>
        <Container className="py-8">
          <Typography variant="h1" className="mb-6">Mi carrito</Typography>

          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <Typography variant="h3">Tu carrito está vacío</Typography>
              <Typography variant="caption">Explorá nuestros productos y agregá algo.</Typography>
              <Link href="/" className="mt-2 px-6 py-2 bg-[var(--color-primary)] text-white text-sm font-semibold rounded-[var(--radius-button)] hover:bg-[var(--color-primary-dark)] transition-colors">
                Ver productos
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 flex flex-col gap-4">
                {items.map(({ product, quantity }) => (
                  <div key={product.sku} className="flex gap-4 bg-white rounded-[var(--radius-card)] shadow-sm p-4">
                    <div className="relative h-20 w-20 flex-shrink-0 bg-[var(--color-neutral-100)] rounded overflow-hidden">
                      <Image src={product.thumbnail} alt={product.title} fill sizes="80px" className="object-contain p-1" />
                    </div>

                    <div className="flex flex-col flex-1 gap-1 min-w-0">
                      <p className="text-sm font-medium text-[var(--color-neutral-900)] line-clamp-2">{product.title}</p>
                      <p className="text-[var(--color-primary)] font-bold text-sm">{formatPrice(product.price)}</p>

                      <div className="flex items-center gap-2 mt-auto">
                        <button
                          onClick={() => updateQuantity(product.sku, quantity - 1)}
                          aria-label="Reducir cantidad"
                          className="h-7 w-7 flex items-center justify-center border border-gray-200 rounded hover:border-[var(--color-primary)] transition-colors text-gray-600 font-bold"
                        >
                          −
                        </button>
                        <span className="w-6 text-center text-sm font-medium">{quantity}</span>
                        <button
                          onClick={() => updateQuantity(product.sku, quantity + 1)}
                          aria-label="Aumentar cantidad"
                          className="h-7 w-7 flex items-center justify-center border border-gray-200 rounded hover:border-[var(--color-primary)] transition-colors text-gray-600 font-bold"
                        >
                          +
                        </button>
                        <button
                          onClick={() => removeItem(product.sku)}
                          aria-label="Eliminar producto"
                          className="ml-auto text-xs text-gray-400 hover:text-red-500 transition-colors"
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>

                    <p className="text-sm font-bold text-[var(--color-neutral-900)] flex-shrink-0">
                      {formatPrice(product.price * quantity)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-4">
                <div className="bg-white rounded-[var(--radius-card)] shadow-sm p-6 flex flex-col gap-4">
                  <Typography variant="h2">Resumen</Typography>

                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Productos ({totalItems})</span>
                    <span>{formatPrice(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Envío</span>
                    <span className="text-green-600 font-medium">Gratis</span>
                  </div>

                  <div className="border-t pt-4 flex justify-between font-bold text-[var(--color-neutral-900)]">
                    <span>Total</span>
                    <span className="text-[var(--color-primary)]">{formatPrice(totalPrice)}</span>
                  </div>

                  {isLoggedIn ? (
                    <Link
                      href="/checkout"
                      className="w-full text-center py-3 bg-[var(--color-primary)] text-white font-semibold rounded-[var(--radius-button)] hover:bg-[var(--color-primary-dark)] transition-colors"
                    >
                      Continuar compra
                    </Link>
                  ) : (
                    <div className="flex flex-col gap-3">
                      <p className="text-sm text-center text-gray-500">
                        Iniciá sesión para realizar la compra
                      </p>
                      <Link
                        href="/login"
                        className="w-full text-center py-3 bg-[var(--color-primary)] text-white font-semibold rounded-[var(--radius-button)] hover:bg-[var(--color-primary-dark)] transition-colors"
                      >
                        Iniciar sesión
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </Container>
      </main>
    </>
  );
}
