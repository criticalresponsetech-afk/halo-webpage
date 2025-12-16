import { Link } from 'react-router-dom'
import { contactDetails, quickLinks, trustSignals } from '../lib/content'
import { Badge } from './Badge'

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-base-muted/80 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-8 sm:py-14">
        <div className="grid gap-10 lg:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-lg font-semibold text-white">
              <span className="h-2 w-2 rounded-full bg-accent-soft shadow-[0_0_18px_rgba(34,211,238,0.8)]" />
              HALO Security
            </div>
            <p className="text-sm text-slate-400">
              Licensed, insured, and armed-capable security partners delivering disciplined protection with
              rapid response focus.
            </p>
            <div className="flex flex-wrap gap-2">
              {trustSignals.slice(0, 3).map((signal) => (
                <Badge key={signal} variant="outline">
                  {signal}
                </Badge>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-300">Contact</h4>
            <div className="space-y-2 text-sm text-slate-300">
              <p>Phone: {contactDetails.phone}</p>
              <p>Email: {contactDetails.email}</p>
              <p>Hours: {contactDetails.hours}</p>
              <p>Service Areas: {contactDetails.serviceAreas.join(', ')}</p>
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-300">Quick Links</h4>
            <nav className="flex flex-col gap-2 text-sm text-slate-300">
              {quickLinks.map((link) => (
                <Link key={link.href} to={link.href} className="hover:text-white">
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-300">Assurance</h4>
            <div className="space-y-2 text-sm text-slate-300">
              <p>Address: {contactDetails.address}</p>
              <p>Licensed & insured with armed certification.</p>
              <p>Dispatch and leadership on-call 24/7/365.</p>
            </div>
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-4 border-t border-white/5 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} HALO Security. All rights reserved.</p>
          <p className="text-slate-500">Built for mission-critical safety and response.</p>
        </div>
      </div>
    </footer>
  )
}
