import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ErrorView } from './ErrorView';

describe('ErrorView', () => {
  it('renders the default message when none is provided', () => {
    render(<ErrorView />);
    expect(screen.getByText('Algo salió mal.')).toBeInTheDocument();
  });

  it('renders a custom message', () => {
    render(<ErrorView message="No pudimos cargar los productos." />);
    expect(screen.getByText('No pudimos cargar los productos.')).toBeInTheDocument();
  });

  it('does not render the retry button when reset is not provided', () => {
    render(<ErrorView />);
    expect(screen.queryByRole('button', { name: /reintentar/i })).not.toBeInTheDocument();
  });

  it('renders the retry button when reset is provided', () => {
    render(<ErrorView reset={vi.fn()} />);
    expect(screen.getByRole('button', { name: /reintentar/i })).toBeInTheDocument();
  });

  it('calls reset when the retry button is clicked', () => {
    const reset = vi.fn();
    render(<ErrorView reset={reset} />);
    fireEvent.click(screen.getByRole('button', { name: /reintentar/i }));
    expect(reset).toHaveBeenCalledOnce();
  });
});
