import React, { useState } from 'react';
import { FileText, Menu, X, Shield, Sparkles, ChevronDown } from 'lucide-react';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPath, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);

  const handleNavClick = (path: string) => {
    onNavigate(path);
    setMobileMenuOpen(false);
    setToolsDropdownOpen(false);
  };

  const navLinks = [
    { name: 'Image to PDF', path: '/image-to-pdf' },
    { name: 'JPG to PDF', path: '/jpg-to-pdf' },
    { name: 'PNG to PDF', path: '/png-to-pdf' },
    { name: 'Photo to PDF', path: '/photo-to-pdf' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <button
          id="nav-logo-btn"
          onClick={() => handleNavClick('/')}
          className="flex items-center gap-2.5 group text-left focus:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-600 rounded-lg p-1"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-lg text-slate-900 tracking-tight">Image to PDF</span>
              <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-blue-50 text-blue-700 border border-blue-200/60">
                PRO
              </span>
            </div>
            <p className="text-[11px] text-slate-500 hidden sm:block font-medium">100% Client-Side & Private</p>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = currentPath === link.path;
            return (
              <button
                key={link.path}
                onClick={() => handleNavClick(link.path)}
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                }`}
              >
                {link.name}
              </button>
            );
          })}

          {/* Other Tools Dropdown */}
          <div className="relative">
            <button
              onClick={() => setToolsDropdownOpen(!toolsDropdownOpen)}
              className="flex items-center gap-1 px-3.5 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100/70 transition-colors"
            >
              <span>Other Tools</span>
              <ChevronDown className="w-4 h-4 text-slate-400" />
            </button>

            {toolsDropdownOpen && (
              <div
                className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                onMouseLeave={() => setToolsDropdownOpen(false)}
              >
                <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Available Tools
                </div>
                <button
                  onClick={() => handleNavClick('/images-to-pdf')}
                  className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-700 flex items-center justify-between"
                >
                  <span>Batch Images to PDF</span>
                  <span className="text-[10px] bg-green-100 text-green-800 font-medium px-1.5 py-0.5 rounded">Active</span>
                </button>
                <div className="border-t border-slate-100 my-1"></div>
                <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Coming Soon
                </div>
                <div className="px-4 py-1.5 text-xs text-slate-400 flex items-center justify-between">
                  <span>PDF to JPG</span>
                  <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.2 rounded">Soon</span>
                </div>
                <div className="px-4 py-1.5 text-xs text-slate-400 flex items-center justify-between">
                  <span>Image Compressor</span>
                  <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.2 rounded">Soon</span>
                </div>
                <div className="px-4 py-1.5 text-xs text-slate-400 flex items-center justify-between">
                  <span>PDF Merger</span>
                  <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.2 rounded">Soon</span>
                </div>
              </div>
            )}
          </div>

          <button
            onClick={() => handleNavClick('/about')}
            className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
              currentPath === '/about'
                ? 'bg-blue-50 text-blue-700 font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
            }`}
          >
            About
          </button>
        </nav>

        {/* Right CTA / Privacy Badge */}
        <div className="hidden lg:flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-700 bg-emerald-50 px-2.5 py-1.5 rounded-full border border-emerald-200/60">
            <Shield className="w-3.5 h-3.5 text-emerald-600" />
            <span>No Cloud Uploads</span>
          </div>
          <button
            id="nav-quick-convert-btn"
            onClick={() => handleNavClick('/')}
            className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition shadow-xs"
          >
            <Sparkles className="w-4 h-4" />
            <span>Convert Now</span>
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            id="mobile-menu-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-hidden"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-1.5 shadow-lg animate-in slide-in-from-top duration-200">
          <div className="py-1">
            <span className="text-xs font-semibold uppercase text-slate-400 tracking-wider px-2">Navigation</span>
          </div>
          <button
            onClick={() => handleNavClick('/')}
            className={`w-full text-left px-3 py-2.5 rounded-lg text-base font-medium flex items-center justify-between ${
              currentPath === '/' ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <span>Home</span>
          </button>
          {navLinks.map((link) => (
            <button
              key={link.path}
              onClick={() => handleNavClick(link.path)}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-base font-medium flex items-center justify-between ${
                currentPath === link.path ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <span>{link.name}</span>
            </button>
          ))}
          <button
            onClick={() => handleNavClick('/images-to-pdf')}
            className={`w-full text-left px-3 py-2.5 rounded-lg text-base font-medium flex items-center justify-between ${
              currentPath === '/images-to-pdf' ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <span>Batch Images to PDF</span>
          </button>
          <button
            onClick={() => handleNavClick('/about')}
            className={`w-full text-left px-3 py-2.5 rounded-lg text-base font-medium ${
              currentPath === '/about' ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            About Us
          </button>
          <button
            onClick={() => handleNavClick('/privacy')}
            className={`w-full text-left px-3 py-2.5 rounded-lg text-base font-medium ${
              currentPath === '/privacy' ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            Privacy Policy
          </button>
          <div className="pt-2">
            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200/80 flex items-center gap-2 text-emerald-800 text-xs font-medium">
              <Shield className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>100% Private: Images are never sent to a server.</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
