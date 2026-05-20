import Link from 'next/link';
import { Category } from '../../../../domain/entities/Category';
import { EMPTY_STATE_CATEGORIES_LIMIT } from '../../../../lib/constants';
import { Typography } from '../../../components/ui/Typography/Typography';

export interface EmptyStateProps {
  categories: Category[];
}

function EmptyState({ categories }: EmptyStateProps) {
  const displayCategories = categories.slice(0, EMPTY_STATE_CATEGORIES_LIMIT);

  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-16 w-16 text-gray-300 mb-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>

      <Typography variant="h3" className="mb-2">
        No se encontró ningún producto.
      </Typography>
      <Typography variant="caption" className="mb-6">
        Te recomendamos buscar estas categorías:
      </Typography>

      <ul className="flex flex-wrap justify-center gap-2">
        {displayCategories.map((category) => (
          <li key={category.slug}>
            <Link
              href={`/search?s=${encodeURIComponent(category.slug)}`}
              prefetch={false}
              className="px-4 py-2 bg-[var(--color-neutral-100)] text-[var(--color-primary)] rounded-full text-sm font-medium hover:bg-[var(--color-primary)] hover:text-white transition-colors"
            >
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export { EmptyState };
export default EmptyState;
