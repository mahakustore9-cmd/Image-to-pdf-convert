import React, { useState } from 'react';
import { RouteMeta } from '../types';
import {
  Upload,
  ArrowDownUp,
  Sliders,
  FileCheck,
  Download,
  Shield,
  Zap,
  Smartphone,
  CheckCircle2,
  ChevronDown,
  Layers,
  Sparkles,
  Lock,
} from 'lucide-react';

interface SeoContentSectionProps {
  meta: RouteMeta;
  onNavigate: (path: string) => void;
}

export const SeoContentSection: React.FC<SeoContentSectionProps> = ({ meta, onNavigate }) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const steps = [
    {
      num: '01',
      title: 'Select Images',
      desc: 'Pick JPG, PNG, or WEBP files from your computer, iPhone, or Android gallery.',
      icon: <Upload className="w-5 h-5 text-blue-600" />,
    },
    {
      num: '02',
      title: 'Arrange Order',
      desc: 'Drag thumbnails or tap arrows to customize the exact PDF page order.',
      icon: <ArrowDownUp className="w-5 h-5 text-blue-600" />,
    },
    {
      num: '03',
      title: 'Configure Settings',
      desc: 'Set paper size (A4/Letter), orientation, margins, and output filename.',
      icon: <Sliders className="w-5 h-5 text-blue-600" />,
    },
    {
      num: '04',
      title: 'Click Create PDF',
      desc: 'Our browser-side engine compiles your photos into a PDF in milliseconds.',
      icon: <FileCheck className="w-5 h-5 text-blue-600" />,
    },
    {
      num: '05',
      title: 'Download & Share',
      desc: 'Save your clean, high-resolution, watermark-free PDF immediately.',
      icon: <Download className="w-5 h-5 text-blue-600" />,
    },
  ];

  const features = [
    {
      title: '100% Free Forever',
      desc: 'Unlimited image conversions with zero subscriptions, paywalls, or hidden watermarks.',
      icon: <Sparkles className="w-5 h-5 text-blue-600" />,
    },
    {
      title: 'Lightning Fast',
      desc: 'Generates multi-page PDFs locally in your browser with no network upload delay.',
      icon: <Zap className="w-5 h-5 text-amber-500" />,
    },
    {
      title: 'Privacy Guaranteed',
      desc: 'Your confidential documents, IDs, and personal photos never leave your device.',
      icon: <Lock className="w-5 h-5 text-emerald-600" />,
    },
    {
      title: 'No Sign-Up Required',
      desc: 'Start converting right away without entering an email address or creating an account.',
      icon: <CheckCircle2 className="w-5 h-5 text-indigo-600" />,
    },
    {
      title: 'Batch & Multi-Image Support',
      desc: 'Combine multiple image formats (JPG, JPEG, PNG, WEBP) into a single unified document.',
      icon: <Layers className="w-5 h-5 text-purple-600" />,
    },
    {
      title: 'Mobile-First Design',
      desc: 'Optimized for smooth one-handed conversion on Android smartphones and iOS devices.',
      icon: <Smartphone className="w-5 h-5 text-sky-600" />,
    },
  ];

  return (
    <section className="w-full space-y-12 sm:space-y-16 text-slate-800">
      {/* SECTION 1: HOW TO CONVERT */}
      <div className="w-full bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs">
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
            Simple 5-Step Process
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-3 tracking-tight">
            How to Convert Images to PDF
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            Create professional, compact, and shareable PDF documents from your pictures in seconds.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="relative bg-slate-50/70 hover:bg-white rounded-2xl p-5 border border-slate-200/80 transition-all hover:shadow-md flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-white shadow-2xs border border-slate-200/80 flex items-center justify-center">
                    {step.icon}
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-400">{step.num}</span>
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-1">{step.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 2: WHY USE OUR CONVERTER */}
      <div className="w-full">
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
            Why Choose Us
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-3 tracking-tight">
            Why Use Our Image to PDF Converter?
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            Engineered for speed, strict device privacy, and effortless mobile usability.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feat, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:shadow-md transition-shadow flex items-start gap-4"
            >
              <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-center shrink-0">
                {feat.icon}
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 mb-1">{feat.title}</h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">{feat.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 3: FREQUENTLY ASKED QUESTIONS */}
      <div className="w-full bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
            Got Questions?
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-3 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            Answers to common questions about image formatting, multi-page creation, and security.
          </p>
        </div>

        <div className="max-w-3xl mx-auto divide-y divide-slate-100">
          {meta.faqs.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div key={index} className="py-4">
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between text-left gap-4 group focus:outline-hidden"
                  aria-expanded={isOpen}
                >
                  <span className="font-semibold text-sm sm:text-base text-slate-900 group-hover:text-blue-600 transition-colors">
                    {faq.question}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 transition-transform duration-200 shrink-0 ${
                      isOpen ? 'rotate-180 bg-blue-50 text-blue-600' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>
                {isOpen && (
                  <div className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed animate-in fade-in slide-in-from-top-1 duration-150 pr-8">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* SECTION 4: RELATED TOOLS INTERNAL LINKS */}
      <div className="w-full bg-gradient-to-r from-blue-50/60 via-indigo-50/40 to-slate-50 border border-blue-100 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-lg font-bold text-slate-900">Explore Dedicated Image Converters</h3>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Need tailored conversion for specific photo formats? Check our specialized tools.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => onNavigate('/jpg-to-pdf')}
            className="px-3.5 py-2 bg-white hover:bg-blue-50 text-blue-700 text-xs font-semibold rounded-xl border border-slate-200 shadow-2xs transition"
          >
            JPG to PDF
          </button>
          <button
            onClick={() => onNavigate('/png-to-pdf')}
            className="px-3.5 py-2 bg-white hover:bg-blue-50 text-blue-700 text-xs font-semibold rounded-xl border border-slate-200 shadow-2xs transition"
          >
            PNG to PDF
          </button>
          <button
            onClick={() => onNavigate('/photo-to-pdf')}
            className="px-3.5 py-2 bg-white hover:bg-blue-50 text-blue-700 text-xs font-semibold rounded-xl border border-slate-200 shadow-2xs transition"
          >
            Photo to PDF
          </button>
          <button
            onClick={() => onNavigate('/images-to-pdf')}
            className="px-3.5 py-2 bg-white hover:bg-blue-50 text-blue-700 text-xs font-semibold rounded-xl border border-slate-200 shadow-2xs transition"
          >
            Batch Images
          </button>
        </div>
      </div>
    </section>
  );
};
