import { HTMLAttributes } from 'react';
import { cn } from '@/utils/utils';

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export default function Container({ children, className, ...props }: ContainerProps) {
  return (
    <div
      className={cn('flex flex-col', 'border-border rounded-lg border p-8', className)}
      {...props}
    >
      {children}
    </div>
  );
}
