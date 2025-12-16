import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import { cn } from '../lib/utils'

interface CardProps extends ComponentPropsWithoutRef<'div'> {
  children: ReactNode
}

export function Card({ children, className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-xl border border-white/10 bg-white/5 backdrop-blur-md shadow-card',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
