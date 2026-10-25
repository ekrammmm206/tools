import test from 'node:test';
import assert from 'node:assert';
import {
  formatTaka,
  parseTakaAmount,
  formatLegalDate,
  getCapitalInWords,
  validatePartnership
} from './partnershipCalculations';
import { DEFAULT_PARTNERSHIP_STATE } from '../data/defaultPartnershipData';

test('parseTakaAmount cleans currency strings', () => {
  assert.strictEqual(parseTakaAmount('TK 2,00,000'), 200000);
  assert.strictEqual(parseTakaAmount('100000'), 100000);
  assert.strictEqual(parseTakaAmount(''), 0);
});

test('formatTaka formats to Bangladeshi/Indian notation', () => {
  assert.strictEqual(formatTaka(200000), '2,00,000');
  assert.strictEqual(formatTaka('1500000'), '15,00,000');
});

test('formatLegalDate produces formal deed date strings', () => {
  assert.strictEqual(formatLegalDate('2024-01-01'), '1st day of January, 2024');
  assert.strictEqual(formatLegalDate('2024-08-15'), '15th day of August, 2024');
  assert.strictEqual(formatLegalDate('2024-02-02'), '2nd day of February, 2024');
  assert.strictEqual(formatLegalDate('2024-03-03'), '3rd day of March, 2024');
});

test('getCapitalInWords formats Two Lakh Taka accurately', () => {
  const words = getCapitalInWords('200000');
  assert.strictEqual(words, 'Two Lakh Taka only');
});

test('validatePartnership succeeds on default state', () => {
  const result = validatePartnership(DEFAULT_PARTNERSHIP_STATE);
  assert.strictEqual(result.isValid, true);
  assert.strictEqual(result.totalCalculatedCapital, 200000);
  assert.strictEqual(result.totalSharePercentage, 100);
  assert.strictEqual(result.errors.length, 0);
});

test('validatePartnership detects percentage imbalance', () => {
  const badState = {
    ...DEFAULT_PARTNERSHIP_STATE,
    party2: {
      ...DEFAULT_PARTNERSHIP_STATE.party2,
      sharePct: '40'
    }
  };
  const result = validatePartnership(badState);
  assert.strictEqual(result.isValid, false);
  assert(result.errors.some((e) => e.includes('expected 100%')));
});
