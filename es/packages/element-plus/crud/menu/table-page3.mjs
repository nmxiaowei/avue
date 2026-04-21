/*! Avue.js v3.8.6 | (c) 2017-2026 Smallwei | Released under the MIT License. */
import { resolveComponent, openBlock, createBlock, normalizeClass, withCtx, renderSlot, createVNode, createCommentVNode } from 'vue';

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_pagination = resolveComponent("el-pagination");
  const _component_el_card = resolveComponent("el-card");

  return (_ctx.pageFlag && _ctx.validData(_ctx.crud.tableOption.page,true))
    ? (openBlock(), createBlock(_component_el_card, {
        key: 0,
        shadow: _ctx.crud.isCard,
        class: normalizeClass(_ctx.b('pagination'))
      }, {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "page"),
          createVNode(_component_el_pagination, {
            size: _ctx.crud.size,
            disabled: _ctx.defaultPage.disabled,
            "hide-on-single-page": _ctx.defaultPage.single,
            "pager-count": _ctx.defaultPage.pagerCount,
            "page-sizes": _ctx.defaultPage.pageSizes,
            background: _ctx.defaultPage.background,
            "page-size": _ctx.defaultPage.pageSize,
            "onUpdate:pageSize": _cache[0] || (_cache[0] = $event => ((_ctx.defaultPage.pageSize) = $event)),
            "current-page": _ctx.defaultPage.currentPage,
            "onUpdate:currentPage": _cache[1] || (_cache[1] = $event => ((_ctx.defaultPage.currentPage) = $event)),
            onSizeChange: _ctx.sizeChange,
            onPrevClick: _ctx.prevClick,
            onNextClick: _ctx.nextClick,
            onCurrentChange: _ctx.currentChange,
            layout: _ctx.defaultPage.layout,
            total: _ctx.defaultPage.total
          }, null, 8 /* PROPS */, ["size", "disabled", "hide-on-single-page", "pager-count", "page-sizes", "background", "page-size", "current-page", "onSizeChange", "onPrevClick", "onNextClick", "onCurrentChange", "layout", "total"])
        ]),
        _: 3 /* FORWARDED */
      }, 8 /* PROPS */, ["shadow", "class"]))
    : createCommentVNode("v-if", true)
}

export { render };
