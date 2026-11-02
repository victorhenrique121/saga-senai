import { BadgeCheck, Gauge, ShieldCheck } from 'lucide-react'

const principles = [
  { icon: ShieldCheck, title: 'Garantia de remap', text: 'Mapas versionados, validação pós-serviço e reversão técnica documentada.' },
  { icon: Gauge, title: 'Diagnóstico OEM', text: 'Leitura de parâmetros em tempo real com ferramentas e protocolos de padrão original.' },
  { icon: BadgeCheck, title: 'Processo certificado', text: 'Checklist de entrega, logs de bancada e rastreabilidade em cada intervenção.' },
]

export function EngineeringStandard() {
  return <section id="engenharia" data-reveal className="reveal px-[4%] py-24 sm:py-32"><div className="mx-auto max-w-300"><div className="mx-auto max-w-2xl text-center"><p className="text-xs font-bold tracking-[.24em] text-fire">ENGINEERING STANDARD / 07</p><h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">Confiança é parte<br />da performance.</h2><p className="mt-5 leading-7 text-slate-400">Engenharia mensurável, equipamentos corretos e uma entrega que permanece transparente depois da ignição.</p></div><div className="mt-12 grid gap-4 md:grid-cols-3">{principles.map(({ icon: Icon, title, text }) => <article key={title} className="surface group rounded-2xl p-7 transition duration-500 hover:-translate-y-2 hover:border-electric/40"><span className="grid size-12 place-items-center rounded-xl bg-electric/10 text-electric transition group-hover:bg-electric group-hover:text-ink"><Icon size={24} /></span><h3 className="mt-10 text-xl font-bold">{title}</h3><p className="mt-3 text-sm leading-6 text-slate-400">{text}</p></article>)}</div></div></section>
}
