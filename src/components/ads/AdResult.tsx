import React, { useMemo } from 'react';
import { createAdIframeSrcDoc } from '../../utils/adRenderer';

interface AdResultProps {
  className?: string;
  slotId?: string;
}

/**
 * High CTR ad container displayed on the PDF Ready / Download screen.
 * Safely isolated via iframe srcDoc.
 */
export const AdResult: React.FC<AdResultProps> = ({ className = '', slotId = 'ad-result-download' }) => {
  const resultCode = import.meta.env.VITE_ADSTERRA_RESULT_CODE;

  const srcDoc = useMemo(() => {
    if (!resultCode || resultCode.trim() === '') return '';
    return createAdIframeSrcDoc(resultCode, 100);
  }, [resultCode]);

  if (!resultCode || resultCode.trim() === '' || !srcDoc) {
    return null;
  }

  return (
    <div
      id={slotId}
      className={`w-full max-w-xl mx-auto my-4 p-3 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col items-center justify-center overflow-hidden ${className}`}
      aria-label="Sponsored Content"
    >
      <span className="text-[10px] uppercase tracking-wider text-slate-400 mb-1.5 self-center">Sponsored</span>
      <iframe
        title="Result Advertisement"
        srcDoc={srcDoc}
        className="w-full border-0 overflow-hidden min-h-[90px]"
        sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
        loading="lazy"
      />
    </div>
  );
};
