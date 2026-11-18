export type WireRow = {
  axisGroup: string
  qd75Terminal: string
  qd75Signal: string
  direction: 'QD75 → driver' | 'driver → QD75' | 'power'
  drivePin?: string
  note?: string
  src: string
}

const AX1 = 'Trục 1 (AX1, cổng phải)'
const LAYOUT = 'SH-080058 §3.4.2 p.3-25'
const DETAIL = 'SH-080058 §3.4.3 p.3-26'
const DETAIL_IN = 'SH-080058 §3.4.3 p.3-27'

export const axisRow: WireRow[] = [
  {
    axisGroup: AX1,
    qd75Terminal: '1A11',
    qd75Signal: 'READY (Drive unit READY)',
    direction: 'driver → QD75',
    note: 'Ngõ vào báo driver đã sẵn sàng; điểm chung là RDYCOM 1A12.',
    src: `${LAYOUT}; ${DETAIL_IN}`
  },
  {
    axisGroup: AX1,
    qd75Terminal: '1A15',
    qd75Signal: 'PULSE F+',
    direction: 'QD75 → driver',
    drivePin: 'PP',
    note: 'Manual ghi "Pulse output F (+)". Đi thành cặp với 1A16; pin driver là ví dụ MR-J3-A trong SH-080058 §3.4.1 p.3-24, từng drive tra bảng riêng.',
    src: `${LAYOUT}; ${DETAIL}`
  },
  {
    axisGroup: AX1,
    qd75Terminal: '1A16',
    qd75Signal: 'PULSE F−',
    direction: 'QD75 → driver',
    drivePin: 'PG',
    note: 'Manual ghi "Pulse output F (-)". Không tách cặp với 1A15.',
    src: `${LAYOUT}; ${DETAIL}`
  },
  {
    axisGroup: AX1,
    qd75Terminal: '1A17',
    qd75Signal: 'PULSE R+',
    direction: 'QD75 → driver',
    drivePin: 'NP',
    note: 'Manual ghi "Pulse output R (+)". Đi thành cặp với 1A18.',
    src: `${LAYOUT}; ${DETAIL}`
  },
  {
    axisGroup: AX1,
    qd75Terminal: '1A18',
    qd75Signal: 'PULSE R−',
    direction: 'QD75 → driver',
    drivePin: 'NG',
    note: 'Manual ghi "Pulse output R (-)". Không tách cặp với 1A17.',
    src: `${LAYOUT}; ${DETAIL}`
  },
  {
    axisGroup: AX1,
    qd75Terminal: '1A9',
    qd75Signal: 'PG05 (Zero signal +5V)',
    direction: 'driver → QD75',
    note: 'Manual in "PG05" bằng số 0, không phải "PGO5" như bản vẽ thứ ba. Dùng cho tín hiệu zero khi về gốc; bản +24 V là 1A8 PG024.',
    src: `${LAYOUT}; ${DETAIL}`
  },
  {
    axisGroup: AX1,
    qd75Terminal: '1A10',
    qd75Signal: 'PG0COM (Zero signal common)',
    direction: 'power',
    note: 'Manual in "PG0COM" bằng số 0, không phải "PGOCOM". Là điểm chung của PG05 và PG024.',
    src: `${LAYOUT}; ${DETAIL}`
  }
]

export const qd75PinoutSrc = 'SH-080058 §3.4.2 p.3-25 (pin layout), §3.4.3 p.3-26–3-27 (signal details)'
