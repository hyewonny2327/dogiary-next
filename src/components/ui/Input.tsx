import { InputHTMLAttributes } from 'react';
import { cn } from '@/utils/utils';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  borderColor?: 'default' | 'primary' | 'accent' | 'error';
  error?: string;
}

export default function Input({ borderColor = 'default', error, className, ...props }: InputProps) {
  const baseStyles = 'w-full rounded-lg px-4 py-2.5 text-foreground transparent transition-colors';

  const borderStyles = {
    default: 'border border-border focus:border-accent focus:outline-none',
    primary: 'border border-primary focus:border-accent focus:outline-none',
    accent: 'border border-accent focus:border-primary focus:outline-none',
    error: 'border border-red-500 focus:border-red-600 focus:outline-none',
  };

  return (
    <div className="space-y-1">
      <input
        className={cn(baseStyles, borderStyles[error ? 'error' : borderColor], className)}
        {...props}
      />
      {error && <p className="px-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}
