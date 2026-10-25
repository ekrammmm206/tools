import React from 'react';
import { PartnershipDeedState } from '../types/partnership';
import {
  formatLegalDate,
  formatTaka,
  getCapitalInWords
} from '../utils/partnershipCalculations';
import { ShieldCheck, FileCheck2, Scale } from 'lucide-react';

interface PartnershipDocumentPreviewProps {
  data: PartnershipDeedState;
  zoom: number;
}

export const PartnershipDocumentPreview: React.FC<PartnershipDocumentPreviewProps> = ({
  data,
  zoom
}) => {
  const { info, party1, party2, witnesses, selectedSubDoc } = data;

  const showPage1 = selectedSubDoc === 'all' || selectedSubDoc === 'parties';
  const showPage2 = selectedSubDoc === 'all' || selectedSubDoc === 'capital';
  const showPage3 = selectedSubDoc === 'all' || selectedSubDoc === 'management' || selectedSubDoc === 'covenants';
  const showPage4 = selectedSubDoc === 'all' || selectedSubDoc === 'dissolution' || selectedSubDoc === 'signatures';

  const dateFormatted = formatLegalDate(info.startDate);
  const totalCapitalNum = (parseFloat(party1.shareAmt) || 0) + (parseFloat(party2.shareAmt) || 0);
  const capitalInWords = getCapitalInWords(totalCapitalNum || info.capitalAmount);

  return (
    <div
      className="flex flex-col items-center gap-8 print:gap-0 print:block"
      style={{
        transform: `scale(${zoom / 100})`,
        transformOrigin: 'top center'
      }}
    >
      {/* PAGE 1: PREAMBLE, PARTIES & BASIC CLAUSES 1-4 */}
      {showPage1 && (
        <section
          aria-label="Partnership Deed Page 1: Preamble and Parties"
          className="a4-page w-[210mm] min-h-[297mm] bg-white p-12 sm:p-14 shadow-2xl relative font-serif text-[12.5px] leading-relaxed text-slate-900 border border-slate-300 print:border-none print:shadow-none print:p-10 print:m-0 print:page-break-after-always flex flex-col justify-between"
        >
          <div>
            {/* Top Notary & Stamp Banner */}
            <div className="border-b-2 border-slate-900 pb-3 mb-6 text-center">
              <div className="flex justify-between items-center text-[10px] uppercase tracking-widest text-slate-500 font-sans mb-1 font-semibold">
                <span>Non-Judicial Stamp Tk. 2000/-</span>
                <span className="flex items-center gap-1 text-slate-700">
                  <Scale className="w-3.5 h-3.5 text-amber-700 inline" />
                  Partnership Act, 1932 (Act IX of 1932)
                </span>
                <span>Notary Public, Dhaka</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold uppercase tracking-wider text-slate-950 font-serif mt-1">
                Deed of Partnership
              </h1>
              <div className="inline-block bg-slate-900 text-white text-[11px] font-sans font-bold px-4 py-0.5 mt-1 tracking-widest rounded-xs">
                {info.firmName}
              </div>
            </div>

            {/* Preamble Date */}
            <p className="text-justify mb-4">
              THIS DEED OF PARTNERSHIP is made and executed on this <strong>{dateFormatted || '1st day of January, 2024'}</strong> at Dhaka, Bangladesh.
            </p>

            {/* Between Parties */}
            <div className="text-center font-bold text-xs uppercase tracking-wider text-slate-800 my-2">
              — BY AND BETWEEN —
            </div>

            {/* First Party */}
            <div className="border border-slate-300 rounded-sm p-3 bg-slate-50/50 mb-3 text-justify text-[12px] leading-normal">
              <p>
                <strong>1. {party1.name}</strong>, Son of: <strong>{party1.father}</strong>, Mother: <strong>{party1.mother}</strong>, of {party1.address}. Date of Birth: <strong>{party1.dob}</strong>, National ID No.: <strong>{party1.nid}</strong>, e-TIN: <strong>{party1.tin}</strong>, Profession: {party1.profession}, Nationality: {party1.nationality}, Religion: Islam.
              </p>
              <div className="text-right font-bold text-[11px] text-blue-900 mt-1 uppercase">
                ... FIRST PARTY / {party1.role}
              </div>
            </div>

            <div className="text-center font-bold text-[11px] uppercase tracking-widest text-slate-500 my-1">
              AND
            </div>

            {/* Second Party */}
            <div className="border border-slate-300 rounded-sm p-3 bg-slate-50/50 mb-4 text-justify text-[12px] leading-normal">
              <p>
                <strong>2. {party2.name}</strong>, Son of: <strong>{party2.father}</strong>, Mother: <strong>{party2.mother}</strong>, of {party2.address}. Date of Birth: <strong>{party2.dob}</strong>, National ID No.: <strong>{party2.nid}</strong>, e-TIN: <strong>{party2.tin}</strong>, Profession: {party2.profession}, Nationality: {party2.nationality}, Religion: Islam.
              </p>
              <div className="text-right font-bold text-[11px] text-emerald-900 mt-1 uppercase">
                ... SECOND PARTY / {party2.role}
              </div>
            </div>

            {/* Whereas recital */}
            <div className="space-y-2 text-justify mb-4 text-[12px]">
              <p>
                <strong>WHEREAS</strong> both parties are lawful citizens of Bangladesh, possessing sound mind and full legal capacity, and have mutually agreed to establish, own, and conduct business in partnership on terms and covenants hereafter recorded;
              </p>
              <p>
                <strong>AND WHEREAS</strong> the parties deem it expedient and necessary to reduce the terms and conditions of their partnership business into writing to avoid future misunderstanding or ambiguity.
              </p>
              <p className="font-semibold text-center italic text-slate-800 my-2">
                NOW THIS INDENTURE WITNESSETH AND IT IS HEREBY MUTUALLY AGREED BY AND BETWEEN THE PARTIES AS FOLLOWS:
              </p>
            </div>

            {/* Initial Statutory Clauses 1 to 4 */}
            <div className="space-y-2.5 text-justify text-[12px]">
              <p>
                <strong>1. NAME OF THE FIRM:</strong> The name and style of the partnership firm shall be <strong>"{info.firmName}"</strong>. Any change or addition in the firm name shall only be made with the written consent of all partners.
              </p>
              <p>
                <strong>2. PRINCIPAL PLACE OF BUSINESS:</strong> The principal place of business of the firm shall be situated at <strong>{info.regAddress}</strong>. The firm may open branch offices, factories, buying houses, or depots at any other location within or outside Bangladesh upon unanimous agreement.
              </p>
              <p>
                <strong>3. NATURE & SCOPE OF BUSINESS:</strong> {info.businessScope1} {info.businessScope2}
              </p>
              <p>
                <strong>4. COMMENCEMENT & DURATION:</strong> The partnership business shall commence or be deemed to have commenced from <strong>{dateFormatted}</strong> and the duration of the partnership shall be <strong>"AT WILL"</strong> subject to the provisions of the Partnership Act, 1932.
              </p>
            </div>
          </div>

          {/* Page Footer */}
          <div className="pt-3 border-t border-slate-300 flex justify-between text-[10px] text-slate-500 font-sans">
            <span>{info.firmName} — Deed of Partnership</span>
            <span>Page 1 of 4</span>
          </div>
        </section>
      )}

      {/* PAGE 2: CAPITAL, PROFIT/LOSS, BANK, AND CLAUSES 5-11 */}
      {showPage2 && (
        <section
          aria-label="Partnership Deed Page 2: Capital and Financial Terms"
          className="a4-page w-[210mm] min-h-[297mm] bg-white p-12 sm:p-14 shadow-2xl relative font-serif text-[12.5px] leading-relaxed text-slate-900 border border-slate-300 print:border-none print:shadow-none print:p-10 print:m-0 print:page-break-after-always flex flex-col justify-between"
        >
          <div>
            {/* Running Header */}
            <div className="border-b border-slate-300 pb-1.5 mb-4 flex justify-between text-[10px] text-slate-600 font-sans uppercase">
              <span className="font-semibold">{info.firmName} • Deed of Partnership</span>
              <span>Under Partnership Act, 1932</span>
            </div>

            {/* Clauses 5 to 11 */}
            <div className="space-y-3.5 text-justify text-[12px]">
              {/* Clause 5: Capital */}
              <div>
                <p>
                  <strong>5. INITIAL CAPITAL & CONTRIBUTION:</strong> The initial capital of the partnership firm is fixed at <strong>BDT {formatTaka(totalCapitalNum || info.capitalAmount)}/- ({capitalInWords})</strong> which is contributed and subscribed by the partners in the following ratio:
                </p>

                {/* Capital Breakdown Table */}
                <table className="w-full border-collapse border border-slate-400 my-2 text-center text-[11px] font-sans">
                  <thead>
                    <tr className="bg-slate-100 font-bold text-slate-800">
                      <th className="border border-slate-400 p-1.5 w-10">Sl.</th>
                      <th className="border border-slate-400 p-1.5 text-left">Partner Name</th>
                      <th className="border border-slate-400 p-1.5">Designation</th>
                      <th className="border border-slate-400 p-1.5">Capital Amount (BDT)</th>
                      <th className="border border-slate-400 p-1.5 w-20">Share Ratio</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-slate-400 p-1.5 font-mono">01</td>
                      <td className="border border-slate-400 p-1.5 text-left font-semibold">{party1.name}</td>
                      <td className="border border-slate-400 p-1.5 text-blue-800 font-medium">{party1.role}</td>
                      <td className="border border-slate-400 p-1.5 font-mono">TK. {formatTaka(party1.shareAmt)}/-</td>
                      <td className="border border-slate-400 p-1.5 font-bold">{party1.sharePct}%</td>
                    </tr>
                    <tr>
                      <td className="border border-slate-400 p-1.5 font-mono">02</td>
                      <td className="border border-slate-400 p-1.5 text-left font-semibold">{party2.name}</td>
                      <td className="border border-slate-400 p-1.5 text-emerald-800 font-medium">{party2.role}</td>
                      <td className="border border-slate-400 p-1.5 font-mono">TK. {formatTaka(party2.shareAmt)}/-</td>
                      <td className="border border-slate-400 p-1.5 font-bold">{party2.sharePct}%</td>
                    </tr>
                    <tr className="bg-slate-50 font-bold text-slate-900">
                      <td className="border border-slate-400 p-1.5 text-right pr-3" colSpan={3}>
                        TOTAL DECLARED CAPITAL:
                      </td>
                      <td className="border border-slate-400 p-1.5 font-mono">
                        TK. {formatTaka(totalCapitalNum)}/-
                      </td>
                      <td className="border border-slate-400 p-1.5 font-bold">100%</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p>
                <strong>6. ADDITIONAL CAPITAL & ADVANCES:</strong> If at any time additional capital is required for the expansion, working capital, or operations of the firm, such capital or temporary loan shall be advanced by the partners in equal proportions or as mutually agreed, and may carry simple commercial interest as formally documented in writing.
              </p>

              <p>
                <strong>7. PROFIT & LOSS SHARING:</strong> The net profit of the partnership business (after deduction of all rents, salaries, taxes, utilities, operational overheads, and depreciation) shall be divided and shared between the partners, and all losses shall likewise be borne and paid by them, in exact proportion to their capital share (i.e., <strong>{party1.sharePct}%</strong> to the First Party and <strong>{party2.sharePct}%</strong> to the Second Party).
              </p>

              <p>
                <strong>8. BANK ACCOUNT OPERATIONS:</strong> All bank accounts (Current, Savings, SND, or Foreign Currency) of the firm shall be opened in scheduled commercial banks in Bangladesh in the registered name of the firm. All cheques, drafts, bills of exchange, and banking instructions shall be signed and operated <strong>jointly by both partners</strong> or by the <strong>Managing Partner</strong> upon written resolution of the partners.
              </p>

              <p>
                <strong>9. BORROWING POWERS:</strong> Neither partner shall without the prior written consent of the other partner borrow any money, apply for loans, credit limits, or mortgages, or pledge the credit, property, or goods of the firm.
              </p>

              <p>
                <strong>10. BOOKS OF ACCOUNTS & RECORDS:</strong> Regular, proper, and statutory books of accounts, digital databases, ledgers, inventory registers, and vouchers shall be kept and maintained at the principal place of business. Each partner shall at all reasonable times have free access to inspect, examine, and take copies of the same.
              </p>

              <p>
                <strong>11. FINANCIAL YEAR & ANNUAL AUDIT:</strong> The accounting year of the firm shall be from <strong>{info.financialYear}</strong>. At the close of each financial year, a general balance sheet and profit and loss statement shall be drawn up and audited by an independent Chartered Accountant if required by law or decided by the partners.
              </p>
            </div>
          </div>

          {/* Page Footer */}
          <div className="pt-3 border-t border-slate-300 flex justify-between text-[10px] text-slate-500 font-sans">
            <span>{info.firmName} — Deed of Partnership</span>
            <span>Page 2 of 4</span>
          </div>
        </section>
      )}

      {/* PAGE 3: MANAGEMENT, DUTIES, RESTRICTIONS, RETIREMENT, AND CLAUSES 12-20 */}
      {showPage3 && (
        <section
          aria-label="Partnership Deed Page 3: Management, Duties, and Covenants"
          className="a4-page w-[210mm] min-h-[297mm] bg-white p-12 sm:p-14 shadow-2xl relative font-serif text-[12.5px] leading-relaxed text-slate-900 border border-slate-300 print:border-none print:shadow-none print:p-10 print:m-0 print:page-break-after-always flex flex-col justify-between"
        >
          <div>
            {/* Running Header */}
            <div className="border-b border-slate-300 pb-1.5 mb-4 flex justify-between text-[10px] text-slate-600 font-sans uppercase">
              <span className="font-semibold">{info.firmName} • Deed of Partnership</span>
              <span>Under Partnership Act, 1932</span>
            </div>

            {/* Clauses 12 to 20 */}
            <div className="space-y-3 text-justify text-[12px]">
              <p>
                <strong>12. APPOINTMENT & POWERS OF MANAGING PARTNER:</strong> <strong>{party1.name}</strong> shall be the first <strong>MANAGING PARTNER</strong> of the firm. The Managing Partner is expressly authorized to manage day-to-day business operations, represent the firm before government agencies (RJSC, National Board of Revenue, VAT, Customs, City Corporation, EPB, BGMEA/BKMEA), sign commercial contracts, procure orders, hire and dismiss staff, and execute standard business instruments, subject always to the general supervision and policy consensus of both partners.
              </p>

              <p>
                <strong>13. DUTIES OF PARTNERS:</strong> Each partner shall:
                <br />
                (a) Be just, faithful, and transparent to the other in all transactions relating to the firm;
                <br />
                (b) Render true accounts and full information of all things affecting the firm;
                <br />
                (c) Devote their earnest time, skill, and attention to the conduct and promotion of the firm's business;
                <br />
                (d) Indemnify the firm against any loss occasioned by their willful fraud, gross misconduct, or unauthorized acts.
              </p>

              <p>
                <strong>14. RESTRICTIONS ON PARTNERS' POWERS:</strong> No partner shall, without the written consent of the other:
                <br />
                (a) Assign, mortgage, transfer, or charge their interest or share in the firm;
                <br />
                (b) Engage directly or indirectly in any other business or venture of identical or competing nature;
                <br />
                (c) Compound, release, or discharge any debt or liability due to the firm without receiving full payment;
                <br />
                (d) Stand as guarantor, surety, or bail for any third party using the firm's name, assets, or letterhead.
              </p>

              <p>
                <strong>15. ADMISSION OF NEW PARTNERS:</strong> No person shall be introduced or admitted as a new partner into the firm without the explicit, written, and unanimous consent of both existing partners.
              </p>

              <p>
                <strong>16. RETIREMENT OR RESIGNATION:</strong> If any partner desires to retire from the firm, they shall give not less than <strong>three (3) calendar months'</strong> written notice of their intention to the other partner. The continuing partner shall have the first right and option to purchase the retiring partner's share at fair valuation.
              </p>

              <p>
                <strong>17. EXPULSION OF A PARTNER:</strong> A partner may be expelled from the firm only on grounds of persistent breach of these covenants, gross breach of trust, declaration of insolvency, criminal conviction for moral turpitude, or actions gravely detrimental to the firm's existence.
              </p>

              <p>
                <strong>18. DEATH OR INCAPACITY:</strong> The partnership shall <strong>NOT</strong> stand automatically dissolved by reason of the death, lunacy, or permanent incapacity of any partner. The surviving partner may, upon mutual agreement with legal heirs, either admit the designated nominee/legal heir as a partner or settle the deceased partner's capital account within six (6) months.
              </p>

              <p>
                <strong>19. VALUATION OF GOODWILL & ASSETS:</strong> In the event of retirement, death, or dissolution, goodwill of the firm shall be calculated fairly based on average net earnings of the preceding three financial years.
              </p>

              <p>
                <strong>20. DISSOLUTION:</strong> The partnership may be dissolved at any time by mutual written agreement of all partners or pursuant to the relevant provisions of the Partnership Act, 1932.
              </p>
            </div>
          </div>

          {/* Page Footer */}
          <div className="pt-3 border-t border-slate-300 flex justify-between text-[10px] text-slate-500 font-sans">
            <span>{info.firmName} — Deed of Partnership</span>
            <span>Page 3 of 4</span>
          </div>
        </section>
      )}

      {/* PAGE 4: ARBITRATION, SETTLEMENT, EXECUTION, SIGNATURES & WITNESSES */}
      {showPage4 && (
        <section
          aria-label="Partnership Deed Page 4: Arbitration, Signatures, and Notary Certification"
          className="a4-page w-[210mm] min-h-[297mm] bg-white p-12 sm:p-14 shadow-2xl relative font-serif text-[12.5px] leading-relaxed text-slate-900 border border-slate-300 print:border-none print:shadow-none print:p-10 print:m-0 flex flex-col justify-between"
        >
          <div>
            {/* Running Header */}
            <div className="border-b border-slate-300 pb-1.5 mb-4 flex justify-between text-[10px] text-slate-600 font-sans uppercase">
              <span className="font-semibold">{info.firmName} • Deed of Partnership</span>
              <span>Under Partnership Act, 1932</span>
            </div>

            {/* Clauses 21 to 25 */}
            <div className="space-y-3 text-justify text-[12px] mb-6">
              <p>
                <strong>21. SETTLEMENT OF ACCOUNTS UPON DISSOLUTION:</strong> Upon dissolution of the firm, the assets and properties of the firm shall be realized and applied strictly in accordance with <strong>Section 48 of the Partnership Act, 1932</strong>:
                <br />
                (a) First, in payment of debts and liabilities of the firm to third parties;
                <br />
                (b) Secondly, in payment to each partner rateably of what is due for advances as distinguished from capital;
                <br />
                (c) Thirdly, in payment to each partner rateably of what is due to them on account of capital; and
                <br />
                (d) Lastly, the residual surplus, if any, shall be divided among the partners in proportion to their profit-sharing ratio.
              </p>

              <p>
                <strong>22. DISPUTE RESOLUTION & ARBITRATION:</strong> All disputes, differences, claims, or questions of interpretation arising between the partners or their representatives touching this deed or business operations shall be referred to arbitration in Dhaka, Bangladesh under the provisions of the <strong>Arbitration Act, 2001 (Act I of 2001)</strong>. The arbitral award shall be final and binding on both parties.
              </p>

              <p>
                <strong>23. AMENDMENT OF TERMS:</strong> No alteration, modification, variance, or addition to the terms and conditions of this Deed shall have any effect unless made in writing and signed by both partners.
              </p>

              <p>
                <strong>24. CONVERSION TO LIMITED COMPANY:</strong> The partners reserve the option and right, upon substantial business growth, to convert this partnership firm into a Private Limited Company under the Companies Act, 1994, with shareholding proportionate to their equity contribution herein.
              </p>

              <p>
                <strong>25. GOVERNING LAW & JURISDICTION:</strong> This Deed shall in all respects be governed by and construed in accordance with the laws of the People's Republic of Bangladesh, specifically the <strong>Partnership Act, 1932 (Act IX of 1932)</strong>, and the Courts at Dhaka shall have exclusive jurisdiction.
              </p>
            </div>

            {/* In Witness Whereof */}
            <p className="text-justify font-semibold text-[12px] mb-6">
              IN WITNESS WHEREOF the parties hereto have set and subscribed their respective hands, signatures, and seals to this DEED OF PARTNERSHIP on the day, month, and year first above written.
            </p>

            {/* Partner Signatures Block */}
            <div className="grid grid-cols-2 gap-8 my-6 pt-4 border-t border-slate-300">
              <div className="text-center">
                <div className="h-14 border-b-2 border-slate-700 mx-4 flex items-end justify-center pb-1">
                  <span className="font-serif italic text-blue-900 text-sm font-bold tracking-wider">
                    {party1.name}
                  </span>
                </div>
                <p className="mt-2 font-bold text-xs text-slate-900">{party1.name}</p>
                <p className="text-[11px] text-blue-800 font-semibold uppercase">{party1.role}</p>
                <p className="text-[10px] text-slate-500 font-sans">First Party / NID: {party1.nid}</p>
              </div>

              <div className="text-center">
                <div className="h-14 border-b-2 border-slate-700 mx-4 flex items-end justify-center pb-1">
                  <span className="font-serif italic text-emerald-900 text-sm font-bold tracking-wider">
                    {party2.name}
                  </span>
                </div>
                <p className="mt-2 font-bold text-xs text-slate-900">{party2.name}</p>
                <p className="text-[11px] text-emerald-800 font-semibold uppercase">{party2.role}</p>
                <p className="text-[10px] text-slate-500 font-sans">Second Party / NID: {party2.nid}</p>
              </div>
            </div>

            {/* Witnesses & Notary Attestation */}
            <div className="grid grid-cols-2 gap-6 pt-4 border-t border-slate-300 text-[11px]">
              {/* Witnesses */}
              <div>
                <h4 className="font-bold uppercase text-[11px] text-slate-800 mb-2 border-b border-slate-200 pb-0.5">
                  In the Presence of Witnesses:
                </h4>
                <div className="space-y-3 font-sans">
                  {witnesses.map((w, idx) => (
                    <div key={w.id} className="border-l-2 border-slate-400 pl-2">
                      <p className="font-bold text-slate-900">
                        {idx + 1}. {w.name}
                      </p>
                      <p className="text-slate-600 text-[10px]">Father: {w.father}</p>
                      <p className="text-slate-600 text-[10px]">{w.address}</p>
                      <p className="text-slate-600 text-[10px]">
                        NID: {w.nid} • Cell: {w.phone}
                      </p>
                      <div className="mt-1 text-[10px] italic text-slate-500">
                        Signature: _______________________
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Notary Public Attestation Seal */}
              <div className="border border-slate-400 bg-amber-50/40 p-3 rounded-xs font-sans text-[10px] flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-amber-900 text-[11px] border-b border-amber-300 pb-1 mb-2">
                    <ShieldCheck className="w-4 h-4 text-amber-800" />
                    <span>Attestation by Notary Public</span>
                  </div>
                  <p className="text-slate-700 leading-normal mb-1">
                    Solemnly affirmed and declared before me on this day by the above-named executants who are identified by the respective Advocate and signed this Deed of Partnership in my presence.
                  </p>
                  <p className="font-semibold text-slate-900 mt-2">
                    Identified by: Advocate, Supreme Court of Bangladesh
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-dashed border-amber-300 text-center">
                  <div className="inline-block border border-slate-700 px-3 py-1 bg-white font-mono text-[9px] uppercase tracking-wider text-slate-800 mb-1">
                    GOVT. OF BANGLADESH NOTARY REG. NO: 4892/2024
                  </div>
                  <p className="font-bold text-[10px] text-slate-900 uppercase">
                    Notary Public, Dhaka, Bangladesh
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Page Footer */}
          <div className="pt-3 border-t border-slate-300 flex justify-between text-[10px] text-slate-500 font-sans">
            <span>{info.firmName} — Deed of Partnership</span>
            <span>Page 4 of 4 (Final Execution)</span>
          </div>
        </section>
      )}
    </div>
  );
};
