/*! Avue.js v3.9.4 | (c) 2017-2026 Smallwei | Released under the MIT License. */
import { resolveComponent, openBlock, createElementBlock, withKeys, withModifiers, normalizeStyle, normalizeClass, createElementVNode, createCommentVNode, createVNode, withCtx, renderSlot, createTextVNode, toDisplayString } from 'vue';

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_icon_rank = resolveComponent("el-icon-rank");
  const _component_el_icon = resolveComponent("el-icon");

  return (openBlock(), createElementBlock("div", {
    ref: "node",
    class: normalizeClass(_ctx.b('node-wrapper')),
    style: normalizeStyle(_ctx.flowNodeContainer),
    tabindex: "0",
    role: "button",
    onClick: _cache[0] || (_cache[0] = (...args) => (_ctx.handleClick && _ctx.handleClick(...args))),
    onKeydown: _cache[1] || (_cache[1] = withKeys(withModifiers((...args) => (_ctx.handleClick && _ctx.handleClick(...args)), ["prevent"]), ["enter"])),
    onMouseup: _cache[2] || (_cache[2] = (...args) => (_ctx.changeNodeSite && _ctx.changeNodeSite(...args)))
  }, [
    createElementVNode("div", {
      class: normalizeClass(_ctx.b('node', { active: _ctx.active === _ctx.node.id }))
    }, [
      createElementVNode("div", {
        class: normalizeClass(_ctx.b('node-header'))
      }, [
        (_ctx.editable)
          ? (openBlock(), createElementBlock("span", {
              key: 0,
              class: normalizeClass(_ctx.b('node-drag')),
              title: "拖动节点"
            }, null, 2 /* CLASS */))
          : createCommentVNode("v-if", true),
        createVNode(_component_el_icon, null, {
          default: withCtx(() => [
            createVNode(_component_el_icon_rank)
          ]),
          _: 1 /* STABLE */
        }),
        renderSlot(_ctx.$slots, "header", { node: _ctx.node })
      ], 2 /* CLASS */),
      createElementVNode("div", {
        class: normalizeClass(_ctx.b('node-body'))
      }, [
        renderSlot(_ctx.$slots, "default", { node: _ctx.node }, () => [
          createTextVNode(toDisplayString(_ctx.node.name), 1 /* TEXT */)
        ])
      ], 2 /* CLASS */)
    ], 2 /* CLASS */)
  ], 38 /* CLASS, STYLE, NEED_HYDRATION */))
}

export { render };
