import { lazy, Suspense, useMemo, useState } from 'react'
import { AccessibilityPanel, type AccessibilitySettings } from './components/AccessibilityPanel'
import { Configurator } from './components/Configurator'
import { ColorCustomizer } from './components/ColorCustomizer'
import { EngineeringStandard } from './components/EngineeringStandard'
import { CarSearch } from './components/CarSearch'
import { ContactForm } from './components/ContactForm'
import { CustomCursor } from './components/CustomCursor'
import { CustomTuner } from './components/tuner/CustomTuner'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { ImageSlider } from './components/ImageSlider'
import { Navbar } from './components/Navbar'
import { Services } from './components/Services'
import { ScrollCarShowcase } from './components/ScrollCarShowcase'
import { WhatsAppButton } from './components/WhatsAppButton'
import { VirtualAssistant } from './components/VirtualAssistant'
import { useRevealOnScroll } from './lib/useRevealOnScroll'

const DynoChart = lazy(() => import('./components/DynoChart').then((module) => ({ default: module.DynoChart })))

const defaultAccessibility: AccessibilitySettings = {
  fontScale: 100,
  highContrast: false,
  grayscale: false,
  expandedSpacing: false,
}

export default function App() {
  useRevealOnScroll()
  const [accessibility, setAccessibility] = useState(defaultAccessibility)

  const appStyle = useMemo(() => ({
    fontSize: `${accessibility.fontScale}%`,
    filter: accessibility.grayscale ? 'grayscale(1)' : undefined,
  }), [accessibility.fontScale, accessibility.grayscale])

  const classes = [
    'min-h-screen overflow-x-clip bg-ink',
    accessibility.highContrast ? 'contrast-125 bg-black text-white' : '',
    accessibility.expandedSpacing ? 'tracking-wide leading-8' : '',
  ].join(' ')

  return (
    <div className={classes} style={appStyle}>
      <Navbar />
      <main id="conteudo-principal">
        <Hero />
        <ScrollCarShowcase />
        <Services />
        <Configurator />
        <ColorCustomizer />
        <Suspense fallback={<div className="min-h-100 bg-panel/45" aria-label="Carregando gráfico de dinamômetro" />}><DynoChart /></Suspense>
        <ImageSlider />
        <CarSearch />
        <EngineeringStandard />
        <CustomTuner />
        <ContactForm />
      </main>
      <Footer />
      <AccessibilityPanel settings={accessibility} onChange={setAccessibility} />
      <WhatsAppButton />
      <VirtualAssistant />
      <CustomCursor />
    </div>
  )
}
