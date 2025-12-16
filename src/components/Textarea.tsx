import type { TextareaHTMLAttributes } from 'react'
import { cn } from '../lib/utils'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  helperText?: string
  error?: string
}

export function Textarea({ label, helperText, error, className, id, ...props }: TextareaProps) {
  const controlId = id || props.name || label
  return (
    <label className="block space-y-2 text-sm font-medium text-slate-200" htmlFor={controlId}>
      <span>{label}</span>
      <textarea
        id={controlId}
        className={cn(
          'min-h-[140px] w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-base text-white placeholder:text-slate-500 focus:border-accent-soft focus:outline-none focus:ring-2 focus:ring-accent-soft/60',
          error && 'border-red-500/70 focus:ring-red-400/70 focus:border-red-400',
          className,
        )}
        aria-invalid={Boolean(error)}
        {...props}
      />
      {helperText && !error && <p className="text-xs text-slate-400">{helperText}</p>}
      {error && <p className="text-xs text-red-400">{error}</p>}
    </label>
  )
}
