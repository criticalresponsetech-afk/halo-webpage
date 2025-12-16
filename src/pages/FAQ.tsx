import { useNavigate } from 'react-router-dom'
import { Badge } from '../components/Badge'
import { Button } from '../components/Button'
import { Card } from '../components/Card'
import { Section } from '../components/Section'
import { faqItems, trustSignals } from '../lib/content'
import { usePageTitle } from '../lib/seo'

function FAQPage() {
  usePageTitle('FAQ')
  const navigate = useNavigate()

  return (
    <>
      <Section
        eyebrow="FAQ"
        title="Common questions"
        description="Answers to the questions we hear most about coverage, response, and qualifications."
        className="pt-10"
      >
        <div className="grid gap-4">
          {faqItems.map((faq) => (
            <Card key={faq.question} className="border-white/5 bg-white/5 p-5">
              <h3 className="text-lg font-semibold text-white">{faq.question}</h3>
              <p className="mt-2 text-sm text-slate-300">{faq.answer}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section
        align="center"
        eyebrow="Still looking for details?"
        title="Talk with HALO Security"
        description="We respond quickly and can tailor post orders, reporting cadence, and patrol coverage to your site."
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
            Contact dispatch
          </Button>
        </div>
      </Section>
    </>
  )
}

export default FAQPage
