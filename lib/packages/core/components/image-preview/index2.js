/*! Avue.js v3.9.3 | (c) 2017-2026 Smallwei | Released under the MIT License. */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('./index.js');
var vue = require('vue');
var index_vue_vue_type_script_lang = require('./index3.js');

function $ImagePreview (_context) {
    const defaultContext = _context;
    return (datas = [], index = 0, ops = {}) => {
        const options = {
            datas,
            index,
            ops: Object.assign({
                closeOnClickModal: false,
                beforeClose: null,
                click: null,
                modal: true,
            }, ops),
        };
        let appendTo = ops.appendTo;
        if (ops.appendTo) {
            appendTo = document.querySelector(ops.appendTo);
        }
        else {
            appendTo = document.body;
        }
        const parent = document.createElement('div');
        const instance = vue.createVNode(index_vue_vue_type_script_lang.default, options);
        instance.appContext = defaultContext;
        instance.props.onDestroy = () => {
            vue.render(null, parent);
            parent.remove();
        };
        vue.render(instance, parent);
        appendTo === null || appendTo === void 0 ? void 0 : appendTo.appendChild(parent.firstElementChild);
        return instance;
    };
}

exports.default = $ImagePreview;
