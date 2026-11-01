import React from 'react';
import { PartnershipReconState } from '../types/partnershipRecon';
import {
  formatTakaCommas,
  toBengaliNumeral
} from '../utils/partnershipReconCalculations';
import { StatutoryLang, t, formatStatutoryNumeral } from '../utils/statutoryTranslations';
import { Scale, ShieldCheck, FileText, CheckCircle2 } from 'lucide-react';

interface PartnershipReconDocumentPreviewProps {
  data: PartnershipReconState;
  zoom: number;
  docLang?: StatutoryLang;
}

export const PartnershipReconDocumentPreview: React.FC<PartnershipReconDocumentPreviewProps> = ({
  data,
  zoom,
  docLang = 'en'
}) => {
  const {
    firm,
    partner1,
    partner2,
    outgoing,
    incoming,
    representative,
    meeting,
    selectedSubDoc
  } = data;

  const showAll = selectedSubDoc === 'all';
  const showNotice = showAll || selectedSubDoc === 'notice';
  const showMinutes = showAll || selectedSubDoc === 'minutes';
  const showResignation = showAll || selectedSubDoc === 'resignation';
  const showAffidavit = showAll || selectedSubDoc === 'affidavit';
  const showFormV = showAll || selectedSubDoc === 'formV';
  const showForwarding = showAll || selectedSubDoc === 'forwarding';
  const showPublicNotice = showAll || selectedSubDoc === 'publicNotice';
  const showGazette = showAll || selectedSubDoc === 'gazette';

  return (
    <div
      className="flex flex-col items-center gap-8 print:gap-0 print:block"
      style={{
        transform: `scale(${zoom / 100})`,
        transformOrigin: 'top center'
      }}
    >
      {/* ================= DOC 1: NOTICE OF EXTRAORDINARY MEETING ================= */}
      {showNotice && (
        <section
          aria-label="Partnership Reconstitution - Notice of Extraordinary Meeting"
          className="a4-page w-[210mm] min-h-[297mm] bg-white p-12 sm:p-14 shadow-2xl relative font-serif text-[13px] leading-relaxed text-slate-900 border border-slate-300 print:border-none print:shadow-none print:p-10 print:m-0 print:page-break-after-always flex flex-col justify-between"
        >
          <div>
            {/* Header */}
            <div className="border-b-2 border-slate-900 pb-3 mb-6 text-center">
              <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-wide text-slate-950 font-serif">
                {firm.firmName}
              </h2>
              <p className="text-[11px] text-slate-600 font-sans mt-0.5">
                {t('doc.regOffice', docLang)} {firm.regAddress}
              </p>
              <div className="flex justify-center items-center gap-3 text-[10px] uppercase tracking-widest text-slate-500 font-sans mt-1">
                <span>{t('doc.regNo', docLang)} {docLang === 'bn' ? toBengaliNumeral(firm.regNo) : firm.regNo}</span>
                <span>•</span>
                <span>{t('doc.regDate', docLang)} {docLang === 'bn' ? toBengaliNumeral(firm.regDate) : firm.regDate}</span>
              </div>
            </div>

            <div className="text-center my-4">
              <h3 className="text-base sm:text-lg font-bold uppercase underline tracking-wider text-slate-900">
                {t('recon.noticeTitle', docLang)}
              </h3>
              {docLang === 'bn' && (
                <p className="text-xs text-slate-600 font-sans mt-1">
                  [অংশীদারী আইন, ১৯৩২-এর অধীনে সংবিধিবদ্ধ নোটিশ]
                </p>
              )}
            </div>

            <p className="text-justify mb-4">
              Notice is hereby given that an Extraordinary General Meeting of the Partners of <strong>{firm.firmName}</strong> will be held on <strong>{docLang === 'bn' ? toBengaliNumeral(meeting.meetDate) : meeting.meetDate}</strong> at the Registered Office of the firm ({firm.regAddress}) to discuss and consider the following special agenda:
            </p>

            <h4 className="font-bold text-sm text-slate-900 mb-2 underline">
              {t('recon.noticeAgenda', docLang)}
            </h4>

            <div className="space-y-3 text-justify pl-2">
              <p>
                <strong>1. Confirmation of Minutes:</strong> To confirm and approve the minutes of the previous meeting of the partners.
              </p>

              <div>
                <p>
                  <strong>2. Admission of New Partner:</strong> To consider and approve the admission of <strong>{incoming.name}</strong> as a new Partner of the firm, subject to the applicable terms, conditions, and contribution covenants.
                </p>
                <div className="mt-2 bg-slate-50 p-3 border border-slate-200 rounded text-[12px] leading-normal space-y-1">
                  <p className="font-semibold text-slate-800 underline">{t('recon.incomingParticulars', docLang)}</p>
                  <p><strong>{t('doc.name', docLang)}:</strong> {incoming.name}</p>
                  <p><strong>{t('doc.father', docLang)}</strong> {incoming.father} &nbsp;&nbsp;|&nbsp;&nbsp; <strong>{t('doc.mother', docLang)}</strong> {incoming.mother}</p>
                  <p><strong>{t('doc.presentAddress', docLang)}</strong> {incoming.address}</p>
                  <p><strong>{t('doc.permanentAddress', docLang)}</strong> Same as present address</p>
                  <p><strong>{t('doc.occupation', docLang)}</strong> {incoming.occupation} &nbsp;&nbsp;|&nbsp;&nbsp; <strong>{t('doc.religion', docLang)}</strong> {incoming.religion} &nbsp;&nbsp;|&nbsp;&nbsp; <strong>{t('doc.nationality', docLang)}</strong> {incoming.nationality}</p>
                  <p><strong>{t('doc.dob', docLang)}</strong> {docLang === 'bn' ? toBengaliNumeral(incoming.dob) : incoming.dob} &nbsp;&nbsp;|&nbsp;&nbsp; <strong>{t('doc.nid', docLang)}</strong> {docLang === 'bn' ? toBengaliNumeral(incoming.nid) : incoming.nid}</p>
                  <p><strong>{t('doc.tin', docLang)}</strong> {docLang === 'bn' ? toBengaliNumeral(incoming.tin) : incoming.tin} &nbsp;&nbsp;|&nbsp;&nbsp; <strong>{t('doc.mobile', docLang)}</strong> {docLang === 'bn' ? toBengaliNumeral(incoming.mobile) : incoming.mobile}</p>
                </div>
              </div>

              <p>
                <strong>3. Transfer of Share & Resignation:</strong> To consider and approve the transfer of the partnership interest and share capital held by Ms. <strong>{outgoing.name}</strong> ({outgoing.shareAmt} / {outgoing.sharePct}) to <strong>{incoming.name}</strong>, and to consider and accept her formal resignation from the firm.
              </p>

              <p>
                <strong>4. Execution of Reconstitution Deed:</strong> To consider, approve, and execute the Reconstitution of Partnership Deed incorporating the above changes, and authorize statutory filings with the Registrar of Joint Stock Companies & Firms (RJSC), Dhaka.
              </p>
            </div>

            <p className="mt-6 text-justify">
              All Partners are requested to kindly attend the meeting on the stipulated date and time to deliberate and resolve upon the aforesaid agenda.
            </p>
          </div>

          <div className="pt-8 border-t border-slate-300 flex justify-between items-end">
            <div className="text-[11px] text-slate-600">
              <p>Date: {meeting.noticeDate || '05 April 2025'}</p>
              <p>Place: Dhaka, Bangladesh</p>
            </div>
            <div className="text-right">
              <p className="text-[11px] italic text-slate-500 mb-6">By Order of the Partners,</p>
              <p className="font-bold text-sm text-slate-900">{partner1.name}</p>
              <p className="text-xs text-blue-900 font-semibold">{partner1.role}</p>
              <p className="text-[11px] text-slate-600">{firm.firmName}</p>
            </div>
          </div>
        </section>
      )}

      {/* ================= MINUTES PAGE 1 ================= */}
      {showMinutes && (
        <section
          aria-label="Partnership Reconstitution - Minutes of Meeting Page 1"
          className="a4-page w-[210mm] min-h-[297mm] bg-white p-12 sm:p-14 shadow-2xl relative font-serif text-[13px] leading-relaxed text-slate-900 border border-slate-300 print:border-none print:shadow-none print:p-10 print:m-0 print:page-break-after-always flex flex-col justify-between"
        >
          <div>
            <div className="border-b border-slate-300 pb-2 mb-4 text-center">
              <h2 className="text-lg sm:text-xl font-bold uppercase text-slate-950 font-serif">
                {firm.firmName}
              </h2>
              <p className="text-xs text-slate-600 font-sans">
                Registered Office: {firm.regAddress}
              </p>
              <h3 className="text-sm sm:text-base font-bold uppercase underline tracking-wider text-slate-900 mt-2">
                {t('recon.minutesTitle', docLang)}
              </h3>
              <p className="text-[11px] text-slate-600 font-sans">
                Held on {docLang === 'bn' ? toBengaliNumeral(meeting.meetDate) : meeting.meetDate} at the Registered Office of the Firm
              </p>
            </div>

            <h4 className="font-bold text-sm text-slate-900 mb-2">
              {docLang === 'bn' ? '১. অংশীদারগণের উপস্থিতি' : '1. Attendance of Partners'}
            </h4>
            <p className="text-justify mb-3">
              {docLang === 'bn' ? 'অংশীদারগণের বিশেষ সাধারণ সভায় নিম্নবর্ণিত অংশীদারগণ উপস্থিত ছিলেন:' : 'The following partners were present at the meeting:'}
            </p>

            <table className="w-full border-collapse border border-slate-400 mb-6 text-[12px] font-sans">
              <thead>
                <tr className="bg-slate-100 font-bold text-slate-800">
                  <th className="border border-slate-400 p-2 w-16 text-center">{t('doc.sl', docLang)}</th>
                  <th className="border border-slate-400 p-2 text-left">{docLang === 'bn' ? 'অংশীদারের নাম' : 'Name of Partner'}</th>
                  <th className="border border-slate-400 p-2 text-center w-36">{docLang === 'bn' ? 'পদবী / অবস্থান' : 'Designation'}</th>
                  <th className="border border-slate-400 p-2 text-center w-40">{t('doc.signature', docLang)}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-slate-400 p-2 text-center font-mono">1</td>
                  <td className="border border-slate-400 p-2 font-bold text-slate-900">{partner1.name}</td>
                  <td className="border border-slate-400 p-2 text-center font-medium text-blue-900">{partner1.role}</td>
                  <td className="border border-slate-400 p-2 text-center font-serif italic text-blue-900">{partner1.name}</td>
                </tr>
                <tr>
                  <td className="border border-slate-400 p-2 text-center font-mono">2</td>
                  <td className="border border-slate-400 p-2 font-bold text-slate-900">{outgoing.name}</td>
                  <td className="border border-slate-400 p-2 text-center font-medium text-amber-900">Partner (Outgoing)</td>
                  <td className="border border-slate-400 p-2 text-center font-serif italic text-amber-900">{outgoing.name}</td>
                </tr>
                <tr>
                  <td className="border border-slate-400 p-2 text-center font-mono">3</td>
                  <td className="border border-slate-400 p-2 font-bold text-slate-900">{partner2.name}</td>
                  <td className="border border-slate-400 p-2 text-center font-medium text-emerald-900">Partner</td>
                  <td className="border border-slate-400 p-2 text-center font-serif italic text-emerald-900">{partner2.name}</td>
                </tr>
              </tbody>
            </table>

            <h4 className="font-bold text-sm text-slate-900 mb-1">2. Chairmanship and Quorum</h4>
            <p className="text-justify mb-2">
              <strong>{partner1.name}</strong>, Managing Partner of the firm, presided over the meeting as Chairman.
            </p>
            <p className="text-justify mb-4">
              The Chairman confirmed that all three existing partners were present in person, constituting a full and valid quorum pursuant to the Partnership Agreement and the Partnership Act, 1932, and called the meeting to order.
            </p>

            <h4 className="font-bold text-sm text-slate-900 mb-2">3. Resolutions and Decisions</h4>

            <div className="space-y-3 text-justify">
              <div>
                <p className="font-bold text-slate-900">
                  Agenda 1: Confirmation of the Minutes of the Previous Meeting
                </p>
                <p>
                  "<strong>RESOLVED THAT</strong> the minutes and proceedings of the previous meeting of the Partners, having been placed before the meeting and reviewed by the Partners, be and are hereby confirmed and approved as a true and correct record."
                </p>
              </div>

              <div>
                <p className="font-bold text-slate-900">
                  Agenda 2: Admission of a New Partner ({incoming.name})
                </p>
                <p>
                  "<strong>RESOLVED THAT</strong> the admission of <strong>{incoming.name}</strong> as a new Partner of the firm <strong>{firm.firmName}</strong> be and is hereby unanimously approved and accepted, subject to the terms and covenants of the Reconstituted Partnership Deed."
                </p>
                <p className="mt-1">
                  The full statutory particulars of the incoming partner are placed on record as follows:
                </p>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-300 flex justify-between text-[10px] text-slate-500 font-sans">
            <span>{firm.firmName} — Minutes of Meeting</span>
            <span>Page 1 of 3</span>
          </div>
        </section>
      )}

      {/* ================= MINUTES PAGE 2 ================= */}
      {showMinutes && (
        <section
          aria-label="Partnership Reconstitution - Minutes of Meeting Page 2"
          className="a4-page w-[210mm] min-h-[297mm] bg-white p-12 sm:p-14 shadow-2xl relative font-serif text-[13px] leading-relaxed text-slate-900 border border-slate-300 print:border-none print:shadow-none print:p-10 print:m-0 print:page-break-after-always flex flex-col justify-between"
        >
          <div>
            <div className="border-b border-slate-300 pb-1.5 mb-4 flex justify-between text-[10px] text-slate-600 font-sans uppercase">
              <span className="font-semibold">{firm.firmName} • Reconstitution Minutes</span>
              <span>Partnership Act 1932</span>
            </div>

            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-800 mb-2">
              Statutory Particulars of Incoming Partner:
            </h4>

            <table className="w-full border-collapse border border-slate-400 mb-6 text-[12px] font-sans">
              <thead>
                <tr className="bg-slate-100 font-bold text-slate-800">
                  <th className="border border-slate-400 p-2 w-1/3 text-left">Particulars</th>
                  <th className="border border-slate-400 p-2 text-left">Details</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-slate-400 p-1.5 font-semibold">Name</td>
                  <td className="border border-slate-400 p-1.5 font-bold text-slate-900">{incoming.name}</td>
                </tr>
                <tr>
                  <td className="border border-slate-400 p-1.5 font-semibold">Father's Name</td>
                  <td className="border border-slate-400 p-1.5">{incoming.father}</td>
                </tr>
                <tr>
                  <td className="border border-slate-400 p-1.5 font-semibold">Mother's Name</td>
                  <td className="border border-slate-400 p-1.5">{incoming.mother}</td>
                </tr>
                <tr>
                  <td className="border border-slate-400 p-1.5 font-semibold">Present Address</td>
                  <td className="border border-slate-400 p-1.5">{incoming.address}</td>
                </tr>
                <tr>
                  <td className="border border-slate-400 p-1.5 font-semibold">Permanent Address</td>
                  <td className="border border-slate-400 p-1.5">Same as Present Address</td>
                </tr>
                <tr>
                  <td className="border border-slate-400 p-1.5 font-semibold">Occupation & Religion</td>
                  <td className="border border-slate-400 p-1.5">{incoming.occupation} &nbsp;|&nbsp; {incoming.religion}</td>
                </tr>
                <tr>
                  <td className="border border-slate-400 p-1.5 font-semibold">Date of Birth</td>
                  <td className="border border-slate-400 p-1.5 font-mono">{incoming.dob}</td>
                </tr>
                <tr>
                  <td className="border border-slate-400 p-1.5 font-semibold">National ID (NID)</td>
                  <td className="border border-slate-400 p-1.5 font-mono font-bold">{incoming.nid}</td>
                </tr>
                <tr>
                  <td className="border border-slate-400 p-1.5 font-semibold">e-TIN No.</td>
                  <td className="border border-slate-400 p-1.5 font-mono">{incoming.tin}</td>
                </tr>
                <tr>
                  <td className="border border-slate-400 p-1.5 font-semibold">Mobile No.</td>
                  <td className="border border-slate-400 p-1.5 font-mono">{incoming.mobile}</td>
                </tr>
                <tr>
                  <td className="border border-slate-400 p-1.5 font-semibold">Nationality</td>
                  <td className="border border-slate-400 p-1.5">{incoming.nationality}</td>
                </tr>
              </tbody>
            </table>

            <div className="space-y-4 text-justify">
              <div>
                <p className="font-bold text-slate-900">
                  Agenda 3: Transfer of Partnership Interest and Resignation of Lina Malek
                </p>
                <p>
                  "<strong>RESOLVED THAT</strong> the proposed transfer of the entire partnership interest and capital contribution of <strong>{outgoing.shareAmt} ({outgoing.sharePct})</strong> held by Ms. <strong>{outgoing.name}</strong> in the firm to <strong>{incoming.name}</strong> be and is hereby approved and accepted in accordance with the agreed terms of transfer and applicable provisions of law."
                </p>
                <p className="mt-1">
                  "<strong>FURTHER RESOLVED THAT</strong> upon completion of the transfer of her entire partnership interest, Ms. <strong>{outgoing.name}</strong> shall cease to be a Partner of <strong>{firm.firmName}</strong> with effect from <strong>{firm.reconDate}</strong>, and her formal resignation from the partnership is hereby officially accepted without any lingering liabilities."
                </p>
              </div>

              <div>
                <p className="font-bold text-slate-900">
                  Agenda 4: Reconstitution of the Partnership Deed & Statutory Filings
                </p>
                <p>
                  "<strong>RESOLVED THAT</strong> the reconstitution of the Partnership Deed of <strong>{firm.firmName}</strong>, incorporating the admission of the new Partner <strong>{incoming.name}</strong>, the transfer of the outgoing Partner's interest, and her subsequent retirement from the firm, be and is hereby unanimously approved."
                </p>
                <p className="mt-1">
                  "<strong>FURTHER RESOLVED THAT</strong> the Managing Partner <strong>{partner1.name}</strong> be and is hereby authorized to arrange for the execution of the reconstituted Partnership Deed, sign Form V, publish necessary gazette/newspaper notifications, and complete all statutory filings with the Registrar of Joint Stock Companies and Firms (RJSC), Dhaka."
                </p>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-300 flex justify-between text-[10px] text-slate-500 font-sans">
            <span>{firm.firmName} — Minutes of Meeting</span>
            <span>Page 2 of 3</span>
          </div>
        </section>
      )}

      {/* ================= MINUTES PAGE 3 ================= */}
      {showMinutes && (
        <section
          aria-label="Partnership Reconstitution - Minutes of Meeting Page 3"
          className="a4-page w-[210mm] min-h-[297mm] bg-white p-12 sm:p-14 shadow-2xl relative font-serif text-[13px] leading-relaxed text-slate-900 border border-slate-300 print:border-none print:shadow-none print:p-10 print:m-0 print:page-break-after-always flex flex-col justify-between"
        >
          <div>
            <div className="border-b border-slate-300 pb-1.5 mb-4 flex justify-between text-[10px] text-slate-600 font-sans uppercase">
              <span className="font-semibold">{firm.firmName} • Reconstitution Minutes</span>
              <span>Partnership Act 1932</span>
            </div>

            <h4 className="font-bold text-sm text-slate-900 mb-2">4. Conclusion of the Meeting</h4>
            <p className="text-justify mb-3">
              There being no further business or agenda to transact, the meeting concluded with a cordial vote of thanks to the Chair.
            </p>
            <p className="text-justify mb-8">
              The above minutes were prepared as a true, authentic, and accurate record of the proceedings, decisions, and unanimous resolutions of the meeting.
            </p>

            {/* Chairman Signature */}
            <div className="my-8">
              <div className="w-56 border-b-2 border-slate-700 pb-1">
                <span className="font-serif italic text-blue-900 font-bold text-base">
                  {partner1.name}
                </span>
              </div>
              <p className="font-bold text-sm text-slate-900 mt-2">{partner1.name}</p>
              <p className="text-xs text-slate-700">Chairman of the Meeting</p>
              <p className="text-xs text-blue-900 font-semibold">{partner1.role}, {firm.firmName}</p>
            </div>

            {/* Confirmation by Partners */}
            <h4 className="font-bold text-sm text-slate-900 mb-2 mt-8">Confirmation by the Partners:</h4>
            <p className="text-[12px] text-slate-600 mb-3">
              We, the undersigned partners, hereby confirm and verify that the above recorded minutes are true and complete:
            </p>

            <table className="w-full border-collapse border border-slate-400 mb-6 text-[12px] font-sans">
              <thead>
                <tr className="bg-slate-100 font-bold text-slate-800">
                  <th className="border border-slate-400 p-2 w-16 text-center">Sl. No.</th>
                  <th className="border border-slate-400 p-2 text-left">Name of Partner</th>
                  <th className="border border-slate-400 p-2 text-center w-36">Status</th>
                  <th className="border border-slate-400 p-2 text-center w-48">Signature</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-slate-400 p-2.5 text-center font-mono">1</td>
                  <td className="border border-slate-400 p-2.5 font-bold">{partner1.name}</td>
                  <td className="border border-slate-400 p-2.5 text-center text-blue-900 font-medium">Managing Partner</td>
                  <td className="border border-slate-400 p-2.5 text-center font-serif italic text-blue-900 font-bold">{partner1.name}</td>
                </tr>
                <tr>
                  <td className="border border-slate-400 p-2.5 text-center font-mono">2</td>
                  <td className="border border-slate-400 p-2.5 font-bold">{outgoing.name}</td>
                  <td className="border border-slate-400 p-2.5 text-center text-amber-900 font-medium">Outgoing Partner</td>
                  <td className="border border-slate-400 p-2.5 text-center font-serif italic text-amber-900 font-bold">{outgoing.name}</td>
                </tr>
                <tr>
                  <td className="border border-slate-400 p-2.5 text-center font-mono">3</td>
                  <td className="border border-slate-400 p-2.5 font-bold">{partner2.name}</td>
                  <td className="border border-slate-400 p-2.5 text-center text-emerald-900 font-medium">Continuing Partner</td>
                  <td className="border border-slate-400 p-2.5 text-center font-serif italic text-emerald-900 font-bold">{partner2.name}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="pt-3 border-t border-slate-300 flex justify-between text-[10px] text-slate-500 font-sans">
            <span>{firm.firmName} — Minutes of Meeting</span>
            <span>Page 3 of 3 (Final Execution)</span>
          </div>
        </section>
      )}

      {/* ================= DOC 2: RESIGNATION & SHARE TRANSFER LETTER ================= */}
      {showResignation && (
        <section
          aria-label="Partnership Reconstitution - Resignation Letter"
          className="a4-page w-[210mm] min-h-[297mm] bg-white p-12 sm:p-14 shadow-2xl relative font-serif text-[13px] leading-relaxed text-slate-900 border border-slate-300 print:border-none print:shadow-none print:p-10 print:m-0 print:page-break-after-always flex flex-col justify-between"
        >
          <div>
            <div className="flex justify-between items-center text-[11px] text-slate-600 font-sans border-b border-slate-200 pb-2 mb-6">
              <span>Date: <strong>{outgoing.resignDate}</strong></span>
              <span>Personal & Confidential</span>
            </div>

            <div className="space-y-1 mb-6 text-[13px]">
              <p><strong>To,</strong></p>
              <p className="font-bold text-slate-950">The Chairman & Board of Partners</p>
              <p className="font-bold text-slate-900">{firm.firmName}</p>
              <p className="text-slate-700">{firm.regAddress}</p>
            </div>

            <div className="bg-slate-50 border-l-4 border-slate-700 p-3 my-4">
              <p className="font-bold text-sm text-slate-900">
                Subject: <span className="underline">Request for Transferring of my shares and accepting Resignation from the Office of Partner.</span>
              </p>
            </div>

            <p className="mb-4">Dear Sir,</p>

            <div className="space-y-4 text-justify">
              <p>
                This is to inform you that due to some personal and unavoidable circumstances, I am not in a position to hold the shares in <strong>{firm.firmName}</strong>, and am unable to continue in the office of Partner of this Firm.
              </p>

              <p>
                So, I do hereby tender my resignation from the post of Partner and cease from my Partnership of the Firm by transferring my entire share capital (holding <strong>{outgoing.shareAmt}</strong>, representing <strong>{outgoing.sharePct}</strong> share capital of the partnership firm) to <strong>{incoming.name}</strong>.
              </p>

              <p>
                I hereby request you to kindly take appropriate steps for the transfer of my shares, accept my formal resignation with effect from <strong>{firm.reconDate}</strong>, and execute the necessary Reconstitution of Partnership Deed and statutory filings with the Registrar of Joint Stock Companies & Firms (RJSC), Dhaka.
              </p>

              <p>
                I confirm that upon this transfer and acceptance, I have received all my due entitlements and have no surviving claims or financial demands whatsoever against the firm or its continuing partners.
              </p>

              <p>So, you are requested to do the needful.</p>
              <p>Thanking you,</p>
            </div>

            <div className="mt-12">
              <p className="text-slate-600 italic">Yours faithfully,</p>
              <div className="w-56 border-b-2 border-slate-700 pb-1 mt-6">
                <span className="font-serif italic text-amber-900 font-bold text-base">
                  {outgoing.name}
                </span>
              </div>
              <p className="font-bold text-sm text-slate-900 mt-2">({outgoing.name})</p>
              <p className="text-xs text-slate-700">Outgoing Partner</p>
              <p className="text-xs text-slate-700">{firm.firmName}</p>
              <p className="text-[11px] text-slate-500 font-sans mt-0.5">{outgoing.address}</p>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-300 flex justify-between text-[10px] text-slate-500 font-sans">
            <span>{firm.firmName} — Resignation Letter</span>
            <span>Doc 2</span>
          </div>
        </section>
      )}

      {/* ================= DOC 3: NOTARY AFFIDAVIT ================= */}
      {showAffidavit && (
        <section
          aria-label="Partnership Reconstitution - Notary Affidavit"
          className="a4-page w-[210mm] min-h-[297mm] bg-white p-12 sm:p-14 shadow-2xl relative font-serif text-[13px] leading-relaxed text-slate-900 border border-slate-300 print:border-none print:shadow-none print:p-10 print:m-0 print:page-break-after-always flex flex-col justify-between"
        >
          <div>
            {/* Top Notary Banner */}
            <div className="text-center border-b-2 border-slate-900 pb-3 mb-6">
              <div className="flex justify-between items-center text-[10px] uppercase tracking-widest text-slate-500 font-sans mb-1 font-semibold">
                <span>Non-Judicial Stamp Tk. 300/-</span>
                <span className="flex items-center gap-1 text-slate-700">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-700 inline" />
                  Notary Public, Dhaka, Bangladesh
                </span>
                <span>Affidavit of Transfer</span>
              </div>
              <h2 className="text-base sm:text-lg font-bold uppercase tracking-wider text-slate-950 font-serif mt-1">
                BEFORE THE NOTARY PUBLIC AT DHAKA, BANGLADESH
              </h2>
              <h3 className="text-sm font-bold uppercase underline tracking-widest text-slate-800 mt-1">
                AFFIDAVIT
              </h3>
            </div>

            <div className="space-y-4 text-justify text-[13px]">
              <p>
                I, <strong>{outgoing.name}</strong>, Daughter of: <strong>{outgoing.parents}</strong>, of {outgoing.address}, Religion: Islam, Nationality: Bangladeshi by birth, do hereby solemnly affirm and declare as follows:
              </p>

              <p>
                1. That I was one of the Partners & Shareholder holding <strong>{outgoing.shareAmt} ({outgoing.sharePct})</strong> share of the partnership firm <strong>"{firm.firmName}"</strong>, bearing Registration No. <strong>{firm.regNo}</strong>.
              </p>

              <p>
                2. That due to personal and unavoidable reasons, I have voluntarily transferred my entire <strong>{outgoing.shareAmt} ({outgoing.sharePct})</strong> share capital to <strong>{incoming.name}</strong>, Son of: <strong>{incoming.father}</strong> & <strong>{incoming.mother}</strong>, of {incoming.address}, as on date: <strong>{firm.reconDate}</strong>.
              </p>

              <p>
                3. That I solemnly declare that I have received full and final settlement of all my capital and profits, and I have no outstanding dues, claims, or profit-sharing ratio with the partnership firm <strong>"{firm.firmName}"</strong> after this date.
              </p>

              <p>
                4. That I have no objection if the present and reconstituted management continues conducting business in the existing name and style of <strong>"{firm.firmName}"</strong>.
              </p>

              <p>
                5. That I am narrating the facts affirming them as true and correct without any undue influence, coercion, or misrepresentation from any corner, and am putting my signature willingly and gladly.
              </p>

              <p>
                6. That the statements made above and the photograph affixed are mine and are true and correct to the best of my knowledge and belief.
              </p>
            </div>

            <div className="mt-8 flex justify-between items-end">
              <div>
                <p className="text-xs text-slate-600 mb-1">Identified by me:</p>
                <div className="w-48 border-b border-slate-700 pb-1 mt-6"></div>
                <p className="font-bold text-xs text-slate-900 mt-1">Advocate</p>
                <p className="text-[11px] text-slate-600">Supreme Court of Bangladesh</p>
              </div>

              <div className="text-right">
                <div className="w-48 border-b-2 border-slate-700 pb-1 mx-auto text-center">
                  <span className="font-serif italic text-amber-900 font-bold text-base">
                    {outgoing.name}
                  </span>
                </div>
                <p className="font-bold text-xs text-slate-900 mt-1 uppercase">Deponent</p>
                <p className="text-xs text-slate-800">({outgoing.name})</p>
                <p className="text-[10px] text-slate-500 font-sans">Outgoing Partner</p>
              </div>
            </div>

            {/* Notary Seal Box */}
            <div className="mt-8 p-3 border border-slate-400 bg-amber-50/50 rounded text-[11px] font-sans">
              <p className="font-semibold text-slate-900">
                Solemnly affirmed and declared before me at Dhaka on this {firm.reconDate} by the deponent who is identified by the learned Advocate and signed in my presence.
              </p>
              <div className="flex justify-between items-center mt-3 pt-2 border-t border-dashed border-amber-300">
                <span className="font-mono text-[10px] font-bold text-amber-900 uppercase">
                  Govt. of Bangladesh Notary Reg. No: 5120/2025
                </span>
                <span className="font-bold text-slate-900 uppercase text-[11px]">
                  Notary Public, Dhaka, Bangladesh
                </span>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-300 flex justify-between text-[10px] text-slate-500 font-sans">
            <span>{firm.firmName} — Notary Affidavit of Transfer</span>
            <span>Doc 3</span>
          </div>
        </section>
      )}

      {/* ================= DOC 4: FORM - V PAGE 1 ================= */}
      {showFormV && (
        <section
          aria-label="Partnership Reconstitution - Form V Page 1"
          className="a4-page w-[210mm] min-h-[297mm] bg-white p-10 sm:p-12 shadow-2xl relative font-serif text-[12px] leading-relaxed text-slate-900 border border-slate-300 print:border-none print:shadow-none print:p-8 print:m-0 print:page-break-after-always flex flex-col justify-between"
        >
          <div>
            {/* Header */}
            <div className="text-center mb-4 border-b border-slate-300 pb-3">
              <h3 className="font-bold text-base text-slate-900 tracking-wider">
                {docLang === 'bn' ? 'ফরম — ৫ (FORM — V)' : 'FORM — V'}
              </h3>
              <h2 className="text-sm sm:text-base font-bold uppercase tracking-wide text-slate-950 mt-1">
                {t('recon.formVTitle', docLang)}
              </h2>
              <p className="text-[11px] text-slate-700 font-sans mt-0.5">
                {t('recon.formVSub', docLang)}
              </p>
            </div>

            {/* Recipient */}
            <div className="mb-4 text-[11.5px] leading-tight space-y-0.5 font-sans">
              <p><strong>{docLang === 'bn' ? 'বরাবর,' : 'To,'}</strong></p>
              <p className="font-bold text-slate-900">
                {docLang === 'bn' ? 'রেজিস্ট্রার, যৌথ মূলধন কোম্পানি ও ফার্মসমূহের পরিদপ্তর (RJSC),' : 'The Registrar of Joint Stock Companies & Firms,'}
              </p>
              <p className="text-slate-700">
                {docLang === 'bn' ? 'টিসিবি ভবন (৭ম তলা), ১ কারওয়ান বাজার, ঢাকা-১২১৫, বাংলাদেশ।' : '6th Floor, TCB Bhaban, Kawran Bazar, Dhaka-1215, Bangladesh.'}
              </p>
            </div>

            <p className="mb-2 text-[11.5px]">{docLang === 'bn' ? 'মহোদয়,' : 'Dear Sir,'}</p>

            <p className="text-justify text-[11px] leading-relaxed mb-4">
              Notice is hereby given, pursuant to subsection (1) of Section 63 of the Partnership Act, 1932 (IX of 1932), of the following changes in the constitution of the firm, <strong>{firm.firmName}</strong>, bearing Registration No. <strong>{docLang === 'bn' ? toBengaliNumeral(firm.regNo) : firm.regNo}</strong>, Date: <strong>{docLang === 'bn' ? toBengaliNumeral(firm.regDate) : firm.regDate}</strong>. Consequent upon the cause that existing partner <strong>{outgoing.name}</strong> has transferred her entire share capital to new incoming partner <strong>{incoming.name}</strong> who has been inducted as partner, and a Reconstitution of Partnership Deed has been executed with the unanimous approval of the Board of Partners on date <strong>{docLang === 'bn' ? toBengaliNumeral(firm.reconDate) : firm.reconDate}</strong>. Now <strong>{partner1.sharePct}</strong>, <strong>{partner2.sharePct}</strong>, and <strong>{incoming.sharePct}</strong> share capital are being held by <strong>{partner1.name}</strong>, <strong>{partner2.name}</strong>, and <strong>{incoming.name}</strong> respectively.
            </p>

            <p className="font-bold text-[11px] mb-2">
              {docLang === 'bn' ? '১. অংশীদারগণের বিস্তারিত বিবরণী:' : '1. Particulars of Partners (Must tally with those in the deed of reconstitution of partnership, if any):'}
            </p>

            {/* 9-Column Comparative Table */}
            <table className="w-full border-collapse border border-slate-900 text-[10px] font-sans">
              <thead>
                <tr className="bg-slate-100 font-bold text-slate-900 text-center">
                  <th colSpan={2} className="border border-slate-900 p-1 bg-slate-200">
                    {docLang === 'bn' ? 'পূর্ববর্তী গঠন' : 'Previous Constitution'}
                  </th>
                  <th colSpan={7} className="border border-slate-900 p-1 bg-slate-100">
                    {docLang === 'bn' ? 'পুনর্গঠন পরবর্তী বর্তমান গঠন' : 'Position After Reconstitution'}
                  </th>
                </tr>
                <tr className="bg-slate-50 font-semibold text-slate-800 text-center">
                  <th className="border border-slate-900 p-1 w-24">{docLang === 'bn' ? 'অংশীদারের নাম' : 'Full Name of Partners'}</th>
                  <th className="border border-slate-900 p-1 w-12">{docLang === 'bn' ? 'শেয়ার (%)' : 'Share (%)'}</th>
                  <th className="border border-slate-900 p-1 w-24">{docLang === 'bn' ? 'অংশীদারের পূর্ণ নাম' : 'Full Name of Partners'}</th>
                  <th className="border border-slate-900 p-1 w-20">{docLang === 'bn' ? 'পিতার নাম' : "Father's Name"}</th>
                  <th className="border border-slate-900 p-1">{docLang === 'bn' ? 'স্থায়ী ঠিকানা' : 'Permanent Address'}</th>
                  <th className="border border-slate-900 p-1 w-14">{docLang === 'bn' ? 'জাতীয়তা' : 'Nationality'}</th>
                  <th className="border border-slate-900 p-1 w-16">{docLang === 'bn' ? 'মূলধন (টাকা)' : 'Capital (BDT)'}</th>
                  <th className="border border-slate-900 p-1 w-12">{docLang === 'bn' ? 'শেয়ার (%)' : 'Share (%)'}</th>
                  <th className="border border-slate-900 p-1 w-28">{docLang === 'bn' ? 'অবস্থা / মন্তব্য' : 'Remarks / Status'}</th>
                </tr>
                <tr className="bg-slate-200 text-slate-600 text-center text-[9px]">
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
                  <td className="border border-slate-900 p-1 font-semibold">{partner1.name}</td>
                  <td className="border border-slate-900 p-1 text-center font-bold">35.0%</td>
                  <td className="border border-slate-900 p-1 font-bold text-blue-900">{partner1.name}</td>
                  <td className="border border-slate-900 p-1">{partner1.father}</td>
                  <td className="border border-slate-900 p-1 text-[9.5px] leading-tight">{partner1.address}</td>
                  <td className="border border-slate-900 p-1 text-center">Bangladeshi</td>
                  <td className="border border-slate-900 p-1 text-right font-mono">{formatTakaCommas(partner1.capitalAmt)}</td>
                  <td className="border border-slate-900 p-1 text-center font-bold text-blue-900">{partner1.sharePct}</td>
                  <td className="border border-slate-900 p-1 text-center font-medium">Existing (Managing)</td>
                </tr>
                <tr>
                  <td className="border border-slate-900 p-1 font-semibold text-amber-900">{outgoing.name}</td>
                  <td className="border border-slate-900 p-1 text-center font-bold">32.5%</td>
                  <td className="border border-slate-900 p-1 font-bold text-emerald-900">{incoming.name}</td>
                  <td className="border border-slate-900 p-1">{incoming.father}</td>
                  <td className="border border-slate-900 p-1 text-[9.5px] leading-tight">{incoming.address}</td>
                  <td className="border border-slate-900 p-1 text-center">Bangladeshi</td>
                  <td className="border border-slate-900 p-1 text-right font-mono">{formatTakaCommas(incoming.capitalAmt)}</td>
                  <td className="border border-slate-900 p-1 text-center font-bold text-emerald-900">{incoming.sharePct}</td>
                  <td className="border border-slate-900 p-1 text-left text-[9px] leading-tight">
                    {outgoing.name} transferred entire share to {incoming.name}.
                  </td>
                </tr>
                <tr>
                  <td className="border border-slate-900 p-1 font-semibold">{partner2.name}</td>
                  <td className="border border-slate-900 p-1 text-center font-bold">32.5%</td>
                  <td className="border border-slate-900 p-1 font-bold">{partner2.name}</td>
                  <td className="border border-slate-900 p-1">{partner2.father}</td>
                  <td className="border border-slate-900 p-1 text-[9.5px] leading-tight">{partner2.address}</td>
                  <td className="border border-slate-900 p-1 text-center">Bangladeshi</td>
                  <td className="border border-slate-900 p-1 text-right font-mono">{formatTakaCommas(partner2.capitalAmt)}</td>
                  <td className="border border-slate-900 p-1 text-center font-bold">{partner2.sharePct}</td>
                  <td className="border border-slate-900 p-1 text-center font-medium">Existing</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="pt-3 border-t border-slate-300 flex justify-between text-[10px] text-slate-500 font-sans">
            <span>{firm.firmName} — Statutory Form V</span>
            <span>Page 1 of 2</span>
          </div>
        </section>
      )}

      {/* ================= DOC 4: FORM - V PAGE 2 ================= */}
      {showFormV && (
        <section
          aria-label="Partnership Reconstitution - Form V Page 2"
          className="a4-page w-[210mm] min-h-[297mm] bg-white p-10 sm:p-12 shadow-2xl relative font-serif text-[12.5px] leading-relaxed text-slate-900 border border-slate-300 print:border-none print:shadow-none print:p-8 print:m-0 print:page-break-after-always flex flex-col justify-between"
        >
          <div>
            <div className="border-b border-slate-300 pb-1.5 mb-4 flex justify-between text-[10px] text-slate-600 font-sans uppercase">
              <span className="font-semibold">{firm.firmName} • Form V Intimation</span>
              <span>Section 63(1), Partnership Act 1932</span>
            </div>

            {/* Enclosures */}
            <div className="mb-6 space-y-1.5 text-justify">
              <p className="font-bold text-slate-900">2. Enclosures (if any):</p>
              <div className="pl-4 space-y-1 text-[12px] font-sans">
                <p>(1) Reconstitution Deed of Agreement of the firm executed on <strong>{firm.reconDate}</strong>;</p>
                <p>(2) Bangladesh Gazette Notice published pursuant to Section 32(3) & 72 of Act IX of 1932;</p>
                <p>(3) Public Notice published in The Daily National Newspaper on <strong>{firm.reconDate}</strong>.</p>
              </div>
            </div>

            {/* Declaration */}
            <div className="p-4 bg-slate-50 border border-slate-300 rounded mb-6 text-justify">
              <p className="font-medium text-slate-900">
                I/We, the partners of this firm named <strong>{firm.firmName}</strong>, do hereby declare that the foregoing statement and particulars are true, complete, and correct to our best knowledge and belief.
              </p>
            </div>

            {/* Signatures of Partners */}
            <p className="font-bold text-slate-900 mb-2">Yours faithfully,</p>
            <p className="text-[11px] text-slate-600 mb-4 font-sans">Signatures of all Partners:</p>

            <div className="grid grid-cols-3 gap-4 mb-8 text-center font-sans text-xs">
              <div className="border border-slate-300 p-3 rounded">
                <div className="h-12 border-b border-slate-400 flex items-end justify-center pb-1">
                  <span className="font-serif italic font-bold text-blue-900">{partner1.name}</span>
                </div>
                <p className="font-bold mt-1 text-slate-900">{partner1.name}</p>
                <p className="text-[10px] text-blue-800 font-semibold">{partner1.role}</p>
              </div>

              <div className="border border-slate-300 p-3 rounded">
                <div className="h-12 border-b border-slate-400 flex items-end justify-center pb-1">
                  <span className="font-serif italic font-bold text-emerald-900">{incoming.name}</span>
                </div>
                <p className="font-bold mt-1 text-slate-900">{incoming.name}</p>
                <p className="text-[10px] text-emerald-800 font-semibold">Incoming Partner</p>
              </div>

              <div className="border border-slate-300 p-3 rounded">
                <div className="h-12 border-b border-slate-400 flex items-end justify-center pb-1">
                  <span className="font-serif italic font-bold text-slate-800">{partner2.name}</span>
                </div>
                <p className="font-bold mt-1 text-slate-900">{partner2.name}</p>
                <p className="text-[10px] text-slate-700 font-semibold">Continuing Partner</p>
              </div>
            </div>

            {/* Witness Attesting Signatures */}
            <div className="mb-6 pt-4 border-t border-slate-300">
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-900 mb-3">
                Witness Attesting Signatures:
              </h4>
              <div className="grid grid-cols-2 gap-6 text-[11px] font-sans">
                <div className="border-l-2 border-slate-400 pl-3">
                  <p className="font-bold text-slate-900">1. Name: Md. Rafiqul Islam</p>
                  <p className="text-slate-600">Address: Dhaka, Bangladesh</p>
                  <p className="text-slate-500 italic mt-2">Signature: __________________________</p>
                </div>
                <div className="border-l-2 border-slate-400 pl-3">
                  <p className="font-bold text-slate-900">2. Name: Anamul Haque</p>
                  <p className="text-slate-600">Address: Uttara, Dhaka, Bangladesh</p>
                  <p className="text-slate-500 italic mt-2">Signature: __________________________</p>
                </div>
              </div>
            </div>

            {/* RJSC Office Endorsement Box */}
            <div className="border border-slate-400 p-3 bg-slate-50 text-[11px] font-sans">
              <table className="w-full">
                <tbody>
                  <tr>
                    <td className="w-1/3"><strong>Place:</strong> Dhaka</td>
                    <td className="w-1/3"><strong>Filed By:</strong> Managing Partner</td>
                    <td className="w-1/3"><strong>Dated:</strong> {firm.reconDate}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-300 flex justify-between text-[10px] text-slate-500 font-sans">
            <span>{firm.firmName} — Statutory Form V</span>
            <span>Page 2 of 2</span>
          </div>
        </section>
      )}

      {/* ================= DOC 5: FORWARDING LETTER ================= */}
      {showForwarding && (
        <section
          aria-label="Partnership Reconstitution - Forwarding Letter"
          className="a4-page w-[210mm] min-h-[297mm] bg-white p-12 sm:p-14 shadow-2xl relative font-serif text-[13px] leading-relaxed text-slate-900 border border-slate-300 print:border-none print:shadow-none print:p-10 print:m-0 print:page-break-after-always flex flex-col justify-between"
        >
          <div>
            <div className="space-y-1 mb-6 text-[13px]">
              <p><strong>To,</strong></p>
              <p className="font-bold text-slate-950">The Registrar</p>
              <p className="font-bold text-slate-900">Registrar of Joint Stock Companies & Firms (RJSC)</p>
              <p className="text-slate-700">TCB Bhaban, 6th Floor, 1 Kawran Bazar, Dhaka-1215, Bangladesh.</p>
            </div>

            <div className="bg-slate-50 border-l-4 border-blue-900 p-3 my-4">
              <p className="font-bold text-sm text-slate-900">
                Subject: <span className="underline">Authorization for Submission of Reconstitution and Related Documents through the RJSC Online System.</span>
              </p>
            </div>

            <p className="text-justify my-4">
              I, <strong>{partner1.name}</strong>, in my capacity as the <strong>{partner1.role}</strong> of <strong>{firm.firmName}</strong>, bearing Registration No. <strong>{firm.regNo}</strong> (Date of Reg.: {firm.regDate}), hereby authorize the following designated individual to submit the firm's Reconstitution documents, Form V, and other statutory returns electronically through the RJSC online portal for official verification and recording.
            </p>

            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-900 mt-6 mb-2">
              Particulars of the Authorizing Person:
            </h4>
            <div className="bg-slate-50 border border-slate-200 p-3 rounded space-y-1 text-[12px] font-sans mb-6">
              <p><strong>Name:</strong> {partner1.name}</p>
              <p><strong>Designation:</strong> {partner1.role}</p>
              <p><strong>National ID / Passport No.:</strong> {partner1.nid || '1480033594'}</p>
              <p><strong>Date of Birth:</strong> {partner1.dob || '11 February 1989'}</p>
              <p><strong>Mobile No.:</strong> {partner1.mobile || '01812127200'}</p>
              <p><strong>Email Address:</strong> {partner1.email || 'mr-farhad@hotmail.com'}</p>
            </div>

            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-900 mt-6 mb-2">
              Particulars of the Authorized Representative:
            </h4>
            <div className="bg-slate-50 border border-slate-200 p-3 rounded space-y-1 text-[12px] font-sans mb-6">
              <p><strong>Name:</strong> {representative.name}</p>
              <p><strong>National ID (NID) No.:</strong> {representative.nid}</p>
              <p><strong>Date of Birth:</strong> {representative.dob}</p>
              <p><strong>Mobile No.:</strong> {representative.mobile}</p>
              <p><strong>Email Address:</strong> {representative.email}</p>
            </div>

            <p className="text-justify my-4 text-[12px]">
              I affirm that all the attached documents under this submission have been prepared, notarized, and submitted as per the Partnership Act, 1932, and the provided information is true, genuine, and authentic.
            </p>

            <div className="mt-8 border-t border-slate-300 pt-4 flex justify-between items-end font-sans">
              <div>
                <p className="text-[11px] text-slate-600">Company Name: <strong>{firm.firmName}</strong></p>
                <p className="text-[11px] text-slate-600">Registration Number: <strong>{firm.regNo}</strong></p>
                <p className="text-[11px] text-slate-900 font-bold">Submission No: <span className="font-mono text-blue-900">{meeting.submissionNo}</span></p>
              </div>

              <div className="text-right">
                <div className="w-48 border-b-2 border-slate-700 pb-1">
                  <span className="font-serif italic font-bold text-blue-900 text-sm">{partner1.name}</span>
                </div>
                <p className="font-bold text-xs text-slate-900 mt-1">{partner1.name}</p>
                <p className="text-[11px] text-blue-900 font-semibold">{partner1.role}</p>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-300 flex justify-between text-[10px] text-slate-500 font-sans">
            <span>{firm.firmName} — RJSC Forwarding Authorization</span>
            <span>Doc 5</span>
          </div>
        </section>
      )}

      {/* ================= DOC 6: PUBLIC NOTICE ================= */}
      {showPublicNotice && (
        <section
          aria-label="Partnership Reconstitution - Public Notice"
          className="a4-page w-[210mm] min-h-[297mm] bg-white p-12 sm:p-14 shadow-2xl relative font-serif text-[13px] leading-relaxed text-slate-900 border border-slate-300 print:border-none print:shadow-none print:p-10 print:m-0 print:page-break-after-always flex flex-col justify-between"
        >
          <div>
            <div className="border-b-2 border-slate-900 pb-3 mb-6 text-center">
              <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-wide text-slate-950 font-serif">
                {firm.firmName}
              </h2>
              <p className="text-xs text-slate-600 font-sans mt-0.5">
                Registered Office: {firm.regAddress}
              </p>
              <div className="flex justify-center items-center gap-3 text-[10px] uppercase tracking-widest text-slate-500 font-sans mt-1">
                <span>Registration No.: {firm.regNo}</span>
                <span>•</span>
                <span>Reg. Date: {firm.regDate}</span>
              </div>
            </div>

            <div className="text-center my-6">
              <h3 className="text-base sm:text-lg font-bold uppercase underline tracking-widest text-slate-900">
                {t('recon.publicNoticeTitle', docLang)}
              </h3>
              <p className="text-xs text-slate-600 font-sans mt-1">
                {docLang === 'bn' ? '[অংশীদারী আইন, ১৯৩২ (১৯৩২ সালের ৯ নং আইন)-এর ধারা ৭২ মোতাবেক সংবিধিবদ্ধ গণবিজ্ঞপ্তি]' : '[Under Section 72 of the Partnership Act, 1932 (Act IX of 1932)]'}
              </p>
            </div>

            <div className="space-y-4 text-justify leading-relaxed text-[13.5px]">
              <p>
                At a General / Board Meeting of <strong>{firm.firmName}</strong> duly convened and held at the Registered Office of the Partnership Firm ({firm.regAddress}) at 11:00 AM on <strong>{firm.reconDate}</strong>, <strong>{partner1.name}</strong>, <strong>{outgoing.name}</strong>, and <strong>{partner2.name}</strong>, Partners of the firm, were present.
              </p>

              <p>
                The Meeting unanimously resolved that <strong>{incoming.name}</strong> has been admitted and appointed as a new Partner of the Firm, and the transfer of the entire share capital owned by Ms. <strong>{outgoing.name}</strong> has been approved and accepted.
              </p>

              <p>
                A formal Reconstitution of Partnership Agreement has been executed for statutory record. The firm <strong>"{firm.firmName}"</strong>, which is registered with the Registrar of Joint Stock Companies and Firms (RJSC), Dhaka bearing <strong>Reg. No. {firm.regNo}</strong> dated <strong>{firm.regDate}</strong>, has been reconstituted with effect from <strong>{firm.reconDate}</strong>.
              </p>

              <div className="bg-slate-50 p-4 border border-slate-300 rounded text-center my-6">
                <p className="font-bold text-slate-900 text-sm">
                  Now <strong>{partner1.sharePct}</strong>, <strong>{partner2.sharePct}</strong>, and <strong>{incoming.sharePct}</strong> share capital of the partnership firm are held by:
                </p>
                <p className="mt-2 text-slate-800 font-semibold">
                  1. {partner1.name} ({partner1.sharePct}) &nbsp;•&nbsp; 2. {partner2.name} ({partner2.sharePct}) &nbsp;•&nbsp; 3. {incoming.name} ({incoming.sharePct})
                </p>
              </div>

              <p>
                All concerned, clients, financial institutions, and government authorities are therefore requested to contact henceforth with the Managing Partner in respect of any business affairs, orders, or transactions of the Firm.
              </p>
            </div>

            <div className="mt-14">
              <div className="w-56 border-b-2 border-slate-700 pb-1">
                <span className="font-serif italic font-bold text-blue-900 text-base">{partner1.name}</span>
              </div>
              <p className="font-bold text-sm text-slate-900 mt-2">{partner1.name}</p>
              <p className="text-xs text-blue-900 font-semibold">{partner1.role}</p>
              <p className="text-xs text-slate-700">{firm.firmName}</p>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-300 flex justify-between text-[10px] text-slate-500 font-sans">
            <span>{firm.firmName} — Public Notice</span>
            <span>Doc 6</span>
          </div>
        </section>
      )}

      {/* ================= DOC 7: BENGALI GAZETTE APPLICATION ================= */}
      {showGazette && (
        <section
          aria-label="Partnership Reconstitution - Bengali Gazette Application"
          className="a4-page w-[210mm] min-h-[297mm] bg-white p-12 sm:p-14 shadow-2xl relative font-bengali text-[14px] leading-relaxed text-slate-900 border border-slate-300 print:border-none print:shadow-none print:p-10 print:m-0 flex flex-col justify-between"
        >
          <div>
            <div className="flex justify-between items-center text-xs text-slate-600 border-b border-slate-200 pb-2 mb-6 font-sans">
              <span>তাং: <strong>{toBengaliNumeral(firm.reconDate)}</strong> ইং</span>
              <span>বাংলাদেশ গেজেট বিজ্ঞপ্তি শাখা</span>
            </div>

            <div className="space-y-1 mb-6 text-sm">
              <p className="font-bold">বরাবর,</p>
              <p className="font-bold text-slate-950">উপ-পরিচালক</p>
              <p className="font-bold text-slate-900">বাংলাদেশ ফরম ও প্রকাশনা অফিস</p>
              <p className="text-slate-700">তেজগাঁও শিল্প এলাকা, ঢাকা-১২০৮।</p>
            </div>

            <div className="bg-slate-50 border-l-4 border-slate-700 p-3 my-4">
              <p className="font-bold text-sm sm:text-base text-slate-950">
                বিষয়ঃ <span className="underline">অংশীদারিত্ব কারবার পুনর্গঠনের গেজেট বিজ্ঞপ্তি প্রকাশের আবেদন প্রসঙ্গে।</span>
              </p>
            </div>

            <p className="mb-4">জনাব,</p>

            <div className="space-y-4 text-justify text-[14.5px]">
              <p>
                বিনীত নিবেদন এই যে, গত <strong>{toBengaliNumeral(firm.reconDate)}</strong> ইং তারিখের অতিরিক্ত সাধারণ সভায় সকল সদস্যগণের সর্বসম্মত সিদ্ধান্ত মোতাবেক "<strong>{firm.firmName}</strong>" নামীয় একটি নিবন্ধিত অংশীদারিত্ব কারবার (রেজিস্ট্রেশন নং: <strong>{firm.regNo}</strong>, তারিখ: <strong>{toBengaliNumeral(firm.regDate)}</strong>) এর সদস্যগণ কর্তৃক "Reconstitution of the Partnership Agreement" ঘোষণা ও অনুমোদন করা হইয়াছে।
              </p>

              <p>
                উক্ত পুনর্গঠন মোতাবেক পূর্বতন অংশীদার জনাবা <strong>{outgoing.name}</strong> তাহার সমুদয় মূলধন ও অংশীদারিত্ব হস্তান্তর করিয়া অবসর গ্রহণ করিয়াছেন এবং নূতন অংশীদার হিসেবে জনাব <strong>{incoming.name}</strong> কারবারে অন্তর্ভুক্ত হইয়াছেন।
              </p>

              <p>
                যাহা অংশীদারিত্ব আইন, ১৯৩২ (Act IX of 1932) এর ধারা ৩২(৩) এবং ৭২ মোতাবেক বাংলাদেশ গেজেট এর মাধ্যমে জনস্বার্থে আনুষ্ঠানিকভাবে প্রকাশ করার বাধ্যবাধকতা রহিয়াছে।
              </p>

              <p>
                অতএব, মহোদয়ের নিকট বিনীত প্রার্থনা, আমাদের প্রতিষ্ঠানের উক্ত অংশীদারিত্ব কারবার পুনর্গঠন সংক্রান্ত বিজ্ঞপ্তিটি বাংলাদেশ গেজেটে দ্রুত প্রকাশ করার সদয় প্রয়োজনীয় ব্যবস্থা গ্রহণ করিতে আপনার সদয় মর্জি হয়।
              </p>
            </div>

            <div className="mt-12">
              <p className="text-slate-600">নিবেদক,</p>
              <div className="w-56 border-b-2 border-slate-700 pb-1 mt-6">
                <span className="font-serif italic font-bold text-blue-900 text-base">{partner1.name}</span>
              </div>
              <p className="font-bold text-sm text-slate-900 mt-2">({partner1.name})</p>
              <p className="text-xs text-blue-900 font-semibold">{partner1.role}</p>
              <p className="text-xs text-slate-700">{firm.firmName}</p>
            </div>

            <div className="mt-8 p-3 bg-slate-50 border border-slate-300 rounded text-xs space-y-1">
              <p className="font-bold text-slate-900 underline">সংযুক্তিসমূহঃ</p>
              <p>১। অংশীদারগণের অতিরিক্ত সাধারণ সভার কার্যবিবরণীর সত্যায়িত কপি।</p>
              <p>২। নির্ধারিত সরকারি ফি জমার ট্রেজারি চালান কপি।</p>
              <p>৩। আরজেএসসি (RJSC) কর্তৃক প্রদত্ত সার্টিফিকেট অব রেজিস্ট্রেশন এর সত্যায়িত কপি।</p>
              <p>৪। নোটারিকৃত পুনর্গঠন চুক্তিপত্র (Reconstitution Deed) এর কপি।</p>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-300 flex justify-between text-[10px] text-slate-500 font-sans">
            <span>{firm.firmName} — বাংলাদেশ গেজেট আবেদন</span>
            <span>Doc 7</span>
          </div>
        </section>
      )}
    </div>
  );
};
