/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ADSTERRA_BANNER_CODE?: string;
  readonly VITE_ADSTERRA_NATIVE_CODE?: string;
  readonly VITE_ADSTERRA_RESULT_CODE?: string;
  readonly VITE_ADSTERRA_STICKY_BOTTOM_CODE?: string;
  readonly VITE_ADSTERRA_SIDEBAR_CODE?: string;
  readonly VITE_ADSTERRA_SOCIAL_BAR_CODE?: string;
  readonly VITE_ADSTERRA_POPUNDER_CODE?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
