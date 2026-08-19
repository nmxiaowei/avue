/*! Avue.js v3.9.4 | (c) 2017-2026 Smallwei | Released under the MIT License. */
'use strict';

var vue = require('vue');

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (vue.openBlock(), vue.createElementBlock("div", {
    class: vue.normalizeClass(_ctx.b())
  }, [
    vue.createElementVNode("p", {
      style: vue.normalizeStyle(_ctx.styles)
    }, vue.toDisplayString(_ctx.text), 5 /* TEXT, STYLE */)
  ], 2 /* CLASS */))
}

exports.render = render;
