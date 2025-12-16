import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '../lib/utils'

type ButtonVariant = 'primary' | 'ghost' | 'outline'
type ButtonSize = 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
  icon?: ReactNode
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-accent-soft text-slate-950 hover:bg-accent transition-colors disabled:bg-accent-soft/50 disabled:text-slate-900',
  ghost:
    'bg-white/5 text-slate-100 border border-white/10 hover:border-accent-soft hover:text-white',
  outline:
    'border border-accent-soft text-accent-soft hover:bg-accent-soft hover:text-slate-950 transition-colors',
}

const sizeStyles: Record<ButtonSize, string> = {
  md: 'px-4 py-2 text-sm',
  lg: 'px-5 py-3 text-base',
}

export function Button({
  children,
  className,
  variant = 'primary',
  size = 'md',
  loading,
  icon,
  disabled,
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-lg font-semibold tracking-tight shadow-card focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-soft focus-visible:ring-offset-2 focus-visible:ring-offset-base-muted transition-all',
        variantStyles[variant],
        sizeStyles[size],
        loading && 'opacity-80 cursor-not-allowed',
        className,
      )}
      disabled={disabled || loading}
      type={type}
      {...props}
    >
      {loading && (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
      )}
      {icon}
      {children}
    </button>
  )
}
