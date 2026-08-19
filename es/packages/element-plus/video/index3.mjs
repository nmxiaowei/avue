/*! Avue.js v3.9.4 | (c) 2017-2026 Smallwei | Released under the MIT License. */
import { resolveComponent, openBlock, createElementBlock, normalizeStyle, normalizeClass, createElementVNode, createCommentVNode, createTextVNode, toDisplayString, createBlock, withCtx, renderSlot } from 'vue';

const _hoisted_1 = ["autoplay", "muted"];
const _hoisted_2 = ["src"];

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_button = resolveComponent("el-button");

  return (openBlock(), createElementBlock("div", {
    class: normalizeClass(_ctx.b({ ready: _ctx.isReady, recording: _ctx.isRecording })),
    style: normalizeStyle(_ctx.styleName)
  }, [
    (_ctx.showBorder)
      ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: normalizeClass(_ctx.b('border')),
          "aria-hidden": "true"
        }, _cache[1] || (_cache[1] = [
          createElementVNode("span", null, null, -1 /* HOISTED */),
          createElementVNode("span", null, null, -1 /* HOISTED */),
          createElementVNode("span", null, null, -1 /* HOISTED */),
          createElementVNode("span", null, null, -1 /* HOISTED */)
        ]), 2 /* CLASS */))
      : createCommentVNode("v-if", true),
    createElementVNode("video", {
      ref: "main",
      class: normalizeClass([_ctx.b('main'), { [_ctx.b('main--mirror')]: _ctx.mirror }]),
      autoplay: _ctx.autoplay,
      muted: _ctx.muted,
      playsinline: "",
      onError: _cache[0] || (_cache[0] = (...args) => (_ctx.handleVideoError && _ctx.handleVideoError(...args)))
    }, null, 42 /* CLASS, PROPS, NEED_HYDRATION */, _hoisted_1),
    (_ctx.background)
      ? (openBlock(), createElementBlock("img", {
          key: 1,
          class: normalizeClass(_ctx.b('guide')),
          src: _ctx.background,
          alt: "",
          "aria-hidden": "true"
        }, null, 10 /* CLASS, PROPS */, _hoisted_2))
      : createCommentVNode("v-if", true),
    (_ctx.showStatus && !_ctx.isReady)
      ? (openBlock(), createElementBlock("div", {
          key: 2,
          class: normalizeClass(_ctx.b('status')),
          role: "status"
        }, [
          createElementVNode("span", {
            class: normalizeClass(_ctx.b('status-dot'))
          }, null, 2 /* CLASS */),
          createTextVNode(" " + toDisplayString(_ctx.statusText) + " ", 1 /* TEXT */),
          (_ctx.error)
            ? (openBlock(), createBlock(_component_el_button, {
                key: 0,
                text: "",
                type: "primary",
                size: "small",
                onClick: _ctx.retry
              }, {
                default: withCtx(() => _cache[2] || (_cache[2] = [
                  createTextVNode("重试")
                ])),
                _: 1 /* STABLE */
              }, 8 /* PROPS */, ["onClick"]))
            : createCommentVNode("v-if", true)
        ], 2 /* CLASS */))
      : createCommentVNode("v-if", true),
    renderSlot(_ctx.$slots, "overlay", {
      ready: _ctx.isReady,
      recording: _ctx.isRecording,
      error: _ctx.error
    })
  ], 6 /* CLASS, STYLE */))
}

export { render };
