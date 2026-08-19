import React from 'react';
import { ShieldCheck, Zap, Lock, Cpu, Globe, ArrowLeft, Heart } from 'lucide-react';

interface AboutPageProps {
  onBack: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onBack }) => {
  return (
    <div className="w-full max-w-4xl mx-auto py-6 sm:py-10 px-4 space-y-8 animate-in fade-in duration-200">
      <button
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700 transition"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Converter</span>
      </button>

      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
            Our Mission
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3 tracking-tight">
            About Image to PDF Converter
          </h1>
          <p className="text-base sm:text-lg text-slate-600 mt-3 leading-relaxed">
            Image to PDF Converter was built with a single guiding principle: document utilities should be fast, effortless, and uncompromisingly private.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
          <div className="p-5 rounded-2xl bg-blue-50/50 border border-blue-100 flex flex-col gap-2">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs">
              <Lock className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-slate-900">Zero Cloud Uploads</h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Unlike legacy converters that require uploading your sensitive IDs, receipts, and photos to remote servers, our tool processes everything 100% inside your browser using modern Web APIs.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-emerald-50/50 border border-emerald-100 flex flex-col gap-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
              <Zap className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-slate-900">Instant Performance</h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              By utilizing your device's native graphics and JavaScript compilation engine, your PDF files are assembled in fractions of a second with zero bandwidth bottlenecks.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-purple-50/50 border border-purple-100 flex flex-col gap-2">
            <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center shadow-xs">
              <Globe className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-slate-900">Accessible Everywhere</h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Designed from the ground up for mobile screens, tablets, and desktop computers. Works smoothly across Chrome, Safari, Firefox, and Edge on iOS and Android.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-amber-50/50 border border-amber-100 flex flex-col gap-2">
            <div className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center shadow-xs">
              <Cpu className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-slate-900">Modern Client Architecture</h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Built with React, TypeScript, and high-performance client PDF libraries. Sustainable and lightweight without requiring bulky server backends.
            </p>
          </div>
        </div>

        <div className="border-t border-slate-100 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Built with respect for your personal privacy.</span>
          </div>
          <div className="flex items-center gap-1">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
            <span>for productivity everywhere.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
