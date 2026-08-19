/*! Avue.js v3.9.4 | (c) 2017-2026 Smallwei | Released under the MIT License. */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const legacyCopy = (text) => {
    var _a;
    const activeElement = document.activeElement;
    const selection = window.getSelection();
    const ranges = selection ? Array.from({ length: selection.rangeCount }, (_, index) => selection.getRangeAt(index).cloneRange()) : [];
    const textarea = document.createElement('textarea');
    const isRTL = document.documentElement.getAttribute('dir') === 'rtl';
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.setAttribute('aria-hidden', 'true');
    textarea.style.position = 'fixed';
    textarea.style.top = '0';
    textarea.style[isRTL ? 'right' : 'left'] = '-9999px';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    textarea.setSelectionRange(0, textarea.value.length);
    const copied = document.execCommand('copy');
    textarea.remove();
    if (selection) {
        selection.removeAllRanges();
        ranges.forEach((range) => selection.addRange(range));
    }
    (_a = activeElement === null || activeElement === void 0 ? void 0 : activeElement.focus) === null || _a === void 0 ? void 0 : _a.call(activeElement, { preventScroll: true });
    if (!copied)
        throw new Error('浏览器拒绝写入剪切板。');
};
async function $Clipboard ({ text, fallback = true }) {
    if (typeof document === 'undefined')
        throw new Error('当前环境不支持剪切板。');
    const value = text === null || text === undefined ? '' : String(text);
    const clipboard = navigator.clipboard;
    if (clipboard && typeof clipboard.writeText === 'function' && window.isSecureContext) {
        try {
            await clipboard.writeText(value);
            return;
        }
        catch (error) {
            if (!fallback)
                throw error;
        }
    }
    if (!fallback)
        throw new Error('当前浏览器不支持剪切板写入。');
    legacyCopy(value);
}

exports.default = $Clipboard;
