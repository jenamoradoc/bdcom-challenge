'use client';

import { useRouter } from 'next/navigation';

function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      aria-label="Volver"
      className="flex items-center gap-2 mt-6 mb-2 text-sm text-gray-500 hover:text-[var(--color-primary)] transition-colors group"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 transition-transform group-hover:-translate-x-1"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        aria-hidden="true"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
      </svg>
      Volver
    </button>
  );
}

export { BackButton };
export default BackButton;
