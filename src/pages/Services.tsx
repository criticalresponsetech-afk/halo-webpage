import { Badge } from '../components/Badge'
import { Card } from '../components/Card'
import { Section } from '../components/Section'
import { heroImageUrl, industries, services } from '../lib/content'
import { usePageSeo } from '../lib/seo'

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
  usePageSeo({
    title: 'Security Services',
    description:
      'Explore HALO Protection Services coverage models including private security, armed officers, mobile patrols, healthcare security, courthouse security, and patrol operations.',
    path: '/services',
    image: heroImageUrl,
  })

  return (
    <>
      <Section
        eyebrow="Services"
        title="Security coverage built for high-stakes environments"
        className="bg-base bg-cover bg-center pt-10"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(7, 10, 18, 0.95), rgba(7, 10, 18, 0.88), rgba(7, 10, 18, 0.92)), url('${heroImageUrl}')`,
        }}
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
      >
        <div className="grid gap-6 md:grid-cols-2">
          {industries.map((industry) => (
            <Card key={industry.name} className="border-white/5 bg-white/5 p-6">
              <h4 className="text-lg font-semibold text-white">{industry.name}</h4>
              <p className="mt-3 text-sm text-slate-300">{industry.detail}</p>
            </Card>
          ))}
        </div>
      </Section>
    </>
  )
}

export default ServicesPage
