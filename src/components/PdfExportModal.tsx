import React from 'react';
import { FileText, Loader2, CheckCircle2, AlertCircle, X } from 'lucide-react';
import { PdfExportProgress } from '../utils/pdfExport';

interface PdfExportModalProps {
  progress: PdfExportProgress | null;
  fileName: string;
  onClose: () => void;
}

export const PdfExportModal: React.FC<PdfExportModalProps> = ({
  progress,
  fileName,
  onClose
}) => {
  if (!progress) return null;

  const isCompleted = progress.status === 'completed';
  const isError = progress.status === 'error';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="w-full max-w-md bg-slate-900 border border-slate-700 rounded-xl shadow-2xl p-6 text-white relative">
        {(isCompleted || isError) && (
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        <div className="flex items-center gap-3 mb-4">
          <div
            className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
              isCompleted
                ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/40'
                : isError
                ? 'bg-rose-600/20 text-rose-400 border border-rose-500/40'
                : 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/40'
            }`}
          >
            {isCompleted ? (
              <CheckCircle2 className="w-5 h-5" />
            ) : isError ? (
              <AlertCircle className="w-5 h-5" />
            ) : (
              <Loader2 className="w-5 h-5 animate-spin" />
            )}
          </div>
          <div className="min-w-0">
            <h3 className="font-semibold text-base leading-tight">
              {isCompleted
                ? 'PDF Export Complete'
                : isError
                ? 'PDF Export Failed'
                : 'Generating A4 PDF Document'}
            </h3>
            <p className="text-xs text-slate-400 truncate mt-0.5" title={fileName}>
              {fileName}
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4">
          <div className="flex justify-between items-center text-xs text-slate-300 mb-1.5 font-medium">
            <span>
              {progress.totalPages > 0
                ? `Page ${progress.currentPage} of ${progress.totalPages}`
                : 'Preparing document...'}
            </span>
            <span className="text-emerald-400 font-semibold">{progress.percent}%</span>
          </div>

          <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden border border-slate-700/80 p-0.5">
            <div
              className={`h-full rounded-full transition-all duration-300 ${
                isCompleted
                  ? 'bg-emerald-500'
                  : isError
                  ? 'bg-rose-500'
                  : 'bg-linear-to-r from-emerald-500 to-teal-400'
              }`}
              style={{ width: `${Math.max(5, progress.percent)}%` }}
            />
          </div>
        </div>

        {/* Status Message */}
        <p
          className={`text-xs mt-3.5 leading-relaxed ${
            isError ? 'text-rose-300 font-medium' : isCompleted ? 'text-emerald-300' : 'text-slate-300'
          }`}
        >
          {progress.message}
        </p>

        {/* Statutory A4 Spec Note */}
        {!isError && (
          <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
            <span className="flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-slate-500" />
              Standard A4 (210 × 297 mm)
            </span>
            <span className="text-slate-500">jsPDF + html2canvas</span>
          </div>
        )}

        {isCompleted && (
          <div className="mt-4 pt-3 flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg transition cursor-pointer"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
