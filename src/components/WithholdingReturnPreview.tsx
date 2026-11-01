import React from 'react';
import { WithholdingReturnState } from '../types/withholdingReturn';
import {
  calculateSalaryTotals,
  calculateChallanTotals,
  formatCurrencyCommas
} from '../utils/withholdingReturnCalculations';
import { StatutoryLang, t, formatStatutoryNumeral } from '../utils/statutoryTranslations';

interface WithholdingReturnPreviewProps {
  data: WithholdingReturnState;
  zoom: number;
  docLang?: StatutoryLang;
}

export const WithholdingReturnPreview: React.FC<WithholdingReturnPreviewProps> = ({
  data,
  zoom,
  docLang = 'en'
}) => {
  const {
    selectedSubDoc,
    general,
    salariesSummary,
    treasury,
    verification,
    salaries,
    employeeFilings
  } = data;

  const salaryTotals = calculateSalaryTotals(salaries);
  const challanTotal = calculateChallanTotals(treasury.challans);

  const shouldShow = (pageKey: string) => {
    if (selectedSubDoc === 'all') return true;
    return selectedSubDoc === pageKey;
  };

  const zoomStyle = {
    transform: `scale(${zoom / 100})`,
    transformOrigin: 'top center'
  };

  return (
    <div
      className="flex flex-col items-center gap-10 print:gap-0 print:m-0 w-full"
      style={zoomStyle}
    >
      {/* =========================================================================
          PAGE 1: ACKNOWLEDGEMENT RECEIPT (SEPARATE PAGE)
      ========================================================================= */}
      {shouldShow('ack') && (
        <section
          aria-label="Acknowledgement Receipt of TDS Return"
          className="a4-page w-[210mm] min-h-[297mm] bg-white text-slate-950 p-[15mm] shadow-2xl relative font-serif text-[12px] leading-relaxed border border-slate-300 print:border-none print:shadow-none print:p-[15mm] print:m-0 print:page-break-after-always flex flex-col justify-between"
        >
          <div>
            <div className="text-center mb-6">
              <h2 className="text-base sm:text-lg font-bold tracking-tight uppercase leading-snug">
                {t('withholding.ackTitle', docLang)}
              </h2>
              <p className="text-[10px] text-slate-600 font-sans mt-0.5">
                {t('withholding.ackSub', docLang)}
              </p>
            </div>

            {/* Box 1: Financial Year & Month */}
            <div className="grid grid-cols-3 border border-slate-900 mb-[-1px]">
              <div className="p-2.5 border-r border-slate-900">
                <p className="text-[11px] text-slate-700 font-sans font-medium">
                  {t('withholding.returnFy', docLang)}
                </p>
                <div className="mt-1.5 flex items-center gap-1 font-mono text-sm font-bold">
                  <span className="border border-slate-900 px-1 py-0.5">2</span>
                  <span className="border border-slate-900 px-1 py-0.5">0</span>
                  <span className="border border-slate-900 px-1 py-0.5">2</span>
                  <span className="border border-slate-900 px-1 py-0.5">5</span>
                  <span className="mx-0.5">-</span>
                  <span className="border border-slate-900 px-1 py-0.5">2</span>
                  <span className="border border-slate-900 px-1 py-0.5">6</span>
                </div>
              </div>
              <div className="col-span-2 p-2.5 flex items-center justify-center font-sans text-xs">
                <span>{t('withholding.applicableMonth', docLang)}</span>
                <span className="ml-2 font-bold text-slate-950 font-serif text-sm">
                  {general.month}
                </span>
              </div>
            </div>

            {/* Box 2: Name of Person */}
            <div className="border border-slate-900 p-3 mb-[-1px]">
              <p className="text-[11px] text-slate-700 font-sans font-medium">
                {t('withholding.personName', docLang)}
              </p>
              <h1 className="text-base font-bold text-slate-950 mt-1 uppercase font-serif tracking-wide">
                {general.companyName}
              </h1>
            </div>

            {/* Box 3: TIN & WIN */}
            <div className="grid grid-cols-2 border border-slate-900 mb-[-1px]">
              <div className="p-2.5 border-r border-slate-900">
                <p className="text-[11px] text-slate-700 font-sans font-medium">TIN</p>
                <p className="font-mono font-bold text-sm text-slate-950 mt-1">
                  {general.tin}
                </p>
              </div>
              <div className="p-2.5">
                <p className="text-[11px] text-slate-700 font-sans font-medium">
                  {t('withholding.win', docLang)}
                </p>
                <p className="font-mono font-bold text-sm text-slate-950 mt-1">
                  {general.win || '—'}
                </p>
              </div>
            </div>

            {/* Box 4: Circle & Zone */}
            <div className="grid grid-cols-2 border border-slate-900 mb-[-1px]">
              <div className="p-2.5 border-r border-slate-900">
                <p className="text-[11px] text-slate-700 font-sans font-medium">
                  {t('withholding.circle', docLang)}
                </p>
                <p className="font-bold text-xs text-slate-950 mt-0.5 font-sans">
                  {general.circle}
                </p>
              </div>
              <div className="p-2.5">
                <p className="text-[11px] text-slate-700 font-sans font-medium">
                  {t('withholding.zone', docLang)}
                </p>
                <p className="font-bold text-xs text-slate-950 mt-0.5 font-sans">
                  {general.zone}
                </p>
              </div>
            </div>

            {/* Box 5: Submission Date & Entry Number */}
            <div className="grid grid-cols-2 border border-slate-900 mb-[-1px]">
              <div className="p-2.5 border-r border-slate-900">
                <p className="text-[11px] text-slate-700 font-sans font-medium">
                  {t('withholding.submissionDate', docLang)}
                </p>
                <div className="mt-1 flex items-center gap-1 font-mono text-xs">
                  <span className="border border-slate-900 px-1.5 py-0.5">2</span>
                  <span className="border border-slate-900 px-1.5 py-0.5">5</span>
                  <span className="mx-0.5">-</span>
                  <span className="border border-slate-900 px-1.5 py-0.5">0</span>
                  <span className="border border-slate-900 px-1.5 py-0.5">1</span>
                  <span className="mx-0.5">-</span>
                  <span className="border border-slate-900 px-1.5 py-0.5">2</span>
                  <span className="border border-slate-900 px-1.5 py-0.5">0</span>
                  <span className="border border-slate-900 px-1.5 py-0.5">2</span>
                  <span className="border border-slate-900 px-1.5 py-0.5">6</span>
                </div>
              </div>
              <div className="p-2.5">
                <p className="text-[11px] text-slate-700 font-sans font-medium">
                  {t('withholding.entryNo', docLang)}
                </p>
                <div className="mt-1 flex items-center gap-1 font-mono text-xs">
                  <span className="border border-slate-900 px-2 py-0.5">&nbsp;</span>
                  <span className="border border-slate-900 px-2 py-0.5">&nbsp;</span>
                  <span className="border border-slate-900 px-2 py-0.5">&nbsp;</span>
                  <span className="border border-slate-900 px-2 py-0.5">&nbsp;</span>
                  <span className="border border-slate-900 px-2 py-0.5">&nbsp;</span>
                  <span className="border border-slate-900 px-2 py-0.5">&nbsp;</span>
                </div>
              </div>
            </div>

            {/* Box 6: Receiving Official Signature & Seal */}
            <div className="border border-slate-900 p-4 h-32 flex flex-col justify-between mb-[-1px]">
              <p className="text-[11px] text-slate-700 font-sans font-medium">
                {t('withholding.recSignature', docLang)}
              </p>
              <div className="border-b border-dashed border-slate-400 w-64 mx-auto"></div>
            </div>

            {/* Box 7: Date of Signature & Contact */}
            <div className="grid grid-cols-2 border border-slate-900">
              <div className="p-2.5 border-r border-slate-900">
                <p className="text-[11px] text-slate-700 font-sans font-medium">
                  Date of Signature:
                </p>
              </div>
              <div className="p-2.5">
                <p className="text-[11px] text-slate-700 font-sans font-medium">
                  Contact Number of Tax Office:
                </p>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-300 flex justify-between text-[10px] text-slate-500 font-sans">
            <span>{general.companyName} — Acknowledgement Receipt</span>
            <span>Page 1 of 13</span>
          </div>
        </section>
      )}

      {/* =========================================================================
          PAGE 2: GENERAL INFORMATION OF THE RETURN
      ========================================================================= */}
      {shouldShow('general') && (
        <section
          aria-label="General Information of Return"
          className="a4-page w-[210mm] min-h-[297mm] bg-white text-slate-950 p-[15mm] shadow-2xl relative font-serif text-[12.5px] leading-relaxed border border-slate-300 print:border-none print:shadow-none print:p-[15mm] print:m-0 print:page-break-after-always flex flex-col justify-between"
        >
          <div>
            <div className="border-b-2 border-slate-900 pb-3 mb-6 text-center">
              <h2 className="text-base font-bold uppercase tracking-wider">
                Monthly Tax Deduction at Source Return
              </h2>
              <p className="text-[11px] text-slate-600 font-sans mt-0.5">
                Under the Income Tax Act, Bangladesh (Sections 86 to 136)
              </p>
            </div>

            <div className="space-y-3.5 leading-normal">
              <p>
                <strong>01.</strong> Return for the Financial Year:{' '}
                <strong className="font-mono text-sm underline">{general.fy}</strong>
                &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                Applicable Month:{' '}
                <strong className="underline">{general.month}</strong>
              </p>

              <p>
                <strong>02.</strong> Name of the person filing the return:{' '}
                <strong className="uppercase font-sans text-sm underline">{general.companyName}</strong>
              </p>

              <div>
                <p><strong>03.</strong> Type of the person (Tick one):</p>
                <div className="grid grid-cols-2 gap-2 pl-4 pt-1 font-sans text-xs">
                  <p>
                    <span className="text-base mr-1">
                      {general.personType === 'company' ? '☑' : '☐'}
                    </span>
                    <strong>04A</strong> A company
                  </p>
                  <p>
                    <span className="text-base mr-1">
                      {general.personType === 'cooperative' ? '☑' : '☐'}
                    </span>
                    <strong>04B</strong> A Co-operative society
                  </p>
                  <p>
                    <span className="text-base mr-1">
                      {general.personType === 'ngo' ? '☑' : '☐'}
                    </span>
                    <strong>04C</strong> An NGO
                  </p>
                  <p>
                    <span className="text-base mr-1">
                      {general.personType === 'partnership' ? '☑' : '☐'}
                    </span>
                    <strong>04D</strong> Other Partnership Firm
                  </p>
                </div>
              </div>

              <p>
                <strong>05.</strong> TIN:{' '}
                <strong className="font-mono text-sm font-bold tracking-wider">{general.tin}</strong>
              </p>

              <p>
                <strong>06.</strong> Withholding Identification Number (WIN):{' '}
                <strong className="font-mono">{general.win || 'N/A'}</strong>
              </p>

              <p>
                <strong>07.</strong> Circle:{' '}
                <strong className="font-sans">{general.circle}</strong>
              </p>

              <p>
                <strong>08.</strong> Zone:{' '}
                <strong className="font-sans">{general.zone}</strong>
              </p>

              <p>
                <strong>09.</strong> Registered Address:{' '}
                <span className="font-sans text-slate-800">{general.address}</span>
              </p>

              <div className="grid grid-cols-3 gap-2">
                <p><strong>10.</strong> Phone: <span className="font-sans font-semibold">{general.phone}</span></p>
                <p><strong>11.</strong> Fax: <span className="font-sans">{general.fax || 'N/A'}</span></p>
                <p><strong>12.</strong> E-mail: <span className="font-sans">{general.email || 'N/A'}</span></p>
              </div>

              <p>
                <strong>13.</strong> Main Business (sector):{' '}
                <strong className="font-sans">{general.business}</strong>
              </p>

              <div className="border border-slate-300 p-3 bg-slate-50/50 rounded space-y-1 text-xs">
                <p className="font-bold text-slate-900">14. If you are a liaison or a branch office:</p>
                <p>14A. Name of the parent company: <span className="font-sans">{general.parentCompanyName}</span></p>
                <p>14B. Tax residence of the parent company: <span className="font-sans">{general.parentCompanyTaxResidence}</span></p>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-300 flex justify-between text-[10px] text-slate-500 font-sans">
            <span>{general.companyName} — General Information</span>
            <span>Page 2 of 13</span>
          </div>
        </section>
      )}

      {/* =========================================================================
          PAGE 3: SOURCES OF TAX DEDUCTED AT SOURCE (Part 1, Rows 1-12)
      ========================================================================= */}
      {shouldShow('sources') && (
        <section
          aria-label="Sources of Tax Deducted at Source (Part 1)"
          className="a4-page w-[210mm] min-h-[297mm] bg-white text-slate-950 p-[15mm] shadow-2xl relative font-serif text-[11px] leading-relaxed border border-slate-300 print:border-none print:shadow-none print:p-[15mm] print:m-0 print:page-break-after-always flex flex-col justify-between"
        >
          <div>
            <h3 className="font-bold text-sm text-slate-900 mb-2">
              15. Sources and amount of tax deducted at source
            </h3>

            <table className="w-full border-collapse border border-slate-900 text-[10.5px] font-sans">
              <thead>
                <tr className="bg-slate-200 font-bold text-slate-950 text-left">
                  <th colSpan={6} className="border border-slate-900 p-1.5">
                    Sources and amount of tax deducted at source
                  </th>
                </tr>
                <tr className="bg-slate-100 font-bold text-slate-900 text-center">
                  <th rowSpan={2} className="border border-slate-900 p-1 w-10">Sl. No.</th>
                  <th rowSpan={2} className="border border-slate-900 p-1 text-left">Sources</th>
                  <th rowSpan={2} className="border border-slate-900 p-1 w-12">Section</th>
                  <th rowSpan={2} className="border border-slate-900 p-1 w-20">
                    No. of persons from which tax deducted
                  </th>
                  <th colSpan={2} className="border border-slate-900 p-1">
                    Amount of tax deducted at source in {general.month}
                  </th>
                </tr>
                <tr className="bg-slate-50 font-semibold text-slate-800 text-center">
                  <th className="border border-slate-900 p-1 w-28">
                    Amount deducted in period
                  </th>
                  <th className="border border-slate-900 p-1 w-28">
                    Amount deducted till date
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-amber-50/40 font-medium">
                  <td className="border border-slate-900 p-1 text-center font-bold">(1)</td>
                  <td className="border border-slate-900 p-1 font-bold text-blue-950">
                    Salaries (See Schedule C in the attached table)
                  </td>
                  <td className="border border-slate-900 p-1 text-center font-mono font-bold">86</td>
                  <td className="border border-slate-900 p-1 text-center font-mono font-bold">
                    {salariesSummary.personsCount}
                  </td>
                  <td className="border border-slate-900 p-1 text-right font-mono font-bold text-emerald-900">
                    {salariesSummary.taxDeducted}
                  </td>
                  <td className="border border-slate-900 p-1 text-right font-mono font-bold">
                    {salariesSummary.taxTillDate}
                  </td>
                </tr>
                <tr><td className="border border-slate-900 p-1 text-center">(2)</td><td className="border border-slate-900 p-1">From the amount paid to Worker Participatory Fund</td><td className="border border-slate-900 p-1 text-center font-mono">88</td><td className="border border-slate-900 p-1"></td><td className="border border-slate-900 p-1"></td><td className="border border-slate-900 p-1"></td></tr>
                <tr><td className="border border-slate-900 p-1 text-center">(3)</td><td className="border border-slate-900 p-1">Payments made to contractors, suppliers etc.</td><td className="border border-slate-900 p-1 text-center font-mono">89</td><td className="border border-slate-900 p-1"></td><td className="border border-slate-900 p-1"></td><td className="border border-slate-900 p-1"></td></tr>
                <tr><td className="border border-slate-900 p-1 text-center">(4)</td><td className="border border-slate-900 p-1">Payment for services (See Schedule A in the attached table)</td><td className="border border-slate-900 p-1 text-center font-mono">90</td><td className="border border-slate-900 p-1"></td><td className="border border-slate-900 p-1"></td><td className="border border-slate-900 p-1"></td></tr>
                <tr><td className="border border-slate-900 p-1 text-center">(5)</td><td className="border border-slate-900 p-1">Payment for Tangible Assets</td><td className="border border-slate-900 p-1 text-center font-mono">91</td><td className="border border-slate-900 p-1"></td><td className="border border-slate-900 p-1"></td><td className="border border-slate-900 p-1"></td></tr>
                <tr><td className="border border-slate-900 p-1 text-center">(6)</td><td className="border border-slate-900 p-1">Payment for income of media advertisement</td><td className="border border-slate-900 p-1 text-center font-mono">92</td><td className="border border-slate-900 p-1"></td><td className="border border-slate-900 p-1"></td><td className="border border-slate-900 p-1"></td></tr>
                <tr><td className="border border-slate-900 p-1 text-center">(7)</td><td className="border border-slate-900 p-1">Payment to actor, actress, producer etc.</td><td className="border border-slate-900 p-1 text-center font-mono">93</td><td className="border border-slate-900 p-1"></td><td className="border border-slate-900 p-1"></td><td className="border border-slate-900 p-1"></td></tr>
                <tr><td className="border border-slate-900 p-1 text-center">(8)</td><td className="border border-slate-900 p-1">Payment for commission, discount, fee, etc.</td><td className="border border-slate-900 p-1 text-center font-mono">94</td><td className="border border-slate-900 p-1"></td><td className="border border-slate-900 p-1"></td><td className="border border-slate-900 p-1"></td></tr>
                <tr><td className="border border-slate-900 p-1 text-center">(9)</td><td className="border border-slate-900 p-1">Payment made to Travel Agent</td><td className="border border-slate-900 p-1 text-center font-mono">95</td><td className="border border-slate-900 p-1"></td><td className="border border-slate-900 p-1"></td><td className="border border-slate-900 p-1"></td></tr>
                <tr><td className="border border-slate-900 p-1 text-center">(10)</td><td className="border border-slate-900 p-1">Payment for L/C commission</td><td className="border border-slate-900 p-1 text-center font-mono">96</td><td className="border border-slate-900 p-1"></td><td className="border border-slate-900 p-1"></td><td className="border border-slate-900 p-1"></td></tr>
                <tr><td className="border border-slate-900 p-1 text-center">(11)</td><td className="border border-slate-900 p-1">Payment for local letter of credit commission</td><td className="border border-slate-900 p-1 text-center font-mono">97</td><td className="border border-slate-900 p-1"></td><td className="border border-slate-900 p-1"></td><td className="border border-slate-900 p-1"></td></tr>
                <tr><td className="border border-slate-900 p-1 text-center">(12)</td><td className="border border-slate-900 p-1">Payment made to cellular mobile phone operator</td><td className="border border-slate-900 p-1 text-center font-mono">98</td><td className="border border-slate-900 p-1"></td><td className="border border-slate-900 p-1"></td><td className="border border-slate-900 p-1"></td></tr>
              </tbody>
            </table>
          </div>

          <div className="pt-3 border-t border-slate-300 flex justify-between text-[10px] text-slate-500 font-sans">
            <span>{general.companyName} — Sources of Tax Deducted at Source (Part 1)</span>
            <span>Page 3 of 13</span>
          </div>
        </section>
      )}

      {/* =========================================================================
          PAGE 4: SOURCES CONTINUED (Rows 13-35)
      ========================================================================= */}
      {shouldShow('sources') && (
        <section
          aria-label="Sources of Tax Deducted at Source (Part 2)"
          className="a4-page w-[210mm] min-h-[297mm] bg-white text-slate-950 p-[15mm] shadow-2xl relative font-serif text-[11px] leading-relaxed border border-slate-300 print:border-none print:shadow-none print:p-[15mm] print:m-0 print:page-break-after-always flex flex-col justify-between"
        >
          <div>
            <table className="w-full border-collapse border border-slate-900 text-[10px] font-sans">
              <thead>
                <tr className="bg-slate-100 font-bold text-slate-900 text-center">
                  <th className="border border-slate-900 p-1 w-10">Serial No.</th>
                  <th className="border border-slate-900 p-1 text-left">Sources</th>
                  <th className="border border-slate-900 p-1 w-12">Section</th>
                  <th className="border border-slate-900 p-1 w-20">No. of persons</th>
                  <th className="border border-slate-900 p-1 w-28">Amount in {general.month}</th>
                  <th className="border border-slate-900 p-1 w-28">Amount till {general.month}</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="border border-slate-900 p-0.5 text-center">(13)</td><td className="border border-slate-900 p-0.5">From any payment in excess of life insurance premium</td><td className="border border-slate-900 p-0.5 text-center font-mono">99</td><td className="border border-slate-900 p-0.5"></td><td className="border border-slate-900 p-0.5"></td><td className="border border-slate-900 p-0.5"></td></tr>
                <tr><td className="border border-slate-900 p-0.5 text-center">(14)</td><td className="border border-slate-900 p-0.5">Payment for Insurance commission</td><td className="border border-slate-900 p-0.5 text-center font-mono">100</td><td className="border border-slate-900 p-0.5"></td><td className="border border-slate-900 p-0.5"></td><td className="border border-slate-900 p-0.5"></td></tr>
                <tr><td className="border border-slate-900 p-0.5 text-center">(15)</td><td className="border border-slate-900 p-0.5">General insurance company surveyors fees</td><td className="border border-slate-900 p-0.5 text-center font-mono">101</td><td className="border border-slate-900 p-0.5"></td><td className="border border-slate-900 p-0.5"></td><td className="border border-slate-900 p-0.5"></td></tr>
                <tr><td className="border border-slate-900 p-0.5 text-center">(16)</td><td className="border border-slate-900 p-0.5">Interest (See Schedule D in attached table)</td><td className="border border-slate-900 p-0.5 text-center font-mono">102</td><td className="border border-slate-900 p-0.5"></td><td className="border border-slate-900 p-0.5"></td><td className="border border-slate-900 p-0.5"></td></tr>
                <tr><td className="border border-slate-900 p-0.5 text-center">(17)</td><td className="border border-slate-900 p-0.5">Deduction of tax from payment of interest to resident</td><td className="border border-slate-900 p-0.5 text-center font-mono">104</td><td className="border border-slate-900 p-0.5"></td><td className="border border-slate-900 p-0.5"></td><td className="border border-slate-900 p-0.5"></td></tr>
                <tr><td className="border border-slate-900 p-0.5 text-center">(18)</td><td className="border border-slate-900 p-0.5">Deduction of tax from service of international phone call</td><td className="border border-slate-900 p-0.5 text-center font-mono">108</td><td className="border border-slate-900 p-0.5"></td><td className="border border-slate-900 p-0.5"></td><td className="border border-slate-900 p-0.5"></td></tr>
                <tr className="bg-slate-50">
                  <td className="border border-slate-900 p-0.5 text-center font-bold">(19)</td>
                  <td className="border border-slate-900 p-0.5 font-bold">House/office rent</td>
                  <td className="border border-slate-900 p-0.5 text-center font-mono font-bold">109</td>
                  <td colSpan={3} className="border border-slate-900 p-0.5 text-right font-medium italic text-slate-700">
                    Own office space
                  </td>
                </tr>
                <tr><td className="border border-slate-900 p-0.5 text-center">(20)</td><td className="border border-slate-900 p-0.5">Obtaining services from Convention Hall, Conference Hall etc.</td><td className="border border-slate-900 p-0.5 text-center font-mono">110</td><td className="border border-slate-900 p-0.5"></td><td className="border border-slate-900 p-0.5"></td><td className="border border-slate-900 p-0.5"></td></tr>
                <tr><td className="border border-slate-900 p-0.5 text-center">(21)</td><td className="border border-slate-900 p-0.5">Subsidy of export</td><td className="border border-slate-900 p-0.5 text-center font-mono">112</td><td className="border border-slate-900 p-0.5"></td><td className="border border-slate-900 p-0.5"></td><td className="border border-slate-900 p-0.5"></td></tr>
                <tr><td className="border border-slate-900 p-0.5 text-center">(22)</td><td className="border border-slate-900 p-0.5">Freight forward agency commission</td><td className="border border-slate-900 p-0.5 text-center font-mono">113</td><td className="border border-slate-900 p-0.5"></td><td className="border border-slate-900 p-0.5"></td><td className="border border-slate-900 p-0.5"></td></tr>
                <tr><td className="border border-slate-900 p-0.5 text-center">(23)</td><td className="border border-slate-900 p-0.5">Deduction of Tax from purchase of Electricity</td><td className="border border-slate-900 p-0.5 text-center font-mono">114</td><td className="border border-slate-900 p-0.5"></td><td className="border border-slate-900 p-0.5"></td><td className="border border-slate-900 p-0.5"></td></tr>
                <tr><td className="border border-slate-900 p-0.5 text-center">(24)</td><td className="border border-slate-900 p-0.5">Deduction of tax from sum paid by real estate developer to land owner</td><td className="border border-slate-900 p-0.5 text-center font-mono">115</td><td className="border border-slate-900 p-0.5"></td><td className="border border-slate-900 p-0.5"></td><td className="border border-slate-900 p-0.5"></td></tr>
                <tr><td className="border border-slate-900 p-0.5 text-center">(25)</td><td className="border border-slate-900 p-0.5">Commission/wages to agent of foreign buyers /resident person</td><td className="border border-slate-900 p-0.5 text-center font-mono">116</td><td className="border border-slate-900 p-0.5"></td><td className="border border-slate-900 p-0.5"></td><td className="border border-slate-900 p-0.5"></td></tr>
                <tr><td className="border border-slate-900 p-0.5 text-center">(26)</td><td className="border border-slate-900 p-0.5">Dividends (See Schedule E in attached table)</td><td className="border border-slate-900 p-0.5 text-center font-mono">117</td><td className="border border-slate-900 p-0.5"></td><td className="border border-slate-900 p-0.5"></td><td className="border border-slate-900 p-0.5"></td></tr>
                <tr><td className="border border-slate-900 p-0.5 text-center">(27)</td><td className="border border-slate-900 p-0.5">Received from lotteries etc.</td><td className="border border-slate-900 p-0.5 text-center font-mono">118</td><td className="border border-slate-900 p-0.5"></td><td className="border border-slate-900 p-0.5"></td><td className="border border-slate-900 p-0.5"></td></tr>
                <tr><td className="border border-slate-900 p-0.5 text-center">(28)</td><td className="border border-slate-900 p-0.5">Deduction/collection from non-residents (Schedule B)</td><td className="border border-slate-900 p-0.5 text-center font-mono">119</td><td className="border border-slate-900 p-0.5"></td><td className="border border-slate-900 p-0.5"></td><td className="border border-slate-900 p-0.5"></td></tr>
                <tr><td className="border border-slate-900 p-0.5 text-center">(29)</td><td className="border border-slate-900 p-0.5">Collection of tax from export</td><td className="border border-slate-900 p-0.5 text-center font-mono">123</td><td className="border border-slate-900 p-0.5"></td><td className="border border-slate-900 p-0.5"></td><td className="border border-slate-900 p-0.5"></td></tr>
                <tr><td className="border border-slate-900 p-0.5 text-center">(30)</td><td className="border border-slate-900 p-0.5">From income remitted from abroad for services/revenue sharing</td><td className="border border-slate-900 p-0.5 text-center font-mono">124</td><td className="border border-slate-900 p-0.5"></td><td className="border border-slate-900 p-0.5"></td><td className="border border-slate-900 p-0.5"></td></tr>
                <tr><td className="border border-slate-900 p-0.5 text-center">(31)</td><td className="border border-slate-900 p-0.5">From Cigarette Manufacturer</td><td className="border border-slate-900 p-0.5 text-center font-mono">129</td><td className="border border-slate-900 p-0.5"></td><td className="border border-slate-900 p-0.5"></td><td className="border border-slate-900 p-0.5"></td></tr>
                <tr><td className="border border-slate-900 p-0.5 text-center">(32)</td><td className="border border-slate-900 p-0.5">From any resident ship business</td><td className="border border-slate-900 p-0.5 text-center font-mono">132</td><td className="border border-slate-900 p-0.5"></td><td className="border border-slate-900 p-0.5"></td><td className="border border-slate-900 p-0.5"></td></tr>
                <tr><td className="border border-slate-900 p-0.5 text-center">(33)</td><td className="border border-slate-900 p-0.5">Collection of tax from public auction sales</td><td className="border border-slate-900 p-0.5 text-center font-mono">133</td><td className="border border-slate-900 p-0.5"></td><td className="border border-slate-900 p-0.5"></td><td className="border border-slate-900 p-0.5"></td></tr>
                <tr><td className="border border-slate-900 p-0.5 text-center">(34)</td><td className="border border-slate-900 p-0.5">Collection of tax from Share Transfer</td><td className="border border-slate-900 p-0.5 text-center font-mono">134</td><td className="border border-slate-900 p-0.5"></td><td className="border border-slate-900 p-0.5"></td><td className="border border-slate-900 p-0.5"></td></tr>
                <tr><td className="border border-slate-900 p-0.5 text-center">(35)</td><td className="border border-slate-900 p-0.5">Collection of tax from Share Transfer of Stock Exchange Member</td><td className="border border-slate-900 p-0.5 text-center font-mono">136</td><td className="border border-slate-900 p-0.5"></td><td className="border border-slate-900 p-0.5"></td><td className="border border-slate-900 p-0.5"></td></tr>
              </tbody>
            </table>
          </div>

          <div className="pt-3 border-t border-slate-300 flex justify-between text-[10px] text-slate-500 font-sans">
            <span>{general.companyName} — Sources of Tax Deducted at Source (Part 2)</span>
            <span>Page 4 of 13</span>
          </div>
        </section>
      )}

      {/* =========================================================================
          PAGE 5: TREASURY PAYMENT PARTICULARS & CHALLANS
      ========================================================================= */}
      {shouldShow('treasury') && (
        <section
          aria-label="Treasury Payment Particulars"
          className="a4-page w-[210mm] min-h-[297mm] bg-white text-slate-950 p-[15mm] shadow-2xl relative font-serif text-[12px] leading-relaxed border border-slate-300 print:border-none print:shadow-none print:p-[15mm] print:m-0 print:page-break-after-always flex flex-col justify-between"
        >
          <div>
            <h3 className="font-bold text-sm text-slate-900 mb-2">
              16. Particulars of the tax deducted at source credited to the government treasury
            </h3>

            <table className="w-full border-collapse border border-slate-900 mb-6 text-xs font-sans">
              <thead>
                <tr className="bg-slate-200 font-bold text-left">
                  <th colSpan={2} className="border border-slate-900 p-2">
                    Particulars of tax credited to Government Treasury
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-slate-900 p-2 w-[60%]">
                    16A. Total amount of tax deducted at source
                  </td>
                  <td className="border border-slate-900 p-2 font-mono font-bold text-right text-sm">
                    {treasury.totalDeducted}
                  </td>
                </tr>
                <tr>
                  <td className="border border-slate-900 p-2">
                    16B. Total amount credited to the Government treasury
                  </td>
                  <td className="border border-slate-900 p-2 font-mono font-bold text-right text-sm text-emerald-900">
                    {treasury.totalCredited}
                  </td>
                </tr>
                <tr>
                  <td className="border border-slate-900 p-2">
                    16C. Excess or deficit of payment (if any) [16A - 16B]
                  </td>
                  <td className="border border-slate-900 p-2 font-mono text-center font-bold">
                    {treasury.excessDeficit}
                  </td>
                </tr>
              </tbody>
            </table>

            <h3 className="font-bold text-sm text-slate-900 mb-2">
              17. Details of payment of the tax deducted at source to the government treasury
            </h3>

            <table className="w-full border-collapse border border-slate-900 mb-3 text-xs font-sans">
              <thead>
                <tr className="bg-slate-100 font-bold text-slate-900 text-center">
                  <th className="border border-slate-900 p-1.5 w-12">SL</th>
                  <th className="border border-slate-900 p-1.5 text-left">Challan* No.</th>
                  <th className="border border-slate-900 p-1.5 w-28">Date</th>
                  <th className="border border-slate-900 p-1.5 w-24">Bank</th>
                  <th className="border border-slate-900 p-1.5 w-32 text-right">Amount (BDT)</th>
                </tr>
              </thead>
              <tbody>
                {treasury.challans.map((challan, idx) => (
                  <tr key={challan.id || idx}>
                    <td className="border border-slate-900 p-1.5 text-center font-mono">
                      {idx + 1}
                    </td>
                    <td className="border border-slate-900 p-1.5 font-mono text-[11px] leading-tight">
                      {challan.no.split('\n').map((line, lIdx) => (
                        <div key={lIdx}>{line}</div>
                      ))}
                    </td>
                    <td className="border border-slate-900 p-1.5 text-center font-mono">
                      {challan.date}
                    </td>
                    <td className="border border-slate-900 p-1.5 text-center font-semibold">
                      {challan.bank}
                    </td>
                    <td className="border border-slate-900 p-1.5 text-right font-mono font-bold">
                      {challan.amt}
                    </td>
                  </tr>
                ))}
                <tr className="bg-slate-100 font-bold">
                  <td colSpan={4} className="border border-slate-900 p-2 text-right">
                    Total payment to the credit of the government
                  </td>
                  <td className="border border-slate-900 p-2 text-right font-mono text-sm text-emerald-950 font-black">
                    {treasury.totalCredited}
                  </td>
                </tr>
              </tbody>
            </table>

            <p className="text-[10px] italic text-slate-600 font-sans">
              * If payment is made in any other mode specified by the Board (e.g. A-Challan / e-Payment), provide information relevant to that mode.
            </p>
          </div>

          <div className="pt-3 border-t border-slate-300 flex justify-between text-[10px] text-slate-500 font-sans">
            <span>{general.companyName} — Treasury Payments</span>
            <span>Page 5 of 13</span>
          </div>
        </section>
      )}

      {/* =========================================================================
          PAGE 6: VERIFICATION & DECLARATION
      ========================================================================= */}
      {shouldShow('verification') && (
        <section
          aria-label="Verification and Declaration"
          className="a4-page w-[210mm] min-h-[297mm] bg-white text-slate-950 p-[15mm] shadow-2xl relative font-serif text-[13px] leading-relaxed border border-slate-300 print:border-none print:shadow-none print:p-[15mm] print:m-0 print:page-break-after-always flex flex-col justify-between"
        >
          <div>
            <div className="mb-4">
              <p className="font-bold text-sm">
                18. Other statements, documents, etc. attached (list all):
              </p>
              <p className="font-sans text-xs bg-slate-50 p-2 border border-slate-300 rounded mt-1 font-semibold">
                {verification.attachedDocs || '01. Treasury Challan(s)'}
              </p>
            </div>

            <div className="border border-slate-900 p-6 mt-6 bg-slate-50/20">
              <h3 className="font-bold text-base uppercase text-center underline tracking-wider mb-4">
                19. Verification &amp; Declaration
              </h3>

              <div className="space-y-4 text-justify leading-relaxed">
                <p>
                  I, <strong className="underline uppercase">{verification.declarantName}</strong>,{' '}
                  Father/Husband: <strong className="underline">{verification.fatherOrHusband}</strong>,{' '}
                  UTIN/TIN: <strong className="font-mono underline">{verification.tin}</strong>,{' '}
                  solemnly declare that:
                </p>

                <p className="pl-4">
                  <strong>(a)</strong> To the best of my knowledge and belief the information given in this return and statements and documents annexed or attached herewith are correct and complete;
                </p>

                <p className="pl-4">
                  <strong>(b)</strong> I, <strong className="uppercase">{verification.declarantName}</strong>, am signing this return in my capacity as <strong>{verification.designation}</strong> and I am competent to sign this return and verify it.
                </p>

                <div className="mt-14 pt-8 flex justify-between items-end border-t border-slate-300">
                  <div className="space-y-1 font-sans text-xs">
                    <p>Name: <strong className="font-serif text-sm">{verification.declarantName}</strong></p>
                    <p>Designation: <strong>{verification.designation}</strong></p>
                    <p>Company: <strong>{general.companyName}</strong></p>
                  </div>

                  <div className="text-right space-y-1 font-sans text-xs">
                    <div className="w-56 border-b-2 border-slate-900 pb-1 mb-1 mx-auto text-center">
                      <span className="font-serif italic font-bold text-blue-900 text-sm">
                        {verification.declarantName}
                      </span>
                    </div>
                    <p className="font-bold">Signature</p>
                    <p>Date of Signature: <strong className="font-mono">{verification.submissionDate}</strong></p>
                    <p>Place of Signature: <strong>{verification.place}</strong></p>
                  </div>
                </div>
              </div>
            </div>

            {/* Official Tax Office Receipt stamp section */}
            <div className="mt-12 border border-slate-900 w-72 text-xs font-sans">
              <div className="grid grid-cols-2 border-b border-slate-900 text-center font-semibold bg-slate-100 p-1.5">
                <span>Date of Submission</span>
                <span className="border-l border-slate-900">Tax Office Entry No.</span>
              </div>
              <div className="h-12 flex items-center justify-around font-mono text-xs">
                <span>{verification.submissionDate}</span>
                <span className="border-l border-slate-900 h-full flex items-center px-4 text-slate-400">
                  [ Entry Seal ]
                </span>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-300 flex justify-between text-[10px] text-slate-500 font-sans">
            <span>{general.companyName} — Verification</span>
            <span>Page 6 of 13</span>
          </div>
        </section>
      )}

      {/* =========================================================================
          PAGE 7: SCHEDULE A - PARTICULARS OF TDS ON SERVICES (Section 90)
      ========================================================================= */}
      {shouldShow('scheduleA') && (
        <section
          aria-label="Schedule A - Particulars of TDS on Services"
          className="a4-page w-[210mm] min-h-[297mm] bg-white text-slate-950 p-[15mm] shadow-2xl relative font-serif text-[11px] leading-relaxed border border-slate-300 print:border-none print:shadow-none print:p-[15mm] print:m-0 print:page-break-after-always flex flex-col justify-between"
        >
          <div>
            <div className="text-center mb-4">
              <h3 className="font-bold text-base uppercase tracking-wider">
                Schedule A: Particulars of tax deducted at source from services
              </h3>
              <p className="text-xs text-slate-600 font-sans mt-0.5">
                Under Section 90 of the Income Tax Act
              </p>
            </div>

            <table className="w-full border-collapse border border-slate-900 mb-3 text-xs font-sans">
              <tbody>
                <tr>
                  <td className="border border-slate-900 p-1.5 font-bold w-[50%]">
                    TIN: <span className="font-mono">{general.tin}</span>
                  </td>
                  <td className="border border-slate-900 p-1.5 font-bold w-[50%]">
                    Withholding Identification Number: <span className="font-mono">{general.win || 'N/A'}</span>
                  </td>
                </tr>
                <tr>
                  <td className="border border-slate-900 p-1.5 font-bold">
                    Return for the Financial Year: <span className="font-mono">{general.fy}</span>
                  </td>
                  <td className="border border-slate-900 p-1.5 font-bold">
                    Month: <span className="font-serif">{general.month}</span>
                  </td>
                </tr>
              </tbody>
            </table>

            <table className="w-full border-collapse border border-slate-900 text-[10px] font-sans">
              <thead>
                <tr className="bg-slate-100 font-bold text-slate-900 text-center">
                  <th className="border border-slate-900 p-1 w-12">Serial No.</th>
                  <th className="border border-slate-900 p-1 text-left">Sources (Service)</th>
                  <th className="border border-slate-900 p-1 w-28">No. of persons</th>
                  <th className="border border-slate-900 p-1 w-36">Amount of tax deducted in {general.month}</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="border border-slate-900 p-1 text-center font-mono">1</td><td className="border border-slate-900 p-1">Advisory or consultancy service</td><td className="border border-slate-900 p-1"></td><td className="border border-slate-900 p-1"></td></tr>
                <tr><td className="border border-slate-900 p-1 text-center font-mono">2</td><td className="border border-slate-900 p-1">Professional service, technical services fee, technical know-how or assistance</td><td className="border border-slate-900 p-1"></td><td className="border border-slate-900 p-1"></td></tr>
                <tr><td className="border border-slate-900 p-1 text-center font-mono">3</td><td className="border border-slate-900 p-1">Catering service</td><td className="border border-slate-900 p-1"></td><td className="border border-slate-900 p-1"></td></tr>
                <tr><td className="border border-slate-900 p-1 text-center font-mono">4</td><td className="border border-slate-900 p-1">Cleaning service</td><td className="border border-slate-900 p-1"></td><td className="border border-slate-900 p-1"></td></tr>
                <tr><td className="border border-slate-900 p-1 text-center font-mono">5</td><td className="border border-slate-900 p-1">Collection and recovery agency</td><td className="border border-slate-900 p-1"></td><td className="border border-slate-900 p-1"></td></tr>
                <tr><td className="border border-slate-900 p-1 text-center font-mono">6</td><td className="border border-slate-900 p-1">Management of events, training, workshops etc.</td><td className="border border-slate-900 p-1"></td><td className="border border-slate-900 p-1"></td></tr>
                <tr><td className="border border-slate-900 p-1 text-center font-mono">7</td><td className="border border-slate-900 p-1">Private security service</td><td className="border border-slate-900 p-1"></td><td className="border border-slate-900 p-1"></td></tr>
                <tr><td className="border border-slate-900 p-1 text-center font-mono">8</td><td className="border border-slate-900 p-1">Supply of manpower</td><td className="border border-slate-900 p-1"></td><td className="border border-slate-900 p-1"></td></tr>
                <tr><td className="border border-slate-900 p-1 text-center font-mono">9</td><td className="border border-slate-900 p-1">Indenting commission</td><td className="border border-slate-900 p-1"></td><td className="border border-slate-900 p-1"></td></tr>
                <tr><td className="border border-slate-900 p-1 text-center font-mono">10</td><td className="border border-slate-900 p-1">Meeting fees, training fees or honorarium</td><td className="border border-slate-900 p-1"></td><td className="border border-slate-900 p-1"></td></tr>
                <tr><td className="border border-slate-900 p-1 text-center font-mono">11</td><td className="border border-slate-900 p-1">Mobile network operator, technical support or mobile banking service agent</td><td className="border border-slate-900 p-1"></td><td className="border border-slate-900 p-1"></td></tr>
                <tr><td className="border border-slate-900 p-1 text-center font-mono">12</td><td className="border border-slate-900 p-1">Credit rating agency</td><td className="border border-slate-900 p-1"></td><td className="border border-slate-900 p-1"></td></tr>
                <tr><td className="border border-slate-900 p-1 text-center font-mono">13</td><td className="border border-slate-900 p-1">Motor garage or workshop</td><td className="border border-slate-900 p-1"></td><td className="border border-slate-900 p-1"></td></tr>
                <tr><td className="border border-slate-900 p-1 text-center font-mono">14</td><td className="border border-slate-900 p-1">Private container port or dockyard service</td><td className="border border-slate-900 p-1"></td><td className="border border-slate-900 p-1"></td></tr>
                <tr><td className="border border-slate-900 p-1 text-center font-mono">15</td><td className="border border-slate-900 p-1">Shipping agency commission</td><td className="border border-slate-900 p-1"></td><td className="border border-slate-900 p-1"></td></tr>
                <tr><td className="border border-slate-900 p-1 text-center font-mono">16</td><td className="border border-slate-900 p-1">Stevedoring/berth operations commission</td><td className="border border-slate-900 p-1"></td><td className="border border-slate-900 p-1"></td></tr>
                <tr><td className="border border-slate-900 p-1 text-center font-mono">17</td><td className="border border-slate-900 p-1">Transport service, car rental</td><td className="border border-slate-900 p-1"></td><td className="border border-slate-900 p-1"></td></tr>
                <tr><td className="border border-slate-900 p-1 text-center font-mono">18</td><td className="border border-slate-900 p-1">Any other services not mentioned above</td><td className="border border-slate-900 p-1"></td><td className="border border-slate-900 p-1"></td></tr>
                <tr className="bg-slate-100 font-bold">
                  <td colSpan={2} className="border border-slate-900 p-1 text-right">Total:</td>
                  <td className="border border-slate-900 p-1 text-center">—</td>
                  <td className="border border-slate-900 p-1 text-right">—</td>
                </tr>
              </tbody>
            </table>

            <div className="mt-8 pt-4 border-t border-slate-300 flex justify-between items-end font-sans text-xs">
              <div>
                <p>Name: <strong className="font-serif">{verification.declarantName}</strong></p>
                <p>Designation: <strong>{verification.designation}</strong></p>
              </div>
              <div className="text-right">
                <p className="font-bold">Signature &amp; Date</p>
                <div className="w-48 border-b border-slate-900 mt-6"></div>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-300 flex justify-between text-[10px] text-slate-500 font-sans">
            <span>{general.companyName} — Schedule A (Services)</span>
            <span>Page 7 of 13</span>
          </div>
        </section>
      )}

      {/* =========================================================================
          PAGE 9: SCHEDULE C - SALARIES (DETAILED 17-COLUMN BREAKDOWN TABLE)
      ========================================================================= */}
      {shouldShow('scheduleC') && (
        <section
          aria-label="Schedule C - Particulars of TDS from Salaries"
          className="a4-page w-[210mm] min-h-[297mm] bg-white text-slate-950 p-[12mm] shadow-2xl relative font-serif text-[10px] leading-relaxed border border-slate-300 print:border-none print:shadow-none print:p-[12mm] print:m-0 print:page-break-after-always flex flex-col justify-between"
        >
          <div>
            <div className="text-center mb-3">
              <h3 className="font-bold text-sm uppercase tracking-wide">
                Schedule-C: Particulars of tax deducted at source from salaries
              </h3>
              <p className="text-[10px] text-slate-600 font-sans">
                {general.companyName} • TIN: {general.tin} • Period: {general.month}
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-slate-900 text-[8px] font-sans">
                <thead>
                  <tr className="bg-slate-100 font-bold text-slate-900 text-center">
                    <th rowSpan={2} className="border border-slate-900 p-0.5 w-6">Sl</th>
                    <th rowSpan={2} className="border border-slate-900 p-0.5 text-left w-24">Name</th>
                    <th rowSpan={2} className="border border-slate-900 p-0.5 text-left w-20">Designation</th>
                    <th rowSpan={2} className="border border-slate-900 p-0.5 w-18">TIN</th>
                    <th colSpan={6} className="border border-slate-900 p-0.5 bg-slate-200">
                      Particulars of Salary
                    </th>
                    <th rowSpan={2} className="border border-slate-900 p-0.5 w-14">Total Gross</th>
                    <th rowSpan={2} className="border border-slate-900 p-0.5 w-12">Tax Deducted</th>
                    <th colSpan={4} className="border border-slate-900 p-0.5 bg-slate-200">
                      Payment of deducted tax to Government
                    </th>
                    <th rowSpan={2} className="border border-slate-900 p-0.5 w-10">Remarks</th>
                  </tr>
                  <tr className="bg-slate-50 font-semibold text-slate-800 text-center">
                    <th className="border border-slate-900 p-0.5 w-12">Basic</th>
                    <th className="border border-slate-900 p-0.5 w-10">Bonus</th>
                    <th className="border border-slate-900 p-0.5 w-11">House</th>
                    <th className="border border-slate-900 p-0.5 w-10">Conv</th>
                    <th className="border border-slate-900 p-0.5 w-10">Med</th>
                    <th className="border border-slate-900 p-0.5 w-10">Other</th>
                    <th className="border border-slate-900 p-0.5 w-18">Challan No.</th>
                    <th className="border border-slate-900 p-0.5 w-12">Date</th>
                    <th className="border border-slate-900 p-0.5 w-10">Bank</th>
                    <th className="border border-slate-900 p-0.5 w-12">Amount</th>
                  </tr>
                  <tr className="bg-slate-200 text-slate-600 text-center text-[7.5px]">
                    <th className="border border-slate-900 py-0.5">1</th>
                    <th className="border border-slate-900 py-0.5">2</th>
                    <th className="border border-slate-900 py-0.5">3</th>
                    <th className="border border-slate-900 py-0.5">4</th>
                    <th className="border border-slate-900 py-0.5">5</th>
                    <th className="border border-slate-900 py-0.5">6</th>
                    <th className="border border-slate-900 py-0.5">7</th>
                    <th className="border border-slate-900 py-0.5">8</th>
                    <th className="border border-slate-900 py-0.5">9</th>
                    <th className="border border-slate-900 py-0.5">10</th>
                    <th className="border border-slate-900 py-0.5">11</th>
                    <th className="border border-slate-900 py-0.5">12</th>
                    <th className="border border-slate-900 py-0.5">13</th>
                    <th className="border border-slate-900 py-0.5">14</th>
                    <th className="border border-slate-900 py-0.5">15</th>
                    <th className="border border-slate-900 py-0.5">16</th>
                    <th className="border border-slate-900 py-0.5">17</th>
                  </tr>
                </thead>
                <tbody>
                  {salaries.map((emp, idx) => (
                    <tr key={emp.id || idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                      <td className="border border-slate-900 p-0.5 text-center font-mono font-bold">
                        {emp.sl || idx + 1}
                      </td>
                      <td className="border border-slate-900 p-0.5 font-semibold text-slate-950">
                        {emp.name}
                      </td>
                      <td className="border border-slate-900 p-0.5 text-slate-700">
                        {emp.desig}
                      </td>
                      <td className="border border-slate-900 p-0.5 text-center font-mono text-[7.5px]">
                        {emp.tin}
                      </td>
                      <td className="border border-slate-900 p-0.5 text-right font-mono">
                        {emp.basic}
                      </td>
                      <td className="border border-slate-900 p-0.5 text-right font-mono">
                        {emp.bonus || '—'}
                      </td>
                      <td className="border border-slate-900 p-0.5 text-right font-mono">
                        {emp.house}
                      </td>
                      <td className="border border-slate-900 p-0.5 text-right font-mono">
                        {emp.conv}
                      </td>
                      <td className="border border-slate-900 p-0.5 text-right font-mono">
                        {emp.med}
                      </td>
                      <td className="border border-slate-900 p-0.5 text-right font-mono">
                        {emp.other}
                      </td>
                      <td className="border border-slate-900 p-0.5 text-right font-mono font-bold text-amber-950">
                        {emp.total}
                      </td>
                      <td className="border border-slate-900 p-0.5 text-right font-mono font-bold text-emerald-950">
                        {emp.tax}
                      </td>
                      <td className="border border-slate-900 p-0.5 text-[7px] font-mono leading-none">
                        {emp.challan.split('\n')[0]}
                      </td>
                      <td className="border border-slate-900 p-0.5 text-center font-mono text-[7.5px]">
                        {emp.cDate}
                      </td>
                      <td className="border border-slate-900 p-0.5 text-center font-semibold text-[7.5px]">
                        {emp.bank}
                      </td>
                      <td className="border border-slate-900 p-0.5 text-right font-mono font-bold text-[7.5px]">
                        {emp.amt}
                      </td>
                      <td className="border border-slate-900 p-0.5 text-center text-slate-500">
                        {emp.rem || '—'}
                      </td>
                    </tr>
                  ))}
                  {/* Totals Row */}
                  <tr className="bg-slate-200 font-bold text-slate-950 border-t-2 border-slate-900">
                    <td colSpan={4} className="border border-slate-900 p-1 text-right">
                      Total ({salaryTotals.employeeCount} Employees):
                    </td>
                    <td className="border border-slate-900 p-1 text-right font-mono">
                      {formatCurrencyCommas(salaryTotals.totalBasic)}
                    </td>
                    <td className="border border-slate-900 p-1 text-right font-mono">
                      {formatCurrencyCommas(salaryTotals.totalBonus)}
                    </td>
                    <td className="border border-slate-900 p-1 text-right font-mono">
                      {formatCurrencyCommas(salaryTotals.totalHouse)}
                    </td>
                    <td className="border border-slate-900 p-1 text-right font-mono">
                      {formatCurrencyCommas(salaryTotals.totalConv)}
                    </td>
                    <td className="border border-slate-900 p-1 text-right font-mono">
                      {formatCurrencyCommas(salaryTotals.totalMed)}
                    </td>
                    <td className="border border-slate-900 p-1 text-right font-mono">
                      {formatCurrencyCommas(salaryTotals.totalOther)}
                    </td>
                    <td className="border border-slate-900 p-1 text-right font-mono font-black text-amber-950">
                      {formatCurrencyCommas(salaryTotals.totalGross)}
                    </td>
                    <td className="border border-slate-900 p-1 text-right font-mono font-black text-emerald-950">
                      {formatCurrencyCommas(salaryTotals.totalTax)}
                    </td>
                    <td colSpan={3} className="border border-slate-900 p-1 text-center">
                      Treasury Credited
                    </td>
                    <td className="border border-slate-900 p-1 text-right font-mono font-black text-emerald-950">
                      {formatCurrencyCommas(salaryTotals.totalTax)}
                    </td>
                    <td className="border border-slate-900 p-1"></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-4 pt-2 border-t border-slate-300 flex justify-between items-center text-[9px] font-sans text-slate-600">
              <p>Certified that the tax deducted at source from salaries has been deposited into the Government Treasury.</p>
              <p className="font-bold text-slate-900">Signature: __________________________</p>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-300 flex justify-between text-[9px] text-slate-500 font-sans">
            <span>{general.companyName} — Schedule C (Salaries Breakdown)</span>
            <span>Page 9 of 13</span>
          </div>
        </section>
      )}

      {/* =========================================================================
          PAGE 11: SCHEDULE D - PARTICULARS OF TDS FROM INTEREST
      ========================================================================= */}
      {shouldShow('scheduleD') && (
        <section
          aria-label="Schedule D - TDS on Interest"
          className="a4-page w-[210mm] min-h-[297mm] bg-white text-slate-950 p-[15mm] shadow-2xl relative font-serif text-[12px] leading-relaxed border border-slate-300 print:border-none print:shadow-none print:p-[15mm] print:m-0 print:page-break-after-always flex flex-col justify-between"
        >
          <div>
            <div className="text-center mb-6">
              <h3 className="font-bold text-base uppercase tracking-wider">
                Schedule-D: Particulars of tax deducted at source from interest
              </h3>
              <p className="text-xs text-slate-600 font-sans mt-0.5">
                Under Section 102 &amp; 104 of the Income Tax Act
              </p>
            </div>

            <p className="mb-3 font-sans text-xs">
              <strong>Payer Name:</strong> {general.companyName} &bull; <strong>TIN:</strong> {general.tin}
            </p>

            <table className="w-full border-collapse border border-slate-900 text-xs font-sans mb-6">
              <thead>
                <tr className="bg-slate-100 font-bold text-slate-900 text-center">
                  <th className="border border-slate-900 p-1.5 w-10">SL No</th>
                  <th className="border border-slate-900 p-1.5 text-left">Payee Name</th>
                  <th className="border border-slate-900 p-1.5 text-left">Payee Address</th>
                  <th className="border border-slate-900 p-1.5 w-24">Resident / Non-Resident</th>
                  <th className="border border-slate-900 p-1.5 w-24">Date of payment</th>
                  <th className="border border-slate-900 p-1.5 w-28 text-right">Amount of interest</th>
                  <th className="border border-slate-900 p-1.5 w-28 text-right">Tax deducted</th>
                  <th className="border border-slate-900 p-1.5 w-20">Remarks</th>
                </tr>
                <tr className="bg-slate-200 text-slate-600 text-center text-[10px]">
                  <th className="border border-slate-900 py-0.5">1</th>
                  <th className="border border-slate-900 py-0.5">2</th>
                  <th className="border border-slate-900 py-0.5">3</th>
                  <th className="border border-slate-900 py-0.5">4</th>
                  <th className="border border-slate-900 py-0.5">5</th>
                  <th className="border border-slate-900 py-0.5">6</th>
                  <th className="border border-slate-900 py-0.5">7</th>
                  <th className="border border-slate-900 py-0.5">8</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-slate-900 p-2 text-center font-mono">1</td>
                  <td className="border border-slate-900 p-2 text-slate-400 italic">Nil / No interest payment in period</td>
                  <td className="border border-slate-900 p-2">—</td>
                  <td className="border border-slate-900 p-2 text-center">Resident</td>
                  <td className="border border-slate-900 p-2 text-center">—</td>
                  <td className="border border-slate-900 p-2 text-right font-mono">0.00</td>
                  <td className="border border-slate-900 p-2 text-right font-mono">0.00</td>
                  <td className="border border-slate-900 p-2 text-center">—</td>
                </tr>
                <tr className="bg-slate-100 font-bold">
                  <td colSpan={5} className="border border-slate-900 p-2 text-right">Total:</td>
                  <td className="border border-slate-900 p-2 text-right font-mono">0.00</td>
                  <td className="border border-slate-900 p-2 text-right font-mono">0.00</td>
                  <td className="border border-slate-900 p-2"></td>
                </tr>
              </tbody>
            </table>

            <div className="mt-12 flex justify-between items-end font-sans text-xs">
              <p>Date: <strong className="font-mono">{verification.submissionDate}</strong></p>
              <div className="text-right">
                <div className="w-56 border-b border-slate-900 pb-1 mb-1">
                  <span className="font-serif italic font-bold text-blue-900">{verification.declarantName}</span>
                </div>
                <p>Signature &amp; Designation: <strong>{verification.designation}</strong></p>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-300 flex justify-between text-[10px] text-slate-500 font-sans">
            <span>{general.companyName} — Schedule D (Interest)</span>
            <span>Page 11 of 13</span>
          </div>
        </section>
      )}

      {/* =========================================================================
          PAGE 12: DIVIDENDS SCHEDULE (Section 117)
      ========================================================================= */}
      {shouldShow('dividend') && (
        <section
          aria-label="Dividends Schedule"
          className="a4-page w-[210mm] min-h-[297mm] bg-white text-slate-950 p-[15mm] shadow-2xl relative font-serif text-[12px] leading-relaxed border border-slate-300 print:border-none print:shadow-none print:p-[15mm] print:m-0 print:page-break-after-always flex flex-col justify-between"
        >
          <div>
            <div className="text-center mb-6">
              <h3 className="font-bold text-base uppercase tracking-wider">
                Particulars of Tax Deducted at Source from Dividends
              </h3>
              <p className="text-xs text-slate-600 font-sans mt-0.5">
                Under Section 117 of the Income Tax Act
              </p>
            </div>

            <table className="w-full border-collapse border border-slate-900 text-xs font-sans mb-6">
              <thead>
                <tr className="bg-slate-100 font-bold text-slate-900 text-center">
                  <th className="border border-slate-900 p-1 w-10">SL No</th>
                  <th className="border border-slate-900 p-1 text-left">Name of the shareholder</th>
                  <th className="border border-slate-900 p-1 text-left">Address</th>
                  <th className="border border-slate-900 p-1 w-20">Payment Date</th>
                  <th className="border border-slate-900 p-1 w-20">Nature (Interim/Final)</th>
                  <th className="border border-slate-900 p-1 w-24">No. of Shares</th>
                  <th className="border border-slate-900 p-1 w-24 text-right">Dividend Paid</th>
                  <th className="border border-slate-900 p-1 w-24 text-right">Tax Deducted</th>
                  <th className="border border-slate-900 p-1 w-16">Remarks</th>
                </tr>
                <tr className="bg-slate-200 text-slate-600 text-center text-[10px]">
                  <th className="border border-slate-900 py-0.5">1</th>
                  <th className="border border-slate-900 py-0.5">2</th>
                  <th className="border border-slate-900 py-0.5">3</th>
                  <th className="border border-slate-900 py-0.5">4</th>
                  <th className="border border-slate-900 py-0.5">5</th>
                  <th className="border border-slate-900 py-0.5">6</th>
                  <th className="border border-slate-900 py-0.5">7</th>
                  <th className="border border-slate-900 py-0.5">8</th>
                  <th className="border border-slate-900 py-0.5">9</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-slate-900 p-2 text-center font-mono">1</td>
                  <td className="border border-slate-900 p-2 text-slate-400 italic">Nil / No dividend declared in period</td>
                  <td className="border border-slate-900 p-2">—</td>
                  <td className="border border-slate-900 p-2 text-center">—</td>
                  <td className="border border-slate-900 p-2 text-center">Final</td>
                  <td className="border border-slate-900 p-2 text-center">—</td>
                  <td className="border border-slate-900 p-2 text-right font-mono">0.00</td>
                  <td className="border border-slate-900 p-2 text-right font-mono">0.00</td>
                  <td className="border border-slate-900 p-2 text-center">—</td>
                </tr>
                <tr className="bg-slate-100 font-bold">
                  <td colSpan={6} className="border border-slate-900 p-2 text-right">Total:</td>
                  <td className="border border-slate-900 p-2 text-right font-mono">0.00</td>
                  <td className="border border-slate-900 p-2 text-right font-mono">0.00</td>
                  <td className="border border-slate-900 p-2"></td>
                </tr>
              </tbody>
            </table>

            <div className="mt-12 flex justify-between items-end font-sans text-xs">
              <p>Date: <strong className="font-mono">{verification.submissionDate}</strong></p>
              <div className="text-right">
                <div className="w-56 border-b border-slate-900 pb-1 mb-1">
                  <span className="font-serif italic font-bold text-blue-900">{verification.declarantName}</span>
                </div>
                <p>Signature &amp; Designation: <strong>{verification.designation}</strong></p>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-300 flex justify-between text-[10px] text-slate-500 font-sans">
            <span>{general.companyName} — Dividends Schedule</span>
            <span>Page 12 of 13</span>
          </div>
        </section>
      )}

      {/* =========================================================================
          PAGE 13: STATEMENT OF FILING OF INCOME TAX RETURNS BY EMPLOYEES
      ========================================================================= */}
      {shouldShow('employeeFiling') && (
        <section
          aria-label="Statement of Filing of Returns by Employees"
          className="a4-page w-[210mm] min-h-[297mm] bg-white text-slate-950 p-[15mm] shadow-2xl relative font-serif text-[12px] leading-relaxed border border-slate-300 print:border-none print:shadow-none print:p-[15mm] print:m-0 print:page-break-after-always flex flex-col justify-between"
        >
          <div>
            <div className="text-center mb-4">
              <p className="text-sm font-mono font-bold">{general.fy}</p>
              <h2 className="text-base font-bold uppercase tracking-wider mt-0.5">
                {general.companyName}
              </h2>
              <p className="text-xs text-slate-700 font-sans mt-0.5">
                TIN: <strong className="font-mono">{general.tin}</strong>
              </p>
              <p className="text-[11px] text-slate-600 font-sans mt-0.5">
                Address: {general.address}
              </p>
              <h3 className="text-xs font-bold uppercase underline tracking-wider mt-3">
                Statement of Filing of Income Tax Return of the Employees
              </h3>
              <p className="text-[10.5px] text-slate-600 font-sans">
                [Pursuant to mandatory proof of submission under Section 166 &amp; 184A]
              </p>
            </div>

            <table className="w-full border-collapse border border-slate-900 text-xs font-sans my-4">
              <thead>
                <tr className="bg-slate-100 font-bold text-slate-900 text-center">
                  <th className="border border-slate-900 p-1.5 w-10">SL No.</th>
                  <th className="border border-slate-900 p-1.5 text-left">Name of the employee</th>
                  <th className="border border-slate-900 p-1.5 text-left">Designation</th>
                  <th className="border border-slate-900 p-1.5 w-24">TIN</th>
                  <th className="border border-slate-900 p-1.5 text-left">Taxes Circle &amp; Zone</th>
                  <th className="border border-slate-900 p-1.5 w-24">Date of Filing</th>
                  <th className="border border-slate-900 p-1.5 w-32">Acknowledgement Serial No.</th>
                  <th className="border border-slate-900 p-1.5 w-20">Remarks</th>
                </tr>
                <tr className="bg-slate-200 text-slate-600 text-center text-[10px]">
                  <th className="border border-slate-900 py-0.5">1</th>
                  <th className="border border-slate-900 py-0.5">2</th>
                  <th className="border border-slate-900 py-0.5">3</th>
                  <th className="border border-slate-900 py-0.5">4</th>
                  <th className="border border-slate-900 py-0.5">5</th>
                  <th className="border border-slate-900 py-0.5">6</th>
                  <th className="border border-slate-900 py-0.5">7</th>
                  <th className="border border-slate-900 py-0.5">8</th>
                </tr>
              </thead>
              <tbody>
                {employeeFilings.map((ef, idx) => (
                  <tr key={ef.id || idx}>
                    <td className="border border-slate-900 p-1.5 text-center font-mono font-bold">
                      {ef.sl || idx + 1}
                    </td>
                    <td className="border border-slate-900 p-1.5 font-bold text-slate-900">
                      {ef.name}
                    </td>
                    <td className="border border-slate-900 p-1.5 text-slate-700">
                      {ef.desig}
                    </td>
                    <td className="border border-slate-900 p-1.5 text-center font-mono">
                      {ef.tin}
                    </td>
                    <td className="border border-slate-900 p-1.5 text-slate-700">
                      {ef.circleZone}
                    </td>
                    <td className="border border-slate-900 p-1.5 text-center font-mono">
                      {ef.filingDate}
                    </td>
                    <td className="border border-slate-900 p-1.5 font-mono text-center font-semibold text-emerald-950">
                      {ef.ackSerialNo}
                    </td>
                    <td className="border border-slate-900 p-1.5 text-center font-medium">
                      {ef.rem}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="space-y-1.5 text-justify text-xs mt-6">
              <p className="font-bold">I certify that—</p>
              <p>
                <strong>(a)</strong> The above statement contains a complete list of employees and their particulars about their filing of the return of income;
              </p>
              <p>
                <strong>(b)</strong> The particulars above are correct and complete.
              </p>
            </div>

            <div className="mt-14 pt-4 flex justify-between items-end border-t border-slate-300 font-sans text-xs">
              <div>
                <p>Signature &amp; Seal</p>
                <div className="w-56 border-b border-slate-900 mt-6"></div>
              </div>
              <div>
                <p>Name: <strong className="font-serif">{verification.declarantName}</strong></p>
                <p>Designation: <strong>{verification.designation}</strong></p>
              </div>
              <div className="text-right">
                <p>Date of Signature:</p>
                <p className="font-mono font-bold mt-1">{verification.submissionDate}</p>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-300 flex justify-between text-[10px] text-slate-500 font-sans">
            <span>{general.companyName} — Employee Return Filing Statement</span>
            <span>Page 13 of 13</span>
          </div>
        </section>
      )}
    </div>
  );
};
