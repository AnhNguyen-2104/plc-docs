import type { Loc } from '../families'

export type QKind = 'cpu' | 'power' | 'base' | 'io' | 'analog' | 'counter' | 'network' | 'motion'

export type QModule = {
  id: string
  model: string
  name: Loc
  kind: QKind
  role: Loc
  keySpec: Loc
  manual: { doc: string; page: string }
  page: string
  status: 'documented' | 'planned'
}

export const qModules: QModule[] = [
  {
    id: 'q00ujcpu',
    model: 'Q00UJCPU',
    name: { vi: 'CPU cơ bản Q00UJCPU', en: 'Q00UJCPU basic CPU' },
    kind: 'cpu',
    role: {
      vi: 'CPU tích hợp sẵn nguồn và base cho hệ nhỏ',
      en: 'CPU with integrated power supply and base for small systems'
    },
    keySpec: {
      vi: '10K bước, 256 điểm I/O (X/Y0–FF)',
      en: '10K steps, 256 I/O points (X/Y0–FF)'
    },
    manual: { doc: 'sh080483', page: '1.1' },
    page: '/q/modules/cpu',
    status: 'documented'
  },
  {
    id: 'q03udv',
    model: 'Q03UDV',
    name: { vi: 'CPU Q03UDVCPU', en: 'Q03UDVCPU CPU' },
    kind: 'cpu',
    role: {
      vi: 'CPU Universal có Ethernet tích hợp',
      en: 'Universal CPU with built-in Ethernet'
    },
    keySpec: {
      vi: '30K bước, 4096 điểm I/O, Ethernet 100/10 Mbps',
      en: '30K steps, 4096 I/O points, 100/10 Mbps Ethernet'
    },
    manual: { doc: 'sh080483', page: '1.1.3' },
    page: '/q/modules/cpu',
    status: 'documented'
  },
  {
    id: 'q06udh',
    model: 'Q06UDH',
    name: { vi: 'CPU Q06UDHCPU', en: 'Q06UDHCPU CPU' },
    kind: 'cpu',
    role: {
      vi: 'CPU Universal hiệu năng cao, không có Ethernet tích hợp',
      en: 'High-performance Universal CPU without built-in Ethernet'
    },
    keySpec: {
      vi: '60K bước, 4096 điểm I/O, 9.5 ns/LD',
      en: '60K steps, 4096 I/O points, 9.5 ns/LD'
    },
    manual: { doc: 'sh080483', page: '1.1.3' },
    page: '/q/modules/cpu',
    status: 'documented'
  },
  {
    id: 'q61p',
    model: 'Q61P',
    name: { vi: 'Module nguồn Q61P', en: 'Q61P power supply module' },
    kind: 'power',
    role: {
      vi: 'Nguồn AC 100–240 V cho base dòng Q3',
      en: '100–240 VAC power supply for Q3-series bases'
    },
    keySpec: {
      vi: 'Vào 100–240 VAC, ra 5 VDC 6 A',
      en: '100–240 VAC input, 5 VDC 6 A output'
    },
    manual: { doc: 'sh080483', page: '7.2.1' },
    page: '/q/system/power-and-base',
    status: 'documented'
  },
  {
    id: 'q62p',
    model: 'Q62P',
    name: { vi: 'Module nguồn Q62P', en: 'Q62P power supply module' },
    kind: 'power',
    role: {
      vi: 'Nguồn AC có thêm ngõ 24 VDC',
      en: 'AC power supply with an auxiliary 24 VDC output'
    },
    keySpec: {
      vi: 'Vào 100–240 VAC, ra 5 VDC 3 A + 24 VDC 0.6 A',
      en: '100–240 VAC input, 5 VDC 3 A + 24 VDC 0.6 A output'
    },
    manual: { doc: 'sh080483', page: '7.2.1' },
    page: '/q/system/power-and-base',
    status: 'documented'
  },
  {
    id: 'q63p',
    model: 'Q63P',
    name: { vi: 'Module nguồn Q63P', en: 'Q63P power supply module' },
    kind: 'power',
    role: {
      vi: 'Nguồn DC 24 V cho base dòng Q3',
      en: '24 VDC power supply for Q3-series bases'
    },
    keySpec: {
      vi: 'Vào 24 VDC, ra 5 VDC 6 A',
      en: '24 VDC input, 5 VDC 6 A output'
    },
    manual: { doc: 'sh080483', page: '7.2.1' },
    page: '/q/system/power-and-base',
    status: 'documented'
  },
  {
    id: 'q64p',
    model: 'Q64P',
    name: { vi: 'Module nguồn Q64P', en: 'Q64P power supply module' },
    kind: 'power',
    role: {
      vi: 'Nguồn AC công suất lớn, tự chọn 100/200 V',
      en: 'High-capacity AC power supply with automatic 100/200 V range'
    },
    keySpec: {
      vi: 'Vào 100–240 VAC, ra 5 VDC 8.5 A',
      en: '100–240 VAC input, 5 VDC 8.5 A output'
    },
    manual: { doc: 'sh080483', page: '7.2.1' },
    page: '/q/system/power-and-base',
    status: 'documented'
  },
  {
    id: 'q33b',
    model: 'Q33B',
    name: { vi: 'Base chính Q33B', en: 'Q33B main base unit' },
    kind: 'base',
    role: { vi: 'Base chính 3 khe cho module Q', en: '3-slot main base for Q modules' },
    keySpec: { vi: '3 khe module I/O', en: '3 I/O module slots' },
    manual: { doc: 'sh080483', page: '8.3' },
    page: '/q/system/power-and-base',
    status: 'documented'
  },
  {
    id: 'q35b',
    model: 'Q35B',
    name: { vi: 'Base chính Q35B', en: 'Q35B main base unit' },
    kind: 'base',
    role: { vi: 'Base chính 5 khe cho module Q', en: '5-slot main base for Q modules' },
    keySpec: { vi: '5 khe module I/O', en: '5 I/O module slots' },
    manual: { doc: 'sh080483', page: '8.3' },
    page: '/q/system/power-and-base',
    status: 'documented'
  },
  {
    id: 'q38b',
    model: 'Q38B',
    name: { vi: 'Base chính Q38B', en: 'Q38B main base unit' },
    kind: 'base',
    role: { vi: 'Base chính 8 khe cho module Q', en: '8-slot main base for Q modules' },
    keySpec: { vi: '8 khe module I/O', en: '8 I/O module slots' },
    manual: { doc: 'sh080483', page: '8.3' },
    page: '/q/system/power-and-base',
    status: 'documented'
  },
  {
    id: 'q312b',
    model: 'Q312B',
    name: { vi: 'Base chính Q312B', en: 'Q312B main base unit' },
    kind: 'base',
    role: { vi: 'Base chính 12 khe cho module Q', en: '12-slot main base for Q modules' },
    keySpec: { vi: '12 khe module I/O', en: '12 I/O module slots' },
    manual: { doc: 'sh080483', page: '8.3' },
    page: '/q/system/power-and-base',
    status: 'documented'
  },
  {
    id: 'qx40',
    model: 'QX40',
    name: { vi: 'Module vào số QX40', en: 'QX40 digital input module' },
    kind: 'io',
    role: {
      vi: '16 điểm vào 24 VDC kiểu common dương',
      en: '16-point 24 VDC input, positive common'
    },
    keySpec: {
      vi: '16 điểm, 24 VDC, khoảng 4 mA/điểm, lọc mặc định 10 ms',
      en: '16 points, 24 VDC, approx. 4 mA/point, 10 ms default filter'
    },
    manual: { doc: 'sh080042', page: '2.4' },
    page: '/q/modules/io',
    status: 'documented'
  },
  {
    id: 'qy40p',
    model: 'QY40P',
    name: { vi: 'Module ra số QY40P', en: 'QY40P digital output module' },
    kind: 'io',
    role: {
      vi: '16 điểm ra transistor kiểu sink',
      en: '16-point transistor output, sink type'
    },
    keySpec: {
      vi: '16 điểm, 12–24 VDC, 0.1 A/điểm, 1.6 A/common',
      en: '16 points, 12–24 VDC, 0.1 A/point, 1.6 A/common'
    },
    manual: { doc: 'sh080042', page: '3.5' },
    page: '/q/modules/io',
    status: 'documented'
  },
  {
    id: 'q64ad',
    model: 'Q64AD',
    name: { vi: 'Module vào tương tự Q64AD', en: 'Q64AD analog input module' },
    kind: 'analog',
    role: {
      vi: 'Chuyển 4 kênh tương tự sang số 16-bit',
      en: 'Converts four analog channels to 16-bit digital values'
    },
    keySpec: {
      vi: '4 kênh, 80 µs/kênh, 16-bit có dấu',
      en: '4 channels, 80 µs/channel, 16-bit signed'
    },
    manual: { doc: 'sh080055', page: '3.1' },
    page: '/q/modules/analog',
    status: 'documented'
  },
  {
    id: 'q62da',
    model: 'Q62DA',
    name: { vi: 'Module ra tương tự Q62DA', en: 'Q62DA analog output module' },
    kind: 'analog',
    role: {
      vi: 'Chuyển 2 kênh số 16-bit sang tương tự',
      en: 'Converts two 16-bit digital channels to analog outputs'
    },
    keySpec: {
      vi: '2 kênh, 80 µs/kênh, 16-bit có dấu',
      en: '2 channels, 80 µs/channel, 16-bit signed'
    },
    manual: { doc: 'sh080054', page: '3.1.2' },
    page: '/q/modules/analog',
    status: 'documented'
  },
  {
    id: 'qd62',
    model: 'QD62',
    name: { vi: 'Module đếm xung QD62', en: 'QD62 high-speed counter module' },
    kind: 'counter',
    role: {
      vi: 'Đếm xung 2 kênh, ngõ ra kiểu sink',
      en: 'Two-channel pulse counter, sink output type'
    },
    keySpec: {
      vi: '2 kênh, 32-bit, tới 200 kPPS',
      en: '2 channels, 32-bit, up to 200 kPPS'
    },
    manual: { doc: 'sh080036', page: '3.1' },
    page: '/q/modules/counter',
    status: 'documented'
  },
  {
    id: 'qd62e',
    model: 'QD62E',
    name: { vi: 'Module đếm xung QD62E', en: 'QD62E high-speed counter module' },
    kind: 'counter',
    role: {
      vi: 'Đếm xung 2 kênh, ngõ ra kiểu source',
      en: 'Two-channel pulse counter, source output type'
    },
    keySpec: {
      vi: '2 kênh, 32-bit, tới 200 kPPS',
      en: '2 channels, 32-bit, up to 200 kPPS'
    },
    manual: { doc: 'sh080036', page: '3.1.2' },
    page: '/q/modules/counter',
    status: 'documented'
  },
  {
    id: 'qj71c24n',
    model: 'QJ71C24N',
    name: { vi: 'Module truyền thông nối tiếp QJ71C24N', en: 'QJ71C24N serial communication module' },
    kind: 'network',
    role: {
      vi: 'Hai kênh nối tiếp: RS-232 và RS-422/485',
      en: 'Two serial channels: RS-232 and RS-422/485'
    },
    keySpec: {
      vi: 'CH1 RS-232 (D-sub 9), CH2 RS-422/485',
      en: 'CH1 RS-232 (D-sub 9), CH2 RS-422/485'
    },
    manual: { doc: 'sh080006', page: '3.1' },
    page: '/q/modules/serial',
    status: 'documented'
  },
  {
    id: 'qj71c24n-r4',
    model: 'QJ71C24N-R4',
    name: { vi: 'Module nối tiếp QJ71C24N-R4', en: 'QJ71C24N-R4 serial communication module' },
    kind: 'network',
    role: {
      vi: 'Hai kênh nối tiếp RS-422/485',
      en: 'Two RS-422/485 serial channels'
    },
    keySpec: {
      vi: 'CH1 và CH2 đều là RS-422/485',
      en: 'CH1 and CH2 are both RS-422/485'
    },
    manual: { doc: 'sh080006', page: '3.1' },
    page: '/q/modules/serial',
    status: 'documented'
  },
  {
    id: 'qj71e71-100',
    model: 'QJ71E71-100',
    name: { vi: 'Module Ethernet QJ71E71-100', en: 'QJ71E71-100 Ethernet module' },
    kind: 'network',
    role: {
      vi: 'Module Ethernet 100BASE-TX/10BASE-T',
      en: '100BASE-TX/10BASE-T Ethernet module'
    },
    keySpec: {
      vi: '100 Mbps, RJ45, 16 kết nối đồng thời',
      en: '100 Mbps, RJ45, 16 simultaneous connections'
    },
    manual: { doc: 'sh080009', page: '3.2' },
    page: '/q/modules/ethernet',
    status: 'documented'
  },
  {
    id: 'qj61bt11n',
    model: 'QJ61BT11N',
    name: { vi: 'Module CC-Link QJ61BT11N', en: 'QJ61BT11N CC-Link module' },
    kind: 'network',
    role: {
      vi: 'Module master/local CC-Link',
      en: 'CC-Link master/local module'
    },
    keySpec: {
      vi: 'Thông số bản N chưa xác minh — manual trên đĩa là QJ61BT11',
      en: 'N-version values not verified — manual on disk is QJ61BT11'
    },
    manual: { doc: 'sh080016', page: '3.1' },
    page: '/q/modules/cc-link',
    status: 'planned'
  },
  {
    id: 'qj71lp21-25',
    model: 'QJ71LP21-25',
    name: { vi: 'Module MELSECNET/H QJ71LP21-25', en: 'QJ71LP21-25 MELSECNET/H module' },
    kind: 'network',
    role: {
      vi: 'Module mạng vòng quang MELSECNET/H',
      en: 'MELSECNET/H optical loop network module'
    },
    keySpec: {
      vi: 'Vòng quang 25 Mbps',
      en: '25 Mbps optical loop'
    },
    manual: { doc: 'sh080049', page: '1.2' },
    page: '/q/modules/',
    status: 'documented'
  },
  {
    id: 'qd75m1',
    model: 'QD75M1',
    name: { vi: 'Module vị trí QD75M1', en: 'QD75M1 positioning module' },
    kind: 'motion',
    role: {
      vi: 'Module vị trí 1 trục kiểu SSCNET',
      en: 'Single-axis SSCNET positioning module'
    },
    keySpec: {
      vi: '1 trục, SSCNET, 32 điểm I/O',
      en: '1 axis, SSCNET, 32 I/O points'
    },
    manual: { doc: 'ib0300062', page: '3.1' },
    page: '/q/modules/motion',
    status: 'documented'
  },
  {
    id: 'qd77ms4',
    model: 'QD77MS4',
    name: { vi: 'Module motion QD77MS4', en: 'QD77MS4 motion module' },
    kind: 'motion',
    role: {
      vi: 'Simple Motion module 4 trục, SSCNET/H',
      en: '4-axis Simple Motion module, SSCNET/H'
    },
    keySpec: {
      vi: '4 trục, chu kỳ hoạt động 0.88/1.77 ms',
      en: '4 axes, 0.88/1.77 ms operation cycle'
    },
    manual: { doc: 'ib0300185', page: '3.1' },
    page: '/q/modules/motion',
    status: 'documented'
  },
  {
    id: 'qd75d4',
    model: 'QD75D4',
    name: { vi: 'Module vị trí QD75D4', en: 'QD75D4 positioning module' },
    kind: 'motion',
    role: {
      vi: 'Module vị trí 4 trục, ngõ ra xung vi sai',
      en: '4-axis positioning module, differential pulse output'
    },
    keySpec: {
      vi: '4 trục, 32 điểm I/O, ngõ ra vi sai',
      en: '4 axes, 32 I/O points, differential output'
    },
    manual: { doc: 'sh080058', page: '3-2' },
    page: '/q/qd75/',
    status: 'documented'
  },
  {
    id: 'qd75p4',
    model: 'QD75P4',
    name: { vi: 'Module vị trí QD75P4', en: 'QD75P4 positioning module' },
    kind: 'motion',
    role: {
      vi: 'Module vị trí 4 trục, ngõ ra open collector',
      en: '4-axis positioning module, open collector output'
    },
    keySpec: {
      vi: '4 trục, 32 điểm I/O, ngõ ra open collector',
      en: '4 axes, 32 I/O points, open collector output'
    },
    manual: { doc: 'sh080058', page: '3-2' },
    page: '/q/qd75/',
    status: 'documented'
  }
]
