import { numberToWordsInternational, numberToWordsSouthAsian } from './numberToWords';

export interface ValuationMetrics {
  landBdt: number;
  landForeign: number;
  invBdt: number;
  invForeign: number;
  incBdt: number;
  incForeign: number;
  totalNetWorthBdt: number;
  totalNetWorthForeign: number;
  wordsTotalBdt: string;
  wordsTotalForeign: string;
  wordsLandBdt: string;
  wordsLandForeign: string;
  wordsInvBdt: string;
  wordsInvForeign: string;
  wordsIncBdt: string;
  wordsIncForeign: string;
}

export function calculateValuationFigures(
  landBdt: number,
  invBdt: number,
  incBdt: number,
  exchangeRate: number
): ValuationMetrics {
  const safeRate = exchangeRate > 0 ? exchangeRate : 72;

  const landForeign = Math.round(landBdt / safeRate);
  const invForeign = Math.round(invBdt / safeRate);
  const incForeign = Math.round(incBdt / safeRate);

  const totalNetWorthBdt = landBdt + invBdt + incBdt;
  const totalNetWorthForeign = landForeign + invForeign + incForeign;

  return {
    landBdt,
    landForeign,
    invBdt,
    invForeign,
    incBdt,
    incForeign,
    totalNetWorthBdt,
    totalNetWorthForeign,
    wordsTotalBdt: numberToWordsInternational(totalNetWorthBdt),
    wordsTotalForeign: numberToWordsInternational(totalNetWorthForeign),
    wordsLandBdt: numberToWordsInternational(landBdt),
    wordsLandForeign: numberToWordsInternational(landForeign),
    wordsInvBdt: numberToWordsInternational(invBdt),
    wordsInvForeign: numberToWordsInternational(invForeign),
    wordsIncBdt: numberToWordsInternational(incBdt),
    wordsIncForeign: numberToWordsInternational(incForeign)
  };
}

export function formatBdt(num: number): string {
  return num.toLocaleString('en-US', { maximumFractionDigits: 0 });
}

export function formatForeign(num: number, symbol: string = '$'): string {
  return `${symbol} ${num.toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
}
