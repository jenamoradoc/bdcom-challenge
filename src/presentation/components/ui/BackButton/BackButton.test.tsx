import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BackButton } from './BackButton';

const mockBack = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    back: mockBack,
  }),
}));

describe('BackButton', () => {
  it('renders the back button', () => {
    render(<BackButton />);
    expect(screen.getByRole('button', { name: /volver/i })).toBeInTheDocument();
  });

  it('calls router.back when clicked', () => {
    render(<BackButton />);
    fireEvent.click(screen.getByRole('button', { name: /volver/i }));
    expect(mockBack).toHaveBeenCalledOnce();
  });
});
