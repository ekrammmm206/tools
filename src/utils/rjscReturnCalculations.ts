import { PersonShareholder } from '../types/rjscReturn';

export interface ReturnFinancialSummary {
  totalShares: number;
  nominalValue: number;
  totalCapitalBdt: number;
  directorCount: number;
  shareholderCount: number;
}

export function calculateTotalSharesAndCapital(
  people: PersonShareholder[],
  nominalValue: number = 1000
): ReturnFinancialSummary {
  const totalShares = people.reduce((acc, p) => acc + (Number(p.shares) || 0), 0);
  const totalCapitalBdt = totalShares * (Number(nominalValue) || 1000);
  const directorCount = people.filter(
    (p) =>
      p.designation.toLowerCase().includes('director') ||
      p.designation.toLowerCase().includes('chairman')
  ).length;
  const shareholderCount = people.length;

  return {
    totalShares,
    nominalValue,
    totalCapitalBdt,
    directorCount,
    shareholderCount
  };
}

export function formatBdtNoDec(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: 0
  }).format(Math.round(amount));
}
