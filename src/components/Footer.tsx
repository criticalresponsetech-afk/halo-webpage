import { brandName, contactDetails, trustSignals } from '../lib/content'
import { Badge } from './Badge'

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-base-muted/80 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-8 sm:py-14">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-lg font-semibold text-white">
              <span className="h-2 w-2 rounded-full bg-accent-soft shadow-[0_0_18px_rgba(34,211,238,0.8)]" />
              {brandName}
            </div>
            <p className="text-sm text-slate-400">
              WA State licensed and insured professional security services delivering reliable, professional, and
              experienced protection.
            </p>
            <div className="flex flex-wrap gap-2">
              {trustSignals.slice(0, 3).map((signal) => (
                <Badge key={signal} variant="outline">
                  {signal}
                </Badge>
              ))}
            </div>
          </div>
          <div className="space-y-4 lg:justify-self-end lg:text-right">
            <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-300">Contact</h4>
            <div className="space-y-2 text-sm text-slate-300">
              <p>Email: {contactDetails.email}</p>
              <p>Hours: {contactDetails.hours}</p>
            </div>
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-4 border-t border-white/5 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {brandName}. All rights reserved.</p>
          <p className="text-slate-500">
            Website built by{' '}
            <a
              href="https://gd-mocha-xi.vercel.app/"
              target="_blank"
              rel="noreferrer"
              className="text-slate-400 transition hover:text-white"
            >
              Golden Design
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
