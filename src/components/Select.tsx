import type { ReactNode, SelectHTMLAttributes } from 'react'
import { cn } from '../lib/utils'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string
  helperText?: string
  error?: string
  children: ReactNode
}

export function Select({ label, helperText, error, className, id, children, ...props }: SelectProps) {
  const controlId = id || props.name || label
  return (
    <label className="block space-y-2 text-sm font-medium text-slate-200" htmlFor={controlId}>
      <span>{label}</span>
      <select
        id={controlId}
        className={cn(
          'w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-base text-white placeholder:text-slate-500 focus:border-accent-soft focus:outline-none focus:ring-2 focus:ring-accent-soft/60',
          error && 'border-red-500/70 focus:ring-red-400/70 focus:border-red-400',
          className,
        )}
        aria-invalid={Boolean(error)}
        {...props}
      >
        {children}
      </select>
      {helperText && !error && <p className="text-xs text-slate-400">{helperText}</p>}
      {error && <p className="text-xs text-red-400">{error}</p>}
    </label>
  )
}
