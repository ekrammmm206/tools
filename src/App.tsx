import React, { useState } from 'react';
import { FileDown, FileText } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { InputPanel } from './components/InputPanel';
import { DocumentPreview } from './components/DocumentPreview';
import { ValuationInputPanel } from './components/ValuationInputPanel';
import { ValuationDocumentPreview } from './components/ValuationDocumentPreview';
import { CombinedInputPanel } from './components/CombinedInputPanel';
import { CombinedDocumentPreview } from './components/CombinedDocumentPreview';
import { RjscReturnInputPanel } from './components/RjscReturnInputPanel';
import { RjscReturnPreview } from './components/RjscReturnPreview';
import { PartnershipInputPanel } from './components/PartnershipInputPanel';
import { PartnershipDocumentPreview } from './components/PartnershipDocumentPreview';
import { PartnershipReconInputPanel } from './components/PartnershipReconInputPanel';
import { PartnershipReconDocumentPreview } from './components/PartnershipReconDocumentPreview';
import { SignatureModal } from './components/SignatureModal';
import { DEFAULT_DOCUMENT_STATE } from './data/defaultData';
import { DEFAULT_VALUATION_STATE } from './data/defaultValuationData';
import { DEFAULT_COMBINED_STATE } from './data/defaultCombinedData';
import { DEFAULT_RJSC_RETURN_STATE } from './data/defaultRjscReturnData';
import { DEFAULT_PARTNERSHIP_STATE } from './data/defaultPartnershipData';
import { DEFAULT_PARTNERSHIP_RECON_STATE } from './data/defaultPartnershipReconData';
import { DEFAULT_WITHHOLDING_RETURN_STATE } from './data/defaultWithholdingReturnData';
import { DocumentState } from './types/company';
import { ValuationDocumentState } from './types/valuation';
import { CombinedDossierState } from './types/combinedDossier';
import { RjscReturnState } from './types/rjscReturn';
import { PartnershipDeedState } from './types/partnership';
import { PartnershipReconState } from './types/partnershipRecon';
import { WithholdingReturnState } from './types/withholdingReturn';
import { WithholdingReturnInputPanel } from './components/WithholdingReturnInputPanel';
import { WithholdingReturnPreview } from './components/WithholdingReturnPreview';
import { PdfExportModal } from './components/PdfExportModal';
import { exportDocumentToPdf, getDefaultPdfFileName, PdfExportProgress } from './utils/pdfExport';
import { formatTaka } from './utils/partnershipCalculations';
import { StatutoryLang } from './utils/statutoryTranslations';

