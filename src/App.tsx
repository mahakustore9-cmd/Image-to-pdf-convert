import React, { useState, useEffect, useCallback } from 'react';
import {
  ImageFileItem,
  PdfSettings,
  ConversionState,
  RouteMeta,
} from './types';
import { ROUTES_DATA } from './seo/routesData';
import { processSelectedFile } from './utils/imageProcessor';
import { generatePdfFromImages } from './utils/pdfGenerator';
import { sanitizePdfFilename } from './utils/formatters';

// UI Components
import { Navbar } from './components/Navbar';
import { ImageUploader } from './components/ImageUploader';
import { ImageGrid } from './components/ImageGrid';
import { PdfSettingsPanel } from './components/PdfSettingsPanel';
import { PdfActionBar } from './components/PdfActionBar';
import { SeoContentSection } from './components/SeoContentSection';
import { OtherToolsSection } from './components/OtherToolsSection';
import { Footer } from './components/Footer';

// Ad components
import { AdBanner } from './components/ads/AdBanner';
import { AdNative } from './components/ads/AdNative';
import { AdFooter } from './components/ads/AdFooter';

// Page components
import { AboutPage } from './components/pages/AboutPage';
import { PrivacyPage } from './components/pages/PrivacyPage';
import { TermsPage } from './components/pages/TermsPage';
import { ContactPage } from './components/pages/ContactPage';

import { ShieldCheck, Sparkles, AlertCircle } from 'lucide-react';

