import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateValuationFigures, formatBdt, formatForeign } from './valuationCalculations';

test('calculateValuationFigures calculates totals and conversions correctly', () => {
  const result = calculateValuationFigures(52450000, 17015732, 7260000, 72.0);

  assert.equal(result.landBdt, 52450000);
  assert.equal(result.landForeign, 728472); // 52450000 / 72 = 728472.22 -> 728472
  assert.equal(result.invForeign, 236330);  // 17015732 / 72 = 236329.61 -> 236330
  assert.equal(result.incForeign, 100833);  // 7260000 / 72 = 100833.33 -> 100833

  assert.equal(result.totalNetWorthBdt, 76725732);
  assert.equal(result.totalNetWorthForeign, 1065635); // 728472 + 236330 + 100833 = 1065635

  assert.match(result.wordsTotalBdt, /Seventy Six Million Seven Hundred Twenty Five Thousand/);
  assert.match(result.wordsTotalForeign, /One Million Sixty Five Thousand Six Hundred Thirty Five/);
});

test('handles zero exchange rate fallback', () => {
  const result = calculateValuationFigures(72000, 0, 0, 0);
  assert.equal(result.landForeign, 1000); // Fallback to 72: 72000/72 = 1000
});

test('formatters format numbers nicely', () => {
  assert.equal(formatBdt(52450000), '52,450,000');
  assert.equal(formatForeign(728472, '$'), '$ 728,472');
  assert.equal(formatForeign(728472, 'NZ$'), 'NZ$ 728,472');
});
