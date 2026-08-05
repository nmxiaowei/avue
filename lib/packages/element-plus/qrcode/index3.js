/*! Avue.js v3.9.3 | (c) 2017-2026 Smallwei | Released under the MIT License. */
'use strict';

var vue = require('vue');

const _hoisted_1 = ["innerHTML"];
const _hoisted_2 = { key: 2 };

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (vue.openBlock(), vue.createElementBlock("div", {
    class: vue.normalizeClass([_ctx.b(), { [_ctx.b('bordered')]: _ctx.bordered }]),
    style: vue.normalizeStyle(_ctx.styleName),
    role: "img",
    "aria-label": "二维码"
  }, [
    (_ctx.type === 'canvas' && _ctx.qrcode)
      ? (vue.openBlock(), vue.createElementBlock("canvas", {
          key: 0,
          ref: "canvas",
          class: vue.normalizeClass(_ctx.b('canvas'))
        }, null, 2 /* CLASS */))
      : (_ctx.type === 'svg' && _ctx.qrcode)
        ? (vue.openBlock(), vue.createElementBlock("div", {
            key: 1,
            class: vue.normalizeClass(_ctx.b('svg')),
            innerHTML: _ctx.svgContent
          }, null, 10 /* CLASS, PROPS */, _hoisted_1))
        : vue.createCommentVNode("v-if", true),
    (_ctx.errorMessage)
      ? (vue.openBlock(), vue.createElementBlock("div", {
          key: 2,
          class: vue.normalizeClass([_ctx.b('status'), _ctx.b('status-error')])
        }, vue.toDisplayString(_ctx.errorMessage), 3 /* TEXT, CLASS */))
      : (_ctx.status !== 'active')
        ? (vue.openBlock(), vue.createElementBlock("div", {
            key: 3,
            class: vue.normalizeClass(_ctx.b('status'))
          }, [
            (_ctx.status === 'loading')
              ? (vue.openBlock(), vue.createElementBlock("span", {
                  key: 0,
                  class: vue.normalizeClass(_ctx.b('loading'))
                }, null, 2 /* CLASS */))
              : (_ctx.status === 'expired')
                ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 1 }, [
                    _cache[1] || (_cache[1] = vue.createElementVNode("span", null, "二维码已过期", -1 /* HOISTED */)),
                    vue.createElementVNode("button", {
                      class: vue.normalizeClass(_ctx.b('refresh')),
                      type: "button",
                      onClick: _cache[0] || (_cache[0] = (...args) => (_ctx.refresh && _ctx.refresh(...args)))
                    }, " 点击刷新 ", 2 /* CLASS */)
                  ], 64 /* STABLE_FRAGMENT */))
                : (vue.openBlock(), vue.createElementBlock("span", _hoisted_2, "已扫描"))
          ], 2 /* CLASS */))
        : vue.createCommentVNode("v-if", true)
  ], 6 /* CLASS, STYLE */))
}

exports.render = render;
