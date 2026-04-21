/*! Avue.js v3.8.6 | (c) 2017-2026 Smallwei | Released under the MIT License. */
'use strict';

var vue = require('vue');

const _hoisted_1 = ["src"];
const _hoisted_2 = ["textContent"];
const _hoisted_3 = ["innerHTML"];

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (vue.openBlock(), vue.createElementBlock("div", {
    class: vue.normalizeClass(_ctx.b({'reverse':_ctx.reverse}))
  }, [
    vue.createElementVNode("img", {
      src: _ctx.avatar,
      alt: "",
      class: vue.normalizeClass(_ctx.b('avatar'))
    }, null, 10 /* CLASS, PROPS */, _hoisted_1),
    vue.createElementVNode("div", {
      class: vue.normalizeClass(_ctx.b('main'))
    }, [
      vue.createElementVNode("div", {
        class: vue.normalizeClass(_ctx.b('header'))
      }, [
        (_ctx.author)
          ? (vue.openBlock(), vue.createElementBlock("div", {
              key: 0,
              class: vue.normalizeClass(_ctx.b('author')),
              textContent: vue.toDisplayString(_ctx.author)
            }, null, 10 /* CLASS, PROPS */, _hoisted_2))
          : vue.createCommentVNode("v-if", true),
        vue.renderSlot(_ctx.$slots, "default")
      ], 2 /* CLASS */),
      (_ctx.body)
        ? (vue.openBlock(), vue.createElementBlock("div", {
            key: 0,
            class: vue.normalizeClass(_ctx.b('body')),
            innerHTML: _ctx.body
          }, null, 10 /* CLASS, PROPS */, _hoisted_3))
        : vue.createCommentVNode("v-if", true)
    ], 2 /* CLASS */)
  ], 2 /* CLASS */))
}

exports.render = render;
