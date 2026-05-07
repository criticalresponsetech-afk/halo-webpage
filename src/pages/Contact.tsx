import { type FormEvent, useState } from 'react'
import { Badge } from '../components/Badge'
import { Button } from '../components/Button'
import { Card } from '../components/Card'
import { Input } from '../components/Input'
import { Section } from '../components/Section'
import { Textarea } from '../components/Textarea'
import { contactDetails, heroImageUrl, trustSignals } from '../lib/content'
import { usePageSeo } from '../lib/seo'
import { useToast } from '../components/Toast'
import type { ContactLeadPayload } from '../types/leads'

const initialState: ContactLeadPayload = {
  fullName: '',
  email: '',
  phone: '',
  message: '',
}

function ContactPage() {
  usePageSeo({
    title: 'Contact Security Team',
    description:
      'Contact HALO Protection Services for security coverage requests, dispatch coordination, and site-specific support across residential, commercial, and industrial properties.',
    path: '/contact',
    image: heroImageUrl,
  })
  const { pushToast } = useToast()
  const [form, setForm] = useState<ContactLeadPayload>(initialState)
  const [errors, setErrors] = useState<Partial<Record<keyof ContactLeadPayload, string>>>({})
  const [loading, setLoading] = useState(false)

  const validate = () => {
    const nextErrors: Partial<Record<keyof ContactLeadPayload, string>> = {}
    if (!form.fullName.trim()) nextErrors.fullName = 'Full name is required.'
    if (!form.email.trim()) nextErrors.email = 'Email is required.'
    if (form.email && !/^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/.test(form.email)) {
      nextErrors.email = 'Enter a valid email.'
    }
    if (!form.message.trim() || form.message.trim().length < 12) {
      nextErrors.message = 'Message must be at least 12 characters.'
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

      await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.fullName,
          email: form.email,
          message: form.message,
        }),
      })

      pushToast({ title: 'Message sent', description: 'Dispatch will reach out shortly.', type: 'success' })
      setForm(initialState)
      setErrors({})
    } catch (error) {
      pushToast({
        title: 'We could not send your message',
        description: error instanceof Error ? error.message : 'Please try again.',
        type: 'error',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Section
        title="Contact"
        className="bg-base bg-cover bg-center pt-10"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(7, 10, 18, 0.95), rgba(7, 10, 18, 0.88), rgba(7, 10, 18, 0.92)), url('${heroImageUrl}')`,
        }}
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
                label="Phone (optional)"
                name="phone"
                type="tel"
                value={form.phone || ''}
                onChange={(e) => setForm((prev) => ({ ...prev, phone: e.target.value }))}
                helperText="Provide a direct line for faster coordination."
              />
              <Textarea
                label="Message"
                name="message"
                value={form.message}
                onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))}
                required
                error={errors.message}
                helperText="Include property type, location, and any immediate concerns."
              />
              <div className="flex items-center justify-between">
                <p className="text-xs text-slate-400">We respond fast and never share your information.</p>
                <Button type="submit" loading={loading} size="lg">
                  Submit
                </Button>
              </div>
            </form>
          </Card>
          <div className="space-y-4">
            <Card className="border-white/10 bg-white/5 p-6">
              <h3 className="text-lg font-semibold text-white">Call anytime</h3>
              <p className="mt-2 text-sm text-slate-300">Dispatch: {contactDetails.phone}</p>
              <p className="text-sm text-slate-300">Email: {contactDetails.email}</p>
              <p className="text-sm text-slate-300">Hours: {contactDetails.hours}</p>
              <p className="text-sm text-slate-300">Service areas: {contactDetails.serviceAreas.join(', ')}</p>
            </Card>
            <Card className="border-white/10 bg-white/5 p-6">
              <h3 className="text-lg font-semibold text-white">Assurance</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {trustSignals.map((signal) => (
                  <Badge key={signal}>{signal}</Badge>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </Section>
    </>
  )
}

export default ContactPage
