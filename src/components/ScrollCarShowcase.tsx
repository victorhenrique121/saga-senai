import { BadgeCheck, BookOpen, Zap } from 'lucide-react'
import { useEffect, useRef } from 'react'

const clamp = (value: number) => Math.min(1, Math.max(0, value))

const metrics = [
  { icon: BookOpen, label: 'KNOWLEDGE INDEX', value: 750, suffix: '+', detail: 'ENTRIES' },
  { icon: BadgeCheck, label: 'DATA ACCURACY', value: 99.8, suffix: '%', decimals: 1, detail: 'VERIFIED' },
  { icon: Zap, label: 'SYSTEM INTEGRITY', value: 'NOMINAL', detail: 'ONLINE' },
]

export function ScrollCarShowcase() {
  const sectionRef = useRef<HTMLElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let frame = 0

    const update = () => {
      frame = 0
      const section = sectionRef.current
      if (!section || !progressRef.current) return

      const rect = section.getBoundingClientRect()
      const progress = clamp((window.innerHeight - rect.top) / (rect.height + window.innerHeight))
      progressRef.current.style.transform = `scaleX(${progress})`
    }

    const requestUpdate = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    requestUpdate()
    window.addEventListener('scroll', requestUpdate, { passive: true })
    window.addEventListener('resize', requestUpdate)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', requestUpdate)
      window.removeEventListener('resize', requestUpdate)
    }
  }, [])

  return (
    <section ref={sectionRef} id="telemetria" data-reveal className="reveal telemetry-speed relative overflow-hidden border-y border-white/10 bg-[#080b12] px-[4%] py-24 sm:py-32">
      <div className="absolute inset-0 -z-10 grid-glow opacity-60" />
      <div className="absolute left-1/2 top-1/2 -z-10 size-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-electric/10 blur-[140px]" />

      <div className="mx-auto max-w-300">
        <div className="mb-12 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="flex items-center gap-2 text-xs font-bold tracking-[.24em] text-electric"><BookOpen size={15} /> CODEX ENTRIES / 02</p>
            <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">Descubra com o<br />seu scroll.</h2>
          </div>
          <p className="max-w-sm text-sm leading-6 text-slate-400">Uma exploração profunda e indexada de todo o conhecimento acumulado e dados.</p>
        </div>

        <div className="surface overflow-hidden rounded-[2rem]">
          <div className="relative h-[50vh] min-h-[430px] overflow-hidden sm:h-[65vh] sm:min-h-[560px]">
            <img
              src="/img/carro2.jpg"
              alt="Veículo em alta velocidade no Codex Turbo Motors"
              className="absolute inset-0 h-full w-full object-cover object-center"
              loading="lazy"
            />

            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_72%_48%,transparent_0%,transparent_20%,rgba(3,6,13,.4)_67%,rgba(3,6,13,.94)_100%)]" />
            <div className="pointer-events-none absolute inset-0 opacity-70 [background-image:linear-gradient(108deg,transparent_0%,transparent_28%,rgba(0,229,255,.12)_29%,transparent_30%,transparent_42%,rgba(255,71,52,.25)_43%,transparent_44%,transparent_56%,rgba(255,255,255,.14)_57%,transparent_58%,transparent_100%)] [background-size:170%_100%] motion-safe:animate-[speed-lines_2.8s_linear_infinite]" />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(3,6,13,.88)_0%,rgba(3,6,13,.22)_34%,transparent_65%,rgba(3,6,13,.6)_100%),linear-gradient(0deg,rgba(3,6,13,.9)_0%,transparent_42%)]" />

            <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between p-6 text-xs font-bold tracking-[.18em] text-slate-300 sm:p-10">
              <span>CX // INSIGHTS</span>
              <span className="text-electric">SCROLL TO REVEAL</span>
            </div>
            <div ref={progressRef} className="absolute inset-x-0 bottom-0 z-20 h-1.5 origin-left bg-linear-to-r from-electric via-white to-fire" />

            <div className="absolute inset-x-4 bottom-5 z-10 grid gap-3 sm:inset-x-[8%] sm:bottom-8 sm:grid-cols-3">
              {metrics.map(({ icon: Icon, label, value, suffix, decimals, detail }) => (
                <article key={label} className="border border-white/15 bg-[#070a11]/75 p-4 backdrop-blur-xl sm:p-5">
                  <div className="flex items-center justify-between text-[10px] font-bold tracking-[.16em] text-slate-300">
                    <span>{label}</span>
                    <Icon size={15} className="text-electric" aria-hidden="true" />
                  </div>
                  <p className="metric-glitch mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl">{typeof value === 'number' ? <CountUp value={value} suffix={suffix} decimals={decimals} /> : value}</p>
                  <div className="mt-3 flex items-center gap-2 text-[10px] font-bold tracking-[.15em] text-slate-300">
                    <span>{detail}</span>
                    {detail !== 'ONLINE' && <><span className="h-1 w-1 rounded-full bg-slate-500" /><span className="status-online text-electric">ONLINE</span></>}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function CountUp({ value, suffix = '', decimals = 0 }: { value: number; suffix?: string; decimals?: number }) {
  const outputRef = useRef<HTMLOutputElement>(null)

  useEffect(() => {
    const output = outputRef.current
    if (!output) return
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) {
      output.value = `${value.toFixed(decimals)}${suffix}`
      return
    }

    let frame = 0
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      const startedAt = performance.now()
      const tick = (time: number) => {
        const progress = Math.min(1, (time - startedAt) / 1050)
        const eased = 1 - Math.pow(1 - progress, 4)
        output.value = `${(value * eased).toFixed(decimals)}${suffix}`
        if (progress < 1) frame = requestAnimationFrame(tick)
      }
      frame = requestAnimationFrame(tick)
      observer.disconnect()
    }, { threshold: 0.45 })

    observer.observe(output)
    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
    }
  }, [decimals, suffix, value])

  return <output ref={outputRef} aria-label={`${value}${suffix}`}>0{suffix}</output>
}
