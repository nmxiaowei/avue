/*! Avue.js v3.8.6 | (c) 2017-2026 Smallwei | Released under the MIT License. */
'use strict';

var vue = require('vue');

const _hoisted_1 = { key: 0 };
const _hoisted_2 = { class: "avue-dialog__footer" };

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_avue_form = vue.resolveComponent("avue-form");
  const _component_el_button = vue.resolveComponent("el-button");
  const _component_el_dialog = vue.resolveComponent("el-dialog");

  return ($data.box)
    ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_1, [
        _cache[3] || (_cache[3] = vue.createTextVNode("  ")),
        vue.createVNode(_component_el_dialog, {
          title: _ctx.t('crud.excelBtn'),
          "lock-scroll": "",
          "append-to-body": _ctx.$AVUE.appendToBody,
          class: "avue-dialog",
          modelValue: $data.box,
          "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => (($data.box) = $event)),
          width: $options.crud.isMobile?'100%':'30%'
        }, {
          default: vue.withCtx(() => [
            vue.createVNode(_component_avue_form, {
              ref: "form",
              modelValue: $data.form,
              "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => (($data.form) = $event)),
              option: $data.option
            }, null, 8 /* PROPS */, ["modelValue", "option"]),
            vue.createElementVNode("span", _hoisted_2, [
              vue.createVNode(_component_el_button, {
                type: "primary",
                size: $options.crud.size,
                onClick: $options.handleSubmit
              }, {
                default: vue.withCtx(() => [
                  vue.createTextVNode(vue.toDisplayString(_ctx.t('crud.filter.submitBtn')), 1 /* TEXT */)
                ]),
                _: 1 /* STABLE */
              }, 8 /* PROPS */, ["size", "onClick"]),
              vue.createVNode(_component_el_button, {
                onClick: _cache[1] || (_cache[1] = $event => ($data.box = false)),
                size: $options.crud.size
              }, {
                default: vue.withCtx(() => [
                  vue.createTextVNode(vue.toDisplayString(_ctx.t('crud.filter.cancelBtn')), 1 /* TEXT */)
                ]),
                _: 1 /* STABLE */
              }, 8 /* PROPS */, ["size"])
            ])
          ]),
          _: 1 /* STABLE */
        }, 8 /* PROPS */, ["title", "append-to-body", "modelValue", "width"])
      ]))
    : vue.createCommentVNode("v-if", true)
}

exports.render = render;
