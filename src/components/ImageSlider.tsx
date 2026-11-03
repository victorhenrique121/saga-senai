import { ArrowLeft, ArrowRight, ArrowUpRight, CircleDot, Sparkles } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'

const projects = [
  { eyebrow: 'PROJETO 01 / HERITAGE', title: 'Linha, proporção e presença.', description: 'Um clássico reinterpretado com pintura profunda, rodas forjadas e uma postura contemporânea sem perder a assinatura original.', image: 'img/carro2.jpg', alt: 'Cupê esportivo clássico com acabamento premium estacionado em uma estrada', detail: 'Pintura multiestágio · rodas forjadas · acabamento cerâmico' },
  { eyebrow: 'PROJETO 02 / CABINE', title: 'Matéria-prima em primeiro plano.', description: 'Couro selecionado, costura artesanal e comandos refeitos para uma cabine que envelhece com a mesma dignidade do carro.', image: 'https://images.unsplash.com/photo-1504215680853-026ed2a45def?auto=format&fit=crop&w=1800&q=90', alt: 'Interior de carro esportivo com acabamento refinado', detail: 'Couro natural · costura manual · instrumentação recalibrada' },
  { eyebrow: 'PROJETO 03 / POWERTRAIN', title: 'Mecânica à altura do acabamento.', description: 'Cofre limpo, rotas térmicas estudadas e componentes selecionados para entregar resposta precisa em toda a faixa útil.', image: 'https://images.unsplash.com/photo-1486754735734-325b5831c3ad?auto=format&fit=crop&w=1800&q=90', alt: 'Detalhe de motor automotivo preparado e impecavelmente limpo', detail: 'Gestão eletrônica · admissão sob medida · validação em dinamômetro' },
  { eyebrow: 'PROJETO 04 / FINISH', title: 'Profundidade que muda a cada ângulo.', description: 'O último milímetro importa: correção de pintura, alinhamento de painéis e uma camada de proteção pensada para durar.', image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1800&q=90', alt: 'Automóvel clássico com pintura brilhante fotografado ao entardecer', detail: 'Correção de pintura · proteção cerâmica · entrega de coleção' },
] as const

export function ImageSlider() {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeProject = projects[activeIndex]
  const move = useCallback((direction: 1 | -1) => setActiveIndex((current) => (current + direction + projects.length) % projects.length), [])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === 'ArrowLeft') move(-1); if (event.key === 'ArrowRight') move(1) }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [move])

  return <section id="restauracao" data-reveal className="reveal overflow-hidden bg-panel/40 px-[4%] py-24 sm:py-32"><div className="mx-auto max-w-300">
    <div className="mb-10 flex flex-col justify-between gap-6 lg:mb-14 lg:flex-row lg:items-end"><div className="max-w-xl"><p className="flex items-center gap-2 text-xs font-bold tracking-[.24em] text-fire"><Sparkles size={14} /> RESTOMOD STUDIO / 04</p><h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">Clássicos reimaginados<br />para a próxima geração.</h2></div><p className="max-w-md leading-7 text-slate-400">Uma seleção de momentos que define o nosso processo: proporção, matéria-prima, engenharia e acabamento de coleção.</p></div>
    <div className="surface overflow-hidden rounded-[2rem] p-2 sm:p-3"><div className="relative isolate min-h-135 overflow-hidden rounded-[1.55rem] bg-ink sm:min-h-155">
      {projects.map((project, index) => <img key={project.image} src={project.image} alt={project.alt} className={`absolute inset-0 size-full object-cover transition-[opacity,transform] duration-700 ease-out ${index === activeIndex ? 'scale-100 opacity-100' : 'scale-105 opacity-0'}`} loading={index === 0 ? 'eager' : 'lazy'} />)}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,9,15,.9)_0%,rgba(7,9,15,.5)_40%,rgba(7,9,15,.08)_75%),linear-gradient(0deg,rgba(7,9,15,.75),transparent_55%)]" />
      <div className="relative z-10 flex min-h-135 flex-col justify-end p-6 sm:min-h-155 sm:p-10 lg:p-14"><p className="flex items-center gap-2 text-xs font-bold tracking-[.22em] text-electric"><CircleDot size={14} /> {activeProject.eyebrow}</p><h3 className="mt-4 max-w-xl text-3xl font-black tracking-tight sm:text-5xl">{activeProject.title}</h3><p className="mt-5 max-w-xl leading-7 text-slate-300">{activeProject.description}</p><div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm font-semibold text-white"><span className="border-l-2 border-fire pl-3">{activeProject.detail}</span><a href="#contato" className="focus-ring inline-flex items-center gap-2 rounded-lg text-electric transition hover:text-white">Iniciar um projeto <ArrowUpRight size={16} /></a></div></div>
      <div className="absolute right-5 top-5 z-20 flex gap-2 sm:right-7 sm:top-7"><button type="button" onClick={() => move(-1)} aria-label="Projeto anterior" className="focus-ring grid size-11 place-items-center rounded-full border border-white/20 bg-black/25 text-white backdrop-blur-xl transition hover:border-electric/70 hover:bg-white/15"><ArrowLeft size={18} /></button><button type="button" onClick={() => move(1)} aria-label="Próximo projeto" className="focus-ring grid size-11 place-items-center rounded-full border border-white/20 bg-black/25 text-white backdrop-blur-xl transition hover:border-electric/70 hover:bg-white/15"><ArrowRight size={18} /></button></div>
      <div className="absolute bottom-6 right-6 z-20 flex items-center gap-2 sm:bottom-9 sm:right-10" role="tablist" aria-label="Selecionar projeto restomod">{projects.map((project, index) => <button key={project.eyebrow} type="button" role="tab" aria-selected={index === activeIndex} aria-label={`Ver ${project.eyebrow}`} onClick={() => setActiveIndex(index)} className={`focus-ring h-2.5 rounded-full transition-all ${index === activeIndex ? 'w-9 bg-fire shadow-[0_0_16px_#ff4d2e]' : 'w-2.5 bg-white/40 hover:bg-white'}`} />)}</div>
    </div></div>
  </div></section>
}
