import React, { useEffect, useRef, useState } from 'react';
import { injectAdCode } from '../../utils/adLoader';
import { X } from 'lucide-react';

interface AdStickyBottomProps {
  slotId?: string;
}

/**
 * Mobile and desktop sticky bottom floating banner ad.
 * Can be closed by the user to avoid obstructing view.
 */
export const AdStickyBottom: React.FC<AdStickyBottomProps> = ({ slotId = 'ad-sticky-bottom' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDismissed, setIsDismissed] = useState(false);
  const stickyCode = import.meta.env.VITE_ADSTERRA_STICKY_BOTTOM_CODE;

  useEffect(() => {
    if (!stickyCode || isDismissed || !containerRef.current) return;
    injectAdCode(containerRef.current, stickyCode);
  }, [stickyCode, isDismissed]);

  if (!stickyCode || stickyCode.trim() === '' || isDismissed) {
    return null;
  }

  return (
    <div
      id={slotId}
      className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xs border-t border-slate-200 shadow-2xl px-2 py-1.5 flex flex-col items-center justify-center animate-in slide-in-from-bottom duration-300"
    >
      <div className="w-full max-w-4xl flex items-center justify-between px-2 mb-1">
        <span className="text-[9px] uppercase tracking-wider font-semibold text-slate-400">Advertisement</span>
        <button
          onClick={() => setIsDismissed(true)}
          className="p-1 text-slate-400 hover:text-slate-700 rounded-md hover:bg-slate-100 transition"
          aria-label="Close Advertisement"
          title="Close Ad"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
      <div ref={containerRef} className="w-full min-h-[50px] max-h-[100px] flex items-center justify-center overflow-hidden" />
    </div>
  );
};
