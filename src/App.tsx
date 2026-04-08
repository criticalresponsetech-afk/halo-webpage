import { Routes, Route } from 'react-router-dom'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { ScrollToTop } from './components/ScrollToTop'
import ContactPage from './pages/Contact'
import HomePage from './pages/Home'
import NotFoundPage from './pages/NotFound'
import CallPage from './pages/Call'
import ServicesPage from './pages/Services'

function App() {
  return (
    <div className="min-h-screen bg-base text-slate-100">
      <ScrollToTop />
      <Header />
      <main className="pt-16">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/call" element={<CallPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
