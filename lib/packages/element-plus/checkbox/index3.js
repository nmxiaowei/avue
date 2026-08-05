/*! Avue.js v3.9.3 | (c) 2017-2026 Smallwei | Released under the MIT License. */
'use strict';

var vue = require('vue');

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_checkbox = vue.resolveComponent("el-checkbox");
  const _component_el_checkbox_group = vue.resolveComponent("el-checkbox-group");

  return (vue.openBlock(), vue.createElementBlock("div", {
    class: vue.normalizeClass(_ctx.b())
  }, [
    (_ctx.all)
      ? (vue.openBlock(), vue.createBlock(_component_el_checkbox, {
          key: 0,
          class: vue.normalizeClass(_ctx.b('all')),
          disabled: _ctx.disabled,
          indeterminate: _ctx.isIndeterminate,
          modelValue: _ctx.checkAll,
          "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((_ctx.checkAll) = $event)),
          onChange: _ctx.handleCheckAll
        }, {
          default: vue.withCtx(() => [
            vue.createTextVNode(vue.toDisplayString(_ctx.t('check.checkAll')), 1 /* TEXT */)
          ]),
          _: 1 /* STABLE */
        }, 8 /* PROPS */, ["class", "disabled", "indeterminate", "modelValue", "onChange"]))
      : vue.createCommentVNode("v-if", true),
    vue.createVNode(_component_el_checkbox_group, {
      modelValue: _ctx.text,
      "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => ((_ctx.text) = $event)),
      onChange: _ctx.handleCheckChange,
      disabled: _ctx.disabled,
      size: _ctx.size,
      fill: _ctx.fill,
      "text-color": _ctx.textColor,
      min: _ctx.min,
      max: _ctx.max,
      onClick: _ctx.handleClick
    }, {
      default: vue.withCtx(() => [
        (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.dic, (item, index) => {
          return (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.componentName), {
            border: _ctx.border,
            size: _ctx.size,
            value: item[_ctx.valueKey],
            readonly: _ctx.readonly,
            disabled: item[_ctx.disabledKey],
            key: index
          }, {
            default: vue.withCtx(() => [
              vue.createTextVNode(vue.toDisplayString(item[_ctx.labelKey]), 1 /* TEXT */)
            ]),
            _: 2 /* DYNAMIC */
          }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["border", "size", "value", "readonly", "disabled"]))
        }), 128 /* KEYED_FRAGMENT */))
      ]),
      _: 1 /* STABLE */
    }, 8 /* PROPS */, ["modelValue", "onChange", "disabled", "size", "fill", "text-color", "min", "max", "onClick"])
  ], 2 /* CLASS */))
}

exports.render = render;
