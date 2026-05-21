import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ProductCard } from './ProductCard';

const mockProduct = {
  id: 1,
  sku: 'MOCK-001',
  title: 'iPhone 15 Pro Max 256GB Natural Titanium',
  price: 1299.99,
  description: 'El iPhone más avanzado de Apple.',
  category: 'smartphones',
  thumbnail: 'https://cdn.dummyjson.com/products/images/smartphones/iPhone%2015%20Pro%20Max/thumbnail.png',
  images: [],
  rating: 4.8,
  stock: 12,
  brand: 'Apple',
  discountPercentage: 10,
};

const meta: Meta<typeof ProductCard> = {
  title: 'Product/ProductCard',
  component: ProductCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div style={{ width: 240 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ProductCard>;

export const Default: Story = {
  args: { product: mockProduct },
};

export const WithoutDiscount: Story = {
  args: { product: { ...mockProduct, discountPercentage: 0 } },
};

export const LongTitle: Story = {
  args: {
    product: {
      ...mockProduct,
      title: 'Producto con un nombre muy largo que debería truncarse en dos líneas máximo',
    },
  },
};
