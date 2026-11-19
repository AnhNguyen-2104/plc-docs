import type { Loc } from '../families'

export type QKind = 'cpu' | 'power' | 'base' | 'input' | 'output' | 'combined' | 'analog' | 'counter' | 'network' | 'motion'

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
    kind: 'input',
    role: {
      vi: '16 điểm vào 24 VDC kiểu common dương',
      en: '16-point 24 VDC input, positive common'
    },
    keySpec: {
      vi: '16 điểm, 24 VDC, khoảng 4 mA/điểm, lọc mặc định 10 ms',
      en: '16 points, 24 VDC, approx. 4 mA/point, 10 ms default filter'
    },
    manual: { doc: 'sh080042', page: '2.4' },
    page: '/q/modules/input',
    status: 'documented'
  },
  {
    id: 'qy40p',
    model: 'QY40P',
    name: { vi: 'Module ra số QY40P', en: 'QY40P digital output module' },
    kind: 'output',
    role: {
      vi: '16 điểm ra transistor kiểu sink',
      en: '16-point transistor output, sink type'
    },
    keySpec: {
      vi: '16 điểm, 12–24 VDC, 0.1 A/điểm, 1.6 A/common',
      en: '16 points, 12–24 VDC, 0.1 A/point, 1.6 A/common'
    },
    manual: { doc: 'sh080042', page: '3.5' },
    page: '/q/modules/output',
    status: 'documented'
  },
  { id: 'qx10', model: 'QX10', name: { vi: 'Module vào AC QX10', en: 'QX10 AC input module' }, kind: 'input', role: { vi: '16 ngõ vào AC 100–120 VAC, 1 common', en: '16-point 100–120 VAC AC input' }, keySpec: { vi: '16 điểm, 100–120 VAC, khoảng 8 mA/điểm', en: '16 points, 100–120 VAC, approx. 8 mA/point' }, manual: { doc: 'sh080042', page: '2-1' }, page: '/q/modules/input', status: 'documented' },
  { id: 'qx10ts', model: 'QX10-TS', name: { vi: 'Module vào AC QX10-TS', en: 'QX10-TS AC input module' }, kind: 'input', role: { vi: '16 ngõ vào AC 100–120 VAC, khối đấu dây lò xo (-TS)', en: '16-point 100–120 VAC AC input, spring clamp terminal block (-TS)' }, keySpec: { vi: '16 điểm, 100–120 VAC, khoảng 8 mA/điểm', en: '16 points, 100–120 VAC, approx. 8 mA/point' }, manual: { doc: 'sh080042', page: '2-2' }, page: '/q/modules/input', status: 'documented' },
  { id: 'qx28', model: 'QX28', name: { vi: 'Module vào AC QX28', en: 'QX28 AC input module' }, kind: 'input', role: { vi: '8 ngõ vào AC 100–240 VAC, 1 common', en: '8-point 100–240 VAC AC input' }, keySpec: { vi: '8 điểm, 100–240 VAC, khoảng 8 mA/điểm (100 VAC)', en: '8 points, 100–240 VAC, approx. 8 mA/point (100 VAC)' }, manual: { doc: 'sh080042', page: '2-3' }, page: '/q/modules/input', status: 'documented' },
  { id: 'qx40s1', model: 'QX40-S1', name: { vi: 'Module vào số QX40-S1', en: 'QX40-S1 DC input module' }, kind: 'input', role: { vi: '16 ngõ vào 24 VDC, common dương, bản -S1 dòng 6 mA', en: '16-point 24 VDC input, positive common, -S1 6 mA variant' }, keySpec: { vi: '16 điểm, 24 VDC, khoảng 6 mA/điểm', en: '16 points, 24 VDC, approx. 6 mA/point' }, manual: { doc: 'sh080042', page: '2-5' }, page: '/q/modules/input', status: 'documented' },
  { id: 'qx40ts', model: 'QX40-TS', name: { vi: 'Module vào số QX40-TS', en: 'QX40-TS DC input module' }, kind: 'input', role: { vi: '16 ngõ vào 24 VDC, common dương, khối đấu dây lò xo (-TS)', en: '16-point 24 VDC input, positive common, spring clamp terminal block (-TS)' }, keySpec: { vi: '16 điểm, 24 VDC, khoảng 4 mA/điểm', en: '16 points, 24 VDC, approx. 4 mA/point' }, manual: { doc: 'sh080042', page: '2-6' }, page: '/q/modules/input', status: 'documented' },
  { id: 'qx40h', model: 'QX40H', name: { vi: 'Module vào tốc độ cao QX40H', en: 'QX40H high-speed input module' }, kind: 'input', role: { vi: '16 ngõ vào 24 VDC, common dương, đáp ứng nhanh (H)', en: '16-point 24 VDC input, positive common, high-speed (H)' }, keySpec: { vi: '16 điểm, 24 VDC, khoảng 6 mA/điểm', en: '16 points, 24 VDC, approx. 6 mA/point' }, manual: { doc: 'sh080042', page: '2-7' }, page: '/q/modules/input', status: 'documented' },
  { id: 'qx41', model: 'QX41', name: { vi: 'Module vào số QX41', en: 'QX41 DC input module' }, kind: 'input', role: { vi: '32 ngõ vào 24 VDC, common dương', en: '32-point 24 VDC input, positive common' }, keySpec: { vi: '32 điểm, 24 VDC, khoảng 4 mA/điểm', en: '32 points, 24 VDC, approx. 4 mA/point' }, manual: { doc: 'sh080042', page: '2-9' }, page: '/q/modules/input', status: 'documented' },
  { id: 'qx41s1', model: 'QX41-S1', name: { vi: 'Module vào số QX41-S1', en: 'QX41-S1 DC input module' }, kind: 'input', role: { vi: '32 ngõ vào 24 VDC, common dương, bản -S1 ngưỡng OFF 9,5 V', en: '32-point 24 VDC input, positive common, -S1 OFF threshold 9.5 V' }, keySpec: { vi: '32 điểm, 24 VDC, khoảng 4 mA/điểm', en: '32 points, 24 VDC, approx. 4 mA/point' }, manual: { doc: 'sh080042', page: '2-10' }, page: '/q/modules/input', status: 'documented' },
  { id: 'qx41s2', model: 'QX41-S2', name: { vi: 'Module vào số QX41-S2', en: 'QX41-S2 DC input module' }, kind: 'input', role: { vi: '32 ngõ vào 24 VDC, common dương, bản -S2 ngưỡng ON 15 V, 6 mA', en: '32-point 24 VDC input, positive common, -S2 ON threshold 15 V, 6 mA' }, keySpec: { vi: '32 điểm, 24 VDC, khoảng 6 mA/điểm', en: '32 points, 24 VDC, approx. 6 mA/point' }, manual: { doc: 'sh080042', page: '2-12' }, page: '/q/modules/input', status: 'documented' },
  { id: 'qx42', model: 'QX42', name: { vi: 'Module vào số QX42', en: 'QX42 DC input module' }, kind: 'input', role: { vi: '64 ngõ vào 24 VDC, common dương', en: '64-point 24 VDC input, positive common' }, keySpec: { vi: '64 điểm, 24 VDC, khoảng 4 mA/điểm', en: '64 points, 24 VDC, approx. 4 mA/point' }, manual: { doc: 'sh080042', page: '2-13' }, page: '/q/modules/input', status: 'documented' },
  { id: 'qx42s1', model: 'QX42-S1', name: { vi: 'Module vào số QX42-S1', en: 'QX42-S1 DC input module' }, kind: 'input', role: { vi: '64 ngõ vào 24 VDC, common dương, bản -S1 ngưỡng OFF 9,5 V', en: '64-point 24 VDC input, positive common, -S1 OFF threshold 9.5 V' }, keySpec: { vi: '64 điểm, 24 VDC, khoảng 4 mA/điểm', en: '64 points, 24 VDC, approx. 4 mA/point' }, manual: { doc: 'sh080042', page: '2-15' }, page: '/q/modules/input', status: 'documented' },
  { id: 'qx50', model: 'QX50', name: { vi: 'Module vào AC/DC QX50', en: 'QX50 AC/DC input module' }, kind: 'input', role: { vi: '16 ngõ vào 48 VDC/48 VAC, common dương/âm dùng chung', en: '16-point 48 VDC/48 VAC input, positive/negative shared common' }, keySpec: { vi: '16 điểm, 48 VDC/48 VAC, khoảng 4 mA/điểm', en: '16 points, 48 VDC/48 VAC, approx. 4 mA/point' }, manual: { doc: 'sh080042', page: '2-17' }, page: '/q/modules/input', status: 'documented' },
  { id: 'qx70', model: 'QX70', name: { vi: 'Module vào DC QX70', en: 'QX70 DC input module' }, kind: 'input', role: { vi: '16 ngõ vào 5/12 VDC, common dương/âm dùng chung', en: '16-point 5/12 VDC input, positive/negative shared common' }, keySpec: { vi: '16 điểm, 5/12 VDC, khoảng 1,2/3,3 mA/điểm', en: '16 points, 5/12 VDC, approx. 1.2/3.3 mA/point' }, manual: { doc: 'sh080042', page: '2-18' }, page: '/q/modules/input', status: 'documented' },
  { id: 'qx70h', model: 'QX70H', name: { vi: 'Module vào tốc độ cao QX70H', en: 'QX70H high-speed input module' }, kind: 'input', role: { vi: '16 ngõ vào 5 VDC, common dương, đáp ứng nhanh (H)', en: '16-point 5 VDC input, positive common, high-speed (H)' }, keySpec: { vi: '16 điểm, 5 VDC, khoảng 6 mA/điểm', en: '16 points, 5 VDC, approx. 6 mA/point' }, manual: { doc: 'sh080042', page: '2-19' }, page: '/q/modules/input', status: 'documented' },
  { id: 'qx71', model: 'QX71', name: { vi: 'Module vào DC QX71', en: 'QX71 DC input module' }, kind: 'input', role: { vi: '32 ngõ vào 5/12 VDC, common dương/âm dùng chung', en: '32-point 5/12 VDC input, positive/negative shared common' }, keySpec: { vi: '32 điểm, 5/12 VDC, khoảng 1,2/3,3 mA/điểm', en: '32 points, 5/12 VDC, approx. 1.2/3.3 mA/point' }, manual: { doc: 'sh080042', page: '2-21' }, page: '/q/modules/input', status: 'documented' },
  { id: 'qx72', model: 'QX72', name: { vi: 'Module vào DC QX72', en: 'QX72 DC input module' }, kind: 'input', role: { vi: '64 ngõ vào 5/12 VDC, common dương/âm dùng chung', en: '64-point 5/12 VDC input, positive/negative shared common' }, keySpec: { vi: '64 điểm, 5/12 VDC, khoảng 1,2/3,3 mA/điểm', en: '64 points, 5/12 VDC, approx. 1.2/3.3 mA/point' }, manual: { doc: 'sh080042', page: '2-22' }, page: '/q/modules/input', status: 'documented' },
  { id: 'qx80', model: 'QX80', name: { vi: 'Module vào số QX80', en: 'QX80 DC input module' }, kind: 'input', role: { vi: '16 ngõ vào 24 VDC, common âm', en: '16-point 24 VDC input, negative common' }, keySpec: { vi: '16 điểm, 24 VDC, khoảng 4 mA/điểm', en: '16 points, 24 VDC, approx. 4 mA/point' }, manual: { doc: 'sh080042', page: '2-24' }, page: '/q/modules/input', status: 'documented' },
  { id: 'qx80ts', model: 'QX80-TS', name: { vi: 'Module vào số QX80-TS', en: 'QX80-TS DC input module' }, kind: 'input', role: { vi: '16 ngõ vào 24 VDC, common âm, khối đấu dây lò xo (-TS)', en: '16-point 24 VDC input, negative common, spring clamp terminal block (-TS)' }, keySpec: { vi: '16 điểm, 24 VDC, khoảng 4 mA/điểm', en: '16 points, 24 VDC, approx. 4 mA/point' }, manual: { doc: 'sh080042', page: '2-25' }, page: '/q/modules/input', status: 'documented' },
  { id: 'qx80h', model: 'QX80H', name: { vi: 'Module vào tốc độ cao QX80H', en: 'QX80H high-speed input module' }, kind: 'input', role: { vi: '16 ngõ vào 24 VDC, common âm, đáp ứng nhanh (H)', en: '16-point 24 VDC input, negative common, high-speed (H)' }, keySpec: { vi: '16 điểm, 24 VDC, khoảng 6 mA/điểm', en: '16 points, 24 VDC, approx. 6 mA/point' }, manual: { doc: 'sh080042', page: '2-26' }, page: '/q/modules/input', status: 'documented' },
  { id: 'qx81', model: 'QX81', name: { vi: 'Module vào số QX81', en: 'QX81 DC input module' }, kind: 'input', role: { vi: '32 ngõ vào 24 VDC, common âm', en: '32-point 24 VDC input, negative common' }, keySpec: { vi: '32 điểm, 24 VDC, khoảng 4 mA/điểm', en: '32 points, 24 VDC, approx. 4 mA/point' }, manual: { doc: 'sh080042', page: '2-28' }, page: '/q/modules/input', status: 'documented' },
  { id: 'qx81s2', model: 'QX81-S2', name: { vi: 'Module vào số QX81-S2', en: 'QX81-S2 DC input module' }, kind: 'input', role: { vi: '32 ngõ vào 24 VDC, common âm, bản -S2 ngưỡng ON 15 V, 6 mA', en: '32-point 24 VDC input, negative common, -S2 ON threshold 15 V, 6 mA' }, keySpec: { vi: '32 điểm, 24 VDC, khoảng 6 mA/điểm', en: '32 points, 24 VDC, approx. 6 mA/point' }, manual: { doc: 'sh080042', page: '2-29' }, page: '/q/modules/input', status: 'documented' },
  { id: 'qx82', model: 'QX82', name: { vi: 'Module vào số QX82', en: 'QX82 DC input module' }, kind: 'input', role: { vi: '64 ngõ vào 24 VDC, common âm', en: '64-point 24 VDC input, negative common' }, keySpec: { vi: '64 điểm, 24 VDC, khoảng 4 mA/điểm', en: '64 points, 24 VDC, approx. 4 mA/point' }, manual: { doc: 'sh080042', page: '2-30' }, page: '/q/modules/input', status: 'documented' },
  { id: 'qx82s1', model: 'QX82-S1', name: { vi: 'Module vào số QX82-S1', en: 'QX82-S1 DC input module' }, kind: 'input', role: { vi: '64 ngõ vào 24 VDC, common âm, bản -S1 ngưỡng OFF 9,5 V', en: '64-point 24 VDC input, negative common, -S1 OFF threshold 9.5 V' }, keySpec: { vi: '64 điểm, 24 VDC, khoảng 4 mA/điểm', en: '64 points, 24 VDC, approx. 4 mA/point' }, manual: { doc: 'sh080042', page: '2-32' }, page: '/q/modules/input', status: 'documented' },
  { id: 'qx90h', model: 'QX90H', name: { vi: 'Module vào tốc độ cao QX90H', en: 'QX90H high-speed input module' }, kind: 'input', role: { vi: '16 ngõ vào 5 VDC, common âm, đáp ứng nhanh (H)', en: '16-point 5 VDC input, negative common, high-speed (H)' }, keySpec: { vi: '16 điểm, 5 VDC, khoảng 6 mA/điểm', en: '16 points, 5 VDC, approx. 6 mA/point' }, manual: { doc: 'sh080042', page: '2-34' }, page: '/q/modules/input', status: 'documented' },
  { id: 'qy10', model: 'QY10', name: { vi: 'Module ra tiếp điểm QY10', en: 'QY10 contact output module' }, kind: 'output', role: { vi: '16 ngõ ra tiếp điểm rơ le, 8 A/common', en: '16-point relay contact output, 8 A/common' }, keySpec: { vi: '16 điểm, 24 VDC 2 A / 240 VAC 2 A, 8 A/common', en: '16 points, 24 VDC 2 A / 240 VAC 2 A, 8 A/common' }, manual: { doc: 'sh080042', page: '3-1' }, page: '/q/modules/output', status: 'documented' },
  { id: 'qy10ts', model: 'QY10-TS', name: { vi: 'Module ra tiếp điểm QY10-TS', en: 'QY10-TS contact output module' }, kind: 'output', role: { vi: '16 ngõ ra tiếp điểm rơ le, khối đấu dây lò xo (-TS)', en: '16-point relay contact output, spring clamp terminal block (-TS)' }, keySpec: { vi: '16 điểm, 24 VDC 2 A / 240 VAC 2 A, 8 A/common', en: '16 points, 24 VDC 2 A / 240 VAC 2 A, 8 A/common' }, manual: { doc: 'sh080042', page: '3-2' }, page: '/q/modules/output', status: 'documented' },
  { id: 'qy18a', model: 'QY18A', name: { vi: 'Module ra tiếp điểm QY18A', en: 'QY18A contact output module' }, kind: 'output', role: { vi: '8 ngõ ra tiếp điểm rơ le, độc lập từng điểm', en: '8-point relay contact output, all points independent' }, keySpec: { vi: '8 điểm, 24 VDC 2 A / 240 VAC 2 A, 8 A/unit', en: '8 points, 24 VDC 2 A / 240 VAC 2 A, 8 A/unit' }, manual: { doc: 'sh080042', page: '3-4' }, page: '/q/modules/output', status: 'documented' },
  { id: 'qy22', model: 'QY22', name: { vi: 'Module ra TRIAC QY22', en: 'QY22 TRIAC output module' }, kind: 'output', role: { vi: '16 ngõ ra TRIAC 100–240 VAC', en: '16-point 100–240 VAC TRIAC output' }, keySpec: { vi: '16 điểm, 100–240 VAC, 0,6 A/điểm, 4,8 A/common', en: '16 points, 100–240 VAC, 0.6 A/point, 4.8 A/common' }, manual: { doc: 'sh080042', page: '3-5' }, page: '/q/modules/output', status: 'documented' },
  { id: 'qy40pts', model: 'QY40P-TS', name: { vi: 'Module ra transistor QY40P-TS', en: 'QY40P-TS transistor output module' }, kind: 'output', role: { vi: '16 ngõ ra transistor sink, khối đấu dây lò xo (-TS)', en: '16-point sink transistor output, spring clamp terminal block (-TS)' }, keySpec: { vi: '16 điểm, 12–24 VDC, 0,1 A/điểm, 1,6 A/common', en: '16 points, 12–24 VDC, 0.1 A/point, 1.6 A/common' }, manual: { doc: 'sh080042', page: '3-8' }, page: '/q/modules/output', status: 'documented' },
  { id: 'qy41h', model: 'QY41H', name: { vi: 'Module ra tốc độ cao QY41H', en: 'QY41H high-speed output module' }, kind: 'output', role: { vi: '32 ngõ ra transistor sink, đáp ứng nhanh (H)', en: '32-point sink transistor output, high-speed (H)' }, keySpec: { vi: '32 điểm, 5–24 VDC, 0,2 A/điểm, 2 A/common', en: '32 points, 5–24 VDC, 0.2 A/point, 2 A/common' }, manual: { doc: 'sh080042', page: '3-10' }, page: '/q/modules/output', status: 'documented' },
  { id: 'qy41p', model: 'QY41P', name: { vi: 'Module ra transistor QY41P', en: 'QY41P transistor output module' }, kind: 'output', role: { vi: '32 ngõ ra transistor sink', en: '32-point sink transistor output' }, keySpec: { vi: '32 điểm, 12–24 VDC, 0,1 A/điểm, 2 A/common', en: '32 points, 12–24 VDC, 0.1 A/point, 2 A/common' }, manual: { doc: 'sh080042', page: '3-11' }, page: '/q/modules/output', status: 'documented' },
  { id: 'qy42p', model: 'QY42P', name: { vi: 'Module ra transistor QY42P', en: 'QY42P transistor output module' }, kind: 'output', role: { vi: '64 ngõ ra transistor sink', en: '64-point sink transistor output' }, keySpec: { vi: '64 điểm, 12–24 VDC, 0,1 A/điểm, 2 A/common', en: '64 points, 12–24 VDC, 0.1 A/point, 2 A/common' }, manual: { doc: 'sh080042', page: '3-12' }, page: '/q/modules/output', status: 'documented' },
  { id: 'qy50', model: 'QY50', name: { vi: 'Module ra transistor QY50', en: 'QY50 transistor output module' }, kind: 'output', role: { vi: '16 ngõ ra transistor sink 0,5 A/điểm', en: '16-point sink transistor output, 0.5 A/point' }, keySpec: { vi: '16 điểm, 12–24 VDC, 0,5 A/điểm, 4 A/common', en: '16 points, 12–24 VDC, 0.5 A/point, 4 A/common' }, manual: { doc: 'sh080042', page: '3-13' }, page: '/q/modules/output', status: 'documented' },
  { id: 'qy68a', model: 'QY68A', name: { vi: 'Module ra transistor QY68A', en: 'QY68A transistor output module' }, kind: 'output', role: { vi: '8 ngõ ra transistor sink/source, độc lập từng điểm', en: '8-point sink/source transistor output, all points independent' }, keySpec: { vi: '8 điểm, 5–24 VDC, 2 A/điểm, 8 A/unit', en: '8 points, 5–24 VDC, 2 A/point, 8 A/unit' }, manual: { doc: 'sh080042', page: '3-15' }, page: '/q/modules/output', status: 'documented' },
  { id: 'qy70', model: 'QY70', name: { vi: 'Module ra transistor QY70', en: 'QY70 transistor output module' }, kind: 'output', role: { vi: '16 ngõ ra transistor sink, 5/12 VDC', en: '16-point sink transistor output, 5/12 VDC' }, keySpec: { vi: '16 điểm, 5/12 VDC, 16 mA/điểm, 256 mA/common', en: '16 points, 5/12 VDC, 16 mA/point, 256 mA/common' }, manual: { doc: 'sh080042', page: '3-16' }, page: '/q/modules/output', status: 'documented' },
  { id: 'qy71', model: 'QY71', name: { vi: 'Module ra transistor QY71', en: 'QY71 transistor output module' }, kind: 'output', role: { vi: '32 ngõ ra transistor sink, 5/12 VDC', en: '32-point sink transistor output, 5/12 VDC' }, keySpec: { vi: '32 điểm, 5/12 VDC, 16 mA/điểm, 512 mA/common', en: '32 points, 5/12 VDC, 16 mA/point, 512 mA/common' }, manual: { doc: 'sh080042', page: '3-18' }, page: '/q/modules/output', status: 'documented' },
  { id: 'qy80', model: 'QY80', name: { vi: 'Module ra transistor QY80', en: 'QY80 transistor output module' }, kind: 'output', role: { vi: '16 ngõ ra transistor source', en: '16-point source transistor output' }, keySpec: { vi: '16 điểm, 12–24 VDC, 0,5 A/điểm, 4 A/common', en: '16 points, 12–24 VDC, 0.5 A/point, 4 A/common' }, manual: { doc: 'sh080042', page: '3-19' }, page: '/q/modules/output', status: 'documented' },
  { id: 'qy80ts', model: 'QY80-TS', name: { vi: 'Module ra transistor QY80-TS', en: 'QY80-TS transistor output module' }, kind: 'output', role: { vi: '16 ngõ ra transistor source, khối đấu dây lò xo (-TS)', en: '16-point source transistor output, spring clamp terminal block (-TS)' }, keySpec: { vi: '16 điểm, 12–24 VDC, 0,5 A/điểm, 4 A/common', en: '16 points, 12–24 VDC, 0.5 A/point, 4 A/common' }, manual: { doc: 'sh080042', page: '3-21' }, page: '/q/modules/output', status: 'documented' },
  { id: 'qy81p', model: 'QY81P', name: { vi: 'Module ra transistor QY81P', en: 'QY81P transistor output module' }, kind: 'output', role: { vi: '32 ngõ ra transistor source', en: '32-point source transistor output' }, keySpec: { vi: '32 điểm, 12–24 VDC, 0,1 A/điểm, 2 A/common', en: '32 points, 12–24 VDC, 0.1 A/point, 2 A/common' }, manual: { doc: 'sh080042', page: '3-23' }, page: '/q/modules/output', status: 'documented' },
  { id: 'qy82p', model: 'QY82P', name: { vi: 'Module ra transistor QY82P', en: 'QY82P transistor output module' }, kind: 'output', role: { vi: '64 ngõ ra transistor source', en: '64-point source transistor output' }, keySpec: { vi: '64 điểm, 12–24 VDC, 0,1 A/điểm, 2 A/common', en: '64 points, 12–24 VDC, 0.1 A/point, 2 A/common' }, manual: { doc: 'sh080042', page: '3-24' }, page: '/q/modules/output', status: 'documented' },
  { id: 'qh42p', model: 'QH42P', name: { vi: 'Module kết hợp vào/ra QH42P', en: 'QH42P combined I/O module' }, kind: 'combined', role: { vi: '32 vào 24 VDC + 32 ra transistor sink', en: '32-point 24 VDC input + 32-point sink transistor output' }, keySpec: { vi: '32 vào + 32 ra, 24 VDC 4 mA; 12–24 VDC 0,1 A/điểm', en: '32 in + 32 out, 24 VDC 4 mA; 12–24 VDC 0.1 A/point' }, manual: { doc: 'sh080042', page: '4-1' }, page: '/q/modules/io', status: 'documented' },
  { id: 'qx41y41p', model: 'QX41Y41P', name: { vi: 'Module kết hợp vào/ra QX41Y41P', en: 'QX41Y41P combined I/O module' }, kind: 'combined', role: { vi: '32 vào 24 VDC + 32 ra transistor sink', en: '32-point 24 VDC input + 32-point sink transistor output' }, keySpec: { vi: '32 vào + 32 ra, 24 VDC 4 mA; 12–24 VDC 0,1 A/điểm', en: '32 in + 32 out, 24 VDC 4 mA; 12–24 VDC 0.1 A/point' }, manual: { doc: 'sh080042', page: '4-4' }, page: '/q/modules/io', status: 'documented' },
  { id: 'qx48y57', model: 'QX48Y57', name: { vi: 'Module kết hợp vào/ra QX48Y57', en: 'QX48Y57 combined I/O module' }, kind: 'combined', role: { vi: '8 vào 24 VDC + 7 ra transistor sink', en: '8-point 24 VDC input + 7-point sink transistor output' }, keySpec: { vi: '8 vào + 7 ra, 24 VDC 4 mA; 12–24 VDC 0,5 A/điểm', en: '8 in + 7 out, 24 VDC 4 mA; 12–24 VDC 0.5 A/point' }, manual: { doc: 'sh080042', page: '4-7' }, page: '/q/modules/io', status: 'documented' },
  { id: 'qi60', model: 'QI60', name: { vi: 'Module ngắt QI60', en: 'QI60 interrupt module' }, kind: 'input', role: { vi: '16 ngõ vào ngắt 24 VDC', en: '16-point 24 VDC interrupt input' }, keySpec: { vi: '16 điểm, 24 VDC, khoảng 6 mA/điểm', en: '16 points, 24 VDC, approx. 6 mA/point' }, manual: { doc: 'sh080042', page: '5-1' }, page: '/q/modules/input', status: 'documented' },
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
    page: '',
    status: 'planned'
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
