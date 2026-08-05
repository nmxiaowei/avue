/*! Avue.js v3.9.3 | (c) 2017-2026 Smallwei | Released under the MIT License. */
import { getDefaultExportFromCjs } from './_commonjsHelpers.mjs';
import { __require as requireCountUp_min } from '../node_modules/.pnpm/countup.js@1.9.3/node_modules/countup.js/dist/countUp.min.mjs';

function _mergeNamespaces(n, m) {
	m.forEach(function (e) {
		e && typeof e !== 'string' && !Array.isArray(e) && Object.keys(e).forEach(function (k) {
			if (k !== 'default' && !(k in n)) {
				var d = Object.getOwnPropertyDescriptor(e, k);
				Object.defineProperty(n, k, d.get ? d : {
					enumerable: true,
					get: function () { return e[k]; }
				});
			}
		});
	});
	return Object.freeze(n);
}

var countUp_minExports = requireCountUp_min();
var countUp_min = /*@__PURE__*/getDefaultExportFromCjs(countUp_minExports);

var countUp_min$1 = /*#__PURE__*/_mergeNamespaces({
	__proto__: null,
	default: countUp_min
}, [countUp_minExports]);

export { countUp_min$1 as c, countUp_min as default };
