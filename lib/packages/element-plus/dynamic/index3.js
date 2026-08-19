/*! Avue.js v3.9.4 | (c) 2017-2026 Smallwei | Released under the MIT License. */
'use strict';

var vue = require('vue');

const _hoisted_1 = ["onMouseenter", "onMouseleave"];
const _hoisted_2 = { key: 1 };

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_button = vue.resolveComponent("el-button");
  const _component_avue_form = vue.resolveComponent("avue-form");
  const _component_avue_crud = vue.resolveComponent("avue-crud");

  return (vue.openBlock(), vue.createElementBlock("div", {
    class: vue.normalizeClass(_ctx.b()),
    key: _ctx.reload
  }, [
    (_ctx.isForm)
      ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 0 }, [
          vue.createElementVNode("div", {
            class: vue.normalizeClass(_ctx.b('header'))
          }, [
            (!_ctx.readonly && !_ctx.disabled && !_ctx.addBtn)
              ? (vue.openBlock(), vue.createBlock(_component_el_button, {
                  key: 0,
                  size: _ctx.size,
                  circle: "",
                  disabled: _ctx.disabled,
                  type: "primary",
                  icon: "el-icon-plus",
                  onClick: _ctx.addRow
                }, null, 8 /* PROPS */, ["size", "disabled", "onClick"]))
              : vue.createCommentVNode("v-if", true)
          ], 2 /* CLASS */),
          vue.createElementVNode("div", null, [
            (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.text, (item, index) => {
              return (vue.openBlock(), vue.createElementBlock("div", {
                class: vue.normalizeClass(_ctx.b('row')),
                key: index,
                onMouseenter: $event => (_ctx.cellMouseenter({$index:index})),
                onMouseleave: $event => (_ctx.cellMouseLeave({$index:index}))
              }, [
                (!_ctx.readonly && !_ctx.disabled  && !_ctx.delBtn && _ctx.hoverList[index])
                  ? (vue.openBlock(), vue.createBlock(_component_el_button, {
                      key: 0,
                      onClick: $event => (_ctx.delRow(item.$index)),
                      type: "danger",
                      class: vue.normalizeClass(_ctx.b('menu')),
                      size: _ctx.size,
                      disabled: _ctx.disabled,
                      icon: "el-icon-delete",
                      circle: ""
                    }, null, 8 /* PROPS */, ["onClick", "class", "size", "disabled"]))
                  : vue.createCommentVNode("v-if", true),
                (vue.openBlock(), vue.createBlock(_component_avue_form, vue.mergeProps({
                  key: index,
                  ref_for: true,
                  ref: "main",
                  "table-data": {row:_ctx.text[index],index},
                  option: _ctx.option
                }, _ctx.$uploadFun(null,this), {
                  modelValue: _ctx.text[index],
                  "onUpdate:modelValue": $event => ((_ctx.text[index]) = $event)
                }), vue.createSlots({
                  index: vue.withCtx(({}) => [
                    vue.createElementVNode("span", null, vue.toDisplayString(item.$index+1), 1 /* TEXT */)
                  ]),
                  _: 2 /* DYNAMIC */
                }, [
                  vue.renderList(_ctx.columnSlot, (item) => {
                    return {
                      name: item,
                      fn: vue.withCtx((scope) => [
                        vue.renderSlot(_ctx.$slots, item, vue.mergeProps({ ref_for: true }, Object.assign(scope,{
                  row:_ctx.text[index]
                })))
                      ])
                    }
                  })
                ]), 1040 /* FULL_PROPS, DYNAMIC_SLOTS */, ["table-data", "option", "modelValue", "onUpdate:modelValue"]))
              ], 42 /* CLASS, PROPS, NEED_HYDRATION */, _hoisted_1))
            }), 128 /* KEYED_FRAGMENT */))
          ])
        ], 64 /* STABLE_FRAGMENT */))
      : (_ctx.isCrud)
        ? (vue.openBlock(), vue.createBlock(_component_avue_crud, vue.mergeProps({
            key: 1,
            ref: "main",
            option: _ctx.option,
            disabled: _ctx.disabled
          }, _ctx.$uploadFun(null,this), {
            onCellMouseEnter: _ctx.cellMouseenter,
            onCellMouseLeave: _ctx.cellMouseLeave,
            onSelectionChange: _ctx.handleSelectionChange,
            onSortableChange: _ctx.handleSortableChange,
            data: _ctx.text
          }), vue.createSlots({
            "index-header": vue.withCtx(({}) => [
              (!(_ctx.addBtn || _ctx.readonly) && _ctx.maxFlag)
                ? (vue.openBlock(), vue.createBlock(_component_el_button, {
                    key: 0,
                    onClick: _cache[0] || (_cache[0] = $event => (_ctx.addRow())),
                    type: "primary",
                    size: _ctx.size,
                    disabled: _ctx.disabled,
                    icon: "el-icon-plus",
                    circle: ""
                  }, null, 8 /* PROPS */, ["size", "disabled"]))
                : vue.createCommentVNode("v-if", true)
            ]),
            index: vue.withCtx((scope) => [
              (!_ctx.readonly && !_ctx.disabled  && !_ctx.delBtn && _ctx.hoverList[scope.row.$index])
                ? (vue.openBlock(), vue.createBlock(_component_el_button, {
                    key: 0,
                    onClick: $event => (_ctx.delRow(scope.row.$index)),
                    type: "danger",
                    size: _ctx.size,
                    disabled: _ctx.disabled,
                    icon: "el-icon-delete",
                    circle: ""
                  }, null, 8 /* PROPS */, ["onClick", "size", "disabled"]))
                : (vue.openBlock(), vue.createElementBlock("div", _hoisted_2, vue.toDisplayString(scope.row.$index+1), 1 /* TEXT */))
            ]),
            _: 2 /* DYNAMIC */
          }, [
            vue.renderList(_ctx.columnSlot, (item) => {
              return {
                name: _ctx.getSlotName({prop:item},`F`),
                fn: vue.withCtx((scope) => [
                  vue.renderSlot(_ctx.$slots, item, vue.normalizeProps(vue.guardReactiveProps(scope)))
                ])
              }
            })
          ]), 1040 /* FULL_PROPS, DYNAMIC_SLOTS */, ["option", "disabled", "onCellMouseEnter", "onCellMouseLeave", "onSelectionChange", "onSortableChange", "data"]))
        : vue.createCommentVNode("v-if", true)
  ], 2 /* CLASS */))
}

exports.render = render;
