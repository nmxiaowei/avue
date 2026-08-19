/*! Avue.js v3.9.4 | (c) 2017-2026 Smallwei | Released under the MIT License. */
'use strict';

var vue = require('vue');

const _hoisted_1 = ["disabled"];
const _hoisted_2 = ["width", "height", "tabindex", "aria-label"];

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (vue.openBlock(), vue.createElementBlock("div", {
    class: vue.normalizeClass([_ctx.b(), { 'is-disabled': _ctx.isDisabled }]),
    style: vue.normalizeStyle(_ctx.styleName)
  }, [
    (_ctx.title || _ctx.showToolbar || _ctx.$slots.header)
      ? (vue.openBlock(), vue.createElementBlock("div", {
          key: 0,
          class: vue.normalizeClass(_ctx.b('header'))
        }, [
          vue.renderSlot(_ctx.$slots, "header", {}, () => [
            (_ctx.title)
              ? (vue.openBlock(), vue.createElementBlock("div", {
                  key: 0,
                  class: vue.normalizeClass(_ctx.b('title'))
                }, vue.toDisplayString(_ctx.title), 3 /* TEXT, CLASS */))
              : vue.createCommentVNode("v-if", true),
            vue.createElementVNode("div", {
              class: vue.normalizeClass(_ctx.b('status'))
            }, vue.toDisplayString(_ctx.statusText), 3 /* TEXT, CLASS */)
          ]),
          (_ctx.showToolbar)
            ? (vue.openBlock(), vue.createElementBlock("div", {
                key: 0,
                class: vue.normalizeClass(_ctx.b('tools'))
              }, [
                vue.createElementVNode("button", {
                  type: "button",
                  class: vue.normalizeClass(_ctx.b('clear')),
                  disabled: _ctx.disabled || _ctx.readonly,
                  onClick: _cache[0] || (_cache[0] = (...args) => (_ctx.clear && _ctx.clear(...args)))
                }, vue.toDisplayString(_ctx.clearText), 11 /* TEXT, CLASS, PROPS */, _hoisted_1)
              ], 2 /* CLASS */))
            : vue.createCommentVNode("v-if", true)
        ], 2 /* CLASS */))
      : vue.createCommentVNode("v-if", true),
    vue.createElementVNode("div", {
      class: vue.normalizeClass(_ctx.b('surface')),
      style: vue.normalizeStyle(_ctx.surfaceStyle)
    }, [
      vue.createElementVNode("canvas", {
        ref: "canvas",
        class: vue.normalizeClass(_ctx.b('canvas')),
        width: _ctx.canvasWidth,
        height: _ctx.canvasHeight,
        style: vue.normalizeStyle(_ctx.canvasStyle),
        tabindex: _ctx.isDisabled ? -1 : 0,
        "aria-label": _ctx.ariaLabel,
        role: "img",
        onPointerdown: _cache[1] || (_cache[1] = (...args) => (_ctx.onPointerDown && _ctx.onPointerDown(...args))),
        onPointermove: _cache[2] || (_cache[2] = (...args) => (_ctx.onPointerMove && _ctx.onPointerMove(...args))),
        onPointerup: _cache[3] || (_cache[3] = (...args) => (_ctx.onPointerUp && _ctx.onPointerUp(...args))),
        onPointercancel: _cache[4] || (_cache[4] = (...args) => (_ctx.onPointerUp && _ctx.onPointerUp(...args)))
      }, null, 46 /* CLASS, STYLE, PROPS, NEED_HYDRATION */, _hoisted_2),
      (_ctx.isEmpty)
        ? (vue.openBlock(), vue.createElementBlock("span", {
            key: 0,
            class: vue.normalizeClass(_ctx.b('placeholder'))
          }, vue.toDisplayString(_ctx.placeholder), 3 /* TEXT, CLASS */))
        : vue.createCommentVNode("v-if", true)
    ], 6 /* CLASS, STYLE */),
    (_ctx.$slots.footer)
      ? (vue.openBlock(), vue.createElementBlock("div", {
          key: 1,
          class: vue.normalizeClass(_ctx.b('footer'))
        }, [
          vue.renderSlot(_ctx.$slots, "footer")
        ], 2 /* CLASS */))
      : vue.createCommentVNode("v-if", true)
  ], 6 /* CLASS, STYLE */))
}

exports.render = render;
