/*! Avue.js v3.9.2 | (c) 2017-2026 Smallwei | Released under the MIT License. */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var src_core_packages = require('../../core/packages.js');

function $Screenshot (doc, option = {}) {
    if (!window.html2canvas) {
        src_core_packages.default.logs('Screenshot');
        return;
    }
    return window.html2canvas(doc, option);
}

exports.default = $Screenshot;
