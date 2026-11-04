import { SlidersHorizontal } from 'lucide-react'
import { lazy, Suspense, useEffect, useMemo, useState } from 'react'
import { AccessibilityPanel, type AccessibilitySettings } from './components/AccessibilityPanel'
import { CarSearch } from './components/CarSearch'
import { ColorCustomizer } from './components/ColorCustomizer'
import { Configurator } from './components/Configurator'
import { ContactForm } from './components/ContactForm'
import { CustomCursor } from './components/CustomCursor'
import { EngineeringStandard } from './components/EngineeringStandard'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { ImageSlider } from './components/ImageSlider'
import { Navbar } from './components/Navbar'
import { ScrollCarShowcase } from './components/ScrollCarShowcase'
import { Services } from './components/Services'
import { VirtualAssistant } from './components/VirtualAssistant'
import { VLibrasWidget } from './components/VLibrasWidget'
import { WhatsAppButton } from './components/WhatsAppButton'
import { useRevealOnScroll } from './lib/useRevealOnScroll'

const DynoChart = lazy(() => import('./components/DynoChart').then((module) => ({ default: module.DynoChart })))
const CustomTuner = lazy(() => import('./components/tuner/CustomTuner').then((module) => ({ default: module.CustomTuner })))
const defaultAccessibility: AccessibilitySettings = { fontScale: 100, highContrast: false, grayscale: false, expandedSpacing: false }
type View = 'home' | 'studio'
const getView = (): View => window.location.hash === '#studio' ? 'studio' : 'home'

export default function App() {
  const [accessibility, setAccessibility] = useState(defaultAccessibility)
  const [view, setView] = useState<View>(getView)
  useSiteMotion()
  useEffect(() => { const syncView = () => setView(getView()); window.addEventListener('hashchange', syncView); window.addEventListener('popstate', syncView); return () => { window.removeEventListener('hashchange', syncView); window.removeEventListener('popstate', syncView) } }, [])
  const appStyle = useMemo(() => ({ fontSize: `${accessibility.fontScale}%`, filter: accessibility.grayscale ? 'grayscale(1)' : undefined }), [accessibility.fontScale, accessibility.grayscale])
  const classes = ['app-shell min-h-screen overflow-x-clip bg-ink', accessibility.highContrast ? 'contrast-125 bg-black text-white' : '', accessibility.expandedSpacing ? 'tracking-wide leading-8' : ''].join(' ')
  const navigate = (nextView: View) => { if (nextView === view) { window.scrollTo({ top: 0, behavior: 'smooth' }); return }; window.history.pushState({ view: nextView }, '', `${window.location.pathname}${window.location.search}${nextView === 'studio' ? '#studio' : ''}`); setView(nextView); window.scrollTo({ top: 0, behavior: 'smooth' }) }
  const studioActive = view === 'studio'
  return <><div className={classes} style={appStyle}><Navbar onOpenStudio={() => navigate('studio')} onGoHome={() => navigate('home')} studioActive={studioActive} /><main id="conteudo-principal">{studioActive ? <Suspense fallback={<div className="min-h-[calc(100vh-5rem)] bg-ink" aria-label="Carregando Studio" />}><CustomTuner studio /></Suspense> : <Home onOpenStudio={() => navigate('studio')} />}</main>{!studioActive ? <Footer /> : null}</div>{!studioActive ? <div className="floating-layer"><AccessibilityPanel settings={accessibility} onChange={setAccessibility} /><WhatsAppButton /><VirtualAssistant /><CustomCursor /></div> : null}<VLibrasWidget /></>
}

function useSiteMotion() {
  useEffect(() => {
    const root = document.documentElement
    let frame = 0

    const updateProgress = () => {
      frame = 0
      const maximum = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
      const progress = Math.min(1, window.scrollY / maximum)
      root.style.setProperty('--scroll-progress', `${progress}`)
      root.style.setProperty('--ambient-left', `${12 + progress * 70}%`)
      root.style.setProperty('--ambient-right', `${88 - progress * 65}%`)
    }
    const requestProgress = () => {
      if (!frame) frame = requestAnimationFrame(updateProgress)
    }
    const trackCard = (event: PointerEvent) => {
      const target = event.target
      if (!(target instanceof Element)) return
      const card = target.closest<HTMLElement>('.surface, [data-motion-card]')
      if (!card) return
      const bounds = card.getBoundingClientRect()
      const pointerX = (event.clientX - bounds.left) / bounds.width
      const pointerY = (event.clientY - bounds.top) / bounds.height
      card.style.setProperty('--pointer-x', `${pointerX * 100}%`)
      card.style.setProperty('--pointer-y', `${pointerY * 100}%`)
      card.style.setProperty('--tilt-y', `${(pointerX - .5) * 12}deg`)
      card.style.setProperty('--tilt-x', `${(.5 - pointerY) * 9}deg`)
    }

    requestProgress()
    window.addEventListener('scroll', requestProgress, { passive: true })
    window.addEventListener('resize', requestProgress)
    document.addEventListener('pointermove', trackCard, { passive: true })

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', requestProgress)
      window.removeEventListener('resize', requestProgress)
      document.removeEventListener('pointermove', trackCard)
    }
  }, [])
}

function Home({ onOpenStudio }: { onOpenStudio: () => void }) { useRevealOnScroll(); return <><Hero /><ScrollCarShowcase /><Services /><Configurator /><ColorCustomizer /><Suspense fallback={<div className="flex h-16 items-center justify-center border-y border-white/10 bg-panel/45 text-xs font-bold tracking-[.14em] text-slate-500" aria-label="Carregando gráfico de dinamômetro">CARREGANDO DINAMÔMETRO</div>}><DynoChart /></Suspense><ImageSlider /><CarSearch /><EngineeringStandard /><section className="border-y border-white/10 bg-panel/25 px-[4%] py-14 sm:py-16"><div className="mx-auto flex max-w-300 flex-col items-start justify-between gap-6 rounded-[1.75rem] border border-white/10 bg-black/20 p-7 sm:flex-row sm:items-center sm:p-10"><div><p className="flex items-center gap-2 text-xs font-bold tracking-[.2em] text-fire"><SlidersHorizontal size={14} /> STUDIO MODE / 08</p><h2 className="mt-3 text-3xl font-black">Monte seu projeto sem distrações.</h2><p className="mt-3 max-w-xl text-slate-400">Abra o Custom Tuner em tela dedicada para comparar peças, mapear o carro e salvar a sua configuração.</p></div><button type="button" onClick={onOpenStudio} className="focus-ring inline-flex shrink-0 items-center gap-2 rounded-xl bg-fire px-5 py-3.5 font-bold transition hover:-translate-y-0.5 hover:bg-[#ff684c]"><SlidersHorizontal size={18} /> Abrir Tuner Completo</button></div></section><ContactForm /></> }
