import React, { useMemo } from 'react';
import { createAdIframeSrcDoc } from '../../utils/adRenderer';

interface AdSidebarProps {
  position?: 'left' | 'right';
  slotId?: string;
}

/**
 * Desktop floating sidebar skyscraper banner (160x600).
 * Safely isolated via iframe srcDoc.
 */
export const AdSidebar: React.FC<AdSidebarProps> = ({ position = 'right', slotId = 'ad-sidebar' }) => {
  const sidebarCode = import.meta.env.VITE_ADSTERRA_SIDEBAR_CODE;

  const srcDoc = useMemo(() => {
    if (!sidebarCode || sidebarCode.trim() === '') return '';
    return createAdIframeSrcDoc(sidebarCode, 600);
  }, [sidebarCode]);

  if (!sidebarCode || sidebarCode.trim() === '' || !srcDoc) {
    return null;
  }

  const sideClasses = position === 'left' ? 'left-2 xl:left-6' : 'right-2 xl:right-6';

  return (
    <aside
      id={`${slotId}-${position}`}
      className={`hidden 2xl:flex fixed top-28 ${sideClasses} z-20 w-[160px] min-h-[600px] flex-col items-center justify-start bg-slate-50 border border-slate-200/70 rounded-2xl p-2 shadow-xs`}
      aria-label="Sidebar Advertisement"
    >
      <span className="text-[9px] uppercase tracking-wider text-slate-400 mb-2">Advertisement</span>
      <iframe
        title="Sidebar Advertisement"
        srcDoc={srcDoc}
        className="w-full border-0 overflow-hidden min-h-[600px]"
        sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
        loading="lazy"
      />
    </aside>
  );
};
