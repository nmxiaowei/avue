/*! Avue.js v3.8.6 | (c) 2017-2026 Smallwei | Released under the MIT License. */
function validatenull(val) {
    if (val instanceof Date || typeof val === 'boolean' || typeof val === 'number') {
        return false;
    }
    if (Array.isArray(val)) {
        return val.length === 0;
    }
    if (val instanceof Object) {
        for (const key in val) {
            return false;
        }
        return true;
    }
    return (val === 'null' ||
        val == null ||
        val === 'undefined' ||
        val === '');
}

export { validatenull };
