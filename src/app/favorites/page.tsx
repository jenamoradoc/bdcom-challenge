'use client';

import Link from 'next/link';
import { useFavoritesStore } from '../../store/useFavoritesStore';
import { Header } from '../../presentation/components/layout/Header/Header';
import { Container } from '../../presentation/components/layout/Container/Container';
import { Typography } from '../../presentation/components/ui/Typography/Typography';
import { ProductGrid } from '../../presentation/components/product/ProductGrid/ProductGrid';

export default function FavoritesPage() {
  const products = useFavoritesStore((s) => s.products);

  return (
    <>
      <Header />
      <main>
        <Container className="py-8">
          <Typography variant="h1" className="mb-6">Mis favoritos</Typography>

          {products.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <Typography variant="h3">No tenés favoritos todavía</Typography>
              <Typography variant="caption">Tocá el corazón en cualquier producto para guardarlo acá.</Typography>
              <Link href="/" className="mt-2 px-6 py-2 bg-[var(--color-primary)] text-white text-sm font-semibold rounded-[var(--radius-button)] hover:bg-[var(--color-primary-dark)] transition-colors">
                Ver productos
              </Link>
            </div>
          ) : (
            <ProductGrid products={products} />
          )}
        </Container>
      </main>
    </>
  );
}
