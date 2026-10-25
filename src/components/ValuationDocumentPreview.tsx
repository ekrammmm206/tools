import React from 'react';
import { ValuationDocumentState } from '../types/valuation';
import { calculateValuationFigures, formatBdt, formatForeign } from '../utils/valuationCalculations';

interface ValuationDocumentPreviewProps {
  data: ValuationDocumentState;
  zoom: number;
}

export const ValuationDocumentPreview: React.FC<ValuationDocumentPreviewProps> = ({ data, zoom }) => {
  const { general, applicant, sponsor, summary, lands, investments, employmentIncomes, rentalIncomes, businessIncomes, includedPages } = data;

  // Compute live sums from tables if enabled
  const tableLandBdt = lands.reduce((acc, l) => acc + (l.book || l.purchase || 0), 0);
  const tableInvBdt = investments.reduce((acc, i) => acc + (i.amount || 0), 0);
  const tableIncBdt =
    employmentIncomes.reduce((acc, e) => acc + (e.annual || 0), 0) +
    rentalIncomes.reduce((acc, r) => acc + (r.annual || 0), 0) +
    businessIncomes.reduce((acc, b) => acc + (b.annual || 0), 0);

  const activeLandBdt = summary.useLiveTableSums ? tableLandBdt : summary.landBdt;
  const activeInvBdt = summary.useLiveTableSums ? tableInvBdt : summary.invBdt;
  const activeIncBdt = summary.useLiveTableSums ? tableIncBdt : summary.incBdt;

  const figures = calculateValuationFigures(
    activeLandBdt,
    activeInvBdt,
    activeIncBdt,
    general.exchangeRate
  );

  const currCode = general.foreignCurrencyCode || 'NZD';
  const currSym = general.foreignCurrencySymbol || '$';

  return (
    <div
      className="flex flex-col items-center gap-8 py-8 transition-transform duration-200 origin-top print:p-0 print:m-0 print:gap-0"
      style={{
        transform: `scale(${zoom / 100})`,
        transformOrigin: 'top center'
      }}
    >
      {/* ================= PAGE 1: COVER ================= */}
      {includedPages.cover && (
        <div className="a4-page bg-white shadow-xl print:shadow-none border border-slate-200 print:border-none w-[210mm] min-h-[297mm] p-[25mm] box-border text-black font-serif relative flex flex-col justify-between">
          <div className="text-right text-xs text-slate-500 font-sans">
            Reference No.: <strong>{general.refNo}</strong>
          </div>

          <div className="text-center my-auto py-16 space-y-8">
            <div className="w-24 h-24 mx-auto rounded-full border-4 border-slate-800 flex items-center justify-center p-2 mb-6">
              <span className="font-bold text-xs tracking-widest text-slate-900 uppercase text-center leading-tight">
                CERTIFIED<br />VALUATION
              </span>
            </div>

            <h1 className="text-2xl lg:text-3xl font-bold uppercase tracking-wide leading-snug max-w-2xl mx-auto">
              Report on the Valuation of the<br />
              <span className="text-blue-900">Lands &amp; Buildings</span> and{' '}
              <span className="text-blue-900">Investments &amp; Other Assets</span><br />
              Along with Certification of Annual Income
            </h1>

            <div className="w-32 h-1 bg-slate-900 mx-auto my-6"></div>

            <h2 className="text-lg font-semibold text-slate-800">
              As on <span className="underline font-bold">{general.reportDateShort}</span>
            </h2>

            <div className="mt-16 p-6 border border-slate-300 rounded-lg max-w-lg mx-auto bg-slate-50/50 text-sm space-y-2 text-left font-sans">
              <p><strong>Property Owner / Sponsor:</strong> {sponsor.name}</p>
              <p><strong>Applicant / Ward:</strong> {applicant.name}</p>
              <p><strong>Issuing Valuation Firm:</strong> {general.firmName}</p>
              <p><strong>Valuation Purpose:</strong> Financial Assessment &amp; Statutory Immigration Sponsorship</p>
            </div>
          </div>

          <div className="text-center text-xs text-slate-500 border-t border-slate-300 pt-3 flex justify-between font-sans">
            <span>Asset Valuation Certification &amp; Notes</span>
            <span>Cover Page</span>
          </div>
        </div>
      )}

      {/* ================= PAGE 2: TABLE OF CONTENTS ================= */}
      {includedPages.toc && (
        <div className="a4-page bg-white shadow-xl print:shadow-none border border-slate-200 print:border-none w-[210mm] min-h-[297mm] p-[25mm] box-border text-black font-serif relative flex flex-col justify-between">
          <div>
            <div className="text-center mb-10 border-b-2 border-black pb-4">
              <h2 className="text-xl font-bold uppercase tracking-wider">TABLE OF CONTENTS</h2>
              <p className="text-xs text-slate-600 font-sans mt-1">Reference: {general.refNo} &bull; Date: {general.reportDate}</p>
            </div>

            <table className="w-full border-collapse border border-black text-[13px] my-6">
              <thead>
                <tr className="bg-slate-100 font-bold">
                  <th className="border border-black p-2.5 w-16 text-center">Sl. No.</th>
                  <th className="border border-black p-2.5 text-left">Contents</th>
                  <th className="border border-black p-2.5 w-28 text-center">Page No(s)</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="border border-black p-2 text-center">1</td><td className="border border-black p-2">Executive Summary</td><td className="border border-black p-2 text-center font-mono">01</td></tr>
                <tr><td className="border border-black p-2 text-center">2</td><td className="border border-black p-2">Summary of Properties, Investments and Income</td><td className="border border-black p-2 text-center font-mono">02</td></tr>
                <tr><td className="border border-black p-2 text-center">3</td><td className="border border-black p-2">Certification for Valuation of Properties</td><td className="border border-black p-2 text-center font-mono">03</td></tr>
                <tr><td className="border border-black p-2 text-center">4</td><td className="border border-black p-2">Certificate of Investment in Financial Assets</td><td className="border border-black p-2 text-center font-mono">04</td></tr>
                <tr><td className="border border-black p-2 text-center">5</td><td className="border border-black p-2">Certificate of Annual Income</td><td className="border border-black p-2 text-center font-mono">05</td></tr>
                <tr><td className="border border-black p-2 text-center">6</td><td className="border border-black p-2">Annexure - A: Schedule of Lands and Buildings</td><td className="border border-black p-2 text-center font-mono">06</td></tr>
                <tr><td className="border border-black p-2 text-center">7</td><td className="border border-black p-2">Annexure - B: Schedule of Financial Investments</td><td className="border border-black p-2 text-center font-mono">08</td></tr>
                <tr><td className="border border-black p-2 text-center">8</td><td className="border border-black p-2">Annexure - C: Annual Income Statement</td><td className="border border-black p-2 text-center font-mono">09</td></tr>
                <tr><td className="border border-black p-2 text-center">9</td><td className="border border-black p-2">Notes to Asset Valuation Report (Background, Basis &amp; Methodology)</td><td className="border border-black p-2 text-center font-mono">10</td></tr>
              </tbody>
            </table>
          </div>

          <div className="text-center text-xs text-slate-500 border-t border-slate-300 pt-2 flex justify-between font-sans">
            <span>Reference No.: {general.refNo}</span>
            <span>Page 02</span>
          </div>
        </div>
      )}

      {/* ================= PAGE 3: EXECUTIVE SUMMARY ================= */}
      {includedPages.executiveSummary && (
        <div className="a4-page bg-white shadow-xl print:shadow-none border border-slate-200 print:border-none w-[210mm] min-h-[297mm] p-[20mm] box-border text-black font-serif relative flex flex-col justify-between">
          <div>
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold uppercase tracking-wider">EXECUTIVE SUMMARY</h2>
              <p className="text-xs font-sans text-slate-600 mt-1">
                Prepared under Reference No.: <strong className="font-bold">{general.refNo}</strong> &bull; Date: {general.reportDate}
              </p>
            </div>

            <p className="text-[13.5px] leading-relaxed text-justify mb-4">
              The assessment has been prepared based on available documentary evidence, supporting records, and relevant
              financial information provided for professional review. The valuation is presented in Bangladesh Taka (BDT)
              and converted into {currCode} using an exchange rate of 1 {currCode} = BDT{' '}
              <strong className="underline font-bold">{general.exchangeRate.toFixed(2)}</strong>.
            </p>

            <h3 className="text-sm font-bold uppercase tracking-wide border-b border-black pb-1 mb-2">
              Summary of Net Worth Position
            </h3>

            <table className="w-full border-collapse border border-black text-[13px] my-3">
              <thead>
                <tr className="bg-slate-100 font-bold">
                  <th className="border border-black p-2 text-left">Particulars</th>
                  <th className="border border-black p-2 text-right">Amount (BDT)</th>
                  <th className="border border-black p-2 text-right">Amount ({currCode})</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-black p-2">Lands &amp; Buildings</td>
                  <td className="border border-black p-2 text-right font-mono">{formatBdt(figures.landBdt)}</td>
                  <td className="border border-black p-2 text-right font-mono">{formatForeign(figures.landForeign, currSym)}</td>
                </tr>
                <tr>
                  <td className="border border-black p-2">Investments &amp; Financial Assets</td>
                  <td className="border border-black p-2 text-right font-mono">{formatBdt(figures.invBdt)}</td>
                  <td className="border border-black p-2 text-right font-mono">{formatForeign(figures.invForeign, currSym)}</td>
                </tr>
                <tr>
                  <td className="border border-black p-2">Annual Income</td>
                  <td className="border border-black p-2 text-right font-mono">{formatBdt(figures.incBdt)}</td>
                  <td className="border border-black p-2 text-right font-mono">{formatForeign(figures.incForeign, currSym)}</td>
                </tr>
                <tr className="bg-slate-50 font-bold border-t-2 border-black">
                  <td className="border border-black p-2">Total Net Worth Position</td>
                  <td className="border border-black p-2 text-right font-mono text-blue-900">৳ {formatBdt(figures.totalNetWorthBdt)}</td>
                  <td className="border border-black p-2 text-right font-mono text-blue-900">{formatForeign(figures.totalNetWorthForeign, currSym)}</td>
                </tr>
              </tbody>
            </table>

            {/* Observations */}
            <div className="mt-5 space-y-3 text-[12.5px] leading-relaxed">
              <h4 className="font-bold text-xs uppercase tracking-wide">Key Observations</h4>
              <ol className="list-decimal list-inside space-y-1 text-slate-800">
                <li>The majority of the net worth is concentrated in real estate assets, representing long-term capital holdings.</li>
                <li>A significant portion is maintained in financial investments, reflecting diversified asset allocation.</li>
                <li>Annual income demonstrates a stable earning capacity supporting the overall financial profile.</li>
                <li>The overall financial position indicates a strong and solvent net worth base as of the reporting date.</li>
              </ol>

              <h4 className="font-bold text-xs uppercase tracking-wide pt-2">Basis of Preparation</h4>
              <ol className="list-decimal list-inside space-y-1 text-slate-800">
                <li>Documents and declarations provided by the client;</li>
                <li>Verification of available financial and property records;</li>
                <li>Market-based valuation of real estate assets;</li>
                <li>Documentary evidence supporting financial investments and income;</li>
                <li>Standard professional judgment applied in accordance with valuation principles.</li>
              </ol>

              <h4 className="font-bold text-xs uppercase tracking-wide pt-2">Presentation Currency</h4>
              <div className="grid grid-cols-2 gap-2 text-xs border border-slate-300 p-2.5 rounded bg-slate-50">
                <div><strong>Reporting Currency:</strong> Bangladesh Taka (BDT)</div>
                <div><strong>Converted Currency:</strong> {currCode} ({currSym})</div>
                <div className="col-span-2"><strong>Exchange Rate Used:</strong> 1 {currCode} = BDT {general.exchangeRate.toFixed(2)} ({general.exchangeRateSource})</div>
              </div>

              <p className="text-[12px] text-justify pt-2 text-slate-700">
                This valuation summary is prepared for submission to immigration authorities, financial institutions,
                educational institutions, and other relevant organizations for lawful purposes as required.
              </p>
            </div>
          </div>

          <div className="text-center text-xs text-slate-500 border-t border-slate-300 pt-2 flex justify-between font-sans">
            <span>Reference No.: {general.refNo}</span>
            <span>Page 01</span>
          </div>
        </div>
      )}

      {/* ================= PAGE 4: SUMMARY OF PROPERTIES, INVESTMENTS & INCOME ================= */}
      {includedPages.summaryTable && (
        <div className="a4-page bg-white shadow-xl print:shadow-none border border-slate-200 print:border-none w-[210mm] min-h-[297mm] p-[20mm] box-border text-black font-serif relative flex flex-col justify-between">
          <div>
            <div className="text-center mb-6">
              <h2 className="text-lg font-bold uppercase tracking-wider">
                SUMMARY OF PROPERTIES, INVESTMENTS AND INCOME
              </h2>
              <p className="text-xs font-sans text-slate-600 mt-1">
                <strong>Reference No.:</strong> {general.refNo} &nbsp;&bull;&nbsp; <strong>Date of Report:</strong> {general.reportDate}
              </p>
            </div>

            {/* Applicant Information */}
            <h3 className="text-xs font-bold uppercase tracking-wider mb-1">APPLICANT INFORMATION</h3>
            <table className="w-full border-collapse border border-black text-[12px] mb-4">
              <thead>
                <tr className="bg-slate-100 font-bold">
                  <th className="border border-black p-2 text-left">Name</th>
                  <th className="border border-black p-2 text-center">Passport Number</th>
                  <th className="border border-black p-2 text-center">NID Number</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-black p-2 font-bold">{applicant.name}</td>
                  <td className="border border-black p-2 text-center font-mono">{applicant.passport}</td>
                  <td className="border border-black p-2 text-center font-mono">{applicant.nid}</td>
                </tr>
              </tbody>
            </table>

            {/* Sponsor Information */}
            <h3 className="text-xs font-bold uppercase tracking-wider mb-1">SPONSOR INFORMATION</h3>
            <table className="w-full border-collapse border border-black text-[12px] mb-6">
              <thead>
                <tr className="bg-slate-100 font-bold">
                  <th className="border border-black p-2 text-left">Name</th>
                  <th className="border border-black p-2 text-center">Passport Number</th>
                  <th className="border border-black p-2 text-center">NID Number</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-black p-2 font-bold">{sponsor.name}</td>
                  <td className="border border-black p-2 text-center font-mono">{sponsor.passport}</td>
                  <td className="border border-black p-2 text-center font-mono">{sponsor.nid}</td>
                </tr>
              </tbody>
            </table>

            {/* Combined Asset Valuation Table */}
            <h3 className="text-xs font-bold uppercase tracking-wider mb-1">
              SUMMARY OF PROPERTIES, INVESTMENTS AND INCOME
            </h3>
            <p className="text-xs mb-2">Name of Sponsor: <strong>{sponsor.name}</strong></p>

            <table className="w-full border-collapse border border-black text-[12px]">
              <thead>
                <tr className="bg-slate-100 font-bold">
                  <th rowSpan={2} className="border border-black p-2 w-12 text-center">SI No</th>
                  <th rowSpan={2} className="border border-black p-2 text-left">Particulars</th>
                  <th colSpan={2} className="border border-black p-2 text-center">Amount in</th>
                </tr>
                <tr className="bg-slate-50 font-bold">
                  <th className="border border-black p-2 text-right">Bangladesh (BDT)</th>
                  <th className="border border-black p-2 text-right">
                    {currCode} <br />
                    <span className="text-[10px] font-normal font-sans">(1 {currCode} = BDT {general.exchangeRate.toFixed(2)})</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-black p-2 text-center font-mono">1</td>
                  <td className="border border-black p-2 font-medium">Investments &amp; Other Assets</td>
                  <td className="border border-black p-2 text-right font-mono">{formatBdt(figures.invBdt)}</td>
                  <td className="border border-black p-2 text-right font-mono">{formatForeign(figures.invForeign, currSym)}</td>
                </tr>
                <tr>
                  <td className="border border-black p-2 text-center font-mono">2</td>
                  <td className="border border-black p-2 font-medium">Lands &amp; Buildings</td>
                  <td className="border border-black p-2 text-right font-mono">{formatBdt(figures.landBdt)}</td>
                  <td className="border border-black p-2 text-right font-mono">{formatForeign(figures.landForeign, currSym)}</td>
                </tr>
                <tr>
                  <td className="border border-black p-2 text-center font-mono">3</td>
                  <td className="border border-black p-2 font-medium">Annual Income</td>
                  <td className="border border-black p-2 text-right font-mono">{formatBdt(figures.incBdt)}</td>
                  <td className="border border-black p-2 text-right font-mono">{formatForeign(figures.incForeign, currSym)}</td>
                </tr>
                <tr className="bg-slate-100 font-bold border-t-2 border-black text-[13px]">
                  <td colSpan={2} className="border border-black p-2.5 text-right uppercase">Total Value of Assets</td>
                  <td className="border border-black p-2.5 text-right font-mono text-blue-900">৳ {formatBdt(figures.totalNetWorthBdt)}</td>
                  <td className="border border-black p-2.5 text-right font-mono text-blue-900">{formatForeign(figures.totalNetWorthForeign, currSym)}</td>
                </tr>
              </tbody>
            </table>

            {/* Exchange Rate details */}
            <div className="mt-4 text-xs font-sans text-slate-700 space-y-1">
              <p><strong>Exchange Rate Applied:</strong> 1 {currCode} = BDT {general.exchangeRate.toFixed(2)}</p>
              <p><strong>Source of Exchange Rate:</strong> {general.exchangeRateSource}</p>
            </div>

            {/* Amount in Words */}
            <div className="mt-5 p-3.5 border border-slate-300 rounded bg-slate-50/70 text-[12.5px] space-y-1.5">
              <h4 className="font-bold text-xs uppercase tracking-wide text-slate-900">Amount in Words</h4>
              <p>
                <strong>Total Value (BDT): </strong>
                <span className="font-bold underline text-blue-950">{figures.wordsTotalBdt}</span> Only
              </p>
              <p>
                <strong>Total Value ({currCode}): </strong>
                <span className="font-bold underline text-blue-950">{figures.wordsTotalForeign}</span> Only
              </p>
            </div>

            <p className="mt-4 text-[12px] leading-relaxed text-justify text-slate-700">
              This statement summarizes the investments, properties, and income of <strong>{sponsor.name}</strong> based
              on the information and documents made available for review. The amounts have been presented in Bangladesh Taka
              (BDT) and converted into {currCode} at the exchange rate stated above.
            </p>
          </div>

          <div className="text-center text-xs text-slate-500 border-t border-slate-300 pt-2 flex justify-between font-sans">
            <span>Reference No.: {general.refNo}</span>
            <span>Page 02</span>
          </div>
        </div>
      )}

      {/* ================= PAGE 5: CERTIFICATION FOR VALUATION OF PROPERTIES ================= */}
      {includedPages.certProperties && (
        <div className="a4-page bg-white shadow-xl print:shadow-none border border-slate-200 print:border-none w-[210mm] min-h-[297mm] p-[20mm] box-border text-black font-serif relative flex flex-col justify-between">
          <div>
            <div className="text-center mb-6">
              <h2 className="text-lg font-bold uppercase tracking-wider">
                CERTIFICATE OF FAIR MARKET VALUATION OF PROPERTIES
              </h2>
              <p className="text-xs font-sans text-slate-600 mt-1">
                Reference No.: {general.refNo} &bull; Date: {general.reportDate}
              </p>
            </div>

            <h3 className="text-sm font-bold uppercase tracking-wide mb-2">
              1) Present Value of Lands and Buildings (Annexure- A)
            </h3>

            <table className="w-full border-collapse border border-black text-[13px] my-3">
              <thead>
                <tr className="bg-slate-100 font-bold">
                  <th className="border border-black p-2 text-left">Particulars</th>
                  <th className="border border-black p-2 text-right">Amount (BDT)</th>
                  <th className="border border-black p-2 text-right">Amount ({currCode})</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-black p-2.5">Fair Market Value of Lands &amp; Buildings</td>
                  <td className="border border-black p-2.5 text-right font-mono font-bold text-blue-950">{formatBdt(figures.landBdt)}</td>
                  <td className="border border-black p-2.5 text-right font-mono font-bold text-blue-950">{formatForeign(figures.landForeign, currSym)}</td>
                </tr>
              </tbody>
            </table>

            <p className="text-[13px] leading-relaxed text-justify my-3">
              The detailed breakdown of the valuation has been prepared and attached as Annexure- A, which forms an
              integral part of this certificate.
            </p>

            <div className="my-5 p-3.5 border border-slate-300 rounded bg-slate-50 text-[12.5px] space-y-1.5">
              <h4 className="font-bold text-xs uppercase tracking-wide text-slate-900">Amount in Words</h4>
              <p>
                <strong>Total Value (BDT): </strong>
                <span className="font-bold underline text-blue-950">{figures.wordsLandBdt}</span> Only
              </p>
              <p>
                <strong>Total Value ({currCode}): </strong>
                <span className="font-bold underline text-blue-950">{figures.wordsLandForeign}</span> Only
              </p>
            </div>

            <div className="text-xs font-sans text-slate-700 space-y-1 mb-4">
              <p><strong>Exchange Rate Applied:</strong> 1 {currCode} = BDT {general.exchangeRate.toFixed(2)}</p>
              <p><strong>Source of Exchange Rate:</strong> {general.exchangeRateSource}</p>
            </div>

            <p className="text-[13px] leading-relaxed text-justify">
              Based on the information, records, and valuation exercise referred to above, the aggregate fair market value
              of the lands and buildings owned by <strong>{sponsor.name}</strong> is hereby certified as approximately:
            </p>

            {/* Big Certified Figures */}
            <div className="my-8 py-5 border-y-2 border-black text-center space-x-8 bg-slate-50/70">
              <span className="text-xl font-bold font-mono">BDT {formatBdt(figures.landBdt)}</span>
              <span className="text-xl font-bold font-mono text-blue-900">{currCode} {formatBdt(figures.landForeign)}</span>
            </div>

            <p className="text-[12.5px] text-justify text-slate-700">
              This certificate has been issued upon the request of the concerned party for submission to the appropriate
              authority and for such lawful purposes as may be required.
            </p>

            <div className="mt-16 flex justify-between items-end">
              <div>
                <p className="text-xs font-sans">Date: {general.reportDate}</p>
                <p className="text-xs font-sans text-slate-500">Dhaka, Bangladesh</p>
              </div>
              <div className="text-center w-56">
                <div className="border-t border-black pt-1">
                  <p className="font-bold text-xs">{general.firmName}</p>
                  <p className="text-[11px] text-slate-600 font-sans">{general.valuerDesignation}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center text-xs text-slate-500 border-t border-slate-300 pt-2 flex justify-between font-sans">
            <span>Reference No.: {general.refNo}</span>
            <span>Page 03</span>
          </div>
        </div>
      )}

      {/* ================= PAGE 6: CERTIFICATE OF INVESTMENT IN FINANCIAL ASSETS ================= */}
      {includedPages.certInvestments && (
        <div className="a4-page bg-white shadow-xl print:shadow-none border border-slate-200 print:border-none w-[210mm] min-h-[297mm] p-[20mm] box-border text-black font-serif relative flex flex-col justify-between">
          <div>
            <div className="text-center mb-6">
              <h2 className="text-lg font-bold uppercase tracking-wider">
                CERTIFICATE OF INVESTMENT IN FINANCIAL ASSETS
              </h2>
              <p className="text-xs font-sans text-slate-600 mt-1">
                Reference No.: {general.refNo} &bull; Date: {general.reportDate}
              </p>
            </div>

            <h3 className="text-sm font-bold uppercase tracking-wide mb-2">
              2) Investment in Financial Assets (Annexure- B)
            </h3>

            <table className="w-full border-collapse border border-black text-[13px] my-3">
              <thead>
                <tr className="bg-slate-100 font-bold">
                  <th className="border border-black p-2 text-left">Particulars</th>
                  <th className="border border-black p-2 text-right">Amount (BDT)</th>
                  <th className="border border-black p-2 text-right">Amount ({currCode})</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-black p-2.5">Investments &amp; Other Financial Assets</td>
                  <td className="border border-black p-2.5 text-right font-mono font-bold text-blue-950">{formatBdt(figures.invBdt)}</td>
                  <td className="border border-black p-2.5 text-right font-mono font-bold text-blue-950">{formatForeign(figures.invForeign, currSym)}</td>
                </tr>
              </tbody>
            </table>

            <p className="text-[13px] leading-relaxed text-justify my-3">
              The detailed schedule of investments and financial assets is attached as Annexure- B, which forms an
              integral part of this certificate.
            </p>

            <div className="my-5 p-3.5 border border-slate-300 rounded bg-slate-50 text-[12.5px] space-y-1.5">
              <h4 className="font-bold text-xs uppercase tracking-wide text-slate-900">Amount in Words</h4>
              <p>
                <strong>Total Value (BDT): </strong>
                <span className="font-bold underline text-blue-950">{figures.wordsInvBdt}</span> Only
              </p>
              <p>
                <strong>Total Value ({currCode}): </strong>
                <span className="font-bold underline text-blue-950">{figures.wordsInvForeign}</span> Only
              </p>
            </div>

            <div className="text-xs font-sans text-slate-700 space-y-1 mb-4">
              <p><strong>Exchange Rate Applied:</strong> 1 {currCode} = BDT {general.exchangeRate.toFixed(2)}</p>
              <p><strong>Source of Exchange Rate:</strong> {general.exchangeRateSource}</p>
            </div>

            <p className="text-[13px] leading-relaxed text-justify">
              Based on the documents and information made available for our review, the aggregate value of the financial
              assets owned by <strong>{sponsor.name}</strong> has been determined at approximately:
            </p>

            <div className="my-8 py-5 border-y-2 border-black text-center space-x-8 bg-slate-50/70">
              <span className="text-xl font-bold font-mono">BDT {formatBdt(figures.invBdt)}</span>
              <span className="text-xl font-bold font-mono text-blue-900">{currCode} {formatBdt(figures.invForeign)}</span>
            </div>

            <p className="text-[12px] leading-relaxed text-justify text-slate-700 space-y-1">
              This certificate is issued solely for information purposes and for submission to the relevant authorities in
              connection with visa, immigration, sponsorship, financial assessment, or any other lawful purpose as may be
              required. We have relied upon the documents, records, statements, and representations provided to us and have
              not conducted an independent audit of the underlying financial institutions or investment entities.
            </p>

            <div className="mt-16 flex justify-between items-end">
              <div>
                <p className="text-xs font-sans">Date: {general.reportDate}</p>
                <p className="text-xs font-sans text-slate-500">Dhaka, Bangladesh</p>
              </div>
              <div className="text-center w-56">
                <div className="border-t border-black pt-1">
                  <p className="font-bold text-xs">{general.firmName}</p>
                  <p className="text-[11px] text-slate-600 font-sans">{general.valuerDesignation}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center text-xs text-slate-500 border-t border-slate-300 pt-2 flex justify-between font-sans">
            <span>Reference No.: {general.refNo}</span>
            <span>Page 04</span>
          </div>
        </div>
      )}

      {/* ================= PAGE 7: CERTIFICATE OF ANNUAL INCOME ================= */}
      {includedPages.certIncome && (
        <div className="a4-page bg-white shadow-xl print:shadow-none border border-slate-200 print:border-none w-[210mm] min-h-[297mm] p-[20mm] box-border text-black font-serif relative flex flex-col justify-between">
          <div>
            <div className="text-center mb-6">
              <h2 className="text-lg font-bold uppercase tracking-wider">
                CERTIFICATE OF ANNUAL INCOME
              </h2>
              <p className="text-xs font-sans text-slate-600 mt-1">
                <strong>Reference No.:</strong> {general.refNo} &bull; <strong>Date of Report:</strong> {general.reportDate}
              </p>
            </div>

            <p className="text-[13px] leading-relaxed text-justify mb-3">
              This is to certify that the annual income of <strong>{sponsor.name}</strong>, sponsor of{' '}
              <strong>{applicant.name}</strong>, has been reviewed and assessed based on the information, documents,
              records, declarations, and supporting evidence made available to us as of {general.reportDate}.
            </p>

            <p className="text-[12.5px] leading-relaxed text-justify mb-4 text-slate-800">
              The income assessment has been conducted through examination of relevant financial records, income
              statements, tax-related documents, bank records, professional earnings, investment income, rental income, and
              other available supporting documentation, where applicable. Based on our review and assessment, the annual
              income of the above-mentioned individual is summarized as follows:
            </p>

            <h3 className="text-sm font-bold uppercase tracking-wide mb-2">
              3) Annual Income (Annexure-C)
            </h3>

            <table className="w-full border-collapse border border-black text-[13px] my-3">
              <thead>
                <tr className="bg-slate-100 font-bold">
                  <th className="border border-black p-2 text-left">Particulars</th>
                  <th className="border border-black p-2 text-right">Amount (BDT)</th>
                  <th className="border border-black p-2 text-right">Amount ({currCode})</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-black p-2.5">Annual Income (Combined Sources)</td>
                  <td className="border border-black p-2.5 text-right font-mono font-bold text-blue-950">{formatBdt(figures.incBdt)}</td>
                  <td className="border border-black p-2.5 text-right font-mono font-bold text-blue-950">{formatForeign(figures.incForeign, currSym)}</td>
                </tr>
              </tbody>
            </table>

            <div className="my-5 p-3.5 border border-slate-300 rounded bg-slate-50 text-[12.5px] space-y-1.5">
              <h4 className="font-bold text-xs uppercase tracking-wide text-slate-900">Amount in Words</h4>
              <p>
                <strong>Total Value (BDT): </strong>
                <span className="font-bold underline text-blue-950">{figures.wordsIncBdt}</span> Only
              </p>
              <p>
                <strong>Total Value ({currCode}): </strong>
                <span className="font-bold underline text-blue-950">{figures.wordsIncForeign}</span> Only
              </p>
            </div>

            <div className="text-xs font-sans text-slate-700 space-y-1 mb-4">
              <p><strong>Exchange Rate Applied:</strong> 1 {currCode} = BDT {general.exchangeRate.toFixed(2)}</p>
              <p><strong>Source of Exchange Rate:</strong> {general.exchangeRateSource}</p>
            </div>

            <p className="text-[13px] leading-relaxed text-justify">
              Based on the information and documents made available for our examination, we hereby certify that the
              estimated annual income of <strong>{sponsor.name}</strong> is approximately:
            </p>

            <div className="my-8 py-5 border-y-2 border-black text-center space-x-8 bg-slate-50/70">
              <span className="text-xl font-bold font-mono">BDT {formatBdt(figures.incBdt)}</span>
              <span className="text-xl font-bold font-mono text-blue-900">{currCode} {formatBdt(figures.incForeign)}</span>
            </div>

            <p className="text-[12px] leading-relaxed text-justify text-slate-700">
              This certificate has been issued at the request of the concerned party for submission to immigration
              authorities, educational institutions, financial institutions, government agencies, or any other relevant
              authority for lawful purposes.
            </p>

            <div className="mt-16 flex justify-between items-end">
              <div>
                <p className="text-xs font-sans">Date: {general.reportDate}</p>
                <p className="text-xs font-sans text-slate-500">Dhaka, Bangladesh</p>
              </div>
              <div className="text-center w-56">
                <div className="border-t border-black pt-1">
                  <p className="font-bold text-xs">{general.firmName}</p>
                  <p className="text-[11px] text-slate-600 font-sans">{general.valuerDesignation}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center text-xs text-slate-500 border-t border-slate-300 pt-2 flex justify-between font-sans">
            <span>Reference No.: {general.refNo}</span>
            <span>Page 05</span>
          </div>
        </div>
      )}

      {/* ================= PAGE 8: ANNEXURE A: LANDS & BUILDINGS ================= */}
      {includedPages.annexureA && (
        <div className="a4-page bg-white shadow-xl print:shadow-none border border-slate-200 print:border-none w-[210mm] min-h-[297mm] p-[18mm] box-border text-black font-serif relative flex flex-col justify-between">
          <div>
            <div className="text-center mb-4 border-b border-black pb-2">
              <h2 className="text-base font-bold uppercase tracking-wider">
                ANNEXURE - A: SCHEDULE OF LANDS AND BUILDINGS
              </h2>
              <p className="text-xs font-sans text-slate-700 mt-1">
                Name of Property Owner: <strong>{sponsor.name}</strong>, Sponsor of: <strong>{applicant.name}</strong> &bull; As at {general.reportDate}
              </p>
            </div>

            <table className="w-full border-collapse border border-black text-[11px] table-fixed">
              <thead>
                <tr className="bg-slate-100 font-bold">
                  <th className="border border-black p-1 text-center" style={{ width: '28px' }}>SI</th>
                  <th className="border border-black p-1 text-center" style={{ width: '100px' }}>Deed/Khatian &amp; Date</th>
                  <th className="border border-black p-1 text-left">Details of Land and Building Properties</th>
                  <th className="border border-black p-1 text-right" style={{ width: '68px' }}>Purchase Price</th>
                  <th className="border border-black p-1 text-right" style={{ width: '68px' }}>Capitalized Cost</th>
                  <th className="border border-black p-1 text-right" style={{ width: '68px' }}>Book Value</th>
                  <th className="border border-black p-1 text-right" style={{ width: '68px' }}>FMV Per Unit</th>
                  <th className="border border-black p-1 text-right" style={{ width: '75px' }}>Revalued Amount</th>
                </tr>
              </thead>
              <tbody>
                {lands.map((land, idx) => (
                  <tr key={land.id}>
                    <td className="border border-black p-1 text-center font-mono align-top">{idx + 1}</td>
                    <td className="border border-black p-1 align-top font-sans text-[10px] leading-tight">{land.deed}</td>
                    <td className="border border-black p-1.5 align-top text-justify text-[10.5px] leading-snug">{land.details}</td>
                    <td className="border border-black p-1 text-right font-mono align-top">{formatBdt(land.purchase)}</td>
                    <td className="border border-black p-1 text-right font-mono align-top">{formatBdt(land.cap)}</td>
                    <td className="border border-black p-1 text-right font-mono align-top">{formatBdt(land.book)}</td>
                    <td className="border border-black p-1 text-right font-mono align-top">{land.fmv ? formatBdt(land.fmv) : '-'}</td>
                    <td className="border border-black p-1 text-right font-mono align-top font-bold">{formatBdt(land.book)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-slate-100 font-bold border-t-2 border-black">
                  <td colSpan={7} className="border border-black p-2 text-right uppercase text-xs">Total Amount (BDT)</td>
                  <td className="border border-black p-2 text-right font-mono text-xs text-blue-900">{formatBdt(figures.landBdt)}</td>
                </tr>
                <tr className="bg-slate-50 font-bold">
                  <td colSpan={7} className="border border-black p-2 text-right uppercase text-xs">Total Equivalent ({currCode})</td>
                  <td className="border border-black p-2 text-right font-mono text-xs text-blue-900">{formatForeign(figures.landForeign, currSym)}</td>
                </tr>
              </tfoot>
            </table>

            <div className="mt-4 text-xs font-sans space-y-1">
              <p><strong>Exchange Rate Applied:</strong> 1 {currCode} = BDT {general.exchangeRate.toFixed(2)}</p>
              <p><strong>Source of Exchange Rate:</strong> {general.exchangeRateSource}</p>
            </div>

            <div className="mt-4 p-3 border border-slate-300 rounded bg-slate-50 text-xs space-y-1">
              <h4 className="font-bold text-[11px] uppercase tracking-wide">Amount in Words</h4>
              <p><strong>Total Value (BDT):</strong> <span className="font-bold">{figures.wordsLandBdt}</span> Only</p>
              <p><strong>Total Value ({currCode}):</strong> <span className="font-bold">{figures.wordsLandForeign}</span> Only</p>
            </div>
          </div>

          <div className="text-center text-xs text-slate-500 border-t border-slate-300 pt-2 flex justify-between font-sans">
            <span>Annexure - A</span>
            <span>Page 06</span>
          </div>
        </div>
      )}

      {/* ================= PAGE 9: ANNEXURE B: FINANCIAL INVESTMENTS ================= */}
      {includedPages.annexureB && (
        <div className="a4-page bg-white shadow-xl print:shadow-none border border-slate-200 print:border-none w-[210mm] min-h-[297mm] p-[20mm] box-border text-black font-serif relative flex flex-col justify-between">
          <div>
            <div className="text-center mb-6 border-b border-black pb-2">
              <h2 className="text-base font-bold uppercase tracking-wider">
                ANNEXURE - B: SCHEDULE OF FINANCIAL INVESTMENTS
              </h2>
              <p className="text-xs font-sans text-slate-700 mt-1">
                Name of Investor: <strong>{sponsor.name}</strong>, Sponsor of: <strong>{applicant.name}</strong> &bull; As at {general.reportDate}
              </p>
            </div>

            <h3 className="text-xs font-bold uppercase tracking-wide mb-2">Details of Financial Investments</h3>

            <table className="w-full border-collapse border border-black text-[12px] my-3">
              <thead>
                <tr className="bg-slate-100 font-bold">
                  <th className="border border-black p-2 w-12 text-center">Sl. No.</th>
                  <th className="border border-black p-2 text-left">Nature of Investment</th>
                  <th className="border border-black p-2 text-left">Institution / Organization</th>
                  <th className="border border-black p-2 text-center">A/C Number</th>
                  <th className="border border-black p-2 text-right">Amount (BDT)</th>
                </tr>
              </thead>
              <tbody>
                {investments.map((inv, idx) => (
                  <tr key={inv.id}>
                    <td className="border border-black p-2 text-center font-mono">{idx + 1}</td>
                    <td className="border border-black p-2 font-medium">{inv.nature}</td>
                    <td className="border border-black p-2">{inv.inst}</td>
                    <td className="border border-black p-2 text-center font-mono">{inv.acc}</td>
                    <td className="border border-black p-2 text-right font-mono font-semibold">{formatBdt(inv.amount)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-slate-100 font-bold border-t-2 border-black">
                  <td colSpan={4} className="border border-black p-2.5 text-right uppercase">Total Amount in BDT</td>
                  <td className="border border-black p-2.5 text-right font-mono text-blue-900">{formatBdt(figures.invBdt)}</td>
                </tr>
                <tr className="bg-slate-50 font-bold">
                  <td colSpan={4} className="border border-black p-2.5 text-right uppercase">Total Amount Equivalent to {currCode}</td>
                  <td className="border border-black p-2.5 text-right font-mono text-blue-900">{formatForeign(figures.invForeign, currSym)}</td>
                </tr>
              </tfoot>
            </table>

            <div className="mt-4 text-xs font-sans space-y-1">
              <p><strong>Exchange Rate Applied:</strong> 1 {currCode} = BDT {general.exchangeRate.toFixed(2)}</p>
              <p><strong>Source of Exchange Rate:</strong> {general.exchangeRateSource}</p>
            </div>

            <div className="mt-5 p-3.5 border border-slate-300 rounded bg-slate-50 text-xs space-y-1.5">
              <h4 className="font-bold text-[11px] uppercase tracking-wide">Amount in Words</h4>
              <p><strong>Total Value (BDT):</strong> <span className="font-bold underline">{figures.wordsInvBdt}</span> Only</p>
              <p><strong>Total Value ({currCode}):</strong> <span className="font-bold underline">{figures.wordsInvForeign}</span> Only</p>
            </div>
          </div>

          <div className="text-center text-xs text-slate-500 border-t border-slate-300 pt-2 flex justify-between font-sans">
            <span>Annexure - B</span>
            <span>Page 08</span>
          </div>
        </div>
      )}

      {/* ================= PAGE 10: ANNEXURE C: ANNUAL INCOME STATEMENT ================= */}
      {includedPages.annexureC && (
        <div className="a4-page bg-white shadow-xl print:shadow-none border border-slate-200 print:border-none w-[210mm] min-h-[297mm] p-[18mm] box-border text-black font-serif relative flex flex-col justify-between">
          <div>
            <div className="text-center mb-4 border-b border-black pb-2">
              <h2 className="text-base font-bold uppercase tracking-wider">
                ANNEXURE - C: ANNUAL INCOME STATEMENT
              </h2>
              <p className="text-xs font-sans text-slate-700 mt-1">
                Name of Earner: <strong>{sponsor.name}</strong> &bull; As at {general.reportDate}
              </p>
            </div>

            {/* 1. Employment */}
            <h3 className="text-xs font-bold uppercase tracking-wide mb-1">1. Income from Employment</h3>
            <table className="w-full border-collapse border border-black text-[11.5px] mb-3">
              <thead>
                <tr className="bg-slate-100 font-bold">
                  <th className="border border-black p-1.5 text-left">Particulars</th>
                  <th className="border border-black p-1.5 w-32 text-right">Monthly Income (BDT)</th>
                  <th className="border border-black p-1.5 w-32 text-right">Annual Income (BDT)</th>
                </tr>
              </thead>
              <tbody>
                {employmentIncomes.map((emp) => (
                  <tr key={emp.id}>
                    <td className="border border-black p-1.5">{emp.particulars}</td>
                    <td className="border border-black p-1.5 text-right font-mono">{formatBdt(emp.monthly)}</td>
                    <td className="border border-black p-1.5 text-right font-mono font-semibold">{formatBdt(emp.annual)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* 2. Rental */}
            <h3 className="text-xs font-bold uppercase tracking-wide mb-1">2. Income from House Rent</h3>
            <table className="w-full border-collapse border border-black text-[11.5px] mb-3">
              <thead>
                <tr className="bg-slate-100 font-bold">
                  <th className="border border-black p-1.5 w-20 text-center">Floor</th>
                  <th className="border border-black p-1.5 text-left">Description</th>
                  <th className="border border-black p-1.5 w-24 text-right">Rent/Unit (BDT)</th>
                  <th className="border border-black p-1.5 w-28 text-right">Monthly (BDT)</th>
                  <th className="border border-black p-1.5 w-28 text-right">Annual (BDT)</th>
                </tr>
              </thead>
              <tbody>
                {rentalIncomes.map((rent) => (
                  <tr key={rent.id}>
                    <td className="border border-black p-1 text-center font-medium">{rent.floor}</td>
                    <td className="border border-black p-1">{rent.description}</td>
                    <td className="border border-black p-1 text-right font-mono">{formatBdt(rent.rentPerUnit)}</td>
                    <td className="border border-black p-1 text-right font-mono">{formatBdt(rent.monthly)}</td>
                    <td className="border border-black p-1 text-right font-mono font-semibold">{formatBdt(rent.annual)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* 3. Business */}
            <h3 className="text-xs font-bold uppercase tracking-wide mb-1">3. Business Income (Partnership Firm)</h3>
            <table className="w-full border-collapse border border-black text-[11.5px] mb-4">
              <thead>
                <tr className="bg-slate-100 font-bold">
                  <th className="border border-black p-1.5 text-left">Source of Business Income</th>
                  <th className="border border-black p-1.5 w-32 text-right">Monthly Income (BDT)</th>
                  <th className="border border-black p-1.5 w-32 text-right">Annual Income (BDT)</th>
                </tr>
              </thead>
              <tbody>
                {businessIncomes.map((biz) => (
                  <tr key={biz.id}>
                    <td className="border border-black p-1.5 font-medium">{biz.source}</td>
                    <td className="border border-black p-1.5 text-right font-mono">{formatBdt(biz.monthly)}</td>
                    <td className="border border-black p-1.5 text-right font-mono font-semibold">{formatBdt(biz.annual)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Consolidated Table */}
            <h3 className="text-xs font-bold uppercase tracking-wide mb-1">Consolidated Annual Income Summary</h3>
            <table className="w-full border-collapse border border-black text-[12px]">
              <thead>
                <tr className="bg-slate-100 font-bold">
                  <th className="border border-black p-1.5 w-12 text-center">Sl.</th>
                  <th className="border border-black p-1.5 text-left">Particulars</th>
                  <th className="border border-black p-1.5 w-40 text-right">Annual Income (BDT)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-black p-1.5 text-center font-mono">1</td>
                  <td className="border border-black p-1.5">Income from Employment</td>
                  <td className="border border-black p-1.5 text-right font-mono">{formatBdt(employmentIncomes.reduce((a, b) => a + b.annual, 0))}</td>
                </tr>
                <tr>
                  <td className="border border-black p-1.5 text-center font-mono">2</td>
                  <td className="border border-black p-1.5">Income from House Rent</td>
                  <td className="border border-black p-1.5 text-right font-mono">{formatBdt(rentalIncomes.reduce((a, b) => a + b.annual, 0))}</td>
                </tr>
                <tr>
                  <td className="border border-black p-1.5 text-center font-mono">3</td>
                  <td className="border border-black p-1.5">Business Income (Partnership Firm)</td>
                  <td className="border border-black p-1.5 text-right font-mono">{formatBdt(businessIncomes.reduce((a, b) => a + b.annual, 0))}</td>
                </tr>
                <tr className="bg-slate-100 font-bold border-t-2 border-black">
                  <td colSpan={2} className="border border-black p-2 text-right uppercase">Total Amount in BDT</td>
                  <td className="border border-black p-2 text-right font-mono text-blue-900">{formatBdt(figures.incBdt)}</td>
                </tr>
              </tbody>
            </table>

            <div className="mt-3 p-3 border border-slate-300 rounded bg-slate-50 text-[11.5px] space-y-1">
              <p><strong>Exchange Rate Applied:</strong> 1 {currCode} = BDT {general.exchangeRate.toFixed(2)}</p>
              <p><strong>Total Value in Words (BDT):</strong> <span className="font-bold">{figures.wordsIncBdt}</span> Only</p>
              <p><strong>Total Value in Words ({currCode}):</strong> <span className="font-bold">{figures.wordsIncForeign}</span> Only</p>
            </div>
          </div>

          <div className="text-center text-xs text-slate-500 border-t border-slate-300 pt-2 flex justify-between font-sans">
            <span>Annexure - C</span>
            <span>Page 09</span>
          </div>
        </div>
      )}

      {/* ================= PAGE 11-15: VALUATION NOTES (DOC 05) ================= */}
      {includedPages.valuationNotes && (
        <>
          {/* Notes Page 1 */}
          <div className="a4-page bg-white shadow-xl print:shadow-none border border-slate-200 print:border-none w-[210mm] min-h-[297mm] p-[20mm] box-border text-black font-serif relative flex flex-col justify-between">
            <div className="space-y-4 text-[13px] leading-relaxed">
              <p className="underline font-bold text-center text-base tracking-wide uppercase">
                NOTES TO THE ASSET VALUATION REPORT
              </p>

              <div className="text-center my-6 py-4 border-y border-black">
                <p>In respect of the Land and Buildings owned by</p>
                <p className="font-bold text-base uppercase text-blue-950 mt-1">{sponsor.name}</p>
                <p className="text-xs italic text-slate-600">(collectively referred to as the "Sponsor" / "Sponsors")</p>
              </div>

              <div className="space-y-1 my-6 font-sans text-xs">
                <p><strong>Prepared by:</strong></p>
                <p className="font-bold text-sm text-slate-900">{general.firmName}</p>
                <p className="text-slate-700">{general.valuerDesignation}</p>
                <p className="text-slate-600 italic">(the "Valuers")</p>
                <div className="pt-3">
                  <p><strong>Valuation Date:</strong> {general.valuationDate}</p>
                  <p><strong>Report Date:</strong> {general.reportDate}</p>
                </div>
              </div>

              <h3 className="font-bold text-sm uppercase tracking-wide border-b border-black pb-1 pt-4">
                1. ENGAGEMENT AND INTRODUCTION
              </h3>
              <p className="text-justify">
                1.1. This Asset Valuation Report ("Report") has been prepared by <strong>{general.firmName}</strong>,
                Chartered Accountants (hereinafter referred to as the "Valuers") pursuant to the engagement of{' '}
                <strong>{sponsor.name}</strong> (hereinafter collectively referred to as the "Sponsor" or "Sponsors").
              </p>
              <p className="text-justify">
                1.2. The Valuers were engaged to assess and determine the fair market value of the land and buildings owned
                by the Sponsor(s) as at <strong>{general.valuationDate}</strong>.
              </p>
              <p className="text-justify">
                1.3. This Report has been prepared on the basis of the information, documents, explanations, and
                representations provided by the Sponsor(s) and/or their representatives, together with the physical inspection
                carried out by the Valuers and the market evidence available at the relevant time.
              </p>
              <p className="text-justify">
                1.4. The conclusions expressed in this Report represent the Valuers' professional opinion of value and are
                subject to the assumptions, limitations, and qualifications stated herein.
              </p>
            </div>

            <div className="text-center text-xs text-slate-500 border-t border-slate-300 pt-2 flex justify-between font-sans">
              <span>Valuation Notes</span>
              <span>Page 10</span>
            </div>
          </div>

          {/* Notes Page 2 */}
          <div className="a4-page bg-white shadow-xl print:shadow-none border border-slate-200 print:border-none w-[210mm] min-h-[297mm] p-[20mm] box-border text-black font-serif relative flex flex-col justify-between">
            <div className="space-y-4 text-[13px] leading-relaxed">
              <h3 className="font-bold text-sm uppercase tracking-wide border-b border-black pb-1">
                2. PURPOSE OF VALUATION
              </h3>
              <p className="text-justify">
                2.1. The purpose of this valuation is to provide an independent and professionally supported estimate of the
                fair market value of the subject land and buildings as at the valuation date.
              </p>
              <p className="text-justify">
                2.2. This Report is intended to assist the Sponsor(s) for one or more of the following purposes:
              </p>
              <div className="pl-6 space-y-1 text-slate-800 text-[12.5px]">
                <p>(a) financial statement preparation and asset revaluation;</p>
                <p>(b) wealth statement preparation and tax compliance;</p>
                <p>(c) banking, financing, mortgage, or collateral-related purposes;</p>
                <p>(d) regulatory, statutory, or legal submissions;</p>
                <p>(e) corporate decision-making and asset management;</p>
                <p>(f) restructuring, succession, or estate planning; and</p>
                <p>(g) such other lawful and proper purposes as may be required from time to time.</p>
              </div>
              <p className="text-justify">
                2.3. The valuation conclusion is based on the estimated amount that the subject properties would reasonably
                fetch in an open and competitive market between a willing buyer and a willing seller, acting knowledgeably,
                prudently, and without compulsion, as at the valuation date.
              </p>

              <h3 className="font-bold text-sm uppercase tracking-wide border-b border-black pb-1 pt-3">
                3. VALUATION DATE, REPORT DATE, AND BASIS OF VALUE
              </h3>
              <p className="text-justify">
                3.1. The valuation date for the purposes of this Report is <strong>{general.valuationDate}</strong>.
              </p>
              <p className="text-justify">
                3.2. The Report date is the date on which this Report is signed and issued by the Valuers.
              </p>
              <p className="text-justify">
                3.3. The valuation stated herein is specific to the valuation date only and may not reflect the value at any
                other date, whether before or after the valuation date.
              </p>
              <p className="text-justify">
                3.4. The basis of value adopted in this Report is <strong>fair market value / fair value</strong>, unless
                otherwise stated in the relevant valuation schedule or annexure.
              </p>

              <h3 className="font-bold text-sm uppercase tracking-wide border-b border-black pb-1 pt-3">
                4. SCOPE OF WORK
              </h3>
              <p className="text-justify">
                4.1. The scope of the engagement included procedures for physical inspection, identification, review of title
                deeds, market inquiry with local property registrars, and professional appraisal in compliance with International
                Valuation Standards (IVS) and Bangladesh statutory criteria.
              </p>
            </div>

            <div className="text-center text-xs text-slate-500 border-t border-slate-300 pt-2 flex justify-between font-sans">
              <span>Valuation Notes</span>
              <span>Page 11</span>
            </div>
          </div>

          {/* Notes Page 3: Valuation Conclusion & Valuers Declaration */}
          <div className="a4-page bg-white shadow-xl print:shadow-none border border-slate-200 print:border-none w-[210mm] min-h-[297mm] p-[20mm] box-border text-black font-serif relative flex flex-col justify-between">
            <div className="space-y-4 text-[13px] leading-relaxed">
              <h3 className="font-bold text-sm uppercase tracking-wide border-b border-black pb-1">
                11. VALUATION CONCLUSION
              </h3>
              <p className="text-justify">
                11.1. Based on the inspection carried out, the documents reviewed, the market evidence analyzed, and the
                professional judgment applied, the Valuers are of the opinion that the fair market value of the subject land
                and buildings as at <strong>{general.valuationDate}</strong> is as follows:
              </p>

              {/* Conclusion Box */}
              <div className="my-6 p-6 border-2 border-black text-center bg-slate-50">
                <p className="text-2xl font-bold font-mono text-blue-950">
                  BDT {formatBdt(figures.landBdt)}
                </p>
                <p className="font-bold text-sm mt-2">
                  (Bangladeshi Taka <span className="underline">{figures.wordsLandBdt}</span> only)
                </p>
                <p className="text-xs text-slate-600 font-sans mt-3">
                  Equivalent to {currCode} {formatBdt(figures.landForeign)} ({figures.wordsLandForeign} {currCode} Only)
                </p>
              </div>

              <p className="text-justify text-xs text-slate-700">
                11.2. This figure represents the Valuers' professional opinion of fair value as at the valuation date and
                should be read together with the entirety of this Report, including all assumptions, limitations,
                qualifications, and annexures.
              </p>

              <h3 className="font-bold text-sm uppercase tracking-wide border-b border-black pb-1 pt-4">
                DECLARATION BY THE VALUERS
              </h3>
              <p className="text-justify text-xs">
                We hereby declare that, to the best of our knowledge and belief, this Report has been prepared with due care,
                objectivity, and professional diligence. We further declare that the conclusions expressed herein are based
                on the information made available to us and the procedures performed by us in relation to this assignment.
              </p>

              {/* Signature Lines */}
              <div className="pt-16 grid grid-cols-2 gap-12 font-sans">
                <div className="text-center">
                  <div className="w-56 mx-auto border-t-2 border-black pt-2">
                    <p className="font-bold text-xs uppercase">{general.valuerName}</p>
                    <p className="text-[11px] text-slate-600">{general.valuerDesignation}</p>
                    <p className="text-[11px] text-slate-500">{general.firmName}</p>
                  </div>
                </div>

                <div className="text-center">
                  <div className="w-56 mx-auto border-t-2 border-black pt-2">
                    <p className="font-bold text-xs uppercase">Date of Issuance</p>
                    <p className="text-xs font-mono text-slate-700">{general.reportDate}</p>
                    <p className="text-[11px] text-slate-500">Dhaka, Bangladesh</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center text-xs text-slate-500 border-t border-slate-300 pt-2 flex justify-between font-sans">
              <span>Valuation Notes &amp; Signatures</span>
              <span>Final Page</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
