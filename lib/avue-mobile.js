/*!
 *  Avue.js v1.0.11-alpha.1
 *  (c) 2017-2019 Smallwei
 *  Released under the MIT License.
 * 
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("Vue"));
	else if(typeof define === 'function' && define.amd)
		define("AVUE", ["Vue"], factory);
	else if(typeof exports === 'object')
		exports["AVUE"] = factory(require("Vue"));
	else
		root["AVUE"] = factory(root["Vue"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_73__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 67);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return warning; });
/* harmony export (immutable) */ __webpack_exports__["d"] = format;
/* harmony export (immutable) */ __webpack_exports__["e"] = isEmptyValue;
/* unused harmony export isEmptyObject */
/* harmony export (immutable) */ __webpack_exports__["a"] = asyncMap;
/* harmony export (immutable) */ __webpack_exports__["b"] = complementError;
/* harmony export (immutable) */ __webpack_exports__["c"] = deepMerge;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_typeof__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_typeof___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_typeof__);


var formatRegExp = /%[sdj%]/g;

var warning = function warning() {};

// don't print warning message when in production env or node runtime
if (process.env.NODE_ENV !== 'production' && typeof window !== 'undefined' && typeof document !== 'undefined') {
  warning = function warning(type, errors) {
    if (typeof console !== 'undefined' && console.warn) {
      if (errors.every(function (e) {
        return typeof e === 'string';
      })) {
        console.warn(type, errors);
      }
    }
  };
}

function format() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  var i = 1;
  var f = args[0];
  var len = args.length;
  if (typeof f === 'function') {
    return f.apply(null, args.slice(1));
  }
  if (typeof f === 'string') {
    var str = String(f).replace(formatRegExp, function (x) {
      if (x === '%%') {
        return '%';
      }
      if (i >= len) {
        return x;
      }
      switch (x) {
        case '%s':
          return String(args[i++]);
        case '%d':
          return Number(args[i++]);
        case '%j':
          try {
            return JSON.stringify(args[i++]);
          } catch (_) {
            return '[Circular]';
          }
          break;
        default:
          return x;
      }
    });
    for (var arg = args[i]; i < len; arg = args[++i]) {
      str += ' ' + arg;
    }
    return str;
  }
  return f;
}

function isNativeStringType(type) {
  return type === 'string' || type === 'url' || type === 'hex' || type === 'email' || type === 'pattern';
}

function isEmptyValue(value, type) {
  if (value === undefined || value === null) {
    return true;
  }
  if (type === 'array' && Array.isArray(value) && !value.length) {
    return true;
  }
  if (isNativeStringType(type) && typeof value === 'string' && !value) {
    return true;
  }
  return false;
}

function isEmptyObject(obj) {
  return Object.keys(obj).length === 0;
}

function asyncParallelArray(arr, func, callback) {
  var results = [];
  var total = 0;
  var arrLength = arr.length;

  function count(errors) {
    results.push.apply(results, errors);
    total++;
    if (total === arrLength) {
      callback(results);
    }
  }

  arr.forEach(function (a) {
    func(a, count);
  });
}

function asyncSerialArray(arr, func, callback) {
  var index = 0;
  var arrLength = arr.length;

  function next(errors) {
    if (errors && errors.length) {
      callback(errors);
      return;
    }
    var original = index;
    index = index + 1;
    if (original < arrLength) {
      func(arr[original], next);
    } else {
      callback([]);
    }
  }

  next([]);
}

function flattenObjArr(objArr) {
  var ret = [];
  Object.keys(objArr).forEach(function (k) {
    ret.push.apply(ret, objArr[k]);
  });
  return ret;
}

function asyncMap(objArr, option, func, callback) {
  if (option.first) {
    var flattenArr = flattenObjArr(objArr);
    return asyncSerialArray(flattenArr, func, callback);
  }
  var firstFields = option.firstFields || [];
  if (firstFields === true) {
    firstFields = Object.keys(objArr);
  }
  var objArrKeys = Object.keys(objArr);
  var objArrLength = objArrKeys.length;
  var total = 0;
  var results = [];
  var next = function next(errors) {
    results.push.apply(results, errors);
    total++;
    if (total === objArrLength) {
      callback(results);
    }
  };
  objArrKeys.forEach(function (key) {
    var arr = objArr[key];
    if (firstFields.indexOf(key) !== -1) {
      asyncSerialArray(arr, func, next);
    } else {
      asyncParallelArray(arr, func, next);
    }
  });
}

function complementError(rule) {
  return function (oe) {
    if (oe && oe.message) {
      oe.field = oe.field || rule.fullField;
      return oe;
    }
    return {
      message: oe,
      field: oe.field || rule.fullField
    };
  };
}

function deepMerge(target, source) {
  if (source) {
    for (var s in source) {
      if (source.hasOwnProperty(s)) {
        var value = source[s];
        if ((typeof value === 'undefined' ? 'undefined' : __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_typeof___default()(value)) === 'object' && __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_typeof___default()(target[s]) === 'object') {
          target[s] = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, target[s], value);
        } else {
          target[s] = value;
        }
      }
    }
  }
  return target;
}
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(109)))

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__required__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__whitespace__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__type__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__range__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__enum__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pattern__ = __webpack_require__(116);







/* harmony default export */ __webpack_exports__["a"] = ({
  required: __WEBPACK_IMPORTED_MODULE_0__required__["a" /* default */],
  whitespace: __WEBPACK_IMPORTED_MODULE_1__whitespace__["a" /* default */],
  type: __WEBPACK_IMPORTED_MODULE_2__type__["a" /* default */],
  range: __WEBPACK_IMPORTED_MODULE_3__range__["a" /* default */],
  'enum': __WEBPACK_IMPORTED_MODULE_4__enum__["a" /* default */],
  pattern: __WEBPACK_IMPORTED_MODULE_5__pattern__["a" /* default */]
});

/***/ }),
/* 2 */
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file.
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate

    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (sfc) {
  sfc.name = _variable.KEY_COMPONENT_NAME + sfc.name;
  sfc.mixins = sfc.mixins || [];
  sfc.mixins.push(_bem2.default);
  return sfc;
};

var _bem = __webpack_require__(131);

var _bem2 = _interopRequireDefault(_bem);

var _variable = __webpack_require__(53);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 4 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  // props配置
  var propsDefault = {
    id: 'id',
    label: 'label',
    value: 'value',
    children: 'children',
    disabled: 'disabled'
  };
  // httpProps配置
  var propsHttpDefault = {
    name: 'name',
    url: 'url',
    res: ''
  };
  return {
    data: function data() {
      return {
        text: undefined,
        propsHttpDefault: propsHttpDefault,
        propsDefault: propsDefault
      };
    },

    props: {
      blur: Function,
      focus: Function,
      change: Function,
      click: Function,
      tpyeformat: Function,
      value: {},
      column: {
        type: Object,
        default: function _default() {}
      },
      typeslot: {
        type: Boolean,
        default: false
      },
      label: {
        type: String,
        default: ''
      },
      readonly: {
        type: Boolean,
        default: false
      },
      size: {
        type: String,
        default: ''
      },
      tip: {
        type: String,
        default: ''
      },
      disabled: {
        type: Boolean,
        default: false
      },
      dataType: {
        type: String
      },
      clearable: {
        type: Boolean,
        default: true
      },
      type: {
        type: String,
        default: ''
      },
      dicUrl: {
        type: String,
        default: ''
      },
      dicMethod: {
        type: String,
        default: ''
      },
      dicQuery: {
        type: Object,
        default: function _default() {
          return {};
        }
      },
      dic: {
        type: Array,
        default: function _default() {
          return [];
        }
      },
      placeholder: {
        type: String,
        default: ''
      },
      rules: {
        type: Array
      },
      min: {
        type: Number
      },
      max: {
        type: Number
      },
      multiple: {
        type: Boolean,
        default: false
      },
      row: {
        type: Boolean,
        default: false
      },
      prop: {
        type: String,
        default: ''
      },
      border: {
        type: Boolean,
        default: false
      },
      propsHttp: {
        type: Object,
        default: function _default() {
          return propsHttpDefault;
        }
      },
      props: {
        type: Object,
        default: function _default() {
          return propsDefault;
        }
      }
    },
    watch: {
      value: {
        handler: function handler() {
          this.initVal();
        },

        immediate: true
      }
    },
    computed: {
      required: function required() {
        return !this.validatenull(this.rules);
      },
      isArray: function isArray() {
        return this.dataType === 'array';
      },
      isString: function isString() {
        return this.dataType === 'string';
      },
      isNumber: function isNumber() {
        return this.dataType === 'number';
      },

      nameKey: function nameKey() {
        return this.propsHttp.name || this.propsHttpDefault.name;
      },
      urlKey: function urlKey() {
        return this.propsHttp.url || this.propsHttpDefault.url;
      },
      resKey: function resKey() {
        return this.propsHttp.res || this.propsHttpDefault.res;
      },
      valueKey: function valueKey() {
        return this.props.value || this.propsDefault.value;
      },
      labelKey: function labelKey() {
        return this.props.label || this.propsDefault.label;
      },
      childrenKey: function childrenKey() {
        return this.props.children || this.propsDefault.children;
      },
      disabledKey: function disabledKey() {
        return this.props.disabled || this.propsDefault.disabled;
      },
      idKey: function idKey() {
        return this.props.id || this.propsDefault.id;
      }
    },
    created: function created() {},

    methods: {
      initVal: function initVal() {
        this.text = (0, _dataformat.initVal)({
          type: this.type,
          multiple: this.multiple,
          dataType: this.dataType,
          value: this.value
        });
      }
    }
  };
};

var _dataformat = __webpack_require__(56);

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  return {
    methods: {
      handleFocus: function handleFocus() {
        typeof this.focus === 'function' && this.focus();
      },
      handleBlur: function handleBlur() {
        typeof this.blur === 'function' && this.blur();
      },
      getLabelText: function getLabelText(item) {
        if (typeof this.tpyeformat === 'function') {
          return this.tpyeformat(item, this.labelKey, this.valueKey);
        }
        return item[this.labelKey];
      },
      handleClick: function handleClick() {
        var result = this.isString && this.multiple ? this.text.join(',') : this.text;
        if (typeof this.click === 'function') {
          this.click({ value: result, column: this.column });
        }
      },
      handleChange: function handleChange(value) {
        var result = value;
        if ((this.isString || this.isNumber) && (this.multiple || ['checkbox', 'cascader', 'dynamic'].includes(this.type))) {
          result = value.join(',');
        }

        if (typeof this.change === 'function') {
          this.change({ value: result, column: this.column });
        }
        this.$emit('input', result);
        this.$emit('change', result);
      }
    }
  };
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.vaildData = exports.getPasswordChar = exports.findArray = exports.filterForm = exports.getObjValue = exports.getDeepData = exports.findByValue = exports.setPx = exports.sortArrys = exports.deepClone = exports.isJson = exports.getObjType = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.hasOwn = hasOwn;

var _validate = __webpack_require__(14);

var hasOwnProperty = Object.prototype.hasOwnProperty;

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
};
var getObjType = exports.getObjType = function getObjType(obj) {
  var toString = Object.prototype.toString;
  var map = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object'
  };
  if (obj instanceof Element) {
    return 'element';
  }
  return map[toString.call(obj)];
};
/**
 *判断是否为json对象
 */

var isJson = exports.isJson = function isJson(str) {
  if (Array.isArray(str)) {
    if (str[0] instanceof Object) {
      return true;
    } else {
      return false;
    }
  } else if (str instanceof Object) {
    return true;
  }
  return false;
};
/**
 * 对象深拷贝
 */
var deepClone = exports.deepClone = function deepClone(data) {
  var type = getObjType(data);
  var obj;
  if (type === 'array') {
    obj = [];
  } else if (type === 'object') {
    obj = {};
  } else {
    // 不再具有下一层次
    return data;
  }
  if (type === 'array') {
    for (var i = 0, len = data.length; i < len; i++) {
      delete data[i].$parent;
      obj.push(deepClone(data[i]));
    }
  } else if (type === 'object') {
    for (var key in data) {
      delete data.$parent;
      obj[key] = deepClone(data[key]);
    }
  }
  return obj;
};
var sortArrys = exports.sortArrys = function sortArrys(list, prop) {
  list.sort(function (a, b) {
    if (a[prop] > b[prop]) {
      return -1;
    }
    if (a[prop] < b[prop]) {
      return 1;
    }
    return 0;
  });
  return list;
};

/**
 * 设置px
 */
var setPx = exports.setPx = function setPx(val) {
  var defval = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  if ((0, _validate.validatenull)(val)) val = defval;
  if ((0, _validate.validatenull)(val)) return '';
  val = val + '';
  if (val.indexOf('%') === -1) {
    val = val + 'px';
  }
  return val;
};

/**
 * 根据字典的value显示label
 */
var result = '';
var findByValue = exports.findByValue = function findByValue(dic, value, props, first, isTree) {
  props = props || {};
  var labelKey = props.label || 'label';
  var valueKey = props.value || 'value';
  var childrenKey = props.children || 'children';
  if (first) result = value;
  if ((0, _validate.validatenull)(dic)) return result;
  // 正常字典
  if (['string', 'number', 'boolean'].includes(typeof value === 'undefined' ? 'undefined' : _typeof(value))) {
    for (var i = 0; i < dic.length; i++) {
      if (dic[i][valueKey] === value) {
        result = dic[i][labelKey];
        break;
      } else {
        findByValue(dic[i][childrenKey], value, props, false, isTree);
      }
    }
  } else if (value instanceof Array) {
    var index = 0;
    var count = 0;
    result = [];
    while (count < value.length) {
      index = findArray(dic, value[count], valueKey);
      if (index !== -1) result.push(dic[index][labelKey]);else result.push(value[count]);
      if (isTree) dic = dic[index][childrenKey];
      count++;
    }
    result = result.join(',').toString();
  }
  return result;
};

var getDeepData = exports.getDeepData = function getDeepData(res) {
  return (Array.isArray(res) ? res : res.data) || [];
};
var getObjValue = exports.getObjValue = function getObjValue(data) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var type = arguments[2];

  var list = params.split('.');
  var result = data;
  if (list[0] === '' && type !== 'object') {
    return getDeepData(data);
  } else if (list[0] !== '') {
    list.forEach(function (ele) {
      result = result[ele];
    });
  }
  return result;
};
var filterForm = exports.filterForm = function filterForm(form) {
  var obj = {};
  Object.keys(form).forEach(function (ele) {
    if (!(0, _validate.validatenull)(form[ele])) {
      obj[ele] = form[ele];
    }
  });
  return obj;
};
/**
 * 根据字典的value查找对应的index
 */

var findArray = exports.findArray = function findArray(dic, value, valueKey) {
  valueKey = valueKey || 'value';
  for (var i = 0; i < dic.length; i++) {
    if (dic[i][valueKey] === value) {
      return i;
    }
  }
  return -1;
};

var getPasswordChar = exports.getPasswordChar = function getPasswordChar() {
  var result = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var char = arguments[1];

  var len = result.toString().length;
  result = '';
  for (var i = 0; i < len; i++) {
    result = result + char;
  }
  return result;
};

var vaildData = exports.vaildData = function vaildData(val, dafult) {
  if (typeof val === 'boolean') {
    return val;
  }
  return !(0, _validate.validatenull)(val) ? val : dafult;
};

/***/ }),
/* 8 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(10);
var createDesc = __webpack_require__(19);
module.exports = __webpack_require__(11) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(18);
var IE8_DOM_DEFINE = __webpack_require__(42);
var toPrimitive = __webpack_require__(26);
var dP = Object.defineProperty;

exports.f = __webpack_require__(11) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(17)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(45);
var defined = __webpack_require__(27);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(30)('wks');
var uid = __webpack_require__(22);
var Symbol = __webpack_require__(4).Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.asyncValidator = undefined;
exports.validatenull = validatenull;

var _asyncValidator = __webpack_require__(76);

var _asyncValidator2 = _interopRequireDefault(_asyncValidator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 判断是否为空
 */
function validatenull(val) {
  if (typeof val === 'boolean') {
    return false;
  }
  if (typeof val === 'number') {
    return false;
  }
  if (val instanceof Array) {
    if (val.length === 0) return true;
  } else if (val instanceof Object) {
    if (JSON.stringify(val) === '{}') return true;
  } else {
    if (val === 'null' || val == null || val === 'undefined' || val === undefined || val === '') {
      return true;
    }
    return false;
  }
  return false;
}
var asyncValidator = exports.asyncValidator = function asyncValidator(rules, form) {
  var option = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return new Promise(function (resolve, reject) {
    var schema = new _asyncValidator2.default(rules);
    schema.validate(form, option, function (errors) {
      if (errors) {
        reject(errors);
      } else {
        resolve();
      }
    });
  });
};

/***/ }),
/* 15 */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.6.5' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(16);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(44);
var enumBugKeys = __webpack_require__(31);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = true;


