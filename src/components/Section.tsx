import type { ReactNode } from 'react'
import { cn } from '../lib/utils'
import { Badge } from './Badge'

interface SectionProps {
  title?: string
  eyebrow?: string
  description?: string
  children: ReactNode
  className?: string
  align?: 'left' | 'center'
}

export function Section({
  title,
  eyebrow,
  description,
  children,
  className,
  align = 'left',
}: SectionProps) {
  const isCenter = align === 'center'
  return (
    <section className={cn('py-16 sm:py-20', className)}>
      <div className="mx-auto max-w-6xl px-4 sm:px-8">
        {(eyebrow || title || description) && (
          <div
            className={cn(
              'mb-10 flex flex-col gap-4',
              isCenter ? 'items-center text-center' : 'items-start text-left',
            )}
          >
            {eyebrow && <Badge variant="outline">{eyebrow}</Badge>}
            {title && (
              <h2 className="text-3xl font-semibold text-white sm:text-4xl tracking-tight">
                {title}
              </h2>
            )}
            {description && (
              <p className="max-w-3xl text-slate-300 text-base sm:text-lg leading-relaxed">
                {description}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  )
}
