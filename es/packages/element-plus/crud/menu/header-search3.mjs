/*! Avue.js v3.9.0 | (c) 2017-2026 Smallwei | Released under the MIT License. */
import { resolveComponent, withDirectives, openBlock, createBlock, normalizeClass, withCtx, renderSlot, createVNode, createSlots, normalizeProps, guardReactiveProps, createElementBlock, Fragment, createTextVNode, toDisplayString, createCommentVNode, renderList, vShow } from 'vue';

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_button = resolveComponent("el-button");
  const _component_avue_form = resolveComponent("avue-form");
  const _component_el_card = resolveComponent("el-card");

  return (_ctx.searchFlag)
    ? withDirectives((openBlock(), createBlock(_component_el_card, {
        key: 0,
        shadow: _ctx.crud.isCard,
        class: normalizeClass(_ctx.b())
      }, {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "search", {
            row: _ctx.searchForm,
            search: _ctx.searchForm,
            size: _ctx.crud.size
          }),
          createVNode(_component_avue_form, {
            option: _ctx.option,
            ref: "form",
            onSubmit: _ctx.searchChange,
            onResetChange: _ctx.resetChange,
            modelValue: _ctx.searchForm,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((_ctx.searchForm) = $event))
          }, createSlots({
            "menu-form": withCtx((scope) => [
              renderSlot(_ctx.$slots, "search-menu", normalizeProps(guardReactiveProps(Object.assign(scope,{
                  search:_ctx.searchForm,
                  row:_ctx.searchForm
                })))),
              (_ctx.isSearchIcon)
                ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                    (_ctx.show===false)
                      ? (openBlock(), createBlock(_component_el_button, {
                          key: 0,
                          text: "",
                          onClick: _ctx.handleSearchIconShow,
                          icon: "el-icon-arrow-down"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(_ctx.t('crud.open')), 1 /* TEXT */)
                          ]),
                          _: 1 /* STABLE */
                        }, 8 /* PROPS */, ["onClick"]))
                      : createCommentVNode("v-if", true),
                    (_ctx.show===true)
                      ? (openBlock(), createBlock(_component_el_button, {
                          key: 1,
                          text: "",
                          onClick: _ctx.handleSearchIconShow,
                          icon: "el-icon-arrow-up"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(_ctx.t('crud.shrink')), 1 /* TEXT */)
                          ]),
                          _: 1 /* STABLE */
                        }, 8 /* PROPS */, ["onClick"]))
                      : createCommentVNode("v-if", true)
                  ], 64 /* STABLE_FRAGMENT */))
                : createCommentVNode("v-if", true)
            ]),
            _: 2 /* DYNAMIC */
          }, [
            renderList(_ctx.crud.searchSlot, (item) => {
              return {
                name: _ctx.getSlotName(item),
                fn: withCtx((scope) => [
                  renderSlot(_ctx.$slots, item, normalizeProps(guardReactiveProps(scope)))
                ])
              }
            })
          ]), 1032 /* PROPS, DYNAMIC_SLOTS */, ["option", "onSubmit", "onResetChange", "modelValue"])
        ]),
        _: 3 /* FORWARDED */
      }, 8 /* PROPS */, ["shadow", "class"])), [
        [vShow, _ctx.searchShow && _ctx.searchFlag]
      ])
    : createCommentVNode("v-if", true)
}

export { render };