/***/ }),
/* 22 */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),
/* 23 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _iterator = __webpack_require__(86);

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = __webpack_require__(98);

var _symbol2 = _interopRequireDefault(_symbol);

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(4);
var core = __webpack_require__(15);
var ctx = __webpack_require__(80);
var hide = __webpack_require__(9);
var has = __webpack_require__(8);
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && has(exports, key)) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(16);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),
/* 27 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),
/* 28 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(30)('keys');
var uid = __webpack_require__(22);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__(15);
var global = __webpack_require__(4);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: __webpack_require__(21) ? 'pure' : 'global',
  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
});


/***/ }),
/* 31 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),
/* 32 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 33 */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(10).f;
var has = __webpack_require__(8);
var TAG = __webpack_require__(13)('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(13);


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(4);
var core = __webpack_require__(15);
var LIBRARY = __webpack_require__(21);
var wksExt = __webpack_require__(35);
var defineProperty = __webpack_require__(10).f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _logs = __webpack_require__(55);

var _logs2 = _interopRequireDefault(_logs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var list = {
  'AliOSS': {
    url: 'https://avuex.avue.top/cdn/aliyun-oss-sdk.min.js',
    title: '阿里云云图片上传，需要引入OSS的sdk',
    version: '6.1.0',
    github: 'https://github.com/ali-sdk/ali-oss/'
  },
  'CryptoJS': {
    url: 'https://avuex.avue.top/cdn/CryptoJS.js',
    title: '七牛云图片上传，需要引入CryptoJS',
    version: '3.1.2'
  },
  'element-ui': {
    url: 'https://cdnjs.cloudflare.com/ajax/libs/element-ui/2.8.2/index.js',
    title: '需要引入Element-ui框架包',
    version: '2.4.11',
    gihub: 'https://github.com/ElemeFE/element'
  },
  'vant': {
    url: 'https://cdn.jsdelivr.net/npm/vant@1.6/lib/vant.min.js',
    title: '需要引入Vant框架包',
    version: '1.6',
    gihub: 'https://github.com/youzan/vant'
  },
  'file-saver': {
    url: 'https://cdn.bootcss.com/FileSaver.js/2014-11-29/FileSaver.min.js',
    title: '需要引入文件操作包',
    version: '2014-11-29',
    gihub: 'https://github.com/eligrey/FileSaver.js'
  },
  'xlsx': {
    url: 'https://cdn.bootcss.com/xlsx/0.14.1/xlsx.full.min.js',
    title: '需要引入excel操作包',
    version: '0.14.1',
    gihub: 'https://github.com/SheetJS/js-xlsx'
  },
  'mock': {
    url: 'https://cdn.bootcss.com/Mock.js/1.0.1-beta3/mock-min.js',
    title: '需要引入mock模拟数据包',
    version: '1.0.1-beta3',
    gihub: 'https://github.com/Colingo/mock'
  },
  'axios': {
    title: '使用网络字典需要引入以下包',
    url: 'https://cdn.bootcss.com/axios/0.19.0-beta.1/axios.js',
    version: '0.19.0-beta.1',
    gihub: 'https://github.com/axios/axios'
  }
};

exports.default = function () {
  return {
    logs: function logs(name) {
      if (true) {
        var obj = list[name];
        _logs2.default.capsule(name, obj.title, 'warning');
        _logs2.default.warning('版本:' + (obj.version || '-'));
        _logs2.default.warning('CDN:' + (obj.url || '-'));
        _logs2.default.warning('GITHUB:' + (obj.gihub || '-'));
      }
    }
  };
}();

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _locale = __webpack_require__(39);

var _locale2 = _interopRequireDefault(_locale);

var _create = __webpack_require__(3);

var _create2 = _interopRequireDefault(_create);

var _init = __webpack_require__(132);

var _init2 = _interopRequireDefault(_init);

var _dataformat = __webpack_require__(56);

var _dic = __webpack_require__(54);

var _util = __webpack_require__(7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } } //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = (0, _create2.default)({
  name: "form",
  mixins: [(0, _init2.default)(), _locale2.default],
  data: function data() {
    return {
      form: {},
      formList: [],
      formDefault: {},
      formCreate: true,
      formCascaderInit: false,
      formCascaderList: []
    };
  },

  watch: {
    form: {
      handler: function handler() {
        if (!this.formCreate) {
          this.$emit("input", this.form);
          this.$emit("change", this.form);
        } else {
          this.formCreate = false;
        }
      },

      deep: true
    },
    value: {
      handler: function handler() {
        this.formOld = this.deepClone(this.value);
        if (!this.formCreate) {
          this.formVal();
        }
      },

      deep: true
    }
  },
  computed: {
    columnOption: function columnOption() {
      var list = (0, _dataformat.calcCascader)([].concat(_toConsumableArray(this.tableOption.column)) || []);
      return list;
    }
  },
  props: {
    value: {
      type: Object,
      required: true,
      default: function _default() {
        return {};
      }
    }
  },
  created: function created() {
    // 规则初始化
    this.rulesInit();
    //初始化字典
    this.handleLoadDic();
    // 初始化表单
    this.dataformat();
  },

  methods: {
    getComponent: _dataformat.getComponent,
    getPlaceholder: _dataformat.getPlaceholder,
    dataformat: function dataformat() {
      this.formDefault = (0, _dataformat.formInitVal)(this.columnOption);
      this.form = this.deepClone(this.formDefault.tableForm);
      this.formVal();
    },

    //搜索指定的属性配置
    findColumnIndex: function findColumnIndex(value) {
      var _this = this;

      var result = -1;
      this.columnOption.forEach(function (column) {
        result = _this.findArray(column.column, value, "prop");
      });
      return result;
    },
    handleChange: function handleChange(item, index) {
      var _this2 = this;

      var column = item[index]; //获取当前节点级联
      var list = column.cascader;
      var str = list.join(",");
      var value = this.form[column.prop];
      // 下一个节点
      var columnNext = item[index + 1] || {}; //获取下一个联动节点属性
      var columnNextProp = columnNext.prop;
      /**
       * 1.判断当前节点是否有下级节点
       * 2.判断当前节点是否有值
       */
      if (this.validatenull(list) || this.validatenull(value) || this.validatenull(columnNext)) {
        return;
      }

      // 如果不是首次加载则清空全部关联节点的属性值和字典值
      if (this.formList.includes(str)) {
        //清空子类字典列表和值
        list.forEach(function (ele) {
          _this2.form[ele] = "";
          _this2.$set(_this2.DIC, ele, []);
        });
      }
      // 根据当前节点值获取下一个节点的字典
      (0, _dic.sendDic)({ url: columnNext.dicUrl.replace("{{key}}", value) }).then(function (res) {
        var dic = Array.isArray(res) ? res : [];
        // 修改字典
        _this2.$set(_this2.DIC, columnNextProp, dic);
        /**
         * 1.是change多级默认联动
         * 2.字典不为空
         * 3.非首次加载
         */
        if (!_this2.validatenull(dic) && _this2.formList.includes(str)) {
          //取字典的指定项或则第一项
          var dicvalue = dic[columnNext.defaultIndex || 0];
          if (!dicvalue) dicvalue = dic[0];
          if (dicvalue) {
            _this2.form[columnNext.prop] = dicvalue[(columnNext.props || _this2.parentOption.props || {}).value || "value"];
            _this2.clearValidate();
          }
        }
        //首次加载的放入队列记录
        if (!_this2.formList.includes(str)) _this2.formList.push(str);
      });
    },
    formVal: function formVal() {
      var _this3 = this;

      Object.keys(this.value).forEach(function (ele) {
        _this3.form[ele] = _this3.value[ele];
      });
      this.$emit("input", this.form);
    },
    rulesInit: function rulesInit() {
      var _this4 = this;

      this.formRules = {};
      this.columnOption.forEach(function (ele) {
        if (ele.rules) _this4.formRules[ele.prop] = ele.rules;
      });
    },
    resetForm: function resetForm() {
      this.form = this.deepClone(this.formDefault.tableForm);
      this.$emit("input", this.form);
      this.$emit("reset-change");
    },
    submit: function submit() {
      var _this5 = this;

      var formRules = this.formRules;
      var form = this.form;
      Object.keys(formRules).forEach(function (ele) {
        var type = (0, _util.getObjType)(form[ele]);
        if (type !== "string") {
          formRules[ele].forEach(function (rule) {
            if (rule.required) {
              rule.type = type;
            }
          });
        }
      });
      this.asyncValidator(formRules, form, { firstFields: true }).then(function (res) {
        _this5.$emit("submit", _this5.form);
      }).catch(function (err) {
        _this5.$notify({
          message: err[0].message,
          duration: 1500
        });
      });
    }
  }
});

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _locale = __webpack_require__(40);

exports.default = {
  methods: {
    t: function t() {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _locale.t.apply(this, args);
    }
  }
};

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.i18n = exports.use = exports.locale = exports.t = undefined;

var _zh = __webpack_require__(71);

var _zh2 = _interopRequireDefault(_zh);

var _en = __webpack_require__(72);

var _en2 = _interopRequireDefault(_en);

var _vue = __webpack_require__(73);

var _vue2 = _interopRequireDefault(_vue);

var _deepmerge = __webpack_require__(74);

var _deepmerge2 = _interopRequireDefault(_deepmerge);

var _format = __webpack_require__(75);

var _format2 = _interopRequireDefault(_format);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var format = (0, _format2.default)(_vue2.default);
var lang = _zh2.default;
var merged = false;
var i18nHandler = function i18nHandler() {
  var vuei18n = Object.getPrototypeOf(this || _vue2.default).$t;
  if (typeof vuei18n === 'function' && !!_vue2.default.locale) {
    if (!merged) {
      merged = true;
      _vue2.default.locale(_vue2.default.config.lang, (0, _deepmerge2.default)(lang, _vue2.default.locale(_vue2.default.config.lang) || {}, { clone: true }));
    }
    return vuei18n.apply(this, arguments);
  }
};

var t = exports.t = function t(path, options) {
  var value = i18nHandler.apply(this, arguments);
  if (value !== null && value !== undefined) return value;

  var array = path.split('.');
  var current = lang;

  for (var i = 0, j = array.length; i < j; i++) {
    var property = array[i];
    value = current[property];
    if (i === j - 1) return format(value, options);
    if (!value) return '';
    current = value;
  }
  return '';
};

var locale = exports.locale = {
  zh: _zh2.default,
  en: _en2.default
};

var use = exports.use = function use(l) {
  lang = locale[l || 'zh'];
};

var i18n = exports.i18n = function i18n(fn) {
  i18nHandler = fn || i18nHandler;
};

