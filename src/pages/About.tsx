import { useNavigate } from 'react-router-dom'
import { Badge } from '../components/Badge'
import { Button } from '../components/Button'
import { Card } from '../components/Card'
import { Section } from '../components/Section'
import { metrics, trustSignals } from '../lib/content'
import { usePageTitle } from '../lib/seo'

const leadershipPrinciples = [
  {
    title: 'Composure under pressure',
    detail: 'We train for calm, methodical response to incidents with clear escalation paths and supervisor oversight.',
  },
  {
    title: 'Presence with respect',
    detail: 'Officers maintain a sharp presence while respecting residents, tenants, contractors, and guests.',
  },
  {
    title: 'Reporting discipline',
    detail: 'Every shift and incident is documented concisely, giving you clear accountability without noise.',
  },
]

function AboutPage() {
  usePageTitle('About')
  const navigate = useNavigate()

  return (
    <>
      <Section
        eyebrow="About HALO Security"
        title="Security leadership committed to readiness and accountability"
        description="HALO Security is a team of licensed, insured, and armed-certified professionals built to protect what is critical. We combine disciplined training, transparent reporting, and rapid response."
        className="pt-10"
      >
        <Card className="grid gap-6 border-white/10 bg-white/5 p-6 sm:grid-cols-2 sm:p-8">
          <div className="space-y-4">
            <p className="text-sm text-slate-300">
              From stabilized residential communities to high-traffic commercial campuses, HALO Security designs
              coverage that balances deterrence, guest experience, and compliance. Our supervisors remain on-call
              24/7 to support officers and communicate with your stakeholders.
            </p>
            <div className="flex flex-wrap gap-2">
              {trustSignals.map((signal) => (
                <Badge key={signal}>{signal}</Badge>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {metrics.map((metric) => (
              <div key={metric.label} className="rounded-lg border border-white/5 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-wide text-slate-400">{metric.label}</p>
                <p className="mt-1 text-2xl font-semibold text-white">{metric.value}</p>
              </div>
            ))}
          </div>
        </Card>
      </Section>

      <Section
        eyebrow="Operating principles"
        title="Professionalism first, backed by armed capability"
        description="We build trust through composure, clear communication, and readiness. Our leadership team enforces standards and supports every post."
      >
        <div className="grid gap-6 md:grid-cols-3">
          {leadershipPrinciples.map((item) => (
            <Card key={item.title} className="border-white/5 bg-white/5 p-6">
              <h3 className="text-lg font-semibold text-white">{item.title}</h3>
              <p className="mt-3 text-sm text-slate-300">{item.detail}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section
        align="center"
        eyebrow="Leadership support"
        title="Command and control that never sleeps"
        description="Supervisors audit routes, support officers, and keep your stakeholders informed. Every post has a clear chain of command."
        className="pb-20"
      >
        <div className="flex flex-wrap justify-center gap-3">
          <Badge variant="outline">Supervisor-backed</Badge>
          <Badge variant="outline">Audit-ready reporting</Badge>
          <Badge variant="outline">Armed-capable</Badge>
        </div>
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <Button size="lg" onClick={() => navigate('/call')}>
            Book a call
          </Button>
          <Button variant="ghost" size="lg" onClick={() => navigate('/contact')}>
            Speak with leadership
          </Button>
        </div>
      </Section>
    </>
  )
}

export default AboutPage
