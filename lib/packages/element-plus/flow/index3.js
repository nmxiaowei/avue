/*! Avue.js v3.9.4 | (c) 2017-2026 Smallwei | Released under the MIT License. */
'use strict';

var vue = require('vue');

const _hoisted_1 = ["id"];

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_flow_node = vue.resolveComponent("flow-node");

  return (vue.openBlock(), vue.createElementBlock("div", {
    class: vue.normalizeClass(_ctx.b({ readonly: !_ctx.editable })),
    style: vue.normalizeStyle(_ctx.styleName)
  }, [
    vue.createElementVNode("div", {
      id: _ctx.id,
      class: vue.normalizeClass(_ctx.b('canvas')),
      style: vue.normalizeStyle(_ctx.canvasStyle)
    }, [
      (_ctx.showGrid)
        ? (vue.openBlock(), vue.createElementBlock("div", {
            key: 0,
            class: vue.normalizeClass(_ctx.b('grid')),
            style: vue.normalizeStyle(_ctx.gridStyle)
          }, null, 6 /* CLASS, STYLE */))
        : vue.createCommentVNode("v-if", true),
      (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.nodeList, (node) => {
        return (vue.openBlock(), vue.createElementBlock(vue.Fragment, {
          key: node.id
        }, [
          (!node.display)
            ? (vue.openBlock(), vue.createBlock(_component_flow_node, {
                key: 0,
                id: node.id,
                node: node,
                active: _ctx.active,
                "node-width": _ctx.nodeWidth,
                "node-height": _ctx.nodeHeight,
                editable: _ctx.editable,
                onClick: $event => (_ctx.handleClick(node)),
                onChangeNodeSite: _ctx.changeNodeSite
              }, {
                header: vue.withCtx(({ node: currentNode }) => [
                  vue.renderSlot(_ctx.$slots, "header", { node: currentNode })
                ]),
                default: vue.withCtx(({ node: currentNode }) => [
                  vue.renderSlot(_ctx.$slots, "default", { node: currentNode })
                ]),
                _: 2 /* DYNAMIC */
              }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["id", "node", "active", "node-width", "node-height", "editable", "onClick", "onChangeNodeSite"]))
            : vue.createCommentVNode("v-if", true)
        ], 64 /* STABLE_FRAGMENT */))
      }), 128 /* KEYED_FRAGMENT */))
    ], 14 /* CLASS, STYLE, PROPS */, _hoisted_1)
  ], 6 /* CLASS, STYLE */))
}

exports.render = render;
