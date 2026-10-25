import { ValuationDocumentState } from '../types/valuation';

export const DEFAULT_VALUATION_STATE: ValuationDocumentState = {
  general: {
    refNo: 'AVEL/TASN/46137',
    reportDate: '25 April 2026',
    reportDateShort: '25-Apr-2026',
    valuationDate: '21 May 2026',
    foreignCurrencyCode: 'NZD',
    foreignCurrencySymbol: '$',
    exchangeRate: 72.00,
    exchangeRateSource: 'Western Union Exchange Rate Reference',
    firmName: 'A. Rahman & Co.',
    valuerName: 'Md. Anisur Rahman, FCA',
    valuerDesignation: 'Chartered Accountants & Certified Valuers'
  },
  applicant: {
    name: 'TASNEEM FERDOUSA',
    passport: 'A03334365',
    nid: '7793647848'
  },
  sponsor: {
    name: 'DR FERDOUS NILUFAR',
    passport: 'B00048151',
    nid: '5093331618',
    relationship: 'Mother / Legal Sponsor'
  },
  summary: {
    landBdt: 52450000,
    invBdt: 17015732,
    incBdt: 7260000,
    useLiveTableSums: false
  },
  lands: [
    {
      id: 'land-1',
      deed: '1723 / 08-Jan-2017',
      details: 'Land property situated at Haragram Mouza under Boalia Thana, Rajshahi District, recorded under Khatian Nos. SA-912, 1045; RS-203, 218; BRS-457, J.L. No. RS-109, Jote No. 2487, comprising 19.00 decimals out of total 72 decimals of Boro class land in C.S./S.A. Dag No. 1234 and R.S. Dag No. 795, of which 50% share belongs to me.',
      purchase: 800000,
      cap: 800000,
      book: 7600000,
      fmv: 212223
    },
    {
      id: 'land-2',
      deed: '08-May-2017',
      details: 'The property is located at Mouza Haragram, Union Rajshahi, Thana Boalia, District Rajshahi, covering 0.300 acre of residential land valued at BDT 5,00,000/- The land records include Khatian CS 350, SA 547, RS 199, Dag CS 1636 and RS 4065, with Mutation Khatian 3820 and Mutation Case No. 869 (Jomabandi 1994).',
      purchase: 800000,
      cap: 800000,
      book: 7600000,
      fmv: 0
    }
  ],
  investments: [
    {
      id: 'inv-1',
      nature: 'Fixed Deposit Receipt (FDR)',
      inst: 'Agrani Bank PLC, Court Bazar Branch, Rajshahi',
      acc: '200025119908',
      amount: 5379500
    },
    {
      id: 'inv-2',
      nature: 'Savings & Deposit Accounts',
      inst: 'City Bank PLC, Rajshahi Branch',
      acc: '2401110685001',
      amount: 1062776
    },
    {
      id: 'inv-3',
      nature: 'Government Savings Instruments',
      inst: 'Prime Bank PLC, Rajshahi Branch',
      acc: '2112419031792',
      amount: 500000
    },
    {
      id: 'inv-4',
      nature: 'Shares, Securities & Other Investments',
      inst: 'Prime Bank PLC, Rajshahi Branch',
      acc: '2112411031790',
      amount: 500000
    }
  ],
  employmentIncomes: [
    {
      id: 'emp-1',
      particulars: 'Salary as Manager, Employer Name: Gaziour Electronics',
      monthly: 54500,
      annual: 654000
    }
  ],
  rentalIncomes: [
    {
      id: 'rent-1',
      floor: '1st Floor',
      description: '02 Residential Flats',
      rentPerUnit: 18500,
      monthly: 37000,
      annual: 444000
    },
    {
      id: 'rent-2',
      floor: '2nd Floor',
      description: '02 Commercial Units',
      rentPerUnit: 18500,
      monthly: 37000,
      annual: 444000
    },
    {
      id: 'rent-3',
      floor: '3rd Floor',
      description: '02 Residential Flats',
      rentPerUnit: 18500,
      monthly: 37000,
      annual: 444000
    },
    {
      id: 'rent-4',
      floor: '4th Floor',
      description: '02 Flats: (01 Residential Flats, 01 Used for Personal Purpose)',
      rentPerUnit: 18500,
      monthly: 18500,
      annual: 222000
    }
  ],
  businessIncomes: [
    {
      id: 'biz-1',
      source: 'Tanvir International',
      monthly: 185542,
      annual: 2226504
    }
  ],
  includedPages: {
    cover: true,
    toc: true,
    executiveSummary: true,
    summaryTable: true,
    certProperties: true,
    certInvestments: true,
    certIncome: true,
    annexureA: true,
    annexureB: true,
    annexureC: true,
    valuationNotes: true
  }
};
