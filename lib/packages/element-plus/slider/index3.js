/*! Avue.js v3.9.1 | (c) 2017-2026 Smallwei | Released under the MIT License. */
'use strict';

var vue = require('vue');

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_slider = vue.resolveComponent("el-slider");

  return (vue.openBlock(), vue.createBlock(_component_el_slider, {
    modelValue: _ctx.text,
    "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((_ctx.text) = $event)),
    disabled: _ctx.disabled,
    vertical: _ctx.vertical,
    height: _ctx.setPx(_ctx.height),
    step: _ctx.step,
    min: _ctx.min,
    max: _ctx.max,
    range: _ctx.range,
    "show-stops": _ctx.showStops,
    "show-input": _ctx.showInput,
    marks: _ctx.marks,
    "format-tooltip": _ctx.formatTooltip,
    onClick: _ctx.handleClick
  }, null, 8 /* PROPS */, ["modelValue", "disabled", "vertical", "height", "step", "min", "max", "range", "show-stops", "show-input", "marks", "format-tooltip", "onClick"]))
}

exports.render = render;
