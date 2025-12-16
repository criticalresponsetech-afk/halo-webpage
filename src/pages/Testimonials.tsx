import { useNavigate } from 'react-router-dom'
import { Badge } from '../components/Badge'
import { Button } from '../components/Button'
import { Card } from '../components/Card'
import { Section } from '../components/Section'
import { testimonials, trustSignals } from '../lib/content'
import { usePageTitle } from '../lib/seo'

function TestimonialsPage() {
  usePageTitle('Testimonials')
  const navigate = useNavigate()

  return (
    <>
      <Section
        eyebrow="Testimonials"
        title="Trusted partners across industries"
        description="Leaders who rely on HALO Security to protect their people, assets, and reputation."
        className="pt-10"
      >
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((item) => (
            <Card key={item.name} className="border-white/10 bg-white/5 p-6">
              <div className="flex items-center gap-2">
                <Badge variant="outline">Partner</Badge>
                <span className="text-xs text-slate-400">Verified</span>
              </div>
              <p className="mt-4 text-sm text-slate-200">&ldquo;{item.quote}&rdquo;</p>
              <div className="mt-4 text-sm font-semibold text-white">{item.name}</div>
              <p className="text-xs text-slate-400">{item.role}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section
        align="center"
        eyebrow="Ready to get started?"
        title="Build a security plan with HALO"
        description="Tell us about your environment and we will provide a concise, transparent proposal."
        className="pb-20"
      >
        <div className="flex flex-wrap justify-center gap-2">
          {trustSignals.map((signal) => (
            <Badge key={signal}>{signal}</Badge>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <Button size="lg" onClick={() => navigate('/call')}>
            Book a call
          </Button>
          <Button variant="ghost" size="lg" onClick={() => navigate('/contact')}>
            Speak with dispatch
          </Button>
        </div>
      </Section>
    </>
  )
}

export default TestimonialsPage