exports.default = { use: use, t: t, i18n: i18n, locale: locale };

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _assign = __webpack_require__(77);

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _assign2.default || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(11) && !__webpack_require__(17)(function () {
  return Object.defineProperty(__webpack_require__(43)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(16);
var document = __webpack_require__(4).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(8);
var toIObject = __webpack_require__(12);
var arrayIndexOf = __webpack_require__(83)(false);
var IE_PROTO = __webpack_require__(29)('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(46);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),
/* 46 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(27);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(21);
var $export = __webpack_require__(25);
var redefine = __webpack_require__(49);
var hide = __webpack_require__(9);
var Iterators = __webpack_require__(33);
var $iterCreate = __webpack_require__(90);
var setToStringTag = __webpack_require__(34);
var getPrototypeOf = __webpack_require__(93);
var ITERATOR = __webpack_require__(13)('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(9);


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(18);
var dPs = __webpack_require__(91);
var enumBugKeys = __webpack_require__(31);
var IE_PROTO = __webpack_require__(29)('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(43)('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(92).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__(44);
var hiddenKeys = __webpack_require__(31).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),
/* 52 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(0);


/**
 *  Rule for validating required fields.
 *
 *  @param rule The validation rule.
 *  @param value The value of the field on the source object.
 *  @param source The source object being validated.
 *  @param errors An array of errors that this rule may add
 *  validation errors to.
 *  @param options The validation options.
 *  @param options.messages The validation messages.
 */
function required(rule, value, source, errors, options, type) {
  if (rule.required && (!source.hasOwnProperty(rule.field) || __WEBPACK_IMPORTED_MODULE_0__util__["e" /* isEmptyValue */](value, type || rule.type))) {
    errors.push(__WEBPACK_IMPORTED_MODULE_0__util__["d" /* format */](options.messages.required, rule.fullField));
  }
}

/* harmony default export */ __webpack_exports__["a"] = (required);

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var KEY_COMPONENT_NAME = exports.KEY_COMPONENT_NAME = 'avue-';
var KEY_ECHART_NAME = exports.KEY_ECHART_NAME = 'echart-';

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendDic = exports.loadDic = exports.loadCascaderDic = undefined;

var _packages = __webpack_require__(37);

var _packages2 = _interopRequireDefault(_packages);

var _validate = __webpack_require__(14);

var _util = __webpack_require__(7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var loadCascaderDic = exports.loadCascaderDic = function loadCascaderDic(columnOption, list) {
  return new Promise(function (resolve, reject) {
    var columnList = [];
    var result = [];
    var networkdic = {};
    columnOption.forEach(function (ele) {
      if (ele.parentProp) columnList.push(ele);
    });
    list.forEach(function (ele, index) {
      columnList.forEach(function (column) {
        result.push(new Promise(function (resolve) {
          if ((0, _validate.validatenull)(ele[column.parentProp])) {
            resolve({
              prop: column.prop,
              data: [],
              index: index
            });
          } else {
            sendDic(Object.assign({
              url: '' + column.dicUrl.replace('{{key}}', ele[column.parentProp])
            }, {
              resKey: (column.props || {}).res,
              method: column.dicMethod,
              query: column.dicQuery
            })).then(function (res) {
              resolve({
                prop: column.prop,
                data: res,
                index: index
              });
            });
          }
        }));
      });
    });
    Promise.all(result).then(function (data) {
      data.forEach(function (ele) {
        if ((0, _validate.validatenull)(networkdic[ele.index])) networkdic[ele.index] = {};
        networkdic[ele.index][ele.prop] = ele.data;
      });
      resolve(networkdic);
    });
  });
};
// 初始化方法
var loadDic = exports.loadDic = function loadDic(option) {
  var locationdic = {}; // 本地字典
  var networkdic = {}; // 网络字典
  var ajaxdic = []; // 发送ajax的字典
  return new Promise(function (resolve, reject) {
    // 本地字典赋值
    locationdic = option.dicData || {};

    var params = createdDic(option);
    locationdic = Object.assign(locationdic, params.locationdic);
    ajaxdic = params.ajaxdic;

    if ((0, _validate.validatenull)(locationdic) && (0, _validate.validatenull)(ajaxdic)) resolve();
    if (!window.axios && !(0, _validate.validatenull)(ajaxdic)) {
      _packages2.default.logs('axios');
      resolve();
    }
    handeDic(ajaxdic).then(function (res) {
      networkdic = res;
      resolve(Object.assign(locationdic, networkdic));
    }).catch(function (err) {
      reject(err);
    });
  });
};

// 创建字典区分本地字典和网络字典
function createdDic(option) {
  var _option$url = option.url,
      url = _option$url === undefined ? '' : _option$url,
      _option$column = option.column,
      column = _option$column === undefined ? [] : _option$column,
      _option$props = option.props,
      props = _option$props === undefined ? {} : _option$props;

  var ajaxdic = [];
  var locationdic = {};
  column.forEach(function (ele) {
    var dicData = ele.dicData;
    var dicUrl = ele.dicUrl;
    var prop = ele.prop;
    if (ele.dicFlag === false) return;
    if (Array.isArray(dicData)) {
      locationdic[prop] = dicData;
    } else if (!(0, _validate.validatenull)(dicUrl)) {
      ajaxdic.push({
        url: dicUrl || url,
        name: dicData || prop,
        method: ele.dicMethod,
        resKey: (ele.props || {}).res || (props || {}).res,
        query: ele.dicQuery
      });
    }
  });
  return {
    ajaxdic: ajaxdic,
    locationdic: locationdic
  };
}

// 循环处理字典
function handeDic(list) {
  var networkdic = {};
  var result = [];
  return new Promise(function (resolve) {
    list.forEach(function (ele) {
      result.push(new Promise(function (resolve) {
        sendDic(Object.assign(ele, {
          url: '' + ele.url.replace('{{key}}', '')
        })).then(function (res) {
          resolve(res);
        });
      }));
    });
    Promise.all(result).then(function (data) {
      list.forEach(function (ele, index) {
        networkdic[ele.name] = data[index];
      });
      resolve(networkdic);
    });
  });
}

// ajax获取字典
var sendDic = exports.sendDic = function sendDic(params) {
  var url = params.url,
      query = params.query,
      method = params.method,
      resKey = params.resKey;

  return new Promise(function (resolve) {
    var callback = function callback(res) {
      var list = (0, _util.getObjValue)(res.data, resKey);
      resolve(list);
    };
    if (method === 'post') {
      window.axios.post(url, query).then(function (res) {
        callback(res);
      }).catch(function () {
        return [resolve([])];
      });
    } else {
      window.axios.get(url, {
        params: query
      }).then(function (res) {
        callback(res);
      }).catch(function () {
        return [resolve([])];
      });
    }
  });
};

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var log = {};

/**
 * @description 返回这个样式的颜色值
 * @param {String} type 样式名称 [ primary | success | warning | danger | text ]
 */
function typeColor() {
  var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'default';

  var color = '';
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
    default:
      break;
  }
  return color;
}

/**
 * @description 打印一个 [ title | text ] 样式的信息
 * @param {String} title title text
 * @param {String} info info text
 * @param {String} type style
 */
log.capsule = function (title, info) {
  var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'primary';

  console.log('%c ' + title + ' %c ' + info + ' %c', 'background:#35495E; padding: 1px; border-radius: 3px 0 0 3px; color: #fff;', 'background:' + typeColor(type) + '; padding: 1px; border-radius: 0 3px 3px 0;  color: #fff;', 'background:transparent');
};

/**
 * @description 打印彩色文字
 */
log.colorful = function (textArr) {
  var _console;

  (_console = console).log.apply(_console, ['%c' + textArr.map(function (t) {
    return t.text || '';
  }).join('%c')].concat(_toConsumableArray(textArr.map(function (t) {
    return 'color: ' + typeColor(t.type) + ';';
  }))));
};

/**
 * @description 打印 default 样式的文字
 */
log.default = function (text) {
  log.colorful([{ text: text }]);
};

/**
 * @description 打印 primary 样式的文字
 */
log.primary = function (text) {
  log.colorful([{ text: text, type: 'primary' }]);
};

/**
 * @description 打印 success 样式的文字
 */
log.success = function (text) {
  log.colorful([{ text: text, type: 'success' }]);
};

/**
 * @description 打印 warning 样式的文字
 */
log.warning = function (text) {
  log.colorful([{ text: text, type: 'warning' }]);
};

/**
 * @description 打印 danger 样式的文字
 */
log.danger = function (text) {
  log.colorful([{ text: text, type: 'danger' }]);
};

exports.default = log;

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getType = exports.getPlaceholder = exports.formInitVal = exports.getComponent = exports.getSearchType = exports.getCellType = exports.initVal = exports.dateList = exports.calcCount = exports.calcCascader = undefined;

var _validate = __webpack_require__(14);

var _locale = __webpack_require__(39);

var _variable = __webpack_require__(53);

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * 计算级联属性
 */
var calcCascader = exports.calcCascader = function calcCascader() {
  var list = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

  list.forEach(function (ele, index) {
    if (ele.cascaderItem) {
      var cascader = [].concat(_toConsumableArray(ele.cascaderItem));
      var parentProp = ele.prop;
      list[index].cascader = [].concat(_toConsumableArray(cascader));
      cascader.forEach(function (citem, cindex) {
        var columnIndex = index + cindex + 1;
        list[columnIndex].parentProp = parentProp;
        list[columnIndex].cascaderChange = ele.cascaderChange;
        list[columnIndex].cascader = [].concat(_toConsumableArray(cascader)).splice(cindex + 1);
        parentProp = list[columnIndex].prop;
      });
    }
  });
  return list;
};
/**
 * 计算空白列row
 */
var count = 0;
var calcCount = exports.calcCount = function calcCount(ele) {
  var spanDefault = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 12;
  var init = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  if (init) count = 0;
  var spanAll = 24;
  count = count + (ele.span || spanDefault) + (ele.offset || 0);
  if (count === spanAll) {
    count = 0;
  } else if (count > spanAll) {
    count = 0 + (ele.span || spanDefault) + (ele.offset || 0);
  } else if (ele.row && count !== spanAll) {
    ele.count = spanAll - count;
    count = 0;
  }
  return ele;
};
/** 
* 日期控件集合
*/
var dateList = exports.dateList = ['dates', 'date', 'datetime', 'datetimerange', 'daterange', 'week', 'month', 'dategrpup', 'year'];
/**
 * 初始化数据格式
 */
var initVal = exports.initVal = function initVal(_ref) {
  var type = _ref.type,
      multiple = _ref.multiple,
      dataType = _ref.dataType,
      value = _ref.value;

  if (['select', 'tree'].includes(type) && multiple || ['checkbox', 'cascader', 'dynamic', 'upload'].includes(type)) {
    if (Array.isArray(value)) return value;else if (!(0, _validate.validatenull)(value)) {
      var list = (value || '').split(',') || [];
      if (dataType === 'number') {
        return list.map(function (ele) {
          return Number(ele);
        });
      } else {
        return list;
      }
    } else {
      return [];
    }
  }
  return value;
};

/**
 * 行编辑框获取动态组件
 */
var getCellType = exports.getCellType = function getCellType(type) {
  var result = 'input';
  if (['select', 'radio', 'checkbox'].includes(type)) {
    result = 'select';
  } else if (['time', 'timerange'].includes(type)) {
    result = 'time';
  } else if (dateList.includes(type)) {
    result = 'date';
  } else if (['cascader'].includes(type)) {
    result = 'cascader';
  } else if (['number'].includes(type)) {
    result = 'input-number';
  } else if (['switch'].includes(type)) {
    result = 'switch';
  }
  return _variable.KEY_COMPONENT_NAME + result;
};
/**
 * 搜索框获取动态组件
 */
var getSearchType = exports.getSearchType = function getSearchType(type) {
  var result = 'input';
  if (['select', 'radio', 'checkbox', 'switch'].includes(type)) {
    result = 'select';
  } else if (['time', 'timerange'].includes(type)) {
    result = 'time';
  } else if (dateList.includes(type)) {
    result = 'date';
  } else if (['cascader'].includes(type)) {
    result = 'cascader';
  } else if (['number'].includes(type)) {
    result = 'input-number';
  }
  return _variable.KEY_COMPONENT_NAME + result;
};

/**
 * 动态获取组件
 */
var getComponent = exports.getComponent = function getComponent(type, component) {
  var result = 'input';
  if (!(0, _validate.validatenull)(component)) {
    result = component;
  } else if (type === 'select') {
    result = 'select';
  } else if (type === 'radio') {
    result = 'radio';
  } else if (type === 'checkbox') {
    result = 'checkbox';
  } else if (['time', 'timerange'].includes(type)) {
    result = 'time';
  } else if (['dates', 'date', 'datetime', 'datetimerange', 'daterange', 'week', 'month', 'dategrpup', 'year'].includes(type)) {
    result = 'date';
  } else if (type === 'cascader') {
    result = 'cascader';
  } else if (type === 'number') {
    result = 'input-number';
  } else if (type === 'password') {
    result = 'input';
  } else if (type === 'switch') {
    result = 'switch';
  } else if (type === 'rate') {
    result = 'rate';
  } else if (type === 'upload') {
    result = 'upload';
  } else if (type === 'silder') {
    result = 'silder';
  } else if (type === 'dynamic') {
    result = 'dynamic';
  } else if (type === 'icon-select') {
    result = 'icon-select';
  } else if (type === 'color') {
    result = 'color';
  }
  return _variable.KEY_COMPONENT_NAME + result;
};

/**
 * 表格初始化值
 */

var formInitVal = exports.formInitVal = function formInitVal() {
  var list = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

  var tableForm = {};
  var searchForm = {};
  list.forEach(function (ele) {
    if (ele.type === 'checkbox' || ele.type === 'cascader' || ele.type === 'dynamic' || ele.type === 'dates' || ele.type === 'upload' && ele.listType !== 'picture-img' || ele.multiple || ele.range || ele.dataType === 'array') {
      tableForm[ele.prop] = [];
      if (ele.search) searchForm[ele.prop] = [];
    } else if (['number', 'rate', 'silder'].includes(ele.type) || ele.dataType === 'number') {
      tableForm[ele.prop] = 0;
      if (ele.search) {
        searchForm[ele.prop] = 0;
      }
    } else {
      tableForm[ele.prop] = '';
      if (ele.search) {
        searchForm[ele.prop] = '';
      }
    }
    // 表单默认值设置
    if (!(0, _validate.validatenull)(ele.valueDefault)) tableForm[ele.prop] = ele.valueDefault;
    // 搜索表单默认值设置
    if (!(0, _validate.validatenull)(ele.searchDefault)) {
      searchForm[ele.prop] = ele.searchDefault;
    }
  });
  return {
    tableForm: tableForm,
    searchForm: searchForm
  };
};

var getPlaceholder = exports.getPlaceholder = function getPlaceholder(column, type) {
  var placeholder = column.placeholder;
  var label = column.label;
  if (type === 'search') {
    var searchPlaceholder = column.searchPlaceholder;
    if (!(0, _validate.validatenull)(searchPlaceholder)) {
      return searchPlaceholder;
    } else {
      return label;
    }
  } else if ((0, _validate.validatenull)(placeholder)) {
    if (['select', 'checkbox', 'radio', 'tree'].includes(column.type)) {
      return this.t('tip.select') + ' ' + label;
    } else {
      return this.t('tip.input') + ' ' + label;
    }
  }

  return placeholder;
};

var getType = exports.getType = function getType(column) {
  var type = column.type;
  var more = column.more || false;
  if (more) {
    if (type === 'date') {
      return 'daterange';
    } else if (type === 'datetime') {
      return 'datetimerange';
    } else if (type === 'time') {
      return 'timerange';
    } else {
      return type;
    }
  }
  return type;
};

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _create = __webpack_require__(3);

var _create2 = _interopRequireDefault(_create);

var _props = __webpack_require__(5);

var _props2 = _interopRequireDefault(_props);

var _event = __webpack_require__(6);

var _event2 = _interopRequireDefault(_event);

var _validate = __webpack_require__(14);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = (0, _create2.default)({
  name: "input",
  mixins: [(0, _props2.default)(), (0, _event2.default)()],
  props: {
    prefixIcon: {
      type: String
    },
    suffixIcon: {
      type: String
    },
    rules: {
      type: Array
    },
    labelPosition: {
      type: String
    },
    minRows: {
      type: Number,
      default: 3
    },
    maxRows: {
      type: Number,
      default: 4
    }
  },
  data: function data() {
    return {};
  },

  computed: {
    typeParam: function typeParam() {
      if (this.type === "textarea") {
        return "textarea";
      } else if (this.type === "password") {
        return "password";
      } else {
        return "text";
      }
    },
    inputAlign: function inputAlign() {
      if (this.typeParam === "textarea") {
        return "left";
      }
      return "right";
    }
  },
  watch: {
    text: function text() {
      this.handleChange(this.text);
    }
  },
  created: function created() {},
  mounted: function mounted() {},

  methods: {}
});

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _create = __webpack_require__(3);

var _create2 = _interopRequireDefault(_create);

var _util = __webpack_require__(7);

var _props = __webpack_require__(5);

var _props2 = _interopRequireDefault(_props);

var _event = __webpack_require__(6);

var _event2 = _interopRequireDefault(_event);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = (0, _create2.default)({
  name: "select",
  mixins: [(0, _props2.default)(), (0, _event2.default)()],
  props: {
    prefixIcon: {
      type: String
    },
    suffixIcon: {
      type: String
    },
    minRows: {
      type: Number,
      default: 3
    },
    maxRows: {
      type: Number,
      default: 4
    }
  },
  data: function data() {
    return {
      box: false,
      textLabel: "",
      textIndex: 0
    };
  },

  watch: {
    value: {
      handler: function handler() {
        this.initVal();
        this.init();
      },

      immediate: true
    },
    dic: function dic() {
      this.init();
    },
    box: function box() {
      var _this = this;

      if (this.box) {
        this.$nextTick(function () {
          _this.$refs.picker.setIndexes([_this.textIndex]);
        });
      }
    },
    text: function text() {
      this.handleChange(this.value);
    }
  },
  computed: {
    columns: function columns() {
      var _this2 = this;

      var list = this.dic.map(function (ele) {
        return Object.assign({ text: ele[_this2.labelKey] }, ele);
      });
      return list;
    }
  },
  created: function created() {},
  mounted: function mounted() {
    this.init();
  },

  methods: {
    handleSelectClick: function handleSelectClick() {
      if (this.disabled) return;
      this.show();
      this.handleClick();
    },
    handleConfirm: function handleConfirm(value, index) {
      var dicObj = this.dic[index];
      this.text = dicObj[this.valueKey];
      this.textLabel = dicObj[this.labelKey];
      this.handleChange(this.text);
      this.hide();
    },
    show: function show() {
      this.box = true;
    },
    hide: function hide() {
      this.box = false;
    },
    handleCancel: function handleCancel() {
      this.hide();
    },
    init: function init() {
      var _this3 = this;

      if (!this.validatenull(this.text)) {
        this.textLabel = (0, _util.findByValue)(this.dic, this.text, this.props, true);
        this.textIndex = this.columns.findIndex(function (ele) {
          return ele.text === _this3.textLabel;
        });
      }
    }
  }
});

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _create = __webpack_require__(3);

var _create2 = _interopRequireDefault(_create);

var _props = __webpack_require__(5);

var _props2 = _interopRequireDefault(_props);

var _event = __webpack_require__(6);

var _event2 = _interopRequireDefault(_event);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _create2.default)({
  name: "radio",
  mixins: [(0, _props2.default)(), (0, _event2.default)()],
  props: {
    tags: {
      type: Boolean,
      default: false
    }
  },
  data: function data() {
    return {};
  },

  watch: {},
  computed: {},
  created: function created() {},
  mounted: function mounted() {},

  methods: {
    handleRadioClick: function handleRadioClick(value) {
      if (this.disabled) return;
      this.text = value;
      this.handleClick();
    }
  }
}); //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _create = __webpack_require__(3);

var _create2 = _interopRequireDefault(_create);

var _props = __webpack_require__(5);

var _props2 = _interopRequireDefault(_props);

var _event = __webpack_require__(6);

var _event2 = _interopRequireDefault(_event);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _create2.default)({
  name: "checkbox",
  mixins: [(0, _props2.default)(), (0, _event2.default)()],
  props: {
    tags: {
      type: Boolean,
      default: false
    }
  },
  data: function data() {
    return {};
  },

  watch: {},
  computed: {},
  created: function created() {},
  mounted: function mounted() {},

  methods: {
    handleCheckboxClick: function handleCheckboxClick(index) {
      this.$refs.checkbox[index].toggle();
      this.handleClick();
    }
  }
}); //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _create = __webpack_require__(3);

var _create2 = _interopRequireDefault(_create);

var _props = __webpack_require__(5);

var _props2 = _interopRequireDefault(_props);

var _event = __webpack_require__(6);

var _event2 = _interopRequireDefault(_event);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _create2.default)({
  name: "switch",
  mixins: [(0, _props2.default)(), (0, _event2.default)()],
  props: {},
  data: function data() {
    return {
      textLabel: false,
      textIndex: 0
    };
  },

  watch: {
    dic: function dic() {
      this.init();
    }
  },
  computed: {},
  created: function created() {},
  mounted: function mounted() {
    this.init();
  },

  methods: {
    init: function init() {
      var _this = this;

      if (!this.validatenull(this.text)) {
        this.textIndex = this.dic.findIndex(function (ele) {
          return ele.text === _this.textLabel;
        });
        this.textLabel = this.textIndex === 0 ? false : true;
      }
    },
    handleSwitchChange: function handleSwitchChange(value) {
      this.textIndex = this.textLabel ? 1 : 0;
      this.text = this.dic[this.textIndex][this.valueKey];
      this.handleChange(this.text);
    }
  }
}); //
//
//
//
//
//
//
//
//
//
//
//

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dayjs = __webpack_require__(63);

var _dayjs2 = _interopRequireDefault(_dayjs);

var _create = __webpack_require__(3);

var _create2 = _interopRequireDefault(_create);

var _props = __webpack_require__(5);

var _props2 = _interopRequireDefault(_props);

var _event = __webpack_require__(6);

var _event2 = _interopRequireDefault(_event);

var _date = __webpack_require__(64);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var formatDafault = {
  datetime: "yyyy-MM-dd hh:mm:ss",
  date: "yyyy-MM-dd"
}; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = (0, _create2.default)({
  name: "date",
  mixins: [(0, _props2.default)(), (0, _event2.default)()],
  props: {
    valueFormat: {
      default: function _default() {
        return formatDafault[this.type];
      }
    },
    format: {
      default: function _default() {
        return formatDafault[this.type];
      }
    },
    prefixIcon: {
      type: String
    },
    suffixIcon: {
      type: String
    },
    minRows: {
      type: Number,
      default: 3
    },
    maxRows: {
      type: Number,
      default: 4
    }
  },
  data: function data() {
    return {
      box: false,
      textLabel: "",
      picker: ""
    };
  },

  watch: {
    value: {
      handler: function handler() {
        this.initVal();
        this.init();
      },

      immediate: true
    },
    box: function box() {
      var _this = this;

      if (this.box) {
        setTimeout(function () {
          _this.$refs.picker.$refs.picker.setValues((0, _date.getDateValues)(_this.text, _this.isTimestamp ? undefined : _this.valueFormat));
        }, 0);
      }
    },
    text: function text() {
      this.handleChange(this.value);
    }
  },
  computed: {
    isTimestamp: function isTimestamp() {
      return this.valueFormat === "timestamp";
    }
  },
  created: function created() {},
  mounted: function mounted() {},

  methods: {
    init: function init() {
      this.handleSetLabel(this.text);
    },
    handleSetLabel: function handleSetLabel(value) {
      var format = this.format.replace("dd", "DD").replace("yyyy", "YYYY");
      if (!this.validatenull(value)) {
        this.textLabel = (0, _dayjs2.default)(value).format(format);
      }
    },
    handleDateClick: function handleDateClick() {
      this.show();
      this.handleClick();
    },
    handleConfirm: function handleConfirm(value) {
      var format = this.format.replace("dd", "DD").replace("yyyy", "YYYY");
      var valueFormat = this.valueFormat.replace("dd", "DD").replace("yyyy", "YYYY");
      this.handleSetLabel(value);
      if (this.isTimestamp) {
        this.text = new Date(value).getTime();
      } else {
        this.text = (0, _dayjs2.default)(value).format(valueFormat);
      }

      this.handleChange(this.text);
      this.hide();
    },
    show: function show() {
      this.box = true;
    },
    hide: function hide() {
      this.box = false;
    },
    handleCancel: function handleCancel() {
      this.hide();
    }
  }
});

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

!function(t,n){ true?module.exports=n():"function"==typeof define&&define.amd?define(n):t.dayjs=n()}(this,function(){"use strict";var t="millisecond",n="second",e="minute",r="hour",i="day",s="week",u="month",a="quarter",o="year",h=/^(\d{4})-?(\d{1,2})-?(\d{0,2})[^0-9]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?.?(\d{1,3})?$/,f=/\[.*?\]|Y{2,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,c=function(t,n,e){var r=String(t);return!r||r.length>=n?t:""+Array(n+1-r.length).join(e)+t},d={s:c,z:function(t){var n=-t.utcOffset(),e=Math.abs(n),r=Math.floor(e/60),i=e%60;return(n<=0?"+":"-")+c(r,2,"0")+":"+c(i,2,"0")},m:function(t,n){var e=12*(n.year()-t.year())+(n.month()-t.month()),r=t.clone().add(e,u),i=n-r<0,s=t.clone().add(e+(i?-1:1),u);return Number(-(e+(n-r)/(i?r-s:s-r))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(h){return{M:u,y:o,w:s,d:i,h:r,m:e,s:n,ms:t,Q:a}[h]||String(h||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},$={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_")},l="en",m={};m[l]=$;var y=function(t){return t instanceof S},M=function(t,n,e){var r;if(!t)return null;if("string"==typeof t)m[t]&&(r=t),n&&(m[t]=n,r=t);else{var i=t.name;m[i]=t,r=i}return e||(l=r),r},g=function(t,n,e){if(y(t))return t.clone();var r=n?"string"==typeof n?{format:n,pl:e}:n:{};return r.date=t,new S(r)},D=d;D.l=M,D.i=y,D.w=function(t,n){return g(t,{locale:n.$L,utc:n.$u})};var S=function(){function c(t){this.$L=this.$L||M(t.locale,null,!0)||l,this.parse(t)}var d=c.prototype;return d.parse=function(t){this.$d=function(t){var n=t.date,e=t.utc;if(null===n)return new Date(NaN);if(D.u(n))return new Date;if(n instanceof Date)return new Date(n);if("string"==typeof n&&!/Z$/i.test(n)){var r=n.match(h);if(r)return e?new Date(Date.UTC(r[1],r[2]-1,r[3]||1,r[4]||0,r[5]||0,r[6]||0,r[7]||0)):new Date(r[1],r[2]-1,r[3]||1,r[4]||0,r[5]||0,r[6]||0,r[7]||0)}return new Date(n)}(t),this.init()},d.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},d.$utils=function(){return D},d.isValid=function(){return!("Invalid Date"===this.$d.toString())},d.isSame=function(t,n){var e=g(t);return this.startOf(n)<=e&&e<=this.endOf(n)},d.isAfter=function(t,n){return g(t)<this.startOf(n)},d.isBefore=function(t,n){return this.endOf(n)<g(t)},d.$g=function(t,n,e){return D.u(t)?this[n]:this.set(e,t)},d.year=function(t){return this.$g(t,"$y",o)},d.month=function(t){return this.$g(t,"$M",u)},d.day=function(t){return this.$g(t,"$W",i)},d.date=function(t){return this.$g(t,"$D","date")},d.hour=function(t){return this.$g(t,"$H",r)},d.minute=function(t){return this.$g(t,"$m",e)},d.second=function(t){return this.$g(t,"$s",n)},d.millisecond=function(n){return this.$g(n,"$ms",t)},d.unix=function(){return Math.floor(this.valueOf()/1e3)},d.valueOf=function(){return this.$d.getTime()},d.startOf=function(t,a){var h=this,f=!!D.u(a)||a,c=D.p(t),d=function(t,n){var e=D.w(h.$u?Date.UTC(h.$y,n,t):new Date(h.$y,n,t),h);return f?e:e.endOf(i)},$=function(t,n){return D.w(h.toDate()[t].apply(h.toDate(),(f?[0,0,0,0]:[23,59,59,999]).slice(n)),h)},l=this.$W,m=this.$M,y=this.$D,M="set"+(this.$u?"UTC":"");switch(c){case o:return f?d(1,0):d(31,11);case u:return f?d(1,m):d(0,m+1);case s:var g=this.$locale().weekStart||0,S=(l<g?l+7:l)-g;return d(f?y-S:y+(6-S),m);case i:case"date":return $(M+"Hours",0);case r:return $(M+"Minutes",1);case e:return $(M+"Seconds",2);case n:return $(M+"Milliseconds",3);default:return this.clone()}},d.endOf=function(t){return this.startOf(t,!1)},d.$set=function(s,a){var h,f=D.p(s),c="set"+(this.$u?"UTC":""),d=(h={},h[i]=c+"Date",h.date=c+"Date",h[u]=c+"Month",h[o]=c+"FullYear",h[r]=c+"Hours",h[e]=c+"Minutes",h[n]=c+"Seconds",h[t]=c+"Milliseconds",h)[f],$=f===i?this.$D+(a-this.$W):a;return this.$d[d]&&this.$d[d]($),this.init(),this},d.set=function(t,n){return this.clone().$set(t,n)},d.add=function(t,a){var h,f=this;t=Number(t);var c=D.p(a),d=function(n,e){var r=f.clone().set("date",1).set(n,e+t);return r.set("date",Math.min(f.$D,r.daysInMonth()))},$=function(n){var e=new Date(f.$d);return e.setDate(e.getDate()+n*t),D.w(e,f)};if(c===u)return d(u,this.$M);if(c===o)return d(o,this.$y);if(c===i)return $(1);if(c===s)return $(7);var l=(h={},h[e]=6e4,h[r]=36e5,h[n]=1e3,h)[c]||1,m=this.valueOf()+t*l;return D.w(m,this)},d.subtract=function(t,n){return this.add(-1*t,n)},d.format=function(t){var n=this;if(!this.isValid())return"Invalid Date";var e=t||"YYYY-MM-DDTHH:mm:ssZ",r=D.z(this),i=this.$locale(),s=i.weekdays,u=i.months,a=function(t,n,e,r){return t&&t[n]||e[n].substr(0,r)},o=function(t){return D.s(n.$H%12||12,t,"0")},h={YY:String(this.$y).slice(-2),YYYY:String(this.$y),M:String(this.$M+1),MM:D.s(this.$M+1,2,"0"),MMM:a(i.monthsShort,this.$M,u,3),MMMM:u[this.$M],D:String(this.$D),DD:D.s(this.$D,2,"0"),d:String(this.$W),dd:a(i.weekdaysMin,this.$W,s,2),ddd:a(i.weekdaysShort,this.$W,s,3),dddd:s[this.$W],H:String(this.$H),HH:D.s(this.$H,2,"0"),h:o(1),hh:o(2),a:this.$H<12?"am":"pm",A:this.$H<12?"AM":"PM",m:String(this.$m),mm:D.s(this.$m,2,"0"),s:String(this.$s),ss:D.s(this.$s,2,"0"),SSS:D.s(this.$ms,3,"0"),Z:r};return e.replace(f,function(t){return t.indexOf("[")>-1?t.replace(/\[|\]/g,""):h[t]||r.replace(":","")})},d.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},d.diff=function(t,h,f){var c,d=D.p(h),$=g(t),l=6e4*($.utcOffset()-this.utcOffset()),m=this-$,y=D.m(this,$);return y=(c={},c[o]=y/12,c[u]=y,c[a]=y/3,c[s]=(m-l)/6048e5,c[i]=(m-l)/864e5,c[r]=m/36e5,c[e]=m/6e4,c[n]=m/1e3,c)[d]||m,f?y:D.a(y)},d.daysInMonth=function(){return this.endOf(u).$D},d.$locale=function(){return m[this.$L]},d.locale=function(t,n){if(!t)return this.$L;var e=this.clone();return e.$L=M(t,n,!0),e},d.clone=function(){return D.w(this.toDate(),this)},d.toDate=function(){return new Date(this.$d)},d.toJSON=function(){return this.toISOString()},d.toISOString=function(){return this.$d.toISOString()},d.toString=function(){return this.$d.toUTCString()},c}();return g.prototype=S.prototype,g.extend=function(t,n){return t(n,S,g),g},g.locale=M,g.isDayjs=y,g.unix=function(t){return g(1e3*t)},g.en=m[l],g.Ls=m,g});


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var dateFtt = exports.dateFtt = function dateFtt(fmt, date) {
  // author: meizz
  var o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    S: date.getMilliseconds() // 毫秒
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
    }
  }
  return fmt;
};

var getDateValues = exports.getDateValues = function getDateValues(value) {
  var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'yyyy/MM/dd hh:mm::ss';


  function strDetail(str) {
    str = str + '';
    if (str.length === 1) {
      return '0' + str;
    }
    return str;
  }
  var str = new Date();
  if (typeof value === 'number') {
    str = new Date(value);
  } else if (typeof value === 'string') {
    str = new Date(value.replace(/-/g, "/").replace(/\./g, "/"));
  }
  var result = [];
  var year = str.getFullYear();
  var month = str.getMonth() + 1;
  var date = str.getDate();
  var hours = str.getHours();
  var minutes = str.getMinutes();
  var seconds = str.getSeconds();
  if (format.includes('y')) result.push(strDetail(year));
  if (format.includes('M')) result.push(strDetail(month));
  if (format.includes('d')) result.push(strDetail(date));
  if (format.includes('h')) result.push(strDetail(hours));
  if (format.includes('m')) result.push(strDetail(minutes));
  if (format.includes('s')) result.push(strDetail(seconds));
  return result;
};
var timeToSec = exports.timeToSec = function timeToSec(time) {
  var s = '';
  var hour = time.split(':')[0] || '00';
  var min = time.split(':')[1] || '00';
  var sec = time.split(':')[2] || '00';

  s = Number(hour * 3600) + Number(min * 60) + Number(sec);
  return s;
};
var GetDateStr = exports.GetDateStr = function GetDateStr(AddDayCount) {
  var dd = new Date();
  dd.setDate(dd.getDate() + AddDayCount); // 获取AddDayCount天后的日期
  var y = dd.getFullYear();
  var m = dd.getMonth() + 1 < 10 ? '0' + (dd.getMonth() + 1) : dd.getMonth() + 1; // 获取当前月份的日期，不足10补0
  var d = dd.getDate() < 10 ? '0' + dd.getDate() : dd.getDate(); // 获取当前几号，不足10补0
  return y + '-' + m + '-' + d;
};

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dayjs = __webpack_require__(63);

var _dayjs2 = _interopRequireDefault(_dayjs);

var _create = __webpack_require__(3);

var _create2 = _interopRequireDefault(_create);

var _props = __webpack_require__(5);

var _props2 = _interopRequireDefault(_props);

var _event = __webpack_require__(6);

var _event2 = _interopRequireDefault(_event);

var _date = __webpack_require__(64);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var formatDafault = {
  time: "hh:mm"
}; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = (0, _create2.default)({
  name: "time",
  mixins: [(0, _props2.default)(), (0, _event2.default)()],
  props: {
    valueFormat: {
      default: function _default() {
        return formatDafault[this.type];
      }
    },
    format: {
      default: function _default() {
        return formatDafault[this.type];
      }
    },
    prefixIcon: {
      type: String
    },
    suffixIcon: {
      type: String
    },
    minRows: {
      type: Number,
      default: 3
    },
    maxRows: {
      type: Number,
      default: 4
    }
  },
  data: function data() {
    return {
      box: false,
      textLabel: ""
    };
  },

  watch: {
    value: {
      handler: function handler() {
        this.initVal();
        this.init();
      },

      immediate: true
    },
    box: function box() {
      var _this = this;

      if (this.box) {
        this.$nextTick(function () {
          setTimeout(function () {
            _this.$refs.picker.$refs.picker.setValues((0, _date.getDateValues)("2019-01-01 " + _this.text, _this.valueFormat));
          }, 0);
        });
      }
    },
    text: function text() {
      this.handleChange(this.value);
    }
  },
  computed: {},
  created: function created() {},
  mounted: function mounted() {},

  methods: {
    init: function init() {
      this.handleSetLabel(this.text);
    },
    handleSetLabel: function handleSetLabel(value) {
      var date = new Date("2019-01-01 " + value);
      if (!this.validatenull(date)) {
        this.textLabel = (0, _dayjs2.default)(date).format(this.format);
      }
    },
    handleDateClick: function handleDateClick() {
      this.show();
      this.handleClick();
    },
    handleConfirm: function handleConfirm(value) {
      var date = new Date("2019-01-01 " + value);
      this.handleSetLabel(date);
      this.text = (0, _dayjs2.default)(date).format(this.valueFormat);
      this.handleChange(this.text);
      this.hide();
    },
    show: function show() {
      this.box = true;
    },
    hide: function hide() {
      this.box = false;
    },
    handleCancel: function handleCancel() {
      this.hide();
    }
  }
});

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _methods;

var _create = __webpack_require__(3);

var _create2 = _interopRequireDefault(_create);

var _props = __webpack_require__(5);

var _props2 = _interopRequireDefault(_props);

var _event = __webpack_require__(6);

var _event2 = _interopRequireDefault(_event);

var _util = __webpack_require__(7);

var _canvas = __webpack_require__(149);

var _qiniu = __webpack_require__(150);

var _ali = __webpack_require__(151);

var _packages = __webpack_require__(37);

var _packages2 = _interopRequireDefault(_packages);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = (0, _create2.default)({
  name: "upload",
  mixins: [(0, _props2.default)(), (0, _event2.default)()],
  data: function data() {
    return {
      loading: false,
      dialogImageUrl: "",
      dialogImgType: true,
      dialogVisible: false,
      text: [],
      file: {}
    };
  },

  props: {
    value: {},
    showFileList: {
      type: Boolean,
      default: true
    },
    oss: {
      type: String
    },
    limit: {
      type: Number,
      default: 10
    },
    accept: {
      type: [String, Array],
      default: ""
    },
    listType: {
      type: String
    },
    canvasOption: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    filesize: {
      type: Number
    },
    drag: {
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean,
      default: true
    },
    loadText: {
      type: String,
      default: "文件上传中,请稍等"
    },
    action: {
      type: String,
      default: ""
    },
    uploadBefore: Function,
    uploadAfter: Function
  },
  computed: {
    isAliOss: function isAliOss() {
      return this.oss === "ali";
    },
    isQiniuOss: function isQiniuOss() {
      return this.oss === "qiniu";
    },
    isPictureImg: function isPictureImg() {
      return this.listType === "picture-img";
    },

    //单个头像图片
    imgUrl: function imgUrl() {
      if (!this.validatenull(this.text)) {
        return this.text[0];
      }
    },
    fileList: function fileList() {
      var _this = this;

      var list = [];
      this.text.forEach(function (ele, index) {
        var obj = void 0;
        if (_this.isArray || _this.isString) {
          obj = {
            name: index,
            url: ele
          };
        } else {
          obj = {
            name: ele[_this.labelKey],
            url: ele[_this.valueKey]
          };
        }
        list.push(obj);
      });
      return list;
    }
  },
  created: function created() {},

  watch: {},
  mounted: function mounted() {},

  methods: (_methods = {
    handleClick: function handleClick() {
      if (typeof this.click === "function") this.click({ value: this.text, column: this.column });
    },
    handleChange: function handleChange(file) {
      if (this.fileList.length >= this.limit) {
        this.handleExceed();
        return;
      }
      this.httpRequest({
        file: file
      });
      if (typeof this.change === "function") this.change({ value: this.text, column: this.column });
    },
    handleSuccess: function handleSuccess(file) {
      if (this.isArray || this.isString) {
        this.text.push(file[this.urlKey]);
      } else if (this.isPictureImg) {
        this.text.unshift(file[this.urlKey]);
      } else {
        var obj = {};
        obj[this.labelKey] = file[this.nameKey];
        obj[this.valueKey] = file[this.urlKey];
        this.text.push(obj);
      }
      this.$toast.success("上传成功");
      this.setVal();
    },
    handleRemove: function handleRemove(file) {
      this.delete(file);
      this.$toast.success("删除成功");
      this.setVal();
    },
    handleError: function handleError(msg) {
      console.log(new Error(msg));
      this.$toast.fail(msg || "上传失败");
    },
    delete: function _delete(file) {
      var _this2 = this;

      if (this.isArray || this.isString) {
        this.text.forEach(function (ele, index) {
          if (ele === file.url) _this2.text.splice(index, 1);
        });
      } else {
        this.text.forEach(function (ele, index) {
          if (ele[_this2.valueKey] === file.url) _this2.text.splice(index, 1);
        });
      }
    },
    show: function show(data) {
      this.loading.close();
      this.handleSuccess(data);
    },
    hide: function hide(msg) {
      this.loading.close();
      this.handleError(msg);
    },
    httpRequest: function httpRequest(config) {
      var _this3 = this;

      this.loading = this.$toast.loading({
        mask: true,
        message: this.loadText
      });

      var file = config.file;
      var accept = file.type;
      var filesize = file.size;
      var acceptList = Array.isArray(this.accept) ? this.accept : [this.accept];
      acceptList = this.validatenull(acceptList[0]) ? undefined : acceptList;
      this.file = config.file;
      if (!this.validatenull(acceptList) && !acceptList.includes(accept)) {
        this.hide("文件类型不符合");
        return;
      }
      if (!this.validatenull(filesize) && filesize > this.filesize) {
        this.hide("文件太大不符合");
        return;
      }

      var headers = { "Content-Type": "multipart/form-data" };
      //oss配置属性
      var oss_config = {};
      var client = {};
      var param = new FormData();
      var done = function done() {
        var url = _this3.action;
        param.append("file", file, file.name);
        var callack = function callack() {
          //七牛云oss存储
          if (_this3.isQiniuOss) {
            if (!window.CryptoJS) {
              _packages2.default.logs("CryptoJS");
              _this3.hide();
              return;
            }
            oss_config = _this3.$AVUE.qiniu;
            var token = (0, _qiniu.getToken)(oss_config.AK, oss_config.SK, {
              scope: oss_config.scope,
              deadline: new Date().getTime() + oss_config.deadline * 3600
            });
            param.append("token", token);
            if (window.location.protocol.includes("https")) {
              url = "https://up.qbox.me";
            } else {
              url = "http://up.qiniu.com/";
            }
          } else if (_this3.isAliOss) {
            if (!window.OSS) {
              _packages2.default.logs("AliOSS");
              _this3.hide();
              return;
            }
            oss_config = _this3.$AVUE.ali;
            client = (0, _ali.getClient)({
              region: oss_config.region,
              endpoint: oss_config.endpoint,
              accessKeyId: oss_config.accessKeyId,
              accessKeySecret: oss_config.accessKeySecret,
              bucket: oss_config.bucket
            });
          }
          (function () {
            if (_this3.isAliOss) {
              return client.put(file.name, file);
            } else {
              return _this3.$httpajax.post(url, param, { headers: headers });
            }
          })().then(function (res) {
            var list = {};
            if (_this3.isQiniuOss) {
              res.data.key = oss_config.url + res.data.key;
            }

            if (_this3.isAliOss) {
              list = (0, _util.getObjValue)(res, _this3.resKey, "object");
            } else {
              list = (0, _util.getObjValue)(res.data, _this3.resKey, "object");
            }
            if (typeof _this3.uploadAfter === "function") _this3.uploadAfter(list, function () {
              _this3.show(list);
            }, function () {
              _this3.loading.close();
            });else _this3.show(list);
          }).catch(function (error) {
            if (typeof _this3.uploadAfter === "function") _this3.uploadAfter(error, _this3.hide, function () {
              _this3.loading.close();
            });else _this3.hide(error);
          });
        };
        if (typeof _this3.uploadBefore === "function") _this3.uploadBefore(_this3.file, callack, function () {
          _this3.loading.close();
        });else callack();
      };
      //是否开启水印
      if (!this.validatenull(this.canvasOption)) {
        (0, _canvas.detailImg)(file, this.canvasOption).then(function (res) {
          file = res;
          done();
        });
      } else {
        done();
      }
    },
    setVal: function setVal() {
      var result = this.isString ? this.text.join(",") : this.text;
      this.$emit("input", result);
      this.$emit("change", result);
    }
  }, _defineProperty(_methods, "setVal", function setVal() {
    var result = "";
    if (this.isString) {
      result = this.text.join(",");
    } else if (this.isPictureImg) {
      result = this.text[0];
    } else {
      result = this.text;
    }
    this.$emit("input", result);
    this.$emit("change", result);
  }), _defineProperty(_methods, "handleExceed", function handleExceed(files, fileList) {
    this.$toast.error("\u5F53\u524D\u9650\u5236\u9009\u62E9 " + this.limit + " \u4E2A\u6587\u4EF6\uFF0C\u672C\u6B21\u9009\u62E9\u4E86 " + files.length + " \u4E2A\u6587\u4EF6\uFF0C\u5171\u4E0A\u4F20\u4E86 " + (files.length + fileList.length) + " \u4E2A\u6587\u4EF6");
  }), _defineProperty(_methods, "handlePictureCardPreview", function handlePictureCardPreview(file) {
    //判断是否为图片
    this.dialogImageUrl = file.url;
    if (!/\.(gif|jpg|jpeg|png|GIF|JPG|PNG)/.test(file.url)) {
      this.dialogImgType = false;
      window.open(this.dialogImageUrl);
      return;
    } else {
      this.dialogImgType = true;
      this.dialogVisible = true;
    }
  }), _defineProperty(_methods, "beforeRemove", function beforeRemove(file) {
    return this.$confirm("\u786E\u5B9A\u79FB\u9664\u8BE5\u56FE\u7247\uFF1F");
  }), _methods)
});

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(68);


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _index = __webpack_require__(69);

var _index2 = _interopRequireDefault(_index);

var _validate = __webpack_require__(14);

var _util = __webpack_require__(7);

var _permission = __webpack_require__(153);

var _permission2 = _interopRequireDefault(_permission);

var _export2 = __webpack_require__(154);

var _export3 = _interopRequireDefault(_export2);

var _logs = __webpack_require__(55);

var _logs2 = _interopRequireDefault(_logs);

var _locale = __webpack_require__(40);

var _locale2 = _interopRequireDefault(_locale);

var _clipboard = __webpack_require__(157);

var _clipboard2 = _interopRequireDefault(_clipboard);

var _imagePreview = __webpack_require__(158);

var _imagePreview2 = _interopRequireDefault(_imagePreview);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import { Notification } from 'element-ui';
var prototypes = {
  $Clipboard: _clipboard2.default,
  $Log: _logs2.default
};

var install = function install(Vue) {
  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  Vue.use(_export3.default);
  //初始化指令
  (0, _permission2.default)(Vue);
  _index2.default.map(function (component) {
    Vue.component(component.name, component);
  });
  Object.keys(prototypes).forEach(function (key) {
    Vue.prototype[key] = prototypes[key];
  });
  //国际化
  _locale2.default.use(opts.locale);
  _locale2.default.i18n(opts.i18n);
  Vue.prototype.$ImagePreview = (0, _imagePreview2.default)(Vue);
  Vue.prototype.$httpajax = window.axios;
  Vue.prototype.deepClone = _util.deepClone;
  Vue.prototype.isJson = _util.isJson;
  Vue.prototype.setPx = _util.setPx;
  Vue.prototype.vaildData = _util.vaildData;
  Vue.prototype.sortArrys = _util.sortArrys;
  Vue.prototype.findArray = _util.findArray;
  Vue.prototype.validatenull = _validate.validatenull;
  Vue.prototype.asyncValidator = _validate.asyncValidator;
  Vue.prototype.$AVUE = {
    size: opts.size || 'medium',
    menuType: opts.menuType || 'text',
    canvas: Object.assign({
      text: 'avue.top',
      fontFamily: 'microsoft yahei',
      color: "#999",
      fontSize: 16,
      opacity: 100,
      bottom: 10,
      right: 10,
      ratio: 1
    }, opts.canvas),
    qiniu: Object.assign({
      AK: '',
      SK: '',
      scope: '',
      url: '',
      deadline: 1
    }, opts.qiniu || {}),
    ali: Object.assign({
      region: '',
      endpoint: '',
      accessKeyId: '',
      accessKeySecret: '',
      bucket: ''
    }, opts.ali || {})
  };
};

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  // setTimeout(() => {
  //   Notification({
  //     type: 'success',
  //     title: 'avuex授权',
  //     dangerouslyUseHTMLString: true,
  //     message: '感谢你对avue的支持，本系统采用了avuex开发，如果想使用avuex的授权<a href="https://avuex.avue.top/#/vip">点击购买授权</a>',
  //     duration: 3000

  //   })
  // }, 1000)
  install(window.Vue);
}

var Avue = {
  version: '1.0.8',
  locale: _locale2.default.locale,
  install: install
};

module.exports = Avue;
module.exports.default = module.exports;

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _form = __webpack_require__(70);

var _form2 = _interopRequireDefault(_form);

var _input = __webpack_require__(134);

var _input2 = _interopRequireDefault(_input);

var _select = __webpack_require__(136);

var _select2 = _interopRequireDefault(_select);

var _radio = __webpack_require__(138);

var _radio2 = _interopRequireDefault(_radio);

var _checkbox = __webpack_require__(140);

var _checkbox2 = _interopRequireDefault(_checkbox);

var _switch = __webpack_require__(142);

var _switch2 = _interopRequireDefault(_switch);

var _date = __webpack_require__(144);

var _date2 = _interopRequireDefault(_date);

var _time = __webpack_require__(146);

var _time2 = _interopRequireDefault(_time);

var _upload = __webpack_require__(148);

var _upload2 = _interopRequireDefault(_upload);

var _packages = __webpack_require__(37);

var _packages2 = _interopRequireDefault(_packages);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (!window.vant) {
  _packages2.default.logs('vant');
}
exports.default = [_form2.default, _select2.default, _input2.default, _radio2.default, _checkbox2.default, _date2.default, _time2.default, _switch2.default, _upload2.default];

/***/ }),
/* 70 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_374faba6_hasScoped_false_preserveWhitespace_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(133);
var normalizeComponent = __webpack_require__(2)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_374faba6_hasScoped_false_preserveWhitespace_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  tip: {
    select: '请选择',
    input: '请输入'
  },
  date: {
    start: '开始日期',
    end: '结束日期',
    tip: '至',
    t: '今日',
    y: '昨日',
    n: '近7天',
    a: '全部'
  },
  crud: {
    tipStartTitle: '当前表格已选择',
    tipEndTitle: '项',
    editTitle: '编 辑',
    addTitle: '新 增',
    viewTitle: '查 看',
    filterTitle: '过滤条件',
    menu: '操作',
    addBtn: '新 增',
    printBtn: '打 印',
    excelBtn: '导 出',
    updateBtn: '修 改',
    cancelBtn: '取 消',
    columnBtn: '多 选',
    searchBtn: '搜 索',
    emptyBtn: '清 空',
    menuBtn: '功 能',
    saveBtn: '保 存',
    viewBtn: '查 看',
    editBtn: '编 辑',
    delBtn: '删 除'
  }
};

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  tip: {
    select: 'please select',
    input: 'please input'
  },
  date: {
    start: 'Start date',
    end: 'End date',
    tip: 'to',
    t: 'today',
    y: 'yesterday',
    n: 'nearly 7',
    a: 'whole'
  },
  crud: {
    tipStartTitle: 'Currently selected',
    tipEndTitle: 'term',
    editTitle: 'edit',
    addTitle: 'add',
    viewTitle: 'view',
    filterTitle: 'filter',
    menu: 'menu',
    addBtn: 'add',
    printBtn: 'print',
    excelBtn: 'excel',
    updateBtn: 'update',
    cancelBtn: 'cancel',
    columnBtn: 'column',
    searchBtn: 'search',
    emptyBtn: 'empty',
    menuBtn: 'menu',
    saveBtn: 'save',
    viewBtn: 'view',
    editBtn: 'edit',
    delBtn: 'del'
  }
};

/***/ }),
/* 73 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_73__;

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

(function (global, factory) {
	 true ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.deepmerge = factory());
}(this, (function () { 'use strict';

var isMergeableObject = function isMergeableObject(value) {
	return isNonNullObject(value)
		&& !isSpecial(value)
};

function isNonNullObject(value) {
	return !!value && typeof value === 'object'
}

function isSpecial(value) {
	var stringValue = Object.prototype.toString.call(value);

	return stringValue === '[object RegExp]'
		|| stringValue === '[object Date]'
		|| isReactElement(value)
}

// see https://github.com/facebook/react/blob/b5ac963fb791d1298e7f396236383bc955f916c1/src/isomorphic/classic/element/ReactElement.js#L21-L25
var canUseSymbol = typeof Symbol === 'function' && Symbol.for;
var REACT_ELEMENT_TYPE = canUseSymbol ? Symbol.for('react.element') : 0xeac7;

function isReactElement(value) {
	return value.$$typeof === REACT_ELEMENT_TYPE
}

function emptyTarget(val) {
	return Array.isArray(val) ? [] : {}
}

function cloneUnlessOtherwiseSpecified(value, options) {
	return (options.clone !== false && options.isMergeableObject(value))
		? deepmerge(emptyTarget(value), value, options)
		: value
}

function defaultArrayMerge(target, source, options) {
	return target.concat(source).map(function(element) {
		return cloneUnlessOtherwiseSpecified(element, options)
	})
}

function getMergeFunction(key, options) {
	if (!options.customMerge) {
		return deepmerge
	}
	var customMerge = options.customMerge(key);
	return typeof customMerge === 'function' ? customMerge : deepmerge
}

function mergeObject(target, source, options) {
	var destination = {};
	if (options.isMergeableObject(target)) {
		Object.keys(target).forEach(function(key) {
			destination[key] = cloneUnlessOtherwiseSpecified(target[key], options);
		});
	}
	Object.keys(source).forEach(function(key) {
		if (!options.isMergeableObject(source[key]) || !target[key]) {
			destination[key] = cloneUnlessOtherwiseSpecified(source[key], options);
		} else {
			destination[key] = getMergeFunction(key, options)(target[key], source[key], options);
		}
	});
	return destination
}

function deepmerge(target, source, options) {
	options = options || {};
	options.arrayMerge = options.arrayMerge || defaultArrayMerge;
	options.isMergeableObject = options.isMergeableObject || isMergeableObject;

	var sourceIsArray = Array.isArray(source);
	var targetIsArray = Array.isArray(target);
	var sourceAndTargetTypesMatch = sourceIsArray === targetIsArray;

	if (!sourceAndTargetTypesMatch) {
		return cloneUnlessOtherwiseSpecified(source, options)
	} else if (sourceIsArray) {
		return options.arrayMerge(target, source, options)
	} else {
		return mergeObject(target, source, options)
	}
}

deepmerge.all = function deepmergeAll(array, options) {
	if (!Array.isArray(array)) {
		throw new Error('first argument should be an array')
	}

	return array.reduce(function(prev, next) {
		return deepmerge(prev, next, options)
	}, {})
};

var deepmerge_1 = deepmerge;

return deepmerge_1;

})));


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = function (Vue) {

  /**
   * template
   *
   * @param {String} string
   * @param {Array} ...args
   * @return {String}
   */

  function template(string) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    if (args.length === 1 && _typeof(args[0]) === 'object') {
      args = args[0];
    }

    if (!args || !args.hasOwnProperty) {
      args = {};
    }

    return string.replace(RE_NARGS, function (match, prefix, i, index) {
      var result = void 0;

      if (string[index - 1] === '{' && string[index + match.length] === '}') {
        return i;
      } else {
        result = (0, _util.hasOwn)(args, i) ? args[i] : null;
        if (result === null || result === undefined) {
          return '';
        }

        return result;
      }
    });
  }

  return template;
};

var _util = __webpack_require__(7);

var RE_NARGS = /(%|)\{([0-9a-zA-Z_]+)\}/g;
/**
 *  String format template
 *  - Inspired:
 *    https://github.com/Matt-Esch/string-template/index.js
 */

/***/ }),
/* 76 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_typeof__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_typeof___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_typeof__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__validator___ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__messages__ = __webpack_require__(130);






/**
 *  Encapsulates a validation schema.
 *
 *  @param descriptor An object declaring validation rules
 *  for this schema.
 */
