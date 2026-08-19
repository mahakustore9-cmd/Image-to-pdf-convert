import React from 'react';
import { FileText, Shield, Heart } from 'lucide-react';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="w-full bg-slate-900 text-slate-400 border-t border-slate-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Col 1: Brand & Privacy */}
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-xs">
                <FileText className="w-5 h-5" />
              </div>
              <span className="font-bold text-lg text-white tracking-tight">Image to PDF Converter</span>
            </div>
            <p className="text-sm text-slate-400 max-w-md leading-relaxed">
              Fast, secure, and free online tool that converts JPG, PNG, and WEBP images into high-resolution PDF documents. 100% processed locally in your browser with zero server uploads.
            </p>
            <div className="flex items-center gap-2 text-xs font-medium text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-3 py-1.5 rounded-lg w-fit">
              <Shield className="w-3.5 h-3.5" />
              <span>Strict Zero-Upload Client-Side Guarantee</span>
            </div>
          </div>

          {/* Col 2: Free Tools */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">Tools</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => onNavigate('/image-to-pdf')}
                  className="hover:text-white transition-colors"
                >
                  Image to PDF
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/jpg-to-pdf')}
                  className="hover:text-white transition-colors"
                >
                  JPG to PDF
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/png-to-pdf')}
                  className="hover:text-white transition-colors"
                >
                  PNG to PDF
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/photo-to-pdf')}
                  className="hover:text-white transition-colors"
                >
                  Photo to PDF
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/images-to-pdf')}
                  className="hover:text-white transition-colors"
                >
                  Batch Images to PDF
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Company & Legal */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">Company & Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => onNavigate('/about')}
                  className="hover:text-white transition-colors"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/contact')}
                  className="hover:text-white transition-colors"
                >
                  Contact & Support
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/privacy')}
                  className="hover:text-white transition-colors"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/terms')}
                  className="hover:text-white transition-colors"
                >
                  Terms of Service
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© 2026 Image to PDF Converter. All rights reserved.</p>
          <p className="flex items-center gap-1">
            <span>Powered by Client-Side Web Standards</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
