import type { Loc } from './families'

export type ModulePage = { slug: string; title: Loc }

export type ModuleDef = {
  id: string
  familyId: string
  slug: string
  name: Loc
  pages: ModulePage[]
}

export const modules: ModuleDef[] = [
  {
    id: 'qd75d4',
    familyId: 'q',
    slug: 'qd75',
    name: {
      vi: 'QD75D4 — điều khiển vị trí',
      en: 'QD75D4 — positioning'
    },
    pages: [
      { slug: '', title: { vi: 'Tổng quan', en: 'Overview' } },
      { slug: 'wiring', title: { vi: 'Đấu dây', en: 'Wiring' } },
      { slug: 'io-signals', title: { vi: 'Tín hiệu X/Y', en: 'X-Y signals' } },
      { slug: 'parameters', title: { vi: 'Thông số (Pr.)', en: 'Parameters (Pr.)' } },
      { slug: 'position-data', title: { vi: 'Dữ liệu vị trí (Da.)', en: 'Position data (Da.)' } },
      { slug: 'opr', title: { vi: 'Về gốc (OPR)', en: 'Origin (OPR)' } },
      { slug: 'ladder', title: { vi: 'Chương trình điều khiển', en: 'Control program' } },
      { slug: 'commissioning', title: { vi: 'Chạy thử & dữ liệu thật', en: 'Commissioning & real data' } },
      { slug: 'troubleshooting', title: { vi: 'Lỗi & xử lý', en: 'Troubleshooting' } }
    ]
  }
]
