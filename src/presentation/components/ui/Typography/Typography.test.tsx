import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Typography } from './Typography';

describe('Typography', () => {
  it('renders children text', () => {
    render(<Typography>Hello</Typography>);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  it('renders as a paragraph by default', () => {
    render(<Typography>Body text</Typography>);
    expect(screen.getByText('Body text').tagName).toBe('P');
  });

  it('renders as h1 when variant is h1', () => {
    render(<Typography variant="h1">Title</Typography>);
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });

  it('renders as h2 when variant is h2', () => {
    render(<Typography variant="h2">Section</Typography>);
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
  });

  it('renders as h3 when variant is h3', () => {
    render(<Typography variant="h3">Subsection</Typography>);
    expect(screen.getByRole('heading', { level: 3 })).toBeInTheDocument();
  });

  it('renders as span when variant is caption', () => {
    render(<Typography variant="caption">Small text</Typography>);
    expect(screen.getByText('Small text').tagName).toBe('SPAN');
  });

  it('merges additional className', () => {
    render(<Typography className="mb-4">Text</Typography>);
    expect(screen.getByText('Text').className).toContain('mb-4');
  });
});
