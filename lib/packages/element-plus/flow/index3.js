/*! Avue.js v3.9.3 | (c) 2017-2026 Smallwei | Released under the MIT License. */
'use strict';

var vue = require('vue');

const _hoisted_1 = ["id"];

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_flow_node = vue.resolveComponent("flow-node");

  return (vue.openBlock(), vue.createElementBlock("div", {
    class: vue.normalizeClass(_ctx.b()),
    style: vue.normalizeStyle(_ctx.styleName)
  }, [
    vue.createElementVNode("div", {
      id: _ctx.id,
      style: vue.normalizeStyle(_ctx.styleName)
    }, [
      _cache[0] || (_cache[0] = vue.createElementVNode("div", { class: "avue-grid" }, null, -1 /* HOISTED */)),
      (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.option.nodeList, (node, index) => {
        return (vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
          (!node.display)
            ? (vue.openBlock(), vue.createBlock(_component_flow_node, {
                node: node,
                id: node.id,
                onClick: $event => (_ctx.handleClick(node)),
                onChangeNodeSite: _ctx.changeNodeSite,
                index: index,
                active: _ctx.active,
                key: index
              }, {
                header: vue.withCtx(({node}) => [
                  vue.renderSlot(_ctx.$slots, "header", { node: node })
                ]),
                default: vue.withCtx(({node}) => [
                  vue.renderSlot(_ctx.$slots, "default", { node: node })
                ]),
                _: 2 /* DYNAMIC */
              }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["node", "id", "onClick", "onChangeNodeSite", "index", "active"]))
            : vue.createCommentVNode("v-if", true)
        ], 64 /* STABLE_FRAGMENT */))
      }), 256 /* UNKEYED_FRAGMENT */))
    ], 12 /* STYLE, PROPS */, _hoisted_1)
  ], 6 /* CLASS, STYLE */))
}

exports.render = render;
