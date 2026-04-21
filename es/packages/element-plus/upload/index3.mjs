/*! Avue.js v3.8.6 | (c) 2017-2026 Smallwei | Released under the MIT License. */
import { resolveComponent, resolveDirective, openBlock, createBlock, normalizeClass, withCtx, createVNode, createElementBlock, withDirectives, Fragment, renderSlot, resolveDynamicComponent, withModifiers, createCommentVNode, createElementVNode, toDisplayString, createTextVNode } from 'vue';

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
  const _component_el_icon_plus = resolveComponent("el-icon-plus");
  const _component_el_icon = resolveComponent("el-icon");
  const _component_el_progress = resolveComponent("el-progress");
  const _component_el_icon_document = resolveComponent("el-icon-document");
  const _component_el_icon_zoom_in = resolveComponent("el-icon-zoom-in");
  const _component_el_icon_delete = resolveComponent("el-icon-delete");
  const _component_el_icon_upload = resolveComponent("el-icon-upload");
  const _component_el_button = resolveComponent("el-button");
  const _component_el_icon_close = resolveComponent("el-icon-close");
  const _component_el_upload = resolveComponent("el-upload");
  const _directive_loading = resolveDirective("loading");

  return (openBlock(), createBlock(_component_el_upload, {
    key: _ctx.reload,
    class: normalizeClass([
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
    tip: withCtx(() => [
      createElementVNode("div", {
        class: "el-upload__tip",
        innerHTML: _ctx.tip
      }, null, 8 /* PROPS */, _hoisted_3)
    ]),
    file: withCtx(({ file }) => [
      withDirectives((openBlock(), createElementBlock("span", { "element-loading-text": _ctx.loadText }, [
        (_ctx.listType === 'picture-card')
          ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
              (_ctx.showProgress(file))
                ? (openBlock(), createBlock(_component_el_progress, {
                    key: 0,
                    type: "circle",
                    percentage: file.percentage
                  }, null, 8 /* PROPS */, ["percentage"]))
                : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                    (_ctx.$slots.default)
                      ? renderSlot(_ctx.$slots, "default", {
                          key: 0,
                          file: file
                        })
                      : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                          (file.type)
                            ? (openBlock(), createBlock(resolveDynamicComponent(file.type), {
                                key: 0,
                                class: "el-upload-list__item-thumbnail",
                                src: file.url
                              }, null, 8 /* PROPS */, ["src"]))
                            : (openBlock(), createBlock(_component_el_icon, {
                                key: 1,
                                class: normalizeClass(_ctx.b('avatar'))
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_el_icon_document)
                                ]),
                                _: 1 /* STABLE */
                              }, 8 /* PROPS */, ["class"]))
                        ], 64 /* STABLE_FRAGMENT */))
                  ], 64 /* STABLE_FRAGMENT */)),
              createElementVNode("span", _hoisted_5, [
                createElementVNode("span", _hoisted_6, [
                  createVNode(_component_el_icon, null, {
                    default: withCtx(() => [
                      createVNode(_component_el_icon_zoom_in, {
                        onClick: withModifiers($event => (_ctx.handlePreview(file)), ["stop"])
                      }, null, 8 /* PROPS */, ["onClick"])
                    ]),
                    _: 2 /* DYNAMIC */
                  }, 1024 /* DYNAMIC_SLOTS */)
                ]),
                (!_ctx.disabled)
                  ? (openBlock(), createElementBlock("span", _hoisted_7, [
                      createVNode(_component_el_icon, null, {
                        default: withCtx(() => [
                          createVNode(_component_el_icon_delete, {
                            onClick: withModifiers($event => (_ctx.handleRemove(file)), ["stop"])
                          }, null, 8 /* PROPS */, ["onClick"])
                        ]),
                        _: 2 /* DYNAMIC */
                      }, 1024 /* DYNAMIC_SLOTS */)
                    ]))
                  : createCommentVNode("v-if", true)
              ])
            ], 64 /* STABLE_FRAGMENT */))
          : (_ctx.listType === 'picture')
            ? (openBlock(), createElementBlock("div", {
                key: 1,
                style: {"display":"flex"},
                onClick: withModifiers($event => (_ctx.handlePreview(file)), ["stop"])
              }, [
                (_ctx.$slots.default)
                  ? renderSlot(_ctx.$slots, "default", {
                      key: 0,
                      file: file
                    })
                  : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                      (file.type)
                        ? (openBlock(), createBlock(resolveDynamicComponent(file.type), {
                            key: 0,
                            class: "el-upload-list__item-thumbnail",
                            src: file.url,
                            controls: "controls"
                          }, null, 8 /* PROPS */, ["src"]))
                        : createCommentVNode("v-if", true),
                      createElementVNode("div", _hoisted_9, [
                        createElementVNode("a", _hoisted_10, [
                          createVNode(_component_el_icon, null, {
                            default: withCtx(() => [
                              createVNode(_component_el_icon_document)
                            ]),
                            _: 1 /* STABLE */
                          }),
                          createElementVNode("span", _hoisted_11, toDisplayString(file.name), 1 /* TEXT */)
                        ])
                      ])
                    ], 64 /* STABLE_FRAGMENT */)),
                (!_ctx.disabled)
                  ? (openBlock(), createBlock(_component_el_icon, {
                      key: 2,
                      class: "el-icon--close"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_el_icon_close, {
                          onClick: withModifiers($event => (_ctx.handleRemove(file)), ["stop"])
                        }, null, 8 /* PROPS */, ["onClick"])
                      ]),
                      _: 2 /* DYNAMIC */
                    }, 1024 /* DYNAMIC_SLOTS */))
                  : createCommentVNode("v-if", true),
                (_ctx.showProgress(file))
                  ? (openBlock(), createBlock(_component_el_progress, {
                      key: 3,
                      class: normalizeClass(_ctx.b('progress')),
                      percentage: file.percentage,
                      "stroke-width": 3
                    }, null, 8 /* PROPS */, ["class", "percentage"]))
                  : createCommentVNode("v-if", true)
              ], 8 /* PROPS */, _hoisted_8))
            : (openBlock(), createElementBlock("span", {
                key: 2,
                onClick: withModifiers($event => (_ctx.handlePreview(file)), ["stop"])
              }, [
                createElementVNode("div", _hoisted_13, [
                  createElementVNode("a", _hoisted_14, [
                    (_ctx.$slots.default)
                      ? renderSlot(_ctx.$slots, "default", {
                          key: 0,
                          file: file
                        })
                      : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                          createVNode(_component_el_icon, null, {
                            default: withCtx(() => [
                              createVNode(_component_el_icon_document)
                            ]),
                            _: 1 /* STABLE */
                          }),
                          createElementVNode("span", _hoisted_15, toDisplayString(file.name), 1 /* TEXT */)
                        ], 64 /* STABLE_FRAGMENT */))
                  ]),
                  (!_ctx.disabled)
                    ? (openBlock(), createBlock(_component_el_icon, {
                        key: 0,
                        class: "el-icon--close"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_el_icon_close, {
                            onClick: withModifiers($event => (_ctx.handleRemove(file)), ["stop"])
                          }, null, 8 /* PROPS */, ["onClick"])
                        ]),
                        _: 2 /* DYNAMIC */
                      }, 1024 /* DYNAMIC_SLOTS */))
                    : createCommentVNode("v-if", true),
                  (_ctx.showProgress(file))
                    ? (openBlock(), createBlock(_component_el_progress, {
                        key: 1,
                        class: normalizeClass(_ctx.b('progress')),
                        percentage: file.percentage,
                        "stroke-width": 3
                      }, null, 8 /* PROPS */, ["class", "percentage"]))
                    : createCommentVNode("v-if", true)
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
    default: withCtx(() => [
      (_ctx.listType == 'picture-card')
        ? (openBlock(), createBlock(_component_el_icon, { key: 0 }, {
            default: withCtx(() => [
              createVNode(_component_el_icon_plus)
            ]),
            _: 1 /* STABLE */
          }))
        : (_ctx.listType == 'picture-img')
          ? (openBlock(), createElementBlock("div", {
              key: 1,
              class: normalizeClass(_ctx.b('avatar'))
            }, [
              (_ctx.showProgress(_ctx.firstFile))
                ? (openBlock(), createBlock(_component_el_progress, {
                    key: 0,
                    type: "circle",
                    onMouseover: _ctx.handleMouseover,
                    percentage: _ctx.firstFile.percentage
                  }, null, 8 /* PROPS */, ["onMouseover", "percentage"]))
                : withDirectives((openBlock(), createElementBlock("div", {
                    key: 1,
                    "element-loading-text": _ctx.loadText
                  }, [
                    (_ctx.firstFile.url)
                      ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                          (_ctx.$slots.default)
                            ? renderSlot(_ctx.$slots, "default", {
                                key: 0,
                                file: _ctx.firstFile
                              })
                            : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                                (_ctx.firstFile.type)
                                  ? (openBlock(), createBlock(resolveDynamicComponent(_ctx.firstFile.type), {
                                      key: 0,
                                      src: _ctx.firstFile.url,
                                      controls: "controls",
                                      onMouseover: _ctx.handleMouseover,
                                      class: normalizeClass(_ctx.b('avatar'))
                                    }, null, 40 /* PROPS, NEED_HYDRATION */, ["src", "onMouseover", "class"]))
                                  : (openBlock(), createBlock(_component_el_icon, {
                                      key: 1,
                                      onMouseover: _ctx.handleMouseover,
                                      src: _ctx.firstFile.url,
                                      class: normalizeClass(_ctx.b('avatar'))
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(_component_el_icon_document)
                                      ]),
                                      _: 1 /* STABLE */
                                    }, 8 /* PROPS */, ["onMouseover", "src", "class"]))
                              ], 64 /* STABLE_FRAGMENT */))
                        ], 64 /* STABLE_FRAGMENT */))
                      : (openBlock(), createBlock(_component_el_icon, {
                          key: 1,
                          class: normalizeClass(_ctx.b('avatar'))
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_el_icon_plus)
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
                ? (openBlock(), createElementBlock("div", {
                    key: 2,
                    class: normalizeClass(["el-upload-list__item-actions", _ctx.b('menu')]),
                    onMouseover: _cache[2] || (_cache[2] = (...args) => (_ctx.handleMouseover && _ctx.handleMouseover(...args))),
                    onMouseout: _cache[3] || (_cache[3] = (...args) => (_ctx.handleMouseout && _ctx.handleMouseout(...args))),
                    onClick: withModifiers(
          () => {
            return false;
          }
        , ["stop"])
                  }, [
                    createVNode(_component_el_icon, {
                      onClick: _cache[0] || (_cache[0] = withModifiers($event => (_ctx.handlePreview(_ctx.firstFile)), ["stop"]))
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_el_icon_zoom_in)
                      ]),
                      _: 1 /* STABLE */
                    }),
                    (!_ctx.disabled)
                      ? (openBlock(), createBlock(_component_el_icon, {
                          key: 0,
                          onClick: _cache[1] || (_cache[1] = withModifiers($event => (_ctx.handleRemove(_ctx.firstFile)), ["stop"]))
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_el_icon_delete)
                          ]),
                          _: 1 /* STABLE */
                        }))
                      : createCommentVNode("v-if", true)
                  ], 34 /* CLASS, NEED_HYDRATION */))
                : createCommentVNode("v-if", true)
            ], 2 /* CLASS */))
          : (_ctx.dragFile)
            ? (openBlock(), createElementBlock(Fragment, { key: 2 }, [
                createVNode(_component_el_icon, null, {
                  default: withCtx(() => [
                    createVNode(_component_el_icon_upload)
                  ]),
                  _: 1 /* STABLE */
                }),
                createElementVNode("div", _hoisted_2, [
                  createElementVNode("em", null, toDisplayString(_ctx.fileText || _ctx.t("upload.upload")), 1 /* TEXT */)
                ])
              ], 64 /* STABLE_FRAGMENT */))
            : (openBlock(), createElementBlock(Fragment, { key: 3 }, [
                (_ctx.$slots.button)
                  ? renderSlot(_ctx.$slots, "button", {
                      key: 0,
                      disabled: _ctx.disabled
                    })
                  : (openBlock(), createBlock(_component_el_button, {
                      key: 1,
                      icon: "el-icon-upload",
                      size: _ctx.size,
                      disabled: _ctx.disabled,
                      type: "primary"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(_ctx.fileText || _ctx.t("upload.upload")), 1 /* TEXT */)
                      ]),
                      _: 1 /* STABLE */
                    }, 8 /* PROPS */, ["size", "disabled"]))
              ], 64 /* STABLE_FRAGMENT */))
    ]),
    _: 3 /* FORWARDED */
  }, 8 /* PROPS */, ["class", "onClick", "action", "on-remove", "accept", "before-remove", "multiple", "on-preview", "limit", "http-request", "drag", "readonly", "directory", "show-file-list", "list-type", "on-change", "on-exceed", "disabled", "file-list"]))
}

export { render };
