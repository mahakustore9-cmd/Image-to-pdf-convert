import React, { useEffect } from 'react';
import { injectAdCode } from '../../utils/adLoader';

/**
 * Injects Adsterra Social Bar and Popunder scripts into the document head/body.
 * Social Bar is one of the highest CTR formats on utility websites.
 */
export const AdSocialBar: React.FC = () => {
  const socialBarCode = import.meta.env.VITE_ADSTERRA_SOCIAL_BAR_CODE;
  const popunderCode = import.meta.env.VITE_ADSTERRA_POPUNDER_CODE;

  useEffect(() => {
    if (socialBarCode && socialBarCode.trim() !== '') {
      const socialContainer = document.createElement('div');
      socialContainer.id = 'adsterra-social-bar-container';
      socialContainer.style.display = 'none';
      document.body.appendChild(socialContainer);
      injectAdCode(socialContainer, socialBarCode);
    }

    if (popunderCode && popunderCode.trim() !== '') {
      const popunderContainer = document.createElement('div');
      popunderContainer.id = 'adsterra-popunder-container';
      popunderContainer.style.display = 'none';
      document.body.appendChild(popunderContainer);
      injectAdCode(popunderContainer, popunderCode);
    }
  }, [socialBarCode, popunderCode]);

  return null;
};
