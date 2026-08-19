/*! Avue.js v3.9.4 | (c) 2017-2026 Smallwei | Released under the MIT License. */
'use strict';

var vue = require('vue');

const _hoisted_1 = { key: 0 };
const _hoisted_2 = ["innerHTML"];

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_image_viewer = vue.resolveComponent("el-image-viewer");

  return (vue.openBlock(), vue.createElementBlock("article", {
    class: vue.normalizeClass([_ctx.b(), { 'is-previewable': _ctx.preview }]),
    style: vue.normalizeStyle(_ctx.styleName)
  }, [
    (_ctx.title || _ctx.meta || _ctx.$slots.header)
      ? (vue.openBlock(), vue.createElementBlock("header", {
          key: 0,
          class: vue.normalizeClass(_ctx.b('header'))
        }, [
          vue.renderSlot(_ctx.$slots, "header", { data: _ctx.data }, () => [
            (_ctx.title)
              ? (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.titleTag), {
                  key: 0,
                  class: vue.normalizeClass(_ctx.b('title'))
                }, {
                  default: vue.withCtx(() => [
                    vue.createTextVNode(vue.toDisplayString(_ctx.title), 1 /* TEXT */)
                  ]),
                  _: 1 /* STABLE */
                }, 8 /* PROPS */, ["class"]))
              : vue.createCommentVNode("v-if", true),
            (_ctx.meta || (_ctx.showInfo && _ctx.hasBody))
              ? (vue.openBlock(), vue.createElementBlock("div", {
                  key: 1,
                  class: vue.normalizeClass(_ctx.b('meta'))
                }, [
                  (_ctx.meta)
                    ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_1, vue.toDisplayString(_ctx.meta), 1 /* TEXT */))
                    : vue.createCommentVNode("v-if", true),
                  (_ctx.showInfo && _ctx.hasBody)
                    ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 1 }, [
                        (_ctx.meta)
                          ? (vue.openBlock(), vue.createElementBlock("span", {
                              key: 0,
                              class: vue.normalizeClass(_ctx.b('meta-separator'))
                            }, "·", 2 /* CLASS */))
                          : vue.createCommentVNode("v-if", true),
                        vue.createElementVNode("span", null, vue.toDisplayString(_ctx.wordCount) + " 字", 1 /* TEXT */),
                        vue.createElementVNode("span", {
                          class: vue.normalizeClass(_ctx.b('meta-separator'))
                        }, "·", 2 /* CLASS */),
                        vue.createElementVNode("span", null, "约 " + vue.toDisplayString(_ctx.readingMinutes) + " 分钟阅读", 1 /* TEXT */)
                      ], 64 /* STABLE_FRAGMENT */))
                    : vue.createCommentVNode("v-if", true)
                ], 2 /* CLASS */))
              : vue.createCommentVNode("v-if", true)
          ])
        ], 2 /* CLASS */))
      : vue.createCommentVNode("v-if", true),
    (_ctx.lead || _ctx.$slots.lead)
      ? (vue.openBlock(), vue.createElementBlock("aside", {
          key: 1,
          class: vue.normalizeClass(_ctx.b('lead'))
        }, [
          vue.renderSlot(_ctx.$slots, "lead", { data: _ctx.data }, () => [
            vue.createTextVNode(vue.toDisplayString(_ctx.lead), 1 /* TEXT */)
          ])
        ], 2 /* CLASS */))
      : vue.createCommentVNode("v-if", true),
    (_ctx.hasBody || _ctx.$slots.body)
      ? (vue.openBlock(), vue.createElementBlock("section", {
          key: 2,
          ref: "body",
          class: vue.normalizeClass(_ctx.b('body')),
          onClick: _cache[0] || (_cache[0] = (...args) => (_ctx.handleBodyClick && _ctx.handleBodyClick(...args)))
        }, [
          vue.renderSlot(_ctx.$slots, "body", {
            data: _ctx.data,
            content: _ctx.formattedBody
          }, () => [
            vue.createElementVNode("div", { innerHTML: _ctx.formattedBody }, null, 8 /* PROPS */, _hoisted_2)
          ])
        ], 2 /* CLASS */))
      : (_ctx.$slots.empty)
        ? (vue.openBlock(), vue.createElementBlock("div", {
            key: 3,
            class: vue.normalizeClass(_ctx.b('empty'))
          }, [
            vue.renderSlot(_ctx.$slots, "empty", { data: _ctx.data })
          ], 2 /* CLASS */))
        : vue.createCommentVNode("v-if", true),
    (_ctx.$slots.footer)
      ? (vue.openBlock(), vue.createElementBlock("footer", {
          key: 4,
          class: vue.normalizeClass(_ctx.b('footer'))
        }, [
          vue.renderSlot(_ctx.$slots, "footer", { data: _ctx.data })
        ], 2 /* CLASS */))
      : vue.createCommentVNode("v-if", true),
    (_ctx.previewVisible)
      ? (vue.openBlock(), vue.createBlock(_component_el_image_viewer, {
          key: 5,
          "url-list": _ctx.previewImages,
          "initial-index": _ctx.previewIndex,
          onClose: _ctx.closePreview
        }, null, 8 /* PROPS */, ["url-list", "initial-index", "onClose"]))
      : vue.createCommentVNode("v-if", true)
  ], 6 /* CLASS, STYLE */))
}

exports.render = render;
