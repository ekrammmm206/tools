import { test } from 'node:test';
import assert from 'node:assert';
import {
  calculateTotalSharesAndCapital,
  formatBdtNoDec
} from './rjscReturnCalculations';
import { PersonShareholder } from '../types/rjscReturn';

test('calculateTotalSharesAndCapital computes correct sums for RJSC return', () => {
  const samplePeople: PersonShareholder[] = [
    {
      id: '1',
      name: 'MD. ZAKARIA',
      designation: 'Chairman',
      shares: 1000,
      father: 'Late Abdur Rakib',
      mother: 'Khadizatul Kubra',
      address: 'Kapasia',
      fullAddress: 'Kapasia, Chittagong',
      dob: '1992',
      email: 'zakaria@example.com',
      phone: '01713155200',
      tin: '123',
      nid: '4620271074'
    },
    {
      id: '2',
      name: 'MD. OMAR FARUK',
      designation: 'Managing Director',
      shares: 1000,
      father: 'Md. Yakub Ali',
      mother: 'Jahanara Begum',
      address: 'Comilla',
      fullAddress: 'Comilla',
      dob: '1990',
      email: 'omar@example.com',
      phone: '01925868246',
      tin: '456',
      nid: '7767199651'
    },
    {
      id: '3',
      name: 'MOHAMMED MAHMUDUL HAQUE',
      designation: 'Share Holder',
      shares: 100,
      father: 'Mozammel Hoque',
      mother: 'Rahima Akter',
      address: 'Dhaka',
      fullAddress: 'Dhaka',
      dob: '1985',
      email: 'mahmud@example.com',
      phone: '01711130198',
      tin: '789',
      nid: '6431080321'
    }
  ];

  const summary = calculateTotalSharesAndCapital(samplePeople, 1000);
  assert.strictEqual(summary.totalShares, 2100);
  assert.strictEqual(summary.totalCapitalBdt, 2100000);
  assert.strictEqual(summary.directorCount, 2); // Chairman & MD
  assert.strictEqual(summary.shareholderCount, 3);
});

test('formatBdtNoDec formats properly', () => {
  assert.strictEqual(formatBdtNoDec(15200000), '1,52,00,000');
  assert.strictEqual(formatBdtNoDec(1000), '1,000');
});
