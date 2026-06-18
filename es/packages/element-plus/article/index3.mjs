/*! Avue.js v3.9.2 | (c) 2017-2026 Smallwei | Released under the MIT License. */
import { openBlock, createElementBlock, normalizeClass, createElementVNode, toDisplayString, createCommentVNode } from 'vue';

const _hoisted_1 = ["textContent"];
const _hoisted_2 = ["textContent"];
const _hoisted_3 = ["textContent"];
const _hoisted_4 = ["innerHTML"];

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createElementBlock("div", {
    class: normalizeClass(_ctx.b())
  }, [
    createElementVNode("div", {
      class: normalizeClass(_ctx.b('header'))
    }, [
      (_ctx.title)
        ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: normalizeClass(_ctx.b('title')),
            textContent: toDisplayString(_ctx.title)
          }, null, 10 /* CLASS, PROPS */, _hoisted_1))
        : createCommentVNode("v-if", true),
      (_ctx.meta)
        ? (openBlock(), createElementBlock("small", {
            key: 1,
            class: normalizeClass(_ctx.b('meta')),
            textContent: toDisplayString(_ctx.meta)
          }, null, 10 /* CLASS, PROPS */, _hoisted_2))
        : createCommentVNode("v-if", true)
    ], 2 /* CLASS */),
    (_ctx.lead)
      ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: normalizeClass(_ctx.b('lead')),
          textContent: toDisplayString(_ctx.lead)
        }, null, 10 /* CLASS, PROPS */, _hoisted_3))
      : createCommentVNode("v-if", true),
    (_ctx.body)
      ? (openBlock(), createElementBlock("div", {
          key: 1,
          class: normalizeClass(_ctx.b('body')),
          innerHTML: _ctx.body
        }, null, 10 /* CLASS, PROPS */, _hoisted_4))
      : createCommentVNode("v-if", true)
  ], 2 /* CLASS */))
}

export { render };
