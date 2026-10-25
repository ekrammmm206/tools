export interface Director {
  id: string;
  name: string;
  address: string;
  description: string;
  signatureText?: string;
  signatureImg?: string;
}

export interface Subscriber {
  id: string;
  name: string;
  role: string; // e.g. "Chairman", "Managing Director", "Director", "Subscriber"
  address: string;
  father: string;
  mother: string;
  dob: string;
  email: string;
  phone: string;
  tin: string;
  nationality: string;
  nid: string;
  shares: number;
  photoUrl?: string;
  signatureText?: string;
  signatureImg?: string;
  avatarStyle?: 'woman1' | 'woman2' | 'man1' | 'man2' | 'man3' | 'custom';
}

export interface Signatory {
  id: string;
  name: string;
  address: string;
  phone: string;
  nid: string;
  signatureImg?: string;
}

export interface CompanyInfo {
  companyName: string;
  presenterName: string;
  presenterDesignation: string;
  presenterAddress: string;
  date: string;
  filingFee: string;
  authorizedCapital: number;
  faceValuePerShare: number;
  numberingSystem: 'international' | 'southAsian';
  regOfficeLocation?: string;
}

export interface DocumentState {
  company: CompanyInfo;
  directors: Director[];
  subscribers: Subscriber[];
  signatories: [Signatory, Signatory];
  includedSections: {
    cover: boolean;
    formI: boolean;
    formIX: boolean;
    moa: boolean;
    signatories: boolean;
    formXII: boolean;
  };
}
