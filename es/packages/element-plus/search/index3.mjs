/*! Avue.js v3.9.3 | (c) 2017-2026 Smallwei | Released under the MIT License. */
import { resolveComponent, openBlock, createBlock, normalizeClass, withCtx, createElementBlock, Fragment, renderList, createElementVNode, toDisplayString, renderSlot } from 'vue';

const _hoisted_1 = ["onClick"];

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_col = resolveComponent("el-col");
  const _component_el_row = resolveComponent("el-row");

  return (openBlock(), createBlock(_component_el_row, {
    class: normalizeClass([_ctx.b(),{'avue--card':_ctx.isCard}]),
    span: 24
  }, {
    default: withCtx(() => [
      (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.columnOption, (column, index) => {
        return (openBlock(), createBlock(_component_el_col, {
          span: column.span || 24,
          key: column.prop,
          class: normalizeClass(_ctx.b('item'))
        }, {
          default: withCtx(() => [
            createElementVNode("p", {
              class: normalizeClass(_ctx.b('title'))
            }, toDisplayString(column.label) + ":", 3 /* TEXT, CLASS */),
            createElementVNode("div", {
              class: normalizeClass(_ctx.b('content'))
            }, [
              (_ctx.mainSlot.includes(column.prop))
                ? renderSlot(_ctx.$slots, column.prop, {
                    key: 0,
                    dic: _ctx.DIC[column.prop]
                  })
                : (openBlock(true), createElementBlock(Fragment, { key: 1 }, renderList(_ctx.DIC[column.prop], (item) => {
                    return (openBlock(), createElementBlock("span", {
                      class: normalizeClass([_ctx.b('tags'),{'avue-search__tags--active':_ctx.getActive(item,column)}]),
                      onClick: $event => (_ctx.handleClick(column,item)),
                      key: _ctx.getKey(item,column.props,_ctx.valueKey)
                    }, toDisplayString(_ctx.getKey(item,column.props,_ctx.labelKey)), 11 /* TEXT, CLASS, PROPS */, _hoisted_1))
                  }), 128 /* KEYED_FRAGMENT */))
            ], 2 /* CLASS */)
          ]),
          _: 2 /* DYNAMIC */
        }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["span", "class"]))
      }), 128 /* KEYED_FRAGMENT */))
    ]),
    _: 3 /* FORWARDED */
  }, 8 /* PROPS */, ["class"]))
}

export { render };
