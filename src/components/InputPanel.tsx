import React, { useState } from 'react';
import {
  DocumentState,
  Director,
  Subscriber,
  Signatory
} from '../types/company';
import {
  Building2,
  Users,
  FileSpreadsheet,
  FileCheck2,
  Coins,
  Plus,
  Trash2,
  Upload,
  PenTool,
  Copy,
  ChevronDown,
  ChevronUp,
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { AVATAR_SVGS } from '../data/defaultData';

interface InputPanelProps {
  data: DocumentState;
  onChange: (newData: DocumentState) => void;
  onOpenSignatureModal: (targetType: 'director' | 'subscriber' | 'signatory', id: string, name: string) => void;
}

export const InputPanel: React.FC<InputPanelProps> = ({
  data,
  onChange,
  onOpenSignatureModal
}) => {
  const [activeTab, setActiveTab] = useState<'general' | 'directors' | 'subscribers' | 'witnesses' | 'capital'>('general');
  const [expandedSubIndex, setExpandedSubIndex] = useState<number | null>(0);

  // Update general company info
  const handleCompanyChange = (field: keyof typeof data.company, value: any) => {
    onChange({
      ...data,
      company: {
        ...data.company,
        [field]: value
      }
    });
  };

  // Toggle included sections
  const handleSectionToggle = (section: keyof typeof data.includedSections) => {
    onChange({
      ...data,
      includedSections: {
        ...data.includedSections,
        [section]: !data.includedSections[section]
      }
    });
  };

  // Director operations
  const addDirector = () => {
    const newDir: Director = {
      id: `dir-${Date.now()}`,
      name: '',
      address: '',
      description: 'Business',
      signatureText: ''
    };
    onChange({
      ...data,
      directors: [...data.directors, newDir]
    });
  };

  const updateDirector = (index: number, field: keyof Director, value: string) => {
    const updated = [...data.directors];
    updated[index] = { ...updated[index], [field]: value };
    onChange({
      ...data,
      directors: updated
    });
  };

  const removeDirector = (index: number) => {
    const updated = data.directors.filter((_, i) => i !== index);
    onChange({
      ...data,
      directors: updated
    });
  };

  // Subscriber operations
  const addSubscriber = () => {
    const newSub: Subscriber = {
      id: `sub-${Date.now()}`,
      name: '',
      role: 'Director',
      address: '',
      father: '',
      mother: '',
      dob: '',
      email: '',
      phone: '',
      tin: '',
      nationality: 'Bangladeshi',
      nid: '',
      shares: 1000000,
      avatarStyle: 'man1',
      signatureText: ''
    };
    onChange({
      ...data,
      subscribers: [...data.subscribers, newSub]
    });
    setExpandedSubIndex(data.subscribers.length);
  };

  const updateSubscriber = (index: number, field: keyof Subscriber, value: any) => {
    const updated = [...data.subscribers];
    updated[index] = { ...updated[index], [field]: value };
    onChange({
      ...data,
      subscribers: updated
    });
  };

  const removeSubscriber = (index: number) => {
    const updated = data.subscribers.filter((_, i) => i !== index);
    onChange({
      ...data,
      subscribers: updated
    });
  };

  const duplicateSubscriber = (index: number) => {
    const original = data.subscribers[index];
    const copy: Subscriber = {
      ...original,
      id: `sub-${Date.now()}`,
      name: original.name
    };
    onChange({
      ...data,
      subscribers: [...data.subscribers, copy]
    });
  };

  // Sync subscribers to directors
  const copySubscribersToDirectors = () => {
    const newDirectors: Director[] = data.subscribers.map((sub, i) => ({
      id: `dir-sync-${i}-${Date.now()}`,
      name: sub.name,
      address: sub.address,
      description: 'Business',
      signatureText: sub.signatureText || sub.name
    }));
    onChange({
      ...data,
      directors: newDirectors
    });
  };

  // Signatory operations
  const updateSignatory = (index: 0 | 1, field: keyof Signatory, value: string) => {
    const updated: [Signatory, Signatory] = [
      { ...data.signatories[0] },
      { ...data.signatories[1] }
    ];
    updated[index] = { ...updated[index], [field]: value };
    onChange({
      ...data,
      signatories: updated
    });
  };

  // Photo upload handler
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>, subIndex: number) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (loadEvt) => {
        if (loadEvt.target?.result) {
          updateSubscriber(subIndex, 'photoUrl', loadEvt.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-full h-full flex flex-col bg-slate-50 border-r border-slate-200 text-slate-800">
      {/* Tab Navigation */}
      <div className="flex border-b border-slate-200 bg-white overflow-x-auto shrink-0 shadow-xs">
        <button
          type="button"
          onClick={() => setActiveTab('general')}
          className={`px-4 py-3 text-xs font-semibold flex items-center gap-2 border-b-2 whitespace-nowrap transition ${
            activeTab === 'general'
              ? 'border-blue-600 text-blue-700 bg-blue-50/50'
              : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <Building2 className="w-4 h-4" />
          General &amp; Forms
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('directors')}
          className={`px-4 py-3 text-xs font-semibold flex items-center gap-2 border-b-2 whitespace-nowrap transition ${
            activeTab === 'directors'
              ? 'border-blue-600 text-blue-700 bg-blue-50/50'
              : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <Users className="w-4 h-4" />
          Form IX Directors ({data.directors.length})
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('subscribers')}
          className={`px-4 py-3 text-xs font-semibold flex items-center gap-2 border-b-2 whitespace-nowrap transition ${
            activeTab === 'subscribers'
              ? 'border-blue-600 text-blue-700 bg-blue-50/50'
              : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <FileSpreadsheet className="w-4 h-4" />
          MoA Subscribers ({data.subscribers.length})
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('witnesses')}
          className={`px-4 py-3 text-xs font-semibold flex items-center gap-2 border-b-2 whitespace-nowrap transition ${
            activeTab === 'witnesses'
              ? 'border-blue-600 text-blue-700 bg-blue-50/50'
              : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <FileCheck2 className="w-4 h-4" />
          Witnesses (2)
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('capital')}
          className={`px-4 py-3 text-xs font-semibold flex items-center gap-2 border-b-2 whitespace-nowrap transition ${
            activeTab === 'capital'
              ? 'border-blue-600 text-blue-700 bg-blue-50/50'
              : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <Coins className="w-4 h-4" />
          Capital &amp; Units
        </button>
      </div>

      {/* Tab Panels Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* TAB 1: General & Presenter */}
        {activeTab === 'general' && (
          <div className="space-y-5">
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-3">
              <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-blue-600" />
                Proposed Company Identity
              </h3>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Company Name (as per Name Clearance)
                </label>
                <input
                  type="text"
                  value={data.company.companyName}
                  onChange={(e) => handleCompanyChange('companyName', e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="e.g. The Royal Nirman Ltd"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Filing Date</label>
                  <input
                    type="text"
                    value={data.company.date}
                    onChange={(e) => handleCompanyChange('date', e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="e.g. 25- Oct- 26"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Form IX Filing Fee</label>
                  <input
                    type="text"
                    value={data.company.filingFee}
                    onChange={(e) => handleCompanyChange('filingFee', e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="e.g. Tk. 200/-"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Registered Office Region</label>
                <input
                  type="text"
                  value={data.company.regOfficeLocation || 'Dhaka, Bangladesh'}
                  onChange={(e) => handleCompanyChange('regOfficeLocation', e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Dhaka, Bangladesh"
                />
              </div>
            </div>

            {/* Presenter Information */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-3">
              <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
                Presenter / Declarant (Form I &amp; Verification)
              </h3>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Presenter Full Name</label>
                  <input
                    type="text"
                    value={data.company.presenterName}
                    onChange={(e) => handleCompanyChange('presenterName', e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="e.g. Md. Abdul Hye"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Designation</label>
                  <input
                    type="text"
                    value={data.company.presenterDesignation}
                    onChange={(e) => handleCompanyChange('presenterDesignation', e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="e.g. Managing Director"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Presenter Full Address</label>
                <textarea
                  rows={2}
                  value={data.company.presenterAddress}
                  onChange={(e) => handleCompanyChange('presenterAddress', e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="House, Road, Area, Dhaka Post Code..."
                />
              </div>
            </div>

            {/* Page Inclusions */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-3">
              <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
                Included Document Pages
              </h3>
              <p className="text-xs text-slate-500">Toggle which statutory sheets appear in preview and export:</p>
              
              <div className="grid grid-cols-2 gap-2 text-xs">
                <label className="flex items-center gap-2 p-2 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50">
                  <input
                    type="checkbox"
                    checked={data.includedSections.cover}
                    onChange={() => handleSectionToggle('cover')}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>Cover / MD Confirmation</span>
                </label>

                <label className="flex items-center gap-2 p-2 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50">
                  <input
                    type="checkbox"
                    checked={data.includedSections.formI}
                    onChange={() => handleSectionToggle('formI')}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>Form I (Declaration Sec. 25)</span>
                </label>

                <label className="flex items-center gap-2 p-2 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50">
                  <input
                    type="checkbox"
                    checked={data.includedSections.formIX}
                    onChange={() => handleSectionToggle('formIX')}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>Form IX (Consent Sec. 92)</span>
                </label>

                <label className="flex items-center gap-2 p-2 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50">
                  <input
                    type="checkbox"
                    checked={data.includedSections.moa}
                    onChange={() => handleSectionToggle('moa')}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>MoA &amp; AoA Subscribers</span>
                </label>

                <label className="flex items-center gap-2 p-2 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50">
                  <input
                    type="checkbox"
                    checked={data.includedSections.signatories}
                    onChange={() => handleSectionToggle('signatories')}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>Attesting Witnesses</span>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Form IX Directors */}
        {activeTab === 'directors' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center bg-blue-50 p-3 rounded-lg border border-blue-200">
              <span className="text-xs text-blue-800 font-medium">
                Directors listed in Form IX (Consent to Act).
              </span>
              <button
                type="button"
                onClick={copySubscribersToDirectors}
                className="text-xs bg-white text-blue-700 px-3 py-1.5 rounded border border-blue-300 font-semibold hover:bg-blue-100 flex items-center gap-1.5 transition"
                title="Populate directors from unique subscribers"
              >
                <Copy className="w-3.5 h-3.5" />
                Import from MoA Subscribers
              </button>
            </div>

            {data.directors.map((dir, idx) => (
              <div key={dir.id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-3">
                <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                  <span className="text-xs font-bold text-slate-700 uppercase">
                    Director #{idx + 1}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onOpenSignatureModal('director', dir.id, dir.name)}
                      className="text-xs text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1 hover:underline"
                      aria-label={`Digital signature for director ${dir.name || idx + 1}`}
                    >
                      <PenTool className="w-3.5 h-3.5" />
                      Sign
                    </button>
                    <button
                      type="button"
                      onClick={() => removeDirector(idx)}
                      className="text-slate-400 hover:text-red-600 transition"
                      aria-label="Remove director"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div className="col-span-2">
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Full Name</label>
                    <input
                      type="text"
                      value={dir.name}
                      onChange={(e) => updateDirector(idx, 'name', e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      placeholder="e.g. Sultana Rahman"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Description</label>
                    <input
                      type="text"
                      value={dir.description}
                      onChange={(e) => updateDirector(idx, 'description', e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      placeholder="Business"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">Full Residential Address</label>
                  <textarea
                    rows={2}
                    value={dir.address}
                    onChange={(e) => updateDirector(idx, 'address', e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="House, Road, West Dhanmondi, Dhaka..."
                  />
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={addDirector}
              className="w-full py-2.5 border-2 border-dashed border-blue-400 bg-blue-50/50 hover:bg-blue-50 text-blue-700 font-semibold text-xs rounded-xl flex items-center justify-center gap-1.5 transition"
            >
              <Plus className="w-4 h-4" />
              Add Another Director
            </button>
          </div>
        )}

        {/* TAB 3: MoA Subscribers */}
        {activeTab === 'subscribers' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center text-xs text-slate-600 px-1">
              <span>Total Subscribers: <strong>{data.subscribers.length}</strong></span>
              <button
                type="button"
                onClick={addSubscriber}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Subscriber
              </button>
            </div>

            {data.subscribers.map((sub, idx) => {
              const isExpanded = expandedSubIndex === idx;

              return (
                <div
                  key={sub.id}
                  className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden transition"
                >
                  {/* Collapsible Header */}
                  <div
                    className="p-3 bg-slate-50 flex items-center justify-between cursor-pointer hover:bg-slate-100/80 transition"
                    onClick={() => setExpandedSubIndex(isExpanded ? null : idx)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
                        {idx + 1}
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">
                          {sub.name || `Subscriber #${idx + 1}`}
                        </h4>
                        <p className="text-[11px] text-slate-500">
                          {sub.role} &bull; {sub.shares.toLocaleString()} shares
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                      <button
                        type="button"
                        onClick={() => onOpenSignatureModal('subscriber', sub.id, sub.name)}
                        className="px-2 py-1 text-[11px] bg-white border border-slate-300 rounded font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300 flex items-center gap-1"
                        title="Digital Signature"
                        aria-label={`Digital signature for subscriber ${sub.name || idx + 1}`}
                      >
                        <PenTool className="w-3 h-3 text-blue-600" />
                        Signature
                      </button>
                      <button
                        type="button"
                        onClick={() => duplicateSubscriber(idx)}
                        className="p-1 text-slate-400 hover:text-slate-700"
                        title="Duplicate subscriber"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => removeSubscriber(idx)}
                        className="p-1 text-slate-400 hover:text-red-600"
                        title="Delete subscriber"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-slate-400" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-400" />
                      )}
                    </div>
                  </div>

                  {/* Expanded Body */}
                  {isExpanded && (
                    <div className="p-4 space-y-3 border-t border-slate-200">
                      {/* Name & Role */}
                      <div className="grid grid-cols-3 gap-2">
                        <div className="col-span-2">
                          <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">
                            Full Name
                          </label>
                          <input
                            type="text"
                            value={sub.name}
                            onChange={(e) => updateSubscriber(idx, 'name', e.target.value)}
                            className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            placeholder="e.g. Sultana Rahman"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">
                            Corporate Role
                          </label>
                          <select
                            value={sub.role}
                            onChange={(e) => updateSubscriber(idx, 'role', e.target.value)}
                            className="w-full px-2 py-1.5 text-xs border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
                          >
                            <option value="Chairman">Chairman</option>
                            <option value="Managing Director">Managing Director</option>
                            <option value="Director">Director</option>
                            <option value="Subscriber">Subscriber</option>
                            <option value="Shareholder">Shareholder</option>
                          </select>
                        </div>
                      </div>

                      {/* Shares & Nationality */}
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">
                            Shares Subscribed
                          </label>
                          <input
                            type="number"
                            value={sub.shares}
                            onChange={(e) => updateSubscriber(idx, 'shares', parseInt(e.target.value) || 0)}
                            className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none font-semibold text-blue-900"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">
                            Nationality
                          </label>
                          <input
                            type="text"
                            value={sub.nationality}
                            onChange={(e) => updateSubscriber(idx, 'nationality', e.target.value)}
                            className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            placeholder="Bangladeshi"
                          />
                        </div>
                      </div>

                      {/* Parents */}
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">
                            Father's Name
                          </label>
                          <input
                            type="text"
                            value={sub.father}
                            onChange={(e) => updateSubscriber(idx, 'father', e.target.value)}
                            className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">
                            Mother's Name
                          </label>
                          <input
                            type="text"
                            value={sub.mother}
                            onChange={(e) => updateSubscriber(idx, 'mother', e.target.value)}
                            className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                          />
                        </div>
                      </div>

                      {/* DOB, Email, Phone */}
                      <div className="grid grid-cols-3 gap-2">
                        <div>
                          <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">
                            Date of Birth
                          </label>
                          <input
                            type="text"
                            value={sub.dob}
                            onChange={(e) => updateSubscriber(idx, 'dob', e.target.value)}
                            className="w-full px-2 py-1.5 text-xs border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            placeholder="DD-Mon-YY"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">
                            Email
                          </label>
                          <input
                            type="text"
                            value={sub.email}
                            onChange={(e) => updateSubscriber(idx, 'email', e.target.value)}
                            className="w-full px-2 py-1.5 text-xs border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            placeholder="0 or email"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">
                            Phone
                          </label>
                          <input
                            type="text"
                            value={sub.phone}
                            onChange={(e) => updateSubscriber(idx, 'phone', e.target.value)}
                            className="w-full px-2 py-1.5 text-xs border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            placeholder="017..."
                          />
                        </div>
                      </div>

                      {/* TIN & NID */}
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">
                            TIN Number (12 digit e-TIN)
                          </label>
                          <input
                            type="text"
                            value={sub.tin}
                            onChange={(e) => updateSubscriber(idx, 'tin', e.target.value)}
                            className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none font-mono"
                            placeholder="12 digit TIN"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">
                            National ID (10, 13 or 17 digit)
                          </label>
                          <input
                            type="text"
                            value={sub.nid}
                            onChange={(e) => updateSubscriber(idx, 'nid', e.target.value)}
                            className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none font-mono"
                            placeholder="NID"
                          />
                        </div>
                      </div>

                      {/* Address */}
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">
                          Registered Residential Address
                        </label>
                        <textarea
                          rows={2}
                          value={sub.address}
                          onChange={(e) => updateSubscriber(idx, 'address', e.target.value)}
                          className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                      </div>

                      {/* Photo & Avatar Selector */}
                      <div className="pt-2 border-t border-slate-200">
                        <label className="block text-[11px] font-semibold text-slate-700 mb-1.5">
                          Passport Photograph
                        </label>
                        <div className="flex items-center gap-3">
                          {/* Photo preview */}
                          <div className="w-12 h-14 border border-slate-300 rounded bg-slate-100 overflow-hidden flex items-center justify-center shrink-0">
                            {sub.photoUrl ? (
                              <img src={sub.photoUrl} alt="Preview" className="w-full h-full object-cover" />
                            ) : (
                              <img
                                src={AVATAR_SVGS[sub.avatarStyle || 'man1']}
                                alt="Preset"
                                className="w-full h-full object-contain"
                              />
                            )}
                          </div>

                          <div className="flex-1 space-y-1.5">
                            {/* Preset options */}
                            <div className="flex items-center gap-1 text-[11px]">
                              <span className="text-slate-500">Avatar:</span>
                              {(['woman1', 'woman2', 'man1', 'man2', 'man3'] as const).map((style) => (
                                <button
                                  key={style}
                                  type="button"
                                  onClick={() => {
                                    updateSubscriber(idx, 'photoUrl', undefined);
                                    updateSubscriber(idx, 'avatarStyle', style);
                                  }}
                                  className={`px-1.5 py-0.5 rounded border text-[10px] ${
                                    sub.avatarStyle === style && !sub.photoUrl
                                      ? 'bg-blue-600 text-white border-blue-600 font-bold'
                                      : 'border-slate-300 text-slate-700 hover:bg-slate-50'
                                  }`}
                                >
                                  {style}
                                </button>
                              ))}
                            </div>

                            {/* Custom File Upload */}
                            <label className="inline-flex items-center gap-1.5 text-[11px] text-blue-600 hover:text-blue-800 font-medium cursor-pointer">
                              <Upload className="w-3.5 h-3.5" />
                              <span>Upload custom photo</span>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handlePhotoUpload(e, idx)}
                                className="hidden"
                              />
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            <button
              type="button"
              onClick={addSubscriber}
              className="w-full py-2.5 border-2 border-dashed border-blue-400 bg-blue-50/50 hover:bg-blue-50 text-blue-700 font-semibold text-xs rounded-xl flex items-center justify-center gap-1.5 transition"
            >
              <Plus className="w-4 h-4" />
              Add Another Subscriber
            </button>
          </div>
        )}

        {/* TAB 4: Witnesses */}
        {activeTab === 'witnesses' && (
          <div className="space-y-4">
            <p className="text-xs text-slate-500 bg-amber-50 p-3 rounded-lg border border-amber-200 text-amber-800">
              The Companies Act, 1994 requires that subscriber signatures be attested by at least two witnesses
              (commonly advocates, chartered accountants, or responsible citizens).
            </p>

            {([0, 1] as const).map((idx) => (
              <div key={idx} className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-3">
                <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                  <h4 className="text-xs font-bold text-slate-800 uppercase">
                    Witness / Attester {idx + 1}
                  </h4>
                  <button
                    type="button"
                    onClick={() =>
                      onOpenSignatureModal('signatory', data.signatories[idx].id, data.signatories[idx].name)
                    }
                    className="text-xs text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
                  >
                    <PenTool className="w-3.5 h-3.5" />
                    Sign
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">Full Name</label>
                    <input
                      type="text"
                      value={data.signatories[idx].name}
                      onChange={(e) => updateSignatory(idx, 'name', e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      placeholder="e.g. Minhazul Islam"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">Phone Number</label>
                    <input
                      type="text"
                      value={data.signatories[idx].phone}
                      onChange={(e) => updateSignatory(idx, 'phone', e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      placeholder="+8801855628384"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">National ID (NID)</label>
                  <input
                    type="text"
                    value={data.signatories[idx].nid}
                    onChange={(e) => updateSignatory(idx, 'nid', e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none font-mono"
                    placeholder="5106944878"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">Office / Residence Address</label>
                  <textarea
                    rows={2}
                    value={data.signatories[idx].address}
                    onChange={(e) => updateSignatory(idx, 'address', e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="G-5, bti Centara Grand, 144 Green Road, Dhaka..."
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 5: Capital & Currency */}
        {activeTab === 'capital' && (
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-4">
              <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
                <Coins className="w-4 h-4 text-emerald-600" />
                Capital &amp; Shareholding Architecture
              </h3>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Face Value per Share (BDT)
                  </label>
                  <div className="flex items-center">
                    <span className="px-3 py-2 bg-slate-100 border border-r-0 border-slate-300 rounded-l-lg text-xs font-bold text-slate-600">
                      Tk.
                    </span>
                    <input
                      type="number"
                      value={data.company.faceValuePerShare}
                      onChange={(e) => handleCompanyChange('faceValuePerShare', parseInt(e.target.value) || 10)}
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-r-lg focus:ring-2 focus:ring-blue-500 focus:outline-none font-semibold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Numbering System in Legal Text
                  </label>
                  <select
                    value={data.company.numberingSystem}
                    onChange={(e) => handleCompanyChange('numberingSystem', e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white font-medium"
                  >
                    <option value="international">Western Standard (Million / Billion)</option>
                    <option value="southAsian">South Asian / Bangladeshi (Crore / Lakh)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nominal Authorized Capital (BDT)
                </label>
                <div className="flex items-center">
                  <span className="px-3 py-2 bg-slate-100 border border-r-0 border-slate-300 rounded-l-lg text-xs font-bold text-slate-600">
                    Tk.
                  </span>
                  <input
                    type="number"
                    value={data.company.authorizedCapital}
                    onChange={(e) => handleCompanyChange('authorizedCapital', parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-r-lg focus:ring-2 focus:ring-blue-500 focus:outline-none font-semibold"
                  />
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  Authorized: Tk. {data.company.authorizedCapital.toLocaleString()} ({data.company.authorizedCapital / 10000000} Crore BDT)
                </p>
              </div>

              {/* Share Summary Box */}
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-600">Total Subscribed Shares:</span>
                  <span className="font-bold text-slate-900">
                    {data.subscribers.reduce((acc, s) => acc + s.shares, 0).toLocaleString()} shares
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Calculated Paid-up Capital:</span>
                  <span className="font-bold text-emerald-700">
                    Tk. {(data.subscribers.reduce((acc, s) => acc + s.shares, 0) * data.company.faceValuePerShare).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Subscribers Count:</span>
                  <span className="font-bold text-slate-900">{data.subscribers.length} persons</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
