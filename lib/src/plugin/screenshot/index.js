/*! Avue.js v3.9.4 | (c) 2017-2026 Smallwei | Released under the MIT License. */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var src_core_packages = require('../../core/packages.js');
var src_utils_util = require('../../utils/util.js');

function $Screenshot (doc, option = {}) {
    var _a;
    if (typeof window === 'undefined' || typeof HTMLElement === 'undefined' || !(doc instanceof HTMLElement)) {
        return Promise.reject(new TypeError('请传入需要截图的 DOM 节点。'));
    }
    const renderer = option.renderer || window.html2canvas;
    if (typeof renderer !== 'function') {
        src_core_packages.default.logs('Screenshot');
        const error = new Error('未检测到 html2canvas，请先引入 html2canvas。');
        (_a = option.onError) === null || _a === void 0 ? void 0 : _a.call(option, error);
        return Promise.reject(error);
    }
    const { download, filename = `screenshot-${Date.now()}.png`, type = 'image/png', quality, onSuccess, onError, renderer: _renderer, ...rendererOption } = option;
    return Promise.resolve(renderer(doc, rendererOption))
        .then((canvas) => {
        if (!(canvas instanceof HTMLCanvasElement))
            throw new Error('截图插件未返回 Canvas。');
        if (download)
            src_utils_util.downFile(canvas.toDataURL(type, quality), filename);
        onSuccess === null || onSuccess === void 0 ? void 0 : onSuccess(canvas);
        return canvas;
    })
        .catch((error) => {
        const normalized = error instanceof Error ? error : new Error(String(error || '截图失败。'));
        onError === null || onError === void 0 ? void 0 : onError(normalized);
        throw normalized;
    });
}

exports.default = $Screenshot;
