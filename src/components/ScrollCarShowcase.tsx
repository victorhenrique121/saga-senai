import { Activity, Gauge, Radar, Wind } from 'lucide-react'
import { useEffect, useRef, type RefObject } from 'react'

const clamp = (value: number) => Math.min(1, Math.max(0, value))

export function ScrollCarShowcase() {
  const sectionRef = useRef<HTMLElement>(null)
  const carRef = useRef<HTMLImageElement>(null)
  const speedRef = useRef<HTMLOutputElement>(null)
  const boostRef = useRef<HTMLOutputElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let frame = 0
    let lastSpeed = -1
    let lastBoost = -1
    const update = () => {
      frame = 0
      const section = sectionRef.current
      if (!section) return
      const rect = section.getBoundingClientRect()
      const travel = rect.height + window.innerHeight
      const progress = clamp((window.innerHeight - rect.top) / travel)
      const speed = Math.round(progress * 284)
      const boost = Math.min(1.85, progress * 1.85)

      if (carRef.current) carRef.current.style.transform = `translate3d(${(progress - 0.5) * 18}%, ${Math.sin(progress * Math.PI) * -10}px, 0) scale(${1 + progress * 0.06})`
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${progress})`
      if (speedRef.current && speed !== lastSpeed) speedRef.current.value = String(speed)
      if (boostRef.current && boost !== lastBoost) boostRef.current.value = boost.toFixed(2)
      lastSpeed = speed
      lastBoost = boost
    }
    const requestUpdate = () => { if (!frame) frame = requestAnimationFrame(update) }
    requestUpdate()
    window.addEventListener('scroll', requestUpdate, { passive: true })
    window.addEventListener('resize', requestUpdate)
    return () => { cancelAnimationFrame(frame); window.removeEventListener('scroll', requestUpdate); window.removeEventListener('resize', requestUpdate) }
  }, [])

  return <section ref={sectionRef} id="telemetria" data-reveal className="reveal relative overflow-hidden border-y border-white/10 bg-[#080b12] px-[4%] py-24 sm:py-32"><div className="absolute inset-0 -z-10 opacity-60 grid-glow" /><div className="absolute left-1/2 top-1/2 -z-10 size-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-electric/10 blur-[140px]" /><div className="mx-auto max-w-300"><div className="mb-12 flex flex-col gap-5 md:flex-row md:items-end md:justify-between"><div><p className="flex items-center gap-2 text-xs font-bold tracking-[.24em] text-electric"><Radar size={15} /> LIVE TELEMETRY / 02</p><h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">Acelere com o<br />seu scroll.</h2></div><p className="max-w-sm text-sm leading-6 text-slate-400">Uma leitura cinética da nossa obsessão por dados, resposta e velocidade.</p></div><div className="surface overflow-hidden rounded-[2rem]"><div className="relative min-h-[430px] overflow-hidden px-6 py-8 sm:min-h-[520px] sm:p-10"><div className="absolute inset-x-0 bottom-0 h-2 origin-left bg-fire/90" ref={progressRef} /><div className="relative z-10 flex items-center justify-between text-xs font-bold tracking-[.18em] text-slate-400"><span>TM // DYNAMICS</span><span className="text-electric">SCROLL TO THROTTLE</span></div><img ref={carRef} src="img/carro2.jpg" alt="Esportivo em movimento para a telemetria Turbo Motors" className="absolute bottom-0 left-0 h-[88%] w-full object-cover object-center opacity-85 will-change-transform" loading="lazy" /><div className="absolute inset-0 bg-[linear-gradient(90deg,#080b12_0%,transparent_50%,#080b1266_100%),linear-gradient(0deg,#080b12_0%,transparent_42%)]" /><div className="absolute inset-x-[8%] bottom-8 z-10 grid gap-3 sm:grid-cols-3"><Metric icon={Gauge} label="VELOCIDADE" valueRef={speedRef} unit="KM/H" initial="0" /><Metric icon={Wind} label="PRESSÃO TURBO" valueRef={boostRef} unit="BAR" initial="0.00" /><Metric icon={Activity} label="SISTEMA" unit="ONLINE" initial="NOMINAL" /></div></div></div></div></section>
}

function Metric({ icon: Icon, label, valueRef, unit, initial }: { icon: typeof Gauge; label: string; valueRef?: RefObject<HTMLOutputElement | null>; unit: string; initial: string }) {
  return <div className="border border-white/12 bg-ink/65 p-4 backdrop-blur-xl sm:p-5"><div className="flex items-center justify-between text-[10px] font-bold tracking-[.16em] text-slate-400"><span>{label}</span><Icon size={15} className="text-electric" /></div><div className="mt-4 flex items-end gap-2"><output ref={valueRef} className="text-3xl font-black tracking-tight sm:text-4xl">{initial}</output><span className="mb-1 text-[10px] font-bold tracking-[.14em] text-electric">{unit}</span></div></div>
}
