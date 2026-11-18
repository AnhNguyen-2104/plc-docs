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
      '3-22': 65,
      '3-26': 69
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
  },

  sh080483: {
    key: 'sh080483',
    short: 'SH-080483',
    title: 'Mitsubishi SH-080483ENG-BC \u2014 QCPU User\u2019s Manual (Hardware Design, Maintenance and Inspection)',
    url: 'https://www.mitsubishielectric.com/dl/fa/document/manual/plc/sh080483eng/sh080483engbc.pdf',
    map: {
      '1.1': 28,
      '1.1.3': 29,
      '1.1.4': 30,
      '6.1.3': 132,
      '6.1.3-udh': 142,
      '6.1.3-udv': 145,
      '7.2.1': 214,
      '8.3': 249
    }
  },
  sh080042: {
    key: 'sh080042',
    short: 'SH-080042',
    title: 'Mitsubishi SH-080042ENG-AH \u2014 I/O Module Type Building Block User\u2019s Manual',
    url: 'https://www.mitsubishielectric.com/dl/fa/document/manual/plc/sh080042/sh080042ah.pdf',
    map: {
      '2.4': 42,
      '3.5': 81
    }
  },
  sh080055: {
    key: 'sh080055',
    short: 'SH-080055',
    title: 'Mitsubishi SH-080055U \u2014 Analog-Digital Converter Module (Q64AD/Q68AD)',
    url: 'https://www.mitsubishielectric.com/dl/fa/document/manual/plc/sh080055/sh080055u.pdf',
    map: {
      '3.1': 27,
      '3.1-conv': 28,
      '3.4.1': 44,
      '4.3': 63,
      '6.1.2': 111
    }
  },
  sh080054: {
    key: 'sh080054',
    short: 'SH-080054',
    title: 'Mitsubishi SH-080054V \u2014 Digital-Analog Converter Module (Q62DA/Q68DA)',
    url: 'https://www.mitsubishielectric.com/dl/fa/document/manual/plc/sh080054/sh080054v.pdf',
    map: {
      '3.1.2': 29,
      '3.4.1': 47,
      '4.3': 65
    }
  },
  sh080036: {
    key: 'sh080036',
    short: 'SH-080036',
    title: 'Mitsubishi SH-080036Q \u2014 High-Speed Counter Module (QD62/QD62E/QD64)',
    url: 'https://dl.mitsubishielectric.com/dl/fa/document/manual/plc/sh080036/sh080036q.pdf',
    map: {
      '3.1': 25,
      '3.1.2': 26,
      '3.5': 36,
      '5.1.3': 61
    }
  },
  sh080006: {
    key: 'sh080006',
    short: 'SH-080006',
    title: 'Mitsubishi SH-080006W \u2014 Serial Communication Module User\u2019s Manual (Basic)',
    url: 'https://dl.mitsubishielectric.com/dl/fa/document/manual/plc/sh080006/sh080006w.pdf',
    map: {
      '3.1': 62,
      '3.3': 68
    }
  },
  sh080009: {
    key: 'sh080009',
    short: 'SH-080009',
    title: 'Mitsubishi SH-080009Y \u2014 Ethernet Interface Module User\u2019s Manual (Basic)',
    url: 'https://dl.mitsubishielectric.com/dl/fa/document/manual/plc/sh080009/sh080009y.pdf',
    map: {
      '3.2': 28
    }
  },
  sh080016: {
    key: 'sh080016',
    short: 'SH-080016',
    title: 'Mitsubishi SH-080016E \u2014 CC-Link System Master/Local Module (QJ61BT11)',
    url: 'https://dl.mitsubishielectric.com/dl/fa/document/manual/plc/sh080016/sh080016e.pdf',
    map: {
      '3.1': 38
    }
  },
  sh080049: {
    key: 'sh080049',
    short: 'SH-080049',
    title: 'Mitsubishi SH-080049T \u2014 MELSECNET/H Network System Reference Manual (PLC to PLC)',
    url: 'https://dl.mitsubishielectric.com/dl/fa/document/manual/plc/sh080049/sh080049t.pdf',
    map: {
      '1.2': 25
    }
  },
  ib0300062: {
    key: 'ib0300062',
    short: 'IB-0300062',
    title: 'Mitsubishi IB-0300062C \u2014 QD75M Positioning Module User\u2019s Manual',
    url: 'https://dl.mitsubishielectric.com/dl/fa/document/manual/plc/ib0300062/ib0300062c.pdf',
    map: {
      '3.1': 55
    }
  },
  ib0300185: {
    key: 'ib0300185',
    short: 'IB-0300185',
    title: 'Mitsubishi IB-0300185K \u2014 QD77MS Simple Motion Module User\u2019s Manual',
    url: 'https://dl.mitsubishielectric.com/dl/fa/document/manual/plc/ib0300185/ib0300185k.pdf',
    map: {
      '3.1': 74
    }
  },
  sh080807: {
    key: 'sh080807',
    short: 'SH-080807',
    title: 'Mitsubishi SH-080807ENG-AF \u2014 QnUCPU User\u2019s Manual (Function Explanation, Program Fundamentals)',
    url: 'https://www.mitsubishielectric.com/dl/fa/document/manual/plc/sh080807eng/sh080807engaf.pdf',
    map: {
      '2.4': 69
    }
  }
}
