import { test, describe } from 'node:test';
import assert from 'node:assert';
import { getDefaultPdfFileName } from './pdfExport.js';

describe('getDefaultPdfFileName', () => {
  test('generates proper filename for withholdingReturn', () => {
    const state = {
      general: {
        companyName: 'ADVANCE TECHNOLOGY CONSORTIUM LTD.',
        month: 'Oct, Nov & Dec 2025',
        fy: '2025 - 2026'
      }
    };
    const filename = getDefaultPdfFileName('withholdingReturn', state);
    assert.match(filename, /ADVANCE_TECHNOLOGY_CONSORTIUM_LTD_/);
    assert.match(filename, /Withholding_Return_TDS/);
    assert.match(filename, /\.pdf$/);
  });

  test('generates proper filename for partnershipRecon', () => {
    const state = {
      firm: {
        firmName: 'Techno Power Solutions',
        regNo: 'P-45210/2021'
      }
    };
    const filename = getDefaultPdfFileName('partnershipRecon', state);
    assert.match(filename, /Techno_Power_Solutions/);
    assert.match(filename, /Reconstitution_Form_V/);
    assert.match(filename, /\.pdf$/);
  });

  test('generates proper filename for partnership deed', () => {
    const state = {
      info: {
        firmName: 'Bengal Enterprise'
      }
    };
    const filename = getDefaultPdfFileName('partnership', state);
    assert.strictEqual(filename, 'Bengal_Enterprise_Partnership_Deed_Statutory.pdf');
  });

  test('generates proper filename for RJSC return', () => {
    const state = {
      meetingInfo: {
        companyName: 'Hijaz Hajj Umrah Ltd',
        financialYearEnd: '2024'
      }
    };
    const filename = getDefaultPdfFileName('rjscReturn', state);
    assert.match(filename, /Hijaz_Hajj_Umrah_Ltd/);
    assert.match(filename, /RJSC_Annual_Return/);
  });

  test('generates default filename on unknown type', () => {
    const filename = getDefaultPdfFileName('unknown', {});
    assert.strictEqual(filename, 'Statutory_Document.pdf');
  });
});

describe('oklch color conversions for html2canvas compatibility', () => {
  test('converts pure white and black oklch correctly', async () => {
    const { oklchToRgb } = await import('./pdfExport.js');
    assert.strictEqual(oklchToRgb('1', '0', '0'), 'rgb(255, 255, 255)');
    assert.strictEqual(oklchToRgb('0', '0', '0'), 'rgb(0, 0, 0)');
  });

  test('converts percentage lightness and alpha properly', async () => {
    const { oklchToRgb } = await import('./pdfExport.js');
    const res = oklchToRgb('50%', '0', '0', '0.5');
    assert.match(res, /^rgba\(\d+,\s*\d+,\s*\d+,\s*0\.5\)$/);
  });

  test('replaces oklch in CSS strings with convertAllOklchInString', async () => {
    const { convertAllOklchInString } = await import('./pdfExport.js');
    const input = 'color: oklch(0.2 0.02 260); background-color: oklch(0.95 0.01 200 / 0.8);';
    const output = convertAllOklchInString(input);
    assert.ok(!output.includes('oklch'), 'Should not contain oklch');
    assert.ok(output.includes('rgb('), 'Should contain rgb');
    assert.ok(output.includes('rgba('), 'Should contain rgba');
  });
});
