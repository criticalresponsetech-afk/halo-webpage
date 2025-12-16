import type { ReactNode } from 'react'
import { cn } from '../lib/utils'
import { Button } from './Button'

interface ModalProps {
  open: boolean
  title?: string
  description?: string
  children: ReactNode
  onClose: () => void
  className?: string
}

export function Modal({ open, title, description, children, onClose, className }: ModalProps) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">
      <div
        className={cn(
          'w-full max-w-xl rounded-2xl border border-white/10 bg-base-muted/90 p-6 shadow-card',
          className,
        )}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2">
            {title && <h3 className="text-xl font-semibold text-white">{title}</h3>}
            {description && <p className="text-sm text-slate-300">{description}</p>}
          </div>
          <button
            type="button"
            aria-label="Close modal"
            onClick={onClose}
            className="text-slate-400 transition hover:text-white"
          >
            ×
          </button>
        </div>
        <div className="mt-4 text-slate-200">{children}</div>
        <div className="mt-6 flex justify-end">
          <Button variant="ghost" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  )
}
