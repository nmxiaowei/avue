/*! Avue.js v3.8.6 | (c) 2017-2026 Smallwei | Released under the MIT License. */
import { resolveComponent, openBlock, createElementBlock, normalizeClass, createVNode, withCtx, createElementVNode, createTextVNode, toDisplayString } from 'vue';

const _hoisted_1 = { class: "avue-dialog__footer" };

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_input = resolveComponent("el-input");
  const _component_avue_crud = resolveComponent("avue-crud");
  const _component_el_button = resolveComponent("el-button");
  const _component_el_dialog = resolveComponent("el-dialog");

  return (openBlock(), createElementBlock("div", {
    class: normalizeClass(_ctx.b())
  }, [
    createVNode(_component_el_input, {
      "prefix-icon": _ctx.prefixIcon,
      "suffix-icon": _ctx.suffixIcon,
      size: _ctx.size,
      "model-value": _ctx.labelShow,
      clearable: _ctx.disabled ? false : _ctx.clearable,
      placeholder: _ctx.placeholder,
      ref: "main",
      onClear: _ctx.handleClear,
      onFocus: _ctx.handleShow,
      onClick: _ctx.handleClick,
      disabled: _ctx.disabled
    }, null, 8 /* PROPS */, ["prefix-icon", "suffix-icon", "size", "model-value", "clearable", "placeholder", "onClear", "onFocus", "onClick", "disabled"]),
    createVNode(_component_el_dialog, {
      class: normalizeClass(["avue-dialog", _ctx.b()]),
      width: _ctx.dialogWidth,
      "before-close": _ctx.handelBeforeClose,
      "append-to-body": _ctx.$AVUE.appendToBody,
      "lock-scroll": "",
      "destroy-on-close": "",
      title: _ctx.placeholder,
      modelValue: _ctx.box,
      "onUpdate:modelValue": _cache[3] || (_cache[3] = $event => ((_ctx.box) = $event))
    }, {
      default: withCtx(() => [
        createVNode(_component_avue_crud, {
          class: normalizeClass(_ctx.b('crud')),
          ref: "crud",
          option: _ctx.option,
          data: _ctx.data,
          "table-loading": _ctx.loading,
          onOnLoad: _ctx.onList,
          onSearchChange: _ctx.handleSearchChange,
          onSearchReset: _ctx.handleSearchChange,
          onSelectAll: _ctx.handleSelectionAllChange,
          onSelect: _ctx.handleSelectionChange,
          rowClassName: _ctx.handleRowClassName,
          onCurrentRowChange: _ctx.handleCurrentChange,
          search: _ctx.search,
          "onUpdate:search": _cache[0] || (_cache[0] = $event => ((_ctx.search) = $event)),
          page: _ctx.page,
          "onUpdate:page": _cache[1] || (_cache[1] = $event => ((_ctx.page) = $event))
        }, null, 8 /* PROPS */, ["class", "option", "data", "table-loading", "onOnLoad", "onSearchChange", "onSearchReset", "onSelectAll", "onSelect", "rowClassName", "onCurrentRowChange", "search", "page"]),
        createElementVNode("span", _hoisted_1, [
          createVNode(_component_el_button, {
            type: "primary",
            size: _ctx.size,
            icon: "el-icon-check",
            onClick: _cache[2] || (_cache[2] = $event => (_ctx.handleSubmit()))
          }, {
            default: withCtx(() => [
              createTextVNode(toDisplayString(_ctx.t("common.submitBtn")), 1 /* TEXT */)
            ]),
            _: 1 /* STABLE */
          }, 8 /* PROPS */, ["size"])
        ])
      ]),
      _: 1 /* STABLE */
    }, 8 /* PROPS */, ["class", "width", "before-close", "append-to-body", "title", "modelValue"])
  ], 2 /* CLASS */))
}

export { render };
