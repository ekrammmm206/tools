import test from 'node:test';
import assert from 'node:assert';
import {
  parsePercentage,
  parseAmount,
  formatTakaCommas,
  toBengaliNumeral,
  validatePartnershipRecon
} from './partnershipReconCalculations';
import { DEFAULT_PARTNERSHIP_RECON_STATE } from '../data/defaultPartnershipReconData';

test('parsePercentage correctly handles percentages and strings', () => {
  assert.strictEqual(parsePercentage('35%'), 35);
  assert.strictEqual(parsePercentage('32.50%'), 32.5);
  assert.strictEqual(parsePercentage('32.5'), 32.5);
  assert.strictEqual(parsePercentage(25), 25);
});

test('parseAmount extracts numbers from currency strings', () => {
  assert.strictEqual(parseAmount('10,00,000 Taka'), 1000000);
  assert.strictEqual(parseAmount('1,500,000'), 1500000);
  assert.strictEqual(parseAmount(1000000), 1000000);
});

test('toBengaliNumeral converts Latin numerals to Bengali', () => {
  assert.strictEqual(toBengaliNumeral('20/04/2025'), '২০/০৪/২০২৫');
  assert.strictEqual(toBengaliNumeral('1932'), '১৯৩২');
});

test('formatTakaCommas formats amounts into comma-separated numbers', () => {
  assert.strictEqual(formatTakaCommas('1000000'), '10,00,000');
  assert.strictEqual(formatTakaCommas(1500000), '15,00,000');
});

test('validatePartnershipRecon validates default state successfully', () => {
  const result = validatePartnershipRecon(DEFAULT_PARTNERSHIP_RECON_STATE);
  assert.strictEqual(result.isValid, true);
  assert.strictEqual(result.totalPercentage, 100);
  assert.strictEqual(result.totalCapital, 3500000);
  assert.strictEqual(result.errors.length, 0);
});

test('validatePartnershipRecon catches invalid percentages', () => {
  const invalidState = {
    ...DEFAULT_PARTNERSHIP_RECON_STATE,
    partner1: {
      ...DEFAULT_PARTNERSHIP_RECON_STATE.partner1,
      sharePct: '40%'
    }
  };
  const result = validatePartnershipRecon(invalidState);
  assert.strictEqual(result.isValid, false);
  assert(result.errors.some((err) => err.includes('expected 100%')));
});
