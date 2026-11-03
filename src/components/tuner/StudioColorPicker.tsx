import { Check, Paintbrush } from 'lucide-react'
import type { ProjectColor } from '../../lib/supabaseTuner'

const colors: { id: ProjectColor; name: string; swatch: string }[] = [
  { id: 'ferrari-red', name: 'Vermelho Ferrari', swatch: '#d91b2b' },
  { id: 'emerald-blue', name: 'Azul Esmeralda', swatch: '#035a8c' },
  { id: 'stealth-black', name: 'Preto Fosco', swatch: '#17191d' },
  { id: 'nardo-grey', name: 'Cinza Nardo', swatch: '#8d9298' },
  { id: 'pearl-white', name: 'Branco Pérola', swatch: '#f0ece3' },
]

export function StudioColorPicker({ value, onChange }: { value: ProjectColor; onChange: (color: ProjectColor) => void }) {
  return <fieldset className="absolute bottom-5 right-5 z-10 rounded-2xl border border-white/15 bg-ink/80 p-3 backdrop-blur-xl"><legend className="sr-only">Cor da carroceria</legend><div className="flex items-center gap-2" role="radiogroup" aria-label="Cor da carroceria"><Paintbrush size={15} className="text-electric" /><span className="mr-1 text-[10px] font-bold tracking-[.14em] text-slate-400">ACABAMENTO</span>{colors.map((color) => <button key={color.id} type="button" role="radio" aria-checked={value === color.id} aria-label={color.name} title={color.name} onClick={() => onChange(color.id)} className={`focus-ring grid size-7 place-items-center rounded-full border-2 transition hover:scale-110 ${value === color.id ? 'border-white shadow-[0_0_0_3px_#55d8ff55]' : 'border-transparent'}`} style={{ backgroundColor: color.swatch }}>{value === color.id ? <Check size={13} className={color.id === 'pearl-white' || color.id === 'nardo-grey' ? 'text-ink' : 'text-white'} /> : null}</button>)}</div></fieldset>
}
