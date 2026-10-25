import { PartnershipDeedState } from '../types/partnership';

export const DEFAULT_PARTNERSHIP_STATE: PartnershipDeedState = {
  selectedSubDoc: 'all',
  info: {
    firmName: 'TEXORA APPAREL',
    startDate: '2024-01-01',
    regAddress: 'House # 12, Road # 05, Sector # 11, Uttara, Dhaka-1230, Bangladesh',
    bizAddress: 'House # 12, Road # 05, Sector # 11, Uttara, Dhaka-1230, Bangladesh',
    capitalAmount: '200000',
    businessScope1:
      'Manufacturing, exporting, importing, indenting, marketing, wholesaling, buying house operations, apparel sourcing, supply chain management, and retailing of all kinds of Readymade Garments (RMG), knitwear, woven garments, denim, outerwear, children clothing, and fashion sportswear.',
    businessScope2:
      'Engaging in textile accessories, fabrics, yarn procurement, trims, digital printing, embroidery, design studio, quality assurance inspection, and any other lawful commercial or manufacturing activities mutually agreed upon in writing by the partners.',
    financialYear: '1st July to 30th June each year',
    notaryLocation: 'Dhaka, Bangladesh',
    totalPages: 4
  },
  party1: {
    id: 'p1',
    name: 'MD. SHAHIDUL ISLAM',
    father: 'Late Abdul Kader',
    mother: 'Saleha Begum',
    address: 'House # 12, Road # 05, Sector # 11, Uttara, Dhaka-1230, Bangladesh',
    dob: '1985-08-15',
    nid: '19852692518000123',
    tin: '458921734567',
    profession: 'Business',
    nationality: 'Bangladeshi by birth',
    sharePct: '50',
    shareAmt: '100000',
    role: 'MANAGING PARTNER'
  },
  party2: {
    id: 'p2',
    name: 'MD. MONIRUL ISLAM',
    father: 'Late Abdul Kader',
    mother: 'Saleha Begum',
    address: 'House # 12, Road # 05, Sector # 11, Uttara, Dhaka-1230, Bangladesh',
    dob: '1988-02-10',
    nid: '19882692518000456',
    tin: '458921734568',
    profession: 'Business',
    nationality: 'Bangladeshi by birth',
    sharePct: '50',
    shareAmt: '100000',
    role: 'PARTNER'
  },
  witnesses: [
    {
      id: 'w1',
      name: 'Anamul Haque',
      father: 'Md. Nurul Islam',
      address: 'House # 08, Road # 03, Sector # 10, Uttara, Dhaka-1230',
      phone: '01711-234567',
      nid: '19822692518000789'
    },
    {
      id: 'w2',
      name: 'Minhazul Islam',
      father: 'Md. Rafiqul Islam',
      address: 'House # 15, Road # 18, Sector # 07, Uttara, Dhaka-1230',
      phone: '01819-876543',
      nid: '19902692518000999'
    }
  ]
};
