import React, { useMemo } from 'react';
import { createAdIframeSrcDoc } from '../../utils/adRenderer';

interface AdNativeProps {
  className?: string;
  slotId?: string;
}

/**
 * Responsive native content ad container.
 * Safely isolated via iframe srcDoc to prevent DOM appendChild SyntaxErrors.
 */
export const AdNative: React.FC<AdNativeProps> = ({ className = '', slotId = 'native-feed' }) => {
  const nativeCode = import.meta.env.VITE_ADSTERRA_NATIVE_CODE;

  const srcDoc = useMemo(() => {
    if (!nativeCode || nativeCode.trim() === '') return '';
    return createAdIframeSrcDoc(nativeCode, 140);
  }, [nativeCode]);

  if (!nativeCode || nativeCode.trim() === '' || !srcDoc) {
    return null;
  }

  return (
    <div
      id={slotId}
      className={`w-full max-w-4xl mx-auto my-6 p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col items-center justify-center overflow-hidden ${className}`}
      aria-label="Partner Content"
    >
      <span className="text-[10px] uppercase tracking-wider text-slate-400 mb-2 self-start">Sponsored</span>
      <iframe
        title="Native Advertisement"
        srcDoc={srcDoc}
        className="w-full border-0 overflow-hidden min-h-[120px]"
        sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
        loading="lazy"
      />
    </div>
  );
};
