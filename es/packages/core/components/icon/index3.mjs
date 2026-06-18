/*! Avue.js v3.9.2 | (c) 2017-2026 Smallwei | Released under the MIT License. */
import { resolveComponent, openBlock, createElementBlock, normalizeClass, createElementVNode, createBlock, withCtx, resolveDynamicComponent, createCommentVNode } from 'vue';

const _hoisted_1 = {
  key: 0,
  "aria-hidden": "true"
};
const _hoisted_2 = ["xlink:href"];

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_icon = resolveComponent("el-icon");

  return ($props.text)
    ? (openBlock(), createElementBlock("span", {
        key: 0,
        class: normalizeClass(["avue-icon", {'avue-icon--small':$props.small}])
      }, [
        ($props.text.includes('#'))
          ? (openBlock(), createElementBlock("svg", _hoisted_1, [
              createElementVNode("use", { "xlink:href": $props.text }, null, 8 /* PROPS */, _hoisted_2)
            ]))
          : ($props.text.indexOf('el-') == 0)
            ? (openBlock(), createBlock(_component_el_icon, {
                key: 1,
                size: $props.size,
                color: $props.color
              }, {
                default: withCtx(() => [
                  (openBlock(), createBlock(resolveDynamicComponent($props.text)))
                ]),
                _: 1 /* STABLE */
              }, 8 /* PROPS */, ["size", "color"]))
            : (openBlock(), createElementBlock("i", {
                key: 2,
                class: normalizeClass($props.text)
              }, null, 2 /* CLASS */))
      ], 2 /* CLASS */))
    : createCommentVNode("v-if", true)
}

export { render };
