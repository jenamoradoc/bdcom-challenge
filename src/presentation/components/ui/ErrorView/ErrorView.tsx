'use client';

import { Typography } from '../Typography/Typography';

interface ErrorViewProps {
  message?: string;
  reset?: () => void;
}

function ErrorView({ message = 'Algo salió mal.', reset }: ErrorViewProps) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center gap-4">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-14 w-14 text-gray-300"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
        />
      </svg>
      <Typography variant="h3">{message}</Typography>
      <Typography variant="caption">Por favor intentá de nuevo.</Typography>
      {reset && (
        <button
          onClick={reset}
          className="mt-2 px-6 py-2 bg-[var(--color-primary)] text-white text-sm font-semibold rounded-[var(--radius-button)] hover:bg-[var(--color-primary-dark)] transition-colors"
        >
          Reintentar
        </button>
      )}
    </div>
  );
}

export { ErrorView };
export default ErrorView;
