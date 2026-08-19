import React, { useEffect, useRef } from 'react';

interface AdBannerProps {
  className?: string;
  slotId?: string;
}

/**
 * Responsive banner ad container for Adsterra integration.
 * If VITE_ADSTERRA_BANNER_CODE is not provided, renders cleanly without broken frames or empty boxes.
 */
export const AdBanner: React.FC<AdBannerProps> = ({ className = '', slotId = 'banner-top' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const bannerCode = import.meta.env.VITE_ADSTERRA_BANNER_CODE;

  useEffect(() => {
    if (!bannerCode || !containerRef.current) return;

    try {
      // Clean previous injections
      containerRef.current.innerHTML = '';
      const scriptTag = document.createElement('script');
      scriptTag.type = 'text/javascript';
      scriptTag.text = bannerCode;
      containerRef.current.appendChild(scriptTag);
    } catch (e) {
      console.warn('Adsterra banner initialization skipped:', e);
    }
  }, [bannerCode]);

  // Gracefully render nothing if no ad script/code is configured
  if (!bannerCode || bannerCode.trim() === '') {
    return null;
  }

  return (
    <div
      id={slotId}
      className={`w-full max-w-4xl mx-auto my-4 flex flex-col items-center justify-center overflow-hidden transition-all ${className}`}
      aria-label="Advertisement"
    >
      <span className="text-[10px] uppercase tracking-wider text-slate-400 mb-1">Sponsored Advertisement</span>
      <div ref={containerRef} className="w-full min-h-[50px] md:min-h-[90px] flex items-center justify-center" />
    </div>
  );
};
