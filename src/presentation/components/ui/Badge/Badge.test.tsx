import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Badge } from './Badge';

describe('Badge', () => {
  it('renders the label text', () => {
    render(<Badge label="Electronics" />);
    expect(screen.getByText('Electronics')).toBeInTheDocument();
  });

  it('applies neutral variant styles by default', () => {
    render(<Badge label="neutral" />);
    const badge = screen.getByText('neutral');
    expect(badge.className).toContain('bg-[var(--color-neutral-100)]');
  });

  it('applies primary variant styles', () => {
    render(<Badge label="primary" variant="primary" />);
    const badge = screen.getByText('primary');
    expect(badge.className).toContain('bg-[var(--color-primary)]');
  });

  it('applies secondary variant styles', () => {
    render(<Badge label="-15%" variant="secondary" />);
    const badge = screen.getByText('-15%');
    expect(badge.className).toContain('bg-[var(--color-secondary)]');
  });
});