function Schema(descriptor) {
  this.rules = null;
  this._messages = __WEBPACK_IMPORTED_MODULE_4__messages__["a" /* messages */];
  this.define(descriptor);
}

Schema.prototype = {
  messages: function messages(_messages) {
    if (_messages) {
      this._messages = Object(__WEBPACK_IMPORTED_MODULE_2__util__["c" /* deepMerge */])(Object(__WEBPACK_IMPORTED_MODULE_4__messages__["b" /* newMessages */])(), _messages);
    }
    return this._messages;
  },
  define: function define(rules) {
    if (!rules) {
      throw new Error('Cannot configure a schema with no rules');
    }
    if ((typeof rules === 'undefined' ? 'undefined' : __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_typeof___default()(rules)) !== 'object' || Array.isArray(rules)) {
      throw new Error('Rules must be an object');
    }
    this.rules = {};
    var z = void 0;
    var item = void 0;
    for (z in rules) {
      if (rules.hasOwnProperty(z)) {
        item = rules[z];
        this.rules[z] = Array.isArray(item) ? item : [item];
      }
    }
  },
  validate: function validate(source_) {
    var _this = this;

    var o = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var oc = arguments[2];

    var source = source_;
    var options = o;
    var callback = oc;
    if (typeof options === 'function') {
      callback = options;
      options = {};
    }
    if (!this.rules || Object.keys(this.rules).length === 0) {
      if (callback) {
        callback();
      }
      return;
    }
    function complete(results) {
      var i = void 0;
      var field = void 0;
      var errors = [];
      var fields = {};

      function add(e) {
        if (Array.isArray(e)) {
          errors = errors.concat.apply(errors, e);
        } else {
          errors.push(e);
        }
      }

      for (i = 0; i < results.length; i++) {
        add(results[i]);
      }
      if (!errors.length) {
        errors = null;
        fields = null;
      } else {
        for (i = 0; i < errors.length; i++) {
          field = errors[i].field;
          fields[field] = fields[field] || [];
          fields[field].push(errors[i]);
        }
      }
      callback(errors, fields);
    }

    if (options.messages) {
      var messages = this.messages();
      if (messages === __WEBPACK_IMPORTED_MODULE_4__messages__["a" /* messages */]) {
        messages = Object(__WEBPACK_IMPORTED_MODULE_4__messages__["b" /* newMessages */])();
      }
      Object(__WEBPACK_IMPORTED_MODULE_2__util__["c" /* deepMerge */])(messages, options.messages);
      options.messages = messages;
    } else {
      options.messages = this.messages();
    }
    var arr = void 0;
    var value = void 0;
    var series = {};
    var keys = options.keys || Object.keys(this.rules);
    keys.forEach(function (z) {
      arr = _this.rules[z];
      value = source[z];
      arr.forEach(function (r) {
        var rule = r;
        if (typeof rule.transform === 'function') {
          if (source === source_) {
            source = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, source);
          }
          value = source[z] = rule.transform(value);
        }
        if (typeof rule === 'function') {
          rule = {
            validator: rule
          };
        } else {
          rule = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, rule);
        }
        rule.validator = _this.getValidationMethod(rule);
        rule.field = z;
        rule.fullField = rule.fullField || z;
        rule.type = _this.getType(rule);
        if (!rule.validator) {
          return;
        }
        series[z] = series[z] || [];
        series[z].push({
          rule: rule,
          value: value,
          source: source,
          field: z
        });
      });
    });
    var errorFields = {};
    Object(__WEBPACK_IMPORTED_MODULE_2__util__["a" /* asyncMap */])(series, options, function (data, doIt) {
      var rule = data.rule;
      var deep = (rule.type === 'object' || rule.type === 'array') && (__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_typeof___default()(rule.fields) === 'object' || __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_typeof___default()(rule.defaultField) === 'object');
      deep = deep && (rule.required || !rule.required && data.value);
      rule.field = data.field;
      function addFullfield(key, schema) {
        return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, schema, {
          fullField: rule.fullField + '.' + key
        });
      }

      function cb() {
        var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

        var errors = e;
        if (!Array.isArray(errors)) {
          errors = [errors];
        }
        if (errors.length) {
          Schema.warning('async-validator:', errors);
        }
        if (errors.length && rule.message) {
          errors = [].concat(rule.message);
        }

        errors = errors.map(Object(__WEBPACK_IMPORTED_MODULE_2__util__["b" /* complementError */])(rule));

        if (options.first && errors.length) {
          errorFields[rule.field] = 1;
          return doIt(errors);
        }
        if (!deep) {
          doIt(errors);
        } else {
          // if rule is required but the target object
          // does not exist fail at the rule level and don't
          // go deeper
          if (rule.required && !data.value) {
            if (rule.message) {
              errors = [].concat(rule.message).map(Object(__WEBPACK_IMPORTED_MODULE_2__util__["b" /* complementError */])(rule));
            } else if (options.error) {
              errors = [options.error(rule, Object(__WEBPACK_IMPORTED_MODULE_2__util__["d" /* format */])(options.messages.required, rule.field))];
            } else {
              errors = [];
            }
            return doIt(errors);
          }

          var fieldsSchema = {};
          if (rule.defaultField) {
            for (var k in data.value) {
              if (data.value.hasOwnProperty(k)) {
                fieldsSchema[k] = rule.defaultField;
              }
            }
          }
          fieldsSchema = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, fieldsSchema, data.rule.fields);
          for (var f in fieldsSchema) {
            if (fieldsSchema.hasOwnProperty(f)) {
              var fieldSchema = Array.isArray(fieldsSchema[f]) ? fieldsSchema[f] : [fieldsSchema[f]];
              fieldsSchema[f] = fieldSchema.map(addFullfield.bind(null, f));
            }
          }
          var schema = new Schema(fieldsSchema);
          schema.messages(options.messages);
          if (data.rule.options) {
            data.rule.options.messages = options.messages;
            data.rule.options.error = options.error;
          }
          schema.validate(data.value, data.rule.options || options, function (errs) {
            doIt(errs && errs.length ? errors.concat(errs) : errs);
          });
        }
      }

      var res = rule.validator(rule, data.value, cb, data.source, options);
      if (res && res.then) {
        res.then(function () {
          return cb();
        }, function (e) {
          return cb(e);
        });
      }
    }, function (results) {
      complete(results);
    });
  },
  getType: function getType(rule) {
    if (rule.type === undefined && rule.pattern instanceof RegExp) {
      rule.type = 'pattern';
    }
    if (typeof rule.validator !== 'function' && rule.type && !__WEBPACK_IMPORTED_MODULE_3__validator___["a" /* default */].hasOwnProperty(rule.type)) {
      throw new Error(Object(__WEBPACK_IMPORTED_MODULE_2__util__["d" /* format */])('Unknown rule type %s', rule.type));
    }
    return rule.type || 'string';
  },
  getValidationMethod: function getValidationMethod(rule) {
    if (typeof rule.validator === 'function') {
      return rule.validator;
    }
    var keys = Object.keys(rule);
    var messageIndex = keys.indexOf('message');
    if (messageIndex !== -1) {
      keys.splice(messageIndex, 1);
    }
    if (keys.length === 1 && keys[0] === 'required') {
      return __WEBPACK_IMPORTED_MODULE_3__validator___["a" /* default */].required;
    }
    return __WEBPACK_IMPORTED_MODULE_3__validator___["a" /* default */][this.getType(rule)] || false;
  }
};

