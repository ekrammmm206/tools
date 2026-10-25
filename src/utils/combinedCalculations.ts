import {
  FinancialDeclarationState,
  SponsorDeclarationState,
  KhatianPlot
} from '../types/combinedDossier';

export interface FinancialTotals {
  landTotalBdt: number;
  landTotalFx: number;
  bankTotalBdt: number;
  bankTotalFx: number;
  businessTotalBdt: number;
  businessTotalFx: number;
  grandTotalAssetsBdt: number;
  grandTotalAssetsFx: number;
  incomeTotalBdt: number;
  incomeTotalFx: number;
}

export function calculateFinancialTotals(
  financial: FinancialDeclarationState
): FinancialTotals {
  const rate = financial.exchangeRate > 0 ? financial.exchangeRate : 71.83;

  const landTotalBdt = financial.landProperties.reduce(
    (sum, p) => sum + (Number(p.valueBdt) || 0),
    0
  );
  const landTotalFx = landTotalBdt / rate;

  const bankTotalBdt = financial.bankAccounts.reduce(
    (sum, b) => sum + (Number(b.balanceBdt) || 0),
    0
  );
  const bankTotalFx = bankTotalBdt / rate;

  const businessTotalBdt = financial.businessAssets.reduce(
    (sum, b) => sum + (Number(b.valueBdt) || 0),
    0
  );
  const businessTotalFx = businessTotalBdt / rate;

  const grandTotalAssetsBdt = landTotalBdt + bankTotalBdt + businessTotalBdt;
  const grandTotalAssetsFx = grandTotalAssetsBdt / rate;

  const incomeTotalBdt = financial.annualIncomes.reduce(
    (sum, i) => sum + (Number(i.annualBdt) || 0),
    0
  );
  const incomeTotalFx = incomeTotalBdt / rate;

  return {
    landTotalBdt,
    landTotalFx,
    bankTotalBdt,
    bankTotalFx,
    businessTotalBdt,
    businessTotalFx,
    grandTotalAssetsBdt,
    grandTotalAssetsFx,
    incomeTotalBdt,
    incomeTotalFx
  };
}

export function calculateSponsorTotals(sponsor: SponsorDeclarationState): {
  totalBdt: number;
  totalFx: number;
} {
  const rate = sponsor.exchangeRate > 0 ? sponsor.exchangeRate : 71.83;
  const totalBdt = sponsor.accounts.reduce(
    (sum, a) => sum + (Number(a.balanceBdt) || 0),
    0
  );
  return {
    totalBdt,
    totalFx: totalBdt / rate
  };
}

export function calculateKhatianPlotTotals(plots: KhatianPlot[]): {
  totalAcre: number;
  totalDecimal: number;
  propAcre: number;
  propDecimal: number;
} {
  const totalAcre = plots.reduce((sum, p) => sum + (Number(p.totalLandAcre) || 0), 0);
  const totalDecimal = plots.reduce((sum, p) => sum + (Number(p.totalLandDecimal) || 0), 0);
  const propAcre = plots.reduce((sum, p) => sum + (Number(p.propLandAcre) || 0), 0);
  const propDecimal = plots.reduce((sum, p) => sum + (Number(p.propLandDecimal) || 0), 0);

  return {
    totalAcre,
    totalDecimal: Math.round(totalDecimal * 100) / 100,
    propAcre,
    propDecimal: Math.round(propDecimal * 100) / 100
  };
}

export function formatBdt(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: 0
  }).format(Math.round(amount));
}

export function formatFx(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
}
