export type TunerCategory = 'Motor' | 'Turbo / Admissão' | 'Escapamento' | 'Freios' | 'Suspensão' | 'Transmissão' | 'Rodas e Pneus' | 'Eletrônica' | 'Combustível'
export type FocusArea = 'engine' | 'intake' | 'exhaust' | 'wheels' | 'suspension' | 'transmission' | 'electronics' | 'fuel'
export type PartBadge = 'Essencial' | 'Elite' | 'Alta Performance'
export type RemapStage = 1 | 2 | 3
export type Difficulty = 'low' | 'medium' | 'high'
export type TunerPart = { id: string; name: string; category: TunerCategory; description: string; technicalDescription: string; focusArea: FocusArea; price: number; hpGain: number; torqueGain: number; difficulty: Difficulty; installationTime?: string; requirements?: string[]; incompatibleWith?: string[]; compatibleVehicles?: string[]; recommendedFor?: string[]; warnings?: string[]; badges: PartBadge[]; remapStage?: RemapStage }

export const tunerCategories: TunerCategory[] = ['Motor', 'Turbo / Admissão', 'Escapamento', 'Freios', 'Suspensão', 'Transmissão', 'Rodas e Pneus', 'Eletrônica', 'Combustível']
const p = (id: string, name: string, category: TunerCategory, focusArea: FocusArea, price: number, hpGain: number, torqueGain: number, description: string, difficulty: Difficulty = 'medium', extra: Partial<Omit<TunerPart, 'id' | 'name' | 'category' | 'focusArea' | 'price' | 'hpGain' | 'torqueGain' | 'description' | 'difficulty' | 'technicalDescription'>> = {}): TunerPart => ({ id, name, category, focusArea, price, hpGain, torqueGain, description, technicalDescription: description, difficulty, badges: hpGain >= 50 ? ['Alta Performance'] : ['Essencial'], installationTime: difficulty === 'high' ? 'Sob avaliação técnica' : 'Estimativa após inspeção', ...extra })

