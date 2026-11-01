import React, { useState } from 'react';
import {
  WithholdingReturnState,
  SalaryEmployeeRecord,
  ChallanRecord
} from '../types/withholdingReturn';
import {
  calculateSalaryRowGross,
  calculateSalaryTotals,
  calculateChallanTotals,
  formatCurrencyCommas
} from '../utils/withholdingReturnCalculations';
import {
  Building2,
  FileText,
  Users,
  Coins,
  Receipt,
  Calendar,
  Plus,
  Trash2,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  FileCheck
} from 'lucide-react';

interface WithholdingReturnInputPanelProps {
  data: WithholdingReturnState;
  onChange: React.Dispatch<React.SetStateAction<WithholdingReturnState>>;
}

export const WithholdingReturnInputPanel: React.FC<WithholdingReturnInputPanelProps> = ({
  data,
  onChange
}) => {
  const [activeTab, setActiveTab] = useState<'general' | 'sources' | 'treasury' | 'salaries' | 'verification' | 'other'>(
    'general'
  );

  const {
    selectedSubDoc,
    general,
    salariesSummary,
    treasury,
    verification,
    salaries
  } = data;

  const salaryTotals = calculateSalaryTotals(salaries);
  const challanTotal = calculateChallanTotals(treasury.challans);

  const updateGeneral = (field: keyof typeof general, value: any) => {
    onChange((prev) => ({
      ...prev,
      general: { ...prev.general, [field]: value }
    }));
  };

  const updateSalariesSummary = (field: keyof typeof salariesSummary, value: string) => {
    onChange((prev) => ({
      ...prev,
      salariesSummary: { ...prev.salariesSummary, [field]: value }
    }));
  };

  const updateTreasury = (field: keyof typeof treasury, value: any) => {
    onChange((prev) => ({
      ...prev,
      treasury: { ...prev.treasury, [field]: value }
    }));
  };

  const updateVerification = (field: keyof typeof verification, value: string) => {
    onChange((prev) => ({
      ...prev,
      verification: { ...prev.verification, [field]: value }
    }));
  };

  // Challan management
  const handleAddChallan = () => {
    const newChallan: ChallanRecord = {
      id: `c_${Date.now()}`,
      no: '',
      date: '25-Jan-2026',
      bank: 'IBBL',
      amt: '0'
    };
    onChange((prev) => ({
      ...prev,
      treasury: {
        ...prev.treasury,
        challans: [...prev.treasury.challans, newChallan]
      }
    }));
  };

  const handleUpdateChallan = (index: number, field: keyof ChallanRecord, value: string) => {
    onChange((prev) => {
      const updated = [...prev.treasury.challans];
      updated[index] = { ...updated[index], [field]: value };
      return {
        ...prev,
        treasury: {
          ...prev.treasury,
          challans: updated
        }
      };
    });
  };

  const handleRemoveChallan = (index: number) => {
    onChange((prev) => ({
      ...prev,
      treasury: {
        ...prev.treasury,
        challans: prev.treasury.challans.filter((_, i) => i !== index)
      }
    }));
  };

  // Salary Employee management
  const handleAddEmployee = () => {
    const newEmp: SalaryEmployeeRecord = {
      id: `s_${Date.now()}`,
      sl: (salaries.length + 1).toString(),
      name: '',
      desig: '',
      tin: '',
      basic: '0',
      bonus: '',
      house: '0',
      conv: '0',
      med: '0',
      other: '0',
      total: '0',
      tax: '0',
      challan: treasury.challans[0]?.no || '',
      cDate: treasury.challans[0]?.date || '25-Jan-26',
      bank: treasury.challans[0]?.bank || 'IBBL',
      amt: '0',
      rem: ''
    };
    onChange((prev) => ({
      ...prev,
      salaries: [...prev.salaries, newEmp]
    }));
  };

  const handleUpdateEmployee = (index: number, field: keyof SalaryEmployeeRecord, value: string) => {
    onChange((prev) => {
      const updated = [...prev.salaries];
      const current = { ...updated[index], [field]: value };
      
      // Auto-compute total gross when any allowance changes
      if (['basic', 'bonus', 'house', 'conv', 'med', 'other'].includes(field)) {
        const gross = calculateSalaryRowGross(current);
        current.total = formatCurrencyCommas(gross);
      }
      
      updated[index] = current;
      return {
        ...prev,
        salaries: updated
      };
    });
  };

  const handleRemoveEmployee = (index: number) => {
    onChange((prev) => ({
      ...prev,
      salaries: prev.salaries.filter((_, i) => i !== index)
    }));
  };

  const handleSyncSummaryToSalaries = () => {
    onChange((prev) => ({
      ...prev,
      salariesSummary: {
        ...prev.salariesSummary,
        personsCount: String(salaryTotals.employeeCount),
        taxDeducted: formatCurrencyCommas(salaryTotals.totalTax)
      },
      treasury: {
        ...prev.treasury,
        totalDeducted: formatCurrencyCommas(salaryTotals.totalTax),
        totalCredited: formatCurrencyCommas(challanTotal)
      }
    }));
  };

  return (
    <div className="h-full flex flex-col bg-slate-900 border-r border-slate-800 text-slate-100 font-sans text-xs">
      {/* Top Template & Page Navigator */}
      <div className="p-3 bg-slate-950/80 border-b border-slate-800 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 font-bold text-amber-400 text-sm">
            <Receipt className="w-4 h-4" />
            <span>Monthly Withholding Tax Return</span>
          </div>
          <span className="text-[10px] bg-amber-950/80 text-amber-300 px-2 py-0.5 rounded border border-amber-800/80 font-mono">
            TDS / NBR
          </span>
        </div>

        {/* Sub-document Page Filter */}
        <div>
          <label className="text-[10px] text-slate-400 block mb-1 font-semibold uppercase tracking-wider">
            Output Document View:
          </label>
          <select
            value={selectedSubDoc}
            onChange={(e) =>
              onChange((prev) => ({
                ...prev,
                selectedSubDoc: e.target.value as any
              }))
            }
            className="w-full bg-slate-800 border border-slate-700 text-white rounded px-2.5 py-1.5 text-xs focus:ring-1 focus:ring-amber-500 font-medium"
          >
            <option value="all">★ All Pages (1 to 13 - Complete Return)</option>
            <option value="ack">Page 1: Acknowledgement Receipt (Separate Page)</option>
            <option value="general">Page 2: General Information of Return</option>
            <option value="sources">Page 3-4: Sources of TDS (Sections 86 to 136)</option>
            <option value="treasury">Page 5: Treasury Payment & Challans</option>
            <option value="verification">Page 6: Verification & Declarant Signature</option>
            <option value="scheduleA">Page 7-8: Schedule A (Particulars of Services)</option>
            <option value="scheduleC">Page 9-10: Schedule C (Salaries & 16 Employees)</option>
            <option value="scheduleD">Page 11: Schedule D (TDS on Interest)</option>
            <option value="dividend">Page 12: Dividends Distributed & TDS</option>
            <option value="employeeFiling">Page 13: Statement of Employee Tax Return Filings</option>
          </select>
        </div>

        {/* Section Tabs */}
        <div className="flex flex-wrap gap-1 pt-1">
          <button
            onClick={() => setActiveTab('general')}
            className={`px-2.5 py-1 rounded text-[11px] font-medium transition ${
              activeTab === 'general'
                ? 'bg-amber-600 text-white font-semibold'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            General Info
          </button>
          <button
            onClick={() => setActiveTab('sources')}
            className={`px-2.5 py-1 rounded text-[11px] font-medium transition ${
              activeTab === 'sources'
                ? 'bg-amber-600 text-white font-semibold'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            TDS Sources
          </button>
          <button
            onClick={() => setActiveTab('treasury')}
            className={`px-2.5 py-1 rounded text-[11px] font-medium transition ${
              activeTab === 'treasury'
                ? 'bg-amber-600 text-white font-semibold'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            Treasury Challans
          </button>
          <button
            onClick={() => setActiveTab('salaries')}
            className={`px-2.5 py-1 rounded text-[11px] font-medium transition ${
              activeTab === 'salaries'
                ? 'bg-amber-600 text-white font-semibold'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            Schedule C ({salaries.length})
          </button>
          <button
            onClick={() => setActiveTab('verification')}
            className={`px-2.5 py-1 rounded text-[11px] font-medium transition ${
              activeTab === 'verification'
                ? 'bg-amber-600 text-white font-semibold'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            Verification
          </button>
        </div>
      </div>

      {/* Main Tab Content */}
      <div className="flex-1 overflow-y-auto p-3.5 space-y-4">
        {/* TAB 1: GENERAL INFO */}
        {activeTab === 'general' && (
          <div className="space-y-3">
            <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700/80 space-y-2.5">
              <h3 className="font-semibold text-slate-200 flex items-center gap-1.5 text-xs">
                <Calendar className="w-3.5 h-3.5 text-amber-400" />
                <span>Return Period & Person Particulars</span>
              </h3>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] text-slate-400 block mb-0.5">Financial Year</label>
                  <input
                    type="text"
                    value={general.fy}
                    onChange={(e) => updateGeneral('fy', e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-white font-mono text-xs"
                    placeholder="2025 - 2026"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 block mb-0.5">Applicable Month</label>
                  <input
                    type="text"
                    value={general.month}
                    onChange={(e) => updateGeneral('month', e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-white text-xs font-semibold"
                    placeholder="Oct, Nov & Dec 2025"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] text-slate-400 block mb-0.5">Name of the Person</label>
                <input
                  type="text"
                  value={general.companyName}
                  onChange={(e) => updateGeneral('companyName', e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-white font-bold text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] text-slate-400 block mb-0.5">TIN (12 Digits)</label>
                  <input
                    type="text"
                    value={general.tin}
                    onChange={(e) => updateGeneral('tin', e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-white font-mono text-xs"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 block mb-0.5">WIN (Optional)</label>
                  <input
                    type="text"
                    value={general.win}
                    onChange={(e) => updateGeneral('win', e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-white font-mono text-xs"
                    placeholder="e.g. 0012938475"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] text-slate-400 block mb-0.5">Taxes Circle</label>
                  <input
                    type="text"
                    value={general.circle}
                    onChange={(e) => updateGeneral('circle', e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-white text-xs"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 block mb-0.5">Taxes Zone</label>
                  <input
                    type="text"
                    value={general.zone}
                    onChange={(e) => updateGeneral('zone', e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-white text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] text-slate-400 block mb-0.5">Registered Address</label>
                <textarea
                  rows={2}
                  value={general.address}
                  onChange={(e) => updateGeneral('address', e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-white text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] text-slate-400 block mb-0.5">Phone / Mobile</label>
                  <input
                    type="text"
                    value={general.phone}
                    onChange={(e) => updateGeneral('phone', e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-white text-xs"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 block mb-0.5">Main Business Sector</label>
                  <input
                    type="text"
                    value={general.business}
                    onChange={(e) => updateGeneral('business', e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-white text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] text-slate-400 block mb-0.5">Submission Date</label>
                  <input
                    type="text"
                    value={general.submissionDate}
                    onChange={(e) => updateGeneral('submissionDate', e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-white text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 block mb-0.5">Type of Person</label>
                  <select
                    value={general.personType}
                    onChange={(e) => updateGeneral('personType', e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-white text-xs"
                  >
                    <option value="company">04A A Company</option>
                    <option value="cooperative">04B A Co-operative society</option>
                    <option value="ngo">04C An NGO</option>
                    <option value="partnership">04D Partnership Firm</option>
                    <option value="other">Other Association</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: TDS SOURCES (Page 3 & 4) */}
        {activeTab === 'sources' && (
          <div className="space-y-3">
            <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700/80 space-y-2.5">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-slate-200 flex items-center gap-1.5 text-xs">
                  <Coins className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Row 1: Salaries (Section 86)</span>
                </h3>
                <button
                  type="button"
                  onClick={handleSyncSummaryToSalaries}
                  className="px-2 py-0.5 bg-amber-600/80 hover:bg-amber-600 text-white rounded text-[10px] font-semibold"
                >
                  Sync from Schedule C
                </button>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-[10px] text-slate-400 block mb-0.5">No. of Persons</label>
                  <input
                    type="text"
                    value={salariesSummary.personsCount}
                    onChange={(e) => updateSalariesSummary('personsCount', e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-white text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 block mb-0.5">Tax Deducted in Period</label>
                  <input
                    type="text"
                    value={salariesSummary.taxDeducted}
                    onChange={(e) => updateSalariesSummary('taxDeducted', e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-white text-xs font-mono font-bold text-emerald-400"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 block mb-0.5">Tax Till Date</label>
                  <input
                    type="text"
                    value={salariesSummary.taxTillDate}
                    onChange={(e) => updateSalariesSummary('taxTillDate', e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-white text-xs font-mono"
                  />
                </div>
              </div>
            </div>

            <div className="bg-slate-800/50 p-3 rounded-lg border border-slate-700/50 text-[11px] text-slate-300 space-y-1.5">
              <p className="font-semibold text-slate-200">Other Statutory Sources (Sections 88-136):</p>
              <p className="text-[10px] text-slate-400">
                • Row (19) House/Office rent (Sec 109): Set as "Own office space"
              </p>
              <p className="text-[10px] text-slate-400">
                • Rows (2) to (35): Rendered per official statutory NBR schedule template.
              </p>
            </div>
          </div>
        )}

        {/* TAB 3: TREASURY PAYMENT & CHALLANS */}
        {activeTab === 'treasury' && (
          <div className="space-y-3">
            <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700/80 space-y-2.5">
              <h3 className="font-semibold text-slate-200 flex items-center gap-1.5 text-xs">
                <Receipt className="w-3.5 h-3.5 text-amber-400" />
                <span>Treasury Payment Summary (Page 5)</span>
              </h3>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-[10px] text-slate-400 block mb-0.5">16A Total Deducted</label>
                  <input
                    type="text"
                    value={treasury.totalDeducted}
                    onChange={(e) => updateTreasury('totalDeducted', e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-white text-xs font-mono font-bold text-amber-300"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 block mb-0.5">16B Total Credited</label>
                  <input
                    type="text"
                    value={treasury.totalCredited}
                    onChange={(e) => updateTreasury('totalCredited', e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-white text-xs font-mono font-bold text-emerald-400"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 block mb-0.5">16C Excess / Deficit</label>
                  <input
                    type="text"
                    value={treasury.excessDeficit}
                    onChange={(e) => updateTreasury('excessDeficit', e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-white text-xs font-mono text-center"
                  />
                </div>
              </div>
            </div>

            {/* Challans List */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-300 text-xs">
                  Treasury Challans ({treasury.challans.length})
                </span>
                <button
                  type="button"
                  onClick={handleAddChallan}
                  className="flex items-center gap-1 px-2 py-0.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-[11px] font-medium"
                >
                  <Plus className="w-3 h-3" />
                  <span>Add Challan</span>
                </button>
              </div>

              {treasury.challans.map((challan, index) => (
                <div
                  key={challan.id || index}
                  className="bg-slate-800/80 p-2.5 rounded border border-slate-700/80 space-y-2"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-[11px] text-amber-400">Challan #{index + 1}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveChallan(index)}
                      className="text-red-400 hover:text-red-300 p-0.5"
                      title="Remove Challan"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-400 block mb-0.5">
                      Challan Numbers (newlines allowed)
                    </label>
                    <textarea
                      rows={2}
                      value={challan.no}
                      onChange={(e) => handleUpdateChallan(index, 'no', e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-white font-mono text-[11px]"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="text-[10px] text-slate-400 block mb-0.5">Date</label>
                      <input
                        type="text"
                        value={challan.date}
                        onChange={(e) => handleUpdateChallan(index, 'date', e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-white text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-400 block mb-0.5">Bank</label>
                      <input
                        type="text"
                        value={challan.bank}
                        onChange={(e) => handleUpdateChallan(index, 'bank', e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-white text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-400 block mb-0.5">Amount (BDT)</label>
                      <input
                        type="text"
                        value={challan.amt}
                        onChange={(e) => handleUpdateChallan(index, 'amt', e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-white text-xs font-mono font-bold text-emerald-400"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: SCHEDULE C - SALARIES (16 Employees) */}
        {activeTab === 'salaries' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between bg-slate-800/90 p-2.5 rounded-lg border border-slate-700">
              <div>
                <span className="font-bold text-amber-400 text-xs">
                  Schedule C: {salaries.length} Employees
                </span>
                <p className="text-[10px] text-slate-400 mt-0.5">
                  Gross: TK {formatCurrencyCommas(salaryTotals.totalGross)} • Tax: TK {formatCurrencyCommas(salaryTotals.totalTax)}
                </p>
              </div>
              <button
                type="button"
                onClick={handleAddEmployee}
                className="flex items-center gap-1 px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-xs font-semibold"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ Add Employee</span>
              </button>
            </div>

            <div className="space-y-2.5 max-h-[550px] overflow-y-auto pr-1">
              {salaries.map((emp, index) => (
                <div
                  key={emp.id || index}
                  className="bg-slate-800/70 p-2.5 rounded border border-slate-700 text-xs space-y-2 hover:border-slate-600 transition"
                >
                  <div className="flex items-center justify-between pb-1 border-b border-slate-700/60">
                    <span className="font-bold text-slate-200">
                      #{emp.sl || index + 1} &nbsp;{emp.name || 'Untitled Employee'}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRemoveEmployee(index)}
                      className="text-red-400 hover:text-red-300 p-0.5"
                      title="Remove Employee"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="text-[9.5px] text-slate-400 block mb-0.5">Employee Name</label>
                      <input
                        type="text"
                        value={emp.name}
                        onChange={(e) => handleUpdateEmployee(index, 'name', e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded px-1.5 py-1 text-white text-xs font-semibold"
                      />
                    </div>
                    <div>
                      <label className="text-[9.5px] text-slate-400 block mb-0.5">Designation</label>
                      <input
                        type="text"
                        value={emp.desig}
                        onChange={(e) => handleUpdateEmployee(index, 'desig', e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded px-1.5 py-1 text-white text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-[9.5px] text-slate-400 block mb-0.5">TIN (12 Digits)</label>
                      <input
                        type="text"
                        value={emp.tin}
                        onChange={(e) => handleUpdateEmployee(index, 'tin', e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded px-1.5 py-1 text-white font-mono text-xs"
                      />
                    </div>
                  </div>

                  {/* Salary breakdown */}
                  <div className="grid grid-cols-4 gap-1.5 bg-slate-900/60 p-2 rounded border border-slate-800 text-[11px]">
                    <div>
                      <label className="text-[9px] text-slate-400 block">Basic</label>
                      <input
                        type="text"
                        value={emp.basic}
                        onChange={(e) => handleUpdateEmployee(index, 'basic', e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded px-1 py-0.5 text-white font-mono text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-[9px] text-slate-400 block">House Rent</label>
                      <input
                        type="text"
                        value={emp.house}
                        onChange={(e) => handleUpdateEmployee(index, 'house', e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded px-1 py-0.5 text-white font-mono text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-[9px] text-slate-400 block">Conveyance</label>
                      <input
                        type="text"
                        value={emp.conv}
                        onChange={(e) => handleUpdateEmployee(index, 'conv', e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded px-1 py-0.5 text-white font-mono text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-[9px] text-slate-400 block">Medical</label>
                      <input
                        type="text"
                        value={emp.med}
                        onChange={(e) => handleUpdateEmployee(index, 'med', e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded px-1 py-0.5 text-white font-mono text-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="text-[9.5px] text-slate-400 block mb-0.5">Total Gross Salary</label>
                      <input
                        type="text"
                        value={emp.total}
                        onChange={(e) => handleUpdateEmployee(index, 'total', e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded px-1.5 py-1 text-amber-300 font-mono font-bold text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-[9.5px] text-slate-400 block mb-0.5">Tax Deducted</label>
                      <input
                        type="text"
                        value={emp.tax}
                        onChange={(e) => handleUpdateEmployee(index, 'tax', e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded px-1.5 py-1 text-emerald-400 font-mono font-bold text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-[9.5px] text-slate-400 block mb-0.5">Challan Date</label>
                      <input
                        type="text"
                        value={emp.cDate}
                        onChange={(e) => handleUpdateEmployee(index, 'cDate', e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded px-1.5 py-1 text-white text-xs"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: VERIFICATION */}
        {activeTab === 'verification' && (
          <div className="space-y-3">
            <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700/80 space-y-2.5">
              <h3 className="font-semibold text-slate-200 flex items-center gap-1.5 text-xs">
                <FileCheck className="w-3.5 h-3.5 text-amber-400" />
                <span>Declaration & Signatory Particulars</span>
              </h3>

              <div>
                <label className="text-[10px] text-slate-400 block mb-0.5">Declarant Name</label>
                <input
                  type="text"
                  value={verification.declarantName}
                  onChange={(e) => updateVerification('declarantName', e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-white font-bold text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] text-slate-400 block mb-0.5">Father / Husband Name</label>
                  <input
                    type="text"
                    value={verification.fatherOrHusband}
                    onChange={(e) => updateVerification('fatherOrHusband', e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-white text-xs"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 block mb-0.5">UTIN / TIN</label>
                  <input
                    type="text"
                    value={verification.tin}
                    onChange={(e) => updateVerification('tin', e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-white font-mono text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] text-slate-400 block mb-0.5">Designation</label>
                  <input
                    type="text"
                    value={verification.designation}
                    onChange={(e) => updateVerification('designation', e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-white text-xs font-semibold"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 block mb-0.5">Place of Signature</label>
                  <input
                    type="text"
                    value={verification.place}
                    onChange={(e) => updateVerification('place', e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-white text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] text-slate-400 block mb-0.5">Other Documents Attached</label>
                <input
                  type="text"
                  value={verification.attachedDocs}
                  onChange={(e) => updateVerification('attachedDocs', e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-white text-xs"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
