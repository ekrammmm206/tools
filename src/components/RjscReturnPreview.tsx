import React from 'react';
import { RjscReturnState } from '../types/rjscReturn';
import { calculateTotalSharesAndCapital, formatBdtNoDec } from '../utils/rjscReturnCalculations';

interface RjscReturnPreviewProps {
  data: RjscReturnState;
  zoom: number;
}

export const RjscReturnPreview: React.FC<RjscReturnPreviewProps> = ({
  data,
  zoom
}) => {
  const { meetingInfo, people, selectedSubDoc } = data;
  const summary = calculateTotalSharesAndCapital(people, meetingInfo.shareNominalValue);

  const shouldShow = (docId: string) =>
    selectedSubDoc === 'all' || selectedSubDoc === docId;

  const zoomStyle = {
    transform: `scale(${zoom / 100})`,
    transformOrigin: 'top center'
  };

  return (
    <div className="flex flex-col items-center gap-10 print:gap-0 print:m-0 w-full" style={zoomStyle}>
      {/* =========================================================================
          PAGE 1: NOTICE OF AGM
      ========================================================================= */}
      {shouldShow('notice') && (
        <div className="a4-page w-[210mm] min-h-[297mm] bg-white text-slate-900 p-16 shadow-2xl relative font-serif text-[13px] leading-relaxed border border-slate-300 print:border-none print:shadow-none print:p-12 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center text-xs font-sans text-slate-600 mb-6">
              <span>Ref: {meetingInfo.noticeRef}</span>
              <span>Date: <strong>{meetingInfo.noticeDate}</strong></span>
            </div>

            <p className="font-bold text-slate-800 mb-4">To All Honorable Shareholders</p>

            <h2 className="text-center text-base font-bold underline uppercase tracking-wide text-slate-950 mb-4">
              NOTICE OF THE ANNUAL GENERAL MEETING {meetingInfo.companyName}
            </h2>

            <p className="text-justify mb-4">
              Notice is hereby given that the Annual General Meeting (AGM) of <strong>{meetingInfo.companyName}</strong> will be held as per below to transact the following business:
            </p>

            <div className="bg-slate-50 border border-slate-300 p-3 rounded font-sans text-xs mb-6 space-y-1">
              <p><strong>Date & Time:</strong> {meetingInfo.agmDate} at {meetingInfo.agmTime}</p>
              <p><strong>Meeting Location:</strong> {meetingInfo.meetingLocation}</p>
            </div>

            <h3 className="font-bold text-sm text-slate-900 border-b border-slate-300 pb-1 mb-2 font-sans">
              Agenda
            </h3>
            <div className="space-y-2 text-justify mb-6">
              <p><strong>01.</strong> To confirm the minutes of the AGM held on {meetingInfo.agmDate} at {meetingInfo.agmTime}</p>
              <p><strong>02.</strong> To receive, consider and adopt the Directors' Report, Auditors' Report and Audited Financial Statements for the year ended {meetingInfo.fyEnded}</p>
              <p><strong>03.</strong> To appoint Auditor(s) and fix their remuneration for the year ending {meetingInfo.fyNext}</p>
              <p><strong>04.</strong> To consider and approve the recommendation of the Board of Directors regarding declaration of dividend for the financial year ended {meetingInfo.fyEnded}</p>
              <p><strong>05.</strong> Any other business with permission of the Chair</p>
            </div>

            <p className="text-justify mb-8 text-xs text-slate-700">
              The meeting has been convened after obtaining written consent for shorter notice from all shareholders pursuant to Section 101(1) of the Companies Act, 1994. All shareholders are requested to kindly attend the meeting on time.
            </p>

            <div className="mb-6">
              <p className="text-xs text-slate-600">By order of the Board</p>
              <div className="mt-8">
                <p className="font-bold uppercase text-slate-950">{meetingInfo.chairmanName}</p>
                <p className="text-xs text-slate-600">Chairman, {meetingInfo.companyName}</p>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-300 pt-3 text-[11px] text-slate-600 font-sans">
            <h4 className="font-bold text-slate-800 uppercase mb-1">Notes:</h4>
            <p className="mb-1">01. The record date for the meeting is {meetingInfo.agmDate}</p>
            <p className="mb-2">02. A shareholder may appoint a proxy to attend and vote on his/her behalf by completing the proxy form in accordance with the Articles of Association. The duly completed and stamped proxy form must be deposited at the registered office at least 48 hours prior to the scheduled time of the meeting.</p>
            <p className="text-[10px] text-slate-500"><strong>Distributed To:</strong> All Honorable Shareholders • Copy to Company Permanent File</p>
          </div>
        </div>
      )}

      {/* =========================================================================
          PAGE 2: MINUTES OF AGM (PART 1 & ATTENDANCE)
      ========================================================================= */}
      {shouldShow('minutes') && (
        <div className="a4-page w-[210mm] min-h-[297mm] bg-white text-slate-900 p-16 shadow-2xl relative font-serif text-[12px] leading-relaxed border border-slate-300 print:border-none print:shadow-none print:p-12 flex flex-col justify-between">
          <div>
            <h2 className="text-center text-base font-bold underline uppercase tracking-wide text-slate-950 mb-4">
              MINUTES OF THE ANNUAL GENERAL MEETING {meetingInfo.companyName}
            </h2>

            <div className="bg-slate-50 border border-slate-300 p-3 rounded font-sans text-xs mb-4 space-y-1">
              <p><strong>Date & Time:</strong> {meetingInfo.agmDate} at {meetingInfo.agmTime}</p>
              <p><strong>Meeting Location:</strong> {meetingInfo.meetingLocation}</p>
            </div>

            <p className="text-justify mb-3">
              At the commencement of the meeting, the Chairman extended a warm welcome to the shareholders present physically at the venue and those attending through video conference to the Annual General Meeting (AGM) of the Company.
            </p>
            <p className="font-bold text-slate-900 mb-2">The following Directors/Shareholders were present:</p>

            <table className="w-full border-collapse border border-slate-400 font-sans text-[11px] mb-4">
              <thead>
                <tr className="bg-slate-100 text-slate-800">
                  <th className="border border-slate-400 p-1.5 text-center w-12">Sl No</th>
                  <th className="border border-slate-400 p-1.5 text-left">Name</th>
                  <th className="border border-slate-400 p-1.5 text-left w-36">Designation</th>
                  <th className="border border-slate-400 p-1.5 text-right w-24">Shares</th>
                </tr>
              </thead>
              <tbody>
                {people.map((p, idx) => (
                  <tr key={p.id}>
                    <td className="border border-slate-400 p-1 text-center">{idx + 1}</td>
                    <td className="border border-slate-400 p-1 font-medium">{p.name}</td>
                    <td className="border border-slate-400 p-1">{p.designation}</td>
                    <td className="border border-slate-400 p-1 text-right font-mono">{p.shares}</td>
                  </tr>
                ))}
                <tr className="bg-slate-50 font-bold">
                  <td colSpan={3} className="border border-slate-400 p-1 text-right uppercase">
                    Total Present:
                  </td>
                  <td className="border border-slate-400 p-1 text-right font-mono">
                    {summary.totalShares.toLocaleString()}
                  </td>
                </tr>
              </tbody>
            </table>

            <p className="text-justify mb-2">
              The meeting was chaired by <strong>{meetingInfo.chairmanName}</strong>, Chairman of the Company. The requisite quorum being present in accordance with the Articles of Association and the Companies Act 1994, the Chairman called the meeting to order.
            </p>
          </div>
        </div>
      )}

      {/* =========================================================================
          PAGE 3: MINUTES AGENDA 1-3
      ========================================================================= */}
      {shouldShow('minutes') && (
        <div className="a4-page w-[210mm] min-h-[297mm] bg-white text-slate-900 p-16 shadow-2xl relative font-serif text-[12px] leading-relaxed border border-slate-300 print:border-none print:shadow-none print:p-12 flex flex-col justify-between">
          <div>
            <p className="font-bold text-slate-800 mb-4 font-sans text-xs uppercase">
              The agenda items were taken up for discussion as follows:
            </p>

            {/* Agenda 1 */}
            <div className="mb-6 border-b border-slate-200 pb-4">
              <h3 className="font-bold text-sm text-slate-950 font-sans mb-1">Agenda No. 01</h3>
              <p className="font-semibold text-slate-800 mb-1">
                To confirm the minutes of the AGM held on {meetingInfo.agmDate} at {meetingInfo.agmTime}
              </p>
              <p className="text-justify mb-2">
                <strong>Discussion:</strong> The minutes of the Annual General Meeting held on {meetingInfo.agmDate} at {meetingInfo.agmTime} at the registered office of the Company were read out before the meeting.
              </p>
              <p className="text-justify bg-slate-50 p-2.5 rounded border border-slate-200 font-sans text-[11px]">
                <strong>Decision:</strong> RESOLVED THAT the minutes of the Annual General Meeting held on {meetingInfo.agmDate} be and are hereby confirmed and approved unanimously.
              </p>
            </div>

            {/* Agenda 2 */}
            <div className="mb-6 border-b border-slate-200 pb-4">
              <h3 className="font-bold text-sm text-slate-950 font-sans mb-1">Agenda No. 02</h3>
              <p className="font-semibold text-slate-800 mb-1">
                To receive, consider and adopt the Directors' Report, Auditors' Report and Audited Financial Statements for the year ended {meetingInfo.fyEnded}
              </p>
              <p className="text-justify mb-2">
                <strong>Discussion:</strong> The Chairman presented the Directors' Report together with the Auditors' Report and the Audited Financial Statements of the Company for the financial year ended {meetingInfo.fyEnded}. After detailed discussion, the shareholders expressed satisfaction over the performance and financial position of the Company.
              </p>
              <p className="text-justify bg-slate-50 p-2.5 rounded border border-slate-200 font-sans text-[11px]">
                <strong>Decision:</strong> RESOLVED THAT the Directors' Report, Auditors' Report and the Audited Financial Statements of the Company for the year ended {meetingInfo.fyEnded} be and are hereby adopted and approved unanimously.
              </p>
            </div>

            {/* Agenda 3 */}
            <div className="mb-4">
              <h3 className="font-bold text-sm text-slate-950 font-sans mb-1">Agenda No. 03</h3>
              <p className="font-semibold text-slate-800 mb-1">
                To appoint Auditor(s) and fix their remuneration for the year ending {meetingInfo.fyNext}
              </p>
              <p className="text-justify mb-2">
                <strong>Discussion:</strong> The Managing Director informed the meeting that the existing auditors, <strong>{meetingInfo.auditorName}</strong>, Chartered Accountants, being eligible, offered themselves for re-appointment. The auditors proposed a 15% increase in their remuneration from the previous year, excluding VAT, for the next financial year.
              </p>
              <p className="text-justify bg-slate-50 p-2.5 rounded border border-slate-200 font-sans text-[11px]">
                <strong>Decision:</strong> RESOLVED THAT <strong>{meetingInfo.auditorName}</strong>, Chartered Accountants, be and are hereby re-appointed as the Auditors of the Company for the financial year ending {meetingInfo.fyNext} and they shall hold office until the conclusion of the next Annual General Meeting at a remuneration reflecting a 15% increase from the previous year, excluding VAT.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          PAGE 4: MINUTES AGENDA 4-5 & CONCLUSION
      ========================================================================= */}
      {shouldShow('minutes') && (
        <div className="a4-page w-[210mm] min-h-[297mm] bg-white text-slate-900 p-16 shadow-2xl relative font-serif text-[12px] leading-relaxed border border-slate-300 print:border-none print:shadow-none print:p-12 flex flex-col justify-between">
          <div>
            {/* Agenda 4 */}
            <div className="mb-6 border-b border-slate-200 pb-4">
              <h3 className="font-bold text-sm text-slate-950 font-sans mb-1">Agenda No. 04</h3>
              <p className="font-semibold text-slate-800 mb-1">
                To consider and approve the recommendation of the Board of Directors regarding declaration of dividend for the financial year ended {meetingInfo.fyEnded}
              </p>
              <p className="text-justify mb-2">
                <strong>Discussion:</strong> The Board of Directors recommended regarding the declaration of dividend for the financial year ended {meetingInfo.fyEnded}. The shareholders considered the recommendation.
              </p>
              <p className="text-justify bg-slate-50 p-2.5 rounded border border-slate-200 font-sans text-[11px]">
                <strong>Decision:</strong> RESOLVED THAT the recommendation of the Board of Directors regarding the declaration of dividend for the financial year ended {meetingInfo.fyEnded} be and is hereby approved. <em>(Note: The Board recommended Nil Dividend for the year.)</em>
              </p>
            </div>

            {/* Agenda 5 */}
            <div className="mb-6 border-b border-slate-200 pb-4">
              <h3 className="font-bold text-sm text-slate-950 font-sans mb-1">Agenda No. 05</h3>
              <p className="font-semibold text-slate-800 mb-1">
                Any other business with permission of the Chair
              </p>
              <p className="text-justify mb-2">
                <strong>Discussion:</strong> The Chairman invited shareholders to discuss any other matter with permission of the Chair. No additional business was raised.
              </p>
              <p className="text-justify bg-slate-50 p-2.5 rounded border border-slate-200 font-sans text-[11px]">
                <strong>Decision:</strong> RESOLVED THAT no other business was transacted at the meeting and all matters discussed during the AGM be and are hereby recorded.
              </p>
            </div>

            {/* Conclusion */}
            <div className="mb-12">
              <h3 className="font-bold text-sm text-slate-950 font-sans mb-1">Conclusion</h3>
              <p className="text-justify">
                There being no other business to transact, the meeting ended with a vote of thanks to the Chair.
              </p>
            </div>
          </div>

          <div className="flex justify-between items-end pt-8 border-t border-slate-300 font-sans text-xs">
            <div>
              <p className="font-bold uppercase text-slate-900">{meetingInfo.chairmanName}</p>
              <p className="text-slate-500">Chairman</p>
            </div>
            <div className="text-right">
              <p className="font-bold uppercase text-slate-900">{meetingInfo.mdName}</p>
              <p className="text-slate-500">Managing Director</p>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          PAGE 5: FORM 23B (NOTICE BY AUDITOR)
      ========================================================================= */}
      {shouldShow('form23b') && (
        <div className="a4-page w-[210mm] min-h-[297mm] bg-white text-slate-900 p-16 shadow-2xl relative font-serif text-[12px] leading-relaxed border border-slate-300 print:border-none print:shadow-none print:p-12 flex flex-col justify-between">
          <div>
            <div className="text-right font-sans text-[10px] text-slate-400 mb-4">
              1. Ins by G. S. R. 195 dated 9th February, 1961
            </div>

            <h2 className="text-center font-bold text-lg uppercase text-slate-950 mb-1 font-sans">
              Form No. 23B
            </h2>

            <div className="text-center text-xs font-sans text-slate-700 mb-4">
              <strong>Name of the Company:</strong> {meetingInfo.companyName} &nbsp;&nbsp;|&nbsp;&nbsp;{' '}
              <strong>Registration No.:</strong> {meetingInfo.regNo}
            </div>

            <div className="text-center border-t border-b border-slate-400 py-2 mb-8 font-sans">
              <h3 className="font-bold text-sm text-slate-900 uppercase">
                THE COMPANIES ACT, 1994
              </h3>
              <p className="text-xs text-slate-700 font-semibold">
                Notice by Auditor Pursuant to Section 210 (2)
              </p>
            </div>

            <p className="text-justify leading-loose mb-12">
              I/We, <strong>{meetingInfo.auditorName}</strong> Chartered Accountants hereby give notice to the Registrar of Joint Stock Companies pursuant to Section 210 (2) of the Companies Act, 1994 that I/We have received intimation dated the <strong>{meetingInfo.agmDate}</strong> from <strong>{meetingInfo.companyName}</strong> of my/our having been appointed as auditor(s) for the year <strong>{meetingInfo.fyNext}</strong> and that I/We have <strong>Accepted</strong> to accept the appointment as auditor(s) of the company.
            </p>

            <div className="space-y-2 mt-8 font-sans text-xs">
              <p className="font-bold text-slate-900">{meetingInfo.auditorName}</p>
              <p className="text-slate-600">Chartered Accountants</p>
              <p className="text-slate-500">{meetingInfo.auditorAddress}</p>
            </div>
          </div>

          <div className="border-t border-slate-300 pt-3 text-[10px] text-slate-500 font-sans">
            <p>1. Ins by G. S. R. 195 dated 9th February, 1961</p>
            <p>2. Where the signatory is a partner of a firm of Chartered Accountants, the name of the firm also is to be indicated.</p>
          </div>
        </div>
      )}

      {/* =========================================================================
          PAGE 6: ATTENDANCE LIST OF AGM
      ========================================================================= */}
      {shouldShow('attendance') && (
        <div className="a4-page w-[210mm] min-h-[297mm] bg-white text-slate-900 p-16 shadow-2xl relative font-serif text-[12px] leading-relaxed border border-slate-300 print:border-none print:shadow-none print:p-12 flex flex-col justify-between">
          <div>
            <h2 className="text-center text-base font-bold underline uppercase tracking-wide text-slate-950 mb-3 font-sans">
              ATTENDANCE LIST OF AGM
            </h2>

            <div className="bg-slate-50 border border-slate-300 p-3 rounded font-sans text-xs mb-4 space-y-1">
              <p><strong>Name of the Company:</strong> {meetingInfo.companyName}</p>
              <p><strong>Date & Time:</strong> {meetingInfo.agmDate} at {meetingInfo.agmTime}</p>
              <p><strong>Meeting Location:</strong> {meetingInfo.meetingLocation}</p>
            </div>

            <table className="w-full border-collapse border border-slate-400 font-sans text-[11px] mb-4">
              <thead>
                <tr className="bg-slate-100 text-slate-800">
                  <th className="border border-slate-400 p-1.5 text-center w-10">SL</th>
                  <th className="border border-slate-400 p-1.5 text-left">Name</th>
                  <th className="border border-slate-400 p-1.5 text-left w-36">Designation</th>
                  <th className="border border-slate-400 p-1.5 text-center w-36">Signature</th>
                </tr>
              </thead>
              <tbody>
                {people.map((p, idx) => (
                  <tr key={p.id}>
                    <td className="border border-slate-400 p-1.5 text-center">{idx + 1}</td>
                    <td className="border border-slate-400 p-1.5 font-medium">{p.name}</td>
                    <td className="border border-slate-400 p-1.5">{p.designation}</td>
                    <td className="border border-slate-400 p-1.5 text-center italic text-slate-400 font-serif">
                      Sign / স্বাক্ষরিত
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* =========================================================================
          PAGE 7: CONSENT TO HOLD AGM AT SHORTER NOTICE (SECTION 85(1)(a))
      ========================================================================= */}
      {shouldShow('consent') && (
        <div className="a4-page w-[210mm] min-h-[297mm] bg-white text-slate-900 p-16 shadow-2xl relative font-serif text-[13px] leading-relaxed border border-slate-300 print:border-none print:shadow-none print:p-12 flex flex-col justify-between">
          <div>
            <div className="mb-6 font-sans text-xs text-slate-700 leading-relaxed">
              <p>To,</p>
              <p>The Board of Directors</p>
              <p className="font-bold text-slate-900">{meetingInfo.companyName}</p>
              <p>{meetingInfo.meetingLocation}</p>
            </div>

            <h3 className="font-bold text-sm text-slate-950 font-sans border-b border-slate-300 pb-1 mb-4">
              Subject: Consent to Hold Annual General Meeting at Shorter Notice
            </h3>

            {/* Displaying consent of active person or Chairman as representative */}
            {(() => {
              const activePerson =
                people.find((p) => p.id === data.activeConsentPersonId) || people[0];
              return (
                <div className="space-y-4 text-justify text-[13px]">
                  <p>
                    I, <strong>{activePerson.name}</strong>, representing as <strong>{activePerson.designation}</strong> of <strong>{meetingInfo.companyName}</strong>, holding <strong>{activePerson.shares}</strong> shares of Tk. {meetingInfo.shareNominalValue}/- each in the company, resident of <strong>{activePerson.fullAddress}</strong>:
                  </p>
                  <p>
                    Hereby give consent pursuant to provisions of Section 85(1) (a) of the Companies Act, 1994 to hold the Annual General Meeting of the company scheduled to be held on <strong>{meetingInfo.agmDate}</strong> at <strong>{meetingInfo.agmTime}</strong> at {meetingInfo.meetingLocation}.
                  </p>

                  <div className="mt-16 pt-8 font-sans text-xs">
                    <p className="font-bold text-slate-900">Signature: _______________________</p>
                    <p className="text-slate-600 mt-1">Name: {activePerson.name}</p>
                    <p className="text-slate-600">Designation: {activePerson.designation}</p>
                    <p className="text-slate-500 font-mono text-[11px]">NID: {activePerson.nid}</p>
                  </div>
                </div>
              );
            })()}
          </div>

          <div className="border-t border-slate-300 pt-2 text-[10px] text-slate-500 font-sans">
            Statutory Consent pursuant to Section 85(1)(a) & 101(1) of The Companies Act, 1994
          </div>
        </div>
      )}

      {/* =========================================================================
          PAGE 8: SUBMISSION FOR RETURN FILING (RJSC COVERING LETTER)
      ========================================================================= */}
      {shouldShow('submission') && (
        <div className="a4-page w-[210mm] min-h-[297mm] bg-white text-slate-900 p-16 shadow-2xl relative font-serif text-[12px] leading-relaxed border border-slate-300 print:border-none print:shadow-none print:p-12 flex flex-col justify-between">
          <div>
            <div className="mb-6 font-sans text-xs text-slate-700 leading-relaxed">
              <p>To</p>
              <p>The Registrar</p>
              <p className="font-bold text-slate-900">Registrar of Joint Stock Companies & Firms (RJSC)</p>
              <p>TCB Bhaban, 6th Floor,</p>
              <p>1 Kawran Bazar, Dhaka</p>
            </div>

            <h3 className="font-bold text-sm text-slate-950 font-sans border-b border-slate-300 pb-1 mb-4">
              Subject: Submission for Annual Return Filing
            </h3>

            <p className="mb-4">Dear Sir/Madam,</p>

            <p className="text-justify mb-4">
              This is to inform you that I, <strong>{meetingInfo.chairmanName}</strong>, Chairman/Director of <strong>{meetingInfo.companyName}</strong> (Reg No: <strong>{meetingInfo.regNo}</strong>), bearing NID/Passport Number: {meetingInfo.chairmanNid}, Date of Birth: {meetingInfo.chairmanDob}, Mobile Number: {meetingInfo.chairmanMobile}, and Email Address: {meetingInfo.chairmanEmail}, have authorized the following person to submit online returns on behalf of the company for record in your esteemed office:
            </p>

            <div className="bg-slate-50 border border-slate-300 p-3 rounded font-sans text-xs mb-6 space-y-1">
              <h4 className="font-bold text-slate-900 uppercase text-[11px] mb-1">Authorized Person:</h4>
              <p><strong>Name:</strong> {meetingInfo.authorizedPerson.name}</p>
              <p><strong>NID:</strong> {meetingInfo.authorizedPerson.nid}</p>
              <p><strong>Date of Birth:</strong> {meetingInfo.authorizedPerson.dob}</p>
              <p><strong>Mobile:</strong> {meetingInfo.authorizedPerson.mobile}</p>
              <p><strong>Email:</strong> {meetingInfo.authorizedPerson.email}</p>
            </div>

            <p className="text-justify mb-6">
              I hereby affirm that all the attached documents submitted have been prepared in accordance with the applicable laws of Bangladesh, and that the information provided is true, correct, and genuine.
            </p>

            <p className="mb-8">Thank you for your kind attention.</p>

            <div className="font-sans text-xs">
              <p className="mb-6">Sincerely,</p>
              <p className="font-bold uppercase text-slate-900">{meetingInfo.chairmanName}</p>
              <p className="text-slate-600">Chairman, {meetingInfo.companyName}</p>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          PAGE 9: RETURN OF ALLOTMENTS & SUMMARY OF CAPITAL
      ========================================================================= */}
      {shouldShow('allotments') && (
        <div className="a4-page w-[210mm] min-h-[297mm] bg-white text-slate-900 p-16 shadow-2xl relative font-serif text-[12px] leading-relaxed border border-slate-300 print:border-none print:shadow-none print:p-12 flex flex-col justify-between">
          <div>
            <h2 className="text-center font-bold text-base uppercase text-slate-950 mb-4 font-sans underline">
              ANNUAL SUMMARY OF SHARE CAPITAL & ALLOTMENTS
            </h2>

            <div className="space-y-2 text-justify text-[11px] leading-normal font-sans">
              <p>
                <strong>1.</strong> Total number of shares taken up to the <strong>{meetingInfo.agmDate}</strong>: <strong>{summary.totalShares.toLocaleString()} Shares</strong>
              </p>
              <p>
                <strong>2.</strong> Number of shares issued subject to payment wholly in cash: <strong>{summary.totalShares.toLocaleString()} Shares</strong>
              </p>
              <p>
                <strong>3.</strong> Number of shares issued as fully paid-up otherwise than in cash: <strong>Nil</strong>
              </p>
              <p>
                <strong>4.</strong> (a) Number of Shares issued as partly paid-up: <strong>Nil</strong>
              </p>
              <p>
                <strong>5.</strong> There has been called up on each of shares: <strong>TK. {meetingInfo.shareNominalValue}/- of {meetingInfo.shareClass} class.</strong>
              </p>
              <p>
                <strong>6.</strong> Total amount received along with application for shares: <strong>TK. {formatBdtNoDec(summary.totalCapitalBdt)}/-</strong>
              </p>
              <p>
                <strong>7.</strong> Total amount of calls unpaid: <strong>Nil</strong>
              </p>
              <p>
                <strong>8.</strong> Total amount of sums paid or allowed in respect of shares or debentures since date of last summary: <strong>Nil</strong>
              </p>
              <p>
                <strong>9.</strong> Total number of shares forfeited: <strong>Nil</strong>
              </p>
              <p>
                <strong>10.</strong> Total amount of share-warrants outstanding: <strong>Nil</strong>
              </p>
              <p>
                <strong>11.</strong> Total amount of debt due from the Company in respect of all mortgages and charges: <strong>TK. 00/-</strong>
              </p>
            </div>

            <div className="mt-8 bg-slate-50 border border-slate-300 p-3 rounded text-[11px] font-sans">
              <h4 className="font-bold text-slate-800 uppercase mb-1">Notes:</h4>
              <p className="text-slate-600">
                a) Nominal value per ordinary share: TK. {meetingInfo.shareNominalValue}/-<br/>
                b) Aggregate paid-up capital: TK. {formatBdtNoDec(summary.totalCapitalBdt)}/- ({summary.totalShares.toLocaleString()} Ordinary Shares fully paid in cash).
              </p>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          PAGE 10: LIST OF PERSONS HOLDING SHARES (ITEM 19)
      ========================================================================= */}
      {shouldShow('shareholders') && (
        <div className="a4-page w-[210mm] min-h-[297mm] bg-white text-slate-900 p-16 shadow-2xl relative font-serif text-[11px] leading-relaxed border border-slate-300 print:border-none print:shadow-none print:p-12 flex flex-col justify-between">
          <div>
            <p className="text-justify font-sans text-xs mb-3">
              <strong>19.</strong> List of persons holding shares in <strong>{meetingInfo.companyName}</strong> on the <strong>{meetingInfo.agmDate}</strong> showing their names, addresses, and particulars:
            </p>

            <table className="w-full border-collapse border border-slate-400 font-sans text-[10px] mb-4">
              <thead>
                <tr className="bg-slate-100 text-slate-800">
                  <th className="border border-slate-400 p-1.5 text-center w-8">SL</th>
                  <th className="border border-slate-400 p-1.5 text-left w-36">Name in Full</th>
                  <th className="border border-slate-400 p-1.5 text-left w-36">Father/Husband</th>
                  <th className="border border-slate-400 p-1.5 text-left">Address & Nationality</th>
                  <th className="border border-slate-400 p-1.5 text-right w-16">Shares</th>
                </tr>
              </thead>
              <tbody>
                {people.map((p, idx) => (
                  <tr key={p.id}>
                    <td className="border border-slate-400 p-1 text-center">{idx + 1}</td>
                    <td className="border border-slate-400 p-1 font-bold">{p.name}</td>
                    <td className="border border-slate-400 p-1">{p.father}</td>
                    <td className="border border-slate-400 p-1">{p.fullAddress} (Bangladeshi)</td>
                    <td className="border border-slate-400 p-1 text-right font-mono font-bold">{p.shares}</td>
                  </tr>
                ))}
                <tr className="bg-slate-50 font-bold">
                  <td colSpan={4} className="border border-slate-400 p-1 text-right uppercase">
                    Total Shareholding:
                  </td>
                  <td className="border border-slate-400 p-1 text-right font-mono font-black">
                    {summary.totalShares.toLocaleString()}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* =========================================================================
          PAGE 11: LIST OF DIRECTORS & OFFICERS (ITEM 20 & 21)
      ========================================================================= */}
      {shouldShow('directors') && (
        <div className="a4-page w-[210mm] min-h-[297mm] bg-white text-slate-900 p-16 shadow-2xl relative font-serif text-[11px] leading-relaxed border border-slate-300 print:border-none print:shadow-none print:p-12 flex flex-col justify-between">
          <div>
            <p className="text-justify font-sans text-xs mb-3">
              <strong>20.</strong> Names and Addresses of the persons who are the Directors of <strong>{meetingInfo.companyName}</strong> on <strong>{meetingInfo.agmDate}</strong>:
            </p>

            <table className="w-full border-collapse border border-slate-400 font-sans text-[10px] mb-6">
              <thead>
                <tr className="bg-slate-100 text-slate-800">
                  <th className="border border-slate-400 p-1.5 text-center w-8">SL</th>
                  <th className="border border-slate-400 p-1.5 text-left w-48">Name & Designation</th>
                  <th className="border border-slate-400 p-1.5 text-left">Address</th>
                </tr>
              </thead>
              <tbody>
                {people
                  .filter(
                    (p) =>
                      p.designation.toLowerCase().includes('director') ||
                      p.designation.toLowerCase().includes('chairman')
                  )
                  .map((p, idx) => (
                    <tr key={p.id}>
                      <td className="border border-slate-400 p-1 text-center">{idx + 1}</td>
                      <td className="border border-slate-400 p-1 font-bold">
                        {p.name}<br/>
                        <span className="text-slate-500 font-normal">({p.designation})</span>
                      </td>
                      <td className="border border-slate-400 p-1">{p.fullAddress}</td>
                    </tr>
                  ))}
              </tbody>
            </table>

            <p className="text-justify font-sans text-xs mb-2">
              <strong>21.</strong> Names and Addresses of the Managing Director, Auditors of <strong>{meetingInfo.companyName}</strong> on <strong>{meetingInfo.agmDate}</strong>:
            </p>

            <table className="w-full border-collapse border border-slate-400 font-sans text-[10px] mb-6">
              <thead>
                <tr className="bg-slate-100 text-slate-800">
                  <th className="border border-slate-400 p-1.5 text-left w-48">Names</th>
                  <th className="border border-slate-400 p-1.5 text-left">Addresses</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-slate-400 p-1.5 font-bold">
                    {meetingInfo.chairmanName}<br/><span className="font-normal text-slate-500">Chairman</span>
                  </td>
                  <td className="border border-slate-400 p-1.5">{meetingInfo.chairmanAddress}</td>
                </tr>
                <tr>
                  <td className="border border-slate-400 p-1.5 font-bold">
                    {meetingInfo.mdName}<br/><span className="font-normal text-slate-500">Managing Director</span>
                  </td>
                  <td className="border border-slate-400 p-1.5">{meetingInfo.mdAddress}</td>
                </tr>
                <tr>
                  <td className="border border-slate-400 p-1.5 font-bold">
                    {meetingInfo.auditorName}<br/><span className="font-normal text-slate-500">Chartered Accountants</span>
                  </td>
                  <td className="border border-slate-400 p-1.5">{meetingInfo.auditorAddress}</td>
                </tr>
              </tbody>
            </table>

            <div className="text-[11px] space-y-1 mb-8">
              <p>I, <strong>{meetingInfo.chairmanName}</strong>, do hereby certify that:</p>
              <p className="text-justify">
                a) The above list and Summary truly and correctly states the facts as they stood on <strong>{meetingInfo.agmDate}</strong>. The Company has not since the date of its Incorporation or Last Return issued any invitation to the public to subscribe for any shares or debentures of the Company; and
              </p>
              <p className="text-justify">
                b) The excess of the number of its members beyond fifty (if any) shown in the list are the persons who are in the employment of the Company.
              </p>
            </div>
          </div>

          <div className="flex justify-between items-end pt-4 border-t border-slate-300 font-sans text-xs">
            <div>
              <p className="font-bold uppercase text-slate-900">{meetingInfo.chairmanName}</p>
              <p className="text-slate-500">Chairman</p>
            </div>
            <div className="text-right">
              <p className="font-bold uppercase text-slate-900">{meetingInfo.mdName}</p>
              <p className="text-slate-500">Managing Director</p>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          PAGE 12: SCHEDULE X (COVER & REGISTRATION SUMMARY)
      ========================================================================= */}
      {shouldShow('scheduleX') && (
        <div className="a4-page w-[210mm] min-h-[297mm] bg-white text-slate-900 p-16 shadow-2xl relative font-serif text-[13px] leading-relaxed border border-slate-300 print:border-none print:shadow-none print:p-12 flex flex-col justify-between text-center">
          <div className="my-auto space-y-6">
            <h3 className="font-bold text-sm uppercase tracking-widest text-slate-700 font-sans">
              THE COMPANIES ACT, (ACT, XVIII OF 1994)
            </h3>
            <h2 className="text-xl font-black uppercase text-slate-900 font-sans">
              SCHEDULE- X
            </h2>
            <div className="py-4">
              <h1 className="text-2xl font-black uppercase text-slate-950 font-serif tracking-wider">
                {meetingInfo.companyName}
              </h1>
              <p className="text-xs font-sans text-slate-500 uppercase tracking-widest mt-1">
                NAME OF THE COMPANY
              </p>
            </div>

            <div className="border-t border-b border-slate-300 py-3 font-sans text-xs text-slate-800">
              <p>Regd. No. <strong>{meetingInfo.regNo}</strong></p>
            </div>

            <div className="space-y-1 font-sans text-xs pt-4">
              <p className="font-bold uppercase text-slate-700">REGISTERED OFFICE</p>
              <p className="text-slate-900 font-medium max-w-md mx-auto">{meetingInfo.meetingLocation}</p>
            </div>

            <div className="pt-8 max-w-lg mx-auto">
              <h3 className="font-bold text-sm uppercase text-slate-800 font-sans leading-relaxed">
                SUMMARY OF SHARE CAPITAL AND SHARE LIST OF PERSONS HOLDING SHARES, NAME AND ADDRESSES OF DIRECTORS, NAME AND ADDRESSES OF MANAGERS.
              </h3>
            </div>

            <div className="pt-12 font-sans text-xs text-slate-600">
              <p>Dated: <strong>{meetingInfo.agmDate}</strong></p>
            </div>
          </div>

          <div className="border-t border-slate-300 pt-3 text-[10px] text-slate-500 font-sans">
            Registrar of Joint Stock Companies & Firms (RJSC), Bangladesh
          </div>
        </div>
      )}
    </div>
  );
};
