import type { ReactNode } from 'react'
import { cn } from '../lib/utils'

interface BadgeProps {
  children: ReactNode
  className?: string
  variant?: 'default' | 'outline'
}

export function Badge({ children, className, variant = 'default' }: BadgeProps) {
  const styles =
    variant === 'default'
      ? 'bg-white/10 text-white border border-white/10'
      : 'border border-accent-soft text-accent-soft'

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide',
        styles,
        className,
      )}
    >
      {children}
    </span>
  )
}
