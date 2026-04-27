/*! Avue.js v3.9.1 | (c) 2017-2026 Smallwei | Released under the MIT License. */
'use strict';

var vue = require('vue');

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_radio_group = vue.resolveComponent("el-radio-group");

  return (vue.openBlock(), vue.createElementBlock("div", {
    class: vue.normalizeClass(_ctx.b())
  }, [
    vue.createVNode(_component_el_radio_group, {
      modelValue: _ctx.text,
      "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((_ctx.text) = $event)),
      size: _ctx.size,
      onClick: _ctx.handleClick,
      disabled: _ctx.disabled
    }, {
      default: vue.withCtx(() => [
        (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.dic, (item, index) => {
          return (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.componentName), {
            value: item[_ctx.valueKey],
            border: _ctx.border,
            readonly: _ctx.readonly,
            disabled: item[_ctx.disabledKey],
            key: index
          }, {
            default: vue.withCtx(() => [
              vue.createTextVNode(vue.toDisplayString(item[_ctx.labelKey]), 1 /* TEXT */)
            ]),
            _: 2 /* DYNAMIC */
          }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["value", "border", "readonly", "disabled"]))
        }), 128 /* KEYED_FRAGMENT */))
      ]),
      _: 1 /* STABLE */
    }, 8 /* PROPS */, ["modelValue", "size", "onClick", "disabled"])
  ], 2 /* CLASS */))
}

exports.render = render;
