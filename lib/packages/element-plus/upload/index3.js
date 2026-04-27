/*! Avue.js v3.9.1 | (c) 2017-2026 Smallwei | Released under the MIT License. */
'use strict';

var vue = require('vue');

const _hoisted_1 = ["element-loading-text"];
const _hoisted_2 = { class: "el-upload__text" };
const _hoisted_3 = ["innerHTML"];
const _hoisted_4 = ["element-loading-text"];
const _hoisted_5 = { class: "el-upload-list__item-actions" };
const _hoisted_6 = { class: "el-upload-list__item-preview" };
const _hoisted_7 = {
  key: 0,
  class: "el-upload-list__item-delete"
};
const _hoisted_8 = ["onClick"];
const _hoisted_9 = { class: "el-upload-list__item-info" };
const _hoisted_10 = { class: "el-upload-list__item-name" };
const _hoisted_11 = { class: "el-upload-list__item-file-name" };
const _hoisted_12 = ["onClick"];
const _hoisted_13 = { class: "el-upload-list__item-info" };
const _hoisted_14 = { class: "el-upload-list__item-name" };
const _hoisted_15 = { class: "el-upload-list__item-file-name" };

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_icon_plus = vue.resolveComponent("el-icon-plus");
  const _component_el_icon = vue.resolveComponent("el-icon");
  const _component_el_progress = vue.resolveComponent("el-progress");
  const _component_el_icon_document = vue.resolveComponent("el-icon-document");
  const _component_el_icon_zoom_in = vue.resolveComponent("el-icon-zoom-in");
  const _component_el_icon_delete = vue.resolveComponent("el-icon-delete");
  const _component_el_icon_upload = vue.resolveComponent("el-icon-upload");
  const _component_el_button = vue.resolveComponent("el-button");
  const _component_el_icon_close = vue.resolveComponent("el-icon-close");
  const _component_el_upload = vue.resolveComponent("el-upload");
  const _directive_loading = vue.resolveDirective("loading");

  return (vue.openBlock(), vue.createBlock(_component_el_upload, {
    key: _ctx.reload,
    class: vue.normalizeClass([
      _ctx.b({ list: _ctx.listType == 'picture-img', disabled: _ctx.disabled }),
      'avue-upload--' + _ctx.listType,
    ]),
    onClick: _ctx.handleClick,
    action: _ctx.action,
    "on-remove": _ctx.handleRemove,
    accept: _ctx.acceptList,
    "before-remove": _ctx.beforeRemove,
    multiple: _ctx.multiple,
    "on-preview": _ctx.handlePreview,
    limit: _ctx.limit,
    "http-request": _ctx.httpUpload,
    drag: _ctx.dragFile,
    readonly: _ctx.readonly,
    directory: _ctx.directory,
    "show-file-list": _ctx.isPictureImg ? false : _ctx.showFileList,
    "list-type": _ctx.listTypeText,
    "on-change": _ctx.handleFileChange,
    "on-exceed": _ctx.handleExceed,
    disabled: _ctx.disabled,
    "file-list": _ctx.fileList
  }, {
    tip: vue.withCtx(() => [
      vue.createElementVNode("div", {
        class: "el-upload__tip",
        innerHTML: _ctx.tip
      }, null, 8 /* PROPS */, _hoisted_3)
    ]),
    file: vue.withCtx(({ file }) => [
      vue.withDirectives((vue.openBlock(), vue.createElementBlock("span", { "element-loading-text": _ctx.loadText }, [
        (_ctx.listType === 'picture-card')
          ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 0 }, [
              (_ctx.showProgress(file))
                ? (vue.openBlock(), vue.createBlock(_component_el_progress, {
                    key: 0,
                    type: "circle",
                    percentage: file.percentage
                  }, null, 8 /* PROPS */, ["percentage"]))
                : (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 1 }, [
                    (_ctx.$slots.default)
                      ? vue.renderSlot(_ctx.$slots, "default", {
                          key: 0,
                          file: file
                        })
                      : (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 1 }, [
                          (file.type)
                            ? (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(file.type), {
                                key: 0,
                                class: "el-upload-list__item-thumbnail",
                                src: file.url
                              }, null, 8 /* PROPS */, ["src"]))
                            : (vue.openBlock(), vue.createBlock(_component_el_icon, {
                                key: 1,
                                class: vue.normalizeClass(_ctx.b('avatar'))
                              }, {
                                default: vue.withCtx(() => [
                                  vue.createVNode(_component_el_icon_document)
                                ]),
                                _: 1 /* STABLE */
                              }, 8 /* PROPS */, ["class"]))
                        ], 64 /* STABLE_FRAGMENT */))
                  ], 64 /* STABLE_FRAGMENT */)),
              vue.createElementVNode("span", _hoisted_5, [
                vue.createElementVNode("span", _hoisted_6, [
                  vue.createVNode(_component_el_icon, null, {
                    default: vue.withCtx(() => [
                      vue.createVNode(_component_el_icon_zoom_in, {
                        onClick: vue.withModifiers($event => (_ctx.handlePreview(file)), ["stop"])
                      }, null, 8 /* PROPS */, ["onClick"])
                    ]),
                    _: 2 /* DYNAMIC */
                  }, 1024 /* DYNAMIC_SLOTS */)
                ]),
                (!_ctx.disabled)
                  ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_7, [
                      vue.createVNode(_component_el_icon, null, {
                        default: vue.withCtx(() => [
                          vue.createVNode(_component_el_icon_delete, {
                            onClick: vue.withModifiers($event => (_ctx.handleRemove(file)), ["stop"])
                          }, null, 8 /* PROPS */, ["onClick"])
                        ]),
                        _: 2 /* DYNAMIC */
                      }, 1024 /* DYNAMIC_SLOTS */)
                    ]))
                  : vue.createCommentVNode("v-if", true)
              ])
            ], 64 /* STABLE_FRAGMENT */))
          : (_ctx.listType === 'picture')
            ? (vue.openBlock(), vue.createElementBlock("div", {
                key: 1,
                style: {"display":"flex"},
                onClick: vue.withModifiers($event => (_ctx.handlePreview(file)), ["stop"])
              }, [
                (_ctx.$slots.default)
                  ? vue.renderSlot(_ctx.$slots, "default", {
                      key: 0,
                      file: file
                    })
                  : (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 1 }, [
                      (file.type)
                        ? (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(file.type), {
                            key: 0,
                            class: "el-upload-list__item-thumbnail",
                            src: file.url,
                            controls: "controls"
                          }, null, 8 /* PROPS */, ["src"]))
                        : vue.createCommentVNode("v-if", true),
                      vue.createElementVNode("div", _hoisted_9, [
                        vue.createElementVNode("a", _hoisted_10, [
                          vue.createVNode(_component_el_icon, null, {
                            default: vue.withCtx(() => [
                              vue.createVNode(_component_el_icon_document)
                            ]),
                            _: 1 /* STABLE */
                          }),
                          vue.createElementVNode("span", _hoisted_11, vue.toDisplayString(file.name), 1 /* TEXT */)
                        ])
                      ])
                    ], 64 /* STABLE_FRAGMENT */)),
                (!_ctx.disabled)
                  ? (vue.openBlock(), vue.createBlock(_component_el_icon, {
                      key: 2,
                      class: "el-icon--close"
                    }, {
                      default: vue.withCtx(() => [
                        vue.createVNode(_component_el_icon_close, {
                          onClick: vue.withModifiers($event => (_ctx.handleRemove(file)), ["stop"])
                        }, null, 8 /* PROPS */, ["onClick"])
                      ]),
                      _: 2 /* DYNAMIC */
                    }, 1024 /* DYNAMIC_SLOTS */))
                  : vue.createCommentVNode("v-if", true),
                (_ctx.showProgress(file))
                  ? (vue.openBlock(), vue.createBlock(_component_el_progress, {
                      key: 3,
                      class: vue.normalizeClass(_ctx.b('progress')),
                      percentage: file.percentage,
                      "stroke-width": 3
                    }, null, 8 /* PROPS */, ["class", "percentage"]))
                  : vue.createCommentVNode("v-if", true)
              ], 8 /* PROPS */, _hoisted_8))
            : (vue.openBlock(), vue.createElementBlock("span", {
                key: 2,
                onClick: vue.withModifiers($event => (_ctx.handlePreview(file)), ["stop"])
              }, [
                vue.createElementVNode("div", _hoisted_13, [
                  vue.createElementVNode("a", _hoisted_14, [
                    (_ctx.$slots.default)
                      ? vue.renderSlot(_ctx.$slots, "default", {
                          key: 0,
                          file: file
                        })
                      : (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 1 }, [
                          vue.createVNode(_component_el_icon, null, {
                            default: vue.withCtx(() => [
                              vue.createVNode(_component_el_icon_document)
                            ]),
                            _: 1 /* STABLE */
                          }),
                          vue.createElementVNode("span", _hoisted_15, vue.toDisplayString(file.name), 1 /* TEXT */)
                        ], 64 /* STABLE_FRAGMENT */))
                  ]),
                  (!_ctx.disabled)
                    ? (vue.openBlock(), vue.createBlock(_component_el_icon, {
                        key: 0,
                        class: "el-icon--close"
                      }, {
                        default: vue.withCtx(() => [
                          vue.createVNode(_component_el_icon_close, {
                            onClick: vue.withModifiers($event => (_ctx.handleRemove(file)), ["stop"])
                          }, null, 8 /* PROPS */, ["onClick"])
                        ]),
                        _: 2 /* DYNAMIC */
                      }, 1024 /* DYNAMIC_SLOTS */))
                    : vue.createCommentVNode("v-if", true),
                  (_ctx.showProgress(file))
                    ? (vue.openBlock(), vue.createBlock(_component_el_progress, {
                        key: 1,
                        class: vue.normalizeClass(_ctx.b('progress')),
                        percentage: file.percentage,
                        "stroke-width": 3
                      }, null, 8 /* PROPS */, ["class", "percentage"]))
                    : vue.createCommentVNode("v-if", true)
                ])
              ], 8 /* PROPS */, _hoisted_12))
      ], 8 /* PROPS */, _hoisted_4)), [
        [
          _directive_loading,
          file.loading,
          void 0,
          { lock: true }
        ]
      ])
    ]),
    default: vue.withCtx(() => [
      (_ctx.listType == 'picture-card')
        ? (vue.openBlock(), vue.createBlock(_component_el_icon, { key: 0 }, {
            default: vue.withCtx(() => [
              vue.createVNode(_component_el_icon_plus)
            ]),
            _: 1 /* STABLE */
          }))
        : (_ctx.listType == 'picture-img')
          ? (vue.openBlock(), vue.createElementBlock("div", {
              key: 1,
              class: vue.normalizeClass(_ctx.b('avatar'))
            }, [
              (_ctx.showProgress(_ctx.firstFile))
                ? (vue.openBlock(), vue.createBlock(_component_el_progress, {
                    key: 0,
                    type: "circle",
                    onMouseover: _ctx.handleMouseover,
                    percentage: _ctx.firstFile.percentage
                  }, null, 8 /* PROPS */, ["onMouseover", "percentage"]))
                : vue.withDirectives((vue.openBlock(), vue.createElementBlock("div", {
                    key: 1,
                    "element-loading-text": _ctx.loadText
                  }, [
                    (_ctx.firstFile.url)
                      ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 0 }, [
                          (_ctx.$slots.default)
                            ? vue.renderSlot(_ctx.$slots, "default", {
                                key: 0,
                                file: _ctx.firstFile
                              })
                            : (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 1 }, [
                                (_ctx.firstFile.type)
                                  ? (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.firstFile.type), {
                                      key: 0,
                                      src: _ctx.firstFile.url,
                                      controls: "controls",
                                      onMouseover: _ctx.handleMouseover,
                                      class: vue.normalizeClass(_ctx.b('avatar'))
                                    }, null, 40 /* PROPS, NEED_HYDRATION */, ["src", "onMouseover", "class"]))
                                  : (vue.openBlock(), vue.createBlock(_component_el_icon, {
                                      key: 1,
                                      onMouseover: _ctx.handleMouseover,
                                      src: _ctx.firstFile.url,
                                      class: vue.normalizeClass(_ctx.b('avatar'))
                                    }, {
                                      default: vue.withCtx(() => [
                                        vue.createVNode(_component_el_icon_document)
                                      ]),
                                      _: 1 /* STABLE */
                                    }, 8 /* PROPS */, ["onMouseover", "src", "class"]))
                              ], 64 /* STABLE_FRAGMENT */))
                        ], 64 /* STABLE_FRAGMENT */))
                      : (vue.openBlock(), vue.createBlock(_component_el_icon, {
                          key: 1,
                          class: vue.normalizeClass(_ctx.b('avatar'))
                        }, {
                          default: vue.withCtx(() => [
                            vue.createVNode(_component_el_icon_plus)
                          ]),
                          _: 1 /* STABLE */
                        }, 8 /* PROPS */, ["class"]))
                  ], 8 /* PROPS */, _hoisted_1)), [
                    [
                      _directive_loading,
                      _ctx.firstFile.loading,
                      void 0,
                      { lock: true }
                    ]
                  ]),
              (_ctx.menu)
                ? (vue.openBlock(), vue.createElementBlock("div", {
                    key: 2,
                    class: vue.normalizeClass(["el-upload-list__item-actions", _ctx.b('menu')]),
                    onMouseover: _cache[2] || (_cache[2] = (...args) => (_ctx.handleMouseover && _ctx.handleMouseover(...args))),
                    onMouseout: _cache[3] || (_cache[3] = (...args) => (_ctx.handleMouseout && _ctx.handleMouseout(...args))),
                    onClick: vue.withModifiers(
          () => {
            return false;
          }
        , ["stop"])
                  }, [
                    vue.createVNode(_component_el_icon, {
                      onClick: _cache[0] || (_cache[0] = vue.withModifiers($event => (_ctx.handlePreview(_ctx.firstFile)), ["stop"]))
                    }, {
                      default: vue.withCtx(() => [
                        vue.createVNode(_component_el_icon_zoom_in)
                      ]),
                      _: 1 /* STABLE */
                    }),
                    (!_ctx.disabled)
                      ? (vue.openBlock(), vue.createBlock(_component_el_icon, {
                          key: 0,
                          onClick: _cache[1] || (_cache[1] = vue.withModifiers($event => (_ctx.handleRemove(_ctx.firstFile)), ["stop"]))
                        }, {
                          default: vue.withCtx(() => [
                            vue.createVNode(_component_el_icon_delete)
                          ]),
                          _: 1 /* STABLE */
                        }))
                      : vue.createCommentVNode("v-if", true)
                  ], 34 /* CLASS, NEED_HYDRATION */))
                : vue.createCommentVNode("v-if", true)
            ], 2 /* CLASS */))
          : (_ctx.dragFile)
            ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 2 }, [
                vue.createVNode(_component_el_icon, null, {
                  default: vue.withCtx(() => [
                    vue.createVNode(_component_el_icon_upload)
                  ]),
                  _: 1 /* STABLE */
                }),
                vue.createElementVNode("div", _hoisted_2, [
                  vue.createElementVNode("em", null, vue.toDisplayString(_ctx.fileText || _ctx.t("upload.upload")), 1 /* TEXT */)
                ])
              ], 64 /* STABLE_FRAGMENT */))
            : (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 3 }, [
                (_ctx.$slots.button)
                  ? vue.renderSlot(_ctx.$slots, "button", {
                      key: 0,
                      disabled: _ctx.disabled
                    })
                  : (vue.openBlock(), vue.createBlock(_component_el_button, {
                      key: 1,
                      icon: "el-icon-upload",
                      size: _ctx.size,
                      disabled: _ctx.disabled,
                      type: "primary"
                    }, {
                      default: vue.withCtx(() => [
                        vue.createTextVNode(vue.toDisplayString(_ctx.fileText || _ctx.t("upload.upload")), 1 /* TEXT */)
                      ]),
                      _: 1 /* STABLE */
                    }, 8 /* PROPS */, ["size", "disabled"]))
              ], 64 /* STABLE_FRAGMENT */))
    ]),
    _: 3 /* FORWARDED */
  }, 8 /* PROPS */, ["class", "onClick", "action", "on-remove", "accept", "before-remove", "multiple", "on-preview", "limit", "http-request", "drag", "readonly", "directory", "show-file-list", "list-type", "on-change", "on-exceed", "disabled", "file-list"]))
}

exports.render = render;
