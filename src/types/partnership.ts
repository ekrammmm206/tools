export interface PartnerParty {
  id: string;
  name: string;
  father: string;
  mother: string;
  address: string;
  dob: string;
  nid: string;
  tin: string;
  profession: string;
  nationality: string;
  sharePct: string;
  shareAmt: string;
  role: 'MANAGING PARTNER' | 'PARTNER' | string;
}

export interface PartnershipWitness {
  id: string;
  name: string;
  father: string;
  address: string;
  phone: string;
  nid: string;
}

export interface PartnershipInfo {
  firmName: string;
  startDate: string;
  regAddress: string;
  bizAddress: string;
  capitalAmount: string;
  businessScope1: string;
  businessScope2: string;
  financialYear: string;
  notaryLocation: string;
  totalPages: number;
}

export interface PartnershipDeedState {
  selectedSubDoc:
    | 'all'
    | 'parties'
    | 'capital'
    | 'management'
    | 'covenants'
    | 'dissolution'
    | 'signatures';
  info: PartnershipInfo;
  party1: PartnerParty;
  party2: PartnerParty;
  witnesses: [PartnershipWitness, PartnershipWitness];
}
