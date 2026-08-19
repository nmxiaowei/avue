/*! Avue.js v3.9.4 | (c) 2017-2026 Smallwei | Released under the MIT License. */
'use strict';

var vue = require('vue');

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_icon_temp = vue.resolveComponent("icon-temp");
  const _component_el_collapse_item = vue.resolveComponent("el-collapse-item");
  const _component_el_collapse = vue.resolveComponent("el-collapse");

  return (_ctx.display)
    ? (vue.openBlock(), vue.createElementBlock("div", {
        key: 0,
        class: vue.normalizeClass([_ctx.b({'header':!_ctx.isHeader,'arrow':!_ctx.arrow})])
      }, [
        vue.renderSlot(_ctx.$slots, "tabs"),
        vue.createVNode(_component_el_collapse, {
          onChange: _ctx.handleChange,
          modelValue: _ctx.activeName,
          "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((_ctx.activeName) = $event))
        }, {
          default: vue.withCtx(() => [
            vue.createVNode(_component_el_collapse_item, {
              name: 1,
              disabled: !_ctx.arrow
            }, vue.createSlots({
              default: vue.withCtx(() => [
                vue.renderSlot(_ctx.$slots, "default")
              ]),
              _: 2 /* DYNAMIC */
            }, [
              (_ctx.$slots.header&&_ctx.header)
                ? {
                    name: "title",
                    fn: vue.withCtx(() => [
                      vue.createElementVNode("div", {
                        class: vue.normalizeClass(_ctx.b('header'))
                      }, [
                        vue.renderSlot(_ctx.$slots, "header")
                      ], 2 /* CLASS */)
                    ]),
                    key: "0"
                  }
                : ((_ctx.label || _ctx.icon)&&_ctx.header)
                  ? {
                      name: "title",
                      fn: vue.withCtx(() => [
                        vue.createElementVNode("div", {
                          class: vue.normalizeClass(_ctx.b('header'))
                        }, [
                          (_ctx.icon)
                            ? (vue.openBlock(), vue.createBlock(_component_icon_temp, {
                                key: 0,
                                class: vue.normalizeClass(_ctx.b('icon')),
                                text: _ctx.icon,
                                size: 20
                              }, null, 8 /* PROPS */, ["class", "text"]))
                            : vue.createCommentVNode("v-if", true),
                          (_ctx.label)
                            ? (vue.openBlock(), vue.createElementBlock("h1", {
                                key: 1,
                                class: vue.normalizeClass(_ctx.b('title'))
                              }, vue.toDisplayString(_ctx.label), 3 /* TEXT, CLASS */))
                            : vue.createCommentVNode("v-if", true)
                        ], 2 /* CLASS */)
                      ]),
                      key: "1"
                    }
                  : undefined
            ]), 1032 /* PROPS, DYNAMIC_SLOTS */, ["disabled"])
          ]),
          _: 3 /* FORWARDED */
        }, 8 /* PROPS */, ["onChange", "modelValue"])
      ], 2 /* CLASS */))
    : vue.createCommentVNode("v-if", true)
}

exports.render = render;
