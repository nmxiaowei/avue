/*! Avue.js v3.9.0 | (c) 2017-2026 Smallwei | Released under the MIT License. */
'use strict';

var vue = require('vue');

const _hoisted_1 = ["id"];

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (vue.openBlock(), vue.createElementBlock("div", {
    class: vue.normalizeClass(_ctx.b()),
    style: {"position":"relative"}
  }, [
    vue.createElementVNode("canvas", {
      id: 'canvas'+_ctx.id,
      ref: "canvas"
    }, null, 8 /* PROPS */, _hoisted_1),
    vue.renderSlot(_ctx.$slots, "default")
  ], 2 /* CLASS */))
}

exports.render = render;
