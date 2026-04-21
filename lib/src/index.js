/*! Avue.js v3.8.6 | (c) 2017-2026 Smallwei | Released under the MIT License. */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var src_ui_index = require('./ui/index.js');
var src_version = require('./version.js');
var axios = require('axios');
var src_utils_validate = require('./utils/validate.js');
var src_utils_util = require('./utils/util.js');
var packages_core_directive_contextmenu = require('../packages/core/directive/contextmenu.js');
var src_plugin_export_index = require('./plugin/export/index.js');
var src_plugin_watermark_index = require('./plugin/watermark/index.js');
var src_plugin_logs_index = require('./plugin/logs/index.js');
var src_locale_index = require('./locale/index.js');
var src_plugin_screenshot_index = require('./plugin/screenshot/index.js');
var src_plugin_clipboard_index = require('./plugin/clipboard/index.js');
var src_plugin_print_index = require('./plugin/print/index.js');
var index = require('../packages/core/components/image-preview/index2.js');
var index$1 = require('../packages/core/components/dialog-form/index2.js');
var src_icon = require('./icon.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var axios__default = /*#__PURE__*/_interopDefault(axios);

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
    $DialogForm: index$1.default,
    $ImagePreview: index.default,
    $Export: src_plugin_export_index.default,
    $Print: src_plugin_print_index.default,
    $Clipboard: src_plugin_clipboard_index.default,
    $Watermark: src_plugin_watermark_index.default,
    $Log: src_plugin_logs_index.default,
    $Screenshot: src_plugin_screenshot_index.default,
    deepClone: src_utils_util.deepClone,
    dataURLtoFile: src_utils_util.dataURLtoFile,
    isJson: src_utils_util.isJson,
    setPx: src_utils_util.setPx,
    validData: src_utils_util.validData,
    findArray: src_utils_util.findArray,
    findNode: src_utils_util.findNode,
    validatenull: src_utils_validate.validatenull,
    downFile: src_utils_util.downFile,
    loadScript: src_utils_util.loadScript,
    findObject: src_utils_util.findObject,
    randomId: src_utils_util.randomId,
};
const directive = {
    contextmenu: packages_core_directive_contextmenu.default,
};
const install = function (app, opts = {}) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    const defaultOption = {
        size: (_a = opts.size) !== null && _a !== void 0 ? _a : "default",
        calcHeight: (_b = opts.calcHeight) !== null && _b !== void 0 ? _b : 0,
        menuType: (_c = opts.menuType) !== null && _c !== void 0 ? _c : "text",
        formOption: (_d = opts.formOption) !== null && _d !== void 0 ? _d : {},
        crudOption: (_e = opts.crudOption) !== null && _e !== void 0 ? _e : {},
        appendToBody: src_utils_util.validData(opts.appendToBody, true),
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
    Object.keys(src_ui_index.default).forEach((key) => {
        const component = src_ui_index.default[key];
        app.component(component.name, component);
    });
    src_icon.default(app);
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
    src_locale_index.default.use(opts.locale);
    src_locale_index.default.i18n(opts.i18n);
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
    app.config.globalProperties.$axios = opts.axios || axios__default.default;
};
const Avue = {
    version: src_version.version,
    locale: src_locale_index.default,
    install,
    ...src_ui_index.default,
    ...plugins,
};

exports.default = Avue;
exports.install = install;
