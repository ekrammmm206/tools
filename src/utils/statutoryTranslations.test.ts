import test from 'node:test';
import assert from 'node:assert';
import { t, formatStatutoryNumeral, STATUTORY_TRANSLATIONS } from './statutoryTranslations';

test('returns English labels when lang is en', () => {
  assert.strictEqual(t('doc.date', 'en'), 'Date:');
  assert.strictEqual(t('recon.noticeTitle', 'en'), 'Notice of Extraordinary Meeting of Partners');
  assert.strictEqual(t('rjsc.noticeTitle', 'en'), 'NOTICE OF THE ANNUAL GENERAL MEETING (AGM)');
});

test('returns authentic Bengali labels when lang is bn', () => {
  assert.strictEqual(t('doc.date', 'bn'), 'তারিখ:');
  assert.strictEqual(t('recon.noticeTitle', 'bn'), 'অংশীদারগণের বিশেষ সাধারণ সভার বিজ্ঞপ্তি');
  assert.strictEqual(t('recon.formVTitle', 'bn'), 'ফরম ৫: নিবন্ধিত অংশীদারী ফার্মের গঠনে পরিবর্তনের সংবিধিবদ্ধ নোটিশ');
  assert.strictEqual(t('rjsc.noticeTitle', 'bn'), 'বার্ষিক সাধারণ সভার (এজিএম) বিজ্ঞপ্তি');
});

test('falls back to key or fallback string if missing', () => {
  assert.strictEqual(t('unknown.key', 'en', 'Fallback Text'), 'Fallback Text');
  assert.strictEqual(t('unknown.key', 'bn'), 'unknown.key');
});

test('converts digits to Bengali numerals when lang is bn', () => {
  assert.strictEqual(formatStatutoryNumeral('2024', 'bn'), '২০২৪');
  assert.strictEqual(formatStatutoryNumeral('1234567890', 'bn'), '১২৩৪৫৬৭৮৯০');
  assert.strictEqual(formatStatutoryNumeral('2024', 'en'), '2024');
});

test('contains valid translations for all defined keys', () => {
  for (const key of Object.keys(STATUTORY_TRANSLATIONS)) {
    const item = STATUTORY_TRANSLATIONS[key];
    assert.ok(item.en.length > 0);
    assert.ok(item.bn.length > 0);
  }
});
