import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Badge } from './Badge';

const meta: Meta<typeof Badge> = {
  title: 'UI/Badge',
  component: Badge,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Primary: Story = {
  args: { label: 'Oferta', variant: 'primary' },
};

export const Secondary: Story = {
  args: { label: '-15%', variant: 'secondary' },
};

export const Neutral: Story = {
  args: { label: 'smartphones', variant: 'neutral' },
};
