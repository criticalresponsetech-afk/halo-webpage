import { type FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Badge } from '../components/Badge'
import { Button } from '../components/Button'
import { Card } from '../components/Card'
import { Input } from '../components/Input'
import { brandName, heroImageUrl } from '../lib/content'
import { usePageTitle } from '../lib/seo'
import { useToast } from '../components/Toast'
import type { CallbackLeadPayload } from '../types/leads'

const callbackInitial: CallbackLeadPayload = {
  fullName: '',
  company: '',
  phone: '',
  email: '',
  bestTime: 'This morning',
  contactPreference: 'Phone',
  notes: '',
}

function HomePage() {
  usePageTitle('Home')
  const navigate = useNavigate()
  const { pushToast } = useToast()
  const [form, setForm] = useState<CallbackLeadPayload>(callbackInitial)
  const [errors, setErrors] = useState<Partial<Record<keyof CallbackLeadPayload, string>>>({})
  const [loading, setLoading] = useState(false)

  const validate = () => {
    const nextErrors: Partial<Record<keyof CallbackLeadPayload, string>> = {}
    if (!form.fullName.trim()) nextErrors.fullName = 'Full name is required.'
    if (!form.company.trim()) nextErrors.company = 'Company is required.'
    if (!form.phone.trim()) nextErrors.phone = 'Phone is required.'
    if (!form.email.trim()) nextErrors.email = 'Email is required.'
    if (form.email && !/^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/.test(form.email)) {
      nextErrors.email = 'Enter a valid email.'
    }
    return nextErrors
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const nextErrors = validate()
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    try {
      setLoading(true)

      const message = [
        'Callback Request',
        '',
        `Name: ${form.fullName}`,
        `Company: ${form.company}`,
        `Phone: ${form.phone}`,
        `Email: ${form.email}`,
        '',
        `Preferred Contact: ${form.contactPreference}`,
        `Best Time: ${form.bestTime}`,
        '',
        'Notes:',
        form.notes?.trim() || 'None',
      ].join('\n')

      const response = await fetch('/api/contact', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.fullName,
          email: form.email,
          message,
        }),
      })

      if (!response.ok) {
        let errorMessage = `Request failed with status ${response.status}`
        try {
          const data = await response.json()
          if (typeof data?.error === 'string' && data.error.trim()) {
            errorMessage = data.error
          }
        } catch {
          // Ignore JSON parse failures and use the status-based fallback.
        }
        throw new Error(errorMessage)
      }

      pushToast({
        title: 'Request sent',
        description: 'We will contact you shortly.',
        type: 'success',
      })

      setForm(callbackInitial)
      setErrors({})
    } catch (error) {
      pushToast({
        title: 'We could not send your request',
        description: error instanceof Error ? error.message : 'Please try again.',
        type: 'error',
      })
    } finally {
      setLoading(false)
    }
  }

  const scrollToForm = () => {
    const el = document.getElementById('callback-form')
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      <div
        className="relative isolate overflow-hidden bg-base bg-cover bg-center"
        style={{ backgroundImage: `url('${heroImageUrl}')` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#070a12]/95 via-[#070a12]/85 to-[#070a12]/90" />
        <div className="relative mx-auto grid max-w-6xl grid-cols-1 gap-10 px-4 py-16 sm:px-6 md:px-8 lg:grid-cols-2 lg:py-24">
          <div className="space-y-6">
            <Badge variant="outline">Professional. Experienced. Present.</Badge>
            <h1 className="text-4xl font-semibold leading-tight text-white sm:text-5xl">
              Book a call with {brandName}
            </h1>
            <p className="text-lg text-slate-200 sm:text-xl">
              We deliver disciplined security coverage backed by supervisors who stay involved.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Button size="lg" onClick={scrollToForm}>
                Book the call
              </Button>
              <Button variant="ghost" size="lg" onClick={() => navigate('/services')}>
                View core services
              </Button>
            </div>
          </div>

          <Card id="callback-form" className="border-white/10 bg-white/5 p-6 shadow-xl sm:p-8">
            <form className="mt-6 space-y-4" onSubmit={handleSubmit} noValidate>
              <Input label="Full name" value={form.fullName} onChange={(e) => setForm(p => ({ ...p, fullName: e.target.value }))} error={errors.fullName} />
              <Input label="Company" value={form.company} onChange={(e) => setForm(p => ({ ...p, company: e.target.value }))} error={errors.company} />
              <Input label="Phone" value={form.phone} onChange={(e) => setForm(p => ({ ...p, phone: e.target.value }))} error={errors.phone} />
              <Input label="Email" value={form.email} onChange={(e) => setForm(p => ({ ...p, email: e.target.value }))} error={errors.email} />
              <Input label="Notes" value={form.notes || ''} onChange={(e) => setForm(p => ({ ...p, notes: e.target.value }))} />

              <Button type="submit" loading={loading}>
                Request call
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </>
  )
}

export default HomePage
