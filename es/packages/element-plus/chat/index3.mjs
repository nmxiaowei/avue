/*! Avue.js v3.9.4 | (c) 2017-2026 Smallwei | Released under the MIT License. */
import { resolveComponent, openBlock, createElementBlock, normalizeStyle, normalizeClass, createElementVNode, toDisplayString, createCommentVNode, renderSlot, Fragment, renderList, createTextVNode, createBlock, withCtx, createVNode, withDirectives, withKeys, withModifiers, vModelText } from 'vue';

const _hoisted_1 = {
  ref: "chatAudio",
  preload: "none"
};
const _hoisted_2 = ["src"];
const _hoisted_3 = ["src"];
const _hoisted_4 = ["src"];
const _hoisted_5 = { class: "web__logo" };
const _hoisted_6 = ["src", "alt"];
const _hoisted_7 = {
  key: 1,
  class: "web__logo-avatar"
};
const _hoisted_8 = { class: "web__logo-info" };
const _hoisted_9 = { class: "web__logo-name" };
const _hoisted_10 = {
  key: 0,
  class: "web__logo-dept"
};
const _hoisted_11 = { class: "web__content" };
const _hoisted_12 = {
  key: 0,
  class: "web__empty"
};
const _hoisted_13 = { class: "web__main-user" };
const _hoisted_14 = ["src", "alt"];
const _hoisted_15 = {
  key: 1,
  class: "web__main-user-avatar"
};
const _hoisted_16 = { key: 0 };
const _hoisted_17 = { class: "web__main-text" };
const _hoisted_18 = ["innerHTML"];
const _hoisted_19 = {
  key: 0,
  class: "web__main-list"
};
const _hoisted_20 = ["onClick"];
const _hoisted_21 = { class: "web__footer" };
const _hoisted_22 = { class: "web__tools" };
const _hoisted_23 = { class: "web__msg" };
const _hoisted_24 = ["placeholder", "disabled"];
const _hoisted_25 = { class: "web__msg-menu" };
const _hoisted_26 = { class: "web__quick-actions" };
const _hoisted_27 = ["src"];
const _hoisted_28 = ["src"];
const _hoisted_29 = ["src"];

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_icon_picture = resolveComponent("el-icon-picture");
  const _component_el_icon = resolveComponent("el-icon");
  const _component_el_button = resolveComponent("el-button");
  const _component_el_icon_video_camera = resolveComponent("el-icon-video-camera");
  const _component_el_icon_folder_opened = resolveComponent("el-icon-folder-opened");
  const _component_el_input = resolveComponent("el-input");
  const _component_el_icon_plus = resolveComponent("el-icon-plus");
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
    style: normalizeStyle(_ctx.heightStyleName)
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
    createElementVNode("header", _hoisted_5, [
      (_ctx.config.img)
        ? (openBlock(), createElementBlock("img", {
            key: 0,
            src: _ctx.config.img,
            class: "web__logo-img",
            alt: _ctx.config.name || ''
          }, null, 8 /* PROPS */, _hoisted_6))
        : (openBlock(), createElementBlock("span", _hoisted_7, toDisplayString(_ctx.headerInitial), 1 /* TEXT */)),
      createElementVNode("div", _hoisted_8, [
        createElementVNode("p", _hoisted_9, toDisplayString(_ctx.config.name || '在线客服'), 1 /* TEXT */),
        (_ctx.config.dept)
          ? (openBlock(), createElementBlock("p", _hoisted_10, toDisplayString(_ctx.config.dept), 1 /* TEXT */))
          : createCommentVNode("v-if", true)
      ]),
      renderSlot(_ctx.$slots, "header")
    ]),
    createElementVNode("div", _hoisted_11, [
      createElementVNode("section", {
        class: "web__panel",
        style: normalizeStyle(_ctx.widthStyleName)
      }, [
        createElementVNode("div", {
          ref: "main",
          class: "web__main",
          "aria-live": "polite",
          onClick: _cache[0] || (_cache[0] = (...args) => (_ctx.handleContentClick && _ctx.handleContentClick(...args)))
        }, [
          (!_ctx.list.length)
            ? (openBlock(), createElementBlock("div", _hoisted_12, "暂无消息，开始聊天吧"))
            : (openBlock(true), createElementBlock(Fragment, { key: 1 }, renderList(_ctx.list, (item) => {
                return (openBlock(), createElementBlock("div", {
                  key: _ctx.getMessageKey(item),
                  class: normalizeClass(["web__main-item", { 'web__main-item--mine': item.mine }])
                }, [
                  createElementVNode("div", _hoisted_13, [
                    (item.img)
                      ? (openBlock(), createElementBlock("img", {
                          key: 0,
                          src: item.img,
                          alt: item.name || ''
                        }, null, 8 /* PROPS */, _hoisted_14))
                      : (openBlock(), createElementBlock("span", _hoisted_15, toDisplayString(_ctx.getInitial(item.name)), 1 /* TEXT */)),
                    createElementVNode("cite", null, [
                      createTextVNode(toDisplayString(item.name || (item.mine ? _ctx.config.myName : _ctx.config.name) || '用户') + " ", 1 /* TEXT */),
                      (item.date)
                        ? (openBlock(), createElementBlock("i", _hoisted_16, toDisplayString(item.date), 1 /* TEXT */))
                        : createCommentVNode("v-if", true)
                    ])
                  ]),
                  createElementVNode("div", _hoisted_17, [
                    _cache[14] || (_cache[14] = createElementVNode("div", { class: "web__main-arrow" }, null, -1 /* HOISTED */)),
                    createElementVNode("span", {
                      innerHTML: _ctx.formatContent(_ctx.getMessageText(item))
                    }, null, 8 /* PROPS */, _hoisted_18),
                    (item.text && item.text.list && item.text.list.length)
                      ? (openBlock(), createElementBlock("ul", _hoisted_19, [
                          (openBlock(true), createElementBlock(Fragment, null, renderList(item.text.list, (option) => {
                            return (openBlock(), createElementBlock("li", {
                              key: option.id || option.ask || option.text,
                              onClick: $event => (_ctx.handleItemMsg(option))
                            }, toDisplayString(option.text), 9 /* TEXT, PROPS */, _hoisted_20))
                          }), 128 /* KEYED_FRAGMENT */))
                        ]))
                      : createCommentVNode("v-if", true)
                  ])
                ], 2 /* CLASS */))
              }), 128 /* KEYED_FRAGMENT */))
        ], 512 /* NEED_PATCH */),
        createElementVNode("footer", _hoisted_21, [
          createElementVNode("div", _hoisted_22, [
            (_ctx.tools.img)
              ? (openBlock(), createBlock(_component_el_button, {
                  key: 0,
                  text: "",
                  circle: "",
                  title: "添加图片",
                  disabled: _ctx.disabled || _ctx.loading,
                  onClick: _cache[1] || (_cache[1] = $event => (_ctx.handleUpload('img')))
                }, {
                  default: withCtx(() => [
                    createVNode(_component_el_icon, null, {
                      default: withCtx(() => [
                        createVNode(_component_el_icon_picture)
                      ]),
                      _: 1 /* STABLE */
                    })
                  ]),
                  _: 1 /* STABLE */
                }, 8 /* PROPS */, ["disabled"]))
              : createCommentVNode("v-if", true),
            (_ctx.tools.video)
              ? (openBlock(), createBlock(_component_el_button, {
                  key: 1,
                  text: "",
                  circle: "",
                  title: "添加视频",
                  disabled: _ctx.disabled || _ctx.loading,
                  onClick: _cache[2] || (_cache[2] = $event => (_ctx.handleUpload('video')))
                }, {
                  default: withCtx(() => [
                    createVNode(_component_el_icon, null, {
                      default: withCtx(() => [
                        createVNode(_component_el_icon_video_camera)
                      ]),
                      _: 1 /* STABLE */
                    })
                  ]),
                  _: 1 /* STABLE */
                }, 8 /* PROPS */, ["disabled"]))
              : createCommentVNode("v-if", true),
            (_ctx.tools.file)
              ? (openBlock(), createBlock(_component_el_button, {
                  key: 2,
                  text: "",
                  circle: "",
                  title: "添加文件",
                  disabled: _ctx.disabled || _ctx.loading,
                  onClick: _cache[3] || (_cache[3] = $event => (_ctx.handleUpload('file')))
                }, {
                  default: withCtx(() => [
                    createVNode(_component_el_icon, null, {
                      default: withCtx(() => [
                        createVNode(_component_el_icon_folder_opened)
                      ]),
                      _: 1 /* STABLE */
                    })
                  ]),
                  _: 1 /* STABLE */
                }, 8 /* PROPS */, ["disabled"]))
              : createCommentVNode("v-if", true),
            renderSlot(_ctx.$slots, "menu")
          ]),
          createElementVNode("div", _hoisted_23, [
            withDirectives(createElementVNode("textarea", {
              "onUpdate:modelValue": _cache[4] || (_cache[4] = $event => ((_ctx.msg) = $event)),
              rows: "2",
              placeholder: _ctx.messagePlaceholder,
              disabled: _ctx.disabled || _ctx.loading,
              class: "web__msg-input",
              onKeydown: _cache[5] || (_cache[5] = withKeys(withModifiers((...args) => (_ctx.handleSend && _ctx.handleSend(...args)), ["exact","prevent"]), ["enter"]))
            }, null, 40 /* PROPS, NEED_HYDRATION */, _hoisted_24), [
              [vModelText, _ctx.msg]
            ]),
            createElementVNode("div", _hoisted_25, [
              createVNode(_component_el_dropdown, {
                "split-button": "",
                class: "web__msg-submit",
                type: "primary",
                size: _ctx.size,
                disabled: _ctx.disabled || _ctx.loading || !_ctx.msgActive,
                onClick: _ctx.handleSend,
                trigger: "click"
              }, {
                dropdown: withCtx(() => [
                  createVNode(_component_el_dropdown_menu, null, {
                    default: withCtx(() => [
                      createVNode(_component_el_dropdown_item, null, {
                        default: withCtx(() => [
                          createVNode(_component_el_popover, {
                            visible: _ctx.visible,
                            "onUpdate:visible": _cache[8] || (_cache[8] = $event => ((_ctx.visible) = $event)),
                            placement: "top",
                            width: "220"
                          }, {
                            reference: withCtx(() => [
                              createVNode(_component_el_button, {
                                text: "",
                                size: _ctx.size
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_el_icon, null, {
                                    default: withCtx(() => [
                                      createVNode(_component_el_icon_plus)
                                    ]),
                                    _: 1 /* STABLE */
                                  }),
                                  _cache[15] || (_cache[15] = createTextVNode(" 添加快捷回复 "))
                                ]),
                                _: 1 /* STABLE */
                              }, 8 /* PROPS */, ["size"])
                            ]),
                            default: withCtx(() => [
                              createVNode(_component_el_input, {
                                modelValue: _ctx.keys,
                                "onUpdate:modelValue": _cache[6] || (_cache[6] = $event => ((_ctx.keys) = $event)),
                                size: _ctx.size,
                                rows: 3,
                                "show-word-limit": "",
                                placeholder: _ctx.t('chat.quickReplyPlaceholder'),
                                type: "textarea"
                              }, null, 8 /* PROPS */, ["modelValue", "size", "placeholder"]),
                              createElementVNode("div", _hoisted_26, [
                                createVNode(_component_el_button, {
                                  size: _ctx.size,
                                  text: "",
                                  onClick: _cache[7] || (_cache[7] = $event => (_ctx.visible = false))
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(_ctx.t('common.cancelBtn')), 1 /* TEXT */)
                                  ]),
                                  _: 1 /* STABLE */
                                }, 8 /* PROPS */, ["size"]),
                                createVNode(_component_el_button, {
                                  type: "primary",
                                  size: _ctx.size,
                                  onClick: _ctx.addKey
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(_ctx.t('common.submitBtn')), 1 /* TEXT */)
                                  ]),
                                  _: 1 /* STABLE */
                                }, 8 /* PROPS */, ["size", "onClick"])
                              ])
                            ]),
                            _: 1 /* STABLE */
                          }, 8 /* PROPS */, ["visible"])
                        ]),
                        _: 1 /* STABLE */
                      }),
                      (_ctx.keylist.length)
                        ? (openBlock(), createBlock(_component_el_scrollbar, {
                            key: 0,
                            "max-height": "160px"
                          }, {
                            default: withCtx(() => [
                              (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.keylist, (item) => {
                                return (openBlock(), createBlock(_component_el_dropdown_item, {
                                  key: item,
                                  onClick: $event => (_ctx.sendKey(item))
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_el_tooltip, {
                                      effect: "dark",
                                      content: item,
                                      placement: "top"
                                    }, {
                                      default: withCtx(() => [
                                        createElementVNode("span", null, toDisplayString(_ctx.truncateKey(item)), 1 /* TEXT */)
                                      ]),
                                      _: 2 /* DYNAMIC */
                                    }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["content"])
                                  ]),
                                  _: 2 /* DYNAMIC */
                                }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["onClick"]))
                              }), 128 /* KEYED_FRAGMENT */))
                            ]),
                            _: 1 /* STABLE */
                          }))
                        : createCommentVNode("v-if", true)
                    ]),
                    _: 1 /* STABLE */
                  })
                ]),
                default: withCtx(() => [
                  createTextVNode(toDisplayString(_ctx.t('chat.sendBtn')) + " ", 1 /* TEXT */)
                ]),
                _: 1 /* STABLE */
              }, 8 /* PROPS */, ["size", "disabled", "onClick"])
            ])
          ])
        ])
      ], 4 /* STYLE */),
      renderSlot(_ctx.$slots, "default")
    ]),
    createVNode(_component_el_dialog, {
      modelValue: _ctx.upload.box,
      "onUpdate:modelValue": _cache[12] || (_cache[12] = $event => ((_ctx.upload.box) = $event)),
      title: _ctx.upload.title,
      "destroy-on-close": "",
      "append-to-body": _ctx.$AVUE.appendToBody,
      width: "min(460px, 90vw)"
    }, {
      footer: withCtx(() => [
        createVNode(_component_el_button, {
          size: "small",
          onClick: _cache[11] || (_cache[11] = $event => (_ctx.upload.box = false))
        }, {
          default: withCtx(() => [
            createTextVNode(toDisplayString(_ctx.t('common.cancelBtn')), 1 /* TEXT */)
          ]),
          _: 1 /* STABLE */
        }),
        createVNode(_component_el_button, {
          type: "primary",
          size: "small",
          onClick: _ctx.uploadSubmit
        }, {
          default: withCtx(() => [
            createTextVNode(toDisplayString(_ctx.t('common.submitBtn')), 1 /* TEXT */)
          ]),
          _: 1 /* STABLE */
        }, 8 /* PROPS */, ["onClick"])
      ]),
      default: withCtx(() => [
        createVNode(_component_el_form, {
          ref: "uploadForm",
          model: _ctx.upload
        }, {
          default: withCtx(() => [
            createVNode(_component_el_form_item, {
              prop: "src",
              rules: [{ required: true, message: _ctx.t('chat.addressRequired') }]
            }, {
              default: withCtx(() => [
                createVNode(_component_el_input, {
                  modelValue: _ctx.upload.src,
                  "onUpdate:modelValue": _cache[9] || (_cache[9] = $event => ((_ctx.upload.src) = $event)),
                  size: _ctx.size,
                  rows: 4,
                  "show-word-limit": "",
                  maxlength: "500",
                  placeholder: _ctx.t('chat.addressPlaceholder'),
                  type: "textarea"
                }, null, 8 /* PROPS */, ["modelValue", "size", "placeholder"])
              ]),
              _: 1 /* STABLE */
            }, 8 /* PROPS */, ["rules"]),
            (_ctx.upload.type === 'file')
              ? (openBlock(), createBlock(_component_el_form_item, {
                  key: 0,
                  label: "文件名称",
                  prop: "name",
                  rules: [{ required: true, message: '请输入文件名称' }]
                }, {
                  default: withCtx(() => [
                    createVNode(_component_el_input, {
                      modelValue: _ctx.upload.name,
                      "onUpdate:modelValue": _cache[10] || (_cache[10] = $event => ((_ctx.upload.name) = $event)),
                      size: _ctx.size,
                      placeholder: "例如：产品资料.pdf"
                    }, null, 8 /* PROPS */, ["modelValue", "size"])
                  ]),
                  _: 1 /* STABLE */
                }))
              : createCommentVNode("v-if", true)
          ]),
          _: 1 /* STABLE */
        }, 8 /* PROPS */, ["model"])
      ]),
      _: 1 /* STABLE */
    }, 8 /* PROPS */, ["modelValue", "title", "append-to-body"]),
    createVNode(_component_el_dialog, {
      modelValue: _ctx.show,
      "onUpdate:modelValue": _cache[13] || (_cache[13] = $event => ((_ctx.show) = $event)),
      width: "min(680px, 90vw)",
      "destroy-on-close": "",
      "append-to-body": _ctx.$AVUE.appendToBody,
      class: "web__dialog",
      onClosed: _ctx.resetPreview
    }, {
      default: withCtx(() => [
        (_ctx.imgSrc)
          ? (openBlock(), createElementBlock("img", {
              key: 0,
              src: _ctx.imgSrc,
              class: "web__preview-image",
              alt: "预览图片"
            }, null, 8 /* PROPS */, _hoisted_27))
          : createCommentVNode("v-if", true),
        (_ctx.videoSrc)
          ? (openBlock(), createElementBlock("video", {
              key: 1,
              src: _ctx.videoSrc,
              class: "web__preview-media",
              controls: ""
            }, null, 8 /* PROPS */, _hoisted_28))
          : createCommentVNode("v-if", true),
        (_ctx.audioSrc)
          ? (openBlock(), createElementBlock("audio", {
              key: 2,
              src: _ctx.audioSrc,
              class: "web__preview-media",
              controls: ""
            }, null, 8 /* PROPS */, _hoisted_29))
          : createCommentVNode("v-if", true)
      ]),
      _: 1 /* STABLE */
    }, 8 /* PROPS */, ["modelValue", "append-to-body", "onClosed"])
  ], 6 /* CLASS, STYLE */))
}

export { render };
