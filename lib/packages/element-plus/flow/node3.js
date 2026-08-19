/*! Avue.js v3.9.4 | (c) 2017-2026 Smallwei | Released under the MIT License. */
'use strict';

var vue = require('vue');

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_icon_rank = vue.resolveComponent("el-icon-rank");
  const _component_el_icon = vue.resolveComponent("el-icon");

  return (vue.openBlock(), vue.createElementBlock("div", {
    ref: "node",
    class: vue.normalizeClass(_ctx.b('node-wrapper')),
    style: vue.normalizeStyle(_ctx.flowNodeContainer),
    tabindex: "0",
    role: "button",
    onClick: _cache[0] || (_cache[0] = (...args) => (_ctx.handleClick && _ctx.handleClick(...args))),
    onKeydown: _cache[1] || (_cache[1] = vue.withKeys(vue.withModifiers((...args) => (_ctx.handleClick && _ctx.handleClick(...args)), ["prevent"]), ["enter"])),
    onMouseup: _cache[2] || (_cache[2] = (...args) => (_ctx.changeNodeSite && _ctx.changeNodeSite(...args)))
  }, [
    vue.createElementVNode("div", {
      class: vue.normalizeClass(_ctx.b('node', { active: _ctx.active === _ctx.node.id }))
    }, [
      vue.createElementVNode("div", {
        class: vue.normalizeClass(_ctx.b('node-header'))
      }, [
        (_ctx.editable)
          ? (vue.openBlock(), vue.createElementBlock("span", {
              key: 0,
              class: vue.normalizeClass(_ctx.b('node-drag')),
              title: "拖动节点"
            }, null, 2 /* CLASS */))
          : vue.createCommentVNode("v-if", true),
        vue.createVNode(_component_el_icon, null, {
          default: vue.withCtx(() => [
            vue.createVNode(_component_el_icon_rank)
          ]),
          _: 1 /* STABLE */
        }),
        vue.renderSlot(_ctx.$slots, "header", { node: _ctx.node })
      ], 2 /* CLASS */),
      vue.createElementVNode("div", {
        class: vue.normalizeClass(_ctx.b('node-body'))
      }, [
        vue.renderSlot(_ctx.$slots, "default", { node: _ctx.node }, () => [
          vue.createTextVNode(vue.toDisplayString(_ctx.node.name), 1 /* TEXT */)
        ])
      ], 2 /* CLASS */)
    ], 2 /* CLASS */)
  ], 38 /* CLASS, STYLE, NEED_HYDRATION */))
}

exports.render = render;
