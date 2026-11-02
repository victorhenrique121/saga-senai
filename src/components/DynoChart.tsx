import { useMemo, useState } from 'react'
import { Area, AreaChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

type Stage = 'Original' | 'Stage 1' | 'Stage 2'
const stages: Record<Stage, { hp: number; torque: number }> = { Original: { hp: 230, torque: 350 }, 'Stage 1': { hp: 290, torque: 440 }, 'Stage 2': { hp: 330, torque: 500 } }

export function DynoChart() {
  const [stage, setStage] = useState<Stage>('Stage 1')
  const data = useMemo(() => {
    const peak = stages[stage]
    return Array.from({ length: 13 }, (_, index) => {
      const rpm = 2000 + index * 450
      const progress = index / 12
      const hp = Math.round(peak.hp * Math.sin(progress * Math.PI * .92) * Math.min(1, progress * 2.6))
      const torque = Math.round(peak.torque * Math.sin(progress * Math.PI * .78 + .45) * Math.min(1, progress * 3.3))
      return { rpm: `${(rpm / 1000).toFixed(1)}k`, hp: Math.max(0, hp), torque: Math.max(0, torque) }
    })
  }, [stage])
  return <section id="dyno" data-reveal className="reveal border-y border-white/10 bg-panel/45 px-[4%] py-24 sm:py-32"><div className="mx-auto grid max-w-300 gap-10 lg:grid-cols-[.72fr_1.28fr] lg:items-center lg:gap-16"><div><p className="text-xs font-bold tracking-[.24em] text-electric">DYNO DYNAMICS / 03</p><h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">Potência que<br />você enxerga.</h2><p className="mt-6 max-w-md leading-7 text-slate-400">Simule a curva de uma puxada em dinamômetro. Os números ilustram a evolução estimada de potência e torque por estágio.</p><div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Selecionar estágio do dinamômetro">{(Object.keys(stages) as Stage[]).map((item) => <button key={item} type="button" aria-pressed={stage === item} onClick={() => setStage(item)} className={`focus-ring rounded-full px-4 py-2 text-sm font-bold transition ${stage === item ? 'bg-fire text-white shadow-lg shadow-fire/20' : 'border border-white/15 text-slate-400 hover:border-white/35 hover:text-white'}`}>{item}</button>)}</div><div className="mt-8 grid grid-cols-2 gap-3"><Stat label="PICO DE POTÊNCIA" value={`${stages[stage].hp} CV`} /><Stat label="PICO DE TORQUE" value={`${stages[stage].torque} NM`} /></div></div><div className="surface h-[370px] rounded-[1.75rem] p-4 sm:h-[440px] sm:p-7"><ResponsiveContainer width="100%" height="100%"><AreaChart data={data} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}><defs><linearGradient id="hpFill" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#ff4d2e" stopOpacity={.45} /><stop offset="100%" stopColor="#ff4d2e" stopOpacity={0} /></linearGradient><linearGradient id="torqueFill" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#55d8ff" stopOpacity={.35} /><stop offset="100%" stopColor="#55d8ff" stopOpacity={0} /></linearGradient></defs><CartesianGrid stroke="#ffffff14" vertical={false} /><XAxis dataKey="rpm" tickLine={false} axisLine={false} tick={{ fill: '#94a3b8', fontSize: 11 }} /><YAxis tickLine={false} axisLine={false} tick={{ fill: '#94a3b8', fontSize: 11 }} /><Tooltip contentStyle={{ background: '#10131d', border: '1px solid #ffffff1f', borderRadius: 12 }} labelStyle={{ color: '#94a3b8' }} /><Legend wrapperStyle={{ paddingTop: 18, fontSize: 12 }} /><Area type="monotone" dataKey="hp" name="Potência (CV)" stroke="#ff4d2e" strokeWidth={3} fill="url(#hpFill)" isAnimationActive animationDuration={550} /><Area type="monotone" dataKey="torque" name="Torque (Nm)" stroke="#55d8ff" strokeWidth={3} fill="url(#torqueFill)" isAnimationActive animationDuration={550} /></AreaChart></ResponsiveContainer></div></div></section>
}
function Stat({ label, value }: { label: string; value: string }) { return <div className="rounded-xl border border-white/10 bg-black/20 p-4"><p className="text-[10px] font-bold tracking-[.14em] text-slate-500">{label}</p><p className="mt-2 text-xl font-black text-white">{value}</p></div> }
