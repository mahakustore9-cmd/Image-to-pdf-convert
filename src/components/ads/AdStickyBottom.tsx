import React, { useMemo, useState } from 'react';
import { createAdIframeSrcDoc } from '../../utils/adRenderer';
import { X } from 'lucide-react';

interface AdStickyBottomProps {
  slotId?: string;
}

/**
 * Mobile and desktop sticky bottom floating banner ad.
 * Safely isolated via iframe srcDoc.
 */
export const AdStickyBottom: React.FC<AdStickyBottomProps> = ({ slotId = 'ad-sticky-bottom' }) => {
  const [isDismissed, setIsDismissed] = useState(false);
  const stickyCode = import.meta.env.VITE_ADSTERRA_STICKY_BOTTOM_CODE;

  const srcDoc = useMemo(() => {
    if (!stickyCode || stickyCode.trim() === '') return '';
    return createAdIframeSrcDoc(stickyCode, 60);
  }, [stickyCode]);

  if (!stickyCode || stickyCode.trim() === '' || isDismissed || !srcDoc) {
    return null;
  }

  return (
    <div
      id={slotId}
      className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xs border-t border-slate-200 shadow-2xl px-2 py-1 flex flex-col items-center justify-center animate-in slide-in-from-bottom duration-300"
    >
      <div className="w-full max-w-4xl flex items-center justify-between px-2 mb-0.5">
        <span className="text-[9px] uppercase tracking-wider font-semibold text-slate-400">Advertisement</span>
        <button
          type="button"
          onClick={() => setIsDismissed(true)}
          className="p-1 text-slate-400 hover:text-slate-700 rounded-md hover:bg-slate-100 transition cursor-pointer"
          aria-label="Close Advertisement"
          title="Close Ad"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
      <iframe
        title="Sticky Bottom Advertisement"
        srcDoc={srcDoc}
        className="w-full border-0 overflow-hidden min-h-[50px] max-h-[90px]"
        sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
        loading="lazy"
      />
    </div>
  );
};