Schema.register = function register(type, validator) {
  if (typeof validator !== 'function') {
    throw new Error('Cannot register a validator by type, validator is not a function');
  }
  __WEBPACK_IMPORTED_MODULE_3__validator___["a" /* default */][type] = validator;
};

Schema.warning = __WEBPACK_IMPORTED_MODULE_2__util__["f" /* warning */];

Schema.messages = __WEBPACK_IMPORTED_MODULE_4__messages__["a" /* messages */];

/* harmony default export */ __webpack_exports__["default"] = (Schema);

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(78), __esModule: true };

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(79);
module.exports = __webpack_require__(15).Object.assign;


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(25);

$export($export.S + $export.F, 'Object', { assign: __webpack_require__(82) });


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(81);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),
/* 81 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys = __webpack_require__(20);
var gOPS = __webpack_require__(32);
var pIE = __webpack_require__(23);
var toObject = __webpack_require__(47);
var IObject = __webpack_require__(45);
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(17)(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(12);
var toLength = __webpack_require__(84);
var toAbsoluteIndex = __webpack_require__(85);
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(28);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(28);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(87), __esModule: true };

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(88);
__webpack_require__(94);
module.exports = __webpack_require__(35).f('iterator');


/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__(89)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(48)(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(28);
var defined = __webpack_require__(27);
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(50);
var descriptor = __webpack_require__(19);
var setToStringTag = __webpack_require__(34);
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(9)(IteratorPrototype, __webpack_require__(13)('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(10);
var anObject = __webpack_require__(18);
var getKeys = __webpack_require__(20);

module.exports = __webpack_require__(11) ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(4).document;
module.exports = document && document.documentElement;


/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(8);
var toObject = __webpack_require__(47);
var IE_PROTO = __webpack_require__(29)('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(95);
var global = __webpack_require__(4);
var hide = __webpack_require__(9);
var Iterators = __webpack_require__(33);
var TO_STRING_TAG = __webpack_require__(13)('toStringTag');

var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
  'TextTrackList,TouchList').split(',');

for (var i = 0; i < DOMIterables.length; i++) {
  var NAME = DOMIterables[i];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}


/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(96);
var step = __webpack_require__(97);
var Iterators = __webpack_require__(33);
var toIObject = __webpack_require__(12);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(48)(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),
/* 96 */
/***/ (function(module, exports) {

module.exports = function () { /* empty */ };


/***/ }),
/* 97 */
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(99), __esModule: true };

/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(100);
__webpack_require__(106);
__webpack_require__(107);
__webpack_require__(108);
module.exports = __webpack_require__(15).Symbol;


/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global = __webpack_require__(4);
var has = __webpack_require__(8);
var DESCRIPTORS = __webpack_require__(11);
var $export = __webpack_require__(25);
var redefine = __webpack_require__(49);
var META = __webpack_require__(101).KEY;
var $fails = __webpack_require__(17);
var shared = __webpack_require__(30);
var setToStringTag = __webpack_require__(34);
var uid = __webpack_require__(22);
var wks = __webpack_require__(13);
var wksExt = __webpack_require__(35);
var wksDefine = __webpack_require__(36);
var enumKeys = __webpack_require__(102);
var isArray = __webpack_require__(103);
var anObject = __webpack_require__(18);
var isObject = __webpack_require__(16);
var toIObject = __webpack_require__(12);
var toPrimitive = __webpack_require__(26);
var createDesc = __webpack_require__(19);
var _create = __webpack_require__(50);
var gOPNExt = __webpack_require__(104);
var $GOPD = __webpack_require__(105);
var $DP = __webpack_require__(10);
var $keys = __webpack_require__(20);
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function';
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  __webpack_require__(51).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(23).f = $propertyIsEnumerable;
  __webpack_require__(32).f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__(21)) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    $replacer = replacer = args[1];
    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    if (!isArray(replacer)) replacer = function (key, value) {
      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(9)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);


/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__(22)('meta');
var isObject = __webpack_require__(16);
var has = __webpack_require__(8);
var setDesc = __webpack_require__(10).f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__(17)(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};


/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(20);
var gOPS = __webpack_require__(32);
var pIE = __webpack_require__(23);
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};


/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(46);
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(12);
var gOPN = __webpack_require__(51).f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__(23);
var createDesc = __webpack_require__(19);
var toIObject = __webpack_require__(12);
var toPrimitive = __webpack_require__(26);
var has = __webpack_require__(8);
var IE8_DOM_DEFINE = __webpack_require__(42);
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(11) ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),
/* 106 */
/***/ (function(module, exports) {



/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(36)('asyncIterator');


/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(36)('observable');


/***/ }),
/* 109 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 110 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__string__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__method__ = __webpack_require__(117);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__number__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__boolean__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__regexp__ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__integer__ = __webpack_require__(121);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__float__ = __webpack_require__(122);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__array__ = __webpack_require__(123);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__object__ = __webpack_require__(124);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__enum__ = __webpack_require__(125);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pattern__ = __webpack_require__(126);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__date__ = __webpack_require__(127);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__required__ = __webpack_require__(128);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__type__ = __webpack_require__(129);















/* harmony default export */ __webpack_exports__["a"] = ({
  string: __WEBPACK_IMPORTED_MODULE_0__string__["a" /* default */],
  method: __WEBPACK_IMPORTED_MODULE_1__method__["a" /* default */],
  number: __WEBPACK_IMPORTED_MODULE_2__number__["a" /* default */],
  boolean: __WEBPACK_IMPORTED_MODULE_3__boolean__["a" /* default */],
  regexp: __WEBPACK_IMPORTED_MODULE_4__regexp__["a" /* default */],
  integer: __WEBPACK_IMPORTED_MODULE_5__integer__["a" /* default */],
  float: __WEBPACK_IMPORTED_MODULE_6__float__["a" /* default */],
  array: __WEBPACK_IMPORTED_MODULE_7__array__["a" /* default */],
  object: __WEBPACK_IMPORTED_MODULE_8__object__["a" /* default */],
  'enum': __WEBPACK_IMPORTED_MODULE_9__enum__["a" /* default */],
  pattern: __WEBPACK_IMPORTED_MODULE_10__pattern__["a" /* default */],
  date: __WEBPACK_IMPORTED_MODULE_11__date__["a" /* default */],
  url: __WEBPACK_IMPORTED_MODULE_13__type__["a" /* default */],
  hex: __WEBPACK_IMPORTED_MODULE_13__type__["a" /* default */],
  email: __WEBPACK_IMPORTED_MODULE_13__type__["a" /* default */],
  required: __WEBPACK_IMPORTED_MODULE_12__required__["a" /* default */]
});

/***/ }),
/* 111 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__rule___ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util__ = __webpack_require__(0);



/**
 *  Performs validation for string types.
 *
 *  @param rule The validation rule.
 *  @param value The value of the field on the source object.
 *  @param callback The callback function.
 *  @param source The source object being validated.
 *  @param options The validation options.
 *  @param options.messages The validation messages.
 */
function string(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate) {
    if (Object(__WEBPACK_IMPORTED_MODULE_1__util__["e" /* isEmptyValue */])(value, 'string') && !rule.required) {
      return callback();
    }
    __WEBPACK_IMPORTED_MODULE_0__rule___["a" /* default */].required(rule, value, source, errors, options, 'string');
    if (!Object(__WEBPACK_IMPORTED_MODULE_1__util__["e" /* isEmptyValue */])(value, 'string')) {
      __WEBPACK_IMPORTED_MODULE_0__rule___["a" /* default */].type(rule, value, source, errors, options);
      __WEBPACK_IMPORTED_MODULE_0__rule___["a" /* default */].range(rule, value, source, errors, options);
      __WEBPACK_IMPORTED_MODULE_0__rule___["a" /* default */].pattern(rule, value, source, errors, options);
      if (rule.whitespace === true) {
        __WEBPACK_IMPORTED_MODULE_0__rule___["a" /* default */].whitespace(rule, value, source, errors, options);
      }
    }
  }
  callback(errors);
}

/* harmony default export */ __webpack_exports__["a"] = (string);

/***/ }),
/* 112 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(0);


/**
 *  Rule for validating whitespace.
 *
 *  @param rule The validation rule.
 *  @param value The value of the field on the source object.
 *  @param source The source object being validated.
 *  @param errors An array of errors that this rule may add
 *  validation errors to.
 *  @param options The validation options.
 *  @param options.messages The validation messages.
 */
function whitespace(rule, value, source, errors, options) {
  if (/^\s+$/.test(value) || value === '') {
    errors.push(__WEBPACK_IMPORTED_MODULE_0__util__["d" /* format */](options.messages.whitespace, rule.fullField));
  }
}

