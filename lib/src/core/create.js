/*! Avue.js v3.9.3 | (c) 2017-2026 Smallwei | Released under the MIT License. */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var src_utils_bem = require('../utils/bem.js');
var src_global_variable = require('../global/variable.js');

function create(sfc) {
    sfc.name = src_global_variable.KEY_COMPONENT_NAME + sfc.name;
    sfc.mixins = sfc.mixins || [];
    sfc.mixins.push(src_utils_bem.default);
    return sfc;
}

exports.default = create;
