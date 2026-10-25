export interface ApplicantInfo {
  name: string;
  passport: string;
  nid: string;
}

export interface SponsorInfo {
  name: string;
  passport: string;
  nid: string;
  relationship?: string;
}

export interface GeneralValuationInfo {
  refNo: string;
  reportDate: string;
  reportDateShort: string;
  valuationDate: string;
  foreignCurrencyCode: string; // e.g., 'NZD', 'USD', 'CAD', 'AUD', 'GBP', 'EUR'
  foreignCurrencySymbol: string; // e.g., '$', 'NZ$', '£', '€'
  exchangeRate: number; // e.g., 72.00
  exchangeRateSource: string; // e.g., 'Western Union Exchange Rate Reference'
  firmName: string;
  valuerName: string;
  valuerDesignation: string;
}

export interface LandProperty {
  id: string;
  deed: string;
  details: string;
  purchase: number;
  cap: number;
  book: number;
  fmv?: number;
}

export interface FinancialInvestment {
  id: string;
  nature: string;
  inst: string;
  acc: string;
  amount: number;
}

export interface EmploymentIncome {
  id: string;
  particulars: string;
  monthly: number;
  annual: number;
}

export interface RentalIncome {
  id: string;
  floor: string;
  description: string;
  rentPerUnit: number;
  monthly: number;
  annual: number;
}

export interface BusinessIncome {
  id: string;
  source: string;
  monthly: number;
  annual: number;
}

export interface ValuationSummaryInput {
  landBdt: number;
  invBdt: number;
  incBdt: number;
  useLiveTableSums: boolean;
}

export interface ValuationDocumentState {
  general: GeneralValuationInfo;
  applicant: ApplicantInfo;
  sponsor: SponsorInfo;
  summary: ValuationSummaryInput;
  lands: LandProperty[];
  investments: FinancialInvestment[];
  employmentIncomes: EmploymentIncome[];
  rentalIncomes: RentalIncome[];
  businessIncomes: BusinessIncome[];
  includedPages: {
    cover: boolean;
    toc: boolean;
    executiveSummary: boolean;
    summaryTable: boolean;
    certProperties: boolean;
    certInvestments: boolean;
    certIncome: boolean;
    annexureA: boolean;
    annexureB: boolean;
    annexureC: boolean;
    valuationNotes: boolean;
  };
}
