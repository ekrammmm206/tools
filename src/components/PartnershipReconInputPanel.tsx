import React from 'react';
import {
  PartnershipReconState,
  ExistingPartner,
  OutgoingPartner,
  IncomingPartner,
  AuthRepresentative,
  MeetingDetails,
  FirmInfo
} from '../types/partnershipRecon';
import {
  validatePartnershipRecon,
  formatTakaCommas
} from '../utils/partnershipReconCalculations';
import {
  Building2,
  Users,
  UserMinus,
  UserPlus,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Layers,
  FileSpreadsheet
} from 'lucide-react';

interface PartnershipReconInputPanelProps {
  data: PartnershipReconState;
  onChange: React.Dispatch<React.SetStateAction<PartnershipReconState>>;
}

export const PartnershipReconInputPanel: React.FC<PartnershipReconInputPanelProps> = ({
  data,
  onChange
}) => {
  const validation = validatePartnershipRecon(data);

  const handleFirmChange = (field: keyof FirmInfo, value: string) => {
    onChange((prev) => ({
      ...prev,
      firm: { ...prev.firm, [field]: value }
    }));
  };

  const handlePartner1Change = (field: keyof ExistingPartner, value: string) => {
    onChange((prev) => ({
      ...prev,
      partner1: { ...prev.partner1, [field]: value }
    }));
  };

  const handlePartner2Change = (field: keyof ExistingPartner, value: string) => {
    onChange((prev) => ({
      ...prev,
      partner2: { ...prev.partner2, [field]: value }
    }));
  };

  const handleOutgoingChange = (field: keyof OutgoingPartner, value: string) => {
    onChange((prev) => ({
      ...prev,
      outgoing: { ...prev.outgoing, [field]: value }
    }));
  };

  const handleIncomingChange = (field: keyof IncomingPartner, value: string) => {
    onChange((prev) => ({
      ...prev,
      incoming: { ...prev.incoming, [field]: value }
    }));
  };

  const handleRepresentativeChange = (field: keyof AuthRepresentative, value: string) => {
    onChange((prev) => ({
      ...prev,
      representative: { ...prev.representative, [field]: value }
    }));
  };

  const handleMeetingChange = (field: keyof MeetingDetails, value: string) => {
    onChange((prev) => ({
      ...prev,
      meeting: { ...prev.meeting, [field]: value }
    }));
  };

  const setSubDoc = (subDoc: PartnershipReconState['selectedSubDoc']) => {
    onChange((prev) => ({ ...prev, selectedSubDoc: subDoc }));
  };

  return (
    <div className="h-full flex flex-col bg-slate-50 border-r border-slate-200 text-slate-800 text-xs">
      {/* Header & Sub-Document Navigator */}
      <div className="p-3 bg-white border-b border-slate-200 shrink-0">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5 font-bold text-slate-900 text-sm">
            <Layers className="w-4 h-4 text-emerald-600" />
            <span>Reconstitution Navigator</span>
          </div>
          <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold font-mono">
            Form V • Act IX of 1932
          </span>
        </div>

        {/* Section View Tabs */}
        <div className="grid grid-cols-4 gap-1 text-[10.5px]">
          <button
            type="button"
            onClick={() => setSubDoc('all')}
            className={`py-1 px-1 rounded text-center truncate transition font-medium ${
              data.selectedSubDoc === 'all'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All 7 Docs
          </button>
          <button
            type="button"
            onClick={() => setSubDoc('notice')}
            className={`py-1 px-1 rounded text-center truncate transition font-medium ${
              data.selectedSubDoc === 'notice'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Doc 1: Notice
          </button>
          <button
            type="button"
            onClick={() => setSubDoc('minutes')}
            className={`py-1 px-1 rounded text-center truncate transition font-medium ${
              data.selectedSubDoc === 'minutes'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Doc 1: Minutes
          </button>
          <button
            type="button"
            onClick={() => setSubDoc('resignation')}
            className={`py-1 px-1 rounded text-center truncate transition font-medium ${
              data.selectedSubDoc === 'resignation'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Doc 2: Resignation
          </button>
          <button
            type="button"
            onClick={() => setSubDoc('affidavit')}
            className={`py-1 px-1 rounded text-center truncate transition font-medium ${
              data.selectedSubDoc === 'affidavit'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Doc 3: Affidavit
          </button>
          <button
            type="button"
            onClick={() => setSubDoc('formV')}
            className={`py-1 px-1 rounded text-center truncate transition font-medium ${
              data.selectedSubDoc === 'formV'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Doc 4: Form - V
          </button>
          <button
            type="button"
            onClick={() => setSubDoc('forwarding')}
            className={`py-1 px-1 rounded text-center truncate transition font-medium ${
              data.selectedSubDoc === 'forwarding'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Doc 5: RJSC Letter
          </button>
          <button
            type="button"
            onClick={() => setSubDoc('gazette')}
            className={`py-1 px-1 rounded text-center truncate transition font-medium ${
              data.selectedSubDoc === 'gazette'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Doc 7: গেজেট
          </button>
        </div>
      </div>

      {/* Validation Banner */}
      <div
        className={`px-3 py-2 border-b flex items-start gap-2 ${
          validation.isValid
            ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
            : 'bg-amber-50 border-amber-200 text-amber-900'
        }`}
      >
        {validation.isValid ? (
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
        ) : (
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        )}
        <div className="text-[11px] leading-tight">
          <div className="font-semibold">
            {validation.isValid
              ? `Reconstitution Validated: Shares Sum to ${validation.totalPercentage}% • Capital TK ${formatTakaCommas(
                  validation.totalCapital
                )}`
              : 'Attention Needed in Partnership Data:'}
          </div>
          {!validation.isValid && (
            <ul className="list-disc pl-4 mt-1 space-y-0.5 text-[10px]">
              {validation.errors.map((err, i) => (
                <li key={i}>{err}</li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Form Content */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {/* 1. FIRM INFORMATION */}
        <details className="bg-white border border-slate-200 rounded-lg shadow-2xs open:pb-2" open>
          <summary className="p-2.5 font-bold text-slate-800 cursor-pointer hover:bg-slate-50 flex items-center gap-2 select-none">
            <Building2 className="w-4 h-4 text-emerald-600" />
            <span>1. Firm Information</span>
          </summary>
          <div className="px-3 pt-2 space-y-2 border-t border-slate-100">
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-0.5">
                Firm Name
              </label>
              <input
                type="text"
                value={data.firm.firmName}
                onChange={(e) => handleFirmChange('firmName', e.target.value)}
                className="w-full px-2 py-1.5 border border-slate-300 rounded text-xs font-bold focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-0.5">
                  Registration No.
                </label>
                <input
                  type="text"
                  value={data.firm.regNo}
                  onChange={(e) => handleFirmChange('regNo', e.target.value)}
                  className="w-full px-2 py-1.5 border border-slate-300 rounded text-xs font-mono font-bold"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-0.5">
                  Registration Date
                </label>
                <input
                  type="text"
                  value={data.firm.regDate}
                  onChange={(e) => handleFirmChange('regDate', e.target.value)}
                  className="w-full px-2 py-1.5 border border-slate-300 rounded text-xs font-mono"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-0.5">
                  Reconstitution Date
                </label>
                <input
                  type="text"
                  value={data.firm.reconDate}
                  onChange={(e) => handleFirmChange('reconDate', e.target.value)}
                  className="w-full px-2 py-1.5 border border-slate-300 rounded text-xs font-mono font-bold text-emerald-800"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-0.5">
                Registered Office Address
              </label>
              <textarea
                rows={2}
                value={data.firm.regAddress}
                onChange={(e) => handleFirmChange('regAddress', e.target.value)}
                className="w-full px-2 py-1.5 border border-slate-300 rounded text-xs"
              />
            </div>
          </div>
        </details>

        {/* 2. EXISTING PARTNERS */}
        <details className="bg-white border border-slate-200 rounded-lg shadow-2xs open:pb-2" open>
          <summary className="p-2.5 font-bold text-blue-900 cursor-pointer hover:bg-slate-50 flex items-center justify-between select-none">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-blue-700" />
              <span>2. Continuing Partners</span>
            </div>
            <span className="text-[10px] bg-blue-100 text-blue-800 font-mono font-bold px-1.5 py-0.5 rounded">
              P1: {data.partner1.sharePct} | P2: {data.partner2.sharePct}
            </span>
          </summary>
          <div className="px-3 pt-2 space-y-3 border-t border-slate-100">
            {/* Partner 1 (Managing) */}
            <div className="bg-blue-50/40 p-2.5 rounded border border-blue-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-blue-950 text-xs">
                  Partner 1: {data.partner1.name} ({data.partner1.role})
                </span>
                <span className="text-[10px] bg-blue-200 text-blue-900 font-mono px-1 rounded font-bold">
                  {data.partner1.sharePct}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] font-semibold text-slate-600">Full Name</label>
                  <input
                    type="text"
                    value={data.partner1.name}
                    onChange={(e) => handlePartner1Change('name', e.target.value)}
                    className="w-full px-2 py-1 border border-slate-300 rounded text-xs font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-slate-600">Father's Name</label>
                  <input
                    type="text"
                    value={data.partner1.father}
                    onChange={(e) => handlePartner1Change('father', e.target.value)}
                    className="w-full px-2 py-1 border border-slate-300 rounded text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-semibold text-slate-600">Permanent Address</label>
                <input
                  type="text"
                  value={data.partner1.address}
                  onChange={(e) => handlePartner1Change('address', e.target.value)}
                  className="w-full px-2 py-1 border border-slate-300 rounded text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] font-semibold text-slate-600">Share %</label>
                  <input
                    type="text"
                    value={data.partner1.sharePct}
                    onChange={(e) => handlePartner1Change('sharePct', e.target.value)}
                    className="w-full px-2 py-1 border border-slate-300 rounded text-xs font-bold text-center"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-slate-600">Account of Capital (BDT)</label>
                  <input
                    type="text"
                    value={data.partner1.capitalAmt}
                    onChange={(e) => handlePartner1Change('capitalAmt', e.target.value)}
                    className="w-full px-2 py-1 border border-slate-300 rounded text-xs font-mono font-bold"
                  />
                </div>
              </div>
            </div>

            {/* Partner 2 */}
            <div className="bg-slate-50 p-2.5 rounded border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 text-xs">
                  Partner 2: {data.partner2.name}
                </span>
                <span className="text-[10px] bg-slate-200 text-slate-800 font-mono px-1 rounded font-bold">
                  {data.partner2.sharePct}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] font-semibold text-slate-600">Full Name</label>
                  <input
                    type="text"
                    value={data.partner2.name}
                    onChange={(e) => handlePartner2Change('name', e.target.value)}
                    className="w-full px-2 py-1 border border-slate-300 rounded text-xs font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-slate-600">Father's Name</label>
                  <input
                    type="text"
                    value={data.partner2.father}
                    onChange={(e) => handlePartner2Change('father', e.target.value)}
                    className="w-full px-2 py-1 border border-slate-300 rounded text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-semibold text-slate-600">Permanent Address</label>
                <input
                  type="text"
                  value={data.partner2.address}
                  onChange={(e) => handlePartner2Change('address', e.target.value)}
                  className="w-full px-2 py-1 border border-slate-300 rounded text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] font-semibold text-slate-600">Share %</label>
                  <input
                    type="text"
                    value={data.partner2.sharePct}
                    onChange={(e) => handlePartner2Change('sharePct', e.target.value)}
                    className="w-full px-2 py-1 border border-slate-300 rounded text-xs font-bold text-center"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-slate-600">Account of Capital (BDT)</label>
                  <input
                    type="text"
                    value={data.partner2.capitalAmt}
                    onChange={(e) => handlePartner2Change('capitalAmt', e.target.value)}
                    className="w-full px-2 py-1 border border-slate-300 rounded text-xs font-mono font-bold"
                  />
                </div>
              </div>
            </div>
          </div>
        </details>

        {/* 3. OUTGOING PARTNER */}
        <details className="bg-white border border-slate-200 rounded-lg shadow-2xs open:pb-2" open>
          <summary className="p-2.5 font-bold text-amber-900 cursor-pointer hover:bg-slate-50 flex items-center justify-between select-none">
            <div className="flex items-center gap-2">
              <UserMinus className="w-4 h-4 text-amber-700" />
              <span>3. Outgoing Partner ({data.outgoing.name})</span>
            </div>
            <span className="text-[10px] bg-amber-100 text-amber-900 font-mono font-bold px-1.5 py-0.5 rounded">
              {data.outgoing.sharePct} • {data.outgoing.shareAmt}
            </span>
          </summary>
          <div className="px-3 pt-2 space-y-2 border-t border-slate-100">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-0.5">
                  Name
                </label>
                <input
                  type="text"
                  value={data.outgoing.name}
                  onChange={(e) => handleOutgoingChange('name', e.target.value)}
                  className="w-full px-2 py-1.5 border border-slate-300 rounded text-xs font-bold"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-0.5">
                  Parents (Father & Mother)
                </label>
                <input
                  type="text"
                  value={data.outgoing.parents}
                  onChange={(e) => handleOutgoingChange('parents', e.target.value)}
                  className="w-full px-2 py-1.5 border border-slate-300 rounded text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-0.5">
                Address
              </label>
              <input
                type="text"
                value={data.outgoing.address}
                onChange={(e) => handleOutgoingChange('address', e.target.value)}
                className="w-full px-2 py-1.5 border border-slate-300 rounded text-xs"
              />
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-0.5">
                  Share Amount
                </label>
                <input
                  type="text"
                  value={data.outgoing.shareAmt}
                  onChange={(e) => handleOutgoingChange('shareAmt', e.target.value)}
                  className="w-full px-2 py-1.5 border border-slate-300 rounded text-xs font-mono font-bold"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-0.5">
                  Share %
                </label>
                <input
                  type="text"
                  value={data.outgoing.sharePct}
                  onChange={(e) => handleOutgoingChange('sharePct', e.target.value)}
                  className="w-full px-2 py-1.5 border border-slate-300 rounded text-xs font-bold text-center"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-0.5">
                  Resignation Date
                </label>
                <input
                  type="text"
                  value={data.outgoing.resignDate}
                  onChange={(e) => handleOutgoingChange('resignDate', e.target.value)}
                  className="w-full px-2 py-1.5 border border-slate-300 rounded text-xs font-mono"
                />
              </div>
            </div>
          </div>
        </details>

        {/* 4. INCOMING PARTNER */}
        <details className="bg-white border border-slate-200 rounded-lg shadow-2xs open:pb-2" open>
          <summary className="p-2.5 font-bold text-emerald-900 cursor-pointer hover:bg-slate-50 flex items-center justify-between select-none">
            <div className="flex items-center gap-2">
              <UserPlus className="w-4 h-4 text-emerald-700" />
              <span>4. Incoming Partner ({data.incoming.name})</span>
            </div>
            <span className="text-[10px] bg-emerald-100 text-emerald-900 font-mono font-bold px-1.5 py-0.5 rounded">
              {data.incoming.sharePct} • TK {formatTakaCommas(data.incoming.capitalAmt)}
            </span>
          </summary>
          <div className="px-3 pt-2 space-y-2 border-t border-slate-100">
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-0.5">
                Full Name
              </label>
              <input
                type="text"
                value={data.incoming.name}
                onChange={(e) => handleIncomingChange('name', e.target.value)}
                className="w-full px-2 py-1.5 border border-slate-300 rounded text-xs font-bold"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-0.5">
                  Father's Name
                </label>
                <input
                  type="text"
                  value={data.incoming.father}
                  onChange={(e) => handleIncomingChange('father', e.target.value)}
                  className="w-full px-2 py-1.5 border border-slate-300 rounded text-xs"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-0.5">
                  Mother's Name
                </label>
                <input
                  type="text"
                  value={data.incoming.mother}
                  onChange={(e) => handleIncomingChange('mother', e.target.value)}
                  className="w-full px-2 py-1.5 border border-slate-300 rounded text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-0.5">
                Present & Permanent Address
              </label>
              <input
                type="text"
                value={data.incoming.address}
                onChange={(e) => handleIncomingChange('address', e.target.value)}
                className="w-full px-2 py-1.5 border border-slate-300 rounded text-xs"
              />
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-0.5">
                  Date of Birth
                </label>
                <input
                  type="text"
                  value={data.incoming.dob}
                  onChange={(e) => handleIncomingChange('dob', e.target.value)}
                  className="w-full px-2 py-1.5 border border-slate-300 rounded text-xs font-mono"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-0.5">
                  National ID (NID)
                </label>
                <input
                  type="text"
                  value={data.incoming.nid}
                  onChange={(e) => handleIncomingChange('nid', e.target.value)}
                  className="w-full px-2 py-1.5 border border-slate-300 rounded text-xs font-mono font-bold"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-0.5">
                  e-TIN
                </label>
                <input
                  type="text"
                  value={data.incoming.tin}
                  onChange={(e) => handleIncomingChange('tin', e.target.value)}
                  className="w-full px-2 py-1.5 border border-slate-300 rounded text-xs font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-0.5">
                  Mobile No.
                </label>
                <input
                  type="text"
                  value={data.incoming.mobile}
                  onChange={(e) => handleIncomingChange('mobile', e.target.value)}
                  className="w-full px-2 py-1.5 border border-slate-300 rounded text-xs font-mono"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-0.5">
                  Post-Recon Share %
                </label>
                <input
                  type="text"
                  value={data.incoming.sharePct}
                  onChange={(e) => handleIncomingChange('sharePct', e.target.value)}
                  className="w-full px-2 py-1.5 border border-slate-300 rounded text-xs font-bold text-center text-emerald-800"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-0.5">
                  Capital (BDT)
                </label>
                <input
                  type="text"
                  value={data.incoming.capitalAmt}
                  onChange={(e) => handleIncomingChange('capitalAmt', e.target.value)}
                  className="w-full px-2 py-1.5 border border-slate-300 rounded text-xs font-mono font-bold"
                />
              </div>
            </div>
          </div>
        </details>

        {/* 5. REPRESENTATIVE & MEETING DETAILS */}
        <details className="bg-white border border-slate-200 rounded-lg shadow-2xs open:pb-2">
          <summary className="p-2.5 font-bold text-slate-800 cursor-pointer hover:bg-slate-50 flex items-center gap-2 select-none">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>5. Authorized Representative & Meeting</span>
          </summary>
          <div className="px-3 pt-2 space-y-2 border-t border-slate-100">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-0.5">
                  Representative Name
                </label>
                <input
                  type="text"
                  value={data.representative.name}
                  onChange={(e) => handleRepresentativeChange('name', e.target.value)}
                  className="w-full px-2 py-1.5 border border-slate-300 rounded text-xs font-bold"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-0.5">
                  Representative NID
                </label>
                <input
                  type="text"
                  value={data.representative.nid}
                  onChange={(e) => handleRepresentativeChange('nid', e.target.value)}
                  className="w-full px-2 py-1.5 border border-slate-300 rounded text-xs font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-0.5">
                  Rep. DOB
                </label>
                <input
                  type="text"
                  value={data.representative.dob}
                  onChange={(e) => handleRepresentativeChange('dob', e.target.value)}
                  className="w-full px-2 py-1.5 border border-slate-300 rounded text-xs"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-0.5">
                  Rep. Mobile
                </label>
                <input
                  type="text"
                  value={data.representative.mobile}
                  onChange={(e) => handleRepresentativeChange('mobile', e.target.value)}
                  className="w-full px-2 py-1.5 border border-slate-300 rounded text-xs font-mono"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-0.5">
                  Rep. Email
                </label>
                <input
                  type="text"
                  value={data.representative.email}
                  onChange={(e) => handleRepresentativeChange('email', e.target.value)}
                  className="w-full px-2 py-1.5 border border-slate-300 rounded text-xs font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-0.5">
                  Meeting Date & Time
                </label>
                <input
                  type="text"
                  value={data.meeting.meetDate}
                  onChange={(e) => handleMeetingChange('meetDate', e.target.value)}
                  className="w-full px-2 py-1.5 border border-slate-300 rounded text-xs font-mono"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-0.5">
                  RJSC Submission No.
                </label>
                <input
                  type="text"
                  value={data.meeting.submissionNo}
                  onChange={(e) => handleMeetingChange('submissionNo', e.target.value)}
                  className="w-full px-2 py-1.5 border border-slate-300 rounded text-xs font-mono font-bold text-blue-900"
                />
              </div>
            </div>
          </div>
        </details>
      </div>
    </div>
  );
};
