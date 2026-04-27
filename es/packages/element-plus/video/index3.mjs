/*! Avue.js v3.9.1 | (c) 2017-2026 Smallwei | Released under the MIT License. */
import { openBlock, createElementBlock, normalizeStyle, normalizeClass, createElementVNode } from 'vue';

const _hoisted_1 = ["src"];

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createElementBlock("div", {
    class: normalizeClass(_ctx.b()),
    style: normalizeStyle(_ctx.styleName)
  }, [
    createElementVNode("div", {
      class: normalizeClass(_ctx.b('border'))
    }, [
      createElementVNode("span", {
        style: normalizeStyle(_ctx.borderStyleName)
      }, null, 4 /* STYLE */),
      createElementVNode("span", {
        style: normalizeStyle(_ctx.borderStyleName)
      }, null, 4 /* STYLE */),
      createElementVNode("span", {
        style: normalizeStyle(_ctx.borderStyleName)
      }, null, 4 /* STYLE */),
      createElementVNode("span", {
        style: normalizeStyle(_ctx.borderStyleName)
      }, null, 4 /* STYLE */)
    ], 2 /* CLASS */),
    createElementVNode("img", {
      style: normalizeStyle(_ctx.imgStyleName),
      class: normalizeClass(_ctx.b('img')),
      src: _ctx.background
    }, null, 14 /* CLASS, STYLE, PROPS */, _hoisted_1),
    createElementVNode("video", {
      class: normalizeClass(_ctx.b('main')),
      ref: "main",
      autoplay: "",
      muted: ""
    }, null, 2 /* CLASS */)
  ], 6 /* CLASS, STYLE */))
}

export { render };
