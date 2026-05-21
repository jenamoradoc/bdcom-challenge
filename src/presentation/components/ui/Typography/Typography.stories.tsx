import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Typography } from './Typography';

const meta: Meta<typeof Typography> = {
  title: 'UI/Typography',
  component: Typography,
  tags: ['autodocs'],
  args: { children: 'Texto de ejemplo' },
};

export default meta;
type Story = StoryObj<typeof Typography>;

export const Heading1: Story = {
  args: { variant: 'h1', children: 'Título principal' },
};

export const Heading2: Story = {
  args: { variant: 'h2', children: 'Título de sección' },
};

export const Heading3: Story = {
  args: { variant: 'h3', children: 'Subtítulo' },
};

export const Body: Story = {
  args: { variant: 'body', children: 'Texto de cuerpo. Descripción del producto con detalles relevantes.' },
};

export const Caption: Story = {
  args: { variant: 'caption', children: 'Texto secundario pequeño' },
};
