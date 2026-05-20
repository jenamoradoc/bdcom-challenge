import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Container } from './Container';

describe('Container', () => {
  it('renders children', () => {
    render(<Container><p>Hello world</p></Container>);
    expect(screen.getByText('Hello world')).toBeInTheDocument();
  });

  it('applies the max-width centering classes', () => {
    const { container } = render(<Container>content</Container>);
    const div = container.firstChild as HTMLElement;
    expect(div.className).toContain('max-w-7xl');
    expect(div.className).toContain('mx-auto');
  });

  it('merges additional className prop', () => {
    const { container } = render(<Container className="py-8">content</Container>);
    const div = container.firstChild as HTMLElement;
    expect(div.className).toContain('py-8');
  });
});
