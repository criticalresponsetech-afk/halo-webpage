import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { navLinks } from '../lib/content'
import { cn } from '../lib/utils'
import { Button } from './Button'

export function Header() {
  const location = useLocation()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  const isActive = (href: string) => {
    if (href === '/') return location.pathname === '/'
    return location.pathname.startsWith(href)
  }

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-white/5 bg-base-muted/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-8">
        <Link to="/" className="flex items-center gap-2 text-lg font-semibold tracking-tight text-white">
          <span className="h-2 w-2 rounded-full bg-accent-soft shadow-[0_0_18px_rgba(34,211,238,0.8)]" />
          HALO Security
        </Link>
        <nav className="hidden items-center gap-8 text-sm font-semibold text-slate-200 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={cn(
                'transition hover:text-white',
                isActive(link.href) ? 'text-accent-soft' : 'text-slate-300',
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="hidden lg:block">
          <Button size="md" className="shadow-lg" onClick={() => navigate('/call')}>
            Book a Call
          </Button>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm font-semibold text-white lg:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="h-0.5 w-5 bg-white" />
          <span className="h-0.5 w-4 bg-white" />
        </button>
      </div>
      {open && (
        <div className="border-t border-white/5 bg-base-muted/95 lg:hidden">
          <div className="mx-auto max-w-6xl px-4 py-4 sm:px-8">
            <nav className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={cn(
                    'rounded-lg px-3 py-2 text-sm font-semibold transition',
                    isActive(link.href) ? 'bg-white/10 text-accent-soft' : 'text-slate-200 hover:bg-white/5',
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="mt-4">
              <Button className="w-full" onClick={() => navigate('/call')}>
                Book a Call
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
