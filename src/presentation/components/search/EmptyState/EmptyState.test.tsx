import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { EmptyState } from './EmptyState';
import { Category } from '../../../../domain/entities/Category';

vi.mock('next/link', () => ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  default: ({ href, children, prefetch, ...rest }: { href: string; children: React.ReactNode; prefetch?: boolean }) => (
    <a href={href} {...rest}>
      {children}
    </a>
  ),
}));

const mockCategories: Category[] = [
  { slug: 'smartphones', name: 'Smartphones', url: 'https://dummyjson.com/products/category/smartphones' },
  { slug: 'laptops', name: 'Laptops', url: 'https://dummyjson.com/products/category/laptops' },
  { slug: 'fragrances', name: 'Fragrances', url: 'https://dummyjson.com/products/category/fragrances' },
  { slug: 'skincare', name: 'Skincare', url: 'https://dummyjson.com/products/category/skincare' },
  { slug: 'groceries', name: 'Groceries', url: 'https://dummyjson.com/products/category/groceries' },
  { slug: 'home-decoration', name: 'Home Decoration', url: 'https://dummyjson.com/products/category/home-decoration' },
];

describe('EmptyState', () => {
  it('renders the "no products found" message', () => {
    render(<EmptyState categories={mockCategories} />);
    expect(screen.getByText(/No se encontró ningún producto/)).toBeInTheDocument();
  });

  it('renders the recommendation text', () => {
    render(<EmptyState categories={mockCategories} />);
    expect(screen.getByText(/Te recomendamos buscar estas categorías/)).toBeInTheDocument();
  });

  it('renders only the first 5 categories as links', () => {
    render(<EmptyState categories={mockCategories} />);
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(5);
  });

  it('each category link points to /search?s={slug}', () => {
    render(<EmptyState categories={mockCategories} />);
    const smartphonesLink = screen.getByRole('link', { name: 'Smartphones' });
    expect(smartphonesLink).toHaveAttribute('href', '/search?s=smartphones');
  });

  it('does not render the 6th category', () => {
    render(<EmptyState categories={mockCategories} />);
    expect(screen.queryByRole('link', { name: 'Home Decoration' })).not.toBeInTheDocument();
  });
});
