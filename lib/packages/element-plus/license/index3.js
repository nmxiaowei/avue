/*! Avue.js v3.9.4 | (c) 2017-2026 Smallwei | Released under the MIT License. */
'use strict';

var vue = require('vue');

const _hoisted_1 = { key: 0 };
const _hoisted_2 = { key: 1 };
const _hoisted_3 = { key: 2 };
const _hoisted_4 = { key: 3 };

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (vue.openBlock(), vue.createElementBlock("div", {
    class: vue.normalizeClass(_ctx.b())
  }, [
    vue.createElementVNode("div", {
      class: vue.normalizeClass(_ctx.b('canvas-wrap'))
    }, [
      vue.createElementVNode("canvas", {
        ref: "canvas",
        class: vue.normalizeClass(_ctx.b('canvas'))
      }, "当前浏览器不支持生成授权凭证。", 2 /* CLASS */),
      (_ctx.loading)
        ? (vue.openBlock(), vue.createElementBlock("div", {
            key: 0,
            class: vue.normalizeClass(_ctx.b('loading'))
          }, "正在生成授权凭证…", 2 /* CLASS */))
        : (_ctx.error)
          ? (vue.openBlock(), vue.createElementBlock("div", {
              key: 1,
              class: vue.normalizeClass(_ctx.b('error'))
            }, vue.toDisplayString(_ctx.error), 3 /* TEXT, CLASS */))
          : vue.createCommentVNode("v-if", true)
    ], 2 /* CLASS */),
    (_ctx.showStatus)
      ? (vue.openBlock(), vue.createElementBlock("div", {
          key: 0,
          class: vue.normalizeClass([_ctx.b('status'), { 'is-ready': _ctx.draw, 'is-error': _ctx.error }])
        }, [
          (_ctx.loading)
            ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_1, "素材加载中"))
            : (_ctx.error)
              ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_2, "生成失败"))
              : (_ctx.draw)
                ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_3, "已生成，可导出图片或 PDF"))
                : (vue.openBlock(), vue.createElementBlock("span", _hoisted_4, "等待生成"))
        ], 2 /* CLASS */))
      : vue.createCommentVNode("v-if", true),
    vue.renderSlot(_ctx.$slots, "default", {
      ready: _ctx.draw,
      loading: _ctx.loading,
      error: _ctx.error
    })
  ], 2 /* CLASS */))
}

exports.render = render;
