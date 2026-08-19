/*! Avue.js v3.9.4 | (c) 2017-2026 Smallwei | Released under the MIT License. */
import { openBlock, createElementBlock, normalizeStyle, normalizeClass, createCommentVNode, toDisplayString, Fragment, createElementVNode } from 'vue';

const _hoisted_1 = ["innerHTML"];
const _hoisted_2 = { key: 2 };

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createElementBlock("div", {
    class: normalizeClass([_ctx.b(), { [_ctx.b('bordered')]: _ctx.bordered }]),
    style: normalizeStyle(_ctx.styleName),
    role: "img",
    "aria-label": "二维码"
  }, [
    (_ctx.type === 'canvas' && _ctx.qrcode)
      ? (openBlock(), createElementBlock("canvas", {
          key: 0,
          ref: "canvas",
          class: normalizeClass(_ctx.b('canvas'))
        }, null, 2 /* CLASS */))
      : (_ctx.type === 'svg' && _ctx.qrcode)
        ? (openBlock(), createElementBlock("div", {
            key: 1,
            class: normalizeClass(_ctx.b('svg')),
            innerHTML: _ctx.svgContent
          }, null, 10 /* CLASS, PROPS */, _hoisted_1))
        : createCommentVNode("v-if", true),
    (_ctx.errorMessage)
      ? (openBlock(), createElementBlock("div", {
          key: 2,
          class: normalizeClass([_ctx.b('status'), _ctx.b('status-error')])
        }, toDisplayString(_ctx.errorMessage), 3 /* TEXT, CLASS */))
      : (_ctx.status !== 'active')
        ? (openBlock(), createElementBlock("div", {
            key: 3,
            class: normalizeClass(_ctx.b('status'))
          }, [
            (_ctx.status === 'loading')
              ? (openBlock(), createElementBlock("span", {
                  key: 0,
                  class: normalizeClass(_ctx.b('loading'))
                }, null, 2 /* CLASS */))
              : (_ctx.status === 'expired')
                ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                    _cache[1] || (_cache[1] = createElementVNode("span", null, "二维码已过期", -1 /* HOISTED */)),
                    createElementVNode("button", {
                      class: normalizeClass(_ctx.b('refresh')),
                      type: "button",
                      onClick: _cache[0] || (_cache[0] = (...args) => (_ctx.refresh && _ctx.refresh(...args)))
                    }, " 点击刷新 ", 2 /* CLASS */)
                  ], 64 /* STABLE_FRAGMENT */))
                : (openBlock(), createElementBlock("span", _hoisted_2, "已扫描"))
          ], 2 /* CLASS */))
        : createCommentVNode("v-if", true)
  ], 6 /* CLASS, STYLE */))
}

export { render };
