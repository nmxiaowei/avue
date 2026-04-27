import type { App, Component, Plugin } from "vue";

type AnyRecord = Record<string, any>;

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

export type AvueLocaleInput = string | AvueLocaleMessages | null | undefined;

export type AvueTranslateHandler = (
  this: any,
  path: string,
  options?: any,
  locale?: AvueLocaleMessages
) => unknown;

export interface AvueLocale {
  register(code: string, locale: AvueLocaleMessages, aliases?: string[]): AvueLocaleMessages;
  use(locale?: AvueLocaleInput, override?: AvueLocaleMessages): AvueLocaleMessages;
  t(path: string, options?: any): any;
  i18n(handler?: AvueTranslateHandler | null): AvueTranslateHandler | null;
  getLocale(code?: string): AvueLocaleMessages;
  getLocaleCode(): string;
}

export interface AvueInstallOptions {
  size?: string;
  calcHeight?: number;
  menuType?: string;
  formOption?: AnyRecord;
  crudOption?: AnyRecord;
  appendToBody?: boolean;
  canvas?: AvueCanvasOptions;
  qiniu?: AvueQiniuOptions;
  ali?: AvueAliOptions;
  locale?: string | AvueLocaleMessages;
  i18n?: any;
  axios?: any;
  [key: string]: any;
}

export interface AvueUtilityExports {
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
  findNode<T = AnyRecord>(
    list?: T[],
    props?: AnyRecord,
    value?: any
  ): T | undefined;
  validatenull(value: any): boolean;
  downFile(url: string | Blob, saveName?: string): void;
  loadScript(type?: "js" | "css", url?: string, dom?: "head" | "body"): Promise<void>;
  findObject<T = AnyRecord>(list?: T[], value?: any, prop?: string): T | undefined;
  randomId(): string;
}

export type AvueDialogFormOpener = (opt?: AnyRecord) => any;
export type AvueDialogFormFactory = (context: any) => AvueDialogFormOpener;

export type AvueImagePreviewOpener = (
  datas?: any[],
  index?: number,
  ops?: AnyRecord
) => any;
export type AvueImagePreviewFactory = (context: any) => AvueImagePreviewOpener;

export interface AvuePluginExports extends AvueUtilityExports {
  $DialogForm: AvueDialogFormFactory;
  $ImagePreview: AvueImagePreviewFactory;
  $Export: any;
  $Print: any;
  $Clipboard: ({ text }: { text: string }) => Promise<void>;
  $Watermark: any;
  $Log: any;
  $Screenshot: (doc: HTMLElement, option?: AnyRecord) => any;
}

export interface AvueComponentExports {
  Arrays: Component;
  Article: Component;
  Card: Component;
  Cascader: Component;
  Chat: Component;
  Checkbox: Component;
  Comment: Component;
  CountUp: Component;
  Crud: Component;
  DataBox: Component;
  DataCard: Component;
  DataCardText: Component;
  DataCountdown: Component;
  DataDashboard: Component;
  DataDisplay: Component;
  DataIcons: Component;
  DataImgText: Component;
  DataList: Component;
  DataNotice: Component;
  DataOperaText: Component;
  DataPanel: Component;
  DataPay: Component;
  DataPrice: Component;
  DataProduct: Component;
  DataProfile: Component;
  DataProgress: Component;
  DataRank: Component;
  DataRotate: Component;
  DataStatistic: Component;
  DataTabs: Component;
  DataTask: Component;
  DataWeather: Component;
  Date: Component;
  Draggable: Component;
  Dynamic: Component;
  Flow: Component;
  Form: Component;
  Group: Component;
  Input: Component;
  InputColor: Component;
  InputCron: Component;
  InputIcon: Component;
  InputMap: Component;
  InputNumber: Component;
  InputTable: Component;
  InputTag: Component;
  InputTree: Component;
  License: Component;
  Login: Component;
  Mention: Component;
  Radio: Component;
  Rate: Component;
  Search: Component;
  Select: Component;
  Sign: Component;
  Slider: Component;
  Switchs: Component;
  Tabs: Component;
  Time: Component;
  Title: Component;
  Tree: Component;
  Upload: Component;
  Verifys: Component;
  Video: Component;
  textEllipsis: Component;
}

export interface AvuePlugin
  extends Plugin,
    AvueComponentExports,
    AvuePluginExports {
  version: string;
  locale: AvueLocale;
  install(app: App, options?: AvueInstallOptions): void;
}

declare const Avue: AvuePlugin;

export function install(app: App, options?: AvueInstallOptions): void;
export default Avue;

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties extends AvueUtilityExports {
    $AVUE: AnyRecord;
    $DialogForm: AvueDialogFormOpener;
    $ImagePreview: AvueImagePreviewOpener;
    $Export: any;
    $Print: any;
    $Clipboard: ({ text }: { text: string }) => Promise<void>;
    $Watermark: any;
    $Log: any;
    $Screenshot: (doc: HTMLElement, option?: AnyRecord) => any;
    $axios: any;
    $uploadFun: (column?: AnyRecord, safe?: any) => AnyRecord;
  }
}

export {};
