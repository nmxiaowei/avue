/*! Avue.js v3.9.4 | (c) 2017-2026 Smallwei | Released under the MIT License. */
import { resolveComponent, openBlock, createElementBlock, normalizeClass, createElementVNode, createBlock, withCtx, createVNode, createTextVNode, createCommentVNode, normalizeStyle, withKeys, toDisplayString, withModifiers, Fragment, renderList } from 'vue';

const _hoisted_1 = ["accept", "multiple", "disabled"];
const _hoisted_2 = ["onClick", "onDblclick", "onKeyup"];
const _hoisted_3 = ["title"];
const _hoisted_4 = ["src"];
const _hoisted_5 = ["src"];
const _hoisted_6 = ["src", "title"];
const _hoisted_7 = { key: 2 };

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_icon_upload = resolveComponent("el-icon-upload");
  const _component_el_icon = resolveComponent("el-icon");
  const _component_el_button = resolveComponent("el-button");
  const _component_el_icon_folder_add = resolveComponent("el-icon-folder-add");
  const _component_el_icon_search = resolveComponent("el-icon-search");
  const _component_el_input = resolveComponent("el-input");
  const _component_el_icon_folder_opened = resolveComponent("el-icon-folder-opened");
  const _component_el_icon_more_filled = resolveComponent("el-icon-more-filled");
  const _component_el_dropdown_item = resolveComponent("el-dropdown-item");
  const _component_el_dropdown_menu = resolveComponent("el-dropdown-menu");
  const _component_el_dropdown = resolveComponent("el-dropdown");
  const _component_el_tree = resolveComponent("el-tree");
  const _component_el_scrollbar = resolveComponent("el-scrollbar");
  const _component_el_empty = resolveComponent("el-empty");
  const _component_el_icon_picture = resolveComponent("el-icon-picture");
  const _component_el_icon_video_play = resolveComponent("el-icon-video-play");
  const _component_el_icon_headset = resolveComponent("el-icon-headset");
  const _component_el_icon_document = resolveComponent("el-icon-document");
  const _component_el_icon_files = resolveComponent("el-icon-files");
  const _component_el_icon_download = resolveComponent("el-icon-download");
  const _component_el_image = resolveComponent("el-image");
  const _component_el_skeleton = resolveComponent("el-skeleton");
  const _component_el_result = resolveComponent("el-result");
  const _component_el_form_item = resolveComponent("el-form-item");
  const _component_el_form = resolveComponent("el-form");
  const _component_el_dialog = resolveComponent("el-dialog");
  const _component_el_option = resolveComponent("el-option");
  const _component_el_select = resolveComponent("el-select");

  return (openBlock(), createElementBlock("section", {
    class: normalizeClass(_ctx.b())
  }, [
    createElementVNode("header", {
      class: normalizeClass(_ctx.b('toolbar'))
    }, [
      createElementVNode("div", {
        class: normalizeClass(_ctx.b('toolbar-left'))
      }, [
        (_ctx.showUpload)
          ? (openBlock(), createBlock(_component_el_button, {
              key: 0,
              type: "primary",
              disabled: _ctx.isDisabled,
              onClick: _ctx.selectFiles
            }, {
              default: withCtx(() => [
                createVNode(_component_el_icon, null, {
                  default: withCtx(() => [
                    createVNode(_component_el_icon_upload)
                  ]),
                  _: 1 /* STABLE */
                }),
                _cache[26] || (_cache[26] = createTextVNode(" 上传文件 "))
              ]),
              _: 1 /* STABLE */
            }, 8 /* PROPS */, ["disabled", "onClick"]))
          : createCommentVNode("v-if", true),
        createVNode(_component_el_button, {
          disabled: _ctx.isDisabled,
          onClick: _ctx.openCreateFolder
        }, {
          default: withCtx(() => [
            createVNode(_component_el_icon, null, {
              default: withCtx(() => [
                createVNode(_component_el_icon_folder_add)
              ]),
              _: 1 /* STABLE */
            }),
            _cache[27] || (_cache[27] = createTextVNode(" 新建文件夹 "))
          ]),
          _: 1 /* STABLE */
        }, 8 /* PROPS */, ["disabled", "onClick"]),
        createVNode(_component_el_button, {
          disabled: _ctx.isDisabled || !_ctx.selectedFile,
          onClick: _ctx.openMoveDialog
        }, {
          default: withCtx(() => _cache[28] || (_cache[28] = [
            createTextVNode(" 移动 ")
          ])),
          _: 1 /* STABLE */
        }, 8 /* PROPS */, ["disabled", "onClick"]),
        createVNode(_component_el_button, {
          disabled: _ctx.isDisabled || !_ctx.selectedFile,
          onClick: _ctx.openRenameDialog
        }, {
          default: withCtx(() => _cache[29] || (_cache[29] = [
            createTextVNode(" 重命名 ")
          ])),
          _: 1 /* STABLE */
        }, 8 /* PROPS */, ["disabled", "onClick"]),
        createVNode(_component_el_button, {
          type: "danger",
          disabled: _ctx.isDisabled || !_ctx.selectedFile,
          onClick: _ctx.removeSelectedFile
        }, {
          default: withCtx(() => _cache[30] || (_cache[30] = [
            createTextVNode(" 删除 ")
          ])),
          _: 1 /* STABLE */
        }, 8 /* PROPS */, ["disabled", "onClick"])
      ], 2 /* CLASS */),
      createVNode(_component_el_input, {
        modelValue: _ctx.keyword,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((_ctx.keyword) = $event)),
        clearable: "",
        class: normalizeClass(_ctx.b('search')),
        placeholder: "搜索当前文件夹"
      }, {
        prefix: withCtx(() => [
          createVNode(_component_el_icon, null, {
            default: withCtx(() => [
              createVNode(_component_el_icon_search)
            ]),
            _: 1 /* STABLE */
          })
        ]),
        _: 1 /* STABLE */
      }, 8 /* PROPS */, ["modelValue", "class"])
    ], 2 /* CLASS */),
    createElementVNode("input", {
      ref: "fileInput",
      accept: _ctx.accept,
      multiple: _ctx.multiple,
      type: "file",
      disabled: _ctx.isDisabled,
      class: normalizeClass(_ctx.b('native-input')),
      onChange: _cache[1] || (_cache[1] = (...args) => (_ctx.handleNativeFileChange && _ctx.handleNativeFileChange(...args)))
    }, null, 42 /* CLASS, PROPS, NEED_HYDRATION */, _hoisted_1),
    createElementVNode("div", {
      class: normalizeClass(_ctx.b('workspace')),
      style: normalizeStyle(_ctx.workspaceStyle)
    }, [
      createElementVNode("aside", {
        class: normalizeClass(_ctx.b('folders'))
      }, [
        createElementVNode("div", {
          class: normalizeClass(_ctx.b('folder-title'))
        }, "文件夹", 2 /* CLASS */),
        createVNode(_component_el_scrollbar, null, {
          default: withCtx(() => [
            createElementVNode("div", {
              class: normalizeClass([_ctx.b('root'), { 'is-active': _ctx.activeFolderId === _ctx.rootFolderId }]),
              role: "button",
              tabindex: "0",
              onClick: _cache[4] || (_cache[4] = $event => (_ctx.selectFolder(_ctx.rootFolderId))),
              onKeyup: _cache[5] || (_cache[5] = withKeys($event => (_ctx.selectFolder(_ctx.rootFolderId)), ["enter"]))
            }, [
              createVNode(_component_el_icon, null, {
                default: withCtx(() => [
                  createVNode(_component_el_icon_folder_opened)
                ]),
                _: 1 /* STABLE */
              }),
              createElementVNode("span", null, toDisplayString(_ctx.rootLabel), 1 /* TEXT */),
              createElementVNode("em", null, toDisplayString(_ctx.rootFilesCount), 1 /* TEXT */),
              createVNode(_component_el_dropdown, {
                class: normalizeClass(_ctx.b('root-menu')),
                disabled: _ctx.isDisabled,
                trigger: "click",
                onCommand: _ctx.handleRootCommand,
                onClick: _cache[3] || (_cache[3] = withModifiers(() => {}, ["stop"]))
              }, {
                dropdown: withCtx(() => [
                  createVNode(_component_el_dropdown_menu, null, {
                    default: withCtx(() => [
                      createVNode(_component_el_dropdown_item, {
                        command: "create",
                        disabled: _ctx.isDisabled
                      }, {
                        default: withCtx(() => _cache[31] || (_cache[31] = [
                          createTextVNode("新建文件夹")
                        ])),
                        _: 1 /* STABLE */
                      }, 8 /* PROPS */, ["disabled"])
                    ]),
                    _: 1 /* STABLE */
                  })
                ]),
                default: withCtx(() => [
                  createVNode(_component_el_button, {
                    text: "",
                    circle: "",
                    disabled: _ctx.isDisabled,
                    "aria-label": "根目录操作菜单",
                    onClick: _cache[2] || (_cache[2] = withModifiers(() => {}, ["stop"]))
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_el_icon, null, {
                        default: withCtx(() => [
                          createVNode(_component_el_icon_more_filled)
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
            createVNode(_component_el_tree, {
              ref: "folderTree",
              data: _ctx.folderTree,
              props: _ctx.treeProps,
              "node-key": "id",
              "highlight-current": "",
              "current-node-key": _ctx.activeFolderId,
              "expand-on-click-node": false,
              onNodeClick: _ctx.handleFolderClick
            }, {
              default: withCtx(({ data }) => [
                createElementVNode("span", {
                  class: normalizeClass(_ctx.b('folder-node'))
                }, [
                  createElementVNode("span", null, toDisplayString(data.name), 1 /* TEXT */),
                  createElementVNode("em", null, toDisplayString(_ctx.getFolderFileCount(data.id)), 1 /* TEXT */),
                  createVNode(_component_el_dropdown, {
                    class: normalizeClass(_ctx.b('folder-menu')),
                    disabled: _ctx.isDisabled,
                    trigger: "click",
                    onCommand: $event => (_ctx.handleFolderCommand($event, data)),
                    onClick: _cache[7] || (_cache[7] = withModifiers(() => {}, ["stop"]))
                  }, {
                    dropdown: withCtx(() => [
                      createVNode(_component_el_dropdown_menu, null, {
                        default: withCtx(() => [
                          createVNode(_component_el_dropdown_item, {
                            command: "create",
                            disabled: _ctx.isDisabled
                          }, {
                            default: withCtx(() => _cache[32] || (_cache[32] = [
                              createTextVNode("新建子文件夹")
                            ])),
                            _: 1 /* STABLE */
                          }, 8 /* PROPS */, ["disabled"]),
                          createVNode(_component_el_dropdown_item, {
                            command: "rename",
                            disabled: _ctx.isDisabled
                          }, {
                            default: withCtx(() => _cache[33] || (_cache[33] = [
                              createTextVNode("重命名")
                            ])),
                            _: 1 /* STABLE */
                          }, 8 /* PROPS */, ["disabled"]),
                          createVNode(_component_el_dropdown_item, {
                            command: "remove",
                            divided: "",
                            disabled: _ctx.isDisabled || !_ctx.canRemoveFolder(data)
                          }, {
                            default: withCtx(() => _cache[34] || (_cache[34] = [
                              createTextVNode("删除")
                            ])),
                            _: 2 /* DYNAMIC */
                          }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["disabled"])
                        ]),
                        _: 2 /* DYNAMIC */
                      }, 1024 /* DYNAMIC_SLOTS */)
                    ]),
                    default: withCtx(() => [
                      createVNode(_component_el_button, {
                        text: "",
                        circle: "",
                        disabled: _ctx.isDisabled,
                        "aria-label": `${data.name} 操作菜单`,
                        onClick: _cache[6] || (_cache[6] = withModifiers(() => {}, ["stop"]))
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_el_icon, null, {
                            default: withCtx(() => [
                              createVNode(_component_el_icon_more_filled)
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
      createElementVNode("main", {
        class: normalizeClass(_ctx.b('files'))
      }, [
        createElementVNode("div", {
          class: normalizeClass(_ctx.b('files-header'))
        }, [
          createElementVNode("span", null, toDisplayString(_ctx.activeFolderName), 1 /* TEXT */),
          createElementVNode("small", null, toDisplayString(_ctx.visibleFiles.length) + " 个文件", 1 /* TEXT */)
        ], 2 /* CLASS */),
        createVNode(_component_el_scrollbar, {
          class: normalizeClass(_ctx.b('files-scroll'))
        }, {
          default: withCtx(() => [
            (!_ctx.visibleFiles.length)
              ? (openBlock(), createBlock(_component_el_empty, {
                  key: 0,
                  description: "当前文件夹暂无文件"
                }))
              : (openBlock(), createElementBlock("div", {
                  key: 1,
                  class: normalizeClass(_ctx.b('grid'))
                }, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.visibleFiles, (file) => {
                    return (openBlock(), createElementBlock("div", {
                      key: file.id,
                      class: normalizeClass([_ctx.b('file'), { 'is-active': file.id === _ctx.selectedFileId }]),
                      role: "button",
                      tabindex: "0",
                      onClick: $event => (_ctx.selectFile(file)),
                      onDblclick: $event => (_ctx.previewFile(file)),
                      onKeyup: withKeys($event => (_ctx.previewFile(file)), ["enter"])
                    }, [
                      createVNode(_component_el_dropdown, {
                        class: normalizeClass(_ctx.b('file-menu')),
                        disabled: _ctx.isDisabled,
                        trigger: "click",
                        onCommand: $event => (_ctx.handleFileCommand($event, file)),
                        onClick: _cache[9] || (_cache[9] = withModifiers(() => {}, ["stop"]))
                      }, {
                        dropdown: withCtx(() => [
                          createVNode(_component_el_dropdown_menu, null, {
                            default: withCtx(() => [
                              createVNode(_component_el_dropdown_item, { command: "preview" }, {
                                default: withCtx(() => [...(_cache[35] || (_cache[35] = [
                                  createTextVNode("预览")
                                ]))]),
                                _: 1 /* STABLE */
                              }),
                              createVNode(_component_el_dropdown_item, {
                                command: "move",
                                disabled: _ctx.isDisabled
                              }, {
                                default: withCtx(() => [...(_cache[36] || (_cache[36] = [
                                  createTextVNode("移动")
                                ]))]),
                                _: 1 /* STABLE */
                              }, 8 /* PROPS */, ["disabled"]),
                              createVNode(_component_el_dropdown_item, {
                                command: "rename",
                                disabled: _ctx.isDisabled
                              }, {
                                default: withCtx(() => [...(_cache[37] || (_cache[37] = [
                                  createTextVNode("重命名")
                                ]))]),
                                _: 1 /* STABLE */
                              }, 8 /* PROPS */, ["disabled"]),
                              createVNode(_component_el_dropdown_item, {
                                command: "remove",
                                divided: "",
                                disabled: _ctx.isDisabled
                              }, {
                                default: withCtx(() => [...(_cache[38] || (_cache[38] = [
                                  createTextVNode("删除")
                                ]))]),
                                _: 1 /* STABLE */
                              }, 8 /* PROPS */, ["disabled"])
                            ]),
                            _: 1 /* STABLE */
                          })
                        ]),
                        default: withCtx(() => [
                          createVNode(_component_el_button, {
                            text: "",
                            circle: "",
                            disabled: _ctx.isDisabled,
                            "aria-label": `${file.name} 操作菜单`,
                            onClick: _cache[8] || (_cache[8] = withModifiers(() => {}, ["stop"]))
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_el_icon, null, {
                                default: withCtx(() => [
                                  createVNode(_component_el_icon_more_filled)
                                ]),
                                _: 1 /* STABLE */
                              })
                            ]),
                            _: 2 /* DYNAMIC */
                          }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["disabled", "aria-label"])
                        ]),
                        _: 2 /* DYNAMIC */
                      }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["class", "disabled", "onCommand"]),
                      createElementVNode("span", {
                        class: normalizeClass(_ctx.b('file-icon'))
                      }, [
                        (_ctx.getFileKind(file) === 'image')
                          ? (openBlock(), createBlock(_component_el_icon, { key: 0 }, {
                              default: withCtx(() => [
                                createVNode(_component_el_icon_picture)
                              ]),
                              _: 1 /* STABLE */
                            }))
                          : (_ctx.getFileKind(file) === 'video')
                            ? (openBlock(), createBlock(_component_el_icon, { key: 1 }, {
                                default: withCtx(() => [
                                  createVNode(_component_el_icon_video_play)
                                ]),
                                _: 1 /* STABLE */
                              }))
                            : (_ctx.getFileKind(file) === 'audio')
                              ? (openBlock(), createBlock(_component_el_icon, { key: 2 }, {
                                  default: withCtx(() => [
                                    createVNode(_component_el_icon_headset)
                                  ]),
                                  _: 1 /* STABLE */
                                }))
                              : (_ctx.getFileKind(file) === 'pdf')
                                ? (openBlock(), createBlock(_component_el_icon, { key: 3 }, {
                                    default: withCtx(() => [
                                      createVNode(_component_el_icon_document)
                                    ]),
                                    _: 1 /* STABLE */
                                  }))
                                : (openBlock(), createBlock(_component_el_icon, { key: 4 }, {
                                    default: withCtx(() => [
                                      createVNode(_component_el_icon_files)
                                    ]),
                                    _: 1 /* STABLE */
                                  }))
                      ], 2 /* CLASS */),
                      createElementVNode("span", {
                        class: normalizeClass(_ctx.b('file-name')),
                        title: file.name
                      }, toDisplayString(file.name), 11 /* TEXT, CLASS, PROPS */, _hoisted_3),
                      createElementVNode("small", null, toDisplayString(_ctx.formatSize(file.size) || _ctx.getFileExtension(file).toUpperCase() || '文件'), 1 /* TEXT */),
                      (file.status === 'uploading')
                        ? (openBlock(), createElementBlock("span", {
                            key: 0,
                            class: normalizeClass(_ctx.b('file-status'))
                          }, "上传中", 2 /* CLASS */))
                        : (file.status === 'error')
                          ? (openBlock(), createElementBlock("span", {
                              key: 1,
                              class: normalizeClass([_ctx.b('file-status'), 'is-error'])
                            }, "上传失败", 2 /* CLASS */))
                          : createCommentVNode("v-if", true)
                    ], 42 /* CLASS, PROPS, NEED_HYDRATION */, _hoisted_2))
                  }), 128 /* KEYED_FRAGMENT */))
                ], 2 /* CLASS */))
          ]),
          _: 1 /* STABLE */
        }, 8 /* PROPS */, ["class"])
      ], 2 /* CLASS */),
      (_ctx.showPreview)
        ? (openBlock(), createElementBlock("aside", {
            key: 0,
            class: normalizeClass(_ctx.b('preview'))
          }, [
            (_ctx.selectedFile)
              ? (openBlock(), createElementBlock("header", {
                  key: 0,
                  class: normalizeClass(_ctx.b('preview-toolbar'))
                }, [
                  createElementVNode("div", {
                    class: normalizeClass(_ctx.b('preview-meta'))
                  }, [
                    createElementVNode("span", {
                      class: normalizeClass(_ctx.b('preview-name'))
                    }, toDisplayString(_ctx.selectedFile.name), 3 /* TEXT, CLASS */),
                    (_ctx.selectedFile.size)
                      ? (openBlock(), createElementBlock("span", {
                          key: 0,
                          class: normalizeClass(_ctx.b('preview-size'))
                        }, toDisplayString(_ctx.formatSize(_ctx.selectedFile.size)), 3 /* TEXT, CLASS */))
                      : createCommentVNode("v-if", true)
                  ], 2 /* CLASS */),
                  (_ctx.downloadable)
                    ? (openBlock(), createBlock(_component_el_button, {
                        key: 0,
                        text: "",
                        type: "primary",
                        onClick: _ctx.downloadSelected
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_el_icon, null, {
                            default: withCtx(() => [
                              createVNode(_component_el_icon_download)
                            ]),
                            _: 1 /* STABLE */
                          }),
                          _cache[39] || (_cache[39] = createTextVNode(" 下载 "))
                        ]),
                        _: 1 /* STABLE */
                      }, 8 /* PROPS */, ["onClick"]))
                    : createCommentVNode("v-if", true)
                ], 2 /* CLASS */))
              : createCommentVNode("v-if", true),
            createElementVNode("div", {
              class: normalizeClass(_ctx.b('preview-content')),
              style: normalizeStyle(_ctx.previewContentStyle)
            }, [
              (!_ctx.selectedFile)
                ? (openBlock(), createBlock(_component_el_empty, {
                    key: 0,
                    description: "请选择文件进行预览"
                  }))
                : (_ctx.getFileKind(_ctx.selectedFile) === 'image')
                  ? (openBlock(), createBlock(_component_el_image, {
                      key: 1,
                      src: _ctx.selectedFile.url,
                      "preview-src-list": [_ctx.selectedFile.url],
                      fit: "contain",
                      class: normalizeClass(_ctx.b('preview-image')),
                      onError: _ctx.handlePreviewError
                    }, null, 8 /* PROPS */, ["src", "preview-src-list", "class", "onError"]))
                  : (_ctx.getFileKind(_ctx.selectedFile) === 'video')
                    ? (openBlock(), createElementBlock("video", {
                        key: 2,
                        src: _ctx.selectedFile.url,
                        controls: "",
                        preload: "metadata",
                        class: normalizeClass(_ctx.b('preview-media')),
                        onError: _cache[10] || (_cache[10] = (...args) => (_ctx.handlePreviewError && _ctx.handlePreviewError(...args)))
                      }, "当前浏览器不支持视频预览。", 42 /* CLASS, PROPS, NEED_HYDRATION */, _hoisted_4))
                    : (_ctx.getFileKind(_ctx.selectedFile) === 'audio')
                      ? (openBlock(), createElementBlock("audio", {
                          key: 3,
                          src: _ctx.selectedFile.url,
                          controls: "",
                          preload: "metadata",
                          class: normalizeClass(_ctx.b('preview-audio')),
                          onError: _cache[11] || (_cache[11] = (...args) => (_ctx.handlePreviewError && _ctx.handlePreviewError(...args)))
                        }, "当前浏览器不支持音频预览。", 42 /* CLASS, PROPS, NEED_HYDRATION */, _hoisted_5))
                      : (_ctx.getFileKind(_ctx.selectedFile) === 'pdf')
                        ? (openBlock(), createElementBlock("iframe", {
                            key: 4,
                            src: _ctx.selectedFile.url,
                            title: _ctx.selectedFile.name,
                            class: normalizeClass(_ctx.b('preview-iframe'))
                          }, null, 10 /* CLASS, PROPS */, _hoisted_6))
                        : (_ctx.getFileKind(_ctx.selectedFile) === 'text')
                          ? (openBlock(), createElementBlock("div", {
                              key: 5,
                              class: normalizeClass(_ctx.b('preview-text'))
                            }, [
                              (_ctx.textLoading)
                                ? (openBlock(), createBlock(_component_el_skeleton, {
                                    key: 0,
                                    animated: "",
                                    rows: 8
                                  }))
                                : (_ctx.textError)
                                  ? (openBlock(), createBlock(_component_el_result, {
                                      key: 1,
                                      icon: "error",
                                      title: "文本预览失败",
                                      "sub-title": _ctx.textError
                                    }, {
                                      extra: withCtx(() => [
                                        (_ctx.downloadable)
                                          ? (openBlock(), createBlock(_component_el_button, {
                                              key: 0,
                                              type: "primary",
                                              onClick: _ctx.downloadSelected
                                            }, {
                                              default: withCtx(() => _cache[40] || (_cache[40] = [
                                                createTextVNode("下载文件")
                                              ])),
                                              _: 1 /* STABLE */
                                            }, 8 /* PROPS */, ["onClick"]))
                                          : createCommentVNode("v-if", true)
                                      ]),
                                      _: 1 /* STABLE */
                                    }, 8 /* PROPS */, ["sub-title"]))
                                  : (openBlock(), createElementBlock("pre", _hoisted_7, toDisplayString(_ctx.textContent), 1 /* TEXT */))
                            ], 2 /* CLASS */))
                          : (openBlock(), createBlock(_component_el_result, {
                              key: 6,
                              icon: "info",
                              title: "暂不支持在线预览"
                            }, {
                              "sub-title": withCtx(() => [
                                createElementVNode("span", null, toDisplayString(_ctx.selectedFile.name) + " 可下载后在本地打开。", 1 /* TEXT */)
                              ]),
                              extra: withCtx(() => [
                                (_ctx.downloadable)
                                  ? (openBlock(), createBlock(_component_el_button, {
                                      key: 0,
                                      type: "primary",
                                      onClick: _ctx.downloadSelected
                                    }, {
                                      default: withCtx(() => _cache[41] || (_cache[41] = [
                                        createTextVNode("下载文件")
                                      ])),
                                      _: 1 /* STABLE */
                                    }, 8 /* PROPS */, ["onClick"]))
                                  : createCommentVNode("v-if", true)
                              ]),
                              _: 1 /* STABLE */
                            }))
            ], 6 /* CLASS, STYLE */)
          ], 2 /* CLASS */))
        : createCommentVNode("v-if", true)
    ], 6 /* CLASS, STYLE */),
    createVNode(_component_el_dialog, {
      modelValue: _ctx.folderDialogVisible,
      "onUpdate:modelValue": _cache[15] || (_cache[15] = $event => ((_ctx.folderDialogVisible) = $event)),
      title: _ctx.folderDialogTitle,
      width: "400px",
      "append-to-body": ""
    }, {
      footer: withCtx(() => [
        createVNode(_component_el_button, {
          onClick: _cache[14] || (_cache[14] = $event => (_ctx.folderDialogVisible = false))
        }, {
          default: withCtx(() => _cache[42] || (_cache[42] = [
            createTextVNode("取消")
          ])),
          _: 1 /* STABLE */
        }),
        createVNode(_component_el_button, {
          type: "primary",
          onClick: _ctx.saveFolder
        }, {
          default: withCtx(() => _cache[43] || (_cache[43] = [
            createTextVNode("确定")
          ])),
          _: 1 /* STABLE */
        }, 8 /* PROPS */, ["onClick"])
      ]),
      default: withCtx(() => [
        createVNode(_component_el_form, {
          onSubmit: _cache[13] || (_cache[13] = withModifiers(() => {}, ["prevent"]))
        }, {
          default: withCtx(() => [
            createVNode(_component_el_form_item, {
              label: "文件夹名称",
              error: _ctx.folderDialogError
            }, {
              default: withCtx(() => [
                createVNode(_component_el_input, {
                  modelValue: _ctx.folderName,
                  "onUpdate:modelValue": _cache[12] || (_cache[12] = $event => ((_ctx.folderName) = $event)),
                  maxlength: "50",
                  "show-word-limit": "",
                  onKeyup: withKeys(_ctx.saveFolder, ["enter"])
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
    createVNode(_component_el_dialog, {
      modelValue: _ctx.folderDeleteDialogVisible,
      "onUpdate:modelValue": _cache[17] || (_cache[17] = $event => ((_ctx.folderDeleteDialogVisible) = $event)),
      title: "删除文件夹",
      width: "400px",
      "append-to-body": ""
    }, {
      footer: withCtx(() => [
        createVNode(_component_el_button, {
          onClick: _cache[16] || (_cache[16] = $event => (_ctx.folderDeleteDialogVisible = false))
        }, {
          default: withCtx(() => _cache[44] || (_cache[44] = [
            createTextVNode("取消")
          ])),
          _: 1 /* STABLE */
        }),
        createVNode(_component_el_button, {
          type: "danger",
          onClick: _ctx.removeFolder
        }, {
          default: withCtx(() => _cache[45] || (_cache[45] = [
            createTextVNode("删除")
          ])),
          _: 1 /* STABLE */
        }, 8 /* PROPS */, ["onClick"])
      ]),
      default: withCtx(() => [
        createElementVNode("p", null, "确定删除文件夹“" + toDisplayString(_ctx.folderToDelete ? _ctx.folderToDelete.name : '') + "”吗？", 1 /* TEXT */)
      ]),
      _: 1 /* STABLE */
    }, 8 /* PROPS */, ["modelValue"]),
    createVNode(_component_el_dialog, {
      modelValue: _ctx.renameDialogVisible,
      "onUpdate:modelValue": _cache[21] || (_cache[21] = $event => ((_ctx.renameDialogVisible) = $event)),
      title: "重命名文件",
      width: "400px",
      "append-to-body": ""
    }, {
      footer: withCtx(() => [
        createVNode(_component_el_button, {
          onClick: _cache[20] || (_cache[20] = $event => (_ctx.renameDialogVisible = false))
        }, {
          default: withCtx(() => _cache[46] || (_cache[46] = [
            createTextVNode("取消")
          ])),
          _: 1 /* STABLE */
        }),
        createVNode(_component_el_button, {
          type: "primary",
          onClick: _ctx.renameFile
        }, {
          default: withCtx(() => _cache[47] || (_cache[47] = [
            createTextVNode("确定")
          ])),
          _: 1 /* STABLE */
        }, 8 /* PROPS */, ["onClick"])
      ]),
      default: withCtx(() => [
        createVNode(_component_el_form, {
          onSubmit: _cache[19] || (_cache[19] = withModifiers(() => {}, ["prevent"]))
        }, {
          default: withCtx(() => [
            createVNode(_component_el_form_item, {
              label: "文件名称",
              error: _ctx.renameDialogError
            }, {
              default: withCtx(() => [
                createVNode(_component_el_input, {
                  modelValue: _ctx.renameValue,
                  "onUpdate:modelValue": _cache[18] || (_cache[18] = $event => ((_ctx.renameValue) = $event)),
                  maxlength: "100",
                  "show-word-limit": "",
                  onKeyup: withKeys(_ctx.renameFile, ["enter"])
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
    createVNode(_component_el_dialog, {
      modelValue: _ctx.moveDialogVisible,
      "onUpdate:modelValue": _cache[25] || (_cache[25] = $event => ((_ctx.moveDialogVisible) = $event)),
      title: "移动文件",
      width: "400px",
      "append-to-body": ""
    }, {
      footer: withCtx(() => [
        createVNode(_component_el_button, {
          onClick: _cache[24] || (_cache[24] = $event => (_ctx.moveDialogVisible = false))
        }, {
          default: withCtx(() => _cache[48] || (_cache[48] = [
            createTextVNode("取消")
          ])),
          _: 1 /* STABLE */
        }),
        createVNode(_component_el_button, {
          type: "primary",
          onClick: _ctx.moveFile
        }, {
          default: withCtx(() => _cache[49] || (_cache[49] = [
            createTextVNode("确定")
          ])),
          _: 1 /* STABLE */
        }, 8 /* PROPS */, ["onClick"])
      ]),
      default: withCtx(() => [
        createVNode(_component_el_form, {
          onSubmit: _cache[23] || (_cache[23] = withModifiers(() => {}, ["prevent"]))
        }, {
          default: withCtx(() => [
            createVNode(_component_el_form_item, { label: "目标文件夹" }, {
              default: withCtx(() => [
                createVNode(_component_el_select, {
                  modelValue: _ctx.targetFolderId,
                  "onUpdate:modelValue": _cache[22] || (_cache[22] = $event => ((_ctx.targetFolderId) = $event)),
                  filterable: "",
                  placeholder: "选择文件夹"
                }, {
                  default: withCtx(() => [
                    createVNode(_component_el_option, {
                      label: _ctx.rootLabel,
                      value: _ctx.rootFolderId
                    }, null, 8 /* PROPS */, ["label", "value"]),
                    (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.localFolders, (folder) => {
                      return (openBlock(), createBlock(_component_el_option, {
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

export { render };
