import { Routes, Route } from 'react-router-dom'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { ScrollToTop } from './components/ScrollToTop'
import AboutPage from './pages/About'
import CareersPage from './pages/Careers'
import ContactPage from './pages/Contact'
import FAQPage from './pages/FAQ'
import HomePage from './pages/Home'
import NotFoundPage from './pages/NotFound'
import CallPage from './pages/Call'
import ServicesPage from './pages/Services'
import TestimonialsPage from './pages/Testimonials'

function App() {
  return (
    <div className="min-h-screen bg-base text-slate-100">
      <ScrollToTop />
      <Header />
      <main className="pt-16">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/call" element={<CallPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/testimonials" element={<TestimonialsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