/* harmony default export */ __webpack_exports__["a"] = (whitespace);

/***/ }),
/* 113 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__required__ = __webpack_require__(52);




/* eslint max-len:0 */

var pattern = {
  // http://emailregex.com/
  email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  url: new RegExp('^(?!mailto:)(?:(?:http|https|ftp)://|//)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$', 'i'),
  hex: /^#?([a-f0-9]{6}|[a-f0-9]{3})$/i
};

var types = {
  integer: function integer(value) {
    return types.number(value) && parseInt(value, 10) === value;
  },
  float: function float(value) {
    return types.number(value) && !types.integer(value);
  },
  array: function array(value) {
    return Array.isArray(value);
  },
  regexp: function regexp(value) {
    if (value instanceof RegExp) {
      return true;
    }
    try {
      return !!new RegExp(value);
    } catch (e) {
      return false;
    }
  },
  date: function date(value) {
    return typeof value.getTime === 'function' && typeof value.getMonth === 'function' && typeof value.getYear === 'function';
  },
  number: function number(value) {
    if (isNaN(value)) {
      return false;
    }
    return typeof value === 'number';
  },
  object: function object(value) {
    return (typeof value === 'undefined' ? 'undefined' : __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof___default()(value)) === 'object' && !types.array(value);
  },
  method: function method(value) {
    return typeof value === 'function';
  },
  email: function email(value) {
    return typeof value === 'string' && !!value.match(pattern.email) && value.length < 255;
  },
  url: function url(value) {
    return typeof value === 'string' && !!value.match(pattern.url);
  },
  hex: function hex(value) {
    return typeof value === 'string' && !!value.match(pattern.hex);
  }
};

/**
 *  Rule for validating the type of a value.
 *
 *  @param rule The validation rule.
 *  @param value The value of the field on the source object.
 *  @param source The source object being validated.
 *  @param errors An array of errors that this rule may add
 *  validation errors to.
 *  @param options The validation options.
 *  @param options.messages The validation messages.
 */
function type(rule, value, source, errors, options) {
  if (rule.required && value === undefined) {
    Object(__WEBPACK_IMPORTED_MODULE_2__required__["a" /* default */])(rule, value, source, errors, options);
    return;
  }
  var custom = ['integer', 'float', 'array', 'regexp', 'object', 'method', 'email', 'number', 'date', 'url', 'hex'];
  var ruleType = rule.type;
  if (custom.indexOf(ruleType) > -1) {
    if (!types[ruleType](value)) {
      errors.push(__WEBPACK_IMPORTED_MODULE_1__util__["d" /* format */](options.messages.types[ruleType], rule.fullField, rule.type));
    }
    // straight typeof check
  } else if (ruleType && (typeof value === 'undefined' ? 'undefined' : __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof___default()(value)) !== rule.type) {
    errors.push(__WEBPACK_IMPORTED_MODULE_1__util__["d" /* format */](options.messages.types[ruleType], rule.fullField, rule.type));
  }
}

/* harmony default export */ __webpack_exports__["a"] = (type);

/***/ }),
/* 114 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(0);


/**
 *  Rule for validating minimum and maximum allowed values.
 *
 *  @param rule The validation rule.
 *  @param value The value of the field on the source object.
 *  @param source The source object being validated.
 *  @param errors An array of errors that this rule may add
 *  validation errors to.
 *  @param options The validation options.
 *  @param options.messages The validation messages.
 */
function range(rule, value, source, errors, options) {
  var len = typeof rule.len === 'number';
  var min = typeof rule.min === 'number';
  var max = typeof rule.max === 'number';
  // 正则匹配码点范围从U+010000一直到U+10FFFF的文字（补充平面Supplementary Plane）
  var spRegexp = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
  var val = value;
  var key = null;
  var num = typeof value === 'number';
  var str = typeof value === 'string';
  var arr = Array.isArray(value);
  if (num) {
    key = 'number';
  } else if (str) {
    key = 'string';
  } else if (arr) {
    key = 'array';
  }
  // if the value is not of a supported type for range validation
  // the validation rule rule should use the
  // type property to also test for a particular type
  if (!key) {
    return false;
  }
  if (arr) {
    val = value.length;
  }
  if (str) {
    // 处理码点大于U+010000的文字length属性不准确的bug，如"𠮷𠮷𠮷".lenght !== 3
    val = value.replace(spRegexp, '_').length;
  }
  if (len) {
    if (val !== rule.len) {
      errors.push(__WEBPACK_IMPORTED_MODULE_0__util__["d" /* format */](options.messages[key].len, rule.fullField, rule.len));
    }
  } else if (min && !max && val < rule.min) {
    errors.push(__WEBPACK_IMPORTED_MODULE_0__util__["d" /* format */](options.messages[key].min, rule.fullField, rule.min));
  } else if (max && !min && val > rule.max) {
    errors.push(__WEBPACK_IMPORTED_MODULE_0__util__["d" /* format */](options.messages[key].max, rule.fullField, rule.max));
  } else if (min && max && (val < rule.min || val > rule.max)) {
    errors.push(__WEBPACK_IMPORTED_MODULE_0__util__["d" /* format */](options.messages[key].range, rule.fullField, rule.min, rule.max));
  }
}

/* harmony default export */ __webpack_exports__["a"] = (range);

/***/ }),
/* 115 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(0);

var ENUM = 'enum';

/**
 *  Rule for validating a value exists in an enumerable list.
 *
 *  @param rule The validation rule.
 *  @param value The value of the field on the source object.
 *  @param source The source object being validated.
 *  @param errors An array of errors that this rule may add
 *  validation errors to.
 *  @param options The validation options.
 *  @param options.messages The validation messages.
 */
function enumerable(rule, value, source, errors, options) {
  rule[ENUM] = Array.isArray(rule[ENUM]) ? rule[ENUM] : [];
  if (rule[ENUM].indexOf(value) === -1) {
    errors.push(__WEBPACK_IMPORTED_MODULE_0__util__["d" /* format */](options.messages[ENUM], rule.fullField, rule[ENUM].join(', ')));
  }
}

/* harmony default export */ __webpack_exports__["a"] = (enumerable);

/***/ }),
/* 116 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(0);


/**
 *  Rule for validating a regular expression pattern.
 *
 *  @param rule The validation rule.
 *  @param value The value of the field on the source object.
 *  @param source The source object being validated.
 *  @param errors An array of errors that this rule may add
 *  validation errors to.
 *  @param options The validation options.
 *  @param options.messages The validation messages.
 */
function pattern(rule, value, source, errors, options) {
  if (rule.pattern) {
    if (rule.pattern instanceof RegExp) {
      // if a RegExp instance is passed, reset `lastIndex` in case its `global`
      // flag is accidentally set to `true`, which in a validation scenario
      // is not necessary and the result might be misleading
      rule.pattern.lastIndex = 0;
      if (!rule.pattern.test(value)) {
        errors.push(__WEBPACK_IMPORTED_MODULE_0__util__["d" /* format */](options.messages.pattern.mismatch, rule.fullField, value, rule.pattern));
      }
    } else if (typeof rule.pattern === 'string') {
      var _pattern = new RegExp(rule.pattern);
      if (!_pattern.test(value)) {
        errors.push(__WEBPACK_IMPORTED_MODULE_0__util__["d" /* format */](options.messages.pattern.mismatch, rule.fullField, value, rule.pattern));
      }
    }
  }
}

/* harmony default export */ __webpack_exports__["a"] = (pattern);

/***/ }),
/* 117 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__rule___ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util__ = __webpack_require__(0);



/**
 *  Validates a function.
 *
 *  @param rule The validation rule.
 *  @param value The value of the field on the source object.
 *  @param callback The callback function.
 *  @param source The source object being validated.
 *  @param options The validation options.
 *  @param options.messages The validation messages.
 */
function method(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate) {
    if (Object(__WEBPACK_IMPORTED_MODULE_1__util__["e" /* isEmptyValue */])(value) && !rule.required) {
      return callback();
    }
    __WEBPACK_IMPORTED_MODULE_0__rule___["a" /* default */].required(rule, value, source, errors, options);
    if (value !== undefined) {
      __WEBPACK_IMPORTED_MODULE_0__rule___["a" /* default */].type(rule, value, source, errors, options);
    }
  }
  callback(errors);
}

/* harmony default export */ __webpack_exports__["a"] = (method);

/***/ }),
/* 118 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__rule___ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util__ = __webpack_require__(0);



/**
 *  Validates a number.
 *
 *  @param rule The validation rule.
 *  @param value The value of the field on the source object.
 *  @param callback The callback function.
 *  @param source The source object being validated.
 *  @param options The validation options.
 *  @param options.messages The validation messages.
 */
function number(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate) {
    if (Object(__WEBPACK_IMPORTED_MODULE_1__util__["e" /* isEmptyValue */])(value) && !rule.required) {
      return callback();
    }
    __WEBPACK_IMPORTED_MODULE_0__rule___["a" /* default */].required(rule, value, source, errors, options);
    if (value !== undefined) {
      __WEBPACK_IMPORTED_MODULE_0__rule___["a" /* default */].type(rule, value, source, errors, options);
      __WEBPACK_IMPORTED_MODULE_0__rule___["a" /* default */].range(rule, value, source, errors, options);
    }
  }
  callback(errors);
}

/* harmony default export */ __webpack_exports__["a"] = (number);

/***/ }),
/* 119 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__rule___ = __webpack_require__(1);



/**
 *  Validates a boolean.
 *
 *  @param rule The validation rule.
 *  @param value The value of the field on the source object.
 *  @param callback The callback function.
 *  @param source The source object being validated.
 *  @param options The validation options.
 *  @param options.messages The validation messages.
 */
function boolean(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate) {
    if (Object(__WEBPACK_IMPORTED_MODULE_0__util__["e" /* isEmptyValue */])(value) && !rule.required) {
      return callback();
    }
    __WEBPACK_IMPORTED_MODULE_1__rule___["a" /* default */].required(rule, value, source, errors, options);
    if (value !== undefined) {
      __WEBPACK_IMPORTED_MODULE_1__rule___["a" /* default */].type(rule, value, source, errors, options);
    }
  }
  callback(errors);
}

/* harmony default export */ __webpack_exports__["a"] = (boolean);

/***/ }),
/* 120 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__rule___ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util__ = __webpack_require__(0);



/**
 *  Validates the regular expression type.
 *
 *  @param rule The validation rule.
 *  @param value The value of the field on the source object.
 *  @param callback The callback function.
 *  @param source The source object being validated.
 *  @param options The validation options.
 *  @param options.messages The validation messages.
 */
function regexp(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate) {
    if (Object(__WEBPACK_IMPORTED_MODULE_1__util__["e" /* isEmptyValue */])(value) && !rule.required) {
      return callback();
    }
    __WEBPACK_IMPORTED_MODULE_0__rule___["a" /* default */].required(rule, value, source, errors, options);
    if (!Object(__WEBPACK_IMPORTED_MODULE_1__util__["e" /* isEmptyValue */])(value)) {
      __WEBPACK_IMPORTED_MODULE_0__rule___["a" /* default */].type(rule, value, source, errors, options);
    }
  }
  callback(errors);
}

/* harmony default export */ __webpack_exports__["a"] = (regexp);

/***/ }),
/* 121 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__rule___ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util__ = __webpack_require__(0);



/**
 *  Validates a number is an integer.
 *
 *  @param rule The validation rule.
 *  @param value The value of the field on the source object.
 *  @param callback The callback function.
 *  @param source The source object being validated.
 *  @param options The validation options.
 *  @param options.messages The validation messages.
 */
function integer(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate) {
    if (Object(__WEBPACK_IMPORTED_MODULE_1__util__["e" /* isEmptyValue */])(value) && !rule.required) {
      return callback();
    }
    __WEBPACK_IMPORTED_MODULE_0__rule___["a" /* default */].required(rule, value, source, errors, options);
    if (value !== undefined) {
      __WEBPACK_IMPORTED_MODULE_0__rule___["a" /* default */].type(rule, value, source, errors, options);
      __WEBPACK_IMPORTED_MODULE_0__rule___["a" /* default */].range(rule, value, source, errors, options);
    }
  }
  callback(errors);
}

/* harmony default export */ __webpack_exports__["a"] = (integer);

/***/ }),
/* 122 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__rule___ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util__ = __webpack_require__(0);



/**
 *  Validates a number is a floating point number.
 *
 *  @param rule The validation rule.
 *  @param value The value of the field on the source object.
 *  @param callback The callback function.
 *  @param source The source object being validated.
 *  @param options The validation options.
 *  @param options.messages The validation messages.
 */
function floatFn(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate) {
    if (Object(__WEBPACK_IMPORTED_MODULE_1__util__["e" /* isEmptyValue */])(value) && !rule.required) {
      return callback();
    }
    __WEBPACK_IMPORTED_MODULE_0__rule___["a" /* default */].required(rule, value, source, errors, options);
    if (value !== undefined) {
      __WEBPACK_IMPORTED_MODULE_0__rule___["a" /* default */].type(rule, value, source, errors, options);
      __WEBPACK_IMPORTED_MODULE_0__rule___["a" /* default */].range(rule, value, source, errors, options);
    }
  }
  callback(errors);
}

/* harmony default export */ __webpack_exports__["a"] = (floatFn);

/***/ }),
/* 123 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__rule___ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util__ = __webpack_require__(0);


/**
 *  Validates an array.
 *
 *  @param rule The validation rule.
 *  @param value The value of the field on the source object.
 *  @param callback The callback function.
 *  @param source The source object being validated.
 *  @param options The validation options.
 *  @param options.messages The validation messages.
 */
function array(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate) {
    if (Object(__WEBPACK_IMPORTED_MODULE_1__util__["e" /* isEmptyValue */])(value, 'array') && !rule.required) {
      return callback();
    }
    __WEBPACK_IMPORTED_MODULE_0__rule___["a" /* default */].required(rule, value, source, errors, options, 'array');
    if (!Object(__WEBPACK_IMPORTED_MODULE_1__util__["e" /* isEmptyValue */])(value, 'array')) {
      __WEBPACK_IMPORTED_MODULE_0__rule___["a" /* default */].type(rule, value, source, errors, options);
      __WEBPACK_IMPORTED_MODULE_0__rule___["a" /* default */].range(rule, value, source, errors, options);
    }
  }
  callback(errors);
}

/* harmony default export */ __webpack_exports__["a"] = (array);

/***/ }),
/* 124 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__rule___ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util__ = __webpack_require__(0);



/**
 *  Validates an object.
 *
 *  @param rule The validation rule.
 *  @param value The value of the field on the source object.
 *  @param callback The callback function.
 *  @param source The source object being validated.
 *  @param options The validation options.
 *  @param options.messages The validation messages.
 */
function object(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate) {
    if (Object(__WEBPACK_IMPORTED_MODULE_1__util__["e" /* isEmptyValue */])(value) && !rule.required) {
      return callback();
    }
    __WEBPACK_IMPORTED_MODULE_0__rule___["a" /* default */].required(rule, value, source, errors, options);
    if (value !== undefined) {
      __WEBPACK_IMPORTED_MODULE_0__rule___["a" /* default */].type(rule, value, source, errors, options);
    }
  }
  callback(errors);
}

/* harmony default export */ __webpack_exports__["a"] = (object);

/***/ }),
/* 125 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__rule___ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util__ = __webpack_require__(0);


var ENUM = 'enum';

/**
 *  Validates an enumerable list.
 *
 *  @param rule The validation rule.
 *  @param value The value of the field on the source object.
 *  @param callback The callback function.
 *  @param source The source object being validated.
 *  @param options The validation options.
 *  @param options.messages The validation messages.
 */
function enumerable(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate) {
    if (Object(__WEBPACK_IMPORTED_MODULE_1__util__["e" /* isEmptyValue */])(value) && !rule.required) {
      return callback();
    }
    __WEBPACK_IMPORTED_MODULE_0__rule___["a" /* default */].required(rule, value, source, errors, options);
    if (value) {
      __WEBPACK_IMPORTED_MODULE_0__rule___["a" /* default */][ENUM](rule, value, source, errors, options);
    }
  }
  callback(errors);
}

/* harmony default export */ __webpack_exports__["a"] = (enumerable);

/***/ }),
/* 126 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__rule___ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util__ = __webpack_require__(0);



/**
 *  Validates a regular expression pattern.
 *
 *  Performs validation when a rule only contains
 *  a pattern property but is not declared as a string type.
 *
 *  @param rule The validation rule.
 *  @param value The value of the field on the source object.
 *  @param callback The callback function.
 *  @param source The source object being validated.
 *  @param options The validation options.
 *  @param options.messages The validation messages.
 */
function pattern(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate) {
    if (Object(__WEBPACK_IMPORTED_MODULE_1__util__["e" /* isEmptyValue */])(value, 'string') && !rule.required) {
      return callback();
    }
    __WEBPACK_IMPORTED_MODULE_0__rule___["a" /* default */].required(rule, value, source, errors, options);
    if (!Object(__WEBPACK_IMPORTED_MODULE_1__util__["e" /* isEmptyValue */])(value, 'string')) {
      __WEBPACK_IMPORTED_MODULE_0__rule___["a" /* default */].pattern(rule, value, source, errors, options);
    }
  }
  callback(errors);
}

/* harmony default export */ __webpack_exports__["a"] = (pattern);

/***/ }),
/* 127 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__rule___ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util__ = __webpack_require__(0);



function date(rule, value, callback, source, options) {
  // console.log('integer rule called %j', rule);
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  // console.log('validate on %s value', value);
  if (validate) {
    if (Object(__WEBPACK_IMPORTED_MODULE_1__util__["e" /* isEmptyValue */])(value) && !rule.required) {
      return callback();
    }
    __WEBPACK_IMPORTED_MODULE_0__rule___["a" /* default */].required(rule, value, source, errors, options);
    if (!Object(__WEBPACK_IMPORTED_MODULE_1__util__["e" /* isEmptyValue */])(value)) {
      var dateObject = void 0;

      if (typeof value === 'number') {
        dateObject = new Date(value);
      } else {
        dateObject = value;
      }

      __WEBPACK_IMPORTED_MODULE_0__rule___["a" /* default */].type(rule, dateObject, source, errors, options);
      if (dateObject) {
        __WEBPACK_IMPORTED_MODULE_0__rule___["a" /* default */].range(rule, dateObject.getTime(), source, errors, options);
      }
    }
  }
  callback(errors);
}

/* harmony default export */ __webpack_exports__["a"] = (date);

/***/ }),
/* 128 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__rule___ = __webpack_require__(1);



function required(rule, value, callback, source, options) {
  var errors = [];
  var type = Array.isArray(value) ? 'array' : typeof value === 'undefined' ? 'undefined' : __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof___default()(value);
  __WEBPACK_IMPORTED_MODULE_1__rule___["a" /* default */].required(rule, value, source, errors, options, type);
  callback(errors);
}

/* harmony default export */ __webpack_exports__["a"] = (required);

/***/ }),
/* 129 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__rule___ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util__ = __webpack_require__(0);



function type(rule, value, callback, source, options) {
  var ruleType = rule.type;
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate) {
    if (Object(__WEBPACK_IMPORTED_MODULE_1__util__["e" /* isEmptyValue */])(value, ruleType) && !rule.required) {
      return callback();
    }
    __WEBPACK_IMPORTED_MODULE_0__rule___["a" /* default */].required(rule, value, source, errors, options, ruleType);
    if (!Object(__WEBPACK_IMPORTED_MODULE_1__util__["e" /* isEmptyValue */])(value, ruleType)) {
      __WEBPACK_IMPORTED_MODULE_0__rule___["a" /* default */].type(rule, value, source, errors, options);
    }
  }
  callback(errors);
}

/* harmony default export */ __webpack_exports__["a"] = (type);

