/*! Avue.js v3.9.3 | (c) 2017-2026 Smallwei | Released under the MIT License. */
import { openBlock, createElementBlock, normalizeStyle, normalizeClass, Fragment, createElementVNode, renderList, createCommentVNode, toDisplayString, withModifiers, createTextVNode } from 'vue';

const _hoisted_1 = ["d"];
const _hoisted_2 = ["id"];
const _hoisted_3 = ["d"];
const _hoisted_4 = ["id"];
const _hoisted_5 = ["href", "clip-path"];
const _hoisted_6 = ["d", "fill"];
const _hoisted_7 = ["d"];
const _hoisted_8 = ["disabled"];
const _hoisted_9 = ["disabled", "aria-label", "onClick"];
const _hoisted_10 = ["disabled", "aria-label", "onClick"];
const _hoisted_11 = ["disabled"];
const _hoisted_12 = ["disabled"];
const _hoisted_13 = ["disabled", "aria-label", "onClick"];
const _hoisted_14 = ["disabled", "aria-label", "onClick"];
const _hoisted_15 = ["disabled"];
const _hoisted_16 = ["viewBox"];
const _hoisted_17 = ["d"];
const _hoisted_18 = ["cx", "cy"];
const _hoisted_19 = ["disabled"];
const _hoisted_20 = ["disabled"];

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createElementBlock("div", {
    class: normalizeClass([_ctx.b(), _ctx.b(`is-${_ctx.captchaType}`), { [_ctx.b('success')]: _ctx.verified, [_ctx.b('error')]: _ctx.status === 'error', [_ctx.b('disabled')]: _ctx.disabled }]),
    style: normalizeStyle(_ctx.rootStyle)
  }, [
    (_ctx.captchaType === 'slider')
      ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
          createElementVNode("div", {
            ref: "scene",
            class: normalizeClass(_ctx.b('scene')),
            style: normalizeStyle(_ctx.sceneStyle)
          }, [
            createElementVNode("span", {
              class: normalizeClass(_ctx.b('scene-decoration', 'one'))
            }, null, 2 /* CLASS */),
            createElementVNode("span", {
              class: normalizeClass(_ctx.b('scene-decoration', 'two'))
            }, null, 2 /* CLASS */),
            (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.sliderTargets, (target) => {
              return (openBlock(), createElementBlock("svg", {
                key: target.id,
                class: normalizeClass([_ctx.b('slider-target'), _ctx.b(`slider-target-${target.shape}`), { [_ctx.b('slider-target-decoy')]: !target.correct }]),
                style: normalizeStyle(_ctx.getSliderTargetStyle(target)),
                viewBox: "0 0 100 100",
                preserveAspectRatio: "none",
                "aria-hidden": "true"
              }, [
                createElementVNode("path", {
                  class: normalizeClass(_ctx.b('slider-target-path')),
                  d: _ctx.getPuzzlePath(target.shape)
                }, null, 10 /* CLASS, PROPS */, _hoisted_1)
              ], 6 /* CLASS, STYLE */))
            }), 128 /* KEYED_FRAGMENT */)),
            (openBlock(), createElementBlock("svg", {
              class: normalizeClass(_ctx.b('slider-piece')),
              style: normalizeStyle(_ctx.pieceStyle),
              viewBox: "0 0 100 100",
              preserveAspectRatio: "none",
              "aria-hidden": "true"
            }, [
              createElementVNode("defs", null, [
                createElementVNode("clipPath", { id: _ctx.pieceClipId }, [
                  createElementVNode("path", { d: _ctx.piecePath }, null, 8 /* PROPS */, _hoisted_3)
                ], 8 /* PROPS */, _hoisted_2),
                createElementVNode("linearGradient", {
                  id: _ctx.pieceGradientId,
                  x1: "0",
                  y1: "0",
                  x2: "1",
                  y2: "1"
                }, _cache[6] || (_cache[6] = [
                  createElementVNode("stop", {
                    offset: "0",
                    "stop-color": "#c9e7ff"
                  }, null, -1 /* HOISTED */),
                  createElementVNode("stop", {
                    offset: "1",
                    "stop-color": "#72adf2"
                  }, null, -1 /* HOISTED */)
                ]), 8 /* PROPS */, _hoisted_4)
              ]),
              (_ctx.backgroundSource)
                ? (openBlock(), createElementBlock("image", {
                    key: 0,
                    href: _ctx.backgroundSource,
                    x: "0",
                    y: "0",
                    width: "100",
                    height: "100",
                    preserveAspectRatio: "xMidYMid slice",
                    "clip-path": `url(#${_ctx.pieceClipId})`
                  }, null, 8 /* PROPS */, _hoisted_5))
                : (openBlock(), createElementBlock("path", {
                    key: 1,
                    d: _ctx.piecePath,
                    fill: `url(#${_ctx.pieceGradientId})`
                  }, null, 8 /* PROPS */, _hoisted_6)),
              createElementVNode("path", {
                class: normalizeClass(_ctx.b('slider-piece-outline')),
                d: _ctx.piecePath
              }, null, 10 /* CLASS, PROPS */, _hoisted_7)
            ], 6 /* CLASS, STYLE */)),
            (_ctx.verified)
              ? (openBlock(), createElementBlock("div", {
                  key: 0,
                  class: normalizeClass(_ctx.b('mask'))
                }, "验证通过", 2 /* CLASS */))
              : createCommentVNode("v-if", true)
          ], 6 /* CLASS, STYLE */),
          createElementVNode("div", {
            ref: "slider",
            class: normalizeClass(_ctx.b('slider'))
          }, [
            createElementVNode("div", {
              class: normalizeClass(_ctx.b('slider-progress')),
              style: normalizeStyle(_ctx.progressStyle)
            }, null, 6 /* CLASS, STYLE */),
            createElementVNode("span", {
              class: normalizeClass(_ctx.b('slider-text'))
            }, toDisplayString(_ctx.sliderTip), 3 /* TEXT, CLASS */),
            createElementVNode("button", {
              type: "button",
              class: normalizeClass(_ctx.b('slider-button')),
              style: normalizeStyle(_ctx.sliderButtonStyle),
              disabled: _ctx.disabled || _ctx.verified,
              "aria-label": "拖动滑块完成验证",
              onPointerdown: _cache[0] || (_cache[0] = withModifiers((...args) => (_ctx.startSlide && _ctx.startSlide(...args)), ["prevent"]))
            }, _cache[7] || (_cache[7] = [
              createElementVNode("span", { "aria-hidden": "true" }, "›", -1 /* HOISTED */)
            ]), 46 /* CLASS, STYLE, PROPS, NEED_HYDRATION */, _hoisted_8)
          ], 2 /* CLASS */)
        ], 64 /* STABLE_FRAGMENT */))
      : (_ctx.captchaType === 'text')
        ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
            createElementVNode("div", {
              ref: "scene",
              class: normalizeClass(_ctx.b('scene', 'text')),
              style: normalizeStyle(_ctx.sceneStyle)
            }, [
              createElementVNode("span", {
                class: normalizeClass(_ctx.b('scene-decoration', 'one'))
              }, null, 2 /* CLASS */),
              createElementVNode("span", {
                class: normalizeClass(_ctx.b('scene-decoration', 'two'))
              }, null, 2 /* CLASS */),
              createElementVNode("div", {
                class: normalizeClass(_ctx.b('text-options')),
                role: "group",
                "aria-label": "文字验证码选项"
              }, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.textOptions, (item) => {
                  return (openBlock(), createElementBlock("button", {
                    key: item.id,
                    type: "button",
                    class: normalizeClass([_ctx.b('text-option'), { [_ctx.b('text-option-selected')]: _ctx.selectedTextIds.includes(item.id) }]),
                    style: normalizeStyle(_ctx.getChoiceOptionStyle(item)),
                    disabled: _ctx.disabled || _ctx.verified || _ctx.selectedTextIds.includes(item.id),
                    "aria-label": `点击文字 ${item.value}`,
                    onClick: $event => (_ctx.selectText(item))
                  }, toDisplayString(item.value), 15 /* TEXT, CLASS, STYLE, PROPS */, _hoisted_9))
                }), 128 /* KEYED_FRAGMENT */))
              ], 2 /* CLASS */),
              (_ctx.verified)
                ? (openBlock(), createElementBlock("div", {
                    key: 0,
                    class: normalizeClass(_ctx.b('mask'))
                  }, "验证通过", 2 /* CLASS */))
                : createCommentVNode("v-if", true)
            ], 6 /* CLASS, STYLE */),
            createElementVNode("div", {
              class: normalizeClass(_ctx.b('canvas-prompt'))
            }, [
              _cache[8] || (_cache[8] = createTextVNode(" 请依次点击 ")),
              createElementVNode("strong", null, "【" + toDisplayString(_ctx.targetTextLabel) + "】", 1 /* TEXT */)
            ], 2 /* CLASS */)
          ], 64 /* STABLE_FRAGMENT */))
        : (_ctx.captchaType === 'math')
          ? (openBlock(), createElementBlock(Fragment, { key: 2 }, [
              createElementVNode("div", {
                ref: "scene",
                class: normalizeClass(_ctx.b('scene', 'math')),
                style: normalizeStyle(_ctx.sceneStyle)
              }, [
                createElementVNode("span", {
                  class: normalizeClass(_ctx.b('scene-decoration', 'one'))
                }, null, 2 /* CLASS */),
                createElementVNode("span", {
                  class: normalizeClass(_ctx.b('scene-decoration', 'two'))
                }, null, 2 /* CLASS */),
                createElementVNode("div", {
                  class: normalizeClass(_ctx.b('math-options')),
                  role: "group",
                  "aria-label": "算术验证码选项"
                }, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.mathResultOptions, (item) => {
                    return (openBlock(), createElementBlock("button", {
                      key: item.id,
                      type: "button",
                      class: normalizeClass(_ctx.b('math-option')),
                      style: normalizeStyle(_ctx.getChoiceOptionStyle(item)),
                      disabled: _ctx.disabled || _ctx.verified,
                      "aria-label": `选择结果 ${item.value}`,
                      onClick: $event => (_ctx.selectMath(item))
                    }, toDisplayString(item.value), 15 /* TEXT, CLASS, STYLE, PROPS */, _hoisted_10))
                  }), 128 /* KEYED_FRAGMENT */))
                ], 2 /* CLASS */),
                (_ctx.verified)
                  ? (openBlock(), createElementBlock("div", {
                      key: 0,
                      class: normalizeClass(_ctx.b('mask'))
                    }, "验证通过", 2 /* CLASS */))
                  : createCommentVNode("v-if", true)
              ], 6 /* CLASS, STYLE */),
              createElementVNode("div", {
                class: normalizeClass(_ctx.b('canvas-prompt'))
              }, [
                _cache[9] || (_cache[9] = createTextVNode(" 请选择正确的计算结果：")),
                createElementVNode("strong", null, toDisplayString(_ctx.mathExpression), 1 /* TEXT */)
              ], 2 /* CLASS */)
            ], 64 /* STABLE_FRAGMENT */))
          : (_ctx.captchaType === 'rotate')
            ? (openBlock(), createElementBlock(Fragment, { key: 3 }, [
                createElementVNode("div", {
                  ref: "scene",
                  class: normalizeClass(_ctx.b('scene', 'rotate')),
                  style: normalizeStyle(_ctx.sceneStyle)
                }, [
                  createElementVNode("span", {
                    class: normalizeClass(_ctx.b('scene-decoration', 'one'))
                  }, null, 2 /* CLASS */),
                  createElementVNode("span", {
                    class: normalizeClass(_ctx.b('scene-decoration', 'two'))
                  }, null, 2 /* CLASS */),
                  createElementVNode("div", {
                    class: normalizeClass(_ctx.b('rotate-dial')),
                    style: normalizeStyle(_ctx.rotateDialStyle),
                    "aria-hidden": "true"
                  }, [
                    createElementVNode("span", {
                      class: normalizeClass(_ctx.b('rotate-arrow'))
                    }, "↑", 2 /* CLASS */),
                    createElementVNode("span", {
                      class: normalizeClass(_ctx.b('rotate-mark'))
                    }, "AVUE", 2 /* CLASS */)
                  ], 6 /* CLASS, STYLE */),
                  createElementVNode("div", {
                    class: normalizeClass(_ctx.b('rotate-controls'))
                  }, [
                    createElementVNode("button", {
                      type: "button",
                      disabled: _ctx.disabled || _ctx.verified,
                      "aria-label": "逆时针旋转",
                      onClick: _cache[1] || (_cache[1] = $event => (_ctx.rotateCaptcha(-1)))
                    }, "↺", 8 /* PROPS */, _hoisted_11),
                    createElementVNode("button", {
                      type: "button",
                      disabled: _ctx.disabled || _ctx.verified,
                      "aria-label": "顺时针旋转",
                      onClick: _cache[2] || (_cache[2] = $event => (_ctx.rotateCaptcha(1)))
                    }, "↻", 8 /* PROPS */, _hoisted_12)
                  ], 2 /* CLASS */),
                  (_ctx.verified)
                    ? (openBlock(), createElementBlock("div", {
                        key: 0,
                        class: normalizeClass(_ctx.b('mask'))
                      }, "验证通过", 2 /* CLASS */))
                    : createCommentVNode("v-if", true)
                ], 6 /* CLASS, STYLE */),
                createElementVNode("div", {
                  class: normalizeClass(_ctx.b('canvas-prompt'))
                }, "将图案旋转至正向", 2 /* CLASS */)
              ], 64 /* STABLE_FRAGMENT */))
            : (_ctx.captchaType === 'icon')
              ? (openBlock(), createElementBlock(Fragment, { key: 4 }, [
                  createElementVNode("div", {
                    ref: "scene",
                    class: normalizeClass(_ctx.b('scene', 'icon')),
                    style: normalizeStyle(_ctx.sceneStyle)
                  }, [
                    createElementVNode("span", {
                      class: normalizeClass(_ctx.b('scene-decoration', 'one'))
                    }, null, 2 /* CLASS */),
                    createElementVNode("span", {
                      class: normalizeClass(_ctx.b('scene-decoration', 'two'))
                    }, null, 2 /* CLASS */),
                    createElementVNode("div", {
                      class: normalizeClass(_ctx.b('icon-options')),
                      role: "group",
                      "aria-label": "图标验证码选项"
                    }, [
                      (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.iconOptions, (item) => {
                        return (openBlock(), createElementBlock("button", {
                          key: item.id,
                          type: "button",
                          class: normalizeClass(_ctx.b('icon-option')),
                          style: normalizeStyle(_ctx.getIconOptionStyle(item)),
                          disabled: _ctx.disabled || _ctx.verified,
                          "aria-label": `点击${item.label}`,
                          onClick: $event => (_ctx.selectIcon(item))
                        }, toDisplayString(item.value), 15 /* TEXT, CLASS, STYLE, PROPS */, _hoisted_13))
                      }), 128 /* KEYED_FRAGMENT */))
                    ], 2 /* CLASS */),
                    (_ctx.verified)
                      ? (openBlock(), createElementBlock("div", {
                          key: 0,
                          class: normalizeClass(_ctx.b('mask'))
                        }, "验证通过", 2 /* CLASS */))
                      : createCommentVNode("v-if", true)
                  ], 6 /* CLASS, STYLE */),
                  createElementVNode("div", {
                    class: normalizeClass(_ctx.b('canvas-prompt'))
                  }, [
                    _cache[10] || (_cache[10] = createTextVNode("请点击 ")),
                    createElementVNode("strong", null, toDisplayString(_ctx.iconTarget.label), 1 /* TEXT */)
                  ], 2 /* CLASS */)
                ], 64 /* STABLE_FRAGMENT */))
              : (_ctx.captchaType === 'sequence')
                ? (openBlock(), createElementBlock(Fragment, { key: 5 }, [
                    createElementVNode("div", {
                      ref: "scene",
                      class: normalizeClass(_ctx.b('scene', 'sequence')),
                      style: normalizeStyle(_ctx.sceneStyle)
                    }, [
                      createElementVNode("span", {
                        class: normalizeClass(_ctx.b('scene-decoration', 'one'))
                      }, null, 2 /* CLASS */),
                      createElementVNode("span", {
                        class: normalizeClass(_ctx.b('scene-decoration', 'two'))
                      }, null, 2 /* CLASS */),
                      createElementVNode("div", {
                        class: normalizeClass(_ctx.b('sequence-options')),
                        role: "group",
                        "aria-label": "顺序验证码选项"
                      }, [
                        (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.sequenceOptions, (item) => {
                          return (openBlock(), createElementBlock("button", {
                            key: item.id,
                            type: "button",
                            class: normalizeClass([_ctx.b('sequence-option'), _ctx.b(`sequence-option-${item.shape}`), { [_ctx.b('sequence-option-selected')]: _ctx.selectedSequenceIds.includes(item.id) }]),
                            style: normalizeStyle(_ctx.getSequenceOptionStyle(item)),
                            disabled: _ctx.disabled || _ctx.verified || _ctx.selectedSequenceIds.includes(item.id),
                            "aria-label": `点击${item.label}`,
                            onClick: $event => (_ctx.selectSequence(item))
                          }, null, 14 /* CLASS, STYLE, PROPS */, _hoisted_14))
                        }), 128 /* KEYED_FRAGMENT */))
                      ], 2 /* CLASS */),
                      (_ctx.verified)
                        ? (openBlock(), createElementBlock("div", {
                            key: 0,
                            class: normalizeClass(_ctx.b('mask'))
                          }, "验证通过", 2 /* CLASS */))
                        : createCommentVNode("v-if", true)
                    ], 6 /* CLASS, STYLE */),
                    createElementVNode("div", {
                      class: normalizeClass(_ctx.b('canvas-prompt'))
                    }, [
                      _cache[11] || (_cache[11] = createTextVNode("请依次点击 ")),
                      createElementVNode("strong", null, toDisplayString(_ctx.sequenceTargetLabel), 1 /* TEXT */)
                    ], 2 /* CLASS */)
                  ], 64 /* STABLE_FRAGMENT */))
                : (_ctx.captchaType === 'drag')
                  ? (openBlock(), createElementBlock(Fragment, { key: 6 }, [
                      createElementVNode("div", {
                        ref: "scene",
                        class: normalizeClass(_ctx.b('scene', 'drag')),
                        style: normalizeStyle(_ctx.sceneStyle)
                      }, [
                        createElementVNode("span", {
                          class: normalizeClass(_ctx.b('scene-decoration', 'one'))
                        }, null, 2 /* CLASS */),
                        createElementVNode("span", {
                          class: normalizeClass(_ctx.b('scene-decoration', 'two'))
                        }, null, 2 /* CLASS */),
                        createElementVNode("span", {
                          class: normalizeClass([_ctx.b('drag-target'), _ctx.b(`drag-shape-${_ctx.dragShape}`)]),
                          style: normalizeStyle(_ctx.dragTargetStyle),
                          "aria-hidden": "true"
                        }, null, 6 /* CLASS, STYLE */),
                        createElementVNode("button", {
                          type: "button",
                          class: normalizeClass([_ctx.b('drag-piece'), _ctx.b(`drag-shape-${_ctx.dragShape}`)]),
                          style: normalizeStyle(_ctx.dragPieceStyle),
                          disabled: _ctx.disabled || _ctx.verified,
                          "aria-label": "拖动图形到匹配轮廓",
                          onPointerdown: _cache[3] || (_cache[3] = withModifiers((...args) => (_ctx.startDrag && _ctx.startDrag(...args)), ["prevent"]))
                        }, null, 46 /* CLASS, STYLE, PROPS, NEED_HYDRATION */, _hoisted_15),
                        (_ctx.verified)
                          ? (openBlock(), createElementBlock("div", {
                              key: 0,
                              class: normalizeClass(_ctx.b('mask'))
                            }, "验证通过", 2 /* CLASS */))
                          : createCommentVNode("v-if", true)
                      ], 6 /* CLASS, STYLE */),
                      createElementVNode("div", {
                        class: normalizeClass(_ctx.b('canvas-prompt'))
                      }, "将图形拖到相同轮廓中", 2 /* CLASS */)
                    ], 64 /* STABLE_FRAGMENT */))
                  : (openBlock(), createElementBlock(Fragment, { key: 7 }, [
                      createElementVNode("div", {
                        ref: "scene",
                        class: normalizeClass(_ctx.b('scene', 'path')),
                        style: normalizeStyle(_ctx.sceneStyle)
                      }, [
                        createElementVNode("span", {
                          class: normalizeClass(_ctx.b('scene-decoration', 'one'))
                        }, null, 2 /* CLASS */),
                        createElementVNode("span", {
                          class: normalizeClass(_ctx.b('scene-decoration', 'two'))
                        }, null, 2 /* CLASS */),
                        (openBlock(), createElementBlock("svg", {
                          class: normalizeClass(_ctx.b('path-track')),
                          viewBox: `0 0 ${_ctx.getSceneWidth()} ${_ctx.safeHeight}`,
                          "aria-hidden": "true"
                        }, [
                          createElementVNode("path", {
                            d: _ctx.pathLine,
                            class: normalizeClass(_ctx.b('path-line'))
                          }, null, 10 /* CLASS, PROPS */, _hoisted_17),
                          createElementVNode("circle", {
                            cx: _ctx.pathEndPoint.x,
                            cy: _ctx.pathEndPoint.y,
                            r: "8",
                            class: normalizeClass(_ctx.b('path-end'))
                          }, null, 10 /* CLASS, PROPS */, _hoisted_18)
                        ], 10 /* CLASS, PROPS */, _hoisted_16)),
                        createElementVNode("button", {
                          type: "button",
                          class: normalizeClass(_ctx.b('path-marker')),
                          style: normalizeStyle(_ctx.pathMarkerStyle),
                          disabled: _ctx.disabled || _ctx.verified,
                          "aria-label": "沿轨迹滑动到终点",
                          onPointerdown: _cache[4] || (_cache[4] = withModifiers((...args) => (_ctx.startPath && _ctx.startPath(...args)), ["prevent"]))
                        }, null, 46 /* CLASS, STYLE, PROPS, NEED_HYDRATION */, _hoisted_19),
                        (_ctx.verified)
                          ? (openBlock(), createElementBlock("div", {
                              key: 0,
                              class: normalizeClass(_ctx.b('mask'))
                            }, "验证通过", 2 /* CLASS */))
                          : createCommentVNode("v-if", true)
                      ], 6 /* CLASS, STYLE */),
                      createElementVNode("div", {
                        class: normalizeClass(_ctx.b('canvas-prompt'))
                      }, "沿轨迹将圆点滑动到终点", 2 /* CLASS */)
                    ], 64 /* STABLE_FRAGMENT */)),
    createElementVNode("div", {
      class: normalizeClass(_ctx.b('footer'))
    }, [
      createElementVNode("span", {
        class: normalizeClass(_ctx.b('message')),
        role: "status"
      }, toDisplayString(_ctx.message), 3 /* TEXT, CLASS */),
      createElementVNode("button", {
        type: "button",
        class: normalizeClass(_ctx.b('refresh')),
        disabled: _ctx.disabled,
        "aria-label": "刷新验证码",
        onClick: _cache[5] || (_cache[5] = (...args) => (_ctx.refresh && _ctx.refresh(...args)))
      }, " ↻ 换一组 ", 10 /* CLASS, PROPS */, _hoisted_20)
    ], 2 /* CLASS */)
  ], 6 /* CLASS, STYLE */))
}

export { render };
