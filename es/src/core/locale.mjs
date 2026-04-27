/*! Avue.js v3.9.1 | (c) 2017-2026 Smallwei | Released under the MIT License. */
import { t } from '../locale/index.mjs';

var locale = {
    methods: {
        t(...args) {
            return t.apply(this, args);
        },
    },
};

export { locale as default };
