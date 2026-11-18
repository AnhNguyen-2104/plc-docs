export type PdfDoc = {
  key: string
  title: string
  url: string
  short?: string
  map: Record<string, number>
}

export const pdfDocs: Record<string, PdfDoc> = {
  sh080058: {
    key: 'sh080058',
    short: 'SH-080058',
    title: 'Mitsubishi SH-080058 — QD75 positioning module',
    url: 'https://dl.mitsubishielectric.com/dl/fa/document/manual/plc/sh080058/sh080058v.pdf',
    map: {
      '1-1': 25,
      '3-2': 60,
      '3-16': 74,
      '3-19': 77,
      '3-24': 82,
      '3-25': 83,
      '3-26': 84,
      '3-27': 85,
      '5-8': 112,
      '5-18': 122,
      '5-19': 123,
      '5-20': 124,
      '5-21': 125,
      '5-24': 128,
      '5-31': 135,
      '5-45': 149,
      '5-54': 158,
      '5-59': 163,
      '5-60': 164,
      '5-70': 174,
      '5-71': 175,
      '7-5': 289,
      'Appendix-150': 866,
      'A-19': 21
    }
  },
  sh030143: {
    key: 'sh030143',
    short: 'SH-030143',
    title: 'Mitsubishi SH-030143ENG-D — MR-J4-_A_-RJ positioning mode',
    url: 'https://dl.mitsubishielectric.com/dl/fa/document/manual/servo/sh030143/sh030143d.pdf',
    map: {
      '1-1': 18,
      '2-14': 43,
      '2-16': 45,
      '2-17': 46,
      '2-18': 47,
      '2-19': 48,
      '2-22': 51,
      '2-23': 52,
      '2-30': 59,
      '2-31': 60,
      '7-19': 326,
      '7-21': 328,
      '7-23': 330,
      '7-67': 374,
      '7-93': 400
    }
  },
  'asda-b2': {
    key: 'asda-b2',
    short: 'ASDA-B2',
    title: 'Delta ASDA-B2 — User Manual',
    url: 'https://files.deltaacdrives.com/Delta-ASDA-B2-User-Manual.pdf',
    map: {
      '3-18': 61,
      '3-19': 62,
      '3-20': 63,
      '3-21': 64,
      '3-22': 65
    }
  },
  sgd7s: {
    key: 'sgd7s',
    short: 'SIEP 26O',
    title: 'Yaskawa Sigma-7 SGD7S — SIEP S800001 26O',
    url: 'https://sigma7.eu/wp-content/uploads/Verst%C3%A4rker/AdditionalRessources/Manual_SGD7S-xxx-A00A-xxxxxxx-Analog_200V.pdf',
    map: {
      '4-35': 128,
      '4-36': 129,
      '4-37': 130,
      '4-38': 131
    }
  },
  'minas-a6': {
    key: 'minas-a6',
    short: 'SX-DSV03025',
    title: 'Panasonic MINAS A6 — SX-DSV03031',
    url: 'https://mediap.industry.panasonic.eu/assets/download-files/import/mn_minas_a6_all_types_reference_pidsx_en.pdf',
    map: {
      '45': 48
    }
  },
  dm542: {
    key: 'dm542',
    short: 'DM542',
    title: 'Leadshine DM542 — Rev 3.0',
    url: 'https://www.oyostepper.com/images/upload/File/Leadshine%20DM542%20Stepper%20Motor%20Driver%20User%20Manual.pdf',
    map: {
      '3': 6,
      '4': 7
    }
  }
}
