/*! Avue.js v3.9.3 | (c) 2017-2026 Smallwei | Released under the MIT License. */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var Icons = require('@element-plus/icons-vue');

function _interopNamespace(e) {
    if (e && e.__esModule) return e;
    var n = Object.create(null);
    if (e) {
        Object.keys(e).forEach(function (k) {
            if (k !== 'default') {
                var d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(n, k, d.get ? d : {
                    enumerable: true,
                    get: function () { return e[k]; }
                });
            }
        });
    }
    n.default = e;
    return Object.freeze(n);
}

var Icons__namespace = /*#__PURE__*/_interopNamespace(Icons);

var createIcon = (app) => {
    for (const key in Icons__namespace) {
        app.component(transElIconName(key), Icons__namespace[key]);
    }
};
function transElIconName(iconName) {
    return 'el-icon' + iconName.replace(/[A-Z]/g, (match) => '-' + match.toLowerCase());
}

exports.default = createIcon;
