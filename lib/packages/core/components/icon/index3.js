/*! Avue.js v3.9.0 | (c) 2017-2026 Smallwei | Released under the MIT License. */
'use strict';

var vue = require('vue');

const _hoisted_1 = {
  key: 0,
  "aria-hidden": "true"
};
const _hoisted_2 = ["xlink:href"];

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_icon = vue.resolveComponent("el-icon");

  return ($props.text)
    ? (vue.openBlock(), vue.createElementBlock("span", {
        key: 0,
        class: vue.normalizeClass(["avue-icon", {'avue-icon--small':$props.small}])
      }, [
        ($props.text.includes('#'))
          ? (vue.openBlock(), vue.createElementBlock("svg", _hoisted_1, [
              vue.createElementVNode("use", { "xlink:href": $props.text }, null, 8 /* PROPS */, _hoisted_2)
            ]))
          : ($props.text.indexOf('el-') == 0)
            ? (vue.openBlock(), vue.createBlock(_component_el_icon, {
                key: 1,
                size: $props.size,
                color: $props.color
              }, {
                default: vue.withCtx(() => [
                  (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($props.text)))
                ]),
                _: 1 /* STABLE */
              }, 8 /* PROPS */, ["size", "color"]))
            : (vue.openBlock(), vue.createElementBlock("i", {
                key: 2,
                class: vue.normalizeClass($props.text)
              }, null, 2 /* CLASS */))
      ], 2 /* CLASS */))
    : vue.createCommentVNode("v-if", true)
}

exports.render = render;
