/*! Avue.js v3.9.1 | (c) 2017-2026 Smallwei | Released under the MIT License. */
import packages from '../../core/packages.mjs';

function $Screenshot (doc, option = {}) {
    if (!window.html2canvas) {
        packages.logs('Screenshot');
        return;
    }
    return window.html2canvas(doc, option);
}

export { $Screenshot as default };
