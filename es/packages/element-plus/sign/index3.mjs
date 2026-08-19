/*! Avue.js v3.9.4 | (c) 2017-2026 Smallwei | Released under the MIT License. */
import { openBlock, createElementBlock, normalizeStyle, normalizeClass, renderSlot, toDisplayString, createCommentVNode, createElementVNode } from 'vue';

const _hoisted_1 = ["disabled"];
const _hoisted_2 = ["width", "height", "tabindex", "aria-label"];

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createElementBlock("div", {
    class: normalizeClass([_ctx.b(), { 'is-disabled': _ctx.isDisabled }]),
    style: normalizeStyle(_ctx.styleName)
  }, [
    (_ctx.title || _ctx.showToolbar || _ctx.$slots.header)
      ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: normalizeClass(_ctx.b('header'))
        }, [
          renderSlot(_ctx.$slots, "header", {}, () => [
            (_ctx.title)
              ? (openBlock(), createElementBlock("div", {
                  key: 0,
                  class: normalizeClass(_ctx.b('title'))
                }, toDisplayString(_ctx.title), 3 /* TEXT, CLASS */))
              : createCommentVNode("v-if", true),
            createElementVNode("div", {
              class: normalizeClass(_ctx.b('status'))
            }, toDisplayString(_ctx.statusText), 3 /* TEXT, CLASS */)
          ]),
          (_ctx.showToolbar)
            ? (openBlock(), createElementBlock("div", {
                key: 0,
                class: normalizeClass(_ctx.b('tools'))
              }, [
                createElementVNode("button", {
                  type: "button",
                  class: normalizeClass(_ctx.b('clear')),
                  disabled: _ctx.disabled || _ctx.readonly,
                  onClick: _cache[0] || (_cache[0] = (...args) => (_ctx.clear && _ctx.clear(...args)))
                }, toDisplayString(_ctx.clearText), 11 /* TEXT, CLASS, PROPS */, _hoisted_1)
              ], 2 /* CLASS */))
            : createCommentVNode("v-if", true)
        ], 2 /* CLASS */))
      : createCommentVNode("v-if", true),
    createElementVNode("div", {
      class: normalizeClass(_ctx.b('surface')),
      style: normalizeStyle(_ctx.surfaceStyle)
    }, [
      createElementVNode("canvas", {
        ref: "canvas",
        class: normalizeClass(_ctx.b('canvas')),
        width: _ctx.canvasWidth,
        height: _ctx.canvasHeight,
        style: normalizeStyle(_ctx.canvasStyle),
        tabindex: _ctx.isDisabled ? -1 : 0,
        "aria-label": _ctx.ariaLabel,
        role: "img",
        onPointerdown: _cache[1] || (_cache[1] = (...args) => (_ctx.onPointerDown && _ctx.onPointerDown(...args))),
        onPointermove: _cache[2] || (_cache[2] = (...args) => (_ctx.onPointerMove && _ctx.onPointerMove(...args))),
        onPointerup: _cache[3] || (_cache[3] = (...args) => (_ctx.onPointerUp && _ctx.onPointerUp(...args))),
        onPointercancel: _cache[4] || (_cache[4] = (...args) => (_ctx.onPointerUp && _ctx.onPointerUp(...args)))
      }, null, 46 /* CLASS, STYLE, PROPS, NEED_HYDRATION */, _hoisted_2),
      (_ctx.isEmpty)
        ? (openBlock(), createElementBlock("span", {
            key: 0,
            class: normalizeClass(_ctx.b('placeholder'))
          }, toDisplayString(_ctx.placeholder), 3 /* TEXT, CLASS */))
        : createCommentVNode("v-if", true)
    ], 6 /* CLASS, STYLE */),
    (_ctx.$slots.footer)
      ? (openBlock(), createElementBlock("div", {
          key: 1,
          class: normalizeClass(_ctx.b('footer'))
        }, [
          renderSlot(_ctx.$slots, "footer")
        ], 2 /* CLASS */))
      : createCommentVNode("v-if", true)
  ], 6 /* CLASS, STYLE */))
}

export { render };
