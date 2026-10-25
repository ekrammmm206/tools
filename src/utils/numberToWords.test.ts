import test from 'node:test';
import assert from 'node:assert/strict';
import {
  numberToWordsInternational,
  numberToWordsSouthAsian,
  formatSharesWithWords,
  calculateTotalShares
} from './numberToWords';

test('numberToWordsInternational converts single and double digits', () => {
  assert.equal(numberToWordsInternational(0), 'Zero');
  assert.equal(numberToWordsInternational(5), 'Five');
  assert.equal(numberToWordsInternational(15), 'Fifteen');
  assert.equal(numberToWordsInternational(42), 'Forty Two');
});

test('numberToWordsInternational converts thousands and millions', () => {
  assert.equal(numberToWordsInternational(1000), 'One Thousand');
  assert.equal(numberToWordsInternational(1000000), 'One Million');
  assert.equal(numberToWordsInternational(10000000), 'Ten Million');
  assert.equal(numberToWordsInternational(10050000), 'Ten Million Fifty Thousand');
});

test('numberToWordsSouthAsian converts lakhs and crores', () => {
  assert.equal(numberToWordsSouthAsian(100000), 'One Lakh');
  assert.equal(numberToWordsSouthAsian(10000000), 'One Crore');
  assert.equal(numberToWordsSouthAsian(5000000), 'Fifty Lakh');
});

test('calculateTotalShares sums properly', () => {
  assert.equal(calculateTotalShares([1000000, 2000000, 500000]), 3500000);
  assert.equal(calculateTotalShares([]), 0);
  assert.equal(calculateTotalShares([NaN as unknown as number, 100]), 100);
});

test('formatSharesWithWords creates proper display string', () => {
  assert.equal(formatSharesWithWords(1000000), '1,000,000 shares (One Million)');
  assert.equal(formatSharesWithWords(10000000), '10,000,000 shares (Ten Million)');
});