/***/ }),
/* 130 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = newMessages;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return messages; });
function newMessages() {
  return {
    'default': 'Validation error on field %s',
    required: '%s is required',
    'enum': '%s must be one of %s',
    whitespace: '%s cannot be empty',
    date: {
      format: '%s date %s is invalid for format %s',
      parse: '%s date could not be parsed, %s is invalid ',
      invalid: '%s date %s is invalid'
    },
    types: {
      string: '%s is not a %s',
      method: '%s is not a %s (function)',
      array: '%s is not an %s',
      object: '%s is not an %s',
      number: '%s is not a %s',
      date: '%s is not a %s',
      boolean: '%s is not a %s',
      integer: '%s is not an %s',
      float: '%s is not a %s',
      regexp: '%s is not a valid %s',
      email: '%s is not a valid %s',
      url: '%s is not a valid %s',
      hex: '%s is not a valid %s'
    },
    string: {
      len: '%s must be exactly %s characters',
      min: '%s must be at least %s characters',
      max: '%s cannot be longer than %s characters',
      range: '%s must be between %s and %s characters'
    },
    number: {
      len: '%s must equal %s',
      min: '%s cannot be less than %s',
      max: '%s cannot be greater than %s',
      range: '%s must be between %s and %s'
    },
    array: {
      len: '%s must be exactly %s in length',
      min: '%s cannot be less than %s in length',
      max: '%s cannot be greater than %s in length',
      range: '%s must be between %s and %s in length'
    },
    pattern: {
      mismatch: '%s value %s does not match pattern %s'
    },
    clone: function clone() {
      var cloned = JSON.parse(JSON.stringify(this));
      cloned.clone = this.clone;
      return cloned;
    }
  };
}

var messages = newMessages();

/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * bem helper
 * b() // 'button'
 * b('text') // 'button__text'
 * b({ disabled }) // 'button button--disabled'
 * b('text', { disabled }) // 'button__text button__text--disabled'
 * b(['disabled', 'primary']) // 'button button--disabled button--primary'
 */

var ELEMENT = '__';
var MODS = '--';

var join = function join(name, el, symbol) {
    return el ? name + symbol + el : name;
};

var prefix = function prefix(name, mods) {
    if (typeof mods === 'string') {
        return join(name, mods, MODS);
    }

    if (Array.isArray(mods)) {
        return mods.map(function (item) {
            return prefix(name, item);
        });
    }

    var ret = {};
    Object.keys(mods).forEach(function (key) {
        ret[name + MODS + key] = mods[key];
    });
    return ret;
};

exports.default = {
    methods: {
        b: function b(el, mods) {
            var name = this.$options.name;


            if (el && typeof el !== 'string') {
                mods = el;
                el = '';
            }
            el = join(name, el, ELEMENT);

            return mods ? [el, prefix(el, mods)] : el;
        }
    }
};

/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (type) {
  var isCrud = type === 'crud';
  return {
    props: {
      option: {
        type: Object,
        required: true,
        default: function _default() {
          return {};
        }
      }
    },
    watch: {
      option: {
        handler: function handler() {
          this.init();
        },

        deep: true
      }
    },
    data: function data() {
      return {
        DIC: {},
        cascaderDIC: {},
        tableOption: {},
        isMobile: ''
      };
    },
    created: function created() {
      this.init();
    },

    computed: {
      menuType: function menuType() {
        return this.tableOption.menuType || this.$AVUE.menuType || 'button';
      },
      isMediumSize: function isMediumSize() {
        return this.controlSize === 'medium' ? 'small' : this.controlSize;
      },
      controlSize: function controlSize() {
        return this.tableOption.size || (this.$AVUE || {}).size || 'medium';
      }
    },
    methods: {
      getKey: function getKey() {
        var item = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var key = arguments[2];

        return item[props[key] || (this.parentOption.props || {})[key] || key];
      },
      getIsMobile: function getIsMobile() {
        this.isMobile = window.document.body.clientWidth <= 768;
      },
      init: function init() {
        var _this = this;

        this.tableOption = this.option;
        this.getIsMobile();
        window.onresize = function () {
          _this.getIsMobile();
        };
        // 规则初始化
        if (this.rulesInit) {
          (isCrud ? this.propOption : this.columnOption).forEach(function (ele) {
            _this.rulesInit(ele.column);
          });
        }
        setTimeout(function () {
          _this.initDic();
        }, 0);
      },

      //检测本地字典
      initDic: function initDic() {
        var _this2 = this;

        if (isCrud) {
          // 表格赋值
          this.propOption.forEach(function (ele) {
            if (Array.isArray(ele.dicData)) {
              _this2.$set(_this2.DIC, ele.prop, ele.dicData);
            }
          });
        } else {
          //表单赋值
          this.columnOption.forEach(function (ele) {
            (ele.column || []).forEach(function (item) {
              if (Array.isArray(item.dicData)) {
                _this2.$set(_this2.DIC, item.prop, item.dicData);
              }
            });
          });
        }
      },

      // 加载字典
      handleLoadDic: function handleLoadDic(option) {
        var _this3 = this;

        return new Promise(function (resolve) {
          var dicFlag = _this3.vaildData(_this3.tableOption.dicFlag, true);
          // 初始化字典
          if (dicFlag) {
            (0, _dic.loadDic)(option || _this3.tableOption).then(function () {
              var res = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

              Object.keys(res).forEach(function (ele) {
                _this3.$set(_this3.DIC, ele, res[ele]);
              });
              resolve();
            });
            // 加载传进来的字典
          } else {
            var dicData = _this3.tableOption.dicData || [];
            _this3.DIC = _this3.deepClone(dicData);
            resolve();
          }
        });
      },
      handleLoadCascaderDic: function handleLoadCascaderDic(option, data) {
        var _this4 = this;

        (0, _dic.loadCascaderDic)(option || (isCrud ? this.propOption : this.columnOption), this.data || [data]).then(function (res) {
          if (option) {
            Object.keys(res).forEach(function (ele) {
              _this4.$set(_this4.cascaderDIC, ele, res);
            });
          } else {
            _this4.cascaderDIC = _this4.deepClone(res);
          }
        });
      }
    }
  };
};

var _dic = __webpack_require__(54);

/***/ }),
/* 133 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:_vm.b('mobile'),style:({width:_vm.setPx(_vm.tableOption.formWidth,'100%')})},[_c('van-cell-group',{staticClass:"avue-cell-group"},[_vm._l((_vm.columnOption),function(column,index){return [_c(_vm.getComponent(column.type,column.component),{key:index,tag:"component",class:{'avue-cell--row':column.row},attrs:{"label":column.label,"placeholder":_vm.getPlaceholder(column),"dataType":column.dataType,"action":column.action,"limit":column.limit,"listType":column.listType,"prefixIcon":column.prefixIcon,"suffixIcon":column.suffixIcon,"oss":column.oss,"type":column.type,"readonly":column.readonly,"tip":column.tip,"disabled":column.disabled || _vm.tableOption.disabled,"minRows":column.minRows,"rules":column.rules,"tags":column.tags,"valueFormat":column.valueFormat,"format":column.format,"propsHttp":column.propsHttp,"canvasOption":column.canvasOption,"maxRows":column.maxRows,"props":column.props || _vm.tableOption.props,"dic":_vm.DIC[column.prop],"clearable":column.clearable},on:{"change":function($event){column.cascader?_vm.handleChange(_vm.columnOption,index):''}},model:{value:(_vm.form[column.prop]),callback:function ($$v) {_vm.$set(_vm.form, column.prop, $$v)},expression:"form[column.prop]"}})]}),_c('div',{class:_vm.b('mobile-menu')},[(_vm.tableOption.submitBtn)?_c('van-button',{attrs:{"block":"","type":"primary"},on:{"click":_vm.submit}},[_vm._v(_vm._s(_vm.vaildData(_vm.tableOption.submitText,'提 交')))]):_vm._e()],1)],2)],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 134 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_6e3a0f1e_hasScoped_false_preserveWhitespace_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(135);
var normalizeComponent = __webpack_require__(2)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_6e3a0f1e_hasScoped_false_preserveWhitespace_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 135 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"avue-cell"},[_c('van-field',{attrs:{"placeholder":_vm.placeholder,"clearable":_vm.clearable,"left-icon":_vm.prefixIcon,"input-align":_vm.inputAlign,"type":_vm.typeParam,"required":_vm.required,"autosize":{ minHeight: _vm.minRows*50, maxHeight: _vm.maxRows*50},"readonly":_vm.readonly,"disabled":_vm.disabled,"icon":_vm.suffixIcon,"label":_vm.label},nativeOn:{"click":function($event){return _vm.handleClick($event)}},model:{value:(_vm.text),callback:function ($$v) {_vm.text=$$v},expression:"text"}})],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 136 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_b1366fd2_hasScoped_false_preserveWhitespace_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(137);
var normalizeComponent = __webpack_require__(2)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_b1366fd2_hasScoped_false_preserveWhitespace_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 137 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"avue-cell"},[_c('van-field',{attrs:{"placeholder":_vm.placeholder,"disabled":_vm.disabled,"clearable":_vm.clearable,"left-icon":_vm.prefixIcon,"is-link":"","input-align":"right","required":_vm.required,"readonly":"","icon":_vm.suffixIcon,"label":_vm.label},nativeOn:{"click":function($event){return _vm.handleSelectClick($event)}},model:{value:(_vm.textLabel),callback:function ($$v) {_vm.textLabel=$$v},expression:"textLabel"}}),_c('van-popup',{attrs:{"position":"bottom"},model:{value:(_vm.box),callback:function ($$v) {_vm.box=$$v},expression:"box"}},[_c('van-picker',{ref:"picker",attrs:{"show-toolbar":"","title":_vm.label,"columns":_vm.columns},on:{"cancel":_vm.handleCancel,"confirm":_vm.handleConfirm}})],1)],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 138 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_119df47d_hasScoped_false_preserveWhitespace_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(139);
var normalizeComponent = __webpack_require__(2)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_119df47d_hasScoped_false_preserveWhitespace_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 139 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"avue-cell"},[(_vm.tags)?_c('van-cell',{class:{'van-cell--required':_vm.required},attrs:{"title":_vm.label}},_vm._l((_vm.dic),function(item,index){return _c('van-tag',{key:index,staticClass:"avue-cell__tags",attrs:{"plain":"","type":_vm.text===item[_vm.valueKey]?'primary':''},nativeOn:{"click":function($event){return _vm.handleRadioClick(item[_vm.valueKey])}}},[_vm._v(_vm._s(item[_vm.labelKey]))])}),1):_c('van-radio-group',{on:{"change":_vm.handleChange},model:{value:(_vm.text),callback:function ($$v) {_vm.text=$$v},expression:"text"}},[_c('p',{class:['avue-cell__title',{'avue-cell__title--required':_vm.required}]},[_vm._v("\n      "+_vm._s(_vm.label)+"\n      "),(_vm.tip)?_c('small',{staticClass:"avue-cell__tip"},[_vm._v(_vm._s(_vm.tip))]):_vm._e()]),_c('van-cell-group',_vm._l((_vm.dic),function(item,index){return _c('van-cell',{key:index,attrs:{"title":item[_vm.labelKey],"clickable":"","disabled":_vm.disabled},on:{"click":function($event){return _vm.handleRadioClick(item[_vm.valueKey])}}},[_c('van-radio',{attrs:{"name":item[_vm.valueKey]}})],1)}),1)],1)],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 140 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_6b3aa9b0_hasScoped_false_preserveWhitespace_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(141);
var normalizeComponent = __webpack_require__(2)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_6b3aa9b0_hasScoped_false_preserveWhitespace_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 141 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"avue-cell"},[(_vm.tags)?_c('van-cell',{class:{'van-cell--required':_vm.required},attrs:{"title":_vm.label}},_vm._l((_vm.dic),function(item,index){return _c('van-tag',{key:index,staticClass:"avue-cell__tags",attrs:{"plain":"","type":_vm.text.includes(item[_vm.valueKey])?'primary':''},nativeOn:{"click":function($event){return _vm.handleCheckboxClick(index)}}},[_vm._v(_vm._s(item[_vm.labelKey]))])}),1):_vm._e(),_c('van-checkbox-group',{directives:[{name:"show",rawName:"v-show",value:(!_vm.tags),expression:"!tags"}],attrs:{"max":_vm.max},on:{"change":_vm.handleChange},model:{value:(_vm.text),callback:function ($$v) {_vm.text=$$v},expression:"text"}},[_c('p',{class:['avue-cell__title',{'avue-cell__title--required':_vm.required}]},[_vm._v("\n      "+_vm._s(_vm.label)+"\n      "),(_vm.tip)?_c('small',{staticClass:"avue-cell__tip"},[_vm._v(_vm._s(_vm.tip))]):_vm._e()]),_c('van-cell-group',_vm._l((_vm.dic),function(item,index){return _c('van-cell',{key:index,attrs:{"title":item[_vm.labelKey],"clickable":"","disabled":_vm.disabled},on:{"click":function($event){return _vm.handleCheckboxClick(index)}}},[_c('van-checkbox',{ref:"checkbox",refInFor:true,attrs:{"name":item[_vm.valueKey]}})],1)}),1)],1)],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 142 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_36d70ad2_hasScoped_false_preserveWhitespace_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(143);
var normalizeComponent = __webpack_require__(2)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_36d70ad2_hasScoped_false_preserveWhitespace_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 143 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"avue-cell"},[_c('van-cell',{class:{'van-cell--required':_vm.required},attrs:{"title":_vm.label}},[_c('van-switch',{attrs:{"size":"20px","disabled":_vm.disabled},on:{"change":_vm.handleSwitchChange},model:{value:(_vm.textLabel),callback:function ($$v) {_vm.textLabel=$$v},expression:"textLabel"}})],1)],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 144 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_655ab7a5_hasScoped_false_preserveWhitespace_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(145);
var normalizeComponent = __webpack_require__(2)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_655ab7a5_hasScoped_false_preserveWhitespace_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 145 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"avue-cell"},[_c('van-field',{attrs:{"placeholder":_vm.placeholder,"clearable":_vm.clearable,"left-icon":_vm.prefixIcon,"is-link":"","disabled":_vm.disabled,"input-align":"right","required":_vm.required,"readonly":"","icon":_vm.suffixIcon,"label":_vm.label},nativeOn:{"click":function($event){return _vm.handleDateClick($event)}},model:{value:(_vm.textLabel),callback:function ($$v) {_vm.textLabel=$$v},expression:"textLabel"}}),_c('van-popup',{attrs:{"position":"bottom"},model:{value:(_vm.box),callback:function ($$v) {_vm.box=$$v},expression:"box"}},[_c('van-datetime-picker',{ref:"picker",attrs:{"title":_vm.label,"type":_vm.type},on:{"cancel":_vm.handleCancel,"confirm":_vm.handleConfirm}})],1)],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 146 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_3194521c_hasScoped_false_preserveWhitespace_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(147);
var normalizeComponent = __webpack_require__(2)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_3194521c_hasScoped_false_preserveWhitespace_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 147 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"avue-cell"},[_c('van-field',{attrs:{"placeholder":_vm.placeholder,"clearable":_vm.clearable,"left-icon":_vm.prefixIcon,"disabled":_vm.disabled,"is-link":"","input-align":"right","required":_vm.required,"readonly":"","icon":_vm.suffixIcon,"label":_vm.label},nativeOn:{"click":function($event){return _vm.handleDateClick($event)}},model:{value:(_vm.textLabel),callback:function ($$v) {_vm.textLabel=$$v},expression:"textLabel"}}),_c('van-popup',{attrs:{"position":"bottom"},model:{value:(_vm.box),callback:function ($$v) {_vm.box=$$v},expression:"box"}},[_c('van-datetime-picker',{ref:"picker",attrs:{"title":_vm.label,"type":"time"},on:{"cancel":_vm.handleCancel,"confirm":_vm.handleConfirm}})],1)],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 148 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_26e22561_hasScoped_false_preserveWhitespace_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(152);
var normalizeComponent = __webpack_require__(2)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_26e22561_hasScoped_false_preserveWhitespace_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.detailImg = detailImg;
//标准参数
var canvas,
    ctx,
    configDefault = {
  width: 200,
  height: 200
};
var config = {
  text: 'avue.top', //文字
  fontFamily: 'microsoft yahei', //字体
  color: "#999", //颜色
  fontSize: 16, //大小
  opacity: 100, //透明度
  bottom: 10, //下边位置
  right: 10, //右边位置
  ratio: 1 //压缩比

  //将base64转换为文件

};function detailImg(file) {
  var option = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  return new Promise(function (resolve, reject) {
    var text = option.text,
        fontFamily = option.fontFamily,
        color = option.color,
        fontSize = option.fontSize,
        opacity = option.opacity,
        bottom = option.bottom,
        right = option.right,
        ratio = option.ratio;

    initParams();
    fileToBase64(file, initImg);
    function dataURLtoFile(dataurl, filename) {
      var arr = dataurl.split(','),
          mime = arr[0].match(/:(.*?);/)[1],
          bstr = atob(arr[1]),
          n = bstr.length,
          u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, {
        type: mime
      });
    }
    //参数初始化 
    function initParams() {
      config.text = text || config.text;
      config.fontFamily = fontFamily || config.fontFamily;
      config.color = color || config.color;
      config.fontSize = fontSize || config.fontSize;
      config.opacity = opacity || config.opacity;
      config.bottom = bottom || config.bottom;
      config.right = right || config.right;
      config.ratio = ratio || config.ratio;
    }
    //加载图片
    function initImg(data) {
      var img = new Image();
      img.src = data;
      img.onload = function () {
        var width = img.width;
        var height = img.height;
        cretedCanvas(width, height);
        ctx.drawImage(img, 0, 0, width, height);
        setText(width, height);
        resolve(dataURLtoFile(document.getElementById('canvas').toDataURL(file.type, config.ratio), file.name));
      };
    }
    //创建画板
    function cretedCanvas(width, height) {
      canvas = document.getElementById("canvas");
      if (canvas === null) {
        canvas = document.createElement("canvas");
        canvas.id = 'canvas';
        canvas.className = "avue-canvas";
        document.body.appendChild(canvas);
      }
      ctx = canvas.getContext("2d");
      canvas.width = width;
      canvas.height = height;
    }
    //添加水印
    function setText(width, height) {
      var txt = config.text;
      var param = calcParam(txt, width, height);
      ctx.font = param.fontSize + "px " + config.fontFamily;
      ctx.fillStyle = config.color;
      ctx.globalAlpha = config.opacity / 100;
      ctx.fillText(txt, param.x, param.y);
    }
    //计算比例
    function calcParam(txt, width, height) {
      var x, y;

      //字体的比例
      var calcFontSize = config.fontSize / configDefault.width;
      var fontSize = calcFontSize * width;

      if (config.bottom) {
        y = configDefault.height - config.bottom;
      } else {
        y = config.top;
      }

      if (config.right) {
        x = configDefault.width - config.right;
      } else {
        x = config.left;
      }
      ctx.font = config.fontSize + "px " + config.fontFamily;
      var txtWidth = Number(ctx.measureText(txt).width);

      x = x - txtWidth;

      var calcPosX = x / configDefault.width;
      var calcPosY = y / configDefault.height;

      x = calcPosX * width;
      y = calcPosY * height;
      return {
        x: x,
        y: y,
        fontSize: fontSize
      };
    }
    //file转base64
    function fileToBase64(file, callback) {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function (e) {
        callback(e.target.result);
      };
    }
  });
}

/***/ }),
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var getToken = exports.getToken = function getToken(accessKey, secretKey, putPolicy) {
  //SETP 2
  var put_policy = JSON.stringify(putPolicy);
  "development" === 'development' && console && console.log("put_policy = ", put_policy);

  //SETP 3
  var encoded = base64encode(utf16to8(put_policy));
  "development" === 'development' && console && console.log("encoded = ", encoded);

  //SETP 4
  var hash = CryptoJS.HmacSHA1(encoded, secretKey);
  var encoded_signed = hash.toString(CryptoJS.enc.Base64);
  "development" === 'development' && console && console.log("encoded_signed=", encoded_signed);

  //SETP 5
  var upload_token = accessKey + ":" + safe64(encoded_signed) + ":" + encoded;
  "development" === 'development' && console && console.log("upload_token=", upload_token);

  return upload_token;
};
function utf16to8(str) {
  var out, i, len, c;
  out = "";
  len = str.length;
  for (i = 0; i < len; i++) {
    c = str.charCodeAt(i);
    if (c >= 0x0001 && c <= 0x007F) {
      out += str.charAt(i);
    } else if (c > 0x07FF) {
      out += String.fromCharCode(0xE0 | c >> 12 & 0x0F);
      out += String.fromCharCode(0x80 | c >> 6 & 0x3F);
      out += String.fromCharCode(0x80 | c >> 0 & 0x3F);
    } else {
      out += String.fromCharCode(0xC0 | c >> 6 & 0x1F);
      out += String.fromCharCode(0x80 | c >> 0 & 0x3F);
    }
  }
  return out;
}

