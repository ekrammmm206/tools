import React from 'react';
import { DocumentState } from '../types/company';
import { formatSharesWithWords, calculateTotalShares } from '../utils/numberToWords';
import { AVATAR_SVGS } from '../data/defaultData';

interface DocumentPreviewProps {
  data: DocumentState;
  zoom: number; // percentage e.g. 100
}

export const DocumentPreview: React.FC<DocumentPreviewProps> = ({ data, zoom }) => {
  const { company, directors, subscribers, signatories, includedSections } = data;

  const totalShares = calculateTotalShares(subscribers.map((s) => s.shares));
  const totalSharesFormatted = formatSharesWithWords(totalShares, company.numberingSystem);

  // Divide subscribers into chunks for clean A4 printing without awkward cell clipping
  // 3-4 subscribers per page fits nicely on A4 with all statutory details (NID, TIN, Father, Mother, Photo, Signature)
  const SUBSCRIBERS_PER_PAGE = 3;
  const subscriberPages: (typeof subscribers)[] = [];
  for (let i = 0; i < subscribers.length; i += SUBSCRIBERS_PER_PAGE) {
    subscriberPages.push(subscribers.slice(i, i + SUBSCRIBERS_PER_PAGE));
  }
  if (subscriberPages.length === 0) {
    subscriberPages.push([]);
  }

  const getSubscriberPhoto = (sub: typeof subscribers[0]) => {
    if (sub.photoUrl) {
      return (
        <img
          src={sub.photoUrl}
          alt={sub.name}
          className="w-full h-full object-cover"
        />
      );
    }
    const avatarKey = sub.avatarStyle || 'man1';
    const svgData = AVATAR_SVGS[avatarKey] || AVATAR_SVGS.man1;
    return (
      <img
        src={svgData}
        alt={sub.name}
        className="w-full h-full object-contain"
      />
    );
  };

  const getSignatureDisplay = (text?: string, img?: string) => {
    if (img) {
      return <img src={img} alt="Signature" className="max-h-12 max-w-[130px] object-contain mx-auto" />;
    }
    if (text) {
      return (
        <span
          style={{
            fontFamily: "'Brush Script MT', 'Caveat', 'Segoe Script', cursive",
            fontSize: '20px',
            color: '#0f172a'
          }}
        >
          {text}
        </span>
      );
    }
    return (
      <svg width="120" height="40" viewBox="0 0 120 40" className="mx-auto text-slate-800">
        <path d="M10,32 Q35,8 60,30 T110,25" fill="none" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    );
  };

  return (
    <div
      className="flex flex-col items-center gap-8 py-8 transition-transform duration-200 origin-top print:p-0 print:m-0 print:gap-0"
      style={{
        transform: `scale(${zoom / 100})`,
        transformOrigin: 'top center'
      }}
    >
      {/* PAGE 1: MD Confirmation Cover */}
      {includedSections.cover && (
        <div className="a4-page bg-white shadow-xl print:shadow-none border border-slate-200 print:border-none w-[210mm] min-h-[297mm] p-[25mm] box-border text-black font-serif relative flex flex-col justify-between">
          <div className="text-center border-b-2 border-black pb-4 mb-8">
            <h1 className="text-2xl font-bold uppercase tracking-wider">{company.companyName}</h1>
            <p className="text-xs text-slate-600 mt-1">Registrar of Joint Stock Companies & Firms (RJSC), Bangladesh</p>
          </div>

          <div className="my-auto px-6 py-12 text-center">
            <div className="w-20 h-20 mx-auto mb-8 rounded-full border-2 border-slate-800 flex items-center justify-center text-slate-800">
              <span className="font-bold text-lg tracking-widest">RJSC</span>
            </div>
            
            <h2 className="text-xl font-bold mb-6 underline">STATUTORY INCORPORATION DOSSIER</h2>
            
            <div className="text-lg leading-relaxed text-justify max-w-xl mx-auto p-8 border border-slate-300 rounded bg-slate-50/50">
              <p>
                I am <strong className="font-bold underline">{company.presenterName || 'Md. Abdul Hye'}</strong>,{' '}
                {company.presenterDesignation || 'Managing Director'} of{' '}
                <strong className="font-bold underline">{company.companyName || 'The Royal Nirman Ltd'}</strong>,
                confirming that the statutory information submitted in this application and accompanying forms is true,
                correct, and prepared in accordance with the provisions of The Companies Act, 1994.
              </p>
            </div>

            <div className="mt-16 inline-block text-center">
              <div className="w-56 border-b border-black pb-1 mb-2">
                {getSignatureDisplay(company.presenterName)}
              </div>
              <p className="font-bold">{company.presenterName}</p>
              <p className="text-sm">{company.presenterDesignation}</p>
              <p className="text-xs text-slate-600">{company.companyName}</p>
              <p className="text-xs text-slate-600 mt-1">Date: {company.date}</p>
            </div>
          </div>

          <div className="text-center text-xs text-slate-500 border-t border-slate-300 pt-3 flex justify-between">
            <span>The Companies Act, 1994 (Act XVIII of 1994)</span>
            <span>Cover Page</span>
          </div>
        </div>
      )}

      {/* PAGE 2: Form I - Declaration on Registration of Company */}
      {includedSections.formI && (
        <div className="a4-page bg-white shadow-xl print:shadow-none border border-slate-200 print:border-none w-[210mm] min-h-[297mm] p-[20mm] box-border text-black font-serif relative flex flex-col justify-between">
          <div>
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold uppercase">Form - I</h2>
              <h2 className="text-lg font-bold">Declaration on Registration of Company</h2>
              <h3 className="text-sm font-semibold tracking-wide mt-1">THE COMPANIES ACT, 1994</h3>
              <p className="text-xs italic">(Ref. Section 25)</p>
            </div>

            <div className="space-y-4 text-[14px] leading-relaxed">
              <p>
                <strong>Name of the Company: </strong>
                <span className="font-bold">{company.companyName}</span>
              </p>

              <p className="text-justify">
                Declaration of compliance with the requirements of the Companies Act, 1994 made pursuant to section
                25 (2) on behalf of a company proposed to be Registered as the{' '}
                <strong className="font-bold">{company.companyName}</strong>.
              </p>

              <div className="border-t border-black/30 pt-3">
                <p>
                  <strong>Presented for filing by: </strong>
                  <span className="font-bold">{company.presenterName}</span>
                </p>
              </div>

              <p className="text-justify leading-relaxed indent-6">
                I, <strong className="font-bold">{company.presenterName}</strong> of{' '}
                <span className="underline">{company.presenterAddress}</span> do solemnly and sincerely declare that I am
                an *Advocate/ Attorney/ A Pleader entitled to appear before a High Court who is engaged in the formation of
                the company/ a person named in the Articles as a *Director/ Manager/ Secretary of the{' '}
                <strong className="font-bold">{company.companyName}</strong> and that all the requirements of the Companies
                Act, 1994 in respect of matters precedent to the registration of the said company and incidental there to
                have been complied with, save only the payment to the fees and sums payable on registration and I make the
                solemn declaration conscientiously believing the same to be true.
              </p>

              <div className="pt-10 flex justify-between items-end">
                <div>
                  <p className="text-sm">
                    <strong>Date: </strong>
                    <span>{company.date}</span>
                  </p>
                  <p className="text-sm text-slate-700">Place: Dhaka, Bangladesh</p>
                </div>
                <div className="text-center">
                  <div className="w-52 border-b border-black pb-1 mb-2 min-h-12 flex items-end justify-center">
                    {getSignatureDisplay(company.presenterName)}
                  </div>
                  <p className="font-bold text-sm">Signature of Declarant</p>
                  <p className="text-xs">({company.presenterName})</p>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-black/40 text-xs text-slate-700">
                <p className="font-bold mb-1">Note: The declaration need not to be:</p>
                <p>(a) Signed before a magistrate or an officer competent to administer oaths or</p>
                <p>(b) Stamped as an affidavit</p>
              </div>
            </div>
          </div>

          <div className="text-center text-xs text-slate-500 border-t border-slate-300 pt-2 flex justify-between">
            <span>RJSC Form - I (Section 25)</span>
            <span>Page 2</span>
          </div>
        </div>
      )}

      {/* PAGE 3: FORM IX - Consent of Director to Act */}
      {includedSections.formIX && (
        <div className="a4-page bg-white shadow-xl print:shadow-none border border-slate-200 print:border-none w-[210mm] min-h-[297mm] p-[20mm] box-border text-black font-serif relative flex flex-col justify-between">
          <div>
            <div className="text-center mb-4">
              <h2 className="text-xl font-bold uppercase">FORM IX</h2>
              <h2 className="text-lg font-bold">Consent of Director to Act</h2>
              <h3 className="text-sm font-semibold tracking-wide">THE COMPANIES ACT, 1994</h3>
              <p className="text-xs italic">(See Section 92)</p>
              <div className="inline-block mt-1 px-3 py-0.5 border border-black text-xs font-bold">
                Filing Fee: {company.filingFee || 'Tk. 200/-'}
              </div>
            </div>

            <div className="text-[13.5px] leading-relaxed space-y-2 mb-4">
              <p>
                <strong>Name of the Company: </strong>
                <span className="font-bold">{company.companyName}</span>
              </p>
              <p className="text-justify">
                Consent to act as Director/Directors of the <strong className="font-bold">{company.companyName}</strong> to
                be signed and filed pursuant to section 92 (1) (Ka) Presented for filing by{' '}
                <strong className="font-bold">{company.presenterName}</strong>.
              </p>
              <p className="text-justify">
                To the Registrar of Joint Stock Companies &amp; Firms Dhaka, Bangladesh, I/we, undersigned, hereby testify
                my/our consent to act as Director/Directors of the{' '}
                <strong className="font-bold">{company.companyName}</strong> pursuant to section 92 (1) (ka) the Companies
                Act, 1994.
              </p>
            </div>

            {/* Directors Table */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-black text-[13px] my-2">
                <thead>
                  <tr className="bg-slate-100/70">
                    <th className="border border-black p-2 w-10 text-center">SL</th>
                    <th className="border border-black p-2 w-44 text-center font-bold">SIGNATURE</th>
                    <th className="border border-black p-2 text-center font-bold">ADDRESS</th>
                    <th className="border border-black p-2 w-28 text-center font-bold">DESCRIPTION</th>
                  </tr>
                </thead>
                <tbody>
                  {directors.map((dir, idx) => (
                    <tr key={dir.id || idx}>
                      <td className="border border-black p-2 text-center align-middle font-mono text-xs">
                        {idx + 1}
                      </td>
                      <td className="border border-black p-2 text-center align-middle">
                        <div className="py-1">
                          {getSignatureDisplay(dir.name || dir.signatureText, dir.signatureImg)}
                          <p className="text-xs font-sans text-slate-700 mt-1 font-semibold">{dir.name}</p>
                        </div>
                      </td>
                      <td className="border border-black p-2 align-middle text-left leading-snug">
                        {dir.address}
                      </td>
                      <td className="border border-black p-2 text-center align-middle font-medium">
                        {dir.description || 'Business'}
                      </td>
                    </tr>
                  ))}
                  {directors.length === 0 && (
                    <tr>
                      <td colSpan={4} className="border border-black p-4 text-center text-slate-400 italic">
                        No directors added yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="mt-4 pt-3 flex justify-between items-center text-sm">
              <p>
                <strong>Date: </strong> The {company.date}
              </p>
              <p className="text-xs text-slate-600">Place: Dhaka, Bangladesh</p>
            </div>

            <div className="mt-4 p-2 bg-slate-50 border border-slate-300 text-[11px] text-slate-600 leading-tight">
              <strong>NOTES:</strong> If a Director Signs by his agent authorized in writing, the authority must be
              produced and a copy filed with the Registrar.
            </div>
          </div>

          <div className="text-center text-xs text-slate-500 border-t border-slate-300 pt-2 flex justify-between">
            <span>RJSC Form - IX (Section 92)</span>
            <span>Page 3</span>
          </div>
        </div>
      )}

      {/* PAGE 4+: Memorandum & Articles of Association Subscribers */}
      {includedSections.moa &&
        subscriberPages.map((pageSubs, pageIdx) => {
          const isFirstMoaPage = pageIdx === 0;
          const isLastMoaPage = pageIdx === subscriberPages.length - 1;
          const globalStartIndex = pageIdx * SUBSCRIBERS_PER_PAGE;

          return (
            <div
              key={`moa-page-${pageIdx}`}
              className="a4-page bg-white shadow-xl print:shadow-none border border-slate-200 print:border-none w-[210mm] min-h-[297mm] p-[18mm] box-border text-black font-serif relative flex flex-col justify-between"
            >
              <div>
                {isFirstMoaPage && (
                  <div className="mb-3">
                    <h2 className="text-center text-base font-bold uppercase tracking-wider mb-2">
                      MEMORANDUM OF ASSOCIATION / ARTICLES OF ASSOCIATION
                    </h2>
                    <p className="text-[12.5px] leading-snug text-justify">
                      We, the several persons, whose names and addresses are subscribed below are desirous of being
                      formed into a Company in accordance with this MEMORANDUM OF ASSOCIATION / ARTICLES OF ASSOCIATION
                      and we respectively agree to take the number of shares in the capital of the Company set opposite
                      to our respective names.
                    </p>
                  </div>
                )}

                {!isFirstMoaPage && (
                  <div className="text-center border-b border-black pb-1 mb-3">
                    <p className="text-xs uppercase font-bold tracking-wider">
                      Subscribers to the Memorandum of Association (Continued - Part {pageIdx + 1})
                    </p>
                  </div>
                )}

                {/* Subscribers Table */}
                <table className="w-full border-collapse border border-black text-[11.5px] table-fixed">
                  <thead>
                    <tr className="bg-slate-100/80">
                      <th className="border border-black p-1 text-center font-bold" style={{ width: '32px' }}>
                        Sl.
                      </th>
                      <th className="border border-black p-1 text-center font-bold" style={{ width: '40%' }}>
                        Names, Addresses and description of subscribers
                      </th>
                      <th className="border border-black p-1 text-center font-bold" style={{ width: '22%' }}>
                        No. of shares taken by each subscriber
                      </th>
                      <th className="border border-black p-1 text-center font-bold" style={{ width: '18%' }}>
                        Photo of Subscriber
                      </th>
                      <th className="border border-black p-1 text-center font-bold" style={{ width: '17%' }}>
                        Signature of Subscriber
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {pageSubs.map((sub, localIdx) => {
                      const absoluteIndex = globalStartIndex + localIdx + 1;
                      const formattedSubShares = formatSharesWithWords(sub.shares, company.numberingSystem);

                      return (
                        <tr key={sub.id || localIdx}>
                          <td className="border border-black p-1 text-center align-top font-bold text-xs pt-2">
                            {absoluteIndex}
                          </td>
                          <td className="border border-black p-1.5 align-top leading-tight text-[11px]">
                            <div className="space-y-0.5">
                              <p>
                                <strong className="inline-block w-24">Name:</strong> {sub.name}
                              </p>
                              <p>
                                <strong className="inline-block w-24">Address:</strong> {sub.address}
                              </p>
                              <p>
                                <strong className="inline-block w-24">Father's Name:</strong> {sub.father}
                              </p>
                              <p>
                                <strong className="inline-block w-24">Mother's name:</strong> {sub.mother}
                              </p>
                              <p>
                                <strong className="inline-block w-24">Date of Birth:</strong> {sub.dob}
                              </p>
                              <p>
                                <strong className="inline-block w-24">E-mail:</strong> {sub.email || '0'}
                              </p>
                              <p>
                                <strong className="inline-block w-24">Phone:</strong> {sub.phone}
                              </p>
                              <p>
                                <strong className="inline-block w-24">Tin:</strong> {sub.tin}
                              </p>
                              <p>
                                <strong className="inline-block w-24">Nationality:</strong> {sub.nationality}
                              </p>
                              <p>
                                <strong className="inline-block w-24">National Id:</strong> {sub.nid}
                              </p>
                            </div>
                          </td>
                          <td className="border border-black p-2 text-center align-middle">
                            <div className="text-[11.5px] font-semibold text-slate-900 leading-snug">
                              {formattedSubShares}
                            </div>
                            <div className="mt-3 inline-block px-2 py-0.5 border border-slate-800 text-[11px] font-bold uppercase tracking-wider bg-slate-50">
                              {sub.role || 'Director'}
                            </div>
                          </td>
                          <td className="border border-black p-1.5 text-center align-middle">
                            <div className="w-[85px] h-[100px] border border-slate-400 mx-auto overflow-hidden bg-slate-100 flex items-center justify-center shadow-xs">
                              {getSubscriberPhoto(sub)}
                            </div>
                          </td>
                          <td className="border border-black p-1.5 text-center align-middle">
                            <div className="w-[110px] min-h-[45px] mx-auto flex items-center justify-center">
                              {getSignatureDisplay(sub.signatureText || sub.name.split(' ')[0], sub.signatureImg)}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                  {isLastMoaPage && (
                    <tfoot>
                      <tr className="bg-slate-100 font-bold border-t-2 border-black">
                        <td colSpan={2} className="border border-black p-2 text-right uppercase tracking-wide">
                          Total
                        </td>
                        <td className="border border-black p-2 text-center text-xs text-blue-900">
                          {totalSharesFormatted}
                        </td>
                        <td colSpan={2} className="border border-black p-2 text-center text-[11px] text-slate-600">
                          Total Paid-Up Units: {subscribers.length}
                        </td>
                      </tr>
                    </tfoot>
                  )}
                </table>
              </div>

              <div className="text-center text-xs text-slate-500 border-t border-slate-300 pt-2 flex justify-between mt-3">
                <span>MoA / AoA Subscribers Schedule</span>
                <span>Page {4 + pageIdx}</span>
              </div>
            </div>
          );
        })}

      {/* PAGE 5: Document Signatures / Witnesses */}
      {includedSections.signatories && (
        <div className="a4-page bg-white shadow-xl print:shadow-none border border-slate-200 print:border-none w-[210mm] min-h-[297mm] p-[25mm] box-border text-black font-serif relative flex flex-col justify-between">
          <div>
            <div className="text-center mb-12">
              <h2 className="text-xl font-bold uppercase tracking-wider">Witnesses &amp; Attestation</h2>
              <h3 className="text-sm text-slate-600 mt-1">Pursuant to the Companies Act, 1994</h3>
              <p className="text-xs text-slate-500 italic mt-2">
                Witness to the above signatures of subscribers to the Memorandum &amp; Articles of Association
              </p>
            </div>

            <div className="grid grid-cols-2 gap-12 mt-16 pt-8">
              {/* Signatory 1 */}
              <div className="p-4 border border-slate-300 rounded bg-slate-50/50">
                <div className="h-16 border-b-2 border-black mb-4 flex items-end justify-center pb-1">
                  {getSignatureDisplay(signatories[0].name, signatories[0].signatureImg)}
                </div>
                <div className="space-y-1.5 text-xs">
                  <p>
                    <strong className="font-bold">Name: </strong>
                    <span className="font-semibold text-slate-900">{signatories[0].name}</span>
                  </p>
                  <p>
                    <strong className="font-bold">Address: </strong>
                    <span className="text-slate-800">{signatories[0].address}</span>
                  </p>
                  <p>
                    <strong className="font-bold">Phone: </strong>
                    <span className="text-slate-800">{signatories[0].phone}</span>
                  </p>
                  <p>
                    <strong className="font-bold">National Id: </strong>
                    <span className="font-mono text-slate-800">{signatories[0].nid}</span>
                  </p>
                </div>
                <div className="mt-4 pt-2 border-t border-dashed border-slate-300 text-center text-[11px] text-slate-500">
                  Witness / Advocate / Attester 1
                </div>
              </div>

              {/* Signatory 2 */}
              <div className="p-4 border border-slate-300 rounded bg-slate-50/50">
                <div className="h-16 border-b-2 border-black mb-4 flex items-end justify-center pb-1">
                  {getSignatureDisplay(signatories[1].name, signatories[1].signatureImg)}
                </div>
                <div className="space-y-1.5 text-xs">
                  <p>
                    <strong className="font-bold">Name: </strong>
                    <span className="font-semibold text-slate-900">{signatories[1].name}</span>
                  </p>
                  <p>
                    <strong className="font-bold">Address: </strong>
                    <span className="text-slate-800">{signatories[1].address}</span>
                  </p>
                  <p>
                    <strong className="font-bold">Phone: </strong>
                    <span className="text-slate-800">{signatories[1].phone}</span>
                  </p>
                  <p>
                    <strong className="font-bold">National Id: </strong>
                    <span className="font-mono text-slate-800">{signatories[1].nid}</span>
                  </p>
                </div>
                <div className="mt-4 pt-2 border-t border-dashed border-slate-300 text-center text-[11px] text-slate-500">
                  Witness / Advocate / Attester 2
                </div>
              </div>
            </div>

            <div className="mt-20 p-6 border border-slate-300 rounded text-center text-xs leading-relaxed text-slate-700 bg-white">
              <p className="font-bold mb-1">DECLARATION OF WITNESSES</p>
              <p>
                Signed and sealed in the presence of the above attesting witnesses after the contents of the Memorandum
                and Articles of Association were explained and confirmed by the respective subscribers and directors.
              </p>
              <p className="mt-4 text-slate-500">Dated this day of {company.date} at Dhaka, Bangladesh.</p>
            </div>
          </div>

          <div className="text-center text-xs text-slate-500 border-t border-slate-300 pt-2 flex justify-between">
            <span>RJSC Attestation Schedule</span>
            <span>Final Page</span>
          </div>
        </div>
      )}
    </div>
  );
};
