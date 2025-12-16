import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { cn } from '../lib/utils'

type ToastType = 'success' | 'error' | 'info'

interface ToastItem {
  id: number
  title: string
  description?: string
  type?: ToastType
}

interface ToastContextValue {
  pushToast: (toast: Omit<ToastItem, 'id'>) => void
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined)

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([])

  const removeToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  const pushToast = useCallback(
    (toast: Omit<ToastItem, 'id'>) => {
      const id = Number(new Date()) + Math.floor(Math.random() * 1000)
      setToasts((prev) => [...prev, { id, ...toast }])
      setTimeout(() => removeToast(id), 4200)
    },
    [removeToast],
  )

  const value = useMemo(() => ({ pushToast }), [pushToast])

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 flex w-full max-w-sm flex-col gap-3">
        {toasts.map((toast) => (
          <ToastCard key={toast.id} toast={toast} onDismiss={() => removeToast(toast.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  )
}

function ToastCard({ toast, onDismiss }: { toast: ToastItem; onDismiss: () => void }) {
  const tone = toast.type || 'info'
  const toneStyles: Record<ToastType, string> = {
    success: 'border-emerald-400/70 bg-emerald-500/10 text-emerald-50',
    error: 'border-red-400/70 bg-red-500/10 text-red-50',
    info: 'border-accent-soft/70 bg-accent-soft/10 text-sky-50',
  }

  return (
    <div
      className={cn(
        'flex items-start gap-3 rounded-xl border p-4 shadow-card backdrop-blur-md',
        toneStyles[tone],
      )}
      role="status"
    >
      <div className="flex-1 space-y-1">
        <p className="text-sm font-semibold">{toast.title}</p>
        {toast.description && <p className="text-xs text-white/70">{toast.description}</p>}
      </div>
      <button
        type="button"
        onClick={onDismiss}
        aria-label="Dismiss notification"
        className="text-xs text-white/60 hover:text-white"
      >
        ×
      </button>
    </div>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return ctx
}
