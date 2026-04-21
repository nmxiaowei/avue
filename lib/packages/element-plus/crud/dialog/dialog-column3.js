/*! Avue.js v3.8.6 | (c) 2017-2026 Smallwei | Released under the MIT License. */
'use strict';

var vue = require('vue');

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_table_column = vue.resolveComponent("el-table-column");
  const _component_el_checkbox = vue.resolveComponent("el-checkbox");
  const _component_el_table = vue.resolveComponent("el-table");
  const _component_el_drawer = vue.resolveComponent("el-drawer");

  return (_ctx.columnBox)
    ? (vue.openBlock(), vue.createBlock(_component_el_drawer, {
        key: 0,
        "append-to-body": _ctx.$AVUE.appendToBody,
        "lock-scroll": "",
        class: vue.normalizeClass(['avue-dialog',_ctx.b('column')].join(' ')),
        title: _ctx.t('crud.showTitle'),
        size: _ctx.crud.isMobile?'100%':'40%',
        modelValue: _ctx.columnBox,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((_ctx.columnBox) = $event))
      }, {
        default: vue.withCtx(() => [
          vue.createVNode(_component_el_table, {
            data: _ctx.data,
            ref: "table",
            height: "100%",
            size: _ctx.crud.size,
            border: ""
          }, {
            default: vue.withCtx(() => [
              vue.createVNode(_component_el_table_column, {
                align: "center",
                width: "100",
                "header-align": "center",
                prop: "label",
                key: "label",
                label: _ctx.t('crud.column.name')
              }, null, 8 /* PROPS */, ["label"]),
              (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.defaultColumn, (item, index) => {
                return (vue.openBlock(), vue.createElementBlock(vue.Fragment, {
                  key: item.prop
                }, [
                  (item.hide!==true)
                    ? (vue.openBlock(), vue.createBlock(_component_el_table_column, {
                        key: 0,
                        label: item.label,
                        prop: item.prop,
                        align: "center",
                        "header-align": "center"
                      }, {
                        default: vue.withCtx(({row}) => [
                          vue.createVNode(_component_el_checkbox, {
                            onChange: $event => (_ctx.handleChange(item.prop)),
                            modelValue: _ctx.crud.objectOption[row.prop][item.prop],
                            "onUpdate:modelValue": $event => ((_ctx.crud.objectOption[row.prop][item.prop]) = $event)
                          }, null, 8 /* PROPS */, ["onChange", "modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 2 /* DYNAMIC */
                      }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["label", "prop"]))
                    : vue.createCommentVNode("v-if", true)
                ], 64 /* STABLE_FRAGMENT */))
              }), 128 /* KEYED_FRAGMENT */))
            ]),
            _: 1 /* STABLE */
          }, 8 /* PROPS */, ["data", "size"])
        ]),
        _: 1 /* STABLE */
      }, 8 /* PROPS */, ["append-to-body", "class", "title", "size", "modelValue"]))
    : vue.createCommentVNode("v-if", true)
}

exports.render = render;
