import { useState, useRef, useEffect } from 'react';
import { cn } from '@/utils/utils';
import { IoChevronDownOutline } from 'react-icons/io5';

interface DropdownProps {
  value?: string;
  options: {
    label: string;
    value: string;
  }[];
  placeholder?: string;
  onChange?: (value: string) => void;
  borderColor?: 'default' | 'primary' | 'accent' | 'error';
  error?: string;
  className?: string;
  disabled?: boolean;
}

export default function Dropdown({
  value,
  options,
  placeholder = '선택해주세요',
  onChange,
  borderColor = 'default',
  error,
  className,
  disabled = false,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find((option) => option.value === value);

  const baseStyles = 'w-full rounded-lg px-4 py-2.5 text-foreground  transition-colors';

  const borderStyles = {
    default: 'border border-border focus:border-accent',
    primary: 'border border-primary focus:border-accent',
    accent: 'border border-accent focus:border-primary',
    error: 'border border-red-500 focus:border-red-600',
  };

  return (
    <div className="relative space-y-1" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={cn(
          baseStyles,
          borderStyles[error ? 'error' : borderColor],
          'flex items-center justify-between',
          disabled && 'cursor-not-allowed opacity-50',
          className
        )}
        disabled={disabled}
      >
        <span className={cn('block truncate', !selectedOption && 'text-foreground/60')}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <IoChevronDownOutline
          className={cn(
            'text-foreground/60 h-5 w-5',
            isOpen && 'rotate-180 transform',
            'transition-transform duration-200'
          )}
        />
      </button>

      {/* 드롭다운 메뉴 */}
      {isOpen && (
        <div
          className={cn(
            'absolute z-10 mt-1 w-full rounded-lg',
            'border-border bg-background border py-1',
            'shadow-lg',
            'animate-in fade-in-0 zoom-in-95'
          )}
        >
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                onChange?.(option.value);
                setIsOpen(false);
              }}
              className={cn(
                'w-full px-4 py-2 text-left',
                'hover:bg-muted transition-colors',
                value === option.value && 'bg-primary/10 font-medium',
                'focus:bg-muted focus:outline-none'
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}

      {/* 에러 메시지 */}
      {error && <p className="px-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}
