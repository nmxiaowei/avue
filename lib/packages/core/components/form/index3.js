/*! Avue.js v3.9.0 | (c) 2017-2026 Smallwei | Released under the MIT License. */
'use strict';

var vue = require('vue');

const _hoisted_1 = ["innerHTML"];

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_custom = vue.resolveComponent("custom");

  return (vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
    ($props.render)
      ? (vue.openBlock(), vue.createBlock(_component_custom, {
          key: 0,
          render: $props.render,
          index: $props.index,
          row: $props.row,
          dic: $props.dic,
          column: $props.column,
          params: $options.params,
          event: $options.event
        }, null, 8 /* PROPS */, ["render", "index", "row", "dic", "column", "params", "event"]))
      : (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($options.getComponent($props.column)), vue.mergeProps({
          key: 1,
          modelValue: $options.text,
          "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => (($options.text) = $event))
        }, $options.getBind($props.column), { align: "left" }, vue.toHandlers($options.event), {
          column: Object.assign($props.column,$options.params),
          dic: $props.dic,
          clearValidate: $props.clearValidate,
          "box-type": $props.boxType,
          ref: "temp",
          disabled: $props.column.disabled || $props.disabled,
          readonly: $props.column.readonly || $props.readonly,
          placeholder: $props.boxType == 'view' ? '' : $options.getPlaceholder($props.column),
          props: $props.column.props || $props.props,
          propsHttp: $props.column.propsHttp || $props.propsHttp,
          size: $props.column.size || $props.size,
          "table-data": $props.tableData,
          type: $props.type || $props.column.type,
          "column-slot": $props.columnSlot,
          onKeyup: vue.withKeys($options.enterChange, ["enter"])
        }), vue.createSlots({ _: 2 /* DYNAMIC */ }, [
          (_ctx.$slots.default)
            ? {
                name: "default",
                fn: vue.withCtx((scope) => [
                  vue.renderSlot(_ctx.$slots, "default", vue.normalizeProps(vue.guardReactiveProps(scope)))
                ]),
                key: "0"
              }
            : ($options.params.html)
              ? {
                  name: "default",
                  fn: vue.withCtx(() => [
                    vue.createElementVNode("span", {
                      innerHTML: $options.params.html
                    }, null, 8 /* PROPS */, _hoisted_1)
                  ]),
                  key: "1"
                }
              : undefined,
          vue.renderList($props.columnSlot, (item) => {
            return {
              name: item,
              fn: vue.withCtx((scope) => [
                (!item.endsWith('-desc'))
                  ? vue.renderSlot(_ctx.$slots, item, vue.normalizeProps(vue.mergeProps({ key: 0 }, scope)))
                  : vue.createCommentVNode("v-if", true)
              ])
            }
          })
        ]), 1040 /* FULL_PROPS, DYNAMIC_SLOTS */, ["modelValue", "column", "dic", "clearValidate", "box-type", "disabled", "readonly", "placeholder", "props", "propsHttp", "size", "table-data", "type", "column-slot", "onKeyup"])),
    (!$props.render && $props.boxType !== 'view')
      ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 2 }, [
          ($props.columnSlot.includes($props.column.prop + '-desc'))
            ? vue.renderSlot(_ctx.$slots, $props.column.prop + '-desc', {
                key: 0,
                column: $props.column,
                description: $props.column.description,
                descClass: $props.column.descClass,
                size: $props.column.size || $props.size
              })
            : (vue.openBlock(), vue.createElementBlock("span", {
                key: 1,
                class: vue.normalizeClass($props.column.descClass ? $props.column.descClass : 'field-desc')
              }, vue.toDisplayString($props.column.description), 3 /* TEXT, CLASS */))
        ], 64 /* STABLE_FRAGMENT */))
      : vue.createCommentVNode("v-if", true)
  ], 64 /* STABLE_FRAGMENT */))
}

exports.render = render;
