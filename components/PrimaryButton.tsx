'use client';

import { ReactNode } from 'react';
import { Loader2 } from 'lucide-react';

interface PrimaryButtonProps {
  children: ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'default' | 'destructive';
  disabled?: boolean;
  loading?: boolean;
  className?: string;
}

export function PrimaryButton({
  children,
  onClick,
  type = 'button',
  variant = 'default',
  disabled = false,
  loading = false,
  className = '',
}: PrimaryButtonProps) {
  const baseClasses = 'px-md py-sm rounded-md font-medium transition-all duration-200 ease-out flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantClasses = {
    default: 'bg-primary text-white hover:opacity-90',
    destructive: 'bg-red-600 text-white hover:bg-red-700',
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={classes}
    >
      {loading && <Loader2 size={16} className="animate-spin" />}
      {children}
    </button>
  );
}
