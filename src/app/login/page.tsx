'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore } from '../../store/useAuthStore';
import { Header } from '../../presentation/components/layout/Header/Header';
import { Container } from '../../presentation/components/layout/Container/Container';
import { Typography } from '../../presentation/components/ui/Typography/Typography';

export default function LoginPage() {
  const login = useAuthStore((s) => s.login);
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      const success = login(email, password);
      if (success) {
        router.push('/cart');
      } else {
        setError('Email o contraseña incorrectos.');
        setLoading(false);
      }
    }, 600);
  };

  return (
    <>
      <Header />
      <main>
        <Container className="py-12">
          <div className="max-w-sm mx-auto">
            <div className="bg-white rounded-[var(--radius-card)] shadow-sm p-8 flex flex-col gap-6">
              <div className="text-center">
                <Typography variant="h1">Iniciar sesión</Typography>
                <Typography variant="caption" className="mt-1 block">
                  Ingresá con tu cuenta para continuar
                </Typography>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <label htmlFor="email" className="text-sm font-medium text-[var(--color-neutral-900)]">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="usuario@bidcom.com"
                    required
                    className="px-3 py-2 border border-gray-200 rounded-[var(--radius-button)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label htmlFor="password" className="text-sm font-medium text-[var(--color-neutral-900)]">
                    Contraseña
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="px-3 py-2 border border-gray-200 rounded-[var(--radius-button)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
                  />
                </div>

                {error && (
                  <p className="text-sm text-red-500 text-center">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-[var(--color-primary)] text-white font-semibold rounded-[var(--radius-button)] hover:bg-[var(--color-primary-dark)] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? 'Ingresando...' : 'Ingresar'}
                </button>
              </form>

              <p className="text-xs text-center text-gray-400">
                Demo: <strong>usuario@bidcom.com</strong> / <strong>1234</strong>
              </p>

              <div className="text-center">
                <Link href="/cart" className="text-sm text-[var(--color-primary)] hover:underline">
                  Volver al carrito
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </main>
    </>
  );
}
