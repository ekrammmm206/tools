import { SalaryEmployeeRecord, ChallanRecord, WithholdingReturnState } from '../types/withholdingReturn';

export function cleanNumeric(val: string | number): number {
  if (typeof val === 'number') return isNaN(val) ? 0 : val;
  if (!val) return 0;
  const cleaned = String(val).replace(/[^0-9.-]+/g, '');
  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? 0 : parsed;
}

export function formatCurrencyCommas(val: number | string): string {
  const num = typeof val === 'string' ? cleanNumeric(val) : val;
  return new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: 0
  }).format(num);
}

export function calculateSalaryRowGross(record: Partial<SalaryEmployeeRecord>): number {
  const basic = cleanNumeric(record.basic || 0);
  const bonus = cleanNumeric(record.bonus || 0);
  const house = cleanNumeric(record.house || 0);
  const conv = cleanNumeric(record.conv || 0);
  const med = cleanNumeric(record.med || 0);
  const other = cleanNumeric(record.other || 0);
  return basic + bonus + house + conv + med + other;
}

export interface SalaryAggregates {
  totalBasic: number;
  totalBonus: number;
  totalHouse: number;
  totalConv: number;
  totalMed: number;
  totalOther: number;
  totalGross: number;
  totalTax: number;
  employeeCount: number;
}

export function calculateSalaryTotals(salaries: SalaryEmployeeRecord[]): SalaryAggregates {
  let totalBasic = 0;
  let totalBonus = 0;
  let totalHouse = 0;
  let totalConv = 0;
  let totalMed = 0;
  let totalOther = 0;
  let totalGross = 0;
  let totalTax = 0;

  for (const s of salaries) {
    totalBasic += cleanNumeric(s.basic);
    totalBonus += cleanNumeric(s.bonus);
    totalHouse += cleanNumeric(s.house);
    totalConv += cleanNumeric(s.conv);
    totalMed += cleanNumeric(s.med);
    totalOther += cleanNumeric(s.other);
    totalGross += cleanNumeric(s.total || calculateSalaryRowGross(s));
    totalTax += cleanNumeric(s.tax);
  }

  return {
    totalBasic,
    totalBonus,
    totalHouse,
    totalConv,
    totalMed,
    totalOther,
    totalGross,
    totalTax,
    employeeCount: salaries.length
  };
}

export function calculateChallanTotals(challans: ChallanRecord[]): number {
  return challans.reduce((acc, c) => acc + cleanNumeric(c.amt), 0);
}

export function validateWithholdingReturn(data: WithholdingReturnState): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!data.general.companyName.trim()) {
    errors.push('Company or person name is required.');
  }

  if (!data.general.tin.trim()) {
    errors.push('TIN number is required.');
  }

  if (!data.general.fy.trim()) {
    errors.push('Financial year is required.');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}
