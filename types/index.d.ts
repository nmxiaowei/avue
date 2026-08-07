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

export interface AvueOptionWarning {
  path: string;
  message: string;
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
  optionValidate?: boolean;
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
  validateOption(option?: AnyRecord, component?: string): AvueOptionWarning[];
  warnOption(warnings?: AvueOptionWarning[], component?: string): void;
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
  Captcha: Component;
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
  Iframe: Component;
  Input: Component;
  InputColor: Component;
  InputCron: Component;
  InputIcon: Component;
  InputMap: Component;
  InputNumber: Component;
  InputOtp: Component;
  InputTable: Component;
  InputTag: Component;
  InputTree: Component;
  License: Component;
  Login: Component;
  Mention: Component;
  Radio: Component;
  Rate: Component;
  QRCode: Component;
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

export const version: string;
export const locale: AvueLocale;
export function install(app: App, options?: AvueInstallOptions): void;
export const $DialogForm: AvueDialogFormFactory;
export const $ImagePreview: AvueImagePreviewFactory;
export const $Export: any;
export const $Print: any;
export const $Clipboard: ({ text }: { text: string }) => Promise<void>;
export const $Watermark: any;
export const $Log: any;
export const $Screenshot: (doc: HTMLElement, option?: AnyRecord) => any;
export const deepClone: AvueUtilityExports["deepClone"];
export const dataURLtoFile: AvueUtilityExports["dataURLtoFile"];
export const isJson: AvueUtilityExports["isJson"];
export const setPx: AvueUtilityExports["setPx"];
export const validData: AvueUtilityExports["validData"];
export const findArray: AvueUtilityExports["findArray"];
export const findNode: AvueUtilityExports["findNode"];
export const validatenull: AvueUtilityExports["validatenull"];
export const downFile: AvueUtilityExports["downFile"];
export const loadScript: AvueUtilityExports["loadScript"];
export const findObject: AvueUtilityExports["findObject"];
export const randomId: AvueUtilityExports["randomId"];
export const validateOption: AvueUtilityExports["validateOption"];
export const warnOption: AvueUtilityExports["warnOption"];
export const Arrays: Component;
export const Article: Component;
export const Card: Component;
export const Captcha: Component;
export const Cascader: Component;
export const Chat: Component;
export const Checkbox: Component;
export const Comment: Component;
export const CountUp: Component;
export const Crud: Component;
export const DataBox: Component;
export const DataCard: Component;
export const DataCardText: Component;
export const DataCountdown: Component;
export const DataDashboard: Component;
export const DataDisplay: Component;
export const DataIcons: Component;
export const DataImgText: Component;
export const DataList: Component;
export const DataNotice: Component;
export const DataOperaText: Component;
export const DataPanel: Component;
export const DataPay: Component;
export const DataPrice: Component;
export const DataProduct: Component;
export const DataProfile: Component;
export const DataProgress: Component;
export const DataRank: Component;
export const DataRotate: Component;
export const DataStatistic: Component;
export const DataTabs: Component;
export const DataTask: Component;
export const DataWeather: Component;
export const Date: Component;
export const Draggable: Component;
export const Dynamic: Component;
export const Flow: Component;
export const Form: Component;
export const Group: Component;
export const Iframe: Component;
export const Input: Component;
export const InputColor: Component;
export const InputCron: Component;
export const InputIcon: Component;
export const InputMap: Component;
export const InputNumber: Component;
export const InputOtp: Component;
export const InputTable: Component;
export const InputTag: Component;
export const InputTree: Component;
export const License: Component;
export const Login: Component;
export const Mention: Component;
export const Radio: Component;
export const Rate: Component;
export const QRCode: Component;
export const Search: Component;
export const Select: Component;
export const Sign: Component;
export const Slider: Component;
export const Switchs: Component;
export const Tabs: Component;
export const Time: Component;
export const Title: Component;
export const Tree: Component;
export const Upload: Component;
export const Verifys: Component;
export const Video: Component;
export const textEllipsis: Component;
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
