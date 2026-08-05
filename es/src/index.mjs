/*! Avue.js v3.9.3 | (c) 2017-2026 Smallwei | Released under the MIT License. */
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
import { warnOption, validateOption } from './core/option.mjs';
import '../packages/element-plus/count-up/index.mjs';
import '../packages/element-plus/article/index.mjs';
import '../packages/element-plus/crud/index.mjs';
import '../packages/element-plus/card/index.mjs';
import '../packages/element-plus/chat/index.mjs';
import '../packages/element-plus/comment/index.mjs';
import '../packages/element-plus/form/index.mjs';
import '../packages/element-plus/checkbox/index.mjs';
import '../packages/element-plus/date/index.mjs';
import '../packages/element-plus/draggable/index.mjs';
import '../packages/element-plus/flow/index.mjs';
import '../packages/element-plus/group/index.mjs';
import '../packages/element-plus/license/index.mjs';
import '../packages/element-plus/time/index.mjs';
import '../packages/element-plus/input/index.mjs';
import '../packages/element-plus/radio/index.mjs';
import '../packages/element-plus/select/index.mjs';
import '../packages/element-plus/cascader/index.mjs';
import '../packages/element-plus/input-color/index.mjs';
import '../packages/element-plus/input-number/index.mjs';
import '../packages/element-plus/input-tree/index.mjs';
import '../packages/element-plus/input-map/index.mjs';
import '../packages/element-plus/input-icon/index.mjs';
import '../packages/element-plus/input-tag/index.mjs';
import '../packages/element-plus/input-table/index.mjs';
import '../packages/element-plus/input-cron/index.mjs';
import '../packages/element-plus/input-otp/index.mjs';
import '../packages/element-plus/mention/index.mjs';
import '../packages/element-plus/verify/index.mjs';
import '../packages/element-plus/switch/index.mjs';
import '../packages/element-plus/rate/index.mjs';
import '../packages/element-plus/upload/index.mjs';
import '../packages/element-plus/sign/index.mjs';
import '../packages/element-plus/slider/index.mjs';
import '../packages/element-plus/tree/index.mjs';
import '../packages/element-plus/title/index.mjs';
import '../packages/element-plus/search/index.mjs';
import '../packages/element-plus/tabs/index.mjs';
import '../packages/element-plus/dynamic/index.mjs';
import '../packages/element-plus/video/index.mjs';
import '../packages/element-plus/login/index.mjs';
import '../packages/element-plus/array/index.mjs';
import '../packages/element-plus/text-ellipsis/index.mjs';
import '../packages/element-plus/qrcode/index.mjs';
import '../packages/element-plus/iframe/index.mjs';
import '../packages/data/tabs/index.mjs';
import '../packages/data/cardText/index.mjs';
import '../packages/data/box/index.mjs';
import '../packages/data/progress/index.mjs';
import '../packages/data/icons/index.mjs';
import '../packages/data/card/index.mjs';
import '../packages/data/display/index.mjs';
import '../packages/data/imgText/index.mjs';
import '../packages/data/operaText/index.mjs';
import '../packages/data/rotate/index.mjs';
import '../packages/data/pay/index.mjs';
import '../packages/data/price/index.mjs';
import '../packages/data/panel/index.mjs';
import '../packages/data/statistic/index.mjs';
import '../packages/data/weather/index.mjs';
import '../packages/data/rank/index.mjs';
import '../packages/data/profile/index.mjs';
import '../packages/data/product/index.mjs';
import '../packages/data/countdown/index.mjs';
import '../packages/data/notice/index.mjs';
import '../packages/data/task/index.mjs';
import '../packages/data/list/index.mjs';
import '../packages/data/dashboard/index.mjs';
export { default as Arrays } from '../packages/element-plus/array/index2.mjs';
export { default as Article } from '../packages/element-plus/article/index2.mjs';
export { default as Card } from '../packages/element-plus/card/index2.mjs';
export { default as Cascader } from '../packages/element-plus/cascader/index2.mjs';
export { default as Chat } from '../packages/element-plus/chat/index2.mjs';
export { default as Checkbox } from '../packages/element-plus/checkbox/index2.mjs';
export { default as Comment } from '../packages/element-plus/comment/index2.mjs';
export { default as CountUp } from '../packages/element-plus/count-up/index2.mjs';
export { default as Crud } from '../packages/element-plus/crud/index2.mjs';
export { default as DataBox } from '../packages/data/box/index2.mjs';
export { default as DataCard } from '../packages/data/card/index2.mjs';
export { default as DataCardText } from '../packages/data/cardText/index2.mjs';
export { default as DataCountdown } from '../packages/data/countdown/index2.mjs';
export { default as DataDashboard } from '../packages/data/dashboard/index2.mjs';
export { default as DataDisplay } from '../packages/data/display/index2.mjs';
export { default as DataIcons } from '../packages/data/icons/index2.mjs';
export { default as DataImgText } from '../packages/data/imgText/index2.mjs';
export { default as DataList } from '../packages/data/list/index2.mjs';
export { default as DataNotice } from '../packages/data/notice/index2.mjs';
export { default as DataOperaText } from '../packages/data/operaText/index2.mjs';
export { default as DataPanel } from '../packages/data/panel/index2.mjs';
export { default as DataPay } from '../packages/data/pay/index2.mjs';
export { default as DataPrice } from '../packages/data/price/index2.mjs';
export { default as DataProduct } from '../packages/data/product/index2.mjs';
export { default as DataProfile } from '../packages/data/profile/index2.mjs';
export { default as DataProgress } from '../packages/data/progress/index2.mjs';
export { default as DataRank } from '../packages/data/rank/index2.mjs';
export { default as DataRotate } from '../packages/data/rotate/index2.mjs';
export { default as DataStatistic } from '../packages/data/statistic/index2.mjs';
export { default as DataTabs } from '../packages/data/tabs/index2.mjs';
export { default as DataTask } from '../packages/data/task/index2.mjs';
export { default as DataWeather } from '../packages/data/weather/index2.mjs';
export { default as Date } from '../packages/element-plus/date/index2.mjs';
export { default as Draggable } from '../packages/element-plus/draggable/index2.mjs';
export { default as Dynamic } from '../packages/element-plus/dynamic/index2.mjs';
export { default as Flow } from '../packages/element-plus/flow/index2.mjs';
export { default as Form } from '../packages/element-plus/form/index2.mjs';
export { default as Group } from '../packages/element-plus/group/index2.mjs';
export { default as Iframe } from '../packages/element-plus/iframe/index2.mjs';
export { default as Input } from '../packages/element-plus/input/index2.mjs';
export { default as InputColor } from '../packages/element-plus/input-color/index2.mjs';
export { default as InputCron } from '../packages/element-plus/input-cron/index2.mjs';
export { default as InputIcon } from '../packages/element-plus/input-icon/index2.mjs';
export { default as InputMap } from '../packages/element-plus/input-map/index2.mjs';
export { default as InputNumber } from '../packages/element-plus/input-number/index2.mjs';
export { default as InputOtp } from '../packages/element-plus/input-otp/index2.mjs';
export { default as InputTable } from '../packages/element-plus/input-table/index2.mjs';
export { default as InputTag } from '../packages/element-plus/input-tag/index2.mjs';
export { default as InputTree } from '../packages/element-plus/input-tree/index2.mjs';
export { default as License } from '../packages/element-plus/license/index2.mjs';
export { default as Login } from '../packages/element-plus/login/index2.mjs';
export { default as Mention } from '../packages/element-plus/mention/index2.mjs';
export { default as QRCode } from '../packages/element-plus/qrcode/index2.mjs';
export { default as Radio } from '../packages/element-plus/radio/index2.mjs';
export { default as Rate } from '../packages/element-plus/rate/index2.mjs';
export { default as Search } from '../packages/element-plus/search/index2.mjs';
export { default as Select } from '../packages/element-plus/select/index2.mjs';
export { default as Sign } from '../packages/element-plus/sign/index2.mjs';
export { default as Slider } from '../packages/element-plus/slider/index2.mjs';
export { default as Switchs } from '../packages/element-plus/switch/index2.mjs';
export { default as Tabs } from '../packages/element-plus/tabs/index2.mjs';
export { default as Time } from '../packages/element-plus/time/index2.mjs';
export { default as Title } from '../packages/element-plus/title/index2.mjs';
export { default as Tree } from '../packages/element-plus/tree/index2.mjs';
export { default as Upload } from '../packages/element-plus/upload/index2.mjs';
export { default as Verifys } from '../packages/element-plus/verify/index2.mjs';
export { default as Video } from '../packages/element-plus/video/index2.mjs';
export { default as textEllipsis } from '../packages/element-plus/text-ellipsis/index2.mjs';

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
    validateOption,
    warnOption,
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
        optionValidate: validData(opts.optionValidate, true),
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

export { $Clipboard, $DialogForm, $Export, $ImagePreview, log as $Log, Print as $Print, $Screenshot, $Watermark, dataURLtoFile, deepClone, Avue as default, downFile, findArray, findNode, findObject, install, isJson, loadScript, locale, randomId, setPx, validData, validateOption, validatenull, version, warnOption };
