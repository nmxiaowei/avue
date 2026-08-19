/*! Avue.js v3.9.4 | (c) 2017-2026 Smallwei | Released under the MIT License. */
'use strict';

var vue = require('vue');

const _hoisted_1 = ["xlink:href"];

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_icon = vue.resolveComponent("el-icon");

  return ($props.text)
    ? (vue.openBlock(), vue.createElementBlock("span", {
        key: 0,
        class: vue.normalizeClass(["avue-icon", {'avue-icon--small':$props.small}])
      }, [
        ($options.isSvgIcon)
          ? (vue.openBlock(), vue.createElementBlock("svg", {
              key: 0,
              style: vue.normalizeStyle($options.customIconStyle),
              "aria-hidden": "true"
            }, [
              vue.createElementVNode("use", { "xlink:href": $props.text }, null, 8 /* PROPS */, _hoisted_1)
            ], 4 /* STYLE */))
          : ($options.isElementIcon)
            ? (vue.openBlock(), vue.createBlock(_component_el_icon, {
                key: 1,
                size: $options.iconSize,
                color: $props.color,
                style: vue.normalizeStyle($props.iconStyle)
              }, {
                default: vue.withCtx(() => [
                  (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($props.text)))
                ]),
                _: 1 /* STABLE */
              }, 8 /* PROPS */, ["size", "color", "style"]))
            : (vue.openBlock(), vue.createElementBlock("i", {
                key: 2,
                class: vue.normalizeClass([$props.text, 'avue-icon__font']),
                style: vue.normalizeStyle($options.customIconStyle)
              }, null, 6 /* CLASS, STYLE */))
      ], 2 /* CLASS */))
    : vue.createCommentVNode("v-if", true)
}

exports.render = render;
