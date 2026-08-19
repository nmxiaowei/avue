/*! Avue.js v3.9.4 | (c) 2017-2026 Smallwei | Released under the MIT License. */
'use strict';

var vue = require('vue');

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
  const _component_el_icon_picture = vue.resolveComponent("el-icon-picture");
  const _component_el_icon = vue.resolveComponent("el-icon");
  const _component_el_button = vue.resolveComponent("el-button");
  const _component_el_icon_video_camera = vue.resolveComponent("el-icon-video-camera");
  const _component_el_icon_folder_opened = vue.resolveComponent("el-icon-folder-opened");
  const _component_el_input = vue.resolveComponent("el-input");
  const _component_el_icon_plus = vue.resolveComponent("el-icon-plus");
  const _component_el_popover = vue.resolveComponent("el-popover");
  const _component_el_dropdown_item = vue.resolveComponent("el-dropdown-item");
  const _component_el_tooltip = vue.resolveComponent("el-tooltip");
  const _component_el_scrollbar = vue.resolveComponent("el-scrollbar");
  const _component_el_dropdown_menu = vue.resolveComponent("el-dropdown-menu");
  const _component_el_dropdown = vue.resolveComponent("el-dropdown");
  const _component_el_form_item = vue.resolveComponent("el-form-item");
  const _component_el_form = vue.resolveComponent("el-form");
  const _component_el_dialog = vue.resolveComponent("el-dialog");

  return (vue.openBlock(), vue.createElementBlock("div", {
    class: vue.normalizeClass(_ctx.b()),
    style: vue.normalizeStyle(_ctx.heightStyleName)
  }, [
    vue.createElementVNode("audio", _hoisted_1, [
      vue.createElementVNode("source", {
        src: _ctx.audio[0],
        type: "audio/ogg"
      }, null, 8 /* PROPS */, _hoisted_2),
      vue.createElementVNode("source", {
        src: _ctx.audio[1],
        type: "audio/mpeg"
      }, null, 8 /* PROPS */, _hoisted_3),
      vue.createElementVNode("source", {
        src: _ctx.audio[2],
        type: "audio/wav"
      }, null, 8 /* PROPS */, _hoisted_4)
    ], 512 /* NEED_PATCH */),
    vue.createElementVNode("header", _hoisted_5, [
      (_ctx.config.img)
        ? (vue.openBlock(), vue.createElementBlock("img", {
            key: 0,
            src: _ctx.config.img,
            class: "web__logo-img",
            alt: _ctx.config.name || ''
          }, null, 8 /* PROPS */, _hoisted_6))
        : (vue.openBlock(), vue.createElementBlock("span", _hoisted_7, vue.toDisplayString(_ctx.headerInitial), 1 /* TEXT */)),
      vue.createElementVNode("div", _hoisted_8, [
        vue.createElementVNode("p", _hoisted_9, vue.toDisplayString(_ctx.config.name || '在线客服'), 1 /* TEXT */),
        (_ctx.config.dept)
          ? (vue.openBlock(), vue.createElementBlock("p", _hoisted_10, vue.toDisplayString(_ctx.config.dept), 1 /* TEXT */))
          : vue.createCommentVNode("v-if", true)
      ]),
      vue.renderSlot(_ctx.$slots, "header")
    ]),
    vue.createElementVNode("div", _hoisted_11, [
      vue.createElementVNode("section", {
        class: "web__panel",
        style: vue.normalizeStyle(_ctx.widthStyleName)
      }, [
        vue.createElementVNode("div", {
          ref: "main",
          class: "web__main",
          "aria-live": "polite",
          onClick: _cache[0] || (_cache[0] = (...args) => (_ctx.handleContentClick && _ctx.handleContentClick(...args)))
        }, [
          (!_ctx.list.length)
            ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_12, "暂无消息，开始聊天吧"))
            : (vue.openBlock(true), vue.createElementBlock(vue.Fragment, { key: 1 }, vue.renderList(_ctx.list, (item) => {
                return (vue.openBlock(), vue.createElementBlock("div", {
                  key: _ctx.getMessageKey(item),
                  class: vue.normalizeClass(["web__main-item", { 'web__main-item--mine': item.mine }])
                }, [
                  vue.createElementVNode("div", _hoisted_13, [
                    (item.img)
                      ? (vue.openBlock(), vue.createElementBlock("img", {
                          key: 0,
                          src: item.img,
                          alt: item.name || ''
                        }, null, 8 /* PROPS */, _hoisted_14))
                      : (vue.openBlock(), vue.createElementBlock("span", _hoisted_15, vue.toDisplayString(_ctx.getInitial(item.name)), 1 /* TEXT */)),
                    vue.createElementVNode("cite", null, [
                      vue.createTextVNode(vue.toDisplayString(item.name || (item.mine ? _ctx.config.myName : _ctx.config.name) || '用户') + " ", 1 /* TEXT */),
                      (item.date)
                        ? (vue.openBlock(), vue.createElementBlock("i", _hoisted_16, vue.toDisplayString(item.date), 1 /* TEXT */))
                        : vue.createCommentVNode("v-if", true)
                    ])
                  ]),
                  vue.createElementVNode("div", _hoisted_17, [
                    _cache[14] || (_cache[14] = vue.createElementVNode("div", { class: "web__main-arrow" }, null, -1 /* HOISTED */)),
                    vue.createElementVNode("span", {
                      innerHTML: _ctx.formatContent(_ctx.getMessageText(item))
                    }, null, 8 /* PROPS */, _hoisted_18),
                    (item.text && item.text.list && item.text.list.length)
                      ? (vue.openBlock(), vue.createElementBlock("ul", _hoisted_19, [
                          (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(item.text.list, (option) => {
                            return (vue.openBlock(), vue.createElementBlock("li", {
                              key: option.id || option.ask || option.text,
                              onClick: $event => (_ctx.handleItemMsg(option))
                            }, vue.toDisplayString(option.text), 9 /* TEXT, PROPS */, _hoisted_20))
                          }), 128 /* KEYED_FRAGMENT */))
                        ]))
                      : vue.createCommentVNode("v-if", true)
                  ])
                ], 2 /* CLASS */))
              }), 128 /* KEYED_FRAGMENT */))
        ], 512 /* NEED_PATCH */),
        vue.createElementVNode("footer", _hoisted_21, [
          vue.createElementVNode("div", _hoisted_22, [
            (_ctx.tools.img)
              ? (vue.openBlock(), vue.createBlock(_component_el_button, {
                  key: 0,
                  text: "",
                  circle: "",
                  title: "添加图片",
                  disabled: _ctx.disabled || _ctx.loading,
                  onClick: _cache[1] || (_cache[1] = $event => (_ctx.handleUpload('img')))
                }, {
                  default: vue.withCtx(() => [
                    vue.createVNode(_component_el_icon, null, {
                      default: vue.withCtx(() => [
                        vue.createVNode(_component_el_icon_picture)
                      ]),
                      _: 1 /* STABLE */
                    })
                  ]),
                  _: 1 /* STABLE */
                }, 8 /* PROPS */, ["disabled"]))
              : vue.createCommentVNode("v-if", true),
            (_ctx.tools.video)
              ? (vue.openBlock(), vue.createBlock(_component_el_button, {
                  key: 1,
                  text: "",
                  circle: "",
                  title: "添加视频",
                  disabled: _ctx.disabled || _ctx.loading,
                  onClick: _cache[2] || (_cache[2] = $event => (_ctx.handleUpload('video')))
                }, {
                  default: vue.withCtx(() => [
                    vue.createVNode(_component_el_icon, null, {
                      default: vue.withCtx(() => [
                        vue.createVNode(_component_el_icon_video_camera)
                      ]),
                      _: 1 /* STABLE */
                    })
                  ]),
                  _: 1 /* STABLE */
                }, 8 /* PROPS */, ["disabled"]))
              : vue.createCommentVNode("v-if", true),
            (_ctx.tools.file)
              ? (vue.openBlock(), vue.createBlock(_component_el_button, {
                  key: 2,
                  text: "",
                  circle: "",
                  title: "添加文件",
                  disabled: _ctx.disabled || _ctx.loading,
                  onClick: _cache[3] || (_cache[3] = $event => (_ctx.handleUpload('file')))
                }, {
                  default: vue.withCtx(() => [
                    vue.createVNode(_component_el_icon, null, {
                      default: vue.withCtx(() => [
                        vue.createVNode(_component_el_icon_folder_opened)
                      ]),
                      _: 1 /* STABLE */
                    })
                  ]),
                  _: 1 /* STABLE */
                }, 8 /* PROPS */, ["disabled"]))
              : vue.createCommentVNode("v-if", true),
            vue.renderSlot(_ctx.$slots, "menu")
          ]),
          vue.createElementVNode("div", _hoisted_23, [
            vue.withDirectives(vue.createElementVNode("textarea", {
              "onUpdate:modelValue": _cache[4] || (_cache[4] = $event => ((_ctx.msg) = $event)),
              rows: "2",
              placeholder: _ctx.messagePlaceholder,
              disabled: _ctx.disabled || _ctx.loading,
              class: "web__msg-input",
              onKeydown: _cache[5] || (_cache[5] = vue.withKeys(vue.withModifiers((...args) => (_ctx.handleSend && _ctx.handleSend(...args)), ["exact","prevent"]), ["enter"]))
            }, null, 40 /* PROPS, NEED_HYDRATION */, _hoisted_24), [
              [vue.vModelText, _ctx.msg]
            ]),
            vue.createElementVNode("div", _hoisted_25, [
              vue.createVNode(_component_el_dropdown, {
                "split-button": "",
                class: "web__msg-submit",
                type: "primary",
                size: _ctx.size,
                disabled: _ctx.disabled || _ctx.loading || !_ctx.msgActive,
                onClick: _ctx.handleSend,
                trigger: "click"
              }, {
                dropdown: vue.withCtx(() => [
                  vue.createVNode(_component_el_dropdown_menu, null, {
                    default: vue.withCtx(() => [
                      vue.createVNode(_component_el_dropdown_item, null, {
                        default: vue.withCtx(() => [
                          vue.createVNode(_component_el_popover, {
                            visible: _ctx.visible,
                            "onUpdate:visible": _cache[8] || (_cache[8] = $event => ((_ctx.visible) = $event)),
                            placement: "top",
                            width: "220"
                          }, {
                            reference: vue.withCtx(() => [
                              vue.createVNode(_component_el_button, {
                                text: "",
                                size: _ctx.size
                              }, {
                                default: vue.withCtx(() => [
                                  vue.createVNode(_component_el_icon, null, {
                                    default: vue.withCtx(() => [
                                      vue.createVNode(_component_el_icon_plus)
                                    ]),
                                    _: 1 /* STABLE */
                                  }),
                                  _cache[15] || (_cache[15] = vue.createTextVNode(" 添加快捷回复 "))
                                ]),
                                _: 1 /* STABLE */
                              }, 8 /* PROPS */, ["size"])
                            ]),
                            default: vue.withCtx(() => [
                              vue.createVNode(_component_el_input, {
                                modelValue: _ctx.keys,
                                "onUpdate:modelValue": _cache[6] || (_cache[6] = $event => ((_ctx.keys) = $event)),
                                size: _ctx.size,
                                rows: 3,
                                "show-word-limit": "",
                                placeholder: _ctx.t('chat.quickReplyPlaceholder'),
                                type: "textarea"
                              }, null, 8 /* PROPS */, ["modelValue", "size", "placeholder"]),
                              vue.createElementVNode("div", _hoisted_26, [
                                vue.createVNode(_component_el_button, {
                                  size: _ctx.size,
                                  text: "",
                                  onClick: _cache[7] || (_cache[7] = $event => (_ctx.visible = false))
                                }, {
                                  default: vue.withCtx(() => [
                                    vue.createTextVNode(vue.toDisplayString(_ctx.t('common.cancelBtn')), 1 /* TEXT */)
                                  ]),
                                  _: 1 /* STABLE */
                                }, 8 /* PROPS */, ["size"]),
                                vue.createVNode(_component_el_button, {
                                  type: "primary",
                                  size: _ctx.size,
                                  onClick: _ctx.addKey
                                }, {
                                  default: vue.withCtx(() => [
                                    vue.createTextVNode(vue.toDisplayString(_ctx.t('common.submitBtn')), 1 /* TEXT */)
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
                        ? (vue.openBlock(), vue.createBlock(_component_el_scrollbar, {
                            key: 0,
                            "max-height": "160px"
                          }, {
                            default: vue.withCtx(() => [
                              (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.keylist, (item) => {
                                return (vue.openBlock(), vue.createBlock(_component_el_dropdown_item, {
                                  key: item,
                                  onClick: $event => (_ctx.sendKey(item))
                                }, {
                                  default: vue.withCtx(() => [
                                    vue.createVNode(_component_el_tooltip, {
                                      effect: "dark",
                                      content: item,
                                      placement: "top"
                                    }, {
                                      default: vue.withCtx(() => [
                                        vue.createElementVNode("span", null, vue.toDisplayString(_ctx.truncateKey(item)), 1 /* TEXT */)
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
                        : vue.createCommentVNode("v-if", true)
                    ]),
                    _: 1 /* STABLE */
                  })
                ]),
                default: vue.withCtx(() => [
                  vue.createTextVNode(vue.toDisplayString(_ctx.t('chat.sendBtn')) + " ", 1 /* TEXT */)
                ]),
                _: 1 /* STABLE */
              }, 8 /* PROPS */, ["size", "disabled", "onClick"])
            ])
          ])
        ])
      ], 4 /* STYLE */),
      vue.renderSlot(_ctx.$slots, "default")
    ]),
    vue.createVNode(_component_el_dialog, {
      modelValue: _ctx.upload.box,
      "onUpdate:modelValue": _cache[12] || (_cache[12] = $event => ((_ctx.upload.box) = $event)),
      title: _ctx.upload.title,
      "destroy-on-close": "",
      "append-to-body": _ctx.$AVUE.appendToBody,
      width: "min(460px, 90vw)"
    }, {
      footer: vue.withCtx(() => [
        vue.createVNode(_component_el_button, {
          size: "small",
          onClick: _cache[11] || (_cache[11] = $event => (_ctx.upload.box = false))
        }, {
          default: vue.withCtx(() => [
            vue.createTextVNode(vue.toDisplayString(_ctx.t('common.cancelBtn')), 1 /* TEXT */)
          ]),
          _: 1 /* STABLE */
        }),
        vue.createVNode(_component_el_button, {
          type: "primary",
          size: "small",
          onClick: _ctx.uploadSubmit
        }, {
          default: vue.withCtx(() => [
            vue.createTextVNode(vue.toDisplayString(_ctx.t('common.submitBtn')), 1 /* TEXT */)
          ]),
          _: 1 /* STABLE */
        }, 8 /* PROPS */, ["onClick"])
      ]),
      default: vue.withCtx(() => [
        vue.createVNode(_component_el_form, {
          ref: "uploadForm",
          model: _ctx.upload
        }, {
          default: vue.withCtx(() => [
            vue.createVNode(_component_el_form_item, {
              prop: "src",
              rules: [{ required: true, message: _ctx.t('chat.addressRequired') }]
            }, {
              default: vue.withCtx(() => [
                vue.createVNode(_component_el_input, {
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
              ? (vue.openBlock(), vue.createBlock(_component_el_form_item, {
                  key: 0,
                  label: "文件名称",
                  prop: "name",
                  rules: [{ required: true, message: '请输入文件名称' }]
                }, {
                  default: vue.withCtx(() => [
                    vue.createVNode(_component_el_input, {
                      modelValue: _ctx.upload.name,
                      "onUpdate:modelValue": _cache[10] || (_cache[10] = $event => ((_ctx.upload.name) = $event)),
                      size: _ctx.size,
                      placeholder: "例如：产品资料.pdf"
                    }, null, 8 /* PROPS */, ["modelValue", "size"])
                  ]),
                  _: 1 /* STABLE */
                }))
              : vue.createCommentVNode("v-if", true)
          ]),
          _: 1 /* STABLE */
        }, 8 /* PROPS */, ["model"])
      ]),
      _: 1 /* STABLE */
    }, 8 /* PROPS */, ["modelValue", "title", "append-to-body"]),
    vue.createVNode(_component_el_dialog, {
      modelValue: _ctx.show,
      "onUpdate:modelValue": _cache[13] || (_cache[13] = $event => ((_ctx.show) = $event)),
      width: "min(680px, 90vw)",
      "destroy-on-close": "",
      "append-to-body": _ctx.$AVUE.appendToBody,
      class: "web__dialog",
      onClosed: _ctx.resetPreview
    }, {
      default: vue.withCtx(() => [
        (_ctx.imgSrc)
          ? (vue.openBlock(), vue.createElementBlock("img", {
              key: 0,
              src: _ctx.imgSrc,
              class: "web__preview-image",
              alt: "预览图片"
            }, null, 8 /* PROPS */, _hoisted_27))
          : vue.createCommentVNode("v-if", true),
        (_ctx.videoSrc)
          ? (vue.openBlock(), vue.createElementBlock("video", {
              key: 1,
              src: _ctx.videoSrc,
              class: "web__preview-media",
              controls: ""
            }, null, 8 /* PROPS */, _hoisted_28))
          : vue.createCommentVNode("v-if", true),
        (_ctx.audioSrc)
          ? (vue.openBlock(), vue.createElementBlock("audio", {
              key: 2,
              src: _ctx.audioSrc,
              class: "web__preview-media",
              controls: ""
            }, null, 8 /* PROPS */, _hoisted_29))
          : vue.createCommentVNode("v-if", true)
      ]),
      _: 1 /* STABLE */
    }, 8 /* PROPS */, ["modelValue", "append-to-body", "onClosed"])
  ], 6 /* CLASS, STYLE */))
}

exports.render = render;
