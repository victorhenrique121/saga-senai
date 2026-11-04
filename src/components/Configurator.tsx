import { BarChart3, CarFront, CircleGauge, ShieldCheck, SlidersHorizontal, TimerReset, Volume2, VolumeX } from 'lucide-react'
import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react'

const stages = [
  { label: 'Stage 1', multiplier: 0.16, description: 'Software refinado, resposta imediata.', accent: '#55d8ff' },
  { label: 'Stage 2', multiplier: 0.28, description: 'Hardware + calibração de alta entrega.', accent: '#ff9a3e' },
  { label: 'Stage 3', multiplier: 0.42, description: 'Projeto extremo para pista e rua.', accent: '#ff4d2e' },
]

const garageMatches = [
  { id: 'entry', maxHp: 500, model: 'Golf GTI / Civic Si', category: 'Esportivo de Entrada', image: '/img/golf.jpg', audio: '/audio/golf.mp3' },
  { id: 'supercar', maxHp: 1000, model: 'Porsche 911 Turbo S / Nissan GT-R R35', category: 'Supercar', image: '/img/carro1.jpg', audio: '/audio/porsche.mp3' },
  { id: 'hypercar', maxHp: 1500, model: 'Bugatti Chiron Super Sport / Dodge Charger Extreme', category: 'Hipercarro / Projeto Extremo', image: '/img/m2competion.jpg', audio: '/audio/buggati.mp3' },
  { id: 'dragster', maxHp: Infinity, model: 'Rimac Nevera R / Devel Sixteen', category: 'Monstro de Pista / Dragster', image: '/img/carro2.jpg', audio: '/audio/bmw.mp3' },
]

const getGarageMatch = (hp: number) => garageMatches.find((match) => hp <= match.maxHp) ?? garageMatches[garageMatches.length - 1]

