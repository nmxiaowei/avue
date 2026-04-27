/*! Avue.js v3.9.0 | (c) 2017-2026 Smallwei | Released under the MIT License. */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var src_locale_index = require('../locale/index.js');

var locale = {
    methods: {
        t(...args) {
            return src_locale_index.t.apply(this, args);
        },
    },
};

exports.default = locale;
