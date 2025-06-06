import { ButtonHTMLAttributes } from 'react';
import { cn } from '@/utils/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'small' | 'medium' | 'large';
  color?: 'primary' | 'accent' | 'secondary';
  children: React.ReactNode;
  onClick?: () => void;
}

export default function Button({
  size = 'medium',
  color = 'primary',
  children,
  className,
  onClick,
  ...props
}: ButtonProps) {
  const baseStyles = 'rounded-lg font-medium transition-colors';

  const sizeStyles = {
    small: 'px-3 py-2 text-sm min-w-[72px]',
    medium: 'px-5 py-2.5 min-w-[120px]',
    large: 'px-8 py-3 text-lg w-full',
  };
  const colorStyles = {
    primary:
      'bg-primary hover:bg-accent text-heading rounded-sm px-6 py-2.5 font-medium transition-colors',
    accent:
      'bg-accent hover:bg-primary text-background rounded-sm px-6 py-2.5 font-medium transition-colors',
    secondary:
      'border-border bg-background hover:bg-muted text-foreground rounded-sm border px-6 py-2.5 font-medium transition-colors',
  };

  return (
    <button
      className={cn(baseStyles, sizeStyles[size], colorStyles[color], className)}
      {...props}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
