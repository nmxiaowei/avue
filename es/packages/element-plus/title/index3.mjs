/*! Avue.js v3.9.1 | (c) 2017-2026 Smallwei | Released under the MIT License. */
import { openBlock, createElementBlock, normalizeClass, createElementVNode, normalizeStyle, toDisplayString } from 'vue';

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createElementBlock("div", {
    class: normalizeClass(_ctx.b())
  }, [
    createElementVNode("p", {
      style: normalizeStyle(_ctx.styles)
    }, toDisplayString(_ctx.text), 5 /* TEXT, STYLE */)
  ], 2 /* CLASS */))
}

export { render };
