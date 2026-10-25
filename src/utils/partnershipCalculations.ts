import { PartnershipDeedState } from '../types/partnership';
import { numberToWordsSouthAsian } from './numberToWords';

export interface PartnershipValidationResult {
  isValid: boolean;
  totalCalculatedCapital: number;
  totalDeclaredCapital: number;
  totalSharePercentage: number;
  errors: string[];
}

export function parseTakaAmount(val: string | number): number {
  if (typeof val === 'number') return isNaN(val) ? 0 : val;
  const cleaned = val.replace(/[^0-9.-]+/g, '');
  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? 0 : parsed;
}

export function formatTaka(val: number | string): string {
  const num = typeof val === 'string' ? parseTakaAmount(val) : val;
  return new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: 0
  }).format(num);
}

export function formatLegalDate(dateStr: string): string {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr;

  const day = date.getDate();
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();

  const getOrdinalSuffix = (d: number): string => {
    if (d >= 11 && d <= 13) return 'th';
    switch (d % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  };

  return `${day}${getOrdinalSuffix(day)} day of ${month}, ${year}`;
}

export function getCapitalInWords(capital: string | number): string {
  const num = typeof capital === 'string' ? parseTakaAmount(capital) : capital;
  const words = numberToWordsSouthAsian(num);
  return `${words} Taka only`;
}

export function validatePartnership(data: PartnershipDeedState): PartnershipValidationResult {
  const declaredCapital = parseTakaAmount(data.info.capitalAmount);
  const p1ShareAmt = parseTakaAmount(data.party1.shareAmt);
  const p2ShareAmt = parseTakaAmount(data.party2.shareAmt);
  const p1Pct = parseTakaAmount(data.party1.sharePct);
  const p2Pct = parseTakaAmount(data.party2.sharePct);

  const totalCalculatedCapital = p1ShareAmt + p2ShareAmt;
  const totalSharePercentage = p1Pct + p2Pct;
  const errors: string[] = [];

  if (Math.abs(totalSharePercentage - 100) > 0.01) {
    errors.push(`Partner share percentages total ${totalSharePercentage}%, expected 100%`);
  }

  if (declaredCapital > 0 && Math.abs(totalCalculatedCapital - declaredCapital) > 1) {
    errors.push(
      `Sum of partner capital (TK ${formatTaka(totalCalculatedCapital)}) does not match declared firm capital (TK ${formatTaka(declaredCapital)})`
    );
  }

  if (!data.party1.name.trim()) errors.push('First party partner name is required');
  if (!data.party2.name.trim()) errors.push('Second party partner name is required');
  if (!data.info.firmName.trim()) errors.push('Firm name is required');

  return {
    isValid: errors.length === 0,
    totalCalculatedCapital,
    totalDeclaredCapital: declaredCapital,
    totalSharePercentage,
    errors
  };
}
