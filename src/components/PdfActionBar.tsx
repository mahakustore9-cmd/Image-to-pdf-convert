import React, { useEffect } from 'react';
import { ConversionState } from '../types';
import { formatBytes } from '../utils/formatters';
import confetti from 'canvas-confetti';
import {
  FileDown,
  Sparkles,
  Loader2,
  CheckCircle2,
  ExternalLink,
  RotateCcw,
  AlertCircle,
  FileCheck,
} from 'lucide-react';

interface PdfActionBarProps {
  imageCount: number;
  conversionState: ConversionState;
  onGeneratePdf: () => void;
  onReset: () => void;
  filename: string;
}

export const PdfActionBar: React.FC<PdfActionBarProps> = ({
  imageCount,
  conversionState,
  onGeneratePdf,
  onReset,
  filename,
}) => {
  // Fire confetti celebration on success
  useEffect(() => {
    if (conversionState.status === 'success') {
      try {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.7 },
          colors: ['#2563eb', '#3b82f6', '#10b981', '#6366f1'],
        });
      } catch {
        // Safe fallback
      }
    }
  }, [conversionState.status]);

  const handleDownload = () => {
    if (!conversionState.pdfBlobUrl) return;

    const link = document.createElement('a');
    link.href = conversionState.pdfBlobUrl;
    link.download = filename || 'images-to-pdf.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleOpenPreview = () => {
    if (!conversionState.pdfBlobUrl) return;
    window.open(conversionState.pdfBlobUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="w-full">
      {/* PROCESSING STATE */}
      {conversionState.status === 'processing' && (
        <div
          id="pdf-processing-card"
          className="w-full bg-blue-50/90 border border-blue-200 rounded-2xl p-6 shadow-xs flex flex-col items-center text-center animate-in fade-in duration-200"
        >
          <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center mb-3 shadow-md shadow-blue-500/20">
            <Loader2 className="w-6 h-6 animate-spin" />
          </div>
          <h4 className="text-lg font-bold text-slate-900 mb-1">Creating your PDF...</h4>
          <p className="text-xs sm:text-sm text-slate-600 mb-4 max-w-sm">
            Processing image {conversionState.currentStep} of {conversionState.totalSteps}:{' '}
            <span className="font-semibold text-slate-800 truncate inline-block max-w-[200px] align-bottom">
              {conversionState.currentFileName}
            </span>
          </p>

          {/* Progress Bar */}
          <div className="w-full max-w-md bg-blue-200/70 h-3 rounded-full overflow-hidden shadow-inner mb-2">
            <div
              className="bg-gradient-to-r from-blue-600 to-indigo-600 h-full rounded-full transition-all duration-200 ease-out"
              style={{ width: `${Math.max(5, conversionState.progressPercentage)}%` }}
            />
          </div>
          <span className="text-xs font-bold text-blue-800">{conversionState.progressPercentage}% Complete</span>
        </div>
      )}

      {/* SUCCESS STATE */}
      {conversionState.status === 'success' && (
        <div
          id="pdf-success-card"
          className="w-full bg-gradient-to-b from-emerald-50/80 to-white border border-emerald-200/90 rounded-2xl p-6 shadow-md flex flex-col items-center text-center animate-in zoom-in-95 duration-200"
        >
          <div className="w-14 h-14 rounded-full bg-emerald-600 text-white flex items-center justify-center mb-3 shadow-lg shadow-emerald-600/20">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-100/80 text-emerald-800 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Conversion Complete</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-1 tracking-tight">PDF Ready!</h3>
          <p className="text-xs sm:text-sm text-slate-600 mb-5">
            <span className="font-semibold text-slate-900">{filename}</span> • {conversionState.pageCount} Pages • {formatBytes(conversionState.pdfFileSize)}
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-md">
            <button
              id="download-pdf-button"
              type="button"
              onClick={handleDownload}
              className="w-full sm:w-auto flex-1 px-7 py-3.5 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold text-base rounded-xl shadow-md hover:shadow-lg shadow-emerald-600/25 transition-all flex items-center justify-center gap-2.5 touch-manipulation"
            >
              <FileDown className="w-5 h-5" />
              <span>Download PDF</span>
            </button>

            <button
              type="button"
              onClick={handleOpenPreview}
              className="w-full sm:w-auto px-5 py-3.5 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-sm rounded-xl border border-slate-300 shadow-xs transition-colors flex items-center justify-center gap-2"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Preview</span>
            </button>
          </div>

          {/* Reset / Convert More Link */}
          <button
            type="button"
            onClick={onReset}
            className="mt-5 text-xs text-slate-500 hover:text-blue-600 font-medium flex items-center gap-1 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Convert More Images</span>
          </button>
        </div>
      )}

      {/* ERROR STATE */}
      {conversionState.status === 'error' && (
        <div
          id="pdf-error-card"
          className="w-full bg-red-50 border border-red-200 rounded-2xl p-5 shadow-xs flex items-start gap-3 text-left animate-in fade-in duration-200 mb-4"
        >
          <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
          <div className="flex-1">
            <h4 className="text-sm font-bold text-red-900">Conversion Failed</h4>
            <p className="text-xs text-red-700 mt-0.5">{conversionState.errorMessage || 'An unexpected error occurred while compiling your PDF.'}</p>
            <button
              type="button"
              onClick={onGeneratePdf}
              className="mt-3 px-4 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-lg shadow-xs transition"
            >
              Try Again
            </button>
          </div>
        </div>
      )}

      {/* IDLE / READY STATE (Prominent Create PDF Button) */}
      {conversionState.status === 'idle' && (
        <div className="w-full flex flex-col items-center">
          <button
            id="create-pdf-button"
            type="button"
            disabled={imageCount === 0}
            onClick={onGeneratePdf}
            className="w-full sm:w-auto min-w-[280px] px-8 py-4 bg-gradient-to-r from-blue-600 via-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-base sm:text-lg rounded-xl shadow-lg hover:shadow-xl shadow-blue-600/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none transition-all flex items-center justify-center gap-3 touch-manipulation group"
          >
            <FileCheck className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span>Create PDF ({imageCount} {imageCount === 1 ? 'Page' : 'Pages'})</span>
          </button>
          <p className="text-[11px] text-slate-400 mt-2 text-center">
            Processed 100% in your browser • Instant client-side download
          </p>
        </div>
      )}
    </div>
  );
};
