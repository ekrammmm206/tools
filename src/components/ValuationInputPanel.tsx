import React, { useState } from 'react';
import {
  ValuationDocumentState,
  LandProperty,
  FinancialInvestment,
  RentalIncome
} from '../types/valuation';
import {
  FileText,
  UserCheck,
  Building,
  Coins,
  DollarSign,
  Plus,
  Trash2,
  Calendar,
  Layers,
  Briefcase
} from 'lucide-react';

interface ValuationInputPanelProps {
  data: ValuationDocumentState;
  onChange: (newData: ValuationDocumentState) => void;
}

export const ValuationInputPanel: React.FC<ValuationInputPanelProps> = ({ data, onChange }) => {
  const [activeTab, setActiveTab] = useState<'general' | 'parties' | 'totals' | 'lands' | 'investments' | 'income' | 'firm'>('general');

  const updateGeneral = (field: keyof typeof data.general, value: any) => {
    onChange({
      ...data,
      general: {
        ...data.general,
        [field]: value
      }
    });
  };

  const updateApplicant = (field: keyof typeof data.applicant, value: string) => {
    onChange({
      ...data,
      applicant: {
        ...data.applicant,
        [field]: value
      }
    });
  };

  const updateSponsor = (field: keyof typeof data.sponsor, value: string) => {
    onChange({
      ...data,
      sponsor: {
        ...data.sponsor,
        [field]: value
      }
    });
  };

  const updateSummary = (field: keyof typeof data.summary, value: any) => {
    onChange({
      ...data,
      summary: {
        ...data.summary,
        [field]: value
      }
    });
  };

  const togglePage = (pageKey: keyof typeof data.includedPages) => {
    onChange({
      ...data,
      includedPages: {
        ...data.includedPages,
        [pageKey]: !data.includedPages[pageKey]
      }
    });
  };

  // Land actions
  const addLand = () => {
    const newLand: LandProperty = {
      id: `land-${Date.now()}`,
      deed: 'Deed No. / Date',
      details: 'Mouza, Thana, District, Khatian & Dag details...',
      purchase: 500000,
      cap: 500000,
      book: 5000000,
      fmv: 0
    };
    onChange({
      ...data,
      lands: [...data.lands, newLand]
    });
  };

  const updateLand = (idx: number, field: keyof LandProperty, val: any) => {
    const updated = [...data.lands];
    updated[idx] = { ...updated[idx], [field]: val };
    onChange({ ...data, lands: updated });
  };

  const removeLand = (idx: number) => {
    onChange({ ...data, lands: data.lands.filter((_, i) => i !== idx) });
  };

  // Investment actions
  const addInvestment = () => {
    const newInv: FinancialInvestment = {
      id: `inv-${Date.now()}`,
      nature: 'Fixed Deposit Receipt (FDR)',
      inst: 'Bank Name, Branch',
      acc: '000000000000',
      amount: 1000000
    };
    onChange({
      ...data,
      investments: [...data.investments, newInv]
    });
  };

  const updateInvestment = (idx: number, field: keyof FinancialInvestment, val: any) => {
    const updated = [...data.investments];
    updated[idx] = { ...updated[idx], [field]: val };
    onChange({ ...data, investments: updated });
  };

  const removeInvestment = (idx: number) => {
    onChange({ ...data, investments: data.investments.filter((_, i) => i !== idx) });
  };

  // Quick Currency Preset Changer
  const handleCurrencyPreset = (code: string, symbol: string, defaultRate: number) => {
    onChange({
      ...data,
      general: {
        ...data.general,
        foreignCurrencyCode: code,
        foreignCurrencySymbol: symbol,
        exchangeRate: defaultRate
      }
    });
  };

  return (
    <div className="w-full h-full flex flex-col bg-slate-50 border-r border-slate-200 text-slate-800">
      {/* Tab Navigation */}
      <div className="flex border-b border-slate-200 bg-white overflow-x-auto shrink-0 shadow-xs">
        <button
          type="button"
          onClick={() => setActiveTab('general')}
          className={`px-3.5 py-3 text-xs font-semibold flex items-center gap-1.5 border-b-2 whitespace-nowrap transition ${
            activeTab === 'general'
              ? 'border-emerald-600 text-emerald-700 bg-emerald-50/50'
              : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <Calendar className="w-3.5 h-3.5" />
          General &amp; Rates
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('parties')}
          className={`px-3.5 py-3 text-xs font-semibold flex items-center gap-1.5 border-b-2 whitespace-nowrap transition ${
            activeTab === 'parties'
              ? 'border-emerald-600 text-emerald-700 bg-emerald-50/50'
              : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <UserCheck className="w-3.5 h-3.5" />
          Applicant &amp; Sponsor
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('totals')}
          className={`px-3.5 py-3 text-xs font-semibold flex items-center gap-1.5 border-b-2 whitespace-nowrap transition ${
            activeTab === 'totals'
              ? 'border-emerald-600 text-emerald-700 bg-emerald-50/50'
              : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <Coins className="w-3.5 h-3.5" />
          Summary Totals
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('lands')}
          className={`px-3.5 py-3 text-xs font-semibold flex items-center gap-1.5 border-b-2 whitespace-nowrap transition ${
            activeTab === 'lands'
              ? 'border-emerald-600 text-emerald-700 bg-emerald-50/50'
              : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <Building className="w-3.5 h-3.5" />
          Lands ({data.lands.length})
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('investments')}
          className={`px-3.5 py-3 text-xs font-semibold flex items-center gap-1.5 border-b-2 whitespace-nowrap transition ${
            activeTab === 'investments'
              ? 'border-emerald-600 text-emerald-700 bg-emerald-50/50'
              : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <DollarSign className="w-3.5 h-3.5" />
          Investments ({data.investments.length})
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('income')}
          className={`px-3.5 py-3 text-xs font-semibold flex items-center gap-1.5 border-b-2 whitespace-nowrap transition ${
            activeTab === 'income'
              ? 'border-emerald-600 text-emerald-700 bg-emerald-50/50'
              : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <Briefcase className="w-3.5 h-3.5" />
          Annual Income
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('firm')}
          className={`px-3.5 py-3 text-xs font-semibold flex items-center gap-1.5 border-b-2 whitespace-nowrap transition ${
            activeTab === 'firm'
              ? 'border-emerald-600 text-emerald-700 bg-emerald-50/50'
              : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          CA Firm &amp; Notes
        </button>
      </div>

      {/* Tab Panels Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-5">
        {/* TAB 1: General & Rates */}
        {activeTab === 'general' && (
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-3">
              <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-emerald-600" />
                Valuation Report Identity &amp; Dates
              </h3>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Reference Number</label>
                <input
                  type="text"
                  value={data.general.refNo}
                  onChange={(e) => updateGeneral('refNo', e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none font-mono"
                  placeholder="e.g. AVEL/TASN/46137"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Report Date (Long)</label>
                  <input
                    type="text"
                    value={data.general.reportDate}
                    onChange={(e) => updateGeneral('reportDate', e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    placeholder="e.g. 25 April 2026"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Report Date (Short)</label>
                  <input
                    type="text"
                    value={data.general.reportDateShort}
                    onChange={(e) => updateGeneral('reportDateShort', e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    placeholder="e.g. 25-Apr-2026"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Valuation Date (Doc 05 Notes)</label>
                <input
                  type="text"
                  value={data.general.valuationDate}
                  onChange={(e) => updateGeneral('valuationDate', e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  placeholder="e.g. 21 May 2026"
                />
              </div>
            </div>

            {/* Foreign Currency Conversion Settings */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-3">
              <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center justify-between">
                <span>Foreign Currency &amp; Exchange Rate</span>
                <span className="text-[11px] font-normal text-slate-500">Quick presets:</span>
              </h3>

              {/* Currency Presets */}
              <div className="flex flex-wrap gap-1.5">
                {[
                  { code: 'NZD', sym: '$', rate: 72.00, label: 'NZD (72.00)' },
                  { code: 'USD', sym: '$', rate: 122.50, label: 'USD (122.50)' },
                  { code: 'CAD', sym: 'C$', rate: 89.00, label: 'CAD (89.00)' },
                  { code: 'AUD', sym: 'A$', rate: 79.50, label: 'AUD (79.50)' },
                  { code: 'GBP', sym: '£', rate: 156.00, label: 'GBP (156.00)' },
                  { code: 'EUR', sym: '€', rate: 133.00, label: 'EUR (133.00)' }
                ].map((item) => (
                  <button
                    key={item.code}
                    type="button"
                    onClick={() => handleCurrencyPreset(item.code, item.sym, item.rate)}
                    className={`px-2 py-1 text-xs rounded border transition ${
                      data.general.foreignCurrencyCode === item.code
                        ? 'bg-emerald-600 text-white border-emerald-600 font-bold'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Currency Code</label>
                  <input
                    type="text"
                    value={data.general.foreignCurrencyCode}
                    onChange={(e) => updateGeneral('foreignCurrencyCode', e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none font-bold uppercase"
                    placeholder="NZD"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Symbol</label>
                  <input
                    type="text"
                    value={data.general.foreignCurrencySymbol}
                    onChange={(e) => updateGeneral('foreignCurrencySymbol', e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none text-center font-bold"
                    placeholder="$"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">1 {data.general.foreignCurrencyCode} = BDT</label>
                  <input
                    type="number"
                    step="0.01"
                    value={data.general.exchangeRate}
                    onChange={(e) => updateGeneral('exchangeRate', parseFloat(e.target.value) || 72)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none font-mono font-bold text-emerald-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Exchange Rate Source Citation</label>
                <input
                  type="text"
                  value={data.general.exchangeRateSource}
                  onChange={(e) => updateGeneral('exchangeRateSource', e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  placeholder="Western Union Exchange Rate Reference"
                />
              </div>
            </div>

            {/* Page Inclusions */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-2">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-1">Document Pages</h3>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {(Object.keys(data.includedPages) as (keyof typeof data.includedPages)[]).map((key) => (
                  <label key={key} className="flex items-center gap-2 p-1.5 border border-slate-200 rounded cursor-pointer hover:bg-slate-50">
                    <input
                      type="checkbox"
                      checked={data.includedPages[key]}
                      onChange={() => togglePage(key)}
                      className="rounded text-emerald-600 focus:ring-emerald-500"
                    />
                    <span className="capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Parties */}
        {activeTab === 'parties' && (
          <div className="space-y-4">
            {/* Applicant */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-3">
              <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-emerald-600" />
                Applicant Information (Student / Immigrant / Beneficiary)
              </h3>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Applicant Full Name</label>
                <input
                  type="text"
                  value={data.applicant.name}
                  onChange={(e) => updateApplicant('name', e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none uppercase font-semibold"
                  placeholder="TASNEEM FERDOUSA"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Passport Number</label>
                  <input
                    type="text"
                    value={data.applicant.passport}
                    onChange={(e) => updateApplicant('passport', e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none font-mono uppercase"
                    placeholder="A03334365"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">National ID (NID)</label>
                  <input
                    type="text"
                    value={data.applicant.nid}
                    onChange={(e) => updateApplicant('nid', e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none font-mono"
                    placeholder="7793647848"
                  />
                </div>
              </div>
            </div>

            {/* Sponsor */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-3">
              <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-emerald-600" />
                Sponsor Information (Property Owner &amp; Financial Guarantor)
              </h3>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Sponsor Full Name</label>
                <input
                  type="text"
                  value={data.sponsor.name}
                  onChange={(e) => updateSponsor('name', e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none uppercase font-semibold"
                  placeholder="DR FERDOUS NILUFAR"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Passport Number</label>
                  <input
                    type="text"
                    value={data.sponsor.passport}
                    onChange={(e) => updateSponsor('passport', e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none font-mono uppercase"
                    placeholder="B00048151"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">National ID (NID)</label>
                  <input
                    type="text"
                    value={data.sponsor.nid}
                    onChange={(e) => updateSponsor('nid', e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none font-mono"
                    placeholder="5093331618"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Relationship to Applicant</label>
                <input
                  type="text"
                  value={data.sponsor.relationship || ''}
                  onChange={(e) => updateSponsor('relationship', e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  placeholder="Mother / Father / Uncle / Self"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: Summary Totals */}
        {activeTab === 'totals' && (
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-4">
              <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Coins className="w-4 h-4 text-emerald-600" />
                  Executive Summary Net Worth
                </h3>

                <label className="flex items-center gap-1.5 text-xs text-slate-600 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={data.summary.useLiveTableSums}
                    onChange={(e) => updateSummary('useLiveTableSums', e.target.checked)}
                    className="rounded text-emerald-600"
                  />
                  <span>Live sum from Annexures</span>
                </label>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <label className="font-semibold text-slate-700">1. Lands &amp; Buildings (BDT)</label>
                    <span className="text-slate-500 font-mono">
                      ≈ {data.general.foreignCurrencySymbol} {Math.round(data.summary.landBdt / data.general.exchangeRate).toLocaleString()} {data.general.foreignCurrencyCode}
                    </span>
                  </div>
                  <input
                    type="number"
                    value={data.summary.landBdt}
                    disabled={data.summary.useLiveTableSums}
                    onChange={(e) => updateSummary('landBdt', parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none font-mono font-bold text-slate-900 disabled:bg-slate-100"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <label className="font-semibold text-slate-700">2. Investments &amp; Financial Assets (BDT)</label>
                    <span className="text-slate-500 font-mono">
                      ≈ {data.general.foreignCurrencySymbol} {Math.round(data.summary.invBdt / data.general.exchangeRate).toLocaleString()} {data.general.foreignCurrencyCode}
                    </span>
                  </div>
                  <input
                    type="number"
                    value={data.summary.invBdt}
                    disabled={data.summary.useLiveTableSums}
                    onChange={(e) => updateSummary('invBdt', parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none font-mono font-bold text-slate-900 disabled:bg-slate-100"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <label className="font-semibold text-slate-700">3. Annual Income (BDT)</label>
                    <span className="text-slate-500 font-mono">
                      ≈ {data.general.foreignCurrencySymbol} {Math.round(data.summary.incBdt / data.general.exchangeRate).toLocaleString()} {data.general.foreignCurrencyCode}
                    </span>
                  </div>
                  <input
                    type="number"
                    value={data.summary.incBdt}
                    disabled={data.summary.useLiveTableSums}
                    onChange={(e) => updateSummary('incBdt', parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none font-mono font-bold text-slate-900 disabled:bg-slate-100"
                  />
                </div>
              </div>

              {/* Total Calculation Display */}
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg space-y-1 text-xs">
                <div className="flex justify-between font-bold text-emerald-950">
                  <span>Total Net Worth (BDT):</span>
                  <span className="font-mono text-sm">৳ {(data.summary.landBdt + data.summary.invBdt + data.summary.incBdt).toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-bold text-emerald-800">
                  <span>Total Net Worth ({data.general.foreignCurrencyCode}):</span>
                  <span className="font-mono text-sm">
                    {data.general.foreignCurrencySymbol} {Math.round((data.summary.landBdt + data.summary.invBdt + data.summary.incBdt) / data.general.exchangeRate).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: Annexure A Lands */}
        {activeTab === 'lands' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center text-xs text-slate-600 px-1">
              <span>Schedule of Lands &amp; Buildings Properties</span>
              <button
                type="button"
                onClick={addLand}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Land Property
              </button>
            </div>

            {data.lands.map((land, idx) => (
              <div key={land.id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-3">
                <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                  <span className="text-xs font-bold text-slate-800 uppercase">Property #{idx + 1}</span>
                  <button
                    type="button"
                    onClick={() => removeLand(idx)}
                    className="p-1 text-slate-400 hover:text-red-600"
                    title="Remove Property"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">Deed / Khatian Number &amp; Date</label>
                  <input
                    type="text"
                    value={land.deed}
                    onChange={(e) => updateLand(idx, 'deed', e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded focus:ring-2 focus:ring-emerald-500 focus:outline-none font-mono"
                    placeholder="e.g. 1723 / 08-Jan-2017"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">Property Details (Mouza, Thana, Dag, Decimals)</label>
                  <textarea
                    rows={3}
                    value={land.details}
                    onChange={(e) => updateLand(idx, 'details', e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    placeholder="Full description of the property..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">Purchase Price (BDT)</label>
                    <input
                      type="number"
                      value={land.purchase}
                      onChange={(e) => updateLand(idx, 'purchase', parseFloat(e.target.value) || 0)}
                      className="w-full px-2 py-1 text-xs border border-slate-300 rounded font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">Capitalized Cost (BDT)</label>
                    <input
                      type="number"
                      value={land.cap}
                      onChange={(e) => updateLand(idx, 'cap', parseFloat(e.target.value) || 0)}
                      className="w-full px-2 py-1 text-xs border border-slate-300 rounded font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">Book Value / Valuation (BDT)</label>
                    <input
                      type="number"
                      value={land.book}
                      onChange={(e) => updateLand(idx, 'book', parseFloat(e.target.value) || 0)}
                      className="w-full px-2 py-1 text-xs border border-slate-300 rounded font-mono font-semibold text-blue-900"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">FMV Per Unit (BDT)</label>
                    <input
                      type="number"
                      value={land.fmv || 0}
                      onChange={(e) => updateLand(idx, 'fmv', parseFloat(e.target.value) || 0)}
                      className="w-full px-2 py-1 text-xs border border-slate-300 rounded font-mono"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 5: Annexure B Investments */}
        {activeTab === 'investments' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center text-xs text-slate-600 px-1">
              <span>Schedule of Financial Investments</span>
              <button
                type="button"
                onClick={addInvestment}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Investment
              </button>
            </div>

            {data.investments.map((inv, idx) => (
              <div key={inv.id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-2.5">
                <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                  <span className="text-xs font-bold text-slate-800 uppercase">Investment #{idx + 1}</span>
                  <button
                    type="button"
                    onClick={() => removeInvestment(idx)}
                    className="p-1 text-slate-400 hover:text-red-600"
                    title="Remove Investment"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">Nature of Investment</label>
                  <input
                    type="text"
                    value={inv.nature}
                    onChange={(e) => updateInvestment(idx, 'nature', e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    placeholder="Fixed Deposit Receipt (FDR) / Savings / Govt Instruments"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">Institution / Bank &amp; Branch</label>
                  <input
                    type="text"
                    value={inv.inst}
                    onChange={(e) => updateInvestment(idx, 'inst', e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    placeholder="e.g. Agrani Bank PLC, Court Bazar Branch"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">A/C Number</label>
                    <input
                      type="text"
                      value={inv.acc}
                      onChange={(e) => updateInvestment(idx, 'acc', e.target.value)}
                      className="w-full px-2 py-1 text-xs border border-slate-300 rounded font-mono"
                      placeholder="200025119908"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">Amount (BDT)</label>
                    <input
                      type="number"
                      value={inv.amount}
                      onChange={(e) => updateInvestment(idx, 'amount', parseFloat(e.target.value) || 0)}
                      className="w-full px-2 py-1 text-xs border border-slate-300 rounded font-mono font-semibold text-blue-900"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 6: Annual Income */}
        {activeTab === 'income' && (
          <div className="space-y-4">
            {/* Employment Income */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-3">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2">
                1. Income from Employment
              </h3>
              {data.employmentIncomes.map((emp, i) => (
                <div key={emp.id} className="space-y-2">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">Designation &amp; Employer</label>
                    <input
                      type="text"
                      value={emp.particulars}
                      onChange={(e) => {
                        const updated = [...data.employmentIncomes];
                        updated[i] = { ...updated[i], particulars: e.target.value };
                        onChange({ ...data, employmentIncomes: updated });
                      }}
                      className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">Monthly (BDT)</label>
                      <input
                        type="number"
                        value={emp.monthly}
                        onChange={(e) => {
                          const val = parseFloat(e.target.value) || 0;
                          const updated = [...data.employmentIncomes];
                          updated[i] = { ...updated[i], monthly: val, annual: val * 12 };
                          onChange({ ...data, employmentIncomes: updated });
                        }}
                        className="w-full px-2 py-1 text-xs border border-slate-300 rounded font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">Annual (BDT)</label>
                      <input
                        type="number"
                        value={emp.annual}
                        onChange={(e) => {
                          const val = parseFloat(e.target.value) || 0;
                          const updated = [...data.employmentIncomes];
                          updated[i] = { ...updated[i], annual: val };
                          onChange({ ...data, employmentIncomes: updated });
                        }}
                        className="w-full px-2 py-1 text-xs border border-slate-300 rounded font-mono font-semibold"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Rental Income */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-3">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2">
                2. Income from House Rent
              </h3>
              {data.rentalIncomes.map((rent, i) => (
                <div key={rent.id} className="p-2.5 border border-slate-200 rounded-lg space-y-2 text-xs">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] font-semibold text-slate-500">Floor</label>
                      <input
                        type="text"
                        value={rent.floor}
                        onChange={(e) => {
                          const updated = [...data.rentalIncomes];
                          updated[i] = { ...updated[i], floor: e.target.value };
                          onChange({ ...data, rentalIncomes: updated });
                        }}
                        className="w-full px-2 py-1 text-xs border border-slate-300 rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-semibold text-slate-500">Description</label>
                      <input
                        type="text"
                        value={rent.description}
                        onChange={(e) => {
                          const updated = [...data.rentalIncomes];
                          updated[i] = { ...updated[i], description: e.target.value };
                          onChange({ ...data, rentalIncomes: updated });
                        }}
                        className="w-full px-2 py-1 text-xs border border-slate-300 rounded"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="block text-[10px] font-semibold text-slate-500">Rent/Unit</label>
                      <input
                        type="number"
                        value={rent.rentPerUnit}
                        onChange={(e) => {
                          const updated = [...data.rentalIncomes];
                          updated[i] = { ...updated[i], rentPerUnit: parseFloat(e.target.value) || 0 };
                          onChange({ ...data, rentalIncomes: updated });
                        }}
                        className="w-full px-2 py-1 text-xs border border-slate-300 rounded font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-semibold text-slate-500">Monthly</label>
                      <input
                        type="number"
                        value={rent.monthly}
                        onChange={(e) => {
                          const updated = [...data.rentalIncomes];
                          updated[i] = { ...updated[i], monthly: parseFloat(e.target.value) || 0 };
                          onChange({ ...data, rentalIncomes: updated });
                        }}
                        className="w-full px-2 py-1 text-xs border border-slate-300 rounded font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-semibold text-slate-500">Annual</label>
                      <input
                        type="number"
                        value={rent.annual}
                        onChange={(e) => {
                          const updated = [...data.rentalIncomes];
                          updated[i] = { ...updated[i], annual: parseFloat(e.target.value) || 0 };
                          onChange({ ...data, rentalIncomes: updated });
                        }}
                        className="w-full px-2 py-1 text-xs border border-slate-300 rounded font-mono font-semibold"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Business Income */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-3">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2">
                3. Business Income (Partnership Firm)
              </h3>
              {data.businessIncomes.map((biz, i) => (
                <div key={biz.id} className="space-y-2">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">Firm / Enterprise Name</label>
                    <input
                      type="text"
                      value={biz.source}
                      onChange={(e) => {
                        const updated = [...data.businessIncomes];
                        updated[i] = { ...updated[i], source: e.target.value };
                        onChange({ ...data, businessIncomes: updated });
                      }}
                      className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">Monthly (BDT)</label>
                      <input
                        type="number"
                        value={biz.monthly}
                        onChange={(e) => {
                          const val = parseFloat(e.target.value) || 0;
                          const updated = [...data.businessIncomes];
                          updated[i] = { ...updated[i], monthly: val, annual: val * 12 };
                          onChange({ ...data, businessIncomes: updated });
                        }}
                        className="w-full px-2 py-1 text-xs border border-slate-300 rounded font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">Annual (BDT)</label>
                      <input
                        type="number"
                        value={biz.annual}
                        onChange={(e) => {
                          const val = parseFloat(e.target.value) || 0;
                          const updated = [...data.businessIncomes];
                          updated[i] = { ...updated[i], annual: val };
                          onChange({ ...data, businessIncomes: updated });
                        }}
                        className="w-full px-2 py-1 text-xs border border-slate-300 rounded font-mono font-semibold"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 7: Firm & Notes */}
        {activeTab === 'firm' && (
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-3">
              <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
                Valuer &amp; Chartered Accountants Firm
              </h3>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Valuation Firm Name</label>
                <input
                  type="text"
                  value={data.general.firmName}
                  onChange={(e) => updateGeneral('firmName', e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  placeholder="e.g. A. Rahman & Co., Chartered Accountants"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Signatory Valuer Name</label>
                <input
                  type="text"
                  value={data.general.valuerName}
                  onChange={(e) => updateGeneral('valuerName', e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  placeholder="e.g. Md. Anisur Rahman, FCA"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Valuer Professional Title</label>
                <input
                  type="text"
                  value={data.general.valuerDesignation}
                  onChange={(e) => updateGeneral('valuerDesignation', e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  placeholder="Chartered Accountants & Certified Valuers"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
