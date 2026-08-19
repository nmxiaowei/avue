/*! Avue.js v3.9.4 | (c) 2017-2026 Smallwei | Released under the MIT License. */
'use strict';

const getClient = (params) => {
    const client = new OSS(params);
    return client;
};

exports.getClient = getClient;
