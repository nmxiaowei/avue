/*! Avue.js v3.9.1 | (c) 2017-2026 Smallwei | Released under the MIT License. */
import packages from '../core/packages.mjs';

var mock = (column, dicData, defaultForm, run) => {
    if (!run)
        return;
    const win = window;
    if (!win.Mock) {
        packages.logs('mock');
        return;
    }
    const mockjs = win.Mock;
    const Random = (mockjs || {}).Random;
    const form = {};
    function createName({ en }) {
        if (en) {
            return Random.name(true);
        }
        return Random.cname();
    }
    function createImage({ size, text, base64 }) {
        const imageSize = size || Random.natural(200, 400);
        const textColor = text ? '#000000' : Random.color();
        const bgColor = text ? '#ffffff' : Random.color();
        if (base64) {
            return Random.dataImage(imageSize, text);
        }
        return Random.image(imageSize, bgColor, textColor, 'png', text || Random.name());
    }
    function createId({ uuid }) {
        if (uuid) {
            return mockjs.mock('@guid');
        }
        return mockjs.mock('@id');
    }
    function createTel() {
        return mockjs.mock(/^1[3-9]\d{9}$/);
    }
    function createNumber({ max, min, precision }) {
        if (precision) {
            const number = Random.float(min, max, precision) + '';
            const index = number.indexOf('.') + 1;
            return Number(number.substring(0, index + precision));
        }
        return Random.integer(min, max);
    }
    function createUrl({ header }) {
        let url = Random.url();
        const index = url.indexOf('://');
        if (header === false) {
            url = url.substring(index + 3);
        }
        else {
            url = 'http://' + url.substring(index + 3);
        }
        return url;
    }
    function createDatetime({ format, now }) {
        if (now) {
            return Random.now(format);
        }
        return Random.datetime(format);
    }
    function createText({ min, max }) {
        return Random.csentence(min, max);
    }
    function createCounty() {
        return Random.county(true);
    }
    function createDic({ dic, props, columnType, multiple }) {
        const value = props.value || 'value';
        const len = dic.length;
        if (len === 0)
            return;
        if (['checkbox'].includes(columnType) || multiple) {
            const number = createNumber({
                min: 1,
                max: len,
            });
            const result = [];
            for (let i = 0; i < number; i++) {
                let flag = true;
                while (flag) {
                    const numbers = createNumber({
                        min: 0,
                        max: len - 1,
                    });
                    const values = dic[numbers][value];
                    if (!result.includes(values)) {
                        result.push(values);
                        flag = false;
                    }
                }
            }
            return result;
        }
        const number = createNumber({
            min: 0,
            max: len - 1,
        });
        return dic[number][value];
    }
    function create() {
        Object.keys(column).forEach((index) => {
            const ele = column[index];
            const isObject = typeof ele.mock === 'object';
            const params = isObject ? ele.mock || {} : {};
            params.dic = dicData[ele.prop] || [];
            params.props = ele.props || {};
            params.columnType = ele.type;
            params.multiple = ele.multiple;
            const dataGenerator = {
                name: createName,
                number: createNumber,
                datetime: createDatetime,
                word: createText,
                tel: createTel,
                id: createId,
                image: createImage,
                url: createUrl,
                county: createCounty,
                dic: createDic,
            };
            if (isObject && dataGenerator[params.type]) {
                if (params.array) {
                    form[ele.prop] = Array.from({ length: params.array }, () => dataGenerator[params.type](params));
                }
                else {
                    form[ele.prop] = dataGenerator[params.type](params);
                }
            }
            else if (ele.mock instanceof Function) {
                form[ele.prop] = ele.mock(defaultForm, mockjs);
            }
        });
    }
    create();
    return form;
};

export { mock as default };
