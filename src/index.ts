import type { App } from "vue";
import components from "./ui/index";
import { version } from "./version";
import axios from "axios";
import { validatenull } from "utils/validate";

import {
  randomId,
  deepClone,
  dataURLtoFile,
  findObject,
  validData,
  findArray,
  findNode,
  setPx,
  isJson,
  downFile,
  loadScript,
} from "utils/util";
import contextmenu from "packages/core/directive/contextmenu";
import $Export from "plugin/export/";
import $Watermark from "plugin/watermark/";
import $Log from "plugin/logs/";
import locale from "./locale/";
import $Screenshot from "plugin/screenshot/";
import $Clipboard from "plugin/clipboard/";
import $Print from "plugin/print/";
import $ImagePreview from "packages/core/components/image-preview/";
import $DialogForm from "packages/core/components/dialog-form/";
import createIcon from "./icon";

type AnyRecord = Record<string, any>;
type AppWithContext = App & { _context: any };
const UPLOAD_HOOK_KEYS = [
  "uploadPreview",
  "uploadBefore",
  "uploadAfter",
  "uploadDelete",
  "uploadError",
  "uploadExceed",
  "uploadSized",
] as const;

export interface AvueInstallOptions extends AnyRecord {
  size?: string;
  calcHeight?: number;
  menuType?: string;
  formOption?: AnyRecord;
  crudOption?: AnyRecord;
  appendToBody?: boolean;
  canvas?: AnyRecord;
  qiniu?: AnyRecord;
  ali?: AnyRecord;
  locale?: string | AnyRecord;
  i18n?: any;
  axios?: any;
}

const plugins: AnyRecord = {
  $DialogForm,
  $ImagePreview,
  $Export,
  $Print,
  $Clipboard,
  $Watermark,
  $Log,
  $Screenshot,
  deepClone,
  dataURLtoFile,
  isJson,
  setPx,
  validData,
  findArray,
  findNode,
  validatenull,
  downFile,
  loadScript,
  findObject,
  randomId,
};

const directive: AnyRecord = {
  contextmenu,
};

export const install = function (app: App, opts: AvueInstallOptions = {}) {
  const defaultOption = {
    size: opts.size ?? "default",
    calcHeight: opts.calcHeight ?? 0,
    menuType: opts.menuType ?? "text",
    formOption: opts.formOption ?? {},
    crudOption: opts.crudOption ?? {},
    appendToBody: validData(opts.appendToBody, true),
    canvas: {
      text: "avuejs.com",
      fontFamily: "microsoft yahei",
      color: "#999",
      fontSize: 16,
      opacity: 100,
      bottom: 10,
      right: 10,
      ratio: 1,
      ...(opts.canvas ?? {}),
    },
    qiniu: {
      AK: "",
      SK: "",
      scope: "",
      url: "",
      bucket: "https://upload.qiniup.com",
      deadline: 1,
      ...(opts.qiniu ?? {}),
    },
    ali: {
      region: "",
      endpoint: "",
      stsToken: "",
      accessKeyId: "",
      accessKeySecret: "",
      bucket: "",
      ...(opts.ali ?? {}),
    },
  };

  app.config.globalProperties.$AVUE = Object.assign({}, opts, defaultOption);

  Object.keys(components).forEach((key) => {
    const component = components[key];
    app.component(component.name, component);
  });

  createIcon(app);

  Object.keys(plugins).forEach((key) => {
    if (["$DialogForm", "$ImagePreview"].includes(key)) {
      app.config.globalProperties[key] = plugins[key](
        (app as AppWithContext)._context,
      );
      return;
    }

    app.config.globalProperties[key] = plugins[key];
  });

  Object.keys(directive).forEach((key) => {
    app.directive(key, directive[key]);
  });

  locale.use(opts.locale);
  locale.i18n(opts.i18n);
  app.config.globalProperties.$uploadFun = function (
    column: AnyRecord = {},
    safe: any,
  ) {
    const ctx = safe ?? this;
    const result: AnyRecord = {};

    UPLOAD_HOOK_KEYS.forEach((key) => {
      if (!column || (column.type === "upload" && !column[key])) {
        result[key] = ctx[key];
      }
    });

    return result;
  };
  app.config.globalProperties.$axios = opts.axios || axios;
};

const Avue = {
  version,
  locale,
  install,
  ...components,
  ...plugins,
};

export { version, locale };
export {
  $DialogForm,
  $ImagePreview,
  $Export,
  $Print,
  $Clipboard,
  $Watermark,
  $Log,
  $Screenshot,
  deepClone,
  dataURLtoFile,
  isJson,
  setPx,
  validData,
  findArray,
  findNode,
  validatenull,
  downFile,
  loadScript,
  findObject,
  randomId,
};
export * from "./ui/element-plus/";
export * from "./ui/data/";

export default Avue;
