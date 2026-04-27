/*! Avue.js v3.9.1 | (c) 2017-2026 Smallwei | Released under the MIT License. */
import { resolveComponent, openBlock, createElementBlock, normalizeClass, createCommentVNode, createElementVNode, createVNode, withCtx, Fragment, renderList, createBlock, withModifiers, resolveDynamicComponent, normalizeStyle, toDisplayString } from 'vue';

const _hoisted_1 = ["onClick", "id"];
const _hoisted_2 = { class: "el-image-viewer__btn el-image-viewer__actions" };
const _hoisted_3 = { class: "el-image-viewer__actions__inner" };

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_icon_close = resolveComponent("el-icon-close");
  const _component_el_icon_arrow_left = resolveComponent("el-icon-arrow-left");
  const _component_el_icon_arrow_right = resolveComponent("el-icon-arrow-right");
  const _component_el_icon_document = resolveComponent("el-icon-document");
  const _component_el_carousel_item = resolveComponent("el-carousel-item");
  const _component_el_carousel = resolveComponent("el-carousel");
  const _component_el_icon_zoom_out = resolveComponent("el-icon-zoom-out");
  const _component_el_icon_zoom_in = resolveComponent("el-icon-zoom-in");
  const _component_el_icon_refresh_left = resolveComponent("el-icon-refresh-left");
  const _component_el_icon_refresh_right = resolveComponent("el-icon-refresh-right");
  const _component_el_icon_printer = resolveComponent("el-icon-printer");
  const _component_el_icon_d_arrow_left = resolveComponent("el-icon-d-arrow-left");
  const _component_el_icon_d_arrow_right = resolveComponent("el-icon-d-arrow-right");
  const _component_el_icon_refresh = resolveComponent("el-icon-refresh");
  const _component_el_icon_download = resolveComponent("el-icon-download");

  return (openBlock(), createElementBlock("div", {
    class: normalizeClass(_ctx.b())
  }, [
    (_ctx.ops.modal)
      ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: normalizeClass(_ctx.b('mask')),
          onClick: _cache[0] || (_cache[0] = (...args) => (_ctx.close && _ctx.close(...args)))
        }, null, 2 /* CLASS */))
      : createCommentVNode("v-if", true),
    createElementVNode("span", {
      class: "el-image-viewer__btn el-image-viewer__close",
      onClick: _cache[1] || (_cache[1] = (...args) => (_ctx.close && _ctx.close(...args)))
    }, [
      createVNode(_component_el_icon_close)
    ]),
    (_ctx.isRrrow)
      ? (openBlock(), createElementBlock("span", {
          key: 1,
          class: "el-image-viewer__btn el-image-viewer__prev",
          onClick: _cache[2] || (_cache[2] = $event => (_ctx.handlePrev()))
        }, [
          createVNode(_component_el_icon_arrow_left)
        ]))
      : createCommentVNode("v-if", true),
    (_ctx.isRrrow)
      ? (openBlock(), createElementBlock("span", {
          key: 2,
          class: "el-image-viewer__btn el-image-viewer__next",
          onClick: _cache[3] || (_cache[3] = $event => (_ctx.handleNext()))
        }, [
          createVNode(_component_el_icon_arrow_right)
        ]))
      : createCommentVNode("v-if", true),
    createElementVNode("div", {
      class: normalizeClass(_ctx.b('box')),
      ref: "box"
    }, [
      createVNode(_component_el_carousel, {
        ref: "carousel",
        "show-indicators": false,
        "initial-index": _ctx.index,
        "initial-swipe": _ctx.index,
        interval: _ctx.ops.interval || 0,
        arrow: "never",
        onChange: _ctx.handleChange,
        "indicator-position": "none"
      }, {
        default: withCtx(() => [
          (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.datas, (item, indexs) => {
            return (openBlock(), createBlock(_component_el_carousel_item, {
              onClick: _cache[4] || (_cache[4] = withModifiers($event => (_ctx.ops.closeOnClickModal?_ctx.close():''), ["self"])),
              key: indexs
            }, {
              default: withCtx(() => [
                (_ctx.isMediaType(item))
                  ? (openBlock(), createBlock(resolveDynamicComponent(_ctx.isMediaType(item)), {
                      key: 0,
                      onClick: $event => (_ctx.handleClick(item,indexs)),
                      id: 'avue-image-preview__'+indexs,
                      src: item.url,
                      style: normalizeStyle([_ctx.styleName,_ctx.styleBoxName]),
                      ref_for: true,
                      ref: "item",
                      onMousedown: _ctx.move,
                      controls: "controls",
                      ondragstart: "return false"
                    }, null, 40 /* PROPS, NEED_HYDRATION */, ["onClick", "id", "src", "style", "onMousedown"]))
                  : (openBlock(), createElementBlock("div", {
                      key: 1,
                      onClick: $event => (_ctx.handleClick(item,indexs,true)),
                      id: 'avue-image-preview__'+indexs,
                      class: normalizeClass(_ctx.b('file'))
                    }, [
                      createElementVNode("span", null, [
                        createVNode(_component_el_icon_document),
                        createElementVNode("p", null, toDisplayString(item.name || _ctx.getName(item.url)), 1 /* TEXT */)
                      ])
                    ], 10 /* CLASS, PROPS */, _hoisted_1))
              ]),
              _: 2 /* DYNAMIC */
            }, 1024 /* DYNAMIC_SLOTS */))
          }), 128 /* KEYED_FRAGMENT */))
        ]),
        _: 1 /* STABLE */
      }, 8 /* PROPS */, ["initial-index", "initial-swipe", "interval", "onChange"])
    ], 2 /* CLASS */),
    createElementVNode("div", _hoisted_2, [
      createElementVNode("div", _hoisted_3, [
        createVNode(_component_el_icon_zoom_out, {
          onClick: _ctx.subScale,
          class: "viewer-icon"
        }, null, 8 /* PROPS */, ["onClick"]),
        createVNode(_component_el_icon_zoom_in, {
          onClick: _ctx.addScale,
          class: "viewer-icon"
        }, null, 8 /* PROPS */, ["onClick"]),
        _cache[7] || (_cache[7] = createElementVNode("i", { class: "el-image-viewer__actions__divider" }, null, -1 /* HOISTED */)),
        createVNode(_component_el_icon_refresh_left, {
          onClick: _cache[5] || (_cache[5] = $event => (_ctx.rotate=_ctx.rotate-90)),
          class: "viewer-icon"
        }),
        createVNode(_component_el_icon_refresh_right, {
          onClick: _cache[6] || (_cache[6] = $event => (_ctx.rotate=_ctx.rotate+90)),
          class: "viewer-icon"
        }),
        _cache[8] || (_cache[8] = createElementVNode("i", { class: "el-image-viewer__actions__divider" }, null, -1 /* HOISTED */)),
        createVNode(_component_el_icon_printer, {
          onClick: _ctx.handlePrint,
          class: "viewer-icon"
        }, null, 8 /* PROPS */, ["onClick"]),
        _cache[9] || (_cache[9] = createElementVNode("i", { class: "el-image-viewer__actions__divider" }, null, -1 /* HOISTED */)),
        createVNode(_component_el_icon_d_arrow_left, {
          onClick: _ctx.handlePrev,
          class: "viewer-icon"
        }, null, 8 /* PROPS */, ["onClick"]),
        createVNode(_component_el_icon_d_arrow_right, {
          onClick: _ctx.handleNext,
          class: "viewer-icon"
        }, null, 8 /* PROPS */, ["onClick"]),
        _cache[10] || (_cache[10] = createElementVNode("i", { class: "el-image-viewer__actions__divider" }, null, -1 /* HOISTED */)),
        createVNode(_component_el_icon_refresh, {
          onClick: _ctx.handleReset,
          class: "viewer-icon"
        }, null, 8 /* PROPS */, ["onClick"]),
        _cache[11] || (_cache[11] = createElementVNode("i", { class: "el-image-viewer__actions__divider" }, null, -1 /* HOISTED */)),
        createVNode(_component_el_icon_download, {
          onClick: _ctx.handleDownload,
          class: "viewer-icon"
        }, null, 8 /* PROPS */, ["onClick"])
      ])
    ])
  ], 2 /* CLASS */))
}

export { render };
