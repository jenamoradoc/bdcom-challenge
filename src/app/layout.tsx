import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Bidcom — Mini Ecommerce',
  description: 'Mini ecommerce powered by DummyJSON and Next.js 15',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-[var(--color-neutral-50)] antialiased">
        {children}
      </body>
    </html>
  );
}
