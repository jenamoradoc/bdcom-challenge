import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProductGrid } from './ProductGrid';
import { Product } from '../../../../domain/entities/Product';

vi.mock('next/image', () => ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  default: ({ fill, ...rest }: React.ImgHTMLAttributes<HTMLImageElement> & { fill?: boolean }) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...rest} />;
  },
}));

vi.mock('next/link', () => ({
  default: ({ href, children, ...rest }: { href: string; children: React.ReactNode }) => (
    <a href={href} {...rest}>
      {children}
    </a>
  ),
}));

function makeProduct(id: number, sku: string, title: string): Product {
  return {
    id,
    sku,
    title,
    price: 10,
    description: 'desc',
    category: 'cat',
    thumbnail: 'https://example.com/img.jpg',
    images: [],
    rating: 4,
    stock: 5,
  };
}

describe('ProductGrid', () => {
  it('renders all product cards', () => {
    const products = [
      makeProduct(1, 'SKU1', 'Product A'),
      makeProduct(2, 'SKU2', 'Product B'),
      makeProduct(3, 'SKU3', 'Product C'),
    ];
    render(<ProductGrid products={products} />);

    expect(screen.getByText('Product A')).toBeInTheDocument();
    expect(screen.getByText('Product B')).toBeInTheDocument();
    expect(screen.getByText('Product C')).toBeInTheDocument();
  });

  it('renders no cards when products array is empty', () => {
    render(<ProductGrid products={[]} />);
    expect(screen.queryAllByRole('link')).toHaveLength(0);
  });
});
