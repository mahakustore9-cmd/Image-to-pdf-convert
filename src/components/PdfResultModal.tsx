import React, { useEffect } from 'react';
import { Download, ExternalLink, CheckCircle2, RefreshCw, FileText, ArrowRight, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { formatBytes } from '../utils/formatters';

interface PdfResultModalProps {
  isOpen: boolean;
  filename: string;
  pdfUrl: string | null;
  fileSize: number;
  pageCount: number;
  onDownload: () => void;
  onReset: () => void;
  onClose: () => void;
}

export const PdfResultModal: React.FC<PdfResultModalProps> = ({
  isOpen,
  filename,
  pdfUrl,
  fileSize,
  pageCount,
  onDownload,
  onReset,
  onClose,
}) => {
  useEffect(() => {
    if (isOpen) {
      // Trigger subtle celebration confetti
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#2563eb', '#3b82f6', '#60a5fa', '#10b981', '#6366f1'],
        });
      } catch {
        // Safe fallback
      }
    }
  }, [isOpen]);

  if (!isOpen || !pdfUrl) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-200 p-6 sm:p-8">
        {/* Success Icon */}
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4 ring-8 ring-emerald-50">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 font-semibold text-xs border border-emerald-200 mb-2">
            Conversion Complete
          </span>

          <h3 className="text-2xl font-bold text-slate-900">PDF Ready</h3>
          <p className="text-sm text-slate-500 mt-1 max-w-sm">
            Your images have been successfully converted into a high-quality PDF document.
          </p>

          {/* Document Summary Card */}
          <div className="w-full mt-6 p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-left flex items-center justify-between">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <div className="overflow-hidden">
                <p className="text-sm font-semibold text-slate-900 truncate" title={filename}>
                  {filename}
                </p>
                <p className="text-xs text-slate-500">
                  {pageCount} {pageCount === 1 ? 'page' : 'pages'} • {formatBytes(fileSize)}
                </p>
              </div>
            </div>

            {/* Quick preview button */}
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-white transition-colors"
              title="Preview in new tab"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          {/* Action Buttons */}
          <div className="w-full mt-6 space-y-2.5">
            <button
              type="button"
              id="modal-download-pdf-btn"
              onClick={onDownload}
              className="w-full py-4 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-base shadow-lg shadow-blue-600/25 hover:shadow-xl hover:shadow-blue-600/35 transition-all flex items-center justify-center gap-2"
            >
              <Download className="w-5 h-5" />
              <span>Download PDF</span>
            </button>

            <div className="grid grid-cols-2 gap-2">
              <a
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm transition-colors flex items-center justify-center gap-1.5"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Preview</span>
              </a>

              <button
                type="button"
                id="modal-convert-more-btn"
                onClick={onReset}
                className="py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm transition-colors flex items-center justify-center gap-1.5"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Convert More</span>
              </button>
            </div>
          </div>

          <div className="mt-5 text-[11px] text-slate-400 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-blue-500" />
            <span>Files are kept in memory only and will be cleared when you refresh.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
