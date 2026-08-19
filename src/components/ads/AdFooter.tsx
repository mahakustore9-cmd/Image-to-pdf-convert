import React, { useEffect, useRef } from 'react';

interface AdFooterProps {
  className?: string;
  slotId?: string;
}

/**
 * Responsive footer ad container for Adsterra integration.
 */
export const AdFooter: React.FC<AdFooterProps> = ({ className = '', slotId = 'ad-footer-bottom' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const bannerCode = import.meta.env.VITE_ADSTERRA_BANNER_CODE;

  useEffect(() => {
    if (!bannerCode || !containerRef.current) return;

    try {
      containerRef.current.innerHTML = '';
      const scriptTag = document.createElement('script');
      scriptTag.type = 'text/javascript';
      scriptTag.text = bannerCode;
      containerRef.current.appendChild(scriptTag);
    } catch (e) {
      console.warn('Adsterra footer ad initialization skipped:', e);
    }
  }, [bannerCode]);

  if (!bannerCode || bannerCode.trim() === '') {
    return null;
  }

  return (
    <div
      id={slotId}
      className={`w-full max-w-4xl mx-auto mt-8 mb-4 flex flex-col items-center justify-center ${className}`}
      aria-label="Partner Advertisement"
    >
      <span className="text-[10px] uppercase tracking-wider text-slate-400 mb-1">Advertisement</span>
      <div ref={containerRef} className="w-full min-h-[50px] flex items-center justify-center" />
    </div>
  );
};
