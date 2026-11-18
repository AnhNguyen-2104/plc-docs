export type Loc = { vi: string; en: string }

export type Family = {
  id: string
  name: Loc
  vendor: string
  order: number
  status: 'planned' | 'seeded' | 'active'
  cpuSeries: string[]
  software: string[]
}

export const families: Family[] = [
  {
    id: 'q',
    name: { vi: 'MELSEC Q', en: 'MELSEC Q' },
    vendor: 'Mitsubishi Electric',
    order: 10,
    status: 'active',
    cpuSeries: ['Q00UJ', 'Q03UDV', 'Q06UDH'],
    software: ['GX Works2', 'GX Configurator-QP']
  },
  {
    id: 'fx5',
    name: { vi: 'MELSEC iQ-F', en: 'MELSEC iQ-F' },
    vendor: 'Mitsubishi Electric',
    order: 20,
    status: 'planned',
    cpuSeries: ['FX5U', 'FX5UC'],
    software: ['GX Works3']
  },
  {
    id: 'l',
    name: { vi: 'MELSEC L', en: 'MELSEC L' },
    vendor: 'Mitsubishi Electric',
    order: 30,
    status: 'planned',
    cpuSeries: ['L02CPU', 'L06CPU'],
    software: ['GX Works2']
  }
]
