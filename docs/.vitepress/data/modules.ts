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
  },
  {
    id: 'q-system',
    familyId: 'q',
    slug: 'system',
    name: {
      vi: 'Hệ thống & nguồn',
      en: 'System & power'
    },
    pages: [
      { slug: '', title: { vi: 'Tổng thể hệ thống', en: 'System overview' } },
      { slug: 'io-wiring', title: { vi: 'Đấu dây vào/ra', en: 'I/O wiring' } },
      { slug: 'power-and-base', title: { vi: 'Nguồn và base', en: 'Power and base' } }
    ]
  },
  {
    id: 'q-modules',
    familyId: 'q',
    slug: 'modules',
    name: {
      vi: 'Danh mục module',
      en: 'Module catalogue'
    },
    pages: [
      { slug: '', title: { vi: 'Tổng quan danh mục', en: 'Catalogue overview' } },
      { slug: 'cpu', title: { vi: 'CPU', en: 'CPU' } },
      { slug: 'io', title: { vi: 'Vào/ra số', en: 'Digital I/O' } },
      { slug: 'analog', title: { vi: 'Tương tự', en: 'Analog' } },
      { slug: 'counter', title: { vi: 'Đếm xung', en: 'Counter' } },
      { slug: 'serial', title: { vi: 'Nối tiếp', en: 'Serial' } },
      { slug: 'ethernet', title: { vi: 'Ethernet', en: 'Ethernet' } },
      { slug: 'cc-link', title: { vi: 'CC-Link', en: 'CC-Link' } },
      { slug: 'motion', title: { vi: 'Chuyển động', en: 'Motion' } }
    ]
  }
]
