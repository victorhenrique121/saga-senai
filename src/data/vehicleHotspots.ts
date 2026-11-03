import type { FocusArea } from './tunerParts'

export type VisualFocusArea = Extract<FocusArea, 'engine' | 'intake' | 'exhaust' | 'wheels' | 'suspension'>
export type VehicleHotspot = { area: VisualFocusArea; label: string; x: number; y: number }

export const vehicleHotspots: VehicleHotspot[] = [
  { area: 'engine', label: 'Motor', x: 53, y: 39 },
  { area: 'intake', label: 'Turbo e admissão', x: 61, y: 42 },
  { area: 'exhaust', label: 'Escapamento', x: 18, y: 61 },
  { area: 'wheels', label: 'Freios e rodas', x: 76, y: 69 },
  { area: 'suspension', label: 'Suspensão', x: 31, y: 69 },
]
