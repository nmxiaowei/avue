/*! Avue.js v3.9.4 | (c) 2017-2026 Smallwei | Released under the MIT License. */
import { createVNode, render } from 'vue';
import './index.mjs';
import script from './index3.mjs';

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
        const instance = createVNode(script, options);
        instance.appContext = defaultContext;
        const onDestroy = () => {
            render(null, parent);
            parent.remove();
        };
        instance.props.onDestroy = onDestroy;
        instance.close = onDestroy;
        render(instance, parent);
        appendTo === null || appendTo === void 0 ? void 0 : appendTo.appendChild(parent);
        return instance;
    };
}

export { $DialogForm as default };
