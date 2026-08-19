/*! Avue.js v3.9.4 | (c) 2017-2026 Smallwei | Released under the MIT License. */
'use strict';

var vue = require('vue');

const _hoisted_1 = ["accept", "multiple", "disabled"];
const _hoisted_2 = ["onClick", "onDblclick", "onKeyup"];
const _hoisted_3 = ["title"];
const _hoisted_4 = ["src"];
const _hoisted_5 = ["src"];
const _hoisted_6 = ["src", "title"];
const _hoisted_7 = { key: 2 };

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_icon_upload = vue.resolveComponent("el-icon-upload");
  const _component_el_icon = vue.resolveComponent("el-icon");
  const _component_el_button = vue.resolveComponent("el-button");
  const _component_el_icon_folder_add = vue.resolveComponent("el-icon-folder-add");
  const _component_el_icon_search = vue.resolveComponent("el-icon-search");
  const _component_el_input = vue.resolveComponent("el-input");
  const _component_el_icon_folder_opened = vue.resolveComponent("el-icon-folder-opened");
  const _component_el_icon_more_filled = vue.resolveComponent("el-icon-more-filled");
  const _component_el_dropdown_item = vue.resolveComponent("el-dropdown-item");
  const _component_el_dropdown_menu = vue.resolveComponent("el-dropdown-menu");
  const _component_el_dropdown = vue.resolveComponent("el-dropdown");
  const _component_el_tree = vue.resolveComponent("el-tree");
  const _component_el_scrollbar = vue.resolveComponent("el-scrollbar");
  const _component_el_empty = vue.resolveComponent("el-empty");
  const _component_el_icon_picture = vue.resolveComponent("el-icon-picture");
  const _component_el_icon_video_play = vue.resolveComponent("el-icon-video-play");
  const _component_el_icon_headset = vue.resolveComponent("el-icon-headset");
  const _component_el_icon_document = vue.resolveComponent("el-icon-document");
  const _component_el_icon_files = vue.resolveComponent("el-icon-files");
  const _component_el_icon_download = vue.resolveComponent("el-icon-download");
  const _component_el_image = vue.resolveComponent("el-image");
  const _component_el_skeleton = vue.resolveComponent("el-skeleton");
  const _component_el_result = vue.resolveComponent("el-result");
  const _component_el_form_item = vue.resolveComponent("el-form-item");
  const _component_el_form = vue.resolveComponent("el-form");
  const _component_el_dialog = vue.resolveComponent("el-dialog");
  const _component_el_option = vue.resolveComponent("el-option");
  const _component_el_select = vue.resolveComponent("el-select");

  return (vue.openBlock(), vue.createElementBlock("section", {
    class: vue.normalizeClass(_ctx.b())
  }, [
    vue.createElementVNode("header", {
      class: vue.normalizeClass(_ctx.b('toolbar'))
    }, [
      vue.createElementVNode("div", {
        class: vue.normalizeClass(_ctx.b('toolbar-left'))
      }, [
        (_ctx.showUpload)
          ? (vue.openBlock(), vue.createBlock(_component_el_button, {
              key: 0,
              type: "primary",
              disabled: _ctx.isDisabled,
              onClick: _ctx.selectFiles
            }, {
              default: vue.withCtx(() => [
                vue.createVNode(_component_el_icon, null, {
                  default: vue.withCtx(() => [
                    vue.createVNode(_component_el_icon_upload)
                  ]),
                  _: 1 /* STABLE */
                }),
                _cache[26] || (_cache[26] = vue.createTextVNode(" 上传文件 "))
              ]),
              _: 1 /* STABLE */
            }, 8 /* PROPS */, ["disabled", "onClick"]))
          : vue.createCommentVNode("v-if", true),
        vue.createVNode(_component_el_button, {
          disabled: _ctx.isDisabled,
          onClick: _ctx.openCreateFolder
        }, {
          default: vue.withCtx(() => [
            vue.createVNode(_component_el_icon, null, {
              default: vue.withCtx(() => [
                vue.createVNode(_component_el_icon_folder_add)
              ]),
              _: 1 /* STABLE */
            }),
            _cache[27] || (_cache[27] = vue.createTextVNode(" 新建文件夹 "))
          ]),
          _: 1 /* STABLE */
        }, 8 /* PROPS */, ["disabled", "onClick"]),
        vue.createVNode(_component_el_button, {
          disabled: _ctx.isDisabled || !_ctx.selectedFile,
          onClick: _ctx.openMoveDialog
        }, {
          default: vue.withCtx(() => _cache[28] || (_cache[28] = [
            vue.createTextVNode(" 移动 ")
          ])),
          _: 1 /* STABLE */
        }, 8 /* PROPS */, ["disabled", "onClick"]),
        vue.createVNode(_component_el_button, {
          disabled: _ctx.isDisabled || !_ctx.selectedFile,
          onClick: _ctx.openRenameDialog
        }, {
          default: vue.withCtx(() => _cache[29] || (_cache[29] = [
            vue.createTextVNode(" 重命名 ")
          ])),
          _: 1 /* STABLE */
        }, 8 /* PROPS */, ["disabled", "onClick"]),
        vue.createVNode(_component_el_button, {
          type: "danger",
          disabled: _ctx.isDisabled || !_ctx.selectedFile,
          onClick: _ctx.removeSelectedFile
        }, {
          default: vue.withCtx(() => _cache[30] || (_cache[30] = [
            vue.createTextVNode(" 删除 ")
          ])),
          _: 1 /* STABLE */
        }, 8 /* PROPS */, ["disabled", "onClick"])
      ], 2 /* CLASS */),
      vue.createVNode(_component_el_input, {
        modelValue: _ctx.keyword,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((_ctx.keyword) = $event)),
        clearable: "",
        class: vue.normalizeClass(_ctx.b('search')),
        placeholder: "搜索当前文件夹"
      }, {
        prefix: vue.withCtx(() => [
          vue.createVNode(_component_el_icon, null, {
            default: vue.withCtx(() => [
              vue.createVNode(_component_el_icon_search)
            ]),
            _: 1 /* STABLE */
          })
        ]),
        _: 1 /* STABLE */
      }, 8 /* PROPS */, ["modelValue", "class"])
    ], 2 /* CLASS */),
    vue.createElementVNode("input", {
      ref: "fileInput",
      accept: _ctx.accept,
      multiple: _ctx.multiple,
      type: "file",
      disabled: _ctx.isDisabled,
      class: vue.normalizeClass(_ctx.b('native-input')),
      onChange: _cache[1] || (_cache[1] = (...args) => (_ctx.handleNativeFileChange && _ctx.handleNativeFileChange(...args)))
    }, null, 42 /* CLASS, PROPS, NEED_HYDRATION */, _hoisted_1),
    vue.createElementVNode("div", {
      class: vue.normalizeClass(_ctx.b('workspace')),
      style: vue.normalizeStyle(_ctx.workspaceStyle)
    }, [
      vue.createElementVNode("aside", {
        class: vue.normalizeClass(_ctx.b('folders'))
      }, [
        vue.createElementVNode("div", {
          class: vue.normalizeClass(_ctx.b('folder-title'))
        }, "文件夹", 2 /* CLASS */),
        vue.createVNode(_component_el_scrollbar, null, {
          default: vue.withCtx(() => [
            vue.createElementVNode("div", {
              class: vue.normalizeClass([_ctx.b('root'), { 'is-active': _ctx.activeFolderId === _ctx.rootFolderId }]),
              role: "button",
              tabindex: "0",
              onClick: _cache[4] || (_cache[4] = $event => (_ctx.selectFolder(_ctx.rootFolderId))),
              onKeyup: _cache[5] || (_cache[5] = vue.withKeys($event => (_ctx.selectFolder(_ctx.rootFolderId)), ["enter"]))
            }, [
              vue.createVNode(_component_el_icon, null, {
                default: vue.withCtx(() => [
                  vue.createVNode(_component_el_icon_folder_opened)
                ]),
                _: 1 /* STABLE */
              }),
              vue.createElementVNode("span", null, vue.toDisplayString(_ctx.rootLabel), 1 /* TEXT */),
              vue.createElementVNode("em", null, vue.toDisplayString(_ctx.rootFilesCount), 1 /* TEXT */),
              vue.createVNode(_component_el_dropdown, {
                class: vue.normalizeClass(_ctx.b('root-menu')),
                disabled: _ctx.isDisabled,
                trigger: "click",
                onCommand: _ctx.handleRootCommand,
                onClick: _cache[3] || (_cache[3] = vue.withModifiers(() => {}, ["stop"]))
              }, {
                dropdown: vue.withCtx(() => [
                  vue.createVNode(_component_el_dropdown_menu, null, {
                    default: vue.withCtx(() => [
                      vue.createVNode(_component_el_dropdown_item, {
                        command: "create",
                        disabled: _ctx.isDisabled
                      }, {
                        default: vue.withCtx(() => _cache[31] || (_cache[31] = [
                          vue.createTextVNode("新建文件夹")
                        ])),
                        _: 1 /* STABLE */
                      }, 8 /* PROPS */, ["disabled"])
                    ]),
                    _: 1 /* STABLE */
                  })
                ]),
                default: vue.withCtx(() => [
                  vue.createVNode(_component_el_button, {
                    text: "",
                    circle: "",
                    disabled: _ctx.isDisabled,
                    "aria-label": "根目录操作菜单",
                    onClick: _cache[2] || (_cache[2] = vue.withModifiers(() => {}, ["stop"]))
                  }, {
                    default: vue.withCtx(() => [
                      vue.createVNode(_component_el_icon, null, {
                        default: vue.withCtx(() => [
                          vue.createVNode(_component_el_icon_more_filled)
                        ]),
                        _: 1 /* STABLE */
                      })
                    ]),
                    _: 1 /* STABLE */
                  }, 8 /* PROPS */, ["disabled"])
                ]),
                _: 1 /* STABLE */
              }, 8 /* PROPS */, ["class", "disabled", "onCommand"])
            ], 34 /* CLASS, NEED_HYDRATION */),
            vue.createVNode(_component_el_tree, {
              ref: "folderTree",
              data: _ctx.folderTree,
              props: _ctx.treeProps,
              "node-key": "id",
              "highlight-current": "",
              "current-node-key": _ctx.activeFolderId,
              "expand-on-click-node": false,
              onNodeClick: _ctx.handleFolderClick
            }, {
              default: vue.withCtx(({ data }) => [
                vue.createElementVNode("span", {
                  class: vue.normalizeClass(_ctx.b('folder-node'))
                }, [
                  vue.createElementVNode("span", null, vue.toDisplayString(data.name), 1 /* TEXT */),
                  vue.createElementVNode("em", null, vue.toDisplayString(_ctx.getFolderFileCount(data.id)), 1 /* TEXT */),
                  vue.createVNode(_component_el_dropdown, {
                    class: vue.normalizeClass(_ctx.b('folder-menu')),
                    disabled: _ctx.isDisabled,
                    trigger: "click",
                    onCommand: $event => (_ctx.handleFolderCommand($event, data)),
                    onClick: _cache[7] || (_cache[7] = vue.withModifiers(() => {}, ["stop"]))
                  }, {
                    dropdown: vue.withCtx(() => [
                      vue.createVNode(_component_el_dropdown_menu, null, {
                        default: vue.withCtx(() => [
                          vue.createVNode(_component_el_dropdown_item, {
                            command: "create",
                            disabled: _ctx.isDisabled
                          }, {
                            default: vue.withCtx(() => _cache[32] || (_cache[32] = [
                              vue.createTextVNode("新建子文件夹")
                            ])),
                            _: 1 /* STABLE */
                          }, 8 /* PROPS */, ["disabled"]),
                          vue.createVNode(_component_el_dropdown_item, {
                            command: "rename",
                            disabled: _ctx.isDisabled
                          }, {
                            default: vue.withCtx(() => _cache[33] || (_cache[33] = [
                              vue.createTextVNode("重命名")
                            ])),
                            _: 1 /* STABLE */
                          }, 8 /* PROPS */, ["disabled"]),
                          vue.createVNode(_component_el_dropdown_item, {
                            command: "remove",
                            divided: "",
                            disabled: _ctx.isDisabled || !_ctx.canRemoveFolder(data)
                          }, {
                            default: vue.withCtx(() => _cache[34] || (_cache[34] = [
                              vue.createTextVNode("删除")
                            ])),
                            _: 2 /* DYNAMIC */
                          }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["disabled"])
                        ]),
                        _: 2 /* DYNAMIC */
                      }, 1024 /* DYNAMIC_SLOTS */)
                    ]),
                    default: vue.withCtx(() => [
                      vue.createVNode(_component_el_button, {
                        text: "",
                        circle: "",
                        disabled: _ctx.isDisabled,
                        "aria-label": `${data.name} 操作菜单`,
                        onClick: _cache[6] || (_cache[6] = vue.withModifiers(() => {}, ["stop"]))
                      }, {
                        default: vue.withCtx(() => [
                          vue.createVNode(_component_el_icon, null, {
                            default: vue.withCtx(() => [
                              vue.createVNode(_component_el_icon_more_filled)
                            ]),
                            _: 1 /* STABLE */
                          })
                        ]),
                        _: 2 /* DYNAMIC */
                      }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["disabled", "aria-label"])
                    ]),
                    _: 2 /* DYNAMIC */
                  }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["class", "disabled", "onCommand"])
                ], 2 /* CLASS */)
              ]),
              _: 1 /* STABLE */
            }, 8 /* PROPS */, ["data", "props", "current-node-key", "onNodeClick"])
          ]),
          _: 1 /* STABLE */
        })
      ], 2 /* CLASS */),
      vue.createElementVNode("main", {
        class: vue.normalizeClass(_ctx.b('files'))
      }, [
        vue.createElementVNode("div", {
          class: vue.normalizeClass(_ctx.b('files-header'))
        }, [
          vue.createElementVNode("span", null, vue.toDisplayString(_ctx.activeFolderName), 1 /* TEXT */),
          vue.createElementVNode("small", null, vue.toDisplayString(_ctx.visibleFiles.length) + " 个文件", 1 /* TEXT */)
        ], 2 /* CLASS */),
        vue.createVNode(_component_el_scrollbar, {
          class: vue.normalizeClass(_ctx.b('files-scroll'))
        }, {
          default: vue.withCtx(() => [
            (!_ctx.visibleFiles.length)
              ? (vue.openBlock(), vue.createBlock(_component_el_empty, {
                  key: 0,
                  description: "当前文件夹暂无文件"
                }))
              : (vue.openBlock(), vue.createElementBlock("div", {
                  key: 1,
                  class: vue.normalizeClass(_ctx.b('grid'))
                }, [
                  (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.visibleFiles, (file) => {
                    return (vue.openBlock(), vue.createElementBlock("div", {
                      key: file.id,
                      class: vue.normalizeClass([_ctx.b('file'), { 'is-active': file.id === _ctx.selectedFileId }]),
                      role: "button",
                      tabindex: "0",
                      onClick: $event => (_ctx.selectFile(file)),
                      onDblclick: $event => (_ctx.previewFile(file)),
                      onKeyup: vue.withKeys($event => (_ctx.previewFile(file)), ["enter"])
                    }, [
                      vue.createVNode(_component_el_dropdown, {
                        class: vue.normalizeClass(_ctx.b('file-menu')),
                        disabled: _ctx.isDisabled,
                        trigger: "click",
                        onCommand: $event => (_ctx.handleFileCommand($event, file)),
                        onClick: _cache[9] || (_cache[9] = vue.withModifiers(() => {}, ["stop"]))
                      }, {
                        dropdown: vue.withCtx(() => [
                          vue.createVNode(_component_el_dropdown_menu, null, {
                            default: vue.withCtx(() => [
                              vue.createVNode(_component_el_dropdown_item, { command: "preview" }, {
                                default: vue.withCtx(() => [...(_cache[35] || (_cache[35] = [
                                  vue.createTextVNode("预览")
                                ]))]),
                                _: 1 /* STABLE */
                              }),
                              vue.createVNode(_component_el_dropdown_item, {
                                command: "move",
                                disabled: _ctx.isDisabled
                              }, {
                                default: vue.withCtx(() => [...(_cache[36] || (_cache[36] = [
                                  vue.createTextVNode("移动")
                                ]))]),
                                _: 1 /* STABLE */
                              }, 8 /* PROPS */, ["disabled"]),
                              vue.createVNode(_component_el_dropdown_item, {
                                command: "rename",
                                disabled: _ctx.isDisabled
                              }, {
                                default: vue.withCtx(() => [...(_cache[37] || (_cache[37] = [
                                  vue.createTextVNode("重命名")
                                ]))]),
                                _: 1 /* STABLE */
                              }, 8 /* PROPS */, ["disabled"]),
                              vue.createVNode(_component_el_dropdown_item, {
                                command: "remove",
                                divided: "",
                                disabled: _ctx.isDisabled
                              }, {
                                default: vue.withCtx(() => [...(_cache[38] || (_cache[38] = [
                                  vue.createTextVNode("删除")
                                ]))]),
                                _: 1 /* STABLE */
                              }, 8 /* PROPS */, ["disabled"])
                            ]),
                            _: 1 /* STABLE */
                          })
                        ]),
                        default: vue.withCtx(() => [
                          vue.createVNode(_component_el_button, {
                            text: "",
                            circle: "",
                            disabled: _ctx.isDisabled,
                            "aria-label": `${file.name} 操作菜单`,
                            onClick: _cache[8] || (_cache[8] = vue.withModifiers(() => {}, ["stop"]))
                          }, {
                            default: vue.withCtx(() => [
                              vue.createVNode(_component_el_icon, null, {
                                default: vue.withCtx(() => [
                                  vue.createVNode(_component_el_icon_more_filled)
                                ]),
                                _: 1 /* STABLE */
                              })
                            ]),
                            _: 2 /* DYNAMIC */
                          }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["disabled", "aria-label"])
                        ]),
                        _: 2 /* DYNAMIC */
                      }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["class", "disabled", "onCommand"]),
                      vue.createElementVNode("span", {
                        class: vue.normalizeClass(_ctx.b('file-icon'))
                      }, [
                        (_ctx.getFileKind(file) === 'image')
                          ? (vue.openBlock(), vue.createBlock(_component_el_icon, { key: 0 }, {
                              default: vue.withCtx(() => [
                                vue.createVNode(_component_el_icon_picture)
                              ]),
                              _: 1 /* STABLE */
                            }))
                          : (_ctx.getFileKind(file) === 'video')
                            ? (vue.openBlock(), vue.createBlock(_component_el_icon, { key: 1 }, {
                                default: vue.withCtx(() => [
                                  vue.createVNode(_component_el_icon_video_play)
                                ]),
                                _: 1 /* STABLE */
                              }))
                            : (_ctx.getFileKind(file) === 'audio')
                              ? (vue.openBlock(), vue.createBlock(_component_el_icon, { key: 2 }, {
                                  default: vue.withCtx(() => [
                                    vue.createVNode(_component_el_icon_headset)
                                  ]),
                                  _: 1 /* STABLE */
                                }))
                              : (_ctx.getFileKind(file) === 'pdf')
                                ? (vue.openBlock(), vue.createBlock(_component_el_icon, { key: 3 }, {
                                    default: vue.withCtx(() => [
                                      vue.createVNode(_component_el_icon_document)
                                    ]),
                                    _: 1 /* STABLE */
                                  }))
                                : (vue.openBlock(), vue.createBlock(_component_el_icon, { key: 4 }, {
                                    default: vue.withCtx(() => [
                                      vue.createVNode(_component_el_icon_files)
                                    ]),
                                    _: 1 /* STABLE */
                                  }))
                      ], 2 /* CLASS */),
                      vue.createElementVNode("span", {
                        class: vue.normalizeClass(_ctx.b('file-name')),
                        title: file.name
                      }, vue.toDisplayString(file.name), 11 /* TEXT, CLASS, PROPS */, _hoisted_3),
                      vue.createElementVNode("small", null, vue.toDisplayString(_ctx.formatSize(file.size) || _ctx.getFileExtension(file).toUpperCase() || '文件'), 1 /* TEXT */),
                      (file.status === 'uploading')
                        ? (vue.openBlock(), vue.createElementBlock("span", {
                            key: 0,
                            class: vue.normalizeClass(_ctx.b('file-status'))
                          }, "上传中", 2 /* CLASS */))
                        : (file.status === 'error')
                          ? (vue.openBlock(), vue.createElementBlock("span", {
                              key: 1,
                              class: vue.normalizeClass([_ctx.b('file-status'), 'is-error'])
                            }, "上传失败", 2 /* CLASS */))
                          : vue.createCommentVNode("v-if", true)
                    ], 42 /* CLASS, PROPS, NEED_HYDRATION */, _hoisted_2))
                  }), 128 /* KEYED_FRAGMENT */))
                ], 2 /* CLASS */))
          ]),
          _: 1 /* STABLE */
        }, 8 /* PROPS */, ["class"])
      ], 2 /* CLASS */),
      (_ctx.showPreview)
        ? (vue.openBlock(), vue.createElementBlock("aside", {
            key: 0,
            class: vue.normalizeClass(_ctx.b('preview'))
          }, [
            (_ctx.selectedFile)
              ? (vue.openBlock(), vue.createElementBlock("header", {
                  key: 0,
                  class: vue.normalizeClass(_ctx.b('preview-toolbar'))
                }, [
                  vue.createElementVNode("div", {
                    class: vue.normalizeClass(_ctx.b('preview-meta'))
                  }, [
                    vue.createElementVNode("span", {
                      class: vue.normalizeClass(_ctx.b('preview-name'))
                    }, vue.toDisplayString(_ctx.selectedFile.name), 3 /* TEXT, CLASS */),
                    (_ctx.selectedFile.size)
                      ? (vue.openBlock(), vue.createElementBlock("span", {
                          key: 0,
                          class: vue.normalizeClass(_ctx.b('preview-size'))
                        }, vue.toDisplayString(_ctx.formatSize(_ctx.selectedFile.size)), 3 /* TEXT, CLASS */))
                      : vue.createCommentVNode("v-if", true)
                  ], 2 /* CLASS */),
                  (_ctx.downloadable)
                    ? (vue.openBlock(), vue.createBlock(_component_el_button, {
                        key: 0,
                        text: "",
                        type: "primary",
                        onClick: _ctx.downloadSelected
                      }, {
                        default: vue.withCtx(() => [
                          vue.createVNode(_component_el_icon, null, {
                            default: vue.withCtx(() => [
                              vue.createVNode(_component_el_icon_download)
                            ]),
                            _: 1 /* STABLE */
                          }),
                          _cache[39] || (_cache[39] = vue.createTextVNode(" 下载 "))
                        ]),
                        _: 1 /* STABLE */
                      }, 8 /* PROPS */, ["onClick"]))
                    : vue.createCommentVNode("v-if", true)
                ], 2 /* CLASS */))
              : vue.createCommentVNode("v-if", true),
            vue.createElementVNode("div", {
              class: vue.normalizeClass(_ctx.b('preview-content')),
              style: vue.normalizeStyle(_ctx.previewContentStyle)
            }, [
              (!_ctx.selectedFile)
                ? (vue.openBlock(), vue.createBlock(_component_el_empty, {
                    key: 0,
                    description: "请选择文件进行预览"
                  }))
                : (_ctx.getFileKind(_ctx.selectedFile) === 'image')
                  ? (vue.openBlock(), vue.createBlock(_component_el_image, {
                      key: 1,
                      src: _ctx.selectedFile.url,
                      "preview-src-list": [_ctx.selectedFile.url],
                      fit: "contain",
                      class: vue.normalizeClass(_ctx.b('preview-image')),
                      onError: _ctx.handlePreviewError
                    }, null, 8 /* PROPS */, ["src", "preview-src-list", "class", "onError"]))
                  : (_ctx.getFileKind(_ctx.selectedFile) === 'video')
                    ? (vue.openBlock(), vue.createElementBlock("video", {
                        key: 2,
                        src: _ctx.selectedFile.url,
                        controls: "",
                        preload: "metadata",
                        class: vue.normalizeClass(_ctx.b('preview-media')),
                        onError: _cache[10] || (_cache[10] = (...args) => (_ctx.handlePreviewError && _ctx.handlePreviewError(...args)))
                      }, "当前浏览器不支持视频预览。", 42 /* CLASS, PROPS, NEED_HYDRATION */, _hoisted_4))
                    : (_ctx.getFileKind(_ctx.selectedFile) === 'audio')
                      ? (vue.openBlock(), vue.createElementBlock("audio", {
                          key: 3,
                          src: _ctx.selectedFile.url,
                          controls: "",
                          preload: "metadata",
                          class: vue.normalizeClass(_ctx.b('preview-audio')),
                          onError: _cache[11] || (_cache[11] = (...args) => (_ctx.handlePreviewError && _ctx.handlePreviewError(...args)))
                        }, "当前浏览器不支持音频预览。", 42 /* CLASS, PROPS, NEED_HYDRATION */, _hoisted_5))
                      : (_ctx.getFileKind(_ctx.selectedFile) === 'pdf')
                        ? (vue.openBlock(), vue.createElementBlock("iframe", {
                            key: 4,
                            src: _ctx.selectedFile.url,
                            title: _ctx.selectedFile.name,
                            class: vue.normalizeClass(_ctx.b('preview-iframe'))
                          }, null, 10 /* CLASS, PROPS */, _hoisted_6))
                        : (_ctx.getFileKind(_ctx.selectedFile) === 'text')
                          ? (vue.openBlock(), vue.createElementBlock("div", {
                              key: 5,
                              class: vue.normalizeClass(_ctx.b('preview-text'))
                            }, [
                              (_ctx.textLoading)
                                ? (vue.openBlock(), vue.createBlock(_component_el_skeleton, {
                                    key: 0,
                                    animated: "",
                                    rows: 8
                                  }))
                                : (_ctx.textError)
                                  ? (vue.openBlock(), vue.createBlock(_component_el_result, {
                                      key: 1,
                                      icon: "error",
                                      title: "文本预览失败",
                                      "sub-title": _ctx.textError
                                    }, {
                                      extra: vue.withCtx(() => [
                                        (_ctx.downloadable)
                                          ? (vue.openBlock(), vue.createBlock(_component_el_button, {
                                              key: 0,
                                              type: "primary",
                                              onClick: _ctx.downloadSelected
                                            }, {
                                              default: vue.withCtx(() => _cache[40] || (_cache[40] = [
                                                vue.createTextVNode("下载文件")
                                              ])),
                                              _: 1 /* STABLE */
                                            }, 8 /* PROPS */, ["onClick"]))
                                          : vue.createCommentVNode("v-if", true)
                                      ]),
                                      _: 1 /* STABLE */
                                    }, 8 /* PROPS */, ["sub-title"]))
                                  : (vue.openBlock(), vue.createElementBlock("pre", _hoisted_7, vue.toDisplayString(_ctx.textContent), 1 /* TEXT */))
                            ], 2 /* CLASS */))
                          : (vue.openBlock(), vue.createBlock(_component_el_result, {
                              key: 6,
                              icon: "info",
                              title: "暂不支持在线预览"
                            }, {
                              "sub-title": vue.withCtx(() => [
                                vue.createElementVNode("span", null, vue.toDisplayString(_ctx.selectedFile.name) + " 可下载后在本地打开。", 1 /* TEXT */)
                              ]),
                              extra: vue.withCtx(() => [
                                (_ctx.downloadable)
                                  ? (vue.openBlock(), vue.createBlock(_component_el_button, {
                                      key: 0,
                                      type: "primary",
                                      onClick: _ctx.downloadSelected
                                    }, {
                                      default: vue.withCtx(() => _cache[41] || (_cache[41] = [
                                        vue.createTextVNode("下载文件")
                                      ])),
                                      _: 1 /* STABLE */
                                    }, 8 /* PROPS */, ["onClick"]))
                                  : vue.createCommentVNode("v-if", true)
                              ]),
                              _: 1 /* STABLE */
                            }))
            ], 6 /* CLASS, STYLE */)
          ], 2 /* CLASS */))
        : vue.createCommentVNode("v-if", true)
    ], 6 /* CLASS, STYLE */),
    vue.createVNode(_component_el_dialog, {
      modelValue: _ctx.folderDialogVisible,
      "onUpdate:modelValue": _cache[15] || (_cache[15] = $event => ((_ctx.folderDialogVisible) = $event)),
      title: _ctx.folderDialogTitle,
      width: "400px",
      "append-to-body": ""
    }, {
      footer: vue.withCtx(() => [
        vue.createVNode(_component_el_button, {
          onClick: _cache[14] || (_cache[14] = $event => (_ctx.folderDialogVisible = false))
        }, {
          default: vue.withCtx(() => _cache[42] || (_cache[42] = [
            vue.createTextVNode("取消")
          ])),
          _: 1 /* STABLE */
        }),
        vue.createVNode(_component_el_button, {
          type: "primary",
          onClick: _ctx.saveFolder
        }, {
          default: vue.withCtx(() => _cache[43] || (_cache[43] = [
            vue.createTextVNode("确定")
          ])),
          _: 1 /* STABLE */
        }, 8 /* PROPS */, ["onClick"])
      ]),
      default: vue.withCtx(() => [
        vue.createVNode(_component_el_form, {
          onSubmit: _cache[13] || (_cache[13] = vue.withModifiers(() => {}, ["prevent"]))
        }, {
          default: vue.withCtx(() => [
            vue.createVNode(_component_el_form_item, {
              label: "文件夹名称",
              error: _ctx.folderDialogError
            }, {
              default: vue.withCtx(() => [
                vue.createVNode(_component_el_input, {
                  modelValue: _ctx.folderName,
                  "onUpdate:modelValue": _cache[12] || (_cache[12] = $event => ((_ctx.folderName) = $event)),
                  maxlength: "50",
                  "show-word-limit": "",
                  onKeyup: vue.withKeys(_ctx.saveFolder, ["enter"])
                }, null, 8 /* PROPS */, ["modelValue", "onKeyup"])
              ]),
              _: 1 /* STABLE */
            }, 8 /* PROPS */, ["error"])
          ]),
          _: 1 /* STABLE */
        })
      ]),
      _: 1 /* STABLE */
    }, 8 /* PROPS */, ["modelValue", "title"]),
    vue.createVNode(_component_el_dialog, {
      modelValue: _ctx.folderDeleteDialogVisible,
      "onUpdate:modelValue": _cache[17] || (_cache[17] = $event => ((_ctx.folderDeleteDialogVisible) = $event)),
      title: "删除文件夹",
      width: "400px",
      "append-to-body": ""
    }, {
      footer: vue.withCtx(() => [
        vue.createVNode(_component_el_button, {
          onClick: _cache[16] || (_cache[16] = $event => (_ctx.folderDeleteDialogVisible = false))
        }, {
          default: vue.withCtx(() => _cache[44] || (_cache[44] = [
            vue.createTextVNode("取消")
          ])),
          _: 1 /* STABLE */
        }),
        vue.createVNode(_component_el_button, {
          type: "danger",
          onClick: _ctx.removeFolder
        }, {
          default: vue.withCtx(() => _cache[45] || (_cache[45] = [
            vue.createTextVNode("删除")
          ])),
          _: 1 /* STABLE */
        }, 8 /* PROPS */, ["onClick"])
      ]),
      default: vue.withCtx(() => [
        vue.createElementVNode("p", null, "确定删除文件夹“" + vue.toDisplayString(_ctx.folderToDelete ? _ctx.folderToDelete.name : '') + "”吗？", 1 /* TEXT */)
      ]),
      _: 1 /* STABLE */
    }, 8 /* PROPS */, ["modelValue"]),
    vue.createVNode(_component_el_dialog, {
      modelValue: _ctx.renameDialogVisible,
      "onUpdate:modelValue": _cache[21] || (_cache[21] = $event => ((_ctx.renameDialogVisible) = $event)),
      title: "重命名文件",
      width: "400px",
      "append-to-body": ""
    }, {
      footer: vue.withCtx(() => [
        vue.createVNode(_component_el_button, {
          onClick: _cache[20] || (_cache[20] = $event => (_ctx.renameDialogVisible = false))
        }, {
          default: vue.withCtx(() => _cache[46] || (_cache[46] = [
            vue.createTextVNode("取消")
          ])),
          _: 1 /* STABLE */
        }),
        vue.createVNode(_component_el_button, {
          type: "primary",
          onClick: _ctx.renameFile
        }, {
          default: vue.withCtx(() => _cache[47] || (_cache[47] = [
            vue.createTextVNode("确定")
          ])),
          _: 1 /* STABLE */
        }, 8 /* PROPS */, ["onClick"])
      ]),
      default: vue.withCtx(() => [
        vue.createVNode(_component_el_form, {
          onSubmit: _cache[19] || (_cache[19] = vue.withModifiers(() => {}, ["prevent"]))
        }, {
          default: vue.withCtx(() => [
            vue.createVNode(_component_el_form_item, {
              label: "文件名称",
              error: _ctx.renameDialogError
            }, {
              default: vue.withCtx(() => [
                vue.createVNode(_component_el_input, {
                  modelValue: _ctx.renameValue,
                  "onUpdate:modelValue": _cache[18] || (_cache[18] = $event => ((_ctx.renameValue) = $event)),
                  maxlength: "100",
                  "show-word-limit": "",
                  onKeyup: vue.withKeys(_ctx.renameFile, ["enter"])
                }, null, 8 /* PROPS */, ["modelValue", "onKeyup"])
              ]),
              _: 1 /* STABLE */
            }, 8 /* PROPS */, ["error"])
          ]),
          _: 1 /* STABLE */
        })
      ]),
      _: 1 /* STABLE */
    }, 8 /* PROPS */, ["modelValue"]),
    vue.createVNode(_component_el_dialog, {
      modelValue: _ctx.moveDialogVisible,
      "onUpdate:modelValue": _cache[25] || (_cache[25] = $event => ((_ctx.moveDialogVisible) = $event)),
      title: "移动文件",
      width: "400px",
      "append-to-body": ""
    }, {
      footer: vue.withCtx(() => [
        vue.createVNode(_component_el_button, {
          onClick: _cache[24] || (_cache[24] = $event => (_ctx.moveDialogVisible = false))
        }, {
          default: vue.withCtx(() => _cache[48] || (_cache[48] = [
            vue.createTextVNode("取消")
          ])),
          _: 1 /* STABLE */
        }),
        vue.createVNode(_component_el_button, {
          type: "primary",
          onClick: _ctx.moveFile
        }, {
          default: vue.withCtx(() => _cache[49] || (_cache[49] = [
            vue.createTextVNode("确定")
          ])),
          _: 1 /* STABLE */
        }, 8 /* PROPS */, ["onClick"])
      ]),
      default: vue.withCtx(() => [
        vue.createVNode(_component_el_form, {
          onSubmit: _cache[23] || (_cache[23] = vue.withModifiers(() => {}, ["prevent"]))
        }, {
          default: vue.withCtx(() => [
            vue.createVNode(_component_el_form_item, { label: "目标文件夹" }, {
              default: vue.withCtx(() => [
                vue.createVNode(_component_el_select, {
                  modelValue: _ctx.targetFolderId,
                  "onUpdate:modelValue": _cache[22] || (_cache[22] = $event => ((_ctx.targetFolderId) = $event)),
                  filterable: "",
                  placeholder: "选择文件夹"
                }, {
                  default: vue.withCtx(() => [
                    vue.createVNode(_component_el_option, {
                      label: _ctx.rootLabel,
                      value: _ctx.rootFolderId
                    }, null, 8 /* PROPS */, ["label", "value"]),
                    (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.localFolders, (folder) => {
                      return (vue.openBlock(), vue.createBlock(_component_el_option, {
                        key: folder.id,
                        label: _ctx.getFolderPath(folder.id),
                        value: folder.id
                      }, null, 8 /* PROPS */, ["label", "value"]))
                    }), 128 /* KEYED_FRAGMENT */))
                  ]),
                  _: 1 /* STABLE */
                }, 8 /* PROPS */, ["modelValue"])
              ]),
              _: 1 /* STABLE */
            })
          ]),
          _: 1 /* STABLE */
        })
      ]),
      _: 1 /* STABLE */
    }, 8 /* PROPS */, ["modelValue"])
  ], 2 /* CLASS */))
}

exports.render = render;
