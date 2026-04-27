/*! Avue.js v3.9.1 | (c) 2017-2026 Smallwei | Released under the MIT License. */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var src_core_create = require('../../../src/core/create.js');
var src_utils_util = require('../../../src/utils/util.js');

var script = src_core_create.default({
  name: "draggable",
  props: {
    index: {
      type: [String, Number],
    },
    mask: {
      type: Boolean,
      default: true
    },
    scale: {
      type: Number,
      default: 1
    },
    readonly: {
      type: Boolean,
      default: false
    },
    resize: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    step: {
      type: Number,
      default: 1
    },
    lock: {
      type: Boolean,
      default: false
    },
    zIndex: {
      type: [Number, String],
      default: 1
    },
    left: {
      type: Number,
      default: 0
    },
    top: {
      type: Number,
      default: 0
    },
    width: {
      type: Number
    },
    height: {
      type: Number
    }
  },
  data () {
    return {
      first: true,
      value: '',
      baseWidth: 0,
      baseHeight: 0,
      baseLeft: 0,
      baseTop: 0,
      children: {},
      moveActive: false,
      overActive: false,
      rangeActive: false,
      active: false,
      keyDown: null,
      rangeList: [
        {
          classname: "left",
        },
        {
          classname: "right",
        },
        {
          classname: "top",
        },
        {
          classname: "bottom",
        },
        {
          classname: "top-left",
        },
        {
          classname: "top-right",
        },
        {
          classname: "bottom-left",
        },
        {
          classname: "bottom-right",
        }
      ]
    };
  },
  computed: {
    scaleVal () {
      return this.scale;
    },
    styleMenuName () {
      return {
        transformOrigin: "0 0",
        transform: `scale(${this.scaleVal})`
      };
    },
    styleLineName () {
      return {
        borderWidth: this.setPx(this.scaleVal)
      };
    },
    styleRangeName () {
      const calc = 10 * this.scaleVal;
      return {
        width: this.setPx(calc),
        height: this.setPx(calc)
      };
    },
    styleLabelName () {
      return {
        fontSize: this.setPx(18 * this.scaleVal)
      };
    },
    styleName () {
      return Object.assign(
        (() => {
          if (this.active) {
            return Object.assign(
              {
                zIndex: 9999
              },
              this.styleLineName
            );
          }
          return { zIndex: this.zIndex };
        })(),
        {
          top: this.setPx(this.baseTop),
          left: this.setPx(this.baseLeft),
          width: this.setPx(this.baseWidth),
          height: this.setPx(this.baseHeight)
        }
      );
    }
  },
  watch: {
    active (val) {
      if (val) {
        this.handleKeydown();
      } else {
        document.onkeydown = this.keyDown;
      }
    },
    width (val) {
      this.baseWidth = src_utils_util.getFixed(val) || this.children.offsetWidth;
    },
    height (val) {
      this.baseHeight = src_utils_util.getFixed(val) || this.children.offsetHeight;
    },
    left (val) {
      this.baseLeft = src_utils_util.getFixed(val);
    },
    top (val) {
      this.baseTop = src_utils_util.getFixed(val);
    },
    baseWidth (val) {
      this.$refs.wrapper.style.width = this.setPx(val);
      if (this.resize && this.children.style) {
        this.children.style.width = this.setPx(val);
      }
    },
    baseHeight (val) {
      this.$refs.wrapper.style.height = this.setPx(val);
      if (this.resize && this.children.style) {
        this.children.style.height = this.setPx(val);
      }
    },
    baseLeft (n, o) {
      if (this.first) return
      this.setMove(n - o, 0);
    },
    baseTop (n, o) {
      if (this.first) return
      this.setMove(0, n - o);
    }
  },
  mounted () {
    this.init();
  },
  methods: {
    init () {
      this.children = this.$refs.item.firstChild;
      this.baseWidth = src_utils_util.getFixed(this.width) || this.children.offsetWidth;
      this.baseHeight = src_utils_util.getFixed(this.height) || this.children.offsetHeight;
      this.baseLeft = src_utils_util.getFixed(this.left);
      this.baseTop = src_utils_util.getFixed(this.top);
      this.keyDown = document.onkeydown;
      this.$nextTick(() => {
        this.first = false;
      });
    },
    setMove (left, top) {
      this.$emit('move', {
        index: this.index,
        left: left,
        top: top
      });
    },
    setLeft (left) {
      this.baseLeft = left;
    },
    setTop (top) {
      this.baseTop = top;
    },
    getRangeStyle (postion) {
      const calc = (10 * this.scaleVal) / 2;
      let result = {};
      let list = postion.split("-");
      list.forEach(ele => {
        result[ele] = this.setPx(-calc);
      });
      return result;
    },
    setOverActive (val) {
      this.overActive = val;
    },
    setActive (val) {
      this.active = val;
    },
    rangeMove (e, position) {
      if (this.disabled || this.lock) return
      //移动的方向
      let x, y;
      //移动的位置
      let xp, yp;
      //移动的正负
      let xc, yc;
      this.rangeActive = true;
      this.handleMouseDown();
      let disX = e.clientX;
      let disY = e.clientY;
      document.onmousemove = e => {
        this.moveActive = true;
        if (position === "right") {
          x = true;
          y = false;
        } else if (position === "left") {
          x = true;
          xp = true;
          xc = true;
          y = false;
        } else if (position === "top") {
          x = false;
          y = true;
          yp = true;
          yc = true;
        } else if (position === "bottom") {
          x = false;
          y = true;
        } else if (position === "bottom-right") {
          x = true;
          y = true;
        } else if (position === "bottom-left") {
          x = true;
          y = true;
          xp = true;
          xc = true;
        } else if (position === "top-right") {
          x = true;
          y = true;
          yp = true;
          yc = true;
        } else if (position === "top-left") {
          x = true;
          y = true;
          xp = true;
          xc = true;
          yp = true;
          yc = true;
        }
        let left = e.clientX - disX;
        let top = e.clientY - disY;
        disX = e.clientX;
        disY = e.clientY;
        if (x) {
          let calc = left * this.step;
          if (xc) calc = -calc;
          if (xp) this.baseLeft = src_utils_util.getFixed(this.baseLeft - calc);
          this.baseWidth = src_utils_util.getFixed(this.baseWidth + calc);
        }
        if (y) {
          let calc = top * this.step;
          if (yc) calc = -calc;
          if (yp) this.baseTop = src_utils_util.getFixed(this.baseTop - calc);
          this.baseHeight = src_utils_util.getFixed(this.baseHeight + calc);
        }
      };
      this.handleClear();

    },
    handleOut () {
      this.overActive = false;
      this.$emit("out", {
        index: this.index,
        width: this.baseWidth,
        height: this.baseHeight,
        left: this.baseLeft,
        top: this.baseTop
      });
    },
    handleOver () {
      if (this.disabled) return
      this.overActive = true;
      this.$emit("over", {
        index: this.index,
        width: this.baseWidth,
        height: this.baseHeight,
        left: this.baseLeft,
        top: this.baseTop
      });
    },
    handleMove (e) {
      if (this.disabled || this.lock) return
      setTimeout(() => {
        this.$refs.input.focus();
      });
      this.active = true;
      this.handleMouseDown();
      let disX = e.clientX;
      let disY = e.clientY;
      document.onmousemove = (e) => {
        let left = e.clientX - disX;
        let top = e.clientY - disY;
        disX = e.clientX;
        disY = e.clientY;
        this.baseLeft = src_utils_util.getFixed(this.baseLeft + left * this.step);
        this.baseTop = src_utils_util.getFixed(this.baseTop + top * this.step);
      };
      this.handleClear();
    },
    handleClear () {
      document.onmouseup = () => {
        document.onmousemove = null;
        document.onmouseup = null;
        this.handleMouseUp();
      };
    },
    handleKeydown () {
      document.onkeydown = (event) => {
        var e = event || window.event || arguments.callee.caller.arguments[0];
        let step = 1 * this.step;
        if (this.$refs.input.focused) {
          if (e && e.keyCode == 38) {//上
            this.baseTop = src_utils_util.getFixed(this.baseTop - step);
          } else if (e && e.keyCode == 37) {//左
            this.baseLeft = src_utils_util.getFixed(this.baseLeft - step);
          } else if (e && e.keyCode == 40) {//下
            this.baseTop = src_utils_util.getFixed(this.baseTop + step);
          } else if (e && e.keyCode == 39) {//右
            this.baseLeft = src_utils_util.getFixed(this.baseLeft + step);
          }
          event.stopPropagation();
          event.preventDefault();
          this.$emit("blur", {
            index: this.index,
            width: this.baseWidth,
            height: this.baseHeight,
            left: this.baseLeft,
            top: this.baseTop
          });
          this.keyDown && this.keyDown(event);
        }
      };
    },
    handleMouseDown (e) {
      this.moveActive = true;
      this.$emit("focus", {
        index: this.index,
        width: this.baseWidth,
        height: this.baseHeight,
        left: this.baseLeft,
        top: this.baseTop
      });
    },
    handleMouseUp () {
      this.moveActive = false;
      this.rangeActive = false;
      this.$emit("blur", {
        index: this.index,
        width: this.baseWidth,
        height: this.baseHeight,
        left: this.baseLeft,
        top: this.baseTop
      });
    }
  }
});

exports.default = script;
