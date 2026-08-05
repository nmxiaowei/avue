/*! Avue.js v3.9.3 | (c) 2017-2026 Smallwei | Released under the MIT License. */
'use strict';

var vue = require('vue');

const _hoisted_1 = ["textContent"];
const _hoisted_2 = ["textContent"];
const _hoisted_3 = ["textContent"];
const _hoisted_4 = ["innerHTML"];

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (vue.openBlock(), vue.createElementBlock("div", {
    class: vue.normalizeClass(_ctx.b())
  }, [
    vue.createElementVNode("div", {
      class: vue.normalizeClass(_ctx.b('header'))
    }, [
      (_ctx.title)
        ? (vue.openBlock(), vue.createElementBlock("div", {
            key: 0,
            class: vue.normalizeClass(_ctx.b('title')),
            textContent: vue.toDisplayString(_ctx.title)
          }, null, 10 /* CLASS, PROPS */, _hoisted_1))
        : vue.createCommentVNode("v-if", true),
      (_ctx.meta)
        ? (vue.openBlock(), vue.createElementBlock("small", {
            key: 1,
            class: vue.normalizeClass(_ctx.b('meta')),
            textContent: vue.toDisplayString(_ctx.meta)
          }, null, 10 /* CLASS, PROPS */, _hoisted_2))
        : vue.createCommentVNode("v-if", true)
    ], 2 /* CLASS */),
    (_ctx.lead)
      ? (vue.openBlock(), vue.createElementBlock("div", {
          key: 0,
          class: vue.normalizeClass(_ctx.b('lead')),
          textContent: vue.toDisplayString(_ctx.lead)
        }, null, 10 /* CLASS, PROPS */, _hoisted_3))
      : vue.createCommentVNode("v-if", true),
    (_ctx.body)
      ? (vue.openBlock(), vue.createElementBlock("div", {
          key: 1,
          class: vue.normalizeClass(_ctx.b('body')),
          innerHTML: _ctx.body
        }, null, 10 /* CLASS, PROPS */, _hoisted_4))
      : vue.createCommentVNode("v-if", true)
  ], 2 /* CLASS */))
}

exports.render = render;
