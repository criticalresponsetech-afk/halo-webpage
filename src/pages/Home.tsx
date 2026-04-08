import { type FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Badge } from '../components/Badge'
import { Button } from '../components/Button'
import { Card } from '../components/Card'
import { Input } from '../components/Input'
import { Section } from '../components/Section'
import { brandName, heroImageUrl } from '../lib/content'
import { submitLead } from '../lib/leads'
import { usePageTitle } from '../lib/seo'
import { useToast } from '../components/Toast'
import type { CallbackLeadPayload } from '../types/leads'

const homeServices = [
  {
    name: 'Private Security',
    summary: 'Professional on-site coverage built around presence, communication, and dependable day-to-day support.',
  },
  {
    name: 'Armed Security',
    summary: 'Higher-security coverage for locations that need stronger deterrence, readiness, and accountability.',
  },
  {
    name: 'Mobile Patrols',
    summary: 'Flexible patrol coverage for properties that need routine visibility, regular checks, and after-hours support.',
  },
  {
    name: 'Healthcare Security',
    summary: 'Professional support for public-facing environments that depend on calm presence and steady coordination.',
  },
  {
    name: 'Courthouse Security',
    summary: 'Professional coverage for regulated public-facing facilities where consistency and accountability matter.',
  },
  {
    name: 'Patrol Operations',
    summary: 'Structured patrol support for properties that need dependable visibility, follow-through, and routine oversight.',
  },
]

const homeIndustries = [
  {
    name: 'Residential',
    detail: 'Coverage that supports residents, visitors, and property teams with a professional on-site presence.',
  },
  {
    name: 'Commercial',
    detail: 'Flexible security support for offices, retail spaces, and mixed-use properties with changing daily activity.',
  },
  {
    name: 'Construction',
    detail: 'Reliable site coverage focused on visibility, access control, and support for active operations.',
  },
  {
    name: 'Industrial',
    detail: 'Consistent protection for facilities that need perimeter awareness, access oversight, and accountable reporting.',
  },
]

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
      await submitLead('callback', form)
      pushToast({
        title: 'Call booked',
        description: 'We will confirm your callback shortly.',
        type: 'success',
      })
      setForm(callbackInitial)
      setErrors({})
    } catch (error) {
      pushToast({
        title: 'We could not schedule your call',
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
        style={{
          backgroundImage: `url('${heroImageUrl}')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#070a12]/95 via-[#070a12]/85 to-[#070a12]/90" />
        <div className="relative mx-auto grid max-w-6xl grid-cols-1 gap-10 px-4 py-16 sm:px-6 md:px-8 lg:grid-cols-2 lg:py-24">
          <div className="space-y-6">
            <Badge variant="outline">Professional. Experienced. Present.</Badge>
            <h1 className="text-4xl font-semibold leading-tight text-white sm:text-5xl">
              Book a call with {brandName}
            </h1>
            <p className="text-lg text-slate-200 sm:text-xl">
              We deliver disciplined security coverage backed by supervisors who stay involved. Tell us your sites and
              priorities, and our team will call you quickly to map the right protection.
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
          <Card
            id="callback-form"
            className="border-white/10 bg-white/5 p-6 shadow-xl sm:p-8"
          >
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Callback form</p>
              <p className="text-lg font-semibold text-white">Speak with a security lead</p>
            </div>
            <form className="mt-6 space-y-4" onSubmit={handleSubmit} noValidate>
              <Input
                label="Full name"
                name="fullName"
                value={form.fullName}
                onChange={(e) => setForm((prev) => ({ ...prev, fullName: e.target.value }))}
                required
                error={errors.fullName}
              />
              <Input
                label="Company"
                name="company"
                value={form.company}
                onChange={(e) => setForm((prev) => ({ ...prev, company: e.target.value }))}
                required
                error={errors.company}
              />
              <div className="grid gap-4 sm:grid-cols-2">
                <Input
                  label="Phone"
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm((prev) => ({ ...prev, phone: e.target.value }))}
                  required
                  error={errors.phone}
                />
                <Input
                  label="Email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
                  required
                  error={errors.email}
                />
              </div>
              <Input
                label="Notes (optional)"
                name="notes"
                placeholder="Site type, timelines, or priorities"
                value={form.notes || ''}
                onChange={(e) => setForm((prev) => ({ ...prev, notes: e.target.value }))}
              />
              <div className="flex items-center justify-between">
                <p className="text-xs text-slate-400">We do not share your details.</p>
                <Button type="submit" loading={loading} size="lg">
                  Request call
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </div>

      <Section
        eyebrow="Services"
        title="Coverage tailored to your sites and stakeholders"
        description="A general overview of the ways we support clients with dependable coverage, visible presence, and professional coordination."
        className="bg-[#0d1b35]"
      >
        <div className="grid gap-6 md:grid-cols-3">
          {homeServices.map((service) => (
            <Card key={service.name} className="flex h-full flex-col justify-between border-white/10 bg-white/5 p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-white">{service.name}</h3>
                  <Badge variant="outline">Core</Badge>
                </div>
                <p className="text-sm text-slate-300">{service.summary}</p>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Industries"
        title="Adaptable across a range of sites and operating environments"
        description="We tailor coverage to how your property functions, who uses it, and the level of visibility or control you need."
        className="bg-[#0b1327] border-t border-white/5"
      >
        <div className="grid gap-6 md:grid-cols-2">
          {homeIndustries.map((industry) => (
            <Card key={industry.name} className="border-white/5 bg-white/5 p-6">
              <h3 className="text-lg font-semibold text-white">{industry.name}</h3>
              <p className="mt-3 text-sm text-slate-300">{industry.detail}</p>
            </Card>
          ))}
        </div>
      </Section>
    </>
  )
}

export default HomePage
