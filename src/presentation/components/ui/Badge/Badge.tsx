import React from 'react';

export interface BadgeProps {
  label: string;
  variant?: 'primary' | 'secondary' | 'neutral';
}

function Badge({ label, variant = 'neutral' }: BadgeProps) {
  const variants: Record<string, string> = {
    primary: 'bg-[var(--color-primary)] text-white',
    secondary: 'bg-[var(--color-secondary)] text-white',
    neutral: 'bg-[var(--color-neutral-100)] text-[var(--color-neutral-900)]',
  };

  return (
    <span
      className={`inline-block px-2 py-0.5 text-xs font-medium rounded-full ${variants[variant]}`}
    >
      {label}
    </span>
  );
}

export { Badge };
export default Badge;
