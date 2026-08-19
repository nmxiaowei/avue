/*! Avue.js v3.9.4 | (c) 2017-2026 Smallwei | Released under the MIT License. */
'use strict';

var vue = require('vue');

const _hoisted_1 = ["autoplay", "muted"];
const _hoisted_2 = ["src"];

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_button = vue.resolveComponent("el-button");

  return (vue.openBlock(), vue.createElementBlock("div", {
    class: vue.normalizeClass(_ctx.b({ ready: _ctx.isReady, recording: _ctx.isRecording })),
    style: vue.normalizeStyle(_ctx.styleName)
  }, [
    (_ctx.showBorder)
      ? (vue.openBlock(), vue.createElementBlock("div", {
          key: 0,
          class: vue.normalizeClass(_ctx.b('border')),
          "aria-hidden": "true"
        }, _cache[1] || (_cache[1] = [
          vue.createElementVNode("span", null, null, -1 /* HOISTED */),
          vue.createElementVNode("span", null, null, -1 /* HOISTED */),
          vue.createElementVNode("span", null, null, -1 /* HOISTED */),
          vue.createElementVNode("span", null, null, -1 /* HOISTED */)
        ]), 2 /* CLASS */))
      : vue.createCommentVNode("v-if", true),
    vue.createElementVNode("video", {
      ref: "main",
      class: vue.normalizeClass([_ctx.b('main'), { [_ctx.b('main--mirror')]: _ctx.mirror }]),
      autoplay: _ctx.autoplay,
      muted: _ctx.muted,
      playsinline: "",
      onError: _cache[0] || (_cache[0] = (...args) => (_ctx.handleVideoError && _ctx.handleVideoError(...args)))
    }, null, 42 /* CLASS, PROPS, NEED_HYDRATION */, _hoisted_1),
    (_ctx.background)
      ? (vue.openBlock(), vue.createElementBlock("img", {
          key: 1,
          class: vue.normalizeClass(_ctx.b('guide')),
          src: _ctx.background,
          alt: "",
          "aria-hidden": "true"
        }, null, 10 /* CLASS, PROPS */, _hoisted_2))
      : vue.createCommentVNode("v-if", true),
    (_ctx.showStatus && !_ctx.isReady)
      ? (vue.openBlock(), vue.createElementBlock("div", {
          key: 2,
          class: vue.normalizeClass(_ctx.b('status')),
          role: "status"
        }, [
          vue.createElementVNode("span", {
            class: vue.normalizeClass(_ctx.b('status-dot'))
          }, null, 2 /* CLASS */),
          vue.createTextVNode(" " + vue.toDisplayString(_ctx.statusText) + " ", 1 /* TEXT */),
          (_ctx.error)
            ? (vue.openBlock(), vue.createBlock(_component_el_button, {
                key: 0,
                text: "",
                type: "primary",
                size: "small",
                onClick: _ctx.retry
              }, {
                default: vue.withCtx(() => _cache[2] || (_cache[2] = [
                  vue.createTextVNode("重试")
                ])),
                _: 1 /* STABLE */
              }, 8 /* PROPS */, ["onClick"]))
            : vue.createCommentVNode("v-if", true)
        ], 2 /* CLASS */))
      : vue.createCommentVNode("v-if", true),
    vue.renderSlot(_ctx.$slots, "overlay", {
      ready: _ctx.isReady,
      recording: _ctx.isRecording,
      error: _ctx.error
    })
  ], 6 /* CLASS, STYLE */))
}

exports.render = render;
