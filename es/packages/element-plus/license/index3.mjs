/*! Avue.js v3.9.4 | (c) 2017-2026 Smallwei | Released under the MIT License. */
import { openBlock, createElementBlock, normalizeClass, createElementVNode, toDisplayString, createCommentVNode, renderSlot } from 'vue';

const _hoisted_1 = { key: 0 };
const _hoisted_2 = { key: 1 };
const _hoisted_3 = { key: 2 };
const _hoisted_4 = { key: 3 };

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createElementBlock("div", {
    class: normalizeClass(_ctx.b())
  }, [
    createElementVNode("div", {
      class: normalizeClass(_ctx.b('canvas-wrap'))
    }, [
      createElementVNode("canvas", {
        ref: "canvas",
        class: normalizeClass(_ctx.b('canvas'))
      }, "当前浏览器不支持生成授权凭证。", 2 /* CLASS */),
      (_ctx.loading)
        ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: normalizeClass(_ctx.b('loading'))
          }, "正在生成授权凭证…", 2 /* CLASS */))
        : (_ctx.error)
          ? (openBlock(), createElementBlock("div", {
              key: 1,
              class: normalizeClass(_ctx.b('error'))
            }, toDisplayString(_ctx.error), 3 /* TEXT, CLASS */))
          : createCommentVNode("v-if", true)
    ], 2 /* CLASS */),
    (_ctx.showStatus)
      ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: normalizeClass([_ctx.b('status'), { 'is-ready': _ctx.draw, 'is-error': _ctx.error }])
        }, [
          (_ctx.loading)
            ? (openBlock(), createElementBlock("span", _hoisted_1, "素材加载中"))
            : (_ctx.error)
              ? (openBlock(), createElementBlock("span", _hoisted_2, "生成失败"))
              : (_ctx.draw)
                ? (openBlock(), createElementBlock("span", _hoisted_3, "已生成，可导出图片或 PDF"))
                : (openBlock(), createElementBlock("span", _hoisted_4, "等待生成"))
        ], 2 /* CLASS */))
      : createCommentVNode("v-if", true),
    renderSlot(_ctx.$slots, "default", {
      ready: _ctx.draw,
      loading: _ctx.loading,
      error: _ctx.error
    })
  ], 2 /* CLASS */))
}

export { render };
