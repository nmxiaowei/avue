/*! Avue.js v3.9.1 | (c) 2017-2026 Smallwei | Released under the MIT License. */
import { openBlock, createElementBlock, normalizeClass, createElementVNode, renderSlot } from 'vue';

const _hoisted_1 = ["id"];

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createElementBlock("div", {
    class: normalizeClass(_ctx.b()),
    style: {"position":"relative"}
  }, [
    createElementVNode("canvas", {
      id: 'canvas'+_ctx.id,
      ref: "canvas"
    }, null, 8 /* PROPS */, _hoisted_1),
    renderSlot(_ctx.$slots, "default")
  ], 2 /* CLASS */))
}

export { render };
