'use client';

import React, { useState, useEffect, KeyboardEvent } from 'react';
import { useRouter } from 'next/navigation';

export interface SearchBarProps {
  initialValue?: string;
}

function SearchBar({ initialValue = '' }: SearchBarProps) {
  const [value, setValue] = useState(initialValue);
  const router = useRouter();

  useEffect(() => {
    setValue(initialValue ?? '');
  }, [initialValue]);

  function handleSearch() {
    const term = value.trim();
    if (term) {
      router.push(`/search?s=${encodeURIComponent(term)}`);
    }
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      handleSearch();
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
  }

  return (
    <div className="flex w-full" role="search">
      <input
        type="search"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Buscar..."
        aria-label="Buscar productos"
        className="flex-1 min-w-0 px-3 py-2 text-[var(--color-neutral-900)] bg-white border-0 rounded-l-[var(--radius-button)] focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)]"
      />
      <button
        onClick={handleSearch}
        aria-label="Buscar"
        className="flex-shrink-0 px-3 py-2 bg-[var(--color-secondary)] text-white rounded-r-[var(--radius-button)] hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)] focus:ring-offset-1"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </button>
    </div>
  );
}

export { SearchBar };
export default SearchBar;
