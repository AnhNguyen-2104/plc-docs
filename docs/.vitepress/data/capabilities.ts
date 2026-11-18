import type { Loc } from './families'

export type SupportLevel = 'yes' | 'partial' | 'no' | 'planned'

export type Capability = {
  topic: Loc
  support: Record<string, SupportLevel>
}

export const capabilities: Capability[] = [
  {
    topic: { vi: 'Điều khiển vị trí (xung)', en: 'Positioning (pulse)' },
    support: { q: 'yes', fx5: 'planned', l: 'planned' }
  },
  {
    topic: { vi: 'SFC', en: 'SFC' },
    support: { q: 'yes', fx5: 'planned', l: 'planned' }
  },
  {
    topic: { vi: 'Structured Text', en: 'Structured Text' },
    support: { q: 'partial', fx5: 'planned', l: 'planned' }
  },
  {
    topic: { vi: 'Module chuyển động QD77MS', en: 'Motion module QD77MS' },
    support: { q: 'yes', fx5: 'planned', l: 'planned' }
  }
]
