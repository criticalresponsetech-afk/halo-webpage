import { useNavigate } from 'react-router-dom'
import { Button } from '../components/Button'
import { Section } from '../components/Section'
import { usePageSeo } from '../lib/seo'

function NotFoundPage() {
  usePageSeo({
    title: 'Page Not Found',
    description: 'This page does not exist. Explore HALO Protection Services coverage pages instead.',
    path: '/404',
    noindex: true,
  })
  const navigate = useNavigate()

  return (
    <Section
      align="center"
      title="Page not found"
      description="The page you are looking for does not exist. Choose a page below."
      className="pb-20 pt-10"
    >
      <div className="flex flex-wrap justify-center gap-4">
        <Button onClick={() => navigate('/')}>Home</Button>
        <Button variant="ghost" onClick={() => navigate('/call')}>
          Book a Call
        </Button>
      </div>
    </Section>
  )
}

export default NotFoundPage