export const tunerParts: TunerPart[] = [
  p('stage-1', 'Remap Stage 1', 'Motor', 'engine', 4900, 55, 85, 'Calibração ECU para conjunto original.', 'medium', { remapStage: 1, badges: ['Essencial'] }),
  p('stage-2', 'Remap Stage 2', 'Motor', 'engine', 7900, 95, 140, 'Calibração para conjunto de fluxo validado.', 'high', { remapStage: 2, requirements: ['Downpipe compatível'], badges: ['Elite', 'Alta Performance'] }),
  p('stage-3', 'Remap Stage 3', 'Motor', 'engine', 14900, 155, 220, 'Calibração avançada para projeto completo.', 'high', { remapStage: 3, requirements: ['Turbina e arrefecimento compatíveis'], badges: ['Alta Performance'] }),
  p('forged-pistons', 'Pistões forjados', 'Motor', 'engine', 12800, 0, 0, 'Margem estrutural para projetos de alta carga.', 'high', { recommendedFor: ['Projetos Stage 3'] }),
  p('forged-rods', 'Bielas forjadas', 'Motor', 'engine', 9800, 0, 0, 'Reforço estrutural do conjunto rotativo.', 'high'),
  p('sport-cam', 'Comando de válvulas esportivo', 'Motor', 'engine', 6200, 0, 0, 'Perfil a ser dimensionado para o motor.', 'high', { warnings: ['Ganho depende do acerto e do cabeçote.'] }),
  p('valve-springs', 'Molas de válvulas reforçadas', 'Motor', 'engine', 2400, 0, 0, 'Controle de válvulas em maior rotação.', 'high'),
  p('head-gasket', 'Junta de cabeçote reforçada', 'Motor', 'engine', 1850, 0, 0, 'Vedação para pressão e temperatura elevadas.', 'high'),
  p('oil-pump', 'Bomba de óleo de alta performance', 'Motor', 'engine', 3900, 0, 0, 'Fluxo de lubrificação sob carga.', 'high'),
  p('radiator', 'Radiador de maior capacidade', 'Motor', 'engine', 3100, 0, 0, 'Reserva térmica adicional para uso severo.', 'medium'),
  p('oil-cooler', 'Oil cooler', 'Motor', 'engine', 4600, 0, 0, 'Controle de temperatura do lubrificante.', 'medium'),
  p('performance-plugs', 'Velas de alto desempenho', 'Motor', 'engine', 760, 0, 0, 'Faixa térmica a confirmar na calibração.', 'low'),
  p('ignition-coils', 'Bobinas de ignição reforçadas', 'Motor', 'engine', 2200, 0, 0, 'Estabilidade de centelha em alta carga.', 'low'),
  p('engine-mounts', 'Suportes de motor reforçados', 'Motor', 'engine', 2800, 0, 0, 'Reduz movimento do conjunto motriz.', 'medium'),

  p('turbo-upgrade', 'Turbocompressor de maior capacidade', 'Turbo / Admissão', 'intake', 18900, 0, 0, 'Dimensionamento obrigatório para a aplicação.', 'high', { requirements: ['Calibração, combustível e arrefecimento'] }),
  p('biturbo', 'Kit Bi-Turbo', 'Turbo / Admissão', 'intake', 21800, 120, 170, 'Conjunto para maior vazão em alto giro.', 'high', { requirements: ['Stage 3 e sistema de combustível'], badges: ['Alta Performance'] }),
  p('intercooler', 'Intercooler de alta vazão', 'Turbo / Admissão', 'intake', 4200, 0, 0, 'Redução de temperatura do ar admitido.', 'medium'),
  p('sport-intake', 'Intake esportivo', 'Turbo / Admissão', 'intake', 1450, 0, 0, 'Admissão de menor restrição.', 'low'),
  p('kn-filter', 'Filtro de ar de alto fluxo', 'Turbo / Admissão', 'intake', 980, 0, 0, 'Elemento lavável de alto fluxo.', 'low'),
  p('charge-pipes', 'Tubulação pressurizada', 'Turbo / Admissão', 'intake', 2650, 0, 0, 'Tubos reforçados para pressão de boost.', 'medium'),
  p('external-wastegate', 'Wastegate externa', 'Turbo / Admissão', 'intake', 3900, 0, 0, 'Controle de pressão para projeto compatível.', 'high'),
  p('blow-off', 'Válvula de alívio', 'Turbo / Admissão', 'intake', 1350, 0, 0, 'Alívio de pressão no fechamento de borboleta.', 'medium'),
  p('intake-manifold', 'Coletor de admissão', 'Turbo / Admissão', 'intake', 5800, 0, 0, 'Geometria a validar por aplicação.', 'high'),
  p('boost-controller', 'Controle eletrônico de boost', 'Turbo / Admissão', 'intake', 2100, 0, 0, 'Controle de pressão integrado ao acerto.', 'medium'),

  p('downpipe', 'Downpipe inox', 'Escapamento', 'exhaust', 3400, 0, 0, 'Fluxo liberado com aplicação específica.', 'medium', { warnings: ['Verificar legislação e emissões locais.'] }),
  p('catback', 'Catback com válvula', 'Escapamento', 'exhaust', 6200, 0, 0, 'Sonoridade configurável e acabamento inox.', 'medium'),
  p('full-inox', 'Escape completo em inox', 'Escapamento', 'exhaust', 11900, 0, 0, 'Sistema dimensionado de ponta a ponta.', 'high'),
  p('headers', 'Coletor dimensionado', 'Escapamento', 'exhaust', 7800, 0, 0, 'Projeto de fluxo para aplicação específica.', 'high'),
  p('sport-muffler', 'Abafador esportivo', 'Escapamento', 'exhaust', 2300, 0, 0, 'Controle de timbre e contrapressão.', 'low'),
  p('electronic-valves', 'Válvulas eletrônicas', 'Escapamento', 'exhaust', 4200, 0, 0, 'Controle de rota sonora por comando.', 'medium'),
  p('sport-tips', 'Ponteiras esportivas', 'Escapamento', 'exhaust', 1200, 0, 0, 'Acabamento estético de aplicação compatível.', 'low'),
  p('emissions-kit', 'Componentes de emissões compatíveis', 'Escapamento', 'exhaust', 0, 0, 0, 'Solução definida após análise de legislação aplicável.', 'high', { warnings: ['Preço sob consulta técnica.'] }),

  p('ventilated-discs', 'Discos ventilados', 'Freios', 'wheels', 3500, 0, 0, 'Maior capacidade térmica de frenagem.', 'medium'),
  p('slotted-discs', 'Discos perfurados ou ranhurados', 'Freios', 'wheels', 4200, 0, 0, 'Superfície de atrito para uso compatível.', 'medium'),
  p('ceramic-pads', 'Pastilhas esportivas', 'Freios', 'wheels', 2200, 0, 0, 'Composto para temperatura elevada.', 'low'),
  p('brembo', 'Pinças Brembo 6 pistões', 'Freios', 'wheels', 16800, 0, 0, 'Kit a validar com disco e roda.', 'high', { requirements: ['Folga de roda e disco compatível'], badges: ['Elite', 'Alta Performance'] }),
  p('aeroquip-lines', 'Mangueiras aeroquip', 'Freios', 'wheels', 1300, 0, 0, 'Pedal mais consistente sob carga.', 'medium'),
  p('high-temp-fluid', 'Fluido de freio alta temperatura', 'Freios', 'wheels', 420, 0, 0, 'Fluido para uso severo, com manutenção periódica.', 'low'),
  p('brake-ducts', 'Dutos de refrigeração', 'Freios', 'wheels', 2400, 0, 0, 'Direcionamento de ar para o conjunto.', 'medium'),

  p('sport-springs', 'Molas esportivas', 'Suspensão', 'suspension', 2200, 0, 0, 'Redução moderada de altura e rolagem.', 'medium'),
  p('coilovers', 'Coilovers ajustáveis', 'Suspensão', 'suspension', 9800, 0, 0, 'Altura e carga ajustáveis.', 'high', { requirements: ['Alinhamento e geometria'] }),
  p('performance-dampers', 'Amortecedores de performance', 'Suspensão', 'suspension', 6200, 0, 0, 'Controle de compressão e retorno conforme kit.', 'medium'),
  p('sway-bars', 'Barras estabilizadoras', 'Suspensão', 'suspension', 3600, 0, 0, 'Ajuste de rolagem para o uso definido.', 'medium'),
  p('reinforced-bushings', 'Buchas reforçadas', 'Suspensão', 'suspension', 1850, 0, 0, 'Precisão geométrica sob carga.', 'medium'),
  p('camber-plates', 'Camber plates', 'Suspensão', 'suspension', 2900, 0, 0, 'Ajuste de cambagem para uso compatível.', 'high'),
  p('strut-brace', 'Barra de reforço estrutural', 'Suspensão', 'suspension', 1450, 0, 0, 'Aumento de rigidez local do conjunto.', 'low'),

  p('reinforced-clutch', 'Embreagem reforçada', 'Transmissão', 'transmission', 6900, 0, 0, 'Capacidade de torque a validar.', 'high', { recommendedFor: ['Aumento de torque'] }),
  p('light-flywheel', 'Volante do motor aliviado', 'Transmissão', 'transmission', 4800, 0, 0, 'Resposta rotacional com avaliação de uso.', 'high'),
  p('lsd', 'Diferencial de deslizamento limitado', 'Transmissão', 'transmission', 14200, 0, 0, 'Tração e distribuição de torque.', 'high'),
  p('short-shifter', 'Short shifter', 'Transmissão', 'transmission', 1800, 0, 0, 'Curso reduzido de engates.', 'medium'),
  p('transmission-reinforcement', 'Reforço de transmissão', 'Transmissão', 'transmission', 8900, 0, 0, 'Componentes dimensionados para maior torque.', 'high'),
  p('trans-cooler', 'Arrefecimento de transmissão', 'Transmissão', 'transmission', 5200, 0, 0, 'Controle térmico de transmissão compatível.', 'high'),

  p('sport-wheels', 'Rodas esportivas', 'Rodas e Pneus', 'wheels', 8500, 0, 0, 'Medida e offset dependem da aplicação.', 'medium'),
  p('forged-wheels', 'Rodas forjadas', 'Rodas e Pneus', 'wheels', 26500, 0, 0, 'Massa não suspensa e medidas sob projeto.', 'high'),
  p('performance-tires', 'Pneus de alta performance', 'Rodas e Pneus', 'wheels', 5400, 0, 0, 'Composto definido por uso e medida.', 'low'),
  p('semi-slicks', 'Pneus semisslick', 'Rodas e Pneus', 'wheels', 7800, 0, 0, 'Uso de pista exige avaliação de temperatura e chuva.', 'medium'),
  p('wheel-spacers', 'Espaçadores de roda', 'Rodas e Pneus', 'wheels', 980, 0, 0, 'Aplicação com fixação e geometria corretas.', 'low'),
  p('alignment', 'Geometria e alinhamento', 'Rodas e Pneus', 'wheels', 650, 0, 0, 'Ajuste final após alterações de suspensão.', 'medium'),

  p('standalone-ecu', 'ECU programável', 'Eletrônica', 'electronics', 9800, 0, 0, 'Gerenciamento eletrônico sob calibração especializada.', 'high'),
  p('wideband', 'Wideband', 'Eletrônica', 'electronics', 1650, 0, 0, 'Leitura de mistura ar-combustível.', 'medium'),
  p('boost-gauge', 'Manômetro de turbo', 'Eletrônica', 'electronics', 850, 0, 0, 'Leitura de pressão de admissão.', 'low'),
  p('oil-temp-sensor', 'Sensor de temperatura de óleo', 'Eletrônica', 'electronics', 620, 0, 0, 'Monitoramento auxiliar de lubrificação.', 'medium'),
  p('oil-pressure-sensor', 'Sensor de pressão de óleo', 'Eletrônica', 'electronics', 620, 0, 0, 'Monitoramento auxiliar de pressão.', 'medium'),
  p('egt-sensor', 'Sensor de temperatura de escapamento', 'Eletrônica', 'electronics', 980, 0, 0, 'Monitoramento de EGT para projeto compatível.', 'medium'),
  p('data-logger', 'Data logger', 'Eletrônica', 'electronics', 3900, 0, 0, 'Registro de parâmetros para análise.', 'medium'),
  p('obd-monitor', 'Monitor OBD-II', 'Eletrônica', 'electronics', 1100, 0, 0, 'Leitura de parâmetros disponíveis no veículo.', 'low'),

  p('injectors', 'Bicos injetores de maior vazão', 'Combustível', 'fuel', 4200, 0, 0, 'Vazão dimensionada pela meta de potência.', 'high', { requirements: ['Calibração de combustível'] }),
  p('fuel-pump', 'Bomba de combustível', 'Combustível', 'fuel', 2600, 0, 0, 'Capacidade de alimentação a validar.', 'high'),
  p('fuel-regulator', 'Regulador de pressão', 'Combustível', 'fuel', 980, 0, 0, 'Controle de pressão conforme sistema.', 'medium'),
  p('fuel-lines', 'Linha de combustível', 'Combustível', 'fuel', 3200, 0, 0, 'Linhas dimensionadas para vazão e combustível.', 'high'),
  p('fuel-rail', 'Fuel rail', 'Combustível', 'fuel', 1800, 0, 0, 'Distribuição compatível com os injetores.', 'medium'),
  p('flex-fuel-sensor', 'Sensor de composição de combustível', 'Combustível', 'fuel', 1550, 0, 0, 'Leitura de composição para estratégia compatível.', 'medium'),
]