function utf8to16(str) {
  var out, i, len, c;
  var char2, char3;
  out = "";
  len = str.length;
  i = 0;
  while (i < len) {
    c = str.charCodeAt(i++);
    switch (c >> 4) {
      case 0:
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
      case 7:
        // 0xxxxxxx
        out += str.charAt(i - 1);
        break;
      case 12:
      case 13:
        // 110x xxxx 10xx xxxx
        char2 = str.charCodeAt(i++);
        out += String.fromCharCode((c & 0x1F) << 6 | char2 & 0x3F);
        break;
      case 14:
        // 1110 xxxx 10xx xxxx 10xx xxxx
        char2 = str.charCodeAt(i++);
        char3 = str.charCodeAt(i++);
        out += String.fromCharCode((c & 0x0F) << 12 | (char2 & 0x3F) << 6 | (char3 & 0x3F) << 0);
        break;
    }
  }
  return out;
}

/*
 * Interfaces:
 * b64 = base64encode(data);
 * data = base64decode(b64);
 */
var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
var base64DecodeChars = new Array(-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);

function base64encode(str) {
  var out, i, len;
  var c1, c2, c3;
  len = str.length;
  i = 0;
  out = "";
  while (i < len) {
    c1 = str.charCodeAt(i++) & 0xff;
    if (i == len) {
      out += base64EncodeChars.charAt(c1 >> 2);
      out += base64EncodeChars.charAt((c1 & 0x3) << 4);
      out += "==";
      break;
    }
    c2 = str.charCodeAt(i++);
    if (i == len) {
      out += base64EncodeChars.charAt(c1 >> 2);
      out += base64EncodeChars.charAt((c1 & 0x3) << 4 | (c2 & 0xF0) >> 4);
      out += base64EncodeChars.charAt((c2 & 0xF) << 2);
      out += "=";
      break;
    }
    c3 = str.charCodeAt(i++);
    out += base64EncodeChars.charAt(c1 >> 2);
    out += base64EncodeChars.charAt((c1 & 0x3) << 4 | (c2 & 0xF0) >> 4);
    out += base64EncodeChars.charAt((c2 & 0xF) << 2 | (c3 & 0xC0) >> 6);
    out += base64EncodeChars.charAt(c3 & 0x3F);
  }
  return out;
}

function base64decode(str) {
  var c1, c2, c3, c4;
  var i, len, out;
  len = str.length;
  i = 0;
  out = "";
  while (i < len) {
    /* c1 */
    do {
      c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
    } while (i < len && c1 == -1);
    if (c1 == -1) break;
    /* c2 */
    do {
      c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
    } while (i < len && c2 == -1);
    if (c2 == -1) break;
    out += String.fromCharCode(c1 << 2 | (c2 & 0x30) >> 4);
    /* c3 */
    do {
      c3 = str.charCodeAt(i++) & 0xff;
      if (c3 == 61) return out;
      c3 = base64DecodeChars[c3];
    } while (i < len && c3 == -1);
    if (c3 == -1) break;
    out += String.fromCharCode((c2 & 0XF) << 4 | (c3 & 0x3C) >> 2);
    /* c4 */
    do {
      c4 = str.charCodeAt(i++) & 0xff;
      if (c4 == 61) return out;
      c4 = base64DecodeChars[c4];
    } while (i < len && c4 == -1);
    if (c4 == -1) break;
    out += String.fromCharCode((c3 & 0x03) << 6 | c4);
  }
  return out;
}
var safe64 = function safe64(base64) {
  base64 = base64.replace(/\+/g, "-");
  base64 = base64.replace(/\//g, "_");
  return base64;
};

/***/ }),
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var getClient = exports.getClient = function getClient(params) {
  //oss 基本配置
  var client = new OSS(params);
  return client;
};

/***/ }),
/* 152 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"avue-cell",class:_vm.b('mobile')},[_c('p',{class:['avue-cell__title',{'avue-cell__title--required':_vm.required}]},[_vm._v("\n    "+_vm._s(_vm.label)+"\n    "),(_vm.tip)?_c('small',{staticClass:"avue-cell__tip"},[_vm._v(_vm._s(_vm.tip))]):_vm._e()]),_c('div',{class:_vm.b('mobile-list')},[_vm._l((_vm.fileList),function(item,index){return _c('div',{key:index,class:_vm.b('mobile-item')},[_c('img',{attrs:{"src":item.url,"alt":""}}),_c('div',{class:_vm.b('mobile-menu')},[_c('van-icon',{attrs:{"name":"search"}}),_c('van-icon',{attrs:{"name":"delete"},on:{"click":function($event){return _vm.handleRemove(item)}}})],1)])}),_c('van-uploader',{attrs:{"before-read":_vm.handleChange,"disabled":_vm.disabled}},[_c('div',{class:_vm.b('mobile-upload')},[_c('van-icon',{attrs:{"name":"plus"}})],1)])],2)])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (Vue) {
  Vue.directive('permission', function (el, binding) {
    var value = binding.value;
    if (value === false) {
      el.style.display = "none";
    } else {
      el.style.display = "";
    }
  });
};

/***/ }),
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _export2Excel = __webpack_require__(155);

var Excel = _interopRequireWildcard(_export2Excel);

var _util = __webpack_require__(7);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/* eslint-disable */

// 库
exports.default = {
  install: function install(Vue, options) {
    Vue.prototype.$export = {
      // 导出 excel
      excel: function excel(params) {
        return new Promise(function (resolve, reject) {
          // 默认值
          var paramsDefault = {
            columns: [],
            data: [],
            title: 'table',
            header: null,
            merges: []
          };
          // 合并参数
          var _params = Object.assign({}, paramsDefault, params);
          // 从参数中派生数据
          var header = _params.columns.map(function (e) {
            return e.label;
          });
          var data = _params.data.map(function (row) {
            return _params.columns.map(function (col) {
              var data = row[col.prop];
              if ((0, _util.isJson)(data)) {
                data = JSON.stringify(data);
              }
              return data;
            });
          });
          // 导出
          Excel.export_json_to_excel(header, data, _params.title, {
            merges: _params.merges,
            header: _params.header
          });
          // 完成
          resolve();
        });
      }
    };
  }
};

/***/ }),
/* 155 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.export_table_to_excel = export_table_to_excel;
exports.export_json_to_excel = export_json_to_excel;

__webpack_require__(156);

var saveAs = window.saveAs; /* eslint-disable */

// 来源于网络 有细微改动

var XLSX = window.XLSX;
function generateArray(table) {
  var out = [];
  var rows = table.querySelectorAll('tr');
  var ranges = [];
  for (var R = 0; R < rows.length; ++R) {
    var outRow = [];
    var row = rows[R];
    var columns = row.querySelectorAll('td');
    for (var C = 0; C < columns.length; ++C) {
      var cell = columns[C];
      var colspan = cell.getAttribute('colspan');
      var rowspan = cell.getAttribute('rowspan');
      var cellValue = cell.innerText;
      if (cellValue !== '' && cellValue == +cellValue) cellValue = +cellValue;

      //Skip ranges
      ranges.forEach(function (range) {
        if (R >= range.s.r && R <= range.e.r && outRow.length >= range.s.c && outRow.length <= range.e.c) {
          for (var i = 0; i <= range.e.c - range.s.c; ++i) {
            outRow.push(null);
          }
        }
      });

      //Handle Row Span
      if (rowspan || colspan) {
        rowspan = rowspan || 1;
        colspan = colspan || 1;
        ranges.push({
          s: { r: R, c: outRow.length },
          e: { r: R + rowspan - 1, c: outRow.length + colspan - 1 }
        });
      }
      //Handle Value
      outRow.push(cellValue !== '' ? cellValue : null);

      //Handle Colspan
      if (colspan) for (var k = 0; k < colspan - 1; ++k) {
        outRow.push(null);
      }
    }
    out.push(outRow);
  }
  return [out, ranges];
}

function datenum(v, date1904) {
  if (date1904) v += 1462;
  var epoch = Date.parse(v);
  return (epoch - new Date(Date.UTC(1899, 11, 30))) / (24 * 60 * 60 * 1000);
}

function sheet_from_array_of_arrays(data, opts) {
  var ws = {};
  var range = { s: { c: 10000000, r: 10000000 }, e: { c: 0, r: 0 } };
  for (var R = 0; R != data.length; ++R) {
    for (var C = 0; C != data[R].length; ++C) {
      if (range.s.r > R) range.s.r = R;
      if (range.s.c > C) range.s.c = C;
      if (range.e.r < R) range.e.r = R;
      if (range.e.c < C) range.e.c = C;
      var cell = { v: data[R][C] };
      if (cell.v == null) continue;
      var cell_ref = XLSX.utils.encode_cell({ c: C, r: R });

      if (typeof cell.v === 'number') cell.t = 'n';else if (typeof cell.v === 'boolean') cell.t = 'b';else if (cell.v instanceof Date) {
        cell.t = 'n';
        cell.z = XLSX.SSF._table[14];
        cell.v = datenum(cell.v);
      } else cell.t = 's';

      ws[cell_ref] = cell;
    }
  }
  if (range.s.c < 10000000) ws['!ref'] = XLSX.utils.encode_range(range);
  return ws;
}

function Workbook() {
  if (!(this instanceof Workbook)) return new Workbook();
  this.SheetNames = [];
  this.Sheets = {};
}

function s2ab(s) {
  var buf = new ArrayBuffer(s.length);
  var view = new Uint8Array(buf);
  for (var i = 0; i != s.length; ++i) {
    view[i] = s.charCodeAt(i) & 0xff;
  }return buf;
}

function export_table_to_excel(id) {
  var theTable = document.getElementById(id);
  console.log('a');
  var oo = generateArray(theTable);
  var ranges = oo[1];

  /* original data */
  var data = oo[0];
  var ws_name = 'SheetJS';
  console.log(data);

  var wb = new Workbook(),
      ws = sheet_from_array_of_arrays(data);

  /* add ranges to worksheet */
  // ws['!cols'] = ['apple', 'banan'];
  ws['!merges'] = ranges;

  /* add worksheet to workbook */
  wb.SheetNames.push(ws_name);
  wb.Sheets[ws_name] = ws;

  var wbout = XLSX.write(wb, {
    bookType: 'xlsx',
    bookSST: false,
    type: 'binary'
  });

  saveAs(new Blob([s2ab(wbout)], { type: 'application/octet-stream' }), 'test.xlsx');
}

function formatJson(jsonData) {
  console.log(jsonData);
}
function export_json_to_excel(th, jsonData, defaultTitle) {
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : { merges: [], header: null };

  /* original data */

  var data = jsonData;
  data.unshift(th);
  if (options.header) data.unshift([options.header]);
  var ws_name = 'SheetJS';

  var wb = new Workbook(),
      ws = sheet_from_array_of_arrays(data);

  /* add merges area to worksheet */
  var merges = options.merges;

  if (typeof merges[0] == 'string' && merges.length == 2) merges = [merges]; // just one # ['A1', 'C1'] = > [['A1', 'C1']]
  merges = merges.map(function (i) {
    return i instanceof Array ? { s: i[0], e: i[1] } : i;
  }); // be sort :) # ['A1', 'C1'] => { s: 'A1', e: 'C3' }
  ws['!merges'] = merges;

  /* add worksheet to workbook */
  wb.SheetNames.push(ws_name);
  wb.Sheets[ws_name] = ws;

  var wbout = XLSX.write(wb, {
    bookType: 'xlsx',
    bookSST: false,
    type: 'binary'
  });
  var title = defaultTitle || '列表';
  saveAs(new Blob([s2ab(wbout)], { type: 'application/octet-stream' }), title + '.xlsx');
}

/***/ }),
/* 156 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* eslint-disable */
/* Blob.js
 * A Blob implementation.
 * 2014-05-27
 *
 * By Eli Grey, http://eligrey.com
 * By Devin Samarin, https://github.com/eboyjr
 * License: X11/MIT
 *   See LICENSE.md
 */

/*global self, unescape */
/*jslint bitwise: true, regexp: true, confusion: true, es5: true, vars: true, white: true,
 plusplus: true */

/*! @source http://purl.eligrey.com/github/Blob.js/blob/master/Blob.js */

(function (view) {
  'use strict';

  view.URL = view.URL || view.webkitURL;

  if (view.Blob && view.URL) {
    try {
      new Blob();
      return;
    } catch (e) {}
  }

  // Internally we use a BlobBuilder implementation to base Blob off of
  // in order to support older browsers that only have BlobBuilder
  var BlobBuilder = view.BlobBuilder || view.WebKitBlobBuilder || view.MozBlobBuilder || function (view) {
    var get_class = function get_class(object) {
      return Object.prototype.toString.call(object).match(/^\[object\s(.*)\]$/)[1];
    },
        FakeBlobBuilder = function BlobBuilder() {
      this.data = [];
    },
        FakeBlob = function Blob(data, type, encoding) {
      this.data = data;
      this.size = data.length;
      this.type = type;
      this.encoding = encoding;
    },
        FBB_proto = FakeBlobBuilder.prototype,
        FB_proto = FakeBlob.prototype,
        FileReaderSync = view.FileReaderSync,
        FileException = function FileException(type) {
      this.code = this[this.name = type];
    },
        file_ex_codes = ('NOT_FOUND_ERR SECURITY_ERR ABORT_ERR NOT_READABLE_ERR ENCODING_ERR ' + 'NO_MODIFICATION_ALLOWED_ERR INVALID_STATE_ERR SYNTAX_ERR').split(' '),
        file_ex_code = file_ex_codes.length,
        real_URL = view.URL || view.webkitURL || view,
        real_create_object_URL = real_URL.createObjectURL,
        real_revoke_object_URL = real_URL.revokeObjectURL,
        URL = real_URL,
        btoa = view.btoa,
        atob = view.atob,
        ArrayBuffer = view.ArrayBuffer,
        Uint8Array = view.Uint8Array;
    FakeBlob.fake = FB_proto.fake = true;
    while (file_ex_code--) {
      FileException.prototype[file_ex_codes[file_ex_code]] = file_ex_code + 1;
    }
    if (!real_URL.createObjectURL) {
      URL = view.URL = {};
    }
    URL.createObjectURL = function (blob) {
      var type = blob.type,
          data_URI_header;
      if (type === null) {
        type = 'application/octet-stream';
      }
      if (blob instanceof FakeBlob) {
        data_URI_header = 'data:' + type;
        if (blob.encoding === 'base64') {
          return data_URI_header + ';base64,' + blob.data;
        } else if (blob.encoding === 'URI') {
          return data_URI_header + ',' + decodeURIComponent(blob.data);
        }
        if (btoa) {
          return data_URI_header + ';base64,' + btoa(blob.data);
        } else {
          return data_URI_header + ',' + encodeURIComponent(blob.data);
        }
      } else if (real_create_object_URL) {
        return real_create_object_URL.call(real_URL, blob);
      }
    };
    URL.revokeObjectURL = function (object_URL) {
      if (object_URL.substring(0, 5) !== 'data:' && real_revoke_object_URL) {
        real_revoke_object_URL.call(real_URL, object_URL);
      }
    };
    FBB_proto.append = function (data /*, endings*/) {
      var bb = this.data;
      // decode data to a binary string
      if (Uint8Array && (data instanceof ArrayBuffer || data instanceof Uint8Array)) {
        var str = '',
            buf = new Uint8Array(data),
            i = 0,
            buf_len = buf.length;
        for (; i < buf_len; i++) {
          str += String.fromCharCode(buf[i]);
        }
        bb.push(str);
      } else if (get_class(data) === 'Blob' || get_class(data) === 'File') {
        if (FileReaderSync) {
          var fr = new FileReaderSync();
          bb.push(fr.readAsBinaryString(data));
        } else {
          // async FileReader won't work as BlobBuilder is sync
          throw new FileException('NOT_READABLE_ERR');
        }
      } else if (data instanceof FakeBlob) {
        if (data.encoding === 'base64' && atob) {
          bb.push(atob(data.data));
        } else if (data.encoding === 'URI') {
          bb.push(decodeURIComponent(data.data));
        } else if (data.encoding === 'raw') {
          bb.push(data.data);
        }
      } else {
        if (typeof data !== 'string') {
          data += ''; // convert unsupported types to strings
        }
        // decode UTF-16 to binary string
        bb.push(unescape(encodeURIComponent(data)));
      }
    };
    FBB_proto.getBlob = function (type) {
      if (!arguments.length) {
        type = null;
      }
      return new FakeBlob(this.data.join(''), type, 'raw');
    };
    FBB_proto.toString = function () {
      return '[object BlobBuilder]';
    };
    FB_proto.slice = function (start, end, type) {
      var args = arguments.length;
      if (args < 3) {
        type = null;
      }
      return new FakeBlob(this.data.slice(start, args > 1 ? end : this.data.length), type, this.encoding);
    };
    FB_proto.toString = function () {
      return '[object Blob]';
    };
    FB_proto.close = function () {
      this.size = this.data.length = 0;
    };
    return FakeBlobBuilder;
  }(view);

  view.Blob = function Blob(blobParts, options) {
    var type = options ? options.type || '' : '';
    var builder = new BlobBuilder();
    if (blobParts) {
      for (var i = 0, len = blobParts.length; i < len; i++) {
        builder.append(blobParts[i]);
      }
    }
    return builder.getBlob(type);
  };
})(typeof self !== 'undefined' && self || typeof window !== 'undefined' && window || undefined.content || undefined);

/***/ }),
/* 157 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (_ref) {
  var text = _ref.text;

  return new Promise(function (resolve, reject) {
    var container = document.body;
    var isRTL = document.documentElement.getAttribute('dir') == 'rtl';
    var fakeElem = document.createElement('textarea');
    fakeElem.style.fontSize = '12pt';
    fakeElem.style.border = '0';
    fakeElem.style.padding = '0';
    fakeElem.style.margin = '0';
    fakeElem.style.position = 'absolute';
    fakeElem.style[isRTL ? 'right' : 'left'] = '-9999px';
    var yPosition = window.pageYOffset || document.documentElement.scrollTop;
    fakeElem.style.top = yPosition + 'px';
    fakeElem.setAttribute('readonly', '');
    fakeElem.value = text;
    container.appendChild(fakeElem);
    select(fakeElem);
    var succeeded = void 0;
    try {
      succeeded = document.execCommand('copy');
      resolve();
    } catch (err) {
      succeeded = false;
      reject();
    }
  });
};

function select(element) {
  var selectedText = void 0;

  if (element.nodeName === 'SELECT') {
    element.focus();

    selectedText = element.value;
  } else if (element.nodeName === 'INPUT' || element.nodeName === 'TEXTAREA') {
    var isReadOnly = element.hasAttribute('readonly');

    if (!isReadOnly) {
      element.setAttribute('readonly', '');
    }

    element.select();
    element.setSelectionRange(0, element.value.length);

    if (!isReadOnly) {
      element.removeAttribute('readonly');
    }

    selectedText = element.value;
  } else {
    if (element.hasAttribute('contenteditable')) {
      element.focus();
    }

    var selection = window.getSelection();
    var range = document.createRange();

    range.selectNodeContents(element);
    selection.removeAllRanges();
    selection.addRange(range);

    selectedText = selection.toString();
  }

  return selectedText;
}

/***/ }),
/* 158 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var ImagePreview = function ImagePreview(Vue) {
  return function () {};
};

exports.default = ImagePreview;

/***/ })
/******/ ]);
});