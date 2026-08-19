import React, { useEffect, useRef } from 'react';
import { injectAdCode } from '../../utils/adLoader';

interface AdSidebarProps {
  position?: 'left' | 'right';
  slotId?: string;
}

/**
 * Desktop floating sidebar skyscraper banner (160x600 or 300x250).
 * Hidden automatically on tablet/mobile screens.
 */
export const AdSidebar: React.FC<AdSidebarProps> = ({ position = 'right', slotId = 'ad-sidebar' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sidebarCode = import.meta.env.VITE_ADSTERRA_SIDEBAR_CODE;

  useEffect(() => {
    if (!sidebarCode || !containerRef.current) return;
    injectAdCode(containerRef.current, sidebarCode);
  }, [sidebarCode]);

  if (!sidebarCode || sidebarCode.trim() === '') {
    return null;
  }

  const sideClasses = position === 'left' ? 'left-2 xl:left-6' : 'right-2 xl:right-6';

  return (
    <aside
      id={`${slotId}-${position}`}
      className={`hidden 2xl:flex fixed top-28 ${sideClasses} z-20 w-[160px] min-h-[600px] flex-col items-center justify-start bg-slate-50 border border-slate-200/70 rounded-2xl p-2 shadow-sm`}
      aria-label="Sidebar Advertisement"
    >
      <span className="text-[9px] uppercase tracking-wider text-slate-400 mb-2">Advertisement</span>
      <div ref={containerRef} className="w-full flex items-center justify-center" />
    </aside>
  );
};
