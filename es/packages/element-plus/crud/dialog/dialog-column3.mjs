/*! Avue.js v3.9.2 | (c) 2017-2026 Smallwei | Released under the MIT License. */
import { resolveComponent, openBlock, createBlock, normalizeClass, createSlots, withCtx, createVNode, createElementBlock, Fragment, renderList, createCommentVNode, createTextVNode, toDisplayString } from 'vue';

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_table_column = resolveComponent("el-table-column");
  const _component_el_checkbox = resolveComponent("el-checkbox");
  const _component_el_table = resolveComponent("el-table");
  const _component_el_button = resolveComponent("el-button");
  const _component_el_drawer = resolveComponent("el-drawer");

  return (_ctx.columnBox)
    ? (openBlock(), createBlock(_component_el_drawer, {
        key: 0,
        "append-to-body": _ctx.$AVUE.appendToBody,
        "lock-scroll": "",
        class: normalizeClass(['avue-dialog',_ctx.b('column')].join(' ')),
        title: _ctx.t('crud.showTitle'),
        size: _ctx.crud.isMobile?'100%':'40%',
        modelValue: _ctx.columnBox,
        "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => ((_ctx.columnBox) = $event))
      }, createSlots({
        default: withCtx(() => [
          createVNode(_component_el_table, {
            data: _ctx.data,
            ref: "table",
            height: "100%",
            size: _ctx.crud.size,
            border: ""
          }, {
            default: withCtx(() => [
              createVNode(_component_el_table_column, {
                align: "center",
                width: "100",
                "header-align": "center",
                prop: "label",
                key: "label",
                label: _ctx.t('crud.column.name')
              }, null, 8 /* PROPS */, ["label"]),
              (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.defaultColumn, (item, index) => {
                return (openBlock(), createElementBlock(Fragment, {
                  key: item.prop
                }, [
                  (item.hide!==true)
                    ? (openBlock(), createBlock(_component_el_table_column, {
                        key: 0,
                        label: item.label,
                        prop: item.prop,
                        align: "center",
                        "header-align": "center"
                      }, {
                        default: withCtx(({row}) => [
                          createVNode(_component_el_checkbox, {
                            onChange: $event => (_ctx.handleChange(item.prop)),
                            modelValue: _ctx.crud.objectOption[row.prop][item.prop],
                            "onUpdate:modelValue": $event => ((_ctx.crud.objectOption[row.prop][item.prop]) = $event)
                          }, null, 8 /* PROPS */, ["onChange", "modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 2 /* DYNAMIC */
                      }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["label", "prop"]))
                    : createCommentVNode("v-if", true)
                ], 64 /* STABLE_FRAGMENT */))
              }), 128 /* KEYED_FRAGMENT */))
            ]),
            _: 1 /* STABLE */
          }, 8 /* PROPS */, ["data", "size"])
        ]),
        _: 2 /* DYNAMIC */
      }, [
        (_ctx.crud.columnStateEnabled)
          ? {
              name: "footer",
              fn: withCtx(() => [
                createVNode(_component_el_button, {
                  size: _ctx.crud.size,
                  onClick: _cache[0] || (_cache[0] = $event => (_ctx.crud.resetColumnState()))
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(_ctx.t('crud.column.reset')), 1 /* TEXT */)
                  ]),
                  _: 1 /* STABLE */
                }, 8 /* PROPS */, ["size"])
              ]),
              key: "0"
            }
          : undefined
      ]), 1032 /* PROPS, DYNAMIC_SLOTS */, ["append-to-body", "class", "title", "size", "modelValue"]))
    : createCommentVNode("v-if", true)
}

export { render };
