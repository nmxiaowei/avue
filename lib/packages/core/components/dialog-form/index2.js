/*! Avue.js v3.8.6 | (c) 2017-2026 Smallwei | Released under the MIT License. */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
require('./index.js');
var index_vue_vue_type_script_lang = require('./index3.js');

function $DialogForm (_context) {
    const defaultContext = _context;
    return (opt) => {
        const options = {
            opt,
        };
        let appendTo = opt.appendTo;
        if (opt.appendTo) {
            appendTo = document.querySelector(opt.appendTo);
        }
        else {
            appendTo = document.body;
        }
        const parent = document.createElement('div');
        const instance = vue.createVNode(index_vue_vue_type_script_lang.default, options);
        instance.appContext = defaultContext;
        const onDestroy = () => {
            vue.render(null, parent);
            parent.remove();
        };
        instance.props.onDestroy = onDestroy;
        instance.close = onDestroy;
        vue.render(instance, parent);
        appendTo === null || appendTo === void 0 ? void 0 : appendTo.appendChild(parent);
        return instance;
    };
}

exports.default = $DialogForm;
