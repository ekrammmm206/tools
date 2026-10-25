import React, { useRef } from 'react';
import {
  CombinedDossierState,
  LandPropertyItem,
  BankAccountItem,
  BusinessAssetItem,
  AnnualIncomeItem,
  KhatianPlot,
  KhatianOwner,
  RentalWitness
} from '../types/combinedDossier';
import {
  FileText,
  Plus,
  Trash2,
  DollarSign,
  Building,
  Upload,
  User,
  MapPin,
  Calendar,
  Layers,
  ChevronDown
} from 'lucide-react';

interface CombinedInputPanelProps {
  data: CombinedDossierState;
  onChange: (updater: (prev: CombinedDossierState) => CombinedDossierState) => void;
}

export const CombinedInputPanel: React.FC<CombinedInputPanelProps> = ({
  data,
  onChange
}) => {
  const nidPhotoInputRef = useRef<HTMLInputElement | null>(null);

  const setSubDoc = (doc: CombinedDossierState['selectedSubDoc']) => {
    onChange((prev) => ({ ...prev, selectedSubDoc: doc }));
  };

  const handleNidPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        onChange((prev) => ({
          ...prev,
          nidCard: { ...prev.nidCard, photoUrl: result }
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="h-full overflow-y-auto bg-slate-900 border-r border-slate-800 text-slate-200 p-4 text-xs select-none">
      {/* Header Banner */}
      <div className="mb-4">
        <h2 className="text-sm font-bold text-white flex items-center gap-2">
          <Layers className="w-4 h-4 text-emerald-400" />
          Combined Legal & Immigration Dossier
        </h2>
        <p className="text-[11px] text-slate-400 mt-0.5">
          Edit and customize all 7 statutory Bangladeshi legal documents
        </p>
      </div>

      {/* Document View Filter Tabs */}
      <div className="mb-4">
        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
          Filter Active Preview
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
          <button
            type="button"
            onClick={() => setSubDoc('all')}
            className={`px-2 py-1.5 rounded text-[11px] font-medium text-left border transition ${
              data.selectedSubDoc === 'all'
                ? 'bg-emerald-600 border-emerald-500 text-white font-bold shadow-xs'
                : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-700'
            }`}
          >
            All 7 Documents
          </button>
          <button
            type="button"
            onClick={() => setSubDoc('birthCertificate')}
            className={`px-2 py-1.5 rounded text-[11px] font-medium text-left border transition ${
              data.selectedSubDoc === 'birthCertificate'
                ? 'bg-emerald-600 border-emerald-500 text-white font-bold shadow-xs'
                : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-700'
            }`}
          >
            1. Birth Cert
          </button>
          <button
            type="button"
            onClick={() => setSubDoc('financialDeclaration')}
            className={`px-2 py-1.5 rounded text-[11px] font-medium text-left border transition ${
              data.selectedSubDoc === 'financialDeclaration'
                ? 'bg-emerald-600 border-emerald-500 text-white font-bold shadow-xs'
                : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-700'
            }`}
          >
            2. Financial Decl.
          </button>
          <button
            type="button"
            onClick={() => setSubDoc('khatian')}
            className={`px-2 py-1.5 rounded text-[11px] font-medium text-left border transition ${
              data.selectedSubDoc === 'khatian'
                ? 'bg-emerald-600 border-emerald-500 text-white font-bold shadow-xs'
                : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-700'
            }`}
          >
            3. Khatian
          </button>
          <button
            type="button"
            onClick={() => setSubDoc('nidCard')}
            className={`px-2 py-1.5 rounded text-[11px] font-medium text-left border transition ${
              data.selectedSubDoc === 'nidCard'
                ? 'bg-emerald-600 border-emerald-500 text-white font-bold shadow-xs'
                : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-700'
            }`}
          >
            4. NID Card
          </button>
          <button
            type="button"
            onClick={() => setSubDoc('rentalAgreement')}
            className={`px-2 py-1.5 rounded text-[11px] font-medium text-left border transition ${
              data.selectedSubDoc === 'rentalAgreement'
                ? 'bg-emerald-600 border-emerald-500 text-white font-bold shadow-xs'
                : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-700'
            }`}
          >
            5. Rental Agrmt
          </button>
          <button
            type="button"
            onClick={() => setSubDoc('sponsorDeclaration')}
            className={`px-2 py-1.5 rounded text-[11px] font-medium text-left border transition ${
              data.selectedSubDoc === 'sponsorDeclaration'
                ? 'bg-emerald-600 border-emerald-500 text-white font-bold shadow-xs'
                : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-700'
            }`}
          >
            6. Sponsor Decl.
          </button>
          <button
            type="button"
            onClick={() => setSubDoc('summaryOfDeed')}
            className={`px-2 py-1.5 rounded text-[11px] font-medium text-left border transition ${
              data.selectedSubDoc === 'summaryOfDeed'
                ? 'bg-emerald-600 border-emerald-500 text-white font-bold shadow-xs'
                : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-700'
            }`}
          >
            7. Deed Summary
          </button>
        </div>
      </div>

      <div className="space-y-3 pb-8">
        {/* =========================================================================
            SECTION 1: BIRTH REGISTRATION CERTIFICATE
        ========================================================================= */}
        <details className="group border border-slate-800 rounded-lg bg-slate-800/50 overflow-hidden" open={data.selectedSubDoc === 'birthCertificate' || data.selectedSubDoc === 'all'}>
          <summary className="p-3 bg-slate-800 hover:bg-slate-750 font-bold text-slate-200 cursor-pointer flex justify-between items-center transition">
            <span className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-emerald-900/60 text-emerald-400 text-[10px] flex items-center justify-center font-bold">1</span>
              Birth Registration Certificate (BDR Form-3)
            </span>
            <ChevronDown className="w-4 h-4 text-slate-400 group-open:rotate-180 transition-transform" />
          </summary>
          <div className="p-3 space-y-3 border-t border-slate-800">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Registrar Office</label>
                <input
                  type="text"
                  value={data.birthCertificate.office}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      birthCertificate: { ...prev.birthCertificate, office: e.target.value }
                    }))
                  }
                  className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1.5 text-slate-200"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Birth Reg No (17 Digits)</label>
                <input
                  type="text"
                  value={data.birthCertificate.regNo}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      birthCertificate: { ...prev.birthCertificate, regNo: e.target.value }
                    }))
                  }
                  className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1.5 text-slate-200 font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Reg Date</label>
                <input
                  type="text"
                  value={data.birthCertificate.regDate}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      birthCertificate: { ...prev.birthCertificate, regDate: e.target.value }
                    }))
                  }
                  className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1.5 text-slate-200"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Issue Date</label>
                <input
                  type="text"
                  value={data.birthCertificate.issueDate}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      birthCertificate: { ...prev.birthCertificate, issueDate: e.target.value }
                    }))
                  }
                  className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1.5 text-slate-200"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Date of Birth</label>
                <input
                  type="text"
                  value={data.birthCertificate.dob}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      birthCertificate: { ...prev.birthCertificate, dob: e.target.value }
                    }))
                  }
                  className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1.5 text-slate-200"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Full Name</label>
                <input
                  type="text"
                  value={data.birthCertificate.name}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      birthCertificate: { ...prev.birthCertificate, name: e.target.value }
                    }))
                  }
                  className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1.5 text-slate-200 font-bold"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Sex</label>
                <select
                  value={data.birthCertificate.sex}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      birthCertificate: {
                        ...prev.birthCertificate,
                        sex: e.target.value as 'Male' | 'Female' | 'Other'
                      }
                    }))
                  }
                  className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1.5 text-slate-200"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Father's Name</label>
                <input
                  type="text"
                  value={data.birthCertificate.fatherName}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      birthCertificate: { ...prev.birthCertificate, fatherName: e.target.value }
                    }))
                  }
                  className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1.5 text-slate-200"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Mother's Name</label>
                <input
                  type="text"
                  value={data.birthCertificate.motherName}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      birthCertificate: { ...prev.birthCertificate, motherName: e.target.value }
                    }))
                  }
                  className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1.5 text-slate-200"
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] text-slate-400 block mb-1">Permanent Address</label>
              <input
                type="text"
                value={data.birthCertificate.permAddress}
                onChange={(e) =>
                  onChange((prev) => ({
                    ...prev,
                    birthCertificate: { ...prev.birthCertificate, permAddress: e.target.value }
                  }))
                }
                className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1.5 text-slate-200"
              />
            </div>
          </div>
        </details>

        {/* =========================================================================
            SECTION 2: FINANCIAL DECLARATION & ASSETS AFFIDAVIT
        ========================================================================= */}
        <details className="group border border-slate-800 rounded-lg bg-slate-800/50 overflow-hidden" open={data.selectedSubDoc === 'financialDeclaration'}>
          <summary className="p-3 bg-slate-800 hover:bg-slate-750 font-bold text-slate-200 cursor-pointer flex justify-between items-center transition">
            <span className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-blue-900/60 text-blue-400 text-[10px] flex items-center justify-center font-bold">2</span>
              Financial Declaration (Affidavit & Asset Schedules)
            </span>
            <ChevronDown className="w-4 h-4 text-slate-400 group-open:rotate-180 transition-transform" />
          </summary>
          <div className="p-3 space-y-4 border-t border-slate-800">
            {/* Currency and Exchange Rate */}
            <div className="grid grid-cols-3 gap-2 bg-slate-900/80 p-2.5 rounded border border-slate-700">
              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Currency Code</label>
                <input
                  type="text"
                  value={data.financialDeclaration.currencyCode}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      financialDeclaration: { ...prev.financialDeclaration, currencyCode: e.target.value }
                    }))
                  }
                  className="w-full bg-slate-800 border border-slate-600 rounded px-2 py-1 text-slate-200 uppercase font-bold"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Exchange Rate (BDT/1 Fx)</label>
                <input
                  type="number"
                  step="0.01"
                  value={data.financialDeclaration.exchangeRate}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      financialDeclaration: { ...prev.financialDeclaration, exchangeRate: parseFloat(e.target.value) || 1 }
                    }))
                  }
                  className="w-full bg-slate-800 border border-slate-600 rounded px-2 py-1 text-slate-200 font-bold text-emerald-400"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Student Passport</label>
                <input
                  type="text"
                  value={data.financialDeclaration.studentPassport}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      financialDeclaration: { ...prev.financialDeclaration, studentPassport: e.target.value }
                    }))
                  }
                  className="w-full bg-slate-800 border border-slate-600 rounded px-2 py-1 text-slate-200 uppercase"
                />
              </div>
            </div>

            {/* Land Properties Section */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <span className="font-bold text-[11px] text-slate-300">A. Immovable Land Properties</span>
                <button
                  type="button"
                  onClick={() => {
                    const newLand: LandPropertyItem = {
                      id: `land-${Date.now()}`,
                      description: 'New Land Property, Mouza Chinakandi',
                      mouza: 'Chinakandi',
                      khatianNo: '1452',
                      plotNo: '1690',
                      area: '10.00 Decimals',
                      valueBdt: 5000000
                    };
                    onChange((prev) => ({
                      ...prev,
                      financialDeclaration: {
                        ...prev.financialDeclaration,
                        landProperties: [...prev.financialDeclaration.landProperties, newLand]
                      }
                    }));
                  }}
                  className="flex items-center gap-1 bg-emerald-700 hover:bg-emerald-600 text-white px-2 py-0.5 rounded text-[10px]"
                >
                  <Plus className="w-3 h-3" /> Add Land
                </button>
              </div>
              <div className="space-y-2">
                {data.financialDeclaration.landProperties.map((p, idx) => (
                  <div key={p.id} className="bg-slate-900 border border-slate-700 p-2 rounded relative">
                    <div className="grid grid-cols-2 gap-2 mb-1.5">
                      <input
                        type="text"
                        placeholder="Description"
                        value={p.description}
                        onChange={(e) => {
                          const updated = [...data.financialDeclaration.landProperties];
                          updated[idx].description = e.target.value;
                          onChange((prev) => ({
                            ...prev,
                            financialDeclaration: { ...prev.financialDeclaration, landProperties: updated }
                          }));
                        }}
                        className="bg-slate-800 border border-slate-700 rounded px-2 py-1 text-slate-200"
                      />
                      <input
                        type="number"
                        placeholder="Valuation (BDT)"
                        value={p.valueBdt}
                        onChange={(e) => {
                          const updated = [...data.financialDeclaration.landProperties];
                          updated[idx].valueBdt = parseFloat(e.target.value) || 0;
                          onChange((prev) => ({
                            ...prev,
                            financialDeclaration: { ...prev.financialDeclaration, landProperties: updated }
                          }));
                        }}
                        className="bg-slate-800 border border-slate-700 rounded px-2 py-1 text-emerald-400 font-bold"
                      />
                    </div>
                    <div className="flex justify-between items-center text-[10px] text-slate-400">
                      <span>Plot: {p.plotNo} • Kh: {p.khatianNo} • Area: {p.area}</span>
                      {data.financialDeclaration.landProperties.length > 1 && (
                        <button
                          type="button"
                          onClick={() => {
                            const updated = data.financialDeclaration.landProperties.filter((_, i) => i !== idx);
                            onChange((prev) => ({
                              ...prev,
                              financialDeclaration: { ...prev.financialDeclaration, landProperties: updated }
                            }));
                          }}
                          className="text-red-400 hover:text-red-300"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bank Accounts Section */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <span className="font-bold text-[11px] text-slate-300">B. Liquid Bank Accounts</span>
                <button
                  type="button"
                  onClick={() => {
                    const newBank: BankAccountItem = {
                      id: `bank-${Date.now()}`,
                      bankName: 'Eastern Bank PLC',
                      branch: 'Rajshahi Branch',
                      accountNo: '1081010045999',
                      accountType: 'Savings Account',
                      balanceBdt: 2500000
                    };
                    onChange((prev) => ({
                      ...prev,
                      financialDeclaration: {
                        ...prev.financialDeclaration,
                        bankAccounts: [...prev.financialDeclaration.bankAccounts, newBank]
                      }
                    }));
                  }}
                  className="flex items-center gap-1 bg-emerald-700 hover:bg-emerald-600 text-white px-2 py-0.5 rounded text-[10px]"
                >
                  <Plus className="w-3 h-3" /> Add Bank
                </button>
              </div>
              <div className="space-y-2">
                {data.financialDeclaration.bankAccounts.map((b, idx) => (
                  <div key={b.id} className="bg-slate-900 border border-slate-700 p-2 rounded">
                    <div className="grid grid-cols-2 gap-2 mb-1">
                      <input
                        type="text"
                        placeholder="Bank Name"
                        value={b.bankName}
                        onChange={(e) => {
                          const updated = [...data.financialDeclaration.bankAccounts];
                          updated[idx].bankName = e.target.value;
                          onChange((prev) => ({
                            ...prev,
                            financialDeclaration: { ...prev.financialDeclaration, bankAccounts: updated }
                          }));
                        }}
                        className="bg-slate-800 border border-slate-700 rounded px-2 py-1 text-slate-200"
                      />
                      <input
                        type="number"
                        placeholder="Balance (BDT)"
                        value={b.balanceBdt}
                        onChange={(e) => {
                          const updated = [...data.financialDeclaration.bankAccounts];
                          updated[idx].balanceBdt = parseFloat(e.target.value) || 0;
                          onChange((prev) => ({
                            ...prev,
                            financialDeclaration: { ...prev.financialDeclaration, bankAccounts: updated }
                          }));
                        }}
                        className="bg-slate-800 border border-slate-700 rounded px-2 py-1 text-emerald-400 font-bold"
                      />
                    </div>
                    <div className="flex justify-between items-center text-[10px] text-slate-400">
                      <span>A/C: {b.accountNo} ({b.accountType})</span>
                      {data.financialDeclaration.bankAccounts.length > 1 && (
                        <button
                          type="button"
                          onClick={() => {
                            const updated = data.financialDeclaration.bankAccounts.filter((_, i) => i !== idx);
                            onChange((prev) => ({
                              ...prev,
                              financialDeclaration: { ...prev.financialDeclaration, bankAccounts: updated }
                            }));
                          }}
                          className="text-red-400 hover:text-red-300"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </details>

        {/* =========================================================================
            SECTION 3: KHATIAN (B.S. RECORD OF RIGHTS)
        ========================================================================= */}
        <details className="group border border-slate-800 rounded-lg bg-slate-800/50 overflow-hidden" open={data.selectedSubDoc === 'khatian'}>
          <summary className="p-3 bg-slate-800 hover:bg-slate-750 font-bold text-slate-200 cursor-pointer flex justify-between items-center transition">
            <span className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-amber-900/60 text-amber-400 text-[10px] flex items-center justify-center font-bold">3</span>
              Khatian (B.S. Land Records & Plots)
            </span>
            <ChevronDown className="w-4 h-4 text-slate-400 group-open:rotate-180 transition-transform" />
          </summary>
          <div className="p-3 space-y-3 border-t border-slate-800">
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Khatian No</label>
                <input
                  type="text"
                  value={data.khatian.khatianNo}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      khatian: { ...prev.khatian, khatianNo: e.target.value }
                    }))
                  }
                  className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-slate-200 font-bold"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Mouza & JL</label>
                <input
                  type="text"
                  value={`${data.khatian.mouza}, JL ${data.khatian.jlNo}`}
                  onChange={(e) => {
                    const [m, jl] = e.target.value.split(',');
                    onChange((prev) => ({
                      ...prev,
                      khatian: {
                        ...prev.khatian,
                        mouza: m ? m.trim() : prev.khatian.mouza,
                        jlNo: jl ? jl.replace(/[^0-9]/g, '') : prev.khatian.jlNo
                      }
                    }));
                  }}
                  className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-slate-200"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Thana & Dist</label>
                <input
                  type="text"
                  value={`${data.khatian.thana}, ${data.khatian.district}`}
                  onChange={(e) => {
                    const [t, d] = e.target.value.split(',');
                    onChange((prev) => ({
                      ...prev,
                      khatian: {
                        ...prev.khatian,
                        thana: t ? t.trim() : prev.khatian.thana,
                        district: d ? d.trim() : prev.khatian.district
                      }
                    }));
                  }}
                  className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-slate-200"
                />
              </div>
            </div>

            {/* Plots Table List */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <span className="font-bold text-[11px] text-slate-300">Plots (দাগ ও শ্রেণী)</span>
                <button
                  type="button"
                  onClick={() => {
                    const newPlot: KhatianPlot = {
                      id: `kp-${Date.now()}`,
                      plotNo: '1850',
                      classOfLand: 'Nali (Agricultural)',
                      totalLandAcre: 0,
                      totalLandDecimal: 15.00,
                      share: '0.625',
                      propLandAcre: 0,
                      propLandDecimal: 9.375
                    };
                    onChange((prev) => ({
                      ...prev,
                      khatian: { ...prev.khatian, plots: [...prev.khatian.plots, newPlot] }
                    }));
                  }}
                  className="flex items-center gap-1 bg-emerald-700 hover:bg-emerald-600 text-white px-2 py-0.5 rounded text-[10px]"
                >
                  <Plus className="w-3 h-3" /> Add Plot
                </button>
              </div>
              <div className="space-y-1.5">
                {data.khatian.plots.map((plot, idx) => (
                  <div key={plot.id} className="bg-slate-900 border border-slate-700 p-2 rounded flex justify-between items-center text-[11px]">
                    <div>
                      <span className="font-bold text-white">Plot {plot.plotNo}</span> ({plot.classOfLand})
                      <div className="text-[10px] text-slate-400">
                        Total: {plot.totalLandDecimal} Dec • Prop: <strong className="text-emerald-400">{plot.propLandDecimal} Dec</strong>
                      </div>
                    </div>
                    {data.khatian.plots.length > 1 && (
                      <button
                        type="button"
                        onClick={() => {
                          const updated = data.khatian.plots.filter((_, i) => i !== idx);
                          onChange((prev) => ({
                            ...prev,
                            khatian: { ...prev.khatian, plots: updated }
                          }));
                        }}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </details>

        {/* =========================================================================
            SECTION 4: NATIONAL ID CARD (NID)
        ========================================================================= */}
        <details className="group border border-slate-800 rounded-lg bg-slate-800/50 overflow-hidden" open={data.selectedSubDoc === 'nidCard'}>
          <summary className="p-3 bg-slate-800 hover:bg-slate-750 font-bold text-slate-200 cursor-pointer flex justify-between items-center transition">
            <span className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-purple-900/60 text-purple-400 text-[10px] flex items-center justify-center font-bold">4</span>
              National ID Card (Translated English Copy)
            </span>
            <ChevronDown className="w-4 h-4 text-slate-400 group-open:rotate-180 transition-transform" />
          </summary>
          <div className="p-3 space-y-3 border-t border-slate-800">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[10px] text-slate-400 block mb-1">NID Number (10/17 Digits)</label>
                <input
                  type="text"
                  value={data.nidCard.nidNo}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      nidCard: { ...prev.nidCard, nidNo: e.target.value }
                    }))
                  }
                  className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-slate-200 font-mono font-bold"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Blood Group</label>
                <input
                  type="text"
                  value={data.nidCard.bloodGroup}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      nidCard: { ...prev.nidCard, bloodGroup: e.target.value }
                    }))
                  }
                  className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-red-400 font-bold"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Date of Birth</label>
                <input
                  type="text"
                  value={data.nidCard.dob}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      nidCard: { ...prev.nidCard, dob: e.target.value }
                    }))
                  }
                  className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-slate-200"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Place of Birth</label>
                <input
                  type="text"
                  value={data.nidCard.placeOfBirth}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      nidCard: { ...prev.nidCard, placeOfBirth: e.target.value }
                    }))
                  }
                  className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-slate-200"
                />
              </div>
            </div>

            {/* Photo Upload */}
            <div className="bg-slate-900 border border-slate-700 p-2.5 rounded flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-200 block">NID Cardholder Photo</span>
                <span className="text-[10px] text-slate-400">Upload portrait photo or avatar</span>
              </div>
              <input
                ref={nidPhotoInputRef}
                type="file"
                accept="image/*"
                onChange={handleNidPhotoUpload}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => nidPhotoInputRef.current?.click()}
                className="flex items-center gap-1 bg-slate-800 hover:bg-slate-700 border border-slate-600 px-2.5 py-1 rounded text-slate-200 text-[10px]"
              >
                <Upload className="w-3 h-3" /> Upload Photo
              </button>
            </div>
          </div>
        </details>

        {/* =========================================================================
            SECTION 5: RENTAL AGREEMENT (BILINGUAL)
        ========================================================================= */}
        <details className="group border border-slate-800 rounded-lg bg-slate-800/50 overflow-hidden" open={data.selectedSubDoc === 'rentalAgreement'}>
          <summary className="p-3 bg-slate-800 hover:bg-slate-750 font-bold text-slate-200 cursor-pointer flex justify-between items-center transition">
            <span className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-teal-900/60 text-teal-400 text-[10px] flex items-center justify-center font-bold">5</span>
              Rental Agreement (Bilingual English & Bangla)
            </span>
            <ChevronDown className="w-4 h-4 text-slate-400 group-open:rotate-180 transition-transform" />
          </summary>
          <div className="p-3 space-y-3 border-t border-slate-800">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Monthly Rent (BDT)</label>
                <input
                  type="number"
                  value={data.rentalAgreement.monthlyRentBdt}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      rentalAgreement: { ...prev.rentalAgreement, monthlyRentBdt: parseFloat(e.target.value) || 0 }
                    }))
                  }
                  className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-emerald-400 font-bold"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Security Deposit (BDT)</label>
                <input
                  type="number"
                  value={data.rentalAgreement.securityDepositBdt}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      rentalAgreement: { ...prev.rentalAgreement, securityDepositBdt: parseFloat(e.target.value) || 0 }
                    }))
                  }
                  className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-emerald-400 font-bold"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Landlord Name</label>
                <input
                  type="text"
                  value={data.rentalAgreement.landlordName}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      rentalAgreement: { ...prev.rentalAgreement, landlordName: e.target.value }
                    }))
                  }
                  className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-slate-200"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Tenant Name</label>
                <input
                  type="text"
                  value={data.rentalAgreement.tenantName}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      rentalAgreement: { ...prev.rentalAgreement, tenantName: e.target.value }
                    }))
                  }
                  className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-slate-200"
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] text-slate-400 block mb-1">Premises Address</label>
              <input
                type="text"
                value={data.rentalAgreement.premisesAddress}
                onChange={(e) =>
                  onChange((prev) => ({
                    ...prev,
                    rentalAgreement: { ...prev.rentalAgreement, premisesAddress: e.target.value }
                  }))
                }
                className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-slate-200"
              />
            </div>
          </div>
        </details>

        {/* =========================================================================
            SECTION 6: SPONSOR DECLARATION
        ========================================================================= */}
        <details className="group border border-slate-800 rounded-lg bg-slate-800/50 overflow-hidden" open={data.selectedSubDoc === 'sponsorDeclaration'}>
          <summary className="p-3 bg-slate-800 hover:bg-slate-750 font-bold text-slate-200 cursor-pointer flex justify-between items-center transition">
            <span className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-indigo-900/60 text-indigo-400 text-[10px] flex items-center justify-center font-bold">6</span>
              Sponsor Declaration & University Sponsorship
            </span>
            <ChevronDown className="w-4 h-4 text-slate-400 group-open:rotate-180 transition-transform" />
          </summary>
          <div className="p-3 space-y-3 border-t border-slate-800">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[10px] text-slate-400 block mb-1">University / College</label>
                <input
                  type="text"
                  value={data.sponsorDeclaration.university}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      sponsorDeclaration: { ...prev.sponsorDeclaration, university: e.target.value }
                    }))
                  }
                  className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-slate-200"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Degree / Course</label>
                <input
                  type="text"
                  value={data.sponsorDeclaration.course}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      sponsorDeclaration: { ...prev.sponsorDeclaration, course: e.target.value }
                    }))
                  }
                  className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-slate-200"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Sponsor Relationship</label>
                <input
                  type="text"
                  value={data.sponsorDeclaration.sponsorRelation}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      sponsorDeclaration: { ...prev.sponsorDeclaration, sponsorRelation: e.target.value }
                    }))
                  }
                  className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-slate-200"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Target Country</label>
                <input
                  type="text"
                  value={data.sponsorDeclaration.country}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      sponsorDeclaration: { ...prev.sponsorDeclaration, country: e.target.value }
                    }))
                  }
                  className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-slate-200"
                />
              </div>
            </div>
          </div>
        </details>

        {/* =========================================================================
            SECTION 7: SUMMARY OF DEED (SAF-KABALA DEED)
        ========================================================================= */}
        <details className="group border border-slate-800 rounded-lg bg-slate-800/50 overflow-hidden" open={data.selectedSubDoc === 'summaryOfDeed'}>
          <summary className="p-3 bg-slate-800 hover:bg-slate-750 font-bold text-slate-200 cursor-pointer flex justify-between items-center transition">
            <span className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-rose-900/60 text-rose-400 text-[10px] flex items-center justify-center font-bold">7</span>
              Summary of Deed (Registered Saf-Kabala Sale Deed)
            </span>
            <ChevronDown className="w-4 h-4 text-slate-400 group-open:rotate-180 transition-transform" />
          </summary>
          <div className="p-3 space-y-3 border-t border-slate-800">
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Deed No & Year</label>
                <input
                  type="text"
                  value={`${data.summaryOfDeed.deedNo} / ${data.summaryOfDeed.year}`}
                  onChange={(e) => {
                    const [d, y] = e.target.value.split('/');
                    onChange((prev) => ({
                      ...prev,
                      summaryOfDeed: {
                        ...prev.summaryOfDeed,
                        deedNo: d ? d.trim() : prev.summaryOfDeed.deedNo,
                        year: y ? y.trim() : prev.summaryOfDeed.year
                      }
                    }));
                  }}
                  className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-slate-200 font-bold"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Sub-Registry Office</label>
                <input
                  type="text"
                  value={data.summaryOfDeed.subRegistryOffice}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      summaryOfDeed: { ...prev.summaryOfDeed, subRegistryOffice: e.target.value }
                    }))
                  }
                  className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-slate-200"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Consideration (BDT)</label>
                <input
                  type="number"
                  value={data.summaryOfDeed.totalConsiderationBdt}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      summaryOfDeed: { ...prev.summaryOfDeed, totalConsiderationBdt: parseFloat(e.target.value) || 0 }
                    }))
                  }
                  className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-emerald-400 font-bold"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Vendor (Seller)</label>
                <input
                  type="text"
                  value={data.summaryOfDeed.vendorName}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      summaryOfDeed: { ...prev.summaryOfDeed, vendorName: e.target.value }
                    }))
                  }
                  className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-slate-200"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Vendee (Buyer)</label>
                <input
                  type="text"
                  value={data.summaryOfDeed.vendeeName}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      summaryOfDeed: { ...prev.summaryOfDeed, vendeeName: e.target.value }
                    }))
                  }
                  className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-slate-200 font-bold"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Plot & Khatian</label>
                <input
                  type="text"
                  value={`Plot ${data.summaryOfDeed.plotBs}, Kh ${data.summaryOfDeed.khatianBs}`}
                  onChange={(e) => {
                    const parts = e.target.value.match(/Plot\s*(\S+),\s*Kh\s*(\S+)/i);
                    if (parts) {
                      onChange((prev) => ({
                        ...prev,
                        summaryOfDeed: {
                          ...prev.summaryOfDeed,
                          plotBs: parts[1],
                          khatianBs: parts[2]
                        }
                      }));
                    }
                  }}
                  className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-slate-200"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Transferred Area</label>
                <input
                  type="text"
                  value={data.summaryOfDeed.transferredArea}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      summaryOfDeed: { ...prev.summaryOfDeed, transferredArea: e.target.value }
                    }))
                  }
                  className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-slate-200"
                />
              </div>
            </div>
          </div>
        </details>
      </div>
    </div>
  );
};
