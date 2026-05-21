import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { EmptyState } from './EmptyState';

const meta: Meta<typeof EmptyState> = {
  title: 'Search/EmptyState',
  component: EmptyState,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof EmptyState>;

export const WithCategories: Story = {
  args: {
    categories: [
      { slug: 'smartphones', name: 'Smartphones', url: '' },
      { slug: 'laptops', name: 'Laptops', url: '' },
      { slug: 'tablets', name: 'Tablets', url: '' },
      { slug: 'audio', name: 'Audio', url: '' },
      { slug: 'televisions', name: 'Televisores', url: '' },
    ],
  },
};

export const Empty: Story = {
  args: { categories: [] },
};
