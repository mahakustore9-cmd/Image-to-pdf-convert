import React, { useEffect } from 'react';

/**
 * Injects Adsterra Social Bar and Popunder scripts safely into the document.
 */
export const AdSocialBar: React.FC = () => {
  const socialBarCode = import.meta.env.VITE_ADSTERRA_SOCIAL_BAR_CODE;
  const popunderCode = import.meta.env.VITE_ADSTERRA_POPUNDER_CODE;

  useEffect(() => {
    const loadScriptSafely = (code: string | undefined, id: string) => {
      if (!code || code.trim() === '') return;

      try {
        const trimmed = code.trim();
        // Check if an element already exists
        if (document.getElementById(id)) return;

        // If it's a direct URL or contains a src="..."
        const srcMatch = trimmed.match(/src=['"]([^'"]+)['"]/i);

        if (srcMatch && srcMatch[1]) {
          const script = document.createElement('script');
          script.id = id;
          script.type = 'text/javascript';
          script.src = srcMatch[1];
          script.async = true;
          document.head.appendChild(script);
        } else if (trimmed.startsWith('<script') && trimmed.endsWith('</script>')) {
          // Extract internal JS content safely
          const cleanJs = trimmed.replace(/^<script[^>]*>/i, '').replace(/<\/script>$/i, '').trim();
          if (cleanJs) {
            const script = document.createElement('script');
            script.id = id;
            script.type = 'text/javascript';
            script.text = cleanJs;
            document.head.appendChild(script);
          }
        }
      } catch (err) {
        console.warn(`Ad script ${id} initialization skipped safely:`, err);
      }
    };

    loadScriptSafely(socialBarCode, 'adsterra-social-bar');
    loadScriptSafely(popunderCode, 'adsterra-popunder');
  }, [socialBarCode, popunderCode]);

  return null;
};
