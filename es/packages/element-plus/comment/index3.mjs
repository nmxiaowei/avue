/*! Avue.js v3.9.0 | (c) 2017-2026 Smallwei | Released under the MIT License. */
import { openBlock, createElementBlock, normalizeClass, createElementVNode, toDisplayString, createCommentVNode, renderSlot } from 'vue';

const _hoisted_1 = ["src"];
const _hoisted_2 = ["textContent"];
const _hoisted_3 = ["innerHTML"];

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createElementBlock("div", {
    class: normalizeClass(_ctx.b({'reverse':_ctx.reverse}))
  }, [
    createElementVNode("img", {
      src: _ctx.avatar,
      alt: "",
      class: normalizeClass(_ctx.b('avatar'))
    }, null, 10 /* CLASS, PROPS */, _hoisted_1),
    createElementVNode("div", {
      class: normalizeClass(_ctx.b('main'))
    }, [
      createElementVNode("div", {
        class: normalizeClass(_ctx.b('header'))
      }, [
        (_ctx.author)
          ? (openBlock(), createElementBlock("div", {
              key: 0,
              class: normalizeClass(_ctx.b('author')),
              textContent: toDisplayString(_ctx.author)
            }, null, 10 /* CLASS, PROPS */, _hoisted_2))
          : createCommentVNode("v-if", true),
        renderSlot(_ctx.$slots, "default")
      ], 2 /* CLASS */),
      (_ctx.body)
        ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: normalizeClass(_ctx.b('body')),
            innerHTML: _ctx.body
          }, null, 10 /* CLASS, PROPS */, _hoisted_3))
        : createCommentVNode("v-if", true)
    ], 2 /* CLASS */)
  ], 2 /* CLASS */))
}

export { render };
