/*! Avue.js v3.9.3 | (c) 2017-2026 Smallwei | Released under the MIT License. */
const log = {};
function typeColor(type = 'default') {
    let color = '';
    switch (type) {
        case 'default':
            color = '#35495E';
            break;
        case 'primary':
            color = '#3488ff';
            break;
        case 'success':
            color = '#43B883';
            break;
        case 'warning':
            color = '#e6a23c';
            break;
        case 'danger':
            color = '#f56c6c';
            break;
    }
    return color;
}
log.capsule = function (title, info, type = 'primary') {
    console.log(`%c ${title} %c ${info} %c`, 'background:#35495E; padding: 1px; border-radius: 3px 0 0 3px; color: #fff;', `background:${typeColor(type)}; padding: 1px; border-radius: 0 3px 3px 0;  color: #fff;`, 'background:transparent');
};
log.colorful = function (textArr) {
    console.log(`%c${textArr.map((t) => t.text || '').join('%c')}`, ...textArr.map((t) => `color: ${typeColor(t.type)};`));
};
log.default = function (text) {
    log.colorful([{ text }]);
};
log.primary = function (text) {
    log.colorful([{ text, type: 'primary' }]);
};
log.success = function (text) {
    log.colorful([{ text, type: 'success' }]);
};
log.warning = function (text) {
    log.colorful([{ text, type: 'warning' }]);
};
log.danger = function (text) {
    log.colorful([{ text, type: 'danger' }]);
};

export { log as default };
