import enLang from './lang/en';
import zhLang from './lang/zh';
import defaultLang from './lang/zh-cn';
import _merge from 'lodash/merge';

type TemplateArgs = Record<string, any> | any[];
type LocalePrimitive = string | number | boolean;
interface LocaleMessages {
  [key: string]: LocalePrimitive | LocaleMessages | Array<LocalePrimitive | LocaleMessages>;
}
type LocaleInput = string | LocaleMessages | null | undefined;
type LocaleRegistry = Record<string, LocaleMessages>;
type TranslateHandler = (
  this: any,
  path: string,
  options?: any,
  locale?: LocaleMessages
) => unknown;

const DEFAULT_LOCALE = 'zh-cn';
const RE_NARGS = /(%|)\{([0-9a-zA-Z_]+)\}/g;

const format = (string = '', ...args: any[]): string => {
  let formatArgs: TemplateArgs = args;

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
      ? (formatArgs as Record<string, any>)[key]
      : null;

    return result == null ? '' : String(result);
  });
};

const isPlainObject = (value: unknown): value is Record<string, any> =>
  Object.prototype.toString.call(value) === '[object Object]';

const resolveByPath = (path: string, locale: LocaleMessages) => {
  return path.split('.').reduce<any>((current, key) => {
    if (current == null) return undefined;
    return current[key];
  }, locale);
};

const normalizeLocaleCode = (code: string) => code.trim().toLowerCase();

const getGlobalLocaleRegistry = (): LocaleRegistry => {
  const globalObject =
    typeof globalThis !== 'undefined'
      ? (globalThis as Record<string, any>)
      : typeof window !== 'undefined'
        ? (window as unknown as Record<string, any>)
        : undefined;

  if (!globalObject) return {};
  if (!isPlainObject(globalObject.AVUE_LANG)) {
    globalObject.AVUE_LANG = {};
  }
  return globalObject.AVUE_LANG as LocaleRegistry;
};

const localeRegistry: LocaleRegistry = {};

const rememberLocale = (code: string, locale: LocaleMessages) => {
  localeRegistry[code] = locale;
  const globalRegistry = getGlobalLocaleRegistry();
  globalRegistry[code] = locale;
};

const resolveRegisteredLocale = (
  code?: string
): { code: string; locale: LocaleMessages } | null => {
  if (typeof code !== 'string' || !code.trim()) return null;

  const normalizedCode = normalizeLocaleCode(code);
  const shortCode = normalizedCode.split('-')[0];
  const candidates = shortCode !== normalizedCode ? [normalizedCode, shortCode] : [normalizedCode];
  const globalRegistry = getGlobalLocaleRegistry();

  for (const candidate of candidates) {
    const registered =
      localeRegistry[candidate] ||
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

const buildLocaleState = (code?: string) => {
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

export const register = function (
  code: string,
  locale: LocaleMessages,
  aliases: string[] = []
) {
  if (!code || !isPlainObject(locale)) return locale;

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
let i18nHandler: TranslateHandler | null = null;

export const t = function (this: any, path: string, options?: any) {
  if (typeof i18nHandler === 'function') {
    const translated = i18nHandler.call(this, path, options, currentLang);
    if (translated !== undefined && translated !== null && translated !== path) {
      return typeof translated === 'string'
        ? format(translated, options)
        : translated;
    }
  }

  const value = resolveByPath(path, currentLang);
  if (typeof value === 'string') return format(value, options);
  if (value === undefined || value === null) return '';
  return value;
};

export const use = function (locale?: LocaleInput, override?: LocaleMessages) {
  const localeState =
    typeof locale === 'string' ? buildLocaleState(locale) : buildLocaleState(currentCode);

  currentCode = localeState.code;
  currentLang = localeState.locale;

  const extraLocale = typeof locale === 'string' ? override : locale;
  if (isPlainObject(extraLocale)) {
    currentLang = _merge({}, currentLang, extraLocale);
  }

  return currentLang;
};

export const i18n = function (fn?: TranslateHandler | null) {
  i18nHandler = typeof fn === 'function' ? fn : null;
  return i18nHandler;
};

export const getLocale = function (code?: string) {
  if (typeof code === 'string') {
    return buildLocaleState(code).locale;
  }
  return currentLang;
};

export const getLocaleCode = function () {
  return currentCode;
};

export default { register, use, t, i18n, getLocale, getLocaleCode };
