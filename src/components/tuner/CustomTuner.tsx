import { Save, SlidersHorizontal } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { tunerParts, type FocusArea, type TunerPart } from '../../data/tunerParts'
import { getUserProjects, saveTunerProject, type TunerProject } from '../../lib/supabaseTuner'
import { CarFocusViewer } from './CarFocusViewer'
import { PartsSelector } from './PartsSelector'
import { PerformanceSpecs } from './PerformanceSpecs'
import { SavedProjects } from './SavedProjects'

export function CustomTuner() {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(() => new Set(['stage-1']))
  const [hoveredPart, setHoveredPart] = useState<TunerPart | null>(null)
  const [projects, setProjects] = useState<TunerProject[]>([])
  const [source, setSource] = useState<'supabase' | 'local'>('local')
  const [toast, setToast] = useState('')
  const selectedParts = useMemo(() => tunerParts.filter((part) => selectedIds.has(part.id)), [selectedIds])
  const specs = useMemo(() => selectedParts.reduce((total, part) => ({ hpGain: total.hpGain + part.hpGain, torqueGain: total.torqueGain + part.torqueGain, totalPrice: total.totalPrice + part.price }), { hpGain: 0, torqueGain: 0, totalPrice: 0 }), [selectedParts])
  useEffect(() => { getUserProjects().then(({ projects: saved, source: storage }) => { setProjects(saved); setSource(storage) }) }, [])
  const togglePart = (part: TunerPart) => setSelectedIds((previous) => { const next = new Set(previous); next.has(part.id) ? next.delete(part.id) : next.add(part.id); return next })
  const focusArea = (area: FocusArea | null) => setHoveredPart(area ? selectedParts.find((part) => part.focusArea === area) ?? tunerParts.find((part) => part.focusArea === area) ?? null : null)
  const save = async () => { const result = await saveTunerProject({ name: `Panamera Turbo · ${selectedParts.length} peças`, parts: selectedParts, ...specs }); setProjects((previous) => [result.project, ...previous.filter((project) => project.id !== result.project.id)].slice(0, 8)); setSource(result.source); setToast(result.source === 'supabase' ? 'Projeto salvo na sua garagem Supabase.' : 'Supabase indisponível: projeto salvo neste dispositivo.'); window.setTimeout(() => setToast(''), 4200) }
  return <section id="tunador" data-reveal className="reveal border-y border-white/10 bg-panel/45 px-[4%] py-24 sm:py-32"><div className="mx-auto max-w-300"><div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="flex items-center gap-2 text-xs font-bold tracking-[.24em] text-fire"><SlidersHorizontal size={15} /> CUSTOM TUNER / 08</p><h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">Seu projeto.<br />Suas regras.</h2></div><p className="max-w-sm text-slate-400">Filtre modificações, veja onde cada peça atua e salve sua garagem personalizada.</p></div><div className="grid gap-6 xl:grid-cols-[.95fr_1.05fr]"><div className="surface max-h-[720px] overflow-y-auto rounded-2xl p-5 sm:p-7"><PartsSelector parts={tunerParts} selectedIds={selectedIds} activePart={hoveredPart} onToggle={togglePart} onFocusPart={setHoveredPart} /></div><div className="space-y-5"><CarFocusViewer activePart={hoveredPart} onFocusArea={focusArea} /><div className="grid gap-5 lg:grid-cols-2"><PerformanceSpecs {...specs} /><div className="space-y-5"><button type="button" onClick={save} className="focus-ring inline-flex w-full items-center justify-center gap-2 rounded-xl bg-fire px-5 py-4 font-bold transition hover:-translate-y-0.5 hover:bg-[#ff684c]"><Save size={18} /> Salvar meu projeto</button>{toast ? <p className="rounded-xl border border-electric/30 bg-electric/10 p-3 text-sm text-slate-100" role="status">{toast}</p> : null}<SavedProjects projects={projects} source={source} /></div></div></div></div></div></section>
}
