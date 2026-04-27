/*! Avue.js v3.9.1 | (c) 2017-2026 Smallwei | Released under the MIT License. */
'use strict';

var vue = require('vue');

const _hoisted_1 = { key: 1 };

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_cascader = vue.resolveComponent("el-cascader");

  return (vue.openBlock(), vue.createBlock(_component_el_cascader, {
    ref: "cascader",
    options: _ctx.dic,
    class: vue.normalizeClass(_ctx.b()),
    onClick: _ctx.handleClick,
    onChange: _ctx.handleValueChange,
    modelValue: _ctx.text,
    "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((_ctx.text) = $event)),
    placeholder: _ctx.placeholder,
    props: _ctx.allProps,
    size: _ctx.size,
    effect: _ctx.effect,
    clearable: _ctx.clearableVal,
    "show-all-levels": _ctx.showAllLevels,
    filterable: _ctx.filterable,
    "popper-class": _ctx.popperClass,
    separator: _ctx.separator,
    disabled: _ctx.disabled,
    "show-checked-strategy": _ctx.showCheckedStrategy,
    "collapse-tags": _ctx.tags || _ctx.collapseTags,
    "collapse-tags-tooltip": _ctx.collapseTagsTooltip,
    "max-collapse-tags": _ctx.maxCollapseTags,
    onFocus: _ctx.handleFocus,
    onBlur: _ctx.handleBlur
  }, {
    default: vue.withCtx(({ data, node }) => [
      (_ctx.$slots.default)
        ? vue.renderSlot(_ctx.$slots, "default", {
            key: 0,
            data: data,
            node: node
          })
        : (vue.openBlock(), vue.createElementBlock("span", _hoisted_1, vue.toDisplayString(data[_ctx.labelKey]), 1 /* TEXT */))
    ]),
    _: 3 /* FORWARDED */
  }, 8 /* PROPS */, ["options", "class", "onClick", "onChange", "modelValue", "placeholder", "props", "size", "effect", "clearable", "show-all-levels", "filterable", "popper-class", "separator", "disabled", "show-checked-strategy", "collapse-tags", "collapse-tags-tooltip", "max-collapse-tags", "onFocus", "onBlur"]))
}

exports.render = render;
