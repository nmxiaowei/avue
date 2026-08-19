/*! Avue.js v3.9.4 | (c) 2017-2026 Smallwei | Released under the MIT License. */
import { resolveComponent, openBlock, createBlock, normalizeClass, createSlots, withCtx, createElementVNode, toDisplayString } from 'vue';

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_input_number = resolveComponent("el-input-number");

  return (openBlock(), createBlock(_component_el_input_number, {
    modelValue: _ctx.text,
    "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => ((_ctx.text) = $event)),
    class: normalizeClass(_ctx.b()),
    onClick: _ctx.handleClick,
    onFocus: _ctx.handleFocus,
    onBlur: _ctx.handleBlur,
    precision: _ctx.precision,
    placeholder: _ctx.placeholder,
    "step-strictly": _ctx.stepStrictly,
    size: _ctx.size,
    min: _ctx.min,
    align: _ctx.align,
    max: _ctx.max,
    step: _ctx.step,
    clearable: _ctx.clearableVal,
    readonly: _ctx.readonly,
    "controls-position": _ctx.controlsPosition,
    controls: _ctx.controls,
    "disabled-scientific": _ctx.disabledScientific,
    disabled: _ctx.disabled
  }, createSlots({ _: 2 /* DYNAMIC */ }, [
    (_ctx.prefix)
      ? {
          name: "prefix",
          fn: withCtx(() => [
            createElementVNode("span", {
              onClick: _cache[0] || (_cache[0] = $event => (_ctx.prefixClick(_ctx.text)))
            }, toDisplayString(_ctx.prefix), 1 /* TEXT */)
          ]),
          key: "0"
        }
      : undefined,
    (_ctx.suffix)
      ? {
          name: "suffix",
          fn: withCtx(() => [
            createElementVNode("span", {
              onClick: _cache[1] || (_cache[1] = $event => (_ctx.suffixClick(_ctx.text)))
            }, toDisplayString(_ctx.suffix), 1 /* TEXT */)
          ]),
          key: "1"
        }
      : undefined
  ]), 1032 /* PROPS, DYNAMIC_SLOTS */, ["modelValue", "class", "onClick", "onFocus", "onBlur", "precision", "placeholder", "step-strictly", "size", "min", "align", "max", "step", "clearable", "readonly", "controls-position", "controls", "disabled-scientific", "disabled"]))
}

export { render };
