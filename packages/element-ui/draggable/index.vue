<template>
  <div :class="b({'active':((active || overActive)&&!readonly),'move':moveActive,'click':disabled})"
       @mousedown.stop="handleMove"
       @mouseover.stop="handleOver"
       @mouseout.stop="handleOut"
       :style="styleName">
    <el-input ref="input"
              :class="b('focus')"
              v-model="value"></el-input>
    <div :class="b('wrapper')"
         ref="wrapper">
      <template v-if="(active || overActive || moveActive)&&!readonly">
        <div :style="styleLineName"
             :class="b('line',['left'])"></div>
        <div :style="styleLineName"
             :class="b('line',['top'])"></div>
        <div :class="b('line',['label'])"
             :style="styleLabelName">{{baseLeft}},{{baseTop}}</div>
      </template>
      <template v-for="(item,index) in rangeList"
                v-if="!readonly">
        <div :class="b('range',[item.classname])"
             :key="index"
             v-if="active"
             :style="[styleRangeName,getRangeStyle(item.classname)]"
             @mousedown.stop="rangeMove($event,item.classname)"></div>
      </template>
      <div :class="b('menu')"
           :style="styleMenuName"
           v-show="active || overActive">
        <slot name="menu"
              :zIndex="zIndex"
              :index="index"></slot>
      </div>
      <div :class="b('item')"
           ref="item">
        <slot></slot>
      </div>
      <div :class="b('mask')"
           v-if="!disabled && mask"></div>
    </div>
  </div>
</template>

<script>
import create from "core/create";
import { getFixed } from "utils/util";
export default create({
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
        this.handleKeydown()
      } else {
        document.onkeydown = this.keyDown
      }
    },
    width (val) {
      this.baseWidth = getFixed(val) || this.children.offsetWidth;
    },
    height (val) {
      this.baseHeight = getFixed(val) || this.children.offsetHeight;
    },
    left (val) {
      this.baseLeft = getFixed(val);
    },
    top (val) {
      this.baseTop = getFixed(val);
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
    }
  },
  mounted () {
    this.init();
  },
  methods: {
    init () {
      this.children = this.$refs.item.firstChild;
      this.baseWidth = getFixed(this.width) || this.children.offsetWidth;
      this.baseHeight = getFixed(this.height) || this.children.offsetHeight;
      this.baseLeft = getFixed(this.left);
      this.baseTop = getFixed(this.top);
      this.keyDown = document.onkeydown
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
      if (this.disabled) return
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
          if (xp) this.baseLeft = getFixed(this.baseLeft - calc);
          this.baseWidth = getFixed(this.baseWidth + calc);
        }
        if (y) {
          let calc = top * this.step;
          if (yc) calc = -calc;
          if (yp) this.baseTop = getFixed(this.baseTop - calc);
          this.baseHeight = getFixed(this.baseHeight + calc);
        }
      };
      this.handleClear()

    },
    handleOut () {
      this.overActive = false
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
      this.overActive = true
      this.$emit("over", {
        index: this.index,
        width: this.baseWidth,
        height: this.baseHeight,
        left: this.baseLeft,
        top: this.baseTop
      });
    },
    handleMove (e) {
      if (this.disabled) return
      setTimeout(() => {
        this.$refs.input.focus()
      })
      this.active = true;
      this.handleMouseDown();
      let disX = e.clientX;
      let disY = e.clientY;
      document.onmousemove = (e) => {
        let left = e.clientX - disX;
        let top = e.clientY - disY;
        disX = e.clientX;
        disY = e.clientY;
        this.baseLeft = getFixed(this.baseLeft + left * this.step);
        this.baseTop = getFixed(this.baseTop + top * this.step);
      };
      this.handleClear()
    },
    handleClear () {
      document.onmouseup = () => {
        document.onmousemove = null;
        document.onmouseup = null;
        this.handleMouseUp();
      }
    },
    handleKeydown () {
      document.onkeydown = (event) => {
        var e = event || window.event || arguments.callee.caller.arguments[0];
        let step = 1 * this.step;
        if (this.$refs.input.focused) {
          if (e && e.keyCode == 38) {//上
            this.baseTop = getFixed(this.baseTop - step)
          } else if (e && e.keyCode == 37) {//左
            this.baseLeft = getFixed(this.baseLeft - step)
          } else if (e && e.keyCode == 40) {//下
            this.baseTop = getFixed(this.baseTop + step)
          } else if (e && e.keyCode == 39) {//右
            this.baseLeft = getFixed(this.baseLeft + step)
          }
          event.stopPropagation()
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
</script>