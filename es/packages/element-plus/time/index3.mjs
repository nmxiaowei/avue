/*! Avue.js v3.9.4 | (c) 2017-2026 Smallwei | Released under the MIT License. */
import { openBlock, createElementBlock, normalizeClass, createBlock, resolveDynamicComponent } from 'vue';

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createElementBlock("div", {
    class: normalizeClass(_ctx.b())
  }, [
    (openBlock(), createBlock(resolveDynamicComponent(_ctx.componentName), {
      modelValue: _ctx.text,
      "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((_ctx.text) = $event)),
      "popper-class": _ctx.popperClass,
      "is-range": _ctx.isRange,
      size: _ctx.size,
      editable: _ctx.editable,
      "disabled-hours": _ctx.disabledHours,
      "disabled-minutes": _ctx.disabledMinutes,
      "disabled-seconds": _ctx.disabledSeconds,
      "default-value": _ctx.defaultValue,
      "range-separator": _ctx.rangeSeparator,
      onVisibleChange: _ctx.visibleChange,
      "arrow-control": _ctx.arrowControl,
      "start-placeholder": _ctx.startPlaceholder || _ctx.t('time.start'),
      "end-placeholder": _ctx.endPlaceholder || _ctx.t('time.end'),
      format: _ctx.format,
      readonly: _ctx.readonly,
      clearable: _ctx.clearableVal,
      start: _ctx.start,
      end: _ctx.end,
      step: _ctx.step,
      "max-time": _ctx.maxTime,
      "min-time": _ctx.minTime,
      "value-format": _ctx.valueFormat,
      placeholder: _ctx.placeholder,
      onClick: _ctx.handleClick,
      disabled: _ctx.disabled
    }, null, 40 /* PROPS, NEED_HYDRATION */, ["modelValue", "popper-class", "is-range", "size", "editable", "disabled-hours", "disabled-minutes", "disabled-seconds", "default-value", "range-separator", "onVisibleChange", "arrow-control", "start-placeholder", "end-placeholder", "format", "readonly", "clearable", "start", "end", "step", "max-time", "min-time", "value-format", "placeholder", "onClick", "disabled"]))
  ], 2 /* CLASS */))
}

export { render };
