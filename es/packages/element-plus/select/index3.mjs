/*! Avue.js v3.8.6 | (c) 2017-2026 Smallwei | Released under the MIT License. */
import { resolveComponent, openBlock, createBlock, resolveDynamicComponent, normalizeClass, withCtx, createElementBlock, Fragment, renderSlot, createElementVNode, toDisplayString, createCommentVNode, renderList, createTextVNode } from 'vue';

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_option = resolveComponent("el-option");
  const _component_el_option_group = resolveComponent("el-option-group");
  const _component_el_checkbox = resolveComponent("el-checkbox");

  return (openBlock(), createBlock(resolveDynamicComponent(_ctx.componentName), {
    ref: "main",
    class: normalizeClass(_ctx.b()),
    modelValue: _ctx.text,
    "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => ((_ctx.text) = $event)),
    size: _ctx.size,
    options: _ctx.netDic,
    props: _ctx.props,
    loading: _ctx.loading,
    "loading-text": _ctx.loadingText,
    "value-on-clear": _ctx.valueOnClear,
    multiple: _ctx.multiple,
    filterable: _ctx.remote ? true : _ctx.filterable,
    remote: _ctx.remote,
    readonly: _ctx.readonly,
    "no-match-text": _ctx.noMatchText,
    "no-data-text": _ctx.noDataText,
    "remote-method": _ctx.remote ? _ctx.handleRemoteMethod : undefined,
    "popper-class": _ctx.popperClass,
    "popper-append-to-body": _ctx.popperAppendToBody,
    "collapse-tags": _ctx.tags || _ctx.collapseTags,
    "collapse-tags-tooltip": _ctx.collapseTagsTooltip,
    "max-collapse-tags": _ctx.maxCollapseTags,
    clearable: _ctx.clearableVal,
    placeholder: _ctx.placeholder,
    onFocus: _ctx.handleFocus,
    onBlur: _ctx.handleBlur,
    onClick: _ctx.handleClick,
    onRemoveTag: _ctx.handleremoveTag,
    "multiple-limit": _ctx.limit,
    "allow-create": _ctx.allowCreate,
    "default-first-option": _ctx.defaultFirstOption,
    disabled: _ctx.disabled
  }, {
    default: withCtx((scope) => [
      (_ctx.virtualize)
        ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
            (_ctx.$slots.default)
              ? renderSlot(_ctx.$slots, "default", {
                  key: 0,
                  label: _ctx.labelKey,
                  value: _ctx.valueKey,
                  item: scope.item
                })
              : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  createElementVNode("span", null, toDisplayString(_ctx.getLabelText(scope.item)), 1 /* TEXT */),
                  (scope.item[_ctx.descKey])
                    ? (openBlock(), createElementBlock("span", {
                        key: 0,
                        class: normalizeClass(_ctx.b('desc'))
                      }, toDisplayString(scope.item[_ctx.descKey]), 3 /* TEXT, CLASS */))
                    : createCommentVNode("v-if", true)
                ], 64 /* STABLE_FRAGMENT */))
          ], 64 /* STABLE_FRAGMENT */))
        : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
            (_ctx.isGroup)
              ? (openBlock(true), createElementBlock(Fragment, { key: 0 }, renderList(_ctx.netDic, (item, index) => {
                  return (openBlock(), createBlock(_component_el_option_group, {
                    key: index,
                    label: _ctx.getLabelText(item)
                  }, {
                    default: withCtx(() => [
                      (openBlock(true), createElementBlock(Fragment, null, renderList(item[_ctx.groupsKey], (citem, cindex) => {
                        return (openBlock(), createBlock(_component_el_option, {
                          key: citem[_ctx.valueKey],
                          class: normalizeClass(citem[_ctx.classNameKey]),
                          disabled: citem[_ctx.disabledKey],
                          label: _ctx.getLabelText(citem),
                          value: citem[_ctx.valueKey]
                        }, {
                          default: withCtx(() => [
                            (_ctx.$slots.default)
                              ? renderSlot(_ctx.$slots, "default", {
                                  key: 0,
                                  label: _ctx.labelKey,
                                  value: _ctx.valueKey,
                                  item: citem
                                })
                              : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                                  createElementVNode("span", null, toDisplayString(_ctx.getLabelText(citem)), 1 /* TEXT */),
                                  (citem[_ctx.descKey])
                                    ? (openBlock(), createElementBlock("span", {
                                        key: 0,
                                        class: normalizeClass(_ctx.b('desc'))
                                      }, toDisplayString(citem[_ctx.descKey]), 3 /* TEXT, CLASS */))
                                    : createCommentVNode("v-if", true)
                                ], 64 /* STABLE_FRAGMENT */))
                          ]),
                          _: 2 /* DYNAMIC */
                        }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["class", "disabled", "label", "value"]))
                      }), 128 /* KEYED_FRAGMENT */))
                    ]),
                    _: 2 /* DYNAMIC */
                  }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["label"]))
                }), 128 /* KEYED_FRAGMENT */))
              : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  createElementVNode("div", {
                    class: normalizeClass(_ctx.b('check'))
                  }, [
                    (_ctx.all && _ctx.multiple)
                      ? (openBlock(), createBlock(_component_el_checkbox, {
                          key: 0,
                          modelValue: _ctx.checked,
                          "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((_ctx.checked) = $event)),
                          disabled: _ctx.disabled,
                          indeterminate: _ctx.indeterminate,
                          onChange: _ctx.checkChange
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(_ctx.t('check.checkAll')), 1 /* TEXT */)
                          ]),
                          _: 1 /* STABLE */
                        }, 8 /* PROPS */, ["modelValue", "disabled", "indeterminate", "onChange"]))
                      : createCommentVNode("v-if", true)
                  ], 2 /* CLASS */),
                  (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.netDic, (item, index) => {
                    return (openBlock(), createBlock(_component_el_option, {
                      key: item[_ctx.valueKey],
                      class: normalizeClass(item[_ctx.classNameKey]),
                      disabled: item[_ctx.disabledKey],
                      label: _ctx.getLabelText(item),
                      value: item[_ctx.valueKey]
                    }, {
                      default: withCtx(() => [
                        (_ctx.$slots.default)
                          ? renderSlot(_ctx.$slots, "default", {
                              key: 0,
                              label: _ctx.labelKey,
                              value: _ctx.valueKey,
                              item: item
                            })
                          : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                              createElementVNode("span", null, toDisplayString(_ctx.getLabelText(item)), 1 /* TEXT */),
                              (item[_ctx.descKey])
                                ? (openBlock(), createElementBlock("span", {
                                    key: 0,
                                    class: normalizeClass(_ctx.b('desc'))
                                  }, toDisplayString(item[_ctx.descKey]), 3 /* TEXT, CLASS */))
                                : createCommentVNode("v-if", true)
                            ], 64 /* STABLE_FRAGMENT */))
                      ]),
                      _: 2 /* DYNAMIC */
                    }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["class", "disabled", "label", "value"]))
                  }), 128 /* KEYED_FRAGMENT */))
                ], 64 /* STABLE_FRAGMENT */))
          ], 64 /* STABLE_FRAGMENT */))
    ]),
    _: 3 /* FORWARDED */
  }, 40 /* PROPS, NEED_HYDRATION */, ["class", "modelValue", "size", "options", "props", "loading", "loading-text", "value-on-clear", "multiple", "filterable", "remote", "readonly", "no-match-text", "no-data-text", "remote-method", "popper-class", "popper-append-to-body", "collapse-tags", "collapse-tags-tooltip", "max-collapse-tags", "clearable", "placeholder", "onFocus", "onBlur", "onClick", "onRemoveTag", "multiple-limit", "allow-create", "default-first-option", "disabled"]))
}

export { render };
