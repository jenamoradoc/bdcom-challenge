'use client';

import { ErrorView } from '../../presentation/components/ui/ErrorView/ErrorView';

interface ErrorPageProps {
  error: Error;
  reset: () => void;
}

export default function SearchError({ error, reset }: ErrorPageProps) {
  return (
    <main>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ErrorView message={error.message || 'No pudimos realizar la búsqueda.'} reset={reset} />
      </div>
    </main>
  );
}
