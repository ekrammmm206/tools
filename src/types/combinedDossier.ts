export interface BirthCertificateState {
  office: string;
  ruleText: string;
  formNo: string;
  regNo: string;
  regDate: string;
  issueDate: string;
  dob: string;
  dobInWords: string;
  sex: 'Male' | 'Female' | 'Other';
  name: string;
  motherName: string;
  motherNationality: string;
  fatherName: string;
  fatherNationality: string;
  pob: string;
  permAddress: string;
  assistantTitle: string;
  registrarTitle: string;
}

export interface LandPropertyItem {
  id: string;
  description: string;
  mouza: string;
  khatianNo: string;
  plotNo: string;
  area: string;
  valueBdt: number;
}

export interface BankAccountItem {
  id: string;
  bankName: string;
  branch: string;
  accountNo: string;
  accountType: string;
  balanceBdt: number;
}

export interface BusinessAssetItem {
  id: string;
  businessName: string;
  nature: string;
  ownershipPercent: number;
  valueBdt: number;
}

export interface AnnualIncomeItem {
  id: string;
  source: string;
  particulars: string;
  annualBdt: number;
}

export interface FinancialDeclarationState {
  notaryDistrict: string;
  affidavitTitle: string;
  declarantName: string;
  fatherName: string;
  motherName: string;
  address: string;
  nidNo: string;
  religion: string;
  nationality: string;
  studentName: string;
  studentRelation: string;
  studentDob: string;
  studentPassport: string;
  institution: string;
  courseName: string;
  currencyCode: string;
  currencySymbol: string;
  exchangeRate: number; // e.g. 71.83 BDT per 1 Foreign Currency
  exchangeRateCitation: string;
  landProperties: LandPropertyItem[];
  bankAccounts: BankAccountItem[];
  businessAssets: BusinessAssetItem[];
  annualIncomes: AnnualIncomeItem[];
  advocateName: string;
  notaryName: string;
}

export interface KhatianOwner {
  id: string;
  name: string;
  fatherOrHusband: string;
  address: string;
  share: string;
}

export interface KhatianPlot {
  id: string;
  plotNo: string;
  classOfLand: string;
  totalLandAcre: number;
  totalLandDecimal: number;
  share: string;
  propLandAcre: number;
  propLandDecimal: number;
}

export interface KhatianState {
  title: string;
  subtitle: string;
  khatianType: string;
  khatianNo: string;
  district: string;
  thana: string;
  mouza: string;
  jlNo: string;
  touziNo: string;
  revenueRent: string;
  owners: KhatianOwner[];
  plots: KhatianPlot[];
  certifiedBy: string;
}

export interface NidCardState {
  title: string;
  subTitle: string;
  name: string;
  fatherName: string;
  motherName: string;
  dob: string;
  nidNo: string;
  bloodGroup: string;
  placeOfBirth: string;
  address: string;
  issueDate: string;
  issuingAuthority: string;
  photoUrl: string;
}

export interface RentalWitness {
  id: string;
  name: string;
  address: string;
  nid: string;
}

export interface RentalAgreementState {
  agreementDate: string;
  landlordName: string;
  landlordFather: string;
  landlordAddress: string;
  landlordNid: string;
  landlordPhone: string;
  tenantName: string;
  tenantFather: string;
  tenantAddress: string;
  tenantNid: string;
  tenantPhone: string;
  premisesAddress: string;
  monthlyRentBdt: number;
  securityDepositBdt: number;
  agreementDurationMonths: number;
  noticePeriodMonths: number;
  witnesses: RentalWitness[];
}

export interface SponsorDeclarationState {
  title: string;
  sponsorName: string;
  sponsorRelation: string;
  sponsorOccupation: string;
  sponsorNid: string;
  sponsorAddress: string;
  applicantName: string;
  applicantDob: string;
  applicantPassport: string;
  course: string;
  university: string;
  country: string;
  currencyCode: string;
  currencySymbol: string;
  exchangeRate: number;
  accounts: BankAccountItem[];
  undertakingPoints: string[];
}

export interface SummaryOfDeedState {
  deedNo: string;
  year: string;
  subRegistryOffice: string;
  district: string;
  deedType: string;
  vendorName: string;
  vendorFather: string;
  vendorAddress: string;
  vendeeName: string;
  vendeeFather: string;
  vendeeAddress: string;
  mouza: string;
  jlNo: string;
  khatianBs: string;
  plotBs: string;
  landClass: string;
  transferredArea: string;
  boundaryNorth: string;
  boundarySouth: string;
  boundaryEast: string;
  boundaryWest: string;
  totalConsiderationBdt: number;
  certifiedStatement: string;
}

export interface CombinedDossierState {
  selectedSubDoc:
    | 'all'
    | 'birthCertificate'
    | 'financialDeclaration'
    | 'khatian'
    | 'nidCard'
    | 'rentalAgreement'
    | 'sponsorDeclaration'
    | 'summaryOfDeed';
  birthCertificate: BirthCertificateState;
  financialDeclaration: FinancialDeclarationState;
  khatian: KhatianState;
  nidCard: NidCardState;
  rentalAgreement: RentalAgreementState;
  sponsorDeclaration: SponsorDeclarationState;
  summaryOfDeed: SummaryOfDeedState;
}
