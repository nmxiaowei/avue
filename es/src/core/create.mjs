/*! Avue.js v3.9.1 | (c) 2017-2026 Smallwei | Released under the MIT License. */
import bem from '../utils/bem.mjs';
import { KEY_COMPONENT_NAME } from '../global/variable.mjs';

function create(sfc) {
    sfc.name = KEY_COMPONENT_NAME + sfc.name;
    sfc.mixins = sfc.mixins || [];
    sfc.mixins.push(bem);
    return sfc;
}

export { create as default };
