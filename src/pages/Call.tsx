import { FormEvent, useState } from 'react'
import { Badge } from '../components/Badge'
import { Button } from '../components/Button'
import { Card } from '../components/Card'
import { Input } from '../components/Input'
import { Section } from '../components/Section'
import { Select } from '../components/Select'
import { contactDetails, trustSignals } from '../lib/content'
import { submitLead } from '../lib/leads'
import { usePageTitle } from '../lib/seo'
import { useToast } from '../components/Toast'
import type { CallbackLeadPayload } from '../types/leads'

const initialState: CallbackLeadPayload = {
  fullName: '',
  company: '',
  phone: '',
  email: '',
  bestTime: 'This morning',
  contactPreference: 'Phone',
  notes: '',
}

function CallPage() {
  usePageTitle('Book a Call')
  const { pushToast } = useToast()
  const [form, setForm] = useState<CallbackLeadPayload>(initialState)
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
        title: 'Call request received',
        description: 'We will confirm your callback shortly.',
        type: 'success',
      })
      setForm(initialState)
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

  return (
    <Section
      eyebrow="Book a Call"
      title="Speak with a security lead"
      description="A short conversation to understand your sites, risks, and expectations. We move fast after the call."
      className="pt-10"
    >
      <div className="grid gap-8 lg:grid-cols-3">
        <Card className="lg:col-span-2 border-white/10 bg-white/5 p-6 sm:p-8">
          <form className="space-y-6" onSubmit={handleSubmit} noValidate>
            <div className="grid gap-4 sm:grid-cols-2">
              <Input
                label="Full Name"
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
            </div>
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
                  setForm((prev) => ({ ...prev, contactPreference: e.target.value as CallbackLeadPayload['contactPreference'] }))
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
              <p className="text-xs text-slate-400">We confirm calls quickly. Your details stay private.</p>
              <Button type="submit" loading={loading} size="lg">
                Request call
              </Button>
            </div>
          </form>
        </Card>
        <div className="space-y-4">
          <Card className="border-white/10 bg-white/5 p-6">
            <h3 className="text-lg font-semibold text-white">What to expect</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-300">
              <li>• A security lead reviews your details immediately.</li>
              <li>• We call or email at your preferred time.</li>
              <li>• You get a concise plan and timeline after the call.</li>
            </ul>
          </Card>
          <Card className="border-white/10 bg-white/5 p-6">
            <h3 className="text-lg font-semibold text-white">Contact directly</h3>
            <div className="mt-3 space-y-2 text-sm text-slate-300">
              <p>Phone: {contactDetails.phone}</p>
              <p>Email: {contactDetails.email}</p>
              <p>Hours: {contactDetails.hours}</p>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {trustSignals.map((signal) => (
                <Badge key={signal}>{signal}</Badge>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </Section>
  )
}

export default CallPage
