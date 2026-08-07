/*! Avue.js v3.9.3 | (c) 2017-2026 Smallwei | Released under the MIT License. */
'use strict';

var vue = require('vue');

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
  return (vue.openBlock(), vue.createElementBlock("div", {
    class: vue.normalizeClass([_ctx.b(), _ctx.b(`is-${_ctx.captchaType}`), { [_ctx.b('success')]: _ctx.verified, [_ctx.b('error')]: _ctx.status === 'error', [_ctx.b('disabled')]: _ctx.disabled }]),
    style: vue.normalizeStyle(_ctx.rootStyle)
  }, [
    (_ctx.captchaType === 'slider')
      ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 0 }, [
          vue.createElementVNode("div", {
            ref: "scene",
            class: vue.normalizeClass(_ctx.b('scene')),
            style: vue.normalizeStyle(_ctx.sceneStyle)
          }, [
            vue.createElementVNode("span", {
              class: vue.normalizeClass(_ctx.b('scene-decoration', 'one'))
            }, null, 2 /* CLASS */),
            vue.createElementVNode("span", {
              class: vue.normalizeClass(_ctx.b('scene-decoration', 'two'))
            }, null, 2 /* CLASS */),
            (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.sliderTargets, (target) => {
              return (vue.openBlock(), vue.createElementBlock("svg", {
                key: target.id,
                class: vue.normalizeClass([_ctx.b('slider-target'), _ctx.b(`slider-target-${target.shape}`), { [_ctx.b('slider-target-decoy')]: !target.correct }]),
                style: vue.normalizeStyle(_ctx.getSliderTargetStyle(target)),
                viewBox: "0 0 100 100",
                preserveAspectRatio: "none",
                "aria-hidden": "true"
              }, [
                vue.createElementVNode("path", {
                  class: vue.normalizeClass(_ctx.b('slider-target-path')),
                  d: _ctx.getPuzzlePath(target.shape)
                }, null, 10 /* CLASS, PROPS */, _hoisted_1)
              ], 6 /* CLASS, STYLE */))
            }), 128 /* KEYED_FRAGMENT */)),
            (vue.openBlock(), vue.createElementBlock("svg", {
              class: vue.normalizeClass(_ctx.b('slider-piece')),
              style: vue.normalizeStyle(_ctx.pieceStyle),
              viewBox: "0 0 100 100",
              preserveAspectRatio: "none",
              "aria-hidden": "true"
            }, [
              vue.createElementVNode("defs", null, [
                vue.createElementVNode("clipPath", { id: _ctx.pieceClipId }, [
                  vue.createElementVNode("path", { d: _ctx.piecePath }, null, 8 /* PROPS */, _hoisted_3)
                ], 8 /* PROPS */, _hoisted_2),
                vue.createElementVNode("linearGradient", {
                  id: _ctx.pieceGradientId,
                  x1: "0",
                  y1: "0",
                  x2: "1",
                  y2: "1"
                }, _cache[6] || (_cache[6] = [
                  vue.createElementVNode("stop", {
                    offset: "0",
                    "stop-color": "#c9e7ff"
                  }, null, -1 /* HOISTED */),
                  vue.createElementVNode("stop", {
                    offset: "1",
                    "stop-color": "#72adf2"
                  }, null, -1 /* HOISTED */)
                ]), 8 /* PROPS */, _hoisted_4)
              ]),
              (_ctx.backgroundSource)
                ? (vue.openBlock(), vue.createElementBlock("image", {
                    key: 0,
                    href: _ctx.backgroundSource,
                    x: "0",
                    y: "0",
                    width: "100",
                    height: "100",
                    preserveAspectRatio: "xMidYMid slice",
                    "clip-path": `url(#${_ctx.pieceClipId})`
                  }, null, 8 /* PROPS */, _hoisted_5))
                : (vue.openBlock(), vue.createElementBlock("path", {
                    key: 1,
                    d: _ctx.piecePath,
                    fill: `url(#${_ctx.pieceGradientId})`
                  }, null, 8 /* PROPS */, _hoisted_6)),
              vue.createElementVNode("path", {
                class: vue.normalizeClass(_ctx.b('slider-piece-outline')),
                d: _ctx.piecePath
              }, null, 10 /* CLASS, PROPS */, _hoisted_7)
            ], 6 /* CLASS, STYLE */)),
            (_ctx.verified)
              ? (vue.openBlock(), vue.createElementBlock("div", {
                  key: 0,
                  class: vue.normalizeClass(_ctx.b('mask'))
                }, "验证通过", 2 /* CLASS */))
              : vue.createCommentVNode("v-if", true)
          ], 6 /* CLASS, STYLE */),
          vue.createElementVNode("div", {
            ref: "slider",
            class: vue.normalizeClass(_ctx.b('slider'))
          }, [
            vue.createElementVNode("div", {
              class: vue.normalizeClass(_ctx.b('slider-progress')),
              style: vue.normalizeStyle(_ctx.progressStyle)
            }, null, 6 /* CLASS, STYLE */),
            vue.createElementVNode("span", {
              class: vue.normalizeClass(_ctx.b('slider-text'))
            }, vue.toDisplayString(_ctx.sliderTip), 3 /* TEXT, CLASS */),
            vue.createElementVNode("button", {
              type: "button",
              class: vue.normalizeClass(_ctx.b('slider-button')),
              style: vue.normalizeStyle(_ctx.sliderButtonStyle),
              disabled: _ctx.disabled || _ctx.verified,
              "aria-label": "拖动滑块完成验证",
              onPointerdown: _cache[0] || (_cache[0] = vue.withModifiers((...args) => (_ctx.startSlide && _ctx.startSlide(...args)), ["prevent"]))
            }, _cache[7] || (_cache[7] = [
              vue.createElementVNode("span", { "aria-hidden": "true" }, "›", -1 /* HOISTED */)
            ]), 46 /* CLASS, STYLE, PROPS, NEED_HYDRATION */, _hoisted_8)
          ], 2 /* CLASS */)
        ], 64 /* STABLE_FRAGMENT */))
      : (_ctx.captchaType === 'text')
        ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 1 }, [
            vue.createElementVNode("div", {
              ref: "scene",
              class: vue.normalizeClass(_ctx.b('scene', 'text')),
              style: vue.normalizeStyle(_ctx.sceneStyle)
            }, [
              vue.createElementVNode("span", {
                class: vue.normalizeClass(_ctx.b('scene-decoration', 'one'))
              }, null, 2 /* CLASS */),
              vue.createElementVNode("span", {
                class: vue.normalizeClass(_ctx.b('scene-decoration', 'two'))
              }, null, 2 /* CLASS */),
              vue.createElementVNode("div", {
                class: vue.normalizeClass(_ctx.b('text-options')),
                role: "group",
                "aria-label": "文字验证码选项"
              }, [
                (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.textOptions, (item) => {
                  return (vue.openBlock(), vue.createElementBlock("button", {
                    key: item.id,
                    type: "button",
                    class: vue.normalizeClass([_ctx.b('text-option'), { [_ctx.b('text-option-selected')]: _ctx.selectedTextIds.includes(item.id) }]),
                    style: vue.normalizeStyle(_ctx.getChoiceOptionStyle(item)),
                    disabled: _ctx.disabled || _ctx.verified || _ctx.selectedTextIds.includes(item.id),
                    "aria-label": `点击文字 ${item.value}`,
                    onClick: $event => (_ctx.selectText(item))
                  }, vue.toDisplayString(item.value), 15 /* TEXT, CLASS, STYLE, PROPS */, _hoisted_9))
                }), 128 /* KEYED_FRAGMENT */))
              ], 2 /* CLASS */),
              (_ctx.verified)
                ? (vue.openBlock(), vue.createElementBlock("div", {
                    key: 0,
                    class: vue.normalizeClass(_ctx.b('mask'))
                  }, "验证通过", 2 /* CLASS */))
                : vue.createCommentVNode("v-if", true)
            ], 6 /* CLASS, STYLE */),
            vue.createElementVNode("div", {
              class: vue.normalizeClass(_ctx.b('canvas-prompt'))
            }, [
              _cache[8] || (_cache[8] = vue.createTextVNode(" 请依次点击 ")),
              vue.createElementVNode("strong", null, "【" + vue.toDisplayString(_ctx.targetTextLabel) + "】", 1 /* TEXT */)
            ], 2 /* CLASS */)
          ], 64 /* STABLE_FRAGMENT */))
        : (_ctx.captchaType === 'math')
          ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 2 }, [
              vue.createElementVNode("div", {
                ref: "scene",
                class: vue.normalizeClass(_ctx.b('scene', 'math')),
                style: vue.normalizeStyle(_ctx.sceneStyle)
              }, [
                vue.createElementVNode("span", {
                  class: vue.normalizeClass(_ctx.b('scene-decoration', 'one'))
                }, null, 2 /* CLASS */),
                vue.createElementVNode("span", {
                  class: vue.normalizeClass(_ctx.b('scene-decoration', 'two'))
                }, null, 2 /* CLASS */),
                vue.createElementVNode("div", {
                  class: vue.normalizeClass(_ctx.b('math-options')),
                  role: "group",
                  "aria-label": "算术验证码选项"
                }, [
                  (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.mathResultOptions, (item) => {
                    return (vue.openBlock(), vue.createElementBlock("button", {
                      key: item.id,
                      type: "button",
                      class: vue.normalizeClass(_ctx.b('math-option')),
                      style: vue.normalizeStyle(_ctx.getChoiceOptionStyle(item)),
                      disabled: _ctx.disabled || _ctx.verified,
                      "aria-label": `选择结果 ${item.value}`,
                      onClick: $event => (_ctx.selectMath(item))
                    }, vue.toDisplayString(item.value), 15 /* TEXT, CLASS, STYLE, PROPS */, _hoisted_10))
                  }), 128 /* KEYED_FRAGMENT */))
                ], 2 /* CLASS */),
                (_ctx.verified)
                  ? (vue.openBlock(), vue.createElementBlock("div", {
                      key: 0,
                      class: vue.normalizeClass(_ctx.b('mask'))
                    }, "验证通过", 2 /* CLASS */))
                  : vue.createCommentVNode("v-if", true)
              ], 6 /* CLASS, STYLE */),
              vue.createElementVNode("div", {
                class: vue.normalizeClass(_ctx.b('canvas-prompt'))
              }, [
                _cache[9] || (_cache[9] = vue.createTextVNode(" 请选择正确的计算结果：")),
                vue.createElementVNode("strong", null, vue.toDisplayString(_ctx.mathExpression), 1 /* TEXT */)
              ], 2 /* CLASS */)
            ], 64 /* STABLE_FRAGMENT */))
          : (_ctx.captchaType === 'rotate')
            ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 3 }, [
                vue.createElementVNode("div", {
                  ref: "scene",
                  class: vue.normalizeClass(_ctx.b('scene', 'rotate')),
                  style: vue.normalizeStyle(_ctx.sceneStyle)
                }, [
                  vue.createElementVNode("span", {
                    class: vue.normalizeClass(_ctx.b('scene-decoration', 'one'))
                  }, null, 2 /* CLASS */),
                  vue.createElementVNode("span", {
                    class: vue.normalizeClass(_ctx.b('scene-decoration', 'two'))
                  }, null, 2 /* CLASS */),
                  vue.createElementVNode("div", {
                    class: vue.normalizeClass(_ctx.b('rotate-dial')),
                    style: vue.normalizeStyle(_ctx.rotateDialStyle),
                    "aria-hidden": "true"
                  }, [
                    vue.createElementVNode("span", {
                      class: vue.normalizeClass(_ctx.b('rotate-arrow'))
                    }, "↑", 2 /* CLASS */),
                    vue.createElementVNode("span", {
                      class: vue.normalizeClass(_ctx.b('rotate-mark'))
                    }, "AVUE", 2 /* CLASS */)
                  ], 6 /* CLASS, STYLE */),
                  vue.createElementVNode("div", {
                    class: vue.normalizeClass(_ctx.b('rotate-controls'))
                  }, [
                    vue.createElementVNode("button", {
                      type: "button",
                      disabled: _ctx.disabled || _ctx.verified,
                      "aria-label": "逆时针旋转",
                      onClick: _cache[1] || (_cache[1] = $event => (_ctx.rotateCaptcha(-1)))
                    }, "↺", 8 /* PROPS */, _hoisted_11),
                    vue.createElementVNode("button", {
                      type: "button",
                      disabled: _ctx.disabled || _ctx.verified,
                      "aria-label": "顺时针旋转",
                      onClick: _cache[2] || (_cache[2] = $event => (_ctx.rotateCaptcha(1)))
                    }, "↻", 8 /* PROPS */, _hoisted_12)
                  ], 2 /* CLASS */),
                  (_ctx.verified)
                    ? (vue.openBlock(), vue.createElementBlock("div", {
                        key: 0,
                        class: vue.normalizeClass(_ctx.b('mask'))
                      }, "验证通过", 2 /* CLASS */))
                    : vue.createCommentVNode("v-if", true)
                ], 6 /* CLASS, STYLE */),
                vue.createElementVNode("div", {
                  class: vue.normalizeClass(_ctx.b('canvas-prompt'))
                }, "将图案旋转至正向", 2 /* CLASS */)
              ], 64 /* STABLE_FRAGMENT */))
            : (_ctx.captchaType === 'icon')
              ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 4 }, [
                  vue.createElementVNode("div", {
                    ref: "scene",
                    class: vue.normalizeClass(_ctx.b('scene', 'icon')),
                    style: vue.normalizeStyle(_ctx.sceneStyle)
                  }, [
                    vue.createElementVNode("span", {
                      class: vue.normalizeClass(_ctx.b('scene-decoration', 'one'))
                    }, null, 2 /* CLASS */),
                    vue.createElementVNode("span", {
                      class: vue.normalizeClass(_ctx.b('scene-decoration', 'two'))
                    }, null, 2 /* CLASS */),
                    vue.createElementVNode("div", {
                      class: vue.normalizeClass(_ctx.b('icon-options')),
                      role: "group",
                      "aria-label": "图标验证码选项"
                    }, [
                      (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.iconOptions, (item) => {
                        return (vue.openBlock(), vue.createElementBlock("button", {
                          key: item.id,
                          type: "button",
                          class: vue.normalizeClass(_ctx.b('icon-option')),
                          style: vue.normalizeStyle(_ctx.getIconOptionStyle(item)),
                          disabled: _ctx.disabled || _ctx.verified,
                          "aria-label": `点击${item.label}`,
                          onClick: $event => (_ctx.selectIcon(item))
                        }, vue.toDisplayString(item.value), 15 /* TEXT, CLASS, STYLE, PROPS */, _hoisted_13))
                      }), 128 /* KEYED_FRAGMENT */))
                    ], 2 /* CLASS */),
                    (_ctx.verified)
                      ? (vue.openBlock(), vue.createElementBlock("div", {
                          key: 0,
                          class: vue.normalizeClass(_ctx.b('mask'))
                        }, "验证通过", 2 /* CLASS */))
                      : vue.createCommentVNode("v-if", true)
                  ], 6 /* CLASS, STYLE */),
                  vue.createElementVNode("div", {
                    class: vue.normalizeClass(_ctx.b('canvas-prompt'))
                  }, [
                    _cache[10] || (_cache[10] = vue.createTextVNode("请点击 ")),
                    vue.createElementVNode("strong", null, vue.toDisplayString(_ctx.iconTarget.label), 1 /* TEXT */)
                  ], 2 /* CLASS */)
                ], 64 /* STABLE_FRAGMENT */))
              : (_ctx.captchaType === 'sequence')
                ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 5 }, [
                    vue.createElementVNode("div", {
                      ref: "scene",
                      class: vue.normalizeClass(_ctx.b('scene', 'sequence')),
                      style: vue.normalizeStyle(_ctx.sceneStyle)
                    }, [
                      vue.createElementVNode("span", {
                        class: vue.normalizeClass(_ctx.b('scene-decoration', 'one'))
                      }, null, 2 /* CLASS */),
                      vue.createElementVNode("span", {
                        class: vue.normalizeClass(_ctx.b('scene-decoration', 'two'))
                      }, null, 2 /* CLASS */),
                      vue.createElementVNode("div", {
                        class: vue.normalizeClass(_ctx.b('sequence-options')),
                        role: "group",
                        "aria-label": "顺序验证码选项"
                      }, [
                        (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.sequenceOptions, (item) => {
                          return (vue.openBlock(), vue.createElementBlock("button", {
                            key: item.id,
                            type: "button",
                            class: vue.normalizeClass([_ctx.b('sequence-option'), _ctx.b(`sequence-option-${item.shape}`), { [_ctx.b('sequence-option-selected')]: _ctx.selectedSequenceIds.includes(item.id) }]),
                            style: vue.normalizeStyle(_ctx.getSequenceOptionStyle(item)),
                            disabled: _ctx.disabled || _ctx.verified || _ctx.selectedSequenceIds.includes(item.id),
                            "aria-label": `点击${item.label}`,
                            onClick: $event => (_ctx.selectSequence(item))
                          }, null, 14 /* CLASS, STYLE, PROPS */, _hoisted_14))
                        }), 128 /* KEYED_FRAGMENT */))
                      ], 2 /* CLASS */),
                      (_ctx.verified)
                        ? (vue.openBlock(), vue.createElementBlock("div", {
                            key: 0,
                            class: vue.normalizeClass(_ctx.b('mask'))
                          }, "验证通过", 2 /* CLASS */))
                        : vue.createCommentVNode("v-if", true)
                    ], 6 /* CLASS, STYLE */),
                    vue.createElementVNode("div", {
                      class: vue.normalizeClass(_ctx.b('canvas-prompt'))
                    }, [
                      _cache[11] || (_cache[11] = vue.createTextVNode("请依次点击 ")),
                      vue.createElementVNode("strong", null, vue.toDisplayString(_ctx.sequenceTargetLabel), 1 /* TEXT */)
                    ], 2 /* CLASS */)
                  ], 64 /* STABLE_FRAGMENT */))
                : (_ctx.captchaType === 'drag')
                  ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 6 }, [
                      vue.createElementVNode("div", {
                        ref: "scene",
                        class: vue.normalizeClass(_ctx.b('scene', 'drag')),
                        style: vue.normalizeStyle(_ctx.sceneStyle)
                      }, [
                        vue.createElementVNode("span", {
                          class: vue.normalizeClass(_ctx.b('scene-decoration', 'one'))
                        }, null, 2 /* CLASS */),
                        vue.createElementVNode("span", {
                          class: vue.normalizeClass(_ctx.b('scene-decoration', 'two'))
                        }, null, 2 /* CLASS */),
                        vue.createElementVNode("span", {
                          class: vue.normalizeClass([_ctx.b('drag-target'), _ctx.b(`drag-shape-${_ctx.dragShape}`)]),
                          style: vue.normalizeStyle(_ctx.dragTargetStyle),
                          "aria-hidden": "true"
                        }, null, 6 /* CLASS, STYLE */),
                        vue.createElementVNode("button", {
                          type: "button",
                          class: vue.normalizeClass([_ctx.b('drag-piece'), _ctx.b(`drag-shape-${_ctx.dragShape}`)]),
                          style: vue.normalizeStyle(_ctx.dragPieceStyle),
                          disabled: _ctx.disabled || _ctx.verified,
                          "aria-label": "拖动图形到匹配轮廓",
                          onPointerdown: _cache[3] || (_cache[3] = vue.withModifiers((...args) => (_ctx.startDrag && _ctx.startDrag(...args)), ["prevent"]))
                        }, null, 46 /* CLASS, STYLE, PROPS, NEED_HYDRATION */, _hoisted_15),
                        (_ctx.verified)
                          ? (vue.openBlock(), vue.createElementBlock("div", {
                              key: 0,
                              class: vue.normalizeClass(_ctx.b('mask'))
                            }, "验证通过", 2 /* CLASS */))
                          : vue.createCommentVNode("v-if", true)
                      ], 6 /* CLASS, STYLE */),
                      vue.createElementVNode("div", {
                        class: vue.normalizeClass(_ctx.b('canvas-prompt'))
                      }, "将图形拖到相同轮廓中", 2 /* CLASS */)
                    ], 64 /* STABLE_FRAGMENT */))
                  : (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 7 }, [
                      vue.createElementVNode("div", {
                        ref: "scene",
                        class: vue.normalizeClass(_ctx.b('scene', 'path')),
                        style: vue.normalizeStyle(_ctx.sceneStyle)
                      }, [
                        vue.createElementVNode("span", {
                          class: vue.normalizeClass(_ctx.b('scene-decoration', 'one'))
                        }, null, 2 /* CLASS */),
                        vue.createElementVNode("span", {
                          class: vue.normalizeClass(_ctx.b('scene-decoration', 'two'))
                        }, null, 2 /* CLASS */),
                        (vue.openBlock(), vue.createElementBlock("svg", {
                          class: vue.normalizeClass(_ctx.b('path-track')),
                          viewBox: `0 0 ${_ctx.getSceneWidth()} ${_ctx.safeHeight}`,
                          "aria-hidden": "true"
                        }, [
                          vue.createElementVNode("path", {
                            d: _ctx.pathLine,
                            class: vue.normalizeClass(_ctx.b('path-line'))
                          }, null, 10 /* CLASS, PROPS */, _hoisted_17),
                          vue.createElementVNode("circle", {
                            cx: _ctx.pathEndPoint.x,
                            cy: _ctx.pathEndPoint.y,
                            r: "8",
                            class: vue.normalizeClass(_ctx.b('path-end'))
                          }, null, 10 /* CLASS, PROPS */, _hoisted_18)
                        ], 10 /* CLASS, PROPS */, _hoisted_16)),
                        vue.createElementVNode("button", {
                          type: "button",
                          class: vue.normalizeClass(_ctx.b('path-marker')),
                          style: vue.normalizeStyle(_ctx.pathMarkerStyle),
                          disabled: _ctx.disabled || _ctx.verified,
                          "aria-label": "沿轨迹滑动到终点",
                          onPointerdown: _cache[4] || (_cache[4] = vue.withModifiers((...args) => (_ctx.startPath && _ctx.startPath(...args)), ["prevent"]))
                        }, null, 46 /* CLASS, STYLE, PROPS, NEED_HYDRATION */, _hoisted_19),
                        (_ctx.verified)
                          ? (vue.openBlock(), vue.createElementBlock("div", {
                              key: 0,
                              class: vue.normalizeClass(_ctx.b('mask'))
                            }, "验证通过", 2 /* CLASS */))
                          : vue.createCommentVNode("v-if", true)
                      ], 6 /* CLASS, STYLE */),
                      vue.createElementVNode("div", {
                        class: vue.normalizeClass(_ctx.b('canvas-prompt'))
                      }, "沿轨迹将圆点滑动到终点", 2 /* CLASS */)
                    ], 64 /* STABLE_FRAGMENT */)),
    vue.createElementVNode("div", {
      class: vue.normalizeClass(_ctx.b('footer'))
    }, [
      vue.createElementVNode("span", {
        class: vue.normalizeClass(_ctx.b('message')),
        role: "status"
      }, vue.toDisplayString(_ctx.message), 3 /* TEXT, CLASS */),
      vue.createElementVNode("button", {
        type: "button",
        class: vue.normalizeClass(_ctx.b('refresh')),
        disabled: _ctx.disabled,
        "aria-label": "刷新验证码",
        onClick: _cache[5] || (_cache[5] = (...args) => (_ctx.refresh && _ctx.refresh(...args)))
      }, " ↻ 换一组 ", 10 /* CLASS, PROPS */, _hoisted_20)
    ], 2 /* CLASS */)
  ], 6 /* CLASS, STYLE */))
}

exports.render = render;
