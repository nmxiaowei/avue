/*! Avue.js v3.8.6 | (c) 2017-2026 Smallwei | Released under the MIT License. */
'use strict';

var vue = require('vue');

const _hoisted_1 = {
  key: 1,
  style: {"margin-left":"8px"}
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_tree_select = vue.resolveComponent("el-tree-select");

  return (vue.openBlock(), vue.createBlock(_component_el_tree_select, {
    ref: "tree",
    class: vue.normalizeClass(_ctx.b()),
    "cache-data": _ctx.cacheData,
    modelValue: _ctx.text,
    "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((_ctx.text) = $event)),
    loading: _ctx.loading,
    lazy: _ctx.lazy,
    load: _ctx.handleLoad,
    size: _ctx.size,
    onCheck: _ctx.checkChange,
    "filter-node-method": _ctx.filterNodeMethod,
    "render-after-expand": false,
    "loading-text": _ctx.loadingText,
    "collapse-tags": _ctx.tags,
    clearable: _ctx.clearableVal,
    placeholder: _ctx.placeholder,
    "popper-class": _ctx.popperClass,
    "popper-append-to-body": _ctx.popperAppendToBody,
    multiple: _ctx.multiple,
    "node-key": _ctx.valueKey,
    "show-checkbox": _ctx.multiple,
    filterable: _ctx.filterable,
    "check-strictly": _ctx.checkStrictly,
    disabled: _ctx.disabled,
    accordion: _ctx.accordion,
    "icon-class": _ctx.iconClass,
    indent: _ctx.indent,
    onFocus: _ctx.handleFocus,
    onBlur: _ctx.handleBlur,
    "check-on-click-leaf": _ctx.checkOnClickLeaf,
    "default-checked-keys": _ctx.keysList,
    "default-expanded-keys": _ctx.defaultExpandedKeys?_ctx.defaultExpandedKeys:_ctx.keysList,
    "default-expand-all": _ctx.defaultExpandAll,
    "check-on-click-node": _ctx.checkOnClickNode,
    "expand-on-click-node": _ctx.expandOnClickNode,
    onNodeClick: vue.withModifiers(_ctx.handleNodeClick, ["self"]),
    props: _ctx.treeProps,
    data: _ctx.netDic
  }, {
    default: vue.withCtx(({data,node}) => [
      (_ctx.$slots.default)
        ? vue.renderSlot(_ctx.$slots, "default", {
            key: 0,
            label: _ctx.labelKey,
            value: _ctx.valueKey,
            node: node,
            item: data
          })
        : (vue.openBlock(), vue.createElementBlock("span", _hoisted_1, [
            vue.createElementVNode("span", null, vue.toDisplayString(_ctx.getLabelText(data)), 1 /* TEXT */),
            (data[_ctx.descKey])
              ? (vue.openBlock(), vue.createElementBlock("span", {
                  key: 0,
                  class: vue.normalizeClass(_ctx.b('desc'))
                }, vue.toDisplayString(data[_ctx.descKey]), 3 /* TEXT, CLASS */))
              : vue.createCommentVNode("v-if", true)
          ]))
    ]),
    _: 3 /* FORWARDED */
  }, 8 /* PROPS */, ["class", "cache-data", "modelValue", "loading", "lazy", "load", "size", "onCheck", "filter-node-method", "loading-text", "collapse-tags", "clearable", "placeholder", "popper-class", "popper-append-to-body", "multiple", "node-key", "show-checkbox", "filterable", "check-strictly", "disabled", "accordion", "icon-class", "indent", "onFocus", "onBlur", "check-on-click-leaf", "default-checked-keys", "default-expanded-keys", "default-expand-all", "check-on-click-node", "expand-on-click-node", "onNodeClick", "props", "data"]))
}

exports.render = render;
