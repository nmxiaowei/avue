/*! Avue.js v3.9.4 | (c) 2017-2026 Smallwei | Released under the MIT License. */
import { resolveComponent, openBlock, createElementBlock, normalizeStyle, normalizeClass, createElementVNode, createCommentVNode, Fragment, renderList, createBlock, withCtx, renderSlot } from 'vue';

const _hoisted_1 = ["id"];

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_flow_node = resolveComponent("flow-node");

  return (openBlock(), createElementBlock("div", {
    class: normalizeClass(_ctx.b({ readonly: !_ctx.editable })),
    style: normalizeStyle(_ctx.styleName)
  }, [
    createElementVNode("div", {
      id: _ctx.id,
      class: normalizeClass(_ctx.b('canvas')),
      style: normalizeStyle(_ctx.canvasStyle)
    }, [
      (_ctx.showGrid)
        ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: normalizeClass(_ctx.b('grid')),
            style: normalizeStyle(_ctx.gridStyle)
          }, null, 6 /* CLASS, STYLE */))
        : createCommentVNode("v-if", true),
      (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.nodeList, (node) => {
        return (openBlock(), createElementBlock(Fragment, {
          key: node.id
        }, [
          (!node.display)
            ? (openBlock(), createBlock(_component_flow_node, {
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
                header: withCtx(({ node: currentNode }) => [
                  renderSlot(_ctx.$slots, "header", { node: currentNode })
                ]),
                default: withCtx(({ node: currentNode }) => [
                  renderSlot(_ctx.$slots, "default", { node: currentNode })
                ]),
                _: 2 /* DYNAMIC */
              }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["id", "node", "active", "node-width", "node-height", "editable", "onClick", "onChangeNodeSite"]))
            : createCommentVNode("v-if", true)
        ], 64 /* STABLE_FRAGMENT */))
      }), 128 /* KEYED_FRAGMENT */))
    ], 14 /* CLASS, STYLE, PROPS */, _hoisted_1)
  ], 6 /* CLASS, STYLE */))
}

export { render };
