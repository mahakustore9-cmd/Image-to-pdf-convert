/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ADSTERRA_BANNER_CODE?: string;
  readonly VITE_ADSTERRA_NATIVE_CODE?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
