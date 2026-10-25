import { test } from 'node:test';
import assert from 'node:assert';
import {
  calculateFinancialTotals,
  calculateSponsorTotals,
  calculateKhatianPlotTotals,
  formatBdt,
  formatFx
} from './combinedCalculations';
import { FinancialDeclarationState, SponsorDeclarationState, KhatianPlot } from '../types/combinedDossier';

test('calculateFinancialTotals computes assets and income accurately', () => {
  const dummyFinancial: FinancialDeclarationState = {
    notaryDistrict: 'Dhaka',
    affidavitTitle: 'AFFIDAVIT',
    declarantName: 'MD. ROFIQUL ISLAM',
    fatherName: 'Late Abdul Gafur',
    motherName: 'Late Rahima Khatun',
    address: 'Rajshahi',
    nidNo: '19728192209000145',
    religion: 'Islam',
    nationality: 'Bangladeshi',
    studentName: 'MOHAMMAD TANVIR HASAN',
    studentRelation: 'Son',
    studentDob: '25/08/2001',
    studentPassport: 'A03498125',
    institution: 'University of Auckland',
    courseName: 'MIT',
    currencyCode: 'NZD',
    currencySymbol: 'NZ$',
    exchangeRate: 72,
    exchangeRateCitation: '1 NZD = 72 BDT',
    landProperties: [
      { id: '1', description: 'Plot 1', mouza: 'Chinakandi', khatianNo: '1452', plotNo: '1689', area: '10 Dec', valueBdt: 720000 },
      { id: '2', description: 'Plot 2', mouza: 'Uttar Algi', khatianNo: '320', plotNo: '760', area: '5 Dec', valueBdt: 720000 }
    ],
    bankAccounts: [
      { id: '1', bankName: 'Islami Bank', branch: 'Rajshahi', accountNo: '1234', accountType: 'Savings', balanceBdt: 360000 }
    ],
    businessAssets: [
      { id: '1', businessName: 'M/S Islam Traders', nature: 'Proprietorship', ownershipPercent: 100, valueBdt: 360000 }
    ],
    annualIncomes: [
      { id: '1', source: 'House Rent', particulars: 'Flat 4A', annualBdt: 360000 },
      { id: '2', source: 'Business', particulars: 'Trading', annualBdt: 360000 }
    ],
    advocateName: 'Advocate Rezaul',
    notaryName: 'Notary Shamsuddin'
  };

  const totals = calculateFinancialTotals(dummyFinancial);

  // Land: 720,000 + 720,000 = 1,440,000 BDT => 20,000 NZD
  assert.strictEqual(totals.landTotalBdt, 1440000);
  assert.strictEqual(totals.landTotalFx, 20000);

  // Bank: 360,000 BDT => 5,000 NZD
  assert.strictEqual(totals.bankTotalBdt, 360000);
  assert.strictEqual(totals.bankTotalFx, 5000);

  // Business: 360,000 BDT => 5,000 NZD
  assert.strictEqual(totals.businessTotalBdt, 360000);
  assert.strictEqual(totals.businessTotalFx, 5000);

  // Grand total assets: 1,440,000 + 360,000 + 360,000 = 2,160,000 BDT => 30,000 NZD
  assert.strictEqual(totals.grandTotalAssetsBdt, 2160000);
  assert.strictEqual(totals.grandTotalAssetsFx, 30000);

  // Income total: 360,000 + 360,000 = 720,000 BDT => 10,000 NZD
  assert.strictEqual(totals.incomeTotalBdt, 720000);
  assert.strictEqual(totals.incomeTotalFx, 10000);
});

test('calculateSponsorTotals aggregates multiple accounts', () => {
  const dummySponsor: SponsorDeclarationState = {
    title: 'SPONSOR DECLARATION',
    sponsorName: 'MD. ROFIQUL ISLAM',
    sponsorRelation: 'Father',
    sponsorOccupation: 'Businessman',
    sponsorNid: '1234567890',
    sponsorAddress: 'Rajshahi',
    applicantName: 'MOHAMMAD TANVIR HASAN',
    applicantDob: '25/08/2001',
    applicantPassport: 'A03498125',
    course: 'MIT',
    university: 'University of Auckland',
    country: 'New Zealand',
    currencyCode: 'NZD',
    currencySymbol: 'NZ$',
    exchangeRate: 70,
    accounts: [
      { id: '1', bankName: 'Dutch Bangla', branch: 'Rajshahi', accountNo: '111', accountType: 'Savings', balanceBdt: 700000 },
      { id: '2', bankName: 'BRAC Bank', branch: 'Rajshahi', accountNo: '222', accountType: 'Current', balanceBdt: 700000 }
    ],
    undertakingPoints: ['Full support']
  };

  const totals = calculateSponsorTotals(dummySponsor);
  assert.strictEqual(totals.totalBdt, 1400000);
  assert.strictEqual(totals.totalFx, 20000);
});

test('calculateKhatianPlotTotals handles plots decimals and acres', () => {
  const plots: KhatianPlot[] = [
    { id: '1', plotNo: '101', classOfLand: 'Nali', totalLandAcre: 0, totalLandDecimal: 25.5, share: '0.50', propLandAcre: 0, propLandDecimal: 12.75 },
    { id: '2', plotNo: '102', classOfLand: 'Viti', totalLandAcre: 1, totalLandDecimal: 10.0, share: '1.00', propLandAcre: 1, propLandDecimal: 10.0 }
  ];

  const totals = calculateKhatianPlotTotals(plots);
  assert.strictEqual(totals.totalAcre, 1);
  assert.strictEqual(totals.totalDecimal, 35.5);
  assert.strictEqual(totals.propAcre, 1);
  assert.strictEqual(totals.propDecimal, 22.75);
});

test('formatting functions work accurately', () => {
  assert.strictEqual(formatBdt(1450000), '14,50,000');
  assert.strictEqual(formatFx(20186.554), '20,186.55');
});
