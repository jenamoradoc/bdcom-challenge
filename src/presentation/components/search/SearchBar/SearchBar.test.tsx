import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { SearchBar } from './SearchBar';

const mockPush = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe('SearchBar', () => {
  it('renders the search input', () => {
    render(<SearchBar />);
    expect(screen.getByRole('searchbox')).toBeInTheDocument();
  });

  it('renders with the initial value', () => {
    render(<SearchBar initialValue="laptop" />);
    expect(screen.getByRole('searchbox')).toHaveValue('laptop');
  });

  it('navigates to /search?s= on Enter key press', () => {
    render(<SearchBar />);
    const input = screen.getByRole('searchbox');
    fireEvent.change(input, { target: { value: 'headphones' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(mockPush).toHaveBeenCalledWith('/search?s=headphones');
  });

  it('navigates to /search?s= on search button click', () => {
    render(<SearchBar />);
    const input = screen.getByRole('searchbox');
    fireEvent.change(input, { target: { value: 'keyboard' } });
    fireEvent.click(screen.getByRole('button', { name: /buscar/i }));

    expect(mockPush).toHaveBeenCalledWith('/search?s=keyboard');
  });

  it('does not navigate when search value is empty or whitespace', () => {
    mockPush.mockClear();
    render(<SearchBar />);
    fireEvent.keyDown(screen.getByRole('searchbox'), { key: 'Enter' });

    expect(mockPush).not.toHaveBeenCalled();
  });

  it('does not navigate when the input is cleared', () => {
    mockPush.mockClear();
    render(<SearchBar initialValue="laptop" />);
    const input = screen.getByRole('searchbox');
    fireEvent.change(input, { target: { value: '' } });

    expect(mockPush).not.toHaveBeenCalled();
  });
});
