import type { App, Plugin } from "vue";

export interface AvueCanvasOptions {
  text?: string;
  fontFamily?: string;
  color?: string;
  fontSize?: number;
  opacity?: number;
  bottom?: number;
  right?: number;
  ratio?: number;
  [key: string]: any;
}

export interface AvueQiniuOptions {
  AK?: string;
  SK?: string;
  scope?: string;
  url?: string;
  bucket?: string;
  deadline?: number;
  [key: string]: any;
}

export interface AvueAliOptions {
  region?: string;
  endpoint?: string;
  stsToken?: string;
  accessKeyId?: string;
  accessKeySecret?: string;
  bucket?: string;
  [key: string]: any;
}

export type AvueLocalePrimitive = string | number | boolean;

export interface AvueLocaleMessages {
  [key: string]:
    | AvueLocalePrimitive
    | AvueLocaleMessages
    | Array<AvueLocalePrimitive | AvueLocaleMessages>;
}

export interface AvueLocale {
  register(code: string, locale: AvueLocaleMessages, aliases?: string[]): AvueLocaleMessages;
  use(locale?: string | AvueLocaleMessages, override?: AvueLocaleMessages): AvueLocaleMessages;
  t(path: string, options?: any): any;
  i18n(handler?: any): any;
  getLocale(code?: string): AvueLocaleMessages;
  getLocaleCode(): string;
}

export interface AvueInstallOptions {
  size?: string;
  calcHeight?: number;
  menuType?: string;
  formOption?: Record<string, any>;
  crudOption?: Record<string, any>;
  appendToBody?: boolean;
  canvas?: AvueCanvasOptions;
  qiniu?: AvueQiniuOptions;
  ali?: AvueAliOptions;
  locale?: string | AvueLocaleMessages;
  i18n?: any;
  axios?: any;
  [key: string]: any;
}

export interface AvuePlugin extends Plugin {
  version: string;
  locale: AvueLocale;
  install(app: App, options?: AvueInstallOptions): void;
  deepClone<T>(data: T): T;
  dataURLtoFile(dataurl: string, filename: string): File;
  isJson(value: any): boolean;
  setPx(value: string | number, defaultValue?: string | number): string;
  validData<T>(value: T, defaultValue: T): T;
  findArray<T = any>(
    list?: T[],
    value?: any,
    valueKey?: string,
    index?: boolean
  ): T | number | undefined;
  findNode<T = Record<string, any>>(
    list?: T[],
    props?: Record<string, any>,
    value?: any
  ): T | undefined;
  validatenull(value: any): boolean;
  downFile(url: string | Blob, saveName?: string): void;
  loadScript(type?: "js" | "css", url?: string, dom?: "head" | "body"): Promise<void>;
  findObject<T = Record<string, any>>(list?: T[], value?: any, prop?: string): T | undefined;
  randomId(): string;
  [key: string]: any;
}

declare const Avue: AvuePlugin;

export const version: string;
export const locale: AvueLocale;
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
    deepClone<T>(data: T): T;
    dataURLtoFile(dataurl: string, filename: string): File;
    isJson(value: any): boolean;
    setPx(value: string | number, defaultValue?: string | number): string;
    validData<T>(value: T, defaultValue: T): T;
    findArray<T = any>(
      list?: T[],
      value?: any,
      valueKey?: string,
      index?: boolean
    ): T | number | undefined;
    findNode<T = Record<string, any>>(
      list?: T[],
      props?: Record<string, any>,
      value?: any
    ): T | undefined;
    validatenull(value: any): boolean;
    downFile(url: string | Blob, saveName?: string): void;
    loadScript(type?: "js" | "css", url?: string, dom?: "head" | "body"): Promise<void>;
    findObject<T = Record<string, any>>(list?: T[], value?: any, prop?: string): T | undefined;
    randomId(): string;
    $uploadFun: (column?: Record<string, any>, safe?: any) => Record<string, any>;
  }
}

export {};
