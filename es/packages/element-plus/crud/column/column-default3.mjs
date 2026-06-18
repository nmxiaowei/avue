/*! Avue.js v3.9.2 | (c) 2017-2026 Smallwei | Released under the MIT License. */
import { openBlock, createElementBlock, Fragment, createCommentVNode, createBlock, resolveDynamicComponent, withCtx, renderSlot, createTextVNode, toDisplayString } from 'vue';

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createElementBlock(Fragment, null, [
    createCommentVNode(" 折叠面板  "),
    (_ctx.crud.tableOption.expand)
      ? (openBlock(), createBlock(resolveDynamicComponent(_ctx.crud.tableColumnName), {
          key: 0,
          type: "expand",
          "class-name": _ctx.crud.tableOption.expandClassName,
          "label-class-name": _ctx.crud.tableOption.expandLabelClassName,
          width: _ctx.crud.tableOption.expandWidth || _ctx.config.expandWidth,
          fixed: _ctx.validData(_ctx.crud.tableOption.expandFixed,_ctx.config.expandFixed),
          align: "center"
        }, {
          default: withCtx(({row}) => [
            renderSlot(_ctx.$slots, "expand", {
              row: row,
              index: row.$index
            })
          ]),
          _: 3 /* FORWARDED */
        }, 8 /* PROPS */, ["class-name", "label-class-name", "width", "fixed"]))
      : createCommentVNode("v-if", true),
    createCommentVNode(" 选择框 "),
    (_ctx.crud.tableOption.selection)
      ? (openBlock(), createBlock(resolveDynamicComponent(_ctx.crud.tableColumnName), {
          key: 1,
          fixed: _ctx.validData(_ctx.crud.tableOption.selectionFixed,_ctx.config.selectionFixed),
          type: "selection",
          "class-name": _ctx.crud.tableOption.selectionClassName,
          "label-class-name": _ctx.crud.tableOption.selectionLabelClassName,
          selectable: _ctx.crud.tableOption.selectable,
          "reserve-selection": _ctx.validData(_ctx.crud.tableOption.reserveSelection),
          width: _ctx.crud.tableOption.selectionWidth || _ctx.config.selectionWidth,
          align: "center"
        }, null, 8 /* PROPS */, ["fixed", "class-name", "label-class-name", "selectable", "reserve-selection", "width"]))
      : createCommentVNode("v-if", true),
    createCommentVNode(" 序号 "),
    (_ctx.validData(_ctx.crud.tableOption.index))
      ? (openBlock(), createBlock(resolveDynamicComponent(_ctx.crud.tableColumnName), {
          key: 2,
          fixed: _ctx.validData(_ctx.crud.tableOption.indexFixed,_ctx.config.indexFixed),
          label: _ctx.crud.tableOption.indexLabel || _ctx.config.indexLabel,
          type: "index",
          "class-name": _ctx.crud.tableOption.indexClassName,
          "label-class-name": _ctx.crud.tableOption.indexLabelClassName,
          width: _ctx.crud.tableOption.indexWidth || _ctx.config.indexWidth,
          index: _ctx.indexMethod,
          align: "center"
        }, {
          default: withCtx(({$index}) => [
            createTextVNode(toDisplayString(_ctx.indexMethod($index)), 1 /* TEXT */)
          ]),
          _: 1 /* STABLE */
        }, 8 /* PROPS */, ["fixed", "label", "class-name", "label-class-name", "width", "index"]))
      : createCommentVNode("v-if", true)
  ], 64 /* STABLE_FRAGMENT */))
}

export { render };
