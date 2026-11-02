import { BatteryCharging, Cog, Gauge, ShieldCheck, Wrench, Zap } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

type Service = { icon: LucideIcon; index: string; title: string; text: string }
const services: Service[] = [
  { icon: Gauge, index: '01', title: 'Performance sob medida', text: 'Mapeamento eletrônico e acerto fino para uma entrega de potência consistente.' },
  { icon: Cog, index: '02', title: 'Mecânica de precisão', text: 'Manutenção criteriosa dos sistemas que fazem sua máquina responder.' },
  { icon: ShieldCheck, index: '03', title: 'Freios & suspensão', text: 'Controle absoluto para que toda aceleração venha com segurança.' },
  { icon: Wrench, index: '04', title: 'Revisão premium', text: 'Inspeção completa com transparência técnica do início ao fim.' },
  { icon: BatteryCharging, index: '05', title: 'Sistema elétrico', text: 'Diagnóstico eletrônico avançado para eliminar incertezas.' },
  { icon: Zap, index: '06', title: 'Stage customizado', text: 'Evolução mensurável, desenvolvida para o seu motor e objetivo.' },
]

export function Services() {
  return (
    <section id="servicos" data-reveal className="reveal border-y border-white/10 bg-panel/55 px-[4%] py-24 sm:py-32">
      <div className="mx-auto max-w-300">
        <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><p className="text-xs font-bold tracking-[.24em] text-fire">O QUE DOMINAMOS / 02</p><h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">Técnica, estética<br />e obsessão.</h2></div><p className="max-w-sm text-slate-400">Cada intervenção combina dados, experiência de pista e acabamento sem concessões.</p></div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {services.map(({ icon: Icon, index, title, text }) => <article key={index} className="surface group rounded-2xl p-7 transition duration-300 hover:-translate-y-2 hover:border-fire/50 hover:bg-white/[.07]"><div className="flex items-start justify-between"><span className="grid size-12 place-items-center rounded-xl bg-fire/10 text-fire transition group-hover:bg-fire group-hover:text-white"><Icon size={23} /></span><span className="font-mono text-xs text-slate-500">{index}</span></div><h3 className="mt-12 text-xl font-bold">{title}</h3><p className="mt-3 text-sm leading-6 text-slate-400">{text}</p></article>)}
        </div>
      </div>
    </section>
  )
}
