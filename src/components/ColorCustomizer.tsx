import { Check, Paintbrush, Sparkles, ZoomIn } from 'lucide-react'
import { useState, type CSSProperties } from 'react'
import { ImageModal } from './ImageModal'

type PaintOption = { id: string; name: string; finish: string; swatch: string; image: string; buttonText: string }
const paints: PaintOption[] = [
  { id: 'ferrari-red', name: 'Vermelho Ferrari', finish: 'Verniz cerâmico de alto brilho', swatch: '#d91b2b', image: '/img/car_colorredferrari.jpg', buttonText: '#ffffff' },
  { id: 'emerald-blue', name: 'Azul Esmeralda', finish: 'Metalizado profundo com flake fino', swatch: '#035a8c', image: '/img/car_colorblue.jpg', buttonText: '#ffffff' },
  { id: 'stealth-black', name: 'Preto Fosco Stealth', finish: 'PPF acetinado com proteção UV', swatch: '#17191d', image: '/img/car_colorblack.png', buttonText: '#ffffff' },
  { id: 'nardo-grey', name: 'Cinza Nardo', finish: 'Verniz cerâmico acetinado', swatch: '#8d9298', image: '/img/car_colorgray.jpg', buttonText: '#18181b' },
  { id: 'pearl-white', name: 'Branco Pérola', finish: 'Perolizado tricamada premium', swatch: '#f0ece3', image: '/img/car_colorwhite.jpg', buttonText: '#18181b' },
]

export function ColorCustomizer() {
  const [selectedId, setSelectedId] = useState(paints[0].id)
  const [modalOpen, setModalOpen] = useState(false)
  const [paintPulse, setPaintPulse] = useState(0)
  const selected = paints.find((paint) => paint.id === selectedId) ?? paints[0]
  const alt = `Porsche Panamera Turbo com acabamento ${selected.name}`
  const selectPaint = (id: string) => {
    if (id === selectedId) return
    setSelectedId(id)
    setPaintPulse((value) => value + 1)
  }
  const paintStyle = { '--paint-accent': selected.swatch } as CSSProperties
  const buttonStyle = { ...paintStyle, color: selected.buttonText } as CSSProperties

  return (
    <section id="estetica" data-reveal className="reveal signature-wipe relative overflow-hidden bg-panel/40 px-[4%] py-20 sm:py-24">
      <div className="absolute -right-40 top-0 -z-10 size-96 rounded-full bg-fire/10 blur-[120px]" />
      <div className="mx-auto grid max-w-300 gap-10 lg:grid-cols-[1.15fr_.85fr] lg:items-center lg:gap-16">
        <div className="surface paint-showcase overflow-hidden rounded-[2rem] p-2 sm:p-3">
          <div className="group relative aspect-[16/10] overflow-hidden rounded-[1.4rem] bg-black" style={paintStyle}>
            {paints.map((paint) => <img key={paint.id} src={paint.image} alt={paint.id === selectedId ? alt : ''} aria-hidden={paint.id !== selectedId} className={`paint-image-layer absolute inset-0 size-full object-cover object-center ${paint.id === selectedId ? 'paint-image-active' : 'pointer-events-none paint-image-idle'}`} loading="eager" />)}
            <span key={paintPulse} className="paint-change-flash" aria-hidden="true" />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(105deg,rgba(255,255,255,.12),transparent_28%,transparent_70%,rgba(0,0,0,.3))]" />
            <button type="button" onClick={() => setModalOpen(true)} className="focus-ring absolute right-4 top-4 grid size-11 place-items-center rounded-full border border-white/25 bg-ink/70 text-white opacity-100 backdrop-blur transition hover:bg-fire sm:opacity-0 sm:group-hover:opacity-100" aria-label="Ampliar foto do veículo"><ZoomIn size={20} /></button>
            <div className="absolute bottom-5 left-5 rounded-full border border-white/20 bg-ink/75 px-4 py-2 text-xs font-bold tracking-[.14em] text-white backdrop-blur">LIVE FINISH // {selected.name.toUpperCase()}</div>
          </div>
        </div>
        <div><p className="flex items-center gap-2 text-xs font-bold tracking-[.24em] text-fire"><Paintbrush size={15} /> ESTÉTICA CUSTOM / 04</p><h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">Pinte a sua<br />assinatura.</h2><p className="mt-6 max-w-md leading-7 text-slate-400">Escolha uma paleta de alto padrão e visualize instantaneamente seu Panamera Turbo preparado.</p><fieldset className="mt-8"><legend className="text-sm font-bold text-slate-200">Selecione a pintura</legend><div className="mt-4 flex flex-wrap gap-3" role="radiogroup" aria-label="Paleta de pinturas premium">{paints.map((paint) => <button key={paint.id} type="button" role="radio" aria-checked={paint.id === selected.id} onClick={() => selectPaint(paint.id)} className={`focus-ring grid size-11 place-items-center rounded-full border-2 transition hover:scale-110 ${paint.id === selected.id ? 'border-white' : 'border-transparent'}`} style={{ backgroundColor: paint.swatch, boxShadow: paint.id === selected.id ? `0 0 0 4px ${paint.swatch}66` : undefined }} title={paint.name}><span className="sr-only">{paint.name}</span>{paint.id === selected.id ? <Check size={17} className={paint.id === 'pearl-white' || paint.id === 'nardo-grey' ? 'text-ink' : 'text-white'} /> : null}</button>)}</div></fieldset><div className="mt-8 rounded-2xl border border-white/10 bg-black/20 p-5"><div className="flex items-start gap-3"><Sparkles className="mt-0.5 shrink-0 text-electric" size={19} /><div><p className="text-xs font-bold tracking-[.16em] text-slate-500">ACABAMENTO SELECIONADO</p><p className="mt-2 text-lg font-black">{selected.name}</p><p className="mt-1 text-sm text-slate-400">{selected.finish}</p></div></div></div><a href="#contato" style={buttonStyle} className="paint-apply focus-ring mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-4 font-bold">Aplicar esta cor ao meu orçamento <Paintbrush size={18} /></a></div>
      </div>
      <ImageModal open={modalOpen} src={selected.image} alt={alt} caption={`${selected.name} — ${selected.finish}`} onClose={() => setModalOpen(false)} />
    </section>
  )
}
