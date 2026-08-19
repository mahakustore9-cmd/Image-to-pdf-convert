import React from 'react';
import { ArrowLeft, Shield, Lock, EyeOff, Server, Cookie } from 'lucide-react';

interface PrivacyPageProps {
  onBack: () => void;
}

export const PrivacyPage: React.FC<PrivacyPageProps> = ({ onBack }) => {
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
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
            Privacy Policy
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3 tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-xs text-slate-400 mt-1">Last Updated: August 19, 2026</p>
        </div>

        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200/80 flex items-start gap-3">
          <Shield className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-emerald-900 leading-relaxed">
            <strong>Key Summary:</strong> We do not upload, transmit, store, or view any of the images or files you process with this converter. All conversions occur entirely inside your browser's local sandbox.
          </div>
        </div>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Lock className="w-5 h-5 text-blue-600" />
            1. Client-Side Image Processing
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            When you select JPG, PNG, WEBP, or JPEG files in our application, the file data is read exclusively through browser-native APIs (such as HTML5 FileReader and Canvas). The image rendering, rotation, compression, and PDF compilation take place on your local CPU/GPU. No image content is ever transmitted across the internet to our servers or any third-party computing infrastructure.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Server className="w-5 h-5 text-blue-600" />
            2. No File Storage or Retention
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Because files are processed in-memory within your active browser tab, closing the browser tab or hitting "Clear All" immediately removes the temporary memory references. We do not operate database storage for user files.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Cookie className="w-5 h-5 text-blue-600" />
            3. Advertising & Cookies
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            To provide this service free of charge without requiring paid subscriptions, we may display advertisements from trusted third-party advertising networks (such as Adsterra). These partners may use cookies, web beacons, or anonymous identifiers in accordance with standard industry practices to serve relevant advertisements. You can control or block cookies through your browser settings at any time.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <EyeOff className="w-5 h-5 text-blue-600" />
            4. Personal Data Collection
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            We do not require user accounts, logins, or registration to use this tool. We do not collect names, phone numbers, or credit cards. If you choose to contact us via our contact form, we will use your provided email address solely to reply to your inquiry.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900">5. Changes to This Policy</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            We may occasionally update this Privacy Policy to reflect technical or legal improvements. Any changes will be posted on this page with an updated timestamp.
          </p>
        </section>
      </div>
    </div>
  );
};
