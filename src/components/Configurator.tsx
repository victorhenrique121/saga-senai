import { BarChart3, CircleGauge, SlidersHorizontal, TimerReset } from 'lucide-react'
import { useMemo, useState } from 'react'

const stages = [
  { label: 'Stage 1', multiplier: 0.16, description: 'Software refinado, resposta imediata.' },
  { label: 'Stage 2', multiplier: 0.28, description: 'Hardware + calibração de alta entrega.' },
  { label: 'Stage 3', multiplier: 0.42, description: 'Projeto extremo para pista e rua.' },
]

export function Configurator() {
  const [stageIndex, setStageIndex] = useState(0)
  const [baseHp, setBaseHp] = useState(280)
  const stage = stages[stageIndex]
  const result = useMemo(() => {
    const gain = Math.round(baseHp * stage.multiplier)
    return { gain, total: baseHp + gain, torque: Math.round(gain * 1.52) }
  }, [baseHp, stage.multiplier])

  return (
    <section id="simulador" className="relative overflow-hidden px-[4%] py-24 sm:py-32">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_85%_35%,#ff4d2e20,transparent_30%),radial-gradient(circle_at_10%_80%,#55d8ff18,transparent_25%)]" />
      <div className="mx-auto grid max-w-300 gap-10 lg:grid-cols-[.85fr_1.15fr] lg:gap-20">
        <div><p className="text-xs font-bold tracking-[.24em] text-electric">DYNO LAB / 03</p><h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">Sinta os números<br />ganharem vida.</h2><p className="mt-6 max-w-md leading-7 text-slate-400">Projete uma estimativa de evolução. O resultado final depende da plataforma, combustível, componentes e validação em dinamômetro.</p><div className="mt-10 flex gap-3 text-sm text-slate-300"><CircleGauge className="shrink-0 text-fire" /><span>Simulação orientativa. A potência real é certificada no nosso laboratório.</span></div></div>
        <div className="surface rounded-[1.75rem] p-6 sm:p-9">
          <div className="mb-9 flex items-center gap-3"><span className="grid size-10 place-items-center rounded-full bg-electric/10 text-electric"><SlidersHorizontal size={19} /></span><div><p className="font-bold">Configurador de performance</p><p className="text-xs text-slate-500">Ajuste a potência de fábrica e o estágio.</p></div></div>
          <div className="grid gap-3 sm:grid-cols-3" role="group" aria-label="Escolha o estágio de preparação">
            {stages.map((item, index) => <button key={item.label} type="button" onClick={() => setStageIndex(index)} className={`focus-ring rounded-xl border p-4 text-left transition ${stageIndex === index ? 'border-fire bg-fire/15 text-white' : 'border-white/10 bg-black/20 text-slate-400 hover:border-white/30'}`} aria-pressed={stageIndex === index}><span className="block font-bold">{item.label}</span><span className="mt-1 block text-xs leading-4">+{Math.round(item.multiplier * 100)}% estimado</span></button>)}
          </div>
          <div className="mt-9"><div className="flex items-end justify-between gap-4"><label htmlFor="potencia" className="font-semibold">Potência original</label><output className="text-3xl font-black text-electric" htmlFor="potencia">{baseHp} <span className="text-sm">CV</span></output></div><input id="potencia" className="mt-4 h-2 w-full cursor-pointer appearance-none rounded-full bg-white/15 accent-fire" type="range" min="100" max="1000" step="10" value={baseHp} onChange={(event) => setBaseHp(Number(event.target.value))} /></div>
          <p className="mt-3 min-h-5 text-xs text-slate-500">{stage.description}</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-3"><Result label="Potência final" value={`${result.total} CV`} icon={BarChart3} emphasis /><Result label="Ganho estimado" value={`+${result.gain} CV`} icon={TimerReset} /><Result label="Torque extra" value={`+${result.torque} Nm`} icon={CircleGauge} /></div>
        </div>
      </div>
    </section>
  )
}

function Result({ label, value, icon: Icon, emphasis = false }: { label: string; value: string; icon: typeof BarChart3; emphasis?: boolean }) {
  return <div className={`rounded-xl border p-4 ${emphasis ? 'border-electric/30 bg-electric/10' : 'border-white/10 bg-black/20'}`}><Icon size={17} className={emphasis ? 'text-electric' : 'text-fire'} /><p className="mt-5 text-xl font-black">{value}</p><p className="mt-1 text-xs text-slate-400">{label}</p></div>
}
