import React, { useEffect, useRef } from 'react';
import { injectAdCode } from '../../utils/adLoader';

interface AdNativeProps {
  className?: string;
  slotId?: string;
}

/**
 * Responsive native content ad container for Adsterra integration.
 * If VITE_ADSTERRA_NATIVE_CODE is not provided, renders cleanly without broken frames or layout shifts.
 */
export const AdNative: React.FC<AdNativeProps> = ({ className = '', slotId = 'native-feed' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const nativeCode = import.meta.env.VITE_ADSTERRA_NATIVE_CODE;

  useEffect(() => {
    if (!nativeCode || !containerRef.current) return;
    injectAdCode(containerRef.current, nativeCode);
  }, [nativeCode]);

  if (!nativeCode || nativeCode.trim() === '') {
    return null;
  }

  return (
    <div
      id={slotId}
      className={`w-full max-w-4xl mx-auto my-6 p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col items-center justify-center overflow-hidden ${className}`}
      aria-label="Partner Content"
    >
      <span className="text-[10px] uppercase tracking-wider text-slate-400 mb-2 self-start">Sponsored</span>
      <div ref={containerRef} className="w-full min-h-[120px] flex items-center justify-center" />
    </div>
  );
};
