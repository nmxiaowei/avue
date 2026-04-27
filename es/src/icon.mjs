/*! Avue.js v3.9.1 | (c) 2017-2026 Smallwei | Released under the MIT License. */
import * as Icons from '@element-plus/icons-vue';

var createIcon = (app) => {
    for (const key in Icons) {
        app.component(transElIconName(key), Icons[key]);
    }
};
function transElIconName(iconName) {
    return 'el-icon' + iconName.replace(/[A-Z]/g, (match) => '-' + match.toLowerCase());
}

export { createIcon as default };
