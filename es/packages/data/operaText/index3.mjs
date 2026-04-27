/*! Avue.js v3.9.1 | (c) 2017-2026 Smallwei | Released under the MIT License. */
import { resolveComponent, openBlock, createElementBlock, createVNode, withCtx, Fragment, renderList, createBlock, createElementVNode, normalizeStyle, toDisplayString } from 'vue';

const _hoisted_1 = { class: "avue-data-operatext" };
const _hoisted_2 = { class: "item" };
const _hoisted_3 = ["href", "onClick"];
const _hoisted_4 = { class: "item-title" };
const _hoisted_5 = { class: "item-subtitle" };
const _hoisted_6 = { class: "item-content" };
const _hoisted_7 = { class: "item-img" };
const _hoisted_8 = ["src"];
const _hoisted_9 = { class: "item-list" };
const _hoisted_10 = { class: "item-label" };
const _hoisted_11 = { class: "item-value" };

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_col = resolveComponent("el-col");
  const _component_el_row = resolveComponent("el-row");

  return (openBlock(), createElementBlock("div", _hoisted_1, [
    createVNode(_component_el_row, { span: 24 }, {
      default: withCtx(() => [
        (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.data, (item, index) => {
          return (openBlock(), createBlock(_component_el_col, {
            key: index,
            md: _ctx.span,
            xs: 24,
            sm: 12
          }, {
            default: withCtx(() => [
              createElementVNode("div", _hoisted_2, [
                createElementVNode("a", {
                  href: item.href,
                  onClick: $event => (item.click&&item.click(item))
                }, [
                  createElementVNode("div", {
                    class: "item-header",
                    style: normalizeStyle({backgroundColor:item.color,backgroundImage:`url(${item.colorImg})`})
                  }, [
                    createElementVNode("span", _hoisted_4, toDisplayString(item.title), 1 /* TEXT */),
                    createElementVNode("span", _hoisted_5, toDisplayString(item.subtitle), 1 /* TEXT */)
                  ], 4 /* STYLE */),
                  createElementVNode("div", _hoisted_6, [
                    createElementVNode("div", _hoisted_7, [
                      createElementVNode("img", {
                        src: item.img,
                        alt: ""
                      }, null, 8 /* PROPS */, _hoisted_8)
                    ]),
                    createElementVNode("div", _hoisted_9, [
                      (openBlock(true), createElementBlock(Fragment, null, renderList(item.list, (citem, cindex) => {
                        return (openBlock(), createElementBlock("div", {
                          class: "item-row",
                          key: cindex
                        }, [
                          createElementVNode("span", _hoisted_10, toDisplayString(citem.label), 1 /* TEXT */),
                          createElementVNode("span", _hoisted_11, toDisplayString(citem.value), 1 /* TEXT */)
                        ]))
                      }), 128 /* KEYED_FRAGMENT */))
                    ])
                  ])
                ], 8 /* PROPS */, _hoisted_3)
              ])
            ]),
            _: 2 /* DYNAMIC */
          }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["md"]))
        }), 128 /* KEYED_FRAGMENT */))
      ]),
      _: 1 /* STABLE */
    })
  ]))
}

export { render };
