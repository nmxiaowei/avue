/*! Avue.js v3.9.4 | (c) 2017-2026 Smallwei | Released under the MIT License. */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var permission = (() => {
    function init(el, binding) {
        const value = binding.value;
        if (value === false) {
            el.style.display = 'none';
        }
        else {
            el.style.display = '';
        }
    }
    return {
        mounted(el, binding) {
            init(el, binding);
        },
        updated(el, binding) {
            init(el, binding);
        },
    };
})();

exports.default = permission;