export default function App() {
  const [activeDocType, setActiveDocType] = useState<
    'withholdingReturn' | 'valuation' | 'company' | 'combined' | 'rjscReturn' | 'partnership' | 'partnershipRecon'
  >('withholdingReturn');
  const [withholdingReturnState, setWithholdingReturnState] = useState<WithholdingReturnState>(DEFAULT_WITHHOLDING_RETURN_STATE);
  const [partnershipReconState, setPartnershipReconState] = useState<PartnershipReconState>(DEFAULT_PARTNERSHIP_RECON_STATE);
  const [partnershipState, setPartnershipState] = useState<PartnershipDeedState>(DEFAULT_PARTNERSHIP_STATE);
  const [valuationState, setValuationState] = useState<ValuationDocumentState>(DEFAULT_VALUATION_STATE);
  const [companyState, setCompanyState] = useState<DocumentState>(DEFAULT_DOCUMENT_STATE);
  const [combinedState, setCombinedState] = useState<CombinedDossierState>(DEFAULT_COMBINED_STATE);
  const [rjscReturnState, setRjscReturnState] = useState<RjscReturnState>(DEFAULT_RJSC_RETURN_STATE);

  const [docLang, setDocLang] = useState<StatutoryLang>('en');
  const [zoom, setZoom] = useState<number>(85);
  const [viewMode, setViewMode] = useState<'split' | 'form' | 'preview'>('split');

  // Company Signature modal state
  const [signatureModal, setSignatureModal] = useState<{
    isOpen: boolean;
    targetType: 'director' | 'subscriber' | 'signatory';
    targetId: string;
    targetName: string;
  }>({
    isOpen: false,
    targetType: 'director',
    targetId: '',
    targetName: ''
  });

  const handleOpenSignatureModal = (
    targetType: 'director' | 'subscriber' | 'signatory',
    id: string,
    name: string
  ) => {
    setSignatureModal({
      isOpen: true,
      targetType,
      targetId: id,
      targetName: name
    });
  };

  const handleSaveSignature = (dataUrl: string) => {
    const { targetType, targetId } = signatureModal;

    if (targetType === 'director') {
      setCompanyState((prev) => ({
        ...prev,
        directors: prev.directors.map((d) =>
          d.id === targetId ? { ...d, signatureImg: dataUrl } : d
        )
      }));
    } else if (targetType === 'subscriber') {
      setCompanyState((prev) => ({
        ...prev,
        subscribers: prev.subscribers.map((s) =>
          s.id === targetId ? { ...s, signatureImg: dataUrl } : s
        )
      }));
    } else if (targetType === 'signatory') {
      setCompanyState((prev) => ({
        ...prev,
        signatories: [
          prev.signatories[0].id === targetId
            ? { ...prev.signatories[0], signatureImg: dataUrl }
            : prev.signatories[0],
          prev.signatories[1].id === targetId
            ? { ...prev.signatories[1], signatureImg: dataUrl }
            : prev.signatories[1]
        ]
      }));
    }
  };

  const [pdfProgress, setPdfProgress] = useState<PdfExportProgress | null>(null);
  const [isExportingPdf, setIsExportingPdf] = useState<boolean>(false);

  const getTargetDocState = () => {
    switch (activeDocType) {
      case 'withholdingReturn':
        return withholdingReturnState;
      case 'partnershipRecon':
        return partnershipReconState;
      case 'partnership':
        return partnershipState;
      case 'rjscReturn':
        return rjscReturnState;
      case 'combined':
        return combinedState;
      case 'valuation':
        return valuationState;
      case 'company':
      default:
        return companyState;
    }
  };

  const handleExportPdf = async () => {
    if (isExportingPdf) return;
    setIsExportingPdf(true);

    const targetState = getTargetDocState();
    const fileName = getDefaultPdfFileName(activeDocType, targetState);

    try {
      await exportDocumentToPdf({
        containerId: 'document-output-scroll-container',
        fileName,
        scale: 2,
        quality: 0.95,
        onProgress: (progress) => {
          setPdfProgress(progress);
          if (progress.status === 'completed') {
            setTimeout(() => {
              setPdfProgress(null);
              setIsExportingPdf(false);
            }, 1200);
          }
        }
      });
    } catch (err: any) {
      console.error('PDF export failed:', err);
      // Wait momentarily so user can see error in modal, then allow retry
      setTimeout(() => {
        setIsExportingPdf(false);
      }, 2000);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleExportJson = () => {
    let payload: any = withholdingReturnState;
    let prefix = 'ATC_Withholding_Return_TDS';

    if (activeDocType === 'withholdingReturn') {
      payload = withholdingReturnState;
      prefix = `${withholdingReturnState.general.companyName.replace(/[^a-zA-Z0-9]/g, '_')}_Withholding_TDS`;
    } else if (activeDocType === 'partnershipRecon') {
      payload = partnershipReconState;
      prefix = `${partnershipReconState.firm.firmName.replace(/[^a-zA-Z0-9]/g, '_')}_Reconstitution`;
    } else if (activeDocType === 'partnership') {
      payload = partnershipState;
      prefix = `${partnershipState.info.firmName.replace(/\s+/g, '_')}_Deed`;
    } else if (activeDocType === 'rjscReturn') {
      payload = rjscReturnState;
      prefix = `${rjscReturnState.meetingInfo.companyName.replace(/\s+/g, '_')}_Return`;
    } else if (activeDocType === 'combined') {
      payload = combinedState;
      prefix = 'Combined_Legal_Dossier';
    } else if (activeDocType === 'valuation') {
      payload = valuationState;
      prefix = `Asset_Valuation_${valuationState.general.refNo.replace(/[^a-zA-Z0-9]/g, '_')}`;
    } else if (activeDocType === 'company') {
      payload = companyState;
      prefix = `${companyState.company.companyName.replace(/\s+/g, '_')}_RJSC`;
    }

    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(payload, null, 2)
    )}`;
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', jsonString);
    downloadAnchor.setAttribute('download', `${prefix}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImportJson = (imported: any) => {
    if (imported.salaries && imported.treasury && imported.general) {
      setWithholdingReturnState(imported);
      setActiveDocType('withholdingReturn');
    } else if (imported.firm && imported.incoming && imported.outgoing) {
      setPartnershipReconState(imported);
      setActiveDocType('partnershipRecon');
    } else if (imported.info?.firmName && imported.party1 && imported.party2) {
      setPartnershipState(imported);
      setActiveDocType('partnership');
    } else if (imported.meetingInfo && imported.people) {
      setRjscReturnState(imported);
      setActiveDocType('rjscReturn');
    } else if (imported.birthCertificate && imported.financialDeclaration) {
      setCombinedState(imported);
      setActiveDocType('combined');
    } else if (imported.general && imported.applicant && imported.sponsor) {
      setValuationState(imported);
      setActiveDocType('valuation');
    } else if (imported.company && imported.directors && imported.subscribers) {
      setCompanyState(imported);
      setActiveDocType('company');
    } else {
      alert('Unrecognized document format. Please upload a valid JSON template.');
    }
  };

  const handleReset = () => {
    if (activeDocType === 'withholdingReturn') {
      if (window.confirm('Reset ATC Monthly Withholding Return back to default template?')) {
        setWithholdingReturnState(DEFAULT_WITHHOLDING_RETURN_STATE);
      }
    } else if (activeDocType === 'partnershipRecon') {
      if (window.confirm('Reset Partnership Reconstitution back to default template?')) {
        setPartnershipReconState(DEFAULT_PARTNERSHIP_RECON_STATE);
      }
    } else if (activeDocType === 'partnership') {
      if (window.confirm('Reset Partnership Deed back to default template?')) {
        setPartnershipState(DEFAULT_PARTNERSHIP_STATE);
      }
    } else if (activeDocType === 'rjscReturn') {
      if (window.confirm('Reset RJSC Annual Return back to default template?')) {
        setRjscReturnState(DEFAULT_RJSC_RETURN_STATE);
      }
    } else if (activeDocType === 'combined') {
      if (window.confirm('Reset Combined Legal Dossier back to default template?')) {
        setCombinedState(DEFAULT_COMBINED_STATE);
      }
    } else if (activeDocType === 'valuation') {
      if (window.confirm('Reset Asset Valuation back to default template?')) {
        setValuationState(DEFAULT_VALUATION_STATE);
      }
    } else {
      if (window.confirm('Reset Company Registration back to default template?')) {
        setCompanyState(DEFAULT_DOCUMENT_STATE);
      }
    }
  };

  const activeTitle =
    activeDocType === 'withholdingReturn'
      ? `Withholding Tax Return - ${withholdingReturnState.general.companyName}`
      : activeDocType === 'partnershipRecon'
      ? `Partnership Reconstitution - ${partnershipReconState.firm.firmName}`
      : activeDocType === 'partnership'
      ? `Partnership Deed - ${partnershipState.info.firmName}`
      : activeDocType === 'rjscReturn'
      ? `RJSC Return - ${rjscReturnState.meetingInfo.companyName}`
      : activeDocType === 'combined'
      ? 'Combined Legal & Immigration Dossier'
      : activeDocType === 'valuation'
      ? 'Asset Valuation Certification & Notes'
      : companyState.company.companyName || 'Company Registration Template';

  const activeSubtitle =
    activeDocType === 'withholdingReturn'
      ? `Income Tax Act • ${withholdingReturnState.general.month} • FY ${withholdingReturnState.general.fy} • TIN: ${withholdingReturnState.general.tin} • ${withholdingReturnState.salaries.length} Employees`
      : activeDocType === 'partnershipRecon'
      ? `Partnership Act 1932 • Form V & 7 Statutory Docs • Reg: ${partnershipReconState.firm.regNo} • Recon Date: ${partnershipReconState.firm.reconDate}`
      : activeDocType === 'partnership'
      ? `Partnership Act 1932 • 25 Statutory Clauses • Capital TK ${formatTaka(partnershipState.info.capitalAmount)} (50:50)`
      : activeDocType === 'rjscReturn'
      ? `Reg: ${rjscReturnState.meetingInfo.regNo} • ${rjscReturnState.people.length} Members • AGM: ${rjscReturnState.meetingInfo.agmDate}`
      : activeDocType === 'combined'
      ? `7 Statutory Documents • ${combinedState.birthCertificate.name} • Rajshahi & Chandpur`
      : activeDocType === 'valuation'
      ? `Ref: ${valuationState.general.refNo} • Sponsor: ${valuationState.sponsor.name}`
      : `RJSC Act 1994 • ${companyState.directors.length} Directors • ${companyState.subscribers.length} Subscribers`;

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-slate-100">
      {/* Top Navbar */}
      <Navbar
        activeDocType={activeDocType}
        onDocTypeChange={setActiveDocType}
        title={activeTitle}
        subtitle={activeSubtitle}
        zoom={zoom}
        onZoomChange={setZoom}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onPrint={handlePrint}
        onExportPdf={handleExportPdf}
        isExportingPdf={isExportingPdf}
        onExportJson={handleExportJson}
        onImportJson={handleImportJson}
        onReset={handleReset}
        docLang={docLang}
        onDocLangChange={setDocLang}
      />

      {/* Main Workspace Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Side: Input Form Panel */}
        {(viewMode === 'split' || viewMode === 'form') && (
          <div
            className={`h-full overflow-hidden transition-all duration-200 ${
              viewMode === 'form'
                ? 'w-full'
                : 'hidden md:block w-full md:w-[45%] lg:w-[40%] xl:w-[36%]'
            }`}
          >
            {activeDocType === 'withholdingReturn' ? (
              <WithholdingReturnInputPanel
                data={withholdingReturnState}
                onChange={setWithholdingReturnState}
              />
            ) : activeDocType === 'partnershipRecon' ? (
              <PartnershipReconInputPanel
                data={partnershipReconState}
                onChange={setPartnershipReconState}
              />
            ) : activeDocType === 'partnership' ? (
              <PartnershipInputPanel
                data={partnershipState}
                onChange={setPartnershipState}
              />
            ) : activeDocType === 'rjscReturn' ? (
              <RjscReturnInputPanel
                data={rjscReturnState}
                onChange={setRjscReturnState}
              />
            ) : activeDocType === 'combined' ? (
              <CombinedInputPanel
                data={combinedState}
                onChange={setCombinedState}
              />
            ) : activeDocType === 'valuation' ? (
              <ValuationInputPanel
                data={valuationState}
                onChange={setValuationState}
              />
            ) : (
              <InputPanel
                data={companyState}
                onChange={setCompanyState}
                onOpenSignatureModal={handleOpenSignatureModal}
              />
            )}
          </div>
        )}

        {/* Right Side: Live A4 Document Output Panel */}
        {(viewMode === 'split' || viewMode === 'preview') && (
          <div
            className={`h-full overflow-y-auto overflow-x-auto bg-slate-600/90 p-2 sm:p-4 lg:p-8 flex flex-col items-center print:p-0 print:bg-white print:overflow-visible transition-all duration-200 ${
              viewMode === 'preview'
                ? 'w-full'
                : 'w-full md:w-[55%] lg:w-[60%] xl:w-[64%]'
            }`}
            id="document-output-scroll-container"
          >
            {/* Quick Statutory Compliance Language Bar */}
            <div className="print:hidden w-full max-w-[210mm] mb-4 bg-slate-800/95 backdrop-blur-xs text-white px-3.5 py-2 rounded-lg border border-slate-700/80 shadow-md flex items-center justify-between text-xs gap-3">
              <div className="flex items-center gap-2 min-w-0">
                <span className={`w-2 h-2 rounded-full shrink-0 ${docLang === 'bn' ? 'bg-emerald-400 animate-pulse' : 'bg-blue-400'}`}></span>
                <p className="truncate text-slate-300 text-xs">
                  <span className="text-slate-400 font-normal">Statutory Compliance Mode:</span>{' '}
                  <strong className="text-white">
                    {docLang === 'bn' ? 'বাংলা (Bangla Statutory Standard)' : 'English (Courts & RJSC Official)'}
                  </strong>
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-[11px] text-slate-400 hidden sm:inline">Translate Output:</span>
                <div className="flex bg-slate-900 p-0.5 rounded-md border border-slate-700">
                  <button
                    type="button"
                    onClick={() => setDocLang('en')}
                    className={`px-2 py-0.5 rounded text-[11px] font-semibold transition cursor-pointer ${
                      docLang === 'en'
                        ? 'bg-slate-700 text-white'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    English
                  </button>
                  <button
                    type="button"
                    onClick={() => setDocLang('bn')}
                    className={`px-2 py-0.5 rounded text-[11px] font-semibold transition font-bengali cursor-pointer ${
                      docLang === 'bn'
                        ? 'bg-emerald-600 text-white font-bold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    বাংলা
                  </button>
                </div>

                {/* Quick Export A4 PDF Button */}
                <button
                  type="button"
                  onClick={handleExportPdf}
                  disabled={isExportingPdf}
                  className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 active:scale-95 text-white font-semibold text-[11px] rounded-md shadow-xs transition cursor-pointer disabled:opacity-60"
                  title="Download previewed document as high-resolution A4 PDF"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Save A4 PDF</span>
                  <span className="sm:hidden">PDF</span>
                </button>
              </div>
            </div>

            {activeDocType === 'withholdingReturn' ? (
              <WithholdingReturnPreview
                data={withholdingReturnState}
                zoom={zoom}
                docLang={docLang}
              />
            ) : activeDocType === 'partnershipRecon' ? (
              <PartnershipReconDocumentPreview
                data={partnershipReconState}
                zoom={zoom}
                docLang={docLang}
              />
            ) : activeDocType === 'partnership' ? (
              <PartnershipDocumentPreview
                data={partnershipState}
                zoom={zoom}
                docLang={docLang}
              />
            ) : activeDocType === 'rjscReturn' ? (
              <RjscReturnPreview
                data={rjscReturnState}
                zoom={zoom}
                docLang={docLang}
              />
            ) : activeDocType === 'combined' ? (
              <CombinedDocumentPreview
                data={combinedState}
                zoom={zoom}
                docLang={docLang}
              />
            ) : activeDocType === 'valuation' ? (
              <ValuationDocumentPreview
                data={valuationState}
                zoom={zoom}
                docLang={docLang}
              />
            ) : (
              <DocumentPreview
                data={companyState}
                zoom={zoom}
                docLang={docLang}
              />
            )}
          </div>
        )}
      </div>

      {/* Company Interactive Signature Modal */}
      <SignatureModal
        isOpen={signatureModal.isOpen}
        onClose={() => setSignatureModal((prev) => ({ ...prev, isOpen: false }))}
        onSave={handleSaveSignature}
        initialName={signatureModal.targetName}
      />

      {/* High-Resolution A4 PDF Export Progress Modal */}
      <PdfExportModal
        progress={pdfProgress}
        fileName={getDefaultPdfFileName(activeDocType, getTargetDocState())}
        onClose={() => {
          setPdfProgress(null);
          setIsExportingPdf(false);
        }}
      />
    </div>
  );
}
