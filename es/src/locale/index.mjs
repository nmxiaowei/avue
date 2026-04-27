/*! Avue.js v3.9.1 | (c) 2017-2026 Smallwei | Released under the MIT License. */
import enLang from './lang/en.mjs';
import zhLang from './lang/zh.mjs';
import defaultLang from './lang/zh-cn.mjs';
import _merge from 'lodash-es/merge.js';

const DEFAULT_LOCALE = 'zh-cn';
const RE_NARGS = /(%|)\{([0-9a-zA-Z_]+)\}/g;
const format = (string = '', ...args) => {
    let formatArgs = args;
    if (args.length === 1 && typeof args[0] === 'object') {
        formatArgs = args[0];
    }
    if (!formatArgs || typeof formatArgs !== 'object') {
        formatArgs = {};
    }
    return string.replace(RE_NARGS, (match, _prefix, key, index) => {
        if (string[index - 1] === '{' && string[index + match.length] === '}') {
            return key;
        }
        const result = Object.prototype.hasOwnProperty.call(formatArgs, key)
            ? formatArgs[key]
            : null;
        return result == null ? '' : String(result);
    });
};
const isPlainObject = (value) => Object.prototype.toString.call(value) === '[object Object]';
const resolveByPath = (path, locale) => {
    return path.split('.').reduce((current, key) => {
        if (current == null)
            return undefined;
        return current[key];
    }, locale);
};
const normalizeLocaleCode = (code) => code.trim().toLowerCase();
const getGlobalLocaleRegistry = () => {
    const globalObject = typeof globalThis !== 'undefined'
        ? globalThis
        : typeof window !== 'undefined'
            ? window
            : undefined;
    if (!globalObject)
        return {};
    if (!isPlainObject(globalObject.AVUE_LANG)) {
        globalObject.AVUE_LANG = {};
    }
    return globalObject.AVUE_LANG;
};
const localeRegistry = {};
const rememberLocale = (code, locale) => {
    localeRegistry[code] = locale;
    const globalRegistry = getGlobalLocaleRegistry();
    globalRegistry[code] = locale;
};
const resolveRegisteredLocale = (code) => {
    if (typeof code !== 'string' || !code.trim())
        return null;
    const normalizedCode = normalizeLocaleCode(code);
    const shortCode = normalizedCode.split('-')[0];
    const candidates = shortCode !== normalizedCode ? [normalizedCode, shortCode] : [normalizedCode];
    const globalRegistry = getGlobalLocaleRegistry();
    for (const candidate of candidates) {
        const registered = localeRegistry[candidate] ||
            (isPlainObject(globalRegistry[candidate]) ? globalRegistry[candidate] : undefined);
        if (registered) {
            localeRegistry[candidate] = registered;
            return {
                code: candidate,
                locale: registered
            };
        }
    }
    return null;
};
const buildLocaleState = (code) => {
    const merged = _merge({}, defaultLang);
    const resolved = resolveRegisteredLocale(code);
    if (resolved) {
        return {
            code: resolved.code,
            locale: _merge({}, merged, resolved.locale)
        };
    }
    return {
        code: DEFAULT_LOCALE,
        locale: merged
    };
};
const register = function (code, locale, aliases = []) {
    if (!code || !isPlainObject(locale))
        return locale;
    [code, ...aliases]
        .map((name) => normalizeLocaleCode(name))
        .filter(Boolean)
        .forEach((name) => rememberLocale(name, locale));
    return locale;
};
register('en', enLang);
register('zh', zhLang);
register(DEFAULT_LOCALE, defaultLang);
let currentCode = DEFAULT_LOCALE;
let currentLang = buildLocaleState(DEFAULT_LOCALE).locale;
let i18nHandler = null;
const t = function (path, options) {
    if (typeof i18nHandler === 'function') {
        const translated = i18nHandler.call(this, path, options, currentLang);
        if (translated !== undefined && translated !== null && translated !== path) {
            return typeof translated === 'string'
                ? format(translated, options)
                : translated;
        }
    }
    const value = resolveByPath(path, currentLang);
    if (typeof value === 'string')
        return format(value, options);
    if (value === undefined || value === null)
        return '';
    return value;
};
const use = function (locale, override) {
    const localeState = typeof locale === 'string' ? buildLocaleState(locale) : buildLocaleState(currentCode);
    currentCode = localeState.code;
    currentLang = localeState.locale;
    const extraLocale = typeof locale === 'string' ? override : locale;
    if (isPlainObject(extraLocale)) {
        currentLang = _merge({}, currentLang, extraLocale);
    }
    return currentLang;
};
const i18n = function (fn) {
    i18nHandler = typeof fn === 'function' ? fn : null;
    return i18nHandler;
};
const getLocale = function (code) {
    if (typeof code === 'string') {
        return buildLocaleState(code).locale;
    }
    return currentLang;
};
const getLocaleCode = function () {
    return currentCode;
};
var locale = { register, use, t, i18n, getLocale, getLocaleCode };

export { locale as default, getLocale, getLocaleCode, i18n, register, t, use };
