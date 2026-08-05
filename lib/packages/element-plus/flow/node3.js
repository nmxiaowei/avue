/*! Avue.js v3.9.3 | (c) 2017-2026 Smallwei | Released under the MIT License. */
'use strict';

var vue = require('vue');

const _hoisted_1 = ["left", "top"];

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_icon_rank = vue.resolveComponent("el-icon-rank");
  const _component_el_icon = vue.resolveComponent("el-icon");

  return (vue.openBlock(), vue.createElementBlock("div", {
    ref: "node",
    style: vue.normalizeStyle(_ctx.flowNodeContainer),
    onMouseenter: _cache[0] || (_cache[0] = (...args) => (_ctx.showDelete && _ctx.showDelete(...args))),
    onMouseleave: _cache[1] || (_cache[1] = (...args) => (_ctx.hideDelete && _ctx.hideDelete(...args))),
    onMouseup: _cache[2] || (_cache[2] = (...args) => (_ctx.changeNodeSite && _ctx.changeNodeSite(...args))),
    left: _ctx.node.left,
    top: _ctx.node.top,
    disabled: "",
    mask: false
  }, [
    vue.createElementVNode("div", {
      class: vue.normalizeClass(_ctx.b('node',{'active':_ctx.active===_ctx.node.id}))
    }, [
      vue.createElementVNode("div", {
        class: vue.normalizeClass(_ctx.b('node-header'))
      }, [
        vue.createElementVNode("span", {
          class: vue.normalizeClass(_ctx.b('node-drag'))
        }, null, 2 /* CLASS */),
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
        vue.renderSlot(_ctx.$slots, "default", { node: _ctx.node })
      ], 2 /* CLASS */)
    ], 2 /* CLASS */)
  ], 44 /* STYLE, PROPS, NEED_HYDRATION */, _hoisted_1))
}

exports.render = render;
