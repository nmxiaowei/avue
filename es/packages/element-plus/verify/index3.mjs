/*! Avue.js v3.8.6 | (c) 2017-2026 Smallwei | Released under the MIT License. */
import { openBlock, createElementBlock, normalizeClass, Fragment, renderList, normalizeStyle, toDisplayString } from 'vue';

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createElementBlock("div", {
    class: normalizeClass(_ctx.b())
  }, [
    (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.list, (item, index) => {
      return (openBlock(), createElementBlock("span", {
        class: normalizeClass(_ctx.b('item')),
        style: normalizeStyle(_ctx.styleName),
        key: index
      }, toDisplayString(item), 7 /* TEXT, CLASS, STYLE */))
    }), 128 /* KEYED_FRAGMENT */))
  ], 2 /* CLASS */))
}

export { render };
