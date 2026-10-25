import React, { useState } from 'react';
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
import { SignatureModal } from './components/SignatureModal';
import { DEFAULT_DOCUMENT_STATE } from './data/defaultData';
import { DEFAULT_VALUATION_STATE } from './data/defaultValuationData';
import { DEFAULT_COMBINED_STATE } from './data/defaultCombinedData';
import { DEFAULT_RJSC_RETURN_STATE } from './data/defaultRjscReturnData';
import { DEFAULT_PARTNERSHIP_STATE } from './data/defaultPartnershipData';
import { DocumentState } from './types/company';
import { ValuationDocumentState } from './types/valuation';
import { CombinedDossierState } from './types/combinedDossier';
import { RjscReturnState } from './types/rjscReturn';
import { PartnershipDeedState } from './types/partnership';
import { formatTaka } from './utils/partnershipCalculations';

export default function App() {
  const [activeDocType, setActiveDocType] = useState<
    'valuation' | 'company' | 'combined' | 'rjscReturn' | 'partnership'
  >('partnership');
  const [partnershipState, setPartnershipState] = useState<PartnershipDeedState>(DEFAULT_PARTNERSHIP_STATE);
  const [valuationState, setValuationState] = useState<ValuationDocumentState>(DEFAULT_VALUATION_STATE);
  const [companyState, setCompanyState] = useState<DocumentState>(DEFAULT_DOCUMENT_STATE);
  const [combinedState, setCombinedState] = useState<CombinedDossierState>(DEFAULT_COMBINED_STATE);
  const [rjscReturnState, setRjscReturnState] = useState<RjscReturnState>(DEFAULT_RJSC_RETURN_STATE);

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

  const handlePrint = () => {
    window.print();
  };

  const handleExportJson = () => {
    let payload: any = rjscReturnState;
    let prefix = 'RJSC_Annual_Return_Hijaz';

    if (activeDocType === 'partnership') {
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
    if (imported.info?.firmName && imported.party1 && imported.party2) {
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
    if (activeDocType === 'partnership') {
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
    activeDocType === 'partnership'
      ? `Partnership Deed - ${partnershipState.info.firmName}`
      : activeDocType === 'rjscReturn'
      ? `RJSC Return - ${rjscReturnState.meetingInfo.companyName}`
      : activeDocType === 'combined'
      ? 'Combined Legal & Immigration Dossier'
      : activeDocType === 'valuation'
      ? 'Asset Valuation Certification & Notes'
      : companyState.company.companyName || 'Company Registration Template';

  const activeSubtitle =
    activeDocType === 'partnership'
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
        onExportJson={handleExportJson}
        onImportJson={handleImportJson}
        onReset={handleReset}
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
            {activeDocType === 'partnership' ? (
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
            className={`h-full overflow-y-auto overflow-x-auto bg-slate-600/90 p-2 sm:p-4 lg:p-8 flex justify-center items-start print:p-0 print:bg-white print:overflow-visible transition-all duration-200 ${
              viewMode === 'preview'
                ? 'w-full'
                : 'w-full md:w-[55%] lg:w-[60%] xl:w-[64%]'
            }`}
            id="document-output-scroll-container"
          >
            {activeDocType === 'partnership' ? (
              <PartnershipDocumentPreview
                data={partnershipState}
                zoom={zoom}
              />
            ) : activeDocType === 'rjscReturn' ? (
              <RjscReturnPreview
                data={rjscReturnState}
                zoom={zoom}
              />
            ) : activeDocType === 'combined' ? (
              <CombinedDocumentPreview
                data={combinedState}
                zoom={zoom}
              />
            ) : activeDocType === 'valuation' ? (
              <ValuationDocumentPreview
                data={valuationState}
                zoom={zoom}
              />
            ) : (
              <DocumentPreview
                data={companyState}
                zoom={zoom}
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
    </div>
  );
}
