import { PartnershipReconState } from '../types/partnershipRecon';

export interface PartnershipReconValidationResult {
  isValid: boolean;
  totalPercentage: number;
  totalCapital: number;
  errors: string[];
}

export function parsePercentage(val: string | number): number {
  if (typeof val === 'number') return isNaN(val) ? 0 : val;
  const cleaned = val.replace(/[^0-9.-]+/g, '');
  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? 0 : parsed;
}

export function parseAmount(val: string | number): number {
  if (typeof val === 'number') return isNaN(val) ? 0 : val;
  const cleaned = val.replace(/[^0-9.-]+/g, '');
  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? 0 : parsed;
}

export function formatTakaCommas(val: number | string): string {
  const num = typeof val === 'string' ? parseAmount(val) : val;
  return new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: 0
  }).format(num);
}

export function toBengaliNumeral(strOrNum: string | number): string {
  const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  const s = String(strOrNum);
  return s.replace(/[0-9]/g, (w) => bnDigits[parseInt(w, 10)]);
}

export function validatePartnershipRecon(data: PartnershipReconState): PartnershipReconValidationResult {
  const p1Pct = parsePercentage(data.partner1.sharePct);
  const p2Pct = parsePercentage(data.partner2.sharePct);
  const inPct = parsePercentage(data.incoming.sharePct);

  const totalPercentage = +(p1Pct + p2Pct + inPct).toFixed(2);

  const p1Cap = parseAmount(data.partner1.capitalAmt);
  const p2Cap = parseAmount(data.partner2.capitalAmt);
  const inCap = parseAmount(data.incoming.capitalAmt);
  const totalCapital = p1Cap + p2Cap + inCap;

  const errors: string[] = [];

  if (Math.abs(totalPercentage - 100) > 0.05) {
    errors.push(`Total post-reconstitution shares sum to ${totalPercentage}%, expected 100%`);
  }

  if (!data.firm.firmName.trim()) {
    errors.push('Firm name is required');
  }

  if (!data.partner1.name.trim()) {
    errors.push('Managing Partner name is required');
  }

  if (!data.incoming.name.trim()) {
    errors.push('Incoming Partner name is required');
  }

  if (!data.outgoing.name.trim()) {
    errors.push('Outgoing Partner name is required');
  }

  return {
    isValid: errors.length === 0,
    totalPercentage,
    totalCapital,
    errors
  };
}
