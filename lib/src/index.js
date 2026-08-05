/*! Avue.js v3.9.3 | (c) 2017-2026 Smallwei | Released under the MIT License. */
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
var index$1 = require('../packages/core/components/image-preview/index2.js');
var index = require('../packages/core/components/dialog-form/index2.js');
var src_icon = require('./icon.js');
var src_core_option = require('./core/option.js');
require('../packages/element-plus/count-up/index.js');
require('../packages/element-plus/article/index.js');
require('../packages/element-plus/crud/index.js');
require('../packages/element-plus/card/index.js');
require('../packages/element-plus/chat/index.js');
require('../packages/element-plus/comment/index.js');
require('../packages/element-plus/form/index.js');
require('../packages/element-plus/checkbox/index.js');
require('../packages/element-plus/date/index.js');
require('../packages/element-plus/draggable/index.js');
require('../packages/element-plus/flow/index.js');
require('../packages/element-plus/group/index.js');
require('../packages/element-plus/license/index.js');
require('../packages/element-plus/time/index.js');
require('../packages/element-plus/input/index.js');
require('../packages/element-plus/radio/index.js');
require('../packages/element-plus/select/index.js');
require('../packages/element-plus/cascader/index.js');
require('../packages/element-plus/input-color/index.js');
require('../packages/element-plus/input-number/index.js');
require('../packages/element-plus/input-tree/index.js');
require('../packages/element-plus/input-map/index.js');
require('../packages/element-plus/input-icon/index.js');
require('../packages/element-plus/input-tag/index.js');
require('../packages/element-plus/input-table/index.js');
require('../packages/element-plus/input-cron/index.js');
require('../packages/element-plus/input-otp/index.js');
require('../packages/element-plus/mention/index.js');
require('../packages/element-plus/verify/index.js');
require('../packages/element-plus/switch/index.js');
require('../packages/element-plus/rate/index.js');
require('../packages/element-plus/upload/index.js');
require('../packages/element-plus/sign/index.js');
require('../packages/element-plus/slider/index.js');
require('../packages/element-plus/tree/index.js');
require('../packages/element-plus/title/index.js');
require('../packages/element-plus/search/index.js');
require('../packages/element-plus/tabs/index.js');
require('../packages/element-plus/dynamic/index.js');
require('../packages/element-plus/video/index.js');
require('../packages/element-plus/login/index.js');
require('../packages/element-plus/array/index.js');
require('../packages/element-plus/text-ellipsis/index.js');
require('../packages/element-plus/qrcode/index.js');
require('../packages/element-plus/iframe/index.js');
require('../packages/data/tabs/index.js');
require('../packages/data/cardText/index.js');
require('../packages/data/box/index.js');
require('../packages/data/progress/index.js');
require('../packages/data/icons/index.js');
require('../packages/data/card/index.js');
require('../packages/data/display/index.js');
require('../packages/data/imgText/index.js');
require('../packages/data/operaText/index.js');
require('../packages/data/rotate/index.js');
require('../packages/data/pay/index.js');
require('../packages/data/price/index.js');
require('../packages/data/panel/index.js');
require('../packages/data/statistic/index.js');
require('../packages/data/weather/index.js');
require('../packages/data/rank/index.js');
require('../packages/data/profile/index.js');
require('../packages/data/product/index.js');
require('../packages/data/countdown/index.js');
require('../packages/data/notice/index.js');
require('../packages/data/task/index.js');
require('../packages/data/list/index.js');
require('../packages/data/dashboard/index.js');
var index_vue_vue_type_script_lang = require('../packages/element-plus/array/index2.js');
var index_vue_vue_type_script_lang$1 = require('../packages/element-plus/article/index2.js');
var index_vue_vue_type_script_lang$2 = require('../packages/element-plus/card/index2.js');
var index_vue_vue_type_script_lang$3 = require('../packages/element-plus/cascader/index2.js');
var index_vue_vue_type_script_lang$4 = require('../packages/element-plus/chat/index2.js');
var index_vue_vue_type_script_lang$5 = require('../packages/element-plus/checkbox/index2.js');
var index_vue_vue_type_script_lang$6 = require('../packages/element-plus/comment/index2.js');
var index_vue_vue_type_script_lang$7 = require('../packages/element-plus/count-up/index2.js');
var index_vue_vue_type_script_lang$8 = require('../packages/element-plus/crud/index2.js');
var index_vue_vue_type_script_lang$9 = require('../packages/data/box/index2.js');
var index_vue_vue_type_script_lang$a = require('../packages/data/card/index2.js');
var index_vue_vue_type_script_lang$b = require('../packages/data/cardText/index2.js');
var index_vue_vue_type_script_lang$c = require('../packages/data/countdown/index2.js');
var index_vue_vue_type_script_lang$d = require('../packages/data/dashboard/index2.js');
var index_vue_vue_type_script_lang$e = require('../packages/data/display/index2.js');
var index_vue_vue_type_script_lang$f = require('../packages/data/icons/index2.js');
var index_vue_vue_type_script_lang$g = require('../packages/data/imgText/index2.js');
var index_vue_vue_type_script_lang$h = require('../packages/data/list/index2.js');
var index_vue_vue_type_script_lang$i = require('../packages/data/notice/index2.js');
var index_vue_vue_type_script_lang$j = require('../packages/data/operaText/index2.js');
var index_vue_vue_type_script_lang$k = require('../packages/data/panel/index2.js');
var index_vue_vue_type_script_lang$l = require('../packages/data/pay/index2.js');
var index_vue_vue_type_script_lang$m = require('../packages/data/price/index2.js');
var index_vue_vue_type_script_lang$n = require('../packages/data/product/index2.js');
var index_vue_vue_type_script_lang$o = require('../packages/data/profile/index2.js');
var index_vue_vue_type_script_lang$p = require('../packages/data/progress/index2.js');
var index_vue_vue_type_script_lang$q = require('../packages/data/rank/index2.js');
var index_vue_vue_type_script_lang$r = require('../packages/data/rotate/index2.js');
var index_vue_vue_type_script_lang$s = require('../packages/data/statistic/index2.js');
var index_vue_vue_type_script_lang$t = require('../packages/data/tabs/index2.js');
var index_vue_vue_type_script_lang$u = require('../packages/data/task/index2.js');
var index_vue_vue_type_script_lang$v = require('../packages/data/weather/index2.js');
var index_vue_vue_type_script_lang$w = require('../packages/element-plus/date/index2.js');
var index_vue_vue_type_script_lang$x = require('../packages/element-plus/draggable/index2.js');
var index_vue_vue_type_script_lang$y = require('../packages/element-plus/dynamic/index2.js');
var index_vue_vue_type_script_lang$z = require('../packages/element-plus/flow/index2.js');
var index_vue_vue_type_script_lang$A = require('../packages/element-plus/form/index2.js');
var index_vue_vue_type_script_lang$B = require('../packages/element-plus/group/index2.js');
var index_vue_vue_type_script_lang$C = require('../packages/element-plus/iframe/index2.js');
var index_vue_vue_type_script_lang$D = require('../packages/element-plus/input/index2.js');
var index_vue_vue_type_script_lang$E = require('../packages/element-plus/input-color/index2.js');
var index_vue_vue_type_script_lang$F = require('../packages/element-plus/input-cron/index2.js');
var index_vue_vue_type_script_lang$G = require('../packages/element-plus/input-icon/index2.js');
var index_vue_vue_type_script_lang$H = require('../packages/element-plus/input-map/index2.js');
var index_vue_vue_type_script_lang$I = require('../packages/element-plus/input-number/index2.js');
var index_vue_vue_type_script_lang$J = require('../packages/element-plus/input-otp/index2.js');
var index_vue_vue_type_script_lang$K = require('../packages/element-plus/input-table/index2.js');
var index_vue_vue_type_script_lang$L = require('../packages/element-plus/input-tag/index2.js');
var index_vue_vue_type_script_lang$M = require('../packages/element-plus/input-tree/index2.js');
var index_vue_vue_type_script_lang$N = require('../packages/element-plus/license/index2.js');
var index_vue_vue_type_script_lang$O = require('../packages/element-plus/login/index2.js');
var index_vue_vue_type_script_lang$P = require('../packages/element-plus/mention/index2.js');
var index_vue_vue_type_script_lang$Q = require('../packages/element-plus/qrcode/index2.js');
var index_vue_vue_type_script_lang$R = require('../packages/element-plus/radio/index2.js');
var index_vue_vue_type_script_lang$S = require('../packages/element-plus/rate/index2.js');
var index_vue_vue_type_script_lang$T = require('../packages/element-plus/search/index2.js');
var index_vue_vue_type_script_lang$U = require('../packages/element-plus/select/index2.js');
var index_vue_vue_type_script_lang$V = require('../packages/element-plus/sign/index2.js');
var index_vue_vue_type_script_lang$W = require('../packages/element-plus/slider/index2.js');
var index_vue_vue_type_script_lang$X = require('../packages/element-plus/switch/index2.js');
var index_vue_vue_type_script_lang$Y = require('../packages/element-plus/tabs/index2.js');
var index_vue_vue_type_script_lang$Z = require('../packages/element-plus/time/index2.js');
var index_vue_vue_type_script_lang$_ = require('../packages/element-plus/title/index2.js');
var index_vue_vue_type_script_lang$$ = require('../packages/element-plus/tree/index2.js');
var index_vue_vue_type_script_lang$10 = require('../packages/element-plus/upload/index2.js');
var index_vue_vue_type_script_lang$11 = require('../packages/element-plus/verify/index2.js');
var index_vue_vue_type_script_lang$12 = require('../packages/element-plus/video/index2.js');
var index_vue_vue_type_script_lang$13 = require('../packages/element-plus/text-ellipsis/index2.js');

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
    $DialogForm: index.default,
    $ImagePreview: index$1.default,
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
    validateOption: src_core_option.validateOption,
    warnOption: src_core_option.warnOption,
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
        optionValidate: src_utils_util.validData(opts.optionValidate, true),
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
            if (!column || (column.type === "upload" && !column[key])) {
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

exports.version = src_version.version;
exports.validatenull = src_utils_validate.validatenull;
exports.dataURLtoFile = src_utils_util.dataURLtoFile;
exports.deepClone = src_utils_util.deepClone;
exports.downFile = src_utils_util.downFile;
exports.findArray = src_utils_util.findArray;
exports.findNode = src_utils_util.findNode;
exports.findObject = src_utils_util.findObject;
exports.isJson = src_utils_util.isJson;
exports.loadScript = src_utils_util.loadScript;
exports.randomId = src_utils_util.randomId;
exports.setPx = src_utils_util.setPx;
exports.validData = src_utils_util.validData;
exports.$Export = src_plugin_export_index.default;
exports.$Watermark = src_plugin_watermark_index.default;
exports.$Log = src_plugin_logs_index.default;
exports.locale = src_locale_index.default;
exports.$Screenshot = src_plugin_screenshot_index.default;
exports.$Clipboard = src_plugin_clipboard_index.default;
exports.$Print = src_plugin_print_index.default;
exports.$ImagePreview = index$1.default;
exports.$DialogForm = index.default;
exports.validateOption = src_core_option.validateOption;
exports.warnOption = src_core_option.warnOption;
exports.Arrays = index_vue_vue_type_script_lang.default;
exports.Article = index_vue_vue_type_script_lang$1.default;
exports.Card = index_vue_vue_type_script_lang$2.default;
exports.Cascader = index_vue_vue_type_script_lang$3.default;
exports.Chat = index_vue_vue_type_script_lang$4.default;
exports.Checkbox = index_vue_vue_type_script_lang$5.default;
exports.Comment = index_vue_vue_type_script_lang$6.default;
exports.CountUp = index_vue_vue_type_script_lang$7.default;
exports.Crud = index_vue_vue_type_script_lang$8.default;
exports.DataBox = index_vue_vue_type_script_lang$9.default;
exports.DataCard = index_vue_vue_type_script_lang$a.default;
exports.DataCardText = index_vue_vue_type_script_lang$b.default;
exports.DataCountdown = index_vue_vue_type_script_lang$c.default;
exports.DataDashboard = index_vue_vue_type_script_lang$d.default;
exports.DataDisplay = index_vue_vue_type_script_lang$e.default;
exports.DataIcons = index_vue_vue_type_script_lang$f.default;
exports.DataImgText = index_vue_vue_type_script_lang$g.default;
exports.DataList = index_vue_vue_type_script_lang$h.default;
exports.DataNotice = index_vue_vue_type_script_lang$i.default;
exports.DataOperaText = index_vue_vue_type_script_lang$j.default;
exports.DataPanel = index_vue_vue_type_script_lang$k.default;
exports.DataPay = index_vue_vue_type_script_lang$l.default;
exports.DataPrice = index_vue_vue_type_script_lang$m.default;
exports.DataProduct = index_vue_vue_type_script_lang$n.default;
exports.DataProfile = index_vue_vue_type_script_lang$o.default;
exports.DataProgress = index_vue_vue_type_script_lang$p.default;
exports.DataRank = index_vue_vue_type_script_lang$q.default;
exports.DataRotate = index_vue_vue_type_script_lang$r.default;
exports.DataStatistic = index_vue_vue_type_script_lang$s.default;
exports.DataTabs = index_vue_vue_type_script_lang$t.default;
exports.DataTask = index_vue_vue_type_script_lang$u.default;
exports.DataWeather = index_vue_vue_type_script_lang$v.default;
exports.Date = index_vue_vue_type_script_lang$w.default;
exports.Draggable = index_vue_vue_type_script_lang$x.default;
exports.Dynamic = index_vue_vue_type_script_lang$y.default;
exports.Flow = index_vue_vue_type_script_lang$z.default;
exports.Form = index_vue_vue_type_script_lang$A.default;
exports.Group = index_vue_vue_type_script_lang$B.default;
exports.Iframe = index_vue_vue_type_script_lang$C.default;
exports.Input = index_vue_vue_type_script_lang$D.default;
exports.InputColor = index_vue_vue_type_script_lang$E.default;
exports.InputCron = index_vue_vue_type_script_lang$F.default;
exports.InputIcon = index_vue_vue_type_script_lang$G.default;
exports.InputMap = index_vue_vue_type_script_lang$H.default;
exports.InputNumber = index_vue_vue_type_script_lang$I.default;
exports.InputOtp = index_vue_vue_type_script_lang$J.default;
exports.InputTable = index_vue_vue_type_script_lang$K.default;
exports.InputTag = index_vue_vue_type_script_lang$L.default;
exports.InputTree = index_vue_vue_type_script_lang$M.default;
exports.License = index_vue_vue_type_script_lang$N.default;
exports.Login = index_vue_vue_type_script_lang$O.default;
exports.Mention = index_vue_vue_type_script_lang$P.default;
exports.QRCode = index_vue_vue_type_script_lang$Q.default;
exports.Radio = index_vue_vue_type_script_lang$R.default;
exports.Rate = index_vue_vue_type_script_lang$S.default;
exports.Search = index_vue_vue_type_script_lang$T.default;
exports.Select = index_vue_vue_type_script_lang$U.default;
exports.Sign = index_vue_vue_type_script_lang$V.default;
exports.Slider = index_vue_vue_type_script_lang$W.default;
exports.Switchs = index_vue_vue_type_script_lang$X.default;
exports.Tabs = index_vue_vue_type_script_lang$Y.default;
exports.Time = index_vue_vue_type_script_lang$Z.default;
exports.Title = index_vue_vue_type_script_lang$_.default;
exports.Tree = index_vue_vue_type_script_lang$$.default;
exports.Upload = index_vue_vue_type_script_lang$10.default;
exports.Verifys = index_vue_vue_type_script_lang$11.default;
exports.Video = index_vue_vue_type_script_lang$12.default;
exports.textEllipsis = index_vue_vue_type_script_lang$13.default;
exports.default = Avue;
exports.install = install;
