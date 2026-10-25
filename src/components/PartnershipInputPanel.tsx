import React from 'react';
import {
  PartnershipDeedState,
  PartnerParty,
  PartnershipWitness
} from '../types/partnership';
import {
  validatePartnership,
  formatTaka
} from '../utils/partnershipCalculations';
import {
  Building2,
  Users,
  Coins,
  Briefcase,
  UserCheck,
  AlertCircle,
  CheckCircle2,
  Layers
} from 'lucide-react';

interface PartnershipInputPanelProps {
  data: PartnershipDeedState;
  onChange: React.Dispatch<React.SetStateAction<PartnershipDeedState>>;
}

export const PartnershipInputPanel: React.FC<PartnershipInputPanelProps> = ({
  data,
  onChange
}) => {
  const validation = validatePartnership(data);

  const handleInfoChange = (field: keyof typeof data.info, value: any) => {
    onChange((prev) => ({
      ...prev,
      info: {
        ...prev.info,
        [field]: value
      }
    }));
  };

  const handlePartyChange = (
    partyKey: 'party1' | 'party2',
    field: keyof PartnerParty,
    value: any
  ) => {
    onChange((prev) => ({
      ...prev,
      [partyKey]: {
        ...prev[partyKey],
        [field]: value
      }
    }));
  };

  const handleWitnessChange = (
    index: 0 | 1,
    field: keyof PartnershipWitness,
    value: string
  ) => {
    onChange((prev) => {
      const updated = [...prev.witnesses] as [PartnershipWitness, PartnershipWitness];
      updated[index] = {
        ...updated[index],
        [field]: value
      };
      return {
        ...prev,
        witnesses: updated
      };
    });
  };

  const setSubDoc = (subDoc: PartnershipDeedState['selectedSubDoc']) => {
    onChange((prev) => ({ ...prev, selectedSubDoc: subDoc }));
  };

  return (
    <div className="h-full flex flex-col bg-slate-50 border-r border-slate-200 text-slate-800 text-xs">
      {/* Header & Sub-Document Navigator */}
      <div className="p-3 bg-white border-b border-slate-200 shrink-0">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5 font-bold text-slate-900 text-sm">
            <Layers className="w-4 h-4 text-emerald-600" />
            <span>Partnership Deed Navigator</span>
          </div>
          <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold font-mono">
            Act IX of 1932
          </span>
        </div>

        {/* Section View Tabs */}
        <div className="grid grid-cols-3 gap-1 text-[11px]">
          <button
            type="button"
            onClick={() => setSubDoc('all')}
            className={`py-1 px-1.5 rounded text-center transition font-medium ${
              data.selectedSubDoc === 'all'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All 4 Pages (Full Deed)
          </button>
          <button
            type="button"
            onClick={() => setSubDoc('parties')}
            className={`py-1 px-1.5 rounded text-center transition font-medium ${
              data.selectedSubDoc === 'parties'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Preamble & Parties (P.1)
          </button>
          <button
            type="button"
            onClick={() => setSubDoc('capital')}
            className={`py-1 px-1.5 rounded text-center transition font-medium ${
              data.selectedSubDoc === 'capital'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Capital & Terms 5-11 (P.2)
          </button>
          <button
            type="button"
            onClick={() => setSubDoc('management')}
            className={`py-1 px-1.5 rounded text-center transition font-medium ${
              data.selectedSubDoc === 'management'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Management 12-20 (P.3)
          </button>
          <button
            type="button"
            onClick={() => setSubDoc('dissolution')}
            className={`py-1 px-1.5 rounded text-center transition font-medium ${
              data.selectedSubDoc === 'dissolution'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Arbitration & Exec (P.4)
          </button>
          <button
            type="button"
            onClick={() => setSubDoc('signatures')}
            className={`py-1 px-1.5 rounded text-center transition font-medium ${
              data.selectedSubDoc === 'signatures'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Signatures & Notary (P.4)
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
              ? `Deed Verified: Total Capital TK ${formatTaka(
                  validation.totalCalculatedCapital
                )} (50:50 Ratio)`
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

      {/* Scrollable Form Content */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {/* SECTION 1: FIRM DETAILS */}
        <details className="bg-white border border-slate-200 rounded-lg shadow-2xs open:pb-2" open>
          <summary className="p-2.5 font-bold text-slate-800 cursor-pointer hover:bg-slate-50 flex items-center gap-2 select-none">
            <Building2 className="w-4 h-4 text-emerald-600" />
            <span>1. Firm Overview & Capital</span>
          </summary>
          <div className="px-3 pt-2 space-y-2 border-t border-slate-100">
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-0.5">
                Firm Name (Under 1932 Act)
              </label>
              <input
                type="text"
                value={data.info.firmName}
                onChange={(e) => handleInfoChange('firmName', e.target.value)}
                className="w-full px-2 py-1.5 border border-slate-300 rounded text-xs uppercase font-bold focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-0.5">
                  Commencement Date
                </label>
                <input
                  type="date"
                  value={data.info.startDate}
                  onChange={(e) => handleInfoChange('startDate', e.target.value)}
                  className="w-full px-2 py-1.5 border border-slate-300 rounded text-xs focus:ring-1 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-0.5">
                  Total Initial Capital (BDT)
                </label>
                <input
                  type="text"
                  value={data.info.capitalAmount}
                  onChange={(e) => handleInfoChange('capitalAmount', e.target.value)}
                  className="w-full px-2 py-1.5 border border-slate-300 rounded text-xs font-mono font-bold focus:ring-1 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-0.5">
                Principal Place of Business & Registered Address
              </label>
              <textarea
                rows={2}
                value={data.info.regAddress}
                onChange={(e) => handleInfoChange('regAddress', e.target.value)}
                className="w-full px-2 py-1.5 border border-slate-300 rounded text-xs focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-0.5">
                  Financial / Accounting Year
                </label>
                <input
                  type="text"
                  value={data.info.financialYear}
                  onChange={(e) => handleInfoChange('financialYear', e.target.value)}
                  className="w-full px-2 py-1.5 border border-slate-300 rounded text-xs focus:ring-1 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-0.5">
                  Notary Jurisdiction
                </label>
                <input
                  type="text"
                  value={data.info.notaryLocation}
                  onChange={(e) => handleInfoChange('notaryLocation', e.target.value)}
                  className="w-full px-2 py-1.5 border border-slate-300 rounded text-xs focus:ring-1 focus:ring-emerald-500"
                />
              </div>
            </div>
          </div>
        </details>

        {/* SECTION 2: FIRST PARTY (MANAGING PARTNER) */}
        <details className="bg-white border border-slate-200 rounded-lg shadow-2xs open:pb-2" open>
          <summary className="p-2.5 font-bold text-blue-900 cursor-pointer hover:bg-slate-50 flex items-center justify-between select-none">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-blue-700" />
              <span>2. First Party ({data.party1.role})</span>
            </div>
            <span className="text-[10px] bg-blue-100 text-blue-800 font-mono font-bold px-1.5 py-0.5 rounded">
              {data.party1.sharePct}% • TK {formatTaka(data.party1.shareAmt)}
            </span>
          </summary>
          <div className="px-3 pt-2 space-y-2 border-t border-slate-100">
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-0.5">
                Full Name
              </label>
              <input
                type="text"
                value={data.party1.name}
                onChange={(e) => handlePartyChange('party1', 'name', e.target.value)}
                className="w-full px-2 py-1.5 border border-slate-300 rounded text-xs uppercase font-bold focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-0.5">
                  Father's Name
                </label>
                <input
                  type="text"
                  value={data.party1.father}
                  onChange={(e) => handlePartyChange('party1', 'father', e.target.value)}
                  className="w-full px-2 py-1.5 border border-slate-300 rounded text-xs"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-0.5">
                  Mother's Name
                </label>
                <input
                  type="text"
                  value={data.party1.mother}
                  onChange={(e) => handlePartyChange('party1', 'mother', e.target.value)}
                  className="w-full px-2 py-1.5 border border-slate-300 rounded text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-0.5">
                Residential Address
              </label>
              <input
                type="text"
                value={data.party1.address}
                onChange={(e) => handlePartyChange('party1', 'address', e.target.value)}
                className="w-full px-2 py-1.5 border border-slate-300 rounded text-xs"
              />
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-0.5">
                  Date of Birth
                </label>
                <input
                  type="date"
                  value={data.party1.dob}
                  onChange={(e) => handlePartyChange('party1', 'dob', e.target.value)}
                  className="w-full px-2 py-1.5 border border-slate-300 rounded text-xs"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-0.5">
                  National ID (NID)
                </label>
                <input
                  type="text"
                  value={data.party1.nid}
                  onChange={(e) => handlePartyChange('party1', 'nid', e.target.value)}
                  className="w-full px-2 py-1.5 border border-slate-300 rounded text-xs font-mono"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-0.5">
                  e-TIN No.
                </label>
                <input
                  type="text"
                  value={data.party1.tin}
                  onChange={(e) => handlePartyChange('party1', 'tin', e.target.value)}
                  className="w-full px-2 py-1.5 border border-slate-300 rounded text-xs font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 bg-blue-50/50 p-2 rounded border border-blue-100">
              <div>
                <label className="block text-[10px] font-bold text-blue-900 mb-0.5 uppercase">
                  Designation
                </label>
                <input
                  type="text"
                  value={data.party1.role}
                  onChange={(e) => handlePartyChange('party1', 'role', e.target.value)}
                  className="w-full px-2 py-1 border border-blue-300 rounded text-xs font-semibold"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-blue-900 mb-0.5 uppercase">
                  Share %
                </label>
                <input
                  type="text"
                  value={data.party1.sharePct}
                  onChange={(e) => handlePartyChange('party1', 'sharePct', e.target.value)}
                  className="w-full px-2 py-1 border border-blue-300 rounded text-xs font-bold text-center"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-blue-900 mb-0.5 uppercase">
                  Capital (BDT)
                </label>
                <input
                  type="text"
                  value={data.party1.shareAmt}
                  onChange={(e) => handlePartyChange('party1', 'shareAmt', e.target.value)}
                  className="w-full px-2 py-1 border border-blue-300 rounded text-xs font-mono font-bold"
                />
              </div>
            </div>
          </div>
        </details>

        {/* SECTION 3: SECOND PARTY (PARTNER) */}
        <details className="bg-white border border-slate-200 rounded-lg shadow-2xs open:pb-2" open>
          <summary className="p-2.5 font-bold text-emerald-900 cursor-pointer hover:bg-slate-50 flex items-center justify-between select-none">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-emerald-700" />
              <span>3. Second Party ({data.party2.role})</span>
            </div>
            <span className="text-[10px] bg-emerald-100 text-emerald-800 font-mono font-bold px-1.5 py-0.5 rounded">
              {data.party2.sharePct}% • TK {formatTaka(data.party2.shareAmt)}
            </span>
          </summary>
          <div className="px-3 pt-2 space-y-2 border-t border-slate-100">
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-0.5">
                Full Name
              </label>
              <input
                type="text"
                value={data.party2.name}
                onChange={(e) => handlePartyChange('party2', 'name', e.target.value)}
                className="w-full px-2 py-1.5 border border-slate-300 rounded text-xs uppercase font-bold focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-0.5">
                  Father's Name
                </label>
                <input
                  type="text"
                  value={data.party2.father}
                  onChange={(e) => handlePartyChange('party2', 'father', e.target.value)}
                  className="w-full px-2 py-1.5 border border-slate-300 rounded text-xs"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-0.5">
                  Mother's Name
                </label>
                <input
                  type="text"
                  value={data.party2.mother}
                  onChange={(e) => handlePartyChange('party2', 'mother', e.target.value)}
                  className="w-full px-2 py-1.5 border border-slate-300 rounded text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-0.5">
                Residential Address
              </label>
              <input
                type="text"
                value={data.party2.address}
                onChange={(e) => handlePartyChange('party2', 'address', e.target.value)}
                className="w-full px-2 py-1.5 border border-slate-300 rounded text-xs"
              />
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-0.5">
                  Date of Birth
                </label>
                <input
                  type="date"
                  value={data.party2.dob}
                  onChange={(e) => handlePartyChange('party2', 'dob', e.target.value)}
                  className="w-full px-2 py-1.5 border border-slate-300 rounded text-xs"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-0.5">
                  National ID (NID)
                </label>
                <input
                  type="text"
                  value={data.party2.nid}
                  onChange={(e) => handlePartyChange('party2', 'nid', e.target.value)}
                  className="w-full px-2 py-1.5 border border-slate-300 rounded text-xs font-mono"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-0.5">
                  e-TIN No.
                </label>
                <input
                  type="text"
                  value={data.party2.tin}
                  onChange={(e) => handlePartyChange('party2', 'tin', e.target.value)}
                  className="w-full px-2 py-1.5 border border-slate-300 rounded text-xs font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 bg-emerald-50/50 p-2 rounded border border-emerald-100">
              <div>
                <label className="block text-[10px] font-bold text-emerald-900 mb-0.5 uppercase">
                  Designation
                </label>
                <input
                  type="text"
                  value={data.party2.role}
                  onChange={(e) => handlePartyChange('party2', 'role', e.target.value)}
                  className="w-full px-2 py-1 border border-emerald-300 rounded text-xs font-semibold"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-emerald-900 mb-0.5 uppercase">
                  Share %
                </label>
                <input
                  type="text"
                  value={data.party2.sharePct}
                  onChange={(e) => handlePartyChange('party2', 'sharePct', e.target.value)}
                  className="w-full px-2 py-1 border border-emerald-300 rounded text-xs font-bold text-center"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-emerald-900 mb-0.5 uppercase">
                  Capital (BDT)
                </label>
                <input
                  type="text"
                  value={data.party2.shareAmt}
                  onChange={(e) => handlePartyChange('party2', 'shareAmt', e.target.value)}
                  className="w-full px-2 py-1 border border-emerald-300 rounded text-xs font-mono font-bold"
                />
              </div>
            </div>
          </div>
        </details>

        {/* SECTION 4: BUSINESS OBJECTS */}
        <details className="bg-white border border-slate-200 rounded-lg shadow-2xs open:pb-2">
          <summary className="p-2.5 font-bold text-slate-800 cursor-pointer hover:bg-slate-50 flex items-center gap-2 select-none">
            <Briefcase className="w-4 h-4 text-emerald-600" />
            <span>4. Statutory Business Scope (Clause 3)</span>
          </summary>
          <div className="px-3 pt-2 space-y-2 border-t border-slate-100">
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-0.5">
                Primary Business Scope (RMG, Export/Import, Buying House)
              </label>
              <textarea
                rows={3}
                value={data.info.businessScope1}
                onChange={(e) => handleInfoChange('businessScope1', e.target.value)}
                className="w-full px-2 py-1.5 border border-slate-300 rounded text-xs focus:ring-1 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-0.5">
                Secondary & Ancillary Activities (Fabrics, Trims, Quality Assurance)
              </label>
              <textarea
                rows={2}
                value={data.info.businessScope2}
                onChange={(e) => handleInfoChange('businessScope2', e.target.value)}
                className="w-full px-2 py-1.5 border border-slate-300 rounded text-xs focus:ring-1 focus:ring-emerald-500"
              />
            </div>
          </div>
        </details>

        {/* SECTION 5: WITNESSES */}
        <details className="bg-white border border-slate-200 rounded-lg shadow-2xs open:pb-2">
          <summary className="p-2.5 font-bold text-slate-800 cursor-pointer hover:bg-slate-50 flex items-center gap-2 select-none">
            <UserCheck className="w-4 h-4 text-emerald-600" />
            <span>5. Witnesses for Execution (Clause 25)</span>
          </summary>
          <div className="px-3 pt-2 space-y-3 border-t border-slate-100">
            {/* Witness 1 */}
            <div className="p-2 bg-slate-50 rounded border border-slate-200 space-y-1.5">
              <span className="font-bold text-[11px] text-slate-800">Witness #1</span>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={data.witnesses[0].name}
                  onChange={(e) => handleWitnessChange(0, 'name', e.target.value)}
                  className="px-2 py-1 border border-slate-300 rounded text-xs"
                />
                <input
                  type="text"
                  placeholder="Father's Name"
                  value={data.witnesses[0].father}
                  onChange={(e) => handleWitnessChange(0, 'father', e.target.value)}
                  className="px-2 py-1 border border-slate-300 rounded text-xs"
                />
              </div>
              <input
                type="text"
                placeholder="Full Address"
                value={data.witnesses[0].address}
                onChange={(e) => handleWitnessChange(0, 'address', e.target.value)}
                className="w-full px-2 py-1 border border-slate-300 rounded text-xs"
              />
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="National ID (NID)"
                  value={data.witnesses[0].nid}
                  onChange={(e) => handleWitnessChange(0, 'nid', e.target.value)}
                  className="px-2 py-1 border border-slate-300 rounded text-xs font-mono"
                />
                <input
                  type="text"
                  placeholder="Phone Number"
                  value={data.witnesses[0].phone}
                  onChange={(e) => handleWitnessChange(0, 'phone', e.target.value)}
                  className="px-2 py-1 border border-slate-300 rounded text-xs"
                />
              </div>
            </div>

            {/* Witness 2 */}
            <div className="p-2 bg-slate-50 rounded border border-slate-200 space-y-1.5">
              <span className="font-bold text-[11px] text-slate-800">Witness #2</span>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={data.witnesses[1].name}
                  onChange={(e) => handleWitnessChange(1, 'name', e.target.value)}
                  className="px-2 py-1 border border-slate-300 rounded text-xs"
                />
                <input
                  type="text"
                  placeholder="Father's Name"
                  value={data.witnesses[1].father}
                  onChange={(e) => handleWitnessChange(1, 'father', e.target.value)}
                  className="px-2 py-1 border border-slate-300 rounded text-xs"
                />
              </div>
              <input
                type="text"
                placeholder="Full Address"
                value={data.witnesses[1].address}
                onChange={(e) => handleWitnessChange(1, 'address', e.target.value)}
                className="w-full px-2 py-1 border border-slate-300 rounded text-xs"
              />
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="National ID (NID)"
                  value={data.witnesses[1].nid}
                  onChange={(e) => handleWitnessChange(1, 'nid', e.target.value)}
                  className="px-2 py-1 border border-slate-300 rounded text-xs font-mono"
                />
                <input
                  type="text"
                  placeholder="Phone Number"
                  value={data.witnesses[1].phone}
                  onChange={(e) => handleWitnessChange(1, 'phone', e.target.value)}
                  className="px-2 py-1 border border-slate-300 rounded text-xs"
                />
              </div>
            </div>
          </div>
        </details>
      </div>
    </div>
  );
};
