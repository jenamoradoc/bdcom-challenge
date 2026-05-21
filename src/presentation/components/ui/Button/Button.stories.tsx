import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
  args: { children: 'Botón' },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: { variant: 'primary', children: 'Agregar al carrito' },
};

export const Secondary: Story = {
  args: { variant: 'secondary', children: 'Ver más' },
};

export const Disabled: Story = {
  args: { variant: 'primary', children: 'No disponible', disabled: true },
};
