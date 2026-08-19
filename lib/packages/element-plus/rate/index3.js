/*! Avue.js v3.9.4 | (c) 2017-2026 Smallwei | Released under the MIT License. */
'use strict';

var vue = require('vue');

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_rate = vue.resolveComponent("el-rate");

  return (vue.openBlock(), vue.createBlock(_component_el_rate, {
    modelValue: _ctx.text,
    "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((_ctx.text) = $event)),
    onClick: _ctx.handleClick,
    max: _ctx.max,
    readonly: _ctx.readonly,
    texts: _ctx.texts,
    "show-text": _ctx.showText,
    "icon-classes": _ctx.iconClasses,
    "void-icon-class": _ctx.voidIconClass,
    disabled: _ctx.disabled,
    colors: _ctx.colors
  }, null, 8 /* PROPS */, ["modelValue", "onClick", "max", "readonly", "texts", "show-text", "icon-classes", "void-icon-class", "disabled", "colors"]))
}

exports.render = render;
