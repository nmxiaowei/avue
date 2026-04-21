/*! Avue.js v3.8.6 | (c) 2017-2026 Smallwei | Released under the MIT License. */
import { resolveComponent, openBlock, createBlock, normalizeClass, withCtx, createVNode, createElementBlock, Fragment, renderList, createCommentVNode } from 'vue';

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_table_column = resolveComponent("el-table-column");
  const _component_el_checkbox = resolveComponent("el-checkbox");
  const _component_el_table = resolveComponent("el-table");
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
        "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((_ctx.columnBox) = $event))
      }, {
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
        _: 1 /* STABLE */
      }, 8 /* PROPS */, ["append-to-body", "class", "title", "size", "modelValue"]))
    : createCommentVNode("v-if", true)
}

export { render };
