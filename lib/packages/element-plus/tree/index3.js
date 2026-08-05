/*! Avue.js v3.9.3 | (c) 2017-2026 Smallwei | Released under the MIT License. */
'use strict';

var vue = require('vue');

const _hoisted_1 = { class: "el-tree-node__label" };

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_button = vue.resolveComponent("el-button");
  const _component_el_input = vue.resolveComponent("el-input");
  const _component_el_scrollbar = vue.resolveComponent("el-scrollbar");
  const _component_avue_form = vue.resolveComponent("avue-form");
  const _component_el_dialog = vue.resolveComponent("el-dialog");
  const _directive_permission = vue.resolveDirective("permission");
  const _directive_loading = vue.resolveDirective("loading");

  return (vue.openBlock(), vue.createElementBlock("div", {
    class: vue.normalizeClass(_ctx.b())
  }, [
    (_ctx.validData(_ctx.option.filter,true))
      ? (vue.openBlock(), vue.createElementBlock("div", {
          key: 0,
          class: vue.normalizeClass(_ctx.b('filter'))
        }, [
          vue.createVNode(_component_el_input, {
            placeholder: _ctx.validData(_ctx.option.filterText, _ctx.t('tree.filterPlaceholder')),
            size: _ctx.size,
            modelValue: _ctx.filterValue,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((_ctx.filterValue) = $event))
          }, vue.createSlots({ _: 2 /* DYNAMIC */ }, [
            (_ctx.validData(_ctx.option.addBtn,true))
              ? {
                  name: "append",
                  fn: vue.withCtx(() => [
                    (_ctx.$slots['add-btn'])
                      ? vue.renderSlot(_ctx.$slots, "add-btn", { key: 0 })
                      : vue.withDirectives((vue.openBlock(), vue.createBlock(_component_el_button, {
                          key: 1,
                          size: _ctx.size,
                          onClick: _ctx.parentAdd,
                          icon: "el-icon-plus"
                        }, null, 8 /* PROPS */, ["size", "onClick"])), [
                          [_directive_permission, _ctx.getPermission('addBtn')]
                        ])
                  ]),
                  key: "0"
                }
              : undefined
          ]), 1032 /* PROPS, DYNAMIC_SLOTS */, ["placeholder", "size", "modelValue"])
        ], 2 /* CLASS */))
      : vue.createCommentVNode("v-if", true),
    vue.createVNode(_component_el_scrollbar, {
      class: vue.normalizeClass(_ctx.b('content'))
    }, {
      default: vue.withCtx(() => [
        vue.withDirectives((vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.componentName), {
          ref: "tree",
          data: _ctx.data,
          lazy: _ctx.lazy,
          load: _ctx.treeLoad,
          draggable: _ctx.option.draggable,
          height: _ctx.option.height,
          props: _ctx.treeProps,
          "icon-class": _ctx.iconClass,
          indent: _ctx.indent,
          "highlight-current": !_ctx.multiple,
          "show-checkbox": _ctx.multiple,
          accordion: _ctx.accordion,
          "node-key": _ctx.valueKey,
          "check-strictly": _ctx.checkStrictly,
          "check-on-click-node": _ctx.checkOnClickNode,
          "filter-node-method": _ctx.filterNode,
          "check-on-click-leaf": _ctx.checkOnClickLeaf,
          "expand-on-click-node": _ctx.expandOnClickNode,
          onCheckChange: _ctx.handleCheckChange,
          onNodeClick: _ctx.nodeClick,
          onNodeExpand: _ctx.nodeExpand,
          onNodeDragStart: _ctx.handleDragStart,
          onNodeDragEnter: _ctx.handleDragEnter,
          onNodeDragLeave: _ctx.handleDragLeave,
          onNodeDragOver: _ctx.handleDragOver,
          onNodeDragEnd: _ctx.handleDragEnd,
          onNodeDrop: _ctx.handleDrop,
          "allow-drop": _ctx.option.allowDrop,
          "allow-drag": _ctx.option.allowDrag,
          onNodeContextmenu: _ctx.nodeContextmenu,
          "default-expand-all": _ctx.defaultExpandAll,
          "default-expanded-keys": _ctx.defaultExpandedKeys
        }, vue.createSlots({ _: 2 /* DYNAMIC */ }, [
          (_ctx.$slots.default)
            ? {
                name: "default",
                fn: vue.withCtx(({ node, data }) => [
                  vue.renderSlot(_ctx.$slots, "default", {
                    node: node,
                    data: data
                  })
                ]),
                key: "0"
              }
            : {
                name: "default",
                fn: vue.withCtx(({ node }) => [
                  vue.renderSlot(_ctx.$slots, "default", {
                    node: node,
                    data: _ctx.data
                  }),
                  vue.createElementVNode("span", _hoisted_1, vue.toDisplayString(node.label), 1 /* TEXT */)
                ]),
                key: "1"
              }
        ]), 1064 /* PROPS, NEED_HYDRATION, DYNAMIC_SLOTS */, ["data", "lazy", "load", "draggable", "height", "props", "icon-class", "indent", "highlight-current", "show-checkbox", "accordion", "node-key", "check-strictly", "check-on-click-node", "filter-node-method", "check-on-click-leaf", "expand-on-click-node", "onCheckChange", "onNodeClick", "onNodeExpand", "onNodeDragStart", "onNodeDragEnter", "onNodeDragLeave", "onNodeDragOver", "onNodeDragEnd", "onNodeDrop", "allow-drop", "allow-drag", "onNodeContextmenu", "default-expand-all", "default-expanded-keys"])), [
          [_directive_loading, _ctx.loading]
        ])
      ]),
      _: 3 /* FORWARDED */
    }, 8 /* PROPS */, ["class"]),
    (_ctx.client.show&&_ctx.menu)
      ? (vue.openBlock(), vue.createElementBlock("div", {
          key: 1,
          class: vue.normalizeClass(["el-cascader-panel is-bordered", _ctx.b('menu')]),
          onClick: _cache[4] || (_cache[4] = $event => (_ctx.client.show=false)),
          style: vue.normalizeStyle(_ctx.styleName)
        }, [
          (_ctx.validData(_ctx.option.addBtn,true))
            ? vue.withDirectives((vue.openBlock(), vue.createElementBlock("div", {
                key: 0,
                class: vue.normalizeClass(_ctx.b('item')),
                onClick: _cache[1] || (_cache[1] = (...args) => (_ctx.rowAdd && _ctx.rowAdd(...args)))
              }, [
                vue.createTextVNode(vue.toDisplayString(_ctx.menuIcon('addBtn')), 1 /* TEXT */)
              ], 2 /* CLASS */)), [
                [_directive_permission, _ctx.getPermission('addBtn')]
              ])
            : vue.createCommentVNode("v-if", true),
          (_ctx.validData(_ctx.option.editBtn,true))
            ? vue.withDirectives((vue.openBlock(), vue.createElementBlock("div", {
                key: 1,
                class: vue.normalizeClass(_ctx.b('item')),
                onClick: _cache[2] || (_cache[2] = (...args) => (_ctx.rowEdit && _ctx.rowEdit(...args)))
              }, [
                vue.createTextVNode(vue.toDisplayString(_ctx.menuIcon('editBtn')), 1 /* TEXT */)
              ], 2 /* CLASS */)), [
                [_directive_permission, _ctx.getPermission('editBtn')]
              ])
            : vue.createCommentVNode("v-if", true),
          (_ctx.validData(_ctx.option.delBtn,true))
            ? vue.withDirectives((vue.openBlock(), vue.createElementBlock("div", {
                key: 2,
                class: vue.normalizeClass(_ctx.b('item')),
                onClick: _cache[3] || (_cache[3] = (...args) => (_ctx.rowRemove && _ctx.rowRemove(...args)))
              }, [
                vue.createTextVNode(vue.toDisplayString(_ctx.menuIcon('delBtn')), 1 /* TEXT */)
              ], 2 /* CLASS */)), [
                [_directive_permission, _ctx.getPermission('delBtn')]
              ])
            : vue.createCommentVNode("v-if", true),
          vue.renderSlot(_ctx.$slots, "menu", { node: _ctx.node })
        ], 6 /* CLASS, STYLE */))
      : vue.createCommentVNode("v-if", true),
    vue.createVNode(_component_el_dialog, {
      title: _ctx.node[_ctx.labelKey] || _ctx.title,
      modelValue: _ctx.box,
      "onUpdate:modelValue": _cache[6] || (_cache[6] = $event => ((_ctx.box) = $event)),
      class: "avue-dialog avue-dialog--none",
      "append-to-body": _ctx.$AVUE.appendToBody,
      "lock-scroll": "",
      "before-close": _ctx.hide,
      width: _ctx.validData(_ctx.option.dialogWidth,'50%')
    }, {
      default: vue.withCtx(() => [
        (_ctx.box)
          ? (vue.openBlock(), vue.createBlock(_component_avue_form, {
              key: 0,
              modelValue: _ctx.form,
              "onUpdate:modelValue": _cache[5] || (_cache[5] = $event => ((_ctx.form) = $event)),
              option: _ctx.formOption,
              ref: "form",
              onSubmit: _ctx.handleSubmit
            }, null, 8 /* PROPS */, ["modelValue", "option", "onSubmit"]))
          : vue.createCommentVNode("v-if", true)
      ]),
      _: 1 /* STABLE */
    }, 8 /* PROPS */, ["title", "modelValue", "append-to-body", "before-close", "width"])
  ], 2 /* CLASS */))
}

exports.render = render;
