import React, { useMemo } from 'react';
import { createAdIframeSrcDoc } from '../../utils/adRenderer';

interface AdFooterProps {
  className?: string;
  slotId?: string;
}

/**
 * Responsive footer ad container.
 * Safely isolated via iframe srcDoc.
 */
export const AdFooter: React.FC<AdFooterProps> = ({ className = '', slotId = 'ad-footer-bottom' }) => {
  const bannerCode = import.meta.env.VITE_ADSTERRA_BANNER_CODE;

  const srcDoc = useMemo(() => {
    if (!bannerCode || bannerCode.trim() === '') return '';
    return createAdIframeSrcDoc(bannerCode, 90);
  }, [bannerCode]);

  if (!bannerCode || bannerCode.trim() === '' || !srcDoc) {
    return null;
  }

  return (
    <div
      id={slotId}
      className={`w-full max-w-4xl mx-auto mt-8 mb-4 flex flex-col items-center justify-center ${className}`}
      aria-label="Partner Advertisement"
    >
      <span className="text-[10px] uppercase tracking-wider text-slate-400 mb-1">Advertisement</span>
      <iframe
        title="Footer Advertisement"
        srcDoc={srcDoc}
        className="w-full border-0 overflow-hidden min-h-[60px] sm:min-h-[90px]"
        sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
        loading="lazy"
      />
    </div>
  );
};