export function Configurator() {
  const [stageIndex, setStageIndex] = useState(0)
  const [baseHp, setBaseHp] = useState(280)
  const [pulseNonce, setPulseNonce] = useState(0)
  const [muted, setMuted] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)
  const previousMatchRef = useRef(garageMatches[0].id)
  const stage = stages[stageIndex]
  const result = useMemo(() => {
    const gain = Math.round(baseHp * stage.multiplier)
    return { gain, total: baseHp + gain, torque: Math.round(gain * 1.52) }
  }, [baseHp, stage.multiplier])
  const isExtreme = stageIndex === 2 || result.total >= 800
  const garageMatch = getGarageMatch(result.total)
  const stopAudio = () => {
    const audio = audioRef.current
    if (!audio) return
    audio.pause()
    audio.currentTime = 0
  }
  const playRev = (match: typeof garageMatches[number]) => {
    if (muted) return
    const audio = audioRef.current
    if (!audio) return
    stopAudio()
    if (audio.src !== new URL(match.audio, window.location.href).href) {
      audio.src = match.audio
      audio.load()
    }
    audio.volume = .28
    void audio.play().catch(() => {
      // O gesto do usuário pode não ter sido reconhecido pelo navegador.
      // A falha é intencionalmente silenciosa para não quebrar o simulador.
    })
  }
  useEffect(() => {
    const preloadedImages = garageMatches.map((match) => {
      const image = new Image()
      image.src = match.image
      return image
    })
    return () => { stopAudio(); void preloadedImages }
  }, [])
  const updateCalculation = (nextStage: number, nextBaseHp: number, forceRev = false) => {
    const nextTotal = Math.round(nextBaseHp * (1 + stages[nextStage].multiplier))
    const nextMatch = getGarageMatch(nextTotal)
    const changedMatch = nextMatch.id !== previousMatchRef.current
    if (changedMatch) stopAudio()
    if (forceRev || changedMatch) playRev(nextMatch)
    previousMatchRef.current = nextMatch.id
    setPulseNonce((value) => value + 1)
  }
  const updateStage = (index: number) => { setStageIndex(index); updateCalculation(index, baseHp, true) }
  const updateBaseHp = (value: number) => { setBaseHp(value); updateCalculation(stageIndex, value) }

  return (
    <section id="simulador" data-reveal className="reveal relative overflow-hidden px-[4%] py-24 sm:py-32">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_85%_35%,#ff4d2e20,transparent_30%),radial-gradient(circle_at_10%_80%,#55d8ff18,transparent_25%)]" />
      <div className="mx-auto grid max-w-300 gap-10 lg:grid-cols-[.85fr_1.15fr] lg:gap-20">
        <div><p className="text-xs font-bold tracking-[.24em] text-electric">DYNO LAB / 03</p><h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">Sinta os números<br />ganharem vida.</h2><p className="mt-6 max-w-md leading-7 text-slate-400">Projete uma estimativa de evolução. O resultado final depende da plataforma, combustível, componentes e validação em dinamômetro.</p><div className="mt-10 flex gap-3 text-sm text-slate-300"><CircleGauge className="shrink-0 text-fire" /><span>Simulação orientativa. A potência real é certificada no nosso laboratório.</span></div></div>
        <div className={`surface dyno-hum stage-${stageIndex + 1} rounded-[1.75rem] p-6 sm:p-9`} style={{ '--dyno-accent': stage.accent } as CSSProperties}>
          <div className="mb-9 flex items-center gap-3"><span className="grid size-10 place-items-center rounded-full bg-electric/10 text-electric"><SlidersHorizontal size={19} /></span><div><p className="font-bold">Configurador de performance</p><p className="text-xs text-slate-500">Ajuste a potência de fábrica e o estágio.</p></div></div>
          <div className="grid gap-3 sm:grid-cols-3" role="group" aria-label="Escolha o estágio de preparação">
            {stages.map((item, index) => <button key={item.label} type="button" onClick={() => updateStage(index)} className={`focus-ring rounded-xl border p-4 text-left transition ${stageIndex === index ? 'dyno-stage-active text-white' : 'border-white/10 bg-black/20 text-slate-400 hover:border-white/30'}`} style={stageIndex === index ? { borderColor: item.accent, backgroundColor: `${item.accent}24` } : undefined} aria-pressed={stageIndex === index}><span className="block font-bold">{item.label}</span><span className="mt-1 block text-xs leading-4">+{Math.round(item.multiplier * 100)}% estimado</span></button>)}
          </div>
          <div className="mt-9"><div className="flex items-end justify-between gap-4"><label htmlFor="potencia" className="font-semibold">Potência original</label><output className="text-3xl font-black text-electric" htmlFor="potencia">{baseHp} <span className="text-sm">CV</span></output></div><input id="potencia" className="mt-4 h-2 w-full cursor-pointer appearance-none rounded-full bg-white/15 accent-fire" type="range" min="100" max="1000" step="10" value={baseHp} onChange={(event) => updateBaseHp(Number(event.target.value))} /></div>
          <p className="mt-3 min-h-5 text-xs text-slate-500">{stage.description}</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-3"><Result label="Potência final" value={result.total} unit="CV" icon={BarChart3} emphasis accent={stage.accent} pulseNonce={pulseNonce} extreme={isExtreme} /><Result label="Ganho estimado" value={result.gain} unit="CV" prefix="+" icon={TimerReset} accent={stage.accent} pulseNonce={pulseNonce} extreme={isExtreme} /><Result label="Torque extra" value={result.torque} unit="Nm" prefix="+" icon={CircleGauge} accent={stage.accent} pulseNonce={pulseNonce} /></div>
          <GarageMatchCard key={garageMatch.id} match={garageMatch} horsepower={result.total} muted={muted} onToggleAudio={() => setMuted((value) => { if (!value) stopAudio(); return !value })} />
          <audio ref={audioRef} className="hidden" preload="auto" />
        </div>
      </div>
    </section>
  )
}

