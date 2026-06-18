/*! Avue.js v3.9.2 | (c) 2017-2026 Smallwei | Released under the MIT License. */
'use strict';

var vue = require('vue');

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (vue.openBlock(), vue.createElementBlock("div", {
    class: vue.normalizeClass(_ctx.b())
  }, [
    (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.list, (item, index) => {
      return (vue.openBlock(), vue.createElementBlock("span", {
        class: vue.normalizeClass(_ctx.b('item')),
        style: vue.normalizeStyle(_ctx.styleName),
        key: index
      }, vue.toDisplayString(item), 7 /* TEXT, CLASS, STYLE */))
    }), 128 /* KEYED_FRAGMENT */))
  ], 2 /* CLASS */))
}

exports.render = render;
