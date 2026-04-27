/*! Avue.js v3.9.0 | (c) 2017-2026 Smallwei | Released under the MIT License. */
'use strict';

var vue = require('vue');

const _hoisted_1 = { key: 0 };
const _hoisted_2 = { class: "avue-crud__img" };
const _hoisted_3 = ["src", "onClick"];
const _hoisted_4 = { key: 1 };
const _hoisted_5 = { key: 2 };
const _hoisted_6 = ["innerHTML"];

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_link = vue.resolveComponent("el-link");
  const _component_avue_rate = vue.resolveComponent("avue-rate");

  return (['img','upload'].includes($props.column.type))
    ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_1, [
        vue.createElementVNode("div", _hoisted_2, [
          (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($options.getImgList($props.row,$props.column), (item, index) => {
            return (vue.openBlock(), vue.createElementBlock("img", {
              src: item,
              key: index,
              onClick: $event => ($options.openImg($options.getImgList($props.row,$props.column),index))
            }, null, 8 /* PROPS */, _hoisted_3))
          }), 128 /* KEYED_FRAGMENT */))
        ])
      ]))
    : (['url'].includes($props.column.type))
      ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_4, [
          (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($options.corArray($props.row[$props.column.prop],$props.column.separator), (item, index) => {
            return (vue.openBlock(), vue.createBlock(_component_el_link, {
              type: "primary",
              key: index,
              href: item,
              target: $props.column.target || '_blank'
            }, {
              default: vue.withCtx(() => [
                vue.createTextVNode(vue.toDisplayString(item), 1 /* TEXT */)
              ]),
              _: 2 /* DYNAMIC */
            }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["href", "target"]))
          }), 128 /* KEYED_FRAGMENT */))
        ]))
      : (['rate'].includes($props.column.type))
        ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_5, [
            vue.createVNode(_component_avue_rate, {
              disabled: "",
              modelValue: $props.row[$props.column.prop],
              "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => (($props.row[$props.column.prop]) = $event))
            }, null, 8 /* PROPS */, ["modelValue"])
          ]))
        : (vue.openBlock(), vue.createElementBlock("span", {
            key: 3,
            innerHTML: $options.handleDetail($props.row,$props.column)
          }, null, 8 /* PROPS */, _hoisted_6))
}

exports.render = render;
