import type { TunerPart } from '../data/tunerParts'

export const BASE_HP = 550

export type TunerMetrics = {
  baseHp: number
  hpGain: number
  finalHp: number
  torqueGain: number
  totalPrice: number
  selectedCount: number
}

export function calculateTunerMetrics(parts: readonly TunerPart[], baseHp = BASE_HP): TunerMetrics {
  const totals = parts.reduce((result, part) => ({
    hpGain: result.hpGain + part.hpGain,
    torqueGain: result.torqueGain + part.torqueGain,
    totalPrice: result.totalPrice + part.price,
  }), { hpGain: 0, torqueGain: 0, totalPrice: 0 })
  return { baseHp, finalHp: baseHp + totals.hpGain, selectedCount: parts.length, ...totals }
}

export function isRemapPart(part: TunerPart) { return part.remapStage !== undefined }

export function getCompatibilityWarnings(parts: readonly TunerPart[]): string[] {
  const selected = new Set(parts.map((part) => part.id))
  const stage = parts.find((part) => part.remapStage)?.remapStage
  const warnings: string[] = []
  if (stage === 2 && !selected.has('downpipe')) warnings.push('Stage 2 pede validação de fluxo de escape, incluindo downpipe compatível.')
  if (stage === 3) {
    if (!selected.has('biturbo')) warnings.push('Stage 3 requer avaliação de turbina compatível antes da calibração.')
    if (!selected.has('intercooler')) warnings.push('Stage 3 requer gerenciamento térmico compatível, incluindo intercooler.')
  }
  parts.forEach((part) => {
    part.incompatibleWith?.filter((id) => selected.has(id)).forEach(() => warnings.push(`${part.name} possui conflito técnico a revisar.`))
    if (part.requirements?.length) warnings.push(...part.requirements.map((requirement) => `${part.name}: confirmar ${requirement.toLocaleLowerCase('pt-BR')}.`))
  })
  return [...new Set(warnings)]
}
