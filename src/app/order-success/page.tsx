'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { Header } from '../../presentation/components/layout/Header/Header';
import { Container } from '../../presentation/components/layout/Container/Container';
import { Typography } from '../../presentation/components/ui/Typography/Typography';

export default function OrderSuccessPage() {
  const orderNumber = useMemo(() => Math.floor(Math.random() * 900000) + 100000, []);

  return (
    <>
      <Header />
      <main>
        <Container className="py-12">
          <div className="max-w-md mx-auto bg-white rounded-[var(--radius-card)] shadow-sm p-10 flex flex-col items-center gap-6 text-center">
            <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <div className="flex flex-col gap-2">
              <Typography variant="h1">¡Compra confirmada!</Typography>
              <Typography variant="caption" className="block">
                Gracias por tu compra. Tu pedido está en camino.
              </Typography>
            </div>

            <div className="w-full bg-[var(--color-neutral-100)] rounded-[var(--radius-card)] px-6 py-4">
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Número de orden</p>
              <p className="text-2xl font-bold text-[var(--color-primary)]">#{orderNumber}</p>
            </div>

            <p className="text-sm text-gray-500">
              Recibirás un email de confirmación en <strong>usuario@bidcom.com</strong>
            </p>

            <Link
              href="/"
              className="w-full py-3 text-center bg-[var(--color-primary)] text-white font-semibold rounded-[var(--radius-button)] hover:bg-[var(--color-primary-dark)] transition-colors"
            >
              Seguir comprando
            </Link>
          </div>
        </Container>
      </main>
    </>
  );
}
