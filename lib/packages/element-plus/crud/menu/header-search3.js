/*! Avue.js v3.9.2 | (c) 2017-2026 Smallwei | Released under the MIT License. */
'use strict';

var vue = require('vue');

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_button = vue.resolveComponent("el-button");
  const _component_avue_form = vue.resolveComponent("avue-form");
  const _component_el_card = vue.resolveComponent("el-card");

  return (_ctx.searchFlag)
    ? vue.withDirectives((vue.openBlock(), vue.createBlock(_component_el_card, {
        key: 0,
        shadow: _ctx.crud.isCard,
        class: vue.normalizeClass(_ctx.b())
      }, {
        default: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "search", {
            row: _ctx.searchForm,
            search: _ctx.searchForm,
            size: _ctx.crud.size
          }),
          vue.createVNode(_component_avue_form, {
            option: _ctx.option,
            ref: "form",
            onSubmit: _ctx.searchChange,
            onResetChange: _ctx.resetChange,
            modelValue: _ctx.searchForm,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((_ctx.searchForm) = $event))
          }, vue.createSlots({
            "menu-form": vue.withCtx((scope) => [
              vue.renderSlot(_ctx.$slots, "search-menu", vue.normalizeProps(vue.guardReactiveProps(Object.assign(scope,{
                  search:_ctx.searchForm,
                  row:_ctx.searchForm
                })))),
              (_ctx.isSearchIcon)
                ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 0 }, [
                    (_ctx.show===false)
                      ? (vue.openBlock(), vue.createBlock(_component_el_button, {
                          key: 0,
                          text: "",
                          onClick: _ctx.handleSearchIconShow,
                          icon: "el-icon-arrow-down"
                        }, {
                          default: vue.withCtx(() => [
                            vue.createTextVNode(vue.toDisplayString(_ctx.t('crud.open')), 1 /* TEXT */)
                          ]),
                          _: 1 /* STABLE */
                        }, 8 /* PROPS */, ["onClick"]))
                      : vue.createCommentVNode("v-if", true),
                    (_ctx.show===true)
                      ? (vue.openBlock(), vue.createBlock(_component_el_button, {
                          key: 1,
                          text: "",
                          onClick: _ctx.handleSearchIconShow,
                          icon: "el-icon-arrow-up"
                        }, {
                          default: vue.withCtx(() => [
                            vue.createTextVNode(vue.toDisplayString(_ctx.t('crud.shrink')), 1 /* TEXT */)
                          ]),
                          _: 1 /* STABLE */
                        }, 8 /* PROPS */, ["onClick"]))
                      : vue.createCommentVNode("v-if", true)
                  ], 64 /* STABLE_FRAGMENT */))
                : vue.createCommentVNode("v-if", true)
            ]),
            _: 2 /* DYNAMIC */
          }, [
            vue.renderList(_ctx.crud.searchSlot, (item) => {
              return {
                name: _ctx.getSlotName(item),
                fn: vue.withCtx((scope) => [
                  vue.renderSlot(_ctx.$slots, item, vue.normalizeProps(vue.guardReactiveProps(scope)))
                ])
              }
            })
          ]), 1032 /* PROPS, DYNAMIC_SLOTS */, ["option", "onSubmit", "onResetChange", "modelValue"])
        ]),
        _: 3 /* FORWARDED */
      }, 8 /* PROPS */, ["shadow", "class"])), [
        [vue.vShow, _ctx.searchShow && _ctx.searchFlag]
      ])
    : vue.createCommentVNode("v-if", true)
}

exports.render = render;
