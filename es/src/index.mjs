/*! Avue.js v3.9.0 | (c) 2017-2026 Smallwei | Released under the MIT License. */
import components from './ui/index.mjs';
import { version } from './version.mjs';
import * as axios$1 from '../_virtual/axios.mjs';
import axios$2 from '../_virtual/axios.mjs';
import { validatenull } from './utils/validate.mjs';
import { randomId, findObject, loadScript, downFile, findNode, findArray, validData, setPx, isJson, dataURLtoFile, deepClone } from './utils/util.mjs';
import contextmenu from '../packages/core/directive/contextmenu.mjs';
import $Export from './plugin/export/index.mjs';
import $Watermark from './plugin/watermark/index.mjs';
import log from './plugin/logs/index.mjs';
import locale from './locale/index.mjs';
import $Screenshot from './plugin/screenshot/index.mjs';
import $Clipboard from './plugin/clipboard/index.mjs';
import Print from './plugin/print/index.mjs';
import $ImagePreview from '../packages/core/components/image-preview/index2.mjs';
import $DialogForm from '../packages/core/components/dialog-form/index2.mjs';
import createIcon from './icon.mjs';

const axios = axios$2 || axios$1;
const UPLOAD_HOOK_KEYS = [
    "uploadPreview",
    "uploadBefore",
    "uploadAfter",
    "uploadDelete",
    "uploadError",
    "uploadExceed",
    "uploadSized",
];
const plugins = {
    $DialogForm,
    $ImagePreview,
    $Export,
    $Print: Print,
    $Clipboard,
    $Watermark,
    $Log: log,
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
const directive = {
    contextmenu,
};
const install = function (app, opts = {}) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    const defaultOption = {
        size: (_a = opts.size) !== null && _a !== void 0 ? _a : "default",
        calcHeight: (_b = opts.calcHeight) !== null && _b !== void 0 ? _b : 0,
        menuType: (_c = opts.menuType) !== null && _c !== void 0 ? _c : "text",
        formOption: (_d = opts.formOption) !== null && _d !== void 0 ? _d : {},
        crudOption: (_e = opts.crudOption) !== null && _e !== void 0 ? _e : {},
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
            ...((_f = opts.canvas) !== null && _f !== void 0 ? _f : {}),
        },
        qiniu: {
            AK: "",
            SK: "",
            scope: "",
            url: "",
            bucket: "https://upload.qiniup.com",
            deadline: 1,
            ...((_g = opts.qiniu) !== null && _g !== void 0 ? _g : {}),
        },
        ali: {
            region: "",
            endpoint: "",
            stsToken: "",
            accessKeyId: "",
            accessKeySecret: "",
            bucket: "",
            ...((_h = opts.ali) !== null && _h !== void 0 ? _h : {}),
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
            app.config.globalProperties[key] = plugins[key](app._context);
            return;
        }
        app.config.globalProperties[key] = plugins[key];
    });
    Object.keys(directive).forEach((key) => {
        app.directive(key, directive[key]);
    });
    locale.use(opts.locale);
    locale.i18n(opts.i18n);
    app.config.globalProperties.$uploadFun = function (column = {}, safe) {
        const ctx = safe !== null && safe !== void 0 ? safe : this;
        const result = {};
        UPLOAD_HOOK_KEYS.forEach((key) => {
            if (column && column.type === "upload" && !column[key]) {
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

export { Avue as default, install };
