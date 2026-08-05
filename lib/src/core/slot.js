/*! Avue.js v3.9.3 | (c) 2017-2026 Smallwei | Released under the MIT License. */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var slot = {
    methods: {
        getSlotName(item = {}, type = 'D', slot) {
            const result = {
                F: '-form',
                H: '-header',
                E: '-error',
                L: '-label',
                S: '-search',
                T: '-type',
                D: '',
            };
            const name = item.prop + result[type];
            if (slot)
                return slot[name];
            return name;
        },
        getSlotList(list = [], slot, propList) {
            const propNames = propList.map((ele) => ele.prop);
            return Object.keys(slot).filter((ele) => {
                let result = false;
                if (!propNames.includes(ele)) {
                    list.forEach((name) => {
                        if (ele.includes(name))
                            result = true;
                    });
                }
                return result;
            });
        },
    },
};

exports.default = slot;
