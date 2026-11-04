export type Vehicle = {
  id: string
  brand: string
  model: string
  year: number
  engine: string
  originalHp: number
  stage1Hp: number
  stage2Hp: number
  estimatedPrepPrice: number
  technicalDescription: string
  engineAudioUrl: string
  imageUrl: string
}

export const vehicles: Vehicle[] = [
  {
    id: 'golf-gti-mk7', brand: 'Volkswagen', model: 'Golf GTI Mk7', year: 2018,
    engine: '2.0 TSI EA888 · Turbo · 4 cilindros', originalHp: 230, stage1Hp: 290, stage2Hp: 330,
    estimatedPrepPrice: 6900,
    technicalDescription: 'O EA888 responde de forma excepcional a calibração de ECU. Stage 2 requer downpipe, admissão e gerenciamento térmico compatível.',
    engineAudioUrl: '/audio/golf.mp3',
    imageUrl: '/img/golf.jpg',
  },
  {
    id: 'civic-si-fg4', brand: 'Honda', model: 'Civic Si', year: 2015,
    engine: '2.4 i-VTEC K24 · Aspirado · 4 cilindros', originalHp: 206, stage1Hp: 225, stage2Hp: 245,
    estimatedPrepPrice: 5200,
    technicalDescription: 'O K24 entrega rotação alta e resposta linear. Intake, escape dimensionado e acerto aspirado elevam o caráter do conjunto.',
    engineAudioUrl: '/audio/civic.mp3',
    imageUrl: '/img/civicsi.jpg',
  },
  {
    id: 'opala-comodoro', brand: 'Chevrolet', model: 'Opala Comodoro', year: 1988,
    engine: '4.1 250-S · Aspirado · 6 cilindros em linha', originalHp: 171, stage1Hp: 205, stage2Hp: 240,
    estimatedPrepPrice: 14500,
    technicalDescription: 'Clássico nacional com seis cilindros de assinatura sonora inconfundível. Preparação une ignição, carburador/injeção e escape artesanal.',
    engineAudioUrl: '/audio/opala.mp3',
    imageUrl: '/img/opala.jpeg',
  },
  {
    id: 'bmw-m2', brand: 'BMW', model: 'M2 Competition', year: 2020,
    engine: '3.0 S55 · Biturbo · 6 cilindros em linha', originalHp: 410, stage1Hp: 510, stage2Hp: 580,
    estimatedPrepPrice: 18900,
    technicalDescription: 'O biturbo S55 combina torque forte e alta capacidade térmica quando acompanhado de intercooler e acerto de combustível adequados.',
    engineAudioUrl: '/audio/bmw.mp3',
    imageUrl: '/img/m2competion.jpg',
  },
]
