/*! Avue.js v3.9.0 | (c) 2017-2026 Smallwei | Released under the MIT License. */
import { resolveComponent, openBlock, createElementBlock, withKeys, normalizeStyle, normalizeClass, createElementVNode, toDisplayString, renderSlot, Fragment, renderList, createTextVNode, createCommentVNode, createBlock, withCtx, createVNode, withDirectives, vModelText } from 'vue';

const _hoisted_1 = { ref: "chatAudio" };
const _hoisted_2 = ["src"];
const _hoisted_3 = ["src"];
const _hoisted_4 = ["src"];
const _hoisted_5 = { class: "web__logo" };
const _hoisted_6 = ["src"];
const _hoisted_7 = { class: "web__logo-info" };
const _hoisted_8 = { class: "web__logo-name" };
const _hoisted_9 = { class: "web__logo-dept" };
const _hoisted_10 = { class: "web__content" };
const _hoisted_11 = {
  class: "web__main",
  ref: "main"
};
const _hoisted_12 = { class: "web__main-user" };
const _hoisted_13 = ["src"];
const _hoisted_14 = { class: "web__main-text" };
const _hoisted_15 = ["innerHTML"];
const _hoisted_16 = {
  key: 0,
  class: "web__main-list"
};
const _hoisted_17 = ["onClick"];
const _hoisted_18 = { class: "web__tools" };
const _hoisted_19 = { class: "web__msg" };
const _hoisted_20 = ["placeholder"];
const _hoisted_21 = { class: "web__msg-menu" };
const _hoisted_22 = { style: {"text-align":"right","margin":"0"} };
const _hoisted_23 = { key: 0 };
const _hoisted_24 = { class: "dialog-footer" };
const _hoisted_25 = { key: 1 };
const _hoisted_26 = ["src"];
const _hoisted_27 = ["src"];
const _hoisted_28 = ["src"];

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_icon_picture = resolveComponent("el-icon-picture");
  const _component_el_icon = resolveComponent("el-icon");
  const _component_el_icon_video_camera = resolveComponent("el-icon-video-camera");
  const _component_el_icon_folder_opened = resolveComponent("el-icon-folder-opened");
  const _component_el_input = resolveComponent("el-input");
  const _component_el_button = resolveComponent("el-button");
  const _component_el_popover = resolveComponent("el-popover");
  const _component_el_dropdown_item = resolveComponent("el-dropdown-item");
  const _component_el_tooltip = resolveComponent("el-tooltip");
  const _component_el_scrollbar = resolveComponent("el-scrollbar");
  const _component_el_dropdown_menu = resolveComponent("el-dropdown-menu");
  const _component_el_dropdown = resolveComponent("el-dropdown");
  const _component_el_form_item = resolveComponent("el-form-item");
  const _component_el_form = resolveComponent("el-form");
  const _component_el_dialog = resolveComponent("el-dialog");

  return (openBlock(), createElementBlock("div", {
    class: normalizeClass(_ctx.b()),
    style: normalizeStyle(_ctx.heightStyleName),
    onKeyup: _cache[11] || (_cache[11] = withKeys((...args) => (_ctx.handleSend && _ctx.handleSend(...args)), ["enter"]))
  }, [
    createElementVNode("audio", _hoisted_1, [
      createElementVNode("source", {
        src: _ctx.audio[0],
        type: "audio/ogg"
      }, null, 8 /* PROPS */, _hoisted_2),
      createElementVNode("source", {
        src: _ctx.audio[1],
        type: "audio/mpeg"
      }, null, 8 /* PROPS */, _hoisted_3),
      createElementVNode("source", {
        src: _ctx.audio[2],
        type: "audio/wav"
      }, null, 8 /* PROPS */, _hoisted_4)
    ], 512 /* NEED_PATCH */),
    createElementVNode("div", _hoisted_5, [
      createElementVNode("img", {
        src: _ctx.config.img,
        class: "web__logo-img",
        alt: ""
      }, null, 8 /* PROPS */, _hoisted_6),
      createElementVNode("div", _hoisted_7, [
        createElementVNode("p", _hoisted_8, toDisplayString(_ctx.config.name), 1 /* TEXT */),
        createElementVNode("p", _hoisted_9, toDisplayString(_ctx.config.dept), 1 /* TEXT */)
      ]),
      renderSlot(_ctx.$slots, "header")
    ]),
    createElementVNode("div", _hoisted_10, [
      createElementVNode("div", {
        style: normalizeStyle(_ctx.widthStyleName)
      }, [
        createElementVNode("div", _hoisted_11, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.list, (item, index) => {
            return (openBlock(), createElementBlock("div", {
              class: normalizeClass(["web__main-item", {'web__main-item--mine':item.mine}]),
              key: index
            }, [
              createElementVNode("div", _hoisted_12, [
                createElementVNode("img", {
                  src: item.img
                }, null, 8 /* PROPS */, _hoisted_13),
                createElementVNode("cite", null, [
                  createTextVNode(toDisplayString(item.name) + " ", 1 /* TEXT */),
                  createElementVNode("i", null, toDisplayString(item.date), 1 /* TEXT */)
                ])
              ]),
              createElementVNode("div", _hoisted_14, [
                _cache[12] || (_cache[12] = createElementVNode("div", { class: "web__main-arrow" }, null, -1 /* HOISTED */)),
                createElementVNode("span", {
                  innerHTML: _ctx.handleDetail(item.text.text),
                  ref_for: true,
                  ref: "content"
                }, null, 8 /* PROPS */, _hoisted_15),
                (!_ctx.validatenull(item.text.list))
                  ? (openBlock(), createElementBlock("ul", _hoisted_16, [
                      (openBlock(true), createElementBlock(Fragment, null, renderList(item.text.list, (citem, cindex) => {
                        return (openBlock(), createElementBlock("li", {
                          onClick: $event => (_ctx.handleItemMsg(citem)),
                          key: cindex
                        }, toDisplayString(citem.text), 9 /* TEXT, PROPS */, _hoisted_17))
                      }), 128 /* KEYED_FRAGMENT */))
                    ]))
                  : createCommentVNode("v-if", true)
              ])
            ], 2 /* CLASS */))
          }), 128 /* KEYED_FRAGMENT */))
        ], 512 /* NEED_PATCH */),
        createElementVNode("div", {
          class: "web__footer",
          style: normalizeStyle(_ctx.widthStyleName)
        }, [
          createElementVNode("div", _hoisted_18, [
            (_ctx.tools.img)
              ? (openBlock(), createBlock(_component_el_icon, {
                  key: 0,
                  onClick: _cache[0] || (_cache[0] = $event => (_ctx.handleUpload('img')))
                }, {
                  default: withCtx(() => [
                    createVNode(_component_el_icon_picture)
                  ]),
                  _: 1 /* STABLE */
                }))
              : createCommentVNode("v-if", true),
            (_ctx.tools.video)
              ? (openBlock(), createBlock(_component_el_icon, {
                  key: 1,
                  onClick: _cache[1] || (_cache[1] = $event => (_ctx.handleUpload('video')))
                }, {
                  default: withCtx(() => [
                    createVNode(_component_el_icon_video_camera)
                  ]),
                  _: 1 /* STABLE */
                }))
              : createCommentVNode("v-if", true),
            (_ctx.tools.file)
              ? (openBlock(), createBlock(_component_el_icon, {
                  key: 2,
                  onClick: _cache[2] || (_cache[2] = $event => (_ctx.handleUpload('file')))
                }, {
                  default: withCtx(() => [
                    createVNode(_component_el_icon_folder_opened)
                  ]),
                  _: 1 /* STABLE */
                }))
              : createCommentVNode("v-if", true),
            renderSlot(_ctx.$slots, "menu")
          ]),
          createElementVNode("div", _hoisted_19, [
            withDirectives(createElementVNode("textarea", {
              "onUpdate:modelValue": _cache[3] || (_cache[3] = $event => ((_ctx.msg) = $event)),
              rows: "2",
              placeholder: _ctx.messagePlaceholder,
              class: "web__msg-input"
            }, null, 8 /* PROPS */, _hoisted_20), [
              [vModelText, _ctx.msg]
            ]),
            createElementVNode("div", _hoisted_21, [
              createVNode(_component_el_dropdown, {
                "split-button": "",
                class: "web__msg-submit",
                type: "primary",
                size: _ctx.size,
                onClick: _ctx.handleSend,
                trigger: "click"
              }, {
                dropdown: withCtx(() => [
                  createVNode(_component_el_dropdown_menu, null, {
                    default: withCtx(() => [
                      createVNode(_component_el_dropdown_item, null, {
                        default: withCtx(() => [
                          createVNode(_component_el_popover, {
                            placement: "top",
                            width: "160",
                            modelValue: _ctx.visible,
                            "onUpdate:modelValue": _cache[6] || (_cache[6] = $event => ((_ctx.visible) = $event))
                          }, {
                            reference: withCtx(() => [
                              createVNode(_component_el_button, {
                                texts: "",
                                icon: "el-icon-plus"
                              })
                            ]),
                            default: withCtx(() => [
                              createElementVNode("div", null, [
                                createVNode(_component_el_input, {
                                  size: _ctx.size,
                                  style: {"margin-bottom":"10px"},
                                  rows: 3,
                                  "show-word-limit": "",
                                  placeholder: _ctx.t('chat.quickReplyPlaceholder'),
                                  modelValue: _ctx.keys,
                                  "onUpdate:modelValue": _cache[4] || (_cache[4] = $event => ((_ctx.keys) = $event)),
                                  type: "textarea"
                                }, null, 8 /* PROPS */, ["size", "placeholder", "modelValue"]),
                                createElementVNode("div", _hoisted_22, [
                                  createVNode(_component_el_button, {
                                    size: _ctx.size,
                                    text: "",
                                    onClick: _cache[5] || (_cache[5] = $event => (_ctx.visible = false))
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(_ctx.t("common.cancelBtn")), 1 /* TEXT */)
                                    ]),
                                    _: 1 /* STABLE */
                                  }, 8 /* PROPS */, ["size"]),
                                  createVNode(_component_el_button, {
                                    type: "primary",
                                    size: _ctx.size,
                                    onClick: _ctx.addKey
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(_ctx.t("common.submitBtn")), 1 /* TEXT */)
                                    ]),
                                    _: 1 /* STABLE */
                                  }, 8 /* PROPS */, ["size", "onClick"])
                                ])
                              ])
                            ]),
                            _: 1 /* STABLE */
                          }, 8 /* PROPS */, ["modelValue"])
                        ]),
                        _: 1 /* STABLE */
                      }),
                      createVNode(_component_el_scrollbar, { style: {"height":"100px"} }, {
                        default: withCtx(() => [
                          (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.keylist, (item, index) => {
                            return (openBlock(), createBlock(_component_el_dropdown_item, {
                              key: index,
                              onClick: $event => (_ctx.sendKey(item))
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_el_tooltip, {
                                  effect: "dark",
                                  content: item,
                                  placement: "top"
                                }, {
                                  default: withCtx(() => [
                                    createElementVNode("span", null, toDisplayString(item.substr(0,10)) + toDisplayString(item.length>10?'...':''), 1 /* TEXT */)
                                  ]),
                                  _: 2 /* DYNAMIC */
                                }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["content"])
                              ]),
                              _: 2 /* DYNAMIC */
                            }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["onClick"]))
                          }), 128 /* KEYED_FRAGMENT */))
                        ]),
                        _: 1 /* STABLE */
                      })
                    ]),
                    _: 1 /* STABLE */
                  })
                ]),
                default: withCtx(() => [
                  createTextVNode(toDisplayString(_ctx.t("chat.sendBtn")) + " ", 1 /* TEXT */)
                ]),
                _: 1 /* STABLE */
              }, 8 /* PROPS */, ["size", "onClick"])
            ])
          ])
        ], 4 /* STYLE */)
      ], 4 /* STYLE */),
      renderSlot(_ctx.$slots, "default")
    ]),
    (_ctx.upload.box)
      ? (openBlock(), createElementBlock("div", _hoisted_23, [
          createVNode(_component_el_dialog, {
            title: _ctx.upload.title,
            "destroy-on-close": "",
            "append-to-body": _ctx.$AVUE.appendToBody,
            modelValue: _ctx.upload.box,
            "onUpdate:modelValue": _cache[9] || (_cache[9] = $event => ((_ctx.upload.box) = $event)),
            width: "30%"
          }, {
            footer: withCtx(() => [
              createElementVNode("span", _hoisted_24, [
                createVNode(_component_el_button, {
                  onClick: _cache[8] || (_cache[8] = $event => (_ctx.upload.box=false)),
                  size: "small"
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(_ctx.t("common.cancelBtn")), 1 /* TEXT */)
                  ]),
                  _: 1 /* STABLE */
                }),
                createVNode(_component_el_button, {
                  type: "primary",
                  onClick: _ctx.uploadSubmit,
                  size: "small"
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(_ctx.t("common.submitBtn")), 1 /* TEXT */)
                  ]),
                  _: 1 /* STABLE */
                }, 8 /* PROPS */, ["onClick"])
              ])
            ]),
            default: withCtx(() => [
              createVNode(_component_el_form, {
                ref: "form",
                model: _ctx.upload
              }, {
                default: withCtx(() => [
                  createVNode(_component_el_form_item, {
                    prop: "src",
                    rules: [
      { required: true, message: _ctx.t('chat.addressRequired')},
    ]
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_el_input, {
                        size: _ctx.size,
                        style: {"margin-bottom":"10px"},
                        rows: 4,
                        "show-word-limit": "",
                        maxlength: "100",
                        placeholder: _ctx.t('chat.addressPlaceholder'),
                        modelValue: _ctx.upload.src,
                        "onUpdate:modelValue": _cache[7] || (_cache[7] = $event => ((_ctx.upload.src) = $event)),
                        type: "textarea"
                      }, null, 8 /* PROPS */, ["size", "placeholder", "modelValue"])
                    ]),
                    _: 1 /* STABLE */
                  }, 8 /* PROPS */, ["rules"])
                ]),
                _: 1 /* STABLE */
              }, 8 /* PROPS */, ["model"])
            ]),
            _: 1 /* STABLE */
          }, 8 /* PROPS */, ["title", "append-to-body", "modelValue"])
        ]))
      : createCommentVNode("v-if", true),
    (_ctx.show)
      ? (openBlock(), createElementBlock("div", _hoisted_25, [
          createVNode(_component_el_dialog, {
            modelValue: _ctx.show,
            "onUpdate:modelValue": _cache[10] || (_cache[10] = $event => ((_ctx.show) = $event)),
            width: "40%",
            "destroy-on-close": "",
            "append-to-body": _ctx.$AVUE.appendToBody,
            "before-close": _ctx.handleClose,
            class: "web__dialog"
          }, {
            default: withCtx(() => [
              (_ctx.imgSrc)
                ? (openBlock(), createElementBlock("img", {
                    key: 0,
                    src: _ctx.imgSrc,
                    style: {"width":"100%","object-fit":"cover"}
                  }, null, 8 /* PROPS */, _hoisted_26))
                : createCommentVNode("v-if", true),
              (_ctx.videoSrc)
                ? (openBlock(), createElementBlock("video", {
                    key: 1,
                    src: _ctx.videoSrc,
                    style: {"width":"100%","object-fit":"cover"},
                    controls: "controls"
                  }, null, 8 /* PROPS */, _hoisted_27))
                : createCommentVNode("v-if", true),
              (_ctx.audioSrc)
                ? (openBlock(), createElementBlock("audio", {
                    key: 2,
                    src: _ctx.audioSrc,
                    style: {"width":"100%","object-fit":"cover"},
                    controls: "controls"
                  }, null, 8 /* PROPS */, _hoisted_28))
                : createCommentVNode("v-if", true)
            ]),
            _: 1 /* STABLE */
          }, 8 /* PROPS */, ["modelValue", "append-to-body", "before-close"])
        ]))
      : createCommentVNode("v-if", true)
  ], 38 /* CLASS, STYLE, NEED_HYDRATION */))
}

export { render };
