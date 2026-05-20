import React from 'react';

export interface TypographyProps {
  variant?: 'h1' | 'h2' | 'h3' | 'body' | 'caption';
  children: React.ReactNode;
  className?: string;
}

const TAG_MAP: Record<string, keyof React.JSX.IntrinsicElements> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  body: 'p',
  caption: 'span',
};

const CLASS_MAP: Record<string, string> = {
  h1: 'text-2xl font-bold text-[var(--color-neutral-900)]',
  h2: 'text-xl font-semibold text-[var(--color-neutral-900)]',
  h3: 'text-lg font-semibold text-[var(--color-neutral-900)]',
  body: 'text-base text-[var(--color-neutral-900)]',
  caption: 'text-sm text-gray-500',
};

function Typography({ variant = 'body', children, className = '' }: TypographyProps) {
  const Tag = TAG_MAP[variant];
  return <Tag className={`${CLASS_MAP[variant]} ${className}`.trim()}>{children}</Tag>;
}

export { Typography };
export default Typography;
