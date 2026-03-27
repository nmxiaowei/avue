import type { App, Plugin } from "vue";

export interface AvueInstallOptions {
  size?: string;
  calcHeight?: number;
  menuType?: string;
  formOption?: Record<string, any>;
  crudOption?: Record<string, any>;
  appendToBody?: boolean;
  canvas?: Record<string, any>;
  qiniu?: Record<string, any>;
  ali?: Record<string, any>;
  locale?: any;
  i18n?: any;
  axios?: any;
  [key: string]: any;
}

export interface AvuePlugin extends Plugin {
  version: string;
  locale: any;
  install(app: App, options?: AvueInstallOptions): void;
  [key: string]: any;
}

declare const Avue: AvuePlugin;

export const version: string;
export const locale: any;
export function install(app: App, options?: AvueInstallOptions): void;
export default Avue;

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $AVUE: Record<string, any>;
    $DialogForm: any;
    $ImagePreview: any;
    $Export: any;
    $Print: any;
    $Clipboard: any;
    $Watermark: any;
    $Log: any;
    $Screenshot: any;
    $axios: any;
    $uploadFun: (column?: Record<string, any>, safe?: any) => Record<string, any>;
  }
}

export {};
