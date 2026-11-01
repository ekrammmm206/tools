import test from 'node:test';
import assert from 'node:assert';
import {
  cleanNumeric,
  formatCurrencyCommas,
  calculateSalaryRowGross,
  calculateSalaryTotals,
  calculateChallanTotals,
  validateWithholdingReturn
} from './withholdingReturnCalculations';
import { DEFAULT_WITHHOLDING_RETURN_STATE } from '../data/defaultWithholdingReturnData';

test('cleanNumeric extracts numbers from formatted strings', () => {
  assert.strictEqual(cleanNumeric('62,283'), 62283);
  assert.strictEqual(cleanNumeric('120,000 Taka'), 120000);
  assert.strictEqual(cleanNumeric(''), 0);
  assert.strictEqual(cleanNumeric(300000), 300000);
});

test('formatCurrencyCommas formats properly in Indian/Bangladeshi notation', () => {
  assert.strictEqual(formatCurrencyCommas(62283), '62,283');
  assert.strictEqual(formatCurrencyCommas(300000), '3,00,000');
});

test('calculateSalaryRowGross sums breakdown items', () => {
  const gross = calculateSalaryRowGross({
    basic: '120,000',
    bonus: '0',
    house: '90,000',
    conv: '15,000',
    med: '45,000',
    other: '30,000'
  });
  assert.strictEqual(gross, 300000);
});

test('calculateSalaryTotals aggregates all 16 employees accurately', () => {
  const totals = calculateSalaryTotals(DEFAULT_WITHHOLDING_RETURN_STATE.salaries);
  assert.strictEqual(totals.employeeCount, 16);
  assert.ok(totals.totalGross > 0);
  assert.ok(totals.totalTax > 0);
});

test('calculateChallanTotals sums challan amounts accurately', () => {
  const total = calculateChallanTotals(DEFAULT_WITHHOLDING_RETURN_STATE.treasury.challans);
  assert.strictEqual(total, 62283);
});

test('validateWithholdingReturn passes default state', () => {
  const res = validateWithholdingReturn(DEFAULT_WITHHOLDING_RETURN_STATE);
  assert.strictEqual(res.isValid, true);
  assert.strictEqual(res.errors.length, 0);
});
