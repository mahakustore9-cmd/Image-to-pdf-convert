import React, { useMemo } from 'react';
import { createAdIframeSrcDoc } from '../../utils/adRenderer';

interface AdBannerProps {
  className?: string;
  slotId?: string;
}

/**
 * Responsive banner ad container.
 * Safely isolated via iframe srcDoc to prevent DOM appendChild SyntaxErrors.
 */
export const AdBanner: React.FC<AdBannerProps> = ({ className = '', slotId = 'banner-top' }) => {
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
      className={`w-full max-w-4xl mx-auto my-4 flex flex-col items-center justify-center overflow-hidden transition-all ${className}`}
      aria-label="Advertisement"
    >
      <span className="text-[10px] uppercase tracking-wider text-slate-400 mb-1">Sponsored Advertisement</span>
      <iframe
        title="Banner Advertisement"
        srcDoc={srcDoc}
        className="w-full border-0 overflow-hidden min-h-[60px] sm:min-h-[90px]"
        sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
        loading="lazy"
      />
    </div>
  );
};
