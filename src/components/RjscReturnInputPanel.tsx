import React from 'react';
import { RjscReturnState, PersonShareholder } from '../types/rjscReturn';
import { calculateTotalSharesAndCapital, formatBdtNoDec } from '../utils/rjscReturnCalculations';
import {
  Building2,
  Users,
  Calendar,
  FileText,
  Plus,
  Trash2,
  ChevronDown,
  Layers,
  Award
} from 'lucide-react';

interface RjscReturnInputPanelProps {
  data: RjscReturnState;
  onChange: (updater: (prev: RjscReturnState) => RjscReturnState) => void;
}

export const RjscReturnInputPanel: React.FC<RjscReturnInputPanelProps> = ({
  data,
  onChange
}) => {
  const { meetingInfo, people, selectedSubDoc } = data;
  const summary = calculateTotalSharesAndCapital(people, meetingInfo.shareNominalValue);

  const setSubDoc = (doc: RjscReturnState['selectedSubDoc']) => {
    onChange((prev) => ({ ...prev, selectedSubDoc: doc }));
  };

  const updateMeetingInfo = (field: keyof typeof meetingInfo, val: any) => {
    onChange((prev) => ({
      ...prev,
      meetingInfo: { ...prev.meetingInfo, [field]: val }
    }));
  };

  const updateAuthorizedPerson = (field: string, val: string) => {
    onChange((prev) => ({
      ...prev,
      meetingInfo: {
        ...prev.meetingInfo,
        authorizedPerson: {
          ...prev.meetingInfo.authorizedPerson,
          [field]: val
        }
      }
    }));
  };

  const addPerson = () => {
    const newPerson: PersonShareholder = {
      id: `p-${Date.now()}`,
      name: 'NEW DIRECTOR / SHAREHOLDER',
      designation: 'Director',
      shares: 1000,
      father: '',
      mother: '',
      address: 'Dhaka, Bangladesh',
      fullAddress: 'Dhaka, Bangladesh',
      dob: '01-Jan-1990',
      email: '',
      phone: '',
      tin: '',
      nid: ''
    };
    onChange((prev) => ({
      ...prev,
      people: [...prev.people, newPerson]
    }));
  };

  const removePerson = (index: number) => {
    if (people.length <= 1) return;
    onChange((prev) => ({
      ...prev,
      people: prev.people.filter((_, i) => i !== index)
    }));
  };

  const updatePerson = (index: number, field: keyof PersonShareholder, val: any) => {
    onChange((prev) => {
      const updated = [...prev.people];
      updated[index] = { ...updated[index], [field]: val };
      return { ...prev, people: updated };
    });
  };

  return (
    <div className="h-full overflow-y-auto bg-slate-900 border-r border-slate-800 text-slate-200 p-4 text-xs select-none">
      {/* Title */}
      <div className="mb-4">
        <h2 className="text-sm font-bold text-white flex items-center gap-2">
          <Building2 className="w-4 h-4 text-blue-400" />
          RJSC Annual Return & AGM Dossier
        </h2>
        <p className="text-[11px] text-slate-400 mt-0.5">
          Companies Act 1994 statutory filing for {meetingInfo.companyName}
        </p>
      </div>

      {/* Summary Stat Card */}
      <div className="grid grid-cols-3 gap-2 bg-slate-800/80 border border-slate-700 p-2.5 rounded-lg mb-4 text-center font-sans">
        <div>
          <span className="text-[10px] text-slate-400 block">Total Shares</span>
          <span className="font-bold text-emerald-400 text-xs">
            {summary.totalShares.toLocaleString()}
          </span>
        </div>
        <div>
          <span className="text-[10px] text-slate-400 block">Paid-Up Capital</span>
          <span className="font-bold text-emerald-400 text-xs">
            TK {formatBdtNoDec(summary.totalCapitalBdt)}
          </span>
        </div>
        <div>
          <span className="text-[10px] text-slate-400 block">Members</span>
          <span className="font-bold text-white text-xs">
            {summary.shareholderCount} ({summary.directorCount} Dirs)
          </span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="mb-4">
        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
          Filter Active Document Page
        </label>
        <div className="grid grid-cols-3 gap-1 text-[10px]">
          <button
            type="button"
            onClick={() => setSubDoc('all')}
            className={`px-2 py-1.5 rounded font-medium border text-left transition ${
              selectedSubDoc === 'all'
                ? 'bg-blue-600 border-blue-500 text-white font-bold'
                : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-750'
            }`}
          >
            All Pages
          </button>
          <button
            type="button"
            onClick={() => setSubDoc('notice')}
            className={`px-2 py-1.5 rounded font-medium border text-left transition ${
              selectedSubDoc === 'notice'
                ? 'bg-blue-600 border-blue-500 text-white font-bold'
                : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-750'
            }`}
          >
            1. AGM Notice
          </button>
          <button
            type="button"
            onClick={() => setSubDoc('minutes')}
            className={`px-2 py-1.5 rounded font-medium border text-left transition ${
              selectedSubDoc === 'minutes'
                ? 'bg-blue-600 border-blue-500 text-white font-bold'
                : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-750'
            }`}
          >
            2. AGM Minutes
          </button>
          <button
            type="button"
            onClick={() => setSubDoc('form23b')}
            className={`px-2 py-1.5 rounded font-medium border text-left transition ${
              selectedSubDoc === 'form23b'
                ? 'bg-blue-600 border-blue-500 text-white font-bold'
                : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-750'
            }`}
          >
            3. Form 23B
          </button>
          <button
            type="button"
            onClick={() => setSubDoc('attendance')}
            className={`px-2 py-1.5 rounded font-medium border text-left transition ${
              selectedSubDoc === 'attendance'
                ? 'bg-blue-600 border-blue-500 text-white font-bold'
                : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-750'
            }`}
          >
            4. Attendance
          </button>
          <button
            type="button"
            onClick={() => setSubDoc('consent')}
            className={`px-2 py-1.5 rounded font-medium border text-left transition ${
              selectedSubDoc === 'consent'
                ? 'bg-blue-600 border-blue-500 text-white font-bold'
                : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-750'
            }`}
          >
            5. Shorter Notice
          </button>
          <button
            type="button"
            onClick={() => setSubDoc('submission')}
            className={`px-2 py-1.5 rounded font-medium border text-left transition ${
              selectedSubDoc === 'submission'
                ? 'bg-blue-600 border-blue-500 text-white font-bold'
                : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-750'
            }`}
          >
            6. Submission
          </button>
          <button
            type="button"
            onClick={() => setSubDoc('allotments')}
            className={`px-2 py-1.5 rounded font-medium border text-left transition ${
              selectedSubDoc === 'allotments'
                ? 'bg-blue-600 border-blue-500 text-white font-bold'
                : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-750'
            }`}
          >
            7. Allotments
          </button>
          <button
            type="button"
            onClick={() => setSubDoc('shareholders')}
            className={`px-2 py-1.5 rounded font-medium border text-left transition ${
              selectedSubDoc === 'shareholders'
                ? 'bg-blue-600 border-blue-500 text-white font-bold'
                : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-750'
            }`}
          >
            8. Shareholders
          </button>
          <button
            type="button"
            onClick={() => setSubDoc('directors')}
            className={`px-2 py-1.5 rounded font-medium border text-left transition ${
              selectedSubDoc === 'directors'
                ? 'bg-blue-600 border-blue-500 text-white font-bold'
                : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-750'
            }`}
          >
            9. Directors & MD
          </button>
          <button
            type="button"
            onClick={() => setSubDoc('scheduleX')}
            className={`px-2 py-1.5 rounded font-medium border text-left transition ${
              selectedSubDoc === 'scheduleX'
                ? 'bg-blue-600 border-blue-500 text-white font-bold'
                : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-750'
            }`}
          >
            10. Schedule X
          </button>
        </div>
      </div>

      <div className="space-y-3 pb-8">
        {/* Accordion 1: Company & AGM Information */}
        <details className="group border border-slate-800 rounded-lg bg-slate-800/50 overflow-hidden" open>
          <summary className="p-3 bg-slate-800 hover:bg-slate-750 font-bold text-slate-200 cursor-pointer flex justify-between items-center transition">
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-blue-400" />
              Company & AGM Meeting Details
            </span>
            <ChevronDown className="w-4 h-4 text-slate-400 group-open:rotate-180 transition-transform" />
          </summary>
          <div className="p-3 space-y-3 border-t border-slate-800">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Company Name</label>
                <input
                  type="text"
                  value={meetingInfo.companyName}
                  onChange={(e) => updateMeetingInfo('companyName', e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1.5 text-white font-bold"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Registration No</label>
                <input
                  type="text"
                  value={meetingInfo.regNo}
                  onChange={(e) => updateMeetingInfo('regNo', e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1.5 text-slate-200 font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Notice Date</label>
                <input
                  type="text"
                  value={meetingInfo.noticeDate}
                  onChange={(e) => updateMeetingInfo('noticeDate', e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1.5 text-slate-200"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-400 block mb-1">AGM Date</label>
                <input
                  type="text"
                  value={meetingInfo.agmDate}
                  onChange={(e) => updateMeetingInfo('agmDate', e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1.5 text-slate-200"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-400 block mb-1">AGM Time</label>
                <input
                  type="text"
                  value={meetingInfo.agmTime}
                  onChange={(e) => updateMeetingInfo('agmTime', e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1.5 text-slate-200"
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] text-slate-400 block mb-1">Meeting Location</label>
              <input
                type="text"
                value={meetingInfo.meetingLocation}
                onChange={(e) => updateMeetingInfo('meetingLocation', e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1.5 text-slate-200"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Auditor Name</label>
                <input
                  type="text"
                  value={meetingInfo.auditorName}
                  onChange={(e) => updateMeetingInfo('auditorName', e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1.5 text-slate-200"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Auditor Address</label>
                <input
                  type="text"
                  value={meetingInfo.auditorAddress}
                  onChange={(e) => updateMeetingInfo('auditorAddress', e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1.5 text-slate-200"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Chairman Name</label>
                <input
                  type="text"
                  value={meetingInfo.chairmanName}
                  onChange={(e) => updateMeetingInfo('chairmanName', e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1.5 text-slate-200 font-bold"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Managing Director</label>
                <input
                  type="text"
                  value={meetingInfo.mdName}
                  onChange={(e) => updateMeetingInfo('mdName', e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1.5 text-slate-200 font-bold"
                />
              </div>
            </div>
          </div>
        </details>

        {/* Accordion 2: Directors & Shareholders (17 Members) */}
        <details className="group border border-slate-800 rounded-lg bg-slate-800/50 overflow-hidden" open>
          <summary className="p-3 bg-slate-800 hover:bg-slate-750 font-bold text-slate-200 cursor-pointer flex justify-between items-center transition">
            <span className="flex items-center gap-2">
              <Users className="w-4 h-4 text-emerald-400" />
              Directors & Shareholders ({people.length})
            </span>
            <ChevronDown className="w-4 h-4 text-slate-400 group-open:rotate-180 transition-transform" />
          </summary>
          <div className="p-3 space-y-3 border-t border-slate-800">
            <div className="flex justify-between items-center mb-1">
              <span className="text-[11px] text-slate-400">Manage member details, designation & shares:</span>
              <button
                type="button"
                onClick={addPerson}
                className="flex items-center gap-1 bg-emerald-700 hover:bg-emerald-600 text-white px-2.5 py-1 rounded text-[11px] font-bold"
              >
                <Plus className="w-3.5 h-3.5" /> Add Member
              </button>
            </div>

            <div className="space-y-2 max-h-[460px] overflow-y-auto pr-1">
              {people.map((p, idx) => (
                <div key={p.id} className="bg-slate-900 border border-slate-700 p-2.5 rounded-lg space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-emerald-400 text-xs">
                      #{idx + 1} {p.name}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded">
                        {p.shares} shares
                      </span>
                      {people.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removePerson(idx)}
                          className="text-red-400 hover:text-red-300"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[9px] text-slate-400 block mb-0.5">Name</label>
                      <input
                        type="text"
                        value={p.name}
                        onChange={(e) => updatePerson(idx, 'name', e.target.value)}
                        className="w-full bg-slate-800 border border-slate-700 rounded px-2 py-1 text-slate-200 font-medium"
                      />
                    </div>
                    <div>
                      <label className="text-[9px] text-slate-400 block mb-0.5">Designation</label>
                      <input
                        type="text"
                        value={p.designation}
                        onChange={(e) => updatePerson(idx, 'designation', e.target.value)}
                        className="w-full bg-slate-800 border border-slate-700 rounded px-2 py-1 text-slate-200"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="text-[9px] text-slate-400 block mb-0.5">Shares</label>
                      <input
                        type="number"
                        value={p.shares}
                        onChange={(e) => updatePerson(idx, 'shares', parseInt(e.target.value) || 0)}
                        className="w-full bg-slate-800 border border-slate-700 rounded px-2 py-1 text-emerald-400 font-bold"
                      />
                    </div>
                    <div>
                      <label className="text-[9px] text-slate-400 block mb-0.5">Father</label>
                      <input
                        type="text"
                        value={p.father}
                        onChange={(e) => updatePerson(idx, 'father', e.target.value)}
                        className="w-full bg-slate-800 border border-slate-700 rounded px-2 py-1 text-slate-200"
                      />
                    </div>
                    <div>
                      <label className="text-[9px] text-slate-400 block mb-0.5">NID</label>
                      <input
                        type="text"
                        value={p.nid}
                        onChange={(e) => updatePerson(idx, 'nid', e.target.value)}
                        className="w-full bg-slate-800 border border-slate-700 rounded px-2 py-1 text-slate-200 font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[9px] text-slate-400 block mb-0.5">Full Address</label>
                    <input
                      type="text"
                      value={p.fullAddress}
                      onChange={(e) => updatePerson(idx, 'fullAddress', e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded px-2 py-1 text-slate-200"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </details>

        {/* Accordion 3: Authorized Return Submitter */}
        <details className="group border border-slate-800 rounded-lg bg-slate-800/50 overflow-hidden">
          <summary className="p-3 bg-slate-800 hover:bg-slate-750 font-bold text-slate-200 cursor-pointer flex justify-between items-center transition">
            <span className="flex items-center gap-2">
              <Award className="w-4 h-4 text-purple-400" />
              RJSC Authorized Representative
            </span>
            <ChevronDown className="w-4 h-4 text-slate-400 group-open:rotate-180 transition-transform" />
          </summary>
          <div className="p-3 space-y-3 border-t border-slate-800">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Authorized Person Name</label>
                <input
                  type="text"
                  value={meetingInfo.authorizedPerson.name}
                  onChange={(e) => updateAuthorizedPerson('name', e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-slate-200 font-bold"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-400 block mb-1">NID</label>
                <input
                  type="text"
                  value={meetingInfo.authorizedPerson.nid}
                  onChange={(e) => updateAuthorizedPerson('nid', e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-slate-200 font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Date of Birth</label>
                <input
                  type="text"
                  value={meetingInfo.authorizedPerson.dob}
                  onChange={(e) => updateAuthorizedPerson('dob', e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-slate-200"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Mobile</label>
                <input
                  type="text"
                  value={meetingInfo.authorizedPerson.mobile}
                  onChange={(e) => updateAuthorizedPerson('mobile', e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-slate-200"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Email</label>
                <input
                  type="text"
                  value={meetingInfo.authorizedPerson.email}
                  onChange={(e) => updateAuthorizedPerson('email', e.target.value)}
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
