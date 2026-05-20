import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Header } from './Header';

vi.mock('next/link', () => ({
  default: ({ href, children, ...rest }: { href: string; children: React.ReactNode }) => (
    <a href={href} {...rest}>
      {children}
    </a>
  ),
}));

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

describe('Header', () => {
  it('renders the logo link pointing to /', () => {
    render(<Header />);
    const logoLink = screen.getByRole('link', { name: /bidcom home/i });
    expect(logoLink).toHaveAttribute('href', '/');
  });

  it('renders the search bar', () => {
    render(<Header />);
    expect(screen.getByRole('searchbox')).toBeInTheDocument();
  });

  it('passes initialSearchValue to SearchBar', () => {
    render(<Header initialSearchValue="smartphone" />);
    expect(screen.getByRole('searchbox')).toHaveValue('smartphone');
  });
});
