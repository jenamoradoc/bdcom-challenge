import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4 gap-4">
      <p className="text-7xl font-bold text-[var(--color-primary)]">404</p>
      <p className="text-xl font-semibold text-[var(--color-neutral-900)]">
        Página no encontrada
      </p>
      <p className="text-sm text-gray-500 max-w-xs">
        La página que buscás no existe o fue movida.
      </p>
      <Link
        href="/"
        className="mt-2 px-6 py-2 bg-[var(--color-primary)] text-white text-sm font-semibold rounded-[var(--radius-button)] hover:bg-[var(--color-primary-dark)] transition-colors"
      >
        Ir al inicio
      </Link>
    </main>
  );
}
