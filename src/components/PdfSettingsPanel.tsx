import React from 'react';
import {
  PdfSettings,
  PageSizeOption,
  OrientationOption,
  MarginOption,
  ImageFitOption,
  ImageQualityOption,
} from '../types';
import { Sliders, FileText, Layout, Crop, Sparkles, Edit3 } from 'lucide-react';

interface PdfSettingsPanelProps {
  settings: PdfSettings;
  onSettingsChange: (newSettings: PdfSettings) => void;
}

export const PdfSettingsPanel: React.FC<PdfSettingsPanelProps> = ({
  settings,
  onSettingsChange,
}) => {
  const updateSetting = <K extends keyof PdfSettings>(key: K, value: PdfSettings[K]) => {
    onSettingsChange({
      ...settings,
      [key]: value,
    });
  };

  return (
    <div className="w-full bg-white rounded-2xl border border-slate-200 shadow-xs p-5 sm:p-6 space-y-6">
      <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
        <Sliders className="w-5 h-5 text-blue-600" />
        <h3 className="font-bold text-slate-900 text-base sm:text-lg">PDF Layout & Quality Settings</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* PAGE SIZE */}
        <div className="space-y-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-slate-400" />
            Page Size
          </label>
          <div className="grid grid-cols-3 gap-1.5 bg-slate-100/80 p-1 rounded-xl">
            {(
              [
                { id: 'a4', label: 'A4 (210×297)' },
                { id: 'letter', label: 'US Letter' },
                { id: 'original', label: 'Original' },
              ] as const
            ).map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => updateSetting('pageSize', opt.id as PageSizeOption)}
                className={`py-2 px-2 rounded-lg text-xs font-semibold transition-all text-center ${
                  settings.pageSize === opt.id
                    ? 'bg-white text-blue-700 shadow-xs ring-1 ring-slate-200'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* ORIENTATION */}
        <div className="space-y-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
            <Layout className="w-3.5 h-3.5 text-slate-400" />
            Orientation
          </label>
          <div className="grid grid-cols-3 gap-1.5 bg-slate-100/80 p-1 rounded-xl">
            {(
              [
                { id: 'auto', label: 'Auto' },
                { id: 'portrait', label: 'Portrait' },
                { id: 'landscape', label: 'Landscape' },
              ] as const
            ).map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => updateSetting('orientation', opt.id as OrientationOption)}
                className={`py-2 px-2 rounded-lg text-xs font-semibold transition-all text-center ${
                  settings.orientation === opt.id
                    ? 'bg-white text-blue-700 shadow-xs ring-1 ring-slate-200'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* MARGINS */}
        <div className="space-y-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
            <Crop className="w-3.5 h-3.5 text-slate-400" />
            Page Margins
          </label>
          <div className="grid grid-cols-4 gap-1 bg-slate-100/80 p-1 rounded-xl">
            {(
              [
                { id: 'none', label: 'None' },
                { id: 'small', label: 'Small' },
                { id: 'medium', label: 'Medium' },
                { id: 'large', label: 'Large' },
              ] as const
            ).map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => updateSetting('margin', opt.id as MarginOption)}
                className={`py-2 px-1 rounded-lg text-xs font-semibold transition-all text-center ${
                  settings.margin === opt.id
                    ? 'bg-white text-blue-700 shadow-xs ring-1 ring-slate-200'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* IMAGE FIT */}
        <div className="space-y-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
            <Crop className="w-3.5 h-3.5 text-slate-400" />
            Image Fit
          </label>
          <div className="grid grid-cols-2 gap-1.5 bg-slate-100/80 p-1 rounded-xl">
            {(
              [
                { id: 'fit', label: 'Fit (Preserve Ratio)' },
                { id: 'fill', label: 'Fill Page' },
              ] as const
            ).map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => updateSetting('imageFit', opt.id as ImageFitOption)}
                className={`py-2 px-2 rounded-lg text-xs font-semibold transition-all text-center ${
                  settings.imageFit === opt.id
                    ? 'bg-white text-blue-700 shadow-xs ring-1 ring-slate-200'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* IMAGE QUALITY */}
        <div className="space-y-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-slate-400" />
            Compression & Quality
          </label>
          <div className="grid grid-cols-3 gap-1.5 bg-slate-100/80 p-1 rounded-xl">
            {(
              [
                { id: 'standard', label: 'Standard' },
                { id: 'high', label: 'High' },
                { id: 'maximum', label: 'Maximum' },
              ] as const
            ).map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => updateSetting('imageQuality', opt.id as ImageQualityOption)}
                className={`py-2 px-2 rounded-lg text-xs font-semibold transition-all text-center ${
                  settings.imageQuality === opt.id
                    ? 'bg-white text-blue-700 shadow-xs ring-1 ring-slate-200'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* PDF FILENAME */}
        <div className="space-y-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
            <Edit3 className="w-3.5 h-3.5 text-slate-400" />
            PDF Filename
          </label>
          <div className="relative flex items-center">
            <input
              type="text"
              id="pdf-filename-input"
              value={settings.filename.replace(/\.pdf$/i, '')}
              onChange={(e) => updateSetting('filename', `${e.target.value.trim() || 'images-to-pdf'}.pdf`)}
              placeholder="images-to-pdf"
              className="w-full pl-3 pr-12 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500 font-medium text-slate-800"
            />
            <span className="absolute right-3 text-xs font-semibold text-slate-400 select-none">
              .pdf
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
