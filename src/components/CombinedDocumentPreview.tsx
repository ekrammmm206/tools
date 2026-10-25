import React from 'react';
import { CombinedDossierState } from '../types/combinedDossier';
import {
  calculateFinancialTotals,
  calculateSponsorTotals,
  calculateKhatianPlotTotals,
  formatBdt,
  formatFx
} from '../utils/combinedCalculations';
import { numberToWordsInternational, numberToWordsBangladeshi } from '../utils/numberToWords';
import { Award, Stamp, CheckCircle2, ShieldCheck, MapPin, User, Calendar, FileText } from 'lucide-react';

interface CombinedDocumentPreviewProps {
  data: CombinedDossierState;
  zoom: number;
}

export const CombinedDocumentPreview: React.FC<CombinedDocumentPreviewProps> = ({
  data,
  zoom
}) => {
  const financialTotals = calculateFinancialTotals(data.financialDeclaration);
  const sponsorTotals = calculateSponsorTotals(data.sponsorDeclaration);
  const khatianTotals = calculateKhatianPlotTotals(data.khatian.plots);

  const filter = data.selectedSubDoc;
  const shouldShow = (docId: string) => filter === 'all' || filter === docId;

  const zoomStyle = {
    transform: `scale(${zoom / 100})`,
    transformOrigin: 'top center'
  };

  return (
    <div className="flex flex-col items-center gap-10 print:gap-0 print:m-0 w-full" style={zoomStyle}>
      {/* =========================================================================
          DOCUMENT 1: BIRTH REGISTRATION CERTIFICATE (BDR Form-3)
      ========================================================================= */}
      {shouldShow('birthCertificate') && (
        <div className="a4-page w-[210mm] min-h-[297mm] bg-white text-slate-900 p-12 shadow-2xl relative font-serif text-[12px] leading-relaxed border border-slate-300 print:border-none print:shadow-none print:p-8 flex flex-col justify-between">
          {/* Certificate Border */}
          <div className="border-4 border-double border-emerald-900 p-6 h-full flex flex-col justify-between relative bg-emerald-50/10">
            {/* Watermark / Background Emblem */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.04]">
              <div className="w-80 h-80 rounded-full border-[16px] border-emerald-900 flex items-center justify-center font-sans font-bold text-6xl text-emerald-950">
                BD GOV
              </div>
            </div>

            {/* Header */}
            <div>
              <div className="text-center border-b-2 border-emerald-900 pb-3 mb-4">
                <div className="flex justify-center mb-1">
                  <div className="w-12 h-12 rounded-full bg-emerald-800 text-white flex items-center justify-center font-bold text-sm shadow-xs">
                    ★ BD ★
                  </div>
                </div>
                <h1 className="text-[17px] font-bold text-emerald-950 uppercase tracking-wide">
                  Government of the People's Republic of Bangladesh
                </h1>
                <h2 className="text-[14px] font-bold text-slate-800 uppercase tracking-tight mt-0.5">
                  Office of the Registrar of Birth and Death
                </h2>
                <h3 className="text-[13px] font-semibold text-slate-700">
                  {data.birthCertificate.office}
                </h3>
                <p className="text-[11px] text-slate-600 italic mt-1 font-sans">
                  {data.birthCertificate.ruleText}
                </p>
                <div className="inline-block bg-emerald-900 text-white font-sans font-bold text-[12px] px-4 py-0.5 rounded-full mt-2 tracking-widest uppercase">
                  Birth Registration Certificate
                </div>
                <div className="text-[11px] font-semibold text-slate-600 mt-0.5 font-sans">
                  [{data.birthCertificate.formNo}]
                </div>
              </div>

              {/* Registration Reference Block */}
              <div className="grid grid-cols-2 gap-4 bg-slate-50 border border-slate-300 p-2.5 rounded font-sans text-[11px] mb-5">
                <div>
                  <span className="text-slate-500 font-semibold block">Date of Registration:</span>
                  <span className="font-bold text-slate-800">{data.birthCertificate.regDate}</span>
                </div>
                <div>
                  <span className="text-slate-500 font-semibold block">Date of Issuance:</span>
                  <span className="font-bold text-slate-800">{data.birthCertificate.issueDate}</span>
                </div>
                <div className="col-span-2 border-t border-slate-200 pt-1.5 flex items-center justify-between">
                  <span className="text-slate-600 font-bold">Birth Registration Number:</span>
                  <span className="font-mono font-black text-[15px] tracking-wider text-emerald-900">
                    {data.birthCertificate.regNo}
                  </span>
                </div>
              </div>

              {/* Core Details Table */}
              <div className="space-y-3 font-serif text-[13px]">
                <div className="border border-slate-300 rounded overflow-hidden">
                  <table className="w-full border-collapse">
                    <tbody>
                      <tr className="border-b border-slate-200">
                        <td className="w-1/3 py-2 px-3 bg-slate-50 font-bold text-slate-700 font-sans text-[11px] uppercase">
                          Date of Birth
                        </td>
                        <td className="py-2 px-3 font-semibold text-slate-900">
                          {data.birthCertificate.dob}{' '}
                          <span className="text-[11px] text-slate-600 italic block">
                            (In words: {data.birthCertificate.dobInWords})
                          </span>
                        </td>
                      </tr>
                      <tr className="border-b border-slate-200">
                        <td className="py-2 px-3 bg-slate-50 font-bold text-slate-700 font-sans text-[11px] uppercase">
                          Sex
                        </td>
                        <td className="py-2 px-3 font-semibold text-slate-900">
                          {data.birthCertificate.sex}
                        </td>
                      </tr>
                      <tr className="border-b border-slate-200">
                        <td className="py-2 px-3 bg-slate-50 font-bold text-slate-700 font-sans text-[11px] uppercase">
                          Full Name
                        </td>
                        <td className="py-2 px-3 font-bold text-slate-900 text-[14px]">
                          {data.birthCertificate.name}
                        </td>
                      </tr>
                      <tr className="border-b border-slate-200">
                        <td className="py-2 px-3 bg-slate-50 font-bold text-slate-700 font-sans text-[11px] uppercase">
                          Mother's Name
                        </td>
                        <td className="py-2 px-3 text-slate-900">
                          <span className="font-bold">{data.birthCertificate.motherName}</span>
                          <span className="text-slate-600 text-xs ml-3">
                            (Nationality: {data.birthCertificate.motherNationality})
                          </span>
                        </td>
                      </tr>
                      <tr className="border-b border-slate-200">
                        <td className="py-2 px-3 bg-slate-50 font-bold text-slate-700 font-sans text-[11px] uppercase">
                          Father's Name
                        </td>
                        <td className="py-2 px-3 text-slate-900">
                          <span className="font-bold">{data.birthCertificate.fatherName}</span>
                          <span className="text-slate-600 text-xs ml-3">
                            (Nationality: {data.birthCertificate.fatherNationality})
                          </span>
                        </td>
                      </tr>
                      <tr className="border-b border-slate-200">
                        <td className="py-2 px-3 bg-slate-50 font-bold text-slate-700 font-sans text-[11px] uppercase">
                          Place of Birth
                        </td>
                        <td className="py-2 px-3 font-semibold text-slate-900">
                          {data.birthCertificate.pob}
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 bg-slate-50 font-bold text-slate-700 font-sans text-[11px] uppercase">
                          Permanent Address
                        </td>
                        <td className="py-2 px-3 text-slate-900">
                          {data.birthCertificate.permAddress}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Verification Barcode & Signatures */}
            <div className="mt-8 pt-4 border-t border-slate-300">
              <div className="flex items-center justify-between mb-8">
                <div className="border border-slate-300 p-2 bg-white rounded text-center">
                  <div className="font-mono text-[9px] text-slate-400 tracking-widest">
                    ||||| | |||| || |||||| | ||||| |||||||
                  </div>
                  <div className="text-[9px] text-slate-500 font-sans mt-0.5 font-mono">
                    BD-BDR-{data.birthCertificate.regNo.slice(-8)}
                  </div>
                </div>
                <div className="w-20 h-20 border-2 border-dashed border-emerald-700/60 rounded-full flex flex-col items-center justify-center text-emerald-800 text-center p-1 text-[8px] font-sans font-bold uppercase rotate-[-8deg]">
                  <span>Office of the</span>
                  <span className="font-extrabold text-[9px]">Registrar</span>
                  <span>Rajshahi C.C.</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-12 font-sans text-xs">
                <div className="text-center pt-8 border-t border-slate-400">
                  <p className="font-bold text-slate-800">{data.birthCertificate.assistantTitle}</p>
                  <p className="text-[10px] text-slate-500">(Prepared & Verified By)</p>
                </div>
                <div className="text-center pt-8 border-t border-slate-400">
                  <p className="font-bold text-slate-800">{data.birthCertificate.registrarTitle}</p>
                  <p className="text-[10px] text-slate-500">Rajshahi City Corporation</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          DOCUMENT 2: FINANCIAL DECLARATION (REVISED AFFIDAVIT)
      ========================================================================= */}
      {shouldShow('financialDeclaration') && (
        <div className="a4-page w-[210mm] min-h-[297mm] bg-white text-slate-900 p-12 shadow-2xl relative font-serif text-[11px] leading-relaxed border border-slate-300 print:border-none print:shadow-none print:p-8 flex flex-col justify-between">
          <div>
            {/* Notary Public Header */}
            <div className="text-center border-b-2 border-slate-800 pb-3 mb-4">
              <div className="flex justify-between items-center mb-1">
                <div className="text-left font-sans text-[10px] text-slate-500">
                  AFFIDAVIT NO: <span className="font-bold text-slate-800">NOT/DK/2024-8841</span>
                </div>
                <div className="text-right font-sans text-[10px] text-slate-500">
                  NOTARIAL STAMP: <span className="font-bold text-slate-800">BDT 100/-</span>
                </div>
              </div>
              <h2 className="text-[14px] font-bold uppercase tracking-wider text-slate-900">
                Before the Court of Notary Public, {data.financialDeclaration.notaryDistrict}
              </h2>
              <h1 className="text-[15px] font-black uppercase text-slate-950 mt-1">
                {data.financialDeclaration.affidavitTitle}
              </h1>
            </div>

            {/* Declarant Preamble */}
            <div className="mb-4 text-justify leading-relaxed">
              <p>
                I, <strong className="uppercase">{data.financialDeclaration.declarantName}</strong>,
                son of {data.financialDeclaration.fatherName} and {data.financialDeclaration.motherName},
                residing at {data.financialDeclaration.address}, bearing National ID No.{' '}
                <strong>{data.financialDeclaration.nidNo}</strong>, by faith {data.financialDeclaration.religion},
                nationality {data.financialDeclaration.nationality}, do hereby solemnly declare, affirm, and state on oath as follows:
              </p>
              <p className="mt-2">
                1. That my biological {data.financialDeclaration.studentRelation.toLowerCase()},{' '}
                <strong className="uppercase">{data.financialDeclaration.studentName}</strong> (Date of Birth:{' '}
                {data.financialDeclaration.studentDob}, Passport No: {data.financialDeclaration.studentPassport}), has received an offer of admission for higher studies in the program{' '}
                <strong>{data.financialDeclaration.courseName}</strong> at{' '}
                <strong>{data.financialDeclaration.institution}</strong>.
              </p>
              <p className="mt-1">
                2. That I am the sole financial sponsor for my {data.financialDeclaration.studentRelation.toLowerCase()}, and I possess sufficient movable, immovable, liquid, and commercial assets in Bangladesh to fully finance his entire educational and living expenditures.
              </p>
              <div className="bg-slate-50 p-2 border border-slate-200 rounded font-sans text-[10px] my-2 text-slate-700">
                <strong>Exchange Rate Benchmark:</strong> {data.financialDeclaration.exchangeRateCitation} (Calculated at{' '}
                1 {data.financialDeclaration.currencyCode} = BDT {data.financialDeclaration.exchangeRate})
              </div>
            </div>

            {/* Asset Table 1: Land & Immovable Properties */}
            <div className="mb-3">
              <h3 className="font-sans font-bold text-[11px] text-slate-800 uppercase bg-slate-100 px-2 py-1 border border-slate-300 border-b-0">
                A. Schedule of Immovable Properties (Land & Real Estate)
              </h3>
              <table className="w-full border-collapse border border-slate-300 font-sans text-[10px]">
                <thead>
                  <tr className="bg-slate-50 text-slate-700">
                    <th className="border border-slate-300 p-1.5 text-left w-6">Sl</th>
                    <th className="border border-slate-300 p-1.5 text-left">Property Particulars & Location</th>
                    <th className="border border-slate-300 p-1.5 text-left w-20">Khatian/Plot</th>
                    <th className="border border-slate-300 p-1.5 text-left w-20">Area</th>
                    <th className="border border-slate-300 p-1.5 text-right w-24">Valuation (BDT)</th>
                    <th className="border border-slate-300 p-1.5 text-right w-24">Valuation ({data.financialDeclaration.currencyCode})</th>
                  </tr>
                </thead>
                <tbody>
                  {data.financialDeclaration.landProperties.map((p, idx) => (
                    <tr key={p.id}>
                      <td className="border border-slate-300 p-1.5 text-center">{idx + 1}</td>
                      <td className="border border-slate-300 p-1.5">{p.description}</td>
                      <td className="border border-slate-300 p-1.5">Kh: {p.khatianNo}<br/>Plot: {p.plotNo}</td>
                      <td className="border border-slate-300 p-1.5">{p.area}</td>
                      <td className="border border-slate-300 p-1.5 text-right font-medium">{formatBdt(p.valueBdt)}</td>
                      <td className="border border-slate-300 p-1.5 text-right font-medium">
                        {data.financialDeclaration.currencySymbol} {formatFx(p.valueBdt / data.financialDeclaration.exchangeRate)}
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-slate-50 font-bold">
                    <td colSpan={4} className="border border-slate-300 p-1.5 text-right uppercase">
                      Sub-Total Immovable Properties:
                    </td>
                    <td className="border border-slate-300 p-1.5 text-right">{formatBdt(financialTotals.landTotalBdt)}</td>
                    <td className="border border-slate-300 p-1.5 text-right">
                      {data.financialDeclaration.currencySymbol} {formatFx(financialTotals.landTotalFx)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Asset Table 2: Liquid Assets (Bank Accounts) */}
            <div className="mb-3">
              <h3 className="font-sans font-bold text-[11px] text-slate-800 uppercase bg-slate-100 px-2 py-1 border border-slate-300 border-b-0">
                B. Liquid Assets & Bank Deposits (Readily Available Funds)
              </h3>
              <table className="w-full border-collapse border border-slate-300 font-sans text-[10px]">
                <thead>
                  <tr className="bg-slate-50 text-slate-700">
                    <th className="border border-slate-300 p-1.5 text-left w-6">Sl</th>
                    <th className="border border-slate-300 p-1.5 text-left">Bank Name & Branch</th>
                    <th className="border border-slate-300 p-1.5 text-left w-36">Account No</th>
                    <th className="border border-slate-300 p-1.5 text-left w-24">Type</th>
                    <th className="border border-slate-300 p-1.5 text-right w-24">Balance (BDT)</th>
                    <th className="border border-slate-300 p-1.5 text-right w-24">Balance ({data.financialDeclaration.currencyCode})</th>
                  </tr>
                </thead>
                <tbody>
                  {data.financialDeclaration.bankAccounts.map((b, idx) => (
                    <tr key={b.id}>
                      <td className="border border-slate-300 p-1.5 text-center">{idx + 1}</td>
                      <td className="border border-slate-300 p-1.5 font-medium">{b.bankName}<br/><span className="text-slate-500">{b.branch}</span></td>
                      <td className="border border-slate-300 p-1.5 font-mono">{b.accountNo}</td>
                      <td className="border border-slate-300 p-1.5">{b.accountType}</td>
                      <td className="border border-slate-300 p-1.5 text-right font-medium">{formatBdt(b.balanceBdt)}</td>
                      <td className="border border-slate-300 p-1.5 text-right font-medium">
                        {data.financialDeclaration.currencySymbol} {formatFx(b.balanceBdt / data.financialDeclaration.exchangeRate)}
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-slate-50 font-bold">
                    <td colSpan={4} className="border border-slate-300 p-1.5 text-right uppercase">
                      Sub-Total Liquid Bank Funds:
                    </td>
                    <td className="border border-slate-300 p-1.5 text-right">{formatBdt(financialTotals.bankTotalBdt)}</td>
                    <td className="border border-slate-300 p-1.5 text-right">
                      {data.financialDeclaration.currencySymbol} {formatFx(financialTotals.bankTotalFx)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Asset Table 3: Commercial & Business Assets */}
            <div className="mb-3">
              <h3 className="font-sans font-bold text-[11px] text-slate-800 uppercase bg-slate-100 px-2 py-1 border border-slate-300 border-b-0">
                C. Commercial & Business Enterprise Net Worth
              </h3>
              <table className="w-full border-collapse border border-slate-300 font-sans text-[10px]">
                <thead>
                  <tr className="bg-slate-50 text-slate-700">
                    <th className="border border-slate-300 p-1.5 text-left w-6">Sl</th>
                    <th className="border border-slate-300 p-1.5 text-left">Enterprise Name</th>
                    <th className="border border-slate-300 p-1.5 text-left">Nature of Business</th>
                    <th className="border border-slate-300 p-1.5 text-center w-20">Shareholding</th>
                    <th className="border border-slate-300 p-1.5 text-right w-24">Net Worth (BDT)</th>
                    <th className="border border-slate-300 p-1.5 text-right w-24">Net Worth ({data.financialDeclaration.currencyCode})</th>
                  </tr>
                </thead>
                <tbody>
                  {data.financialDeclaration.businessAssets.map((bz, idx) => (
                    <tr key={bz.id}>
                      <td className="border border-slate-300 p-1.5 text-center">{idx + 1}</td>
                      <td className="border border-slate-300 p-1.5 font-medium">{bz.businessName}</td>
                      <td className="border border-slate-300 p-1.5">{bz.nature}</td>
                      <td className="border border-slate-300 p-1.5 text-center">{bz.ownershipPercent}%</td>
                      <td className="border border-slate-300 p-1.5 text-right font-medium">{formatBdt(bz.valueBdt)}</td>
                      <td className="border border-slate-300 p-1.5 text-right font-medium">
                        {data.financialDeclaration.currencySymbol} {formatFx(bz.valueBdt / data.financialDeclaration.exchangeRate)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Grand Total Asset Summary Box */}
            <div className="bg-emerald-50 border-2 border-emerald-800 p-2.5 rounded font-sans mb-4 flex justify-between items-center">
              <div>
                <span className="font-extrabold text-[12px] uppercase text-emerald-950 block">
                  Grand Total Net Asset Worth (A + B + C):
                </span>
                <span className="text-[10px] text-slate-700 italic">
                  Equivalent to {data.financialDeclaration.currencyCode} {formatFx(financialTotals.grandTotalAssetsFx)}
                </span>
              </div>
              <div className="text-right">
                <span className="text-base font-black text-emerald-950">
                  BDT {formatBdt(financialTotals.grandTotalAssetsBdt)}
                </span>
              </div>
            </div>

            {/* Income Table */}
            <div className="mb-4">
              <h3 className="font-sans font-bold text-[11px] text-slate-800 uppercase bg-slate-100 px-2 py-1 border border-slate-300 border-b-0">
                D. Recurring Annual Income Sources
              </h3>
              <table className="w-full border-collapse border border-slate-300 font-sans text-[10px]">
                <thead>
                  <tr className="bg-slate-50 text-slate-700">
                    <th className="border border-slate-300 p-1.5 text-left w-6">Sl</th>
                    <th className="border border-slate-300 p-1.5 text-left w-48">Income Head</th>
                    <th className="border border-slate-300 p-1.5 text-left">Income Particulars</th>
                    <th className="border border-slate-300 p-1.5 text-right w-24">Annual BDT</th>
                    <th className="border border-slate-300 p-1.5 text-right w-24">Annual {data.financialDeclaration.currencyCode}</th>
                  </tr>
                </thead>
                <tbody>
                  {data.financialDeclaration.annualIncomes.map((inc, idx) => (
                    <tr key={inc.id}>
                      <td className="border border-slate-300 p-1.5 text-center">{idx + 1}</td>
                      <td className="border border-slate-300 p-1.5 font-medium">{inc.source}</td>
                      <td className="border border-slate-300 p-1.5">{inc.particulars}</td>
                      <td className="border border-slate-300 p-1.5 text-right font-medium">{formatBdt(inc.annualBdt)}</td>
                      <td className="border border-slate-300 p-1.5 text-right font-medium">
                        {data.financialDeclaration.currencySymbol} {formatFx(inc.annualBdt / data.financialDeclaration.exchangeRate)}
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-slate-50 font-bold">
                    <td colSpan={3} className="border border-slate-300 p-1.5 text-right uppercase">
                      Total Annual Recurring Income:
                    </td>
                    <td className="border border-slate-300 p-1.5 text-right">{formatBdt(financialTotals.incomeTotalBdt)}</td>
                    <td className="border border-slate-300 p-1.5 text-right">
                      {data.financialDeclaration.currencySymbol} {formatFx(financialTotals.incomeTotalFx)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Verification Clause */}
            <p className="text-[10px] text-justify font-serif leading-relaxed mb-6">
              I verify and certify that the statements made above are true to the best of my knowledge, information, and belief, and nothing material has been concealed therein.
            </p>
          </div>

          {/* Legal Signatures */}
          <div className="pt-4 border-t border-slate-300 font-sans text-[10px]">
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center pt-8 border-t border-slate-400">
                <p className="font-bold text-slate-800">{data.financialDeclaration.declarantName}</p>
                <p className="text-slate-500">(Deponent / Sponsor)</p>
              </div>
              <div className="text-center pt-8 border-t border-slate-400">
                <p className="font-bold text-slate-800">{data.financialDeclaration.advocateName}</p>
                <p className="text-slate-500">(Identified By Advocate)</p>
              </div>
              <div className="text-center pt-8 border-t border-slate-400">
                <p className="font-bold text-slate-800">{data.financialDeclaration.notaryName}</p>
                <p className="text-slate-500">(Notary Public Attestation)</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          DOCUMENT 3: KHATIAN (RECORD OF RIGHTS - TRANSLATED TRUE COPY)
      ========================================================================= */}
      {shouldShow('khatian') && (
        <div className="a4-page w-[210mm] min-h-[297mm] bg-white text-slate-900 p-12 shadow-2xl relative font-serif text-[12px] leading-relaxed border border-slate-300 print:border-none print:shadow-none print:p-8 flex flex-col justify-between">
          <div>
            {/* Khatian Header */}
            <div className="text-center border-b-2 border-slate-900 pb-3 mb-4">
              <div className="flex justify-between items-center text-[10px] font-sans text-slate-500 mb-1">
                <span>CERTIFIED TRANSLATION</span>
                <span>ORIGINAL PRESERVED AT RECORD ROOM</span>
              </div>
              <h1 className="text-[16px] font-black uppercase text-slate-950 tracking-wider">
                {data.khatian.title}
              </h1>
              <h2 className="text-[13px] font-bold text-slate-800 uppercase mt-0.5">
                {data.khatian.subtitle}
              </h2>
              <div className="inline-block bg-slate-900 text-white font-sans font-bold text-[12px] px-4 py-0.5 rounded mt-2 uppercase tracking-wide">
                {data.khatian.khatianType} • NO: {data.khatian.khatianNo}
              </div>
            </div>

            {/* Geographical Jurisdiction Grid */}
            <div className="grid grid-cols-3 gap-2 bg-slate-50 border border-slate-300 p-3 rounded font-sans text-[11px] mb-4">
              <div>
                <span className="text-slate-500 font-semibold block">District:</span>
                <span className="font-bold text-slate-800">{data.khatian.district}</span>
              </div>
              <div>
                <span className="text-slate-500 font-semibold block">Thana / Upazila:</span>
                <span className="font-bold text-slate-800">{data.khatian.thana}</span>
              </div>
              <div>
                <span className="text-slate-500 font-semibold block">Mouza:</span>
                <span className="font-bold text-slate-800">{data.khatian.mouza}</span>
              </div>
              <div>
                <span className="text-slate-500 font-semibold block">J.L. No:</span>
                <span className="font-bold text-slate-800">{data.khatian.jlNo}</span>
              </div>
              <div>
                <span className="text-slate-500 font-semibold block">Touzi No:</span>
                <span className="font-bold text-slate-800">{data.khatian.touziNo}</span>
              </div>
              <div>
                <span className="text-slate-500 font-semibold block">Revenue / Rent:</span>
                <span className="font-bold text-slate-800">{data.khatian.revenueRent}</span>
              </div>
            </div>

            {/* Section 1: Landowners / Possessors */}
            <div className="mb-4">
              <h3 className="font-sans font-bold text-[11px] uppercase bg-slate-100 p-1.5 border border-slate-300 border-b-0 text-slate-800">
                Part 1: Recorded Owners & Possessors (মালিক ও দখলদারদের বিবরণ)
              </h3>
              <table className="w-full border-collapse border border-slate-300 font-sans text-[11px]">
                <thead>
                  <tr className="bg-slate-50 text-slate-700">
                    <th className="border border-slate-300 p-2 text-left w-10">Sl</th>
                    <th className="border border-slate-300 p-2 text-left">Name of Owner / Possessor</th>
                    <th className="border border-slate-300 p-2 text-left">Father's / Husband's Name</th>
                    <th className="border border-slate-300 p-2 text-left">Address</th>
                    <th className="border border-slate-300 p-2 text-center w-24">Share (হিস্যা)</th>
                  </tr>
                </thead>
                <tbody>
                  {data.khatian.owners.map((owner, idx) => (
                    <tr key={owner.id}>
                      <td className="border border-slate-300 p-2 text-center">{idx + 1}</td>
                      <td className="border border-slate-300 p-2 font-bold text-slate-900">{owner.name}</td>
                      <td className="border border-slate-300 p-2">{owner.fatherOrHusband}</td>
                      <td className="border border-slate-300 p-2">{owner.address}</td>
                      <td className="border border-slate-300 p-2 text-center font-bold text-slate-800">{owner.share}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Section 2: Plot Details */}
            <div className="mb-4">
              <h3 className="font-sans font-bold text-[11px] uppercase bg-slate-100 p-1.5 border border-slate-300 border-b-0 text-slate-800">
                Part 2: Plot Particulars & Land Classification (দাগ ও জমির বিবরণ)
              </h3>
              <table className="w-full border-collapse border border-slate-300 font-sans text-[11px]">
                <thead>
                  <tr className="bg-slate-50 text-slate-700">
                    <th className="border border-slate-300 p-2 text-left w-16">Plot (Dag)</th>
                    <th className="border border-slate-300 p-2 text-left">Class of Land (শ্রেণী)</th>
                    <th className="border border-slate-300 p-2 text-center w-24">Total Plot Land (Acre)</th>
                    <th className="border border-slate-300 p-2 text-center w-24">Total Plot Land (Dec)</th>
                    <th className="border border-slate-300 p-2 text-center w-20">Share</th>
                    <th className="border border-slate-300 p-2 text-right w-24">Prop. Land (Dec)</th>
                  </tr>
                </thead>
                <tbody>
                  {data.khatian.plots.map((plot) => (
                    <tr key={plot.id}>
                      <td className="border border-slate-300 p-2 font-bold text-slate-900">{plot.plotNo}</td>
                      <td className="border border-slate-300 p-2">{plot.classOfLand}</td>
                      <td className="border border-slate-300 p-2 text-center">{plot.totalLandAcre.toFixed(2)}</td>
                      <td className="border border-slate-300 p-2 text-center font-semibold">{plot.totalLandDecimal.toFixed(2)}</td>
                      <td className="border border-slate-300 p-2 text-center">{plot.share}</td>
                      <td className="border border-slate-300 p-2 text-right font-bold text-slate-900">
                        {plot.propLandDecimal.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-slate-50 font-bold">
                    <td colSpan={3} className="border border-slate-300 p-2 text-right uppercase">
                      Total Land Under Khatian:
                    </td>
                    <td className="border border-slate-300 p-2 text-center font-bold">
                      {khatianTotals.totalDecimal.toFixed(2)} Dec
                    </td>
                    <td className="border border-slate-300 p-2 text-center">-</td>
                    <td className="border border-slate-300 p-2 text-right text-emerald-950 font-black">
                      {khatianTotals.propDecimal.toFixed(2)} Dec
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Translation Certification Banner */}
            <div className="bg-slate-50 border border-slate-300 p-3 rounded text-[11px] font-sans text-slate-700 italic leading-relaxed">
              <strong className="text-slate-900 not-italic block mb-1">Official Translation Declaration:</strong>
              {data.khatian.certifiedBy}
            </div>
          </div>

          {/* Attestation & Seals */}
          <div className="pt-6 border-t border-slate-300 font-sans text-xs flex justify-between items-end">
            <div className="w-24 h-24 border-2 border-dashed border-slate-400 rounded-full flex flex-col items-center justify-center text-slate-600 text-center p-1 text-[8px] font-bold uppercase rotate-[-5deg]">
              <span>Record Room</span>
              <span className="font-black text-[9px]">Verified</span>
              <span>Dist: Chandpur</span>
            </div>
            <div className="text-right">
              <div className="inline-block border-t border-slate-400 pt-1 text-center min-w-[200px]">
                <p className="font-bold text-slate-800">Authorized Translator & Notary Public</p>
                <p className="text-[10px] text-slate-500">Dhaka, Bangladesh</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          DOCUMENT 4: NATIONAL ID CARD (NID - TRANSLATED COPY)
      ========================================================================= */}
      {shouldShow('nidCard') && (
        <div className="a4-page w-[210mm] min-h-[297mm] bg-white text-slate-900 p-12 shadow-2xl relative font-sans text-[12px] leading-relaxed border border-slate-300 print:border-none print:shadow-none print:p-8 flex flex-col justify-between">
          <div>
            {/* Header */}
            <div className="text-center border-b-2 border-slate-800 pb-3 mb-8">
              <h1 className="text-[16px] font-black uppercase text-slate-900 tracking-wide">
                {data.nidCard.title}
              </h1>
              <h2 className="text-[13px] font-bold text-emerald-800 uppercase mt-0.5">
                {data.nidCard.subTitle}
              </h2>
              <p className="text-[11px] text-slate-500 italic mt-0.5">
                (Certified English Translation Reproduction for International & Visa Verification)
              </p>
            </div>

            {/* Smart ID Cards Presentation: Front & Back */}
            <div className="flex flex-col items-center gap-8 mb-8">
              {/* FRONT OF NID */}
              <div className="w-[105mm] h-[66mm] rounded-xl border border-slate-400 shadow-md p-3 relative overflow-hidden bg-linear-to-br from-emerald-50 via-white to-slate-50 text-slate-900 flex flex-col justify-between">
                {/* Government Watermark Top */}
                <div className="flex items-center justify-between border-b border-emerald-900/30 pb-1.5">
                  <div className="flex items-center gap-1.5">
                    <div className="w-5 h-5 rounded-full bg-emerald-800 text-white text-[7px] flex items-center justify-center font-bold">
                      BD
                    </div>
                    <div>
                      <p className="text-[8px] font-extrabold uppercase leading-none text-emerald-950">
                        Government of Bangladesh
                      </p>
                      <p className="text-[7px] text-slate-600 leading-none">National ID Card / জাতীয় পরিচয়পত্র</p>
                    </div>
                  </div>
                  <div className="w-6 h-5 bg-amber-200 border border-amber-400 rounded-sm flex items-center justify-center font-mono text-[6px] text-amber-900">
                    CHIP
                  </div>
                </div>

                {/* Content & Photo */}
                <div className="flex gap-3 items-center my-1">
                  {/* Photo area */}
                  <div className="w-20 h-24 border-2 border-slate-400 rounded bg-slate-100 flex flex-col items-center justify-center text-slate-400 shrink-0 overflow-hidden">
                    {data.nidCard.photoUrl ? (
                      <img src={data.nidCard.photoUrl} alt="NID Photo" className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-10 h-10 text-slate-300" />
                    )}
                  </div>

                  {/* Text Details */}
                  <div className="text-[9px] space-y-1">
                    <div>
                      <span className="text-slate-500 font-semibold block leading-tight">Name:</span>
                      <span className="font-extrabold text-[11px] text-slate-900 block leading-tight">
                        {data.nidCard.name}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-500 font-semibold">Father: </span>
                      <span className="font-bold text-slate-800">{data.nidCard.fatherName}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 font-semibold">Mother: </span>
                      <span className="font-bold text-slate-800">{data.nidCard.motherName}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 font-semibold">Date of Birth: </span>
                      <span className="font-bold text-slate-800">{data.nidCard.dob}</span>
                    </div>
                  </div>
                </div>

                {/* ID Number Bar */}
                <div className="bg-emerald-950 text-white px-2 py-0.5 rounded flex justify-between items-center text-[10px]">
                  <span className="font-semibold tracking-wider">ID NO:</span>
                  <span className="font-mono font-black tracking-widest">{data.nidCard.nidNo}</span>
                </div>
              </div>

              {/* BACK OF NID */}
              <div className="w-[105mm] h-[66mm] rounded-xl border border-slate-400 shadow-md p-3 relative overflow-hidden bg-linear-to-br from-slate-50 via-white to-emerald-50 text-slate-900 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center text-[8px] border-b border-slate-300 pb-1">
                    <div>
                      <span className="text-slate-500 font-semibold">Blood Group: </span>
                      <span className="font-extrabold text-red-700">{data.nidCard.bloodGroup}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 font-semibold">Place of Birth: </span>
                      <span className="font-bold text-slate-800">{data.nidCard.placeOfBirth}</span>
                    </div>
                  </div>

                  <div className="mt-2 text-[8px] leading-relaxed">
                    <span className="text-slate-500 font-bold block uppercase text-[7px]">Residential Address:</span>
                    <p className="font-medium text-slate-800">{data.nidCard.address}</p>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-end text-[7px] text-slate-600 mb-1">
                    <div>
                      <span>Issue Date: <strong>{data.nidCard.issueDate}</strong></span>
                    </div>
                    <div className="text-right">
                      <span className="italic block font-serif">Sign / মহাব্যবস্থাপক</span>
                      <span className="font-semibold">{data.nidCard.issuingAuthority}</span>
                    </div>
                  </div>

                  {/* Machine Readable Zone (MRZ) */}
                  <div className="bg-slate-900 text-white font-mono text-[7px] p-1 rounded tracking-widest leading-tight">
                    <div>I&lt;BGD{data.nidCard.nidNo}&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;</div>
                    <div>0108257M&lt;&lt;&lt;&lt;&lt;&lt;&lt;BGD&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;TANVIR&lt;&lt;HASAN</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Verification & Notary Certificate Section */}
            <div className="border border-slate-300 p-4 rounded bg-slate-50 text-[11px] leading-relaxed">
              <h3 className="font-bold text-slate-900 mb-1">Certificate of Translation & Authenticity:</h3>
              <p className="text-slate-700">
                I, the undersigned Advocate and Notary Public, hereby certify that I have compared the foregoing English translation with the original National Identity Card issued by the Election Commission Bangladesh in Bengali, and that the same is a true, faithful, and accurate translation in all respects.
              </p>
            </div>
          </div>

          {/* Notary Seal */}
          <div className="pt-6 border-t border-slate-300 text-xs flex justify-between items-center">
            <div className="flex items-center gap-2 text-slate-600">
              <ShieldCheck className="w-5 h-5 text-emerald-700" />
              <span className="text-[11px] font-medium">True Translation Certified</span>
            </div>
            <div className="text-center min-w-[200px]">
              <div className="border-t border-slate-400 pt-1">
                <p className="font-bold text-slate-800">Notary Public / Authorized Attorney</p>
                <p className="text-[10px] text-slate-500">Dhaka, Bangladesh</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          DOCUMENT 5: RENTAL AGREEMENT (BILINGUAL: ENGLISH & BANGLA)
      ========================================================================= */}
      {shouldShow('rentalAgreement') && (
        <div className="a4-page w-[210mm] min-h-[297mm] bg-white text-slate-900 p-12 shadow-2xl relative font-serif text-[11px] leading-relaxed border border-slate-300 print:border-none print:shadow-none print:p-8 flex flex-col justify-between">
          <div>
            {/* Agreement Header */}
            <div className="text-center border-b-2 border-slate-800 pb-3 mb-4">
              <div className="text-slate-500 font-sans text-[10px] flex justify-between">
                <span>NON-JUDICIAL STAMP VALUE: BDT 300/-</span>
                <span>DATE: {data.rentalAgreement.agreementDate}</span>
              </div>
              <h1 className="text-[16px] font-black uppercase text-slate-950 tracking-wider">
                HOUSE RENTAL AGREEMENT
              </h1>
              <h2 className="text-[14px] font-bold text-slate-800 font-sans mt-0.5">
                বাড়ি ভাড়ার চুক্তিপত্র (দ্বিভাষিক দলিল)
              </h2>
            </div>

            {/* Parties Description */}
            <div className="grid grid-cols-2 gap-4 mb-4 font-sans text-[11px]">
              <div className="border border-slate-300 p-2.5 rounded bg-slate-50">
                <span className="bg-slate-800 text-white text-[9px] font-bold px-2 py-0.5 rounded uppercase">
                  First Party (Landlord / বাড়িওয়ালা)
                </span>
                <p className="font-bold text-slate-900 text-[12px] mt-1.5">{data.rentalAgreement.landlordName}</p>
                <p className="text-slate-600 text-[10px]">Father: {data.rentalAgreement.landlordFather}</p>
                <p className="text-slate-600 text-[10px]">Address: {data.rentalAgreement.landlordAddress}</p>
                <p className="text-slate-600 text-[10px]">NID: {data.rentalAgreement.landlordNid}</p>
                <p className="text-slate-600 text-[10px]">Mobile: {data.rentalAgreement.landlordPhone}</p>
              </div>

              <div className="border border-slate-300 p-2.5 rounded bg-slate-50">
                <span className="bg-slate-800 text-white text-[9px] font-bold px-2 py-0.5 rounded uppercase">
                  Second Party (Tenant / ভাড়াটিয়া)
                </span>
                <p className="font-bold text-slate-900 text-[12px] mt-1.5">{data.rentalAgreement.tenantName}</p>
                <p className="text-slate-600 text-[10px]">Father: {data.rentalAgreement.tenantFather}</p>
                <p className="text-slate-600 text-[10px]">Address: {data.rentalAgreement.tenantAddress}</p>
                <p className="text-slate-600 text-[10px]">NID: {data.rentalAgreement.tenantNid}</p>
                <p className="text-slate-600 text-[10px]">Mobile: {data.rentalAgreement.tenantPhone}</p>
              </div>
            </div>

            {/* Premises Description */}
            <div className="bg-slate-100 border border-slate-300 p-2.5 rounded text-[11px] mb-3 font-sans">
              <strong>Demised Premises (ভাড়া দেওয়া সম্পত্তির বিবরণ):</strong> {data.rentalAgreement.premisesAddress}
            </div>

            {/* Financial Summary Strip */}
            <div className="grid grid-cols-3 gap-2 bg-emerald-50 border border-emerald-700/60 p-2 rounded text-[11px] font-sans mb-4">
              <div>
                <span className="text-slate-600 block text-[10px]">Monthly Rent (মাসিক ভাড়া):</span>
                <strong className="text-emerald-950 text-[12px]">BDT {formatBdt(data.rentalAgreement.monthlyRentBdt)}</strong>
              </div>
              <div>
                <span className="text-slate-600 block text-[10px]">Security Deposit (অগ্রিম জামানত):</span>
                <strong className="text-emerald-950 text-[12px]">BDT {formatBdt(data.rentalAgreement.securityDepositBdt)}</strong>
              </div>
              <div>
                <span className="text-slate-600 block text-[10px]">Duration (চুক্তির মেয়াদ):</span>
                <strong className="text-emerald-950 text-[12px]">{data.rentalAgreement.agreementDurationMonths} Months</strong>
              </div>
            </div>

            {/* Terms and Covenants (Bilingual) */}
            <div className="space-y-2 text-[10px] leading-relaxed text-justify mb-4">
              <div className="border-b border-slate-200 pb-1.5">
                <p className="font-bold text-slate-900">1. Term & Commencement / মেয়াদের শর্তাবলী:</p>
                <p>This agreement shall remain effective for {data.rentalAgreement.agreementDurationMonths} months commencing from {data.rentalAgreement.agreementDate}. Both parties may renew the tenancy upon mutual consent.</p>
                <p className="text-slate-700 font-sans mt-0.5">এই চুক্তিপত্রটি {data.rentalAgreement.agreementDate} তারিখ হইতে পরবর্তী {data.rentalAgreement.agreementDurationMonths} মাসের জন্য বলবৎ থাকিবে। উভয় পক্ষের সম্মতিক্রমে চুক্তি নবায়নযোগ্য হইবে।</p>
              </div>

              <div className="border-b border-slate-200 pb-1.5">
                <p className="font-bold text-slate-900">2. Rent Payment / ভাড়া প্রদান:</p>
                <p>The monthly rent of BDT {formatBdt(data.rentalAgreement.monthlyRentBdt)} ({numberToWordsBangladeshi(data.rentalAgreement.monthlyRentBdt)} Taka) must be paid by the 7th day of each calendar month.</p>
                <p className="text-slate-700 font-sans mt-0.5">প্রতি মাসের ৭ তারিখের মধ্যে মাসিক ভাড়া বাবদ {formatBdt(data.rentalAgreement.monthlyRentBdt)} টাকা ১ম পক্ষকে পরিশোধ করিতে হইবে।</p>
              </div>

              <div className="border-b border-slate-200 pb-1.5">
                <p className="font-bold text-slate-900">3. Security Deposit / অগ্রিম জামানত:</p>
                <p>The Second Party has deposited BDT {formatBdt(data.rentalAgreement.securityDepositBdt)} as an interest-free refundable security deposit, refundable upon vacancy after deducting legitimate dues.</p>
                <p className="text-slate-700 font-sans mt-0.5">২য় পক্ষ জামানত বাবদ {formatBdt(data.rentalAgreement.securityDepositBdt)} টাকা প্রদান করিয়াছেন, যাহা ফ্ল্যাট ত্যাগের সময় অপরিশোধিত বিল কর্তনপূর্বক ফেরতযোগ্য হইবে।</p>
              </div>

              <div className="border-b border-slate-200 pb-1.5">
                <p className="font-bold text-slate-900">4. Utilities & Taxes / ইউটিলিটি ও করাদি:</p>
                <p>Electricity and gas bills as per separate sub-meter shall be paid by the Tenant. Building municipal holding tax shall be borne by the Landlord.</p>
                <p className="text-slate-700 font-sans mt-0.5">বিদ্যুৎ ও গ্যাস বিল ব্যবহার অনুযায়ী ২য় পক্ষ নিয়মিত পরিশোধ করিবেন। হোল্ডিং ট্যাক্স ১ম পক্ষ বহন করিবেন।</p>
              </div>

              <div>
                <p className="font-bold text-slate-900">5. Termination Notice / চুক্তি বাতিলের নোটিশ:</p>
                <p>Either party may terminate this tenancy by serving {data.rentalAgreement.noticePeriodMonths} months written prior notice.</p>
                <p className="text-slate-700 font-sans mt-0.5">উভয় পক্ষের যেকোনো পক্ষ {data.rentalAgreement.noticePeriodMonths} মাসের লিখিত নোটিশ প্রদান করিয়া এই চুক্তি সমাপ্ত করিতে পারিবেন।</p>
              </div>
            </div>
          </div>

          {/* Signatures & Witnesses */}
          <div className="pt-4 border-t border-slate-300 font-sans text-[10px]">
            <div className="grid grid-cols-2 gap-8 mb-6">
              <div className="text-center pt-8 border-t border-slate-400">
                <p className="font-bold text-slate-900">{data.rentalAgreement.landlordName}</p>
                <p className="text-slate-500">First Party / Landlord (বাড়িওয়ালা)</p>
              </div>
              <div className="text-center pt-8 border-t border-slate-400">
                <p className="font-bold text-slate-900">{data.rentalAgreement.tenantName}</p>
                <p className="text-slate-500">Second Party / Tenant (ভাড়াটিয়া)</p>
              </div>
            </div>

            <div>
              <p className="font-bold text-slate-800 text-[10px] uppercase mb-1">Witnesses (সাক্ষীগণের নাম ও ঠিকানা):</p>
              <div className="grid grid-cols-2 gap-4">
                {data.rentalAgreement.witnesses.map((w, i) => (
                  <div key={w.id} className="border border-slate-200 p-1.5 rounded bg-slate-50 text-[9px]">
                    <p className="font-bold text-slate-800">{i + 1}. {w.name}</p>
                    <p className="text-slate-600">{w.address}</p>
                    <p className="text-slate-500 font-mono">NID: {w.nid}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          DOCUMENT 6: SPONSOR DECLARATION & AFFIDAVIT OF FINANCIAL SUPPORT
      ========================================================================= */}
      {shouldShow('sponsorDeclaration') && (
        <div className="a4-page w-[210mm] min-h-[297mm] bg-white text-slate-900 p-12 shadow-2xl relative font-serif text-[11px] leading-relaxed border border-slate-300 print:border-none print:shadow-none print:p-8 flex flex-col justify-between">
          <div>
            {/* Header */}
            <div className="text-center border-b-2 border-slate-900 pb-3 mb-4">
              <div className="text-slate-500 font-sans text-[10px] flex justify-between mb-1">
                <span>BEFORE THE NOTARY PUBLIC</span>
                <span>GOVERNMENT OF BANGLADESH</span>
              </div>
              <h1 className="text-[15px] font-black uppercase text-slate-950 tracking-wider">
                {data.sponsorDeclaration.title}
              </h1>
              <h2 className="text-[12px] font-bold text-slate-700 uppercase mt-0.5">
                (Affidavit of Financial Guarantee & Statutory Undertaking)
              </h2>
            </div>

            {/* Parties Statement */}
            <div className="text-justify leading-relaxed mb-4">
              <p>
                I, <strong className="uppercase">{data.sponsorDeclaration.sponsorName}</strong>,
                residing at {data.sponsorDeclaration.sponsorAddress}, holding National Identity Card No.{' '}
                <strong>{data.sponsorDeclaration.sponsorNid}</strong>, occupation{' '}
                {data.sponsorDeclaration.sponsorOccupation}, do hereby solemnly affirm, depose, and declare under oath as follows:
              </p>
              <p className="mt-2">
                1. That I am the {data.sponsorDeclaration.sponsorRelation.toLowerCase()} of{' '}
                <strong className="uppercase">{data.sponsorDeclaration.applicantName}</strong> (Date of Birth:{' '}
                {data.sponsorDeclaration.applicantDob}, Passport No: {data.sponsorDeclaration.applicantPassport}), who has been accepted for admission to the program{' '}
                <strong>{data.sponsorDeclaration.course}</strong> at{' '}
                <strong>{data.sponsorDeclaration.university}</strong>, {data.sponsorDeclaration.country}.
              </p>
              <p className="mt-1">
                2. That I am fully capable, legally willing, and unconditionally committed to sponsoring my said {data.sponsorDeclaration.sponsorRelation.toLowerCase()}'s complete tuition fees, living expenses, university charges, accommodation, medical health cover, and all incidental costs throughout his academic tenure in {data.sponsorDeclaration.country}.
              </p>
            </div>

            {/* Liquid Funds & Bank Account Table */}
            <div className="mb-4">
              <h3 className="font-sans font-bold text-[11px] uppercase bg-slate-100 p-1.5 border border-slate-300 border-b-0 text-slate-800">
                Liquid Bank Accounts Available for Immediate Withdrawal
              </h3>
              <table className="w-full border-collapse border border-slate-300 font-sans text-[10px]">
                <thead>
                  <tr className="bg-slate-50 text-slate-700">
                    <th className="border border-slate-300 p-1.5 text-left w-6">Sl</th>
                    <th className="border border-slate-300 p-1.5 text-left">Bank & Branch</th>
                    <th className="border border-slate-300 p-1.5 text-left w-36">Account No</th>
                    <th className="border border-slate-300 p-1.5 text-left w-24">Type</th>
                    <th className="border border-slate-300 p-1.5 text-right w-24">Balance (BDT)</th>
                    <th className="border border-slate-300 p-1.5 text-right w-24">Balance ({data.sponsorDeclaration.currencyCode})</th>
                  </tr>
                </thead>
                <tbody>
                  {data.sponsorDeclaration.accounts.map((acc, idx) => (
                    <tr key={acc.id}>
                      <td className="border border-slate-300 p-1.5 text-center">{idx + 1}</td>
                      <td className="border border-slate-300 p-1.5 font-medium">
                        {acc.bankName}<br/>
                        <span className="text-slate-500">{acc.branch}</span>
                      </td>
                      <td className="border border-slate-300 p-1.5 font-mono">{acc.accountNo}</td>
                      <td className="border border-slate-300 p-1.5">{acc.accountType}</td>
                      <td className="border border-slate-300 p-1.5 text-right font-medium">{formatBdt(acc.balanceBdt)}</td>
                      <td className="border border-slate-300 p-1.5 text-right font-medium">
                        {data.sponsorDeclaration.currencySymbol} {formatFx(acc.balanceBdt / data.sponsorDeclaration.exchangeRate)}
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-slate-50 font-bold">
                    <td colSpan={4} className="border border-slate-300 p-1.5 text-right uppercase">
                      Total Liquid Bank Guarantee:
                    </td>
                    <td className="border border-slate-300 p-1.5 text-right font-black">
                      BDT {formatBdt(sponsorTotals.totalBdt)}
                    </td>
                    <td className="border border-slate-300 p-1.5 text-right text-emerald-950 font-black">
                      {data.sponsorDeclaration.currencySymbol} {formatFx(sponsorTotals.totalFx)}
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="font-sans text-[9px] text-slate-500 mt-1 italic">
                * Converted at official exchange rate: 1 {data.sponsorDeclaration.currencyCode} = {data.sponsorDeclaration.exchangeRate} BDT.
              </div>
            </div>

            {/* Undertaking Clauses */}
            <div className="mb-4">
              <h3 className="font-sans font-bold text-[11px] uppercase bg-slate-100 p-1.5 border border-slate-300 border-b-0 text-slate-800">
                Statutory Undertakings & Guarantees
              </h3>
              <div className="border border-slate-300 p-3 rounded-b space-y-2 text-[10px] leading-relaxed text-justify">
                {data.sponsorDeclaration.undertakingPoints.map((pt, idx) => (
                  <div key={idx} className="flex gap-2 items-start">
                    <span className="font-bold text-slate-900 shrink-0">({idx + 1})</span>
                    <p>{pt}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Solemn Declaration */}
            <p className="text-[10px] text-justify font-serif leading-relaxed mb-6">
              I depose that the contents of this declaration are true and correct, that I have made this affidavit with my full knowledge and consent, and that I hold myself legally responsible under the laws of Bangladesh and the immigration jurisdiction of {data.sponsorDeclaration.country}.
            </p>
          </div>

          {/* Jurat and Signatures */}
          <div className="pt-4 border-t border-slate-300 font-sans text-[10px]">
            <div className="grid grid-cols-2 gap-12">
              <div className="text-center pt-8 border-t border-slate-400">
                <p className="font-bold text-slate-900 uppercase">{data.sponsorDeclaration.sponsorName}</p>
                <p className="text-slate-500">(Deponent / Sponsor)</p>
              </div>
              <div className="text-center pt-8 border-t border-slate-400">
                <p className="font-bold text-slate-900">NOTARY PUBLIC</p>
                <p className="text-slate-500">Dhaka, Bangladesh</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          DOCUMENT 7: SUMMARY OF DEED (ABSOLUTE SALE / SAF-KABALA DEED)
      ========================================================================= */}
      {shouldShow('summaryOfDeed') && (
        <div className="a4-page w-[210mm] min-h-[297mm] bg-white text-slate-900 p-12 shadow-2xl relative font-serif text-[11px] leading-relaxed border border-slate-300 print:border-none print:shadow-none print:p-8 flex flex-col justify-between">
          <div>
            {/* Header */}
            <div className="text-center border-b-2 border-slate-900 pb-3 mb-4">
              <div className="text-slate-500 font-sans text-[10px] flex justify-between mb-1">
                <span>REGISTERED UNDER REGISTRATION ACT 1908</span>
                <span>TRANSLATED TRUE COPY</span>
              </div>
              <h1 className="text-[16px] font-black uppercase text-slate-950 tracking-wider">
                SUMMARY OF REGISTERED DEED
              </h1>
              <h2 className="text-[13px] font-bold text-slate-800 uppercase mt-0.5">
                {data.summaryOfDeed.deedType}
              </h2>
            </div>

            {/* Deed Reference Box */}
            <div className="grid grid-cols-4 gap-2 bg-slate-50 border border-slate-300 p-2.5 rounded font-sans text-[11px] mb-4">
              <div>
                <span className="text-slate-500 font-semibold block text-[10px]">Deed No:</span>
                <span className="font-bold text-slate-900">{data.summaryOfDeed.deedNo}</span>
              </div>
              <div>
                <span className="text-slate-500 font-semibold block text-[10px]">Year of Registration:</span>
                <span className="font-bold text-slate-900">{data.summaryOfDeed.year}</span>
              </div>
              <div>
                <span className="text-slate-500 font-semibold block text-[10px]">Sub-Registry Office:</span>
                <span className="font-bold text-slate-900">{data.summaryOfDeed.subRegistryOffice}</span>
              </div>
              <div>
                <span className="text-slate-500 font-semibold block text-[10px]">District:</span>
                <span className="font-bold text-slate-900">{data.summaryOfDeed.district}</span>
              </div>
            </div>

            {/* Vendor & Vendee Details */}
            <div className="grid grid-cols-2 gap-4 mb-4 font-sans text-[11px]">
              <div className="border border-slate-300 p-2.5 rounded bg-slate-50">
                <span className="bg-slate-800 text-white text-[9px] font-bold px-2 py-0.5 rounded uppercase">
                  Vendor (Seller / দাতা)
                </span>
                <p className="font-bold text-slate-900 text-[12px] mt-1.5">{data.summaryOfDeed.vendorName}</p>
                <p className="text-slate-600 text-[10px]">Father: {data.summaryOfDeed.vendorFather}</p>
                <p className="text-slate-600 text-[10px]">Address: {data.summaryOfDeed.vendorAddress}</p>
              </div>

              <div className="border border-slate-300 p-2.5 rounded bg-slate-50">
                <span className="bg-slate-800 text-white text-[9px] font-bold px-2 py-0.5 rounded uppercase">
                  Vendee (Purchaser / গ্রহীতা)
                </span>
                <p className="font-bold text-slate-900 text-[12px] mt-1.5">{data.summaryOfDeed.vendeeName}</p>
                <p className="text-slate-600 text-[10px]">Father: {data.summaryOfDeed.vendeeFather}</p>
                <p className="text-slate-600 text-[10px]">Address: {data.summaryOfDeed.vendeeAddress}</p>
              </div>
            </div>

            {/* Schedule of Land Property */}
            <div className="mb-4">
              <h3 className="font-sans font-bold text-[11px] uppercase bg-slate-100 p-1.5 border border-slate-300 border-b-0 text-slate-800">
                Schedule of Transferred Land (তফসিল জমি)
              </h3>
              <table className="w-full border-collapse border border-slate-300 font-sans text-[11px]">
                <tbody>
                  <tr className="border-b border-slate-200">
                    <td className="w-1/3 py-2 px-3 bg-slate-50 font-bold text-slate-700">Mouza & J.L. No</td>
                    <td className="py-2 px-3 text-slate-900">
                      Mouza: <strong>{data.summaryOfDeed.mouza}</strong>, J.L. No: <strong>{data.summaryOfDeed.jlNo}</strong>
                    </td>
                  </tr>
                  <tr className="border-b border-slate-200">
                    <td className="py-2 px-3 bg-slate-50 font-bold text-slate-700">Khatian & Plot (Dag)</td>
                    <td className="py-2 px-3 text-slate-900">
                      B.S. Khatian No: <strong>{data.summaryOfDeed.khatianBs}</strong>, B.S. Plot No: <strong>{data.summaryOfDeed.plotBs}</strong>
                    </td>
                  </tr>
                  <tr className="border-b border-slate-200">
                    <td className="py-2 px-3 bg-slate-50 font-bold text-slate-700">Classification of Land</td>
                    <td className="py-2 px-3 text-slate-900">{data.summaryOfDeed.landClass}</td>
                  </tr>
                  <tr className="border-b border-slate-200">
                    <td className="py-2 px-3 bg-slate-50 font-bold text-slate-700">Transferred Area</td>
                    <td className="py-2 px-3 text-slate-900 font-bold text-emerald-950">
                      {data.summaryOfDeed.transferredArea}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 bg-slate-50 font-bold text-slate-700">Total Consideration Price</td>
                    <td className="py-2 px-3 text-slate-900 font-bold">
                      BDT {formatBdt(data.summaryOfDeed.totalConsiderationBdt)}{' '}
                      <span className="text-slate-600 font-normal italic text-[10px]">
                        (Taka {numberToWordsBangladeshi(data.summaryOfDeed.totalConsiderationBdt)} only)
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Boundary Description (Chouhaddi) */}
            <div className="mb-4">
              <h3 className="font-sans font-bold text-[11px] uppercase bg-slate-100 p-1.5 border border-slate-300 border-b-0 text-slate-800">
                Boundaries of the Property (চৌহদ্দীর বিবরণ)
              </h3>
              <div className="grid grid-cols-2 gap-2 border border-slate-300 p-3 rounded-b font-sans text-[11px] bg-slate-50">
                <div>
                  <span className="font-bold text-slate-700">North (উত্তর):</span> {data.summaryOfDeed.boundaryNorth}
                </div>
                <div>
                  <span className="font-bold text-slate-700">South (দক্ষিণ):</span> {data.summaryOfDeed.boundarySouth}
                </div>
                <div>
                  <span className="font-bold text-slate-700">East (পূর্ব):</span> {data.summaryOfDeed.boundaryEast}
                </div>
                <div>
                  <span className="font-bold text-slate-700">West (পশ্চিম):</span> {data.summaryOfDeed.boundaryWest}
                </div>
              </div>
            </div>

            {/* Official Certification Statement */}
            <div className="border border-slate-300 p-3 rounded bg-slate-50 text-[10px] font-sans leading-relaxed text-slate-700 italic">
              <strong className="text-slate-900 not-italic block mb-0.5">Notarial Translation Attestation:</strong>
              {data.summaryOfDeed.certifiedStatement}
            </div>
          </div>

          {/* Seals and Signatures */}
          <div className="pt-6 border-t border-slate-300 font-sans text-xs flex justify-between items-end">
            <div className="w-24 h-24 border-2 border-dashed border-slate-400 rounded-full flex flex-col items-center justify-center text-slate-600 text-center p-1 text-[8px] font-bold uppercase rotate-[-6deg]">
              <span>Sub-Registry</span>
              <span className="font-black text-[9px]">Haimchar</span>
              <span>Dist: Chandpur</span>
            </div>
            <div className="text-right">
              <div className="inline-block border-t border-slate-400 pt-1 text-center min-w-[200px]">
                <p className="font-bold text-slate-800">Advocate & Certified Translator</p>
                <p className="text-[10px] text-slate-500">Supreme Court of Bangladesh / Notary Public</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
