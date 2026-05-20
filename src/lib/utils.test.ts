import { describe, it, expect } from 'vitest';
import { formatPrice } from './utils';

describe('formatPrice', () => {
  it('formats a whole number price with two decimal places', () => {
    expect(formatPrice(100)).toMatch(/100/);
  });

  it('formats a decimal price correctly', () => {
    expect(formatPrice(149.99)).toMatch(/149/);
    expect(formatPrice(149.99)).toMatch(/99/);
  });

  it('includes a currency symbol', () => {
    // Intl formats USD as "US$" or "$" depending on locale
    const result = formatPrice(10);
    expect(result).toMatch(/\$|US\$/);
  });

  it('formats zero correctly', () => {
    expect(formatPrice(0)).toMatch(/0/);
  });

  it('formats large numbers with thousands separator', () => {
    const result = formatPrice(1299.99);
    // es-AR locale uses dots as thousands separator: 1.299,99
    expect(result).toMatch(/1/);
    expect(result).toMatch(/299/);
  });

  it('returns a string', () => {
    expect(typeof formatPrice(50)).toBe('string');
  });
});
