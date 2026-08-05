/*! Avue.js v3.9.3 | (c) 2017-2026 Smallwei | Released under the MIT License. */
import { openBlock, createElementBlock, normalizeClass, createElementVNode } from 'vue';

const _hoisted_1 = ["width", "height"];

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createElementBlock("div", {
    class: normalizeClass(_ctx.b())
  }, [
    createElementVNode("canvas", {
      class: normalizeClass(_ctx.b('canvas')),
      width: _ctx.width,
      height: _ctx.height,
      ref: "canvas"
    }, null, 10 /* CLASS, PROPS */, _hoisted_1)
  ], 2 /* CLASS */))
}

export { render };
