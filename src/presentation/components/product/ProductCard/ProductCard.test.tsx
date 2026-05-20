import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProductCard } from './ProductCard';
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

const mockProduct: Product = {
  id: 1,
  sku: 'RCH45Q1A',
  title: 'Wireless Headphones',
  price: 149.99,
  description: 'Great headphones',
  category: 'electronics',
  thumbnail: 'https://example.com/headphones.jpg',
  images: [],
  rating: 4.5,
  stock: 25,
  brand: 'SoundBrand',
};

describe('ProductCard', () => {
  it('renders the product title', () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByText('Wireless Headphones')).toBeInTheDocument();
  });

  it('renders a formatted price', () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByText(/149/)).toBeInTheDocument();
  });

  it('renders the product image with correct alt text', () => {
    render(<ProductCard product={mockProduct} />);
    const img = screen.getByAltText('Wireless Headphones');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'https://example.com/headphones.jpg');
  });

  it('links to the correct product page using sku', () => {
    render(<ProductCard product={mockProduct} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/product/RCH45Q1A');
  });
});
