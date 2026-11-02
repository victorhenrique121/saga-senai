import { CirclePlay, Search, Volume2, X } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { vehicles, type Vehicle } from '../data/vehicles'

const brl = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 })

export function CarSearch() {
  const [query, setQuery] = useState('')
  const [playingId, setPlayingId] = useState<string | null>(null)
  const [audioError, setAudioError] = useState('')
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const results = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase('pt-BR')
    if (!normalized) return vehicles
    return vehicles.filter((vehicle) => `${vehicle.brand} ${vehicle.model} ${vehicle.engine}`.toLocaleLowerCase('pt-BR').includes(normalized))
  }, [query])

  useEffect(() => () => { audioRef.current?.pause() }, [])

  const playEngine = async (vehicle: Vehicle) => {
    if (playingId === vehicle.id && audioRef.current) {
      audioRef.current.pause()
      setPlayingId(null)
      return
    }
    try {
      setAudioError('')
      audioRef.current?.pause()
      const audio = new Audio(vehicle.engineAudioUrl)
      audioRef.current = audio
      const reportAudioError = () => {
        setPlayingId(null)
        setAudioError(`O ronco do ${vehicle.model} não está disponível no momento. Tente novamente mais tarde.`)
      }
      audio.addEventListener('error', reportAudioError, { once: true })
      audio.addEventListener('ended', () => setPlayingId(null), { once: true })
      await audio.play().then(() => setPlayingId(vehicle.id)).catch((error: unknown) => {
        reportAudioError()
        throw error
      })
    } catch {
      setPlayingId(null)
    }
  }

  return <section id="catalogo" data-reveal className="reveal px-[4%] py-24 sm:py-32"><div className="mx-auto max-w-300"><div className="flex flex-col justify-between gap-7 md:flex-row md:items-end"><div><p className="text-xs font-bold tracking-[.24em] text-electric">GARAGEM SELETA / 05</p><h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">Encontre a sua<br />máquina.</h2></div><p className="max-w-sm text-slate-400">Fichas técnicas, evolução por estágio e a personalidade de cada motor.</p></div><div className="surface mt-10 flex items-center gap-3 rounded-2xl px-4 py-3 transition hover:border-electric/40"><Search className="text-electric" size={20} /><label className="sr-only" htmlFor="busca-veiculo">Buscar veículo</label><input id="busca-veiculo" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Busque por marca, modelo ou motorização" className="w-full bg-transparent text-sm outline-none placeholder:text-slate-500" />{query ? <button className="focus-ring rounded p-1 text-slate-400 hover:text-white" type="button" onClick={() => setQuery('')} aria-label="Limpar busca"><X size={18} /></button> : null}</div>{audioError ? <p className="mt-4 rounded-xl border border-fire/35 bg-fire/10 px-4 py-3 text-sm text-red-100" role="alert">{audioError}</p> : null}<div className="mt-6 grid gap-5 lg:grid-cols-2">{results.map((vehicle) => <VehicleCard key={vehicle.id} vehicle={vehicle} playing={playingId === vehicle.id} onPlay={playEngine} />)}</div>{results.length === 0 ? <p className="mt-8 rounded-2xl border border-white/10 p-8 text-center text-slate-400">Nenhuma máquina encontrada. Tente buscar por “Golf”, “Civic” ou “Opala”.</p> : null}</div></section>
}

function VehicleCard({ vehicle, playing, onPlay }: { vehicle: Vehicle; playing: boolean; onPlay: (vehicle: Vehicle) => void }) {
  return <article className="surface overflow-hidden rounded-2xl transition duration-500 hover:-translate-y-1 hover:border-electric/35"><img src={vehicle.imageUrl} alt={`${vehicle.brand} ${vehicle.model}`} className="h-48 w-full object-cover transition duration-700 hover:scale-105" loading="lazy" /><div className="p-6"><div className="flex items-start justify-between gap-4"><div><p className="text-xs font-bold tracking-[.18em] text-fire">{vehicle.brand.toUpperCase()} / {vehicle.year}</p><h3 className="mt-2 text-2xl font-black">{vehicle.model}</h3></div><button type="button" aria-pressed={playing} onClick={() => onPlay(vehicle)} className={`focus-ring grid size-11 shrink-0 place-items-center rounded-full transition ${playing ? 'bg-fire text-white' : 'bg-electric/10 text-electric hover:bg-electric hover:text-ink'}`} title={playing ? 'Pausar ronco do motor' : 'Reproduzir ronco do motor'}>{playing ? <Volume2 size={20} /> : <CirclePlay size={20} />}</button></div><p className="mt-3 text-sm text-slate-400">{vehicle.engine}</p><dl className="mt-6 grid grid-cols-3 divide-x divide-white/10 rounded-xl border border-white/10 bg-black/20"><Power label="Original" value={vehicle.originalHp} /><Power label="Stage 1" value={vehicle.stage1Hp} accent /><Power label="Stage 2" value={vehicle.stage2Hp} accent /></dl><p className="mt-5 text-sm leading-6 text-slate-400">{vehicle.technicalDescription}</p><div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4 text-sm"><span className="text-slate-500">Preparação estimada</span><strong className="text-electric">a partir de {brl.format(vehicle.estimatedPrepPrice)}</strong></div></div></article>
}

function Power({ label, value, accent = false }: { label: string; value: number; accent?: boolean }) { return <div className="px-3 py-3 text-center"><dt className="text-[10px] font-bold tracking-wider text-slate-500">{label}</dt><dd className={`mt-1 text-sm font-black ${accent ? 'text-electric' : ''}`}>{value} CV</dd></div> }
