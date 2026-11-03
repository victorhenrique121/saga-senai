import { ArrowLeft, SlidersHorizontal } from 'lucide-react'
import { lazy, Suspense, useEffect, useMemo, useState } from 'react'
import { AccessibilityPanel, type AccessibilitySettings } from './components/AccessibilityPanel'
import { Configurator } from './components/Configurator'
import { ColorCustomizer } from './components/ColorCustomizer'
import { EngineeringStandard } from './components/EngineeringStandard'
import { CarSearch } from './components/CarSearch'
import { ContactForm } from './components/ContactForm'
import { CustomCursor } from './components/CustomCursor'
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
const CustomTuner = lazy(() => import('./components/tuner/CustomTuner').then((module) => ({ default: module.CustomTuner })))
const defaultAccessibility: AccessibilitySettings = { fontScale: 100, highContrast: false, grayscale: false, expandedSpacing: false }
const getView = () => window.location.hash === '#studio' ? 'studio' : 'home'

export default function App() {
  useRevealOnScroll()
  const [accessibility, setAccessibility] = useState(defaultAccessibility)
  const [view, setView] = useState<'home' | 'studio'>(getView)
  useEffect(() => { const syncView = () => setView(getView()); window.addEventListener('hashchange', syncView); return () => window.removeEventListener('hashchange', syncView) }, [])
  const appStyle = useMemo(() => ({ fontSize: `${accessibility.fontScale}%`, filter: accessibility.grayscale ? 'grayscale(1)' : undefined }), [accessibility.fontScale, accessibility.grayscale])
  const classes = ['min-h-screen overflow-x-clip bg-ink', accessibility.highContrast ? 'contrast-125 bg-black text-white' : '', accessibility.expandedSpacing ? 'tracking-wide leading-8' : ''].join(' ')
  const openStudio = () => { window.location.hash = 'studio'; window.scrollTo({ top: 0, behavior: 'smooth' }) }
  const goHome = () => { history.replaceState(null, '', `${window.location.pathname}${window.location.search}`); setView('home'); window.scrollTo({ top: 0, behavior: 'smooth' }) }
  return <div className={classes} style={appStyle}><Navbar onOpenStudio={openStudio} onGoHome={goHome} studioActive={view === 'studio'} /><main id="conteudo-principal">{view === 'studio' ? <StudioMode onBack={goHome} /> : <Home />}</main><Footer /><AccessibilityPanel settings={accessibility} onChange={setAccessibility} /><WhatsAppButton /><VirtualAssistant /><CustomCursor /></div>
}

function Home() { return <><Hero /><ScrollCarShowcase /><Services /><Configurator /><ColorCustomizer /><Suspense fallback={<div className="min-h-100 bg-panel/45" aria-label="Carregando gráfico de dinamômetro" />}><DynoChart /></Suspense><ImageSlider /><CarSearch /><EngineeringStandard /><section className="border-y border-white/10 bg-panel/25 px-[4%] py-16 sm:py-20"><div className="mx-auto flex max-w-300 flex-col items-start justify-between gap-6 rounded-[1.75rem] border border-white/10 bg-black/20 p-7 sm:flex-row sm:items-center sm:p-10"><div><p className="flex items-center gap-2 text-xs font-bold tracking-[.2em] text-fire"><SlidersHorizontal size={14} /> STUDIO MODE / 08</p><h2 className="mt-3 text-3xl font-black">Monte seu projeto sem distrações.</h2><p className="mt-3 max-w-xl text-slate-400">Abra o Custom Tuner em tela dedicada para comparar peças, mapear o carro e salvar a sua configuração.</p></div><a href="#studio" className="focus-ring inline-flex shrink-0 items-center gap-2 rounded-xl bg-fire px-5 py-3.5 font-bold transition hover:-translate-y-0.5 hover:bg-[#ff684c]"><SlidersHorizontal size={18} /> Abrir Tuner Completo</a></div></section><ContactForm /></> }
function StudioMode({ onBack }: { onBack: () => void }) { return <><section className="border-b border-white/10 bg-panel/35 px-[4%] py-10"><div className="mx-auto flex max-w-[1680px] flex-col gap-5 sm:flex-row sm:items-center sm:justify-between"><div><p className="flex items-center gap-2 text-xs font-bold tracking-[.2em] text-electric"><SlidersHorizontal size={14} /> MODO STUDIO</p><p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">Ambiente dedicado para compor, validar e salvar o seu projeto de performance.</p></div><button type="button" onClick={onBack} className="focus-ring inline-flex w-fit items-center gap-2 rounded-xl border border-white/15 px-4 py-2.5 text-sm font-bold transition hover:bg-white/10"><ArrowLeft size={17} /> Voltar para a experiência</button></div></section><Suspense fallback={<div className="min-h-screen bg-ink" aria-label="Carregando tuner" />}><CustomTuner studio /></Suspense></> }
