export type TunerCategory = 'Remap / ECU' | 'Turbo & Admissão' | 'Escapamento' | 'Freios e Suspensão'
export type FocusArea = 'engine' | 'intake' | 'exhaust' | 'wheels' | 'suspension'
export type PartBadge = 'Essencial' | 'Elite' | 'Alta Performance'
export type TunerPart = { id: string; name: string; category: TunerCategory; focusArea: FocusArea; badges: PartBadge[]; hpGain: number; torqueGain: number; price: number; description: string }

export const tunerCategories: TunerCategory[] = ['Remap / ECU', 'Turbo & Admissão', 'Escapamento', 'Freios e Suspensão']
export const tunerParts: TunerPart[] = [
  { id: 'stage-1', name: 'Remap Stage 1', category: 'Remap / ECU', focusArea: 'engine', badges: ['Essencial'], hpGain: 55, torqueGain: 85, price: 4900, description: 'Calibração ECU otimizada para componentes originais.' },
  { id: 'stage-2', name: 'Remap Stage 2', category: 'Remap / ECU', focusArea: 'engine', badges: ['Elite', 'Alta Performance'], hpGain: 95, torqueGain: 140, price: 7900, description: 'Mapa avançado para hardware de fluxo e maior pressão.' },
  { id: 'stage-3', name: 'Remap Stage 3', category: 'Remap / ECU', focusArea: 'engine', badges: ['Alta Performance'], hpGain: 155, torqueGain: 220, price: 14900, description: 'Configuração extrema para projeto completo de pista.' },
  { id: 'kn-filter', name: 'Filtro Esportivo K&N', category: 'Turbo & Admissão', focusArea: 'intake', badges: ['Essencial'], hpGain: 8, torqueGain: 10, price: 980, description: 'Admissão lavável de alto fluxo e resposta imediata.' },
  { id: 'intercooler', name: 'Intercooler Alta Vazão', category: 'Turbo & Admissão', focusArea: 'intake', badges: ['Elite'], hpGain: 18, torqueGain: 28, price: 4200, description: 'Menor temperatura de admissão sob carga contínua.' },
  { id: 'biturbo', name: 'Turbina Bi-Turbo', category: 'Turbo & Admissão', focusArea: 'intake', badges: ['Alta Performance'], hpGain: 120, torqueGain: 170, price: 21800, description: 'Conjunto bi-turbo para potência sustentada em alto giro.' },
  { id: 'downpipe', name: 'Downpipe Inox', category: 'Escapamento', focusArea: 'exhaust', badges: ['Essencial'], hpGain: 22, torqueGain: 34, price: 3400, description: 'Fluxo liberado em aço inox e acabamento premium.' },
  { id: 'catback', name: 'Catback com Válvula', category: 'Escapamento', focusArea: 'exhaust', badges: ['Elite'], hpGain: 12, torqueGain: 18, price: 6200, description: 'Sonoridade configurável sem abrir mão do conforto.' },
  { id: 'full-inox', name: 'Escape Full Inox', category: 'Escapamento', focusArea: 'exhaust', badges: ['Alta Performance'], hpGain: 28, torqueGain: 40, price: 11900, description: 'Sistema completo em inox para fluxo e timbre máximo.' },
  { id: 'ceramic-pads', name: 'Pastilhas Cerâmicas', category: 'Freios e Suspensão', focusArea: 'wheels', badges: ['Essencial'], hpGain: 0, torqueGain: 0, price: 2200, description: 'Frenagem estável, menor fadiga e baixa emissão de pó.' },
  { id: 'brembo', name: 'Kit Freios Brembo 6 Pistões', category: 'Freios e Suspensão', focusArea: 'wheels', badges: ['Elite', 'Alta Performance'], hpGain: 0, torqueGain: 0, price: 16800, description: 'Frenagem consistente para uma nova faixa de performance.' },
  { id: 'coilovers', name: 'Coilovers Ajustáveis', category: 'Freios e Suspensão', focusArea: 'suspension', badges: ['Elite'], hpGain: 0, torqueGain: 0, price: 9800, description: 'Altura e carga ajustáveis para rua, serra ou pista.' },
]
