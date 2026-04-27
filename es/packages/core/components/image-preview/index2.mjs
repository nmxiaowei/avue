/*! Avue.js v3.9.0 | (c) 2017-2026 Smallwei | Released under the MIT License. */
import './index.mjs';
import { createVNode, render } from 'vue';
import script from './index3.mjs';

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
        const instance = createVNode(script, options);
        instance.appContext = defaultContext;
        instance.props.onDestroy = () => {
            render(null, parent);
            parent.remove();
        };
        render(instance, parent);
        appendTo === null || appendTo === void 0 ? void 0 : appendTo.appendChild(parent.firstElementChild);
        return instance;
    };
}

export { $ImagePreview as default };
