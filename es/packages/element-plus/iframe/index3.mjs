/*! Avue.js v3.9.3 | (c) 2017-2026 Smallwei | Released under the MIT License. */
import { openBlock, createElementBlock, normalizeStyle, normalizeClass, createCommentVNode, renderSlot, createTextVNode, createElementVNode, toDisplayString } from 'vue';

const _hoisted_1 = ["src", "name", "title"];

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createElementBlock("div", {
    class: normalizeClass(_ctx.b()),
    style: normalizeStyle(_ctx.styleName)
  }, [
    (_ctx.hasSrc)
      ? (openBlock(), createElementBlock("iframe", {
          key: _ctx.frameKey,
          ref: "iframe",
          class: normalizeClass(_ctx.b('content')),
          src: _ctx.currentSrc,
          name: _ctx.name,
          title: _ctx.title,
          onLoad: _cache[0] || (_cache[0] = (...args) => (_ctx.handleLoad && _ctx.handleLoad(...args))),
          onError: _cache[1] || (_cache[1] = (...args) => (_ctx.handleError && _ctx.handleError(...args)))
        }, null, 42 /* CLASS, PROPS, NEED_HYDRATION */, _hoisted_1))
      : createCommentVNode("v-if", true),
    (!_ctx.hasSrc)
      ? (openBlock(), createElementBlock("div", {
          key: 1,
          class: normalizeClass(_ctx.b('state'))
        }, [
          renderSlot(_ctx.$slots, "empty", {}, () => [
            _cache[3] || (_cache[3] = createTextVNode("暂无嵌入页面"))
          ])
        ], 2 /* CLASS */))
      : (_ctx.loadError || _ctx.isTimedOut)
        ? (openBlock(), createElementBlock("div", {
            key: 2,
            class: normalizeClass([_ctx.b('state'), _ctx.b('state-error')])
          }, [
            renderSlot(_ctx.$slots, "error", {
              error: _ctx.loadError,
              timedOut: _ctx.isTimedOut,
              reload: _ctx.reload
            }, () => [
              createElementVNode("span", null, toDisplayString(_ctx.isTimedOut ? _ctx.timeoutText : _ctx.errorText), 1 /* TEXT */),
              createElementVNode("button", {
                type: "button",
                class: normalizeClass(_ctx.b('retry')),
                onClick: _cache[2] || (_cache[2] = (...args) => (_ctx.reload && _ctx.reload(...args)))
              }, "重新加载", 2 /* CLASS */)
            ])
          ], 2 /* CLASS */))
        : (_ctx.loading && _ctx.showLoading)
          ? (openBlock(), createElementBlock("div", {
              key: 3,
              class: normalizeClass([_ctx.b('state'), _ctx.b('state-loading')])
            }, [
              createElementVNode("span", {
                class: normalizeClass(_ctx.b('spinner'))
              }, null, 2 /* CLASS */),
              createElementVNode("span", null, toDisplayString(_ctx.loadingText), 1 /* TEXT */)
            ], 2 /* CLASS */))
          : createCommentVNode("v-if", true)
  ], 6 /* CLASS, STYLE */))
}

export { render };