export default function App() {
  // Routing state
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const pathname = window.location.pathname;
      return ROUTES_DATA[pathname] || ['/about', '/privacy', '/terms', '/contact'].includes(pathname)
        ? pathname
        : '/';
    }
    return '/';
  });

  // Images state
  const [images, setImages] = useState<ImageFileItem[]>([]);
  const [appError, setAppError] = useState<string | null>(null);

  // PDF Settings state
  const [settings, setSettings] = useState<PdfSettings>({
    pageSize: 'a4',
    orientation: 'auto',
    margin: 'none',
    imageFit: 'fit',
    imageQuality: 'high',
    filename: 'images-to-pdf.pdf',
  });

  // Conversion State
  const [conversionState, setConversionState] = useState<ConversionState>({
    status: 'idle',
    progressPercentage: 0,
    currentStep: 0,
    totalSteps: 0,
    currentFileName: '',
    pdfBlob: null,
    pdfBlobUrl: null,
    pdfFileSize: 0,
    pageCount: 0,
    errorMessage: null,
  });

  // Handle URL change & SEO Meta update
  const navigate = useCallback((path: string) => {
    setCurrentPath(path);
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  // Popstate event for back/forward browser buttons
  useEffect(() => {
    const handlePopState = () => {
      const pathname = window.location.pathname;
      setCurrentPath(ROUTES_DATA[pathname] || ['/about', '/privacy', '/terms', '/contact'].includes(pathname) ? pathname : '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Update Dynamic SEO Tags and Structured Data
  useEffect(() => {
    const currentMeta: RouteMeta = ROUTES_DATA[currentPath] || ROUTES_DATA['/'];
    document.title = currentMeta.title;

    // Update Meta Description
    let descTag = document.querySelector('meta[name="description"]');
    if (!descTag) {
      descTag = document.createElement('meta');
      descTag.setAttribute('name', 'description');
      document.head.appendChild(descTag);
    }
    descTag.setAttribute('content', currentMeta.metaDescription);

    // Update Canonical URL
    let canonicalTag = document.querySelector('link[rel="canonical"]');
    if (!canonicalTag) {
      canonicalTag = document.createElement('link');
      canonicalTag.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalTag);
    }
    canonicalTag.setAttribute('href', `https://image-to-pdf-converter.vercel.app${currentPath}`);

    // Update or Insert JSON-LD Structured Data
    const jsonLdId = 'structured-data-jsonld';
    let scriptTag = document.getElementById(jsonLdId) as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = jsonLdId;
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }

    const structuredData = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebApplication',
          'name': 'Image to PDF Converter',
          'url': `https://image-to-pdf-converter.vercel.app${currentPath}`,
          'description': currentMeta.metaDescription,
          'applicationCategory': 'UtilitiesApplication',
          'operatingSystem': 'All',
          'offers': {
            '@type': 'Offer',
            'price': '0',
            'priceCurrency': 'USD',
          },
          'featureList': [
            'Client-side image to PDF conversion',
            'Support for JPG, PNG, WEBP',
            'Reorder pages with drag and drop',
            'A4, US Letter, and Original sizing',
            '100% device-side privacy',
          ],
        },
        {
          '@type': 'FAQPage',
          'mainEntity': currentMeta.faqs.map((faq) => ({
            '@type': 'Question',
            'name': faq.question,
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': faq.answer,
            },
          })),
        },
        {
          '@type': 'BreadcrumbList',
          'itemListElement': [
            {
              '@type': 'ListItem',
              'position': 1,
              'name': 'Home',
              'item': 'https://image-to-pdf-converter.vercel.app/',
            },
            ...(currentPath !== '/'
              ? [
                  {
                    '@type': 'ListItem',
                    'position': 2,
                    'name': currentMeta.h1,
                    'item': `https://image-to-pdf-converter.vercel.app${currentPath}`,
                  },
                ]
              : []),
          ],
        },
      ],
    };

    scriptTag.text = JSON.stringify(structuredData);
  }, [currentPath]);

  // Handle incoming file selection
  const handleFilesSelected = async (newFiles: File[]) => {
    setAppError(null);
    if (!newFiles || newFiles.length === 0) return;

    try {
      const processedPromises = newFiles.map((file) => processSelectedFile(file));
      const processedItems = await Promise.all(processedPromises);

      setImages((prev) => [...prev, ...processedItems]);

      // Reset conversion state when new images are added
      if (conversionState.status === 'success') {
        setConversionState((prev) => ({
          ...prev,
          status: 'idle',
          pdfBlob: null,
          pdfBlobUrl: null,
        }));
      }
    } catch (err) {
      console.error('File processing error:', err);
      setAppError(err instanceof Error ? err.message : 'Unable to process selected images. Please try another file.');
    }
  };

  // Handle Clear All
  const handleClearAll = () => {
    // Revoke old object URLs to avoid memory leaks
    images.forEach((img) => URL.revokeObjectURL(img.previewUrl));
    if (conversionState.pdfBlobUrl) {
      URL.revokeObjectURL(conversionState.pdfBlobUrl);
    }
    setImages([]);
    setConversionState({
      status: 'idle',
      progressPercentage: 0,
      currentStep: 0,
      totalSteps: 0,
      currentFileName: '',
      pdfBlob: null,
      pdfBlobUrl: null,
      pdfFileSize: 0,
      pageCount: 0,
      errorMessage: null,
    });
    setAppError(null);
  };

  // Handle PDF Generation
  const handleGeneratePdf = async () => {
    if (images.length === 0) {
      setAppError('No images selected. Please choose at least one image.');
      return;
    }

    setAppError(null);
    setConversionState({
      status: 'processing',
      progressPercentage: 5,
      currentStep: 1,
      totalSteps: images.length,
      currentFileName: images[0]?.name || '',
      pdfBlob: null,
      pdfBlobUrl: null,
      pdfFileSize: 0,
      pageCount: images.length,
      errorMessage: null,
    });

    try {
      const cleanFilename = sanitizePdfFilename(settings.filename);
      const result = await generatePdfFromImages(
        images,
        { ...settings, filename: cleanFilename },
        (currentStep, totalSteps, currentFileName, percentage) => {
          setConversionState((prev) => ({
            ...prev,
            currentStep,
            totalSteps,
            currentFileName,
            progressPercentage: percentage,
          }));
        }
      );

      setConversionState({
        status: 'success',
        progressPercentage: 100,
        currentStep: images.length,
        totalSteps: images.length,
        currentFileName: '',
        pdfBlob: result.blob,
        pdfBlobUrl: result.url,
        pdfFileSize: result.size,
        pageCount: result.pageCount,
        errorMessage: null,
      });
    } catch (err) {
      console.error('PDF Generation Error:', err);
      const msg =
        err instanceof Error
          ? err.message
          : 'Your browser encountered an issue compiling the PDF. Try with fewer or smaller images.';
      setConversionState((prev) => ({
        ...prev,
        status: 'error',
        errorMessage: msg,
      }));
    }
  };

  // Reset conversion to idle
  const handleResetConversion = () => {
    if (conversionState.pdfBlobUrl) {
      URL.revokeObjectURL(conversionState.pdfBlobUrl);
    }
    setConversionState((prev) => ({
      ...prev,
      status: 'idle',
      pdfBlob: null,
      pdfBlobUrl: null,
    }));
  };

  // Check if viewing a standalone informational sub-page
  const renderSubPage = () => {
    switch (currentPath) {
      case '/about':
        return <AboutPage onBack={() => navigate('/')} />;
      case '/privacy':
        return <PrivacyPage onBack={() => navigate('/')} />;
      case '/terms':
        return <TermsPage onBack={() => navigate('/')} />;
      case '/contact':
        return <ContactPage onBack={() => navigate('/')} />;
      default:
        return null;
    }
  };

  const currentRouteMeta = ROUTES_DATA[currentPath] || ROUTES_DATA['/'];
  const isSubPage = ['/about', '/privacy', '/terms', '/contact'].includes(currentPath);

  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col font-sans text-slate-900 selection:bg-blue-100 selection:text-blue-900">
      {/* Top Header */}
      <Navbar currentPath={currentPath} onNavigate={navigate} />

      {/* Main Container */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8 sm:space-y-12">
        {isSubPage ? (
          renderSubPage()
        ) : (
          <>
            {/* HERO SECTION */}
            <section className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-semibold shadow-2xs">
                <Sparkles className="w-3.5 h-3.5" />
                <span>100% Free & Unlimited Client-Side Converter</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight sm:leading-tight">
                {currentRouteMeta.h1}
              </h1>

              <p className="text-sm sm:text-base md:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
                {currentRouteMeta.subtitle}
              </p>
            </section>

            {/* ADSTERRA TOP BANNER (Safe: renders nothing if env not configured) */}
            <AdBanner slotId="ad-top-hero" />

            {/* ERROR NOTIFICATION */}
            {appError && (
              <div
                id="global-app-error"
                className="max-w-4xl mx-auto bg-red-50 border border-red-200 p-4 rounded-xl flex items-start gap-3 text-sm text-red-800 animate-in fade-in"
              >
                <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="font-semibold">{appError}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setAppError(null)}
                  className="text-xs font-bold text-red-600 hover:text-red-800 px-2 py-1"
                >
                  Dismiss
                </button>
              </div>
            )}

            {/* MAIN CONVERTER CARD CONTAINER */}
            <div
              id="main-converter-card"
              className="w-full max-w-4xl mx-auto bg-white rounded-3xl border border-slate-200/90 shadow-xl shadow-slate-200/50 p-4 sm:p-8 space-y-6 sm:space-y-8"
            >
              {/* STEP 1: UPLOAD AREA (When no images selected) */}
              {images.length === 0 && (
                <ImageUploader
                  onFilesSelected={handleFilesSelected}
                  acceptedFormatsText={currentRouteMeta.acceptedFormatsText}
                  isProcessing={conversionState.status === 'processing'}
                />
              )}

              {/* STEP 2: IMAGE LIST & REORDERING (When images are selected) */}
              {images.length > 0 && (
                <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-200">
                  <ImageGrid
                    images={images}
                    onImagesChange={setImages}
                    onAddMoreFiles={handleFilesSelected}
                    onClearAll={handleClearAll}
                  />

                  {/* STEP 3: SETTINGS PANEL */}
                  <PdfSettingsPanel settings={settings} onSettingsChange={setSettings} />

                  {/* STEP 4 & 5: ACTION BAR / PROGRESS / SUCCESS DOWNLOAD */}
                  <PdfActionBar
                    imageCount={images.length}
                    conversionState={conversionState}
                    onGeneratePdf={handleGeneratePdf}
                    onReset={handleResetConversion}
                    filename={settings.filename}
                  />
                </div>
              )}
            </div>

            {/* ADSTERRA NATIVE AD (Mid-content) */}
            <AdNative slotId="ad-native-middle" />

            {/* SEO RICH CONTENT & FAQ ACCORDION */}
            <SeoContentSection meta={currentRouteMeta} onNavigate={navigate} />

            {/* OTHER TOOLS SECTION */}
            <OtherToolsSection onNavigate={navigate} />

            {/* ADSTERRA FOOTER AD */}
            <AdFooter slotId="ad-bottom-footer" />
          </>
        )}
      </main>

      {/* Global Footer */}
      <Footer onNavigate={navigate} />
    </div>
  );
}