function GarageMatchCard({ match, horsepower, muted, onToggleAudio }: { match: typeof garageMatches[number]; horsepower: number; muted: boolean; onToggleAudio: () => void }) {
  return <article key={match.id} className="garage-match mt-6 overflow-hidden rounded-2xl border border-white/12 bg-black/25"><div className="grid sm:grid-cols-[10rem_1fr]"><div className="relative min-h-44 overflow-hidden bg-black">{garageMatches.map((item) => <img key={item.id} src={item.image} alt={item.id === match.id ? `Referência visual: ${match.model}` : ''} aria-hidden={item.id !== match.id} className={`garage-match-image absolute inset-0 size-full object-cover object-center ${item.id === match.id ? 'opacity-100' : 'opacity-0'}`} loading="lazy" />)}<div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/60 to-transparent" /></div><div className="relative p-5"><div className="flex items-start justify-between gap-4"><div><p className="flex items-center gap-2 text-[10px] font-bold tracking-[.18em] text-electric"><CarFront size={14} /> VEÍCULO DE REFERÊNCIA SUGERIDO</p><h3 className="mt-3 text-lg font-black leading-tight">{match.model}</h3></div><button type="button" onClick={onToggleAudio} className="focus-ring grid size-9 shrink-0 place-items-center rounded-full border border-white/15 bg-white/5 text-electric transition hover:bg-electric hover:text-ink" aria-label={muted ? 'Ativar som de aceleração' : 'Silenciar som de aceleração'} title={muted ? 'Ativar som' : 'Silenciar som'}>{muted ? <VolumeX size={17} /> : <Volume2 size={17} />}</button></div><p className="mt-2 text-sm text-slate-400">{match.category}</p><div className="mt-5 flex flex-wrap items-center gap-3"><span className="text-2xl font-black text-white">{horsepower} <span className="text-xs text-electric">CV</span></span><span className="inline-flex items-center gap-1.5 rounded-full border border-electric/30 bg-electric/10 px-2.5 py-1 text-[10px] font-bold tracking-[.12em] text-electric"><ShieldCheck size={13} /> COMPATÍVEL COM ESTE STAGE</span></div></div></div></article>
}

function Result({ label, value, unit, prefix = '', icon: Icon, emphasis = false, accent, pulseNonce, extreme = false }: { label: string; value: number; unit: string; prefix?: string; icon: typeof BarChart3; emphasis?: boolean; accent: string; pulseNonce: number; extreme?: boolean }) {
  const pulseClass = pulseNonce % 2 === 0 ? 'dyno-impact-a' : 'dyno-impact-b'
  return <div className={`dyno-result ${pulseClass} ${extreme ? 'dyno-extreme' : ''} rounded-xl border p-4 ${emphasis ? 'bg-electric/10' : 'border-white/10 bg-black/20'}`} style={{ '--dyno-accent': accent, borderColor: emphasis ? `${accent}80` : undefined } as CSSProperties}><Icon size={17} className={emphasis ? 'text-electric' : 'text-fire'} /><p className="mt-5 text-xl font-black"><AnimatedValue value={value} prefix={prefix} pulseNonce={pulseNonce} extreme={extreme} /> <span className="text-sm">{unit}</span></p><p className="mt-1 text-xs text-slate-400">{label}</p></div>
}

function AnimatedValue({ value, prefix, pulseNonce, extreme }: { value: number; prefix: string; pulseNonce: number; extreme: boolean }) {
  const outputRef = useRef<HTMLOutputElement>(null)
  const previous = useRef(value)

  useEffect(() => {
    const output = outputRef.current
    if (!output) return
    const from = previous.current
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) {
      output.value = `${prefix}${value}`
      previous.current = value
      return
    }

    let frame = 0
    const startedAt = performance.now()
    const tick = (now: number) => {
      const progress = Math.min(1, (now - startedAt) / 420)
      const eased = 1 - Math.pow(1 - progress, 4)
      output.value = `${prefix}${Math.round(from + (value - from) * eased)}`
      if (progress < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    previous.current = value
    return () => cancelAnimationFrame(frame)
  }, [prefix, value])

  return <output ref={outputRef} className={`dyno-number ${pulseNonce % 2 === 0 ? 'dyno-digit-a' : 'dyno-digit-b'} ${extreme ? 'dyno-number-extreme' : ''}`} aria-label={`${prefix}${value}`}>{prefix}{value}</output>
}
