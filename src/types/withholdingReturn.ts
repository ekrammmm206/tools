export interface ChallanRecord {
  id: string;
  no: string;
  date: string;
  bank: string;
  amt: string;
}

export interface SalaryEmployeeRecord {
  id: string;
  sl: string;
  name: string;
  desig: string;
  tin: string;
  basic: string;
  bonus: string;
  house: string;
  conv: string;
  med: string;
  other: string;
  total: string;
  tax: string;
  challan: string;
  cDate: string;
  bank: string;
  amt: string;
  rem: string;
}

export interface EmployeeFilingRecord {
  id: string;
  sl: string;
  name: string;
  desig: string;
  tin: string;
  circleZone: string;
  filingDate: string;
  ackSerialNo: string;
  rem: string;
}

export interface TdsSourceItem {
  sl: string;
  sourceName: string;
  section: string;
  personsCount: string;
  taxDeductedPeriod: string;
  taxDeductedTillDate: string;
  remarks?: string;
}

export interface ServiceTdsItem {
  sl: string;
  serviceName: string;
  personsCount: string;
  taxDeductedPeriod: string;
}

export interface WithholdingReturnState {
  selectedSubDoc:
    | 'all'
    | 'ack'
    | 'general'
    | 'sources'
    | 'treasury'
    | 'verification'
    | 'scheduleA'
    | 'scheduleC'
    | 'scheduleD'
    | 'dividend'
    | 'employeeFiling';

  general: {
    fy: string;
    month: string;
    companyName: string;
    personType: 'company' | 'cooperative' | 'ngo' | 'partnership' | 'other';
    tin: string;
    win: string;
    circle: string;
    zone: string;
    address: string;
    phone: string;
    fax: string;
    email: string;
    business: string;
    parentCompanyName: string;
    parentCompanyTaxResidence: string;
    submissionDate: string;
    taxOfficeEntryNo: string;
  };

  salariesSummary: {
    personsCount: string;
    taxDeducted: string;
    taxTillDate: string;
  };

  treasury: {
    totalDeducted: string;
    totalCredited: string;
    excessDeficit: string;
    challans: ChallanRecord[];
  };

  verification: {
    declarantName: string;
    fatherOrHusband: string;
    tin: string;
    designation: string;
    place: string;
    submissionDate: string;
    attachedDocs: string;
  };

  salaries: SalaryEmployeeRecord[];

  interestPayee: {
    payerName: string;
    payees: Array<{
      id: string;
      sl: string;
      name: string;
      address: string;
      residentStatus: string;
      paymentDate: string;
      interestAmount: string;
      taxDeducted: string;
      remarks: string;
    }>;
  };

  dividendSchedule: {
    shareholders: Array<{
      id: string;
      sl: string;
      name: string;
      address: string;
      paymentDate: string;
      nature: string;
      sharesCountDesc: string;
      dividendPaid: string;
      taxDeducted: string;
      remarks: string;
    }>;
  };

  employeeFilings: EmployeeFilingRecord[];
}
