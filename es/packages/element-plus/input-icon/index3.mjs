/*! Avue.js v3.9.4 | (c) 2017-2026 Smallwei | Released under the MIT License. */
import { resolveComponent, openBlock, createElementBlock, normalizeClass, createVNode, withCtx, createElementVNode, Fragment, renderList, toDisplayString, createTextVNode, createCommentVNode } from 'vue';

const _hoisted_1 = { key: 0 };
const _hoisted_2 = ["onClick"];

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_icon_temp = resolveComponent("icon-temp");
  const _component_el_input = resolveComponent("el-input");
  const _component_avue_tabs = resolveComponent("avue-tabs");
  const _component_el_dialog = resolveComponent("el-dialog");

  return (openBlock(), createElementBlock("div", {
    class: normalizeClass(_ctx.b())
  }, [
    createVNode(_component_el_input, {
      "prefix-icon": _ctx.prefixIcon,
      "suffix-icon": _ctx.suffixIcon,
      placeholder: _ctx.placeholder,
      modelValue: _ctx.text,
      "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((_ctx.text) = $event)),
      "popper-class": _ctx.popperClass,
      size: _ctx.size,
      ref: "main",
      onClear: _ctx.handleClear,
      clearable: _ctx.disabled?false:_ctx.clearable,
      disabled: _ctx.disabled,
      onClick: _ctx.handleClick,
      onFocus: _ctx.handleShow
    }, {
      append: withCtx(() => [
        createVNode(_component_icon_temp, {
          onClick: _ctx.handleShow,
          text: _ctx.text,
          size: 28,
          small: _ctx.size==='small'
        }, null, 8 /* PROPS */, ["onClick", "text", "small"])
      ]),
      _: 1 /* STABLE */
    }, 8 /* PROPS */, ["prefix-icon", "suffix-icon", "placeholder", "modelValue", "popper-class", "size", "onClear", "clearable", "disabled", "onClick", "onFocus"]),
    (_ctx.box)
      ? (openBlock(), createElementBlock("div", _hoisted_1, [
          createVNode(_component_el_dialog, {
            class: "avue-dialog",
            title: _ctx.placeholder,
            "before-close": _ctx.beforeClose,
            "append-to-body": _ctx.$AVUE.appendToBody,
            "lock-scroll": "",
            modelValue: _ctx.box,
            "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => ((_ctx.box) = $event)),
            width: _ctx.dialogWidth
          }, {
            default: withCtx(() => [
              createElementVNode("div", {
                class: normalizeClass(_ctx.b('filter'))
              }, [
                createVNode(_component_el_input, {
                  placeholder: _ctx.validData(_ctx.option.filterText,_ctx.t('tip.input')),
                  size: _ctx.size,
                  modelValue: _ctx.filterText,
                  "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => ((_ctx.filterText) = $event))
                }, null, 8 /* PROPS */, ["placeholder", "size", "modelValue"])
              ], 2 /* CLASS */),
              createVNode(_component_avue_tabs, {
                option: _ctx.option,
                onChange: _ctx.handleTabs
              }, null, 8 /* PROPS */, ["option", "onChange"]),
              createElementVNode("div", {
                class: normalizeClass(_ctx.b('list'))
              }, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.list, (item, index) => {
                  return (openBlock(), createElementBlock("div", {
                    class: normalizeClass(_ctx.b('item')),
                    onClick: $event => (_ctx.handleSubmit(item.value)),
                    key: index
                  }, [
                    createVNode(_component_icon_temp, {
                      text: item.value,
                      size: item.size,
                      small: _ctx.size==='small',
                      color: item.color
                    }, null, 8 /* PROPS */, ["text", "size", "small", "color"]),
                    createElementVNode("p", null, toDisplayString(item.label || item.value), 1 /* TEXT */)
                  ], 10 /* CLASS, PROPS */, _hoisted_2))
                }), 128 /* KEYED_FRAGMENT */)),
                _cache[3] || (_cache[3] = createTextVNode("　 "))
              ], 2 /* CLASS */)
            ]),
            _: 1 /* STABLE */
          }, 8 /* PROPS */, ["title", "before-close", "append-to-body", "modelValue", "width"])
        ]))
      : createCommentVNode("v-if", true)
  ], 2 /* CLASS */))
}

export { render };
