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
      { slug: 'troubleshooting', title: { vi: 'Lỗi & xử lý', en: 'Troubleshooting' } },
      { slug: 'reference', title: { vi: 'Tra cứu cấu hình nhanh', en: 'Configuration reference' } }
    ]
  },
  {
    id: 'qd75-drivers',
    familyId: 'q',
    slug: 'drivers',
    name: {
      vi: 'Đấu dây driver',
      en: 'Driver wiring'
    },
    pages: [
      { slug: '', title: { vi: 'Tổng quan đấu dây driver', en: 'Driver wiring overview' } },
      { slug: 'mr-j4-a', title: { vi: 'Mitsubishi MR-J4-A', en: 'Mitsubishi MR-J4-A' } },
      { slug: 'delta-b2', title: { vi: 'Delta ASDA-B2', en: 'Delta ASDA-B2' } },
      { slug: 'yaskawa-sigma7', title: { vi: 'Yaskawa Sigma-7', en: 'Yaskawa Sigma-7' } },
      { slug: 'panasonic-minas-a6', title: { vi: 'Panasonic MINAS A6', en: 'Panasonic MINAS A6' } },
      { slug: 'stepper-dm542', title: { vi: 'Driver step DM542', en: 'DM542 step driver' } },
      { slug: 'parameters-gear', title: { vi: 'Thông số & tỉ số truyền', en: 'Parameters & gear ratio' } }
    ]
  }
]
