import { ArrowDownRight, Gauge, ShieldCheck, Sparkles } from 'lucide-react'

const metrics = [
  { value: '+180', label: 'projetos entregues' },
  { value: '98%', label: 'precisão em bancada' },
  { value: '24h', label: 'retorno técnico' },
]

export function Hero() {
  return (
    <section id="inicio" data-reveal className="reveal relative isolate min-h-[calc(100vh-5rem)] overflow-hidden px-[4%] pb-16 pt-20 sm:pt-28">
      <div className="absolute inset-0 -z-20 grid-glow opacity-60" />
      <div className="absolute -left-40 top-10 -z-10 size-[30rem] rounded-full bg-fire/20 blur-[120px] animate-drift" />
      <div className="absolute right-0 top-28 -z-10 size-[26rem] rounded-full bg-electric/15 blur-[120px] animate-drift" />
      <div className="mx-auto grid w-full max-w-300 items-center gap-14 lg:grid-cols-[1.08fr_.92fr]">
        <div>
          <p className="mb-6 flex items-center gap-2 text-xs font-bold tracking-[0.24em] text-electric"><Sparkles size={15} /> PERFORMANCE ENGINEERING / 01</p>
          <h1 className="max-w-4xl text-5xl font-black leading-[0.95] tracking-[-0.065em] sm:text-7xl lg:text-8xl"><span className="text-gradient cinema-gradient">Seu carro,</span><br />fora da curva.</h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-slate-300">Diagnóstico de precisão, calibração inteligente e engenharia automotiva para transformar potência em uma experiência memorável.</p>
          <div className="mt-9 flex flex-wrap gap-4">
            <a href="#simulador" className="focus-ring group inline-flex items-center gap-3 rounded-full bg-fire px-6 py-4 font-bold transition hover:-translate-y-1 hover:bg-[#ff684c]">Simular performance <ArrowDownRight className="transition-transform group-hover:translate-x-1 group-hover:translate-y-1" /></a>
            <a href="#servicos" className="focus-ring inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-6 py-4 font-bold backdrop-blur transition hover:border-white/35 hover:bg-white/10">Conhecer método</a>
          </div>
          <dl className="mt-16 grid max-w-xl grid-cols-3 gap-5 border-t border-white/10 pt-7">
            {metrics.map((metric) => <div key={metric.label}><dt className="text-2xl font-black tracking-tight sm:text-3xl">{metric.value}</dt><dd className="mt-1 text-xs leading-5 text-slate-400">{metric.label}</dd></div>)}
          </dl>
        </div>
        <div className="relative mx-auto w-full max-w-lg">
          <div className="animate-pulse-ring absolute inset-4 rounded-[2.5rem] border border-electric/30" />
          <div className="surface relative overflow-hidden rounded-[2rem] p-3">
            <img className="h-[470px] w-full rounded-[1.5rem] object-cover object-center grayscale-[20%]" src=".../img/carro1.jpg" alt="Carro esportivo de alta performance em uma estrada" fetchPriority="high" />
            <div className="absolute inset-3 bg-gradient-to-t from-ink/90 via-transparent to-transparent" />
            <div className="absolute bottom-9 left-9 right-9 flex items-end justify-between"><div><p className="text-xs font-bold tracking-[.2em] text-electric">LABORATÓRIO / SP</p><p className="mt-2 text-2xl font-black">Precisão que acelera.</p></div><Gauge className="size-11 text-fire" /></div>
          </div>
          <div className="surface absolute -bottom-7 -left-5 flex items-center gap-3 rounded-2xl px-4 py-3 sm:-left-11"><ShieldCheck className="text-electric" /><span className="text-xs font-bold leading-5">Diagnóstico<br />de verdade</span></div>
        </div>
      </div>
    </section>
  )
}
