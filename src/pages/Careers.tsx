import { useNavigate } from 'react-router-dom'
import { Badge } from '../components/Badge'
import { Button } from '../components/Button'
import { Card } from '../components/Card'
import { Section } from '../components/Section'
import { careerOpenings, trustSignals } from '../lib/content'
import { usePageTitle } from '../lib/seo'

const benefits = ['Competitive pay', 'Training and armed certification support', 'Uniform allowance', 'Growth path to supervision']

function CareersPage() {
  usePageTitle('Careers')
  const navigate = useNavigate()

  return (
    <>
      <Section
        eyebrow="Careers"
        title="Join HALO Security"
        description="Operate with a team that values professionalism, composure, and accountability. HALO Security invests in training, equipment, and leadership support."
        className="pt-10"
      >
        <div className="grid gap-6 md:grid-cols-3">
          {careerOpenings.map((role) => (
            <Card key={role.title} className="flex h-full flex-col justify-between border-white/10 bg-white/5 p-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-white">{role.title}</h3>
                  <Badge variant="outline">{role.type}</Badge>
                </div>
                <p className="text-sm text-slate-400">{role.location}</p>
                <p className="text-sm text-slate-300">{role.summary}</p>
                <ul className="space-y-2 text-sm text-slate-200">
                  {role.requirements.map((req) => (
                    <li key={req} className="flex items-start gap-2">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent-soft" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-5">
                <Button className="w-full" onClick={() => navigate('/contact')}>
                  Introduce yourself
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="What we offer"
        title="Grow with a team that takes professionalism seriously"
        description="We provide strong supervision, training refreshers, and armed certification support for qualifying officers."
        className="pb-20"
      >
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="border-white/10 bg-white/5 p-6">
            <h3 className="text-lg font-semibold text-white">Benefits</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-200">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-2">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent-soft" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </Card>
          <Card className="border-white/10 bg-white/5 p-6">
            <h3 className="text-lg font-semibold text-white">Standards</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {trustSignals.map((signal) => (
                <Badge key={signal}>{signal}</Badge>
              ))}
            </div>
            <p className="mt-3 text-sm text-slate-300">
              Expect fitness-for-duty checks, scenario drills, and consistent supervision. We promote calm, respectful
              officers who communicate clearly and act decisively.
            </p>
          </Card>
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button size="lg" onClick={() => navigate('/contact')}>
            Send your resume
          </Button>
          <Button variant="ghost" size="lg" onClick={() => navigate('/about')}>
            Learn about HALO
          </Button>
        </div>
      </Section>
    </>
  )
}

export default CareersPage
