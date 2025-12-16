import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Badge } from '../components/Badge'
import { Button } from '../components/Button'
import { Card } from '../components/Card'
import { Input } from '../components/Input'
import { Section } from '../components/Section'
import { Select } from '../components/Select'
import { industries, services, trustSignals } from '../lib/content'
import { submitLead } from '../lib/leads'
import { usePageTitle } from '../lib/seo'
import { useToast } from '../components/Toast'
import type { CallbackLeadPayload } from '../types/leads'

const highlights = [
  'Professional, uniformed presence with armed-capable officers',
  'Clear reporting and communication with site leadership',
  'Long-term coverage with disciplined supervision',
]

const callAgenda = [
  { title: 'Your sites & risks', detail: 'Share property types, visitor volume, and any recent incidents.' },
  { title: 'Coverage fit', detail: 'We match post orders, patrol cadence, and escalation paths to your environment.' },
  { title: 'Next steps', detail: 'You get a concise deployment plan and callback confirmation within hours.' },
]

const engagementSteps = [
  { label: '1. Listen', copy: 'A security lead speaks with you to align on risks, timelines, and stakeholders.' },
  { label: '2. Plan', copy: 'We outline coverage options, supervision, and communications before deploying.' },
  { label: '3. Stand up', copy: 'Trained, insured officers arrive with clear post orders and escalation support.' },
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
    if (!form.bestTime.trim()) nextErrors.bestTime = 'Select a time.'
    if (!form.contactPreference) nextErrors.contactPreference = 'Choose phone or email.'
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
        className="relative isolate overflow-hidden border-b border-white/5 bg-base bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1436450412740-6b988f486c6b?auto=format&fit=crop&w=1600&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#070a12]/95 via-[#070a12]/85 to-[#070a12]/90" />
        <div className="relative mx-auto grid max-w-6xl grid-cols-1 gap-10 px-4 py-16 sm:px-6 md:px-8 lg:grid-cols-2 lg:py-24">
          <div className="space-y-6">
            <Badge variant="outline">Professional. Experienced. Present.</Badge>
            <h1 className="text-4xl font-semibold leading-tight text-white sm:text-5xl">
              Book a call with HALO Security leadership
            </h1>
            <p className="text-lg text-slate-200 sm:text-xl">
              We deliver disciplined security coverage backed by supervisors who stay involved. Tell us your sites and
              priorities—our team will call you fast and map the right protection.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Button size="lg" onClick={scrollToForm}>
                Book the call
              </Button>
              <Button variant="ghost" size="lg" onClick={() => navigate('/services')}>
                View core services
              </Button>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {highlights.map((item) => (
                <div key={item} className="flex items-start gap-3 text-sm text-slate-100">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent-soft" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
          <Card
            id="callback-form"
            className="border-white/10 bg-white/5 p-6 shadow-xl sm:p-8"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Callback form</p>
                <p className="text-lg font-semibold text-white">Speak with a security lead</p>
              </div>
              <Badge variant="outline">Response in hours</Badge>
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
              <div className="grid gap-4 sm:grid-cols-2">
                <Select
                  label="Best time to reach you"
                  name="bestTime"
                  value={form.bestTime}
                  onChange={(e) => setForm((prev) => ({ ...prev, bestTime: e.target.value }))}
                  required
                  error={errors.bestTime}
                >
                  <option value="This morning">This morning</option>
                  <option value="This afternoon">This afternoon</option>
                  <option value="This evening">This evening</option>
                  <option value="Tomorrow">Tomorrow</option>
                </Select>
                <Select
                  label="Preferred contact"
                  name="contactPreference"
                  value={form.contactPreference}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      contactPreference: e.target.value as CallbackLeadPayload['contactPreference'],
                    }))
                  }
                  required
                  error={errors.contactPreference}
                >
                  <option value="Phone">Phone</option>
                  <option value="Email">Email</option>
                </Select>
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
        description="We combine composed presence with armed capability and tight supervision to keep environments stable."
        className="bg-[#0d1b35] border-t border-white/5"
      >
        <div className="grid gap-6 md:grid-cols-3">
          {services.map((service) => (
            <Card key={service.name} className="flex h-full flex-col justify-between border-white/10 bg-white/5 p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-white">{service.name}</h3>
                  <Badge variant="outline">Core</Badge>
                </div>
                <p className="text-sm text-slate-300">{service.summary}</p>
                <ul className="space-y-2 text-sm text-slate-200">
                  {service.features.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent-soft" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-6 flex items-center justify-between">
                <p className="text-xs uppercase tracking-wide text-slate-400">Licensed & insured</p>
                <Button variant="ghost" size="md" onClick={scrollToForm}>
                  Book a call
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Call agenda"
        title="We make the first call count"
        description="Expect a concise, professional conversation that respects your time and moves quickly toward deployment."
        className="bg-[#081021] border-t border-white/5"
      >
        <div className="grid gap-6 md:grid-cols-3">
          {callAgenda.map((item) => (
            <Card key={item.title} className="border-white/5 bg-white/5 p-6">
              <p className="text-xs uppercase tracking-wide text-slate-500">Agenda</p>
              <h3 className="mt-2 text-lg font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-sm text-slate-300">{item.detail}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Industries"
        title="Experienced across residential, commercial, and industrial sites"
        description="We integrate with property managers, facilities teams, and contractors to keep operations steady."
        className="bg-[#0b1327] border-t border-white/5"
      >
        <div className="grid gap-6 md:grid-cols-2">
          {industries.map((industry) => (
            <Card key={industry.name} className="border-white/5 bg-white/5 p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">{industry.name}</h3>
                <Badge variant="outline">Trusted</Badge>
              </div>
              <p className="mt-3 text-sm text-slate-300">{industry.detail}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="How we engage"
        title="Professionalism and presence, backed by leadership oversight"
        description="Every deployment keeps supervisors involved and communication tight."
        className="bg-[#060b18] border-t border-white/5 pb-20"
      >
        <div className="grid gap-4 md:grid-cols-3">
          {engagementSteps.map((step) => (
            <Card key={step.label} className="border-white/5 bg-white/5 p-5">
              <p className="text-xs uppercase tracking-wide text-slate-500">{step.label}</p>
              <h4 className="mt-2 text-lg font-semibold text-white">{step.copy}</h4>
            </Card>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {trustSignals.map((signal) => (
            <Badge key={signal}>{signal}</Badge>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button size="lg" onClick={scrollToForm}>
            Book a call
          </Button>
          <Button variant="ghost" size="lg" onClick={() => navigate('/contact')}>
            Contact dispatch
          </Button>
        </div>
      </Section>
    </>
  )
}

export default HomePage
