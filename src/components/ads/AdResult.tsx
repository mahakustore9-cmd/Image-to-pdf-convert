import React, { useEffect, useRef } from 'react';
import { injectAdCode } from '../../utils/adLoader';

interface AdResultProps {
  className?: string;
  slotId?: string;
}

/**
 * High CTR ad container displayed on the PDF Ready / Download screen.
 */
export const AdResult: React.FC<AdResultProps> = ({ className = '', slotId = 'ad-result-download' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const resultCode = import.meta.env.VITE_ADSTERRA_RESULT_CODE;

  useEffect(() => {
    if (!resultCode || !containerRef.current) return;
    injectAdCode(containerRef.current, resultCode);
  }, [resultCode]);

  if (!resultCode || resultCode.trim() === '') {
    return null;
  }

  return (
    <div
      id={slotId}
      className={`w-full max-w-xl mx-auto my-4 p-3 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col items-center justify-center overflow-hidden ${className}`}
      aria-label="Sponsored Content"
    >
      <span className="text-[10px] uppercase tracking-wider text-slate-400 mb-1.5 self-center">Sponsored</span>
      <div ref={containerRef} className="w-full min-h-[90px] flex items-center justify-center" />
    </div>
  );
};
