import React from 'react';
import { ArrowLeft, FileText, CheckCircle2, AlertTriangle } from 'lucide-react';

interface TermsPageProps {
  onBack: () => void;
}

export const TermsPage: React.FC<TermsPageProps> = ({ onBack }) => {
  return (
    <div className="w-full max-w-4xl mx-auto py-6 sm:py-10 px-4 space-y-8 animate-in fade-in duration-200">
      <button
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700 transition"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Converter</span>
      </button>

      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-6 text-slate-700">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
            Legal Terms
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3 tracking-tight">
            Terms of Service
          </h1>
          <p className="text-xs text-slate-400 mt-1">Effective Date: August 19, 2026</p>
        </div>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600" />
            1. Acceptance of Terms
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            By accessing or using the Image to PDF Converter web utility, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you should discontinue use of the service.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            2. Permitted Use
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            You may use Image to PDF Converter for personal, educational, or commercial purposes to convert your own images, documents, and graphics into PDF format. You retain 100% of all rights and intellectual property in your images and resulting PDF documents.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
            3. Disclaimer of Warranties
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            The service is provided on an "AS IS" and "AS AVAILABLE" basis without warranties of any kind, whether express or implied. While we strive for maximum accuracy, compatibility, and speed, we do not warrant that the service will be error-free or uninterrupted.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900">4. Limitation of Liability</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Under no circumstances shall Image to PDF Converter or its maintainers be liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use this tool.
          </p>
        </section>
      </div>
    </div>
  );
};
