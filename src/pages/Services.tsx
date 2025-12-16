import { useNavigate } from 'react-router-dom'
import { Badge } from '../components/Badge'
import { Button } from '../components/Button'
import { Card } from '../components/Card'
import { Section } from '../components/Section'
import { industries, services, trustSignals } from '../lib/content'
import { usePageTitle } from '../lib/seo'

const coverageModels = [
  {
    name: 'Dedicated posts',
    description: 'Fixed-position officers for access control, concierge duties, and high-visibility deterrence.',
    details: ['Lobby, gatehouse, and dock management', 'Visitor management and vendor escorts', 'Badge and credential enforcement'],
  },
  {
    name: 'Mobile patrols',
    description: 'Marked vehicle sweeps, randomized routes, and timed check-ins to disrupt unwanted activity.',
    details: ['Perimeter and interior patrols', 'Timed door, dock, and gate checks', 'Alarm response and after-hours escorts'],
  },
  {
    name: 'Rapid response',
    description: 'Escalation-ready teams to stabilize incidents, de-escalate conflicts, and coordinate with authorities.',
    details: ['Armed-capable officers available', 'Supervisor escalation on every priority call', 'Concise incident documentation'],
  },
]

function ServicesPage() {
  usePageTitle('Services')
  const navigate = useNavigate()

  return (
    <>
      <Section
        eyebrow="Services"
        title="Security coverage built for high-stakes environments"
        description="HALO Security delivers private security, armed officers, and mobile patrols across residential, commercial, construction, and industrial sites."
        className="pt-10"
      >
        <div className="grid gap-6 md:grid-cols-3">
          {services.map((service) => (
            <Card key={service.name} className="border-white/10 bg-white/5 p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-white">{service.name}</h3>
                <Badge variant="outline">Core</Badge>
              </div>
              <p className="mt-3 text-sm text-slate-300">{service.summary}</p>
              <ul className="mt-4 space-y-2 text-sm text-slate-200">
                {service.features.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent-soft" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Coverage models"
        title="Match the posture to your property and risk profile"
        description="From concierge-grade presence to armed-ready patrols, we tailor coverage that balances deterrence, response, and guest experience."
      >
        <div className="grid gap-6 md:grid-cols-3">
          {coverageModels.map((model) => (
            <Card key={model.name} className="border-white/5 bg-white/5 p-6">
              <h3 className="text-lg font-semibold text-white">{model.name}</h3>
              <p className="mt-3 text-sm text-slate-300">{model.description}</p>
              <ul className="mt-4 space-y-2 text-sm text-slate-200">
                {model.details.map((detail) => (
                  <li key={detail} className="flex items-start gap-2">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent-soft" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Industry expertise"
        title="Experienced in busy lobbies, active job sites, and critical infrastructure"
        description="We integrate with your operations team and contractors, delivering clear communication and accountable reporting."
      >
        <div className="grid gap-6 md:grid-cols-2">
          {industries.map((industry) => (
            <Card key={industry.name} className="border-white/5 bg-white/5 p-6">
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-semibold text-white">{industry.name}</h4>
                <Badge variant="outline">Trusted</Badge>
              </div>
              <p className="mt-3 text-sm text-slate-300">{industry.detail}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section
        align="center"
        eyebrow="Assurance"
        title="Trusted, trained, and ready to mobilize"
        description="We maintain tight hiring standards, armed certification, and round-the-clock supervision to keep coverage sharp."
        className="pb-20"
      >
        <div className="flex flex-wrap justify-center gap-2">
          {trustSignals.map((signal) => (
            <Badge key={signal}>{signal}</Badge>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
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

export default ServicesPage
