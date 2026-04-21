/*! Avue.js v3.8.6 | (c) 2017-2026 Smallwei | Released under the MIT License. */
'use strict';

var vue = require('vue');

const _hoisted_1 = { class: "el-date-table-cell" };
const _hoisted_2 = {
  key: 1,
  class: "el-date-table-cell__text"
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_date_picker = vue.resolveComponent("el-date-picker");

  return (vue.openBlock(), vue.createElementBlock("div", {
    class: vue.normalizeClass(_ctx.b())
  }, [
    vue.createVNode(_component_el_date_picker, {
      type: _ctx.type,
      modelValue: _ctx.text,
      "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((_ctx.text) = $event)),
      "popper-class": _ctx.popperClass,
      size: _ctx.size,
      "cell-class-name": _ctx.cellClassName,
      editable: _ctx.editable,
      "unlink-panels": _ctx.unlinkPanels,
      "default-value": _ctx.defaultValue,
      "default-time": _ctx.defaultTime,
      "range-separator": _ctx.rangeSeparator,
      "start-placeholder": _ctx.startPlaceholder || _ctx.t('date.start'),
      "end-placeholder": _ctx.endPlaceholder || _ctx.t('date.end'),
      format: _ctx.format,
      clearable: _ctx.clearableVal,
      shortcuts: _ctx.shortcuts,
      "disabled-date": _ctx.disabledDate,
      "disabled-hours": _ctx.disabledHours,
      "disabled-minutes": _ctx.disabledMinutes,
      "disabled-seconds": _ctx.disabledSeconds,
      "value-format": _ctx.valueFormat,
      placeholder: _ctx.placeholder,
      "prefix-icon": _ctx.prefixIcon,
      "show-now": _ctx.showNow,
      onBlur: _ctx.handleBlur,
      onFocus: _ctx.handleFocus,
      onClick: _ctx.handleClick,
      readonly: _ctx.readonly,
      disabled: _ctx.disabled
    }, {
      default: vue.withCtx((cell) => [
        vue.createElementVNode("div", _hoisted_1, [
          (_ctx.$slots.default)
            ? vue.renderSlot(_ctx.$slots, "default", {
                key: 0,
                item: cell
              })
            : (vue.openBlock(), vue.createElementBlock("span", _hoisted_2, vue.toDisplayString(cell.renderText || cell.text), 1 /* TEXT */))
        ])
      ]),
      _: 3 /* FORWARDED */
    }, 8 /* PROPS */, ["type", "modelValue", "popper-class", "size", "cell-class-name", "editable", "unlink-panels", "default-value", "default-time", "range-separator", "start-placeholder", "end-placeholder", "format", "clearable", "shortcuts", "disabled-date", "disabled-hours", "disabled-minutes", "disabled-seconds", "value-format", "placeholder", "prefix-icon", "show-now", "onBlur", "onFocus", "onClick", "readonly", "disabled"])
  ], 2 /* CLASS */))
}

exports.render = render;
