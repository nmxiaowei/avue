/*! Avue.js v3.8.6 | (c) 2017-2026 Smallwei | Released under the MIT License. */
import { resolveComponent, openBlock, createElementBlock, normalizeClass, createBlock, withCtx, createTextVNode, toDisplayString, createCommentVNode, createVNode, Fragment, renderList, resolveDynamicComponent } from 'vue';

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_checkbox = resolveComponent("el-checkbox");
  const _component_el_checkbox_group = resolveComponent("el-checkbox-group");

  return (openBlock(), createElementBlock("div", {
    class: normalizeClass(_ctx.b())
  }, [
    (_ctx.all)
      ? (openBlock(), createBlock(_component_el_checkbox, {
          key: 0,
          class: normalizeClass(_ctx.b('all')),
          disabled: _ctx.disabled,
          indeterminate: _ctx.isIndeterminate,
          modelValue: _ctx.checkAll,
          "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((_ctx.checkAll) = $event)),
          onChange: _ctx.handleCheckAll
        }, {
          default: withCtx(() => [
            createTextVNode(toDisplayString(_ctx.t('check.checkAll')), 1 /* TEXT */)
          ]),
          _: 1 /* STABLE */
        }, 8 /* PROPS */, ["class", "disabled", "indeterminate", "modelValue", "onChange"]))
      : createCommentVNode("v-if", true),
    createVNode(_component_el_checkbox_group, {
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
      default: withCtx(() => [
        (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.dic, (item, index) => {
          return (openBlock(), createBlock(resolveDynamicComponent(_ctx.componentName), {
            border: _ctx.border,
            size: _ctx.size,
            value: item[_ctx.valueKey],
            readonly: _ctx.readonly,
            disabled: item[_ctx.disabledKey],
            key: index
          }, {
            default: withCtx(() => [
              createTextVNode(toDisplayString(item[_ctx.labelKey]), 1 /* TEXT */)
            ]),
            _: 2 /* DYNAMIC */
          }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["border", "size", "value", "readonly", "disabled"]))
        }), 128 /* KEYED_FRAGMENT */))
      ]),
      _: 1 /* STABLE */
    }, 8 /* PROPS */, ["modelValue", "onChange", "disabled", "size", "fill", "text-color", "min", "max", "onClick"])
  ], 2 /* CLASS */))
}

export { render };
