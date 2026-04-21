/*! Avue.js v3.8.6 | (c) 2017-2026 Smallwei | Released under the MIT License. */
'use strict';

var vue = require('vue');

const _hoisted_1 = ["width", "height"];

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (vue.openBlock(), vue.createElementBlock("div", {
    class: vue.normalizeClass(_ctx.b())
  }, [
    vue.createElementVNode("canvas", {
      class: vue.normalizeClass(_ctx.b('canvas')),
      width: _ctx.width,
      height: _ctx.height,
      ref: "canvas"
    }, null, 10 /* CLASS, PROPS */, _hoisted_1)
  ], 2 /* CLASS */))
}

exports.render = render;
