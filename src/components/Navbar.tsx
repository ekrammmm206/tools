import React, { useRef } from 'react';
import {
  Printer,
  Download,
  Upload,
  RotateCcw,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Columns,
  FileText,
  SlidersHorizontal,
  Building
} from 'lucide-react';
import { DocumentState } from '../types/company';

interface NavbarProps {
  activeDocType: 'valuation' | 'company' | 'combined' | 'rjscReturn' | 'partnership';
  onDocTypeChange: (docType: 'valuation' | 'company' | 'combined' | 'rjscReturn' | 'partnership') => void;
  title: string;
  zoom: number;
  onZoomChange: (newZoom: number) => void;
  viewMode: 'split' | 'form' | 'preview';
  onViewModeChange: (mode: 'split' | 'form' | 'preview') => void;
  onPrint: () => void;
  onExportJson: () => void;
  onImportJson: (imported: any) => void;
  onReset: () => void;
  subtitle?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeDocType,
  onDocTypeChange,
  title,
  zoom,
  onZoomChange,
  viewMode,
  onViewModeChange,
  onPrint,
  onExportJson,
  onImportJson,
  onReset,
  subtitle
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target?.result as string);
          onImportJson(parsed);
        } catch (err) {
          alert('Could not parse JSON file.');
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <header className="h-14 bg-slate-900 border-b border-slate-800 text-white px-4 flex items-center justify-between shrink-0 select-none print:hidden z-20">
      {/* Brand & Document Switcher */}
      <div className="flex items-center gap-2 sm:gap-3 min-w-0">
        <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center shrink-0 shadow-xs">
          <Building className="w-4 h-4 text-white" />
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h1 className="text-xs sm:text-sm font-bold tracking-tight text-white truncate max-w-[120px] sm:max-w-xs">
              {title}
            </h1>
            {/* Template Selector dropdown / buttons */}
            <div className="hidden xl:flex items-center bg-slate-800 p-0.5 rounded-md border border-slate-700 text-[11px]">
              <button
                type="button"
                onClick={() => onDocTypeChange('partnership')}
                className={`px-2 py-0.5 rounded transition ${
                  activeDocType === 'partnership'
                    ? 'bg-teal-600 text-white font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Partnership Deed
              </button>
              <button
                type="button"
                onClick={() => onDocTypeChange('rjscReturn')}
                className={`px-2 py-0.5 rounded transition ${
                  activeDocType === 'rjscReturn'
                    ? 'bg-amber-600 text-white font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                RJSC Annual Return & AGM
              </button>
              <button
                type="button"
                onClick={() => onDocTypeChange('combined')}
                className={`px-2 py-0.5 rounded transition ${
                  activeDocType === 'combined'
                    ? 'bg-purple-600 text-white font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Combined Legal (7 Docs)
              </button>
              <button
                type="button"
                onClick={() => onDocTypeChange('valuation')}
                className={`px-2 py-0.5 rounded transition ${
                  activeDocType === 'valuation'
                    ? 'bg-emerald-600 text-white font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Asset Valuation
              </button>
              <button
                type="button"
                onClick={() => onDocTypeChange('company')}
                className={`px-2 py-0.5 rounded transition ${
                  activeDocType === 'company'
                    ? 'bg-blue-600 text-white font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Company Registration
              </button>
            </div>
            {/* Mobile / Compact Selector */}
            <select
              value={activeDocType}
              onChange={(e) => onDocTypeChange(e.target.value as any)}
              className="xl:hidden bg-slate-800 border border-slate-700 text-white text-[11px] rounded px-1.5 py-0.5 font-medium"
            >
              <option value="partnership">Partnership Deed (1932 Act)</option>
              <option value="rjscReturn">RJSC Annual Return & AGM</option>
              <option value="combined">Combined Legal (7 Docs)</option>
              <option value="valuation">Asset Valuation</option>
              <option value="company">Company Registration</option>
            </select>
          </div>
          {subtitle && (
            <p className="text-[10px] text-slate-400 hidden lg:block truncate max-w-sm">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Center Controls: View Switcher & Zoom */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Layout Switcher (visible on all screens) */}
        <div className="flex items-center bg-slate-800 p-0.5 rounded-lg border border-slate-700 text-xs">
          <button
            type="button"
            onClick={() => onViewModeChange('form')}
            className={`px-2 sm:px-2.5 py-1 rounded-md flex items-center gap-1 sm:gap-1.5 transition ${
              viewMode === 'form' ? 'bg-slate-700 text-white font-medium shadow-xs' : 'text-slate-400 hover:text-white'
            }`}
            aria-label="Show form view"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Form</span>
          </button>
          <button
            type="button"
            onClick={() => onViewModeChange('split')}
            className={`hidden md:flex px-2.5 py-1 rounded-md items-center gap-1.5 transition ${
              viewMode === 'split' ? 'bg-slate-700 text-white font-medium shadow-xs' : 'text-slate-400 hover:text-white'
            }`}
            aria-label="Show split view"
          >
            <Columns className="w-3.5 h-3.5" />
            <span>Split</span>
          </button>
          <button
            type="button"
            onClick={() => onViewModeChange('preview')}
            className={`px-2 sm:px-2.5 py-1 rounded-md flex items-center gap-1 sm:gap-1.5 transition ${
              viewMode === 'preview' ? 'bg-slate-700 text-white font-medium shadow-xs' : 'text-slate-400 hover:text-white'
            }`}
            aria-label="Show document preview"
          >
            <FileText className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Preview</span>
          </button>
        </div>

        {/* Zoom Controls (hidden on mobile, visible from lg) */}
        <div className="hidden lg:flex items-center bg-slate-800 px-2 py-1 rounded-lg border border-slate-700 text-xs text-slate-300 gap-1">
          <button
            type="button"
            onClick={() => onZoomChange(Math.max(40, zoom - 10))}
            className="p-1 hover:text-white"
            title="Zoom Out"
            aria-label="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <span className="w-10 text-center font-mono text-[11px]">{zoom}%</span>
          <button
            type="button"
            onClick={() => onZoomChange(Math.min(150, zoom + 10))}
            className="p-1 hover:text-white"
            title="Zoom In"
            aria-label="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => onZoomChange(100)}
            className="p-1 hover:text-white text-[10px] ml-1 px-1 rounded hover:bg-slate-700"
            title="Reset Zoom to 100%"
          >
            100%
          </button>
        </div>
      </div>

      {/* Right Actions: Print & Export */}
      <div className="flex items-center gap-2">
        {/* Reset */}
        <button
          type="button"
          onClick={onReset}
          className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
          title="Reset to Template Defaults"
          aria-label="Reset to default template"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        {/* Import JSON */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept=".json"
          className="hidden"
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition"
          title="Import state from JSON"
        >
          <Upload className="w-3.5 h-3.5" />
          <span>Import</span>
        </button>

        {/* Export JSON */}
        <button
          type="button"
          onClick={onExportJson}
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition"
          title="Save document state to JSON"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Save JSON</span>
        </button>

        {/* Print / Save as PDF Button */}
        <button
          type="button"
          onClick={onPrint}
          className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg shadow-sm transition active:scale-95 shrink-0"
          title="Print or Save as PDF"
        >
          <Printer className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span className="hidden xs:inline sm:inline">Print / PDF</span>
          <span className="xs:hidden sm:hidden">PDF</span>
        </button>
      </div>
    </header>
  );
};
