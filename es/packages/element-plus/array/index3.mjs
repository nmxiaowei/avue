/*! Avue.js v3.9.2 | (c) 2017-2026 Smallwei | Released under the MIT License. */
import { resolveComponent, openBlock, createElementBlock, normalizeClass, createBlock, createCommentVNode, Fragment, renderList, createElementVNode, createVNode, withCtx, resolveDynamicComponent, createTextVNode, toDisplayString } from 'vue';

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_button = resolveComponent("el-button");
  const _component_el_link = resolveComponent("el-link");
  const _component_el_input = resolveComponent("el-input");
  const _component_el_tooltip = resolveComponent("el-tooltip");

  return (openBlock(), createElementBlock("div", {
    class: normalizeClass(_ctx.b())
  }, [
    (_ctx.validatenull(_ctx.text))
      ? (openBlock(), createBlock(_component_el_button, {
          key: 0,
          type: "primary",
          icon: "el-icon-plus",
          circle: "",
          size: _ctx.size,
          disabled: _ctx.disabled,
          onClick: _cache[0] || (_cache[0] = $event => (_ctx.add()))
        }, null, 8 /* PROPS */, ["size", "disabled"]))
      : createCommentVNode("v-if", true),
    (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.text, (item, index) => {
      return (openBlock(), createElementBlock("div", {
        class: normalizeClass(_ctx.b('item')),
        key: index
      }, [
        createElementVNode("div", {
          class: normalizeClass(_ctx.b('input'))
        }, [
          createVNode(_component_el_tooltip, {
            placement: "bottom",
            disabled: (!_ctx.isImg && !_ctx.isUrl) || _ctx.validatenull(item)
          }, {
            content: withCtx(() => [
              (_ctx.isImg)
                ? (openBlock(), createBlock(resolveDynamicComponent(_ctx.isMediaType(item)), {
                    key: 0,
                    style: {"width":"200px"},
                    src: item,
                    onClick: $event => (_ctx.openImg(index)),
                    controls: "controls"
                  }, null, 8 /* PROPS */, ["src", "onClick"]))
                : (_ctx.isUrl)
                  ? (openBlock(), createBlock(_component_el_link, {
                      key: 1,
                      type: "primary",
                      href: item,
                      target: _ctx.target
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(item), 1 /* TEXT */)
                      ]),
                      _: 2 /* DYNAMIC */
                    }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["href", "target"]))
                  : createCommentVNode("v-if", true)
            ]),
            default: withCtx(() => [
              createVNode(_component_el_input, {
                modelValue: _ctx.text[index],
                "onUpdate:modelValue": $event => ((_ctx.text[index]) = $event),
                size: _ctx.size,
                maxlength: _ctx.maxlength,
                minlength: _ctx.minlength,
                "show-word-limit": _ctx.showWordLimit,
                placeholder: _ctx.placeholder,
                disabled: _ctx.disabled
              }, null, 8 /* PROPS */, ["modelValue", "onUpdate:modelValue", "size", "maxlength", "minlength", "show-word-limit", "placeholder", "disabled"])
            ]),
            _: 2 /* DYNAMIC */
          }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["disabled"]),
          (!(_ctx.disabled ||_ctx.readonly || _ctx.alone))
            ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                (!_ctx.isLimit)
                  ? (openBlock(), createBlock(_component_el_button, {
                      key: 0,
                      type: "primary",
                      icon: "el-icon-plus",
                      circle: "",
                      size: _ctx.size,
                      disabled: _ctx.disabled,
                      onClick: $event => (_ctx.add(index))
                    }, null, 8 /* PROPS */, ["size", "disabled", "onClick"]))
                  : createCommentVNode("v-if", true),
                createVNode(_component_el_button, {
                  type: "danger",
                  icon: "el-icon-minus",
                  circle: "",
                  size: _ctx.size,
                  disabled: _ctx.disabled,
                  onClick: $event => (_ctx.remove(index))
                }, null, 8 /* PROPS */, ["size", "disabled", "onClick"])
              ], 64 /* STABLE_FRAGMENT */))
            : createCommentVNode("v-if", true)
        ], 2 /* CLASS */)
      ], 2 /* CLASS */))
    }), 128 /* KEYED_FRAGMENT */))
  ], 2 /* CLASS */))
}

export { render };
