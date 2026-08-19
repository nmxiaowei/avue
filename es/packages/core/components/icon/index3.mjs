/*! Avue.js v3.9.4 | (c) 2017-2026 Smallwei | Released under the MIT License. */
import { resolveComponent, openBlock, createElementBlock, normalizeClass, normalizeStyle, createElementVNode, createBlock, withCtx, resolveDynamicComponent, createCommentVNode } from 'vue';

const _hoisted_1 = ["xlink:href"];

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_icon = resolveComponent("el-icon");

  return ($props.text)
    ? (openBlock(), createElementBlock("span", {
        key: 0,
        class: normalizeClass(["avue-icon", {'avue-icon--small':$props.small}])
      }, [
        ($options.isSvgIcon)
          ? (openBlock(), createElementBlock("svg", {
              key: 0,
              style: normalizeStyle($options.customIconStyle),
              "aria-hidden": "true"
            }, [
              createElementVNode("use", { "xlink:href": $props.text }, null, 8 /* PROPS */, _hoisted_1)
            ], 4 /* STYLE */))
          : ($options.isElementIcon)
            ? (openBlock(), createBlock(_component_el_icon, {
                key: 1,
                size: $options.iconSize,
                color: $props.color,
                style: normalizeStyle($props.iconStyle)
              }, {
                default: withCtx(() => [
                  (openBlock(), createBlock(resolveDynamicComponent($props.text)))
                ]),
                _: 1 /* STABLE */
              }, 8 /* PROPS */, ["size", "color", "style"]))
            : (openBlock(), createElementBlock("i", {
                key: 2,
                class: normalizeClass([$props.text, 'avue-icon__font']),
                style: normalizeStyle($options.customIconStyle)
              }, null, 6 /* CLASS, STYLE */))
      ], 2 /* CLASS */))
    : createCommentVNode("v-if", true)
}

export { render };
