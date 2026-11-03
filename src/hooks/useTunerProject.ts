import { useMemo, useState } from 'react'
import { tunerParts, type TunerPart } from '../data/tunerParts'
import { calculateTunerMetrics, getCompatibilityWarnings } from '../lib/tunerCalculations'

export type VehicleColor = 'ferrari-red' | 'emerald-blue' | 'stealth-black' | 'nardo-grey' | 'pearl-white'
const initialSelection = new Set(['stage-1'])

export function useTunerProject() {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(() => new Set(initialSelection))
  const [color, setColor] = useState<VehicleColor>('ferrari-red')
  const [activePart, setActivePart] = useState<TunerPart | null>(null)
  const selectedParts = useMemo(() => tunerParts.filter((part) => selectedIds.has(part.id)), [selectedIds])
  const metrics = useMemo(() => calculateTunerMetrics(selectedParts), [selectedParts])
  const compatibilityWarnings = useMemo(() => getCompatibilityWarnings(selectedParts), [selectedParts])

  const togglePart = (part: TunerPart) => setSelectedIds((previous) => {
    const next = new Set(previous)
    if (next.has(part.id)) { next.delete(part.id); return next }
    if (part.remapStage) tunerParts.filter((candidate) => candidate.remapStage).forEach((candidate) => next.delete(candidate.id))
    next.add(part.id)
    return next
  })

  return { selectedIds, selectedParts, activePart, setActivePart, color, setColor, metrics, compatibilityWarnings, togglePart }
}
