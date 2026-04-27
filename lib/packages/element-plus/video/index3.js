/*! Avue.js v3.9.1 | (c) 2017-2026 Smallwei | Released under the MIT License. */
'use strict';

var vue = require('vue');

const _hoisted_1 = ["src"];

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (vue.openBlock(), vue.createElementBlock("div", {
    class: vue.normalizeClass(_ctx.b()),
    style: vue.normalizeStyle(_ctx.styleName)
  }, [
    vue.createElementVNode("div", {
      class: vue.normalizeClass(_ctx.b('border'))
    }, [
      vue.createElementVNode("span", {
        style: vue.normalizeStyle(_ctx.borderStyleName)
      }, null, 4 /* STYLE */),
      vue.createElementVNode("span", {
        style: vue.normalizeStyle(_ctx.borderStyleName)
      }, null, 4 /* STYLE */),
      vue.createElementVNode("span", {
        style: vue.normalizeStyle(_ctx.borderStyleName)
      }, null, 4 /* STYLE */),
      vue.createElementVNode("span", {
        style: vue.normalizeStyle(_ctx.borderStyleName)
      }, null, 4 /* STYLE */)
    ], 2 /* CLASS */),
    vue.createElementVNode("img", {
      style: vue.normalizeStyle(_ctx.imgStyleName),
      class: vue.normalizeClass(_ctx.b('img')),
      src: _ctx.background
    }, null, 14 /* CLASS, STYLE, PROPS */, _hoisted_1),
    vue.createElementVNode("video", {
      class: vue.normalizeClass(_ctx.b('main')),
      ref: "main",
      autoplay: "",
      muted: ""
    }, null, 2 /* CLASS */)
  ], 6 /* CLASS, STYLE */))
}

exports.render = render;
