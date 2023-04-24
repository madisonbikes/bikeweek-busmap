/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CONFIGURATION: string;
  readonly VITE_CONFIGURATION_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
