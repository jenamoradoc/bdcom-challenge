'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useCartStore } from '../../store/useCartStore';
import { useAuthStore } from '../../store/useAuthStore';
import { Header } from '../../presentation/components/layout/Header/Header';
import { Container } from '../../presentation/components/layout/Container/Container';
import { Typography } from '../../presentation/components/ui/Typography/Typography';
import { formatPrice } from '../../lib/utils';

export default function CheckoutPage() {
  const router = useRouter();
  const items = useCartStore((s) => s.items);
  const totalPrice = useCartStore((s) => s.totalPrice());
  const totalItems = useCartStore((s) => s.totalItems());
  const clearCart = useCartStore((s) => s.clearCart);
  const user = useAuthStore((s) => s.user);
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn());
  const [confirming, setConfirming] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) router.replace('/login');
  }, [isLoggedIn, router]);

  useEffect(() => {
    if (isLoggedIn && items.length === 0) router.replace('/cart');
  }, [isLoggedIn, items.length, router]);

  const handleConfirm = () => {
    setConfirming(true);
    setTimeout(() => {
      clearCart();
      router.push('/order-success');
    }, 1000);
  };

  if (!isLoggedIn || items.length === 0) return null;

  return (
    <>
      <Header />
      <main>
        <Container className="py-8">
          <Typography variant="h1" className="mb-6">Confirmar compra</Typography>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 flex flex-col gap-4">
              <div className="bg-white rounded-[var(--radius-card)] shadow-sm p-6">
                <Typography variant="h2" className="mb-4">Datos del comprador</Typography>
                <div className="flex flex-col gap-2">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium text-[var(--color-neutral-900)]">Nombre: </span>
                    {user?.name}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium text-[var(--color-neutral-900)]">Email: </span>
                    {user?.email}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium text-[var(--color-neutral-900)]">Envío: </span>
                    Gratis — entrega estimada 3 a 5 días hábiles
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-[var(--radius-card)] shadow-sm p-6">
                <Typography variant="h2" className="mb-4">Productos ({totalItems})</Typography>
                <div className="flex flex-col gap-3">
                  {items.map(({ product, quantity }) => (
                    <div key={product.sku} className="flex items-center gap-3">
                      <div className="relative h-12 w-12 flex-shrink-0 bg-[var(--color-neutral-100)] rounded overflow-hidden">
                        <Image src={product.thumbnail} alt={product.title} fill sizes="48px" className="object-contain p-1" />
                      </div>
                      <p className="text-sm text-[var(--color-neutral-900)] flex-1 line-clamp-1">{product.title}</p>
                      <p className="text-sm text-gray-500 flex-shrink-0">x{quantity}</p>
                      <p className="text-sm font-bold text-[var(--color-neutral-900)] flex-shrink-0">
                        {formatPrice(product.price * quantity)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="bg-white rounded-[var(--radius-card)] shadow-sm p-6 flex flex-col gap-4">
                <Typography variant="h2">Total a pagar</Typography>

                <div className="flex justify-between text-sm text-gray-600">
                  <span>Subtotal</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Envío</span>
                  <span className="text-green-600 font-medium">Gratis</span>
                </div>
                <div className="border-t pt-4 flex justify-between font-bold text-[var(--color-neutral-900)]">
                  <span>Total</span>
                  <span className="text-[var(--color-primary)] text-lg">{formatPrice(totalPrice)}</span>
                </div>

                <button
                  onClick={handleConfirm}
                  disabled={confirming}
                  className="w-full py-3 bg-[var(--color-primary)] text-white font-semibold rounded-[var(--radius-button)] hover:bg-[var(--color-primary-dark)] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {confirming ? 'Procesando...' : 'Confirmar compra'}
                </button>

                <p className="text-xs text-center text-gray-400">
                  Simulación de compra — no se realizará ningún cobro real
                </p>
              </div>
            </div>
          </div>
        </Container>
      </main>
    </>
  );
}
