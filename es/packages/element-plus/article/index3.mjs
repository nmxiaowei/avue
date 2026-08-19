/*! Avue.js v3.9.4 | (c) 2017-2026 Smallwei | Released under the MIT License. */
import { resolveComponent, openBlock, createElementBlock, normalizeStyle, normalizeClass, renderSlot, createBlock, resolveDynamicComponent, withCtx, createTextVNode, toDisplayString, createCommentVNode, Fragment, createElementVNode } from 'vue';

const _hoisted_1 = { key: 0 };
const _hoisted_2 = ["innerHTML"];

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_image_viewer = resolveComponent("el-image-viewer");

  return (openBlock(), createElementBlock("article", {
    class: normalizeClass([_ctx.b(), { 'is-previewable': _ctx.preview }]),
    style: normalizeStyle(_ctx.styleName)
  }, [
    (_ctx.title || _ctx.meta || _ctx.$slots.header)
      ? (openBlock(), createElementBlock("header", {
          key: 0,
          class: normalizeClass(_ctx.b('header'))
        }, [
          renderSlot(_ctx.$slots, "header", { data: _ctx.data }, () => [
            (_ctx.title)
              ? (openBlock(), createBlock(resolveDynamicComponent(_ctx.titleTag), {
                  key: 0,
                  class: normalizeClass(_ctx.b('title'))
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(_ctx.title), 1 /* TEXT */)
                  ]),
                  _: 1 /* STABLE */
                }, 8 /* PROPS */, ["class"]))
              : createCommentVNode("v-if", true),
            (_ctx.meta || (_ctx.showInfo && _ctx.hasBody))
              ? (openBlock(), createElementBlock("div", {
                  key: 1,
                  class: normalizeClass(_ctx.b('meta'))
                }, [
                  (_ctx.meta)
                    ? (openBlock(), createElementBlock("span", _hoisted_1, toDisplayString(_ctx.meta), 1 /* TEXT */))
                    : createCommentVNode("v-if", true),
                  (_ctx.showInfo && _ctx.hasBody)
                    ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                        (_ctx.meta)
                          ? (openBlock(), createElementBlock("span", {
                              key: 0,
                              class: normalizeClass(_ctx.b('meta-separator'))
                            }, "·", 2 /* CLASS */))
                          : createCommentVNode("v-if", true),
                        createElementVNode("span", null, toDisplayString(_ctx.wordCount) + " 字", 1 /* TEXT */),
                        createElementVNode("span", {
                          class: normalizeClass(_ctx.b('meta-separator'))
                        }, "·", 2 /* CLASS */),
                        createElementVNode("span", null, "约 " + toDisplayString(_ctx.readingMinutes) + " 分钟阅读", 1 /* TEXT */)
                      ], 64 /* STABLE_FRAGMENT */))
                    : createCommentVNode("v-if", true)
                ], 2 /* CLASS */))
              : createCommentVNode("v-if", true)
          ])
        ], 2 /* CLASS */))
      : createCommentVNode("v-if", true),
    (_ctx.lead || _ctx.$slots.lead)
      ? (openBlock(), createElementBlock("aside", {
          key: 1,
          class: normalizeClass(_ctx.b('lead'))
        }, [
          renderSlot(_ctx.$slots, "lead", { data: _ctx.data }, () => [
            createTextVNode(toDisplayString(_ctx.lead), 1 /* TEXT */)
          ])
        ], 2 /* CLASS */))
      : createCommentVNode("v-if", true),
    (_ctx.hasBody || _ctx.$slots.body)
      ? (openBlock(), createElementBlock("section", {
          key: 2,
          ref: "body",
          class: normalizeClass(_ctx.b('body')),
          onClick: _cache[0] || (_cache[0] = (...args) => (_ctx.handleBodyClick && _ctx.handleBodyClick(...args)))
        }, [
          renderSlot(_ctx.$slots, "body", {
            data: _ctx.data,
            content: _ctx.formattedBody
          }, () => [
            createElementVNode("div", { innerHTML: _ctx.formattedBody }, null, 8 /* PROPS */, _hoisted_2)
          ])
        ], 2 /* CLASS */))
      : (_ctx.$slots.empty)
        ? (openBlock(), createElementBlock("div", {
            key: 3,
            class: normalizeClass(_ctx.b('empty'))
          }, [
            renderSlot(_ctx.$slots, "empty", { data: _ctx.data })
          ], 2 /* CLASS */))
        : createCommentVNode("v-if", true),
    (_ctx.$slots.footer)
      ? (openBlock(), createElementBlock("footer", {
          key: 4,
          class: normalizeClass(_ctx.b('footer'))
        }, [
          renderSlot(_ctx.$slots, "footer", { data: _ctx.data })
        ], 2 /* CLASS */))
      : createCommentVNode("v-if", true),
    (_ctx.previewVisible)
      ? (openBlock(), createBlock(_component_el_image_viewer, {
          key: 5,
          "url-list": _ctx.previewImages,
          "initial-index": _ctx.previewIndex,
          onClose: _ctx.closePreview
        }, null, 8 /* PROPS */, ["url-list", "initial-index", "onClose"]))
      : createCommentVNode("v-if", true)
  ], 6 /* CLASS, STYLE */))
}

export { render };
