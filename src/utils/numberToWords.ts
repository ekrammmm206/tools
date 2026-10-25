/**
 * Converts numbers into English words for legal share certificates and statutory forms.
 * Supports standard Western millions/billions as well as Bangladeshi Crore/Lakh notations.
 */

const ONES = [
  '', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine',
  'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'
];

const TENS = [
  '', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'
];

function convertThreeDigit(num: number): string {
  let str = '';
  if (num >= 100) {
    str += ONES[Math.floor(num / 100)] + ' Hundred ';
    num %= 100;
  }
  if (num >= 20) {
    str += TENS[Math.floor(num / 10)] + (num % 10 !== 0 ? ' ' + ONES[num % 10] : '');
  } else if (num > 0) {
    str += ONES[num];
  }
  return str.trim();
}

/**
 * Standard international format (Millions, Billions)
 */
export function numberToWordsInternational(num: number): string {
  if (num === 0) return 'Zero';
  if (num < 0) return 'Negative ' + numberToWordsInternational(Math.abs(num));

  const scales = [
    { value: 1000000000, label: 'Billion' },
    { value: 1000000, label: 'Million' },
    { value: 1000, label: 'Thousand' },
    { value: 1, label: '' }
  ];

  const parts: string[] = [];
  let remaining = num;

  for (const { value, label } of scales) {
    if (remaining >= value) {
      const quotient = Math.floor(remaining / value);
      remaining %= value;
      const partWords = convertThreeDigit(quotient);
      if (partWords) {
        parts.push(label ? `${partWords} ${label}` : partWords);
      }
    }
  }

  return parts.join(' ').trim();
}

/**
 * South Asian / Bangladeshi format (Crore, Lakh, Thousand)
 * Common in Bangladeshi corporate filings
 */
export function numberToWordsSouthAsian(num: number): string {
  if (num === 0) return 'Zero';
  if (num < 0) return 'Negative ' + numberToWordsSouthAsian(Math.abs(num));

  const scales = [
    { value: 10000000, label: 'Crore' },
    { value: 100000, label: 'Lakh' },
    { value: 1000, label: 'Thousand' },
    { value: 1, label: '' }
  ];

  const parts: string[] = [];
  let remaining = num;

  for (const { value, label } of scales) {
    if (remaining >= value) {
      const quotient = Math.floor(remaining / value);
      remaining %= value;
      // Quotient might exceed 99 for crore, so recursively format
      const partWords = quotient >= 100 ? numberToWordsSouthAsian(quotient) : convertThreeDigit(quotient);
      if (partWords) {
        parts.push(label ? `${partWords} ${label}` : partWords);
      }
    }
  }

  return parts.join(' ').trim();
}

export const numberToWordsBangladeshi = numberToWordsSouthAsian;


export function formatSharesWithWords(count: number, system: 'international' | 'southAsian' = 'international'): string {
  const words = system === 'southAsian' ? numberToWordsSouthAsian(count) : numberToWordsInternational(count);
  return `${count.toLocaleString('en-US')} shares (${words})`;
}

export function calculateTotalShares(sharesList: number[]): number {
  return sharesList.reduce((acc, curr) => acc + (Number.isFinite(curr) ? curr : 0), 0);
}
