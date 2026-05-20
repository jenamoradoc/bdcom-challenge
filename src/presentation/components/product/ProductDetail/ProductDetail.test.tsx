import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProductDetail } from './ProductDetail';
import { Product } from '../../../../domain/entities/Product';

vi.mock('next/image', () => ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  default: ({ fill, priority, ...rest }: React.ImgHTMLAttributes<HTMLImageElement> & { fill?: boolean; priority?: boolean }) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...rest} />;
  },
}));

const mockProduct: Product = {
  id: 1,
  sku: 'TEST001',
  title: 'Premium Laptop',
  price: 1299.99,
  description: 'High-end laptop for professionals.',
  category: 'laptops',
  thumbnail: 'https://example.com/laptop.jpg',
  images: [],
  rating: 4.8,
  stock: 5,
  brand: 'TechBrand',
  discountPercentage: 15,
};

describe('ProductDetail', () => {
  it('renders the product title', () => {
    render(<ProductDetail product={mockProduct} />);
    expect(screen.getByText('Premium Laptop')).toBeInTheDocument();
  });

  it('renders the product description', () => {
    render(<ProductDetail product={mockProduct} />);
    expect(screen.getByText('High-end laptop for professionals.')).toBeInTheDocument();
  });

  it('renders the formatted price', () => {
    render(<ProductDetail product={mockProduct} />);
    expect(screen.getByText(/1\.299/)).toBeInTheDocument();
  });

  it('renders the brand when provided', () => {
    render(<ProductDetail product={mockProduct} />);
    expect(screen.getByText('TechBrand')).toBeInTheDocument();
  });

  it('renders the discount badge when discountPercentage is positive', () => {
    render(<ProductDetail product={mockProduct} />);
    expect(screen.getByText('-15%')).toBeInTheDocument();
  });

  it('renders the product image with correct alt', () => {
    render(<ProductDetail product={mockProduct} />);
    const img = screen.getByAltText('Premium Laptop');
    expect(img).toBeInTheDocument();
  });
});
