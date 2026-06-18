/*! Avue.js v3.9.2 | (c) 2017-2026 Smallwei | Released under the MIT License. */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var custom = {
    props: {
        render: Function,
        row: Object,
        index: [String, Number],
        column: {
            type: Object,
            default: () => {
                return {};
            },
        },
        dic: {
            type: Array,
            default: () => {
                return [];
            },
        },
        params: {
            type: Object,
            default: () => {
                return {};
            },
        },
        event: {
            type: Object,
            default: () => {
                return {};
            },
        },
    },
    render() {
        return this.render.call(this, {
            column: this.column,
            dic: this.dic,
            params: this.params,
            event: this.event,
            row: this.row,
            index: this.index,
        });
    },
};

exports.default = custom;
