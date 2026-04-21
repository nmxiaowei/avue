/*! Avue.js v3.8.6 | (c) 2017-2026 Smallwei | Released under the MIT License. */
import { resolveComponent, openBlock, createElementBlock, normalizeStyle, normalizeClass, createElementVNode, Fragment, renderList, createBlock, withCtx, renderSlot, createCommentVNode } from 'vue';

const _hoisted_1 = ["id"];

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_flow_node = resolveComponent("flow-node");

  return (openBlock(), createElementBlock("div", {
    class: normalizeClass(_ctx.b()),
    style: normalizeStyle(_ctx.styleName)
  }, [
    createElementVNode("div", {
      id: _ctx.id,
      style: normalizeStyle(_ctx.styleName)
    }, [
      _cache[0] || (_cache[0] = createElementVNode("div", { class: "avue-grid" }, null, -1 /* HOISTED */)),
      (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.option.nodeList, (node, index) => {
        return (openBlock(), createElementBlock(Fragment, null, [
          (!node.display)
            ? (openBlock(), createBlock(_component_flow_node, {
                node: node,
                id: node.id,
                onClick: $event => (_ctx.handleClick(node)),
                onChangeNodeSite: _ctx.changeNodeSite,
                index: index,
                active: _ctx.active,
                key: index
              }, {
                header: withCtx(({node}) => [
                  renderSlot(_ctx.$slots, "header", { node: node })
                ]),
                default: withCtx(({node}) => [
                  renderSlot(_ctx.$slots, "default", { node: node })
                ]),
                _: 2 /* DYNAMIC */
              }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["node", "id", "onClick", "onChangeNodeSite", "index", "active"]))
            : createCommentVNode("v-if", true)
        ], 64 /* STABLE_FRAGMENT */))
      }), 256 /* UNKEYED_FRAGMENT */))
    ], 12 /* STYLE, PROPS */, _hoisted_1)
  ], 6 /* CLASS, STYLE */))
}

export { render };
